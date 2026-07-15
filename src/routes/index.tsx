import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
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
import { getSiteContent, type Lang, type SiteContent } from "@/lib/content.functions";
import { pickBlock } from "@/lib/content-blocks";

type HeroTrailCard =
  | { type: "text"; eyebrow: string; title: string; tone: "pink" | "green" | "white" }
  | { type: "image"; src: string; alt: string; tone: "pink" | "green" | "white" };

type HeroTrailInstance = { id: number; x: number; y: number; rotate: number; card: HeroTrailCard };

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

const contentQuery = (lang: Lang) => ({
  queryKey: ["site-content", lang] as const,
  queryFn: () => getSiteContent({ data: { lang } }),
});

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Agencia de Diseño Web" }] }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(contentQuery("es"));
  },
  component: Index,
});

function Index() {
  const { language, onLanguageChange } = useSiteLanguage();
  const lang = language as Lang;
  const { data: content } = useSuspenseQuery({
    ...contentQuery(lang),
    initialData: undefined,
  });

  const [heroTrail, setHeroTrail] = useState<HeroTrailInstance[]>([]);
  const trailSequenceRef = useRef(0);
  const lastTrailAtRef = useRef(0);
  useRevealOnScroll();

  const t = pickBlock<{ description: string; viewPortfolio: string; clientAlt: string }>(content, "hero", lang);
  const tc = pickBlock<{ t1: string; t2: string; desc: string; view: string; more: string }>(content, "cases", lang);
  const tr = pickBlock<{ excellent: string; basedOn: string; kicker: string; title1: string; title2: string; cta: string }>(content, "reviews_copy", lang);
  const ts = pickBlock<{ title1: string; title2: string; sub: string }>(content, "solutions_intro", lang);
  const tst = pickBlock<{ title: string; items: Array<{ n: string; l: string }> }>(content, "stats", lang);
  const tcta = pickBlock<{ title: string; sub: string; button: string }>(content, "cta", lang);
  const tcl = pickBlock<{ kicker: string; t1: string; t2: string }>(content, "clients_copy", lang);
  const tnav = pickBlock<{ quote: string }>(content, "nav", lang);

  const featuredProjects = content.projects.filter((p) => p.featured).slice(0, 3);
  if (featuredProjects.length < 3) featuredProjects.push(...content.projects.slice(0, 3 - featuredProjects.length));
  const featuredReviews = content.reviews.slice(0, 6);

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
    window.setTimeout(() => setHeroTrail((items) => items.filter((item) => item.id !== id)), 2200);
  }, []);

  return (
    <div className="relative isolate min-h-screen text-foreground">
      <div className="site-noise" aria-hidden="true" />
      <SiteNav language={lang} onLanguageChange={onLanguageChange} />

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover" src={videoBg} />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(11, 18, 38, 0.75)" }} />
      </div>

      <div className="relative z-10 bg-[#F7F6F4]">
        <div className="paper-noise" aria-hidden="true" />
        <div className="relative px-2 sm:px-3 md:px-4 pt-2 sm:pt-3 md:pt-4">
        <section
          className="relative overflow-hidden rounded-3xl hero-stage"
          onPointerMoveCapture={handleHeroTrailMove}
        >
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
                  {pickBlock<{ headlineTop: string }>(content, "hero", lang)?.headlineTop ?? ""}{" "}
                </span>
                <span className="hero-line hero-line-2 overflow-visible" style={{ color: "#EC4392" }}>
                  {pickBlock<{ headlineBottom: string }>(content, "hero", lang)?.headlineBottom ?? ""}
                </span>
              </h1>
              <p className="hero-no-trail mt-6 text-sm sm:text-base text-white/85 leading-relaxed max-w-xl mx-auto">{t?.description}</p>
              <div className="hero-no-trail mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <a href="#cotizar" className="btn-sweep bg-[var(--pink)] transition px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-medium text-white rounded-full" style={{ ["--sweep-bg" as string]: "#ffffff", ["--sweep-fg" as string]: "#000000" }}>
                  <span className="btn-sweep-label">{tnav?.quote ?? ""}</span>
                </a>
                <Link to="/portafolio" className="btn-sweep border border-white/80 transition px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-medium text-white rounded-full" style={{ ["--sweep-bg" as string]: "#ffffff", ["--sweep-fg" as string]: "#000000" }}>
                  <span className="btn-sweep-label">{t?.viewPortfolio ?? ""}</span>
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
                    <div className="flex gap-0.5 text-[#F0AD4E] text-[13px] leading-none">{"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}</div>
                    <span className="text-white text-sm font-semibold leading-none">4.9</span>
                    <span className="text-white text-sm font-medium leading-none">+98 reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </section>
        </div>
      </div>


      {/* CLIENTS — minimal, single strip */}
      <section className="relative z-10 bg-[#F7F6F4] text-neutral-900 py-16 sm:py-20 overflow-hidden">
        <div className="paper-noise" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-10 text-center">

          <span data-reveal className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.28em] text-neutral-500 uppercase">
            <span className="h-px w-8 bg-neutral-300" />{tcl?.kicker}<span className="h-px w-8 bg-neutral-300" />
          </span>
          <h2 data-reveal style={{ transitionDelay: "80ms" }} className="mt-5 font-mammoth leading-[1.05] tracking-tight text-[26px] sm:text-[34px] md:text-[42px]">
            <span className="text-neutral-900">{tcl?.t1}</span> <span style={{ color: "#EC4392" }}>{tcl?.t2}</span>
          </h2>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 mt-10 sm:mt-14">
          <div className="client-strip overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="client-marquee flex w-max items-center gap-10 sm:gap-14">
              {Array.from({ length: 6 }, () => content.clients).flat().map((c, i) => (
                <div key={`c-${i}`} className="flex h-10 sm:h-12 shrink-0 items-center justify-center">
                  {c.logo_url ? (
                    <img src={c.logo_url} alt={`${t?.clientAlt ?? ""}: ${c.name}`} className="max-h-8 sm:max-h-10 max-w-[140px] object-contain client-logo-dark" loading="lazy" />
                  ) : (
                    <span className="text-neutral-700 text-sm font-semibold tracking-wide">{c.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS — vertical infinite carousel, non-interactive */}
      <section id="portafolio" className="relative z-10 py-20 sm:py-28 bg-[#1A1A1A] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="text-left max-w-3xl">
            <h2 data-reveal className="font-mammoth leading-[1.05] tracking-tight text-[34px] sm:text-[44px] md:text-[54px] lg:text-[64px]">
              <span className="block text-white text-[0.92em]">{tc?.t1}</span>
              <span className="block pt-[0.18em] -mt-[0.18em] overflow-visible" style={{ color: "#EC4392" }}>{tc?.t2}</span>
            </h2>
            <p data-reveal style={{ transitionDelay: "120ms" }} className="mt-5 text-base sm:text-lg text-white/85 leading-relaxed">{tc?.desc}</p>
          </div>
        </div>

        <div className="relative mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="proj-marquee flex w-max gap-6 sm:gap-8">
            {(() => {
              const src = content.projects.length > 0 ? content.projects : [];
              const loop = [...src, ...src, ...src, ...src];
              return loop.map((p, i) => (
                <div
                  key={`p-${i}`}
                  className="shrink-0 overflow-hidden rounded-2xl bg-[#0e0b1a] border border-white/5"
                  style={{ width: "clamp(200px, 22vw, 315px)", aspectRatio: "630 / 1650" }}
                  aria-hidden="true"
                >
                  {p.image_url ? (
                    <img
                      src={p.image_url}
                      alt=""
                      className="w-full h-full object-cover pointer-events-none select-none"
                      style={{ objectPosition: "top center" }}
                      draggable={false}
                      loading="lazy"
                    />

                  ) : (
                    <div className="w-full h-full bg-gradient-to-b from-[#1a1230] to-[#0a0814]" />
                  )}
                </div>
              ));
            })()}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-14 flex justify-center" data-reveal>
          <Link to="/portafolio" className="btn-sweep bg-[var(--pink)] transition px-8 py-4 text-sm font-semibold tracking-[0.18em] text-white" style={{ borderRadius: "18px", ["--sweep-bg" as string]: "#ffffff", ["--sweep-fg" as string]: "#000000" }}>
            <span className="btn-sweep-label">{tc?.more}</span>
          </Link>
        </div>
      </section>

      {/* REVIEWS — wall of notes on a light noisy background */}
      <section id="opiniones" className="relative z-10 px-4 sm:px-6 md:px-12 py-24 sm:py-32 bg-[#F7F6F4] text-neutral-900 overflow-hidden">
        <div className="reviews-noise absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8" data-reveal>
            <div>
              <p className="text-xs sm:text-sm tracking-[0.28em] font-bold text-[#EC4392] uppercase">{tr?.kicker}</p>
              <h2 className="mt-4 font-mammoth leading-[0.98] tracking-tight text-[42px] sm:text-[56px] md:text-[72px] lg:text-[84px]">
                <span className="block text-neutral-900">{tr?.title1}</span>
                <span className="block" style={{ color: "#EC4392" }}>{tr?.title2}</span>
              </h2>
            </div>
            <div className="flex flex-col items-start lg:items-end gap-2">
              <div className="flex gap-1 text-[#F0AD4E] text-xl">{"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}</div>
              <p className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900">{tr?.excellent}</p>
              <p className="text-xs text-neutral-500">{tr?.basedOn}</p>
              <Link to="/opiniones" className="btn-sweep mt-4 inline-block border border-neutral-900 transition px-6 py-3 text-xs font-semibold tracking-[0.18em] text-neutral-900 rounded-full" style={{ ["--sweep-bg" as string]: "#0a0a0a", ["--sweep-fg" as string]: "#ffffff" }}>
                <span className="btn-sweep-label">{tr?.cta}</span>
              </Link>
            </div>
          </div>

        </div>

        {(() => {
          const src = content.reviews.length > 0 ? content.reviews : featuredReviews;
          const half = Math.ceil(src.length / 2);
          const bandA = src.slice(0, half);
          const bandB = src.slice(half).length ? src.slice(half) : src.slice(0, half);
          const Card = ({ r, i }: { r: typeof src[number]; i: number }) => (
            <article
              key={`${r.id}-${i}`}
              className="shrink-0 w-[300px] sm:w-[360px] bg-white border border-neutral-200 rounded-2xl p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
            >
              <div className="flex gap-0.5 text-[#F0AD4E] text-sm">{"★★★★★".split("").map((s, j) => <span key={j}>{s}</span>)}</div>
              <p className="mt-3 text-[15px] leading-relaxed text-neutral-800 line-clamp-5">{r.text_body}</p>
              <div className="mt-5 pt-4 border-t border-neutral-200 flex items-center gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-full text-white text-sm font-semibold" style={{ backgroundColor: r.color }}>{r.initial}</div>
                <div className="min-w-0">
                  <p className="font-semibold text-neutral-900 truncate">{r.name}</p>
                  <p className="text-xs text-neutral-500">{r.date_label}</p>
                </div>
              </div>
            </article>
          );
          return (
            <div className="relative mt-14 space-y-6">
              <div className="rev-band overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
                <div className="rev-marquee-l flex w-max gap-6">
                  {[...bandA, ...bandA, ...bandA].map((r, i) => <Card key={`a-${i}`} r={r} i={i} />)}
                </div>
              </div>
              <div className="rev-band overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
                <div className="rev-marquee-r flex w-max gap-6">
                  {[...bandB, ...bandB, ...bandB].map((r, i) => <Card key={`b-${i}`} r={r} i={i} />)}
                </div>
              </div>
            </div>
          );
        })()}

            })}
          </div>
        </div>
      </section>

      {/* SOLUTIONS — editorial numbered rows */}
      <section className="relative z-10 px-4 sm:px-6 md:px-12 py-24 sm:py-32 bg-[#1A1A1A] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6" data-reveal>
            <h2 className="font-mammoth leading-[0.98] tracking-tight text-[42px] sm:text-[56px] md:text-[72px] lg:text-[84px] max-w-3xl">
              <span className="block text-white">{ts?.title1}</span>
              <span className="block" style={{ color: "#EC4392" }}>{ts?.title2}</span>
            </h2>
            <p className="max-w-sm text-base sm:text-lg text-white/60 leading-relaxed">{ts?.sub}</p>
          </div>

          <div className="mt-16 border-t border-white/10">
            {content.solutions.map((s, i) => (
              <div
                key={s.id}
                data-reveal
                className="service-row group grid grid-cols-[auto_1fr_auto] items-center gap-6 sm:gap-10 py-8 sm:py-10 border-b border-white/10"
              >
                <span className="font-mammoth text-3xl sm:text-4xl text-white/30 group-hover:text-[#EC4392] transition-colors duration-500 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="font-mammoth text-2xl sm:text-3xl md:text-4xl leading-tight text-white group-hover:translate-x-2 transition-transform duration-500">
                    {s.title}
                  </h3>
                  <p className="service-row__desc mt-3 text-sm sm:text-base text-white/60 leading-relaxed max-w-2xl">
                    {s.description}
                  </p>
                </div>
                <div className="hidden sm:grid size-12 place-items-center rounded-full border border-white/20 text-white/70 group-hover:border-[#EC4392] group-hover:text-[#EC4392] transition-colors duration-500 shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.icon_svg_path} />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS — clean typographic band */}
      {tst && (
        <section className="relative z-10 px-4 sm:px-6 md:px-12 py-20 sm:py-28 bg-[#F7F6F4] text-neutral-900">
          <div className="max-w-7xl mx-auto">
            <h2 data-reveal className="text-center font-mammoth leading-[1] tracking-tight text-[32px] sm:text-[44px] md:text-[56px] max-w-4xl mx-auto">{tst.title}</h2>
            <div className="mt-14 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 border-t border-neutral-200">
              {(tst.items ?? []).map((s, i) => (
                <div key={`${s.l}-${i}`} data-reveal style={{ transitionDelay: `${i * 100}ms` }} className="pt-8 text-left border-r border-neutral-200 last:border-r-0 px-4 first:pl-0">
                  <p className="font-mammoth text-5xl sm:text-6xl md:text-7xl leading-none tracking-tight" style={{ color: i % 2 === 0 ? "#EC4392" : "#1A1A1A" }}>{s.n}</p>
                  <p className="mt-4 text-[11px] sm:text-xs tracking-[0.18em] uppercase text-neutral-500">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA — bold, clean, no glow */}
      {tcta && (
        <section id="cotizar" className="relative z-10 px-4 sm:px-6 md:px-12 py-32 sm:py-40 bg-[#0B0A14] overflow-hidden">
          <div className="relative max-w-4xl mx-auto text-center">
            <div data-reveal className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.28em] text-[#EC4392] uppercase mb-6">
              <span className="h-px w-8 bg-[#EC4392]/50" />
              <span>{tnav?.quote ?? ""}</span>
              <span className="h-px w-8 bg-[#EC4392]/50" />
            </div>
            <h2 data-reveal className="font-mammoth leading-[0.95] tracking-tight text-[44px] sm:text-[64px] md:text-[88px] lg:text-[108px] text-white">
              {tcta.title}
            </h2>
            <p data-reveal style={{ transitionDelay: "120ms" }} className="mt-8 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">{tcta.sub}</p>
            <div data-reveal style={{ transitionDelay: "240ms" }} className="mt-12">
              <a href="#cotizar" className="btn-sweep inline-block text-white px-10 py-5 text-sm font-semibold tracking-[0.18em] transition rounded-full" style={{ backgroundColor: "#EC4392", ["--sweep-bg" as string]: "#ffffff", ["--sweep-fg" as string]: "#000000" }}>
                <span className="btn-sweep-label">{tcta.button}</span>
              </a>
            </div>
          </div>
        </section>
      )}



      <SiteFooter language={lang} content={content} />
      <WhatsAppButton settings={content.settings} lang={lang} />
      <MouseFollowCursor />
      <style>{siteStyles}</style>
      {/* logo asset only to satisfy import tracking */}
      <img src={logoAsset} alt="" hidden aria-hidden="true" />
    </div>
  );
}
