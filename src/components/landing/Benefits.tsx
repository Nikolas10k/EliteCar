import Image from "next/image";
import type { Vehicle } from "@/lib/vehicles";
import { SectionHeading } from "./SectionHeading";
import { Bolt, Gallery, Layers, Sliders, Sparkle } from "./icons";

function Card({
  icon: Icon,
  title,
  text,
  className = "",
  delay = 0,
  children,
}: {
  icon: typeof Bolt;
  title: string;
  text: string;
  className?: string;
  delay?: number;
  children?: React.ReactNode;
}) {
  return (
    <div
      data-reveal
      style={{ "--delay": `${delay}ms` } as React.CSSProperties}
      className={`spotlight flex flex-col overflow-hidden rounded-3xl bg-ink-850 ${className}`}
    >
      <div className="relative z-10 p-7">
        <span className="grid size-11 place-items-center rounded-xl bg-brand/15 text-brand-bright ring-1 ring-brand/30">
          <Icon />
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2 leading-relaxed text-zinc-400">{text}</p>
      </div>
      {children && <div className="relative z-10 mt-auto">{children}</div>}
    </div>
  );
}

export function Benefits({ vehicles }: { vehicles: Vehicle[] }) {
  const [a, b, c] = vehicles;
  const count = (status: Vehicle["status"]) => String(vehicles.filter((v) => v.status === status).length);

  return (
    <section id="beneficios" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Benefícios para a loja"
          title={
            <>
              Tudo que a sua loja precisa para <span className="text-chrome">vender mais rápido.</span>
            </>
          }
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          <Card
            icon={Bolt}
            title="Cadastro rápido"
            text="Um formulário enxuto que leva menos de dois minutos. Sem campos administrativos desnecessários."
            className="lg:col-span-3"
          >
            <div className="mx-7 mb-7 space-y-2.5 rounded-2xl border border-white/10 bg-black/40 p-4">
              {[
                ["Marca / Modelo", "Porsche Panamera"],
                ["Versão", "4 E-Hybrid Platinum"],
                ["Ano · Km", "2022 · 18.400 km"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2.5 text-sm">
                  <span className="text-zinc-500">{label}</span>
                  <span className="text-zinc-100">{value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-1 text-xs text-zinc-500">
                <span>Tempo médio de cadastro</span>
                <span className="font-display text-base font-semibold text-brand-bright">1:47</span>
              </div>
            </div>
          </Card>

          <Card
            icon={Gallery}
            title="Galeria otimizada"
            text="Fotos comprimidas e em alta definição, carregando rápido em qualquer celular."
            className="lg:col-span-3"
            delay={100}
          >
            <div className="relative mx-7 mb-7 h-44">
              {[c, b, a].filter(Boolean).map((v, i) => (
                <div
                  key={v.id}
                  className="absolute top-0 h-40 w-[62%] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black"
                  style={{ left: `${i * 19}%`, transform: `rotate(${(i - 1) * 5}deg) translateY(${i === 1 ? -6 : 4}px)`, zIndex: i }}
                >
                  <Image src={v.images[0]} alt="" fill sizes="300px" className="object-cover" />
                </div>
              ))}
            </div>
          </Card>

          <Card
            icon={Sliders}
            title="Gestão simples"
            text="Edite preço, fotos e informações a qualquer momento, sem depender de ninguém."
            className="lg:col-span-2"
            delay={0}
          />
          <Card
            icon={Sparkle}
            title="Visual profissional"
            text="Um catálogo com cara de marca premium, que transmite confiança e atrai compradores."
            className="lg:col-span-2"
            delay={100}
          />
          <Card
            icon={Layers}
            title="Controle de status"
            text="Saiba exatamente o que está disponível, vendido ou indisponível."
            className="md:col-span-2 lg:col-span-2"
            delay={200}
          >
            <div className="mx-7 mb-7 grid grid-cols-3 gap-2 text-center">
              {[
                [count("disponivel"), "Disponíveis", "text-emerald-300"],
                [count("indisponivel"), "Indisponíveis", "text-amber-200"],
                [count("vendido"), "Vendidos", "text-brand-bright"],
              ].map(([n, label, color]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-black/40 px-2 py-3">
                  <p className={`font-display text-2xl font-semibold ${color}`}>{n}</p>
                  <p className="mt-0.5 text-[11px] text-zinc-500">{label}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
