import type { Metadata } from "next";
import { Inter, Russo_One, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"] });
const russo = Russo_One({ variable: "--font-russo", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Elite Car Veículos — Anuncie seus veículos com mais impacto",
  description:
    "Plataforma moderna para exibir, gerenciar e vender carros com praticidade. Cadastre só o essencial, publique em minutos e controle o status de cada anúncio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${sora.variable} ${russo.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
