// PayPal Checkout (API REST v2). Só roda no servidor: usa o Secret.
// PAYPAL_ENV="live" usa o PayPal real; qualquer outro valor usa o Sandbox (teste).
const BASE = process.env.PAYPAL_ENV === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";

async function accessToken() {
  const id = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!id || !secret) throw new Error("PayPal não configurado");
  const res = await fetch(`${BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`PayPal token ${res.status}`);
  return ((await res.json()) as { access_token: string }).access_token;
}

async function call(path: string, init: { method: string; body?: unknown; requestId?: string }) {
  const res = await fetch(`${BASE}${path}`, {
    method: init.method,
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(init.requestId ? { "PayPal-Request-Id": init.requestId } : {}),
    },
    body: init.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, json };
}

/** Cria a cobrança no PayPal com o valor do banco, em reais. */
export async function createPaypalOrder(input: { reference: string; amount: string; description: string }) {
  const r = await call("/v2/checkout/orders", {
    method: "POST",
    body: {
      intent: "CAPTURE",
      purchase_units: [
        {
          custom_id: input.reference,
          description: input.description.slice(0, 127),
          amount: { currency_code: "BRL", value: input.amount },
        },
      ],
      payment_source: {
        paypal: { experience_context: { shipping_preference: "NO_SHIPPING", user_action: "PAY_NOW" } },
      },
    },
  });
  if (!r.ok || !r.json.id) throw new Error(`PayPal criar ${r.status} ${JSON.stringify(r.json)}`);
  return r.json.id as string;
}

export type PaypalOrder = {
  status?: string;
  details?: { issue?: string }[];
  purchase_units?: {
    custom_id?: string;
    payments?: {
      captures?: { status?: string; custom_id?: string; amount?: { currency_code?: string; value?: string } }[];
    };
  }[];
};

/** Captura (cobra) o pedido aprovado pelo convidado. Se já foi capturado, devolve o pedido atual. */
export async function capturePaypalOrder(orderId: string): Promise<{ ok: boolean; order: PaypalOrder }> {
  const path = `/v2/checkout/orders/${encodeURIComponent(orderId)}`;
  const r = await call(`${path}/capture`, { method: "POST", requestId: `capturar-${orderId}` });
  if (r.ok) return { ok: true, order: r.json };
  if ((r.json as PaypalOrder).details?.[0]?.issue === "ORDER_ALREADY_CAPTURED") {
    const g = await call(path, { method: "GET" });
    return { ok: g.ok, order: g.json };
  }
  return { ok: false, order: r.json };
}
