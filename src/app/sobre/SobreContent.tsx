"use client";

import Link from "next/link";
import KineticHeading from "@/components/KineticHeading";
import PillarCard3D from "@/components/PillarCard3D";
import SculptureEight from "@/components/SculptureEight";
import WorkMethodCarousel from "@/components/WorkMethodCarousel";
import MinimalistShowcase from "@/components/MinimalistShowcase";
import { useLanguage } from "@/context/LanguageContext";

const PILLARS = {
  pt: [
    {
      accentHex: "#C015FF",
      accentRgb: "192, 21, 255",
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
      accentHex: "#0069F8",
      accentRgb: "0, 105, 248",
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
      accentHex: "#00E8B2",
      accentRgb: "0, 232, 178",
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
      accentHex: "#C015FF",
      accentRgb: "192, 21, 255",
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
      accentHex: "#0069F8",
      accentRgb: "0, 105, 248",
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
      accentHex: "#00E8B2",
      accentRgb: "0, 232, 178",
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

export default function SobreContent() {
  const { locale } = useLanguage();
  const pillars = PILLARS[locale];

  return (
    <main className="flex-1 text-foreground overflow-x-clip">
      {/* ─── Cabeçalho Editorial ─── */}
      <section className="relative w-full pt-24 sm:pt-36 pb-8 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        <div aria-hidden="true" className="top-aurora-fade opacity-70" />
        <div aria-hidden="true" className="top-aurora-grain" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs text-subtle mb-4 sm:mb-6">
                <Link href="/" className="hover:text-foreground transition-colors">
                  {locale === "pt" ? "Início" : "Home"}
                </Link>
                <span aria-hidden="true">/</span>
                <span className="text-foreground">
                  {locale === "pt" ? "A midi8" : "About"}
                </span>
              </div>

              <KineticHeading
                className="type-headline-lg text-foreground mb-3.5 sm:mb-5"
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
                  ? "A midi8 reúne engenharia de software, inteligência artificial, estratégia de negócio e comunicação num único parceiro. Concebemos soluções digitais sob medida, com rigor técnico, estética apurada e impacto mensurável nos resultados da sua empresa."
                  : "midi8 brings software engineering, artificial intelligence, business strategy, and brand communication together in one partner. We design tailored digital solutions with technical rigor, refined craft, and measurable business impact."}
              </p>
            </div>

            <div className="lg:col-span-5 flex items-center justify-center">
              <SculptureEight />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Os 3 Pilares ─── */}
      <section className="relative w-full py-10 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 studio-dot-grid opacity-65" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-12">
            <div className="max-w-2xl">
              <KineticHeading
                className="type-headline-lg text-foreground mb-2.5 sm:mb-3"
                segments={
                  locale === "pt"
                    ? [
                        { text: "Três pilares que funcionam como " },
                        { text: "um só", italic: true },
                        { text: "." },
                      ]
                    : [
                        { text: "Three pillars operating as " },
                        { text: "one", italic: true },
                        { text: "." },
                      ]
                }
              />
              <p className="type-body text-muted text-pretty">
                {locale === "pt"
                  ? "Cada projeto cruza produto, automação e comunicação desde o primeiro dia, garantindo coerência técnica, velocidade de execução e retorno consistente."
                  : "Every engagement unites product, automation, and communication from day one, ensuring technical coherence, speed of execution, and lasting return."}
              </p>
            </div>
            <Link
              href="/servicos"
              className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted hover:text-foreground transition-colors shrink-0 w-fit"
            >
              <span>{locale === "pt" ? "Ver os 13 serviços" : "Explore all 13 services"}</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
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

      {/* ─── Faixas Minimalistas Expansíveis ─── */}
      <MinimalistShowcase />
    </main>
  );
}
