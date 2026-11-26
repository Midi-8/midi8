import type { Metadata } from "next";
import SobreContent from "./SobreContent";

export const metadata: Metadata = {
  title: "Midi8",
  description:
    "Conheça a filosofia, os 3 pilares e o processo em 4 fases da Midi8.",
  alternates: { canonical: "/sobre" },
  openGraph: {
    title: "A Midi8 — Sobre Nós",
    description:
      "Engenharia, inteligência artificial e comunicação num único parceiro para resolver problemas reais.",
    type: "website",
    locale: "pt_PT",
  },
};

export default function SobrePage() {
  return <SobreContent />;
}
