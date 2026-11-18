"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ServiceIconProps {
  /** The SVG or any ReactNode representing the icon */
  icon: ReactNode;
  /** Additional class names for customization */
  className?: string;
}

/**
 * ServiceIcon – a small wrapper that adds a subtle hover animation to service icons.
 * It uses Framer Motion for smooth scaling.
 */
export default function ServiceIcon({ icon, className = "" }: ServiceIconProps) {
  return (
    <motion.span
      className={`inline-flex items-center justify-center w-5 h-5 ${className}`}
      whileHover={{ scale: 1.12, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {icon}
    </motion.span>
  );
}
