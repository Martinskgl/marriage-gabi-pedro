"use client";

import { useEffect, useRef, useState } from "react";
import { site, type Locale } from "@/data/site";
import { t } from "@/lib/i18n";
import { PAUSE_MUSIC_EVENT } from "./VideoPlayer";

export function MusicPlayer({ lang }: { lang: Locale }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const pause = () => audio.current?.pause();
    window.addEventListener(PAUSE_MUSIC_EVENT, pause);
    return () => window.removeEventListener(PAUSE_MUSIC_EVENT, pause);
  }, []);

  const toggle = async () => {
    const el = audio.current;
    if (!el || missing) return;
    if (el.paused) {
      try {
        await el.play();
      } catch {
        setMissing(true);
      }
    } else {
      el.pause();
    }
  };

  const label = missing ? t(site.ui.musicMissing, lang) : t(playing ? site.ui.pause : site.ui.play, lang);

  return (
    <div className={`music ${playing ? "is-playing" : ""} ${missing ? "is-missing" : ""}`}>
      <audio
        ref={audio}
        src={site.music.src}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setMissing(true);
          setPlaying(false);
        }}
      />
      <button type="button" className="music__button" onClick={toggle} aria-label={label} title={label}>
        {playing ? (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M7 5h3v14H7zM14 5h3v14h-3z" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        )}
      </button>
      {(site.music.title || site.music.artist) && (
        <div className="music__info">
          <span className="music__title">{site.music.title}</span>
          <span className="music__artist">{site.music.artist}</span>
        </div>
      )}
      <span className="music__bars" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}
