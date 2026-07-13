import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo.png";
import { footerCopy, type Lang } from "@/lib/site-content";

export function SiteFooter({ language }: { language: Lang }) {
  const t = footerCopy[language] ?? footerCopy.es;
  return (
    <footer className="relative z-10 px-4 sm:px-6 md:px-12 py-12 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link to="/">
          <img src={logoAsset} alt="Logo" className="h-12 w-auto" />
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
          <a href="/#nosotros" className="hover:text-white transition">{t.nav.team}</a>
          <a href="/#cotizar" className="hover:text-white transition">{t.nav.contact}</a>
          <Link to="/opiniones" className="hover:text-white transition">{t.nav.reviews}</Link>
          <a href="#" className="hover:text-white transition">{t.nav.legal}</a>
        </nav>
        <p className="text-xs text-white/50">{t.rights}</p>
      </div>
    </footer>
  );
}
