import { createServerFn } from "@tanstack/react-start";
import { createHash, timingSafeEqual } from "node:crypto";
import { getAdminSession, requireAdmin } from "./admin-session.server";
import { STORAGE_BUCKET, supabaseAdmin } from "./supabase.server";

// -------- helpers --------
function passwordMatches(input: string, expected: string): boolean {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return a.length === b.length && timingSafeEqual(a, b);
}

const ALLOWED_TABLES = [
  "content_blocks", "projects", "reviews", "clients", "solutions",
  "team", "faq", "socials", "contact_info", "seo_pages", "site_settings",
] as const;
type AllowedTable = (typeof ALLOWED_TABLES)[number];
function validTable(t: string): t is AllowedTable {
  return (ALLOWED_TABLES as readonly string[]).includes(t);
}

// -------- auth --------
export const unlockAdmin = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) return { ok: false as const, error: "ADMIN_PASSWORD not set" };
    if (!passwordMatches(data.password, expected)) return { ok: false as const, error: "Contraseña incorrecta" };
    const s = await getAdminSession();
    await s.update({ unlocked: true });
    return { ok: true as const };
  });

export const lockAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const s = await getAdminSession();
  await s.clear();
  return { ok: true as const };
});

export const getAdminStatus = createServerFn({ method: "GET" }).handler(async () => {
  const s = await getAdminSession();
  return { unlocked: !!s.data.unlocked };
});

// -------- generic CRUD (admin only) --------
export const adminListAll = createServerFn({ method: "GET" })
  .inputValidator((data: { table: string }) => data)
  .handler(async ({ data }): Promise<{ rows: Array<Record<string, string | number | boolean | null | object>> }> => {
    await requireAdmin();
    if (!validTable(data.table)) throw new Error("Invalid table");
    const sb = supabaseAdmin();
    const q = data.table === "site_settings"
      ? sb.from(data.table).select("*")
      : data.table === "content_blocks"
      ? sb.from(data.table).select("*").order("key")
      : sb.from(data.table).select("*").order("position", { ascending: true, nullsFirst: false });
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return { rows: JSON.parse(JSON.stringify(rows ?? [])) };
  });

export const adminUpsertRow = createServerFn({ method: "POST" })
  .inputValidator((data: { table: string; row: Record<string, unknown> }) => data)
  .handler(async ({ data }) => {
    await requireAdmin();
    if (!validTable(data.table)) throw new Error("Invalid table");
    const sb = supabaseAdmin();
    // Use upsert; content_blocks has 'key' PK, site_settings has 'id' PK singleton.
    const conflictCol = data.table === "content_blocks" ? "key" : data.table === "seo_pages" ? "path" : "id";
    const row = { ...data.row };
    if (data.table === "site_settings") row.id = 1;
    const { data: upserted, error } = await sb.from(data.table).upsert(row, { onConflict: conflictCol }).select().maybeSingle();
    if (error) throw new Error(error.message);
    return { row: JSON.parse(JSON.stringify(upserted ?? null)) as Record<string, string | number | boolean | null | object> | null };
  });

export const adminDeleteRow = createServerFn({ method: "POST" })
  .inputValidator((data: { table: string; id: string | number }) => data)
  .handler(async ({ data }) => {
    await requireAdmin();
    if (!validTable(data.table)) throw new Error("Invalid table");
    const sb = supabaseAdmin();
    const idCol = data.table === "content_blocks" ? "key" : data.table === "seo_pages" ? "path" : "id";
    const { error } = await sb.from(data.table).delete().eq(idCol, data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

// -------- image upload (base64 from client) --------
export const adminUploadImage = createServerFn({ method: "POST" })
  .inputValidator((data: { filename: string; contentType: string; base64: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin();
    const sb = supabaseAdmin();
    const bytes = Buffer.from(data.base64, "base64");
    const safe = data.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `uploads/${Date.now()}-${safe}`;
    const { error } = await sb.storage.from(STORAGE_BUCKET).upload(path, bytes, {
      contentType: data.contentType || "application/octet-stream",
      upsert: false,
    });
    if (error) throw new Error(error.message);
    return { path };
  });

// -------- one-shot seed & init --------
export const adminInitialize = createServerFn({ method: "POST" }).handler(async () => {
  await requireAdmin();
  const sb = supabaseAdmin();

  // Ensure bucket exists (idempotent)
  const { data: buckets } = await sb.storage.listBuckets();
  if (!buckets?.some((b) => b.name === STORAGE_BUCKET)) {
    await sb.storage.createBucket(STORAGE_BUCKET, { public: true });
  }

  const seed = await import("./content-seed.server");

  // content_blocks
  const blocksRows = Object.entries(seed.seedContentBlocks).map(([key, data]) => ({ key, data }));
  await sb.from("content_blocks").upsert(blocksRows, { onConflict: "key" });

  // projects — only insert if empty
  const { count: pCount } = await sb.from("projects").select("*", { count: "exact", head: true });
  if (!pCount) await sb.from("projects").insert(seed.seedProjectsData);

  // reviews
  const { count: rCount } = await sb.from("reviews").select("*", { count: "exact", head: true });
  if (!rCount) await sb.from("reviews").insert(seed.seedReviewsData);

  // clients (without logo_url — user re-uploads via admin)
  const { count: cCount } = await sb.from("clients").select("*", { count: "exact", head: true });
  if (!cCount) {
    await sb.from("clients").insert(seed.seedClientsData.map(({ logo_asset_key: _k, ...rest }) => rest));
  }

  // solutions
  const { count: sCount } = await sb.from("solutions").select("*", { count: "exact", head: true });
  if (!sCount) await sb.from("solutions").insert(seed.seedSolutionsData);

  // site_settings
  await sb.from("site_settings").upsert({ id: 1, data: seed.seedSiteSettings }, { onConflict: "id" });

  // seo_pages
  for (const p of seed.seedSeoPages) {
    await sb.from("seo_pages").upsert(p, { onConflict: "path" });
  }

  return { ok: true as const };
});
