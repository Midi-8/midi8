"use client";

import Link from "next/link";
import KineticHeading from "@/components/KineticHeading";
import { useLanguage, type Locale } from "@/context/LanguageContext";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF } from "@/lib/contact";

const ACCENTS = ["#C015FF", "#0069F8", "#00E8B2"] as const;

interface TocItem {
  id: string;
  code: string;
  label: Record<Locale, string>;
}

const TOC: TocItem[] = [
  {
    id: "responsavel",
    code: "01",
    label: { pt: "Responsável pelo Tratamento", en: "Data Controller" },
  },
  {
    id: "dados-finalidades",
    code: "02",
    label: { pt: "Dados & Finalidades", en: "Data & Purposes" },
  },
  {
    id: "conservacao",
    code: "03",
    label: { pt: "Prazos de Conservação", en: "Retention Periods" },
  },
  {
    id: "subcontratantes",
    code: "04",
    label: { pt: "Subcontratantes & EEE", en: "Processors & EEA" },
  },
  {
    id: "cookies",
    code: "05",
    label: { pt: "Cookies & Armazenamento", en: "Cookies & Storage" },
  },
  {
    id: "seguranca",
    code: "06",
    label: { pt: "Segurança Técnica", en: "Technical Security" },
  },
  {
    id: "direitos",
    code: "07",
    label: { pt: "Direitos dos Titulares", en: "Data Subject Rights" },
  },
  {
    id: "cnpd",
    code: "08",
    label: { pt: "Autoridade de Controlo", en: "Supervisory Authority" },
  },
  {
    id: "alteracoes",
    code: "09",
    label: { pt: "Alterações à Política", en: "Policy Updates" },
  },
];

const HIGHLIGHTS: Record<Locale, { title: string; text: string; color: string }[]> = {
  pt: [
    {
      title: "Minimização rigorosa",
      text: "Recolhemos apenas os dados essenciais para responder ao seu pedido ou assegurar a estabilidade técnica.",
      color: "#C015FF",
    },
    {
      title: "Zero rastreamento",
      text: "Sem cookies publicitários, de marketing, analíticos ou perfis comportamentais de terceiros.",
      color: "#0069F8",
    },
    {
      title: "Controlo total (RGPD)",
      text: "Pode aceder, retificar ou apagar os seus dados gratuitamente com resposta garantida até 30 dias.",
      color: "#00E8B2",
    },
  ],
  en: [
    {
      title: "Strict minimization",
      text: "We collect only the data strictly required to reply to your inquiry or keep the platform secure.",
      color: "#C015FF",
    },
    {
      title: "Zero tracking",
      text: "No advertising, marketing, analytics, or third-party behavioral tracking cookies.",
      color: "#0069F8",
    },
    {
      title: "Full GDPR control",
      text: "Access, rectify, export, or erase your personal data free of charge within a 30-day response window.",
      color: "#00E8B2",
    },
  ],
};

const RIGHTS: Record<Locale, { title: string; desc: string }[]> = {
  pt: [
    {
      title: "Direito de Acesso",
      desc: "Confirmar se os seus dados são objeto de tratamento e obter cópia integral dos mesmos.",
    },
    {
      title: "Direito de Retificação",
      desc: "Solicitar a correção imediata de dados pessoais inexatos ou o preenchimento de dados incompletos.",
    },
    {
      title: "Direito ao Apagamento",
      desc: "Pedir a eliminação dos seus dados («direito a ser esquecido») dentro dos limites legais aplicáveis.",
    },
    {
      title: "Direito à Limitação",
      desc: "Solicitar a suspensão temporária do tratamento enquanto se verifica a exatidão ou licitude dos dados.",
    },
    {
      title: "Direito de Portabilidade",
      desc: "Receber os dados fornecidos num formato estruturado, de uso corrente e leitura automática.",
    },
    {
      title: "Direito de Oposição",
      desc: "Opor-se em qualquer momento ao tratamento fundamentado em interesses legítimos da midi8.",
    },
  ],
  en: [
    {
      title: "Right of Access",
      desc: "Confirm whether your personal data is being processed and request a complete copy.",
    },
    {
      title: "Right to Rectification",
      desc: "Request prompt correction of inaccurate records or completion of incomplete personal data.",
    },
    {
      title: "Right to Erasure",
      desc: "Request deletion of your personal data (\"right to be forgotten\") within applicable legal limits.",
    },
    {
      title: "Right to Restriction",
      desc: "Request temporary suspension of processing while accuracy or legal grounds are verified.",
    },
    {
      title: "Right to Portability",
      desc: "Receive your submitted personal data in a structured, commonly used, machine-readable format.",
    },
    {
      title: "Right to Object",
      desc: "Object at any time to processing grounded on midi8's legitimate interests.",
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

export default function PrivacidadeContent() {
  const { locale } = useLanguage();
  const isEn = locale === "en";
  const highlights = HIGHLIGHTS[locale];
  const rights = RIGHTS[locale];

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
              {isEn ? "Privacy Policy" : "Política de Privacidade"}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <KineticHeading
                className="type-headline-lg text-foreground mb-3.5 sm:mb-5"
                segments={
                  isEn
                    ? [
                        { text: "Privacy " },
                        { text: "Policy", italic: true },
                        { text: "." },
                      ]
                    : [
                        { text: "Política de " },
                        { text: "Privacidade", italic: true },
                        { text: "." },
                      ]
                }
              />
              <p className="type-body text-muted text-pretty">
                {isEn
                  ? "How midi8 collects, processes, and safeguards personal data in strict compliance with the General Data Protection Regulation (EU 2016/679) and Portuguese Law no. 58/2019."
                  : "Como a midi8 recolhe, trata e protege dados pessoais em estrita conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD - Regulamento UE 2016/679) e a Lei n.º 58/2019."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 text-xs text-subtle shrink-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 border border-black/[0.08] px-3 py-1.5 text-foreground">
                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#00E8B2]" />
                {isEn ? "Updated: " : "Atualizado: "}
                <time dateTime="2026-11" className="font-bold">
                  {isEn ? "November 2026" : "Novembro 2026"}
                </time>
              </span>
              <span className="inline-flex items-center rounded-full bg-white/90 border border-black/[0.08] px-3 py-1.5 text-muted">
                {isEn ? "Portugal · EU (GDPR)" : "Portugal · UE (RGPD)"}
              </span>
              <Link
                href="/termos"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/90 border border-black/[0.08] px-3 py-1.5 text-foreground hover:bg-foreground hover:text-white hover:border-foreground transition-colors"
              >
                <span>{isEn ? "Terms & Conditions" : "Termos e Condições"}</span>
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
            aria-label={isEn ? "Table of contents" : "Índice da política"}
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
              aria-label={isEn ? "Table of contents" : "Índice da política"}
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
                {isEn ? "Privacy Contact" : "Contacto de Privacidade"}
              </p>
              <p className="text-xs text-muted leading-relaxed mb-3.5">
                {isEn
                  ? "Questions about your personal data or GDPR requests? Reach our team directly."
                  : "Questões sobre os seus dados pessoais ou pedidos ao abrigo do RGPD? Fale diretamente connosco."}
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
                <span>{isEn ? "Go to contact form" : "Abrir formulário de contacto"}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </aside>

          {/* Coluna Principal de Cláusulas */}
          <article className="lg:col-span-8 flex flex-col gap-4 sm:gap-5">
            {/* 01. Responsável */}
            <ClauseCard
              id="responsavel"
              code="01"
              title={
                isEn
                  ? "Identification of the Data Controller"
                  : "Identificação do Responsável pelo Tratamento"
              }
              accentIndex={0}
            >
              <p>
                {isEn
                  ? "The entity responsible for processing personal data collected through this website and associated digital services is:"
                  : "A entidade responsável pelo tratamento dos dados pessoais recolhidos através deste website e dos serviços digitais associados é:"}
              </p>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="rounded-xl bg-surface/75 border border-border p-3.5">
                  <dt className="text-[11px] uppercase tracking-wider text-subtle mb-1">
                    {isEn ? "Entity" : "Entidade"}
                  </dt>
                  <dd className="text-sm font-bold text-foreground">
                    midi8
                  </dd>
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

            {/* 02. Dados e Finalidades */}
            <ClauseCard
              id="dados-finalidades"
              code="02"
              title={
                isEn
                  ? "Data Collected, Purposes, and Lawful Grounds"
                  : "Dados Recolhidos, Finalidades e Fundamentos de Licitude"
              }
              accentIndex={1}
            >
              <p>
                {isEn
                  ? "We process only personal data that is strictly necessary, proportional, and directly linked to the following explicit purposes:"
                  : "Tratamos apenas os dados pessoais estritamente necessários, proporcionais e diretamente ligados às seguintes finalidades determinadas:"}
              </p>
              <div className="grid grid-cols-1 gap-3.5 pt-1">
                <div className="rounded-xl bg-surface/75 border border-border p-4 sm:p-5">
                  <p className="text-sm sm:text-base font-bold text-foreground mb-2">
                    {isEn
                      ? "a) Contact Requests, Briefings, and Meeting Scheduling"
                      : "a) Pedidos de Contacto, Briefings e Agendamento de Reuniões"}
                  </p>
                  <div className="space-y-1.5 text-xs sm:text-sm text-muted">
                    <p>
                      <strong className="text-foreground">
                        {isEn ? "Data processed: " : "Dados tratados: "}
                      </strong>
                      {isEn
                        ? "Name, email address, company name, areas of interest, and project message voluntarily submitted by the user."
                        : "Nome, endereço de email, empresa, áreas de interesse e mensagem/briefing submetidos voluntariamente pelo utilizador."}
                    </p>
                    <p>
                      <strong className="text-foreground">
                        {isEn ? "Lawful basis: " : "Fundamento jurídico: "}
                      </strong>
                      {isEn
                        ? "Pre-contractual steps taken at the request of the data subject (Article 6(1)(b) of the GDPR)."
                        : "Diligências pré-contratuais a pedido do titular dos dados (artigo 6.º, n.º 1, alínea b) do RGPD)."}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-surface/75 border border-border p-4 sm:p-5">
                  <p className="text-sm sm:text-base font-bold text-foreground mb-2">
                    {isEn
                      ? "b) Infrastructure Security, Abuse Prevention, and Uptime"
                      : "b) Segurança da Infraestrutura, Prevenção de Abuso e Disponibilidade"}
                  </p>
                  <div className="space-y-1.5 text-xs sm:text-sm text-muted">
                    <p>
                      <strong className="text-foreground">
                        {isEn ? "Data processed: " : "Dados tratados: "}
                      </strong>
                      {isEn
                        ? "IP address, technical HTTP request logs, and rate-limiting telemetry required to prevent spam and safeguard server stability."
                        : "Endereço IP, registos técnicos de pedidos (logs) e metadados de limitação de taxa necessários para prevenir spam e proteger a integridade dos servidores."}
                    </p>
                    <p>
                      <strong className="text-foreground">
                        {isEn ? "Lawful basis: " : "Fundamento jurídico: "}
                      </strong>
                      {isEn
                        ? "Legitimate interest of midi8 in ensuring network security, service resilience, and fraud prevention (Article 6(1)(f) of the GDPR)."
                        : "Interesse legítimo da midi8 em assegurar a cibersegurança, resiliência da infraestrutura e prevenção de abuso (artigo 6.º, n.º 1, alínea f) do RGPD)."}
                    </p>
                  </div>
                </div>
              </div>
            </ClauseCard>

            {/* 03. Prazos de Conservação */}
            <ClauseCard
              id="conservacao"
              code="03"
              title={isEn ? "Data Retention Periods" : "Prazos de Conservação dos Dados"}
              accentIndex={2}
            >
              <p>
                {isEn
                  ? "Personal data is retained strictly for the period required to fulfill the purpose for which it was collected or to comply with mandatory legal obligations:"
                  : "Os dados pessoais são conservados apenas durante o período estritamente necessário à finalidade que justificou a recolha ou para cumprimento de obrigações legais imperativas:"}
              </p>
              <div className="overflow-hidden rounded-xl border border-border divide-y divide-border text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 bg-surface/75 p-3.5 sm:px-4">
                  <span className="sm:col-span-5 font-bold text-foreground">
                    {isEn ? "Commercial & pre-contractual inquiries" : "Contactos comerciais e pré-contratuais"}
                  </span>
                  <span className="sm:col-span-7 text-muted">
                    {isEn
                      ? "Up to 12 months from the last interaction, unless a contractual engagement follows."
                      : "Até 12 meses após a última interação, salvo celebração de relação contratual posterior."}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 bg-white p-3.5 sm:px-4">
                  <span className="sm:col-span-5 font-bold text-foreground">
                    {isEn ? "Contractual & billing records" : "Dados contratuais e de faturação"}
                  </span>
                  <span className="sm:col-span-7 text-muted">
                    {isEn
                      ? "Duration of the contract plus statutory fiscal and accounting retention periods (10 years under Portuguese tax law)."
                      : "Durante a vigência do contrato e pelos prazos legais imperativos de arquivo fiscal e contabilístico (10 anos sob a lei portuguesa)."}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 bg-surface/75 p-3.5 sm:px-4">
                  <span className="sm:col-span-5 font-bold text-foreground">
                    {isEn ? "Technical security logs" : "Registos técnicos de segurança (logs)"}
                  </span>
                  <span className="sm:col-span-7 text-muted">
                    {isEn ? "Up to a maximum of 6 months." : "Até um máximo de 6 meses."}
                  </span>
                </div>
              </div>
            </ClauseCard>

            {/* 04. Subcontratantes */}
            <ClauseCard
              id="subcontratantes"
              code="04"
              title={
                isEn
                  ? "Processors and International Transfers"
                  : "Subcontratantes e Transferências Internacionais"
              }
              accentIndex={0}
            >
              <p>
                {isEn
                  ? "midi8 never sells, rents, or trades personal data to third parties. To operate our digital infrastructure reliably, we rely exclusively on vetted processors subject to GDPR-compliant data processing agreements:"
                  : "A midi8 não vende, aluga nem cede dados pessoais a terceiros para fins comerciais. Para assegurar o funcionamento fiável da nossa infraestrutura digital, recorremos apenas a subcontratantes de referência com garantias de conformidade com o RGPD:"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="rounded-xl bg-surface/75 border border-border p-3.5">
                  <p className="text-sm font-bold text-foreground mb-1">Vercel</p>
                  <p className="text-xs text-muted leading-relaxed">
                    {isEn
                      ? "Application hosting, TLS encryption, and global edge content delivery (CDN)."
                      : "Alojamento da aplicação web, encriptação TLS e distribuição segura de conteúdos (CDN)."}
                  </p>
                </div>
                <div className="rounded-xl bg-surface/75 border border-border p-3.5">
                  <p className="text-sm font-bold text-foreground mb-1">Resend</p>
                  <p className="text-xs text-muted leading-relaxed">
                    {isEn
                      ? "Transactional email routing for messages submitted through the contact form."
                      : "Encaminhamento transacional por email dos pedidos submetidos no formulário de contacto."}
                  </p>
                </div>
                <div className="rounded-xl bg-surface/75 border border-border p-3.5">
                  <p className="text-sm font-bold text-foreground mb-1">Google (Gmail)</p>
                  <p className="text-xs text-muted leading-relaxed">
                    {isEn
                      ? "Reception, archiving, and direct response to client email communications."
                      : "Receção, arquivo e resposta direta às comunicações de correio eletrónico."}
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted">
                {isEn
                  ? "Whenever technical operations involve transfers outside the European Economic Area (EEA), such transfers are safeguarded by European Commission Standard Contractual Clauses (SCCs) or adequacy decisions (such as the EU-US Data Privacy Framework)."
                  : "Sempre que existam transferências internacionais de dados para fora do Espaço Económico Europeu (EEE), estas realizam-se ao abrigo de Cláusulas Contratuais-Tipo aprovadas pela Comissão Europeia ou decisões de adequação válidas (como o EU-US Data Privacy Framework)."}
              </p>
            </ClauseCard>

            {/* 05. Cookies e Armazenamento Local */}
            <ClauseCard
              id="cookies"
              code="05"
              title={
                isEn
                  ? "Cookies and Local Browser Storage"
                  : "Cookies e Armazenamento Local"
              }
              accentIndex={1}
            >
              <p>
                {isEn ? (
                  <>
                    This website is engineered under a privacy-by-design architecture and{" "}
                    <strong className="text-foreground">
                      does not set advertising, marketing, behavioral analytics, or third-party tracking cookies
                    </strong>
                    .
                  </>
                ) : (
                  <>
                    Este website foi concebido segundo o princípio de privacidade desde a conceção e{" "}
                    <strong className="text-foreground">
                      não utiliza cookies publicitários, de marketing, de analítica comportamental nem de rastreamento de terceiros
                    </strong>
                    .
                  </>
                )}
              </p>
              <div className="rounded-xl bg-surface/75 border border-border p-4 text-xs sm:text-sm text-muted space-y-2">
                <p className="font-bold text-foreground">
                  {isEn
                    ? "Strictly Necessary Preference Storage"
                    : "Armazenamento Técnico Estritamente Necessário"}
                </p>
                <p>
                  {isEn
                    ? "The website stores a single technical key in your browser's local storage (midi8-locale) solely to remember your explicitly selected display language (PT or EN). No personal identifiers are stored or transmitted to third parties."
                    : "O website guarda apenas uma chave técnica no armazenamento local do navegador (midi8-locale) com o objetivo exclusivo de memorizar o idioma escolhido pelo utilizador (PT ou EN). Não é armazenado nem transmitido a terceiros qualquer identificador pessoal."}
                </p>
                <p>
                  {isEn
                    ? "Because no non-essential cookies or tracking technologies are deployed, prior cookie consent banners are not required under the ePrivacy Directive and Article 5 of Portuguese Law no. 41/2004. Should analytics or marketing tools ever be introduced in the future, this policy will be updated beforehand alongside an explicit consent mechanism."
                    : "Por não serem utilizados cookies não essenciais nem mecanismos de rastreamento, a navegação dispensa banner de consentimento nos termos da Diretiva ePrivacy e do artigo 5.º da Lei n.º 41/2004. Caso venham a ser integradas ferramentas analíticas ou de marketing no futuro, esta política será previamente atualizada e acompanhada de gestão explícita de consentimento."}
                </p>
              </div>
            </ClauseCard>

            {/* 06. Segurança Técnica */}
            <ClauseCard
              id="seguranca"
              code="06"
              title={
                isEn
                  ? "Technical and Organizational Security Measures"
                  : "Medidas Técnicas e Organizativas de Segurança"
              }
              accentIndex={2}
            >
              <p>
                {isEn
                  ? "Pursuant to Article 32 of the GDPR, midi8 applies appropriate technical and organizational controls to protect personal data against unauthorized access, alteration, disclosure, or accidental loss:"
                  : "Nos termos do artigo 32.º do RGPD, a midi8 aplica medidas técnicas e organizativas adequadas para proteger os dados pessoais contra acesso não autorizado, alteração, divulgação ou perda acidental:"}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-muted">
                <li className="rounded-xl bg-surface/75 border border-border px-3.5 py-2.5">
                  <strong className="text-foreground block mb-0.5">
                    {isEn ? "End-to-end HTTPS / TLS" : "Encriptação HTTPS / TLS"}
                  </strong>
                  {isEn
                    ? "All communications between your browser and our servers are encrypted in transit."
                    : "Todas as comunicações entre o navegador e os servidores decorrem encriptadas em trânsito."}
                </li>
                <li className="rounded-xl bg-surface/75 border border-border px-3.5 py-2.5">
                  <strong className="text-foreground block mb-0.5">
                    {isEn ? "Server-side validation & anti-abuse" : "Validação e proteção anti-abuso"}
                  </strong>
                  {isEn
                    ? "Strict input sanitization, payload size limits, honeypot filtering, and rate limiting."
                    : "Validação rigorosa no servidor, limites de carga, deteção de bots e limitação de taxa."}
                </li>
                <li className="rounded-xl bg-surface/75 border border-border px-3.5 py-2.5">
                  <strong className="text-foreground block mb-0.5">
                    {isEn ? "Restricted internal access" : "Acesso interno restrito"}
                  </strong>
                  {isEn
                    ? "Access to client inquiries is restricted strictly to authorized team members."
                    : "O acesso aos pedidos submetidos é limitado exclusivamente a membros autorizados da equipa."}
                </li>
                <li className="rounded-xl bg-surface/75 border border-border px-3.5 py-2.5">
                  <strong className="text-foreground block mb-0.5">
                    {isEn ? "Minimal data surface" : "Superfície de dados mínima"}
                  </strong>
                  {isEn
                    ? "No unnecessary user accounts, hidden trackers, or third-party ad scripts."
                    : "Sem contas desnecessárias, rastreadores ocultos ou scripts publicitários de terceiros."}
                </li>
              </ul>
            </ClauseCard>

            {/* 07. Direitos dos Titulares */}
            <ClauseCard
              id="direitos"
              code="07"
              title={isEn ? "Rights of Data Subjects" : "Direitos dos Titulares dos Dados"}
              accentIndex={0}
            >
              <p>
                {isEn
                  ? "Under Articles 15 to 22 of the GDPR, you may exercise the following rights free of charge at any time:"
                  : "Nos termos dos artigos 15.º a 22.º do RGPD, o titular dos dados pode exercer gratuitamente, em qualquer momento, os seguintes direitos:"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {rights.map((right) => (
                  <div
                    key={right.title}
                    className="rounded-xl bg-surface/75 border border-border p-3.5 sm:p-4"
                  >
                    <p className="text-sm font-bold text-foreground mb-1">{right.title}</p>
                    <p className="text-xs text-muted leading-relaxed">{right.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-muted pt-1">
                {isEn ? (
                  <>
                    To exercise any of these rights, send your written request to{" "}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="font-bold text-brand-blue hover:underline"
                    >
                      {CONTACT_EMAIL}
                    </a>
                    . We respond to all verified requests within a maximum of 30 calendar days.
                  </>
                ) : (
                  <>
                    Para exercer qualquer um destes direitos, envie o seu pedido por escrito para{" "}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="font-bold text-brand-blue hover:underline"
                    >
                      {CONTACT_EMAIL}
                    </a>
                    . Todos os pedidos verificados recebem resposta no prazo máximo de 30 dias.
                  </>
                )}
              </p>
            </ClauseCard>

            {/* 08. CNPD */}
            <ClauseCard
              id="cnpd"
              code="08"
              title={
                isEn
                  ? "Right to Lodge a Complaint (CNPD)"
                  : "Reclamação junto da Autoridade de Controlo (CNPD)"
              }
              accentIndex={1}
            >
              <p>
                {isEn
                  ? "Without prejudice to any administrative or judicial remedy, if you believe that the processing of your personal data infringes the GDPR or Portuguese legislation, you have the right to lodge a complaint with the national supervisory authority:"
                  : "Sem prejuízo de qualquer outra via de recurso administrativo ou judicial, caso considere que o tratamento dos seus dados pessoais viola o RGPD ou a legislação nacional em vigor, tem o direito de apresentar reclamação junto da autoridade de controlo em Portugal:"}
              </p>
              <div className="rounded-xl bg-surface/75 border border-border p-4 text-xs sm:text-sm text-muted space-y-1">
                <p className="font-bold text-foreground">
                  Comissão Nacional de Proteção de Dados (CNPD)
                </p>
                <p>Av. D. Carlos I, 134 - 1.º, 1200-651 Lisboa, Portugal</p>
                <p>
                  Website:{" "}
                  <a
                    href="https://www.cnpd.pt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-brand-blue hover:underline"
                  >
                    www.cnpd.pt
                  </a>
                </p>
              </div>
            </ClauseCard>

            {/* 09. Alterações */}
            <ClauseCard
              id="alteracoes"
              code="09"
              title={
                isEn
                  ? "Amendments to this Privacy Policy"
                  : "Alterações à Presente Política"
              }
              accentIndex={2}
            >
              <p>
                {isEn
                  ? "midi8 reserves the right to revise this Privacy Policy at any time to reflect technical, operational, or regulatory developments. The most recent version is always published on this page with its effective date clearly indicated."
                  : "A midi8 reserva-se o direito de atualizar esta Política de Privacidade sempre que necessário para refletir evoluções técnicas, operacionais ou legislativas. A versão em vigor encontra-se permanentemente disponível nesta página com indicação da data de revisão."}
              </p>
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
                href="/termos"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground hover:text-brand-blue transition-colors"
              >
                <span>{isEn ? "Read Terms & Conditions" : "Consultar Termos e Condições"}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
