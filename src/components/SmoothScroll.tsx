"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll - inércia física sedosa em toda a página com Lenis.
 * Respeita `prefers-reduced-motion` e pausa automaticamente quando um modal
 * bloqueia o scroll do `body`.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
      anchors: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    // Pausa o Lenis automaticamente quando o modal da equipa ou o menu mobile bloqueia o body
    const syncBodyLock = () => {
      if (document.body.style.overflow === "hidden") {
        lenis.stop();
      } else {
        lenis.start();
      }
    };
    const observer = new MutationObserver(syncBodyLock);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
