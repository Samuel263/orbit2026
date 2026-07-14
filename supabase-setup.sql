-- ============================================================
-- Site content schema for your EXTERNAL Supabase project.
-- Run this ONCE in your Supabase SQL editor:
--   Supabase Dashboard -> SQL Editor -> New query -> paste -> Run
-- After running, go to /admin (password: tutty2026) and click
-- "Inicializar contenido y Storage" to seed data and upload assets.
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------------- Tables ----------------
create table if not exists public.content_blocks (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text not null,
  domain text not null,
  image_url text,
  position int default 0,
  featured boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  initial text default '',
  color text default '#333333',
  date_label text default '',
  text_body text not null,
  position int default 0,
  created_at timestamptz default now()
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  position int default 0
);

create table if not exists public.solutions (
  id uuid primary key default gen_random_uuid(),
  icon_svg_path text not null default '',
  position int default 0,
  i18n jsonb not null default '{}'::jsonb
);

create table if not exists public.team (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  photo_url text,
  position int default 0,
  i18n jsonb not null default '{}'::jsonb
);

create table if not exists public.faq (
  id uuid primary key default gen_random_uuid(),
  position int default 0,
  i18n jsonb not null default '{}'::jsonb
);

create table if not exists public.socials (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  url text not null,
  icon text default '',
  position int default 0
);

create table if not exists public.contact_info (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  label text default '',
  value text not null,
  position int default 0
);

create table if not exists public.seo_pages (
  id uuid primary key default gen_random_uuid(),
  path text unique not null,
  i18n jsonb not null default '{}'::jsonb
);

create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);

-- ---------------- Grants ----------------
grant usage on schema public to anon, authenticated;
grant select on public.content_blocks, public.projects, public.reviews, public.clients,
  public.solutions, public.team, public.faq, public.socials, public.contact_info,
  public.seo_pages, public.site_settings to anon, authenticated;
grant all on public.content_blocks, public.projects, public.reviews, public.clients,
  public.solutions, public.team, public.faq, public.socials, public.contact_info,
  public.seo_pages, public.site_settings to service_role;

-- ---------------- RLS (public read only; writes via service role) ----------------
alter table public.content_blocks enable row level security;
alter table public.projects enable row level security;
alter table public.reviews enable row level security;
alter table public.clients enable row level security;
alter table public.solutions enable row level security;
alter table public.team enable row level security;
alter table public.faq enable row level security;
alter table public.socials enable row level security;
alter table public.contact_info enable row level security;
alter table public.seo_pages enable row level security;
alter table public.site_settings enable row level security;

do $$ begin create policy "public read" on public.content_blocks for select to anon, authenticated using (true);
  exception when duplicate_object then null; end $$;
do $$ begin create policy "public read" on public.projects for select to anon, authenticated using (true);
  exception when duplicate_object then null; end $$;
do $$ begin create policy "public read" on public.reviews for select to anon, authenticated using (true);
  exception when duplicate_object then null; end $$;
do $$ begin create policy "public read" on public.clients for select to anon, authenticated using (true);
  exception when duplicate_object then null; end $$;
do $$ begin create policy "public read" on public.solutions for select to anon, authenticated using (true);
  exception when duplicate_object then null; end $$;
do $$ begin create policy "public read" on public.team for select to anon, authenticated using (true);
  exception when duplicate_object then null; end $$;
do $$ begin create policy "public read" on public.faq for select to anon, authenticated using (true);
  exception when duplicate_object then null; end $$;
do $$ begin create policy "public read" on public.socials for select to anon, authenticated using (true);
  exception when duplicate_object then null; end $$;
do $$ begin create policy "public read" on public.contact_info for select to anon, authenticated using (true);
  exception when duplicate_object then null; end $$;
do $$ begin create policy "public read" on public.seo_pages for select to anon, authenticated using (true);
  exception when duplicate_object then null; end $$;
do $$ begin create policy "public read" on public.site_settings for select to anon, authenticated using (true);
  exception when duplicate_object then null; end $$;

-- ---------------- Storage bucket ----------------
insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

do $$ begin
  create policy "public read site-assets"
    on storage.objects for select to anon, authenticated
    using (bucket_id = 'site-assets');
exception when duplicate_object then null; end $$;
