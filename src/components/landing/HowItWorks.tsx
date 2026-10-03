import { SectionHeading } from "./SectionHeading";
import { Camera, CarIcon, Check, Rocket, Toggle, X } from "./icons";

const steps = [
  {
    icon: CarIcon,
    title: "Cadastre o veículo",
    text: "Marca, modelo, versão, ano, preço e quilometragem. Só o que o comprador quer saber.",
  },
  {
    icon: Camera,
    title: "Envie as fotos",
    text: "Arraste as imagens, escolha a capa e reordene. A galeria é otimizada automaticamente.",
  },
  {
    icon: Rocket,
    title: "Publique o anúncio",
    text: "Um clique e o veículo entra no catálogo com visual profissional, pronto para vender.",
  },
  {
    icon: Toggle,
    title: "Atualize o status",
    text: "Vendeu ou reservou? Marque como vendido ou indisponível e o catálogo se atualiza na hora.",
  },
];

const essentials = ["Nome do carro", "Marca", "Modelo", "Versão", "Ano", "Preço", "Quilometragem", "Imagens", "Status"];
const notNeeded = ["Renavam", "Chassi", "Placa", "Documentação"];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 size-[520px] rounded-full bg-brand/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Como funciona"
          title={
            <>
              Do cadastro à venda em <span className="text-energy">quatro passos.</span>
            </>
          }
          description="Sem formulários intermináveis. A plataforma foi pensada para publicar anúncios, não para gerenciar papelada."
        />

        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute left-[12%] right-[12%] top-[56px] hidden h-px bg-gradient-to-r from-brand/0 via-brand/50 to-brand/0 lg:block"
          />
          <ol className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              style={{ "--delay": `${i * 120}ms` } as React.CSSProperties}
              className="spotlight relative rounded-3xl bg-ink-850/80 p-7 backdrop-blur"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="grid size-14 place-items-center rounded-2xl border border-brand/30 bg-gradient-to-b from-brand/25 to-brand/5 text-red-100 shadow-[0_0_30px_-8px_rgb(225_6_0/0.8)]">
                    <step.icon width={24} height={24} />
                  </span>
                  <span className="font-display text-5xl font-light text-white/[0.07]">0{i + 1}</span>
                </div>
                <h3 className="mt-7 font-display text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2.5 leading-relaxed text-zinc-400">{step.text}</p>

                {i === 3 && (
                  <div className="mt-5 flex flex-wrap gap-1.5 text-[11px] font-semibold uppercase tracking-wider">
                    <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-emerald-300">Disponível</span>
                    <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-amber-200">Indisponível</span>
                    <span className="rounded-full bg-brand/25 px-2.5 py-1 text-red-100">Vendido</span>
                  </div>
                )}
              </div>
            </li>
          ))}
          </ol>
        </div>

        {/* Só o essencial */}
        <div data-reveal className="mt-6 grid overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 lg:grid-cols-[1.6fr_1fr]">
          <div className="p-7 sm:p-10">
            <p className="text-sm font-medium text-brand-bright">O que você preenche</p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">Só o essencial para vender.</h3>
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {essentials.map((field) => (
                <li
                  key={field}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-zinc-200"
                >
                  <Check width={15} height={15} className="text-emerald-400" />
                  {field}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-white/10 bg-black/30 p-7 sm:p-10 lg:border-l lg:border-t-0">
            <p className="text-sm font-medium text-zinc-500">O que fica de fora</p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">Zero burocracia.</h3>
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {notNeeded.map((field) => (
                <li
                  key={field}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/5 px-3.5 py-2 text-sm text-zinc-500 line-through decoration-brand/70"
                >
                  <X width={14} height={14} className="text-brand" />
                  {field}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
