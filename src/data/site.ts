/**
 * Conteúdo do site — tudo o que aparece nas seções vem daqui.
 *
 * - Textos podem ser uma string única (vale para PT e EN) ou { pt, en }.
 * - Imagens sem `src` aparecem como placeholder com o tamanho indicado.
 *   Para usar uma foto real, coloque o arquivo em /public/photos e preencha `src`.
 * - Links vazios ("") escondem o botão e mostram "A confirmar".
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

const TBC: Text = { pt: "A confirmar", en: "To be confirmed" };
const MAPS_ITANHANGA = "https://www.google.com/maps/search/?api=1&query=Itanhang%C3%A1%20Golf%20Club%2C%20Rio%20de%20Janeiro";

export const site = {
  couple: {
    names: "Gabi & Pedro",
    first: "Gabi",
    second: "Pedro",
    // Versões transparentes geradas a partir do monograma original (/brand/monogram.png)
    monogram: "/brand/monogram-transparent.png",
    initials: "/brand/monogram-initials.png",
    hashtag: "#gabiepedro27",
  },

  wedding: {
    // Data/hora usadas pela contagem regressiva (fuso de Brasília)
    dateISO: "2027-06-26T16:30:00-03:00",
    dateLong: { pt: "26 de junho de 2027", en: "June 26, 2027" },
    dateShort: "26. 06. 2027",
    city: "Rio de Janeiro",
    venue: "Itanhangá Golf Club",
  },

  meta: {
    title: { pt: "Gabi & Pedro · Casamento no Rio de Janeiro", en: "Gabi & Pedro · Wedding in Rio de Janeiro" },
    description: { pt: "26 de junho de 2027 | Rio de Janeiro", en: "June 26, 2027 | Rio de Janeiro" },
  },

  links: {
    rsvp: "#",
    gifts: "", // A confirmar
  },

  tbc: TBC,

  nav: [
    { id: "historia", label: { pt: "História", en: "Story" } },
    { id: "semana", label: { pt: "A semana", en: "The week" } },
    { id: "galeria", label: { pt: "Galeria", en: "Gallery" } },
    { id: "detalhes", label: { pt: "Detalhes", en: "Details" } },
    { id: "viagem", label: { pt: "Viagem", en: "Travel" } },
    { id: "transporte", label: { pt: "Transporte", en: "Transportation" } },
    { id: "hospedagem", label: { pt: "Hospedagem", en: "Stay" } },
    { id: "presentes", label: { pt: "Presentes", en: "Gifts" } },
  ],

  hero: {
    image: { src: "/photos/capa.jpg", width: 900, height: 1200, alt: "Gabi & Pedro" } as Media,
    cta: { pt: "Confirme sua presença", en: "RSVP" },
  },

  story: {
    eyebrow: "01",
    title: { pt: "Nossa história", en: "Our story" },
    // Os selos são da papelaria original (atelier)
    timeline: [
      {
        title: { pt: "Como tudo começou", en: "How it all began" },
        text: [
          {
            pt: "Nossa história começou em 2020, antes mesmo de nos conhecermos pessoalmente.",
            en: "Our story began in 2020, before we had even met in person.",
          },
          {
            pt: "Quando Pedro entrou na Penn State, Gabi mandou uma mensagem convidando-o para fazer parte da associação de estudantes brasileiros da universidade. O que parecia ser apenas uma mensagem de boas-vindas acabou sendo o primeiro capítulo da nossa história.",
            en: "When Pedro started at Penn State, Gabi sent him a message inviting him to join the university's Brazilian student association. What seemed like just a welcome message turned out to be the first chapter of our story.",
          },
          {
            pt: "Nos conhecemos pessoalmente algum tempo depois, no Central Park, em Nova York, pouco antes do início de um novo semestre da faculdade. A conexão foi imediata, e rapidamente nos tornamos amigos.",
            en: "We met in person some time later, in Central Park, in New York, shortly before a new college semester began. The connection was immediate, and we quickly became friends.",
          },
          {
            pt: "Nas primeiras semanas daquele semestre, a amizade cresceu de uma forma muito natural. Em pouco tempo, éramos inseparáveis. Pedro aparecia todos os dias na casa da Gabi, inclusive quando ela nem estava lá, quando ficava conversando com a Luísa, irmã da Gabi, que já parecia saber de alguma coisa antes de nós.",
            en: "In the first weeks of that semester, our friendship grew very naturally. Before long, we were inseparable. Pedro showed up at Gabi's house every day, even when she wasn't there, and would stay chatting with Luísa, Gabi's sister, who already seemed to know something before we did.",
          },
          {
            pt: 'Ela vivia dizendo: "Vocês deveriam ficar juntos. Eu ia amar os almoços de domingo com vocês como casal!"',
            en: 'She kept saying: "You two should be together. I would love Sunday lunches with you as a couple!"',
          },
          {
            pt: "Mas, apesar da torcida, ainda levaríamos quase um ano para perceber o que estava bem na nossa frente.",
            en: "But, despite all the cheering, it would still take us almost a year to realize what was right in front of us.",
          },
        ],
        stamp: "/brand/stamp-penn-state-brand.png",
        image: { src: "/photos/historia-1-como-tudo-comecou.jpg", width: 1350, height: 1800, alt: { pt: "Como tudo começou", en: "How it all began" } } as Media,
      },
      {
        title: { pt: "De melhores amigos a namorados", en: "From best friends to a couple" },
        text: [
          {
            pt: "Durante quase um ano, nossa relação ficou naquele espaço entre uma grande amizade e algo que nenhum dos dois conseguia explicar muito bem.",
            en: "For almost a year, our relationship lived in that space between a great friendship and something neither of us could quite explain.",
          },
          {
            pt: "Até que passamos três meses separados durante as férias de verão da faculdade.",
            en: "Until we spent three months apart during the college summer break.",
          },
          {
            pt: "Foi a distância que nos fez perceber o quanto sentíamos falta um do outro. Quando finalmente nos reencontramos, já não fazia sentido continuar fingindo que éramos apenas amigos. O sentimento era grande demais para ser ignorado.",
            en: "It was the distance that made us realize how much we missed each other. When we finally saw each other again, it no longer made sense to keep pretending we were just friends. The feeling was too big to be ignored.",
          },
          {
            pt: "E foi assim que começamos a namorar.",
            en: "And that is how we started dating.",
          },
          {
            pt: "Desde então, nunca mais tivemos dúvidas de que queríamos construir uma vida juntos.",
            en: "Since then, we have never doubted that we wanted to build a life together.",
          },
        ],
        stamp: "/brand/stamp-central-park-brand.png",
        image: { src: "/photos/historia-2-melhores-amigos.jpg", width: 1350, height: 1800, alt: { pt: "De melhores amigos a namorados", en: "From best friends to a couple" } } as Media,
      },
      {
        title: { pt: "Nossa jornada", en: "Our journey" },
        text: [
          {
            pt: "Nossa história nem sempre foi simples. Dos nossos primeiros quatro anos de relacionamento, três foram vividos à distância.",
            en: "Our story was not always simple. Of our first four years together, three were spent long-distance.",
          },
          {
            pt: "Foram muitas despedidas em aeroportos, chamadas de vídeo, saudades e planos para o próximo reencontro. Vivemos realidades diferentes, enfrentamos desafios e aprendemos, muitas vezes à distância, o que significa escolher alguém todos os dias.",
            en: "There were many goodbyes at airports, video calls, longing and plans for the next reunion. We lived different realities, faced challenges and learned, often from afar, what it means to choose someone every day.",
          },
          {
            pt: "Mas foi também durante esses anos que construímos uma das partes mais bonitas do nosso relacionamento: a certeza de que estávamos do mesmo lado.",
            en: "But it was also during those years that we built one of the most beautiful parts of our relationship: the certainty that we were on the same side.",
          },
          {
            pt: "Aprendemos a nos comunicar, a crescer juntos e a encontrar formas de estar presentes, mesmo quando havia milhares de quilômetros entre nós.",
            en: "We learned to communicate, to grow together and to find ways to be present, even when there were thousands of kilometers between us.",
          },
          {
            pt: "Hoje, quando olhamos para trás, sentimos um carinho enorme por tudo o que vivemos e orgulho da história que construímos.",
            en: "Today, when we look back, we feel enormous affection for everything we lived through and pride in the story we built.",
          },
          {
            pt: "Começamos como dois amigos que não conseguiam ficar longe um do outro. E agora temos a felicidade de dividir a vida, construir nossa família e sonhar com tudo o que ainda está por vir.",
            en: "We started as two friends who couldn't stay away from each other. And now we have the joy of sharing our lives, building our family and dreaming of everything that is still to come.",
          },
        ],
        stamp: "/brand/stamp-ceara-rio.png",
        image: { src: "/photos/historia-3-nossa-jornada.jpg", width: 1616, height: 1080, alt: { pt: "Nossa jornada", en: "Our journey" } } as Media,
      },
      {
        title: { pt: "O pedido de casamento", en: "The proposal" },
        text: [
          {
            pt: "Pedro planejou tudo com muito carinho. Escolheu o anel, compartilhou seus planos com nossos pais e organizou uma noite especial em Miami.",
            en: "Pedro planned everything with great care. He chose the ring, shared his plans with our parents and organized a special night in Miami.",
          },
          {
            pt: "Naquela noite, tínhamos um jantar marcado em um restaurante com estrela Michelin, em Brickell, uma das coisas que mais gostamos de fazer juntos.",
            en: "That night, we had a dinner reservation at a Michelin-starred restaurant in Brickell, one of the things we love doing most together.",
          },
          {
            pt: "Quando chegamos, fomos informados de que nossa mesa ainda não estava pronta e que poderíamos aguardar alguns minutos à beira do rio.",
            en: "When we arrived, we were told our table wasn't ready yet and that we could wait a few minutes by the river.",
          },
          {
            pt: "Enquanto admirávamos a vista, um casal se aproximou. Pareciam estar gravando um vlog de fotografia e perguntaram se poderiam tirar algumas fotos nossas.",
            en: "While we admired the view, a couple approached us. They seemed to be filming a photography vlog and asked if they could take a few pictures of us.",
          },
          {
            pt: "Aceitamos, sem desconfiar de nada.",
            en: "We said yes, without suspecting a thing.",
          },
          {
            pt: "O que a Gabi não sabia era que tudo fazia parte do plano.",
            en: "What Gabi didn't know was that it was all part of the plan.",
          },
          {
            pt: "Ali, em frente ao rio, com uma vista linda, fotógrafos registrando cada segundo e o anel mais lindo do mundo, Pedro fez o pedido.",
            en: "Right there, by the river, with a beautiful view, photographers capturing every second and the most beautiful ring in the world, Pedro proposed.",
          },
          {
            pt: "E, claro, a resposta foi sim!",
            en: "And, of course, the answer was yes!",
          },
        ],
        stamp: "/brand/stamp-miami.png",
        image: { src: "/photos/historia-4-o-pedido.jpg", width: 1200, height: 1800, alt: { pt: "O pedido de casamento", en: "The proposal" } } as Media,
      },
      {
        title: { pt: "Uma mensagem nossa", en: "A message from us" },
        text: [
          {
            pt: "Se tem uma coisa que a nossa história nos ensinou, é que o amor também mora na amizade, na admiração e na escolha de construir uma vida juntos.",
            en: "If there is one thing our story has taught us, it is that love also lives in friendship, in admiration and in the choice to build a life together.",
          },
          {
            pt: "Tivemos a sorte de encontrar um no outro não apenas um grande amor, mas também nosso melhor amigo.",
            en: "We were lucky to find in each other not only a great love, but also our best friend.",
          },
          {
            pt: "E agora, depois de tantos anos, histórias, viagens, despedidas e reencontros, estamos vivendo um dos capítulos mais felizes das nossas vidas.",
            en: "And now, after so many years, stories, trips, goodbyes and reunions, we are living one of the happiest chapters of our lives.",
          },
          {
            pt: "Mal podemos esperar para celebrar esse momento ao lado das pessoas que fazem parte da nossa história.",
            en: "We can hardly wait to celebrate this moment alongside the people who are part of our story.",
          },
        ],
        stamp: "/brand/monogram-initials.png",
        image: { src: "/photos/historia-5-mensagem.jpg", width: 1800, height: 1200, alt: { pt: "Uma mensagem nossa", en: "A message from us" } } as Media,
      },
    ],
    closing: { pt: "Nos vemos no dia 26 de junho! ❤️", en: "See you on June 26! ❤️" },
    cta: { pt: "Veja a semana de eventos", en: "See the wedding week" },
  },

  // Sem conteúdo no documento: segue em lorem ipsum
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
    // Em ordem cronológica; o slide recorta as fotos na proporção 16:10
    slides: [
      "galeria-02-chicago-noite",
      "galeria-12-chicago-selfie",
      "galeria-01-chicago",
      "galeria-03-rio-jantar",
      "galeria-04-barco",
      "galeria-05-penn-state",
      "galeria-06-viagem",
      "galeria-07-viagem",
      "galeria-08-mudanca",
      "galeria-09-miami-casa-nova",
      "galeria-10-pedido",
      "galeria-11-pedido-sim",
    ].map((file, i) => ({ src: `/photos/${file}.jpg`, width: 1600, height: 1000, alt: `Gabi & Pedro ${i + 1}` })) as Media[],
  },

  video: {
    eyebrow: "04",
    title: { pt: "Em movimento", en: "In motion" },
    // Coloque o arquivo em /public/video e preencha `src` (ex.: "/video/nosso-video.mp4")
    // Original em HEVC (H.265); veja o README para converter em H.264
    src: "/video/nosso-video.mov",
    // Sem arquivo de capa: o player mostra o quadro deste segundo antes do play
    posterTime: 16,
    poster: { width: 1920, height: 1080, alt: "Gabi & Pedro" } as Media,
  },

  details: {
    eyebrow: "05",
    title: { pt: "Detalhes", en: "Details" },
    date: { pt: "26 de junho de 2027 (sábado)", en: "June 26, 2027 (Saturday)" },
    items: [
      {
        label: { pt: "Cerimônia", en: "Ceremony" },
        time: { pt: "16h30", en: "4:30 PM" } as Text,
        place: "Itanhangá Golf Club — Rio de Janeiro",
        map: "", // A confirmar
      },
      {
        label: { pt: "Recepção", en: "Reception" },
        time: TBC,
        place: "Itanhangá Golf Club",
        map: "", // A confirmar
      },
    ],
    guests: {
      label: { pt: "Informações aos convidados", en: "Guest information" },
      text: [
        {
          pt: "A cerimônia e a recepção acontecerão no mesmo local.",
          en: "The ceremony and the reception will take place at the same venue.",
        },
        {
          pt: "Pedimos que os convidados cheguem com antecedência para que todos possam acompanhar a cerimônia desde o início.",
          en: "We kindly ask guests to arrive early so that everyone can follow the ceremony from the very beginning.",
        },
      ],
    },
    location: {
      label: { pt: "Localização", en: "Location" },
      rows: [
        { label: { pt: "Cerimônia e recepção", en: "Ceremony and reception" }, value: "Itanhangá Golf Club — Rio de Janeiro." as Text },
        { label: { pt: "Endereço completo e Google Maps", en: "Full address and Google Maps" }, value: TBC },
      ],
    },
    dressCode: {
      label: { pt: "Dress code", en: "Dress code" },
      valueLabel: { pt: "Traje:", en: "Attire:" },
      value: { pt: "Passeio Completo", en: "Formal" },
      text: {
        pt: "Queremos que todos estejam elegantes e confortáveis para celebrar esse dia com a gente!",
        en: "We want everyone to feel elegant and comfortable as they celebrate this day with us!",
      },
      inspirationLabel: { pt: "Inspiração", en: "Inspiration" },
      inspiration: Array.from({ length: 4 }, () => ({ width: 600, height: 800, alt: "Dress code" })) as Media[],
    },
    mapLabel: { pt: "Ver no Google Maps", en: "Open in Google Maps" },
    mapUrl: MAPS_ITANHANGA,
  },

  // Sem conteúdo no documento: segue em lorem ipsum
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

  transport: {
    eyebrow: "07",
    title: { pt: "Transporte", en: "Transportation" },
    items: [
      { label: { pt: "Transfers e vans", en: "Transfers and vans" }, value: TBC },
      { label: { pt: "Estacionamento", en: "Parking" }, value: TBC },
    ],
  },

  accommodation: {
    eyebrow: "08",
    title: { pt: "Hospedagem", en: "Where to stay" },
    label: { pt: "Hotéis recomendados", en: "Recommended hotels" },
    // Preencha quando os hotéis forem confirmados; vazio mostra "A confirmar"
    hotels: [] as {
      name: string;
      area: Text;
      price: Text;
      note: Text;
      link: string;
      image: Media;
    }[],
    cta: { pt: "Reservar", en: "Book now" },
  },

  message: {
    eyebrow: "09",
    title: { pt: "Recado aos convidados", en: "A note to our guests" },
    text: [
      {
        pt: "Estamos muito felizes em poder dividir esse momento com vocês!",
        en: "We are so happy to be able to share this moment with you!",
      },
      {
        pt: "Nossa história foi construída com muito amor, amizade e com a presença de pessoas especiais que fizeram parte de cada etapa do caminho.",
        en: "Our story was built with a lot of love, friendship and the presence of special people who were part of every step of the way.",
      },
      {
        pt: "Ter vocês ao nosso lado nesse dia significa muito para nós, especialmente para aqueles que vão atravessar cidades, estados e até países para celebrar com a gente.",
        en: "Having you by our side on this day means so much to us, especially those who will cross cities, states and even countries to celebrate with us.",
      },
      {
        pt: "Preparamos tudo com muito carinho e esperamos que seja um dia inesquecível para todos nós.",
        en: "We have prepared everything with great care and hope it will be an unforgettable day for all of us.",
      },
    ],
    signature: { pt: "Com amor, Gabi e Pedro. ❤️", en: "With love, Gabi and Pedro. ❤️" },
  },

  rsvp: {
    eyebrow: "10",
    title: { pt: "Confirmação", en: "RSVP" },
    cta: { pt: "Confirmar presença", en: "RSVP" },
  },

  gifts: {
    eyebrow: "11",
    title: { pt: "Lista de presentes", en: "Gift registry" },
    cta: { pt: "Ver lista de presentes", en: "See our registry" },
  },

  music: {
    // Coloque o arquivo em /public/music com este nome (ou altere o caminho)
    src: "/music/nossa-musica.mp3",
    title: "",
    artist: "",
  },

  footer: {
    note: { pt: "Feito com amor para Gabi & Pedro", en: "Made with love for Gabi & Pedro" },
    credits: [
      { label: "Leco Biagioni Eventos Exclusivos", url: "https://www.lecobiagioni.com/pt" },
      { label: { pt: "Desenvolvido por techalive.com.br", en: "Developed by techalive.com.br" }, url: "https://techalive.com.br/" },
    ] as { label: Text; url: string }[],
    rights: { pt: "Todos os direitos reservados.", en: "All rights reserved." },
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
