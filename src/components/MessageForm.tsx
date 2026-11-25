"use client";

import { useState } from "react";
import { site, type Locale } from "@/data/site";
import { t } from "@/lib/i18n";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Formulário de mensagens para o casal. Envia para o Google Apps Script publicado
 * (scripts/google-apps-script/mensagens.gs), que grava cada mensagem numa planilha.
 */
export function MessageForm({ lang }: { lang: Locale }) {
  const g = site.guestbook;
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!g.endpoint || status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      // Sem cabeçalhos extras o navegador envia como text/plain e não faz preflight (o Apps Script não responde a OPTIONS)
      const res = await fetch(g.endpoint, {
        method: "POST",
        body: JSON.stringify({
          nome: data.get("nome"),
          mensagem: data.get("mensagem"),
          website: data.get("website"),
          lang,
        }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="card guestbook guestbook--sent" role="status">
        <p className="guestbook__success">{t(g.success, lang)}</p>
        <button type="button" className="link" onClick={() => setStatus("idle")}>
          {t(g.another, lang)}
        </button>
      </div>
    );
  }

  return (
    <form className="card guestbook" onSubmit={onSubmit}>
      <label className="guestbook__field">
        <span className="eyebrow">{t(g.name, lang)}</span>
        <input name="nome" type="text" required maxLength={g.maxName} autoComplete="name" />
      </label>
      <label className="guestbook__field">
        <span className="eyebrow">{t(g.message, lang)}</span>
        <textarea name="mensagem" required maxLength={g.maxMessage} rows={6} />
      </label>
      {/* Campo invisível contra robôs: pessoas não preenchem */}
      <input name="website" type="text" tabIndex={-1} autoComplete="off" className="guestbook__trap" aria-hidden="true" />

      <button type="submit" className="btn btn--solid" disabled={!g.endpoint || status === "sending"}>
        {t(status === "sending" ? g.sending : g.submit, lang)}
      </button>
      {!g.endpoint && <p className="pending">{t(site.pending, lang)}</p>}
      {status === "error" && (
        <p className="guestbook__error" role="alert">
          {t(g.error, lang)}
        </p>
      )}
    </form>
  );
}
