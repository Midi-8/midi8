import type { Metadata } from "next";
import { Suspense } from "react";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import ContactoContent from "./ContactoContent";

export const metadata: Metadata = {
  title: "midi8",
  description:
    "Fale com a midi8 para agendar uma reunião de diagnóstico gratuita e dar vida ao seu próximo projeto digital.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "midi8 | Contactos",
    description:
      "Respondemos em menos de 24 horas. Fale diretamente com a nossa equipa.",
    type: "website",
    locale: "pt_PT",
  },
};

export default function ContactoPage() {
  return (
    <>
      <BreadcrumbJsonLd name="Contactos" path="/contacto" />
      <Suspense fallback={<main className="flex-1 min-h-screen bg-background" />}>
        <ContactoContent />
      </Suspense>
    </>
  );
}
