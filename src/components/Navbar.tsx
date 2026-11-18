"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const NAV_LINKS = {
  pt: [
    { id: "sobre", label: "A Midi8", href: "/#sobre" },
    { id: "servicos", label: "Serviços", href: "/#servicos" },
    { id: "equipa", label: "Equipa", href: "/#equipa" },
    { id: "contacto", label: "Contactos", href: "/#contacto" },
  ],
  en: [
    { id: "sobre", label: "About", href: "/#sobre" },
    { id: "servicos", label: "Services", href: "/#servicos" },
    { id: "equipa", label: "Team", href: "/#equipa" },
    { id: "contacto", label: "Contact", href: "/#contacto" },
  ],
} as const;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isIsland, setIsIsland] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const { locale, setLocale } = useLanguage();

  const navLinks = NAV_LINKS[locale];
  const ctaLabel = locale === "pt" ? "Contacta-nos" : "Contact us";

  useEffect(() => {
    const updateIsland = () => {
      const heroEl = document.getElementById("hero");
      const pastHero = heroEl
        ? heroEl.getBoundingClientRect().bottom <= 72
        : window.scrollY > 16;
      setIsIsland(pastHero);
    };

    updateIsland();
    window.addEventListener("scroll", updateIsland, { passive: true });
    window.addEventListener("resize", updateIsland, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateIsland);
      window.removeEventListener("resize", updateIsland);
    };
  }, [pathname]);

  useEffect(() => {
    const sectionIds = ["sobre", "servicos", "equipa", "contacto"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) {
      setActiveSection(null);
      return;
    }

    const checkActiveSection = () => {
      // 1. Fim da página: força 'contacto' ativo
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveSection("contacto");
        return;
      }

      // 2. No topo (Hero visível em relevo): nenhum link de secção ativo
      const hero = document.getElementById("hero");
      if (hero && hero.getBoundingClientRect().bottom > 220) {
        setActiveSection(null);
        return;
      }

      // 3. Linha focal (~160px do topo)
      const focalLine = 160;
      let matched: string | null = null;

      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= focalLine && rect.bottom > focalLine) {
          matched = el.id;
          break;
        }
      }

      if (!matched) {
        for (let i = elements.length - 1; i >= 0; i--) {
          const rect = elements[i].getBoundingClientRect();
          if (rect.top <= focalLine) {
            matched = elements[i].id;
            break;
          }
        }
      }

      setActiveSection(matched);
    };

    const observer = new IntersectionObserver(
      () => {
        checkActiveSection();
      },
      {
        rootMargin: "-10% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", checkActiveSection, { passive: true });
    window.addEventListener("resize", checkActiveSection, { passive: true });

    checkActiveSection();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", checkActiveSection);
      window.removeEventListener("resize", checkActiveSection);
    };
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isIsland ? "top-3 sm:top-4 px-4 sm:px-6" : "top-0 px-0"
          }`}
      >
        <div
          className={`mx-auto flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isIsland
              ? "max-w-5xl h-14 px-5 sm:px-6 rounded-2xl backdrop-blur-2xl backdrop-saturate-150 border border-white/65 ring-1 ring-black/[0.06] shadow-[0_16px_40px_-12px_rgba(20,94,255,0.22),0_6px_20px_-8px_rgba(168,24,255,0.16)]"
              : "max-w-7xl h-16 px-5 sm:px-6 rounded-none bg-transparent border border-transparent"
            }`}
          style={
            isIsland
              ? {
                background:
                  "linear-gradient(110deg, rgba(168, 24, 255, 0.16) 0%, rgba(20, 94, 255, 0.15) 50%, rgba(0, 232, 150, 0.16) 100%), rgba(255, 255, 255, 0.76)",
              }
              : undefined
          }
        >
          {/* Logo tipográfico à esquerda */}
          <Link
            href="/#hero"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-baseline group shrink-0 justify-self-start text-foreground"
            aria-label={locale === "pt" ? "Midi8 — Página inicial" : "Midi8 — Home"}
          >
            <span className="font-display text-2xl sm:text-[1.75rem] font-medium tracking-tight text-foreground leading-none transition-opacity duration-200 group-hover:opacity-75">
              Midi<em className="italic font-normal">8</em>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`relative px-3.5 py-2 text-sm transition-colors duration-200 whitespace-nowrap ${isActive
                      ? "font-medium text-foreground"
                      : "font-normal text-foreground/75 hover:text-foreground"
                    }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-1 left-3.5 right-3.5 h-[2px] rounded-full bg-gradient-to-r from-[#A818FF] via-[#145EFF] to-[#00E896]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Seletor PT/EN + CTA Reta + Mobile Button */}
          <div className="flex items-center gap-2.5 sm:gap-3 justify-self-end">
            <div
              className="hidden md:inline-flex items-center gap-0.5 px-1 py-1 text-xs"
              role="group"
              aria-label={locale === "pt" ? "Idioma" : "Language"}
            >
              <button
                type="button"
                onClick={() => setLocale("pt")}
                aria-pressed={locale === "pt"}
                className={`px-1 transition-colors cursor-pointer ${locale === "pt"
                    ? "font-semibold text-foreground"
                    : "text-muted hover:text-foreground"
                  }`}
              >
                PT
              </button>
              <span className="text-border-strong" aria-hidden="true">
                |
              </span>
              <button
                type="button"
                onClick={() => setLocale("en")}
                aria-pressed={locale === "en"}
                className={`px-1 transition-colors cursor-pointer ${locale === "en"
                    ? "font-semibold text-foreground"
                    : "text-muted hover:text-foreground"
                  }`}
              >
                EN
              </button>
            </div>

            <Link
              href="/#contacto"
              onClick={() => setMobileOpen(false)}
              aria-label={ctaLabel}
              className="hidden md:inline-flex items-center justify-center rounded-none border border-foreground text-foreground hover:bg-foreground hover:text-white px-5 py-2 text-xs sm:text-sm font-normal tracking-wide whitespace-nowrap transition-colors"
            >
              <span>{ctaLabel}</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-10 h-10 rounded-none border border-foreground text-foreground flex items-center justify-center transition-transform active:scale-95"
              aria-label={
                mobileOpen
                  ? locale === "pt"
                    ? "Fechar menu"
                    : "Close menu"
                  : locale === "pt"
                    ? "Abrir menu"
                    : "Open menu"
              }
            >
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${mobileOpen ? "rotate-45" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 glass-sheet md:hidden flex flex-col pt-20 px-6 pb-8"
          >
            <nav className="flex-1 flex flex-col justify-center gap-2">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between py-4 text-3xl tracking-tight border-b border-border transition-colors ${isActive
                          ? "font-medium text-foreground"
                          : "font-normal text-foreground/75 hover:text-foreground"
                        }`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <span
                          className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#A818FF] to-[#00E896] shrink-0"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="mt-8 flex flex-col gap-3"
              >
                <div
                  className="inline-flex items-center justify-center gap-2 py-2 text-sm"
                  role="group"
                  aria-label={locale === "pt" ? "Idioma" : "Language"}
                >
                  <button
                    type="button"
                    onClick={() => setLocale("pt")}
                    aria-pressed={locale === "pt"}
                    className={`px-3 py-1 transition-colors cursor-pointer ${locale === "pt"
                        ? "font-semibold text-foreground"
                        : "text-muted hover:text-foreground"
                      }`}
                  >
                    Português (PT)
                  </button>
                  <span className="text-border-strong" aria-hidden="true">
                    |
                  </span>
                  <button
                    type="button"
                    onClick={() => setLocale("en")}
                    aria-pressed={locale === "en"}
                    className={`px-3 py-1 transition-colors cursor-pointer ${locale === "en"
                        ? "font-semibold text-foreground"
                        : "text-muted hover:text-foreground"
                      }`}
                  >
                    English (EN)
                  </button>
                </div>

                <Link
                  href="/#contacto"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center w-full py-4 rounded-none border border-foreground bg-foreground text-white text-sm tracking-wide hover:bg-[#1a2234] transition-colors"
                >
                  <span>{ctaLabel}</span>
                </Link>
              </motion.div>
            </nav>

            <p className="text-xs text-subtle pt-4 border-t border-border">
              © 2026 Midi8
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
