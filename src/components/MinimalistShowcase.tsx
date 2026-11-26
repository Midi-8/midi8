"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import KineticHeading from "@/components/KineticHeading";
import { useLanguage, type Locale } from "@/context/LanguageContext";

interface ShowcasePanel {
  id: string;
  accentHex: string;
  gradient: string;
  word: Record<Locale, string>;
  headline: Record<Locale, string>;
  description: Record<Locale, string>;
  href: string;
  cta: Record<Locale, string>;
}

const PANELS: ShowcasePanel[] = [
  {
    id: "web-software",
    accentHex: "#C015FF",
    gradient:
      "linear-gradient(155deg, rgba(255,255,255,0.97) 0%, rgba(248,230,255,0.92) 30%, #C015FF 72%, #0069F8 100%)",
    word: { pt: "Web & Software", en: "Web & Software" },
    headline: {
      pt: "Engenharia digital desenhada para escalar.",
      en: "Digital engineering built to scale.",
    },
    description: {
      pt: "Desenvolvemos websites, plataformas web, software à medida e aplicações móveis com elevada performance, segurança e atenção ao detalhe.",
      en: "We craft websites, web platforms, custom software, and mobile apps engineered for speed, reliability, and lasting visual quality.",
    },
    href: "/servicos?cat=web-software",
    cta: { pt: "Ver Web & Software", en: "Explore Web & Software" },
  },
  {
    id: "ia-automacao",
    accentHex: "#0069F8",
    gradient:
      "linear-gradient(155deg, rgba(255,255,255,0.97) 0%, rgba(224,240,255,0.92) 30%, #0069F8 68%, #00E8B2 100%)",
    word: { pt: "Automação, IA & Dados", en: "Automation, AI & Data" },
    headline: {
      pt: "Operações mais ágeis, decisões mais seguras.",
      en: "Smarter operations, sharper decisions.",
    },
    description: {
      pt: "Integramos inteligência artificial, automação de fluxos e análise de dados para eliminar tarefas repetitivas e potenciar a eficiência da organização.",
      en: "We integrate practical AI, automated workflows, and business intelligence to eliminate manual bottlenecks and accelerate decision-making.",
    },
    href: "/servicos?cat=ia-automacao",
    cta: { pt: "Ver Automação, IA & Dados", en: "Explore Automation, AI & Data" },
  },
  {
    id: "marketing",
    accentHex: "#00E8B2",
    gradient:
      "linear-gradient(155deg, rgba(255,255,255,0.97) 0%, rgba(220,252,244,0.92) 30%, #00E8B2 68%, #0069F8 100%)",
    word: { pt: "Estratégia & Marketing", en: "Strategy & Marketing" },
    headline: {
      pt: "Posicionamento claro e crescimento mensurável.",
      en: "Clear positioning and measurable growth.",
    },
    description: {
      pt: "Estruturamos identidade, comunicação, redes sociais e campanhas orientadas a resultados para reforçar a notoriedade e a aquisição de clientes.",
      en: "We align brand identity, communication, social channels, and performance campaigns to strengthen visibility and drive qualified demand.",
    },
    href: "/servicos?cat=marketing",
    cta: { pt: "Ver Estratégia & Marketing", en: "Explore Strategy & Marketing" },
  },
  {
    id: "consultoria-ecom",
    accentHex: "#0069F8",
    gradient:
      "linear-gradient(155deg, rgba(255,255,255,0.97) 0%, rgba(224,240,255,0.92) 30%, #0069F8 64%, #C015FF 100%)",
    word: { pt: "Consultoria & E-commerce", en: "Consulting & E-commerce" },
    headline: {
      pt: "Visão estratégica e operações de venda otimizadas.",
      en: "Strategic advisory and high-converting commerce.",
    },
    description: {
      pt: "Acompanhamos decisões tecnológicas críticas e implementamos lojas online preparadas para converter, faturar e escalar sem fricção.",
      en: "We guide critical technology investments and engineer online stores optimized for conversion, fulfillment, and sustainable scale.",
    },
    href: "/servicos?cat=consultoria-ecom",
    cta: { pt: "Ver Consultoria & E-commerce", en: "Explore Consulting & E-commerce" },
  },
  {
    id: "equipa",
    accentHex: "#00E8B2",
    gradient:
      "linear-gradient(150deg, rgba(255,255,255,0.97) 0%, rgba(246,232,255,0.92) 28%, #C015FF 56%, #0069F8 80%, #00E8B2 100%)",
    word: { pt: "Equipa", en: "Team" },
    headline: {
      pt: "Contacto direto com quem concebe e executa.",
      en: "Direct access to the specialists who deliver.",
    },
    description: {
      pt: "Uma equipa multidisciplinar que reúne tecnologia, negócio e comunicação na mesma mesa, garantindo rigor, proximidade e transparência.",
      en: "A multidisciplinary team uniting technology, business analysis, and communication at one table with clarity and accountability.",
    },
    href: "/equipa",
    cta: { pt: "Conhecer a Equipa", en: "Meet the Team" },
  },
];

export default function MinimalistShowcase() {
  const { locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(PANELS[0].id);

  return (
    <section className="relative w-full py-10 sm:py-28 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-12">
          <div className="max-w-2xl">
            <KineticHeading
              className="type-headline-lg text-foreground mb-2.5 sm:mb-3"
              segments={
                locale === "pt"
                  ? [
                      { text: "Tudo ligado num só " },
                      { text: "lugar", italic: true },
                      { text: "." },
                    ]
                  : [
                      { text: "Everything connected in " },
                      { text: "one place", italic: true },
                      { text: "." },
                    ]
              }
            />
            <p className="type-body text-muted text-pretty">
              {locale === "pt"
                ? "Explore cada uma das nossas áreas de atuação e a equipa multidisciplinar que transforma estratégia em soluções digitais concretas."
                : "Explore each of our core practice areas and the multidisciplinary team turning strategy into reliable digital products."}
            </p>
          </div>
          <Link
            href="/contacto"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted hover:text-foreground transition-colors shrink-0 w-fit"
          >
            <span>{locale === "pt" ? "Falar connosco" : "Talk to us"}</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </div>

        {/* 5 faixas minimalistas expansíveis (4 filtros de serviços + Equipa) */}
        <div className="flex flex-col lg:flex-row gap-2.5 sm:gap-3 lg:h-[340px]">
          {PANELS.map((panel) => {
            const isActive = panel.id === activeId;

            return (
              <motion.div
                key={panel.id}
                layout={!prefersReducedMotion}
                transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.85 }}
                onMouseEnter={() => setActiveId(panel.id)}
                onClick={() => setActiveId(panel.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveId(panel.id);
                  }
                }}
                className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue transition-[border-color,box-shadow] duration-300 ${
                  isActive
                    ? "lg:flex-[3.3] border-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_26px_54px_-26px_rgba(0,105,248,0.28),0_10px_24px_-14px_rgba(192,21,255,0.16)]"
                    : "lg:flex-[1] border-black/[0.08] bg-white/90 hover:bg-white hover:border-border-light shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(15,23,42,0.04)]"
                }`}
              >
                {/* Gradiente midi8 no painel aberto */}
                <div
                  aria-hidden="true"
                  style={{ background: panel.gradient }}
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Reflexo vítreo suave no topo */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/55 to-transparent transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div className="relative z-10 h-full p-4 sm:p-6 flex flex-col justify-between gap-3.5 sm:gap-4">
                  {/* Topo: ponto de cor + título da área */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        aria-hidden="true"
                        className="w-2.5 h-2.5 rounded-full shrink-0 transition-colors duration-300"
                        style={{
                          backgroundColor: isActive ? "#0b0f17" : panel.accentHex,
                        }}
                      />
                      <span
                        className={`text-sm leading-snug transition-colors ${
                          isActive
                            ? "font-bold text-foreground"
                            : "font-normal text-foreground/75 group-hover:text-foreground"
                        }`}
                      >
                        {panel.word[locale]}
                      </span>
                    </div>

                    {!isActive && (
                      <span
                        aria-hidden="true"
                        className="text-subtle text-xs shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                      >
                        +
                      </span>
                    )}
                  </div>

                  {/* Conteúdo revelado apenas quando expandido */}
                  {isActive && (
                    <motion.div
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col justify-between gap-5 pt-2"
                    >
                      <div className="max-w-lg">
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-snug mb-2">
                          {panel.headline[locale]}
                        </h3>
                        <p className="text-sm sm:text-[15px] text-foreground/85 leading-relaxed text-pretty">
                          {panel.description[locale]}
                        </p>
                      </div>

                      <Link
                        href={panel.href}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 w-fit rounded-full bg-white/92 border border-white px-4 py-2 text-xs font-bold uppercase tracking-[0.04em] text-foreground hover:bg-foreground hover:text-white hover:border-foreground active:scale-[0.98] transition-all shadow-xs"
                      >
                        <span>{panel.cta[locale]}</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
