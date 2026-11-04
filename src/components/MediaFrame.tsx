import Image from "next/image";
import type { Locale, Media } from "@/data/site";
import { t } from "@/lib/i18n";

type Props = {
  media: Media;
  lang: Locale;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** Mostra a imagem quando `src` existe; caso contrário, um placeholder com o tamanho indicado. */
export function MediaFrame({ media, lang, className = "", sizes = "100vw", priority }: Props) {
  const style = { aspectRatio: `${media.width} / ${media.height}` };
  const alt = t(media.alt, lang);

  if (media.src) {
    return (
      <div className={`media ${className}`} style={style}>
        <Image src={media.src} alt={alt} fill sizes={sizes} priority={priority} />
      </div>
    );
  }

  return (
    <div className={`media media--placeholder ${className}`} style={style} role="img" aria-label={alt}>
      <span className="media__size">
        {media.width} × {media.height}
      </span>
    </div>
  );
}
