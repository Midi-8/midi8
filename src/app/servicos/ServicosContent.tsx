"use client";

import { useState, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import KineticHeading from "@/components/KineticHeading";
import BriefBuilder from "@/components/BriefBuilder";
import { useLanguage, type Locale } from "@/context/LanguageContext";
import type { Area } from "@/lib/contact";

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

const VALID_CATEGORIES = new Set([
  "all",
  "web-software",
  "ia-automacao",
  "marketing",
  "consultoria-ecom",
]);

type CategoryId =
  | "all"
  | "web-software"
  | "ia-automacao"
  | "marketing"
  | "consultoria-ecom";

interface ServiceCatalogItem {
  id: string;
  category: Exclude<CategoryId, "all">;
  contactArea: Area;
  accentRgb: string;
  gradient: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  icon: ReactNode;
}

const GRADIENT_BLUE_MINT =
  "linear-gradient(150deg, rgba(255,255,255,0.97) 0%, rgba(224,240,255,0.92) 28%, #0069F8 68%, #00E8B2 100%)";
const GRADIENT_VIOLET_BLUE =
  "linear-gradient(150deg, rgba(255,255,255,0.97) 0%, rgba(248,230,255,0.92) 28%, #C015FF 68%, #0069F8 100%)";
const GRADIENT_MINT_BLUE =
  "linear-gradient(150deg, rgba(255,255,255,0.97) 0%, rgba(220,252,244,0.92) 28%, #00E8B2 68%, #0069F8 100%)";

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
    "ia-automacao": "Automação, IA & Dados",
    marketing: "Estratégia & Marketing",
    "consultoria-ecom": "Consultoria & E-commerce",
  },
  en: {
    "web-software": "Web & Software",
    "ia-automacao": "Automation, AI & Data",
    marketing: "Strategy & Marketing",
    "consultoria-ecom": "Consulting & E-commerce",
  },
};

const CATALOG: ServiceCatalogItem[] = [
  {
    id: "web-design",
    category: "web-software",
    contactArea: "Web, Software & Mobile",
    accentRgb: "0, 105, 248",
    gradient: GRADIENT_BLUE_MINT,
    title: { pt: "Web Design e Desenvolvimento Web", en: "Web Design & Web Development" },
    description: {
      pt: "Concebemos websites institucionais e plataformas web rápidas, elegantes e estruturadas para refletir o posicionamento da sua marca e potenciar a conversão.",
      en: "We craft corporate websites and high-speed digital platforms structured to elevate your brand positioning and drive measurable conversion.",
    },
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25v13.5A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75V5.25zM3 8.25h18" />
      </svg>
    ),
  },
  {
    id: "desenvolvimento-software",
    category: "web-software",
    contactArea: "Web, Software & Mobile",
    accentRgb: "192, 21, 255",
    gradient: GRADIENT_VIOLET_BLUE,
    title: { pt: "Desenvolvimento de Software", en: "Custom Software Development" },
    description: {
      pt: "Desenvolvemos aplicações e portais à medida, com arquitetura escalável e integrações seguras, adaptados aos processos reais da sua operação.",
      en: "We engineer bespoke software and client portals built on scalable architecture and secure integrations tailored to your exact workflows.",
    },
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5L3.75 12l4.5 4.5m7.5-9L20.25 12l-4.5 4.5m-2.25-10.5l-3 12" />
      </svg>
    ),
  },
  {
    id: "desenvolvimento-mobile",
    category: "web-software",
    contactArea: "Web, Software & Mobile",
    accentRgb: "0, 105, 248",
    gradient: GRADIENT_BLUE_MINT,
    title: { pt: "Desenvolvimento Mobile", en: "Mobile App Development" },
    description: {
      pt: "Projetamos aplicações iOS e Android intuitivas e fiáveis, preparadas para oferecer uma experiência fluida e integrada com o ecossistema da empresa.",
      en: "We build reliable iOS and Android applications focused on fluid usability, strong retention, and seamless integration with your core systems.",
    },
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
  {
    id: "solucoes-tecnologicas",
    category: "ia-automacao",
    contactArea: "Automação, IA & Dados",
    accentRgb: "0, 232, 178",
    gradient: GRADIENT_MINT_BLUE,
    title: { pt: "Desenvolvimento de Soluções Tecnológicas", en: "Technology Solutions Engineering" },
    description: {
      pt: "Mapeamos desafios operacionais e construímos ferramentas digitais práticas que ligam sistemas dispersos e transformam ideias em soluções funcionais.",
      en: "We pinpoint operational bottlenecks and engineer practical digital tools that connect disparate systems and turn concepts into working products.",
    },
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    id: "automacao-processos",
    category: "ia-automacao",
    contactArea: "Automação, IA & Dados",
    accentRgb: "0, 105, 248",
    gradient: GRADIENT_BLUE_MINT,
    title: { pt: "Automação de Processos", en: "Process Automation" },
    description: {
      pt: "Desenhamos fluxos automáticos e integrações entre plataformas para eliminar tarefas repetitivas, reduzir erros manuais e libertar tempo produtivo.",
      en: "We design automated workflows and cross-platform integrations that remove repetitive tasks, minimize manual errors, and scale daily output.",
    },
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
  {
    id: "ia-llms",
    category: "ia-automacao",
    contactArea: "Automação, IA & Dados",
    accentRgb: "192, 21, 255",
    gradient: GRADIENT_VIOLET_BLUE,
    title: { pt: "Inteligência Artificial & LLMs", en: "Artificial Intelligence & LLMs" },
    description: {
      pt: "Implementamos agentes inteligentes e fluxos com modelos de linguagem ligados ao conhecimento real da organização, com segurança e retorno claro.",
      en: "We deploy custom AI agents and LLM workflows grounded in your organization's real knowledge, with robust governance and clear return.",
    },
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    id: "analise-dados",
    category: "ia-automacao",
    contactArea: "Automação, IA & Dados",
    accentRgb: "0, 232, 178",
    gradient: GRADIENT_MINT_BLUE,
    title: { pt: "Análise de Dados & Business Intelligence", en: "Data Analytics & Business Intelligence" },
    description: {
      pt: "Consolidamos dados dispersos em painéis claros, modelos estatísticos e indicadores acionáveis para apoiar decisões estratégicas com rigor.",
      en: "We transform fragmented data into clear executive dashboards, statistical models, and actionable metrics that support confident decisions.",
    },
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    id: "estrategia-comunicacao",
    category: "marketing",
    contactArea: "Estratégia, Marketing & Campanhas",
    accentRgb: "192, 21, 255",
    gradient: GRADIENT_VIOLET_BLUE,
    title: { pt: "Estratégia e Comunicação", en: "Strategy & Brand Communication" },
    description: {
      pt: "Definimos posicionamento, narrativa e planos de comunicação coerentes para reforçar a autoridade da marca junto do público certo.",
      en: "We craft clear brand positioning, commercial narratives, and communication plans that build authority with the audiences that matter.",
    },
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    id: "publicidade-campanhas",
    category: "marketing",
    contactArea: "Estratégia, Marketing & Campanhas",
    accentRgb: "0, 232, 178",
    gradient: GRADIENT_MINT_BLUE,
    title: { pt: "Publicidade e Campanhas", en: "Advertising & Campaigns" },
    description: {
      pt: "Planeamos e otimizamos campanhas de aquisição orientadas por métricas reais para ampliar notoriedade, gerar contactos qualificados e maximizar retorno.",
      en: "We plan and optimize performance campaigns guided by real attribution data to increase visibility, capture qualified leads, and maximize ROI.",
    },
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535" />
      </svg>
    ),
  },
  {
    id: "marketing-digital",
    category: "marketing",
    contactArea: "Estratégia, Marketing & Campanhas",
    accentRgb: "0, 105, 248",
    gradient: GRADIENT_BLUE_MINT,
    title: { pt: "Marketing Digital e Redes Sociais", en: "Digital Marketing & Social Media" },
    description: {
      pt: "Gerimos a presença digital com direção visual cuidada, planeamento editorial e conteúdo consistente para transformar audiência em clientes.",
      en: "We manage your digital presence with refined creative direction, editorial rigor, and strategic growth that turns audience into revenue.",
    },
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
    ),
  },
  {
    id: "branding-identidade",
    category: "marketing",
    contactArea: "Estratégia, Marketing & Campanhas",
    accentRgb: "192, 21, 255",
    gradient: GRADIENT_VIOLET_BLUE,
    title: { pt: "Identidade Visual & Direção Criativa", en: "Brand Identity & Creative Direction" },
    description: {
      pt: "Criamos sistemas visuais minimalistas e distintivos, preparados para manter consistência em produto digital, comunicação e campanhas.",
      en: "We create distinctive, minimalist visual systems engineered for seamless consistency across digital products, editorial touchpoints, and campaigns.",
    },
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L3 8l9 5 9-5-9-5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13l9 5 9-5" />
      </svg>
    ),
  },
  {
    id: "consultoria-informatica",
    category: "consultoria-ecom",
    contactArea: "Consultoria & E-commerce",
    accentRgb: "0, 105, 248",
    gradient: GRADIENT_BLUE_MINT,
    title: { pt: "Consultoria Tecnológica & Diagnóstico", en: "Technology & Business Consulting" },
    description: {
      pt: "Apoiamos equipas de gestão na escolha de arquiteturas, ferramentas e prioridades digitais, reduzindo risco técnico e desperdício de investimento.",
      en: "We advise leadership teams on architecture, tooling, and digital priorities to reduce technical risk and focus investment where it counts.",
    },
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    id: "ecommerce",
    category: "consultoria-ecom",
    contactArea: "Consultoria & E-commerce",
    accentRgb: "0, 232, 178",
    gradient: GRADIENT_MINT_BLUE,
    title: { pt: "E-commerce & Otimização de Conversão", en: "E-commerce & Conversion Optimization" },
    description: {
      pt: "Implementamos e otimizamos lojas online rápidas e intuitivas, integradas com pagamentos, faturação, logística e campanhas de performance.",
      en: "We build and optimize fast, conversion-driven online stores integrated with payments, invoicing, logistics, and performance marketing.",
    },
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
      </svg>
    ),
  },
];

// Garante linhas 100% preenchidas (soma = 6 colunas) em qualquer filtro (2, 3, 4 ou 13 itens)
function getBentoSpan(index: number, total: number): string {
  if (total === 2) return "md:col-span-3";
  if (total === 3) return "md:col-span-2";
  if (total === 4) {
    return index === 0 || index === 3 ? "md:col-span-4" : "md:col-span-2";
  }
  // 13 itens: [4,2] [2,2,2] [2,4] [2,2,2] [2,2,2]
  if (index === 0 || index === 6) return "md:col-span-4";
  return "md:col-span-2";
}

function BentoServiceCard({
  service,
  index,
  total,
  categoryLabel,
  locale,
}: {
  service: ServiceCatalogItem;
  index: number;
  total: number;
  categoryLabel: string;
  locale: Locale;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [spot, setSpot] = useState({ x: 80, y: 20 });
  const spanClass = getBentoSpan(index, total);
  const isWide = spanClass === "md:col-span-4";

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      layout={!prefersReducedMotion}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.04, ease: REVEAL_EASE }}
      className={spanClass}
    >
      <article
        onMouseMove={handleMouseMove}
        className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-black/[0.08] bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(15,23,42,0.04),0_18px_38px_-26px_rgba(15,23,42,0.14)] p-4 sm:p-7 h-full flex flex-col justify-between gap-3.5 sm:gap-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/80 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_26px_54px_-26px_rgba(0,105,248,0.28),0_10px_24px_-14px_rgba(192,21,255,0.16)] ${
          isWide ? "md:min-h-[250px]" : "md:min-h-[245px]"
        }`}
      >
        {/* Gradiente luminoso midi8 que acende suavemente ao passar o rato */}
        <div
          aria-hidden="true"
          style={{ background: service.gradient }}
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Brilho radial suave que acompanha o cursor */}
        <div
          aria-hidden="true"
          style={{
            background: `radial-gradient(circle 220px at ${spot.x}% ${spot.y}%, rgba(${service.accentRgb}, 0.14) 0%, transparent 72%)`,
          }}
          className="pointer-events-none absolute inset-0 opacity-70 group-hover:opacity-0 transition-opacity duration-300"
        />

        {/* Reflexo vítreo suave no topo no hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Topo: ícone + categoria */}
        <div className="relative z-10 flex items-center gap-2 sm:gap-2.5 min-w-0">
          <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-surface border border-border flex items-center justify-center text-foreground shrink-0 transition-all duration-300 group-hover:bg-white/90 group-hover:border-white/80">
            {service.icon}
          </span>
          <span className="inline-flex items-center rounded-full bg-surface/90 border border-border px-2.5 py-0.5 text-[10px] sm:text-[11px] text-subtle truncate transition-colors duration-300 group-hover:bg-white/85 group-hover:border-white/75 group-hover:text-foreground">
            {categoryLabel}
          </span>
        </div>

        {/* Corpo: título + descrição limpa */}
        <div className={`relative z-10 ${isWide ? "max-w-xl" : ""}`}>
          <h2 className="text-base sm:text-xl font-bold text-foreground leading-snug mb-1.5 sm:mb-2">
            {service.title[locale]}
          </h2>
          <p className="text-xs sm:text-sm text-muted leading-relaxed text-pretty transition-colors duration-300 group-hover:text-foreground/85">
            {service.description[locale]}
          </p>
        </div>
      </article>
    </motion.div>
  );
}

export default function ServicosContent() {
  const { locale } = useLanguage();
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");
  const initialCategory: CategoryId =
    catParam && VALID_CATEGORIES.has(catParam) ? (catParam as CategoryId) : "all";
  const [category, setCategory] = useState<CategoryId>(initialCategory);

  const categories = CATEGORIES[locale];
  const categoryLabels = CATEGORY_LABELS[locale];
  const items = category === "all" ? CATALOG : CATALOG.filter((s) => s.category === category);

  return (
    <main className="flex-1 text-foreground overflow-x-clip">
      {/* ─── Cabeçalho Editorial ─── */}
      <section className="relative w-full pt-24 sm:pt-36 pb-6 sm:pb-14 px-4 sm:px-6 overflow-hidden">
        <div aria-hidden="true" className="top-aurora-fade opacity-70" />
        <div aria-hidden="true" className="top-aurora-grain" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-subtle mb-4 sm:mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">
              {locale === "pt" ? "Início" : "Home"}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">
              {locale === "pt" ? "Serviços" : "Services"}
            </span>
          </div>

          <div className="max-w-4xl">
            <KineticHeading
              className="type-headline-lg text-foreground mb-3.5 sm:mb-5"
              segments={
                locale === "pt"
                  ? [
                      { text: "Catálogo completo de " },
                      { text: "serviços", italic: true },
                      { text: "." },
                    ]
                  : [
                      { text: "Complete catalog of " },
                      { text: "services", italic: true },
                      { text: "." },
                    ]
              }
            />
            <p className="type-body text-muted max-w-2xl text-pretty">
              {locale === "pt"
                ? "Da engenharia de plataformas digitais à automação com inteligência artificial e estratégias de crescimento - conheça em detalhe cada uma das nossas áreas de atuação."
                : "From digital platform engineering to AI automation and growth strategy - explore each of our specialized capabilities in detail."}
            </p>
          </div>

          {/* Filtros */}
          <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar mt-5 sm:mt-8 pb-1">
            {categories.map((cat) => {
              const selected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-normal active:scale-[0.97] transition-all cursor-pointer border ${
                    selected
                      ? "bg-foreground text-white border-foreground"
                      : "bg-white/90 text-muted border-border hover:text-foreground hover:border-border-light"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Mosaico Bento Assimétrico Interativo ─── */}
      <section className="relative w-full pt-2 pb-12 sm:pb-24 px-4 sm:px-6 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 studio-dot-grid opacity-50" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-2.5 sm:gap-5">
            {items.map((service, index) => (
              <BentoServiceCard
                key={service.id}
                service={service}
                index={index}
                total={items.length}
                categoryLabel={categoryLabels[service.category]}
                locale={locale}
              />
            ))}
          </div>

          {/* Briefing */}
          <BriefBuilder />
        </div>
      </section>
    </main>
  );
}
