import { createGiftOrder } from "@/services/gift/service.gift";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Pedido de presente feito por um convidado: fica "Pendente" no painel
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "dados" }, { status: 400 });
  }

  // Campo invisível preenchido = robô. Responde "ok" sem gravar.
  if (body.website) return Response.json({ ok: true });

  const productId = String(body.productId ?? "");
  const name = String(body.nome ?? "").trim().slice(0, 100);
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 200);
  if (!UUID.test(productId) || !name || !EMAIL.test(email)) {
    return Response.json({ ok: false, error: "dados" }, { status: 400 });
  }

  try {
    const order = await createGiftOrder({ productId, name, email });
    if (!order) return Response.json({ ok: false, error: "presente" }, { status: 404 });
    return Response.json({ ok: true, pedido: order.uuid });
  } catch {
    return Response.json({ ok: false, error: "erro" }, { status: 500 });
  }
}
