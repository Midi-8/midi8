"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import { useIsMobile } from "@/hooks/useIsMobile";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
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
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function Showcase({ isMobile: isMobileProp }: { isMobile?: boolean } = {}) {
  const isMobileLocal = useIsMobile();
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
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho da secção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-md:mb-6"
        >
          <p className="eyebrow mb-4">Portfólio</p>
          <h2 className="text-3xl sm:text-4xl max-md:text-[2.75rem] max-md:leading-[1.02] font-bold text-foreground tracking-tight">
            Engenharia aplicada.
            <br />
            <span className="text-subtle">Resultados em produção.</span>
          </h2>
        </motion.div>

        {/* Grelha responsiva: 1 coluna em mobile, 2 em tablet, 3 em desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-md:gap-0 items-stretch"
        >
          {projects.map((project) => {
            const hasCaseStudy = Boolean(project.caseStudy);

            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover={
                  isMobile || shouldReduceMotion
                    ? undefined
                    : {
                        y: -6,
                        transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                      }
                }
                className="glass-card overflow-hidden group relative flex flex-col justify-between h-full"
              >
                <div className="relative p-6 sm:p-8 max-md:px-0 max-md:py-6 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Linha de Tipo + Estado */}
                    <div className="mb-5 max-md:hidden">
                      <span className="chip text-secondary">
                        {project.type}
                      </span>
                    </div>

                    {/* Ícone e Título */}
                    <div className="mb-5 max-md:mb-3 flex items-center gap-3.5">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-foreground max-md:text-2xl max-md:tracking-tight max-md:leading-[1.05]">
                          {project.name}
                        </h3>
                      </div>
                    </div>

                    {/* Resultado principal, dos dados reais do caso de estudo */}
                    {project.caseStudy && (
                      <div className="max-md:hidden mb-6">
                        <p className="font-display text-4xl font-extrabold text-foreground">
                          {project.caseStudy.results[0].metric}
                        </p>
                        <p className="mt-1 text-sm text-muted leading-snug">
                          {project.caseStudy.results[0].description}
                        </p>
                      </div>
                    )}

                    {/* Descrição */}
                    <p className="text-sm text-muted leading-relaxed mb-6 max-md:text-xs max-md:text-subtle max-md:mb-4">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags da Stack */}
                    <div className="max-md:hidden flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="chip"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Ação interativa do Case Study */}
                    <div className="flex items-center justify-start">

                      {hasCaseStudy ? (
                        <button
                          ref={(el) => {
                            triggerButtonRefs.current[project.id] = el;
                          }}
                          type="button"
                          onClick={() => setActiveProject(project)}
                          aria-label={`Ver case study detalhado de ${project.name}`}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded py-1 px-1.5 max-md:min-h-11 max-md:px-3 max-md:-mx-3 max-md:active:text-accent-hover cursor-pointer group/btn"
                        >
                          <span>Explorar</span>
                          <svg
                            className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
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
                          className="inline-flex items-center gap-1.5 text-sm text-subtle hover:text-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded py-1 px-1.5 max-md:min-h-11 max-md:px-3 max-md:-mx-3 max-md:active:text-muted cursor-pointer"
                        >
                          <span>Em preparação</span>
                          <svg
                            className="w-3 h-3 text-faint"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
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
              className="fixed inset-0 bg-background/80 backdrop-blur-md"
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
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }}
              transition={{ duration: shouldReduceMotion ? 0.05 : 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="glass-sheet relative w-full max-w-3xl rounded-[var(--radius-card)] border border-border shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Cabeçalho do modal */}
              <div className="p-6 sm:p-8 border-b border-border flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-accent">
                        Case study
                      </span>
                      <span className="text-subtle" aria-hidden="true">·</span>
                      <span className="text-sm text-muted">
                        {activeProject.type}
                      </span>
                    </div>
                    <h3
                      id="modal-case-study-title"
                      className="text-xl sm:text-2xl font-bold text-foreground tracking-tight"
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
                  className="icon-tile w-9 h-9 max-md:w-11 max-md:h-11 rounded-lg text-muted hover:text-foreground max-md:active:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer shrink-0"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Corpo com scroll interno sem layout shift */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-foreground">
                <p id="modal-case-study-description" className="text-sm text-secondary leading-relaxed">
                  {activeProject.description}
                </p>

                {activeProject.caseStudy ? (
                  <>
                    {/* 1. Desafio Técnico */}
                    <section aria-labelledby="section-desafio">
                      <div className="mb-3">
                        <h4
                          id="section-desafio"
                          className="text-base font-semibold text-foreground"
                        >
                          1. Desafio Técnico
                        </h4>
                      </div>
                      <div className="well p-5">
                        <p className="text-sm text-secondary leading-relaxed">
                          {activeProject.caseStudy.challenge}
                        </p>
                      </div>
                    </section>

                    {/* 2. Arquitetura Implementada */}
                    <section aria-labelledby="section-arquitetura">
                      <div className="mb-3">
                        <h4
                          id="section-arquitetura"
                          className="text-base font-semibold text-foreground"
                        >
                          2. Arquitetura Implementada
                        </h4>
                      </div>
                      <div className="well p-5 space-y-4">
                        <div>
                          <p className="text-sm text-muted mb-2">
                            Decisões Técnicas
                          </p>
                          <p className="text-sm text-secondary leading-relaxed">
                            {activeProject.caseStudy.architecture.decisions}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-muted mb-2">
                            Stack Tecnológica
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {activeProject.caseStudy.architecture.stack.map((item) => (
                              <span
                                key={item}
                                className="chip text-secondary"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-muted mb-2">
                            Integrações-Chave
                          </p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-secondary">
                            {activeProject.caseStudy.architecture.integrations.map((integ) => (
                              <li key={integ} className="flex items-center gap-2">
                                {integ}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>

                    {/* 3. Resultados Mensuráveis */}
                    <section aria-labelledby="section-resultados">
                      <div className="mb-3">
                        <h4
                          id="section-resultados"
                          className="text-base font-semibold text-foreground"
                        >
                          3. Resultados Mensuráveis
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {activeProject.caseStudy.results.map((res) => (
                          <div
                            key={res.description}
                            className="well p-4 text-center flex flex-col justify-center"
                          >
                            <div className="font-display text-3xl font-extrabold text-foreground mb-1">
                              {res.metric}
                            </div>
                            <p className="text-xs text-muted leading-snug">
                              {res.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  </>
                ) : (
                  <div className="well p-8 border-dashed text-center">
                    <div className="icon-tile w-10 h-10 rounded-full mx-auto mb-3">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h4 className="text-base font-semibold text-foreground mb-2">
                      Case Study em Preparação
                    </h4>
                    <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
                      Os detalhes técnicos deste projeto estão a ser preparados.
                    </p>
                  </div>
                )}
              </div>

              {/* Rodapé do modal */}
              <div className="p-4 sm:p-6 border-t border-border flex items-center justify-between text-sm text-subtle">
                <span className="max-md:hidden">Esc para fechar</span>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="cta-button cta-secondary cta-sm"
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
