import { Suspense } from "react";
import type { Metadata } from "next";
import ServicosContent from "./ServicosContent";

export const metadata: Metadata = {
  title: "Serviços | Midi8",
  description:
    "Explore os 13 serviços da Midi8 em Web Design, Software à Medida, Automação, IA, Dados, Marketing Digital, Consultoria e E-commerce.",
  alternates: { canonical: "/servicos" },
  openGraph: {
    title: "Serviços | Midi8",
    description:
      "Catálogo completo de soluções digitais, engenharia, IA e estratégia de crescimento.",
    type: "website",
    locale: "pt_PT",
  },
};

export default function ServicosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ServicosContent />
    </Suspense>
  );
}
