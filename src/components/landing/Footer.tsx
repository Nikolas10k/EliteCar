import { EliteLogo } from "@/components/brand/EliteLogo";
import { Clock, Instagram, Pin } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <EliteLogo id="footer-logo" className="h-16 w-auto" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-500">
            Veículos selecionados com excelência. Multimarcas, novos e seminovos.
          </p>
        </div>
        <div className="space-y-3 text-sm text-zinc-400">
          <p className="flex items-center gap-2.5">
            <Pin width={17} height={17} className="text-brand-bright" /> Águas Lindas de Goiás — GO
          </p>
          <p className="flex items-start gap-2.5">
            <Clock width={17} height={17} className="mt-0.5 text-brand-bright" />
            <span>
              Seg a Sáb · 08h às 18h
              <br />
              Dom · 08h às 14h
            </span>
          </p>
        </div>
        <div className="text-sm">
          <a
            href="https://www.instagram.com/elitecar_ag/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 text-zinc-400 transition hover:text-white"
          >
            <Instagram width={17} height={17} className="text-brand-bright" /> @elitecar_ag
          </a>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} Elite Car Veículos. Todos os direitos reservados.
      </div>
    </footer>
  );
}
