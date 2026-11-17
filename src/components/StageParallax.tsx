"use client";

import { createContext, useContext, type ReactNode } from "react";
import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";

export const StageOffsetContext = createContext<MotionValue<number> | null>(null);

export function ParallaxPlane({
  depth = "front",
  className,
  children,
}: {
  depth?: "slow" | "front" | "deep";
  className?: string;
  children: ReactNode;
}) {
  const offset = useContext(StageOffsetContext);
  const prefersReducedMotion = useReducedMotion();

  const shift = depth === "slow" ? 16 : depth === "front" ? 32 : 52;
  const fallbackShift = useTransform(() => 0);
  const activeOffset = offset ?? fallbackShift;
  const y = useTransform(activeOffset, [-1, 0, 1], [-shift, 0, shift]);

  if (!offset || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

