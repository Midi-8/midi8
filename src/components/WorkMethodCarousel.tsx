"use client";

import { useCallback, useState, type ReactNode } from "react";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import { useLanguage, type Locale } from "@/context/LanguageContext";

interface ProcessStep {
  id: string;
  code: string;
  accentHex: string;
  accentRgb: string;
  gradient: string;
  title: Record<Locale, string>;
  duration: Record<Locale, string>;
  summary: Record<Locale, string>;
  deliverables: Record<Locale, string[]>;
  icon: ReactNode;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "diagnostico",
    code: "01",
    accentHex: "#A818FF",
    accentRgb: "168, 24, 255",
    gradient:
      "linear-gradient(155deg, rgba(255,255,255,0.97) 0%, rgba(243,230,255,0.93) 26%, #8F18FF 68%, #145EFF 100%)",
    title: { pt: "Diagnóstico & Alinhamento", en: "Discovery & Alignment" },
    duration: { pt: "2 - 5 dias", en: "2 - 5 days" },
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
    accentHex: "#145EFF",
    accentRgb: "20, 94, 255",
    gradient:
      "linear-gradient(155deg, rgba(255,255,255,0.97) 0%, rgba(226,238,255,0.93) 26%, #145EFF 66%, #00C885 100%)",
    title: { pt: "Arquitetura & Design", en: "Architecture & Design" },
    duration: { pt: "1 - 2 semanas", en: "1 - 2 weeks" },
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
    accentHex: "#00C885",
    accentRgb: "0, 200, 133",
    gradient:
      "linear-gradient(155deg, rgba(255,255,255,0.97) 0%, rgba(224,251,238,0.93) 26%, #00B074 66%, #145EFF 100%)",
    title: { pt: "Engenharia, IA & Execução", en: "Engineering, AI & Execution" },
    duration: { pt: "2 - 6 semanas", en: "2 - 6 weeks" },
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
    accentHex: "#145EFF",
    accentRgb: "120, 62, 255",
    gradient:
      "linear-gradient(150deg, rgba(255,255,255,0.97) 0%, rgba(238,232,255,0.93) 24%, #A818FF 54%, #145EFF 78%, #00C885 100%)",
    title: { pt: "Lançamento & Escala", en: "Launch & Scale" },
    duration: { pt: "Contínuo", en: "Ongoing" },
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

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y < -36 || info.velocity.y < -220) {
      stepBy(1);
    } else if (info.offset.y > 36 || info.velocity.y > 220) {
      stepBy(-1);
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-28 px-4 sm:px-6 overflow-hidden">
      {/* Glow ambiental suave que acompanha a fase ativa */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse 56% 52% at 68% 54%, rgba(${activeStep.accentRgb}, 0.13) 0%, rgba(20, 94, 255, 0.05) 45%, transparent 74%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <p className="type-label text-subtle mb-2">
              {locale === "pt" ? "Método de Trabalho" : "How We Work"}
            </p>
            <h2 className="type-headline-md text-foreground mb-3">
              {locale === "pt"
                ? "Do primeiro diagnóstico ao lançamento em produção."
                : "From initial discovery to production launch."}
            </h2>
            <p className="type-body text-muted text-pretty">
              {locale === "pt"
                ? "Navegue verticalmente pelas quatro fases para explorar entregas, ritmo e validação."
                : "Move vertically through all four stages to explore deliverables, cadence, and validation."}
            </p>
          </div>

          {/* Controlos verticais discretos (desktop) */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => stepBy(-1)}
              aria-label={locale === "pt" ? "Fase anterior" : "Previous stage"}
              className="w-10 h-10 rounded-full border border-black/[0.09] bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_4px_12px_-6px_rgba(15,23,42,0.14)] flex items-center justify-center text-foreground hover:bg-foreground hover:text-white hover:border-foreground active:scale-95 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-5 5m5-5l5 5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => stepBy(1)}
              aria-label={locale === "pt" ? "Próxima fase" : "Next stage"}
              className="w-10 h-10 rounded-full border border-black/[0.09] bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_4px_12px_-6px_rgba(15,23,42,0.14)] flex items-center justify-center text-foreground hover:bg-foreground hover:text-white hover:border-foreground active:scale-95 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
          {/* ─── Coluna Esquerda: Rail vertical das 4 fases ─── */}
          <div className="lg:col-span-5 relative">
            {/* Linha vertical com gradiente da marca (desktop) */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute left-[19px] top-6 bottom-6 w-[2px] rounded-full bg-border overflow-hidden"
            >
              <div
                className="w-full rounded-full bg-gradient-to-b from-[#A818FF] via-[#145EFF] to-[#00E896] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  height: `${((activeIndex + 1) / total) * 100}%`,
                }}
              />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5 lg:gap-3">
              {PROCESS_STEPS.map((step, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-pressed={isActive}
                    className={`group relative text-left rounded-2xl border p-3.5 sm:p-4 lg:pl-12 transition-all duration-300 active:scale-[0.98] cursor-pointer ${
                      isActive
                        ? "bg-white border-black/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_2px_4px_rgba(15,23,42,0.05),0_18px_36px_-22px_rgba(20,94,255,0.28)]"
                        : "bg-white/65 border-black/[0.06] hover:bg-white/95 hover:border-border-light"
                    }`}
                  >
                    {/* Ponto de estado no rail vertical (desktop) */}
                    <span
                      aria-hidden="true"
                      className="hidden lg:flex absolute left-[12px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: isActive ? step.accentHex : "#fafaf9",
                        border: isActive
                          ? `2px solid ${step.accentHex}`
                          : "1.5px solid rgba(11,15,23,0.18)",
                        boxShadow: isActive
                          ? `0 0 0 4px rgba(${step.accentRgb}, 0.16)`
                          : "none",
                      }}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          isActive ? "bg-white" : "bg-transparent"
                        }`}
                      />
                    </span>

                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span
                        className="text-[11px] font-bold tracking-widest tabular-nums transition-colors"
                        style={{ color: isActive ? step.accentHex : undefined }}
                      >
                        {step.code}
                      </span>
                      <span className="text-[11px] text-subtle">
                        {step.duration[locale]}
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
              className="relative w-full h-[450px] sm:h-[470px] flex items-center justify-center select-none focus-visible:outline-none"
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
                    drag={isCenter ? "y" : false}
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={0.22}
                    onDragEnd={isCenter ? handleDragEnd : undefined}
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
                    className={`absolute w-full max-w-[600px] min-h-[305px] sm:min-h-[325px] rounded-3xl overflow-hidden border transition-[border-color,box-shadow] duration-300 ${
                      isCenter
                        ? "border-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_28px_60px_-24px_rgba(20,94,255,0.34),0_12px_28px_-14px_rgba(168,24,255,0.22)] cursor-grab active:cursor-grabbing"
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
                      className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/55 to-transparent transition-opacity duration-500 ${
                        isCenter ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    {/* Número editorial em marca-d'água no fundo */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute -right-2 -bottom-5 font-display italic text-[110px] sm:text-[138px] leading-none tracking-tight select-none transition-opacity duration-500 ${
                        isCenter ? "text-white/15 opacity-100" : "text-foreground/[0.04] opacity-80"
                      }`}
                    >
                      {step.code}
                    </span>

                    {/* Conteúdo do cartão */}
                    <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-between gap-5">
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-5">
                          <div className="inline-flex items-center gap-2.5">
                            <span
                              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
                                isCenter
                                  ? "bg-white/90 border-white/80 text-foreground shadow-xs"
                                  : "bg-surface border-border text-muted"
                              }`}
                            >
                              {step.icon}
                            </span>
                            <span
                              className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.04em] border ${
                                isCenter
                                  ? "bg-white/85 border-white/75 text-foreground"
                                  : "bg-surface border-border text-subtle"
                              }`}
                            >
                              {locale === "pt" ? `Fase ${step.code}` : `Stage ${step.code}`}
                            </span>
                          </div>

                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] border ${
                              isCenter
                                ? "bg-white/80 border-white/70 text-foreground"
                                : "bg-surface border-border text-subtle"
                            }`}
                          >
                            {step.duration[locale]}
                          </span>
                        </div>

                        <h3
                          className={`text-xl sm:text-2xl font-bold leading-snug mb-2.5 transition-colors ${
                            isCenter ? "text-foreground" : "text-foreground/75"
                          }`}
                        >
                          {step.title[locale]}
                        </h3>
                        <p
                          className={`text-sm sm:text-[15px] leading-relaxed text-pretty max-w-lg transition-colors ${
                            isCenter ? "text-foreground/85" : "text-muted"
                          }`}
                        >
                          {step.summary[locale]}
                        </p>
                      </div>

                      {/* Entregáveis em cápsulas translúcidas */}
                      <div className="pt-4 border-t border-white/30">
                        <p
                          className={`text-[10px] uppercase tracking-wider mb-2.5 ${
                            isCenter ? "text-white/85" : "text-subtle"
                          }`}
                        >
                          {locale === "pt" ? "Entregáveis principais" : "Key deliverables"}
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {step.deliverables[locale].map((item) => (
                            <li
                              key={item}
                              className={`rounded-xl px-3 py-2 text-xs leading-snug border backdrop-blur-md transition-colors ${
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

            {/* Indicadores circulares + controlos mobile */}
            <div className="mt-3 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => stepBy(-1)}
                aria-label={locale === "pt" ? "Fase anterior" : "Previous stage"}
                className="lg:hidden w-9 h-9 rounded-full border border-border bg-white flex items-center justify-center text-foreground active:scale-95 transition-transform cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-5 5m5-5l5 5" />
                </svg>
              </button>

              <div className="flex items-center gap-2">
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

              <button
                type="button"
                onClick={() => stepBy(1)}
                aria-label={locale === "pt" ? "Próxima fase" : "Next stage"}
                className="lg:hidden w-9 h-9 rounded-full border border-border bg-white flex items-center justify-center text-foreground active:scale-95 transition-transform cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
