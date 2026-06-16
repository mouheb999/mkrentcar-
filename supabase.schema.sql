-- ============================================================
-- SAOUDY RENT CAR — Supabase schema
-- Run this in the Supabase SQL Editor once.
-- ============================================================

-- Enable UUID generator
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------
-- CARS
-- ----------------------------------------------------------------
create table if not exists public.cars (
  id           uuid primary key default gen_random_uuid(),
  name         text        not null,
  brand        text,
  image        text,
  price        int         not null default 100,
  available    boolean     not null default true,
  fuel         text,
  transmission text,
  seats        int,
  horsepower   int,
  year         int,
  category     text,
  tier         text,
  services     text[]      default '{}',
  description  text,
  gallery      text[]      default '{}',
  created_at   timestamptz not null default now()
);

-- If upgrading an existing database, add the new columns:
alter table public.cars add column if not exists tier     text;
alter table public.cars add column if not exists services text[] default '{}';

-- ----------------------------------------------------------------
-- RESERVATIONS
-- ----------------------------------------------------------------
create table if not exists public.reservations (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  phone           text not null,
  car_id          uuid references public.cars(id) on delete set null,
  start_date      date not null,
  end_date        date not null,
  pickup_location text,
  status          text not null default 'pending'
                  check (status in ('pending','contacted','confirmed','cancelled')),
  created_at      timestamptz not null default now(),

  constraint reservation_dates_chk check (end_date >= start_date)
);

create index if not exists reservations_car_id_idx   on public.reservations(car_id);
create index if not exists reservations_status_idx   on public.reservations(status);
create index if not exists reservations_dates_idx    on public.reservations(start_date, end_date);

-- ----------------------------------------------------------------
-- REALTIME — make sure the tables broadcast changes
-- Wrapped in DO blocks so re-running the script doesn't fail with
-- "relation is already member of publication".
-- ----------------------------------------------------------------
do $$
begin
  alter publication supabase_realtime add table public.reservations;
exception
  when duplicate_object then null;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.cars;
exception
  when duplicate_object then null;
end $$;

-- ----------------------------------------------------------------
-- RLS — SECURE POLICIES
-- anon (public, browser) can:
--   • SELECT available cars only
--   • INSERT new reservations (pending status only)
-- anon CANNOT:
--   • write to cars (no competitor sabotage)
--   • read reservations (no customer PII leak)
--   • update reservations (no confirm/cancel hijacking)
-- Admin writes must go through server-side API routes using service_role.
-- ----------------------------------------------------------------
alter table public.cars         enable row level security;
alter table public.reservations enable row level security;

-- Drop every previously-existing permissive policy
drop policy if exists "cars read"            on public.cars;
drop policy if exists "cars write"           on public.cars;
drop policy if exists "cars public read"     on public.cars;
drop policy if exists "reservations read"    on public.reservations;
drop policy if exists "reservations insert"  on public.reservations;
drop policy if exists "reservations update"  on public.reservations;
drop policy if exists "reservations public insert" on public.reservations;

-- CARS: public can read only available cars. No insert/update/delete for anon.
create policy "cars public read"
  on public.cars
  for select
  to anon, authenticated
  using (available = true);

-- RESERVATIONS: public can only INSERT a pending booking. No read/update/delete.
create policy "reservations public insert"
  on public.reservations
  for insert
  to anon, authenticated
  with check (status = 'pending');

-- ----------------------------------------------------------------
-- AVAILABILITY CHECK — safe public helper
-- Booking flow needs to know if a car is free on given dates WITHOUT
-- exposing the list of reservations (which contain client phone numbers).
-- SECURITY DEFINER runs with the function owner's rights, bypassing RLS,
-- but only returns a single boolean — no customer data leaks out.
-- ----------------------------------------------------------------
create or replace function public.is_car_available(
  p_car_id uuid,
  p_start  date,
  p_end    date
) returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select not exists (
    select 1
    from public.reservations
    where car_id = p_car_id
      and status in ('pending', 'confirmed')
      and start_date <= p_end
      and end_date   >= p_start
  );
$$;

-- Lock the function down to just anon + authenticated (revoke from PUBLIC first
-- because CREATE FUNCTION grants EXECUTE to PUBLIC by default).
revoke all on function public.is_car_available(uuid, date, date) from public;
grant execute on function public.is_car_available(uuid, date, date) to anon, authenticated;

-- ----------------------------------------------------------------
-- SEED — Saoudy Rent Car fleet.
-- Images are served locally from /public/cars/ so the `image` column
-- stores the public path used by the Next.js app.
-- Comment out if you'd rather add cars via the admin UI.
-- ----------------------------------------------------------------
insert into public.cars (name, brand, image, price, fuel, transmission, seats, horsepower, year, category, tier, services, description, gallery)
values
  ('BMW 5 Series','BMW','/cars/bmw-5-series-front.png',400,'Diesel','Automatique',5,252,2023,'Berline','Berline de Luxe',
   array['Location','Chauffeur'],
   'L''alliance parfaite entre puissance et raffinement. La BMW Série 5 offre une expérience de conduite executive, idéale pour les déplacements d''affaires et les occasions prestigieuses.',
   array['/cars/bmw-5-series-front.png','/cars/bmw-5-series-back.png']),
  ('Mercedes E-Class','Mercedes-Benz','/cars/mercedes-e-class-front.png',450,'Diesel','Automatique',5,245,2022,'Berline','Berline Exécutive',
   array['Location','Chauffeur'],
   'Le summum du confort allemand. La Mercedes Classe E incarne l''élégance executive avec un habitacle silencieux et une finition irréprochable pour vos transferts VIP.',
   array['/cars/mercedes-e-class-front.png','/cars/mercedes-e-class-back.png']),
  ('Mercedes C-Class','Mercedes-Benz','/cars/mercedes-c-class-front.png',280,'Diesel','Automatique',5,184,2017,'Berline','Berline Affaires',
   array['Location','Chauffeur'],
   'Sportive et élégante, la Mercedes Classe C allie prestige et agilité. Un choix premium accessible pour vos trajets professionnels et personnels.',
   array['/cars/mercedes-c-class-front.png','/cars/mercedes-c-class-back.png']),
  ('Volkswagen Golf 8','Volkswagen','/cars/vw-golf-8-front.png',180,'Essence','Automatique',5,150,2022,'Compacte','Compacte Premium',
   array['Location'],
   'Compacte, moderne et technologique. La Golf 8 offre une conduite dynamique et un équipement de pointe dans un format idéal pour la ville comme pour la route.',
   array['/cars/vw-golf-8-front.png','/cars/vw-golf-8-back.png']),
  ('Volkswagen Multivan T6','Volkswagen','/cars/vw-multivan-front.png',500,'Diesel','Automatique',7,204,2021,'Van','Van VIP',
   array['Transfert VIP','Transport de Groupe','Chauffeur'],
   'Le transport de groupe sans compromis sur le luxe. Le Multivan T6 accueille jusqu''à 7 passagers dans un confort spacieux, parfait pour les transferts VIP et le tourisme.',
   array['/cars/vw-multivan-front.png','/cars/vw-multivan-back.png']),
  ('Fiat Scudo','Fiat','/cars/fiat-scudo-front.png',350,'Diesel','Manuelle',8,145,2022,'Van','Van Transfert',
   array['Transfert Aéroport','Transport de Groupe','Chauffeur'],
   'Spacieux et fiable, le Fiat Scudo est la solution idéale pour les transferts aéroport et le transport de groupes jusqu''à 8 personnes avec bagages.',
   array['/cars/fiat-scudo-front.png','/cars/fiat-scudo-back.png'])
on conflict do nothing;
