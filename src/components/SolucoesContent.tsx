"use client";

import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/contact";
import { motion } from "framer-motion";

const solutions = [
  {
    num: "01",
    tag: "SISTEMAS DISTRIBUÍDOS",
    title: "Web & Sistemas Distribuídos",
    description:
      "Aplicações de alto desempenho, arquiteturas baseadas em microsserviços e portais corporativos desenhados para escalar desde o primeiro dia.",
    deliverables: [
      "Aplicações Web & SaaS de Baixa Latência",
      "Arquiteturas de Microsserviços e Edge Computing",
      "Sistemas de Alta Disponibilidade (Multi-Região)",
      "APIs RESTful e GraphQL de Nível Corporativo",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Docker"],
    icon: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    num: "02",
    tag: "WORKFLOWS & INTEGRAÇÃO",
    title: "Automação de Processos",
    description:
      "Eliminação de trabalho manual. Integramos sistemas, criamos fluxos de dados contínuos e otimizamos operações para máxima eficiência.",
    deliverables: [
      "Pipelines Assíncronos & Processamento de Eventos",
      "Integração de ERPs, CRMs e Gateways de Pagamento",
      "Sincronização Bidirecional em Tempo Real",
      "Tratamento Autónomo de Exceções e Retries",
    ],
    tech: ["Node.js", "Python", "Webhooks", "Queues"],
    icon: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    num: "03",
    tag: "IA APLICADA & DADOS",
    title: "Inteligência Artificial e Dados",
    description:
      "Transformamos dados isolados em motores de decisão. Implementação de modelos preditivos, agentes autónomos e tratamento massivo de informação.",
    deliverables: [
      "Pipelines de Embeddings & RAG Corporativo",
      "Agentes Autónomos Especializados de Suporte e Análise",
      "Modelos Preditivos de Risco e Procura",
      "Arquiteturas de Dados com PostgreSQL / pgvector",
    ],
    tech: ["Python", "OpenAI / Claude", "pgvector", "FastAPI"],
    icon: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    num: "04",
    tag: "DIREÇÃO TÉCNICA EXECUTIVA",
    title: "Consultoria e Auditoria",
    description:
      "Aconselhamento executivo, revisão de código (Code Review) e reestruturação de bases de dados. Garantimos que a sua tecnologia não é um passivo financeiro.",
    deliverables: [
      "Auditorias Profundas de Código, Segurança e AST",
      "Revisão de Infraestrutura e Redução de Custos Cloud",
      "Otimização de Índices e Queries em PostgreSQL",
      "Due Diligence Técnica para Fusões e Investimentos",
    ],
    tech: ["PostgreSQL", "Cloud Ops", "Security AST", "Next.js"],
    icon: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
];

const technologies = [
  { name: "Next.js", role: "Framework Core" },
  { name: "Node.js", role: "Runtime Assíncrono" },
  { name: "Python", role: "IA & Automação" },
  { name: "PostgreSQL", role: "Base de Dados Relacional" },
  { name: "Supabase", role: "Edge & Realtime" },
  { name: "TypeScript", role: "Tipagem Estrita" },
  { name: "Tailwind CSS", role: "Design System" },
  { name: "Framer Motion", role: "Cinemática de UI" },
];

export default function SolucoesContent() {

  return (
    <main className="flex-1 text-foreground overflow-x-clip pt-28">
      {/* ─── HERO DE SOLUÇÕES ─── */}
      <section className="relative max-w-5xl mx-auto px-6 pt-12 pb-20 text-center max-md:text-left max-md:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >

          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl max-md:text-[2.75rem] font-bold tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
            Engenharia Aplicada{" "}
            <span className="text-gradient">
              ao Negócio.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-md:hidden max-w-2xl mx-auto text-base sm:text-lg text-muted leading-relaxed">
            Desenhamos, construímos e otimizamos a infraestrutura tecnológica da sua empresa.
            Sem atalhos, com foco absoluto na performance e resiliência operacional.
          </p>
        </motion.div>
      </section>

      {/* ─── GRELHA DE CAPACIDADE TÉCNICA (MATRIZ 2X2) ─── */}
      <section className="relative max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-md:gap-0">
          {solutions.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bento-card p-8 sm:p-9 max-md:px-0 max-md:py-6 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top ambient highlight on hover */}

              <div>
                {/* Header row: Icon + Number badge */}
                <div className="flex items-center justify-between mb-6 max-md:mb-2">
                  <div className="max-md:hidden icon-tile w-10 h-10 rounded-xl">
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold text-subtle group-hover:text-accent transition-colors">
                    {item.num}
                  </span>
                </div>

                {/* Tag & Title */}
                <p className="text-xs text-accent tracking-wider mb-2 uppercase">
                  {item.tag}
                </p>
                <h3 className="text-2xl max-md:text-2xl max-md:leading-[1.05] font-bold text-foreground mb-3 max-md:mb-0 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-6 max-md:text-xs max-md:text-subtle max-md:mt-2 max-md:mb-0">
                  {item.description}
                </p>

                {/* Deliverables checklist */}
                <div className="max-md:hidden space-y-2 mb-8">
                  {item.deliverables.map((d) => (
                    <div key={d} className="flex items-start gap-2.5 text-xs text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies strip */}
              <div className="max-md:hidden pt-5 border-t border-border/70 flex flex-wrap gap-1.5">
                {item.tech.map((t) => (
                  <span
                    key={t}
                    className="chip"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── STACK TECNOLÓGICA (NEUTRA & MONOCROMÁTICA) ─── */}
      <section className="max-md:hidden relative max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-8">
          <p className="eyebrow mb-3">Ecossistema & Ferramentas</p>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
            Tecnologia Selecionada por Estabilidade
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
          {technologies.map((t) => (
            <div
              key={t.name}
              className="tech-badge"
            >
              <span className="text-foreground">{t.name}</span>
              <span className="text-subtle text-xs">· {t.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA EXECUTIVO ─── */}
      <section className="relative max-w-4xl mx-auto px-6 py-16 max-md:py-12 text-center max-md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-10 sm:p-14 max-md:px-0 max-md:py-8 overflow-hidden"
        >
          {/* Subtle separator glow */}
          <div className="max-md:hidden absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

          <p className="eyebrow mb-4">Avaliação Técnica Direta</p>
          <h2 className="text-3xl sm:text-4xl max-md:text-[2.5rem] max-md:leading-[1.05] font-bold text-foreground tracking-tight mb-4 max-md:mb-8">
            Vamos avaliar a arquitetura do seu próximo projeto.
          </h2>
          <p className="max-md:hidden text-sm text-muted max-w-lg mx-auto mb-8 leading-relaxed">
            Uma sessão com os nossos arquitetos para mapear requisitos, analisar dependências
            críticas e traçar o roadmap de engenharia ideal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center max-md:items-stretch max-md:gap-2 gap-4">
            <Link
              href="/contacto"
              className="cta-button cursor-pointer w-full sm:w-auto"
            >
              <span>Agendar Reunião Técnica</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a href={`mailto:${CONTACT_EMAIL}`} className="cta-button cta-secondary w-full sm:w-auto">
              <span>{CONTACT_EMAIL}</span>
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
