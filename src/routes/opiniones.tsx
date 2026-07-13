import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useSiteLanguage } from "@/hooks/use-site-language";
import { useRevealOnScroll } from "@/hooks/use-reveal";
import { siteStyles } from "@/lib/site-styles";
import { reviewsCopy, reviews } from "@/lib/site-content";

export const Route = createFileRoute("/opiniones")({
  head: () => ({
    meta: [
      { title: "Opiniones — Agencia de Diseño Web" },
      { name: "description", content: "Todas las reseñas de quienes ya han trabajado con nosotros." },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const { language, onLanguageChange } = useSiteLanguage();
  const tr = reviewsCopy[language] ?? reviewsCopy.es;
  useRevealOnScroll();

  return (
    <div className="relative isolate min-h-screen text-foreground bg-[rgba(5,12,31,1)]">
      <SiteNav language={language} onLanguageChange={onLanguageChange} />

      <section className="bg-[#F7F6F4] text-neutral-900 px-4 sm:px-6 md:px-12 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto" data-reveal>
            <div className="flex justify-center gap-1 text-[#F0AD4E] text-2xl">
              {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
            </div>
            <p className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">{tr.excellent}</p>
            <p className="mt-2 text-sm text-neutral-600">{tr.basedOn}</p>
            <h1 className="mt-8 font-mammoth leading-[1.05] tracking-tight text-[36px] sm:text-[52px] md:text-[64px]">
              <span className="block text-neutral-900">{tr.title1}</span>
              <span className="block" style={{ color: "#EC4392" }}>{tr.allTitle}</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-neutral-600">{tr.allSubtitle}</p>
          </div>

          <div className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
            {reviews.map((r, i) => (
              <article key={`${r.name}-${i}`} data-reveal style={{ transitionDelay: `${(i % 6) * 80}ms` }} className="mb-5 break-inside-avoid rounded-2xl border border-neutral-200 bg-white p-5">
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

          <div className="mt-14 flex justify-center" data-reveal>
            <Link to="/" className="btn-sweep border border-neutral-900 transition px-8 py-4 text-xs sm:text-sm font-semibold tracking-[0.18em] text-neutral-900" style={{ borderRadius: "18px", ["--sweep-bg" as string]: "#0a0a0a", ["--sweep-fg" as string]: "#ffffff" }}>
              ← Home
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter language={language} />
      <WhatsAppButton />
      <style>{siteStyles}</style>
    </div>
  );
}
