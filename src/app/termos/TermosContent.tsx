"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT_EMAIL } from "@/lib/contact";

export default function TermosContent() {
  const { locale } = useLanguage();

  if (locale === "en") {
    return (
      <main className="flex-1 text-foreground pt-28 pb-16">
        <article className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <header className="mb-12 border-b border-border pb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-4">
              Terms &amp; Conditions
            </h1>
            <p className="text-sm text-subtle">
              Last updated:{" "}
              <time dateTime="2026-11">November 2026</time>
            </p>
          </header>

          {/* Content */}
          <div className="space-y-8 text-secondary text-sm sm:text-base leading-relaxed">
            <section className="bg-surface/40 border border-border rounded-2xl p-6">
              <p className="text-secondary">
                Welcome to the <strong>Midi8</strong> website. Access to and use of this website,
                as well as the engagement of any digital services rendered by Midi8, are governed by
                these <strong>Terms and Conditions</strong>. By browsing this website or submitting
                inquiries and technical requests, you explicitly and unreservedly agree to the terms
                set forth herein.
              </p>
            </section>

            {/* 1. Ownership */}
            <section aria-labelledby="titularidade" className="space-y-3">
              <h2 id="titularidade" className="text-xl sm:text-2xl font-medium text-foreground tracking-tight">
                1. Identification of the Website Owner
              </h2>
              <p>
                This website is owned and operated by the legal entity:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-muted bg-surface/40 p-4 rounded-xl border border-border">
                <li>
                  <strong>Entity:</strong> Midi8 — Software Engineering and Digital Systems
                </li>
                <li>
                  <strong>Jurisdiction:</strong> Portugal
                </li>
                <li>
                  <strong>Contact Email:</strong>{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-blue hover:underline">
                    {CONTACT_EMAIL}
                  </a>
                </li>
              </ul>
            </section>

            {/* 2. Scope */}
            <section aria-labelledby="objeto" className="space-y-3">
              <h2 id="objeto" className="text-xl sm:text-2xl font-medium text-foreground tracking-tight">
                2. Scope of Services
              </h2>
              <p>
                Midi8 specializes in digital solutions, custom software engineering, artificial intelligence, and strategic communications for businesses, including:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-secondary">
                <li>
                  <strong>Web, Software &amp; Mobile:</strong> institutional websites, web platforms, custom enterprise software, and mobile applications.
                </li>
                <li>
                  <strong>Automation, AI &amp; Data:</strong> systems integration, process automation, AI agents, LLM pipelines, and business data analytics.
                </li>
                <li>
                  <strong>Strategy, Marketing &amp; Campaigns:</strong> digital growth strategy, social media management, creative content production, and paid media.
                </li>
                <li>
                  <strong>Consulting &amp; E-commerce:</strong> technological audits, strategic roadmaps, and custom e-commerce platforms.
                </li>
              </ul>
              <p className="text-sm text-muted">
                Commercial proposals, bespoke budgets, and Service Level Agreements (SLAs) are governed by standalone master service agreements executed directly with each client.
              </p>
            </section>

            {/* 3. IP */}
            <section aria-labelledby="propriedade-intelectual" className="space-y-3">
              <h2 id="propriedade-intelectual" className="text-xl sm:text-2xl font-medium text-foreground tracking-tight">
                3. Intellectual and Industrial Property
              </h2>
              <p>
                All content published on this website — including trademarks, logotypes, textual copy, images, visual assets, interactive graphics, source code, and design architecture — is the exclusive property of Midi8 or third parties who have authorized its use, protected under the <strong>Portuguese Copyright and Related Rights Code</strong> and the <strong>Industrial Property Code</strong>.
              </p>
              <p>
                Any reproduction, copy, modification, distribution, reverse engineering, or commercial exploitation, in whole or in part, without prior written authorization from Midi8 is strictly prohibited.
              </p>
            </section>

            {/* 4. Terms of Use */}
            <section aria-labelledby="utilizacao" className="space-y-3">
              <h2 id="utilizacao" className="text-xl sm:text-2xl font-medium text-foreground tracking-tight">
                4. Website Use and Acceptable Conduct
              </h2>
              <p>
                Users agree to use this website diligently and in full compliance with applicable legislation. The following activities are strictly prohibited:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-secondary">
                <li>Actions intended to impair, overload, or disrupt server infrastructure or related network services.</li>
                <li>Attempting unauthorized access to restricted systems, databases, or IT environments of Midi8.</li>
                <li>Submitting fraudulent, defamatory, offensive, or malicious code via contact and proposal forms.</li>
              </ul>
            </section>

            {/* 5. Liability */}
            <section aria-labelledby="responsabilidade" className="space-y-3">
              <h2 id="responsabilidade" className="text-xl sm:text-2xl font-medium text-foreground tracking-tight">
                5. Limitation of Liability
              </h2>
              <p>
                Midi8 applies engineering industry standards to maintain website uptime and technical reliability. However, it cannot guarantee uninterrupted service free from transient maintenance downtime, third-party network outages, or unforeseeable force majeure circumstances.
              </p>
              <p className="text-sm text-muted">
                Information on this website is for general informational purposes and does not substitute tailored technical scoping for contractual commitments.
              </p>
            </section>

            {/* 6. External Links */}
            <section aria-labelledby="links-terceiros" className="space-y-3">
              <h2 id="links-terceiros" className="text-xl sm:text-2xl font-medium text-foreground tracking-tight">
                6. External Links
              </h2>
              <p>
                This website may contain links to third-party services and platforms (such as LinkedIn or Instagram). Midi8 does not control external websites and assumes no liability for their operational practices, terms, or privacy standards.
              </p>
            </section>

            {/* 7. Changes to Terms */}
            <section aria-labelledby="alteracoes" className="space-y-3">
              <h2 id="alteracoes" className="text-xl sm:text-2xl font-medium text-foreground tracking-tight">
                7. Amendments to Terms &amp; Conditions
              </h2>
              <p>
                Midi8 reserves the right to amend these Terms and Conditions unilaterally at any time. Changes become effective immediately upon publication on this website. Periodic review of this page is encouraged.
              </p>
            </section>

            {/* 8. Law & Jurisdiction */}
            <section aria-labelledby="lei-foro" className="space-y-3 bg-surface/40 p-5 rounded-2xl border border-border">
              <h2 id="lei-foro" className="text-lg sm:text-xl font-medium text-foreground tracking-tight">
                8. Governing Law and Jurisdiction
              </h2>
              <p>
                These Terms and Conditions are governed exclusively by the <strong>laws of Portugal</strong>.
              </p>
              <p className="text-sm text-muted">
                For the resolution of any dispute arising out of or in connection with these terms that cannot be resolved amicably, the <strong>competent courts of Portugal</strong> shall have exclusive territorial jurisdiction.
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
                href="/privacidade"
                className="text-sm text-brand-blue hover:underline"
              >
                View Privacy Policy →
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-4">
            Termos e Condições
          </h1>
          <p className="text-sm text-subtle">
            Última atualização:{" "}
            <time dateTime="2026-11">Novembro de 2026</time>
          </p>
        </header>

        {/* Conteúdo */}
        <div className="space-y-8 text-secondary text-sm sm:text-base leading-relaxed">
          <section className="bg-surface/40 border border-border rounded-2xl p-6">
            <p className="text-secondary">
              Bem-vindo ao website da <strong>Midi8</strong>. O acesso e a utilização deste website,
              bem como a contratação de quaisquer serviços digitais prestados pela Midi8, regem-se pelos
              presentes <strong>Termos e Condições</strong>. Ao navegar neste website ou ao submeter
              pedidos de contacto e propostas técnicas, o utilizador declara aceitar expressamente e sem reservas as disposições aqui enunciadas.
            </p>
          </section>

          {/* 1. Titularidade */}
          <section aria-labelledby="titularidade" className="space-y-3">
            <h2 id="titularidade" className="text-xl sm:text-2xl font-medium text-foreground tracking-tight">
              1. Identificação do Titular do Website
            </h2>
            <p>
              O presente website é propriedade e gerido pela entidade legal:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-muted bg-surface/40 p-4 rounded-xl border border-border">
              <li>
                <strong>Entidade:</strong> Midi8 — Engenharia de Software e Sistemas Digitais
              </li>
              <li>
                <strong>Jurisdição:</strong> Portugal
              </li>
              <li>
                <strong>Email de Contacto:</strong>{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-blue hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </section>

          {/* 2. Objeto e Âmbito */}
          <section aria-labelledby="objeto" className="space-y-3">
            <h2 id="objeto" className="text-xl sm:text-2xl font-medium text-foreground tracking-tight">
              2. Objeto e Âmbito dos Serviços
            </h2>
            <p>
              A Midi8 é especializada em serviços digitais, engenharia de software, inteligência artificial e comunicação estratégica para empresas, nomeadamente:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-secondary">
              <li>
                <strong>Web, Software &amp; Mobile:</strong> websites institucionais, aplicações web, software à medida e aplicações móveis.
              </li>
              <li>
                <strong>Automação, IA &amp; Dados:</strong> integração de sistemas, automação de processos, agentes de Inteligência Artificial, LLMs e análise de dados.
              </li>
              <li>
                <strong>Estratégia, Marketing &amp; Campanhas:</strong> estratégia digital, gestão de redes sociais, produção de conteúdo e campanhas de tráfego pago.
              </li>
              <li>
                <strong>Consultoria &amp; E-commerce:</strong> diagnóstico tecnológico, consultoria estratégica e plataformas de comércio eletrónico.
              </li>
            </ul>
            <p className="text-sm text-muted">
              As propostas comerciais, orçamentos específicos e acordos de nível de serviço (SLA) serão objeto de contratos autónomos celebrados diretamente com cada cliente.
            </p>
          </section>

          {/* 3. Propriedade Intelectual */}
          <section aria-labelledby="propriedade-intelectual" className="space-y-3">
            <h2 id="propriedade-intelectual" className="text-xl sm:text-2xl font-medium text-foreground tracking-tight">
              3. Propriedade Intelectual e Industrial
            </h2>
            <p>
              Todos os conteúdos presentes neste website — incluindo, designadamente, marcas, logótipos, textos, imagens, ilustrações, gráficos interativos, código-fonte e estrutura de design visual — constituem propriedade exclusiva da Midi8 ou de terceiros que autorizaram legitimamente o seu uso, encontrando-se protegidos pelo <strong>Código do Direito de Autor e dos Direitos Conexos</strong> e pelo <strong>Código da Propriedade Industrial</strong>.
            </p>
            <p>
              É estritamente proibida qualquer reprodução, cópia, distribuição, descompilação, engenharia inversa ou exploração comercial, total ou parcial, sem autorização prévia e escrita da Midi8.
            </p>
          </section>

          {/* 4. Condições de Utilização */}
          <section aria-labelledby="utilizacao" className="space-y-3">
            <h2 id="utilizacao" className="text-xl sm:text-2xl font-medium text-foreground tracking-tight">
              4. Condições de Utilização do Website
            </h2>
            <p>
              O utilizador compromete-se a utilizar o website de forma diligente e em observância da lei aplicável. É expressamente vedado:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-secondary">
              <li>Realizar ações que possam danificar, sobrecarregar ou inutilizar a infraestrutura dos servidores ou redes associadas.</li>
              <li>Tentar aceder sem autorização a áreas restritas, bases de dados ou sistemas informáticos da Midi8.</li>
              <li>Submeter através dos formulários de contacto conteúdos difamatórios, fraudulentos, vírus ou código malicioso.</li>
            </ul>
          </section>

          {/* 5. Limitação de Responsabilidade */}
          <section aria-labelledby="responsabilidade" className="space-y-3">
            <h2 id="responsabilidade" className="text-xl sm:text-2xl font-medium text-foreground tracking-tight">
              5. Limitação de Responsabilidade
            </h2>
            <p>
              A Midi8 adota as melhores práticas de engenharia para assegurar a disponibilidade contínua e a precisão técnica das informações apresentadas no website. Contudo, não garante a total ausência de interrupções temporárias decorrentes de manutenção, falhas de telecomunicações alheias ou incidentes imprevisíveis de força maior.
            </p>
            <p className="text-sm text-muted">
              A informação contida no website é de caráter geral e informativo, não dispensando uma consulta técnica prévia para a definição de especificações contratuais definitivas.
            </p>
          </section>

          {/* 6. Ligações a Terceiros */}
          <section aria-labelledby="links-terceiros" className="space-y-3">
            <h2 id="links-terceiros" className="text-xl sm:text-2xl font-medium text-foreground tracking-tight">
              6. Ligações Externas (Links para Terceiros)
            </h2>
            <p>
              Este website pode conter hiperligações para websites ou plataformas externas (como LinkedIn ou Instagram). A Midi8 não exerce controlo sobre esses sítios de terceiros e não assume qualquer responsabilidade pelas respetivas políticas de privacidade ou conteúdos.
            </p>
          </section>

          {/* 7. Alterações aos Termos */}
          <section aria-labelledby="alteracoes" className="space-y-3">
            <h2 id="alteracoes" className="text-xl sm:text-2xl font-medium text-foreground tracking-tight">
              7. Alterações aos Termos e Condições
            </h2>
            <p>
              A Midi8 reserva-se o direito de rever e modificar unilateralmente os presentes Termos e Condições em qualquer momento. As alterações entram em vigor a partir da sua publicação no website. Recomenda-se a consulta periódica desta página.
            </p>
          </section>

          {/* 8. Lei Aplicável e Foro */}
          <section aria-labelledby="lei-foro" className="space-y-3 bg-surface/40 p-5 rounded-2xl border border-border">
            <h2 id="lei-foro" className="text-lg sm:text-xl font-medium text-foreground tracking-tight">
              8. Lei Aplicável e Foro Competente
            </h2>
            <p>
              Os presentes Termos e Condições regem-se em exclusivo pela <strong>legislação portuguesa</strong>.
            </p>
            <p className="text-sm text-muted">
              Para a resolução de qualquer litígio emergente da interpretação, validade ou execução destes termos, que não possa ser dirimido amigavelmente entre as partes, são competentes os <strong>tribunais portugueses territorialmente competentes</strong>.
            </p>
          </section>

          {/* Navegação Inferior */}
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
              href="/privacidade"
              className="text-sm text-brand-blue hover:underline"
            >
              Consultar Política de Privacidade →
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}

