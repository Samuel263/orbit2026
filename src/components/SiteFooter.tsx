import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo.png";
import type { SiteContent, Lang } from "@/lib/content.functions";
import { pickBlock } from "@/lib/content-blocks";

type Props = { language: Lang; content: SiteContent };

export function SiteFooter({ language, content }: Props) {
  const t = pickBlock<{ nav: { team: string; contact: string; reviews: string; legal: string }; rights: string }>(content, "footer", language);
  return (
    <footer className="relative z-10 bg-[#1A1A1A] overflow-hidden">
      <div className="px-4 sm:px-6 md:px-12 pt-16 pb-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="flex flex-col gap-4 max-w-sm">
            <Link to="/">
              <img src={logoAsset} alt="Logo" className="h-12 w-auto" />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              Sitios web que convierten visitantes en clientes.
            </p>
          </div>
          <nav className="flex flex-col gap-2 text-sm text-white/70">
            <p className="text-[10px] tracking-[0.24em] uppercase text-white/40 mb-2">Navegación</p>
            <a href="/#nosotros" className="hover:text-white transition">{t?.nav.team ?? ""}</a>
            <a href="/#cotizar" className="hover:text-white transition">{t?.nav.contact ?? ""}</a>
            <Link to="/opiniones" className="hover:text-white transition">{t?.nav.reviews ?? ""}</Link>
            <a href="#" className="hover:text-white transition">{t?.nav.legal ?? ""}</a>
          </nav>
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-[10px] tracking-[0.24em] uppercase text-white/40 mb-2">Síguenos</p>
            {content.socials.map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition">{s.platform}</a>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-xs text-white/40">{t?.rights ?? ""}</p>
        </div>
      </div>

      <div className="relative -mb-4 sm:-mb-8 md:-mb-12 leading-none text-center pointer-events-none select-none">
        <p
          aria-hidden="true"
          className="font-mammoth tracking-tight text-white/[0.06] leading-[0.85]"
          style={{ fontSize: "clamp(80px, 22vw, 320px)" }}
        >
          ORBIT.
        </p>
      </div>
    </footer>
  );
}
