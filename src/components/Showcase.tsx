"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";

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

const projects = [
  {
    name: "MR Construções",
    type: "Website Institucional",
    description:
      "Presença digital completa para empresa de construção civil. Design premium, otimizado para SEO e conversão de contactos comerciais.",
    tags: ["Next.js", "Tailwind CSS", "SEO"],
    status: "Em Produção",
    gradient: "from-white/[0.04] via-transparent to-transparent",
    iconGradient: "from-zinc-700 to-zinc-900",
  },
  {
    name: "Café do Rio / Gulas",
    type: "Menu Digital & KDS Mobile",
    description:
      "Sistema completo de menu digital com QR code, painel de gestão e Kitchen Display System (KDS) mobile para operações de restauração em tempo real.",
    tags: ["React", "Supabase", "React Native", "Real-time"],
    status: "Em Produção",
    gradient: "from-white/[0.04] via-transparent to-transparent",
    iconGradient: "from-zinc-700 to-zinc-900",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export default function Showcase({ isMobile: isMobileProp }: { isMobile?: boolean } = {}) {
  const isMobileLocal = useSyncExternalStore(subscribeResize, getSnapshot, getServerSnapshot);
  const isMobile = isMobileProp ?? isMobileLocal;

  return (
    <section id="portfolio" className="section-padding relative">
      {/* Subtle separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
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

        {/* Floating Glass Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              variants={cardVariants}
              animate={
                isMobile
                  ? undefined
                  : {
                      y: [0, index === 0 ? -8 : -10, 0],
                    }
              }
              transition={
                isMobile
                  ? undefined
                  : {
                      y: {
                        duration: 5 + index * 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }
              }
              whileHover={
                isMobile
                  ? undefined
                  : {
                      y: -14,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }
              }
              className="glass-card overflow-hidden group relative"
            >
              {/* Top gradient accent strip (monocromático) */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />

              {/* Ambient glow behind card on hover (monocromático) */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[20px]`}
              />

              <div className="relative p-8 sm:p-10">
                {/* Type highlight + Status row */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900/80 border border-zinc-800 text-xs font-mono font-medium text-foreground tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                    {project.type}
                  </span>
                  <span className="copper-badge">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
                    {project.status}
                  </span>
                </div>

                {/* Project icon / visual */}
                <div className="mb-6 flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.iconGradient} border border-zinc-800 flex items-center justify-center shadow-lg shadow-black/40`}
                  >
                    <span className="text-sm font-bold text-white">
                      {project.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      {project.name}
                    </h3>
                    <p className="text-xs font-mono text-zinc-500 mt-0.5">
                      {project.type}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-400 leading-relaxed mb-8">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-900/60 border border-zinc-800/80 text-zinc-400 hover:border-zinc-700 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Visual separator + "case study coming" hint */}
                <div className="pt-6 border-t border-border/50 flex items-center justify-between">
                  <span className="text-xs text-zinc-600 font-mono">
                    CASE STUDY
                  </span>
                  <span className="text-xs text-zinc-600 flex items-center gap-1.5">
                    Em breve
                    <svg
                      className="w-3 h-3"
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
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
