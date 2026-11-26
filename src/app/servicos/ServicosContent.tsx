"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import KineticHeading from "@/components/KineticHeading";
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
  timeline: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  deliverables: Record<Locale, string[]>;
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

const CATALOG: ServiceCatalogItem[] = [
  {
    id: "web-design",
    category: "web-software",
    contactArea: "Web, Software & Mobile",
    timeline: { pt: "2 – 4 semanas", en: "2 – 4 weeks" },
    title: { pt: "Web Design e Desenvolvimento Web", en: "Web Design & Web Development" },
    description: {
      pt: "Criação de websites e plataformas digitais que combinam design cuidado, desempenho extremo e experiência de utilização.",
      en: "Design and engineering of websites and digital platforms combining visual craft, speed, and user experience.",
    },
    deliverables: {
      pt: ["UI/UX responsivo à medida", "SEO técnico & Core Web Vitals", "Deploy e manutenção simplificada"],
      en: ["Custom responsive UI/UX", "Technical SEO & Core Web Vitals", "Production deploy & handoff"],
    },
  },
  {
    id: "desenvolvimento-software",
    category: "web-software",
    contactArea: "Web, Software & Mobile",
    timeline: { pt: "4 – 10 semanas", en: "4 – 10 weeks" },
    title: { pt: "Desenvolvimento de Software", en: "Custom Software Development" },
    description: {
      pt: "Conceção de software e aplicações web à medida para responder a necessidades operacionais específicas.",
      en: "Custom software and web applications engineered for specific operational needs and workflows.",
    },
    deliverables: {
      pt: ["Arquitetura escalável & APIs", "Painéis internos e portais de cliente", "Documentação e testes"],
      en: ["Scalable architecture & APIs", "Internal dashboards & client portals", "Documentation & testing"],
    },
  },
  {
    id: "desenvolvimento-mobile",
    category: "web-software",
    contactArea: "Web, Software & Mobile",
    timeline: { pt: "6 – 12 semanas", en: "6 – 12 weeks" },
    title: { pt: "Desenvolvimento Mobile", en: "Mobile App Development" },
    description: {
      pt: "Aplicações iOS e Android desenhadas para fluidez, retenção e integração total com o ecossistema da empresa.",
      en: "iOS and Android apps built for speed, retention, and full integration with your existing systems.",
    },
    deliverables: {
      pt: ["App iOS & Android nativa/cross-platform", "Notificações e sincronização offline", "Publicação App Store & Play Store"],
      en: ["Cross-platform iOS & Android app", "Push notifications & sync", "App Store & Play Store release"],
    },
  },
  {
    id: "solucoes-tecnologicas",
    category: "ia-automacao",
    contactArea: "Automação, IA & Dados",
    timeline: { pt: "2 – 6 semanas", en: "2 – 6 weeks" },
    title: { pt: "Desenvolvimento de Soluções Tecnológicas", en: "Technology Solutions Engineering" },
    description: {
      pt: "Identificação de gargalos e criação de ferramentas digitais práticas para transformar ideias em sistemas funcionais.",
      en: "Pinpointing operational bottlenecks and engineering practical tools that turn ideas into working systems.",
    },
    deliverables: {
      pt: ["Mapeamento técnico de gargalos", "Integrações entre ERPs e CRMs", "Provas de conceito rápidas"],
      en: ["Technical bottleneck mapping", "ERP & CRM integrations", "Rapid proof-of-concept builds"],
    },
  },
  {
    id: "automacao-processos",
    category: "ia-automacao",
    contactArea: "Automação, IA & Dados",
    timeline: { pt: "1 – 3 semanas", en: "1 – 3 weeks" },
    title: { pt: "Automação de Processos", en: "Process Automation" },
    description: {
      pt: "Sistemas e integrações que eliminam tarefas repetitivas, reduzem erros manuais e aumentam a produtividade.",
      en: "Automated pipelines and integrations that eliminate manual work, reduce errors, and scale operations.",
    },
    deliverables: {
      pt: ["Fluxos automáticos n8n / Make / API", "Alertas e relatórios sem intervenção manual", "Monitorização de falhas"],
      en: ["Automated n8n / Make / API pipelines", "Zero-touch reporting & alerts", "Error monitoring & fallbacks"],
    },
  },
  {
    id: "ia-llms",
    category: "ia-automacao",
    contactArea: "Automação, IA & Dados",
    timeline: { pt: "2 – 5 semanas", en: "2 – 5 weeks" },
    title: { pt: "Inteligência Artificial & LLMs", en: "Artificial Intelligence & LLMs" },
    description: {
      pt: "Assistentes, agentes internos e fluxos com modelos de linguagem integrados nos dados reais da sua organização.",
      en: "Assistants, internal agents, and LLM workflows securely integrated with your real company knowledge.",
    },
    deliverables: {
      pt: ["Agentes de suporte e triagem", "Pesquisa inteligente sobre documentos", "Controlo de custos e privacidade"],
      en: ["Support & triage AI agents", "Semantic search over company docs", "Cost & privacy guardrails"],
    },
  },
  {
    id: "analise-dados",
    category: "ia-automacao",
    contactArea: "Automação, IA & Dados",
    timeline: { pt: "2 – 4 semanas", en: "2 – 4 weeks" },
    title: { pt: "Análise de Dados & Business Intelligence", en: "Data Analytics & Business Intelligence" },
    description: {
      pt: "Transformação de dados dispersos em dashboards claros, modelos estatísticos e indicadores acionáveis.",
      en: "Turning scattered company data into clear dashboards, statistical models, and actionable KPIs.",
    },
    deliverables: {
      pt: ["Dashboards executivos em tempo real", "Modelação estatística e previsão", "Consolidação de fontes de dados"],
      en: ["Real-time executive dashboards", "Statistical modeling & forecasting", "Unified data pipelines"],
    },
  },
  {
    id: "estrategia-comunicacao",
    category: "marketing",
    contactArea: "Estratégia, Marketing & Campanhas",
    timeline: { pt: "2 – 3 semanas", en: "2 – 3 weeks" },
    title: { pt: "Estratégia e Comunicação", en: "Strategy & Brand Communication" },
    description: {
      pt: "Estratégias de comunicação alinhadas com os objetivos da marca, com uma mensagem coerente para o público certo.",
      en: "Communication strategies aligned with business goals, ensuring a coherent voice for the right audience.",
    },
    deliverables: {
      pt: ["Posicionamento e tom de voz", "Narrativa comercial e editorial", "Plano trimestral de comunicação"],
      en: ["Positioning & tone of voice", "Commercial & editorial narrative", "Quarterly communication roadmap"],
    },
  },
  {
    id: "publicidade-campanhas",
    category: "marketing",
    contactArea: "Estratégia, Marketing & Campanhas",
    timeline: { pt: "Contínuo", en: "Ongoing" },
    title: { pt: "Publicidade e Campanhas", en: "Advertising & Campaigns" },
    description: {
      pt: "Planeamento e execução criativa de campanhas para aumentar notoriedade, captar leads e gerar retorno mensurável.",
      en: "Campaign planning and creative execution to grow awareness, acquire leads, and drive measurable ROI.",
    },
    deliverables: {
      pt: ["Gestão Google Ads & Meta Ads", "Criativos, copy e testes A/B", "Tracking de conversões e ROAS"],
      en: ["Google Ads & Meta Ads management", "Creative assets, copy & A/B testing", "Conversion & ROAS tracking"],
    },
  },
  {
    id: "marketing-digital",
    category: "marketing",
    contactArea: "Estratégia, Marketing & Campanhas",
    timeline: { pt: "Contínuo", en: "Ongoing" },
    title: { pt: "Marketing Digital e Redes Sociais", en: "Digital Marketing & Social Media" },
    description: {
      pt: "Presença digital consistente, produção de conteúdo visual e gestão estratégica para transformar audiência em clientes.",
      en: "Consistent digital presence, visual content production, and growth strategy that turns audience into revenue.",
    },
    deliverables: {
      pt: ["Calendário editorial & produção", "Direção visual coerente com a marca", "Relatórios mensais de crescimento"],
      en: ["Editorial calendar & production", "Cohesive brand visual direction", "Monthly growth reporting"],
    },
  },
  {
    id: "branding-identidade",
    category: "marketing",
    contactArea: "Estratégia, Marketing & Campanhas",
    timeline: { pt: "2 – 4 semanas", en: "2 – 4 weeks" },
    title: { pt: "Identidade Visual & Direção Criativa", en: "Brand Identity & Creative Direction" },
    description: {
      pt: "Sistemas visuais minimalistas e memoráveis pensados para funcionar em digital, produto e comunicação institucional.",
      en: "Minimalist, memorable visual systems crafted to work across digital products and brand touchpoints.",
    },
    deliverables: {
      pt: ["Logótipo, tipografia e paleta", "Manual de normas digitais", "Templates prontos a utilizar"],
      en: ["Logo, typography & color system", "Digital brand guidelines", "Ready-to-use brand templates"],
    },
  },
  {
    id: "consultoria-informatica",
    category: "consultoria-ecom",
    contactArea: "Consultoria & E-commerce",
    timeline: { pt: "1 – 2 semanas", en: "1 – 2 weeks" },
    title: { pt: "Consultoria Tecnológica & Diagnóstico", en: "Technology & Business Consulting" },
    description: {
      pt: "Apoio à decisão técnica e de negócio para escolher a arquitetura, ferramentas e investimentos certos sem desperdício.",
      en: "Technical and strategic guidance to pick the right architecture, tools, and investments without waste.",
    },
    deliverables: {
      pt: ["Auditoria de stack e processos", "Roadmap priorizado por impacto", "Acompanhamento de equipas internas"],
      en: ["Stack & process audit", "Impact-prioritized roadmap", "Advisory for internal teams"],
    },
  },
  {
    id: "ecommerce",
    category: "consultoria-ecom",
    contactArea: "Consultoria & E-commerce",
    timeline: { pt: "3 – 6 semanas", en: "3 – 6 weeks" },
    title: { pt: "E-commerce & Otimização de Conversão", en: "E-commerce & Conversion Optimization" },
    description: {
      pt: "Lojas online rápidas e otimizadas para venda, integradas com faturação, logística, pagamentos e campanhas.",
      en: "Fast, conversion-focused online stores integrated with invoicing, shipping, payments, and campaigns.",
    },
    deliverables: {
      pt: ["Loja Shopify ou à medida", "Integração de pagamentos e envio", "Otimização de checkout e funil"],
      en: ["Shopify or custom storefront", "Payments & fulfillment integration", "Checkout & funnel optimization"],
    },
  },
];

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
      <section className="relative w-full pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden">
        <div aria-hidden="true" className="top-aurora-fade opacity-70" />
        <div aria-hidden="true" className="top-aurora-grain" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-subtle mb-6">
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
              className="type-headline-lg text-foreground mb-5"
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
                ? "Da primeira arquitetura web à automação com inteligência artificial e campanhas de crescimento — escolha um serviço para pedir proposta diretamente."
                : "From foundational web architecture to AI automation and growth campaigns — pick any service to request a tailored proposal."}
            </p>
          </div>

          {/* Filtros */}
          <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar mt-8 pb-1">
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

      <div aria-hidden="true" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="section-divider" />
      </div>

      {/* ─── Grelha Completa dos Serviços ─── */}
      <section className="relative w-full py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 studio-dot-grid opacity-55" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {items.map((service, index) => (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.04, ease: REVEAL_EASE }}
                className="group rounded-2xl border border-black/[0.08] bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(15,23,42,0.04),0_16px_34px_-22px_rgba(15,23,42,0.14)] p-5 sm:p-7 flex flex-col justify-between gap-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-light hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_2px_4px_rgba(15,23,42,0.05),0_22px_42px_-20px_rgba(15,23,42,0.18)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center rounded-full bg-surface border border-border px-2.5 py-0.5 text-[11px] text-secondary">
                      {categoryLabels[service.category]}
                    </span>
                    <span className="text-[11px] text-subtle">
                      {service.timeline[locale]}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-foreground leading-snug mb-2">
                    {service.title[locale]}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed text-pretty mb-5">
                    {service.description[locale]}
                  </p>

                  <ul className="flex flex-col gap-1.5 border-t border-border/80 pt-4">
                    {service.deliverables[locale].map((d) => (
                      <li key={d} className="flex items-center gap-2 text-xs text-secondary">
                        <span
                          aria-hidden="true"
                          className="w-1 h-1 rounded-full bg-foreground/45 shrink-0"
                        />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/contacto?area=${encodeURIComponent(service.contactArea)}`}
                  className="inline-flex items-center justify-between gap-2 rounded-xl bg-surface/85 border border-border px-3.5 py-2.5 text-xs font-bold uppercase tracking-[0.03em] text-foreground transition-colors group-hover:bg-foreground group-hover:text-white group-hover:border-foreground active:scale-[0.98]"
                >
                  <span>{locale === "pt" ? "Pedir proposta" : "Request proposal"}</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* CTA de diagnóstico */}
          <div className="mt-12 sm:mt-16 rounded-2xl border border-black/[0.08] bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(15,23,42,0.04),0_20px_44px_-26px_rgba(15,23,42,0.14)] p-6 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                {locale === "pt"
                  ? "Não tem a certeza de qual serviço escolher?"
                  : "Not sure which service fits best?"}
              </h2>
              <p className="type-body text-muted text-pretty">
                {locale === "pt"
                  ? "Conte-nos o desafio atual da sua empresa e desenhamos uma proposta combinada à medida."
                  : "Tell us about your current challenge and we will craft a tailored combined plan."}
              </p>
            </div>
            <Link href="/contacto" className="cta-button shrink-0 w-fit">
              {locale === "pt" ? "Agendar diagnóstico" : "Book a discovery call"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
