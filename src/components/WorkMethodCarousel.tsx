"use client";

import { useCallback, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import KineticHeading from "@/components/KineticHeading";
import { useLanguage, type Locale } from "@/context/LanguageContext";

interface ProcessStep {
  id: string;
  code: string;
  accentHex: string;
  accentRgb: string;
  gradient: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  deliverables: Record<Locale, string[]>;
  icon: ReactNode;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "diagnostico",
    code: "01",
    accentHex: "#C015FF",
    accentRgb: "192, 21, 255",
    gradient:
      "linear-gradient(155deg, rgba(255,255,255,0.97) 0%, rgba(248,230,255,0.93) 26%, #C015FF 68%, #0069F8 100%)",
    title: { pt: "Diagnóstico & Alinhamento", en: "Discovery & Alignment" },
    summary: {
      pt: "Mapeamos o negócio, identificamos gargalos reais e definimos métricas de sucesso antes de escrever uma única linha de código.",
      en: "We map your business, pinpoint real bottlenecks, and lock clear success metrics before writing a single line of code.",
    },
    deliverables: {
      pt: [
        "Auditoria técnica e de negócio",
        "Âmbito fechado e prioridades",
        "Plano de execução e prazos",
      ],
      en: [
        "Technical & business audit",
        "Clear scope and priorities",
        "Execution roadmap & timeline",
      ],
    },
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    id: "arquitetura",
    code: "02",
    accentHex: "#0069F8",
    accentRgb: "0, 105, 248",
    gradient:
      "linear-gradient(155deg, rgba(255,255,255,0.97) 0%, rgba(224,240,255,0.93) 26%, #0069F8 66%, #00E8B2 100%)",
    title: { pt: "Arquitetura & Design", en: "Architecture & Design" },
    summary: {
      pt: "Desenhamos interfaces limpas, sistemas escaláveis e fluxos de comunicação coerentes, validados em protótipo interativo.",
      en: "We craft clean interfaces, scalable systems, and coherent communication flows validated through interactive prototypes.",
    },
    deliverables: {
      pt: [
        "Protótipo navegável de alta fidelidade",
        "Design system e identidade digital",
        "Arquitetura de dados e integrações",
      ],
      en: [
        "High-fidelity interactive prototype",
        "Design system & digital identity",
        "Data & integration architecture",
      ],
    },
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L3 8l9 5 9-5-9-5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13l9 5 9-5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 17.5L12 22l9-4.5" />
      </svg>
    ),
  },
  {
    id: "engenharia",
    code: "03",
    accentHex: "#00E8B2",
    accentRgb: "0, 232, 178",
    gradient:
      "linear-gradient(155deg, rgba(255,255,255,0.97) 0%, rgba(220,252,244,0.93) 26%, #00E8B2 66%, #0069F8 100%)",
    title: { pt: "Engenharia, IA & Execução", en: "Engineering, AI & Execution" },
    summary: {
      pt: "Construímos em ciclos curtos com entregas testáveis todas as semanas - código rigoroso, automações fiáveis e campanhas prontas a converter.",
      en: "We build in tight weekly cycles with testable milestones - clean code, reliable automations, and conversion-ready campaigns.",
    },
    deliverables: {
      pt: [
        "Entregas semanais em ambiente de testes",
        "Automação e agentes IA nas suas ferramentas",
        "Testes de performance, segurança e SEO",
      ],
      en: [
        "Weekly staging releases",
        "Automation & AI inside your tools",
        "Performance, security & SEO testing",
      ],
    },
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5L3.75 12l4.5 4.5m7.5-9L20.25 12l-4.5 4.5m-2.25-10.5l-3 12" />
      </svg>
    ),
  },
  {
    id: "escala",
    code: "04",
    accentHex: "#0069F8",
    accentRgb: "0, 105, 248",
    gradient:
      "linear-gradient(150deg, rgba(255,255,255,0.97) 0%, rgba(246,232,255,0.93) 24%, #C015FF 54%, #0069F8 78%, #00E8B2 100%)",
    title: { pt: "Lançamento & Escala", en: "Launch & Scale" },
    summary: {
      pt: "Publicamos sem fricção, monitorizamos dados reais desde o primeiro dia e otimizamos continuamente para multiplicar resultados.",
      en: "We ship smoothly, track live metrics from day one, and continuously optimize to compound business results.",
    },
    deliverables: {
      pt: [
        "Deploy em produção com monitorização",
        "Dashboards de métricas e conversão",
        "Evolução contínua e suporte direto",
      ],
      en: [
        "Production deploy with monitoring",
        "Live analytics & conversion dashboards",
        "Continuous iteration & direct support",
      ],
    },
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
      </svg>
    ),
  },
];

function getCircularDiff(index: number, active: number, total: number): number {
  let diff = index - active;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

export default function WorkMethodCarousel() {
  const { locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const total = PROCESS_STEPS.length;
  const activeStep = PROCESS_STEPS[activeIndex];

  const stepBy = useCallback(
    (delta: number) => {
      setActiveIndex((prev) => (prev + delta + total) % total);
    },
    [total]
  );

  return (
    <section className="relative w-full py-10 sm:py-28 px-4 sm:px-6 overflow-hidden">
      {/* Glow ambiental suave que acompanha a fase ativa */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse 56% 52% at 68% 54%, rgba(${activeStep.accentRgb}, 0.13) 0%, rgba(0, 105, 248, 0.05) 45%, transparent 74%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-6 sm:mb-14">
          <KineticHeading
            className="type-headline-lg text-foreground mb-2.5 sm:mb-3"
            segments={
              locale === "pt"
                ? [
                    { text: "Do primeiro diagnóstico ao " },
                    { text: "lançamento", italic: true },
                    { text: " em produção." },
                  ]
                : [
                    { text: "From initial discovery to " },
                    { text: "production", italic: true },
                    { text: " launch." },
                  ]
            }
          />
          <p className="type-body text-muted max-w-2xl text-pretty">
            {locale === "pt"
              ? "Um processo estruturado em quatro fases transparentes que assegura alinhamento estratégico, entregas contínuas e evolução sustentada."
              : "A structured four-stage methodology built for strategic alignment, continuous delivery, and measurable long-term growth."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-center">
          {/* ─── Coluna Esquerda: Lista limpa das 4 fases ─── */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-2.5 lg:gap-3">
              {PROCESS_STEPS.map((step, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-pressed={isActive}
                    className={`group relative text-left rounded-xl sm:rounded-2xl border p-3 sm:p-5 transition-all duration-300 active:scale-[0.98] cursor-pointer ${
                      isActive
                        ? "bg-white border-black/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_2px_4px_rgba(15,23,42,0.05),0_18px_36px_-22px_rgba(0,105,248,0.28)]"
                        : "bg-white/65 border-black/[0.06] hover:bg-white/95 hover:border-border-light"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1 sm:mb-1.5">
                      <span
                        aria-hidden="true"
                        className="w-2 h-2 rounded-full shrink-0 transition-colors duration-300"
                        style={{
                          backgroundColor: isActive ? step.accentHex : "rgba(11,15,23,0.16)",
                        }}
                      />
                      <span
                        className="text-[10px] sm:text-[11px] font-bold tracking-widest tabular-nums transition-colors"
                        style={{ color: isActive ? step.accentHex : undefined }}
                      >
                        {step.code}
                      </span>
                    </div>
                    <p
                      className={`text-xs sm:text-sm lg:text-base transition-colors leading-snug ${
                        isActive
                          ? "font-bold text-foreground"
                          : "font-normal text-foreground/75 group-hover:text-foreground"
                      }`}
                    >
                      {step.title[locale]}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── Coluna Direita: Carrossel Vertical 3D em Gradiente ─── */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Setas centradas em cima do carrossel */}
            <div className="mb-2.5 sm:mb-3 flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => stepBy(-1)}
                aria-label={locale === "pt" ? "Fase anterior" : "Previous stage"}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-black/[0.09] bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_4px_12px_-6px_rgba(15,23,42,0.14)] flex items-center justify-center text-foreground hover:bg-foreground hover:text-white hover:border-foreground active:scale-95 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-5 5m5-5l5 5" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => stepBy(1)}
                aria-label={locale === "pt" ? "Próxima fase" : "Next stage"}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-black/[0.09] bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_4px_12px_-6px_rgba(15,23,42,0.14)] flex items-center justify-center text-foreground hover:bg-foreground hover:text-white hover:border-foreground active:scale-95 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5" />
                </svg>
              </button>
            </div>
            {/* ─── Mobile (< sm): Cartão único compacto, limpo e proporcional ao telemóvel ─── */}
            <div className="sm:hidden w-full">
              <AnimatePresence mode="wait">
                <motion.article
                  key={activeStep.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full rounded-2xl overflow-hidden border border-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_20px_42px_-22px_rgba(0,105,248,0.3)]"
                >
                  <div
                    aria-hidden="true"
                    style={{ background: activeStep.gradient }}
                    className="pointer-events-none absolute inset-0"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/55 to-transparent"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-1 -bottom-3 font-display italic text-[76px] leading-none tracking-tight text-white/15 select-none"
                  >
                    {activeStep.code}
                  </span>

                  <div className="relative z-10 p-4 flex flex-col gap-3.5">
                    <div>
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="w-7 h-7 rounded-lg bg-white/90 border border-white/80 text-foreground flex items-center justify-center shadow-xs">
                          {activeStep.icon}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-white/85 border border-white/75 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.04em] text-foreground">
                          {locale === "pt" ? `Fase ${activeStep.code}` : `Stage ${activeStep.code}`}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-foreground leading-snug mb-1">
                        {activeStep.title[locale]}
                      </h3>
                      <p className="text-xs text-foreground/85 leading-relaxed text-pretty">
                        {activeStep.summary[locale]}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-white/30">
                      <p className="text-[10px] uppercase tracking-wider text-white/85 mb-1.5">
                        {locale === "pt" ? "Entregáveis principais" : "Key deliverables"}
                      </p>
                      <ul className="flex flex-col gap-1.5">
                        {activeStep.deliverables[locale].map((item) => (
                          <li
                            key={item}
                            className="rounded-lg bg-white/88 border border-white/75 px-2.5 py-1.5 text-[11px] text-foreground leading-snug backdrop-blur-md"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            {/* ─── Desktop (>= sm): Carrossel Vertical 3D em Cascata ─── */}
            <div
              role="region"
              aria-roledescription="carousel"
              aria-label={locale === "pt" ? "Carrossel vertical de método de trabalho" : "Vertical work process carousel"}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  stepBy(-1);
                } else if (e.key === "ArrowDown") {
                  e.preventDefault();
                  stepBy(1);
                }
              }}
              style={{ perspective: "1200px" }}
              className="hidden sm:flex relative w-full h-[460px] items-center justify-center select-none focus-visible:outline-none"
            >
              {PROCESS_STEPS.map((step, index) => {
                const diff = getCircularDiff(index, activeIndex, total);
                const isCenter = diff === 0;
                const isAdjacent = Math.abs(diff) === 1;

                // Posicionamento vertical em cascata 3D
                const yOffset =
                  diff === 0 ? 0 : diff === -1 ? -86 : diff === 1 ? 86 : diff < 0 ? -134 : 134;
                const scale = isCenter ? 1 : isAdjacent ? 0.91 : 0.82;
                const rotateX = prefersReducedMotion
                  ? 0
                  : diff === 0
                    ? 0
                    : diff < 0
                      ? 8
                      : -8;
                const opacity = isCenter ? 1 : isAdjacent ? 0.52 : 0.12;
                const zIndex = isCenter ? 30 : isAdjacent ? 20 : 10;

                return (
                  <motion.article
                    key={step.id}
                    onClick={() => {
                      if (!isCenter) setActiveIndex(index);
                    }}
                    initial={false}
                    animate={{
                      y: yOffset,
                      scale,
                      rotateX,
                      opacity,
                    }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.2 }
                        : { type: "spring", stiffness: 260, damping: 28, mass: 0.8 }
                    }
                    style={{
                      zIndex,
                      transformStyle: "preserve-3d",
                    }}
                    className={`absolute w-full max-w-[600px] min-h-[260px] sm:min-h-[325px] rounded-2xl sm:rounded-3xl overflow-hidden border transition-[border-color,box-shadow] duration-300 ${
                      isCenter
                        ? "border-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_28px_60px_-24px_rgba(0,105,248,0.34),0_12px_28px_-14px_rgba(192,21,255,0.22)]"
                        : "border-black/[0.08] bg-white/95 shadow-[0_14px_30px_-20px_rgba(15,23,42,0.18)] cursor-pointer hover:border-border-light"
                    }`}
                  >
                    {/* Camada de gradiente midi8 no cartão ativo */}
                    <div
                      aria-hidden="true"
                      style={{ background: step.gradient }}
                      className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                        isCenter ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    {/* Reflexo subtil de vidro no topo */}
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-x-0 top-0 h-24 sm:h-28 bg-gradient-to-b from-white/55 to-transparent transition-opacity duration-500 ${
                        isCenter ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    {/* Número editorial em marca-d'água no fundo */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute -right-2 -bottom-4 font-display italic text-[86px] sm:text-[138px] leading-none tracking-tight select-none transition-opacity duration-500 ${
                        isCenter ? "text-white/15 opacity-100" : "text-foreground/[0.04] opacity-80"
                      }`}
                    >
                      {step.code}
                    </span>

                    {/* Conteúdo do cartão */}
                    <div className="relative z-10 p-4 sm:p-8 h-full flex flex-col justify-between gap-4 sm:gap-5">
                      <div>
                        <div className="flex items-center gap-2 sm:gap-2.5 mb-3.5 sm:mb-5">
                          <span
                            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-colors ${
                              isCenter
                                ? "bg-white/90 border-white/80 text-foreground shadow-xs"
                                : "bg-surface border-border text-muted"
                            }`}
                          >
                            {step.icon}
                          </span>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.04em] border ${
                              isCenter
                                ? "bg-white/85 border-white/75 text-foreground"
                                : "bg-surface border-border text-subtle"
                            }`}
                          >
                            {locale === "pt" ? `Fase ${step.code}` : `Stage ${step.code}`}
                          </span>
                        </div>

                        <h3
                          className={`text-lg sm:text-2xl font-bold leading-snug mb-1.5 sm:mb-2.5 transition-colors ${
                            isCenter ? "text-foreground" : "text-foreground/75"
                          }`}
                        >
                          {step.title[locale]}
                        </h3>
                        <p
                          className={`text-xs sm:text-[15px] leading-relaxed text-pretty max-w-lg transition-colors ${
                            isCenter ? "text-foreground/85" : "text-muted"
                          }`}
                        >
                          {step.summary[locale]}
                        </p>
                      </div>

                      {/* Entregáveis em cápsulas translúcidas */}
                      <div className="pt-3 sm:pt-4 border-t border-white/30">
                        <p
                          className={`text-[10px] uppercase tracking-wider mb-2 sm:mb-2.5 ${
                            isCenter ? "text-white/85" : "text-subtle"
                          }`}
                        >
                          {locale === "pt" ? "Entregáveis principais" : "Key deliverables"}
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2">
                          {step.deliverables[locale].map((item) => (
                            <li
                              key={item}
                              className={`rounded-lg sm:rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 text-[11px] sm:text-xs leading-snug border backdrop-blur-md transition-colors ${
                                isCenter
                                  ? "bg-white/88 border-white/75 text-foreground shadow-[0_6px_16px_-10px_rgba(11,15,23,0.22)]"
                                  : "bg-surface/80 border-border text-muted"
                              }`}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {/* Indicadores circulares */}
            <div className="mt-3 flex items-center justify-center gap-2">
              {PROCESS_STEPS.map((step, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`${locale === "pt" ? "Fase" : "Stage"} ${step.code}`}
                    aria-current={isActive ? "step" : undefined}
                    className="w-2.5 h-2.5 rounded-full transition-colors duration-300 cursor-pointer"
                    style={{
                      backgroundColor: isActive ? step.accentHex : "rgba(11, 15, 23, 0.16)",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
