"use client";

import { MotionConfig } from "framer-motion";

// Respeita prefers-reduced-motion em todo o site: sem animações de transform/layout.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
