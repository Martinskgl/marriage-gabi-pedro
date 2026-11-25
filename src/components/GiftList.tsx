"use client";

import { useEffect, useState } from "react";
import { site, type Locale } from "@/data/site";
import { t } from "@/lib/i18n";
import { PaypalButtons, paypalEnabled, preloadPaypal } from "./PaypalButtons";

type Gift = { uuid: string; name: string; description: string | null; price: number; image: string | null };
type Status = "idle" | "sending" | "paying" | "sent" | "error" | "payError";

/**
 * Lista de presentes cadastrados no painel /admin. O pedido entra como "Pendente" e, com o PayPal configurado,
 * vira "Pago" quando o pagamento é confirmado.
 */
export function GiftList({ lang }: { lang: Locale }) {
  const [gifts, setGifts] = useState<Gift[] | null>(null);

  useEffect(() => {
    fetch("/api/presentes")
      .then((r) => r.json())
      .then((json) => setGifts(json.ok ? json.gifts : []))
      .catch(() => setGifts([]));
  }, []);

  if (gifts === null) return null;
  if (gifts.length === 0) return <p className="pending">{t(site.pending, lang)}</p>;

  return (
    <div className="gifts">
      {gifts.map((gift) => (
        <GiftCard key={gift.uuid} gift={gift} lang={lang} />
      ))}
    </div>
  );
}

function GiftCard({ gift, lang }: { gift: Gift; lang: Locale }) {
  const g = site.gifts;
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [pedido, setPedido] = useState<string | null>(null);
  const price = new Intl.NumberFormat(lang === "pt" ? "pt-BR" : "en-US", { style: "currency", currency: "BRL" }).format(gift.price);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/presentes/pedido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: gift.uuid,
          nome: data.get("nome"),
          email: data.get("email"),
          website: data.get("website"),
        }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
      if (paypalEnabled && json.pedido) {
        setPedido(json.pedido);
        setStatus("paying");
      } else {
        setStatus("sent");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <article className="card gift">
      {gift.image && (
        // Imagem por link externo cadastrado no painel
        // eslint-disable-next-line @next/next/no-img-element
        <img src={gift.image} alt={gift.name} className="gift__image" loading="lazy" />
      )}
      <h3 className="gift__name">{gift.name}</h3>
      {gift.description && <p className="gift__description">{gift.description}</p>}
      <p className="gift__price">{price}</p>

      {status === "sent" ? (
        <p className="gift__success" role="status">
          {t(g.success, lang)}
        </p>
      ) : pedido && (status === "paying" || status === "payError") ? (
        <div className="gift__form">
          <PaypalButtons pedido={pedido} lang={lang} onPaid={() => setStatus("sent")} onError={() => setStatus("payError")} />
          {status === "payError" && (
            <p className="guestbook__error" role="alert">
              {t(g.payError, lang)}
            </p>
          )}
        </div>
      ) : !open ? (
        <button type="button" className="btn btn--solid" onClick={() => {
            setOpen(true);
            preloadPaypal(lang);
          }}>
          {t(g.give, lang)}
        </button>
      ) : (
        <form className="gift__form" onSubmit={onSubmit}>
          <label className="guestbook__field">
            <span className="eyebrow">{t(g.name, lang)}</span>
            <input name="nome" type="text" required maxLength={100} autoComplete="name" />
          </label>
          <label className="guestbook__field">
            <span className="eyebrow">{t(g.email, lang)}</span>
            <input name="email" type="email" required maxLength={200} autoComplete="email" />
          </label>
          {/* Campo invisível contra robôs: pessoas não preenchem */}
          <input name="website" type="text" tabIndex={-1} autoComplete="off" className="guestbook__trap" aria-hidden="true" />
          <div className="gift__actions">
            <button type="submit" className="btn btn--solid" disabled={status === "sending"}>
              {t(status === "sending" ? g.sending : g.confirm, lang)}
            </button>
            <button type="button" className="link" onClick={() => setOpen(false)}>
              {t(g.cancel, lang)}
            </button>
          </div>
          {status === "error" && (
            <p className="guestbook__error" role="alert">
              {t(g.error, lang)}
            </p>
          )}
        </form>
      )}
    </article>
  );
}
