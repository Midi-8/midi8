"use client";

import { ParallaxPlane } from "@/components/StageParallax";

export default function Hero() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-5 sm:px-6 text-center">
      <ParallaxPlane depth="front" className="max-w-5xl mx-auto">
        <h1 className="font-display text-[clamp(3.35rem,12vw,7.75rem)] font-medium tracking-tight leading-[0.96] text-foreground">
          move <em className="italic font-normal">forward</em>, fast
        </h1>
      </ParallaxPlane>

      {/* Barra editorial de capa em 3 colunas */}
      <div className="absolute inset-x-0 bottom-12 sm:bottom-8 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-between gap-4 text-[10px] sm:text-[11px] font-mono tracking-[0.18em] uppercase text-muted">
          <span className="hidden sm:inline-block">
            Estúdio Digital &amp; Tecnológico
          </span>

          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("midi8:goto-scene", { detail: "sobre" }))
            }
            className="inline-flex items-center gap-2 text-foreground/75 hover:text-foreground transition-colors cursor-pointer sm:mx-auto"
          >
            <span className="md:hidden">Deslize</span>
            <span className="hidden md:inline">Scroll</span>
            <span aria-hidden="true">↓</span>
          </button>

          <span className="hidden sm:inline-block text-right">
            Web · Software · IA · Growth
          </span>
        </div>
      </div>
    </div>
  );
}
