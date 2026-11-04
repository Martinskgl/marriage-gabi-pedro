"use client";

import { useEffect } from "react";

/**
 * Faz os elementos com `data-reveal` aparecerem ao entrar na tela.
 * Variações: up (padrão), left, right, zoom, fade. Atraso via `--reveal-delay`.
 * Sem JavaScript (ou com movimento reduzido), tudo aparece normalmente.
 */
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    root.classList.add("reveal-ready");
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
