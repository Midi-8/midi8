"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

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

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* Fade aurora no topo apenas na área do Hero */}
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : { opacity: auroraOpacity, scale: auroraScale, y: auroraY }
        }
        className="pointer-events-none absolute inset-0 z-0 will-change-transform"
        aria-hidden="true"
      >
        <div className="top-aurora-fade" />
        <div className="top-aurora-grain" />
      </motion.div>

      {/* Título centrado com reação suave ao scroll */}
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
          <h1 className="font-display text-[clamp(5.25rem,16.5vw,11.5rem)] font-medium tracking-tight leading-[0.9] text-foreground">
            Midi<em className="italic font-normal">8</em>
          </h1>
          <p className="font-display text-[clamp(2.4rem,6.8vw,5rem)] font-medium tracking-tight leading-[1.02] text-foreground/85 mt-3 sm:mt-4">
            move <em className="italic font-normal">forward</em>, fast
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
