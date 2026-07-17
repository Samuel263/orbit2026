import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import logoAsset from "@/assets/logo.png";
import { getSiteContent, type Lang } from "@/lib/content.functions";
import { pickBlock } from "@/lib/content-blocks";

type Props = { language: Lang; onLanguageChange?: (lang: string) => void };

export function SiteNav({ language }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const { data: content } = useQuery({
    queryKey: ["site-content", language],
    queryFn: () => getSiteContent({ data: { lang: language } }),
    staleTime: 60_000,
  });
  const t = content ? pickBlock<{ portfolio: string; about: string; reviews: string; quote: string; quoteShort: string }>(content, "nav", language) : undefined;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`fixed left-0 right-0 z-40 px-3 sm:px-6 md:px-10 transition-all duration-300 ${scrolled ? "top-3 sm:top-4" : "top-3 sm:top-6 md:top-8"}`}>
      <header className="mx-auto max-w-3xl flex items-center justify-between gap-3 sm:gap-4 pl-2 pr-1.5 sm:pl-3 sm:pr-2 py-1.5 sm:py-2 rounded-full border border-white/10 backdrop-blur-xl bg-[#1A1A1A]/80">
        <Link to="/" className="flex items-center shrink-0 pl-1">
          <img src={logoAsset} alt="Logo" className="h-7 sm:h-8 md:h-9 w-auto" />
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-[11px] tracking-[0.18em] text-white/85 font-sans normal-case">
          <Link to="/portafolio" className="hover:text-white transition">{t?.portfolio ?? ""}</Link>
          <a href="/#nosotros" className="hover:text-white transition">{t?.about ?? ""}</a>
          <Link to="/opiniones" className="hover:text-white transition">{t?.reviews ?? ""}</Link>
        </nav>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/#cotizar"
            className="btn-sweep bg-white h-9 sm:h-10 inline-flex items-center px-4 sm:px-5 text-[11px] sm:text-xs font-semibold tracking-[0.12em] text-black whitespace-nowrap rounded-full"
            style={{ ["--sweep-bg" as string]: "#D97757", ["--sweep-fg" as string]: "#4A2618" }}
          >
            <span className="btn-sweep-label">
              <span className="hidden sm:inline">{t?.quote ?? ""}</span>
              <span className="sm:hidden">{t?.quoteShort ?? ""}</span>
            </span>
          </a>
        </div>
      </header>
    </div>
  );
}

