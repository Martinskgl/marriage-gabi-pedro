"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { site, type Locale } from "@/data/site";
import { t } from "@/lib/i18n";

type UserActivation = { hasBeenActive: boolean };

/**
 * Vídeo P&B da capa, em loop, no lugar da foto, com botão para ligar e desligar o áudio.
 * Os navegadores só deixam começar sem som; o som liga no primeiro clique, toque ou tecla
 * (e na rolagem, quando o navegador permite).
 */
export function HeroVideo({ lang }: { lang: Locale }) {
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  // Depois que a pessoa usa o botão, vale a escolha dela
  const chosen = useRef(false);
  // O botão vai direto no <body>: dentro da capa animada o "position: fixed" ficaria preso ao arco
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const setSound = async (on: boolean) => {
    const el = video.current;
    if (!el) return;
    el.muted = !on;
    if (on) {
      try {
        await el.play();
      } catch {
        // Sem interação suficiente: volta ao mudo para o vídeo continuar rodando
        el.muted = true;
        await el.play().catch(() => {});
      }
    }
    setMuted(el.muted);
  };

  useEffect(() => {
    const events = ["pointerdown", "keydown", "touchend"] as const;
    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, unmute));
      window.removeEventListener("scroll", onScroll);
    };
    const unmute = () => {
      if (chosen.current) return cleanup();
      setSound(true).then(() => {
        if (video.current && !video.current.muted) cleanup();
      });
    };
    // A rolagem só conta para áudio depois de algum clique ou toque na página
    const onScroll = () => {
      const activation = (navigator as Navigator & { userActivation?: UserActivation }).userActivation;
      if (activation?.hasBeenActive) unmute();
    };
    events.forEach((e) => window.addEventListener(e, unmute, { passive: true }));
    window.addEventListener("scroll", onScroll, { passive: true });
    return cleanup;
  }, []);

  const { frame } = site.hero;
  const label = t(muted ? site.ui.soundOn : site.ui.soundOff, lang);

  return (
    <>
      <div className="media arch__media" style={{ aspectRatio: `${frame.width} / ${frame.height}` }}>
        <video ref={video} className="arch__video" src={site.hero.video} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
      </div>

      {mounted &&
        createPortal(
      <div className={`music ${muted ? "" : "is-playing"}`}>
        <button
          type="button"
          className="music__button"
          aria-label={label}
          title={label}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            chosen.current = true;
            setSound(muted);
          }}
        >
          {muted ? (
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
              <path d="M16.5 9.5l5 5m0-5l-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
              <path d="M16 8.5a5 5 0 010 7M18.5 6a8.5 8.5 0 010 12" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            </svg>
          )}
        </button>
        <span className="music__bars" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>,
          document.body
        )}
    </>
  );
}
