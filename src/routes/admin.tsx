import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  unlockAdmin, lockAdmin, getAdminStatus,
  adminListAll, adminUpsertRow, adminDeleteRow, adminUploadImage, adminInitialize,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin" }, { name: "robots", content: "noindex, nofollow" }] }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({ queryKey: ["admin-status"], queryFn: () => getAdminStatus() });
    return null;
  },
  component: AdminRoute,
});

function AdminRoute() {
  const { data: status } = useSuspenseQuery({ queryKey: ["admin-status"], queryFn: () => getAdminStatus() });
  if (!status.unlocked) return <LoginScreen />;
  return <AdminShell />;
}

function LoginScreen() {
  const qc = useQueryClient();
  const doUnlock = useServerFn(unlockAdmin);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const res = await doUnlock({ data: { password } });
      if (!res.ok) setError(res.error ?? "Error"); else qc.invalidateQueries({ queryKey: ["admin-status"] });
    } catch (err) { setError((err as Error).message); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-neutral-950 text-white p-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl border border-white/10 bg-neutral-900 p-8">
        <h1 className="text-2xl font-semibold">Panel de administración</h1>
        <p className="text-sm text-white/60">Ingresa la contraseña para continuar.</p>
        <input
          type="password" autoFocus value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="w-full rounded-md border border-white/15 bg-neutral-800 px-3 py-2 text-sm outline-none focus:border-[#EC4392]"
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit" disabled={loading || !password}
          className="w-full rounded-md bg-[#EC4392] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >{loading ? "Verificando..." : "Entrar"}</button>
      </form>
    </div>
  );
}

const SECTIONS = [
  { key: "content_blocks", label: "Textos (i18n)" },
  { key: "projects", label: "Proyectos" },
  { key: "reviews", label: "Reseñas" },
  { key: "clients", label: "Clientes" },
  { key: "solutions", label: "Servicios" },
  { key: "team", label: "Equipo" },
  { key: "faq", label: "FAQ" },
  { key: "socials", label: "Redes sociales" },
  { key: "contact_info", label: "Contacto" },
  { key: "seo_pages", label: "SEO" },
  { key: "site_settings", label: "Configuración" },
] as const;

function AdminShell() {
  const qc = useQueryClient();
  const doLock = useServerFn(lockAdmin);
  const doInit = useServerFn(adminInitialize);
  const [active, setActive] = useState<(typeof SECTIONS)[number]["key"]>("content_blocks");
  const [initMsg, setInitMsg] = useState<string | null>(null);

  const init = useMutation({
    mutationFn: () => doInit(),
    onSuccess: () => {
      setInitMsg("✓ Inicializado. Recarga el sitio público para ver el contenido.");
      qc.invalidateQueries();
    },
    onError: (e: Error) => setInitMsg(`✗ ${e.message}`),
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex">
      <aside className="w-64 shrink-0 border-r border-white/10 p-4 space-y-1">
        <div className="mb-4 px-2">
          <h1 className="text-lg font-bold">Admin</h1>
          <p className="text-[11px] text-white/50">Contenido del sitio</p>
        </div>
        {SECTIONS.map((s) => (
          <button
            key={s.key} onClick={() => setActive(s.key)}
            className={`w-full text-left rounded-md px-3 py-2 text-sm transition ${active === s.key ? "bg-[#EC4392]/20 text-white" : "text-white/70 hover:bg-white/5"}`}
          >{s.label}</button>
        ))}
        <div className="pt-4 mt-4 border-t border-white/10 space-y-2">
          <button
            onClick={() => init.mutate()} disabled={init.isPending}
            className="w-full rounded-md bg-white/10 hover:bg-white/15 px-3 py-2 text-xs"
          >{init.isPending ? "Inicializando..." : "Inicializar contenido y Storage"}</button>
          {initMsg && <p className="text-[11px] text-white/70 whitespace-pre-wrap">{initMsg}</p>}
          <button
            onClick={async () => { await doLock(); qc.invalidateQueries({ queryKey: ["admin-status"] }); }}
            className="w-full rounded-md border border-white/10 hover:bg-white/5 px-3 py-2 text-xs"
          >Cerrar sesión</button>
          <a href="/" target="_blank" rel="noreferrer" className="block text-center rounded-md border border-white/10 hover:bg-white/5 px-3 py-2 text-xs">Ver sitio ↗</a>
        </div>
      </aside>
      <main className="flex-1 min-w-0 p-6 overflow-x-auto">
        <SectionEditor table={active} />
      </main>
    </div>
  );
}

function SectionEditor({ table }: { table: string }) {
  const qc = useQueryClient();
  const doList = useServerFn(adminListAll);
  const doUpsert = useServerFn(adminUpsertRow);
  const doDelete = useServerFn(adminDeleteRow);

  const list = useQuery({
    queryKey: ["admin-list", table],
    queryFn: () => doList({ data: { table } }),
  });

  const upsert = useMutation({
    mutationFn: (row: Record<string, unknown>) => doUpsert({ data: { table, row } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-list", table] }),
  });
  const del = useMutation({
    mutationFn: (id: string | number) => doDelete({ data: { table, id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-list", table] }),
  });

  const rows = (list.data?.rows ?? []) as Array<Record<string, unknown>>;
  const columns = useMemo(() => tableColumns(table), [table]);

  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);

  if (list.isLoading) return <p className="text-white/60">Cargando…</p>;
  if (list.error) return <p className="text-red-400">Error: {(list.error as Error).message}</p>;

  const isSingleton = table === "site_settings";

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">{SECTIONS.find((s) => s.key === table)?.label}</h2>
        {!isSingleton && (
          <button
            onClick={() => setEditing(defaultRow(table))}
            className="rounded-md bg-[#EC4392] px-4 py-2 text-sm font-semibold"
          >+ Nuevo</button>
        )}
      </div>

      {isSingleton && rows.length === 0 && (
        <button onClick={() => setEditing(defaultRow(table))} className="rounded-md bg-[#EC4392] px-4 py-2 text-sm font-semibold mb-4">Crear</button>
      )}

      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-white/60 text-xs">
            <tr>
              {columns.map((c) => <th key={c} className="text-left px-3 py-2 font-medium">{c}</th>)}
              <th className="px-3 py-2 w-32" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={String(r.id ?? r.key ?? r.path ?? i)} className="border-t border-white/5 hover:bg-white/[0.03]">
                {columns.map((c) => <td key={c} className="px-3 py-2 max-w-xs truncate">{renderCell(r[c])}</td>)}
                <td className="px-3 py-2 text-right space-x-2 whitespace-nowrap">
                  <button onClick={() => setEditing(r)} className="text-xs text-[#EC4392] hover:underline">Editar</button>
                  {!isSingleton && (
                    <button
                      onClick={() => { if (confirm("¿Eliminar?")) del.mutate((r.id ?? r.key ?? r.path) as string | number); }}
                      className="text-xs text-red-400 hover:underline"
                    >Eliminar</button>
                  )}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={columns.length + 1} className="px-3 py-8 text-center text-white/50">Sin datos. {isSingleton ? "Crea el registro inicial o ejecuta 'Inicializar contenido'." : "Agrega uno o ejecuta 'Inicializar contenido'."}</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <RowEditor
          table={table}
          row={editing}
          onCancel={() => setEditing(null)}
          onSave={async (row) => { await upsert.mutateAsync(row); setEditing(null); }}
        />
      )}
    </div>
  );
}

function tableColumns(table: string): string[] {
  switch (table) {
    case "content_blocks": return ["key"];
    case "projects": return ["name", "position", "featured"];
    case "reviews": return ["name", "initial", "date_label", "position"];
    case "clients": return ["name", "position"];
    case "solutions": return ["position", "icon_svg_path"];
    case "team": return ["name", "position"];
    case "faq": return ["position"];
    case "socials": return ["platform", "url", "position"];
    case "contact_info": return ["kind", "label", "value", "position"];
    case "seo_pages": return ["path"];
    case "site_settings": return ["id"];
    default: return ["id"];
  }
}

function defaultRow(table: string): Record<string, unknown> {
  switch (table) {
    case "content_blocks": return { key: "", data: {} };
    case "projects": return { name: "", url: "", domain: "", image_url: null, position: 0, featured: true };
    case "reviews": return { name: "", initial: "", color: "#EC4392", date_label: "", text_body: "", position: 0 };
    case "clients": return { name: "", logo_url: null, position: 0 };
    case "solutions": return { icon_svg_path: "", position: 0, i18n: { es: { title: "", description: "" } } };
    case "team": return { name: "", photo_url: null, position: 0, i18n: { es: { role: "", bio: "" } } };
    case "faq": return { position: 0, i18n: { es: { question: "", answer: "" } } };
    case "socials": return { platform: "", url: "https://", icon: "", position: 0 };
    case "contact_info": return { kind: "phone", label: "", value: "", position: 0 };
    case "seo_pages": return { path: "/", i18n: { es: { title: "", description: "" } } };
    case "site_settings": return { id: 1, data: { whatsapp_number: "" } };
    default: return {};
  }
}

function renderCell(v: unknown): React.ReactNode {
  if (v === null || v === undefined) return <span className="text-white/30">—</span>;
  if (typeof v === "boolean") return v ? "sí" : "no";
  if (typeof v === "object") return <span className="text-white/40 text-xs font-mono">{"{…}"}</span>;
  return String(v);
}

// -------- Row Editor Drawer --------
function RowEditor({
  table, row, onSave, onCancel,
}: {
  table: string;
  row: Record<string, unknown>;
  onSave: (row: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState<Record<string, unknown>>(() => JSON.parse(JSON.stringify(row)));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const doUpload = useServerFn(adminUploadImage);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setDraft(JSON.parse(JSON.stringify(row))); }, [row]);

  const fields = editableFields(table);

  async function handleUpload(field: string, file: File) {
    const b64 = await fileToBase64(file);
    const res = await doUpload({ data: { filename: file.name, contentType: file.type, base64: b64 } });
    setDraft((d) => ({ ...d, [field]: res.path }));
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-stretch justify-end">
      <div className="w-full max-w-2xl bg-neutral-900 border-l border-white/10 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Editar</h3>
          <button onClick={onCancel} className="text-white/60 hover:text-white">✕</button>
        </div>

        <div className="space-y-4">
          {fields.map((f) => (
            <div key={f.name}>
              <label className="block text-xs font-medium text-white/70 mb-1">{f.label}</label>
              {f.type === "textarea" ? (
                <textarea
                  value={String(draft[f.name] ?? "")}
                  onChange={(e) => setDraft((d) => ({ ...d, [f.name]: e.target.value }))}
                  rows={4}
                  className="w-full rounded-md border border-white/15 bg-neutral-800 px-3 py-2 text-sm outline-none focus:border-[#EC4392]"
                />
              ) : f.type === "boolean" ? (
                <input
                  type="checkbox" checked={!!draft[f.name]}
                  onChange={(e) => setDraft((d) => ({ ...d, [f.name]: e.target.checked }))}
                  className="size-4"
                />
              ) : f.type === "number" ? (
                <input
                  type="number" value={Number(draft[f.name] ?? 0)}
                  onChange={(e) => setDraft((d) => ({ ...d, [f.name]: Number(e.target.value) }))}
                  className="w-full rounded-md border border-white/15 bg-neutral-800 px-3 py-2 text-sm outline-none focus:border-[#EC4392]"
                />
              ) : f.type === "image" ? (
                <div className="flex items-center gap-3">
                  <input
                    type="text" value={String(draft[f.name] ?? "")}
                    onChange={(e) => setDraft((d) => ({ ...d, [f.name]: e.target.value || null }))}
                    placeholder="ruta/en/storage.png o URL absoluta"
                    className="flex-1 rounded-md border border-white/15 bg-neutral-800 px-3 py-2 text-sm outline-none focus:border-[#EC4392]"
                  />
                  <input
                    ref={fileRef} type="file" accept="image/*" hidden
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) await handleUpload(f.name, file);
                      if (fileRef.current) fileRef.current.value = "";
                    }}
                  />
                  <button type="button" onClick={() => fileRef.current?.click()} className="rounded-md bg-white/10 hover:bg-white/15 px-3 py-2 text-xs whitespace-nowrap">Subir</button>
                </div>
              ) : f.type === "json" ? (
                <JsonEditor value={draft[f.name]} onChange={(v) => setDraft((d) => ({ ...d, [f.name]: v }))} />
              ) : (
                <input
                  type="text" value={String(draft[f.name] ?? "")}
                  onChange={(e) => setDraft((d) => ({ ...d, [f.name]: e.target.value }))}
                  className="w-full rounded-md border border-white/15 bg-neutral-800 px-3 py-2 text-sm outline-none focus:border-[#EC4392]"
                />
              )}
            </div>
          ))}
        </div>

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <div className="mt-6 flex gap-2 justify-end sticky bottom-0 bg-neutral-900 py-3 -mx-6 px-6 border-t border-white/10">
          <button onClick={onCancel} className="rounded-md border border-white/10 px-4 py-2 text-sm">Cancelar</button>
          <button
            disabled={saving}
            onClick={async () => {
              setSaving(true); setError(null);
              try { await onSave(draft); } catch (e) { setError((e as Error).message); }
              finally { setSaving(false); }
            }}
            className="rounded-md bg-[#EC4392] px-4 py-2 text-sm font-semibold disabled:opacity-50"
          >{saving ? "Guardando..." : "Guardar"}</button>
        </div>
      </div>
    </div>
  );
}

type Field = { name: string; label: string; type: "text" | "textarea" | "number" | "boolean" | "image" | "json" };

function editableFields(table: string): Field[] {
  switch (table) {
    case "content_blocks":
      return [
        { name: "key", label: "Clave (nav, hero, cases, reviews_copy, clients_copy, solutions_intro, stats, cta, footer)", type: "text" },
        { name: "data", label: "Datos por idioma (es, en, pt, fr, de, it)", type: "json" },
      ];
    case "projects":
      return [
        { name: "name", label: "Nombre", type: "text" },
        { name: "url", label: "URL", type: "text" },
        { name: "domain", label: "Dominio (visible)", type: "text" },
        { name: "image_url", label: "Imagen (storage path o URL)", type: "image" },
        { name: "position", label: "Orden", type: "number" },
        { name: "featured", label: "Destacado (home)", type: "boolean" },
      ];
    case "reviews":
      return [
        { name: "name", label: "Nombre", type: "text" },
        { name: "initial", label: "Iniciales", type: "text" },
        { name: "color", label: "Color avatar (hex)", type: "text" },
        { name: "date_label", label: "Fecha (texto libre)", type: "text" },
        { name: "text_body", label: "Reseña", type: "textarea" },
        { name: "position", label: "Orden", type: "number" },
      ];
    case "clients":
      return [
        { name: "name", label: "Nombre", type: "text" },
        { name: "logo_url", label: "Logo", type: "image" },
        { name: "position", label: "Orden", type: "number" },
      ];
    case "solutions":
      return [
        { name: "icon_svg_path", label: "Path SVG (d=)", type: "textarea" },
        { name: "position", label: "Orden", type: "number" },
        { name: "i18n", label: "Traducciones {es:{title,description},...}", type: "json" },
      ];
    case "team":
      return [
        { name: "name", label: "Nombre", type: "text" },
        { name: "photo_url", label: "Foto", type: "image" },
        { name: "position", label: "Orden", type: "number" },
        { name: "i18n", label: "Traducciones {es:{role,bio},...}", type: "json" },
      ];
    case "faq":
      return [
        { name: "position", label: "Orden", type: "number" },
        { name: "i18n", label: "Traducciones {es:{question,answer},...}", type: "json" },
      ];
    case "socials":
      return [
        { name: "platform", label: "Plataforma", type: "text" },
        { name: "url", label: "URL", type: "text" },
        { name: "icon", label: "Ícono (nombre lucide o SVG path)", type: "text" },
        { name: "position", label: "Orden", type: "number" },
      ];
    case "contact_info":
      return [
        { name: "kind", label: "Tipo (phone/email/address/whatsapp)", type: "text" },
        { name: "label", label: "Etiqueta", type: "text" },
        { name: "value", label: "Valor", type: "text" },
        { name: "position", label: "Orden", type: "number" },
      ];
    case "seo_pages":
      return [
        { name: "path", label: "Ruta (ej: /, /portafolio)", type: "text" },
        { name: "i18n", label: "Traducciones {es:{title,description,og_image_path?},...}", type: "json" },
      ];
    case "site_settings":
      return [{ name: "data", label: "Configuración global (JSON)", type: "json" }];
    default:
      return [];
  }
}

function JsonEditor({ value, onChange }: { value: unknown; onChange: (v: unknown) => void }) {
  const [text, setText] = useState(() => JSON.stringify(value ?? {}, null, 2));
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { setText(JSON.stringify(value ?? {}, null, 2)); }, [value]);
  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          try { onChange(JSON.parse(e.target.value)); setError(null); }
          catch (err) { setError((err as Error).message); }
        }}
        rows={14}
        spellCheck={false}
        className="w-full rounded-md border border-white/15 bg-neutral-800 px-3 py-2 text-xs font-mono outline-none focus:border-[#EC4392]"
      />
      {error && <p className="text-[11px] text-red-400 mt-1">JSON inválido: {error}</p>}
    </div>
  );
}

async function fileToBase64(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}
