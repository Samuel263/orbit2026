
## Restricciones de plataforma (importantes)

1. **Tu Supabase es externo a Lovable.** Lovable no puede aplicar migraciones ni crear el bucket de Storage automáticamente en un proyecto Supabase propio. Te voy a entregar **un archivo SQL** que ejecutas una vez en el SQL Editor de tu Supabase + **un botón "Inicializar Storage"** en el panel admin que crea el bucket con la service role key.
2. **Los prefijos `VITE_` y `SUPABASE_` están reservados por Lovable.** No puedo exponer la URL/anon key al bundle del cliente. Solución: **todas las lecturas van por server functions** (SSR, seguro, funciona igual visualmente).
3. **Cero datos hardcodeados como respaldo.** Si la DB está vacía, el sitio queda vacío (según lo pediste). Por eso el SQL incluye seed completo desde `site-content.ts`.

## Secrets ya configurados

- `APP_SUPABASE_URL`, `APP_SUPABASE_ANON_KEY`, `APP_SUPABASE_SERVICE_ROLE_KEY` — tu Supabase.
- `ADMIN_PASSWORD` = `tutty2026`, `ADMIN_SESSION_SECRET` — password gate.

## Schema (14 tablas, todo con `lang` para i18n donde aplica)

```text
site_settings         (singleton: config general, contacto, redes, WhatsApp)
translations          (key, lang, value)  — copy libre (hero, cases, cta, reviews copy, footer, nav, clients)
projects              (name, url, domain, image_path, order, featured)
reviews               (name, initial, color, date, text, order)
solutions             (icon_path_d, order) + solutions_i18n(solution_id, lang, title, description)
clients               (name, logo_path, order)
faq                   + faq_i18n(faq_id, lang, question, answer)
team                  (name, role_path, photo_path, order) + team_i18n
services              (icon, order) + services_i18n   [alias de solutions con detalle extendido]
socials               (platform, url, icon, order)
contact_info          (label, value, type, order)  — teléfono, email, dirección
seo_pages             (path, title, description, og_image_path)
gallery               (project_id, image_path, caption, order)
assets                (path, alt, kind)  — catálogo maestro de imágenes en Storage
```

Storage bucket: `site-assets` (público, lectura anónima; escritura solo service role via server fn).

RLS: SELECT público para anon en todo (contenido de sitio público). INSERT/UPDATE/DELETE bloqueado a anon — solo el admin server fn con service role puede escribir.

## Arquitectura de acceso

```text
Browser
  ├─ Lecturas: useSuspenseQuery → getSiteContent server fn → anon supabase → DB
  └─ Admin:
       - unlockAdmin(password)  → sesión encriptada en cookie httpOnly (patrón shared-password-gate)
       - adminMutate(...)        → verifica sesión → service role supabase → DB
       - adminUpload(file)       → verifica sesión → Storage
```

## Archivos a crear

**Backend / infra**
- `supabase/migrations/0001_init.sql` — schema completo + seed con todo el contenido actual traducido en 6 idiomas.
- `src/lib/supabase.server.ts` — clients anon + admin.
- `src/lib/admin-session.server.ts` — `useSession` para gate.
- `src/lib/content.functions.ts` — `getSiteContent()` (una sola llamada devuelve todo lo público en un idioma).
- `src/lib/admin.functions.ts` — `unlockAdmin`, `lockAdmin`, `adminSession`, `adminUpsert*`, `adminDelete*`, `adminUploadImage`, `adminInitStorage`.

**Rutas admin**
- `src/routes/admin.tsx` — layout con gate + sidebar.
- `src/routes/admin.index.tsx` — dashboard.
- `src/routes/admin.login.tsx` — form password.
- `src/routes/admin.textos.tsx` — editor de translations (por idioma y sección).
- `src/routes/admin.proyectos.tsx` — CRUD proyectos + imágenes.
- `src/routes/admin.reseñas.tsx` — CRUD reviews.
- `src/routes/admin.servicios.tsx` — CRUD services/solutions + i18n.
- `src/routes/admin.clientes.tsx` — CRUD logos.
- `src/routes/admin.equipo.tsx` — CRUD team.
- `src/routes/admin.faq.tsx` — CRUD FAQ.
- `src/routes/admin.contacto.tsx` — redes + info contacto.
- `src/routes/admin.seo.tsx` — SEO por página.
- `src/routes/admin.configuracion.tsx` — site_settings.

**Refactor de vistas existentes** (mismo diseño, datos desde DB)
- `src/routes/index.tsx`, `src/routes/portafolio.tsx`, `src/routes/opiniones.tsx`
- `src/routes/__root.tsx` (SEO desde DB)
- `src/components/SiteNav.tsx`, `src/components/SiteFooter.tsx`, `src/components/WhatsAppButton.tsx` (número desde DB)

**Removidos**
- `src/lib/site-content.ts` se convierte en tipos TS únicamente (sin datos).
- Imports de imágenes locales de `src/assets/` para clientes/proyectos se reemplazan por URLs de Storage (los subo al bucket como parte del seed automatizado que ejecuto post-migración).

## Paso a paso de entrega

1. Escribo todo el código (schema SQL, server fns, admin, refactor).
2. Te doy el SQL para pegar en tu Supabase SQL Editor.
3. Entrás a `/admin`, password `tutty2026`, click "Inicializar Storage" (crea bucket + sube imágenes actuales).
4. Verificación visual: comparo home antes/después con Playwright y screenshots. Si falta algo, lo migro.

## Riesgos y notas

- **~30 archivos nuevos/modificados.** Probable que salgan errores de tipos/build en el primer intento; los itero.
- **Seed en 6 idiomas** = SQL grande (~800 líneas). Lo hago desde `site-content.ts` directamente para no perder ni una traducción.
- **Password compartida sin rate limit** como pediste. Consideralo temporal — si el sitio se hace público conviene agregarlo después.
- **Imágenes de clientes/proyectos**: subida automática al bucket la hago desde una server fn de seed que corre con service role la primera vez (leyendo los assets locales existentes del bundle).

¿Confirmás el plan y arranco?
