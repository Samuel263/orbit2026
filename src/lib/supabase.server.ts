import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

let _admin: SupabaseClient | null = null;
let _anon: SupabaseClient | null = null;

/** Service-role client. Bypasses RLS. Server-only. */
export function supabaseAdmin(): SupabaseClient {
  if (!_admin) {
    _admin = createClient(
      requireEnv("APP_SUPABASE_URL"),
      requireEnv("APP_SUPABASE_SERVICE_ROLE_KEY"),
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
  }
  return _admin;
}

/** Anon client for public reads (SSR). */
export function supabaseAnon(): SupabaseClient {
  if (!_anon) {
    const url = requireEnv("APP_SUPABASE_URL");
    const key = requireEnv("APP_SUPABASE_ANON_KEY");
    _anon = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });
  }
  return _anon;
}

export const STORAGE_BUCKET = "site-assets";

export function publicUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = process.env.APP_SUPABASE_URL;
  if (!base) return null;
  return `${base}/storage/v1/object/public/${STORAGE_BUCKET}/${path.replace(/^\/+/, "")}`;
}
