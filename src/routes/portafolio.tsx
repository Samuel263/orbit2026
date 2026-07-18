import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PaintHover } from "@/components/PaintHover";
import { useSiteLanguage } from "@/hooks/use-site-language";
import { useRevealOnScroll } from "@/hooks/use-reveal";
import { siteStyles } from "@/lib/site-styles";
import { getSiteContent, type Lang } from "@/lib/content.functions";
import { pickBlock } from "@/lib/content-blocks";

const contentQuery = (lang: Lang) => ({
  queryKey: ["site-content", lang] as const,
  queryFn: () => getSiteContent({ data: { lang } }),
});

export const Route = createFileRoute("/portafolio")({
  head: () => ({ meta: [{ title: "Portafolio — Agencia de Diseño Web" }] }),
  loader: async ({ context }) => { await context.queryClient.ensureQueryData(contentQuery("es")); },
  component: PortfolioPage,
});

type Project = { id: string; name: string; image_url: string | null; url?: string };

function PortfolioPage() {
  const { language, onLanguageChange } = useSiteLanguage();
  const lang = language as Lang;
  const { data: content } = useSuspenseQuery(contentQuery(lang));
  const tc = pickBlock<{ t1: string; allTitle: string; allSubtitle: string; view: string }>(content, "cases", lang);
  const tcta = pickBlock<{ title: string; button: string }>(content, "cta", lang);
  useRevealOnScroll();

  const [open, setOpen] = useState<Project | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <div className="relative isolate min-h-screen text-foreground bg-[#F8F8F6]">
      <div className="site-noise" aria-hidden="true" />
      <SiteNav language={lang} onLanguageChange={onLanguageChange} />

      <section className="relative z-10 px-4 sm:px-6 md:px-12 pt-32 sm:pt-40 pb-10 bg-[#F8F8F6]">
        <div className="max-w-7xl mx-auto text-center">
          <p data-reveal className="text-[10px] font-bold tracking-[0.32em] text-[#D97757] uppercase">Portafolio</p>
          <h1 data-reveal style={{ transitionDelay: "80ms" }} className="paint-hover mt-4 font-mammoth leading-[1.1] tracking-tight text-[40px] sm:text-[60px] md:text-[72px]">
            <span className="block" style={{ color: "#D97757" }}>{tc?.allTitle}</span>
          </h1>
          <p data-reveal style={{ transitionDelay: "160ms" }} className="mt-5 mx-auto max-w-2xl text-base sm:text-lg text-neutral-600">{tc?.allSubtitle}</p>
        </div>

      </section>


      <section className="relative z-10 px-4 sm:px-6 md:px-12 py-12 sm:py-16 bg-[#F8F8F6]">
        <div className="max-w-7xl mx-auto grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {content.projects.map((p, i) => (
            <div key={p.id} data-reveal style={{ transitionDelay: `${(i % 3) * 100}ms` }}>
              <button
                type="button"
                onClick={() => setOpen({ id: p.id, name: p.name, image_url: p.image_url, url: p.url })}
                className="portfolio-item group block w-full text-left"
              >
                <div className="relative overflow-hidden rounded-2xl bg-neutral-200" style={{ aspectRatio: "3 / 4" }}>
                  {p.image_url ? (
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="portfolio-item__img absolute inset-0 w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-b from-neutral-200 to-neutral-300" />
                  )}
                  <div className="portfolio-item__overlay absolute inset-0 flex items-end justify-end p-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white text-neutral-900 px-4 py-2 text-[11px] font-semibold tracking-[0.14em] uppercase">
                      {tc?.view ?? "Ver detalle"}
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
                <div className="mt-3 pl-1 flex items-baseline justify-between gap-3">
                  <span className="text-sm text-neutral-900 font-medium truncate">{p.name}</span>
                  <span className="text-[11px] text-neutral-500 tracking-[0.14em] uppercase shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center" data-reveal>
          <Link to="/" className="btn-sweep border border-neutral-900 transition px-8 py-4 text-xs sm:text-sm font-semibold tracking-[0.18em] text-neutral-900 rounded-[15px]" style={{ ["--sweep-bg" as string]: "#0a0a0a", ["--sweep-fg" as string]: "#ffffff" }}>
            ← Home
          </Link>
        </div>
      </section>

      {tcta && (
        <section className="relative z-10 px-4 sm:px-6 md:px-12 py-20 bg-[#F8F8F6] border-t border-neutral-200">
          <div className="max-w-3xl mx-auto text-center">
            <h2 data-reveal className="paint-hover font-mammoth leading-[1.05] tracking-tight text-[28px] sm:text-[40px] text-neutral-900">{tcta.title}</h2>
            <div data-reveal style={{ transitionDelay: "180ms" }} className="mt-8">
              <a href="/#cotizar" className="btn-sweep inline-block px-8 py-4 text-sm font-semibold tracking-[0.12em] rounded-[15px]" style={{ backgroundColor: "#D97757", color: "#ffffff", ["--sweep-bg" as string]: "#ffffff", ["--sweep-fg" as string]: "#D97757" }}>
                {tcta.button}
              </a>
            </div>
          </div>
        </section>
      )}

      <SiteFooter language={lang} content={content} />
      <WhatsAppButton settings={content.settings} lang={lang} />

      {open && (
        <div
          className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm p-3 sm:p-6 md:p-10 flex items-center justify-center"
          onClick={() => setOpen(null)}
        >
          <div
            className="portfolio-modal w-full max-w-4xl bg-white rounded-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: "calc(100vh - 24px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-3 sm:py-4 bg-white border-b border-neutral-200 shrink-0">
              <div className="min-w-0">
                <p className="text-sm sm:text-base font-semibold text-neutral-900 truncate">{open.name}</p>
                <p className="text-[11px] sm:text-xs text-neutral-500 tracking-[0.14em] uppercase">Proyecto</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {open.url && open.url.trim() !== "" && (
                  <a
                    href={open.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-[15px] bg-[#D97757] text-white px-4 py-2 text-xs font-semibold tracking-[0.14em] uppercase hover:opacity-90 transition"
                  >
                    Visitar sitio <span aria-hidden="true">↗</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  aria-label="Cerrar"
                  className="grid place-items-center size-9 sm:size-10 rounded-[15px] border border-neutral-300 text-neutral-700 hover:text-neutral-900 hover:border-neutral-900 transition"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M1 1l12 12M13 1L1 13"/></svg>
                </button>
              </div>
            </div>
            <div className="bg-neutral-100 overflow-y-auto flex-1">
              {open.image_url ? (
                <img src={open.image_url} alt={open.name} className="block w-full h-auto" />
              ) : (
                <div className="aspect-[3/4] bg-neutral-200" />
              )}
            </div>
          </div>
        </div>
      )}


      <style>{siteStyles}</style>
    </div>
  );
}
