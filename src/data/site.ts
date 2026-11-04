/**
 * Conteúdo do site — tudo o que aparece nas seções vem daqui.
 *
 * - Textos podem ser uma string única (vale para PT e EN) ou { pt, en }.
 * - Imagens sem `src` aparecem como placeholder com o tamanho indicado.
 *   Para usar uma foto real, coloque o arquivo em /public/photos e preencha `src`.
 */

export type Locale = "pt" | "en";
export type Text = string | { pt: string; en: string };

export type Media = {
  src?: string;
  width: number;
  height: number;
  alt: Text;
};

const LOREM_SHORT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
const LOREM_LONG =
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus, nulla gravida orci a odio.";

export const site = {
  couple: {
    names: "Gabi & Pedro",
    first: "Gabi",
    second: "Pedro",
    // Versões transparentes geradas a partir do monograma original (/brand/monogram.png)
    monogram: "/brand/monogram-transparent.png",
    initials: "/brand/monogram-initials.png",
  },

  wedding: {
    // Data/hora usadas pela contagem regressiva (fuso de Brasília)
    dateISO: "2027-06-26T16:00:00-03:00",
    dateLong: { pt: "26 de junho de 2027", en: "June 26, 2027" },
    dateShort: "26. 06. 2027",
    city: "Rio de Janeiro",
    venue: "Itanhangá Golf Club",
  },

  meta: {
    title: { pt: "Gabi & Pedro · Casamento no Rio de Janeiro", en: "Gabi & Pedro · Wedding in Rio de Janeiro" },
    description: LOREM_SHORT,
  },

  links: {
    rsvp: "#",
    gifts: "#",
  },

  nav: [
    { id: "historia", label: { pt: "História", en: "Story" } },
    { id: "semana", label: { pt: "A semana", en: "The week" } },
    { id: "galeria", label: { pt: "Galeria", en: "Gallery" } },
    { id: "detalhes", label: { pt: "Detalhes", en: "Details" } },
    { id: "viagem", label: { pt: "Viagem", en: "Travel" } },
    { id: "hospedagem", label: { pt: "Hospedagem", en: "Stay" } },
    { id: "presentes", label: { pt: "Presentes", en: "Gifts" } },
  ],

  hero: {
    tagline: LOREM_SHORT,
    image: { width: 900, height: 1200, alt: "Gabi & Pedro" } as Media,
    cta: { pt: "Confirme sua presença", en: "RSVP" },
  },

  story: {
    eyebrow: "01",
    title: { pt: "Nossa história", en: "Our story" },
    intro: LOREM,
    // Os selos são da papelaria original (atelier)
    timeline: [
      {
        date: "Lorem 2015",
        title: "Lorem ipsum dolor",
        text: LOREM,
        stamp: "/brand/stamp-ceara-rio.png",
        image: { width: 800, height: 600, alt: "Lorem ipsum" } as Media,
      },
      {
        date: "Lorem 2018",
        title: "Consectetur adipiscing",
        text: LOREM,
        stamp: "/brand/stamp-central-park-brand.png",
        image: { width: 800, height: 600, alt: "Lorem ipsum" } as Media,
      },
      {
        date: "Lorem 2020",
        title: "Sed do eiusmod tempor",
        text: LOREM,
        stamp: "/brand/stamp-penn-state-brand.png",
        image: { width: 800, height: 600, alt: "Lorem ipsum" } as Media,
      },
      {
        date: "Lorem 2024",
        title: "Ut enim ad minim",
        text: LOREM,
        stamp: "/brand/stamp-miami.png",
        image: { width: 800, height: 600, alt: "Lorem ipsum" } as Media,
      },
      {
        date: "26. 06. 2027",
        title: "Lorem ipsum, aqui",
        text: LOREM,
        stamp: "/brand/stamp-ceara-rio.png",
        image: { width: 800, height: 600, alt: "Lorem ipsum" } as Media,
      },
    ],
    cta: { pt: "Veja a semana de eventos", en: "See the wedding week" },
  },

  week: {
    eyebrow: "02",
    title: { pt: "A semana", en: "The week" },
    intro: LOREM_SHORT,
    events: [
      { day: { pt: "Dia 1", en: "Day 1" }, weekday: "Lorem", title: "Lorem ipsum", text: LOREM_SHORT, highlight: false },
      { day: { pt: "Dia 2", en: "Day 2" }, weekday: "Lorem", title: "Dolor sit amet", text: LOREM_SHORT, highlight: false },
      { day: { pt: "O casamento", en: "The wedding" }, weekday: { pt: "Sábado", en: "Saturday" }, title: "Gabi & Pedro", text: LOREM_SHORT, highlight: true },
      { day: { pt: "Dia 4", en: "Day 4" }, weekday: "Lorem", title: "Consectetur", text: LOREM_SHORT, highlight: false },
    ],
    note: LOREM_SHORT,
  },

  gallery: {
    eyebrow: "03",
    title: { pt: "Galeria", en: "Gallery" },
    autoplayMs: 5000,
    slides: Array.from({ length: 10 }, (_, i) => ({
      width: 1600,
      height: 1000,
      alt: `Lorem ipsum ${i + 1}`,
    })) as Media[],
  },

  video: {
    eyebrow: "04",
    title: { pt: "Em movimento", en: "In motion" },
    text: LOREM_SHORT,
    // Coloque o arquivo em /public/video e preencha `src` (ex.: "/video/nosso-video.mp4")
    src: "",
    poster: { width: 1920, height: 1080, alt: "Lorem ipsum" } as Media,
  },

  details: {
    eyebrow: "05",
    title: { pt: "Detalhes", en: "Details" },
    items: [
      {
        label: { pt: "Cerimônia", en: "Ceremony" },
        time: "16:00",
        place: "Itanhangá Golf Club",
        address: "Lorem ipsum dolor, 000 · Rio de Janeiro",
        note: LOREM_SHORT,
        map: "https://www.google.com/maps/search/?api=1&query=Itanhang%C3%A1%20Golf%20Club%2C%20Rio%20de%20Janeiro",
      },
      {
        label: { pt: "Recepção", en: "Reception" },
        time: "00:00",
        place: "Itanhangá Golf Club",
        address: "Lorem ipsum dolor, 000 · Rio de Janeiro",
        note: LOREM_SHORT,
        map: "https://www.google.com/maps/search/?api=1&query=Itanhang%C3%A1%20Golf%20Club%2C%20Rio%20de%20Janeiro",
      },
    ],
    dressCode: {
      label: { pt: "Traje", en: "Dress code" },
      value: "Lorem ipsum",
      text: LOREM_SHORT,
      inspirationLabel: { pt: "Inspiração", en: "Inspiration" },
      inspiration: Array.from({ length: 4 }, () => ({ width: 600, height: 800, alt: "Lorem ipsum" })) as Media[],
    },
    mapLabel: { pt: "Ver no Google Maps", en: "Open in Google Maps" },
  },

  travel: {
    eyebrow: "06",
    title: { pt: "Viagem", en: "Travel" },
    intro: LOREM,
    items: [
      { title: "Lorem ipsum dolor", subtitle: "Consectetur adipiscing", body: [LOREM, LOREM_LONG] },
      { title: "Sed do eiusmod", subtitle: "Tempor incididunt", body: [LOREM, LOREM_LONG] },
      { title: "Ut labore et dolore", subtitle: "Magna aliqua", body: [LOREM] },
      { title: "Quis nostrud", subtitle: "Exercitation ullamco", body: [LOREM, LOREM_LONG] },
    ],
  },

  accommodation: {
    eyebrow: "07",
    title: { pt: "Hospedagem", en: "Where to stay" },
    intro: LOREM,
    hotels: [
      {
        name: "Lorem Ipsum Hotel",
        area: "Lorem · Rio de Janeiro",
        price: "Lorem ipsum",
        note: LOREM_SHORT,
        link: "#",
        image: { width: 1200, height: 800, alt: "Lorem ipsum" } as Media,
      },
    ],
    cta: { pt: "Reservar", en: "Book now" },
    disclaimer: LOREM_SHORT,
  },

  rsvp: {
    eyebrow: "08",
    title: { pt: "Confirmação", en: "RSVP" },
    text: LOREM_SHORT,
    cta: { pt: "Confirmar presença", en: "RSVP" },
  },

  gifts: {
    eyebrow: "09",
    title: { pt: "Presentes", en: "Gifts" },
    text: LOREM_SHORT,
    cta: { pt: "Ver lista de presentes", en: "See our registry" },
  },

  music: {
    // Coloque o arquivo em /public/music com este nome (ou altere o caminho)
    src: "/music/nossa-musica.mp3",
    title: "Lorem ipsum",
    artist: "Dolor sit amet",
  },

  footer: {
    note: { pt: "Feito com amor para Gabi & Pedro", en: "Made with love for Gabi & Pedro" },
    credits: "Lorem ipsum · Dolor sit amet",
  },

  ui: {
    countdown: {
      days: { pt: "Dias", en: "Days" },
      hours: { pt: "Horas", en: "Hours" },
      minutes: { pt: "Min", en: "Min" },
      seconds: { pt: "Seg", en: "Sec" },
    },
    prev: { pt: "Anterior", en: "Previous" },
    next: { pt: "Próxima", en: "Next" },
    goTo: { pt: "Ir para a foto", en: "Go to photo" },
    menu: { pt: "Abrir menu", en: "Open menu" },
    close: { pt: "Fechar", en: "Close" },
    play: { pt: "Tocar música", en: "Play music" },
    pause: { pt: "Pausar música", en: "Pause music" },
    playVideo: { pt: "Assistir ao vídeo", en: "Play video" },
    musicMissing: { pt: "Arquivo de música ainda não adicionado", en: "Music file not added yet" },
  },
};

export type SiteData = typeof site;
