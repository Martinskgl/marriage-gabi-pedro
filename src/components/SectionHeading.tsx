type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
};

export function SectionHeading({ eyebrow, title, intro, align = "center" }: Props) {
  return (
    <header className={`heading heading--${align}`} data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="heading__title">{title}</h2>
      {intro && <p className="heading__intro">{intro}</p>}
    </header>
  );
}

/** Faixa de listras verde / oliva / verde, como no save the date. */
export function Stripes() {
  return <div className="stripes" aria-hidden="true" />;
}
