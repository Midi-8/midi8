"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Wordmark from "@/components/Wordmark";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, SOCIAL } from "@/lib/contact";

const sectionLinks = [
  { label: "A Midi8", href: "/#sobre" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Equipa", href: "/#equipa" },
  { label: "Contactos", href: "/#contacto" },
] as const;

export default function Footer() {
  const pathname = usePathname();
  const currentYear = 2026;

  // Na página principal (palco 3D fixo), o rodapé vive num painel discreto integrado no palco
  if (pathname === "/") {
    return null;
  }

  return (
    <footer className="relative text-foreground border-t border-border bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Marca & Descrição */}
          <div className="md:col-span-5 flex flex-col gap-3.5">
            <Link
              href="/#hero"
              className="inline-flex items-center group w-fit"
              aria-label="Midi8 — Voltar ao topo"
            >
              <Wordmark className="h-[18px] w-auto text-foreground transition-opacity duration-200 group-hover:opacity-75" />
            </Link>
            <p className="text-sm text-muted max-w-xs leading-relaxed">
              Tecnologia, software, automação e comunicação digital para fazer o seu negócio avançar.
            </p>
          </div>

          {/* Secções */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <p className="text-xs uppercase tracking-wider text-subtle">
              Secções
            </p>
            <ul className="flex flex-col gap-2 text-sm">
              {sectionLinks.map((item) => (
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
              Contacto
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
              Redes
            </p>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a
                  href={SOCIAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  <span>LinkedIn</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  <span>Instagram</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barra Legal Minimalista */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-subtle">
          <p>© {currentYear} Midi8. Todos os direitos reservados.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacidade" className="hover:text-foreground transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="hover:text-foreground transition-colors">
              Termos e Condições
            </Link>
            <Link
              href="/#hero"
              className="inline-flex items-center gap-1 text-muted hover:text-foreground transition-colors"
            >
              <span>Topo</span>
              <span aria-hidden="true">↑</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
