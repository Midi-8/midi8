import type { Metadata } from "next";
import TermosContent from "./TermosContent";

export const metadata: Metadata = {
  title: "midi8",
  description:
    "Condições gerais de utilização do website e termos contratuais de prestação de serviços digitais e engenharia de software da midi8.",
  openGraph: {
    title: "Termos e Condições | midi8",
    description:
      "Condições gerais de utilização do website e termos de prestação de serviços digitais da midi8.",
    type: "website",
    locale: "pt_PT",
  },
};

export default function TermosPage() {
  return <TermosContent />;
}
