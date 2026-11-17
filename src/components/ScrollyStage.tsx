"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Hero from "@/components/Hero";
import ServicesCarousel from "@/components/ServicesCarousel";
import TeamSection from "@/components/TeamSection";
import ContactForm from "@/components/ContactForm";
import { ParallaxPlane, StageOffsetContext } from "@/components/StageParallax";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, SOCIAL } from "@/lib/contact";

const SCENES = [
  { id: "hero", label: "Início" },
  { id: "sobre", label: "A Midi8" },
  { id: "servicos", label: "Serviços" },
  { id: "equipa", label: "Equipa" },
  { id: "contacto", label: "Contactos" },
] as const;

const pillars = [
  {
    num: "01",
    dotColor: "#A818FF",
    glowBg: "radial-gradient(circle at 85% 15%, rgba(168, 24, 255, 0.14), transparent 62%)",
    title: "Engenharia & Produto",
    description:
      "Websites, aplicações web, software à medida e apps móveis desenhadas para velocidade, simplicidade e escala.",
    tags: [
      { label: "Web & Plataformas", category: "web-software" },
      { label: "Software", category: "web-software" },
      { label: "Mobile", category: "web-software" },
    ],
  },
  {
    num: "02",
    dotColor: "#145EFF",
    glowBg: "radial-gradient(circle at 85% 15%, rgba(20, 94, 255, 0.14), transparent 62%)",
    title: "Automação, IA & Dados",
    description:
      "Ligamos sistemas, automatizamos processos e aplicamos modelos de linguagem e análise de dados.",
    tags: [
      { label: "Automação", category: "ia-automacao" },
      { label: "LLMs & IA", category: "ia-automacao" },
      { label: "Dados", category: "ia-automacao" },
    ],
  },
  {
    num: "03",
    dotColor: "#00E896",
    glowBg: "radial-gradient(circle at 85% 15%, rgba(0, 232, 150, 0.16), transparent 62%)",
    title: "Comunicação & Crescimento",
    description:
      "Alinhamos estratégia de marca, campanhas, redes sociais e operações de e-commerce para gerar resultados.",
    tags: [
      { label: "Estratégia", category: "marketing" },
      { label: "Campanhas", category: "marketing" },
      { label: "E-commerce", category: "consultoria-ecom" },
    ],
  },
] as const;

function canContainerScrollInDirection(target: EventTarget | null, deltaY: number): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const scrollable = target.closest<HTMLElement>("[data-scroll-container]");
  if (!scrollable) return false;
  const { scrollTop, scrollHeight, clientHeight } = scrollable;
  if (scrollHeight <= clientHeight + 2) return false;
  if (deltaY > 0) return scrollTop + clientHeight < scrollHeight - 4;
  if (deltaY < 0) return scrollTop > 4;
  return false;
}

interface StageLayerProps {
  index: number;
  isActive: boolean;
  cameraSpring: MotionValue<number>;
  prefersReducedMotion: boolean | null;
  children: ReactNode;
}

function StageLayer({
  index,
  isActive,
  cameraSpring,
  prefersReducedMotion,
  children,
}: StageLayerProps) {
  const offset = useTransform(cameraSpring, (pos) => index - pos);

  // Sobreposição contínua entre camadas adjacentes para coexistirem na transição 3D
  const opacity = useTransform(offset, [-1.05, -0.55, 0, 0.55, 1.05], [0, 0.48, 1, 0.48, 0]);
  const y = useTransform(offset, [-1, 0, 1], ["-36%", "0%", "36%"]);
  const scale = useTransform(offset, [-1, 0, 1], [0.92, 1, 0.9]);
  const rotateX = useTransform(offset, [-1, 0, 1], [10, 0, -10]);
  const z = useTransform(offset, [-1, 0, 1], [-110, 0, -110]);

  return (
    <StageOffsetContext.Provider value={offset}>
      <motion.div
        aria-hidden={!isActive}
        inert={!isActive}
        style={
          prefersReducedMotion
            ? { opacity }
            : {
                opacity,
                y,
                scale,
                rotateX,
                z,
                transformPerspective: 1400,
              }
        }
        className={`absolute inset-0 will-change-transform ${
          isActive ? "pointer-events-auto z-20" : "pointer-events-none z-10"
        }`}
      >
        {children}
      </motion.div>
    </StageOffsetContext.Provider>
  );
}

export default function ScrollyStage() {
  const stageRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  // Câmara contínua partilhada por todas as camadas persistentes
  const targetCamera = useMotionValue(0);
  const cameraSpring = useSpring(targetCamera, {
    stiffness: 95,
    damping: 24,
    mass: 0.55,
    restDelta: 0.001,
  });

  // Seguimento subtil do rato para dar vida à aurora no Hero
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const auroraMouseX = useSpring(pointerX, { stiffness: 45, damping: 20 });
  const auroraMouseY = useSpring(pointerY, { stiffness: 45, damping: 20 });

  const lockRef = useRef(false);
  const lockTimerRef = useRef<number | null>(null);
  const touchRef = useRef<{
    startX: number;
    startY: number;
    startIndex: number;
    axis: "x" | "y" | null;
    target: EventTarget | null;
  } | null>(null);

  const commitIndex = useCallback(
    (nextIndex: number) => {
      const clamped = Math.max(0, Math.min(SCENES.length - 1, nextIndex));
      activeIndexRef.current = clamped;
      setActiveIndex(clamped);
      targetCamera.set(clamped);
    },
    [targetCamera]
  );

  const goToSceneById = useCallback(
    (sceneId: string) => {
      const idx = SCENES.findIndex((s) => s.id === sceneId);
      if (idx !== -1) commitIndex(idx);
    },
    [commitIndex]
  );

  // Sincronizar Navbar com a camada ativa
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("midi8:active-scene", { detail: SCENES[activeIndex].id })
    );
  }, [activeIndex]);

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash) goToSceneById(hash);
    };
    const raf = window.requestAnimationFrame(applyHash);
    window.addEventListener("hashchange", applyHash);

    const onGoto = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (id) goToSceneById(id);
    };
    window.addEventListener("midi8:goto-scene", onGoto);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", applyHash);
      window.removeEventListener("midi8:goto-scene", onGoto);
    };
  }, [goToSceneById]);

  const stepWithCooldown = useCallback(
    (delta: 1 | -1) => {
      if (lockRef.current) return;
      const next = Math.max(
        0,
        Math.min(SCENES.length - 1, activeIndexRef.current + delta)
      );
      if (next === activeIndexRef.current) return;
      lockRef.current = true;
      commitIndex(next);
      if (lockTimerRef.current) window.clearTimeout(lockTimerRef.current);
      lockTimerRef.current = window.setTimeout(() => {
        lockRef.current = false;
      }, 420);
    },
    [commitIndex]
  );

  // Roda do rato / Trackpad e teclado
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;
      if (Math.abs(e.deltaY) < 10) return;
      if (canContainerScrollInDirection(e.target, e.deltaY)) return;
      e.preventDefault();
      stepWithCooldown(e.deltaY > 0 ? 1 : -1);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "TEXTAREA" || tag === "INPUT") return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        stepWithCooldown(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        stepWithCooldown(-1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      if (lockTimerRef.current) window.clearTimeout(lockTimerRef.current);
    };
  }, [stepWithCooldown]);

  // Interação tátil direta (mobile-first) com bloqueio de Pull-to-Refresh nativo
  useEffect(() => {
    const stageEl = stageRef.current;
    if (!stageEl) return;

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      touchRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        startIndex: activeIndexRef.current,
        axis: null,
        target: e.target,
      };
    };

    const onTouchMove = (e: TouchEvent) => {
      const state = touchRef.current;
      const touch = e.touches[0];
      if (!state || !touch) return;

      const deltaX = state.startX - touch.clientX;
      const deltaY = state.startY - touch.clientY;

      if (!state.axis && (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8)) {
        state.axis = Math.abs(deltaY) >= Math.abs(deltaX) ? "y" : "x";
      }

      if (state.axis !== "y") return;
      if (canContainerScrollInDirection(state.target, deltaY)) return;

      // Impede pull-to-refresh / recarregamento nativo ao deslizar para cima/baixo
      e.preventDefault();

      const span = Math.max(window.innerHeight * 0.72, 320);
      const livePos = Math.max(
        0,
        Math.min(SCENES.length - 1, state.startIndex + deltaY / span)
      );
      targetCamera.set(livePos);
    };

    const onTouchEnd = (e: TouchEvent) => {
      const state = touchRef.current;
      touchRef.current = null;
      if (!state || state.axis !== "y") return;

      const touch = e.changedTouches[0];
      const deltaY = touch ? state.startY - touch.clientY : 0;
      const camPos = targetCamera.get();

      if (deltaY > 42 || camPos - state.startIndex > 0.2) {
        commitIndex(state.startIndex + 1);
      } else if (deltaY < -42 || state.startIndex - camPos > 0.2) {
        commitIndex(state.startIndex - 1);
      } else {
        commitIndex(state.startIndex);
      }
    };

    stageEl.addEventListener("touchstart", onTouchStart, { passive: true });
    stageEl.addEventListener("touchmove", onTouchMove, { passive: false });
    stageEl.addEventListener("touchend", onTouchEnd, { passive: true });
    stageEl.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      stageEl.removeEventListener("touchstart", onTouchStart);
      stageEl.removeEventListener("touchmove", onTouchMove);
      stageEl.removeEventListener("touchend", onTouchEnd);
      stageEl.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [commitIndex, targetCamera]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(nx * 24);
    pointerY.set(ny * 16);
  };

  const handlePillarTagClick = (category: string) => {
    window.dispatchEvent(new CustomEvent("midi8:select-category", { detail: category }));
    commitIndex(2);
  };

  // Fundo Aurora contínuo: visível no Hero (pos 0) e recua para branco puro até pos 1
  const auroraScrollY = useTransform(cameraSpring, [0, 1], ["0%", "-60%"]);
  const auroraOpacity = useTransform(cameraSpring, [0, 0.85], [1, 0]);

  return (
    <section
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
      className="relative h-[100dvh] w-full overflow-hidden [perspective:1400px]"
    >
      {/* Fundo Aurora vivo no primeiro Hero; nas restantes camadas dá lugar ao branco puro */}
      <motion.div
        style={
          prefersReducedMotion
            ? { opacity: auroraOpacity }
            : { y: auroraScrollY, opacity: auroraOpacity }
        }
        className="pointer-events-none absolute inset-0 z-0 will-change-transform"
        aria-hidden="true"
      >
        <motion.div
          style={
            prefersReducedMotion
              ? undefined
              : { x: auroraMouseX, y: auroraMouseY }
          }
          className="absolute inset-0 will-change-transform"
        >
          <div className="top-aurora-fade" />
          <div className="top-aurora-grain" />
        </motion.div>
      </motion.div>

      {/* Camada 0 — Hero */}
      <StageLayer
        index={0}
        isActive={activeIndex === 0}
        cameraSpring={cameraSpring}
        prefersReducedMotion={prefersReducedMotion}
      >
        <Hero />
      </StageLayer>

      {/* Camada 1 — A Midi8 */}
      <StageLayer
        index={1}
        isActive={activeIndex === 1}
        cameraSpring={cameraSpring}
        prefersReducedMotion={prefersReducedMotion}
      >
        <div className="w-full h-full flex flex-col justify-center px-5 sm:px-6 pt-16 pb-10 sm:pb-8">
          <div className="max-w-7xl w-full mx-auto">
            <ParallaxPlane
              depth="slow"
              className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 sm:gap-5 mb-5 sm:mb-9"
            >
              <div className="max-w-2xl">
                <p className="eyebrow mb-1.5">A Midi8</p>
                <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-foreground leading-[1.04]">
                  Design simples. <em className="italic font-normal">Código</em> rigoroso. Resultados reais.
                </h2>
              </div>
              <p className="text-xs sm:text-base text-muted leading-relaxed max-w-md lg:pb-1">
                Unimos engenharia de software, inteligência artificial e comunicação estratégica para resolver problemas reais — sem complexidade desnecessária.
              </p>
            </ParallaxPlane>

            <ParallaxPlane depth="deep">
              <div className="flex sm:grid sm:grid-cols-3 gap-3.5 sm:gap-6 overflow-x-auto sm:overflow-visible no-scrollbar snap-x snap-mandatory py-1">
                {pillars.map((pillar) => (
                  <div
                    key={pillar.num}
                    className="relative group snap-center shrink-0 w-[78vw] sm:w-auto rounded-3xl bg-surface/90 backdrop-blur-xs p-5 sm:p-7 border border-border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-border-light hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.12)]"
                  >
                    {/* Reflexo subtil da cor do pilar no hover */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: pillar.glowBg }}
                      aria-hidden="true"
                    />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4 sm:mb-6">
                        <span className="font-display italic text-4xl sm:text-5xl leading-none text-foreground/85">
                          {pillar.num}
                        </span>
                        <span
                          className="w-2 h-2 rounded-full opacity-80 mt-2 transition-transform duration-300 group-hover:scale-125"
                          style={{ backgroundColor: pillar.dotColor }}
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="text-lg sm:text-2xl font-medium text-foreground mb-1.5 sm:mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="relative z-10 flex flex-wrap gap-1.5 pt-3.5 mt-4 sm:mt-5 border-t border-border/80">
                      {pillar.tags.map((tag) => (
                        <button
                          key={tag.label}
                          type="button"
                          onClick={() => handlePillarTagClick(tag.category)}
                          className="rounded-full bg-white/90 border border-border px-2.5 py-0.5 text-[11px] text-muted hover:text-foreground hover:border-border-strong transition-colors cursor-pointer"
                        >
                          {tag.label} ↗
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ParallaxPlane>
          </div>
        </div>
      </StageLayer>

      {/* Camada 2 — Serviços */}
      <StageLayer
        index={2}
        isActive={activeIndex === 2}
        cameraSpring={cameraSpring}
        prefersReducedMotion={prefersReducedMotion}
      >
        <ServicesCarousel />
      </StageLayer>

      {/* Camada 3 — Equipa */}
      <StageLayer
        index={3}
        isActive={activeIndex === 3}
        cameraSpring={cameraSpring}
        prefersReducedMotion={prefersReducedMotion}
      >
        <TeamSection />
      </StageLayer>

      {/* Camada 4 — Contactos */}
      <StageLayer
        index={4}
        isActive={activeIndex === 4}
        cameraSpring={cameraSpring}
        prefersReducedMotion={prefersReducedMotion}
      >
        <div
          data-scroll-container
          className="w-full h-full overflow-y-auto no-scrollbar flex flex-col justify-between px-5 sm:px-6 pt-18 pb-10 sm:pb-5"
        >
          <div className="my-auto max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-center">
            <ParallaxPlane depth="slow" className="lg:col-span-5">
              <p className="eyebrow mb-1.5">Contactos</p>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-foreground leading-[1.04] mb-2 sm:mb-4">
                Vamos dar vida ao seu próximo <em className="italic font-normal">projeto</em>.
              </h2>
              <p className="hidden sm:block text-sm sm:text-base text-muted leading-relaxed mb-5 max-w-md">
                Conte-nos o que pretende construir, otimizar ou escalar. Unimos engenharia, design e estratégia para transformar ideias em resultados.
              </p>

              <div className="grid grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-2.5 max-w-md mb-1 lg:mb-4">
                {[
                  {
                    label: "Email",
                    value: CONTACT_EMAIL,
                    href: `mailto:${CONTACT_EMAIL}`,
                    icon: (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    ),
                  },
                  {
                    label: "Telefone",
                    value: CONTACT_PHONE,
                    href: CONTACT_PHONE_HREF,
                    icon: (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Instagram",
                    value: SOCIAL.instagramHandle,
                    href: SOCIAL.instagram,
                    icon: (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                        <rect x="3" y="3" width="18" height="18" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                      </svg>
                    ),
                  },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center justify-between gap-2 lg:gap-4 rounded-2xl border border-border bg-white p-2 lg:p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-light hover:shadow-[0_14px_32px_-20px_rgba(15,23,42,0.12)]"
                  >
                    <div className="flex items-center gap-2 lg:gap-3 min-w-0">
                      <span className="w-7 h-7 lg:w-9 lg:h-9 rounded-xl bg-surface border border-border flex items-center justify-center text-foreground shrink-0 transition-colors group-hover:bg-foreground group-hover:text-white group-hover:border-foreground">
                        {c.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10px] lg:text-[11px] uppercase tracking-wider text-subtle">
                          {c.label}
                        </p>
                        <p className="hidden sm:block text-xs lg:text-sm text-foreground truncate">
                          {c.value}
                        </p>
                      </div>
                    </div>
                    <span
                      className="hidden lg:inline-block text-subtle group-hover:text-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 pr-1"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </a>
                ))}
              </div>

              <div className="hidden lg:inline-flex items-center gap-2 text-xs text-muted">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span>Resposta garantida em menos de 24 horas úteis</span>
              </div>
            </ParallaxPlane>

            <ParallaxPlane depth="deep" className="lg:col-span-7">
              <ContactForm />
            </ParallaxPlane>
          </div>

          {/* Barra legal e redes discreta na base da camada Contactos */}
          <div className="max-w-7xl w-full mx-auto pt-2.5 mt-2 border-t border-border/70 flex flex-wrap items-center justify-between md:pl-52 gap-3 text-[11px] text-subtle">
            <div className="flex items-center gap-4">
              <span>© 2026 Midi8</span>
              <Link href="/privacidade" className="hover:text-foreground transition-colors">
                Privacidade
              </Link>
              <Link href="/termos" className="hover:text-foreground transition-colors">
                Termos
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                LinkedIn ↗
              </a>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Instagram ↗
              </a>
              <a
                href={SOCIAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </StageLayer>

      {/* Contador editorial discreto de camadas no desktop */}
      <div
        aria-live="polite"
        className="hidden md:flex items-baseline gap-2.5 absolute left-6 bottom-5 z-30 pointer-events-none select-none"
      >
        <div className="overflow-hidden h-6 flex items-baseline">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={activeIndex}
              initial={prefersReducedMotion ? { opacity: 0 } : { y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { y: -12, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="font-display italic text-xl font-medium text-foreground leading-none"
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-subtle">
          / 0{SCENES.length} — {SCENES[activeIndex].label}
        </span>
      </div>

      {/* Indicador lateral no desktop */}
      <nav
        aria-label="Navegação por camadas"
        className="hidden md:flex flex-col items-end gap-2.5 absolute right-6 top-1/2 -translate-y-1/2 z-30"
      >
        {SCENES.map((scene, index) => {
          const current = activeIndex === index;
          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => commitIndex(index)}
              aria-label={`Ir para ${scene.label}`}
              aria-current={current ? "step" : undefined}
              className="group flex items-center gap-2.5 py-0.5 cursor-pointer"
            >
              <span
                className={`text-[11px] tracking-wide transition-all duration-300 ${
                  current
                    ? "opacity-100 text-foreground translate-x-0"
                    : "opacity-0 translate-x-2 text-muted group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                {scene.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  current
                    ? "w-1.5 h-6 bg-gradient-to-b from-[#A818FF] via-[#145EFF] to-[#00E896]"
                    : "w-1.5 h-1.5 bg-foreground/25 group-hover:bg-foreground/60"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Indicador horizontal discreto no mobile */}
      <nav
        aria-label="Progresso das camadas"
        className="md:hidden flex items-center gap-2 absolute bottom-3 left-1/2 -translate-x-1/2 z-30"
      >
        {SCENES.map((scene, index) => {
          const current = activeIndex === index;
          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => commitIndex(index)}
              aria-label={`Ir para ${scene.label}`}
              aria-current={current ? "step" : undefined}
              className="p-1 cursor-pointer"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  current
                    ? "h-1.5 w-6 bg-gradient-to-r from-[#A818FF] via-[#145EFF] to-[#00E896]"
                    : "h-1.5 w-1.5 bg-foreground/25"
                }`}
              />
            </button>
          );
        })}
      </nav>
    </section>
  );
}
