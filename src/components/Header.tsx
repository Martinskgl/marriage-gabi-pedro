"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site, type Locale } from "@/data/site";
import { locales, t } from "@/lib/i18n";

export function Header({ lang }: { lang: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`header ${scrolled ? "header--solid" : ""} ${open ? "header--open" : ""}`}>
      <div className="header__inner">
        <a href="#inicio" className="header__brand" onClick={close}>
          <Image src={site.couple.initials} alt="" width={40} height={35} className="header__monogram" />
          <span>{site.couple.names}</span>
        </a>

        <nav className="header__nav" aria-label="Menu">
          {site.nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={close}>
              {t(item.label, lang)}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <div className="lang">
            {locales.map((l, i) => (
              <span key={l}>
                {i > 0 && <span className="lang__sep">/</span>}
                <Link href={`/${l}`} className={l === lang ? "is-active" : ""} aria-current={l === lang ? "true" : undefined}>
                  {l.toUpperCase()}
                </Link>
              </span>
            ))}
          </div>
          <a href={site.links.rsvp} className="btn btn--solid btn--small header__rsvp">
            RSVP
          </a>
          <button
            type="button"
            className="header__toggle"
            aria-label={t(open ? site.ui.close : site.ui.menu, lang)}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
