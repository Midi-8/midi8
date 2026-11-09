"use client";

import { useState, useRef, useEffect, useCallback, useSyncExternalStore } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { projects, type Project } from "@/data/projects";

function subscribeResize(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getSnapshot() {
  return window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024;
}

function getServerSnapshot() {
  return false;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export default function Showcase({ isMobile: isMobileProp }: { isMobile?: boolean } = {}) {
  const isMobileLocal = useSyncExternalStore(subscribeResize, getSnapshot, getServerSnapshot);
  const isMobile = isMobileProp ?? isMobileLocal;
  const shouldReduceMotion = useReducedMotion();

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const triggerButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Fecha o modal e devolve o foco ao elemento acionador
  const handleCloseModal = useCallback(() => {
    const closedProjectId = activeProject?.id;
    setActiveProject(null);
    if (closedProjectId && triggerButtonRefs.current[closedProjectId]) {
      setTimeout(() => {
        triggerButtonRefs.current[closedProjectId]?.focus();
      }, 50);
    }
  }, [activeProject?.id]);

  // Focus trap, Escape key listener e bloqueio de scroll
  useEffect(() => {
    if (!activeProject) return;

    // Bloqueia scroll do body
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";

    // Foco inicial no botão de fechar
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleCloseModal();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [activeProject, handleCloseModal]);

  return (
    <section id="portfolio" className="section-padding relative scroll-mt-24">
      {/* Separador subtil superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho da secção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-sm font-mono text-zinc-500 tracking-widest uppercase mb-3">
            Portfólio
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Engenharia aplicada.
            <br />
            <span className="text-zinc-500">Resultados em produção.</span>
          </h2>
        </motion.div>

        {/* Grelha responsiva: 1 coluna em mobile, 2 em tablet, 3 em desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
        >
          {projects.map((project, index) => {
            const hasCaseStudy = Boolean(project.caseStudy);

            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                animate={
                  isMobile || shouldReduceMotion
                    ? undefined
                    : {
                        y: [0, index % 2 === 0 ? -6 : -8, 0],
                      }
                }
                transition={
                  isMobile || shouldReduceMotion
                    ? undefined
                    : {
                        y: {
                          duration: 5 + index * 1.1,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }
                }
                whileHover={
                  isMobile || shouldReduceMotion
                    ? undefined
                    : {
                        y: -10,
                        transition: { duration: 0.3, ease: "easeOut" },
                      }
                }
                className="glass-card overflow-hidden group relative flex flex-col justify-between h-full"
              >
                {/* Linha de realce monocromática no topo */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />

                {/* Brilho subtil no hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[20px]`}
                />

                <div className="relative p-6 sm:p-8 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Linha de Tipo + Estado */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 mb-5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900/80 border border-zinc-800 text-[11px] font-mono font-medium text-foreground tracking-wide">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                        {project.type}
                      </span>
                      <span className="copper-badge">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
                        {project.status}
                      </span>
                    </div>

                    {/* Ícone e Título */}
                    <div className="mb-5 flex items-center gap-3.5">
                      <div
                        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${project.iconGradient} border border-zinc-800 flex items-center justify-center shadow-lg shadow-black/40 shrink-0`}
                      >
                        <span className="text-sm font-bold text-white">
                          {project.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-foreground">
                          {project.name}
                        </h3>
                        <p className="text-xs font-mono text-zinc-500 mt-0.5">
                          {project.type}
                        </p>
                      </div>
                    </div>

                    {/* Descrição */}
                    <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags da Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-zinc-900/60 border border-zinc-800/80 text-zinc-400 hover:border-zinc-700 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Ação interativa do Case Study */}
                    <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                      <span className="text-[11px] text-zinc-500 font-mono tracking-wider">
                        CASE STUDY
                      </span>

                      {hasCaseStudy ? (
                        <button
                          ref={(el) => {
                            triggerButtonRefs.current[project.id] = el;
                          }}
                          type="button"
                          onClick={() => setActiveProject(project)}
                          aria-label={`Ver case study detalhado de ${project.name}`}
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#EA580C] hover:text-[#f06115] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded py-1 px-1.5 cursor-pointer group/btn"
                        >
                          <span>Explorar</span>
                          <svg
                            className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </button>
                      ) : (
                        <button
                          ref={(el) => {
                            triggerButtonRefs.current[project.id] = el;
                          }}
                          type="button"
                          onClick={() => setActiveProject(project)}
                          aria-label={`Informação sobre o case study em preparação de ${project.name}`}
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded py-1 px-1.5 cursor-pointer"
                        >
                          <span className="italic">Em preparação</span>
                          <svg
                            className="w-3 h-3 text-zinc-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            aria-hidden="true"
                          >
                            <circle cx="12" cy="12" r="9" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2.5 2.5" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ─── Modal / Dialog Acessível de Case Study ─── */}
      <AnimatePresence>
        {activeProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            role="presentation"
          >
            {/* Backdrop com clique fora */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.05 : 0.2 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Conteúdo do Modal */}
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-case-study-title"
              aria-describedby="modal-case-study-description"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 16 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: shouldReduceMotion ? 0.05 : 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/80 z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Barra superior de realce em cobre */}
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#EA580C] to-transparent" />

              {/* Cabeçalho do modal */}
              <div className="p-6 sm:p-8 border-b border-zinc-800/80 flex items-start justify-between gap-4 bg-zinc-900/40">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activeProject.iconGradient} border border-zinc-800 flex items-center justify-center shadow-lg shadow-black/40 shrink-0`}
                  >
                    <span className="text-base font-bold text-white">
                      {activeProject.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-[#EA580C] tracking-wide uppercase">
                        Case Study Técnico
                      </span>
                      <span className="text-zinc-600">·</span>
                      <span className="text-xs font-mono text-zinc-400">
                        {activeProject.type}
                      </span>
                    </div>
                    <h3
                      id="modal-case-study-title"
                      className="text-xl sm:text-2xl font-bold text-white tracking-tight"
                    >
                      {activeProject.name}
                    </h3>
                  </div>
                </div>

                {/* Botão de Fecho */}
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={handleCloseModal}
                  aria-label="Fechar case study"
                  className="p-2 rounded-lg text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C] cursor-pointer shrink-0"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Corpo com scroll interno sem layout shift */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-foreground">
                <p id="modal-case-study-description" className="text-sm text-zinc-300 leading-relaxed">
                  {activeProject.description}
                </p>

                {activeProject.caseStudy ? (
                  <>
                    {/* 1. Desafio Técnico */}
                    <section aria-labelledby="section-desafio">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
                        <h4
                          id="section-desafio"
                          className="text-sm font-mono font-semibold tracking-wider uppercase text-zinc-200"
                        >
                          1. Desafio Técnico
                        </h4>
                      </div>
                      <div className="bg-zinc-900/50 rounded-xl p-5 border border-zinc-800/80">
                        <p className="text-sm text-zinc-300 leading-relaxed">
                          {activeProject.caseStudy.challenge}
                        </p>
                      </div>
                    </section>

                    {/* 2. Arquitetura Implementada */}
                    <section aria-labelledby="section-arquitetura">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
                        <h4
                          id="section-arquitetura"
                          className="text-sm font-mono font-semibold tracking-wider uppercase text-zinc-200"
                        >
                          2. Arquitetura Implementada
                        </h4>
                      </div>
                      <div className="bg-zinc-900/50 rounded-xl p-5 border border-zinc-800/80 space-y-4">
                        <div>
                          <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                            Decisões Técnicas
                          </p>
                          <p className="text-sm text-zinc-300 leading-relaxed">
                            {activeProject.caseStudy.architecture.decisions}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                            Stack Tecnológica
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {activeProject.caseStudy.architecture.stack.map((item) => (
                              <span
                                key={item}
                                className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-800/80 text-zinc-200 border border-zinc-700/60"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                            Integrações-Chave
                          </p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-zinc-300">
                            {activeProject.caseStudy.architecture.integrations.map((integ) => (
                              <li key={integ} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                                {integ}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>

                    {/* 3. Resultados Mensuráveis */}
                    <section aria-labelledby="section-resultados">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
                        <h4
                          id="section-resultados"
                          className="text-sm font-mono font-semibold tracking-wider uppercase text-zinc-200"
                        >
                          3. Resultados Mensuráveis
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {activeProject.caseStudy.results.map((res) => (
                          <div
                            key={res.metric}
                            className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl text-center flex flex-col justify-center"
                          >
                            <div className="text-2xl font-bold font-mono text-white mb-1">
                              {res.metric}
                            </div>
                            <p className="text-xs text-zinc-400 leading-snug">
                              {res.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  </>
                ) : (
                  <div className="bg-zinc-900/50 rounded-xl p-8 border border-dashed border-zinc-800 text-center">
                    <div className="w-10 h-10 rounded-full bg-zinc-800/80 text-zinc-400 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h4 className="text-base font-semibold text-white mb-2">
                      Case Study em Preparação
                    </h4>
                    <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                      {"// TODO(MIDI8): Os dados técnicos aprofundados deste sistema em produção encontram-se atualmente em fase de consolidação e auditoria de métricas de impacto."}
                    </p>
                  </div>
                )}
              </div>

              {/* Rodapé do modal */}
              <div className="p-4 sm:p-6 border-t border-zinc-800/80 bg-zinc-900/40 flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>Pressione ESC para fechar</span>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-sans text-xs font-medium transition-colors cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
