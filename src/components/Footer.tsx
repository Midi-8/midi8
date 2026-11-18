"use client";

import Link from "next/link";
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
    toTopLabel: "Midi8 — Voltar ao topo",
    sectionLinks: [
      { label: "A Midi8", href: "/#sobre" },
      { label: "Serviços", href: "/#servicos" },
      { label: "Equipa", href: "/#equipa" },
      { label: "Contactos", href: "/#contacto" },
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
    toTopLabel: "Midi8 — Back to top",
    sectionLinks: [
      { label: "About", href: "/#sobre" },
      { label: "Services", href: "/#servicos" },
      { label: "Team", href: "/#equipa" },
      { label: "Contact", href: "/#contacto" },
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
    <footer className="relative text-foreground bg-white">
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-4 sm:pt-12 sm:pb-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Marca & Slogan */}
          <div className="md:col-span-5 flex flex-col gap-1">
            <Link
              href="/#hero"
              onClick={scrollToTop}
              className="inline-flex items-baseline group w-fit text-foreground"
              aria-label={copy.toTopLabel}
            >
              <span className="font-display text-2xl sm:text-[1.75rem] font-medium tracking-tight text-foreground leading-none transition-opacity duration-200 group-hover:opacity-75">
                Midi<em className="italic font-normal">8</em>
              </span>
            </Link>
            <p className="font-display text-lg sm:text-xl text-muted tracking-tight leading-tight">
              move <em className="italic font-normal">forward</em>, fast
            </p>
          </div>

          {/* Secções */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <p className="text-xs uppercase tracking-wider text-subtle">
              {copy.sectionsTitle}
            </p>
            <ul className="flex flex-col gap-2 text-sm">
              {copy.sectionLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <p className="text-xs uppercase tracking-wider text-subtle">
              {copy.contactTitle}
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-muted hover:text-foreground transition-colors w-fit"
              >
                {CONTACT_EMAIL}
              </a>
              <a
                href={CONTACT_PHONE_HREF}
                className="text-muted hover:text-foreground transition-colors w-fit"
              >
                {CONTACT_PHONE}
              </a>
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <p className="text-xs uppercase tracking-wider text-subtle">
              {copy.socialTitle}
            </p>
            <ul className="flex flex-col gap-2 text-sm">
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
        </div>
      </div>

      {/* Barra Legal Minimalista */}
      <div className="max-w-7xl mx-auto px-6 pt-2 pb-6 sm:pt-3 sm:pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-subtle">
        <p>© {currentYear} Midi8. {copy.rights}</p>
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/privacidade" className="hover:text-foreground transition-colors">
            {copy.privacy}
          </Link>
          <Link href="/termos" className="hover:text-foreground transition-colors">
            {copy.terms}
          </Link>
          <button
            type="button"
            onClick={scrollToTop}
            className="text-muted hover:text-foreground transition-colors cursor-pointer"
          >
            {copy.top}
          </button>
        </div>
      </div>
    </footer>
  );
}
