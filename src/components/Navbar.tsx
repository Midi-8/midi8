"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import { useLanguage } from "@/context/LanguageContext";

const SECTION_IDS = ["sobre", "servicos", "equipa", "contacto"] as const;

const NAV_LINKS = {
  pt: [
    { sectionId: "sobre", label: "A Midi8", href: "/#sobre" },
    { sectionId: "servicos", label: "Serviços", href: "/#servicos" },
    { sectionId: "equipa", label: "Equipa", href: "/#equipa" },
    { sectionId: "contacto", label: "Contactos", href: "/#contacto" },
  ],
  en: [
    { sectionId: "sobre", label: "About", href: "/#sobre" },
    { sectionId: "servicos", label: "Services", href: "/#servicos" },
    { sectionId: "equipa", label: "Team", href: "/#equipa" },
    { sectionId: "contacto", label: "Contact", href: "/#contacto" },
  ],
} as const;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isIsland, setIsIsland] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { locale, setLocale } = useLanguage();

  const navLinks = NAV_LINKS[locale];
  const ctaLabel = locale === "pt" ? "Contacta-nos" : "Contact us";

  useEffect(() => {
    let rafId = 0;

    const updateScrollState = () => {
      rafId = 0;
      const heroEl = document.getElementById("hero");
      const heroBottom = heroEl ? heroEl.getBoundingClientRect().bottom : null;
      const pastHero = heroBottom !== null ? heroBottom <= 72 : window.scrollY > 24;
      setIsIsland((prev) => (prev === pastHero ? prev : pastHero));

      if (heroBottom !== null && heroBottom > 140) {
        setActiveSection((prev) => (prev === null ? prev : null));
        return;
      }

      const triggerY = window.innerHeight * 0.38;
      let current: string | null = null;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= triggerY) {
          current = id;
        }
      }
      setActiveSection((prev) => (prev === current ? prev : current));
    };

    const scheduleUpdate = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(updateScrollState);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    return () => {
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

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
        className={`fixed left-0 right-0 z-50 transition-[top,padding] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isIsland ? "top-3 sm:top-4 px-4 sm:px-6" : "top-0 px-0"
        }`}
      >
        <div
          className={`relative mx-auto flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] transition-[max-width,height,border-radius,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isIsland
              ? "max-w-5xl h-14 px-5 sm:px-6 rounded-2xl backdrop-blur-md backdrop-saturate-150 border border-white/65 ring-1 ring-black/[0.06] shadow-[0_14px_34px_-12px_rgba(20,94,255,0.2),0_6px_18px_-8px_rgba(168,24,255,0.14)]"
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
          {/* Logótipo à esquerda */}
          <Link
            href="/#hero"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center group shrink-0 justify-self-start"
            aria-label={locale === "pt" ? "Midi8 — Página inicial" : "Midi8 — Home"}
          >
            <Image
              src="/midi8-logo.webp"
              alt="Midi8"
              width={725}
              height={253}
              priority
              sizes="(max-width: 640px) 84px, 96px"
              className="h-6 sm:h-[26px] w-auto transition-opacity duration-200 group-hover:opacity-75"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`relative px-3.5 py-2 type-body-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-foreground"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute left-3.5 right-3.5 bottom-0.5 h-[1.5px] rounded-full bg-gradient-to-r from-[#A818FF] via-[#145EFF] to-[#00E896] transition-all duration-300 ${
                      isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Seletor PT/EN + CTA + Mobile Button */}
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
                className={`px-1 transition-colors cursor-pointer ${
                  locale === "pt"
                    ? "font-bold text-foreground"
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
                className={`px-1 transition-colors cursor-pointer ${
                  locale === "en"
                    ? "font-bold text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                EN
              </button>
            </div>

            <MagneticButton
              href="/#contacto"
              onClick={() => setMobileOpen(false)}
              aria-label={ctaLabel}
              wrapperClassName="hidden md:inline-flex"
              className="inline-flex items-center justify-center rounded-full border border-foreground bg-transparent text-foreground hover:text-white px-5 py-2.5 type-label whitespace-nowrap transition-colors"
            >
              <span>{ctaLabel}</span>
            </MagneticButton>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden relative w-10 h-10 rounded-xl border border-foreground bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_20px_-12px_rgba(15,23,42,0.16)] text-foreground flex items-center justify-center transition-transform active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              aria-expanded={mobileOpen}
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
              <span className="relative flex flex-col items-center justify-center w-4 h-3.5" aria-hidden="true">
                <motion.span
                  initial={false}
                  animate={
                    mobileOpen
                      ? { y: 5, rotate: 45 }
                      : { y: 0, rotate: 0 }
                  }
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-[1px] h-[1.5px] w-4 rounded-full bg-current"
                />
                <motion.span
                  initial={false}
                  animate={
                    mobileOpen
                      ? { scaleX: 0, opacity: 0 }
                      : { scaleX: 1, opacity: 1 }
                  }
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-[6px] h-[1.5px] w-4 rounded-full bg-current"
                />
                <motion.span
                  initial={false}
                  animate={
                    mobileOpen
                      ? { y: -5, rotate: -45 }
                      : { y: 0, rotate: 0 }
                  }
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-[11px] h-[1.5px] w-4 rounded-full bg-current"
                />
              </span>
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
                const isActive = activeSection === link.sectionId;
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
                      className={`flex items-center justify-between py-4 text-3xl tracking-tight border-b border-border transition-colors ${
                        isActive
                          ? "font-bold text-foreground"
                          : "font-normal text-foreground/75 hover:text-foreground"
                      }`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span>{link.label}</span>
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
                    className={`px-3 py-1 transition-colors cursor-pointer ${
                      locale === "pt"
                        ? "font-bold text-foreground"
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
                    className={`px-3 py-1 transition-colors cursor-pointer ${
                      locale === "en"
                        ? "font-bold text-foreground"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    English (EN)
                  </button>
                </div>

                <Link
                  href="/#contacto"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center w-full py-4 rounded-full border border-foreground bg-foreground text-white text-sm tracking-wide hover:bg-[#1a2234] transition-colors"
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
