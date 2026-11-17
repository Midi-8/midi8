"use client";

import { useState, useEffect, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { id: "sobre", label: "A Midi8", href: "/#sobre" },
  { id: "servicos", label: "Serviços", href: "/#servicos" },
  { id: "equipa", label: "Equipa", href: "/#equipa" },
  { id: "contacto", label: "Contactos", href: "/#contacto" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string>("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onActiveScene = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (id) setActiveId(id);
    };
    window.addEventListener("midi8:active-scene", onActiveScene);
    return () => window.removeEventListener("midi8:active-scene", onActiveScene);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobileOpen]);

  const handleSceneClick = (e: MouseEvent<HTMLAnchorElement>, sceneId: string) => {
    setMobileOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("midi8:goto-scene", { detail: sceneId }));
      window.history.replaceState(null, "", sceneId === "hero" ? "/" : `/#${sceneId}`);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 h-16 flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
          {/* Logo tipográfico rebuscado à esquerda */}
          <Link
            href="/#hero"
            onClick={(e) => handleSceneClick(e, "hero")}
            className="inline-flex items-baseline group shrink-0 justify-self-start text-foreground"
            aria-label="Midi8 — Página inicial"
          >
            <span className="font-display text-2xl sm:text-[1.75rem] font-medium tracking-tight text-foreground leading-none transition-opacity duration-200 group-hover:opacity-75">
              Midi<em className="italic font-normal">8</em>
            </span>
          </Link>

          {/* Desktop Links (sempre a preto) */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isCurrent = pathname === "/" && activeId === link.id;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSceneClick(e, link.id)}
                  className={`px-4 py-2 text-sm font-normal transition-colors ${
                    isCurrent
                      ? "text-foreground underline underline-offset-8 decoration-foreground/50"
                      : "text-foreground/75 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA Reta (Contacta-nos) + Mobile Button */}
          <div className="flex items-center gap-3 justify-self-end">
            <Link
              href="/#contacto"
              onClick={(e) => handleSceneClick(e, "contacto")}
              aria-label="Contacta-nos"
              className="hidden md:inline-flex items-center justify-center rounded-none border border-foreground text-foreground hover:bg-foreground hover:text-white px-5 py-2 text-xs sm:text-sm font-normal tracking-wide transition-colors"
            >
              <span>Contacta-nos</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-10 h-10 rounded-none border border-foreground text-foreground flex items-center justify-center transition-transform active:scale-95"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
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
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleSceneClick(e, link.id)}
                    className="block py-4 text-3xl font-medium tracking-tight text-foreground border-b border-border"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="mt-8"
              >
                <Link
                  href="/#contacto"
                  onClick={(e) => handleSceneClick(e, "contacto")}
                  className="inline-flex items-center justify-center w-full py-4 rounded-none border border-foreground bg-foreground text-white text-sm tracking-wide hover:bg-[#1a2234] transition-colors"
                >
                  <span>Contacta-nos</span>
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
