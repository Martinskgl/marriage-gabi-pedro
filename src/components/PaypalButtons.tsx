"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/data/site";

const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";
export const paypalEnabled = CLIENT_ID !== "";

type Actions = { restart: () => Promise<void> };
type PaypalSdk = {
  Buttons: (options: {
    style?: Record<string, string | number>;
    createOrder: () => Promise<string>;
    onApprove: (data: { orderID: string }, actions: Actions) => Promise<void>;
    onError: (err: unknown) => void;
  }) => { render: (el: HTMLElement) => Promise<void>; close: () => Promise<void> };
};

declare global {
  interface Window {
    paypal?: PaypalSdk;
  }
}

// O SDK do PayPal é carregado uma vez só, na primeira vez que os botões aparecem
let sdk: Promise<PaypalSdk> | null = null;
function loadSdk(lang: Locale) {
  if (!sdk) {
    sdk = new Promise((resolve, reject) => {
      const params = new URLSearchParams({
        "client-id": CLIENT_ID,
        currency: "BRL",
        intent: "capture",
        components: "buttons",
        locale: lang === "pt" ? "pt_BR" : "en_US",
      });
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?${params}`;
      script.async = true;
      script.onload = () => (window.paypal ? resolve(window.paypal) : reject(new Error("PayPal")));
      script.onerror = () => {
        sdk = null;
        reject(new Error("PayPal"));
      };
      document.head.appendChild(script);
    });
  }
  return sdk;
}

/** Começa a carregar o PayPal antes de os botões aparecerem, para eles já estarem prontos no primeiro clique. */
export function preloadPaypal(lang: Locale) {
  if (paypalEnabled) loadSdk(lang).catch(() => {});
}

/** Botões do PayPal para pagar um pedido já registrado (valor definido no servidor). */
export function PaypalButtons({
  pedido,
  lang,
  onPaid,
  onError,
}: {
  pedido: string;
  lang: Locale;
  onPaid: () => void;
  onError: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const callbacks = useRef({ onPaid, onError });
  useEffect(() => {
    callbacks.current = { onPaid, onError };
  });

  useEffect(() => {
    let buttons: ReturnType<PaypalSdk["Buttons"]> | null = null;
    let cancelled = false;

    loadSdk(lang)
      .then((paypal) => {
        if (cancelled || !ref.current) return;
        buttons = paypal.Buttons({
          style: { layout: "vertical", shape: "rect", label: "pay", height: 44 },
          createOrder: async () => {
            const res = await fetch("/api/presentes/paypal/criar", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ pedido }),
            });
            const json = await res.json();
            if (!json.ok) throw new Error(json.error);
            return json.id as string;
          },
          onApprove: async (data, actions) => {
            const res = await fetch("/api/presentes/paypal/capturar", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId: data.orderID }),
            });
            const json = await res.json();
            // Cartão recusado: reabre a janela do PayPal para escolher outra forma de pagamento
            if (json.error === "recusado") return actions.restart();
            if (!json.ok) throw new Error(json.error);
            callbacks.current.onPaid();
          },
          onError: () => callbacks.current.onError(),
        });
        return buttons.render(ref.current);
      })
      .catch(() => {
        if (!cancelled) callbacks.current.onError();
      });

    return () => {
      cancelled = true;
      buttons?.close().catch(() => {});
    };
  }, [pedido, lang]);

  return <div ref={ref} className="gift__paypal" />;
}
