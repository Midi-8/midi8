import type { Metadata } from "next";
import SobreContent from "@/components/SobreContent";

export const metadata: Metadata = {
  title: "A Empresa — Manifesto & Pilares de Engenharia | Midi8",
  description:
    "Não construímos apenas interfaces. Desenhamos infraestruturas. Conheça a filosofia Deep Tech, resiliência por design e governação técnica da Midi8.",
  openGraph: {
    title: "A Empresa — Manifesto & Pilares de Engenharia | Midi8",
    description:
      "Não construímos apenas interfaces. Desenhamos infraestruturas empresariais imunes a falhas.",
    type: "website",
    locale: "pt_PT",
  },
};

export default function SobrePage() {
  return <SobreContent />;
}
