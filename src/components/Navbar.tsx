"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Wordmark from "@/components/Wordmark";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Portfólio", href: "/#portfolio" },
  { label: "Soluções", href: "/solucoes" },
  { label: "A Empresa", href: "/sobre" },
];

// Âncoras (/#portfolio) nunca ficam "ativas"; rotas ficam ativas também nas sub-rotas.
function isRouteActive(href: string, pathname: string): boolean {
  if (href.includes("#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Bloqueio de scroll no body quando o menu mobile está aberto ──
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobileOpen]);

  // ── Fecho automático ao alterar de rota (render-time adjustment) ──
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen
            ? "glass-bar"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10 h-[64px] flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
          {/* ── Logo ── */}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2.5 group shrink-0 justify-self-start"
            aria-label="Midi8 — Página inicial"
          >
            <Wordmark className="h-[18px] w-auto text-foreground transition-opacity duration-300 group-hover:opacity-80" />
          </Link>

          {/* ── Desktop Navigation ── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isRouteActive(link.href, pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-4 py-2 text-sm transition-colors duration-200 group ${
                    active ? "text-foreground font-medium" : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {/* Sublinhado: fixo na rota ativa, no hover nas restantes */}
                  <span
                    className={`absolute bottom-1 left-4 right-4 h-px bg-accent transition-transform duration-300 origin-left ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* ── CTA + Mobile Hamburger ── */}
          <div className="flex items-center gap-3 justify-self-end">
            {/* Desktop CTA */}
            <Link
              href="/contacto"
              className="cta-button cta-sm hidden md:inline-flex"
            >
              Agendar Reunião
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center gap-[5px] p-2 group"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            >
              <span
                className={`block w-5 h-[1.5px] bg-secondary transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-secondary transition-all duration-300 ${
                  mobileOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-secondary transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Full-Screen Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 w-full h-[100dvh] z-40 glass-sheet md:hidden flex flex-col pt-[64px]"
          >
            {/* Nav links */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-2 px-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 + 0.05 }}
                  className="w-full text-center"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isRouteActive(link.href, pathname) ? "page" : undefined}
                    className={`block w-full py-4 text-2xl font-semibold border-b border-border transition-colors ${
                      isRouteActive(link.href, pathname) ? "text-foreground" : "text-secondary hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    {isRouteActive(link.href, pathname) && (
                      <span className="block mx-auto mt-1 w-8 h-0.5 bg-accent rounded-full" />
                    )}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06 + 0.1 }}
                className="w-full mt-8"
              >
                <Link
                  href="/contacto"
                  onClick={() => setMobileOpen(false)}
                  className="cta-button w-full py-4 text-lg"
                >
                  Agendar Reunião
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </motion.div>
            </nav>

            {/* Bottom footer strip */}
            <div className="px-8 py-6 border-t border-border">
              <p className="text-xs text-subtle font-mono text-center tracking-widest uppercase">
                © 2026 Midi8 · Engenharia de Software
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
