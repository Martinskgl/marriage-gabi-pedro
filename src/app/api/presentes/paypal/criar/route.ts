import { prisma } from "@/lib/prisma";
import { createPaypalOrder } from "@/lib/paypal";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Cria a cobrança no PayPal para um pedido "Pendente". O valor vem do banco, nunca do navegador.
export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const pedido = String(body.pedido ?? "");
  if (!UUID.test(pedido)) return Response.json({ ok: false, error: "dados" }, { status: 400 });

  try {
    const order = await prisma.transaction.findUnique({
      where: { uuid: pedido },
      select: { uuid: true, status: true, totalPrice: true, product: { select: { name: true } } },
    });
    if (!order || order.status !== "PENDING") return Response.json({ ok: false, error: "pedido" }, { status: 404 });

    const id = await createPaypalOrder({
      reference: order.uuid,
      amount: Number(order.totalPrice).toFixed(2),
      description: order.product.name,
    });
    await prisma.transaction.update({ where: { uuid: order.uuid }, data: { paypalOrderId: id } });
    return Response.json({ ok: true, id });
  } catch (e) {
    console.error(e);
    return Response.json({ ok: false, error: "erro" }, { status: 500 });
  }
}
