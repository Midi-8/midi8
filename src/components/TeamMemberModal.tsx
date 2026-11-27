"use client";

import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type PointerEvent,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Locale } from "@/context/LanguageContext";

/* ─────────────────────────────────────────────────────────────────────────
   Perfis da equipa - estrutura com os campos oficiais:
   Departamento · Nome completo · Idade · Formação · Certificações · LinkedIn · Telemóvel
   ───────────────────────────────────────────────────────────────────────── */

type Localized<T> = Record<Locale, T>;

export interface CertificationItem {
  title: string;
  issuer?: string;
  issued?: string;
  credentialId?: string;
}

export interface TeamProfile {
  fullName: string;
  age: number;
  education: Localized<string[]>;
  certifications: Localized<(string | CertificationItem)[]>;
  recognitions?: Localized<CertificationItem[]>;
  linkedinHandle: string;
  linkedinUrl: string;
  phone: string;
  phoneHref: string;
  accentRgb: string;
  image?: string;
}

export const TEAM_PROFILES: Record<string, TeamProfile> = {
  "jose-francisco-pedroso": {
    fullName: "José Francisco Rodrigues Sousa Pedroso",
    age: 20,
    education: {
      pt: ["Licenciatura em Ciências da Comunicação"],
      en: ["BSc in Communication Sciences"],
    },
    certifications: {
      pt: [],
      en: [],
    },
    recognitions: {
      pt: [
        {
          title: "Seleção Oficial: Documentário \"Fio Condutor\"",
          issuer: "Exposição Interwoven Journeys - Tallinn People’s Museum, Estónia",
        },
      ],
      en: [
        {
          title: "Official Selection: Documentary \"Fio Condutor\"",
          issuer: "Interwoven Journeys exhibition - Tallinn People’s Museum, Estonia",
        },
      ],
    },
    linkedinHandle: "linkedin.com/in/josé-pedroso",
    linkedinUrl: "https://www.linkedin.com/in/jos%C3%A9-pedroso-46663b396",
    phone: "+351 929 332 271",
    phoneHref: "tel:+351929332271",
    accentRgb: "0, 232, 178",
    image: "/team/jose-pedroso.webp",
  },
  "joao-miguel-santos-gouveia": {
    fullName: "João Miguel Santos Gouveia",
    age: 21,
    education: {
      pt: ["CTeSP em E-Commerce"],
      en: ["Higher Technical Degree (CTeSP) in E-Commerce"],
    },
    certifications: {
      pt: [],
      en: [],
    },
    linkedinHandle: "linkedin.com/in/joão-gouveia",
    linkedinUrl: "https://www.linkedin.com/in/jo%C3%A3o-gouveia-7baba4385",
    phone: "+351 919 464 665",
    phoneHref: "tel:+351919464665",
    accentRgb: "192, 21, 255",
    image: "/team/joao-gouveia.webp",
  },
  "miguel-marques-silva": {
    fullName: "Miguel Marques Silva",
    age: 21,
    education: {
      pt: [
        "Licenciatura em Engenharia e Gestão de Sistemas de Informação",
        "Mestrado em Engenharia e Ciências de Dados",
      ],
      en: [
        "BSc in Information Systems Engineering & Management",
        "MSc in Data Science & Engineering",
      ],
    },
    certifications: {
      pt: [
        {
          title: "Cambridge English: C1 Advanced (CAE)",
          issuer: "Cambridge University Press and Assessment English",
          issued: "Issued Oct 2024",
          credentialId: "Credential ID C9105203",
        },
      ],
      en: [
        {
          title: "Cambridge English: C1 Advanced (CAE)",
          issuer: "Cambridge University Press and Assessment English",
          issued: "Issued Oct 2024",
          credentialId: "Credential ID C9105203",
        },
      ],
    },
    linkedinHandle: "linkedin.com/in/miguel-marques-silva",
    linkedinUrl: "https://www.linkedin.com/in/miguel-marques-silva",
    phone: "+351 930 426 057",
    phoneHref: "tel:+351930426057",
    accentRgb: "0, 105, 248",
    image: "/team/miguel-silva.webp",
  },
  "hugo-mateus-sa": {
    fullName: "Hugo Mateus Ferreira Sá",
    age: 21,
    education: {
      pt: [
        "Licenciatura em Administração Pública",
        "Mestrado em Gestão e Negócios",
      ],
      en: [
        "BSc in Public Administration",
        "MSc in Management & Business",
      ],
    },
    certifications: {
      pt: [
        "Excel II - Advanced User",
        "STATA & Applied Econometrics",
      ],
      en: [
        "Excel II - Advanced User",
        "STATA & Applied Econometrics",
      ],
    },
    linkedinHandle: "linkedin.com/in/hugo-sá",
    linkedinUrl: "https://www.linkedin.com/in/hugo-s%C3%A1-924b9332a/",
    phone: "+351 911 764 432",
    phoneHref: "tel:+351911764432",
    accentRgb: "0, 105, 248",
    image: "/team/member-4.webp",
  },
  "vitor-hugo-carneiro": {
    fullName: "Vitor Hugo Marques Carneiro",
    age: 21,
    education: {
      pt: ["Licenciatura em Engenharia Informática"],
      en: ["BSc in Computer Engineering"],
    },
    certifications: {
      pt: [],
      en: [],
    },
    linkedinHandle: "linkedin.com/in/vitor-carneiro0",
    linkedinUrl: "https://www.linkedin.com/in/vitor-carneiro0/",
    phone: "+351 964 234 045",
    phoneHref: "tel:+351964234045",
    accentRgb: "192, 21, 255",
    image: "/team/vitor-carneiro.webp",
  },
  "goncalo-jose-silva": {
    fullName: "Gonçalo José Cunha da Silva",
    age: 21,
    education: {
      pt: ["Licenciatura em Marketing"],
      en: ["BSc in Marketing"],
    },
    certifications: {
      pt: [
        {
          title: "Cambridge English: B2 First (FCE)",
          issuer: "Cambridge University Press and Assessment English",
          issued: "Issued 23/09/2022",
          credentialId: "Credential ID C0036656",
        },
      ],
      en: [
        {
          title: "Cambridge English: B2 First (FCE)",
          issuer: "Cambridge University Press and Assessment English",
          issued: "Issued 23/09/2022",
          credentialId: "Credential ID C0036656",
        },
      ],
    },
    linkedinHandle: "linkedin.com/in/gonçalo-silva",
    linkedinUrl: "https://www.linkedin.com/in/gon%C3%A7alo-silva-83a632433",
    phone: "+351 926 538 871",
    phoneHref: "tel:+351926538871",
    accentRgb: "0, 232, 178",
    image: "/team/goncalo-silva.webp",
  },
};

const COPY = {
  pt: {
    department: "Departamento",
    ageLabel: "Idade",
    yearsUnit: "Anos",
    education: "Formação",
    certifications: "Certificações",
    recognitions: "Reconhecimentos",
    linkedin: "LinkedIn",
    phone: "Telemóvel",
    close: "Fechar",
    prev: "Membro anterior",
    next: "Próximo membro",
  },
  en: {
    department: "Department",
    ageLabel: "Age",
    yearsUnit: "Years old",
    education: "Education",
    certifications: "Certifications",
    recognitions: "Recognitions",
    linkedin: "LinkedIn",
    phone: "Mobile",
    close: "Close",
    prev: "Previous member",
    next: "Next member",
  },
} as const;

export interface ModalMember {
  id: string;
  name: string;
  initials: string;
  department: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const SPRING_CONFIG = { stiffness: 240, damping: 26 } as const;
const noopSubscribe = () => () => { };

export default function TeamMemberModal({
  member,
  locale,
  onClose,
  onPrev,
  onNext,
}: {
  member: ModalMember | null;
  locale: Locale;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = member !== null;
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );

  // Reflexo especular cerâmico igual ao PillarCard3D
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const hoverTarget = useMotionValue(0);
  const smoothX = useSpring(pointerX, SPRING_CONFIG);
  const smoothY = useSpring(pointerY, SPRING_CONFIG);
  const hoverAmount = useSpring(hoverTarget, SPRING_CONFIG);

  const profile = member ? TEAM_PROFILES[member.id] : undefined;
  const accentRgb = profile?.accentRgb ?? "0, 105, 248";

  const glareX = useTransform(smoothX, [-0.5, 0.5], [10, 90]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], [10, 90]);
  const glareBackground = useMotionTemplate`radial-gradient(circle 340px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.9) 0%, rgba(${accentRgb}, 0.08) 42%, rgba(255, 255, 255, 0) 76%)`;

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(Math.max(-0.5, Math.min(0.5, nx)));
    pointerY.set(Math.max(-0.5, Math.min(0.5, ny)));
    hoverTarget.set(1);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
    hoverTarget.set(0);
  };

  const handlersRef = useRef({ onClose, onPrev, onNext });
  useEffect(() => {
    handlersRef.current = { onClose, onPrev, onNext };
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      const h = handlersRef.current;
      if (e.key === "Escape") h.onClose();
      else if (e.key === "ArrowLeft") h.onPrev?.();
      else if (e.key === "ArrowRight") h.onNext?.();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  if (!mounted) return null;

  const copy = COPY[locale];

  return createPortal(
    <AnimatePresence>
      {member && profile && (
        <motion.div
          key="team-modal-root"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          {/* Véu de fundo translúcido coerente com o estúdio claro */}
          <button
            type="button"
            aria-label={copy.close}
            onClick={onClose}
            className="absolute inset-0 bg-[#0b0f17]/35 backdrop-blur-md cursor-default"
          />

          {/* Cartão com a mesma linguagem cerâmica dos PillarCard3D / neu-panel (rounded-2xl) */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-modal-name"
            data-lenis-prevent
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 18, scale: 0.97 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 12, scale: 0.98 }
            }
            transition={{ duration: 0.35, ease: EASE }}
            className="relative w-full max-w-[540px] max-h-[88dvh] overflow-y-auto no-scrollbar rounded-2xl bg-white/96 border border-black/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_2px_6px_rgba(15,23,42,0.06),0_32px_76px_-22px_rgba(15,23,42,0.28)] p-4 sm:p-7"
          >
            {/* Reflexo especular dinâmico igual aos cards da página */}
            <motion.div
              aria-hidden="true"
              style={
                prefersReducedMotion
                  ? undefined
                  : { background: glareBackground, opacity: hoverAmount }
              }
              className="pointer-events-none absolute inset-0 rounded-2xl"
            />

            {/* Barra de topo com Departamento (sem bola) + Navegação e Fechar */}
            <div className="relative z-10 flex items-center justify-between gap-3 pb-3 mb-4 sm:pb-4 sm:mb-5 border-b border-border">
              <div className="inline-flex items-center rounded-full bg-surface border border-border px-3 py-1">
                <span className="text-[11px] font-sans uppercase tracking-wider text-secondary">
                  {member.department}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {(onPrev || onNext) && (
                  <>
                    <button
                      type="button"
                      onClick={onPrev}
                      disabled={!onPrev}
                      aria-label={copy.prev}
                      className="flex h-8 w-8 items-center justify-center rounded-xl bg-surface border border-border text-foreground hover:bg-surface-light hover:border-border-light disabled:opacity-35 transition-colors cursor-pointer"
                    >
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={onNext}
                      disabled={!onNext}
                      aria-label={copy.next}
                      className="flex h-8 w-8 items-center justify-center rounded-xl bg-surface border border-border text-foreground hover:bg-surface-light hover:border-border-light disabled:opacity-35 transition-colors cursor-pointer"
                    >
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </button>
                  </>
                )}

                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label={copy.close}
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-surface border border-border text-foreground hover:bg-foreground hover:text-white hover:border-foreground transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Corpo do Card */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="relative z-10 flex flex-col gap-3.5 sm:gap-4 min-w-0"
              >
                {/* ─── Retrato/Monograma + Nome completo + Idade ─── */}
                <div className="flex items-center gap-3.5 min-w-0">
                  {profile.image ? (
                    <div className="relative w-12 h-14 sm:w-14 sm:h-16 rounded-xl overflow-hidden bg-white border border-black/[0.08] shadow-2xs shrink-0">
                      <Image
                        src={profile.image}
                        alt={profile.fullName}
                        fill
                        sizes="64px"
                        className="object-cover object-top"
                      />
                    </div>
                  ) : (
                    <span
                      aria-hidden="true"
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-surface border border-border flex items-center justify-center font-display italic text-lg sm:text-xl text-foreground shrink-0"
                    >
                      {member.initials}
                    </span>
                  )}
                  <div className="min-w-0">
                    <h3
                      id="team-modal-name"
                      className="font-sans text-lg sm:text-2xl font-bold tracking-tight text-foreground leading-snug"
                    >
                      {profile.fullName}
                    </h3>
                    <p className="text-xs sm:text-sm text-subtle tabular-nums mt-0.5">
                      {profile.age} {copy.yearsUnit}
                    </p>
                  </div>
                </div>

                  {/* Formação */}
                  <div className="rounded-xl bg-surface/75 border border-border p-3.5">
                    <div className="flex items-start gap-3">
                      <span className="w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center text-foreground shrink-0">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.6}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                          />
                        </svg>
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] uppercase tracking-wider text-subtle">
                          {copy.education}
                        </p>
                        <ul className="mt-1 flex flex-col gap-1">
                          {profile.education[locale].map((degree) => (
                            <li
                              key={degree}
                              className="text-xs sm:text-[13px] font-normal text-foreground leading-snug"
                            >
                              {degree}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Certificações (mostrado apenas quando existem certificações) */}
                  {profile.certifications[locale].length > 0 && (
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-subtle mb-2">
                        {copy.certifications}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {profile.certifications[locale].map((cert) => {
                          if (typeof cert === "string") {
                            return (
                              <span
                                key={cert}
                                className="inline-flex items-center rounded-full bg-white border border-border px-2.5 py-1 text-[11px] text-foreground shadow-2xs"
                              >
                                {cert}
                              </span>
                            );
                          }
                          return (
                            <div
                              key={cert.title}
                              className="w-full rounded-xl bg-white border border-border p-3 shadow-2xs"
                            >
                              <p className="text-xs sm:text-[13px] font-bold text-foreground leading-snug">
                                {cert.title}
                              </p>
                              {cert.issuer && (
                                <p className="text-[11px] text-secondary mt-0.5">
                                  {cert.issuer}
                                </p>
                              )}
                              {(cert.issued || cert.credentialId) && (
                                <p className="text-[11px] text-subtle mt-1">
                                  {[cert.issued, cert.credentialId]
                                    .filter(Boolean)
                                    .join(" · ")}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Reconhecimentos (apenas quando existem) */}
                  {profile.recognitions && profile.recognitions[locale].length > 0 && (
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-subtle mb-2">
                        {copy.recognitions}
                      </p>
                      <div className="flex flex-col gap-2">
                        {profile.recognitions[locale].map((rec) => (
                          <div
                            key={rec.title}
                            className="w-full rounded-xl bg-white border border-border p-3 shadow-2xs"
                          >
                            <p className="text-xs sm:text-[13px] font-bold text-foreground leading-snug">
                              {rec.title}
                            </p>
                            {rec.issuer && (
                              <p className="text-[11px] text-secondary mt-0.5">{rec.issuer}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* LinkedIn & Número de Telemóvel (mesmo estilo dos cards de contacto da página) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-border bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-light hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_14px_28px_-18px_rgba(15,23,42,0.16)] active:scale-[0.98]"
                    >
                      <span className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-foreground shrink-0 transition-colors group-hover:bg-foreground group-hover:text-white group-hover:border-foreground">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
                        </svg>
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-wider text-subtle">
                          {copy.linkedin}
                        </p>
                        <p className="text-xs font-normal text-foreground truncate">
                          {profile.linkedinHandle}
                        </p>
                      </div>
                    </a>

                    <a
                      href={profile.phoneHref}
                      className="group flex items-center gap-3 rounded-xl border border-border bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-light hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_14px_28px_-18px_rgba(15,23,42,0.16)] active:scale-[0.98]"
                    >
                      <span className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-foreground shrink-0 transition-colors group-hover:bg-foreground group-hover:text-white group-hover:border-foreground">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.7}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                          />
                        </svg>
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-wider text-subtle">
                          {copy.phone}
                        </p>
                        <p className="text-xs font-normal text-foreground truncate">
                          {profile.phone}
                        </p>
                      </div>
                    </a>
                  </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
