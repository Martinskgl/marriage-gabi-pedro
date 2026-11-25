import { prisma } from "@/lib/prisma";
import { capturePaypalOrder } from "@/lib/paypal";

const ORDER_ID = /^[A-Z0-9]{5,40}$/;

// Confirma o pagamento com o PayPal e marca o pedido como "Pago".
// Só marca se o PayPal disser que foi cobrado, no valor e na moeda do pedido.
export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const orderId = String(body.orderId ?? "");
  if (!ORDER_ID.test(orderId)) return Response.json({ ok: false, error: "dados" }, { status: 400 });

  try {
    const order = await prisma.transaction.findUnique({
      where: { paypalOrderId: orderId },
      select: { uuid: true, status: true, totalPrice: true },
    });
    if (!order) return Response.json({ ok: false, error: "pedido" }, { status: 404 });
    if (order.status === "PAID") return Response.json({ ok: true });

    const { ok, order: paypal } = await capturePaypalOrder(orderId);
    if (!ok) {
      // Cartão recusado: o convidado pode escolher outra forma de pagamento na mesma janela
      const declined = paypal.details?.[0]?.issue === "INSTRUMENT_DECLINED";
      return Response.json({ ok: false, error: declined ? "recusado" : "erro" }, { status: 402 });
    }

    const unit = paypal.purchase_units?.[0];
    const capture = unit?.payments?.captures?.[0];
    const paid =
      paypal.status === "COMPLETED" &&
      // Na resposta da captura o custom_id vem dentro da captura; na consulta do pedido, na unidade
      (capture?.custom_id ?? unit?.custom_id) === order.uuid &&
      capture?.status === "COMPLETED" &&
      capture.amount?.currency_code === "BRL" &&
      capture.amount?.value === Number(order.totalPrice).toFixed(2);

    if (!paid) {
      console.error("PayPal: pagamento não confere", orderId, paypal.status, capture?.status);
      return Response.json({ ok: false, error: "erro" }, { status: 402 });
    }

    await prisma.transaction.update({ where: { uuid: order.uuid }, data: { status: "PAID" } });
    return Response.json({ ok: true });
  } catch (e) {
    console.error(e);
    return Response.json({ ok: false, error: "erro" }, { status: 500 });
  }
}
