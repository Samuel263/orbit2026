// Server-only: imported ONLY by admin seed function. Runtime client never
// ships this data. Contains the initial content to bootstrap Supabase.
import {
  navCopy, heroCopy, casesCopy, reviewsCopy, clientsCopy, solutionsCopy,
  statsCopy, ctaCopy, footerCopy, clientLogos, projects as seedProjects,
  reviews as seedReviews, solutionIcons,
} from "./site-content";

export const seedContentBlocks: Record<string, unknown> = {
  nav: navCopy,
  hero: heroCopy,
  cases: casesCopy,
  reviews_copy: reviewsCopy,
  clients_copy: clientsCopy,
  solutions_intro: Object.fromEntries(
    Object.entries(solutionsCopy).map(([lang, v]) => [lang, { title1: v.title1, title2: v.title2, sub: v.sub }]),
  ),
  stats: statsCopy,
  cta: ctaCopy,
  footer: footerCopy,
};

export const seedProjectsData = seedProjects.map((p, i) => ({
  name: p.name, url: p.url, domain: p.domain, image_url: null, position: i, featured: i < 3,
}));

export const seedReviewsData = seedReviews.map((r, i) => ({
  name: r.name, initial: r.initial, color: r.color, date_label: r.date, text_body: r.text, position: i,
}));

export const seedClientsData = clientLogos.map((c, i) => ({
  name: c.name,
  logo_url: null as string | null,
  logo_asset_key: c.src as unknown as string, // resolved to storage upload path in admin fn
  position: i,
}));

// Solutions: 12 items, i18n per language from solutionsCopy.items[i]
export const seedSolutionsData = solutionIcons.map((path, i) => ({
  icon_svg_path: path,
  position: i,
  i18n: Object.fromEntries(
    Object.entries(solutionsCopy).map(([lang, v]) => [lang, { title: v.items[i]?.t ?? "", description: v.items[i]?.d ?? "" }]),
  ),
}));

export const seedSiteSettings = {
  whatsapp_number: "56900000000",
  whatsapp_message: {
    es: "Hola! Quiero cotizar un proyecto.",
    en: "Hi! I'd like to get a quote.",
    pt: "Olá! Quero um orçamento.",
    fr: "Bonjour ! Je voudrais un devis.",
    de: "Hallo! Ich möchte ein Angebot.",
    it: "Ciao! Vorrei un preventivo.",
  },
  default_lang: "es",
};

export const seedSeoPages: Array<{ path: string; i18n: Record<string, { title: string; description: string }> }> = [
  {
    path: "/",
    i18n: {
      es: { title: "Agencia de Diseño Web", description: "Mejoramos tu imagen digital para que se vea moderna y profesional." },
      en: { title: "Web Design Agency", description: "We upgrade your digital image so it looks modern and professional." },
      pt: { title: "Agência de Design Web", description: "Melhoramos sua imagem digital." },
      fr: { title: "Agence de Design Web", description: "Nous améliorons votre image digitale." },
      de: { title: "Web-Design-Agentur", description: "Wir verbessern dein digitales Erscheinungsbild." },
      it: { title: "Agenzia di Web Design", description: "Miglioriamo la tua immagine digitale." },
    },
  },
  {
    path: "/portafolio",
    i18n: {
      es: { title: "Portafolio — Agencia de Diseño Web", description: "Todos los proyectos que hemos construido con marcas reales." },
      en: { title: "Portfolio — Web Design Agency", description: "Every project we've built with real brands." },
    },
  },
  {
    path: "/opiniones",
    i18n: {
      es: { title: "Opiniones — Agencia de Diseño Web", description: "Todas las reseñas de quienes ya han trabajado con nosotros." },
      en: { title: "Reviews — Web Design Agency", description: "All reviews from people we've worked with." },
    },
  },
];

// Client-side asset paths that should be uploaded to Storage on seed.
export const seedAssetsToUpload = clientLogos.map((c) => ({
  name: c.name,
  clientPath: c.src as unknown as string,
}));
