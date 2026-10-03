import Image from "next/image";
import { type Vehicle, STATUS_LABEL, formatMileage, formatPrice } from "@/lib/vehicles";
import { ArrowRight } from "./icons";

const statusStyle = {
  disponivel: "border-emerald-400/40 bg-black/60 text-emerald-300",
  indisponivel: "border-amber-400/40 bg-black/60 text-amber-200",
  vendido: "border-brand/60 bg-brand/80 text-white",
} as const;

export function StatusBadge({ status, className = "" }: { status: Vehicle["status"]; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md ${statusStyle[status]} ${className}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {STATUS_LABEL[status]}
    </span>
  );
}

export function VehicleCard({ vehicle, large = false }: { vehicle: Vehicle; large?: boolean }) {
  const sold = vehicle.status === "vendido";

  return (
    <article
      className={`spotlight group flex w-full flex-col overflow-hidden rounded-3xl bg-ink-850 ${large ? "lg:col-span-2 lg:row-span-2" : ""}`}
    >
      <div className={`relative overflow-hidden ${large ? "aspect-[4/3] lg:aspect-auto lg:flex-1" : "aspect-[4/3]"}`}>
        <Image
          src={vehicle.images[0]}
          alt={`${vehicle.brand} ${vehicle.model} ${vehicle.version} ${vehicle.year}`}
          fill
          sizes={large ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className={`object-cover transition duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] ${
            sold ? "grayscale-[0.7] brightness-75" : ""
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-850 via-ink-850/10 to-transparent" />
        <StatusBadge status={vehicle.status} className="absolute left-4 top-4" />
        <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-xs font-medium text-zinc-200 backdrop-blur-md">
          {vehicle.year}
        </span>
        {sold && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-6 border-2 border-brand px-5 py-1.5 font-display text-2xl font-bold uppercase tracking-[0.3em] text-brand-bright shadow-[0_0_30px_rgb(225_6_0/0.5)]">
            Vendido
          </span>
        )}
      </div>

      <div className="relative z-10 -mt-12 flex flex-col gap-4 p-5 sm:p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-bright">{vehicle.brand}</p>
          <h3 className={`mt-1.5 font-display font-semibold tracking-tight text-white ${large ? "text-3xl sm:text-4xl" : "text-xl"}`}>
            {vehicle.model}
          </h3>
          <p className="mt-1 truncate text-sm text-zinc-400">{vehicle.version}</p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
          <span className="rounded-full border border-white/10 px-2.5 py-1">{vehicle.year}</span>
          <span className="rounded-full border border-white/10 px-2.5 py-1">{formatMileage(vehicle.mileage)}</span>
        </div>

        <div className="flex items-end justify-between gap-4 border-t border-white/5 pt-4">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-zinc-500">Preço</p>
            <p className={`font-display font-semibold text-white ${large ? "text-3xl" : "text-2xl"} ${sold ? "text-zinc-500 line-through decoration-brand/70" : ""}`}>
              {formatPrice(vehicle.price)}
            </p>
          </div>
          <a
            href="#comecar"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition group-hover:border-brand group-hover:bg-brand group-hover:shadow-[0_0_24px_-4px_rgb(225_6_0/0.8)]"
          >
            Ver detalhes
            <ArrowRight width={15} height={15} />
          </a>
        </div>
      </div>
    </article>
  );
}
