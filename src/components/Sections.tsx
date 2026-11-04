import Image from "next/image";
import { site, type Locale } from "@/data/site";
import { t } from "@/lib/i18n";
import { Countdown } from "./Countdown";
import { GallerySlider } from "./GallerySlider";
import { MediaFrame } from "./MediaFrame";
import { SectionHeading, Stripes } from "./SectionHeading";
import { VideoPlayer } from "./VideoPlayer";

type P = { lang: Locale };

export function Hero({ lang }: P) {
  const { hero, couple, wedding } = site;
  return (
    <section id="inicio" className="hero">
      <div className="container hero__grid">
        <div className="hero__text">
          <p className="eyebrow">
            {wedding.city} · {t(wedding.dateLong, lang)}
          </p>
          <h1 className="hero__names">
            <span>{couple.first}</span>
            <span className="hero__amp">&amp;</span>
            <span>{couple.second}</span>
          </h1>
          <p className="hero__tagline">{t(hero.tagline, lang)}</p>
          <p className="hero__venue">{wedding.venue}</p>
          <Countdown lang={lang} />
          <a href={site.links.rsvp} className="btn btn--solid">
            {t(hero.cta, lang)}
          </a>
        </div>

        <div className="hero__visual">
          <div className="arch">
            <MediaFrame media={hero.image} lang={lang} className="arch__media" sizes="(max-width: 900px) 90vw, 40vw" priority />
          </div>
          <Image src="/brand/stamp-ceara-rio.png" alt="" width={180} height={180} className="hero__stamp" />
        </div>
      </div>
      <Stripes />
    </section>
  );
}

export function Story({ lang }: P) {
  const { story } = site;
  return (
    <section id="historia" className="section">
      <div className="container">
        <SectionHeading eyebrow={t(story.eyebrow, lang)} title={t(story.title, lang)} intro={t(story.intro, lang)} />

        <ol className="timeline">
          {story.timeline.map((item, i) => (
            <li key={i} className={`timeline__item ${i % 2 ? "timeline__item--right" : ""}`}>
              <div className="timeline__card" data-reveal={i % 2 ? "left" : "right"}>
                <p className="timeline__date">{item.date}</p>
                <h3 className="timeline__title">{t(item.title, lang)}</h3>
                <p>{t(item.text, lang)}</p>
              </div>
              <div className="timeline__node" data-reveal="zoom">
                <Image src={item.stamp} alt="" width={140} height={140} />
              </div>
              <figure className="timeline__photo" data-reveal={i % 2 ? "right" : "left"}>
                <MediaFrame media={item.image} lang={lang} sizes="(max-width: 900px) 90vw, 40vw" />
              </figure>
            </li>
          ))}
        </ol>

        <div className="center" data-reveal>
          <a href="#semana" className="btn">
            {t(story.cta, lang)}
          </a>
        </div>
      </div>
    </section>
  );
}

export function Lettering() {
  return (
    <div className="lettering" aria-hidden="true" data-reveal="fade">
      <Image src="/brand/de-tantos-lugares-green.png" alt="" width={520} height={520} />
    </div>
  );
}

export function Week({ lang }: P) {
  const { week } = site;
  return (
    <section id="semana" className="section section--night">
      <div className="container">
        <SectionHeading eyebrow={t(week.eyebrow, lang)} title={t(week.title, lang)} intro={t(week.intro, lang)} />
        <div className="week">
          {week.events.map((ev, i) => (
            <article key={i} className={`week__card ${ev.highlight ? "week__card--highlight" : ""}`} data-reveal style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}>
              <p className="eyebrow">{t(ev.day, lang)}</p>
              <p className="week__weekday">{t(ev.weekday, lang)}</p>
              <h3 className="week__title">{t(ev.title, lang)}</h3>
              <p>{t(ev.text, lang)}</p>
            </article>
          ))}
        </div>
        <p className="note">{t(week.note, lang)}</p>
      </div>
    </section>
  );
}

export function Gallery({ lang }: P) {
  return (
    <section id="galeria" className="section section--flush">
      <div className="container">
        <SectionHeading eyebrow={t(site.gallery.eyebrow, lang)} title={t(site.gallery.title, lang)} />
      </div>
      <div data-reveal="fade">
        <GallerySlider lang={lang} />
      </div>
    </section>
  );
}

export function VideoSection({ lang }: P) {
  const { video } = site;
  return (
    <section id="video" className="section section--green">
      <div className="container container--narrow">
        <Image src="/brand/te-amo-mais-lettering.png" alt="" width={360} height={360} className="video__lettering" aria-hidden="true" data-reveal="fade" />
        <SectionHeading eyebrow={t(video.eyebrow, lang)} title={t(video.title, lang)} intro={t(video.text, lang)} />
        <div data-reveal="zoom">
          <VideoPlayer lang={lang} />
        </div>
      </div>
    </section>
  );
}

export function Details({ lang }: P) {
  const { details } = site;
  return (
    <section id="detalhes" className="section">
      <div className="container">
        <SectionHeading eyebrow={t(details.eyebrow, lang)} title={t(details.title, lang)} />
        <div className="details">
          {details.items.map((item, i) => (
            <article key={i} className="card" data-reveal style={{ "--reveal-delay": `${i * 150}ms` } as React.CSSProperties}>
              <p className="eyebrow">{t(item.label, lang)}</p>
              <p className="card__time">{item.time}</p>
              <h3 className="card__place">{item.place}</h3>
              <p className="card__address">{t(item.address, lang)}</p>
              <p className="card__note">{t(item.note, lang)}</p>
              <a href={item.map} target="_blank" rel="noreferrer" className="link">
                {t(details.mapLabel, lang)} ↗
              </a>
            </article>
          ))}

          <article className="card card--wide" data-reveal>
            <p className="eyebrow">{t(details.dressCode.label, lang)}</p>
            <h3 className="card__place">{t(details.dressCode.value, lang)}</h3>
            <p className="card__note">{t(details.dressCode.text, lang)}</p>
            <p className="eyebrow eyebrow--muted">{t(details.dressCode.inspirationLabel, lang)}</p>
            <div className="inspiration">
              {details.dressCode.inspiration.map((m, i) => (
                <MediaFrame key={i} media={m} lang={lang} sizes="(max-width: 700px) 45vw, 20vw" />
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function Travel({ lang }: P) {
  const { travel } = site;
  return (
    <section id="viagem" className="section section--paper">
      <div className="container container--narrow">
        <SectionHeading eyebrow={t(travel.eyebrow, lang)} title={t(travel.title, lang)} intro={t(travel.intro, lang)} />
        <div className="accordion">
          {travel.items.map((item, i) => (
            <details key={i} className="accordion__item" data-reveal style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}>
              <summary>
                <span>
                  <span className="accordion__title">{t(item.title, lang)}</span>
                  <span className="eyebrow">{t(item.subtitle, lang)}</span>
                </span>
                <span className="accordion__icon" aria-hidden="true" />
              </summary>
              <div className="accordion__body">
                {item.body.map((p, j) => (
                  <p key={j}>{t(p, lang)}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Accommodation({ lang }: P) {
  const { accommodation: acc } = site;
  return (
    <section id="hospedagem" className="section">
      <div className="container">
        <SectionHeading eyebrow={t(acc.eyebrow, lang)} title={t(acc.title, lang)} intro={t(acc.intro, lang)} />
        {acc.hotels.map((hotel, i) => (
          <article key={i} className="hotel" data-reveal>
            <MediaFrame media={hotel.image} lang={lang} className="hotel__media" sizes="(max-width: 900px) 90vw, 50vw" />
            <div className="hotel__body">
              <h3 className="hotel__name">{hotel.name}</h3>
              <p className="eyebrow">{t(hotel.area, lang)}</p>
              <p className="hotel__price">{t(hotel.price, lang)}</p>
              <p>{t(hotel.note, lang)}</p>
              <a href={hotel.link} className="btn btn--solid">
                {t(acc.cta, lang)}
              </a>
            </div>
          </article>
        ))}
        <p className="note">{t(acc.disclaimer, lang)}</p>
      </div>
    </section>
  );
}

export function Rsvp({ lang }: P) {
  const { rsvp, couple, wedding } = site;
  return (
    <section id="rsvp" className="section section--night">
      <div className="container">
        <div className="invite" data-reveal="zoom">
          <Image src={couple.monogram} alt={`${couple.names} · ${wedding.dateShort}`} width={220} height={289} className="invite__monogram" />
          <p className="eyebrow">{t(rsvp.eyebrow, lang)}</p>
          <h2 className="heading__title">{t(rsvp.title, lang)}</h2>
          <p>{t(rsvp.text, lang)}</p>
          <a href={site.links.rsvp} className="btn btn--solid">
            {t(rsvp.cta, lang)}
          </a>
        </div>
      </div>
    </section>
  );
}

export function Gifts({ lang }: P) {
  const { gifts } = site;
  return (
    <section id="presentes" className="section">
      <div className="container container--narrow center">
        <SectionHeading eyebrow={t(gifts.eyebrow, lang)} title={t(gifts.title, lang)} intro={t(gifts.text, lang)} />
        <a href={site.links.gifts} className="btn" data-reveal>
          {t(gifts.cta, lang)}
        </a>
      </div>
    </section>
  );
}

export function Footer({ lang }: P) {
  const { couple, wedding, footer } = site;
  return (
    <footer className="footer">
      <Stripes />
      <div className="container footer__inner" data-reveal="fade">
        <p className="footer__names">{couple.names}</p>
        <p className="eyebrow">
          {wedding.city} · {wedding.dateShort}
        </p>
        <nav className="footer__nav" aria-label="Footer">
          {site.nav.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {t(item.label, lang)}
            </a>
          ))}
        </nav>
        <p className="footer__note">{t(footer.note, lang)}</p>
        <p className="footer__credits">{t(footer.credits, lang)}</p>
        <p className="footer__credits">© 2027 {couple.names}</p>
      </div>
    </footer>
  );
}
