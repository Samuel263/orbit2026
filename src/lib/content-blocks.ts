import type { SiteContent, Lang } from "./content.functions";

/** Pick the language slice of a content_block. Falls back to es. */
export function pickBlock<T = Record<string, unknown>>(content: SiteContent, key: string, lang: Lang): T | undefined {
  const b = content.blocks?.[key] as unknown as Record<string, T> | undefined;
  if (!b) return undefined;
  return b[lang] ?? b.es ?? (Object.values(b)[0] as T | undefined);
}
