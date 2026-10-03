import Image from "next/image";
import { ArrowRight } from "./icons";

export function FinalCta() {
  return (
    <section id="comecar" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div
        data-reveal
        className="relative overflow-hidden rounded-[36px] border border-brand/30 bg-ink-900 px-6 py-20 text-center sm:px-12 sm:py-28"
      >
        <Image
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/40" />
        <div aria-hidden className="absolute -bottom-40 left-1/2 h-80 w-[90%] -translate-x-1/2 rounded-full bg-brand/40 blur-[120px]" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-bright to-transparent" />

        <div className="relative">
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-6xl">
            Seu estoque merece uma <span className="text-energy">vitrine à altura.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-300">
            Comece hoje a publicar anúncios com visual premium e controle total de cada veículo.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#painel"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-brand px-8 py-4 font-medium text-white shadow-[0_0_50px_-6px_rgb(225_6_0/0.9)] transition hover:bg-brand-bright"
            >
              <span className="absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine" />
              Criar meu primeiro anúncio
              <ArrowRight width={18} height={18} className="transition group-hover:translate-x-1" />
            </a>
            <a
              href="https://www.instagram.com/elitecar_ag/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 font-medium text-white backdrop-blur transition hover:bg-white/10"
            >
              Falar com a Elite Car
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
