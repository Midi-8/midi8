import type { Metadata } from "next";
import TermosContent from "./TermosContent";

export const metadata: Metadata = {
  title: "Midi8",
  description:
    "Condições gerais de utilização do website e termos contratuais de prestação de serviços digitais e engenharia de software da Midi8.",
  openGraph: {
    title: "Termos e Condições | Midi8",
    description:
      "Condições gerais de utilização do website e termos de prestação de serviços digitais da Midi8.",
    type: "website",
    locale: "pt_PT",
  },
};

export default function TermosPage() {
  return <TermosContent />;
}
