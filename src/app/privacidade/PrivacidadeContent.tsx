"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT_EMAIL } from "@/lib/contact";

export default function PrivacidadeContent() {
  const { locale } = useLanguage();

  if (locale === "en") {
    return (
      <main className="flex-1 text-foreground pt-28 pb-16">
        <article className="max-w-4xl mx-auto px-6">
          {/* Page Header */}
          <header className="mb-12 border-b border-border pb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm text-subtle">
              Last updated:{" "}
              <time dateTime="2026-11">November 2026</time>
            </p>
          </header>

          {/* Overview & Framework */}
          <div className="space-y-8 text-secondary text-sm sm:text-base leading-relaxed">
            <section className="bg-surface/40 border border-border rounded-2xl p-6">
              <p className="text-secondary">
                <strong>midi8</strong> values the privacy and security of the personal data of its
                users, clients, and partners. This Privacy Policy outlines clearly and transparently how
                we collect, use, process, and protect personal data in strict compliance with the{" "}
                <strong>General Data Protection Regulation (GDPR - Regulation (EU) 2016/679)</strong> and{" "}
                <strong>Law no. 58/2019, of August 8</strong> (Portuguese Personal Data Protection Act).
              </p>
            </section>

            {/* 1. Controller */}
            <section aria-labelledby="resp-tratamento" className="space-y-3">
              <h2 id="resp-tratamento" className="text-xl sm:text-2xl font-normal text-foreground tracking-tight">
                1. Identification of the Data Controller
              </h2>
              <p>
                The controller responsible for processing your personal data within this website and associated services is:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-muted bg-surface/40 p-4 rounded-xl border border-border">
                <li>
                  <strong>Entity:</strong> midi8 - Software Engineering and Digital Systems
                </li>
                <li>
                  <strong>Jurisdiction:</strong> Portugal
                </li>
                <li>
                  <strong>Privacy Contact Email:</strong>{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-blue hover:underline">
                    {CONTACT_EMAIL}
                  </a>
                </li>
              </ul>
            </section>

            {/* 2. Data Collected & Purposes */}
            <section aria-labelledby="dados-recolhidos" className="space-y-3">
              <h2 id="dados-recolhidos" className="text-xl sm:text-2xl font-normal text-foreground tracking-tight">
                2. Data Collected, Purposes, and Lawful Grounds
              </h2>
              <p>
                We only process personal data that is strictly necessary for the following legitimate purposes:
              </p>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-surface/40 border border-border">
                  <h3 className="text-base font-bold text-foreground mb-1">
                    a) Contact Forms and Technical Meeting Scheduling
                  </h3>
                  <p className="text-sm text-muted mb-2">
                    <strong>Data:</strong> Name, email address, company name, areas of interest, and project overview.
                  </p>
                  <p className="text-sm text-muted">
                    <strong>Legal Basis:</strong> Pre-contractual steps taken at the request of the data subject (Article 6(1)(b) of the GDPR).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface/40 border border-border">
                  <h3 className="text-base font-bold text-foreground mb-1">
                    b) Browsing and Infrastructure Security
                  </h3>
                  <p className="text-sm text-muted mb-2">
                    <strong>Data:</strong> IP address, technical server logs, and browser metadata essential for site security and resilience.
                  </p>
                  <p className="text-sm text-muted">
                    <strong>Legal Basis:</strong> Legitimate interest of midi8 in maintaining server integrity, uptime, and cybersecurity (Article 6(1)(f) of the GDPR).
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Retention Periods */}
            <section aria-labelledby="prazos-conservacao" className="space-y-3">
              <h2 id="prazos-conservacao" className="text-xl sm:text-2xl font-normal text-foreground tracking-tight">
                3. Data Retention Periods
              </h2>
              <p>
                Personal data is retained only for the period strictly necessary to fulfill the purposes for which it was gathered:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-secondary">
                <li>
                  <strong>Commercial and pre-contractual inquiries:</strong> Up to 12 months after the last communication, unless a contractual engagement follows.
                </li>
                <li>
                  <strong>Data originating from service contracts:</strong> For the duration of the agreement and statutory fiscal/accounting retention requirements (typically 10 years under Portuguese law).
                </li>
                <li>
                  <strong>Technical security logs:</strong> Up to a maximum of 6 months.
                </li>
              </ul>
            </section>

            {/* 4. Processors & Third Parties */}
            <section aria-labelledby="destinatarios" className="space-y-3">
              <h2 id="destinatarios" className="text-xl sm:text-2xl font-normal text-foreground tracking-tight">
                4. Sharing with Processors and Third Parties
              </h2>
              <p>
                midi8 does not sell, rent, or transfer personal data to third parties for marketing purposes. For the operation of our digital infrastructure, we engage trusted service providers acting as processors under strict security and GDPR compliance guarantees:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-secondary">
                <li>Vercel: application hosting and content delivery network (CDN).</li>
                <li>Resend: email dispatch service for inquiries submitted through our contact form.</li>
                <li>Google (Gmail): secure business email communications.</li>
              </ul>
              <p className="text-sm text-muted">
                Any international data transfers outside the European Economic Area (EEA) rely on Standard Contractual Clauses approved by the European Commission or equivalent adequacy decisions.
              </p>
            </section>

            {/* 5. Cookies */}
            <section aria-labelledby="cookies" className="space-y-3">
              <h2 id="cookies" className="text-xl sm:text-2xl font-normal text-foreground tracking-tight">
                5. Cookies and Tracking Technologies
              </h2>
              <p>
                This website is built with a data-minimization approach and{" "}
                <strong>does not use advertising, marketing, third-party tracking, or profiling cookies</strong>.
              </p>
              <p className="text-sm text-muted">
                Browsing relies exclusively on technical mechanisms strictly necessary for security, content delivery, and correct operation, exempt from consent for non-essential cookies under the ePrivacy Directive and Law no. 41/2004.
              </p>
            </section>

            {/* 6. Data Subject Rights */}
            <section aria-labelledby="direitos-titular" className="space-y-3">
              <h2 id="direitos-titular" className="text-xl sm:text-2xl font-normal text-foreground tracking-tight">
                6. Rights of Data Subjects
              </h2>
              <p>
                Under Articles 15 to 22 of the GDPR, you have the right to exercise free of charge with midi8:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-surface/40 rounded-xl border border-border">
                  <strong className="text-foreground block">Right of Access</strong>
                  Confirm whether your data is being processed and request a copy.
                </div>
                <div className="p-3 bg-surface/40 rounded-xl border border-border">
                  <strong className="text-foreground block">Right to Rectification</strong>
                  Request correction of inaccurate or incomplete personal records.
                </div>
                <div className="p-3 bg-surface/40 rounded-xl border border-border">
                  <strong className="text-foreground block">Right to Erasure</strong>
                  Request deletion of data (&quot;right to be forgotten&quot;) within legal grounds.
                </div>
                <div className="p-3 bg-surface/40 rounded-xl border border-border">
                  <strong className="text-foreground block">Right to Restriction</strong>
                  Request temporary suspension of processing in qualifying circumstances.
                </div>
                <div className="p-3 bg-surface/40 rounded-xl border border-border">
                  <strong className="text-foreground block">Right to Data Portability</strong>
                  Receive personal data in a structured, commonly used, machine-readable format.
                </div>
                <div className="p-3 bg-surface/40 rounded-xl border border-border">
                  <strong className="text-foreground block">Right to Object</strong>
                  Object at any time to processing based on legitimate interest grounds.
                </div>
              </div>
              <p className="pt-2">
                To exercise any of these rights, submit your written request to{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-blue hover:underline">
                  {CONTACT_EMAIL}
                </a>
                . Requests are handled within a maximum of 30 days.
              </p>
            </section>

            {/* 7. Supervisory Authority */}
            <section aria-labelledby="cnpd" className="space-y-3 bg-surface/40 p-5 rounded-2xl border border-border">
              <h2 id="cnpd" className="text-lg sm:text-xl font-normal text-foreground tracking-tight">
                7. Right to Lodge a Complaint with the Supervisory Authority (CNPD)
              </h2>
              <p>
                If you consider that the processing of your data infringes the GDPR or applicable regulations, you have the right to lodge a complaint with the Portuguese supervisory authority:
              </p>
              <div className="text-xs sm:text-sm text-muted space-y-1">
                <p><strong>Comissão Nacional de Proteção de Dados (CNPD)</strong></p>
                <p>Av. D. Carlos I, 134 - 1.º, 1200-651 Lisboa, Portugal</p>
                <p>Website: <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">www.cnpd.pt</a></p>
              </div>
            </section>

            {/* 8. Changes to Policy */}
            <section aria-labelledby="alteracoes" className="space-y-3">
              <h2 id="alteracoes" className="text-xl sm:text-2xl font-normal text-foreground tracking-tight">
                8. Changes to this Privacy Policy
              </h2>
              <p>
                midi8 reserves the right to revise this Privacy Policy at any time to reflect operational, technical, or legislative developments. Updated versions take effect immediately upon publication on this page.
              </p>
            </section>

            {/* Bottom Nav */}
            <div className="pt-8 border-t border-border flex items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to home page
              </Link>
              <Link
                href="/termos"
                className="text-sm text-brand-blue hover:underline"
              >
                View Terms &amp; Conditions →
              </Link>
            </div>
          </div>
        </article>
      </main>
    );
  }

  // Versão em Português (PT)
  return (
    <main className="flex-1 text-foreground pt-28 pb-16">
      <article className="max-w-4xl mx-auto px-6">
        {/* Cabeçalho da Página */}
        <header className="mb-12 border-b border-border pb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Política de Privacidade
          </h1>
          <p className="text-sm text-subtle">
            Última atualização:{" "}
            <time dateTime="2026-11">Novembro de 2026</time>
          </p>
        </header>

        {/* Resumo e Enquadramento */}
        <div className="space-y-8 text-secondary text-sm sm:text-base leading-relaxed">
          <section className="bg-surface/40 border border-border rounded-2xl p-6">
            <p className="text-secondary">
              A <strong>midi8</strong> valoriza a privacidade e a segurança dos dados pessoais dos
              seus utilizadores, clientes e parceiros. Esta Política de Privacidade descreve, de
              forma clara e transparente, como recolhemos, utilizamos, tratamos e protegemos os
              dados pessoais em estrita conformidade com o <strong>Regulamento Geral sobre a Proteção de Dados (RGPD - Regulamento UE 2016/679)</strong> e com a <strong>Lei n.º 58/2019, de 8 de agosto</strong> (lei portuguesa de proteção de dados pessoais).
            </p>
          </section>

          {/* 1. Responsável pelo Tratamento */}
          <section aria-labelledby="resp-tratamento" className="space-y-3">
            <h2 id="resp-tratamento" className="text-xl sm:text-2xl font-normal text-foreground tracking-tight">
              1. Identificação do Responsável pelo Tratamento
            </h2>
            <p>
              O responsável pelo tratamento dos seus dados pessoais no âmbito deste website e dos serviços prestados é:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-muted bg-surface/40 p-4 rounded-xl border border-border">
              <li>
                <strong>Entidade:</strong> midi8 - Engenharia de Software e Sistemas Digitais
              </li>
              <li>
                <strong>Jurisdição:</strong> Portugal
              </li>
              <li>
                <strong>Contacto de Email para Privacidade:</strong>{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-blue hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </section>

          {/* 2. Dados Recolhidos e Finalidades */}
          <section aria-labelledby="dados-recolhidos" className="space-y-3">
            <h2 id="dados-recolhidos" className="text-xl sm:text-2xl font-normal text-foreground tracking-tight">
              2. Dados Recolhidos, Finalidades e Fundamentos de Licitude
            </h2>
            <p>
              Tratamos apenas os dados estritamente necessários para as seguintes finalidades legítimas:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-surface/40 border border-border">
                <h3 className="text-base font-bold text-foreground mb-1">
                  a) Formulários de Contacto e Agendamento de Reuniões Técnicas
                </h3>
                <p className="text-sm text-muted mb-2">
                  <strong>Dados:</strong> Nome, endereço de email, empresa, áreas de interesse e descrição do projeto.
                </p>
                <p className="text-sm text-muted">
                  <strong>Fundamento:</strong> Diligências pré-contratuais a pedido do titular dos dados (artigo 6.º, n.º 1, alínea b) do RGPD).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface/40 border border-border">
                <h3 className="text-base font-bold text-foreground mb-1">
                  b) Navegação e Segurança da Infraestrutura
                </h3>
                <p className="text-sm text-muted mb-2">
                  <strong>Dados:</strong> Endereço IP, registos técnicos do servidor (logs) e tipo de navegador, necessários à segurança e ao funcionamento do site.
                </p>
                <p className="text-sm text-muted">
                  <strong>Fundamento:</strong> Interesse legítimo da midi8 em garantir a integridade, resiliência e segurança cibernética dos seus servidores (artigo 6.º, n.º 1, alínea f) do RGPD).
                </p>
              </div>
            </div>
          </section>

          {/* 3. Prazos de Conservação */}
          <section aria-labelledby="prazos-conservacao" className="space-y-3">
            <h2 id="prazos-conservacao" className="text-xl sm:text-2xl font-normal text-foreground tracking-tight">
              3. Prazos de Conservação dos Dados
            </h2>
            <p>
              Os dados pessoais são conservados apenas durante o período estritamente necessário à prossecução da finalidade para a qual foram recolhidos:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-secondary">
              <li>
                <strong>Contactos comerciais e pré-contratuais:</strong> Até 12 meses após o último contacto, caso não se estabeleça relação contratual posterior.
              </li>
              <li>
                <strong>Dados decorrentes de contratos de prestação de serviços:</strong> Durante a vigência do contrato e pelos prazos legais imperativos de arquivo fiscal e contabilístico (geralmente 10 anos sob a lei portuguesa).
              </li>
              <li>
                <strong>Logs técnicos de segurança:</strong> Até um máximo de 6 meses.
              </li>
            </ul>
          </section>

          {/* 4. Subcontratantes e Destinatários */}
          <section aria-labelledby="destinatarios" className="space-y-3">
            <h2 id="destinatarios" className="text-xl sm:text-2xl font-normal text-foreground tracking-tight">
              4. Partilha com Subcontratantes e Terceiros
            </h2>
            <p>
              A midi8 não comercializa nem cede dados pessoais a terceiros para fins de marketing. Para o regular funcionamento da infraestrutura digital, recorremos a fornecedores de serviços na qualidade de subcontratantes, os quais garantem elevados padrões de segurança e conformidade com o RGPD:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-secondary">
              <li>Vercel: alojamento do website e rede de distribuição de conteúdos (CDN).</li>
              <li>Resend: envio por email dos pedidos submetidos no formulário de contacto.</li>
              <li>Google (Gmail): receção e gestão do correio eletrónico.</li>
            </ul>
            <p className="text-sm text-muted">
              Sempre que existam transferências internacionais de dados para fora do Espaço Económico Europeu (EEE), estas realizam-se mediante Cláusulas Contratuais-Tipo aprovadas pela Comissão Europeia ou garantias de adequação equivalentes.
            </p>
          </section>

          {/* 5. Cookies e Tecnologias de Rastreamento */}
          <section aria-labelledby="cookies" className="space-y-3">
            <h2 id="cookies" className="text-xl sm:text-2xl font-normal text-foreground tracking-tight">
              5. Cookies e Tecnologias de Rastreamento
            </h2>
            <p>
              Este website foi concebido sob o princípio da minimização de dados e{" "}
              <strong>não utiliza cookies publicitários, de marketing, de terceiros nem de rastreamento analítico</strong>.
            </p>
            <p className="text-sm text-muted">
              A navegação decorre apenas com recursos técnicos estritamente necessários à segurança, entrega de conteúdos e correto funcionamento da aplicação, dispensando consentimento para cookies não essenciais nos termos da Diretiva ePrivacy e da Lei n.º 41/2004.
            </p>
          </section>

          {/* 6. Direitos dos Titulares */}
          <section aria-labelledby="direitos-titular" className="space-y-3">
            <h2 id="direitos-titular" className="text-xl sm:text-2xl font-normal text-foreground tracking-tight">
              6. Direitos dos Titulares dos Dados
            </h2>
            <p>
              Nos termos dos artigos 15.º a 22.º do RGPD, o utilizador tem o direito de exercer gratuitamente perante a midi8:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-surface/40 rounded-xl border border-border">
                <strong className="text-foreground block">Direito de Acesso</strong>
                Obter confirmação sobre se os seus dados são tratados e aceder aos mesmos.
              </div>
              <div className="p-3 bg-surface/40 rounded-xl border border-border">
                <strong className="text-foreground block">Direito de Retificação</strong>
                Solicitar a correção de dados inexatos ou incompletos.
              </div>
              <div className="p-3 bg-surface/40 rounded-xl border border-border">
                <strong className="text-foreground block">Direito ao Apagamento</strong>
                Pedir a eliminação dos dados («direito a ser esquecido») dentro dos limites legais.
              </div>
              <div className="p-3 bg-surface/40 rounded-xl border border-border">
                <strong className="text-foreground block">Direito à Limitação</strong>
                Solicitar a suspensão temporária do tratamento em circunstâncias específicas.
              </div>
              <div className="p-3 bg-surface/40 rounded-xl border border-border">
                <strong className="text-foreground block">Direito de Portabilidade</strong>
                Receber os dados fornecidos em formato estruturado e legível por máquina.
              </div>
              <div className="p-3 bg-surface/40 rounded-xl border border-border">
                <strong className="text-foreground block">Direito de Oposição</strong>
                Opor-se ao tratamento de dados fundamentado em interesses legítimos.
              </div>
            </div>
            <p className="pt-2">
              Para exercer qualquer um destes direitos, envie o seu pedido por escrito para{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-blue hover:underline">
                {CONTACT_EMAIL}
              </a>
              . A resposta será prestada no prazo máximo de 30 dias.
            </p>
          </section>

          {/* 7. Reclamação junto da CNPD */}
          <section aria-labelledby="cnpd" className="space-y-3 bg-surface/40 p-5 rounded-2xl border border-border">
            <h2 id="cnpd" className="text-lg sm:text-xl font-normal text-foreground tracking-tight">
              7. Direito de Reclamação junto da Autoridade de Controlo (CNPD)
            </h2>
            <p>
              Caso considere que o tratamento dos seus dados viola o RGPD ou a legislação nacional em vigor, tem o direito de apresentar uma reclamação à autoridade de controlo em Portugal:
            </p>
            <div className="text-xs sm:text-sm text-muted space-y-1">
              <p><strong>Comissão Nacional de Proteção de Dados (CNPD)</strong></p>
              <p>Av. D. Carlos I, 134 - 1.º, 1200-651 Lisboa, Portugal</p>
              <p>Website: <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">www.cnpd.pt</a></p>
            </div>
          </section>

          {/* 8. Alterações à Política */}
          <section aria-labelledby="alteracoes" className="space-y-3">
            <h2 id="alteracoes" className="text-xl sm:text-2xl font-normal text-foreground tracking-tight">
              8. Alterações à presente Política
            </h2>
            <p>
              A midi8 reserva-se o direito de atualizar esta Política de Privacidade a qualquer momento para refletir eventuais alterações técnicas, operacionais ou legislativas. A versão atualizada entrará imediatamente em vigor após publicação nesta página.
            </p>
          </section>

          {/* Voltar ao Início */}
          <div className="pt-8 border-t border-border flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Voltar à página inicial
            </Link>
            <Link
              href="/termos"
              className="text-sm text-brand-blue hover:underline"
            >
              Consultar Termos e Condições →
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}

