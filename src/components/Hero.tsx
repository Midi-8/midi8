"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import AuroraCanvas from "@/components/AuroraCanvas";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    restDelta: 0.001,
  });

  const titleOpacity = useTransform(smoothProgress, [0, 0.58], [1, 0]);
  const titleY = useTransform(smoothProgress, [0, 0.75], [0, -100]);
  const titleScale = useTransform(smoothProgress, [0, 0.75], [1, 0.9]);

  const auroraOpacity = useTransform(smoothProgress, [0, 0.75], [1, 0]);
  const auroraScale = useTransform(smoothProgress, [0, 0.75], [1, 1.08]);
  const auroraY = useTransform(smoothProgress, [0, 0.75], [0, -40]);
  const cueOpacity = useTransform(smoothProgress, [0, 0.14], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* Fade aurora only at the top of the Hero */}
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : { opacity: auroraOpacity, scale: auroraScale, y: auroraY }
        }
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden will-change-transform"
        aria-hidden="true"
      >
        <AuroraCanvas />
        <div className="top-aurora-grain" />
      </motion.div>

      {/* Title with smooth scroll reaction */}
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : { opacity: titleOpacity, y: titleY, scale: titleScale }
        }
        className="relative z-10 max-w-6xl mx-auto text-center will-change-transform"
      >
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="flex justify-center">
            <Image
              src="/midi8-brand-logo.webp?v=official"
              alt="midi8"
              width={774}
              height={293}
              priority
              unoptimized
              className="w-[clamp(14rem,62vw,29rem)] h-auto select-none"
            />
          </h1>
          <p className="type-headline-md text-foreground/85 mt-4 sm:mt-6">
            move <em className="italic font-normal">forward</em>, fast
          </p>
        </motion.div>
      </motion.div>

      {/* Indicador discreto de scroll no fundo do Hero */}
      <motion.a
        href="#sobre"
        aria-label="Continuar para A midi8"
        style={prefersReducedMotion ? undefined : { opacity: cueOpacity }}
        className="group absolute bottom-7 sm:bottom-9 left-1/2 -translate-x-1/2 z-10 inline-flex flex-col items-center gap-1.5 text-subtle/75 hover:text-foreground transition-colors"
      >
        <motion.svg
          animate={prefersReducedMotion ? undefined : { y: [0, 4, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.6}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5" />
        </motion.svg>
      </motion.a>
    </section>
  );
}
