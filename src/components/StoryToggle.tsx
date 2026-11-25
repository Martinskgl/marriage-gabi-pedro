"use client";

import { useId, useState } from "react";

type Props = {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
};

/** Só o título "Nossa história" aparece; o conteúdo abre ao tocar no título. */
export function StoryToggle({ eyebrow, title, children }: Props) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className={`story-toggle ${open ? "is-open" : ""}`}>
      <header className="heading heading--center" data-reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="heading__title">
          <button type="button" className="story-toggle__title" aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}>
            {title}
            <span className="story-toggle__icon" aria-hidden="true" />
          </button>
        </h2>
      </header>
      <div id={id} className="story-toggle__body" inert={!open}>
        <div className="story-toggle__inner">{children}</div>
      </div>
    </div>
  );
}
