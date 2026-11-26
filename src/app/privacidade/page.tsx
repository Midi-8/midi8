import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import PrivacidadeContent from "./PrivacidadeContent";

export const metadata: Metadata = {
  title: "midi8",
  description:
    "Informação transparente sobre o tratamento de dados pessoais, direitos dos titulares e conformidade com o RGPD na midi8.",
  alternates: { canonical: "/privacidade" },
  openGraph: {
    title: "midi8 | Política de Privacidade",
    description:
      "Informação transparente sobre o tratamento de dados pessoais e conformidade com o RGPD na midi8.",
    type: "website",
    locale: "pt_PT",
  },
};

export default function PrivacidadePage() {
  return (
    <>
      <BreadcrumbJsonLd name="Política de Privacidade" path="/privacidade" />
      <PrivacidadeContent />
    </>
  );
}
