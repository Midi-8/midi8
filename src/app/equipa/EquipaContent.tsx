"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import KineticHeading from "@/components/KineticHeading";
import LinkedInIcon from "@/components/LinkedInIcon";
import { TEAM_PROFILES } from "@/components/TeamMemberModal";
import { useLanguage, type Locale } from "@/context/LanguageContext";

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

type Department =
  | "Produto & Tecnologia"
  | "Marketing & Comunicação"
  | "Diagnóstico & Negócio";

const DEPARTMENT_LABELS: Record<Locale, Record<Department, string>> = {
  pt: {
    "Produto & Tecnologia": "Produto & Tecnologia",
    "Marketing & Comunicação": "Marketing & Comunicação",
    "Diagnóstico & Negócio": "Diagnóstico & Negócio",
  },
  en: {
    "Produto & Tecnologia": "Product & Technology",
    "Marketing & Comunicação": "Marketing & Communication",
    "Diagnóstico & Negócio": "Strategy & Business",
  },
};

const DEPARTMENTS: ("all" | Department)[] = [
  "all",
  "Produto & Tecnologia",
  "Marketing & Comunicação",
  "Diagnóstico & Negócio",
];

const MEMBERS: { id: string; shortName: string; initials: string; department: Department }[] = [
  { id: "jose-francisco-pedroso", shortName: "José Pedroso", initials: "JP", department: "Marketing & Comunicação" },
  { id: "joao-miguel-santos-gouveia", shortName: "João Gouveia", initials: "JG", department: "Produto & Tecnologia" },
  { id: "miguel-marques-silva", shortName: "Miguel Silva", initials: "MS", department: "Produto & Tecnologia" },
  { id: "hugo-mateus-sa", shortName: "Hugo Sá", initials: "HS", department: "Diagnóstico & Negócio" },
  { id: "vitor-hugo-carneiro", shortName: "Vitor Carneiro", initials: "VC", department: "Produto & Tecnologia" },
  { id: "goncalo-jose-silva", shortName: "Gonçalo Silva", initials: "GS", department: "Marketing & Comunicação" },
];

export default function EquipaContent() {
  const { locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [selectedDept, setSelectedDept] = useState<"all" | Department>("all");
  const [activeId, setActiveId] = useState<string>(MEMBERS[0].id);
  const deptLabels = DEPARTMENT_LABELS[locale];

  const visibleMembers =
    selectedDept === "all"
      ? MEMBERS
      : MEMBERS.filter((m) => m.department === selectedDept);

  const activeIndex = Math.max(
    0,
    visibleMembers.findIndex((m) => m.id === activeId)
  );
  const activeMember = visibleMembers[activeIndex] ?? visibleMembers[0];
  const profile = activeMember ? TEAM_PROFILES[activeMember.id] : null;
  const certs = profile ? profile.certifications[locale] : [];
  const recs = profile?.recognitions?.[locale] ?? [];

  const stepMember = (delta: number) => {
    if (visibleMembers.length <= 1) return;
    const nextIdx = (activeIndex + delta + visibleMembers.length) % visibleMembers.length;
    setActiveId(visibleMembers[nextIdx].id);
  };

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
              {locale === "pt" ? "Equipa" : "Team"}
            </span>
          </div>

          <div className="max-w-4xl">
            <KineticHeading
              className="type-headline-lg text-foreground mb-3.5 sm:mb-5"
              segments={
                locale === "pt"
                  ? [
                      { text: "Seis mentes. Três " },
                      { text: "disciplinas", italic: true },
                      { text: ". Uma só equipa." },
                    ]
                  : [
                      { text: "Six minds. Three " },
                      { text: "disciplines", italic: true },
                      { text: ". One team." },
                    ]
              }
            />
            <p className="type-body text-muted max-w-2xl text-pretty">
              {locale === "pt"
                ? "Conheça os especialistas que concebem, desenvolvem e acompanham cada projeto de perto - garantindo comunicação direta, rigor técnico e alinhamento estratégico."
                : "Meet the specialists who design, engineer, and oversee every project up close - ensuring direct communication, technical rigor, and strategic alignment."}
            </p>
          </div>

          {/* Filtros por departamento */}
          <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar mt-5 sm:mt-8 pb-1">
            {DEPARTMENTS.map((dept) => {
              const selected = selectedDept === dept;
              const label =
                dept === "all"
                  ? locale === "pt"
                    ? "Todos (6)"
                    : "All (6)"
                  : deptLabels[dept];

              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  aria-pressed={selected}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-normal active:scale-[0.97] transition-all cursor-pointer border ${
                    selected
                      ? "bg-foreground text-white border-foreground"
                      : "bg-white/90 text-muted border-border hover:text-foreground hover:border-border-light"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Palco Interativo da Equipa (Roster + Spotlight) ─── */}
      <section className="relative w-full pt-2 pb-14 sm:pb-28 px-4 sm:px-6 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 studio-dot-grid opacity-55" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
            {/* ─── Esquerda (5 cols): Lista interativa de membros ─── */}
            <div className="lg:col-span-5">
              {/* Dock horizontal compacto em mobile / Lista vertical rica em desktop */}
              <div className="flex lg:flex-col gap-2 sm:gap-2.5 overflow-x-auto lg:overflow-visible no-scrollbar pb-1 lg:pb-0">
                {visibleMembers.map((member) => {
                  const memberProfile = TEAM_PROFILES[member.id];
                  const isActive = member.id === activeMember?.id;
                  const accentRgb = memberProfile?.accentRgb ?? "0, 105, 248";

                  return (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => setActiveId(member.id)}
                      onMouseEnter={() => setActiveId(member.id)}
                      aria-pressed={isActive}
                      style={
                        isActive
                          ? {
                              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.95), 0 18px 34px -22px rgba(${accentRgb}, 0.42)`,
                            }
                          : undefined
                      }
                      className={`group shrink-0 lg:shrink text-left rounded-xl sm:rounded-2xl border p-2.5 sm:p-4 transition-all duration-300 active:scale-[0.98] cursor-pointer flex items-center justify-between gap-2.5 sm:gap-3 ${
                        isActive
                          ? "bg-white border-black/[0.14]"
                          : "bg-white/70 border-black/[0.06] hover:bg-white hover:border-border-light"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        {memberProfile?.image ? (
                          <span
                            style={
                              isActive
                                ? { borderColor: `rgba(${accentRgb}, 0.4)` }
                                : undefined
                            }
                            className="relative w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl overflow-hidden border border-black/[0.08] bg-white shrink-0 transition-all duration-300"
                          >
                            <Image
                              src={memberProfile.image}
                              alt={member.shortName}
                              fill
                              sizes="44px"
                              className="object-cover object-top"
                            />
                          </span>
                        ) : (
                          <span
                            aria-hidden="true"
                            style={
                              isActive
                                ? {
                                    background: `radial-gradient(circle at 30% 25%, rgba(${accentRgb}, 0.22), rgba(${accentRgb}, 0.06) 75%)`,
                                    borderColor: `rgba(${accentRgb}, 0.35)`,
                                  }
                                : undefined
                            }
                            className={`w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl border flex items-center justify-center font-display italic text-sm sm:text-lg shrink-0 transition-all duration-300 ${
                              isActive
                                ? "text-foreground"
                                : "bg-surface border-border text-foreground/70 group-hover:text-foreground"
                            }`}
                          >
                            {member.initials}
                          </span>
                        )}
                        <div className="min-w-0">
                          <p
                            className={`text-xs sm:text-base truncate transition-colors ${
                              isActive
                                ? "font-bold text-foreground"
                                : "font-normal text-foreground/80 group-hover:text-foreground"
                            }`}
                          >
                            {member.shortName}
                          </p>
                          <p className="text-[10px] sm:text-xs text-subtle truncate">
                            {deptLabels[member.department]}
                          </p>
                        </div>
                      </div>

                      <span
                        aria-hidden="true"
                        className={`hidden lg:flex w-7 h-7 rounded-full border items-center justify-center shrink-0 transition-all duration-300 ${
                          isActive
                            ? "bg-foreground border-foreground text-white translate-x-0.5"
                            : "bg-surface/80 border-border text-subtle group-hover:text-foreground"
                        }`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ─── Direita (7 cols): Cartão Spotlight Interativo ─── */}
            <div className="lg:col-span-7 lg:sticky lg:top-24">
              {activeMember && profile && (
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-black/[0.09] bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_2px_6px_rgba(15,23,42,0.05),0_28px_60px_-28px_rgba(15,23,42,0.18)] p-4 sm:p-9 sm:min-h-[420px] flex flex-col justify-between">
                  {/* Glow ambiental que muda de cor com cada membro */}
                  <div
                    aria-hidden="true"
                    style={{
                      background: `radial-gradient(ellipse 68% 60% at 88% 12%, rgba(${profile.accentRgb}, 0.16) 0%, rgba(${profile.accentRgb}, 0.04) 45%, transparent 74%)`,
                    }}
                    className="pointer-events-none absolute inset-0 transition-all duration-500"
                  />

                  {/* Monograma gigante em marca-d'água no fundo */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 bottom-2 font-display italic text-[84px] sm:text-[150px] leading-none tracking-tight text-foreground/[0.04] select-none"
                  >
                    {activeMember.initials}
                  </span>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMember.id}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.28, ease: REVEAL_EASE }}
                      className="relative z-10 flex flex-col justify-between gap-4 sm:gap-6 h-full"
                    >
                      <div className="flex flex-col gap-4 sm:gap-5">
                        {/* Topo: departamento e setas anterior/próximo */}
                        <div className="flex items-center justify-between gap-2 sm:gap-3">
                          <span className="inline-flex items-center rounded-full bg-surface border border-border px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs text-secondary">
                            {deptLabels[activeMember.department]}
                          </span>

                          {visibleMembers.length > 1 && (
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => stepMember(-1)}
                                aria-label={locale === "pt" ? "Membro anterior" : "Previous member"}
                                className="w-8 h-8 rounded-full border border-border bg-white/90 flex items-center justify-center text-foreground hover:bg-foreground hover:text-white hover:border-foreground active:scale-95 transition-all cursor-pointer"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                              </button>
                              <button
                                type="button"
                                onClick={() => stepMember(1)}
                                aria-label={locale === "pt" ? "Próximo membro" : "Next member"}
                                className="w-8 h-8 rounded-full border border-border bg-white/90 flex items-center justify-center text-foreground hover:bg-foreground hover:text-white hover:border-foreground active:scale-95 transition-all cursor-pointer"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Identidade + Formação alinhadas ao lado do retrato (uniforme para todos os membros) */}
                        <div className="grid grid-cols-[104px_1fr] sm:grid-cols-[176px_1fr] gap-x-4 gap-y-3.5 sm:gap-x-6 sm:gap-y-3 items-start">
                          <div className="sm:row-span-2">
                            {profile.image ? (
                              <div className="relative w-[104px] h-[132px] sm:w-[176px] sm:h-[224px] rounded-2xl overflow-hidden bg-white border border-black/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_18px_36px_-20px_rgba(15,23,42,0.22)]">
                                <Image
                                  src={profile.image}
                                  alt={profile.fullName}
                                  fill
                                  sizes="(max-width: 640px) 112px, 192px"
                                  className="object-cover object-top"
                                />
                              </div>
                            ) : (
                              <span
                                aria-hidden="true"
                                style={{
                                  background: `radial-gradient(circle at 30% 25%, rgba(${profile.accentRgb}, 0.2), rgba(${profile.accentRgb}, 0.05) 75%)`,
                                  borderColor: `rgba(${profile.accentRgb}, 0.3)`,
                                }}
                                className="w-[104px] h-[132px] sm:w-[176px] sm:h-[224px] rounded-2xl border flex items-center justify-center font-display italic text-3xl sm:text-5xl text-foreground"
                              >
                                {activeMember.initials}
                              </span>
                            )}
                          </div>

                          <div className="min-w-0 self-center sm:self-start sm:pt-0.5">
                            <h2 className="text-lg sm:text-2xl font-bold text-foreground leading-tight">
                              {profile.fullName}
                            </h2>
                            <p className="text-xs sm:text-sm text-subtle tabular-nums mt-1">
                              {profile.age} {locale === "pt" ? "Anos" : "Years old"}
                            </p>
                            <p className="text-xs sm:text-sm text-muted mt-0.5">
                              {deptLabels[activeMember.department]}
                            </p>
                          </div>

                          {/* Formação diretamente em baixo do departamento */}
                          <div className="col-span-2 sm:col-span-1 sm:col-start-2 rounded-xl sm:rounded-2xl bg-surface/80 border border-border p-3.5 sm:p-4">
                            <p className="text-[10px] uppercase tracking-wider text-subtle mb-1.5">
                              {locale === "pt" ? "Formação" : "Education"}
                            </p>
                            <ul className="flex flex-col gap-1">
                              {profile.education[locale].map((deg) => (
                                <li key={deg} className="text-xs sm:text-sm text-foreground leading-snug">
                                  {deg}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Certificações */}
                        {certs.length > 0 && (
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-subtle mb-2">
                              {locale === "pt" ? "Certificações" : "Certifications"}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {certs.map((cert) =>
                                typeof cert === "string" ? (
                                  <span
                                    key={cert}
                                    className="rounded-full bg-white border border-border px-3 py-1 text-xs text-foreground"
                                  >
                                    {cert}
                                  </span>
                                ) : (
                                  <div
                                    key={cert.title}
                                    className="w-full rounded-xl bg-white border border-border p-3"
                                  >
                                    <p className="text-xs sm:text-sm font-bold text-foreground leading-snug">
                                      {cert.title}
                                    </p>
                                    {(cert.issued || cert.credentialId) && (
                                      <p className="text-[11px] text-subtle mt-0.5">
                                        {[cert.issued, cert.credentialId].filter(Boolean).join(" · ")}
                                      </p>
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        {/* Reconhecimentos */}
                        {recs.length > 0 && (
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-subtle mb-2">
                              {locale === "pt" ? "Reconhecimentos" : "Recognitions"}
                            </p>
                            {recs.map((rec) => (
                              <div
                                key={rec.title}
                                className="rounded-xl bg-white border border-border p-3.5"
                              >
                                <p className="text-xs sm:text-sm font-bold text-foreground leading-snug">
                                  {rec.title}
                                </p>
                                {rec.issuer && (
                                  <p className="text-xs text-secondary mt-0.5">{rec.issuer}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Ações diretas */}
                      <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-2.5 pt-3 sm:pt-4 border-t border-border/80">
                        <a
                          href={profile.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cta-button justify-center"
                        >
                          <LinkedInIcon className="w-4 h-4 shrink-0" />
                          <span>LinkedIn</span>
                        </a>
                        <a
                          href={profile.phoneHref}
                          className="cta-button cta-secondary bg-white/90 justify-center"
                        >
                          <span>{locale === "pt" ? "Ligar" : "Call"}</span>
                        </a>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
