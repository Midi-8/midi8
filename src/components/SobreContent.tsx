"use client";

import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/contact";
import { motion } from "framer-motion";

const engineeringPillars = [
  {
    tag: "01 // TOLERÂNCIA A FALHAS",
    title: "Resiliência por Design",
    description:
      "Sistemas concebidos para operar em cenários adversos sem degradação catastrófica. Implementamos circuit breakers, retry budgets com jitter exponencial, balanceamento inteligente e auto-recuperação sem intervenção humana.",
    metrics: [
      { label: "Failover Autónomo", value: "< 250ms" },
      { label: "Isolamento de Falhas", value: "Bulkheading" },
    ],
    icon: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    tag: "02 // CRIPTOGRAFIA & SOBERANIA",
    title: "Arquitetura Zero-Trust",
    description:
      "Nenhuma entidade — interna ou externa — é confiada por padrão. Autenticação criptográfica fim-a-fim, validação contínua de permissões por token efêmero, isolamento de workloads corporativos e conformidade estrita de dados.",
    metrics: [
      { label: "Modelo de Confiança", value: "Zero-Trust" },
      { label: "Gestão de Segredos", value: "mTLS & Vault" },
    ],
    icon: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    tag: "03 // LATÊNCIA SUBMILISEGUNDO",
    title: "Performance Extrema",
    description:
      "A velocidade é uma funcionalidade essencial de negócio. Eliminamos sobrecargas de framework, otimizamos tempos de execução em Edge, aplicamos algoritmos O(1)/O(n log n) e mantemos orçamentos rígidos de memória e CPU.",
    metrics: [
      { label: "Distribuição", value: "Edge Native" },
      { label: "Core Web Vitals", value: "100/100" },
    ],
    icon: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

const auditTiers = [
  {
    tier: "NÍVEL 01",
    name: "Análise Estática & AST",
    desc: "Inspeção profunda de grafos de dependências, deteção de memory leaks, checagem estrita de tipos e prevenção de vulnerabilidades CVE.",
  },
  {
    tier: "NÍVEL 02",
    name: "Testes de Carga & Caos",
    desc: "Simulação de estresse com injeção artificial de latência e concorrência massiva para comprovar estabilidade sob picos reais de tráfego.",
  },
  {
    tier: "NÍVEL 03",
    name: "Verificação Formal & Observabilidade",
    desc: "Rastreio distribuído em OpenTelemetry, logs estruturados e instrumentação de métricas P95/P99 para garantia de visibilidade operacional total.",
  },
];

export default function SobreContent() {

  return (
    <main className="flex-1 text-foreground overflow-x-clip pt-28">
      {/* ─── 1. HERO DO MANIFESTO ─── */}
      <section className="relative max-w-5xl mx-auto px-6 pt-12 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10"
        >
          {/* Badge */}
          <div className="pill mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            MANIFESTO // A EMPRESA
          </div>

          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
            Não construímos apenas interfaces.{" "}
            <span className="text-gradient">
              Desenhamos infraestruturas.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted leading-relaxed mb-10">
            A Midi8 nasceu da convicção de que o software empresarial deve ser tratado
            com o mesmo rigor matemático e de segurança que sustenta as indústrias de missão crítica.
            Somos o núcleo de engenharia de ponta a ponta para líderes que não toleram código descartável.
          </p>

          {/* Metric Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-border/80">
            {[
              { label: "Filosofia", value: "Deep Tech" },
              { label: "Padrão de Código", value: "Zero-Shortcut" },
              { label: "Foco Estratégico", value: "Alta Escala" },
              { label: "Compromisso", value: "Soberania" },
            ].map((m) => (
              <div key={m.label} className="well p-3">
                <p className="text-[10px] font-mono uppercase tracking-widest text-subtle">{m.label}</p>
                <p className="text-sm font-semibold text-foreground font-mono mt-0.5">{m.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── 2. PILARES DE ENGENHARIA (Bento Box Simplificada) ─── */}
      <section className="relative max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-3">Fundamentos Inegociáveis</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Pilares de Engenharia
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted font-mono max-w-sm">
            Arquitetura desenhada para perdurar, escalar horizontalmente e resistir a falhas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {engineeringPillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bento-card p-8 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle top copper accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent group-hover:via-accent/50 transition-all duration-500" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="icon-tile w-10 h-10 rounded-xl">
                    {pillar.icon}
                  </div>
                </div>

                <p className="text-[11px] font-mono text-subtle tracking-wider mb-2">
                  {pillar.tag}
                </p>
                <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-6">
                  {pillar.description}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="pt-4 border-t border-border/80 flex items-center justify-between text-xs font-mono">
                {pillar.metrics.map((m) => (
                  <div key={m.label}>
                    <span className="text-subtle block text-[10px] uppercase">{m.label}</span>
                    <span className="text-secondary font-semibold">{m.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── 3. GOVERNANÇA & AUDITORIA TÉCNICA ─── */}
      <section className="relative max-w-6xl mx-auto px-6 py-20">
        <div className="bento-card p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-3">Liderança & Governança de Sistemas</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-4">
              Engenharia sem concessões.
              <br />
              Auditorias contínuas em cada linha de código.
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Trabalhamos sob um modelo direto de arquitetura executiva: sem camadas intermediárias
              de gestão desnecessárias. O vosso sistema é auditado diretamente por arquitetos séniores
              utilizando ferramentas estáticas, análise formal e testes de penetração antes de qualquer deploy em produção.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {auditTiers.map((tier) => (
              <div
                key={tier.tier}
                className="well p-5 transition-colors hover:border-border-light"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-[11px] font-mono text-accent font-semibold tracking-wider">
                    {tier.tier}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {tier.name}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  {tier.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. CTA FINAL ─── */}
      <section className="relative max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-10 sm:p-14 overflow-hidden"
        >
          {/* Subtle separator glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

          <p className="eyebrow mb-4">Inicie a Parceria</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
            Pronto para elevar o padrão técnico da sua empresa?
          </h2>
          <p className="text-sm text-muted max-w-lg mx-auto mb-8 leading-relaxed">
            Agende uma sessão técnica confidencial com os nossos arquitetos para discutir arquitetura,
            viabilidade e planeamento de engenharia.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
