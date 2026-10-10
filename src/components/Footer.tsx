"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { getCalApi } from "@calcom/embed-react";

export default function Footer() {
  const currentYear = 2026;

  // Cal.com initialization with dark theme and copper branding
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#EA580C" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  const handleOpenCal = async (e: React.MouseEvent) => {
    e.preventDefault();
    const cal = await getCalApi();
    cal("modal", {
      calLink: "midi8/reuniao-estrategica",
      config: { layout: "month_view", theme: "dark" },
    });
  };

  return (
    <footer id="contacto" className="relative">
      {/* Subtle separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* CTA Block */}
      <div className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-mono text-zinc-500 tracking-widest uppercase mb-4">
              Próximo passo
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
              Vamos construir algo
              <br />
              <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                extraordinário.
              </span>
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto mb-10 text-sm sm:text-base leading-relaxed">
              Agende uma reunião estratégica sem compromisso. Analisamos o seu
              desafio e desenhamos uma solução técnica precisa.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                data-cal-link="midi8/reuniao-estrategica"
                data-cal-namespace=""
                data-cal-config='{"layout":"month_view","theme":"dark"}'
                onClick={handleOpenCal}
                className="cta-button cursor-pointer"
              >
                <span className="relative z-10">Agendar Reunião</span>
                <svg
                  className="relative z-10 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
              <a
                href="mailto:hello@midi8.pt"
                className="cta-button cta-secondary"
              >
                <span>hello@midi8.pt</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo monocromático */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-zinc-800 border border-zinc-700/80 flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">M8</span>
            </div>
            <span className="text-sm font-semibold text-foreground tracking-tight">
              Midi8
            </span>
          </div>

          {/* Contact links */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:hello@midi8.pt"
              className="text-xs text-zinc-500 hover:text-foreground transition-colors"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/company/midi8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-500 hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://wa.me/351000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-500 hover:text-foreground transition-colors"
            >
              WhatsApp
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-zinc-600">
            © {currentYear} Midi8. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
