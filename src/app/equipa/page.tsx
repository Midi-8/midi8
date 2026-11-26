import type { Metadata } from "next";
import EquipaContent from "./EquipaContent";

export const metadata: Metadata = {
  title: "midi8",
  description:
    "Conheça os especialistas da midi8 em Produto & Tecnologia, Marketing & Comunicação e Diagnóstico & Negócio.",
  alternates: { canonical: "/equipa" },
  openGraph: {
    title: "Equipa | midi8",
    description:
      "Seis especialistas multidisciplinares em engenharia, dados, estratégia e comunicação.",
    type: "website",
    locale: "pt_PT",
  },
};

export default function EquipaPage() {
  return <EquipaContent />;
}
