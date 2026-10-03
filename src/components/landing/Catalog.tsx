"use client";

import { useState } from "react";
import { type Vehicle, type VehicleStatus, STATUS_LABEL } from "@/lib/vehicles";
import { SectionHeading } from "./SectionHeading";
import { VehicleCard } from "./VehicleCard";

const filters: Array<"todos" | VehicleStatus> = ["todos", "disponivel", "indisponivel", "vendido"];

export function Catalog({ vehicles: all }: { vehicles: Vehicle[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("todos");
  const vehicles = filter === "todos" ? all : all.filter((v) => v.status === filter);

  return (
    <section id="catalogo" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Catálogo em destaque"
            title={
              <>
                Cada veículo apresentado <span className="text-chrome">como produto premium.</span>
              </>
            }
            description="Fotos grandes, informações essenciais e status sempre atualizado. É assim que os seus anúncios aparecem para o comprador."
          />

          <div
            data-reveal
            role="tablist"
            aria-label="Filtrar por status"
            className="flex shrink-0 gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] p-1"
          >
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${
                  filter === f
                    ? "bg-brand text-white shadow-[0_0_20px_-4px_rgb(225_6_0/0.8)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {f === "todos" ? "Todos" : STATUS_LABEL[f]}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle, i) => (
            <div
              key={vehicle.id}
              data-reveal
              style={{ "--delay": `${(i % 3) * 90}ms` } as React.CSSProperties}
              className={`flex ${i === 0 && filter === "todos" ? "sm:col-span-2 lg:row-span-2" : ""}`}
            >
              <VehicleCard vehicle={vehicle} large={i === 0 && filter === "todos"} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
