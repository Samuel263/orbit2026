import clientInovep from "@/assets/client-inovep.png";
import clientNorteyLogistica from "@/assets/client-norteylogistica.png";
import clientGdudex from "@/assets/client-gdudex.png";

// ============================================================
// SHARED I18N + CONTENT
// ============================================================
export const navCopy = {
 es: { portfolio: "Portafolio", about: "Nosotros", reviews: "Opiniones", quote: "Cotizar mi proyecto", quoteShort: "Cotizar" },
en: { portfolio: "Portfolio", about: "About us", reviews: "Reviews", quote: "Quote my project", quoteShort: "Quote" },
pt: { portfolio: "Portfólio", about: "Sobre nós", reviews: "Opiniões", quote: "Orçar meu projeto", quoteShort: "Orçar" },
fr: { portfolio: "Portfolio", about: "À propos", reviews: "Avis", quote: "Devis pour mon projet", quoteShort: "Devis" },
de: { portfolio: "Portfolio", about: "Über uns", reviews: "Bewertungen", quote: "Projekt anfragen", quoteShort: "Anfragen" },
it: { portfolio: "Portfolio", about: "Chi siamo", reviews: "Recensioni", quote: "Preventivo progetto", quoteShort: "Preventivo" },
} as const;

export type Lang = keyof typeof navCopy;

export const heroCopy = {
  es: { headlineTop: "Sitios web que", headlineBottom: "convierten visitantes en clientes.", description: "Mejoramos tu imagen digital para que se vea moderna y profesional haciendo que tu potencial cliente no te cambie por la competencia.", viewPortfolio: "Ver el portafolio", rating: "4.9/5 de satisfacción", clientAlt: "Logo de cliente", mockupAlt: "Vista previa del sitio en laptop" },
  en: { headlineTop: "What if your website", headlineBottom: "were your best salesperson?", description: "We improve your digital image so it looks modern and professional, helping your potential clients choose you over the competition.", viewPortfolio: "View portfolio", rating: "4.9/5 satisfaction", clientAlt: "Client logo", mockupAlt: "Website preview on laptop" },
  pt: { headlineTop: "E se o seu site", headlineBottom: "fosse o seu melhor vendedor?", description: "Melhoramos sua imagem digital para que ela pareça moderna e profissional, fazendo com que seu cliente em potencial não escolha a concorrência.", viewPortfolio: "Ver portfólio", rating: "4.9/5 de satisfação", clientAlt: "Logo do cliente", mockupAlt: "Prévia do site em laptop" },
  fr: { headlineTop: "Et si votre site web", headlineBottom: "était votre meilleur vendeur ?", description: "Nous améliorons votre image digitale pour qu'elle soit moderne et professionnelle, afin que vos clients potentiels ne choisissent pas la concurrence.", viewPortfolio: "Voir le portfolio", rating: "4.9/5 de satisfaction", clientAlt: "Logo client", mockupAlt: "Aperçu du site sur ordinateur portable" },
  de: { headlineTop: "Was, wenn deine Website", headlineBottom: "dein bester Verkäufer wäre?", description: "Wir verbessern dein digitales Erscheinungsbild, damit es modern und professionell wirkt und potenzielle Kunden dich statt der Konkurrenz wählen.", viewPortfolio: "Portfolio ansehen", rating: "4.9/5 Zufriedenheit", clientAlt: "Kundenlogo", mockupAlt: "Website-Vorschau auf einem Laptop" },
  it: { headlineTop: "E se il tuo sito web", headlineBottom: "fosse il tuo miglior venditore?", description: "Miglioriamo la tua immagine digitale rendendola moderna e professionale, così i potenziali clienti scelgono te invece della concorrenza.", viewPortfolio: "Vedi portfolio", rating: "4.9/5 di soddisfazione", clientAlt: "Logo cliente", mockupAlt: "Anteprima del sito su laptop" },
} as const;

export const casesCopy = {
  es: { t1: "Proyectos que", t2: "dejan huella", desc: "Trabajamos con marcas de múltiples rubros, creando experiencias digitales que agilizan flujos de trabajo, elevan la experiencia del usuario y entregan resultados concretos.", view: "Visitar sitio", more: "Ver portafolio completo", allTitle: "Todos nuestros proyectos", allSubtitle: "Una mirada completa a las marcas que hemos llevado al siguiente nivel digital." },
  en: { t1: "Projects that", t2: "leave a mark", desc: "We partner with brands across many industries, crafting digital experiences that streamline workflows, elevate user experience, and deliver concrete results.", view: "Visit site", more: "View full portfolio", allTitle: "All our projects", allSubtitle: "A complete look at the brands we've taken to the next digital level." },
  pt: { t1: "Projetos que", t2: "deixam marca", desc: "Trabalhamos com marcas de vários setores, criando experiências digitais que agilizam fluxos de trabalho, elevam a experiência do usuário e entregam resultados concretos.", view: "Visitar site", more: "Ver portfólio completo", allTitle: "Todos os nossos projetos", allSubtitle: "Um olhar completo sobre as marcas que levamos ao próximo nível digital." },
  fr: { t1: "Des projets qui", t2: "laissent une trace", desc: "Nous travaillons avec des marques de tous horizons, en créant des expériences digitales qui fluidifient les processus, élèvent l'expérience utilisateur et livrent des résultats concrets.", view: "Visiter le site", more: "Voir le portfolio complet", allTitle: "Tous nos projets", allSubtitle: "Un regard complet sur les marques que nous avons fait passer au niveau supérieur." },
  de: { t1: "Projekte, die", t2: "Spuren hinterlassen", desc: "Wir arbeiten mit Marken aus vielen Branchen und gestalten digitale Erlebnisse, die Abläufe vereinfachen, das Nutzererlebnis steigern und greifbare Ergebnisse liefern.", view: "Website besuchen", more: "Gesamtes Portfolio ansehen", allTitle: "Alle unsere Projekte", allSubtitle: "Ein vollständiger Blick auf die Marken, die wir digital aufs nächste Level gebracht haben." },
  it: { t1: "Progetti che", t2: "lasciano il segno", desc: "Collaboriamo con marchi di vari settori, creando esperienze digitali che semplificano i flussi, elevano l'esperienza utente e generano risultati concreti.", view: "Visita il sito", more: "Vedi portafoglio completo", allTitle: "Tutti i nostri progetti", allSubtitle: "Uno sguardo completo ai brand portati al livello digitale successivo." },
} as const;

export const reviewsCopy = {
  es: { kicker: "TESTIMONIOS REALES", title1: "De quienes ya", title2: "trabajan con nosotros", excellent: "Excelente", basedOn: "Sobre más de 90 reseñas verificadas.", cta: "Ver todas las reseñas", allTitle: "Todas las reseñas", allSubtitle: "Cada palabra viene de personas reales que confiaron en nuestro trabajo." },
  en: { kicker: "REAL TESTIMONIALS", title1: "From people", title2: "already working with us", excellent: "Excellent", basedOn: "Based on 90+ verified reviews.", cta: "See all reviews", allTitle: "All reviews", allSubtitle: "Every word comes from real people who trusted our work." },
  pt: { kicker: "DEPOIMENTOS REAIS", title1: "De quem já", title2: "trabalha conosco", excellent: "Excelente", basedOn: "Com base em mais de 90 avaliações verificadas.", cta: "Ver todas as avaliações", allTitle: "Todas as avaliações", allSubtitle: "Cada palavra vem de pessoas reais que confiaram em nosso trabalho." },
  fr: { kicker: "TÉMOIGNAGES RÉELS", title1: "De ceux qui", title2: "travaillent déjà avec nous", excellent: "Excellent", basedOn: "Sur la base de plus de 90 avis vérifiés.", cta: "Voir tous les avis", allTitle: "Tous les avis", allSubtitle: "Chaque mot vient de personnes réelles qui nous ont fait confiance." },
  de: { kicker: "ECHTE STIMMEN", title1: "Von Menschen, die", title2: "bereits mit uns arbeiten", excellent: "Ausgezeichnet", basedOn: "Basierend auf über 90 geprüften Bewertungen.", cta: "Alle Bewertungen ansehen", allTitle: "Alle Bewertungen", allSubtitle: "Jedes Wort stammt von echten Menschen, die unserer Arbeit vertraut haben." },
  it: { kicker: "TESTIMONIANZE REALI", title1: "Da chi già", title2: "lavora con noi", excellent: "Eccellente", basedOn: "Sulla base di oltre 90 recensioni verificate.", cta: "Leggi tutte le recensioni", allTitle: "Tutte le recensioni", allSubtitle: "Ogni parola viene da persone reali che si sono fidate del nostro lavoro." },
} as const;

export const clientsCopy = {
  es: { kicker: "TU PROYECTO EN BUENAS MANOS", t1: "Marcas que confían", t2: "en nuestro trabajo." },
  en: { kicker: "YOUR PROJECT IN GOOD HANDS", t1: "Brands that trust", t2: "our work." },
  pt: { kicker: "SEU PROJETO EM BOAS MÃOS", t1: "Marcas que confiam", t2: "no nosso trabalho." },
  fr: { kicker: "VOTRE PROJET ENTRE DE BONNES MAINS", t1: "Des marques qui font confiance", t2: "à notre travail." },
  de: { kicker: "DEIN PROJEKT IN GUTEN HÄNDEN", t1: "Marken, die auf", t2: "unsere Arbeit vertrauen." },
  it: { kicker: "IL TUO PROGETTO IN BUONE MANI", t1: "Marchi che si affidano", t2: "al nostro lavoro." },
} as const;

export const solutionsCopy = {
  es: {
    title1: "Servicios &", title2: "desarrollo digital",
    sub: "Más que sitios web: estrategias digitales hechas a la medida de tu industria.",
    items: [
      { t: "GESTIÓN DE PROPIEDADES", d: "Administra inmuebles fácilmente con herramientas automatizadas." },
      { t: "INTRANET CORPORATIVA", d: "Impulsa la colaboración interna con plataformas a medida para tu equipo." },
      { t: "PORTAL DE EMPLEOS", d: "Conecta empresas y talento con portales intuitivos de búsqueda y postulación." },
      { t: "DESARROLLOS A MEDIDA", d: "Soluciones únicas adaptadas a tus necesidades con código sólido y escalable." },
      { t: "TIENDAS ONLINE", d: "Eleva la experiencia de compra con funcionalidades dinámicas." },
      { t: "VALIDACIÓN DE DATOS", d: "Garantiza la precisión de tu información con procesos automáticos." },
      { t: "GESTIÓN DOCUMENTAL", d: "Organiza y guarda tu información en un sistema centralizado y seguro." },
      { t: "MARKETPLACES", d: "Lanza una plataforma interactiva donde se vende y se compra con fluidez." },
      { t: "CRM & AUTOMATIZACIÓN", d: "Fortalece la relación con clientes mediante un CRM integrado y flujos automáticos." },
      { t: "RESERVAS ONLINE", d: "Permite reservar en línea con sistemas flexibles y confiables." },
      { t: "INTEGRACIÓN DE APIs", d: "Conecta sistemas y aplicaciones vía APIs para optimizar tus procesos." },
      { t: "INTEGRACIONES A MEDIDA", d: "Vinculamos cualquier servicio externo con tu plataforma sin fricciones." },
    ],
  },
  en: {
    title1: "Services &", title2: "digital development",
    sub: "More than websites: digital strategies tailored to your industry.",
    items: [
      { t: "PROPERTY MANAGEMENT", d: "Manage real estate easily with automated tools." },
      { t: "CORPORATE INTRANET", d: "Boost internal collaboration with custom team platforms." },
      { t: "JOB PORTAL", d: "Connect companies and talent with intuitive search and apply portals." },
      { t: "CUSTOM DEVELOPMENT", d: "Unique solutions tailored to your needs with solid, scalable code." },
      { t: "ONLINE STORES", d: "Lift the shopping experience with dynamic features." },
      { t: "DATA VALIDATION", d: "Ensure your information is accurate with automated processes." },
      { t: "DOCUMENT MANAGEMENT", d: "Organize and store your data in a centralized, secure system." },
      { t: "MARKETPLACES", d: "Launch an interactive platform where buying and selling flow smoothly." },
      { t: "CRM & AUTOMATION", d: "Strengthen customer relations with an integrated CRM and automatic flows." },
      { t: "ONLINE BOOKING", d: "Let customers book online with flexible, reliable systems." },
      { t: "API INTEGRATION", d: "Connect systems and apps through APIs to streamline your processes." },
      { t: "CUSTOM INTEGRATIONS", d: "We link any external service with your platform seamlessly." },
    ],
  },
  pt: {
    title1: "Serviços &", title2: "desenvolvimento digital",
    sub: "Mais do que sites: estratégias digitais sob medida para o seu setor.",
    items: [
      { t: "GESTÃO DE PROPRIEDADES", d: "Administre imóveis facilmente com ferramentas automatizadas." },
      { t: "INTRANET CORPORATIVA", d: "Impulsione a colaboração interna com plataformas sob medida." },
      { t: "PORTAL DE EMPREGOS", d: "Conecte empresas e talentos com portais intuitivos." },
      { t: "DESENVOLVIMENTO SOB MEDIDA", d: "Soluções únicas adaptadas com código sólido e escalável." },
      { t: "LOJAS ONLINE", d: "Eleve a experiência de compra com recursos dinâmicos." },
      { t: "VALIDAÇÃO DE DADOS", d: "Garanta a precisão das informações com processos automáticos." },
      { t: "GESTÃO DE DOCUMENTOS", d: "Organize e armazene em um sistema centralizado e seguro." },
      { t: "MARKETPLACES", d: "Lance uma plataforma interativa para vender e comprar com fluidez." },
      { t: "CRM & AUTOMAÇÃO", d: "Fortaleça o relacionamento com um CRM integrado e fluxos automáticos." },
      { t: "RESERVAS ONLINE", d: "Permita reservas online com sistemas flexíveis e confiáveis." },
      { t: "INTEGRAÇÃO DE APIs", d: "Conecte sistemas e aplicações via APIs para otimizar processos." },
      { t: "INTEGRAÇÕES SOB MEDIDA", d: "Vinculamos qualquer serviço externo à sua plataforma sem atrito." },
    ],
  },
  fr: {
    title1: "Services &", title2: "développement digital",
    sub: "Plus que des sites web : des stratégies digitales sur mesure pour votre secteur.",
    items: [
      { t: "GESTION IMMOBILIÈRE", d: "Gérez vos biens facilement avec des outils automatisés." },
      { t: "INTRANET D'ENTREPRISE", d: "Boostez la collaboration interne avec des plateformes sur mesure." },
      { t: "PORTAIL EMPLOI", d: "Connectez entreprises et talents via des portails intuitifs." },
      { t: "DÉVELOPPEMENT SUR MESURE", d: "Des solutions uniques adaptées avec un code solide et évolutif." },
      { t: "BOUTIQUES EN LIGNE", d: "Améliorez l'expérience d'achat avec des fonctionnalités dynamiques." },
      { t: "VALIDATION DE DONNÉES", d: "Garantissez l'exactitude de vos données avec des processus automatisés." },
      { t: "GESTION DOCUMENTAIRE", d: "Organisez et stockez vos données dans un système centralisé et sûr." },
      { t: "MARKETPLACES", d: "Lancez une plateforme interactive de vente et d'achat fluide." },
      { t: "CRM & AUTOMATISATION", d: "Renforcez la relation client avec un CRM intégré et des flux automatiques." },
      { t: "RÉSERVATIONS EN LIGNE", d: "Permettez la réservation en ligne avec des systèmes flexibles." },
      { t: "INTÉGRATION D'APIs", d: "Connectez systèmes et applications via APIs pour optimiser vos processus." },
      { t: "INTÉGRATIONS SUR MESURE", d: "Nous relions tout service externe à votre plateforme sans accroc." },
    ],
  },
  de: {
    title1: "Services &", title2: "digitale Entwicklung",
    sub: "Mehr als Websites: digitale Strategien, maßgeschneidert für deine Branche.",
    items: [
      { t: "IMMOBILIENVERWALTUNG", d: "Verwalte Immobilien einfach mit automatisierten Tools." },
      { t: "FIRMEN-INTRANET", d: "Stärke interne Zusammenarbeit mit maßgeschneiderten Plattformen." },
      { t: "JOBPORTAL", d: "Verbinde Unternehmen und Talente über intuitive Portale." },
      { t: "INDIVIDUELLE ENTWICKLUNG", d: "Einzigartige Lösungen mit solidem, skalierbarem Code." },
      { t: "ONLINESHOPS", d: "Hebe das Einkaufserlebnis mit dynamischen Funktionen." },
      { t: "DATENVALIDIERUNG", d: "Sichere die Genauigkeit deiner Daten mit automatisierten Prozessen." },
      { t: "DOKUMENTENVERWALTUNG", d: "Organisiere und speichere zentral und sicher." },
      { t: "MARKTPLÄTZE", d: "Starte eine interaktive Plattform für reibungsloses Kaufen und Verkaufen." },
      { t: "CRM & AUTOMATISIERUNG", d: "Stärke Kundenbeziehungen mit integriertem CRM und automatischen Abläufen." },
      { t: "ONLINE-BUCHUNG", d: "Lass Kunden flexibel und zuverlässig online buchen." },
      { t: "API-INTEGRATION", d: "Verbinde Systeme und Apps über APIs zur Prozessoptimierung." },
      { t: "INDIVIDUELLE INTEGRATIONEN", d: "Wir verbinden jeden externen Dienst nahtlos mit deiner Plattform." },
    ],
  },
  it: {
    title1: "Servizi &", title2: "sviluppo digitale",
    sub: "Più che siti web: strategie digitali su misura per il tuo settore.",
    items: [
      { t: "GESTIONE IMMOBILIARE", d: "Gestisci immobili facilmente con strumenti automatizzati." },
      { t: "INTRANET AZIENDALE", d: "Potenzia la collaborazione interna con piattaforme su misura." },
      { t: "PORTALE LAVORO", d: "Connetti aziende e talenti con portali intuitivi." },
      { t: "SVILUPPO SU MISURA", d: "Soluzioni uniche con codice solido e scalabile." },
      { t: "NEGOZI ONLINE", d: "Eleva l'esperienza d'acquisto con funzionalità dinamiche." },
      { t: "VALIDAZIONE DATI", d: "Garantisci l'accuratezza dei dati con processi automatici." },
      { t: "GESTIONE DOCUMENTI", d: "Organizza e archivia in un sistema centralizzato e sicuro." },
      { t: "MARKETPLACES", d: "Lancia una piattaforma interattiva di vendita e acquisto fluida." },
      { t: "CRM & AUTOMAZIONE", d: "Rafforza le relazioni con CRM integrato e flussi automatici." },
      { t: "PRENOTAZIONI ONLINE", d: "Permetti prenotazioni online con sistemi flessibili e affidabili." },
      { t: "INTEGRAZIONE API", d: "Connetti sistemi e app via API per ottimizzare i processi." },
      { t: "INTEGRAZIONI SU MISURA", d: "Colleghiamo qualunque servizio esterno alla tua piattaforma senza attriti." },
    ],
  },
} as const;

export const statsCopy = {
  es: { title: "Respaldados por años de experiencia real", items: [{ n: "7", l: "Años en el mercado" }, { n: "+421", l: "Sitios entregados" }, { n: "1", l: "Reembolsos solicitados" }, { n: "+90", l: "Reseñas de 5 estrellas" }] },
  en: { title: "Backed by years of real experience", items: [{ n: "7", l: "Years in the market" }, { n: "+421", l: "Sites delivered" }, { n: "1", l: "Refunds requested" }, { n: "+90", l: "5-star reviews" }] },
  pt: { title: "Apoiados por anos de experiência real", items: [{ n: "7", l: "Anos no mercado" }, { n: "+421", l: "Sites entregues" }, { n: "1", l: "Reembolsos solicitados" }, { n: "+90", l: "Avaliações 5 estrelas" }] },
  fr: { title: "Appuyés par des années d'expérience réelle", items: [{ n: "7", l: "Années sur le marché" }, { n: "+421", l: "Sites livrés" }, { n: "1", l: "Remboursements demandés" }, { n: "+90", l: "Avis 5 étoiles" }] },
  de: { title: "Gestützt auf jahrelange Praxis", items: [{ n: "7", l: "Jahre am Markt" }, { n: "+421", l: "Ausgelieferte Websites" }, { n: "1", l: "Erstattungsanfragen" }, { n: "+90", l: "5-Sterne-Bewertungen" }] },
  it: { title: "Sostenuti da anni di esperienza reale", items: [{ n: "7", l: "Anni sul mercato" }, { n: "+421", l: "Siti consegnati" }, { n: "1", l: "Rimborsi richiesti" }, { n: "+90", l: "Recensioni 5 stelle" }] },
} as const;

export const ctaCopy = {
  es: { title: "¿Quieres impulsar tu marca y conseguir clientes de verdad?", sub: "Revisamos tu idea sin costo y te mostramos cómo llevarla al siguiente nivel.", button: "Reserva tu asesoría gratuita" },
  en: { title: "Ready to boost your brand and attract real clients?", sub: "We review your idea at no cost and show you how to take it to the next level.", button: "Book your free strategy call" },
  pt: { title: "Quer impulsionar sua marca e conquistar clientes de verdade?", sub: "Revisamos sua ideia sem custo e mostramos como levá-la ao próximo nível.", button: "Agende sua consultoria gratuita" },
  fr: { title: "Prêt à booster votre marque et attirer de vrais clients ?", sub: "Nous étudions votre idée gratuitement et vous montrons comment passer au niveau supérieur.", button: "Réservez votre consultation gratuite" },
  de: { title: "Bereit, deine Marke zu pushen und echte Kunden zu gewinnen?", sub: "Wir prüfen deine Idee kostenlos und zeigen dir, wie du sie aufs nächste Level bringst.", button: "Sichere dir deine kostenlose Beratung" },
  it: { title: "Vuoi dare slancio al tuo brand e ottenere veri clienti?", sub: "Valutiamo la tua idea senza impegno e ti mostriamo come portarla al livello successivo.", button: "Prenota la tua consulenza gratuita" },
} as const;

export const footerCopy = {
  es: { nav: { team: "Equipo", contact: "Cotización", reviews: "Reseñas", legal: "Aviso legal" }, rights: "© 2026 — Todos los derechos quedan protegidos." },
  en: { nav: { team: "Team", contact: "Get a quote", reviews: "Reviews", legal: "Legal notice" }, rights: "© 2026 — All rights reserved." },
  pt: { nav: { team: "Equipe", contact: "Orçamento", reviews: "Avaliações", legal: "Aviso legal" }, rights: "© 2026 — Todos os direitos reservados." },
  fr: { nav: { team: "Équipe", contact: "Devis", reviews: "Avis", legal: "Mentions légales" }, rights: "© 2026 — Tous droits réservés." },
  de: { nav: { team: "Team", contact: "Angebot", reviews: "Bewertungen", legal: "Impressum" }, rights: "© 2026 — Alle Rechte vorbehalten." },
  it: { nav: { team: "Team", contact: "Preventivo", reviews: "Recensioni", legal: "Note legali" }, rights: "© 2026 — Tutti i diritti riservati." },
} as const;

// ============================================================
// DATA
// ============================================================
export const clientLogos = [
  { src: clientInovep, name: "Inovep" },
  { src: clientNorteyLogistica, name: "Nortey Logística" },
  { src: clientGdudex, name: "Gdudex" },
];

export const projects = [
  { name: "Inovep", url: "https://inovep.cl", domain: "inovep.cl" },
  { name: "Nortey Logística", url: "https://norteylogistica.cl", domain: "norteylogistica.cl" },
  { name: "Gdudex", url: "https://gdudex.cl", domain: "gdudex.cl" },
  { name: "Lovable", url: "https://lovable.dev", domain: "lovable.dev" },
  { name: "Vercel", url: "https://vercel.com", domain: "vercel.com" },
  { name: "Stripe", url: "https://stripe.com", domain: "stripe.com" },
];

export const reviews = [
  { name: "Caro Sanchez", date: "16 diciembre, 2021", initial: "C", color: "#5b3a2e", text: "Excelente experiencia rápida creativa profesionales y dedicados. Nos leyeron la idea perfectamente y el resultado superó mis expectativas. Estoy muy agradecida y los recomiendo totalmente." },
  { name: "Cristián Melville", date: "25 julio, 2024", initial: "CM", color: "#6b7280", text: "Mi experiencia ha sido excelente, en el pasado he creado páginas web con otras empresas y siempre ha sido muy engorroso, en cambio, acá ha sido una muy buena experiencia. Principalmente por el capital humano, son súper cercanos y tienen empatía con tu proyecto, orientándote y asegurándote que entiendas el paso a paso." },
  { name: "Hernan Azocar", date: "12 mayo, 2023", initial: "HA", color: "#374151", text: "Excelente empresa, la recomiendo 100%. Llevo trabajando con ellos un buen tiempo y han desarrollado más de 6 proyectos web superando mis expectativas. Son un equipo comprometido y profesional, te acompañan en todo momento." },
  { name: "Ignacio Rosas Molina", date: "21 enero, 2022", initial: "IR", color: "#7c3aed", text: "Trabajar con ellos nos brindó seguridad de principio a fin. El profesionalismo del equipo encargado fue total, siempre complaciendo nuestros requerimientos. Lo que destaco en ellos es la disposición y respuesta rápida." },
  { name: "Felipe Faundez Muñoz", date: "4 marzo, 2022", initial: "F", color: "#22c55e", text: "Excelente servicio, fácil de usar y administrar, compatible con móviles y computadores, la página carga rápido, los colores y formas super modernos, el diseñador logró captar nuestro requerimiento a la perfección." },
  { name: "Daniela Pérez", date: "9 agosto, 2024", initial: "DP", color: "#0ea5e9", text: "Equipo súper profesional. Entregaron antes del plazo, con un diseño limpio y moderno. Se nota el cariño con el que trabajan cada proyecto, totalmente recomendados." },
  { name: "Matías Rojas", date: "2 febrero, 2025", initial: "MR", color: "#f97316", text: "Atención impecable, propuestas creativas y entrega puntual. Volvería a trabajar con ellos en cada nuevo proyecto sin dudarlo." },
  { name: "Valeria Soto", date: "18 octubre, 2023", initial: "VS", color: "#db2777", text: "Transformaron por completo nuestra presencia online. El equipo entendió a la primera lo que necesitábamos y nos guió de forma muy clara." },
  { name: "Andrés Núñez", date: "30 junio, 2024", initial: "AN", color: "#0891b2", text: "Excelente comunicación durante todo el proceso. Recibimos un sitio rápido, moderno y muy bien optimizado. Recomendados al 100%." },
];

export const solutionIcons = [
  "M3 21h18M5 21V7l7-4 7 4v14M9 9h2m-2 4h2m-2 4h2m4-8h2m-2 4h2m-2 4h2",
  "M5 4h14a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2zM9 20h6M12 17v3",
  "M9 5h6a2 2 0 012 2v12l-5-3-5 3V7a2 2 0 012-2zM9 9h6M9 13h4",
  "M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14",
  "M3 3h2l2 14h12l2-10H6M9 21a1 1 0 100-2 1 1 0 000 2zM18 21a1 1 0 100-2 1 1 0 000 2z",
  "M4 7c0-1.66 3.58-3 8-3s8 1.34 8 3-3.58 3-8 3-8-1.34-8-3zM4 7v10c0 1.66 3.58 3 8 3s8-1.34 8-3V7M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3",
  "M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6zM14 3v6h6M10 14l2 2 4-4",
  "M3 9l2-5h14l2 5M3 9v11h18V9M3 9h18M9 14h6",
  "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5",
  "M7 3v4M17 3v4M4 9h16M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2zM9 14h2m4 0h2m-8 4h2m4 0h2",
  "M9 3v4H5v4M15 3v4h4v4M9 21v-4H5v-4M15 21v-4h4v-4",
  "M13 10V3L4 14h7v7l9-11h-7z",
];
