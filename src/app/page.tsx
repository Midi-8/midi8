"use client";

import { useRef, useSyncExternalStore } from "react";
import { useScroll } from "framer-motion";
import Hero from "@/components/Hero";
import BentoServices from "@/components/BentoServices";
import Showcase from "@/components/Showcase";
import TechStack from "@/components/TechStack";
import Footer from "@/components/Footer";

// ─── Hydration-safe mobile detection via useSyncExternalStore ─────────────────
function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}
function getSnapshot() {
  return (
    window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024
  );
}
function getServerSnapshot() {
  return false;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const spatialContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Track scroll progress over the pinned spatial container
  const { scrollYProgress } = useScroll({
    target: spatialContainerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="flex-1 bg-zinc-950 text-foreground overflow-x-clip">

      {/* ─── Spatial Scroll Container: Hero (3D zoom) → Bento (emerge) ─── */}
      {!isMobile ? (
        <div ref={spatialContainerRef} className="relative h-[240vh] bg-zinc-950">
          {/* Sticky viewport chamber — both layers composited here */}
          <div className="sticky top-0 h-screen w-full overflow-hidden">

            {/* Layer 1: Dark Liquid Metal Hero (zooms away on scroll) */}
            <div className="absolute inset-0">
              <Hero scrollYProgress={scrollYProgress} isMobile={false} />
            </div>

            {/* Layer 2: Bento Services (emerges from Z-depth on scroll) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <BentoServices scrollYProgress={scrollYProgress} isMobile={false} />
            </div>
          </div>

          {/* Invisible anchor that '#solucoes' nav link scrolls to */}
          <div
            id="solucoes"
            className="absolute top-[62%] w-px h-px pointer-events-none"
            aria-hidden="true"
          />
        </div>
      ) : (
        /* ─── Mobile: linear flow, no spatial zoom ─── */
        <div className="relative bg-zinc-950">
          <Hero isMobile={true} />
          {/* Mobile section anchor */}
          <div id="solucoes" className="w-px h-px" aria-hidden="true" />
          <BentoServices isMobile={true} />
        </div>
      )}

      {/* ─── Remaining Sections ─── */}
      <Showcase />
      <TechStack />
      <Footer />
    </main>
  );
}
