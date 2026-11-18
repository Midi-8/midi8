"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage, type Locale } from "@/context/LanguageContext";
import { CATEGORY_TO_AREA, type Area } from "@/lib/contact";

export function ServiceCategoryTag({
  category,
  label,
  area,
}: {
  category: string;
  label: string;
  area?: Area;
}) {
  const { locale } = useLanguage();
  const targetArea: Area = area ?? CATEGORY_TO_AREA[category] ?? "Web, Software & Mobile";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(
      new CustomEvent<Area>("midi8:preselect-area", { detail: targetArea })
    );
    const contactEl = document.getElementById("contacto");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const titleText =
    locale === "pt"
      ? `Pedir proposta em ${label}`
      : `Request proposal in ${label}`;

  return (
    <button
      type="button"
      onClick={handleClick}
      title={titleText}
      aria-label={titleText}
      className="group/tag inline-flex items-center gap-1 rounded-full bg-white/90 border border-border px-2.5 py-0.5 text-[11px] text-muted hover:text-foreground hover:border-foreground/30 hover:bg-white transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
    >
      <span>{label}</span>
      <svg
        className="w-2.5 h-2.5 opacity-40 group-hover/tag:opacity-100 group-hover/tag:translate-x-0.5 transition-all text-foreground"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  );
}

type CategoryId =
  | "all"
  | "web-software"
  | "ia-automacao"
  | "marketing"
  | "consultoria-ecom";

interface ServiceItem {
  id: string;
  category: Exclude<CategoryId, "all">;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  gradient: string;
  icon: ReactNode;
}

const CATEGORIES: Record<Locale, { id: CategoryId; label: string }[]> = {
  pt: [
    { id: "all", label: "Todos (13)" },
    { id: "web-software", label: "Web & Software" },
    { id: "ia-automacao", label: "Automação, IA & Dados" },
    { id: "marketing", label: "Estratégia & Marketing" },
    { id: "consultoria-ecom", label: "Consultoria & E-commerce" },
  ],
  en: [
    { id: "all", label: "All (13)" },
    { id: "web-software", label: "Web & Software" },
    { id: "ia-automacao", label: "Automation, AI & Data" },
    { id: "marketing", label: "Strategy & Marketing" },
    { id: "consultoria-ecom", label: "Consulting & E-commerce" },
  ],
};

const CATEGORY_LABELS: Record<Locale, Record<Exclude<CategoryId, "all">, string>> = {
  pt: {
    "web-software": "Web & Software",
    "ia-automacao": "Automação & IA",
    marketing: "Marketing",
    "consultoria-ecom": "Consultoria",
  },
  en: {
    "web-software": "Web & Software",
    "ia-automacao": "Automation & AI",
    marketing: "Marketing",
    "consultoria-ecom": "Consulting",
  },
};

const GRADIENT_BLUE_MINT =
  "linear-gradient(170deg, rgba(255,255,255,0.96) 0%, rgba(226,238,255,0.92) 26%, #145EFF 64%, #00C885 100%)";
const GRADIENT_VIOLET_BLUE =
  "linear-gradient(170deg, rgba(255,255,255,0.96) 0%, rgba(243,230,255,0.92) 26%, #8F18FF 64%, #145EFF 100%)";
const GRADIENT_MINT_BLUE =
  "linear-gradient(170deg, rgba(255,255,255,0.96) 0%, rgba(224,251,238,0.92) 26%, #00B074 64%, #145EFF 100%)";

const SERVICES: ServiceItem[] = [
  {
    id: "web-design",
    category: "web-software",
    title: {
      pt: "Web Design e Desenvolvimento Web",
      en: "Web Design & Web Development",
    },
    description: {
      pt: "Criação e desenvolvimento de websites e plataformas digitais, combinando design, funcionalidade e experiência de utilização para construir soluções adaptadas às necessidades de cada negócio.",
      en: "Design and development of websites and digital platforms, combining visual craft, functionality, and user experience tailored to each business.",
    },
    gradient: GRADIENT_BLUE_MINT,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25v13.5A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75V5.25zM3 8.25h18" />
      </svg>
    ),
  },
  {
    id: "desenvolvimento-software",
    category: "web-software",
    title: {
      pt: "Desenvolvimento de Software",
      en: "Custom Software Development",
    },
    description: {
      pt: "Conceção e implementação de programas e aplicações à medida, desenvolvidos para responder a necessidades específicas, otimizar operações e simplificar tarefas.",
      en: "Architecture and delivery of custom software and web applications engineered for specific operational needs, streamlining workflows at scale.",
    },
    gradient: GRADIENT_VIOLET_BLUE,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5L3.75 12l4.5 4.5m7.5-9L20.25 12l-4.5 4.5m-2.25-10.5l-3 12" />
      </svg>
    ),
  },
  {
    id: "solucoes-tecnologicas",
    category: "ia-automacao",
    title: {
      pt: "Desenvolvimento de Soluções Tecnológicas",
      en: "Technology Solutions Engineering",
    },
    description: {
      pt: "Identificação de problemas e criação de soluções digitais inovadoras, recorrendo à tecnologia para transformar ideias em ferramentas práticas e funcionais.",
      en: "Identifying operational bottlenecks and building practical, reliable digital tools that turn ideas into working systems.",
    },
    gradient: GRADIENT_MINT_BLUE,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    id: "automacao-processos",
    category: "ia-automacao",
    title: {
      pt: "Automação de Processos",
      en: "Process Automation",
    },
    description: {
      pt: "Implementação de sistemas e ferramentas que automatizam tarefas e procedimentos, reduzindo processos manuais, aumentando a eficiência e melhorando a produtividade.",
      en: "Automated pipelines and system integrations that eliminate repetitive manual work, raise efficiency, and keep operations consistent.",
    },
    gradient: GRADIENT_BLUE_MINT,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
  {
    id: "estrategia-comunicacao",
    category: "marketing",
    title: {
      pt: "Estratégia e Comunicação",
      en: "Strategy & Brand Communication",
    },
    description: {
      pt: "Definição de estratégias de comunicação alinhadas com os objetivos de cada marca, garantindo uma mensagem coerente, eficaz e direcionada ao público certo.",
      en: "Communication strategies aligned with business goals, ensuring a clear, coherent voice tailored to the right audience.",
    },
    gradient: GRADIENT_VIOLET_BLUE,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    id: "publicidade-campanhas",
    category: "marketing",
    title: {
      pt: "Publicidade e Campanhas",
      en: "Advertising & Campaigns",
    },
    description: {
      pt: "Planeamento e criação de campanhas publicitárias, desenvolvidas para promover marcas, produtos ou serviços, aumentar a notoriedade e gerar resultados.",
      en: "End-to-end campaign planning and creative execution to grow awareness, acquire customers, and drive measurable returns.",
    },
    gradient: GRADIENT_MINT_BLUE,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
      </svg>
    ),
  },
  {
    id: "marketing-digital",
    category: "marketing",
    title: {
      pt: "Marketing Digital e Redes Sociais",
      en: "Digital Marketing & Social Media",
    },
    description: {
      pt: "Gestão e dinamização da presença digital das marcas, através da criação de conteúdos, planeamento estratégico e desenvolvimento de ações de comunicação nas diferentes plataformas.",
      en: "Ongoing management of digital channels with editorial content, strategic calendars, and audience growth across platforms.",
    },
    gradient: GRADIENT_BLUE_MINT,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
    ),
  },
  {
    id: "consultoria-informatica",
    category: "consultoria-ecom",
    title: {
      pt: "Consultoria Informática",
      en: "IT Consulting & Systems Audit",
    },
    description: {
      pt: "Prestação de serviços de aconselhamento e acompanhamento tecnológico, através da análise de sistemas e infraestruturas informáticas, identificando necessidades e recomendando soluções que otimizem os recursos e processos de cada negócio.",
      en: "Technical advisory and architecture assessment to spot infrastructure gaps and recommend practical upgrades that improve reliability.",
    },
    gradient: GRADIENT_VIOLET_BLUE,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    id: "consultoria-media",
    category: "consultoria-ecom",
    title: {
      pt: "Consultoria em Media Digitais",
      en: "Digital Media Advisory",
    },
    description: {
      pt: "Análise e definição de estratégias para fortalecer a presença digital das marcas, identificando oportunidades de crescimento e recomendando soluções que melhorem a comunicação, a visibilidade e o desempenho nas diferentes plataformas.",
      en: "Digital presence audits and strategic roadmaps to uncover growth opportunities and strengthen visibility across channels.",
    },
    gradient: GRADIENT_MINT_BLUE,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    id: "analise-dados",
    category: "ia-automacao",
    title: {
      pt: "Análise de Dados e Suporte à Tomada de Decisão",
      en: "Data Analytics & Decision Support",
    },
    description: {
      pt: "Recolha, tratamento e interpretação de dados, transformando informação em conhecimento estratégico que permite identificar tendências, avaliar resultados e apoiar decisões mais informadas e eficazes.",
      en: "Collecting, structuring, and interpreting business data to surface clear insights, track outcomes, and guide confident decisions.",
    },
    gradient: GRADIENT_BLUE_MINT,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    id: "ia-llms",
    category: "ia-automacao",
    title: {
      pt: "Inteligência Artificial e Modelos de Linguagem (LLMs)",
      en: "Artificial Intelligence & LLMs",
    },
    description: {
      pt: "Desenvolvimento e integração de soluções baseadas em inteligência artificial e modelos de linguagem, permitindo automatizar tarefas, otimizar processos e criar ferramentas inteligentes adaptadas às necessidades específicas de cada negócio.",
      en: "Building and integrating AI workflows, custom agents, and large language models tailored to your company's internal operations.",
    },
    gradient: GRADIENT_VIOLET_BLUE,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
  },
  {
    id: "ecommerce-operations",
    category: "consultoria-ecom",
    title: {
      pt: "Operações de Comércio Eletrónico (E-commerce Operations)",
      en: "E-commerce Operations",
    },
    description: {
      pt: "Gestão e otimização de operações de comércio eletrónico, incluindo a implementação e manutenção de lojas online, gestão de produtos, encomendas e processos de venda, com o objetivo de melhorar a experiência de compra e potenciar os resultados comerciais.",
      en: "Setup and optimization of online stores, catalog workflows, checkout flows, and fulfillment operations to grow conversion.",
    },
    gradient: GRADIENT_MINT_BLUE,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
  {
    id: "desenvolvimento-mobile",
    category: "web-software",
    title: {
      pt: "Desenvolvimento Mobile",
      en: "Mobile App Development",
    },
    description: {
      pt: "Conceção e desenvolvimento de aplicações móveis para diferentes plataformas, criando soluções digitais intuitivas, funcionais e adaptadas às necessidades dos utilizadores e objetivos de cada negócio.",
      en: "Design and engineering of cross-platform mobile applications focused on speed, usability, and dependable daily performance.",
    },
    gradient: GRADIENT_BLUE_MINT,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
];

export default function ServicesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, moved: false, startX: 0, scrollLeft: 0 });
  const [category, setCategory] = useState<CategoryId>("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const { locale } = useLanguage();

  const categories = CATEGORIES[locale];
  const categoryLabels = CATEGORY_LABELS[locale];
  const visibleServices =
    category === "all" ? SERVICES : SERVICES.filter((s) => s.category === category);

  const updateScrollProgress = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 4) {
      setScrollProgress(1);
      return;
    }
    setScrollProgress(Math.max(0, Math.min(1, el.scrollLeft / max)));
  }, []);

  useEffect(() => {
    const raf = window.requestAnimationFrame(updateScrollProgress);
    window.addEventListener("resize", updateScrollProgress, { passive: true });
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, [category, updateScrollProgress]);

  useEffect(() => {
    const onSelectCategory = (e: Event) => {
      const next = (e as CustomEvent<CategoryId>).detail;
      if (!next) return;
      setCategory(next);
      setHoveredId(null);
      trackRef.current?.scrollTo({ left: 0, behavior: "smooth" });
    };
    window.addEventListener("midi8:select-category", onSelectCategory);
    return () => window.removeEventListener("midi8:select-category", onSelectCategory);
  }, []);

  const handleCategoryChange = (next: CategoryId) => {
    setCategory(next);
    setHoveredId(null);
    trackRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    dragRef.current = {
      active: true,
      moved: false,
      startX: e.pageX - el.offsetLeft,
      scrollLeft: el.scrollLeft,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !dragRef.current.active) return;
    const x = e.pageX - el.offsetLeft;
    const walk = x - dragRef.current.startX;
    if (Math.abs(walk) > 6) dragRef.current.moved = true;
    if (dragRef.current.moved) {
      e.preventDefault();
      el.scrollLeft = dragRef.current.scrollLeft - walk;
    }
  };

  const endMouseDrag = () => {
    dragRef.current.active = false;
  };

  return (
    <section id="servicos" className="relative w-full py-20 sm:py-28 scroll-mt-16">
      <div className="max-w-7xl w-full mx-auto px-5 sm:px-6">
        {/* Cabeçalho da secção */}
        <div className="mb-6 sm:mb-7">
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-foreground leading-[1.05]">
            {locale === "pt" ? "Os Nossos Serviços" : "Our Services"}
          </h2>
          <p className="text-sm sm:text-base text-muted mt-1.5">
            {locale === "pt"
              ? "Soluções digitais desenhadas à medida do seu negócio."
              : "Digital solutions tailored to your business."}
          </p>
        </div>

        {/* Filtros por categoria */}
        <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar mb-7 pb-1">
          {categories.map((cat) => {
            const selected = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`shrink-0 px-3.5 py-1 rounded-full text-xs sm:text-sm font-normal transition-all cursor-pointer border ${
                  selected
                    ? "bg-foreground text-white border-foreground"
                    : "bg-surface text-muted border-transparent hover:text-foreground hover:bg-surface-light"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Carrossel horizontal full-bleed com Click & Drag + Barra de progresso */}
      <div className="max-w-[1440px] w-full mx-auto">
        <div
          ref={trackRef}
          onScroll={updateScrollProgress}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={endMouseDrag}
          onMouseLeave={() => {
            endMouseDrag();
            setHoveredId(null);
          }}
          className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory px-5 sm:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pb-6 pt-3 cursor-grab active:cursor-grabbing"
        >
          <AnimatePresence mode="popLayout">
            {visibleServices.map((service) => {
              const isHovered = hoveredId === service.id;
              return (
                <motion.article
                  key={service.id}
                  layout={prefersReducedMotion ? false : "position"}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, scale: 0.96, transition: { duration: 0.15 } }
                  }
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => {
                    if (!dragRef.current.active) setHoveredId(service.id);
                  }}
                  onMouseLeave={() => {
                    setHoveredId((prev) => (prev === service.id ? null : prev));
                  }}
                  onClick={() => {
                    if (!dragRef.current.moved) {
                      setHoveredId((prev) => (prev === service.id ? null : service.id));
                    }
                  }}
                  className={`service-card snap-start shrink-0 w-[80vw] sm:w-[330px] h-[305px] sm:h-[340px] p-6 sm:p-7 flex flex-col justify-between overflow-hidden cursor-pointer select-none ${
                    isHovered ? "service-card--active -translate-y-2" : ""
                  }`}
                >
                  {/* Camada de gradiente suave para crossfade sem saltos bruscos */}
                  <div
                    className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ background: service.gradient }}
                    aria-hidden="true"
                  />

                  {/* Véu escuro subtil na metade inferior ao passar o rato */}
                  <div
                    className={`pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/28 via-black/10 to-transparent transition-opacity duration-500 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  />

                  {/* Ícone minimalista em caixa branca e categoria discreta no topo */}
                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                        isHovered
                          ? "bg-white/90 border-white text-foreground shadow-xs"
                          : "bg-white border-black/[0.06] text-foreground shadow-2xs"
                      }`}
                    >
                      {service.icon}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const targetArea =
                          CATEGORY_TO_AREA[service.category] ?? "Web, Software & Mobile";
                        window.dispatchEvent(
                          new CustomEvent<Area>("midi8:preselect-area", { detail: targetArea })
                        );
                        document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      title={locale === "pt" ? "Pedir proposta nesta área" : "Request proposal in this area"}
                      className={`text-[11px] font-sans tracking-wide uppercase transition-colors duration-300 hover:opacity-100 cursor-pointer ${
                        isHovered ? "text-white/80" : "text-subtle"
                      }`}
                    >
                      {categoryLabels[service.category]}
                    </button>
                  </div>

                  {/* Conteúdo ancorado em baixo em sans-serif limpa e legível */}
                  <div className="relative z-10">
                    <h3
                      className={`font-sans text-base sm:text-[17px] font-semibold tracking-tight leading-snug mb-2 transition-colors duration-300 ${
                        isHovered ? "text-white" : "text-foreground"
                      }`}
                    >
                      {service.title[locale]}
                    </h3>
                    <p
                      className={`text-xs sm:text-[13px] leading-relaxed line-clamp-4 transition-colors duration-300 ${
                        isHovered ? "text-white/90" : "text-muted"
                      }`}
                    >
                      {service.description[locale]}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Barra de progresso horizontal do carrossel */}
        <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-1">
          <div className="h-[1.5px] w-full bg-border overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#A818FF] via-[#145EFF] to-[#00E896] transition-[width] duration-150 ease-out"
              style={{ width: `${Math.max(12, Math.round(scrollProgress * 100))}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
