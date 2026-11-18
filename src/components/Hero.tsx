"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import AuroraCanvas from "@/components/AuroraCanvas";
import AuroraVideoBackground from "@/components/AuroraVideoBackground";

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

  // Parallax layers – move slower than the main content
  const layer1Y = useTransform(smoothProgress, [0, 1], [0, -30]);
  const layer2Y = useTransform(smoothProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* Background video (aurora) */}
      <AuroraVideoBackground />

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

      {/* Parallax decorative layers */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: layer1Y, background: "rgba(20,94,255,0.04)" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: layer2Y, background: "rgba(0,232,150,0.03)" }}
        aria-hidden="true"
      />

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
          <h1 className="font-display text-[clamp(5.25rem,16.5vw,11.5rem)] font-medium tracking-tight leading-[0.9] text-foreground">
            Midi<em className="italic font-normal">8</em>
          </h1>
          <p className="font-display text-[clamp(2.4rem,6.8vw,5rem)] font-medium tracking-tight leading-[1.02] text-foreground/85 mt-3 sm:mt-4">
            move forward, fast
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
