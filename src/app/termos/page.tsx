import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import TermosContent from "./TermosContent";

export const metadata: Metadata = {
  title: "midi8",
  description:
    "Condições gerais de utilização do website e termos contratuais de prestação de serviços digitais e engenharia de software da midi8.",
  alternates: { canonical: "/termos" },
  openGraph: {
    title: "midi8 | Termos e Condições",
    description:
      "Condições gerais de utilização do website e termos de prestação de serviços digitais da midi8.",
    type: "website",
    locale: "pt_PT",
  },
};

export default function TermosPage() {
  return (
    <>
      <BreadcrumbJsonLd name="Termos e Condições" path="/termos" />
      <TermosContent />
    </>
  );
}
