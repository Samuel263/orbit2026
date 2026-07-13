import { useCallback, useEffect, useState } from "react";
import type { Lang } from "@/lib/site-content";
import { navCopy } from "@/lib/site-content";

export function useSiteLanguage() {
  const [language, setLanguage] = useState<Lang>("es");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("site-language");
    if (stored && stored in navCopy) setLanguage(stored as Lang);
  }, []);

  const onLanguageChange = useCallback((next: string) => {
    setLanguage(next in navCopy ? (next as Lang) : "es");
  }, []);

  return { language, onLanguageChange };
}
