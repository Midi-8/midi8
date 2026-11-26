import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import SobreContent from "./SobreContent";

export const metadata: Metadata = {
  title: "midi8",
  description:
    "Conheça a filosofia, os 3 pilares e o processo em 4 fases da midi8 em engenharia de software, IA e estratégia digital.",
  alternates: { canonical: "/sobre" },
  openGraph: {
    title: "midi8 | Sobre",
    description:
      "Engenharia, inteligência artificial e comunicação num único parceiro para resolver problemas reais.",
    type: "website",
    locale: "pt_PT",
  },
};

export default function SobrePage() {
  return (
    <>
      <BreadcrumbJsonLd name="A midi8" path="/sobre" />
      <SobreContent />
    </>
  );
}
