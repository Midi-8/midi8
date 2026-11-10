"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Wordmark from "@/components/Wordmark";
import { TOTAL_PROJECTS } from "@/data/projects";

interface HeroProps {
  isMobile?: boolean;
}

// O fundo (metal líquido + luz cobre) vive em LiquidBackground, fixo atrás de todo o site.
export default function Hero({ isMobile = false }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Saída no scroll: o conteúdo sobe e desvanece. Só transform/opacity (compositor).
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -72]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* ─── Floating Content (above the metal surface) ─── */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 py-28 text-center"
        style={isMobile ? undefined : { opacity: contentOpacity, y: contentY }}
      >
        {/* Inner glass panel so text reads cleanly over the fluid */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >

          {/* H1: o logótipo é o título */}
          <h1 className="mb-8">
            <Wordmark
              title="Midi8"
              className="mx-auto w-[min(78vw,560px)] h-auto text-foreground drop-shadow-[0_4px_32px_rgba(0,0,0,0.85)]"
            />
          </h1>

          {/* Subtítulo */}
          <p
            className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight mb-6"
            style={{ filter: "drop-shadow(0 2px 20px rgba(0,0,0,0.9))" }}
          >
            <span className="text-foreground">Tecnologia avançada.</span>{" "}
            <span className="text-gradient">Resultados medíveis.</span>
          </p>

          {/* Subtitle */}
          <p
            className="font-display font-medium max-w-xl mx-auto text-base sm:text-lg text-secondary leading-relaxed mb-10"
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.9)" }}
          >
            Soluções corporativas de desenvolvimento web, automação e suporte à
            decisão, desenhadas com precisão para otimizar o seu modelo de negócio.
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contacto"
              className="cta-button cursor-pointer w-full sm:w-auto"
            >
              <span>Agendar Reunião</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href="#solucoes"
              className="cta-button cta-secondary w-full sm:w-auto"
            >
              <span>Ver Soluções</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Performance stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-20 pt-8 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
          >
            {[
              { value: `${TOTAL_PROJECTS}+`, label: "Projetos em Produção" },
              { value: "100%", label: "Taxa de Entrega" },
              { value: "24h",  label: "Tempo de Resposta" },
              { value: "∞",    label: "Compromisso" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-2xl sm:text-3xl font-bold text-foreground font-mono"
                  style={{ textShadow: "0 0 20px rgba(0,0,0,0.9)" }}
                >
                  {stat.value}
                </div>
                <div className="text-[11px] text-subtle mt-1 tracking-widest uppercase font-mono">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Scroll hint (desktop only) */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.25, 0.75, 0.25] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="mt-10 inline-flex items-center gap-2 text-[11px] font-mono tracking-widest text-subtle uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Scroll para explorar
              <svg
                className="w-3 h-3 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
