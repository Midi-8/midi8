"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import KineticHeading from "@/components/KineticHeading";
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

const MEMBERS: { id: string; initials: string; department: Department }[] = [
  { id: "jose-francisco-pedroso", initials: "JP", department: "Marketing & Comunicação" },
  { id: "joao-miguel-santos-gouveia", initials: "JG", department: "Produto & Tecnologia" },
  { id: "miguel-marques-silva", initials: "MS", department: "Produto & Tecnologia" },
  { id: "hugo-mateus-sa", initials: "HS", department: "Diagnóstico & Negócio" },
  { id: "vitor-hugo-carneiro", initials: "VC", department: "Produto & Tecnologia" },
  { id: "goncalo-jose-silva", initials: "GS", department: "Marketing & Comunicação" },
];

const DISCIPLINES: Record<Locale, { title: string; count: string; desc: string }[]> = {
  pt: [
    {
      title: "Produto & Tecnologia",
      count: "3 especialistas",
      desc: "Engenharia web, software à medida, ciência de dados, IA, automação e plataformas de e-commerce.",
    },
    {
      title: "Marketing & Comunicação",
      count: "2 especialistas",
      desc: "Posicionamento de marca, narrativa editorial, produção audiovisual, redes sociais e campanhas de performance.",
    },
    {
      title: "Diagnóstico & Negócio",
      count: "1 especialista",
      desc: "Análise de processos, viabilidade económica, modelos analíticos e estratégia de crescimento empresarial.",
    },
  ],
  en: [
    {
      title: "Product & Technology",
      count: "3 specialists",
      desc: "Web engineering, custom software, data science, AI, automation, and e-commerce platforms.",
    },
    {
      title: "Marketing & Communication",
      count: "2 specialists",
      desc: "Brand positioning, editorial narrative, audiovisual craft, social media, and performance campaigns.",
    },
    {
      title: "Strategy & Business",
      count: "1 specialist",
      desc: "Process analysis, business feasibility, econometric modeling, and commercial growth strategy.",
    },
  ],
};

export default function EquipaContent() {
  const { locale } = useLanguage();
  const [selectedDept, setSelectedDept] = useState<"all" | Department>("all");
  const deptLabels = DEPARTMENT_LABELS[locale];

  const visibleMembers =
    selectedDept === "all"
      ? MEMBERS
      : MEMBERS.filter((m) => m.department === selectedDept);

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
              {locale === "pt" ? "Equipa" : "Team"}
            </span>
          </div>

          <div className="max-w-4xl">
            <KineticHeading
              className="type-headline-lg text-foreground mb-5"
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
                ? "Fala diretamente com quem desenha, programa e escala o seu projeto - sem camadas intermédias."
                : "Speak directly with the people who design, engineer, and scale your project - zero middle layers."}
            </p>
          </div>

          {/* Filtros */}
          <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar mt-8 pb-1">
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

      {/* ─── Perfis Detalhados ─── */}
      <section className="relative w-full py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 studio-dot-grid opacity-55" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {visibleMembers.map((item, idx) => {
              const profile = TEAM_PROFILES[item.id];
              if (!profile) return null;
              const certs = profile.certifications[locale];
              const recs = profile.recognitions?.[locale] ?? [];

              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: (idx % 3) * 0.05, ease: REVEAL_EASE }}
                  className="relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(15,23,42,0.04),0_16px_34px_-22px_rgba(15,23,42,0.14)] p-5 sm:p-6 flex flex-col justify-between gap-5"
                >
                  <div
                    aria-hidden="true"
                    style={{
                      background: `radial-gradient(circle at 90% 10%, rgba(${profile.accentRgb}, 0.11) 0%, transparent 55%)`,
                    }}
                    className="pointer-events-none absolute inset-0"
                  />

                  <div className="relative z-10 flex flex-col gap-4">
                    {/* Topo: monograma + departamento + idade */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center rounded-full bg-surface border border-border px-2.5 py-0.5 text-[11px] text-secondary">
                        {deptLabels[item.department]}
                      </span>
                      <span className="text-xs text-subtle tabular-nums">
                        {profile.age} {locale === "pt" ? "Anos" : "Years old"}
                      </span>
                    </div>

                    {/* Nome + Monograma */}
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="w-11 h-11 rounded-xl bg-surface border border-border flex items-center justify-center italic text-lg text-foreground shrink-0"
                      >
                        {item.initials}
                      </span>
                      <h2 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                        {profile.fullName}
                      </h2>
                    </div>

                    {/* Formação */}
                    <div className="rounded-xl bg-surface/75 border border-border p-3.5">
                      <p className="text-[10px] uppercase tracking-wider text-subtle mb-1">
                        {locale === "pt" ? "Formação" : "Education"}
                      </p>
                      <ul className="flex flex-col gap-1">
                        {profile.education[locale].map((deg) => (
                          <li key={deg} className="text-xs text-foreground leading-snug">
                            {deg}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Certificações */}
                    {certs.length > 0 && (
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-subtle mb-1.5">
                          {locale === "pt" ? "Certificações" : "Certifications"}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {certs.map((cert) =>
                            typeof cert === "string" ? (
                              <span
                                key={cert}
                                className="rounded-full bg-white border border-border px-2.5 py-1 text-[11px] text-foreground"
                              >
                                {cert}
                              </span>
                            ) : (
                              <div
                                key={cert.title}
                                className="w-full rounded-xl bg-white border border-border p-2.5"
                              >
                                <p className="text-xs font-bold text-foreground leading-snug">
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
                        <p className="text-[10px] uppercase tracking-wider text-subtle mb-1.5">
                          {locale === "pt" ? "Reconhecimentos" : "Recognitions"}
                        </p>
                        {recs.map((rec) => (
                          <div
                            key={rec.title}
                            className="rounded-xl bg-white border border-border p-2.5"
                          >
                            <p className="text-xs font-bold text-foreground leading-snug">
                              {rec.title}
                            </p>
                            {rec.issuer && (
                              <p className="text-[11px] text-secondary mt-0.5">{rec.issuer}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Contactos diretos */}
                  <div className="relative z-10 grid grid-cols-2 gap-2 pt-3 border-t border-border/80">
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-surface border border-border py-2 px-3 text-xs text-foreground hover:bg-foreground hover:text-white hover:border-foreground active:scale-[0.98] transition-all"
                    >
                      <span>LinkedIn</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                    <a
                      href={profile.phoneHref}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-surface border border-border py-2 px-3 text-xs text-foreground hover:bg-foreground hover:text-white hover:border-foreground active:scale-[0.98] transition-all truncate"
                    >
                      <span>{locale === "pt" ? "Ligar" : "Call"}</span>
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Como as 3 Disciplinas Colaboram ─── */}
      <section className="w-full py-14 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <p className="type-label text-subtle mb-2">
                {locale === "pt" ? "Estrutura Multidisciplinar" : "Multidisciplinary Structure"}
              </p>
              <h2 className="type-headline-md text-foreground">
                {locale === "pt"
                  ? "Sem silos entre estratégia, código e comunicação."
                  : "No silos between strategy, code, and communication."}
              </h2>
            </div>
            <Link href="/contacto" className="cta-button shrink-0 w-fit">
              {locale === "pt" ? "Trabalhar connosco" : "Work with us"}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {DISCIPLINES[locale].map((d) => (
              <div
                key={d.title}
                className="rounded-2xl border border-black/[0.08] bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(15,23,42,0.04),0_14px_30px_-22px_rgba(15,23,42,0.12)] p-6"
              >
                <p className="text-xs text-subtle mb-2">{d.count}</p>
                <h3 className="text-lg font-bold text-foreground mb-2">{d.title}</h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed text-pretty">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
