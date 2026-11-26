"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import KineticHeading from "@/components/KineticHeading";
import ServiceIcon from "@/components/ServiceIcon";
import { useLanguage, type Locale } from "@/context/LanguageContext";

export function ServiceCategoryTag({
  category,
  label,
}: {
  category: string;
  label: string;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        const target = document.getElementById("servicos");
        if (target) {
          window.dispatchEvent(new CustomEvent("midi8:select-category", { detail: category }));
          target.scrollIntoView({ behavior: "smooth" });
        } else {
          router.push(`/servicos?cat=${encodeURIComponent(category)}`);
        }
      }}
      className="rounded-full bg-white/90 border border-border px-2.5 py-0.5 text-[11px] text-muted hover:text-foreground hover:border-border-strong active:scale-[0.97] transition-all cursor-pointer"
    >
      {label}
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
      pt: "Criação de websites e plataformas digitais que combinam design cuidado, desempenho e experiência de utilização.",
      en: "Design and development of websites and digital platforms combining visual craft, speed, and user experience.",
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
      pt: "Conceção de software e aplicações à medida para responder a necessidades específicas e simplificar operações.",
      en: "Custom software and web applications engineered for specific operational needs and streamlined workflows.",
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
      pt: "Identificação de gargalos e criação de ferramentas digitais práticas para transformar ideias em sistemas funcionais.",
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
      pt: "Sistemas e integrações que automatizam tarefas repetitivas, reduzem erros manuais e aumentam a produtividade.",
      en: "Automated pipelines and system integrations that eliminate manual work, raise efficiency, and scale operations.",
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
      pt: "Estratégias de comunicação alinhadas com os objetivos da marca, com uma mensagem coerente para o público certo.",
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
      pt: "Planeamento e execução criativa de campanhas publicitárias para aumentar notoriedade e gerar resultados mensuráveis.",
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
      pt: "Gestão da presença digital com criação de conteúdos, planeamento estratégico e dinamização nas redes sociais.",
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
      pt: "Análise de sistemas e infraestruturas informáticas para identificar melhorias e recomendar soluções tecnológicas eficazes.",
      en: "Technical advisory and architecture assessment to spot infrastructure gaps and recommend practical upgrades.",
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
      pt: "Auditorias digitais e planos estratégicos para reforçar a visibilidade, a comunicação e o desempenho das marcas.",
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
      pt: "Recolha, tratamento e leitura de dados para revelar tendências, avaliar resultados e apoiar decisões mais seguras.",
      en: "Collecting, structuring, and interpreting business data to surface clear insights and guide confident decisions.",
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
      pt: "Integração de inteligência artificial e LLMs para automatizar fluxos de trabalho e criar agentes à medida do negócio.",
      en: "Building and integrating AI workflows, custom agents, and large language models tailored to your company's operations.",
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
      pt: "Implementação e otimização de lojas online, catálogos, encomendas e fluxos de venda para potenciar a conversão.",
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
      pt: "Desenvolvimento de aplicações móveis rápidas, intuitivas e fiáveis para diferentes plataformas e dispositivos.",
      en: "Design and engineering of cross-platform mobile applications focused on speed, usability, and daily reliability.",
    },
    gradient: GRADIENT_BLUE_MINT,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
];

function wrapIndex(value: number, total: number): number {
  if (total <= 0) return 0;
  return ((value % total) + total) % total;
}

function getCircularOffset(index: number, pos: number, total: number): number {
  if (total <= 1) return 0;
  const wrapped = wrapIndex(pos, total);
  let diff = index - wrapped;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

function getCard3DStyle(diff: number, total: number) {
  const abs = Math.abs(diff);
  const sign = diff >= 0 ? 1 : -1;
  const hasOuterWings = total >= 5;
  const maxVis = hasOuterWings ? 2.6 : 1.55;

  const xFactor =
    abs <= 1
      ? abs
      : abs <= 2
        ? 1 + (abs - 1) * 0.74
        : 1.74 + Math.min(abs - 2, 1) * 0.32;

  const zPx = -Math.min(abs, 3) * 110;
  const absRot =
    abs <= 1
      ? abs * 28
      : abs <= 2
        ? 28 + (abs - 1) * 10
        : 38 + Math.min(abs - 2, 1) * 8;
  const rotY = diff === 0 ? 0 : sign * -absRot;
  const scale = Math.max(0.66, 1 - abs * 0.12);

  let opacity = 0;
  if (abs < maxVis) {
    if (abs <= 1) {
      opacity = 1 - abs * 0.16;
    } else if (hasOuterWings && abs <= 2) {
      opacity = 0.84 - (abs - 1) * 0.38;
    } else if (hasOuterWings) {
      opacity = Math.max(0, 0.46 * (1 - (abs - 2) / 0.6));
    } else {
      opacity = Math.max(0, 0.84 * (1 - (abs - 1) / 0.55));
    }
  }

  return {
    transform: `translate3d(calc(var(--wing-unit, 270px) * ${(sign * xFactor).toFixed(4)}), 0px, ${zPx.toFixed(1)}px) rotateY(${rotY.toFixed(2)}deg) scale(${scale.toFixed(4)})`,
    opacity: Number(opacity.toFixed(3)),
    zIndex: Math.max(0, Math.round(100 - abs * 30)),
    isVisible: opacity > 0.01,
  };
}

export default function ServicesCarousel() {
  const stageRef = useRef<HTMLDivElement>(null);
  const physRef = useRef<{
    current: number;
    target: number;
    dragging: boolean;
    rafId: number | null;
    snapTimer: number | null;
    lastFrameTime: number;
  }>({
    current: 0,
    target: 0,
    dragging: false,
    rafId: null,
    snapTimer: null,
    lastFrameTime: 0,
  });
  const pointerRef = useRef<{
    pointerId: number | null;
    captured: boolean;
    startX: number;
    startTarget: number;
    lastX: number;
    lastTime: number;
    velocity: number;
  }>({
    pointerId: null,
    captured: false,
    startX: 0,
    startTarget: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  });
  const didDragRef = useRef(false);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const totalRef = useRef(SERVICES.length);
  const [category, setCategory] = useState<CategoryId>("all");
  const [safeIndex, setSafeIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { locale } = useLanguage();

  const categories = CATEGORIES[locale];
  const categoryLabels = CATEGORY_LABELS[locale];
  const visibleServices =
    category === "all" ? SERVICES : SERVICES.filter((s) => s.category === category);
  const total = visibleServices.length;

  useEffect(() => {
    totalRef.current = total;
  }, [total]);

  const applyStageTransforms = useCallback((pos: number) => {
    const count = totalRef.current;
    for (let i = 0; i < count; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;
      const diff = getCircularOffset(i, pos, count);
      const stagePos = getCard3DStyle(diff, count);
      el.style.transform = stagePos.transform;
      el.style.opacity = String(stagePos.opacity);
      el.style.zIndex = String(stagePos.zIndex);
      el.style.visibility = stagePos.isVisible ? "visible" : "hidden";
      el.style.pointerEvents = stagePos.isVisible ? "auto" : "none";
    }
    const nextIdx = wrapIndex(Math.round(pos), count);
    setSafeIndex((prev) => (prev === nextIdx ? prev : nextIdx));
  }, []);

  useEffect(() => {
    applyStageTransforms(physRef.current.current);
  }, [category, total, applyStageTransforms]);

  const startLoop = useCallback(() => {
    if (physRef.current.rafId !== null) return;
    physRef.current.lastFrameTime = performance.now();

    const tick = (now: number) => {
      const phys = physRef.current;
      const dt = Math.max(1, Math.min(48, now - phys.lastFrameTime));
      phys.lastFrameTime = now;

      const baseAlpha = phys.dragging ? 0.34 : 0.16;
      const alpha = 1 - Math.pow(1 - baseAlpha, dt / 16.6667);
      const diff = phys.target - phys.current;

      if (!phys.dragging && Math.abs(diff) < 0.001) {
        phys.current = phys.target;
        phys.rafId = null;
        applyStageTransforms(phys.current);
        return;
      }

      phys.current += diff * alpha;
      applyStageTransforms(phys.current);
      phys.rafId = window.requestAnimationFrame(tick);
    };

    physRef.current.rafId = window.requestAnimationFrame(tick);
  }, [applyStageTransforms]);

  const resetToFirst = useCallback(() => {
    const phys = physRef.current;
    if (phys.snapTimer !== null) {
      window.clearTimeout(phys.snapTimer);
      phys.snapTimer = null;
    }
    if (phys.rafId !== null) {
      window.cancelAnimationFrame(phys.rafId);
      phys.rafId = null;
    }
    phys.current = 0;
    phys.target = 0;
    phys.dragging = false;
    setSafeIndex(0);
    applyStageTransforms(0);
  }, [applyStageTransforms]);

  useEffect(() => {
    const phys = physRef.current;
    return () => {
      if (phys.rafId !== null) window.cancelAnimationFrame(phys.rafId);
      if (phys.snapTimer !== null) window.clearTimeout(phys.snapTimer);
    };
  }, []);

  const rotateToIndex = useCallback(
    (targetIndex: number) => {
      if (total <= 1) return;
      const phys = physRef.current;
      if (phys.snapTimer !== null) {
        window.clearTimeout(phys.snapTimer);
        phys.snapTimer = null;
      }
      const base = Math.round(phys.target);
      const delta = getCircularOffset(targetIndex, base, total);
      phys.target = base + delta;
      startLoop();
    },
    [total, startLoop]
  );

  useEffect(() => {
    const onSelectCategory = (e: Event) => {
      const next = (e as CustomEvent<CategoryId>).detail;
      if (!next) return;
      setCategory(next);
      resetToFirst();
      setHoveredId(null);
    };
    window.addEventListener("midi8:select-category", onSelectCategory);
    return () => window.removeEventListener("midi8:select-category", onSelectCategory);
  }, [resetToFirst]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el || total <= 1) return;

    const onWheel = (e: WheelEvent) => {
      const unitScale = e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? 320 : 1;
      const dx = e.deltaX * unitScale;
      const dy = e.deltaY * unitScale;
      const delta =
        Math.abs(dx) > Math.abs(dy)
          ? dx
          : e.shiftKey && Math.abs(dy) > 0
            ? dy
            : 0;

      if (delta === 0) return;
      e.preventDefault();

      const phys = physRef.current;
      if (phys.snapTimer !== null) {
        window.clearTimeout(phys.snapTimer);
      }

      phys.target += delta / 210;
      startLoop();

      phys.snapTimer = window.setTimeout(() => {
        phys.snapTimer = null;
        phys.target = Math.round(phys.target);
        startLoop();
      }, 140);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [total, startLoop]);

  const handleCategoryChange = (next: CategoryId) => {
    setCategory(next);
    resetToFirst();
    setHoveredId(null);
  };

  const rotateByDelta = (delta: number) => {
    if (total <= 1) return;
    const phys = physRef.current;
    if (phys.snapTimer !== null) {
      window.clearTimeout(phys.snapTimer);
      phys.snapTimer = null;
    }
    phys.target = Math.round(phys.target) + delta;
    startLoop();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || total <= 1) return;
    const phys = physRef.current;
    if (phys.snapTimer !== null) {
      window.clearTimeout(phys.snapTimer);
      phys.snapTimer = null;
    }
    const now = performance.now();
    didDragRef.current = false;
    pointerRef.current = {
      pointerId: e.pointerId,
      captured: false,
      startX: e.clientX,
      startTarget: phys.target,
      lastX: e.clientX,
      lastTime: now,
      velocity: 0,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const ptr = pointerRef.current;
    if (ptr.pointerId !== e.pointerId) return;

    const dx = e.clientX - ptr.startX;
    if (!ptr.captured && Math.abs(dx) > 6) {
      ptr.captured = true;
      didDragRef.current = true;
      physRef.current.dragging = true;
      setHoveredId(null);
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Ignora caso pointer capture não esteja disponível
      }
    }

    if (!ptr.captured) return;

    const now = performance.now();
    const dt = Math.max(1, now - ptr.lastTime);
    const instantVelocity = (e.clientX - ptr.lastX) / dt;
    ptr.velocity = ptr.velocity * 0.55 + instantVelocity * 0.45;
    ptr.lastX = e.clientX;
    ptr.lastTime = now;

    physRef.current.target = ptr.startTarget - dx / 220;
    startLoop();
  };

  const finishPointerDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const ptr = pointerRef.current;
    if (ptr.pointerId !== e.pointerId) return;

    if (ptr.captured) {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        try {
          e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {
          // Ignora caso pointer capture já tenha sido libertado
        }
      }
      const phys = physRef.current;
      phys.dragging = false;
      const momentum = Math.max(-2, Math.min(2, (-ptr.velocity * 110) / 220));
      phys.target = Math.round(phys.target + momentum);
      startLoop();
    }

    ptr.pointerId = null;
    ptr.captured = false;
  };

  return (
    <section id="servicos" className="relative w-full py-20 sm:py-28 scroll-mt-16 overflow-x-clip">
      <div className="max-w-7xl w-full mx-auto px-5 sm:px-6">
        {/* Cabeçalho da secção */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 sm:mb-7 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <KineticHeading
              className="type-headline-lg text-foreground"
              segments={
                locale === "pt"
                  ? [{ text: "Os Nossos " }, { text: "Serviços", italic: true }]
                  : [{ text: "Our " }, { text: "Services", italic: true }]
              }
            />
            <p className="type-body text-muted mt-1.5 text-pretty">
              {locale === "pt"
                ? "Soluções digitais desenhadas à medida do seu negócio."
                : "Digital solutions tailored to your business."}
            </p>
          </div>
          <Link
            href="/servicos"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted hover:text-foreground transition-colors shrink-0 w-fit"
          >
            <span>{locale === "pt" ? "Ver catálogo completo" : "View full catalog"}</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </motion.div>

        {/* Filtros por categoria */}
        <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar mb-4 sm:mb-6 pb-1">
          {categories.map((cat) => {
            const selected = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`shrink-0 px-3.5 py-1 rounded-full text-xs sm:text-sm font-normal active:scale-[0.97] transition-all cursor-pointer border ${
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

      {/* Palco 3D contínuo em perspetiva (Coverflow) */}
      <div className="max-w-[1440px] w-full mx-auto px-2 sm:px-6">
        <div
          ref={stageRef}
          role="region"
          aria-roledescription="carousel"
          aria-label={locale === "pt" ? "Carrossel 3D de serviços" : "Services 3D carousel"}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              rotateByDelta(-1);
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              rotateByDelta(1);
            }
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishPointerDrag}
          onPointerCancel={finishPointerDrag}
          onPointerLeave={() => {
            if (!pointerRef.current.captured) {
              setHoveredId(null);
            }
          }}
          style={{
            perspective: "1400px",
          }}
          className="relative w-full h-[305px] sm:h-[430px] flex items-center justify-center select-none overflow-hidden touch-pan-y overscroll-x-contain cursor-grab active:cursor-grabbing focus-visible:outline-none [--wing-unit:132px] sm:[--wing-unit:235px] lg:[--wing-unit:270px]"
        >
          {/* Fades laterais leves sem maskImage (mantém composição 3D 100% na GPU) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 z-30 bg-gradient-to-r from-background to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 z-30 bg-gradient-to-l from-background to-transparent"
          />

          {visibleServices.map((service, index) => {
            const diff = getCircularOffset(index, safeIndex, total);
            const initialStagePos = getCard3DStyle(diff, total);
            const isCenter = index === safeIndex;
            const isHovered = hoveredId === service.id;
            const isSpotlit = isCenter || isHovered;

            return (
              <article
                key={service.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                tabIndex={initialStagePos.isVisible ? 0 : -1}
                onMouseEnter={() => {
                  if (!pointerRef.current.captured) {
                    setHoveredId(service.id);
                  }
                }}
                onMouseLeave={() => {
                  setHoveredId((prev) => (prev === service.id ? null : prev));
                }}
                onClick={() => {
                  if (didDragRef.current) return;
                  if (index !== safeIndex) {
                    rotateToIndex(index);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    rotateToIndex(index);
                  }
                }}
                style={{
                  transition:
                    "box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                  willChange: "transform, opacity",
                }}
                className={`service-card absolute w-[72vw] max-w-[264px] sm:w-[340px] sm:max-w-none h-[264px] sm:h-[360px] p-5 sm:p-7 flex flex-col justify-between overflow-hidden cursor-pointer select-none [transform-style:preserve-3d] [backface-visibility:hidden] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue ${
                  isSpotlit ? "service-card--active" : ""
                }`}
              >
                {/* Camada de gradiente suave para crossfade sem saltos bruscos */}
                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
                    isSpotlit ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ background: service.gradient }}
                  aria-hidden="true"
                />

                {/* Véu escuro para legibilidade estável nos gradientes ativos */}
                <div
                  className={`pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/44 via-black/18 to-transparent transition-opacity duration-300 ${
                    isSpotlit ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                />

                {/* Ícone minimalista em caixa branca e categoria discreta no topo */}
                <div className="relative z-10 flex items-center justify-between gap-3">
                  <span
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                      isSpotlit
                        ? "bg-white/90 border-white text-foreground shadow-xs"
                        : "bg-white border-black/[0.06] text-foreground shadow-2xs"
                    }`}
                  >
                    <ServiceIcon icon={service.icon} />
                  </span>

                  <span
                    className={`text-[10px] sm:text-[11px] font-sans tracking-wide uppercase transition-colors duration-300 ${
                      isSpotlit ? "text-foreground/75" : "text-subtle"
                    }`}
                  >
                    {categoryLabels[service.category]}
                  </span>
                </div>

                {/* Conteúdo ancorado em baixo em sans-serif limpa e legível */}
                <div className="relative z-10">
                  <h3
                    className={`font-sans text-[15px] sm:text-[17px] font-bold tracking-tight leading-snug mb-1.5 sm:mb-2 transition-colors duration-300 ${
                      isSpotlit ? "text-white" : "text-foreground"
                    }`}
                  >
                    {service.title[locale]}
                  </h3>
                  <p
                    className={`text-[11.5px] sm:text-[13px] leading-relaxed line-clamp-4 transition-colors duration-300 ${
                      isSpotlit ? "text-white/90" : "text-muted"
                    }`}
                  >
                    {service.description[locale]}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Indicadores minimalistas centrados abaixo do palco 3D */}
        <div className="max-w-7xl mx-auto px-5 sm:px-6 mt-4 sm:mt-5 flex justify-center">
          <div
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1"
            role="tablist"
            aria-label={locale === "pt" ? "Selecionar serviço" : "Select service"}
          >
            {visibleServices.map((service, index) => {
              const selected = index === safeIndex;
              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-label={`${service.title[locale]} (${index + 1}/${total})`}
                  onClick={() => rotateToIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 cursor-pointer ${
                    selected
                      ? "bg-gradient-to-r from-[#A818FF] via-[#145EFF] to-[#00E896]"
                      : "bg-border-strong/55 hover:bg-foreground/45"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
