"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage, type Locale } from "@/context/LanguageContext";
import type { Area } from "@/lib/contact";

type GoalId = "launch" | "automate" | "grow" | "audit";
type ScopeId = "web" | "ai" | "marketing" | "ecom";
type UrgencyId = "asap" | "quarter" | "planning";

const GOALS: Record<Locale, { id: GoalId; label: string }[]> = {
  pt: [
    { id: "launch", label: "Lançar produto ou website" },
    { id: "automate", label: "Automatizar processos com IA" },
    { id: "grow", label: "Aumentar vendas e notoriedade" },
    { id: "audit", label: "Auditar e escalar operação" },
  ],
  en: [
    { id: "launch", label: "Launch product or website" },
    { id: "automate", label: "Automate workflows with AI" },
    { id: "grow", label: "Grow sales and visibility" },
    { id: "audit", label: "Audit and scale operations" },
  ],
};

const SCOPES: Record<Locale, { id: ScopeId; label: string; area: Area }[]> = {
  pt: [
    { id: "web", label: "Web, Software & Mobile", area: "Web, Software & Mobile" },
    { id: "ai", label: "Automação, IA & Dados", area: "Automação, IA & Dados" },
    { id: "marketing", label: "Estratégia, Marketing & Campanhas", area: "Estratégia, Marketing & Campanhas" },
    { id: "ecom", label: "Consultoria & E-commerce", area: "Consultoria & E-commerce" },
  ],
  en: [
    { id: "web", label: "Web, Software & Mobile", area: "Web, Software & Mobile" },
    { id: "ai", label: "Automation, AI & Data", area: "Automação, IA & Dados" },
    { id: "marketing", label: "Strategy, Marketing & Campaigns", area: "Estratégia, Marketing & Campanhas" },
    { id: "ecom", label: "Consulting & E-commerce", area: "Consultoria & E-commerce" },
  ],
};

const URGENCIES: Record<Locale, { id: UrgencyId; label: string }[]> = {
  pt: [
    { id: "asap", label: "Para já (< 1 mês)" },
    { id: "quarter", label: "1 - 3 meses" },
    { id: "planning", label: "A planear (> 3 meses)" },
  ],
  en: [
    { id: "asap", label: "ASAP (< 1 month)" },
    { id: "quarter", label: "1 - 3 months" },
    { id: "planning", label: "Planning (> 3 months)" },
  ],
};

const RECOMMENDATIONS: Record<
  ScopeId,
  {
    estimate: Record<Locale, string>;
    services: Record<Locale, string[]>;
  }
> = {
  web: {
    estimate: { pt: "2 - 6 semanas", en: "2 - 6 weeks" },
    services: {
      pt: ["Web Design e Desenvolvimento Web", "Desenvolvimento de Software", "Desenvolvimento Mobile"],
      en: ["Web Design & Web Development", "Custom Software Development", "Mobile App Development"],
    },
  },
  ai: {
    estimate: { pt: "2 - 5 semanas", en: "2 - 5 weeks" },
    services: {
      pt: ["Automação de Processos", "Inteligência Artificial & LLMs", "Análise de Dados & BI"],
      en: ["Process Automation", "Artificial Intelligence & LLMs", "Data Analytics & BI"],
    },
  },
  marketing: {
    estimate: { pt: "1 - 4 semanas", en: "1 - 4 weeks" },
    services: {
      pt: ["Estratégia e Comunicação", "Publicidade e Campanhas", "Marketing Digital e Redes Sociais"],
      en: ["Strategy & Brand Communication", "Advertising & Campaigns", "Digital Marketing & Social Media"],
    },
  },
  ecom: {
    estimate: { pt: "2 - 6 semanas", en: "2 - 6 weeks" },
    services: {
      pt: ["E-commerce & Otimização", "Consultoria Tecnológica & Diagnóstico", "Análise de Dados & BI"],
      en: ["E-commerce & Optimization", "Technology & Business Consulting", "Data Analytics & BI"],
    },
  },
};

export default function BriefBuilder() {
  const { locale } = useLanguage();
  const [goal, setGoal] = useState<GoalId>("launch");
  const [scope, setScope] = useState<ScopeId>("web");
  const [urgency, setUrgency] = useState<UrgencyId>("quarter");

  const goals = GOALS[locale];
  const scopes = SCOPES[locale];
  const urgencies = URGENCIES[locale];

  const selectedGoal = goals.find((g) => g.id === goal) ?? goals[0];
  const selectedScope = scopes.find((s) => s.id === scope) ?? scopes[0];
  const selectedUrgency = urgencies.find((u) => u.id === urgency) ?? urgencies[0];
  const rec = RECOMMENDATIONS[scope];

  const generatedBrief =
    locale === "pt"
      ? `Objetivo: ${selectedGoal.label}. Foco principal: ${selectedScope.label}. Horizonte pretendido: ${selectedUrgency.label}. Gostaria de agendar um diagnóstico inicial com a midi8.`
      : `Goal: ${selectedGoal.label}. Main focus: ${selectedScope.label}. Target timeline: ${selectedUrgency.label}. I would like to book an initial discovery call with midi8.`;

  const contactHref = `/contacto?area=${encodeURIComponent(selectedScope.area)}&brief=${encodeURIComponent(generatedBrief)}`;

  return (
    <div className="mt-12 sm:mt-16 rounded-2xl border border-black/[0.08] bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(15,23,42,0.04),0_20px_44px_-26px_rgba(15,23,42,0.14)] p-5 sm:p-9">
      <div className="max-w-2xl mb-7">
        <p className="type-label text-subtle mb-2">
          {locale === "pt" ? "Construtor Rápido de Briefing" : "Quick Brief Builder"}
        </p>
        <h2 className="type-headline-md text-foreground mb-2">
          {locale === "pt"
            ? "Não tem a certeza por onde começar?"
            : "Not sure where to start?"}
        </h2>
        <p className="type-body text-muted text-pretty">
          {locale === "pt"
            ? "Escolha 3 opções e preparamos o resumo ideal já pré-preenchido para a nossa equipa."
            : "Pick 3 options and we will generate a pre-filled brief ready for our team."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* 3 Passos de seleção */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-subtle mb-2">
              {locale === "pt" ? "1. Objetivo principal" : "1. Main goal"}
            </p>
            <div className="flex flex-wrap gap-2">
              {goals.map((item) => {
                const active = goal === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setGoal(item.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm border transition-all active:scale-[0.98] cursor-pointer ${
                      active
                        ? "bg-foreground text-white border-foreground"
                        : "bg-surface/80 text-muted border-border hover:text-foreground hover:border-border-light"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-wider text-subtle mb-2">
              {locale === "pt" ? "2. Área prioritária" : "2. Priority area"}
            </p>
            <div className="flex flex-wrap gap-2">
              {scopes.map((item) => {
                const active = scope === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setScope(item.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm border transition-all active:scale-[0.98] cursor-pointer ${
                      active
                        ? "bg-foreground text-white border-foreground"
                        : "bg-surface/80 text-muted border-border hover:text-foreground hover:border-border-light"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-wider text-subtle mb-2">
              {locale === "pt" ? "3. Horizonte temporal" : "3. Target timeline"}
            </p>
            <div className="flex flex-wrap gap-2">
              {urgencies.map((item) => {
                const active = urgency === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setUrgency(item.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm border transition-all active:scale-[0.98] cursor-pointer ${
                      active
                        ? "bg-foreground text-white border-foreground"
                        : "bg-surface/80 text-muted border-border hover:text-foreground hover:border-border-light"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Painel de recomendação em tempo real */}
        <div className="lg:col-span-5 rounded-xl bg-surface/75 border border-border p-5 sm:p-6 flex flex-col justify-between gap-5">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-border">
              <span className="text-[11px] uppercase tracking-wider text-subtle">
                {locale === "pt" ? "Plano sugerido" : "Suggested setup"}
              </span>
              <span className="text-xs font-bold text-foreground">
                {rec.estimate[locale]}
              </span>
            </div>

            <p className="text-[11px] uppercase tracking-wider text-subtle mb-2">
              {locale === "pt" ? "Serviços recomendados" : "Recommended services"}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {rec.services[locale].map((srv) => (
                <span
                  key={srv}
                  className="rounded-full bg-white border border-border px-2.5 py-1 text-[11px] text-foreground"
                >
                  {srv}
                </span>
              ))}
            </div>

            <p className="text-xs text-muted leading-relaxed text-pretty border-t border-border/80 pt-3">
              {generatedBrief}
            </p>
          </div>

          <Link
            href={contactHref}
            className="cta-button w-full justify-between"
          >
            <span>
              {locale === "pt" ? "Avançar com este briefing" : "Continue with this brief"}
            </span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
