"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCalApi } from "@calcom/embed-react";

const navLinks = [
  { label: "Serviços", href: "#servicos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Stack", href: "#stack" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenCal = async (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    const cal = await getCalApi();
    cal("modal", {
      calLink: "midi8/reuniao-estrategica",
      config: { layout: "month_view", theme: "dark" },
    });
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo monocromático */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-md bg-zinc-800 border border-zinc-700/80 flex items-center justify-center group-hover:border-zinc-500 group-hover:shadow-[0_0_16px_rgba(255,255,255,0.08)] transition-all duration-300">
              <span className="text-[11px] font-bold text-white">M8</span>
            </div>
            <span className="text-sm font-semibold text-foreground tracking-tight">
              Midi8
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-400 hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              data-cal-link="midi8/reuniao-estrategica"
              data-cal-namespace=""
              data-cal-config='{"layout":"month_view","theme":"dark"}'
              onClick={handleOpenCal}
              className="cta-button !py-2 !px-5 !text-sm cursor-pointer"
            >
              <span className="relative z-10">Agendar Reunião</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span
              className={`block w-5 h-px bg-foreground transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-foreground transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-2xl font-semibold text-foreground"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                type="button"
                data-cal-link="midi8/reuniao-estrategica"
                data-cal-namespace=""
                data-cal-config='{"layout":"month_view","theme":"dark"}'
                onClick={handleOpenCal}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
                className="cta-button mt-4 cursor-pointer"
              >
                <span className="relative z-10">Agendar Reunião</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
