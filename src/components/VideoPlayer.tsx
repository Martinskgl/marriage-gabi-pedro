"use client";

import { useEffect, useRef } from "react";
import { site, type Locale } from "@/data/site";
import { t } from "@/lib/i18n";
import { MediaFrame } from "./MediaFrame";

export const PAUSE_MUSIC_EVENT = "wedding:pause-music";

export function VideoPlayer({ lang }: { lang: Locale }) {
  const { src, poster, posterTime } = site.video;
  const started = useRef(false);
  const video = useRef<HTMLVideoElement>(null);

  // Sem imagem de capa: mostra o quadro de `posterTime` antes do primeiro play
  const showPosterFrame = () => {
    const el = video.current;
    if (el && !poster.src && posterTime && !started.current) el.currentTime = posterTime;
  };

  useEffect(() => {
    // Os metadados podem ter carregado antes da hidratação
    if (video.current && video.current.readyState >= 1) showPosterFrame();
  });

  if (!src) {
    return (
      <div className="video">
        <MediaFrame media={poster} lang={lang} className="video__frame" />
        <span className="video__play" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        </span>
      </div>
    );
  }

  return (
    <div className="video">
      <video
        ref={video}
        className="video__frame"
        src={src}
        poster={poster.src}
        controls
        playsInline
        preload="metadata"
        aria-label={t(site.ui.playVideo, lang)}
        style={{ aspectRatio: `${poster.width} / ${poster.height}` }}
        onLoadedMetadata={showPosterFrame}
        onPlay={(e) => {
          if (!started.current) {
            started.current = true;
            // Começa do início, não do quadro de capa
            if (!poster.src && posterTime) e.currentTarget.currentTime = 0;
          }
          // A música de fundo pausa quando o vídeo começa
          window.dispatchEvent(new Event(PAUSE_MUSIC_EVENT));
        }}
      />
    </div>
  );
}
