"use client";

import Image from "next/image";
import { useState } from "react";
import { type Vehicle, type VehicleStatus, STATUS_LABEL, formatMileage, formatPrice } from "@/lib/vehicles";
import { SectionHeading } from "./SectionHeading";
import { CarIcon, Check, Gear, Grid, Pencil, Plus, Upload } from "./icons";

const capabilities = [
  { icon: Plus, label: "Criar anúncio" },
  { icon: Pencil, label: "Editar anúncio" },
  { icon: Upload, label: "Subir fotos" },
  { icon: Check, label: "Marcar como vendido" },
  { icon: Gear, label: "Marcar como indisponível" },
];

const statusOrder: VehicleStatus[] = ["disponivel", "indisponivel", "vendido"];
const statusPlural: Record<VehicleStatus, string> = {
  disponivel: "Disponíveis",
  indisponivel: "Indisponíveis",
  vendido: "Vendidos",
};
const statusTone: Record<VehicleStatus, string> = {
  disponivel: "bg-emerald-500/20 text-emerald-300",
  indisponivel: "bg-amber-500/20 text-amber-200",
  vendido: "bg-brand/30 text-red-100",
};

export function AdminPreview({ initialVehicles }: { initialVehicles: Vehicle[] }) {
  // Prévia: as mudanças de status ficam só no navegador, sem gravar no banco.
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles.slice(0, 5));
  const [selectedId, setSelectedId] = useState(vehicles[0].id);
  const selected = vehicles.find((v) => v.id === selectedId) ?? vehicles[0];

  const setStatus = (id: string, status: VehicleStatus) =>
    setVehicles((list) => list.map((v) => (v.id === id ? { ...v, status } : v)));

  const count = (status: VehicleStatus) => vehicles.filter((v) => v.status === status).length;

  return (
    <section id="painel" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/3 h-[600px] bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgb(225_6_0/0.13),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            eyebrow="Painel administrativo"
            title={
              <>
                Controle total dos anúncios, <span className="text-energy">sem complicação.</span>
              </>
            }
            description="Um painel limpo e direto. Experimente: troque o status de um veículo abaixo e veja os números se atualizarem."
          />
          <ul data-reveal className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
            {capabilities.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm text-zinc-300">
                <Icon width={15} height={15} className="text-brand-bright" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Janela do painel */}
        <div
          data-reveal
          className="mt-14 overflow-hidden rounded-[28px] border border-white/10 bg-ink-900/90 shadow-[0_30px_90px_-50px_rgb(225_6_0/0.45)] backdrop-blur"
        >
          <div className="flex items-center gap-2 border-b border-white/5 bg-black/40 px-5 py-3.5">
            <span className="size-3 rounded-full bg-white/10" />
            <span className="size-3 rounded-full bg-white/10" />
            <span className="size-3 rounded-full bg-white/10" />
            <span className="ml-4 hidden rounded-md bg-white/5 px-3 py-1 text-xs text-zinc-500 sm:block">elitecar.app/painel/anuncios</span>
          </div>

          <div className="grid lg:grid-cols-[220px_1fr_340px]">
            {/* Menu lateral */}
            <aside className="hidden border-r border-white/5 p-4 lg:block">
              <p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600">Loja</p>
              {[
                { icon: Grid, label: "Anúncios", active: true },
                { icon: Plus, label: "Novo anúncio" },
                { icon: Upload, label: "Fotos" },
                { icon: Gear, label: "Configurações" },
              ].map(({ icon: Icon, label, active }) => (
                <div
                  key={label}
                  className={`mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
                    active ? "bg-brand/15 text-white ring-1 ring-brand/30" : "text-zinc-400"
                  }`}
                >
                  <Icon width={17} height={17} className={active ? "text-brand-bright" : ""} />
                  {label}
                </div>
              ))}
            </aside>

            {/* Lista de anúncios */}
            <div className="min-w-0 p-4 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">Meus anúncios</h3>
                  <p className="text-sm text-zinc-500">{vehicles.length} veículos cadastrados</p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-medium text-white shadow-[0_0_20px_-4px_rgb(225_6_0/0.8)]"
                >
                  <Plus width={16} height={16} /> Novo anúncio
                </button>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
                {statusOrder.map((s) => (
                  <div key={s} className="rounded-2xl border border-white/5 bg-white/[0.03] p-3 sm:p-4">
                    <p className="text-[11px] text-zinc-500 sm:text-xs">{statusPlural[s]}</p>
                    <p className="mt-1 font-display text-2xl font-semibold text-white tabular-nums sm:text-3xl">{count(s)}</p>
                  </div>
                ))}
              </div>

              <ul className="mt-5 space-y-2">
                {vehicles.map((v) => (
                  <li key={v.id}>
                    <div
                      className={`flex flex-col gap-3 rounded-2xl border p-3 transition sm:flex-row sm:items-center ${
                        v.id === selected.id ? "border-brand/40 bg-brand/[0.06]" : "border-white/5 bg-white/[0.02] hover:border-white/15"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedId(v.id)}
                        className="flex min-w-0 flex-1 items-center gap-3 text-left"
                        aria-label={`Editar ${v.name}`}
                      >
                        <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg">
                          <Image src={v.images[0]} alt="" fill sizes="64px" className={`object-cover ${v.status === "vendido" ? "grayscale" : ""}`} />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-white">
                            {v.name} <span className="text-zinc-500">· {v.year}</span>
                          </span>
                          <span className="block text-sm text-zinc-400">{formatPrice(v.price)}</span>
                        </span>
                      </button>
                      <div className="flex gap-1 rounded-full bg-black/40 p-1" role="radiogroup" aria-label={`Status de ${v.name}`}>
                        {statusOrder.map((s) => (
                          <button
                            key={s}
                            type="button"
                            role="radio"
                            aria-checked={v.status === s}
                            onClick={() => setStatus(v.id, s)}
                            className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
                              v.status === s ? statusTone[s] : "text-zinc-500 hover:text-zinc-200"
                            }`}
                          >
                            {STATUS_LABEL[s]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Edição */}
            <div className="border-t border-white/5 bg-black/30 p-4 sm:p-6 lg:border-l lg:border-t-0">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-display font-semibold text-white">
                  <Pencil width={16} height={16} className="text-brand-bright" /> Editar anúncio
                </h3>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusTone[selected.status]}`}>
                  {STATUS_LABEL[selected.status]}
                </span>
              </div>

              <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-2xl">
                <Image key={selected.id} src={selected.images[0]} alt={selected.name} fill sizes="340px" className="object-cover" />
                <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-0.5 text-[11px] text-zinc-200 backdrop-blur">Capa</span>
              </div>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="relative aspect-square overflow-hidden rounded-lg opacity-60">
                    <Image src={selected.images[0]} alt="" fill sizes="80px" className="object-cover" style={{ objectPosition: `${i * 50}% 50%` }} />
                  </span>
                ))}
                <span className="grid aspect-square place-items-center rounded-lg border border-dashed border-white/20 text-zinc-500">
                  <Upload width={18} height={18} />
                </span>
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-2 text-sm">
                {[
                  ["Marca", selected.brand],
                  ["Modelo", selected.model],
                  ["Versão", selected.version],
                  ["Ano", String(selected.year)],
                  ["Preço", formatPrice(selected.price)],
                  ["Quilometragem", formatMileage(selected.mileage)],
                ].map(([label, value]) => (
                  <div key={label} className={`rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 ${label === "Versão" ? "col-span-2" : ""}`}>
                    <dt className="text-[11px] text-zinc-500">{label}</dt>
                    <dd className="truncate text-zinc-100">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStatus(selected.id, "vendido")}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand py-2.5 text-sm font-medium text-white transition hover:bg-brand-bright"
                >
                  <CarIcon width={16} height={16} /> Marcar vendido
                </button>
                <button
                  type="button"
                  onClick={() => setStatus(selected.id, "indisponivel")}
                  className="rounded-xl border border-white/15 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-white/5"
                >
                  Indisponível
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
