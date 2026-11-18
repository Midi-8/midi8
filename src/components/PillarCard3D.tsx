"use client";

import type { PointerEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ServiceCategoryTag } from "@/components/ServicesCarousel";

export type PillarVisualVariant = "layers" | "orbit" | "prism";

export interface PillarTag {
  readonly label: string;
  readonly category: string;
}

export interface PillarCard3DProps {
  title: string;
  description: string;
  tags: readonly PillarTag[];
  accentHex: string;
  accentRgb: string;
  variant: PillarVisualVariant;
  index: number;
}

const SPRING_CONFIG = { stiffness: 220, damping: 24, mass: 0.65 } as const;
const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

function PillarSculpture3D({
  variant,
  accentHex,
  accentRgb,
}: {
  variant: PillarVisualVariant;
  accentHex: string;
  accentRgb: string;
}) {
  if (variant === "layers") {
    return (
      <div className="relative w-12 h-12 flex items-center justify-center [transform-style:preserve-3d]">
        <div
          style={{
            transform: "translateZ(12px) translateY(7px) rotateX(55deg) rotateZ(45deg)",
            borderColor: `rgba(${accentRgb}, 0.22)`,
            backgroundColor: `rgba(${accentRgb}, 0.05)`,
          }}
          className="absolute w-8 h-8 rounded-[7px] border"
        />
        <div
          style={{
            transform: "translateZ(24px) translateY(0px) rotateX(55deg) rotateZ(45deg)",
            borderColor: `rgba(${accentRgb}, 0.38)`,
            backgroundColor: "rgba(255, 255, 255, 0.78)",
          }}
          className="absolute w-8 h-8 rounded-[7px] border backdrop-blur-[2px] shadow-xs"
        />
        <div
          style={{
            transform: "translateZ(36px) translateY(-7px) rotateX(55deg) rotateZ(45deg)",
            borderColor: accentHex,
            backgroundColor: `rgba(${accentRgb}, 0.14)`,
          }}
          className="absolute w-8 h-8 rounded-[7px] border shadow-sm"
        />
      </div>
    );
  }

  if (variant === "orbit") {
    return (
      <div className="relative w-12 h-12 flex items-center justify-center [transform-style:preserve-3d]">
        <div
          style={{
            transform: "translateZ(16px) rotateX(62deg) rotateY(-22deg)",
            borderColor: `rgba(${accentRgb}, 0.28)`,
          }}
          className="absolute w-11 h-11 rounded-full border-[1.5px]"
        />
        <div
          style={{
            transform: "translateZ(28px) rotateX(-52deg) rotateY(28deg)",
            borderColor: `rgba(${accentRgb}, 0.52)`,
          }}
          className="absolute w-9 h-9 rounded-full border-[1.5px]"
        />
        <div
          style={{
            transform: "translateZ(40px)",
            background: `radial-gradient(circle at 32% 32%, #ffffff 0%, ${accentHex} 88%)`,
            boxShadow: `0 6px 14px -4px rgba(${accentRgb}, 0.45)`,
          }}
          className="w-3.5 h-3.5 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="relative w-12 h-12 flex items-end justify-start gap-1.5 pb-1 [transform-style:preserve-3d]">
      <div
        style={{
          transform: "translateZ(16px)",
          borderColor: `rgba(${accentRgb}, 0.24)`,
          backgroundColor: `rgba(${accentRgb}, 0.06)`,
        }}
        className="w-2.5 h-4 rounded-sm border"
      />
      <div
        style={{
          transform: "translateZ(28px)",
          borderColor: `rgba(${accentRgb}, 0.44)`,
          backgroundColor: `rgba(${accentRgb}, 0.14)`,
        }}
        className="w-2.5 h-7 rounded-sm border backdrop-blur-[2px]"
      />
      <div
        style={{
          transform: "translateZ(40px)",
          borderColor: accentHex,
          background: `linear-gradient(180deg, rgba(${accentRgb}, 0.28) 0%, rgba(${accentRgb}, 0.08) 100%)`,
          boxShadow: `0 6px 14px -6px rgba(${accentRgb}, 0.35)`,
        }}
        className="w-2.5 h-10 rounded-sm border"
      />
    </div>
  );
}

export default function PillarCard3D({
  title,
  description,
  tags,
  accentHex,
  accentRgb,
  variant,
  index,
}: PillarCard3DProps) {
  const prefersReducedMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const hoverTarget = useMotionValue(0);

  const smoothX = useSpring(pointerX, SPRING_CONFIG);
  const smoothY = useSpring(pointerY, SPRING_CONFIG);
  const hoverAmount = useSpring(hoverTarget, { stiffness: 240, damping: 26 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [9, -9]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  const shadowX = useTransform(smoothX, [-0.5, 0.5], [14, -14]);
  const shadowY = useTransform(smoothY, [-0.5, 0.5], [16, -8]);
  const shadowOpacity = useTransform(hoverAmount, [0, 1], [0.45, 0.9]);

  const glareX = useTransform(smoothX, [-0.5, 0.5], [12, 88]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], [12, 88]);
  const glareBackground = useMotionTemplate`radial-gradient(circle 220px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.85) 0%, rgba(${accentRgb}, 0.11) 38%, rgba(255, 255, 255, 0) 72%)`;

  const sculptureX = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const sculptureY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: REVEAL_EASE }}
      style={{ perspective: 1100 }}
      className="h-full"
    >
      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={
          prefersReducedMotion
            ? { transformStyle: "preserve-3d" }
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
        className="group relative h-full min-h-[260px] sm:min-h-[295px] p-7 sm:p-8 flex flex-col justify-between select-none will-change-transform"
      >
        {/* Sombra reativa no plano inferior */}
        <motion.div
          aria-hidden="true"
          style={
            prefersReducedMotion
              ? { transform: "translateZ(-26px)" }
              : {
                  x: shadowX,
                  y: shadowY,
                  opacity: shadowOpacity,
                  transform: "translateZ(-26px)",
                }
          }
          className="pointer-events-none absolute inset-x-4 top-6 -bottom-3 rounded-3xl bg-slate-900/[0.08] blur-xl"
        />

        {/* Espessura traseira física do cartão 3D */}
        <div
          aria-hidden="true"
          style={{
            transform: "translateZ(-12px)",
            borderColor: `rgba(${accentRgb}, 0.16)`,
            background: "linear-gradient(155deg, #f3f5f8 0%, #e8ebf1 100%)",
          }}
          className="pointer-events-none absolute inset-0 rounded-2xl border shadow-[0_12px_26px_-18px_rgba(15,23,42,0.18)]"
        />

        {/* Face frontal cerâmica com reflexo especular dinâmico */}
        <div
          aria-hidden="true"
          style={{ transform: "translateZ(0px)" }}
          className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden bg-white/95 border border-black/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
        >
          <motion.div
            style={
              prefersReducedMotion
                ? undefined
                : { background: glareBackground, opacity: hoverAmount }
            }
            className="absolute inset-0"
          />
        </div>

        {/* Camadas de conteúdo em profundidade */}
        <div className="relative z-10 [transform-style:preserve-3d]">
          <motion.div
            aria-hidden="true"
            style={
              prefersReducedMotion
                ? { transformStyle: "preserve-3d" }
                : { x: sculptureX, y: sculptureY, transformStyle: "preserve-3d" }
            }
            className="pointer-events-none mb-5 w-fit"
          >
            <PillarSculpture3D
              variant={variant}
              accentHex={accentHex}
              accentRgb={accentRgb}
            />
          </motion.div>

          <div style={{ transform: "translateZ(22px)" }}>
            <h3 className="text-xl sm:text-2xl font-medium text-foreground mb-2">
              {title}
            </h3>
            <p className="text-sm text-muted leading-relaxed">{description}</p>
          </div>
        </div>

        <div
          style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
          className="relative z-10 flex flex-wrap gap-1.5 pt-5 mt-6 border-t border-border/80"
        >
          {tags.map((tag) => (
            <ServiceCategoryTag
              key={tag.label}
              category={tag.category}
              label={tag.label}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
