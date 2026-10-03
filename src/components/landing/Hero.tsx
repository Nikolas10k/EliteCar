import { EnergyField } from "./EnergyField";
import { HeroLogo } from "./HeroLogo";
import { ArrowRight, Play } from "./icons";

const stats = [
  { value: "2 min", label: "para publicar um anúncio" },
  { value: "3", label: "status: disponível, indisponível e vendido" },
  { value: "0", label: "burocracia — sem Renavam, chassi ou placa" },
];

const brands = ["Toyota", "Honda", "Chevrolet", "Volkswagen", "Fiat", "Jeep", "Hyundai", "BMW", "Mercedes-Benz", "Audi", "Ford", "Nissan", "Renault", "Porsche"];

export function Hero() {
  return (
    <section id="topo" className="relative isolate overflow-hidden pt-24">
      {/* Fundo com profundidade */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgb(120_4_0/0.35),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_80%,rgb(225_6_0/0.12),transparent_70%)]" />
        <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000,transparent_75%)]" />
        <div className="noise absolute inset-0 opacity-[0.05] mix-blend-overlay" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Núcleo de energia + logo */}
        <div className="relative grid h-[44svh] min-h-[300px] place-items-center sm:h-[50svh]">
          <EnergyField className="absolute left-1/2 top-1/2 h-[150%] w-[min(1200px,150vw)] -translate-x-1/2 -translate-y-1/2" />
          {/* Linha do horizonte energizada */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-[82%] h-px bg-gradient-to-r from-transparent via-brand-bright/70 to-transparent shadow-[0_0_18px_2px_rgb(255_43_31/0.5)]"
          />
          <div className="relative">
            <HeroLogo />
          </div>
        </div>

        {/* Mensagem principal */}
        <div className="relative grid gap-10 pb-14 pt-6 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
          <div data-reveal>
            <h1 className="font-display text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">
              Anuncie seus veículos com <span className="text-energy">mais impacto.</span>
            </h1>
          </div>

          <div data-reveal style={{ "--delay": "150ms" } as React.CSSProperties} className="lg:pb-2">
            <p className="text-lg leading-relaxed text-zinc-400">
              Uma plataforma moderna para <span className="text-zinc-100">exibir, gerenciar e vender carros</span> com
              praticidade. Cadastre só o essencial, publique em minutos e destaque cada veículo como ele merece.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#comecar"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-brand px-7 py-3.5 font-medium text-white shadow-[0_0_40px_-6px_rgb(225_6_0/0.8)] transition hover:bg-brand-bright"
              >
                <span className="absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine" />
                Começar a anunciar
                <ArrowRight width={18} height={18} className="transition group-hover:translate-x-1" />
              </a>
              <a
                href="#catalogo"
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 font-medium text-zinc-100 backdrop-blur transition hover:border-white/30 hover:bg-white/[0.07]"
              >
                <span className="grid size-6 place-items-center rounded-full bg-white/10">
                  <Play width={12} height={12} />
                </span>
                Ver catálogo
              </a>
            </div>
          </div>
        </div>

        {/* Números do produto */}
        <dl className="grid border-t border-white/10 sm:grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              style={{ "--delay": `${i * 100}ms` } as React.CSSProperties}
              className="flex items-baseline gap-4 border-white/10 py-6 sm:block sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-4xl font-light tracking-tight text-white sm:text-5xl">{s.value}</dd>
              <dd className="mt-1 text-sm text-zinc-500">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Faixa multimarcas */}
      <div className="relative mt-6 overflow-hidden border-y border-white/5 bg-white/[0.015] py-5 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-12 pr-12">
          {[...brands, ...brands].map((b, i) => (
            <span key={i} className="font-display text-lg font-medium uppercase tracking-[0.2em] text-zinc-600">
              {b}
              <span className="ml-12 text-brand/60">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
