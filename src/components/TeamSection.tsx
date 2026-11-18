"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage, type Locale } from "@/context/LanguageContext";

type Department =
  | "Produto & Tecnologia"
  | "Marketing & Comunicação"
  | "Diagnóstico & Negócio";

interface TeamMember {
  id: string;
  name: string;
  department: Department;
  image: string;
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
    department: "Marketing & Comunicação",
    image: "/team/member-3.jpg",
  },
  {
    id: "joao-miguel-santos-gouveia",
    name: "João Gouveia",
    department: "Produto & Tecnologia",
    image: "/team/member-2.jpg",
  },
  {
    id: "miguel-marques-silva",
    name: "Miguel Silva",
    department: "Produto & Tecnologia",
    image: "/team/member-1.jpg",
  },
  {
    id: "hugo-mateus-sa",
    name: "Hugo Sá",
    department: "Diagnóstico & Negócio",
    image: "/team/member-4.jpg",
  },
  {
    id: "vitor-hugo-carneiro",
    name: "Vitor Carneiro",
    department: "Produto & Tecnologia",
    image: "/team/member-5.jpg",
  },
  {
    id: "goncalo-jose-silva",
    name: "Gonçalo Silva",
    department: "Marketing & Comunicação",
    image: "/team/member-6.jpg",
  },
];

export default function TeamSection() {
  const [selectedDepartment, setSelectedDepartment] = useState<"all" | Department>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { locale } = useLanguage();
  const deptLabels = DEPARTMENT_LABELS[locale];

  return (
    <section
      id="equipa"
      className="w-full py-20 sm:py-28 px-5 sm:px-6 scroll-mt-16"
    >
      <div className="max-w-7xl w-full mx-auto">
        {/* ─── Cabeçalho da secção ─── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 sm:mb-7"
        >
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-foreground leading-[1.05]">
            {locale === "pt" ? (
              <>
                Conheça a <em className="italic font-normal">nossa</em> equipa
              </>
            ) : (
              <>
                Meet <em className="italic font-normal">our</em> team
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-muted max-w-xl leading-relaxed mt-3">
            {locale === "pt"
              ? "Especialistas em tecnologia, comunicação e estratégia."
              : "Specialists in technology, communication, and strategy."}
          </p>
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
                className={`shrink-0 px-3.5 py-1 rounded-full text-xs sm:text-sm font-normal transition-all cursor-pointer border ${
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

        {/* ─── 6 Membros lado a lado proporcionais à secção ─── */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-5 items-end pt-6 pb-2"
          onMouseLeave={() => setActiveIndex(null)}
        >
          {teamMembers.map((member, index) => {
            const isMatch =
              selectedDepartment === "all" || member.department === selectedDepartment;
            const isActive = isMatch && activeIndex === index;
            const translatedDepartment = deptLabels[member.department];

            return (
              <button
                key={member.id}
                type="button"
                tabIndex={isMatch ? 0 : -1}
                aria-hidden={!isMatch}
                onMouseEnter={() => {
                  if (isMatch) setActiveIndex(index);
                }}
                onMouseLeave={() =>
                  setActiveIndex((prev) => (prev === index ? null : prev))
                }
                onFocus={() => {
                  if (isMatch) setActiveIndex(index);
                }}
                onBlur={() =>
                  setActiveIndex((prev) => (prev === index ? null : prev))
                }
                onClick={() => {
                  if (isMatch) setActiveIndex((prev) => (prev === index ? null : index));
                }}
                aria-pressed={isActive}
                className={`group relative flex flex-col items-center text-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none ${
                  !isMatch
                    ? "opacity-25 scale-[0.94] pointer-events-none z-0"
                    : isActive
                      ? "cursor-pointer z-20"
                      : "cursor-pointer z-0"
                }`}
              >
                {/* Retrato em destaque */}
                <div
                  className={`relative isolate w-full aspect-[4/5] rounded-[28px] sm:rounded-[32px] overflow-hidden origin-bottom [transform:translateZ(0)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-visible:ring-2 group-focus-visible:ring-brand-blue group-focus-visible:ring-offset-4 ${
                    isActive
                      ? "scale-[1.11] -translate-y-1.5 bg-[#e4e6eb] shadow-[0_26px_54px_-16px_rgba(15,23,42,0.24)]"
                      : "scale-100 translate-y-0 bg-[#d5d7dc]"
                  }`}
                >
                  <Image
                    src={member.image}
                    alt={`${member.name} — ${translatedDepartment}`}
                    fill
                    sizes="(max-width: 640px) 46vw, (max-width: 768px) 31vw, 220px"
                    className={`object-cover object-top rounded-[28px] sm:rounded-[32px] mix-blend-multiply transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive
                        ? "grayscale-0 contrast-100 opacity-100"
                        : "grayscale contrast-[0.92] opacity-85"
                    }`}
                  />

                  <div
                    className={`pointer-events-none absolute inset-0 rounded-[28px] sm:rounded-[32px] shadow-[inset_0_0_24px_6px_rgba(255,255,255,0.68)] transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  />
                </div>

                {/* Nome e departamento centrados por baixo do retrato */}
                <div className="mt-4 flex flex-col items-center min-h-[42px] w-full px-1">
                  <p
                    className={`font-sans tracking-tight leading-snug transition-all duration-300 ${
                      isActive
                        ? "text-base sm:text-[17px] font-semibold text-foreground"
                        : "text-sm sm:text-[15px] font-medium text-foreground/80"
                    }`}
                  >
                    {member.name}
                  </p>
                  <p
                    className={`text-[11px] sm:text-xs leading-snug mt-0.5 transition-colors duration-300 ${
                      isActive ? "text-foreground/85" : "text-subtle"
                    }`}
                  >
                    {translatedDepartment}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* ─── Linha horizontal inferior com indicador em gradiente ─── */}
        <div className="mt-6 sm:mt-8 h-[1.5px] w-full bg-border overflow-hidden relative">
          <div
            className={`h-full w-1/6 bg-gradient-to-r from-[#A818FF] via-[#145EFF] to-[#00E896] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              activeIndex !== null ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: `translateX(${(activeIndex ?? 0) * 100}%)`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
