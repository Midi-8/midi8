"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Wordmark from "@/components/Wordmark";
import { projects, TOTAL_PROJECTS } from "@/data/projects";

interface HeroProps {
  isMobile?: boolean;
}

const [mr, cafe] = projects;
const stats = [
  { value: String(TOTAL_PROJECTS), label: "Projetos em produção" },
  { value: mr.caseStudy!.results[0].metric, label: "Lighthouse, MR Construções" },
  { value: mr.caseStudy!.results[1].metric, label: "LCP em 4G, MR Construções" },
  { value: cafe.caseStudy!.results[0].metric, label: "Sincronização, Café do Rio" },
];

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
        className="relative z-10 max-w-5xl mx-auto px-6 py-28 text-center max-md:text-left max-md:w-full"
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
              className="mx-auto max-md:mx-0 w-[min(78vw,560px)] max-md:w-full h-auto text-foreground drop-shadow-[0_4px_32px_rgba(0,0,0,0.85)]"
            />
          </h1>

          {/* Proposta de valor */}
          <p
            className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl max-md:text-4xl max-md:leading-[1.05] tracking-tight leading-tight mb-6 max-md:mb-10 max-w-3xl mx-auto max-md:mx-0"
            style={{ filter: "drop-shadow(0 2px 20px rgba(0,0,0,0.9))" }}
          >
            <span className="text-foreground">Sites e sistemas à medida,</span>{" "}
            <span className="text-gradient">que trazem clientes e poupam horas.</span>
          </p>

          <p
            className="max-md:hidden font-display font-medium max-w-xl mx-auto text-base sm:text-lg text-secondary leading-relaxed mb-10"
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.9)" }}
          >
            Desenhamos e construímos websites, plataformas web, automação e IA para empresas.
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-center justify-center max-md:items-stretch max-md:gap-2 gap-4">
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
                strokeWidth={1.5}
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
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Números reais dos casos de estudo (src/data/projects.ts) */}
          <motion.dl
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-md:hidden mt-16 grid grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center flex flex-col">
                <dd
                  className="order-1 font-display text-3xl font-bold text-foreground"
                  style={{ textShadow: "0 0 20px rgba(0,0,0,0.9)" }}
                >
                  {stat.value}
                </dd>
                <dt className="order-2 text-xs text-muted mt-1 leading-snug">{stat.label}</dt>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </motion.div>
    </section>
  );
}
