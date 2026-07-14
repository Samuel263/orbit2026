import { createServerFn } from "@tanstack/react-start";
import { supabaseAnon, publicUrl } from "./supabase.server";

export type Lang = "es" | "en" | "pt" | "fr" | "de" | "it";

// JSON-serializable primitive; used so TanStack accepts the server fn return.
type Json = string | number | boolean | null | { [k: string]: Json } | Json[];

export type SiteContent = {
  lang: Lang;
  blocks: { [key: string]: Json };
  projects: Array<{ id: string; name: string; url: string; domain: string; image_url: string | null; featured: boolean }>;
  reviews: Array<{ id: string; name: string; initial: string; color: string; date_label: string; text_body: string }>;
  clients: Array<{ id: string; name: string; logo_url: string | null }>;
  solutions: Array<{ id: string; icon_svg_path: string; title: string; description: string }>;
  team: Array<{ id: string; name: string; photo_url: string | null; role: string; bio: string }>;
  faq: Array<{ id: string; question: string; answer: string }>;
  socials: Array<{ id: string; platform: string; url: string; icon: string }>;
  contact_info: Array<{ id: string; kind: string; label: string; value: string }>;
  seo: { [path: string]: { title: string; description: string; og_image_url: string | null } };
  settings: { [k: string]: Json };
};

function pickLang<T>(i18n: Record<string, T> | null | undefined, lang: Lang): T | undefined {
  if (!i18n) return undefined;
  return i18n[lang] ?? i18n["es"] ?? (Object.values(i18n)[0] as T | undefined);
}

export const getSiteContent = createServerFn({ method: "GET" })
  .inputValidator((data: { lang?: string } | undefined) => ({
    lang: (data?.lang && ["es", "en", "pt", "fr", "de", "it"].includes(data.lang) ? data.lang : "es") as Lang,
  }))
  .handler(async ({ data }): Promise<SiteContent> => {
    const sb = supabaseAnon();
    const lang = data.lang;
    const [
      blocksRes, projectsRes, reviewsRes, clientsRes, solutionsRes,
      teamRes, faqRes, socialsRes, contactRes, seoRes, settingsRes,
    ] = await Promise.all([
      sb.from("content_blocks").select("key, data"),
      sb.from("projects").select("id, name, url, domain, image_url, featured, position").order("position"),
      sb.from("reviews").select("id, name, initial, color, date_label, text_body, position").order("position"),
      sb.from("clients").select("id, name, logo_url, position").order("position"),
      sb.from("solutions").select("id, icon_svg_path, i18n, position").order("position"),
      sb.from("team").select("id, name, photo_url, i18n, position").order("position"),
      sb.from("faq").select("id, i18n, position").order("position"),
      sb.from("socials").select("id, platform, url, icon, position").order("position"),
      sb.from("contact_info").select("id, kind, label, value, position").order("position"),
      sb.from("seo_pages").select("path, i18n"),
      sb.from("site_settings").select("data").eq("id", 1).maybeSingle(),
    ]);

    const blocks: { [key: string]: Json } = {};
    for (const row of blocksRes.data ?? []) {
      blocks[row.key] = (row.data ?? {}) as Json;
    }

    const seo: SiteContent["seo"] = {};
    for (const row of seoRes.data ?? []) {
      const t = pickLang(row.i18n as Record<string, { title: string; description: string; og_image_path?: string | null }>, lang);
      if (t) seo[row.path] = { ...t, og_image_url: publicUrl(t.og_image_path ?? null) };
    }

    return {
      lang,
      blocks,
      projects: (projectsRes.data ?? []).map((p) => ({
        id: p.id, name: p.name, url: p.url, domain: p.domain,
        image_url: publicUrl(p.image_url), featured: !!p.featured,
      })),
      reviews: (reviewsRes.data ?? []).map((r) => ({
        id: r.id, name: r.name, initial: r.initial ?? "", color: r.color ?? "#333",
        date_label: r.date_label ?? "", text_body: r.text_body,
      })),
      clients: (clientsRes.data ?? []).map((c) => ({
        id: c.id, name: c.name, logo_url: publicUrl(c.logo_url),
      })),
      solutions: (solutionsRes.data ?? []).map((s) => {
        const t = pickLang(s.i18n as Record<string, { title: string; description: string }>, lang) ?? { title: "", description: "" };
        return { id: s.id, icon_svg_path: s.icon_svg_path, title: t.title, description: t.description };
      }),
      team: (teamRes.data ?? []).map((t) => {
        const info = pickLang(t.i18n as Record<string, { role: string; bio: string }>, lang) ?? { role: "", bio: "" };
        return { id: t.id, name: t.name, photo_url: publicUrl(t.photo_url), role: info.role, bio: info.bio };
      }),
      faq: (faqRes.data ?? []).map((f) => {
        const info = pickLang(f.i18n as Record<string, { question: string; answer: string }>, lang) ?? { question: "", answer: "" };
        return { id: f.id, ...info };
      }),
      socials: (socialsRes.data ?? []).map((s) => ({ id: s.id, platform: s.platform, url: s.url, icon: s.icon ?? "" })),
      contact_info: (contactRes.data ?? []).map((c) => ({ id: c.id, kind: c.kind, label: c.label ?? "", value: c.value })),
      seo,
      settings: (settingsRes.data?.data ?? {}) as { [k: string]: Json },
    };
  });
