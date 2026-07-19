import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

type Lang = { code: string; label: string; country: string };

const LANGS: Lang[] = [
  { code: "es", label: "Español", country: "es" },
  { code: "en", label: "English", country: "us" },
  { code: "pt", label: "Português", country: "br" },
  { code: "fr", label: "Français", country: "fr" },
  { code: "de", label: "Deutsch", country: "de" },
  { code: "it", label: "Italiano", country: "it" },
];

const SOURCE_LANG = "es";

function readGoogTransCookie(): string {
  if (typeof document === "undefined") return SOURCE_LANG;
  const m = document.cookie.match(/googtrans=\/[^/]+\/([a-z-]+)/i);
  return m?.[1] ?? SOURCE_LANG;
}

function setGoogTrans(code: string) {
  const host = window.location.hostname;
  // Clear on both current host and root domain, then set fresh
  const domains = ["", `; domain=${host}`, `; domain=.${host.replace(/^www\./, "")}`];
  for (const d of domains) {
    document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${d}`;
  }
  if (code !== SOURCE_LANG) {
    for (const d of domains) {
      document.cookie = `googtrans=/${SOURCE_LANG}/${code}; path=/${d}`;
    }
  }
  window.localStorage.setItem("site-language", code);
}

type Props = {
  value?: string;
  onLanguageChange?: (language: string) => void;
  variant?: "dark" | "light";
};

export function LanguageSwitcher({ value, onLanguageChange, variant = "dark" }: Props) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string>(SOURCE_LANG);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initial = readGoogTransCookie() || window.localStorage.getItem("site-language") || SOURCE_LANG;
    if (LANGS.some((l) => l.code === initial)) {
      setCurrent(initial);
      onLanguageChange?.(initial);
    }
  }, [onLanguageChange]);

  useEffect(() => {
    if (value && value !== current && LANGS.some((l) => l.code === value)) setCurrent(value);
  }, [current, value]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const choose = (lang: Lang) => {
    setCurrent(lang.code);
    setOpen(false);
    setGoogTrans(lang.code);
    onLanguageChange?.(lang.code);
    window.location.reload();
  };

  const currentLang = LANGS.find((l) => l.code === current) ?? LANGS[0];
  const isLight = variant === "light";

  return (
    <div ref={ref} className="relative notranslate" translate="no">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Cambiar idioma"
        aria-expanded={open}
        className={`inline-flex items-center gap-2 h-9 px-3 text-xs font-medium rounded-[15px] transition-colors ${
          isLight
            ? "bg-white/5 text-white/80 hover:bg-white/10 border border-white/10"
            : "bg-white/10 text-white hover:bg-white/20"
        }`}
      >
        <span className="block h-5 w-5 overflow-hidden rounded-full ring-1 ring-white/25 shrink-0">
          <img src={`https://flagcdn.com/w80/${currentLang.country}.png`} alt="" className="h-full w-full object-cover" />
        </span>
        <span className="uppercase tracking-wider">{currentLang.code}</span>
        <ChevronDown size={13} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`absolute right-0 bottom-full mb-3 w-56 rounded-2xl bg-white p-3 z-50 origin-bottom-right transition-all duration-200 ease-out ${
          open ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 translate-y-1 pointer-events-none"
        }`}
      >
        {LANGS.map((l) => {
          const active = l.code === current;
          return (
            <button
              type="button"
              key={l.code}
              onClick={() => choose(l)}
              className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors duration-150 mb-1 last:mb-0 ${
                active ? "bg-neutral-100 text-neutral-900" : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              <span className="block h-5 w-5 overflow-hidden rounded-full ring-1 ring-neutral-200 shrink-0">
                <img src={`https://flagcdn.com/w80/${l.country}.png`} alt="" className="h-full w-full object-cover" />
              </span>
              <span className="flex-1 text-left">{l.label}</span>
              {active && <Check size={14} className="text-[#D97757]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default LanguageSwitcher;
