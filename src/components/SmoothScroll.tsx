"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * SmoothScroll - inércia física sedosa em toda a página com Lenis.
 * Respeita `prefers-reduced-motion`, atualiza dimensões dinamicamente com
 * ResizeObserver (acordeões/rotas) e pausa quando um modal bloqueia o `body`.
 */
export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const lenis = new Lenis({
      duration: 0.95,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.15,
      anchors: true,
    });
    lenisRef.current = lenis;

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
    const mutationObserver = new MutationObserver(syncBodyLock);
    mutationObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    // Recalcula o limite de scroll sempre que a altura da página muda (ex: acordeões/filtros)
    let resizeRaf = 0;
    const resizeObserver = new ResizeObserver(() => {
      if (resizeRaf !== 0) return;
      resizeRaf = window.requestAnimationFrame(() => {
        resizeRaf = 0;
        lenis.resize();
      });
    });
    resizeObserver.observe(document.body);

    return () => {
      if (resizeRaf !== 0) window.cancelAnimationFrame(resizeRaf);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Sincroniza o scroll ao mudar de página no Next.js App Router
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (!window.location.hash) {
      lenis.scrollTo(0, { immediate: true });
    }
    const id = window.requestAnimationFrame(() => {
      lenis.resize();
    });
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
