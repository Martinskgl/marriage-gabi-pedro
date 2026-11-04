import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { MusicPlayer } from "@/components/MusicPlayer";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  Accommodation,
  Details,
  Footer,
  Gallery,
  Gifts,
  Hero,
  Lettering,
  Message,
  Rsvp,
  Story,
  Transport,
  Travel,
  VideoSection,
  Week,
} from "@/components/Sections";
import { isLocale } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <>
      <Header lang={lang} />
      <main>
        <Hero lang={lang} />
        <Story lang={lang} />
        <Lettering />
        <Week lang={lang} />
        <Gallery lang={lang} />
        <VideoSection lang={lang} />
        <Details lang={lang} />
        <Travel lang={lang} />
        <Transport lang={lang} />
        <Accommodation lang={lang} />
        <Message lang={lang} />
        <Rsvp lang={lang} />
        <Gifts lang={lang} />
      </main>
      <Footer lang={lang} />
      <MusicPlayer lang={lang} />
      <ScrollReveal />
    </>
  );
}
