"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import KineticHeading from "@/components/KineticHeading";
import PillarCard3D from "@/components/PillarCard3D";
import WorkMethodCarousel from "@/components/WorkMethodCarousel";
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

const PRINCIPLES: Record<Locale, { title: string; body: string }[]> = {
  pt: [
    {
      title: "Velocidade com rigor",
      body: "Entregamos rápido porque eliminamos burocracia, não qualidade. Cada decisão técnica é pensada para durar.",
    },
    {
      title: "Uma equipa, três disciplinas",
      body: "Engenharia, negócio e comunicação sentam-se à mesma mesa - sem telefones estragados entre fornecedores.",
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
      body: "Engineering, business strategy, and communication sit at the same table - no friction between separate agencies.",
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

export default function SobreContent() {
  const { locale } = useLanguage();
  const pillars = PILLARS[locale];

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
              {locale === "pt" ? "A midi8" : "About"}
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
                ? "A midi8 nasce da união entre engenharia de software, análise de negócio, inteligência artificial e comunicação estratégica. O nosso foco é tirar ideias do papel com precisão estética e impacto mensurável."
                : "midi8 brings together software engineering, business strategy, artificial intelligence, and brand communication. We focus on turning ideas into live products with visual craft and measurable business impact."}
            </p>
          </div>
        </div>
      </section>

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

      {/* ─── Processo Interativo em Carrossel Vertical ─── */}
      <WorkMethodCarousel />

      {/* ─── Princípios ─── */}
      <section className="w-full py-14 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10 sm:mb-12">
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

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/equipa" className="cta-button cta-secondary">
              {locale === "pt" ? "Conhecer a equipa" : "Meet the team"}
            </Link>
            <Link href="/contacto" className="cta-button">
              {locale === "pt" ? "Falar connosco" : "Start a project"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
