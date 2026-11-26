"use client";

import Link from "next/link";
import KineticHeading from "@/components/KineticHeading";
import { useLanguage, type Locale } from "@/context/LanguageContext";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, SOCIAL } from "@/lib/contact";

const ACCENTS = ["#C015FF", "#0069F8", "#00E8B2"] as const;

interface TocItem {
  id: string;
  code: string;
  label: Record<Locale, string>;
}

const TOC: TocItem[] = [
  {
    id: "titularidade",
    code: "01",
    label: { pt: "Titularidade do Website", en: "Website Ownership" },
  },
  {
    id: "objeto",
    code: "02",
    label: { pt: "Objeto & Serviços", en: "Scope of Services" },
  },
  {
    id: "propostas-confidencialidade",
    code: "03",
    label: { pt: "Propostas & Confidencialidade", en: "Proposals & Confidentiality" },
  },
  {
    id: "propriedade-intelectual",
    code: "04",
    label: { pt: "Propriedade Intelectual", en: "Intellectual Property" },
  },
  {
    id: "utilizacao",
    code: "05",
    label: { pt: "Condições de Utilização", en: "Acceptable Use" },
  },
  {
    id: "responsabilidade",
    code: "06",
    label: { pt: "Limitação de Responsabilidade", en: "Limitation of Liability" },
  },
  {
    id: "links-terceiros",
    code: "07",
    label: { pt: "Ligações a Terceiros", en: "External Links" },
  },
  {
    id: "alteracoes",
    code: "08",
    label: { pt: "Alterações aos Termos", en: "Amendments" },
  },
  {
    id: "lei-foro",
    code: "09",
    label: { pt: "Lei Aplicável & Foro", en: "Governing Law & Forum" },
  },
];

const HIGHLIGHTS: Record<Locale, { title: string; text: string; color: string }[]> = {
  pt: [
    {
      title: "Contratação transparente",
      text: "Cada projeto tem âmbito, prazos, orçamento e acordos de nível de serviço (SLA) definidos em contrato autónomo.",
      color: "#C015FF",
    },
    {
      title: "Confidencialidade mútua",
      text: "Todos os briefings, diagnósticos e propostas partilhados com a midi8 são tratados com reserva profissional.",
      color: "#0069F8",
    },
    {
      title: "Enquadramento nacional",
      text: "Regido integralmente pela legislação portuguesa e pelos códigos de propriedade intelectual em vigor.",
      color: "#00E8B2",
    },
  ],
  en: [
    {
      title: "Transparent contracting",
      text: "Every engagement is governed by a standalone service agreement detailing scope, milestones, pricing, and SLAs.",
      color: "#C015FF",
    },
    {
      title: "Mutual confidentiality",
      text: "All project briefings, technical audits, and commercial proposals shared with midi8 are kept strictly confidential.",
      color: "#0069F8",
    },
    {
      title: "Portuguese jurisdiction",
      text: "Governed exclusively by Portuguese law and applicable European intellectual property regulations.",
      color: "#00E8B2",
    },
  ],
};

const SERVICE_DOMAINS: Record<Locale, { title: string; desc: string }[]> = {
  pt: [
    {
      title: "Web, Software & Mobile",
      desc: "Websites institucionais, plataformas web, software à medida e aplicações móveis iOS e Android.",
    },
    {
      title: "Automação, IA & Dados",
      desc: "Integração de sistemas, automação de processos, agentes de Inteligência Artificial, LLMs e análise de dados.",
    },
    {
      title: "Estratégia, Marketing & Campanhas",
      desc: "Posicionamento digital, identidade visual, gestão de redes sociais e campanhas orientadas a resultados.",
    },
    {
      title: "Consultoria & E-commerce",
      desc: "Diagnóstico tecnológico, consultoria estratégica e plataformas de comércio eletrónico otimizadas para conversão.",
    },
  ],
  en: [
    {
      title: "Web, Software & Mobile",
      desc: "Institutional websites, web platforms, bespoke enterprise software, and iOS & Android applications.",
    },
    {
      title: "Automation, AI & Data",
      desc: "Systems integration, workflow automation, custom AI agents, LLM pipelines, and business intelligence.",
    },
    {
      title: "Strategy, Marketing & Campaigns",
      desc: "Digital positioning, brand identity, social media management, and performance-driven acquisition campaigns.",
    },
    {
      title: "Consulting & E-commerce",
      desc: "Technology audits, strategic advisory, and conversion-focused e-commerce platforms.",
    },
  ],
};

function ClauseCard({
  id,
  code,
  title,
  accentIndex,
  children,
}: {
  id: string;
  code: string;
  title: string;
  accentIndex: number;
  children: React.ReactNode;
}) {
  const accent = ACCENTS[accentIndex % ACCENTS.length];
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-28 rounded-2xl border border-black/[0.08] bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(15,23,42,0.04),0_16px_34px_-24px_rgba(15,23,42,0.12)] p-5 sm:p-8"
    >
      <div className="flex items-center gap-2.5 mb-4">
        <span
          aria-hidden="true"
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: accent }}
        />
        <span className="text-[11px] font-bold tracking-widest uppercase text-subtle tabular-nums">
          {code}
        </span>
      </div>
      <h2
        id={`${id}-heading`}
        className="text-lg sm:text-2xl font-bold text-foreground tracking-tight leading-snug mb-4"
      >
        {title}
      </h2>
      <div className="space-y-4 text-sm sm:text-[15px] text-secondary leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function TermosContent() {
  const { locale } = useLanguage();
  const isEn = locale === "en";
  const highlights = HIGHLIGHTS[locale];
  const domains = SERVICE_DOMAINS[locale];

  return (
    <main className="flex-1 text-foreground overflow-x-clip">
      {/* ─── Cabeçalho Editorial com Aurora Oficial midi8 ─── */}
      <section className="relative w-full pt-24 sm:pt-36 pb-8 sm:pb-14 px-4 sm:px-6 overflow-hidden">
        <div aria-hidden="true" className="top-aurora-fade opacity-70" />
        <div aria-hidden="true" className="top-aurora-grain" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-subtle mb-4 sm:mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">
              {isEn ? "Home" : "Início"}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">
              {isEn ? "Terms & Conditions" : "Termos e Condições"}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <KineticHeading
                className="type-headline-lg text-foreground mb-3.5 sm:mb-5"
                segments={
                  isEn
                    ? [
                        { text: "Terms & " },
                        { text: "Conditions", italic: true },
                        { text: "." },
                      ]
                    : [
                        { text: "Termos e " },
                        { text: "Condições", italic: true },
                        { text: "." },
                      ]
                }
              />
              <p className="type-body text-muted text-pretty">
                {isEn
                  ? "General terms governing access to and use of the midi8 website, pre-contractual inquiries, intellectual property, and service engagement."
                  : "Condições gerais que regem o acesso e utilização do website da midi8, os pedidos de proposta, a propriedade intelectual e o enquadramento dos nossos serviços."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 text-xs text-subtle shrink-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 border border-black/[0.08] px-3 py-1.5 text-foreground">
                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#0069F8]" />
                {isEn ? "Updated: " : "Atualizado: "}
                <time dateTime="2026-11" className="font-bold">
                  {isEn ? "November 2026" : "Novembro 2026"}
                </time>
              </span>
              <span className="inline-flex items-center rounded-full bg-white/90 border border-black/[0.08] px-3 py-1.5 text-muted">
                {isEn ? "Portuguese Law" : "Legislação Portuguesa"}
              </span>
              <Link
                href="/privacidade"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/90 border border-black/[0.08] px-3 py-1.5 text-foreground hover:bg-foreground hover:text-white hover:border-foreground transition-colors"
              >
                <span>{isEn ? "Privacy Policy" : "Política de Privacidade"}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Resumo Executivo em 3 pilares */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-black/[0.08] bg-white/90 backdrop-blur-sm p-4 sm:p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_24px_-18px_rgba(15,23,42,0.12)]"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    aria-hidden="true"
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <p className="text-sm font-bold text-foreground">{item.title}</p>
                </div>
                <p className="text-xs sm:text-[13px] text-muted leading-relaxed text-pretty">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Conteúdo Legal Estruturado (Índice Sticky + Cláusulas Cerâmicas) ─── */}
      <section className="relative w-full pt-4 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Índice Mobile Horizontal */}
          <nav
            aria-label={isEn ? "Table of contents" : "Índice dos termos"}
            className="lg:hidden flex items-center gap-2 overflow-x-auto no-scrollbar pb-1"
          >
            {TOC.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="inline-flex items-center gap-1.5 shrink-0 rounded-full border border-black/[0.08] bg-white/95 px-3 py-1.5 text-xs text-muted hover:text-foreground hover:border-border-light transition-colors"
              >
                <span className="font-bold text-subtle tabular-nums">{item.code}</span>
                <span>{item.label[locale]}</span>
              </a>
            ))}
          </nav>

          {/* Barra Lateral Sticky (Desktop) */}
          <aside className="hidden lg:flex lg:col-span-4 lg:sticky lg:top-24 flex-col gap-4">
            <nav
              aria-label={isEn ? "Table of contents" : "Índice dos termos"}
              className="rounded-2xl border border-black/[0.08] bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(15,23,42,0.04),0_16px_34px_-24px_rgba(15,23,42,0.12)] p-5"
            >
              <p className="text-[11px] font-bold uppercase tracking-widest text-subtle mb-3.5 px-2">
                {isEn ? "Contents" : "Índice"}
              </p>
              <ul className="flex flex-col gap-0.5">
                {TOC.map((item, idx) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="group flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] text-muted hover:text-foreground hover:bg-surface/80 transition-colors"
                    >
                      <span
                        className="text-[11px] font-bold tabular-nums transition-colors"
                        style={{ color: ACCENTS[idx % ACCENTS.length] }}
                      >
                        {item.code}
                      </span>
                      <span className="truncate">{item.label[locale]}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="rounded-2xl border border-black/[0.08] bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(15,23,42,0.04)] p-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-subtle mb-2">
                {isEn ? "Legal & Commercial" : "Contacto Legal & Comercial"}
              </p>
              <p className="text-xs text-muted leading-relaxed mb-3.5">
                {isEn
                  ? "Need clarification on service contracts, SLAs, or intellectual property terms?"
                  : "Precisa de esclarecimentos sobre contratos de serviço, SLAs ou propriedade intelectual?"}
              </p>
              <div className="flex flex-col gap-1.5 text-xs mb-4">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-bold text-foreground hover:text-brand-blue transition-colors break-all"
                >
                  {CONTACT_EMAIL}
                </a>
                <a
                  href={CONTACT_PHONE_HREF}
                  className="text-muted hover:text-foreground transition-colors"
                >
                  {CONTACT_PHONE}
                </a>
              </div>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-brand-blue transition-colors"
              >
                <span>{isEn ? "Talk to our team" : "Falar com a equipa"}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </aside>

          {/* Coluna Principal de Cláusulas */}
          <article className="lg:col-span-8 flex flex-col gap-4 sm:gap-5">
            {/* 01. Titularidade */}
            <ClauseCard
              id="titularidade"
              code="01"
              title={
                isEn
                  ? "Identification of the Website Owner"
                  : "Identificação do Titular do Website"
              }
              accentIndex={0}
            >
              <p>
                {isEn
                  ? "By accessing, browsing, or submitting requests through this website, you acknowledge and agree to these Terms and Conditions. This platform is owned and operated by:"
                  : "Ao aceder, navegar ou submeter pedidos através deste website, o utilizador declara aceitar expressamente e sem reservas os presentes Termos e Condições. O website é titulado e gerido por:"}
              </p>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="rounded-xl bg-surface/75 border border-border p-3.5">
                  <dt className="text-[11px] uppercase tracking-wider text-subtle mb-1">
                    {isEn ? "Entity" : "Entidade"}
                  </dt>
                  <dd className="text-sm font-bold text-foreground">midi8</dd>
                  <dd className="text-xs text-muted mt-0.5">
                    {isEn
                      ? "Technology, Software, Automation & Digital Communication"
                      : "Tecnologia, Software, Automação & Comunicação Digital"}
                  </dd>
                </div>
                <div className="rounded-xl bg-surface/75 border border-border p-3.5">
                  <dt className="text-[11px] uppercase tracking-wider text-subtle mb-1">
                    {isEn ? "Jurisdiction & Contact" : "Jurisdição & Contacto"}
                  </dt>
                  <dd className="text-sm font-bold text-foreground">Portugal (UE)</dd>
                  <dd className="text-xs text-muted mt-0.5">
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-brand-blue hover:underline break-all"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </dd>
                </div>
              </dl>
            </ClauseCard>

            {/* 02. Objeto e Âmbito */}
            <ClauseCard
              id="objeto"
              code="02"
              title={isEn ? "Scope of Services" : "Objeto e Âmbito dos Serviços"}
              accentIndex={1}
            >
              <p>
                {isEn
                  ? "midi8 delivers tailored digital engineering, automation, artificial intelligence, and brand communication solutions across four core practice areas:"
                  : "A midi8 concebe e executa soluções digitais sob medida, engenharia de software, automação, inteligência artificial e comunicação estratégica em quatro áreas nucleares:"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {domains.map((domain) => (
                  <div
                    key={domain.title}
                    className="rounded-xl bg-surface/75 border border-border p-3.5 sm:p-4"
                  >
                    <p className="text-sm font-bold text-foreground mb-1">{domain.title}</p>
                    <p className="text-xs text-muted leading-relaxed">{domain.desc}</p>
                  </div>
                ))}
              </div>
            </ClauseCard>

            {/* 03. Propostas, Contratação e Confidencialidade */}
            <ClauseCard
              id="propostas-confidencialidade"
              code="03"
              title={
                isEn
                  ? "Proposals, Contracting, and Confidentiality"
                  : "Propostas Comerciais, Contratação e Confidencialidade"
              }
              accentIndex={2}
            >
              <p>
                {isEn
                  ? "Information published on this website is provided for general informational purposes and does not constitute a binding contractual offer. Every client engagement, including scope, deliverables, intellectual property transfer, pricing, and Service Level Agreements (SLAs), is formalized through an individual written contract."
                  : "A informação disponibilizada neste website tem caráter informativo e não constitui proposta contratual vinculativa. Cada prestação de serviços, incluindo âmbito, entregáveis, prazos, orçamento, titularidade de código e acordos de nível de serviço (SLA), é formalizada mediante proposta aprovada e contrato autónomo celebrado entre as partes."}
              </p>
              <div className="rounded-xl bg-surface/75 border border-border p-4 text-xs sm:text-sm text-muted">
                <strong className="text-foreground block mb-1">
                  {isEn ? "Confidentiality of Briefings" : "Sigilo e Reserva Profissional"}
                </strong>
                {isEn
                  ? "All business context, technical specifications, and project briefings submitted through our contact channels are handled under strict professional confidentiality and used solely to evaluate and prepare the requested proposal."
                  : "Todos os briefings, especificações técnicas, métricas e informações de negócio partilhados através dos nossos canais de contacto são tratados com estrito sigilo profissional e utilizados exclusivamente para análise e preparação da proposta solicitada."}
              </div>
            </ClauseCard>

            {/* 04. Propriedade Intelectual */}
            <ClauseCard
              id="propriedade-intelectual"
              code="04"
              title={
                isEn
                  ? "Intellectual and Industrial Property"
                  : "Propriedade Intelectual e Industrial"
              }
              accentIndex={0}
            >
              <p>
                {isEn ? (
                  <>
                    All elements featured on this website - including the <strong className="text-foreground">midi8</strong> trademark, logotypes, iconography, copy, visual design, interactive 3D graphics, shaders, and source code - are the exclusive property of midi8 or licensed third parties, protected under the{" "}
                    <strong className="text-foreground">Portuguese Copyright and Related Rights Code</strong> and the{" "}
                    <strong className="text-foreground">Industrial Property Code</strong>.
                  </>
                ) : (
                  <>
                    Todos os conteúdos e elementos presentes neste website - incluindo a marca <strong className="text-foreground">midi8</strong>, logótipos, iconografia, textos, design visual, gráficos interativos 3D, shaders e código-fonte - constituem propriedade exclusiva da midi8 ou de terceiros que autorizaram legitimamente o seu uso, encontrando-se protegidos pelo{" "}
                    <strong className="text-foreground">Código do Direito de Autor e dos Direitos Conexos</strong> e pelo{" "}
                    <strong className="text-foreground">Código da Propriedade Industrial</strong>.
                  </>
                )}
              </p>
              <p className="text-xs sm:text-sm text-muted">
                {isEn
                  ? "Any reproduction, distribution, modification, decompilation, scraping, reverse engineering, or commercial exploitation, in whole or in part, without prior written consent from midi8 is strictly prohibited."
                  : "É estritamente proibida qualquer reprodução, cópia, distribuição, modificação, extração automatizada, engenharia inversa ou exploração comercial, total ou parcial, sem autorização prévia e escrita da midi8."}
              </p>
            </ClauseCard>

            {/* 05. Condições de Utilização */}
            <ClauseCard
              id="utilizacao"
              code="05"
              title={
                isEn
                  ? "Website Use and Acceptable Conduct"
                  : "Condições de Utilização do Website"
              }
              accentIndex={1}
            >
              <p>
                {isEn
                  ? "Users agree to access and use this website diligently, in good faith, and in compliance with applicable law. The following actions are strictly prohibited:"
                  : "O utilizador compromete-se a utilizar este website de forma diligente, de boa-fé e em estrito cumprimento da legislação aplicável. É expressamente vedado:"}
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-muted">
                <li className="flex items-start gap-2.5 rounded-xl bg-surface/75 border border-border px-3.5 py-2.5">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#C015FF] mt-1.5 shrink-0" />
                  <span>
                    {isEn
                      ? "Conducting actions designed to disrupt, overload, probe, or degrade server infrastructure or associated network services."
                      : "Executar ações destinadas a danificar, sobrecarregar, testar vulnerabilidades sem autorização ou comprometer a infraestrutura técnica do website."}
                  </span>
                </li>
                <li className="flex items-start gap-2.5 rounded-xl bg-surface/75 border border-border px-3.5 py-2.5">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#0069F8] mt-1.5 shrink-0" />
                  <span>
                    {isEn
                      ? "Attempting unauthorized access to restricted endpoints, systems, or internal IT resources of midi8."
                      : "Tentar aceder sem autorização a sistemas, endpoints restritos ou recursos informáticos internos da midi8."}
                  </span>
                </li>
                <li className="flex items-start gap-2.5 rounded-xl bg-surface/75 border border-border px-3.5 py-2.5">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#00E8B2] mt-1.5 shrink-0" />
                  <span>
                    {isEn
                      ? "Submitting fraudulent, unlawful, defamatory, automated spam, or malicious payloads via contact forms."
                      : "Submeter através dos formulários de contacto conteúdos fraudulentos, ilícitos, difamatórios, spam automatizado ou código malicioso."}
                  </span>
                </li>
              </ul>
            </ClauseCard>

            {/* 06. Limitação de Responsabilidade */}
            <ClauseCard
              id="responsabilidade"
              code="06"
              title={
                isEn
                  ? "Availability and Limitation of Liability"
                  : "Disponibilidade e Limitação de Responsabilidade"
              }
              accentIndex={2}
            >
              <p>
                {isEn
                  ? "midi8 follows modern software engineering standards to ensure continuous uptime, security, and accuracy of published content. Nonetheless, midi8 cannot guarantee uninterrupted availability free from scheduled maintenance, third-party telecommunications disruptions, or force majeure events."
                  : "A midi8 adota boas práticas de engenharia de software para assegurar a disponibilidade contínua, segurança e rigor técnico das informações publicadas. Contudo, não pode garantir ausência absoluta de interrupções temporárias decorrentes de manutenção programada, falhas de telecomunicações de terceiros ou eventos de força maior."}
              </p>
              <p className="text-xs sm:text-sm text-muted">
                {isEn
                  ? "Nothing on this website substitutes a dedicated technical diagnosis or tailored contractual specification."
                  : "Nenhuma informação apresentada neste website dispensa uma avaliação técnica dedicada para definição de especificações contratuais definitivas."}
              </p>
            </ClauseCard>

            {/* 07. Ligações Externas */}
            <ClauseCard
              id="links-terceiros"
              code="07"
              title={
                isEn
                  ? "Links to Third-Party Platforms"
                  : "Ligações para Plataformas de Terceiros"
              }
              accentIndex={0}
            >
              <p>
                {isEn
                  ? `This website includes links to external platforms operated by third parties (such as LinkedIn and Instagram ${SOCIAL.instagramHandle}). midi8 does not control external websites and assumes no responsibility for their availability, content, terms, or privacy practices.`
                  : `Este website inclui hiperligações para plataformas externas geridas por terceiros (como LinkedIn e Instagram ${SOCIAL.instagramHandle}). A midi8 não exerce controlo sobre esses sítios externos e não assume responsabilidade pelos respetivos conteúdos, disponibilidade ou políticas de privacidade.`}
              </p>
            </ClauseCard>

            {/* 08. Alterações */}
            <ClauseCard
              id="alteracoes"
              code="08"
              title={
                isEn
                  ? "Amendments to Terms & Conditions"
                  : "Alterações aos Termos e Condições"
              }
              accentIndex={1}
            >
              <p>
                {isEn
                  ? "midi8 reserves the right to update these Terms and Conditions at any time to reflect service evolution or legal changes. Amendments take effect immediately upon publication on this page."
                  : "A midi8 reserva-se o direito de rever e atualizar os presentes Termos e Condições em qualquer momento para refletir a evolução dos seus serviços ou alterações legislativas. As atualizações produzem efeitos imediatamente após a sua publicação nesta página."}
              </p>
            </ClauseCard>

            {/* 09. Lei Aplicável e Foro */}
            <ClauseCard
              id="lei-foro"
              code="09"
              title={
                isEn
                  ? "Governing Law and Jurisdiction"
                  : "Lei Aplicável, Resolução de Litígios e Foro Competente"
              }
              accentIndex={2}
            >
              <p>
                {isEn ? (
                  <>
                    These Terms and Conditions are governed exclusively by the{" "}
                    <strong className="text-foreground">laws of Portugal</strong>.
                  </>
                ) : (
                  <>
                    Os presentes Termos e Condições regem-se exclusivamente pela{" "}
                    <strong className="text-foreground">legislação portuguesa</strong>.
                  </>
                )}
              </p>
              <div className="rounded-xl bg-surface/75 border border-border p-4 text-xs sm:text-sm text-muted space-y-2">
                <p>
                  {isEn
                    ? "Both parties agree to seek an amicable resolution first for any dispute arising out of the interpretation or application of these terms. Failing amicable settlement, the competent courts of Portugal shall have territorial jurisdiction."
                    : "Em caso de litígio emergente da interpretação, validade ou execução dos presentes termos, as partes procurarão prioritariamente uma resolução amigável. Na falta de acordo, são competentes os tribunais portugueses territorialmente competentes."}
                </p>
                <p>
                  {isEn ? (
                    <>
                      For data protection matters, please also review our{" "}
                      <Link href="/privacidade" className="font-bold text-brand-blue hover:underline">
                        Privacy Policy
                      </Link>
                      .
                    </>
                  ) : (
                    <>
                      Para questões relacionadas com o tratamento de dados pessoais, consulte igualmente a nossa{" "}
                      <Link href="/privacidade" className="font-bold text-brand-blue hover:underline">
                        Política de Privacidade
                      </Link>
                      .
                    </>
                  )}
                </p>
              </div>
            </ClauseCard>

            {/* Navegação Inferior */}
            <div className="mt-4 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
              >
                <span aria-hidden="true">←</span>
                <span>{isEn ? "Back to home page" : "Voltar à página inicial"}</span>
              </Link>
              <Link
                href="/privacidade"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground hover:text-brand-blue transition-colors"
              >
                <span>{isEn ? "Read Privacy Policy" : "Consultar Política de Privacidade"}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
