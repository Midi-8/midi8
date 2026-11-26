"use client";

import { useCallback, useState, type PointerEvent } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import KineticHeading from "@/components/KineticHeading";
import { useLanguage, type Locale } from "@/context/LanguageContext";

const TeamMemberModal = dynamic(() => import("@/components/TeamMemberModal"), {
  ssr: false,
});

type Department =
  | "Produto & Tecnologia"
  | "Marketing & Comunicação"
  | "Diagnóstico & Negócio";

interface TeamMember {
  id: string;
  name: string;
  initials: string;
  department: Department;
  accentRgb: string;
}

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

const DEPARTMENTS: { id: "all" | Department }[] = [
  { id: "all" },
  { id: "Produto & Tecnologia" },
  { id: "Marketing & Comunicação" },
  { id: "Diagnóstico & Negócio" },
];

const teamMembers: TeamMember[] = [
  {
    id: "jose-francisco-pedroso",
    name: "José Pedroso",
    initials: "JP",
    department: "Marketing & Comunicação",
    accentRgb: "0, 232, 178",
  },
  {
    id: "joao-miguel-santos-gouveia",
    name: "João Gouveia",
    initials: "JG",
    department: "Produto & Tecnologia",
    accentRgb: "192, 21, 255",
  },
  {
    id: "miguel-marques-silva",
    name: "Miguel Silva",
    initials: "MS",
    department: "Produto & Tecnologia",
    accentRgb: "0, 105, 248",
  },
  {
    id: "hugo-mateus-sa",
    name: "Hugo Sá",
    initials: "HS",
    department: "Diagnóstico & Negócio",
    accentRgb: "0, 105, 248",
  },
  {
    id: "vitor-hugo-carneiro",
    name: "Vitor Carneiro",
    initials: "VC",
    department: "Produto & Tecnologia",
    accentRgb: "192, 21, 255",
  },
  {
    id: "goncalo-jose-silva",
    name: "Gonçalo Silva",
    initials: "GS",
    department: "Marketing & Comunicação",
    accentRgb: "0, 232, 178",
  },
];

const DOCK_SPRING = { stiffness: 260, damping: 24, mass: 0.7 } as const;
const PARALLAX_SPRING = { stiffness: 220, damping: 22, mass: 0.55 } as const;

function TeamMemberCard({
  member,
  index,
  activeIndex,
  isMatch,
  translatedDepartment,
  onActivate,
  onDeactivate,
  onOpen,
}: {
  member: TeamMember;
  index: number;
  activeIndex: number | null;
  isMatch: boolean;
  translatedDepartment: string;
  onActivate: () => void;
  onDeactivate: () => void;
  onOpen: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, PARALLAX_SPRING);
  const smoothY = useSpring(pointerY, PARALLAX_SPRING);

  const tiltX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const tiltY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const imgX = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const imgY = useTransform(smoothY, [-0.5, 0.5], [-5, 5]);

  const isActive = isMatch && activeIndex === index;

  let dockScale = 1;
  let dockY = 0;
  let cardOpacity = 1;

  if (!isMatch) {
    dockScale = 0.94;
    cardOpacity = 0.25;
  } else if (isActive) {
    dockScale = 1.11;
    dockY = -8;
  }

  const handlePointerMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion || !isMatch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    pointerX.set(Math.max(-0.5, Math.min(0.5, (e.clientX - rect.left) / rect.width - 0.5)));
    pointerY.set(Math.max(-0.5, Math.min(0.5, (e.clientY - rect.top) / rect.height - 0.5)));
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.button
      type="button"
      tabIndex={isMatch ? 0 : -1}
      aria-hidden={!isMatch}
      onMouseEnter={onActivate}
      onMouseLeave={() => {
        resetPointer();
        onDeactivate();
      }}
      onPointerMove={handlePointerMove}
      onFocus={onActivate}
      onBlur={() => {
        resetPointer();
        onDeactivate();
      }}
      onClick={onOpen}
      aria-haspopup="dialog"
      animate={{ opacity: cardOpacity }}
      transition={{ duration: 0.3 }}
      style={
        prefersReducedMotion
          ? undefined
          : {
              rotateX: tiltX,
              rotateY: tiltY,
            }
      }
      className={`group relative flex flex-col items-center text-center focus-visible:outline-none ${
        !isMatch
          ? "pointer-events-none z-0"
          : isActive
            ? "cursor-pointer z-20"
            : "cursor-pointer z-0"
      }`}
    >
      {/* Card editorial cerâmico com monograma e indicador clicável ↗ no canto */}
      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: dockScale, y: dockY }
        }
        transition={DOCK_SPRING}
        className="relative w-full aspect-[4/5] origin-bottom will-change-transform"
      >
        <div
          className={`relative isolate w-full h-full rounded-2xl overflow-hidden border [transform:translateZ(0)] transition-[box-shadow,background-color,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-visible:ring-2 group-focus-visible:ring-brand-blue group-focus-visible:ring-offset-4 ${
            isActive
              ? "bg-white border-black/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_2px_4px_rgba(15,23,42,0.05),0_22px_46px_-18px_rgba(15,23,42,0.2)]"
              : "bg-white/95 border-black/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(15,23,42,0.04),0_12px_26px_-18px_rgba(15,23,42,0.12)]"
          }`}
        >
          {/* Gradiente cromático suave de estúdio ao passar o rato */}
          <div
            aria-hidden="true"
            style={{
              background: `radial-gradient(circle at 80% 18%, rgba(${member.accentRgb}, 0.14) 0%, rgba(${member.accentRgb}, 0.04) 42%, transparent 72%)`,
            }}
            className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
              isActive ? "opacity-100" : "opacity-45"
            }`}
          />

          {/* Indicador clicável ↗ no canto superior direito */}
          <span
            aria-hidden="true"
            className={`absolute top-2 right-2 sm:top-3.5 sm:right-3.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isActive
                ? "bg-foreground border-foreground text-white shadow-xs"
                : "bg-surface/90 border-border text-muted group-hover:text-foreground"
            }`}
          >
            <svg
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive ? "translate-x-[1px] -translate-y-[1px]" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.9}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
            </svg>
          </span>

          {/* Monograma editorial centrado com paralaxe suave */}
          <motion.div
            aria-hidden="true"
            style={prefersReducedMotion ? undefined : { x: imgX, y: imgY }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <span
              className={`font-display italic font-normal text-3xl sm:text-5xl tracking-tight leading-none transition-all duration-300 ${
                isActive ? "text-foreground scale-105" : "text-foreground/75"
              }`}
            >
              {member.initials}
            </span>
          </motion.div>

          {/* Barra inferior fina que ganha nitidez no hover */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-3 sm:inset-x-4 bottom-2.5 sm:bottom-3.5 h-px transition-colors duration-300 ${
              isActive ? "bg-foreground/20" : "bg-border/70"
            }`}
          />
        </div>
      </motion.div>

      {/* Nome e departamento centrados por baixo do retrato */}
      <div className="mt-2 sm:mt-4 flex flex-col items-center min-h-[34px] sm:min-h-[42px] w-full px-0.5 sm:px-1">
        <p
          className={`font-sans tracking-tight leading-snug transition-all duration-300 ${
            isActive
              ? "text-[12.5px] sm:text-[17px] font-bold text-foreground"
              : "text-[11.5px] sm:text-[15px] font-normal text-foreground/80"
          }`}
        >
          {member.name}
        </p>
        <p
          className={`text-[9.5px] sm:text-xs leading-tight mt-0.5 transition-colors duration-300 ${
            isActive ? "text-foreground/85" : "text-subtle"
          }`}
        >
          {translatedDepartment}
        </p>
      </div>
    </motion.button>
  );
}

export default function TeamSection() {
  const [selectedDepartment, setSelectedDepartment] = useState<"all" | Department>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [hasOpenedModal, setHasOpenedModal] = useState(false);
  const { locale } = useLanguage();
  const deptLabels = DEPARTMENT_LABELS[locale];

  // Navegação dentro do pop-up apenas pelos membros visíveis no filtro atual
  const visibleMembers = teamMembers.filter(
    (m) => selectedDepartment === "all" || m.department === selectedDepartment
  );
  const openPos = visibleMembers.findIndex((m) => m.id === openId);
  const openMember = openPos >= 0 ? visibleMembers[openPos] : null;

  const closeModal = useCallback(() => setOpenId(null), []);
  const goPrev = useCallback(() => {
    if (openPos > 0) setOpenId(visibleMembers[openPos - 1].id);
  }, [openPos, visibleMembers]);
  const goNext = useCallback(() => {
    if (openPos >= 0 && openPos < visibleMembers.length - 1) {
      setOpenId(visibleMembers[openPos + 1].id);
    }
  }, [openPos, visibleMembers]);

  return (
    <section
      id="equipa"
      className="w-full py-14 sm:py-28 px-4 sm:px-6 scroll-mt-16"
    >
      <div className="max-w-7xl w-full mx-auto">
        {/* ─── Cabeçalho da secção ─── */}
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
                  ? [
                      { text: "Conheça a " },
                      { text: "nossa", italic: true },
                      { text: " equipa" },
                    ]
                  : [
                      { text: "Meet " },
                      { text: "our", italic: true },
                      { text: " team" },
                    ]
              }
            />
            <p className="type-body text-muted max-w-xl mt-3 text-pretty">
              {locale === "pt"
                ? "Especialistas multidisciplinares em tecnologia, negócio e comunicação, focados em entregas de elevado rigor."
                : "Multidisciplinary specialists across technology, business, and communication focused on high-rigor delivery."}
            </p>
          </div>
          <Link
            href="/equipa"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted hover:text-foreground transition-colors shrink-0 w-fit"
          >
            <span>{locale === "pt" ? "Ver perfis completos" : "View full profiles"}</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </motion.div>

        {/* ─── Filtros por departamento ─── */}
        <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar mb-8 sm:mb-10 pb-1">
          {DEPARTMENTS.map((dept) => {
            const selected = selectedDepartment === dept.id;
            const label =
              dept.id === "all"
                ? locale === "pt"
                  ? "Todos (6)"
                  : "All (6)"
                : deptLabels[dept.id];

            return (
              <button
                key={dept.id}
                type="button"
                onClick={() => {
                  setSelectedDepartment(dept.id);
                  setActiveIndex(null);
                }}
                aria-pressed={selected}
                className={`shrink-0 px-3.5 py-1 rounded-full text-xs sm:text-sm font-normal active:scale-[0.97] transition-all cursor-pointer border ${
                  selected
                    ? "bg-foreground text-white border-foreground"
                    : "bg-surface text-muted border-transparent hover:text-foreground hover:bg-surface-light"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* ─── 6 Membros lado a lado em perspetiva 3D Dock ─── */}
        <div
          style={{ perspective: 1000 }}
          className="grid grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-5 items-end pt-3 sm:pt-6 pb-2"
          onMouseLeave={() => setActiveIndex(null)}
        >
          {teamMembers.map((member, index) => {
            const isMatch =
              selectedDepartment === "all" || member.department === selectedDepartment;

            return (
              <TeamMemberCard
                key={member.id}
                member={member}
                index={index}
                activeIndex={activeIndex}
                isMatch={isMatch}
                translatedDepartment={deptLabels[member.department]}
                onActivate={() => {
                  if (isMatch) setActiveIndex(index);
                }}
                onDeactivate={() =>
                  setActiveIndex((prev) => (prev === index ? null : prev))
                }
                onOpen={() => {
                  if (isMatch) {
                    setHasOpenedModal(true);
                    setOpenId(member.id);
                  }
                }}
              />
            );
          })}
        </div>

        {/* ─── Linha horizontal inferior com indicador em gradiente (apenas desktop) ─── */}
        <div className="hidden md:block mt-6 sm:mt-8 h-[1.5px] w-full bg-border overflow-hidden relative">
          <div
            className={`h-full w-1/6 bg-gradient-to-r from-[#C015FF] via-[#0069F8] to-[#00E8B2] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              activeIndex !== null ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: `translateX(${(activeIndex ?? 0) * 100}%)`,
            }}
          />
        </div>
      </div>

      {hasOpenedModal && (
        <TeamMemberModal
          member={
            openMember
              ? {
                  id: openMember.id,
                  name: openMember.name,
                  initials: openMember.initials,
                  department: deptLabels[openMember.department],
                }
              : null
          }
          locale={locale}
          onClose={closeModal}
          onPrev={openPos > 0 ? goPrev : undefined}
          onNext={openPos >= 0 && openPos < visibleMembers.length - 1 ? goNext : undefined}
        />
      )}
    </section>
  );
}
