import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Accommodation, Details, Footer, Gallery, Gifts, Guestbook, Hero, Intro, Message, Rsvp, Story } from "@/components/Sections";
import { isLocale } from "@/lib/i18n";

// Ocultas nesta versão (voltam quando houver informação): Week, VideoSection, Travel, Transport
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <>
      <Header lang={lang} />
      <main>
        <Hero lang={lang} />
        <Intro lang={lang} />
        <Details lang={lang} />
        <Gallery lang={lang} />
        <Message lang={lang} />
        <Guestbook lang={lang} />
        <Accommodation lang={lang} />
        <Story lang={lang} />
        <Gifts lang={lang} />
        <Rsvp lang={lang} />
      </main>
      <Footer lang={lang} />
      <ScrollReveal />
    </>
  );
}
