"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * TransitionCanvas – displays a full-screen radial ripple animation on route
 * changes. Uses `usePathname` for the App Router and respects `prefers-reduced-motion`.
 */
export default function TransitionCanvas() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const prevPathname = useRef(pathname);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || prevPathname.current === pathname) {
      prevPathname.current = pathname;
      return;
    }
    prevPathname.current = pathname;
    const startFrame = requestAnimationFrame(() => setIsAnimating(true));
    const timeout = setTimeout(() => setIsAnimating(false), 800);
    return () => {
      cancelAnimationFrame(startFrame);
      clearTimeout(timeout);
    };
  }, [pathname, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,94,255,0.22),rgba(168,24,255,0.14)_45%,transparent_75%)]"
            initial={{ scale: 0 }}
            animate={{ scale: 3 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
