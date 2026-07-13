import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import type { PointerEvent } from "react";
import logoAsset from "@/assets/logo.png";
import videoBg from "@/assets/white-waves-bg.mp4";
import transportesAykImage from "@/assets/TransportesAYK.png";
import InovepImage from "@/assets/Inovep.png";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MouseFollowCursor } from "@/components/MouseFollowCursor";
import { useSiteLanguage } from "@/hooks/use-site-language";
import { useRevealOnScroll } from "@/hooks/use-reveal";
import { siteStyles } from "@/lib/site-styles";
import {
  heroCopy, casesCopy, reviewsCopy, solutionsCopy, statsCopy, ctaCopy, navCopy, clientsCopy,
  clientLogos, projects, reviews, solutionIcons,
} from "@/lib/site-content";


type HeroTrailCard =
  | { type: "text"; eyebrow: string; title: string; tone: "pink" | "green" | "white" }
  | { type: "image"; src: string; alt: string; tone: "pink" | "green" | "white" };

type HeroTrailInstance = {
  id: number;
  x: number;
  y: number;
  rotate: number;
  card: HeroTrailCard;
};

const heroTrailCards: HeroTrailCard[] = [
  { type: "text", eyebrow: "Opiniones", title: "+98 reseñas positivas", tone: "pink" },
  { type: "image", src: transportesAykImage, alt: "Transportes A&K preview", tone: "green" },
  { type: "text", eyebrow: "Entrega", title: "Sitios listos en semanas", tone: "white" },
    { type: "image", src: InovepImage, alt: "Inovep", tone: "green" },
  { type: "text", eyebrow: "Experiencia", title: "6 años creando marcas web", tone: "green" },
      { type: "image", src: InovepImage, alt: "Inovep", tone: "green" },
  { type: "text", eyebrow: "Proyectos", title: "+120 sitios publicados", tone: "pink" },
    { type: "image", src: InovepImage, alt: "Inovep", tone: "green" },
  { type: "text", eyebrow: "Resultado", title: "Más clientes, menos fricción", tone: "white" },
    { type: "image", src: InovepImage, alt: "Inovep", tone: "green" },
  { type: "text", eyebrow: "Diseño", title: "Presencia premium desde el primer scroll", tone: "green" },
];


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agencia de Diseño Web" },
      { name: "description", content: "Mejoramos tu imagen digital para que se vea moderna y profesional." },
    ],
  }),
  component: Index,
});

function Index() {
  const { language, onLanguageChange } = useSiteLanguage();
  const [heroTrail, setHeroTrail] = useState<HeroTrailInstance[]>([]);
  const trailSequenceRef = useRef(0);
  const lastTrailAtRef = useRef(0);
  const t = heroCopy[language] ?? heroCopy.es;
  const tc = casesCopy[language] ?? casesCopy.es;
  const tr = reviewsCopy[language] ?? reviewsCopy.es;
  const ts = solutionsCopy[language] ?? solutionsCopy.es;
  const tst = statsCopy[language] ?? statsCopy.es;
  const tcta = ctaCopy[language] ?? ctaCopy.es;
  const tcl = clientsCopy[language] ?? clientsCopy.es;
  useRevealOnScroll();

  const featuredProjects = projects.slice(0, 3);
  const featuredReviews = reviews.slice(0, 6);
  const handleHeroTrailMove = useCallback((event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    if ((event.target as Element).closest(".hero-no-trail")) return;

    const now = Date.now();
    if (now - lastTrailAtRef.current < 260) return;
    lastTrailAtRef.current = now;

    const rect = event.currentTarget.getBoundingClientRect();
    const sequence = trailSequenceRef.current;
    const card = heroTrailCards[sequence % heroTrailCards.length];
    const id = now + sequence;
    const isImageCard = card.type === "image";
    const cardWidth = isImageCard ? 260 : 228;
    const cardHeight = isImageCard ? 170 : 122;
    const x = Math.max(12, Math.min(rect.width - cardWidth - 12, event.clientX - rect.left - 150));
    const y = Math.max(12, Math.min(rect.height - cardHeight - 12, event.clientY - rect.top + 22));
    const rotate = ((sequence % 7) - 3) * 2.5;

    trailSequenceRef.current = sequence + 1;
    setHeroTrail((items) => [...items.slice(-5), { id, x, y, rotate, card }]);

    window.setTimeout(() => {
      setHeroTrail((items) => items.filter((item) => item.id !== id));
    }, 2200);
  }, []);

  return (
    <div className="relative isolate min-h-screen text-foreground">
      <div className="site-noise" aria-hidden="true" />

      <SiteNav language={language} onLanguageChange={onLanguageChange} />

      {/* Fixed background video — visible only through the hero frame cut-out */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover" src={videoBg} />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(11, 18, 38, 0.75)" }} />
      </div>

      {/* HERO — centered, no laptop, floating cards on hover */}
      <div className="relative z-10 px-2 sm:px-3 md:px-4 pt-2 sm:pt-3 md:pt-4">
        <section
          className="relative overflow-hidden rounded-3xl hero-stage"
          onPointerMoveCapture={handleHeroTrailMove}
          style={{ boxShadow: "0 0 0 100vmax #F7F6F4" }}
        >
          <div className="hero-noise absolute inset-0 pointer-events-none z-[1]" aria-hidden="true" />

          <div className="hero-trail-hitarea absolute inset-0 z-[2]" aria-hidden="true" />
          <div className="hero-trail-layer absolute inset-0 z-[3] pointer-events-none" aria-hidden="true">
            {heroTrail.map((item) => (
              <div
                key={item.id}
                className={`hero-trail-card hero-trail-card--${item.card.tone}${item.card.type === "image" ? " hero-trail-card--image" : ""}`}
                style={{ left: item.x, top: item.y, ["--card-rotate" as string]: `${item.rotate}deg` }}
              >
                {item.card.type === "text" ? (
                  <>
                    <span className="hero-trail-card__eyebrow">{item.card.eyebrow}</span>
                    <span className="hero-trail-card__title">{item.card.title}</span>
                  </>
                ) : (
                  <img src={item.card.src} alt={item.card.alt} className="hero-trail-card__image" loading="lazy" />
                )}
              </div>
            ))}
          </div>

          <main className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 md:px-12 pt-24 sm:pt-28 lg:pt-32 pb-20 sm:pb-28">
            <div className="max-w-3xl mx-auto">
              <h1 className="hero-no-trail font-mammoth leading-[1.08] tracking-[-0.01em] text-[30px] sm:text-[44px] md:text-[56px] lg:text-[64px] hero-title">
                <span className="text-white hero-line hero-line-1">
                  Sitios web que{" "}
                </span>
                <span className="hero-line hero-line-2 overflow-visible" style={{ color: "#EC4392" }}>
                  convierten visitantes en clientes
                </span>
                <span className="text-[#EC4392] hero-line hero-line-3">.</span>
              </h1>
              <p className="hero-no-trail mt-6 text-sm sm:text-base text-white/85 leading-relaxed max-w-xl mx-auto">{t.description}</p>
              <div className="hero-no-trail mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <a href="#cotizar" className="btn-sweep bg-[var(--pink)] transition px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-medium text-white rounded-full" style={{ ["--sweep-bg" as string]: "#ffffff", ["--sweep-fg" as string]: "#000000" }}>
                  <span className="btn-sweep-label">{(navCopy[language] ?? navCopy.es).quote}</span>
                </a>
                <Link to="/portafolio" className="btn-sweep border border-white/80 transition px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-medium text-white rounded-full" style={{ ["--sweep-bg" as string]: "#ffffff", ["--sweep-fg" as string]: "#000000" }}>
                  <span className="btn-sweep-label">{t.viewPortfolio}</span>
                </Link>
              </div>
              <div className="hero-no-trail mt-8 flex justify-center">
                <div className="google-pill-wrap relative inline-flex items-center justify-center rounded-full p-2">
                  <div className="google-pill-backdrop absolute inset-0 rounded-full" aria-hidden="true" />
                  <div className="google-pill relative inline-flex items-center gap-2.5 rounded-full pl-2 pr-4 py-2">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white shrink-0" aria-hidden="true">
                    <svg viewBox="0 0 48 48" className="w-4 h-4">
                      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
                    </svg>
                  </span>
                  <div className="flex gap-0.5 text-[#F0AD4E] text-[13px] leading-none">
                    {"★★★★★".split("").map((s, i) => (<span key={i}>{s}</span>))}
                  </div>
                  <span className="text-white text-sm font-semibold leading-none">4.9</span>
                  <span className="text-white text-sm font-medium leading-none">+98 reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </section>
      </div>

      {/* CLIENTS — dark logo cards, two rows, opposite marquees */}
      <section className="relative z-10 bg-[#F7F6F4] text-neutral-900 py-14 sm:py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="flex justify-center" data-reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#EC4392]/10 px-3.5 py-1 text-[10px] font-bold tracking-[0.24em] text-[#EC4392]">
              <span aria-hidden="true">✦</span>{tcl.kicker}
            </span>
          </div>
          <h2 data-reveal style={{ transitionDelay: "100ms" }} className="mt-4 text-center font-mammoth leading-[1.05] tracking-tight text-[26px] sm:text-[32px] md:text-[38px] lg:text-[42px]">
            <span style={{ color: "#EC4392" }}>{tcl.t1}</span> <span className="text-neutral-900">{tcl.t2}</span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 mt-8 sm:mt-10 space-y-3 sm:space-y-4">
          <div className="client-strip overflow-hidden">
            <div className="client-marquee flex w-max items-center gap-3 sm:gap-4">
              {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((c, i) => (
                <div key={`r1-${i}`} className="flex h-14 sm:h-16 w-36 sm:w-44 md:w-48 shrink-0 items-center justify-center rounded-xl bg-[#1A1A1A]">
                  <img src={c.src} alt={`${t.clientAlt}: ${c.name}`} className="max-h-8 sm:max-h-10 max-w-[70%] object-contain client-logo-white" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
          <div className="client-strip overflow-hidden">
            <div className="client-marquee-reverse flex w-max items-center gap-3 sm:gap-4">
              {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((c, i) => (
                <div key={`r2-${i}`} className="flex h-14 sm:h-16 w-36 sm:w-44 md:w-48 shrink-0 items-center justify-center rounded-xl bg-[#1A1A1A]">
                  <img src={c.src} alt={`${t.clientAlt}: ${c.name}`} className="max-h-8 sm:max-h-10 max-w-[70%] object-contain client-logo-white" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {[
            { n: tst.items[1].n, l: tst.items[1].l, bg: "#EC4392", fg: "#ffffff", accent: "#ffffff" },
            { n: tst.items[0].n, l: tst.items[0].l, bg: "#1A1A1A", fg: "#ffffff", accent: "#ffffff" },
            { n: tst.items[3].n, l: tst.items[3].l, bg: "#ffffff", fg: "#1A1A1A", accent: "#EC4392" },
          ].map((s, i) => (
            <div key={i} data-reveal style={{ transitionDelay: `${i * 100}ms`, backgroundColor: s.bg, color: s.fg }} className="rounded-3xl px-6 sm:px-7 py-5 sm:py-6">
              <p className="font-mammoth text-3xl sm:text-4xl md:text-5xl leading-none" style={{ color: s.accent }}>{s.n}</p>
              <p className="mt-1.5 text-xs sm:text-sm opacity-90">{s.l}</p>
            </div>
          ))}
        </div>
      </section>



      {/* CASES */}
      <section id="portafolio" className="relative z-10 px-4 sm:px-6 md:px-12 py-20 sm:py-28 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-left max-w-3xl">
            <h2 data-reveal className="font-mammoth leading-[1.05] tracking-tight text-[34px] sm:text-[44px] md:text-[54px] lg:text-[64px]">
              <span className="block text-white text-[0.92em]">{tc.t1}</span>
              <span className="block pt-[0.18em] -mt-[0.18em] overflow-visible" style={{ color: "#EC4392" }}>{tc.t2}</span>
            </h2>
            <p data-reveal style={{ transitionDelay: "120ms" }} className="mt-5 text-base sm:text-lg text-white/85 leading-relaxed">{tc.desc}</p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-[1fr_1.4fr_1fr] lg:items-center">
            {featuredProjects.map((p, i) => (
              <div key={p.domain} data-reveal style={{ transitionDelay: `${i * 140}ms` }} className={i === 1 ? "lg:z-10" : ""}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="project-card mac-window group relative block rounded-2xl overflow-hidden border border-white/10 bg-[#0e0b1a]">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-white/[0.04]">
                    <span className="size-3 rounded-full bg-[#ff5f57]" />
                    <span className="size-3 rounded-full bg-[#febc2e]" />
                    <span className="size-3 rounded-full bg-[#28c840]" />
                    <div className="ml-3 flex-1 h-6 rounded-md bg-white/[0.06] border border-white/10 px-3 flex items-center text-[11px] text-white/60 truncate">{p.domain}</div>
                  </div>
                  <div className="relative aspect-[16/10] bg-[#0a0814] overflow-hidden">
                    <img src={`https://image.thum.io/get/width/1200/crop/750/noanimate/${p.url}`} alt={`${p.name} preview`} className="project-card-img absolute inset-0 w-full h-full object-cover object-top" loading="lazy" />
                    <div className="absolute inset-0 flex items-center justify-center bg-[rgba(5,12,31,0.55)] opacity-0 group-hover:opacity-100 transition-opacity duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                      <span className="bg-[var(--pink)] text-white px-6 py-3 text-sm font-medium translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ borderRadius: "18px" }}>
                        {tc.view} →
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>

          <div className="mt-14 flex justify-center" data-reveal>
            <Link to="/portafolio" className="btn-sweep bg-[var(--pink)] transition px-8 py-4 text-sm font-semibold tracking-[0.18em] text-white" style={{ borderRadius: "18px", ["--sweep-bg" as string]: "#ffffff", ["--sweep-fg" as string]: "#000000" }}>
              <span className="btn-sweep-label">{tc.more}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="opiniones" className="relative z-10 bg-[#F7F6F4] text-neutral-900 px-4 sm:px-6 md:px-12 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto grid gap-12 lg:gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div data-reveal>
            <div className="flex flex-col items-start gap-3">
              <div className="flex gap-1 text-[#F0AD4E] text-2xl">{"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}</div>
              <p className="text-3xl sm:text-4xl font-black tracking-tight">{tr.excellent}</p>
              <p className="text-sm text-neutral-600">{tr.basedOn}</p>
            </div>
            <div className="my-8 h-px w-full bg-neutral-200" />
            <p className="text-xs sm:text-sm tracking-[0.2em] font-bold text-neutral-900">{tr.kicker}</p>
            <h2 className="mt-3 font-mammoth leading-[1.05] tracking-tight text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px]">
              <span className="block text-neutral-900">{tr.title1}</span>
              <span className="block" style={{ color: "#EC4392" }}>{tr.title2}</span>
            </h2>
            <Link to="/opiniones" className="btn-sweep mt-8 inline-block border border-neutral-900 transition px-6 py-3 text-xs sm:text-sm font-semibold tracking-[0.18em] text-neutral-900" style={{ borderRadius: "18px", ["--sweep-bg" as string]: "#0a0a0a", ["--sweep-fg" as string]: "#ffffff" }}>
              <span className="btn-sweep-label">{tr.cta}</span>
            </Link>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
            {featuredReviews.map((r, i) => (
              <article key={`${r.name}-${i}`} data-reveal style={{ transitionDelay: `${i * 80}ms` }} className="mb-5 break-inside-avoid rounded-2xl border border-neutral-200 bg-white p-5">
                <header className="flex items-center gap-3">
                  <div className="grid size-11 shrink-0 place-items-center rounded-full text-white text-sm font-semibold" style={{ backgroundColor: r.color }}>{r.initial}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex gap-0.5 text-[#F0AD4E] text-sm">{"★★★★★".split("").map((s, j) => <span key={j}>{s}</span>)}</div>
                    <p className="mt-1 font-semibold text-neutral-900 truncate">{r.name}</p>
                    <p className="text-xs text-neutral-500">{r.date}</p>
                  </div>
                </header>
                <p className="mt-4 text-sm leading-relaxed text-neutral-700">{r.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="relative z-10 px-4 sm:px-6 md:px-12 py-20 sm:py-28 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <h2 data-reveal className="text-center font-mammoth leading-[1.05] tracking-tight text-[34px] sm:text-[44px] md:text-[54px] lg:text-[64px]">
            <span className="block text-white">{ts.title1}</span>
            <span className="block" style={{ color: "#EC4392" }}>{ts.title2}</span>
          </h2>
          <p data-reveal style={{ transitionDelay: "120ms" }} className="mt-5 text-center text-base sm:text-lg text-white/80">{ts.sub}</p>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ts.items.map((s, i) => (
              <div key={s.t} data-reveal style={{ transitionDelay: `${(i % 4) * 100}ms` }}>
                <div className="solution-card flex items-start gap-4 rounded-2xl border border-white/10 bg-[#0e0b1a] p-5 h-full">
                  <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-white/[0.04] border border-white/10" style={{ color: "#F0B68A" }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d={solutionIcons[i]} />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold tracking-wide text-white">{s.t}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/70">{s.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 px-4 sm:px-6 md:px-12 py-16 sm:py-20" style={{ backgroundColor: "#EC4392" }}>
        <div className="max-w-7xl mx-auto">
          <h2 data-reveal className="text-center font-mammoth text-white text-[28px] sm:text-[36px] md:text-[44px] tracking-tight">{tst.title}</h2>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-y-10 text-white">
            {tst.items.map((s, i) => (
              <div key={s.l} data-reveal style={{ transitionDelay: `${i * 120}ms` }} className={`text-center ${i > 0 ? "lg:border-l border-white/30" : ""}`}>
                <p className="font-mammoth text-5xl sm:text-6xl md:text-7xl">{s.n}</p>
                <p className="mt-3 text-sm sm:text-base text-white/90">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cotizar" className="relative z-10 px-4 sm:px-6 md:px-12 py-24 sm:py-32 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 data-reveal className="font-mammoth leading-[1.05] tracking-tight text-[32px] sm:text-[44px] md:text-[54px]" style={{ color: "#EC4392" }}>{tcta.title}</h2>
          <p data-reveal style={{ transitionDelay: "120ms" }} className="mt-6 text-lg sm:text-xl font-semibold text-white/90">{tcta.sub}</p>
          <div data-reveal style={{ transitionDelay: "240ms" }} className="mt-10">
            <a href="#cotizar" className="btn-sweep inline-block text-white px-8 py-4 text-sm font-semibold tracking-[0.12em] transition" style={{ borderRadius: "18px", backgroundColor: "#EC4392", ["--sweep-bg" as string]: "#ffffff", ["--sweep-fg" as string]: "#000000" }}>
              <span className="btn-sweep-label">{tcta.button}</span>
            </a>
          </div>
        </div>
      </section>

      <SiteFooter language={language} />

      <WhatsAppButton />
      <MouseFollowCursor />

      <style>{siteStyles}</style>
    </div>
  );
}
