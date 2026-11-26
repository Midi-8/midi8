"use client";

import { useState } from "react";
import Link from "next/link";
import KineticHeading from "@/components/KineticHeading";
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
    { id: "web", label: "Web & Software", area: "Web, Software & Mobile" },
    { id: "ai", label: "Automação, IA & Dados", area: "Automação, IA & Dados" },
    { id: "marketing", label: "Estratégia & Marketing", area: "Estratégia, Marketing & Campanhas" },
    { id: "ecom", label: "Consultoria & E-commerce", area: "Consultoria & E-commerce" },
  ],
  en: [
    { id: "web", label: "Web & Software", area: "Web, Software & Mobile" },
    { id: "ai", label: "Automation, AI & Data", area: "Automação, IA & Dados" },
    { id: "marketing", label: "Strategy & Marketing", area: "Estratégia, Marketing & Campanhas" },
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

function toggleInList<T>(list: T[], value: T): T[] {
  if (list.includes(value)) {
    return list.length > 1 ? list.filter((item) => item !== value) : list;
  }
  return [...list, value];
}

export default function BriefBuilder() {
  const { locale } = useLanguage();
  const [selectedGoals, setSelectedGoals] = useState<GoalId[]>(["launch"]);
  const [selectedScopes, setSelectedScopes] = useState<ScopeId[]>(["web"]);
  const [selectedUrgency, setSelectedUrgency] = useState<UrgencyId>("quarter");

  const goals = GOALS[locale];
  const scopes = SCOPES[locale];
  const urgencies = URGENCIES[locale];

  const activeGoalLabels = goals
    .filter((g) => selectedGoals.includes(g.id))
    .map((g) => g.label);
  const activeScopeItems = scopes.filter((s) => selectedScopes.includes(s.id));
  const activeUrgencyLabel =
    urgencies.find((u) => u.id === selectedUrgency)?.label ?? urgencies[1].label;

  // Texto estruturado e indentado para pré-preencher o formulário em /contacto
  const generatedBrief =
    locale === "pt"
      ? [
          "Objetivos:",
          ...activeGoalLabels.map((g) => `  - ${g}`),
          "",
          "Áreas prioritárias:",
          ...activeScopeItems.map((s) => `  - ${s.label}`),
          "",
          "Horizonte:",
          `  - ${activeUrgencyLabel}`,
          "",
          "Gostaria de agendar uma conversa inicial com a midi8 para explorar este projeto.",
        ].join("\n")
      : [
          "Goals:",
          ...activeGoalLabels.map((g) => `  - ${g}`),
          "",
          "Priority areas:",
          ...activeScopeItems.map((s) => `  - ${s.label}`),
          "",
          "Timeline:",
          `  - ${activeUrgencyLabel}`,
          "",
          "I would like to schedule an initial conversation with midi8 to discuss this project.",
        ].join("\n");

  const params = new URLSearchParams();
  for (const s of activeScopeItems) {
    params.append("area", s.area);
  }
  params.set("brief", generatedBrief);
  const contactHref = `/contacto?${params.toString()}`;

  return (
    <div className="mt-10 sm:mt-24">
      {/* Cabeçalho editorial da secção de Briefing */}
      <div className="max-w-2xl mb-5 sm:mb-9">
        <KineticHeading
          className="type-headline-lg text-foreground mb-2.5 sm:mb-3"
          segments={
            locale === "pt"
              ? [
                  { text: "Prepare o seu " },
                  { text: "briefing", italic: true },
                  { text: "." },
                ]
              : [
                  { text: "Prepare your " },
                  { text: "brief", italic: true },
                  { text: "." },
                ]
          }
        />
        <p className="type-body text-muted text-pretty">
          {locale === "pt"
            ? "Não tem a certeza por onde começar? Indique os objetivos, áreas prioritárias e horizonte do seu projeto para prepararmos um enquadramento claro já preenchido no formulário de contacto."
            : "Not sure where to start? Select your project goals, priority areas, and timeline to generate a clear, structured brief pre-filled in our contact form."}
        </p>
      </div>

      {/* Painel branco cerâmico minimalista */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-black/[0.08] bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(15,23,42,0.04),0_20px_44px_-26px_rgba(15,23,42,0.14)] p-4 sm:p-9">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
          {/* 3 Passos (preto e branco, com cor apenas nos pontos) */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
            <div>
              <p className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-subtle mb-2.5">
                <span aria-hidden="true" className="w-2 h-2 rounded-full bg-[#C015FF]" />
                <span>{locale === "pt" ? "1. Objetivos principais" : "1. Main goals"}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {goals.map((item) => {
                  const active = selectedGoals.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSelectedGoals((prev) => toggleInList(prev, item.id))}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm border transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer ${
                        active
                          ? "bg-foreground text-white border-foreground shadow-[0_8px_18px_-12px_rgba(11,15,23,0.45)]"
                          : "bg-white/85 text-muted border-border hover:bg-white hover:text-foreground hover:border-border-light"
                      }`}
                    >
                      {active && (
                        <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-subtle mb-2.5">
                <span aria-hidden="true" className="w-2 h-2 rounded-full bg-[#0069F8]" />
                <span>{locale === "pt" ? "2. Áreas prioritárias" : "2. Priority areas"}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {scopes.map((item) => {
                  const active = selectedScopes.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSelectedScopes((prev) => toggleInList(prev, item.id))}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm border transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer ${
                        active
                          ? "bg-foreground text-white border-foreground shadow-[0_8px_18px_-12px_rgba(11,15,23,0.45)]"
                          : "bg-white/85 text-muted border-border hover:bg-white hover:text-foreground hover:border-border-light"
                      }`}
                    >
                      {active && (
                        <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-subtle mb-2.5">
                <span aria-hidden="true" className="w-2 h-2 rounded-full bg-[#00E8B2]" />
                <span>{locale === "pt" ? "3. Horizonte temporal" : "3. Target timeline"}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {urgencies.map((item) => {
                  const active = selectedUrgency === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSelectedUrgency(item.id)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm border transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer ${
                        active
                          ? "bg-foreground text-white border-foreground shadow-[0_8px_18px_-12px_rgba(11,15,23,0.45)]"
                          : "bg-white/85 text-muted border-border hover:bg-white hover:text-foreground hover:border-border-light"
                      }`}
                    >
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Painel de resumo branco cerâmico com cor apenas nas barras laterais */}
          <div className="lg:col-span-5 rounded-2xl bg-surface/75 backdrop-blur-sm border border-border p-5 sm:p-6 flex flex-col justify-between gap-5">
            <div className="rounded-xl bg-white/95 border border-border p-4 flex flex-col gap-3.5 text-xs leading-relaxed">
              <div>
                <p className="font-bold text-foreground mb-1">
                  {locale === "pt" ? "Objetivos" : "Goals"}
                </p>
                <ul className="pl-3 border-l-2 border-[#C015FF] flex flex-col gap-0.5 text-muted">
                  {activeGoalLabels.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-bold text-foreground mb-1">
                  {locale === "pt" ? "Áreas prioritárias" : "Priority areas"}
                </p>
                <ul className="pl-3 border-l-2 border-[#0069F8] flex flex-col gap-0.5 text-muted">
                  {activeScopeItems.map((s) => (
                    <li key={s.id}>{s.label}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-bold text-foreground mb-1">
                  {locale === "pt" ? "Horizonte" : "Timeline"}
                </p>
                <p className="pl-3 border-l-2 border-[#00E8B2] text-muted">
                  {activeUrgencyLabel}
                </p>
              </div>

              <p className="text-muted pt-2.5 border-t border-border/80">
                {locale === "pt"
                  ? "Gostaria de agendar uma conversa inicial com a midi8 para explorar este projeto."
                  : "I would like to schedule an initial conversation with midi8 to discuss this project."}
              </p>
            </div>

            <Link
              href={contactHref}
              className="cta-button w-full justify-between"
            >
              <span>
                {locale === "pt" ? "Avançar com este resumo" : "Continue with this summary"}
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
