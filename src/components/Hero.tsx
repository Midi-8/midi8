"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { getCalApi } from "@calcom/embed-react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Cal.com initialization with dark theme and copper branding
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#EA580C" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  // Parallax motion values — smooth spring-damped
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const gridX = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const gridY = useSpring(mouseY, { stiffness: 45, damping: 25 });
  const glowX = useSpring(mouseX, { stiffness: 35, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 35, damping: 20 });

  useEffect(() => {
    const check = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      const isNarrow = window.innerWidth < 768;
      setIsMobile(isTouch || isNarrow);
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Normalise to [-1, 1]
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    // Inverted parallax: background grid and light reflect opposite to cursor
    mouseX.set(nx * -24);
    mouseY.set(ny * -18);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const handleOpenCal = async (e: React.MouseEvent) => {
    e.preventDefault();
    const cal = await getCalApi();
    cal("modal", {
      calLink: "midi8/reuniao-estrategica",
      config: { layout: "month_view", theme: "dark" },
    });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ─── Parallax Background Layer (Grid + Reflexo Monocromático) ─── */}
      <motion.div
        className="absolute inset-[-64px] dot-grid"
        style={{ x: isMobile ? 0 : gridX, y: isMobile ? 0 : gridY }}
      />
      <div className="absolute inset-0 hero-glow" />

      {/* Parallax radial glow monocromático que reage ao cursor */}
      <motion.div
        className="absolute w-[900px] h-[700px] rounded-full pointer-events-none opacity-20 blur-[130px]"
        style={{
          x: isMobile ? 0 : glowX,
          y: isMobile ? 0 : glowY,
          top: "-15%",
          left: "calc(50% - 450px)",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ─── Content ─── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Status badge com ponto de estado Cobre (#EA580C) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-border text-sm text-zinc-400 font-mono"
        >
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: "#EA580C" }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ background: "#EA580C" }}
            />
          </span>
          A aceitar novos projetos
        </motion.div>

        {/* Main heading — clareza técnica monocromática */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
        >
          <span className="block text-foreground">
            Tecnologia Avançada.
          </span>
          <span className="block">
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Resultados Medíveis.
            </span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 leading-relaxed mb-10"
        >
          Soluções corporativas de desenvolvimento web, automação e suporte à
          decisão, desenhadas com precisão para otimizar o seu modelo de
          negócio.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            type="button"
            data-cal-link="midi8/reuniao-estrategica"
            data-cal-namespace=""
            data-cal-config='{"layout":"month_view","theme":"dark"}'
            onClick={handleOpenCal}
            className="cta-button cursor-pointer"
          >
            <span className="relative z-10">Agendar Reunião</span>
            <svg
              className="relative z-10 w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
          <a href="#servicos" className="cta-button cta-secondary">
            <span>Ver Serviços</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </motion.div>

        {/* Bottom stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: "3+", label: "Projetos em Produção" },
            { value: "100%", label: "Taxa de Entrega" },
            { value: "24h", label: "Tempo de Resposta" },
            { value: "∞", label: "Compromisso" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-foreground font-mono">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-500 mt-1 tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
