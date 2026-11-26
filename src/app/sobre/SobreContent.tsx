"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import KineticHeading from "@/components/KineticHeading";
import PillarCard3D from "@/components/PillarCard3D";
import { useLanguage, type Locale } from "@/context/LanguageContext";

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

const PILLARS = {
  pt: [
    {
      accentHex: "#A818FF",
      accentRgb: "168, 24, 255",
      variant: "layers",
      title: "Engenharia & Produto",
      description: "Websites, plataformas web, software à medida e aplicações móveis.",
      tags: [
        { label: "Web & Plataformas", category: "web-software" },
        { label: "Software", category: "web-software" },
        { label: "Mobile", category: "web-software" },
      ],
    },
    {
      accentHex: "#145EFF",
      accentRgb: "20, 94, 255",
      variant: "orbit",
      title: "Automação, IA & Dados",
      description: "Integração de sistemas, automação de processos, IA e dados.",
      tags: [
        { label: "Automação", category: "ia-automacao" },
        { label: "LLMs & IA", category: "ia-automacao" },
        { label: "Dados", category: "ia-automacao" },
      ],
    },
    {
      accentHex: "#00C885",
      accentRgb: "0, 200, 133",
      variant: "prism",
      title: "Comunicação & Crescimento",
      description: "Estratégia digital, campanhas, redes sociais e e-commerce.",
      tags: [
        { label: "Estratégia", category: "marketing" },
        { label: "Campanhas", category: "marketing" },
        { label: "E-commerce", category: "consultoria-ecom" },
      ],
    },
  ],
  en: [
    {
      accentHex: "#A818FF",
      accentRgb: "168, 24, 255",
      variant: "layers",
      title: "Engineering & Product",
      description: "Websites, web platforms, custom software, and mobile applications.",
      tags: [
        { label: "Web & Platforms", category: "web-software" },
        { label: "Software", category: "web-software" },
        { label: "Mobile", category: "web-software" },
      ],
    },
    {
      accentHex: "#145EFF",
      accentRgb: "20, 94, 255",
      variant: "orbit",
      title: "Automation, AI & Data",
      description: "System integration, process automation, AI, and data.",
      tags: [
        { label: "Automation", category: "ia-automacao" },
        { label: "LLMs & AI", category: "ia-automacao" },
        { label: "Data", category: "ia-automacao" },
      ],
    },
    {
      accentHex: "#00C885",
      accentRgb: "0, 200, 133",
      variant: "prism",
      title: "Communication & Growth",
      description: "Digital strategy, campaigns, social media, and e-commerce.",
      tags: [
        { label: "Strategy", category: "marketing" },
        { label: "Campaigns", category: "marketing" },
        { label: "E-commerce", category: "consultoria-ecom" },
      ],
    },
  ],
} as const;

interface ProcessStep {
  id: string;
  code: string;
  title: Record<Locale, string>;
  duration: Record<Locale, string>;
  summary: Record<Locale, string>;
  deliverables: Record<Locale, string[]>;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "diagnostico",
    code: "01",
    title: { pt: "Diagnóstico & Alinhamento", en: "Discovery & Alignment" },
    duration: { pt: "2 – 5 dias", en: "2 – 5 days" },
    summary: {
      pt: "Mapeamos o negócio, identificamos gargalos reais e definimos métricas de sucesso antes de escrever uma única linha de código.",
      en: "We map your business, pinpoint real bottlenecks, and lock clear success metrics before writing a single line of code.",
    },
    deliverables: {
      pt: ["Auditoria técnica e de negócio", "Âmbito fechado e prioridades", "Plano de execução e prazos"],
      en: ["Technical & business audit", "Clear scope and priorities", "Execution roadmap & timeline"],
    },
  },
  {
    id: "arquitetura",
    code: "02",
    title: { pt: "Arquitetura & Design", en: "Architecture & Design" },
    duration: { pt: "1 – 2 semanas", en: "1 – 2 weeks" },
    summary: {
      pt: "Desenhamos interfaces limpas, sistemas escaláveis e fluxos de comunicação coerentes, validados em protótipo interativo.",
      en: "We craft clean interfaces, scalable systems, and coherent communication flows validated through interactive prototypes.",
    },
    deliverables: {
      pt: ["Protótipo navegável de alta fidelidade", "Design system e identidade digital", "Arquitetura de dados e integrações"],
      en: ["High-fidelity interactive prototype", "Design system & digital identity", "Data & integration architecture"],
    },
  },
  {
    id: "engenharia",
    code: "03",
    title: { pt: "Engenharia, IA & Execução", en: "Engineering, AI & Execution" },
    duration: { pt: "2 – 6 semanas", en: "2 – 6 weeks" },
    summary: {
      pt: "Construímos em ciclos curtos com entregas testáveis todas as semanas — código rigoroso, automações fiáveis e campanhas prontas a converter.",
      en: "We build in tight weekly cycles with testable milestones — clean code, reliable automations, and conversion-ready campaigns.",
    },
    deliverables: {
      pt: ["Entregas semanais em ambiente de testes", "Automação e agentes IA ligados às vossas ferramentas", "Testes de performance, segurança e SEO"],
      en: ["Weekly staging releases", "Automation & AI connected to your tools", "Performance, security & SEO testing"],
    },
  },
  {
    id: "escala",
    code: "04",
    title: { pt: "Lançamento & Escala", en: "Launch & Scale" },
    duration: { pt: "Contínuo", en: "Ongoing" },
    summary: {
      pt: "Publicamos sem fricção, monitorizamos dados reais desde o primeiro dia e otimizamos continuamente para multiplicar resultados.",
      en: "We ship smoothly, track live metrics from day one, and continuously optimize to compound business results.",
    },
    deliverables: {
      pt: ["Deploy em produção com monitorização", "Dashboards de métricas e conversão", "Evolução contínua e suporte direto"],
      en: ["Production deploy with monitoring", "Live analytics & conversion dashboards", "Continuous iteration & direct support"],
    },
  },
];

const PRINCIPLES: Record<Locale, { title: string; body: string }[]> = {
  pt: [
    {
      title: "Velocidade com rigor",
      body: "Entregamos rápido porque eliminamos burocracia, não qualidade. Cada decisão técnica é pensada para durar.",
    },
    {
      title: "Uma equipa, três disciplinas",
      body: "Engenharia, negócio e comunicação sentam-se à mesma mesa — sem telefones estragados entre fornecedores.",
    },
    {
      title: "Tecnologia prática",
      body: "Não usamos IA nem automação por moda. Aplicamos onde poupa horas reais, reduz erros e gera retorno mensurável.",
    },
    {
      title: "Transparência total",
      body: "Prazos claros, comunicação direta com quem constrói e acesso permanente ao progresso real do projeto.",
    },
  ],
  en: [
    {
      title: "Speed with rigor",
      body: "We move fast by cutting bureaucracy, never quality. Every technical choice is built to hold up at scale.",
    },
    {
      title: "One team, three disciplines",
      body: "Engineering, business strategy, and communication sit at the same table — no friction between separate agencies.",
    },
    {
      title: "Practical technology",
      body: "We never use AI or automation for hype. We deploy it where it saves real hours, cuts errors, and drives ROI.",
    },
    {
      title: "Radical transparency",
      body: "Clear timelines, direct communication with the builders, and continuous visibility into real progress.",
    },
  ],
};

const STACK = [
  "Next.js",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Python",
  "Node.js",
  "OpenAI & LLMs",
  "n8n / Make",
  "PostgreSQL",
  "Shopify",
  "Power BI / STATA",
  "Google & Meta Ads",
] as const;

export default function SobreContent() {
  const { locale } = useLanguage();
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const pillars = PILLARS[locale];
  const activeStep = PROCESS_STEPS[activeStepIndex];

  return (
    <main className="flex-1 text-foreground overflow-x-clip">
      {/* ─── Cabeçalho Editorial ─── */}
      <section className="relative w-full pt-28 sm:pt-36 pb-14 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        <div aria-hidden="true" className="top-aurora-fade opacity-70" />
        <div aria-hidden="true" className="top-aurora-grain" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-subtle mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">
              {locale === "pt" ? "Início" : "Home"}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">
              {locale === "pt" ? "A Midi8" : "About"}
            </span>
          </div>

          <div className="max-w-4xl">
            <KineticHeading
              className="type-headline-lg text-foreground mb-5"
              segments={
                locale === "pt"
                  ? [
                      { text: "Construímos sistemas " },
                      { text: "simples", italic: true },
                      { text: " para problemas complexos." },
                    ]
                  : [
                      { text: "We build " },
                      { text: "simple", italic: true },
                      { text: " systems for complex problems." },
                    ]
              }
            />
            <p className="type-body text-muted max-w-2xl text-pretty">
              {locale === "pt"
                ? "A Midi8 nasce da união entre engenharia de software, análise de negócio, inteligência artificial e comunicação estratégica. O nosso foco é tirar ideias do papel com precisão estética e impacto mensurável."
                : "Midi8 brings together software engineering, business strategy, artificial intelligence, and brand communication. We focus on turning ideas into live products with visual craft and measurable business impact."}
            </p>
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="section-divider" />
      </div>

      {/* ─── Os 3 Pilares ─── */}
      <section className="relative w-full py-14 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 studio-dot-grid opacity-65" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
            <div>
              <p className="type-label text-subtle mb-2">
                {locale === "pt" ? "Arquitetura de Competências" : "Core Capabilities"}
              </p>
              <h2 className="type-headline-md text-foreground">
                {locale === "pt"
                  ? "Três pilares que funcionam como um só."
                  : "Three pillars operating as one."}
              </h2>
            </div>
            <Link
              href="/servicos"
              className="inline-flex items-center gap-1.5 type-label text-foreground hover:opacity-70 transition-opacity w-fit"
            >
              <span>{locale === "pt" ? "Ver os 13 serviços" : "Explore all 13 services"}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-7">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.variant}
                className={index === 2 ? "col-span-2 md:col-span-1" : ""}
              >
                <PillarCard3D index={index} {...pillar} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="section-divider" />
      </div>

      {/* ─── Processo Interativo em 4 Fases ─── */}
      <section className="w-full py-14 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-8 sm:mb-12">
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
                ? "Selecione cada fase para ver como organizamos entregas, prazos e validação."
                : "Select each stage to see how we structure deliverables, timelines, and validation."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
            {/* Lista de fases */}
            <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-2.5">
              {PROCESS_STEPS.map((step, idx) => {
                const isActive = idx === activeStepIndex;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStepIndex(idx)}
                    aria-pressed={isActive}
                    className={`text-left rounded-2xl border p-4 sm:p-5 transition-all duration-300 active:scale-[0.98] cursor-pointer ${
                      isActive
                        ? "bg-foreground text-white border-foreground shadow-[0_18px_36px_-18px_rgba(11,15,23,0.45)]"
                        : "bg-white/95 text-foreground border-black/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(15,23,42,0.04)] hover:border-border-light"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span
                        className={`text-xs tracking-widest tabular-nums ${
                          isActive ? "text-white/65" : "text-subtle"
                        }`}
                      >
                        {step.code}
                      </span>
                      <span
                        className={`text-[11px] ${
                          isActive ? "text-white/75" : "text-subtle"
                        }`}
                      >
                        {step.duration[locale]}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-bold leading-snug">
                      {step.title[locale]}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Painel de detalhe da fase ativa */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-black/[0.08] bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(15,23,42,0.04),0_20px_44px_-26px_rgba(15,23,42,0.14)] p-6 sm:p-9 min-h-[270px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: REVEAL_EASE }}
                  >
                    <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-border">
                      <span className="inline-flex items-center rounded-full bg-surface border border-border px-3 py-1 text-xs text-secondary">
                        {locale === "pt" ? `Fase ${activeStep.code}` : `Stage ${activeStep.code}`}
                      </span>
                      <span className="text-xs text-subtle">
                        {locale === "pt" ? "Duração típica:" : "Typical duration:"}{" "}
                        <strong className="font-bold text-foreground">
                          {activeStep.duration[locale]}
                        </strong>
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                      {activeStep.title[locale]}
                    </h3>
                    <p className="type-body text-muted text-pretty mb-6">
                      {activeStep.summary[locale]}
                    </p>

                    <p className="text-[11px] uppercase tracking-wider text-subtle mb-3">
                      {locale === "pt" ? "Entregáveis principais" : "Key deliverables"}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {activeStep.deliverables[locale].map((item) => (
                        <li
                          key={item}
                          className="rounded-xl bg-surface/80 border border-border px-3.5 py-2.5 text-xs text-foreground leading-snug"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="section-divider" />
      </div>

      {/* ─── Princípios & Stack ─── */}
      <section className="w-full py-14 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14 sm:mb-20">
            {PRINCIPLES[locale].map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: REVEAL_EASE }}
                className="rounded-2xl border border-black/[0.08] bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(15,23,42,0.04),0_14px_30px_-22px_rgba(15,23,42,0.12)] p-5 sm:p-6 flex flex-col justify-between gap-4"
              >
                <span className="text-xs text-subtle tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-1.5">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed text-pretty">
                    {p.body}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Stack & CTA */}
          <div className="rounded-2xl border border-black/[0.08] bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(15,23,42,0.04),0_20px_44px_-26px_rgba(15,23,42,0.14)] p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <p className="type-label text-subtle mb-2">
                {locale === "pt" ? "Stack & Ecossistema" : "Stack & Ecosystem"}
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                {locale === "pt"
                  ? "Ferramentas modernas escolhidas pela fiabilidade."
                  : "Modern tools chosen for reliability."}
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {STACK.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-surface border border-border px-3 py-1 text-xs text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link href="/equipa" className="cta-button cta-secondary">
                {locale === "pt" ? "Conhecer a equipa" : "Meet the team"}
              </Link>
              <Link href="/contacto" className="cta-button">
                {locale === "pt" ? "Falar connosco" : "Start a project"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
