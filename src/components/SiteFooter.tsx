import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo.png";
import type { SiteContent, Lang } from "@/lib/content.functions";
import { pickBlock } from "@/lib/content-blocks";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

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
          {/* Brand */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <Link to="/" className="inline-flex items-center gap-2">
              <img src={logoAsset} alt="Orbit" className="h-10 w-auto" />
            </Link>
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <span className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-[#7EE640] animate-ping opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-[#7EE640]" />
              </span>
              <span className="text-[11px] tracking-[0.14em] uppercase text-white/80">Disponible para nuevos proyectos</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Sitios web que convierten visitantes en clientes. Diseño y desarrollo hecho a la medida de tu marca.
            </p>
            <p className="text-xs text-white/40 tracking-wide">Santiago de Chile</p>
          </div>

          {/* Navegación */}
          <nav className="md:col-span-2 flex flex-col gap-3">
            <p className="text-[10px] tracking-[0.28em] uppercase text-white/40">Navegación</p>
            <Link to="/portafolio" className="text-sm text-white/75 hover:text-white transition">Portafolio</Link>
            <a href="/#nosotros" className="text-sm text-white/75 hover:text-white transition">{t?.nav.team ?? "Nosotros"}</a>
            <Link to="/opiniones" className="text-sm text-white/75 hover:text-white transition">{t?.nav.reviews ?? "Opiniones"}</Link>
            <a href="/#cotizar" className="text-sm text-white/75 hover:text-white transition">{t?.nav.contact ?? "Cotización"}</a>
          </nav>

          {/* Empresa */}
          <nav className="md:col-span-2 flex flex-col gap-3">
            <p className="text-[10px] tracking-[0.28em] uppercase text-white/40">Empresa</p>
            <a href="/#nosotros" className="text-sm text-white/75 hover:text-white transition">Equipo</a>
            <Link to="/opiniones" className="text-sm text-white/75 hover:text-white transition">Reseñas</Link>
            <a href="#" className="text-sm text-white/75 hover:text-white transition">{t?.nav.legal ?? "Aviso legal"}</a>
          </nav>

          {/* Contacto */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <p className="text-[10px] tracking-[0.28em] uppercase text-white/40">Contacto</p>
            <a href="mailto:hola@orbit.cl" className="text-lg font-mammoth text-white hover:text-[#D97757] transition w-fit">hola@orbit.cl</a>
            <div className="flex flex-wrap gap-2 mt-2">
              {content.socials.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 px-4 py-2 text-xs text-white/85 transition"
                >
                  {s.platform}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-xs text-white/40">{t?.rights ?? `© ${new Date().getFullYear()} Orbit — Todos los derechos reservados.`}</p>
          <div className="flex items-center gap-3">
            <LanguageSwitcher variant="light" />
            <button
              type="button"
              onClick={scrollTop}
              className="btn-sweep inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs tracking-[0.18em] uppercase text-white/85 hover:text-white transition"
              style={{ ["--sweep-bg" as string]: "#D97757", ["--sweep-fg" as string]: "#ffffff" }}
            >
              <span className="btn-sweep-label">Volver arriba ↑</span>
            </button>
          </div>
        </div>
      </div>

      {/* Big ORBIT wordmark — fully visible, not cropped */}
      <div className="relative overflow-hidden pb-6 sm:pb-8 md:pb-10 leading-none text-center pointer-events-none select-none">
        <p
          aria-hidden="true"
          className="font-mammoth tracking-tight text-white/[0.06] leading-[1] px-4"
          style={{ fontSize: "clamp(64px, 20vw, 260px)" }}
        >
          ORBIT.
        </p>
      </div>
    </footer>
  );
}
