"use client";

import { useEffect, useState } from "react";
import { EliteLogo } from "@/components/brand/EliteLogo";
import { ArrowRight, Menu, X } from "./icons";

const links = [
  { href: "#catalogo", label: "Catálogo" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#beneficios", label: "Benefícios" },
  { href: "#painel", label: "Painel" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "border-b border-white/5 bg-ink-950/70 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#topo" className="shrink-0" aria-label="Elite Car Veículos — início">
          <EliteLogo id="nav-logo" className="h-11 w-auto" />
        </a>

        <ul className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block rounded-full px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <a href="#painel" className="px-3 py-2 text-sm text-zinc-300 transition hover:text-white">
            Entrar
          </a>
          <a
            href="#comecar"
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_24px_-4px_rgb(225_6_0/0.7)] transition hover:bg-brand-bright"
          >
            Começar agora
            <ArrowRight width={16} height={16} className="transition group-hover:translate-x-0.5" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-full border border-white/10 text-zinc-200 md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/5 px-4 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/5 py-3.5 text-base text-zinc-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#comecar"
            onClick={() => setOpen(false)}
            className="mt-5 flex items-center justify-center gap-2 rounded-full bg-brand py-3 font-medium text-white"
          >
            Começar agora <ArrowRight width={16} height={16} />
          </a>
        </div>
      )}
    </header>
  );
}
