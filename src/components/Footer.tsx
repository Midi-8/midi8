"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, SOCIAL } from "@/lib/contact";

const FOOTER_TEXT = {
  pt: {
    sectionsTitle: "Secções",
    contactTitle: "Contacto",
    socialTitle: "Redes",
    rights: "Todos os direitos reservados.",
    privacy: "Política de Privacidade",
    terms: "Termos e Condições",
    top: "Topo",
    toTopLabel: "midi8 - Página inicial",
    sectionLinks: [
      { label: "A midi8", href: "/sobre" },
      { label: "Serviços", href: "/servicos" },
      { label: "Equipa", href: "/equipa" },
      { label: "Contactos", href: "/contacto" },
    ],
  },
  en: {
    sectionsTitle: "Sections",
    contactTitle: "Contact",
    socialTitle: "Social",
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    top: "Top",
    toTopLabel: "midi8 - Home",
    sectionLinks: [
      { label: "About", href: "/sobre" },
      { label: "Services", href: "/servicos" },
      { label: "Team", href: "/equipa" },
      { label: "Contact", href: "/contacto" },
    ],
  },
} as const;

export default function Footer() {
  const currentYear = 2026;
  const { locale } = useLanguage();
  const copy = FOOTER_TEXT[locale];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative text-foreground bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-7 pb-5 sm:pt-12 sm:pb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-10 items-start">
          {/* Marca & Slogan (slogan sempre por baixo de midi8) */}
          <div className="md:col-span-5 flex flex-col gap-1.5 md:gap-2">
            <Link
              href="/"
              className="inline-flex items-center group w-fit"
              aria-label={copy.toTopLabel}
            >
              <Image
                src="/midi8-brand-logo.webp?v=official"
                alt="midi8"
                width={774}
                height={293}
                unoptimized
                className="h-6 sm:h-[26px] w-auto transition-opacity duration-200 group-hover:opacity-75"
              />
            </Link>
            <p className="font-display text-xs sm:text-[13px] text-muted tracking-tight leading-tight">
              move <em className="italic font-normal">forward</em>, fast
            </p>
          </div>

          {/* Secções, Redes e Contactos distribuídos por toda a largura no mobile/tablet (e colunas normais no desktop) */}
          <div className="w-full md:col-span-7 flex justify-between gap-4 sm:gap-8 md:grid md:grid-cols-7 md:gap-x-8 items-start">
            {/* Secções */}
            <div className="md:col-span-2 flex flex-col gap-2 md:gap-3 shrink-0">
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-subtle">
                {copy.sectionsTitle}
              </p>
              <ul className="flex flex-col gap-1.5 md:gap-2 text-[11.5px] sm:text-sm">
                {copy.sectionLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted hover:text-foreground transition-colors whitespace-nowrap"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Redes Sociais */}
            <div className="md:col-span-2 md:order-last flex flex-col gap-2 md:gap-3 shrink-0">
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-subtle">
                {copy.socialTitle}
              </p>
              <ul className="flex flex-col gap-1.5 md:gap-2 text-[11.5px] sm:text-sm">
                <li>
                  <a
                    href={SOCIAL.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-foreground transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-foreground transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            {/* Contacto */}
            <div className="md:col-span-3 flex flex-col gap-2 md:gap-3 min-w-0 max-md:text-right max-md:items-end">
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-subtle">
                {copy.contactTitle}
              </p>
              <div className="flex flex-col gap-1.5 md:gap-2 text-[11.5px] sm:text-sm min-w-0 max-md:items-end">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-muted hover:text-foreground transition-colors break-all sm:break-normal w-fit"
                >
                  {CONTACT_EMAIL}
                </a>
                <a
                  href={CONTACT_PHONE_HREF}
                  className="text-muted hover:text-foreground transition-colors whitespace-nowrap w-fit"
                >
                  {CONTACT_PHONE}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra Legal Minimalista */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 border-t border-border/80 pt-3.5 pb-4 sm:pt-5 sm:pb-8 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-[11px] sm:text-xs text-subtle">
        <p>© {currentYear} midi8. {copy.rights}</p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link href="/privacidade" className="hover:text-foreground transition-colors">
            {copy.privacy}
          </Link>
          <Link href="/termos" className="hover:text-foreground transition-colors">
            {copy.terms}
          </Link>
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-1 text-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <span>{copy.top}</span>
            <svg
              className="w-3 h-3 transition-transform duration-200 group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-6 6m6-6l6 6" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
