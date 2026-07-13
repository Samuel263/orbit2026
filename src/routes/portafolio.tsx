import { createFileRoute, Link } from "@tanstack/react-router";
import videoBg from "@/assets/white-waves-bg.mp4";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useSiteLanguage } from "@/hooks/use-site-language";
import { useRevealOnScroll } from "@/hooks/use-reveal";
import { siteStyles } from "@/lib/site-styles";
import { casesCopy, ctaCopy, projects } from "@/lib/site-content";

export const Route = createFileRoute("/portafolio")({
  head: () => ({
    meta: [
      { title: "Portafolio — Agencia de Diseño Web" },
      { name: "description", content: "Todos los proyectos que hemos construido con marcas reales." },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const { language, onLanguageChange } = useSiteLanguage();
  const tc = casesCopy[language] ?? casesCopy.es;
  const tcta = ctaCopy[language] ?? ctaCopy.es;
  useRevealOnScroll();

  return (
    <div className="relative isolate min-h-screen text-foreground">
      <video autoPlay loop muted playsInline className="fixed inset-0 -z-10 h-screen w-screen object-cover" src={videoBg} />
      <div className="fixed inset-0 -z-10 pointer-events-none" style={{ backgroundColor: "rgba(5, 12, 31, 0.6)" }} />
      <div className="site-noise" aria-hidden="true" />

      <SiteNav language={language} onLanguageChange={onLanguageChange} />

      <section className="relative z-10 px-4 sm:px-6 md:px-12 pt-16 pb-10 bg-[rgba(5,12,31,0.74)]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 data-reveal className="font-mammoth leading-[1.05] tracking-tight text-[40px] sm:text-[60px] md:text-[72px]">
            <span className="block text-white">{tc.t1}</span>
            <span className="block" style={{ color: "#EC4392" }}>{tc.allTitle}</span>
          </h1>
          <p data-reveal style={{ transitionDelay: "120ms" }} className="mt-5 mx-auto max-w-2xl text-base sm:text-lg text-white/85">{tc.allSubtitle}</p>
        </div>
      </section>

      <section className="relative z-10 px-4 sm:px-6 md:px-12 py-16 sm:py-24 bg-[rgba(5,12,31,0.74)]">
        <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <div key={p.domain} data-reveal style={{ transitionDelay: `${(i % 3) * 120}ms` }}>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="project-card mac-window group relative block rounded-2xl overflow-hidden border border-white/10 bg-[#0e0b1a]">
                <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-white/[0.04]">
                  <span className="size-3 rounded-full bg-[#ff5f57]" />
                  <span className="size-3 rounded-full bg-[#febc2e]" />
                  <span className="size-3 rounded-full bg-[#28c840]" />
                  <div className="ml-3 flex-1 h-6 rounded-md bg-white/[0.06] border border-white/10 px-3 flex items-center text-[11px] text-white/60 truncate">{p.domain}</div>
                </div>
                <div className="relative aspect-[16/10] bg-[#0a0814] overflow-hidden">
                  <img src={`https://image.thum.io/get/width/1200/crop/750/noanimate/${p.url}`} alt={`${p.name} preview`} className="project-card-img absolute inset-0 w-full h-full object-cover object-top" loading="lazy" />
                  <div className="absolute inset-0 flex items-center justify-center bg-[rgba(5,12,31,0.55)] opacity-0 group-hover:opacity-100 transition-opacity duration-[600ms]">
                    <span className="bg-[var(--pink)] text-white px-6 py-3 text-sm font-medium translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[600ms]" style={{ borderRadius: "18px" }}>
                      {tc.view} →
                    </span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center" data-reveal>
          <Link to="/" className="btn-sweep border border-white/80 transition px-8 py-4 text-sm font-semibold tracking-[0.18em] text-white" style={{ borderRadius: "18px", ["--sweep-bg" as string]: "#ffffff", ["--sweep-fg" as string]: "#000000" }}>
            ← Home
          </Link>
        </div>
      </section>

      <section className="relative z-10 px-4 sm:px-6 md:px-12 py-20 bg-[rgba(5,12,31,0.74)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 data-reveal className="font-mammoth leading-[1.05] tracking-tight text-[28px] sm:text-[40px]" style={{ color: "#EC4392" }}>{tcta.title}</h2>
          <div data-reveal style={{ transitionDelay: "180ms" }} className="mt-8">
            <a href="/#cotizar" className="btn-sweep inline-block text-white px-8 py-4 text-sm font-semibold tracking-[0.12em] transition" style={{ borderRadius: "18px", backgroundColor: "#EC4392", ["--sweep-bg" as string]: "#ffffff", ["--sweep-fg" as string]: "#000000" }}>
              {tcta.button}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter language={language} />
      <WhatsAppButton />
      <style>{siteStyles}</style>
    </div>
  );
}
