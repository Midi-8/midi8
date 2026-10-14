import type { Metadata } from "next";
import SolucoesContent from "@/components/SolucoesContent";

export const metadata: Metadata = {
  title: "Soluções — Capacidade Técnica & Engenharia de Sistemas | Midi8",
  description:
    "Engenharia Aplicada ao Negócio. Desenhamos, construímos e otimizamos a infraestrutura tecnológica da sua empresa: Web & Sistemas Distribuídos, Automação, IA e Consultoria Técnica.",
  keywords: [
    "sistemas distribuídos",
    "automação de processos",
    "inteligência artificial",
    "consultoria técnica",
    "Next.js",
    "PostgreSQL",
    "arquitetura de software",
    "Midi8",
  ],
  openGraph: {
    title: "Soluções — Capacidade Técnica & Engenharia de Sistemas | Midi8",
    description:
      "Desenhamos, construímos e otimizamos a infraestrutura tecnológica da sua empresa. Sem atalhos, com foco absoluto na performance.",
    type: "website",
    locale: "pt_PT",
  },
};

export default function SolucoesPage() {
  return <SolucoesContent />;
}
