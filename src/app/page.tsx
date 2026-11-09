"use client";

import Hero from "@/components/Hero";
import BentoServices from "@/components/BentoServices";
import Showcase from "@/components/Showcase";
import TechStack from "@/components/TechStack";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <main className="flex-1 text-foreground overflow-x-clip">
      <Hero isMobile={isMobile} />

      {/* Âncora do link '#solucoes' (compensa a navbar fixa) */}
      <div id="solucoes" className="scroll-mt-16" aria-hidden="true" />
      <BentoServices isMobile={isMobile} />

      <Showcase isMobile={isMobile} />
      <TechStack />
    </main>
  );
}
