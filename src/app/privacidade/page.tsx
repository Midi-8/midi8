import type { Metadata } from "next";
import PrivacidadeContent from "./PrivacidadeContent";

export const metadata: Metadata = {
  title: "Política de Privacidade | Midi8",
  description:
    "Informação transparente sobre o tratamento de dados pessoais, direitos dos titulares e conformidade com o RGPD na Midi8.",
  openGraph: {
    title: "Política de Privacidade | Midi8",
    description:
      "Informação transparente sobre o tratamento de dados pessoais e conformidade com o RGPD na Midi8.",
    type: "website",
    locale: "pt_PT",
  },
};

export default function PrivacidadePage() {
  return <PrivacidadeContent />;
}
