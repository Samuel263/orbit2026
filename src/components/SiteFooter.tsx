import { Link } from "@tanstack/react-router";
import type { SiteContent, Lang } from "@/lib/content.functions";
import { pickBlock } from "@/lib/content-blocks";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import logoAsset from "@/assets/shift-logo.png";

type Props = { language: Lang; content: SiteContent };

export function SiteFooter({ language, content }: Props) {
  const t = pickBlock<{ nav: { team: string; contact: string; reviews: string; legal: string }; rights: string }>(content, "footer", language);
  const scrollTop = () => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="relative z-10 bg-[#0F0F10] text-white overflow-hidden">
      <div className="relative z-10 px-4 sm:px-6 md:px-12 pt-20 pb-8">
        <div className="max-w-7xl mx-auto grid gap-12 md:gap-8 md:grid-cols-12">
          <div className="md:col-span-5 flex flex-col gap-5">
            <Link to="/" className="inline-flex items-center">
              <img src={logoAsset} alt="Logo" className="h-9 sm:h-10 w-auto" />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-sm">
              Diseñamos y desarrollamos sitios web hechos a la medida — pensados para convertir, no para decorar.
            </p>
            <p className="text-xs text-white/40 tracking-wide">Santiago de Chile</p>
          </div>

          <nav className="md:col-span-2 flex flex-col gap-3">
            <p className="text-[10px] tracking-[0.28em] uppercase text-white/40">Sitio</p>
            <Link to="/portafolio" className="text-sm text-white/75 hover:text-white transition">Portafolio</Link>
            <a href="/#nosotros" className="text-sm text-white/75 hover:text-white transition">{t?.nav.team ?? "Nosotros"}</a>
            <Link to="/opiniones" className="text-sm text-white/75 hover:text-white transition">{t?.nav.reviews ?? "Opiniones"}</Link>
            <a href="/#cotizar" className="text-sm text-white/75 hover:text-white transition">{t?.nav.contact ?? "Cotización"}</a>
          </nav>

          <div className="md:col-span-5 flex flex-col gap-3">
            <p className="text-[10px] tracking-[0.28em] uppercase text-white/40">Contacto</p>
            <a href="mailto:hola@orbit.cl" className="paint-hover text-2xl sm:text-3xl font-mammoth text-white hover:opacity-80 transition w-fit">hola@orbit.cl</a>
            <div className="flex flex-wrap gap-2 mt-2">
              {content.socials.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-[15px] border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 px-4 py-2 text-xs text-white/85 transition"
                >
                  {s.platform}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-xs text-white/40">{t?.rights ?? `© ${new Date().getFullYear()} — Todos los derechos reservados.`}</p>
          <div className="flex items-center gap-3">
            <LanguageSwitcher variant="light" />
            <button
              type="button"
              onClick={scrollTop}
              className="btn-sweep inline-flex items-center gap-2 rounded-[15px] border border-white/20 px-5 py-2.5 text-xs tracking-[0.18em] uppercase text-white/85 hover:text-white transition"
              style={{ ["--sweep-bg" as string]: "#ffffff", ["--sweep-fg" as string]: "#0a0a0a" }}
            >
              <span className="btn-sweep-label">Volver arriba ↑</span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden pb-8 sm:pb-10 pt-4 flex justify-center pointer-events-none select-none">
        <img
          src={logoAsset}
          alt=""
          aria-hidden="true"
          className="h-40 sm:h-56 md:h-72 lg:h-80 w-auto"
          style={{ filter: "grayscale(100%) brightness(0) invert(1)", opacity: 0.18 }}
        />
      </div>
    </footer>
  );
}
