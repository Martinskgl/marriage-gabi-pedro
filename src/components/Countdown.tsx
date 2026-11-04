"use client";

import { useEffect, useState } from "react";
import { site, type Locale } from "@/data/site";
import { t } from "@/lib/i18n";

const target = new Date(site.wedding.dateISO).getTime();

function remaining() {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
}

export function Countdown({ lang }: { lang: Locale }) {
  // Começa vazio para o HTML do servidor bater com o do navegador
  const [time, setTime] = useState<ReturnType<typeof remaining> | null>(null);

  useEffect(() => {
    const tick = () => setTime(remaining());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const labels = site.ui.countdown;
  const units = [
    { value: time?.days, label: labels.days },
    { value: time?.hours, label: labels.hours },
    { value: time?.minutes, label: labels.minutes },
    { value: time?.seconds, label: labels.seconds },
  ];

  return (
    <div className="countdown" role="timer">
      {units.map((u) => (
        <div key={t(u.label, "en")} className="countdown__unit">
          <span className="countdown__value">{u.value === undefined ? "00" : String(u.value).padStart(2, "0")}</span>
          <span className="countdown__label">{t(u.label, lang)}</span>
        </div>
      ))}
    </div>
  );
}
