"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
const navLinks = [
  { label: "Soluções", href: "/solucoes" },
  { label: "A Empresa", href: "/sobre" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-zinc-950/75 backdrop-blur-xl border-b border-white/[0.04] shadow-[0_1px_0_rgba(255,255,255,0.03)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-[64px] flex items-center justify-between">
          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="Midi8 — Página inicial"
          >
            <div className="w-7 h-7 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-zinc-600 group-hover:shadow-[0_0_18px_rgba(234,88,12,0.25)] transition-all duration-300">
              <span className="text-[11px] font-bold text-white">M8</span>
            </div>
            <span className="text-sm font-semibold text-white tracking-tight">
              Midi8
            </span>
          </Link>

          {/* ── Desktop Navigation ── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors duration-200 group"
              >
                {link.label}
                {/* Underline accent on hover */}
                <span className="absolute bottom-1 left-4 right-4 h-px bg-[#EA580C] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </div>

          {/* ── CTA + Mobile Hamburger ── */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <Link
              href="#contacto"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white bg-[#EA580C] hover:bg-[#f06115] transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(234,88,12,0)] hover:shadow-[0_0_20px_rgba(234,88,12,0.35)] border border-[#EA580C]/50"
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
                className={`block w-5 h-[1.5px] bg-zinc-300 transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-zinc-300 transition-all duration-300 ${
                  mobileOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-zinc-300 transition-all duration-300 ${
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
            className="fixed inset-0 z-40 bg-zinc-950/98 backdrop-blur-2xl md:hidden flex flex-col"
          >
            {/* Top bar replica */}
            <div className="h-[64px] flex items-center px-6 border-b border-white/[0.04]">
              <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
                <div className="w-7 h-7 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <span className="text-[11px] font-bold text-white">M8</span>
                </div>
                <span className="text-sm font-semibold text-white tracking-tight">
                  Midi8
                </span>
              </Link>
            </div>

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
                    className="block w-full py-4 text-2xl font-semibold text-zinc-200 hover:text-white border-b border-white/[0.04] transition-colors"
                  >
                    {link.label}
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
                  href="#contacto"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-lg font-semibold text-white bg-[#EA580C] hover:bg-[#f06115] transition-colors cursor-pointer"
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
            <div className="px-8 py-6 border-t border-white/[0.04]">
              <p className="text-xs text-zinc-600 font-mono text-center tracking-widest uppercase">
                © 2026 Midi8 · Engenharia de Software
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
