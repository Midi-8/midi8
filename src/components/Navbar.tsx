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
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
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
            className="flex items-center gap-2.5 group shrink-0 justify-self-start max-md:py-[13px] max-md:-my-[13px]"
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
                  {/* Indicador ativo: um só elemento que desliza entre rotas (layoutId); hover nas restantes */}
                  {active ? (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute bottom-1 left-4 right-4 h-px bg-accent"
                    />
                  ) : (
                    <span className="absolute bottom-1 left-4 right-4 h-px bg-accent transition-transform duration-200 origin-left scale-x-0 group-hover:scale-x-100" />
                  )}
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
                strokeWidth={1.5}
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
              className="md:hidden flex flex-col justify-center gap-[5px] p-2 max-md:p-0 max-md:items-center max-md:w-11 max-md:h-11 max-md:-mr-3 group active:opacity-70"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            >
              <span
                className={`block w-5 h-[1.5px] bg-secondary transition-[transform,opacity] duration-300 ease-out ${
                  mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-secondary transition-[transform,opacity] duration-300 ease-out ${
                  mobileOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-secondary transition-[transform,opacity] duration-300 ease-out ${
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
            exit={{ opacity: 0, transition: { duration: 0.16, ease: "easeIn" } }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full h-[100dvh] z-40 glass-sheet md:hidden flex flex-col pt-[64px]"
          >
            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1], delay: i * 0.03 + 0.05 }}
                  className="w-full"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isRouteActive(link.href, pathname) ? "page" : undefined}
                    className={`relative flex items-baseline w-full py-5 text-3xl font-semibold tracking-tight border-b border-border transition-colors active:text-accent ${
                      isRouteActive(link.href, pathname) ? "text-foreground" : "text-secondary"
                    }`}
                  >
                    {link.label}
                    {isRouteActive(link.href, pathname) && (
                      <span className="absolute -bottom-px left-0 w-16 h-px bg-accent" />
                    )}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1], delay: navLinks.length * 0.03 + 0.05 }}
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
                    strokeWidth={1.5}
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
            <div className="px-6 py-6 border-t border-border">
              <p className="text-xs text-subtle">
                © 2026 Midi8
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
