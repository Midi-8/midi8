"use client";

import {
  useRef,
  useCallback,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface BentoServicesProps {
  isMobile?: boolean;
}

/* ─── 3D Tilt Wrapper with Copper Spotlight ─── */

function TiltCard({
  children,
  className,
  isMobile,
  isCrownJewel = false,
}: {
  children: React.ReactNode;
  className: string;
  isMobile: boolean;
  isCrownJewel?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Raw mouse position normalised to [-0.5, 0.5]
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Subtle spring tilt: slightly more responsive for the massive crown jewel
  const tiltAngle = isCrownJewel ? 6 : 8;
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [tiltAngle, -tiltAngle]), {
    stiffness: 220,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-tiltAngle, tiltAngle]), {
    stiffness: 220,
    damping: 24,
  });

  // Spotlight positions
  const glowLeft = useTransform(rawX, [-0.5, 0.5], [15, 85]);
  const glowTop = useTransform(rawY, [-0.5, 0.5], [15, 85]);
  const spotlightBg = useTransform([glowLeft, glowTop], ([l, t]) =>
    isCrownJewel
      ? `radial-gradient(550px circle at ${l}% ${t}%, rgb(var(--accent-rgb) / 0.08) 0%, rgba(255, 255, 255, 0.03) 40%, transparent 70%)`
      : `radial-gradient(350px circle at ${l}% ${t}%, rgb(var(--accent-rgb) / 0.05) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 70%)`
  );

  const handleMove = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      if (isMobile || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [isMobile, rawX, rawY]
  );

  const handleLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <div className="h-full [perspective:1200px]">
      <motion.div
        ref={cardRef}
        className={className}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          transformStyle: "preserve-3d",
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
        }}
      >
        {/* Dynamic Copper Spotlight on Hover */}
        {!isMobile && (
          <motion.div
            className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: spotlightBg }}
          />
        )}
        {children}
      </motion.div>
    </div>
  );
}

/* ─── Crown Jewel Interactive Neural Visualizer ─── */

function NeuralActivityWidget() {
  return (
    <div className="well relative w-full py-4 px-5 my-5 overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-muted border-b border-border/60 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-secondary tracking-wider">PIPELINE DE PROCESSAMENTO VETORIAL</span>
        </div>
        <span className="text-accent font-semibold tracking-wider">ATIVO // 99.8% PREC.</span>
      </div>

      {/* Animated Synapse Nodes Matrix */}
      <div className="relative h-14 flex items-center justify-between px-2">
        {/* Node 1: Raw Ingestion */}
        <div className="flex flex-col items-center gap-1 z-10">
          <div className="icon-tile w-7 h-7 rounded-lg">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7M4 7c0-2 1.5-3 3.5-3h9c2 0 3.5 1 3.5 3M4 7h16" />
            </svg>
          </div>
          <span className="text-[10px] font-mono text-muted">INGESTÃO</span>
        </div>

        {/* Animated Synapse Beam 1 */}
        <div className="flex-1 mx-2 relative h-[2px] bg-border-light overflow-hidden">
          <motion.div
            className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-accent to-transparent"
            animate={{ left: ["-20%", "120%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Node 2: Embeddings & Vector Space */}
        <div className="flex flex-col items-center gap-1 z-10">
          <div className="icon-tile icon-tile--accent w-8 h-8 rounded-lg">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-[10px] font-mono text-accent font-semibold">LATENTE</span>
        </div>

        {/* Animated Synapse Beam 2 */}
        <div className="flex-1 mx-2 relative h-[2px] bg-border-light overflow-hidden">
          <motion.div
            className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-foreground to-transparent"
            animate={{ left: ["-20%", "120%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: 0.7 }}
          />
        </div>

        {/* Node 3: Decision & Action */}
        <div className="flex flex-col items-center gap-1 z-10">
          <div className="icon-tile w-7 h-7 rounded-lg">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-[10px] font-mono text-muted">DECISÃO</span>
        </div>
      </div>

      {/* Telemetry metrics strip */}
      <div className="grid grid-cols-3 gap-2 pt-2 mt-2 border-t border-border text-center font-mono">
        <div>
          <span className="text-[10px] text-subtle block">LATÊNCIA</span>
          <span className="text-xs text-foreground font-medium">&lt; 14ms</span>
        </div>
        <div>
          <span className="text-[10px] text-subtle block">THROUGHPUT</span>
          <span className="text-xs text-accent font-medium">4.8 GB/s</span>
        </div>
        <div>
          <span className="text-[10px] text-subtle block">ARQUITETURA</span>
          <span className="text-xs text-secondary font-medium">RAG + LLM</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Asymmetric Bento Services Component ─── */

export default function BentoServices({ isMobile: isMobileProp }: BentoServicesProps) {
  const isMobileLocal = useIsMobile();
  const isMobile = isMobileProp ?? isMobileLocal;

  return (
    <section
      id="servicos"
      className="relative w-full section-padding flex items-center justify-center"
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <p className="eyebrow mb-3">Arquitetura de Serviços</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Capacidade técnica
              <span className="text-subtle block sm:inline sm:ml-2">
                de ponta a ponta.
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted font-mono max-w-xs">
            Ecossistema integrado com IA e Engenharia de Software de alta performance.
          </p>
        </motion.div>

        {/* ─── Asymmetric Bento Grid Architecture ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* ─── Satellite Column Left (3 cols on desktop) ─── */}
          <div className="lg:col-span-3 flex flex-col gap-5 order-2 lg:order-1">
            {/* Satellite 1: Soluções Web & Apps */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-1"
            >
              <TiltCard
                isMobile={isMobile}
                className="bento-card p-6 relative overflow-hidden group h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="icon-tile w-9 h-9 rounded-lg">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    </div>
                    <span className="copper-badge">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      Escalável
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-foreground mb-2 relative z-10">
                    Soluções Web & Apps
                  </h3>
                  <p className="text-xs text-muted leading-relaxed relative z-10">
                    Websites institucionais, plataformas SaaS e aplicações móveis concebidas para velocidade extrema, SEO e conversão empresarial.
                  </p>
                </div>

                {/* Micro-interaction Tags with Copper Accents */}
                <div className="flex flex-wrap gap-1.5 pt-4 mt-2 relative z-10">
                  <span className="chip chip--accent">
                    Escalável
                  </span>
                  <span className="chip">
                    Next.js 16
                  </span>
                  <span className="chip">
                    React 19
                  </span>
                </div>
              </TiltCard>
            </motion.div>

            {/* Satellite 2: Consultoria Técnica */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1"
            >
              <TiltCard
                isMobile={isMobile}
                className="bento-card p-6 relative overflow-hidden group h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="icon-tile w-9 h-9 rounded-lg">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                      </svg>
                    </div>
                    <span className="copper-badge">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      Estratégico
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-foreground mb-2 relative z-10">
                    Consultoria Técnica
                  </h3>
                  <p className="text-xs text-muted leading-relaxed relative z-10">
                    Direção técnica executiva para fundadores e líderes. Auditorias profundas de código, segurança e definição de roadmaps de produto.
                  </p>
                </div>

                {/* Micro-interaction Tags with Copper Accents */}
                <div className="flex flex-wrap gap-1.5 pt-4 mt-2 relative z-10">
                  <span className="chip chip--accent">
                    Auditoria
                  </span>
                  <span className="chip">
                    Roadmaps
                  </span>
                  <span className="chip">
                    Arquitetura
                  </span>
                </div>
              </TiltCard>
            </motion.div>
          </div>

          {/* ─── THE CROWN JEWEL: Massivo Card Central (6 cols on desktop — 2x tamanho) ─── */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-full"
            >
              <TiltCard
                isMobile={isMobile}
                isCrownJewel={true}
                className="bento-card p-7 sm:p-9 relative overflow-hidden group h-full flex flex-col justify-between"
              >
                <div>
                  {/* Crown Jewel Top Banner */}
                  <div className="flex items-center justify-between mb-5 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="icon-tile icon-tile--accent w-11 h-11 rounded-xl">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-accent uppercase block font-semibold">
                          NÚCLEO ESTRATÉGICO // JOIA DA COROA
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                          Inteligência Artificial & Tratamento de Dados
                        </h3>
                      </div>
                    </div>

                    <span className="copper-badge shrink-0 hidden sm:inline-flex">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      Produção Ativa
                    </span>
                  </div>

                  {/* Core Description */}
                  <p className="text-sm text-secondary leading-relaxed relative z-10 mb-2">
                    Modelos preditivos corporativos, automação com agentes autónomos e pipelines de processamento vetorial em larga escala. Transformamos dados brutos em inteligência operacional de alta precisão.
                  </p>

                  {/* Live Interactive Telemetry & Vector Flow Visualizer */}
                  <div className="relative z-10">
                    <NeuralActivityWidget />
                  </div>
                </div>

                {/* Rich Tag Spectrum with Surgical Copper Micro-Interactions */}
                <div className="relative z-10 pt-2 border-t border-border/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-subtle uppercase tracking-wider">
                      CAPACIDADES NUCLEARES:
                    </span>
                    <span className="text-[11px] font-mono text-accent">
                      ZERO-LATENCY RAG
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="chip chip--accent">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      Tempo Real
                    </span>
                    <span className="chip chip--accent">
                      Agentes Autónomos
                    </span>
                    <span className="chip chip--accent">
                      Pipelines ETL
                    </span>
                    <span className="chip">
                      Fine-Tuning LLMs
                    </span>
                    <span className="chip">
                      Deep Learning
                    </span>
                    <span className="chip chip--accent">
                      Escalável
                    </span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>

          {/* ─── Satellite Column Right (3 cols on desktop) ─── */}
          <div className="lg:col-span-3 flex flex-col gap-5 order-3">
            {/* Satellite 3: Automação de Processos */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex-1"
            >
              <TiltCard
                isMobile={isMobile}
                className="bento-card p-6 relative overflow-hidden group h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="icon-tile w-9 h-9 rounded-lg">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="copper-badge">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      Tempo Real
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-foreground mb-2 relative z-10">
                    Automação de Processos
                  </h3>
                  <p className="text-xs text-muted leading-relaxed relative z-10">
                    Workflows autónomos que erradicam ineficiências manuais. Integração de APIs, pipelines assíncronos e sincronização de ecossistemas corporativos.
                  </p>
                </div>

                {/* Micro-interaction Tags with Copper Accents */}
                <div className="flex flex-wrap gap-1.5 pt-4 mt-2 relative z-10">
                  <span className="chip chip--accent">
                    Tempo Real
                  </span>
                  <span className="chip">
                    Workflows
                  </span>
                  <span className="chip">
                    Node / Python
                  </span>
                </div>
              </TiltCard>
            </motion.div>

            {/* Satellite 4: Alta Disponibilidade & Observabilidade */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex-1"
            >
              <TiltCard
                isMobile={isMobile}
                className="bento-card p-6 relative overflow-hidden group h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="icon-tile w-9 h-9 rounded-lg">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    </div>
                    <span className="copper-badge">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      99.99% Uptime
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-foreground mb-2 relative z-10">
                    Sistemas & Resiliência
                  </h3>
                  <p className="text-xs text-muted leading-relaxed relative z-10">
                    Infraestrutura cloud resiliente com observabilidade 24/7, tolerância a falhas e arquiteturas seguras orientadas ao negócio.
                  </p>
                </div>

                {/* Micro-interaction Tags with Copper Accents */}
                <div className="flex flex-wrap gap-1.5 pt-4 mt-2 relative z-10">
                  <span className="chip chip--accent">
                    Escalável
                  </span>
                  <span className="chip">
                    Zero-Trust
                  </span>
                  <span className="chip">
                    Cloud Native
                  </span>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
