"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site, type Locale } from "@/data/site";
import { t } from "@/lib/i18n";
import { MediaFrame } from "./MediaFrame";

const { slides, autoplayMs } = site.gallery;

export function GallerySlider({ lang }: { lang: Locale }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);
  const total = slides.length;

  const go = useCallback((i: number) => setIndex(((i % total) + total) % total), [total]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), autoplayMs);
    return () => clearInterval(id);
  }, [paused, total]);

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const delta = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(delta) > 50) go(index + (delta < 0 ? 1 : -1));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(index + 1);
    if (e.key === "ArrowLeft") go(index - 1);
  };

  return (
    <div
      className="slider"
      role="region"
      aria-roledescription="carousel"
      aria-label={t(site.gallery.title, lang)}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="slider__viewport" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        <div className="slider__track" style={{ "--i": index } as React.CSSProperties}>
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`slider__slide ${i === index ? "is-active" : ""}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${total}`}
              aria-hidden={i !== index}
              onClick={() => i !== index && go(i)}
            >
              <MediaFrame media={slide} lang={lang} sizes="(max-width: 768px) 90vw, 70vw" />
            </div>
          ))}
        </div>
      </div>

      <div className="slider__controls">
        <button type="button" className="slider__arrow" aria-label={t(site.ui.prev, lang)} onClick={() => go(index - 1)}>
          ←
        </button>
        <span className="slider__count">
          {String(index + 1).padStart(2, "0")} <span>/</span> {String(total).padStart(2, "0")}
        </span>
        <button type="button" className="slider__arrow" aria-label={t(site.ui.next, lang)} onClick={() => go(index + 1)}>
          →
        </button>
      </div>

      <div className="slider__dots">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={i === index ? "is-active" : ""}
            aria-label={`${t(site.ui.goTo, lang)} ${i + 1}`}
            aria-current={i === index}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  );
}
