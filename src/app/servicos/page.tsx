import { Suspense } from "react";
import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import ServicosContent from "./ServicosContent";

export const metadata: Metadata = {
  title: "midi8",
  description:
    "Explore os 13 serviços da midi8 em Web Design, Software à Medida, Automação, IA, Dados, Marketing Digital, Consultoria e E-commerce.",
  alternates: { canonical: "/servicos" },
  openGraph: {
    title: "midi8 | Serviços",
    description:
      "Catálogo completo de soluções digitais, engenharia, IA e estratégia de crescimento.",
    type: "website",
    locale: "pt_PT",
  },
};

export default function ServicosPage() {
  return (
    <>
      <BreadcrumbJsonLd name="Serviços" path="/servicos" />
      <Suspense fallback={<div className="min-h-screen" />}>
        <ServicosContent />
      </Suspense>
    </>
  );
}
