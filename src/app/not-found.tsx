"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const NOT_FOUND_COPY = {
  pt: {
    titleLead: "Página não",
    titleEm: "encontrada.",
    description:
      "O endereço que procurou não existe ou foi movido. Pode voltar ao início ou falar connosco diretamente.",
    backHome: "Voltar ao início",
    talkToUs: "Falar connosco",
  },
  en: {
    titleLead: "Page not",
    titleEm: "found.",
    description:
      "The address you requested does not exist or has been moved. You can return to the home page or contact us directly.",
    backHome: "Back to home",
    talkToUs: "Talk to us",
  },
} as const;

export default function NotFound() {
  const { locale } = useLanguage();
  const copy = NOT_FOUND_COPY[locale];

  return (
    <main className="flex-1 flex items-center justify-center px-6 pt-28 pb-20 text-foreground">
      <section className="rounded-2xl border border-border bg-white shadow-[0_18px_44px_-30px_rgba(15,23,42,0.12)] w-full max-w-2xl p-10 sm:p-14 max-md:px-6 max-md:py-8 text-center max-md:text-left">
        <h1 className="text-4xl sm:text-5xl max-md:text-[2.5rem] max-md:leading-[1.05] font-bold tracking-tight mb-4">
          {copy.titleLead} <em className="italic font-normal">{copy.titleEm}</em>
        </h1>
        <p className="text-sm sm:text-base text-muted leading-relaxed mb-8 max-w-md mx-auto max-md:mx-0">
          {copy.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center max-md:items-stretch max-md:gap-2 gap-4">
          <Link href="/" className="cta-button w-full sm:w-auto">
            <span>{copy.backHome}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link href="/#contacto" className="cta-button cta-secondary w-full sm:w-auto">
            <span>{copy.talkToUs}</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
