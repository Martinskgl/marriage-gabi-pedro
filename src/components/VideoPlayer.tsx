"use client";

import { site, type Locale } from "@/data/site";
import { t } from "@/lib/i18n";
import { MediaFrame } from "./MediaFrame";

export const PAUSE_MUSIC_EVENT = "wedding:pause-music";

export function VideoPlayer({ lang }: { lang: Locale }) {
  const { src, poster } = site.video;

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
        className="video__frame"
        src={src}
        poster={poster.src}
        controls
        playsInline
        preload="metadata"
        aria-label={t(site.ui.playVideo, lang)}
        style={{ aspectRatio: `${poster.width} / ${poster.height}` }}
        // A música de fundo pausa quando o vídeo começa
        onPlay={() => window.dispatchEvent(new Event(PAUSE_MUSIC_EVENT))}
      />
    </div>
  );
}
