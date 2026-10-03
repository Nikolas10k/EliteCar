-- Elite Car — anúncios de veículos
-- Roda no mesmo projeto Supabase do ar-repasse, por isso tudo usa o prefixo elitecar_
-- para não colidir com as tabelas, funções e buckets que já existem lá.
-- Apenas o essencial para publicar: sem Renavam, chassi, placa ou campos documentais.

create type public.elitecar_vehicle_status as enum ('disponivel', 'indisponivel', 'vendido');

create table public.elitecar_vehicles (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  brand       text not null,
  model       text not null,
  version     text,
  year        smallint not null check (year between 1950 and 2100),
  price       numeric(12, 2) not null check (price >= 0),
  mileage     integer not null default 0 check (mileage >= 0),
  images      text[] not null default '{}',
  status      public.elitecar_vehicle_status not null default 'disponivel',
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index elitecar_vehicles_status_idx on public.elitecar_vehicles (status);

create or replace function public.elitecar_set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger elitecar_vehicles_set_updated_at
before update on public.elitecar_vehicles
for each row execute function public.elitecar_set_updated_at();

-- Apresentação: leitura pública; escrita só via service role / painel do Supabase.
alter table public.elitecar_vehicles enable row level security;

create policy "elitecar: catálogo público" on public.elitecar_vehicles
  for select to anon, authenticated using (true);

grant select on public.elitecar_vehicles to anon, authenticated;
