"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ParallaxPlane } from "@/components/StageParallax";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  auroraGradient: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "sofia-andrade",
    name: "Sofia Andrade",
    role: "Design de Produto & Web",
    image: "/team/member-1.jpg",
    auroraGradient:
      "radial-gradient(ellipse 85% 75% at 15% 15%, rgba(168, 24, 255, 0.24), transparent 65%), radial-gradient(ellipse 85% 75% at 88% 82%, rgba(20, 94, 255, 0.2), transparent 65%), #f7f4fc",
  },
  {
    id: "diogo-ferreira",
    name: "Diogo Ferreira",
    role: "Arquitetura & Software",
    image: "/team/member-2.jpg",
    auroraGradient:
      "radial-gradient(ellipse 85% 75% at 18% 20%, rgba(20, 94, 255, 0.22), transparent 65%), radial-gradient(ellipse 85% 75% at 85% 80%, rgba(0, 232, 150, 0.22), transparent 65%), #f2f6fc",
  },
  {
    id: "mariana-lopes",
    name: "Mariana Lopes",
    role: "Direção Criativa & Estratégia",
    image: "/team/member-3.jpg",
    auroraGradient:
      "radial-gradient(ellipse 75% 80% at 12% 35%, rgba(255, 224, 185, 0.55), transparent 62%), radial-gradient(ellipse 80% 80% at 88% 25%, rgba(168, 24, 255, 0.24), transparent 65%), radial-gradient(ellipse 80% 70% at 65% 88%, rgba(0, 232, 150, 0.2), transparent 65%), #faf7f5",
  },
  {
    id: "ines-carvalho",
    name: "Inês Carvalho",
    role: "IA, Automação & Dados",
    image: "/team/member-4.jpg",
    auroraGradient:
      "radial-gradient(ellipse 85% 75% at 85% 18%, rgba(168, 24, 255, 0.24), transparent 65%), radial-gradient(ellipse 85% 75% at 15% 82%, rgba(0, 232, 150, 0.22), transparent 65%), #f6f4fb",
  },
  {
    id: "tomas-ribeiro",
    name: "Tomás Ribeiro",
    role: "Growth, Media & E-commerce",
    image: "/team/member-5.jpg",
    auroraGradient:
      "radial-gradient(ellipse 85% 75% at 18% 25%, rgba(0, 232, 150, 0.24), transparent 65%), radial-gradient(ellipse 85% 75% at 85% 80%, rgba(20, 94, 255, 0.2), transparent 65%), #f2faf7",
  },
];

// Desnível vertical em arco no desktop (extremidades mais baixas, centro destacado)
const desktopArchOffsets = [
  "lg:translate-y-6",
  "lg:translate-y-2",
  "lg:-translate-y-2",
  "lg:translate-y-2",
  "lg:translate-y-6",
] as const;

function DotMatrixCross({
  idPrefix,
  className,
  palette = "left",
}: {
  idPrefix: string;
  className?: string;
  palette?: "left" | "right";
}) {
  const patternId = `${idPrefix}-dot-pattern`;
  const gradId = `${idPrefix}-dot-grad`;
  const radialId = `${idPrefix}-dot-fade`;
  const crossMaskId = `${idPrefix}-cross-mask`;
  const dotsMaskId = `${idPrefix}-dots-mask`;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 240"
      className={className}
      fill="none"
    >
      <defs>
        <pattern
          id={patternId}
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="4" cy="4" r="1.5" fill="white" />
        </pattern>

        <linearGradient
          id={gradId}
          x1={palette === "left" ? "0%" : "100%"}
          y1="0%"
          x2={palette === "left" ? "100%" : "0%"}
          y2="100%"
        >
          <stop offset="0%" stopColor="#A818FF" stopOpacity="0.65" />
          <stop offset="52%" stopColor="#145EFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#00E896" stopOpacity="0.6" />
        </linearGradient>

        <radialGradient id={radialId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="58%" stopColor="white" stopOpacity="0.55" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        <mask id={crossMaskId}>
          <rect width="240" height="240" fill="black" />
          <g fill={`url(#${radialId})`}>
            <rect x="0" y="76" width="240" height="88" rx="6" />
            <rect x="76" y="0" width="88" height="240" rx="6" />
          </g>
        </mask>

        <mask id={dotsMaskId}>
          <rect width="240" height="240" fill={`url(#${patternId})`} />
        </mask>
      </defs>

      <g mask={`url(#${crossMaskId})`}>
        <rect
          width="240"
          height="240"
          fill={`url(#${gradId})`}
          mask={`url(#${dotsMaskId})`}
        />
      </g>
    </svg>
  );
}

export default function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(2);
  const gridRef = useRef<HTMLDivElement>(null);

  // Em ecrãs mobile, centra a galeria horizontal no retrato central (índice 2)
  useEffect(() => {
    const el = gridRef.current;
    if (!el || window.innerWidth >= 1024) return;
    const centerCard = el.children.item(2) as HTMLElement | null;
    if (!centerCard) return;
    const targetLeft =
      centerCard.offsetLeft - (el.clientWidth - centerCard.clientWidth) / 2;
    el.scrollTo({ left: Math.max(0, targetLeft), behavior: "auto" });
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-center px-5 sm:px-6 pt-16 pb-10 sm:pb-6 overflow-hidden">
      {/* Padrões decorativos laterais de pontos em cruz (espelhados como na referência) */}
      <DotMatrixCross
        idPrefix="team-left"
        palette="left"
        className="hidden md:block pointer-events-none select-none absolute left-[2%] lg:left-[6%] top-12 w-48 h-48 opacity-40"
      />
      <DotMatrixCross
        idPrefix="team-right"
        palette="right"
        className="hidden md:block pointer-events-none select-none absolute right-[2%] lg:right-[6%] top-12 w-48 h-48 opacity-40"
      />

      <div className="relative z-10 max-w-7xl w-full mx-auto">
        {/* ─── Cabeçalho Centrado e Limpo (mais espaço vertical para os retratos) ─── */}
        <ParallaxPlane depth="slow" className="text-center max-w-2xl mx-auto mb-6 sm:mb-9">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <p className="eyebrow">Equipa</p>
            <span className="text-border-strong" aria-hidden="true">·</span>
            <span className="text-xs text-muted">
              Equipa multidisciplinar 100% dedicada
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-foreground leading-[1.03] mb-2">
            Conheça a <em className="italic font-normal">nossa</em> equipa
          </h2>

          <p className="text-xs sm:text-sm text-muted max-w-lg mx-auto leading-relaxed">
            Reunimos especialistas em engenharia, design, dados e comunicação para criar trabalho de excelência.
          </p>
        </ParallaxPlane>

        {/* ─── Galeria Escalonada de 5 Cartões (swipe centrado no mobile, arco no desktop) ─── */}
        <ParallaxPlane depth="deep">
          <div
            ref={gridRef}
            className="flex lg:grid lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5 items-center overflow-x-auto lg:overflow-visible no-scrollbar snap-x snap-mandatory py-2 lg:pb-6"
            onMouseLeave={() => setActiveIndex(2)}
          >
            {teamMembers.map((member, index) => {
              const isActive = activeIndex === index;
              const archOffset = desktopArchOffsets[index] ?? "";

              return (
                <div
                  key={member.id}
                  className={`snap-center shrink-0 w-[62vw] sm:w-[36vw] lg:w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${archOffset}`}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    aria-pressed={isActive}
                    className={`group relative w-full aspect-[3/4] max-h-[295px] sm:max-h-[340px] xl:max-h-[375px] rounded-[22px] overflow-hidden text-left cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue ${
                    isActive
                      ? "-translate-y-2.5 scale-[1.03] z-10 shadow-[0_26px_60px_-14px_rgba(20,94,255,0.22),0_12px_28px_-10px_rgba(168,24,255,0.16)] ring-1 ring-black/[0.06]"
                      : "bg-[#eff1f5] ring-1 ring-black/[0.05] hover:-translate-y-1"
                  }`}
                >
                  {/* Base neutra inativa */}
                  <div
                    className="absolute inset-0 bg-[#eff1f5]"
                    aria-hidden="true"
                  />

                  {/* Fundo aurora pastel no estado ativo */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ background: member.auroraGradient }}
                    aria-hidden="true"
                  />

                  {/* Luz branca suave ao centro para preservar os tons naturais de pele com mix-blend-multiply */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      background:
                        "radial-gradient(ellipse 46% 56% at 50% 42%, rgba(255,255,255,0.92) 32%, transparent 100%)",
                    }}
                    aria-hidden="true"
                  />

                  {/* Retrato */}
                  <Image
                    src={member.image}
                    alt={`${member.name} — ${member.role}`}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 20vw"
                    className={`object-cover object-top mix-blend-multiply transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive
                        ? "grayscale-0 contrast-100 scale-[1.02] opacity-100"
                        : "grayscale contrast-[1.06] scale-100 opacity-95"
                    }`}
                  />

                  {/* Etiqueta inferior em vidro fosco */}
                  <div
                    className={`absolute inset-x-2.5 sm:inset-x-3 bottom-2.5 sm:bottom-3 z-20 rounded-xl px-4 py-3 backdrop-blur-md border transition-all duration-300 flex items-end justify-between gap-2 ${
                      isActive
                        ? "bg-black/42 border-white/35 shadow-xs"
                        : "bg-black/30 border-white/20"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium text-white tracking-tight leading-snug">
                        {member.name}
                      </p>
                      <p className="text-xs text-white/85 leading-snug mt-0.5">
                        {member.role}
                      </p>
                    </div>
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 mb-1 transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-tr from-[#A818FF] via-[#145EFF] to-[#00E896] scale-110"
                          : "bg-white/40"
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </button>
              </div>
            );
          })}
          </div>
        </ParallaxPlane>
      </div>
    </div>
  );
}
