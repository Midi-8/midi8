import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Política de Privacidade | Midi8",
  description:
    "Informação transparente sobre o tratamento de dados pessoais, direitos dos titulares e conformidade com o RGPD na Midi8.",
  openGraph: {
    title: "Política de Privacidade | Midi8",
    description:
      "Informação transparente sobre o tratamento de dados pessoais e conformidade com o RGPD na Midi8.",
    type: "website",
    locale: "pt_PT",
  },
};

export default function PrivacidadePage() {
  return (
    <main className="flex-1 text-foreground pt-28 pb-16">
      <article className="max-w-4xl mx-auto px-6">
        {/* Cabeçalho da Página */}
        <header className="mb-12 border-b border-border pb-8">
          <div className="pill mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Conformidade RGPD & Lei Portuguesa
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Política de Privacidade
          </h1>
          <p className="text-sm font-mono text-subtle">
            Última atualização:{" "}
            <time dateTime="2026-01-01">[A PREENCHER: Data de Entrada em Vigor]</time>
            {/* TODO(MIDI8): Definir data real de publicação ou revisão legal */}
          </p>
        </header>

        {/* Resumo e Enquadramento */}
        <div className="space-y-8 text-secondary text-sm sm:text-base leading-relaxed">
          <section className="bg-surface/40 border border-border rounded-xl p-6">
            <p className="text-secondary">
              A <strong>Midi8</strong> valoriza a privacidade e a segurança dos dados pessoais dos
              seus utilizadores, clientes e parceiros. Esta Política de Privacidade descreve, de
              forma clara e transparente, como recolhemos, utilizamos, tratamos e protegemos os
              dados pessoais em estrita conformidade com o <strong>Regulamento Geral sobre a Proteção de Dados (RGPD - Regulamento UE 2016/679)</strong> e com a <strong>Lei n.º 58/2019, de 8 de agosto</strong> (lei portuguesa de proteção de dados pessoais).
            </p>
          </section>

          {/* 1. Responsável pelo Tratamento */}
          <section aria-labelledby="resp-tratamento" className="space-y-3">
            <h2 id="resp-tratamento" className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              1. Identificação do Responsável pelo Tratamento
            </h2>
            <p>
              O responsável pelo tratamento dos seus dados pessoais no âmbito deste website e dos serviços prestados é:
            </p>
            <ul className="list-disc pl-5 space-y-1 font-mono text-xs sm:text-sm text-muted bg-surface/40 p-4 rounded-lg border border-border">
              <li>
                <strong>Denominação Social:</strong> [A PREENCHER: Denominação Social da Empresa]{" "}
                {/* TODO(MIDI8): Inserir denominação social legal registada */}
              </li>
              <li>
                <strong>NIF / NIPC:</strong> [A PREENCHER: NIF/NIPC]{" "}
                {/* TODO(MIDI8): Inserir Número de Identificação de Pessoa Coletiva */}
              </li>
              <li>
                <strong>Sede Social:</strong> [A PREENCHER: Morada Completa da Sede, Código Postal, Portugal]{" "}
                {/* TODO(MIDI8): Inserir morada legal da empresa */}
              </li>
              <li>
                <strong>Contacto de Email para Privacidade:</strong>{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </section>

          {/* 2. Dados Recolhidos e Finalidades */}
          <section aria-labelledby="dados-recolhidos" className="space-y-3">
            <h2 id="dados-recolhidos" className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              2. Dados Recolhidos, Finalidades e Fundamentos de Licitude
            </h2>
            <p>
              Tratamos apenas os dados estritamente necessários para as seguintes finalidades legítimas:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-surface/40 border border-border">
                <h3 className="text-base font-semibold text-foreground mb-1">
                  a) Formulários de Contacto e Agendamento de Reuniões Técnicas
                </h3>
                <p className="text-sm text-muted mb-2">
                  <strong>Dados:</strong> Nome, endereço de email, empresa, área de interesse e descrição do projeto.
                </p>
                <p className="text-sm text-muted">
                  <strong>Fundamento:</strong> Diligências pré-contratuais a pedido do titular dos dados (artigo 6.º, n.º 1, alínea b) do RGPD).
                </p>
              </div>

              <div className="p-4 rounded-lg bg-surface/40 border border-border">
                <h3 className="text-base font-semibold text-foreground mb-1">
                  b) Navegação e Segurança da Infraestrutura
                </h3>
                <p className="text-sm text-muted mb-2">
                  <strong>Dados:</strong> Endereço IP, registos técnicos do servidor (logs) e tipo de navegador, necessários à segurança e ao funcionamento do site.
                </p>
                <p className="text-sm text-muted">
                  <strong>Fundamento:</strong> Interesse legítimo da Midi8 em garantir a integridade, resiliência e segurança cibernética dos seus servidores (artigo 6.º, n.º 1, alínea f) do RGPD).
                </p>
              </div>
            </div>
          </section>

          {/* 3. Prazos de Conservação */}
          <section aria-labelledby="prazos-conservacao" className="space-y-3">
            <h2 id="prazos-conservacao" className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
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
            <h2 id="destinatarios" className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              4. Partilha com Subcontratantes e Terceiros
            </h2>
            <p>
              A Midi8 não comercializa nem cede dados pessoais a terceiros para fins de marketing. Para o regular funcionamento da infraestrutura digital, recorremos a fornecedores de serviços na qualidade de subcontratantes, os quais garantem elevados padrões de segurança e conformidade com o RGPD:
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

          {/* 5. Direitos dos Titulares */}
          <section aria-labelledby="direitos-titular" className="space-y-3">
            <h2 id="direitos-titular" className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              5. Direitos dos Titulares dos Dados
            </h2>
            <p>
              Nos termos dos artigos 15.º a 22.º do RGPD, o utilizador tem o direito de exercer gratuitamente perante a Midi8:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-surface/40 rounded border border-border">
                <strong className="text-foreground block">Direito de Acesso</strong>
                Obter confirmação sobre se os seus dados são tratados e aceder aos mesmos.
              </div>
              <div className="p-3 bg-surface/40 rounded border border-border">
                <strong className="text-foreground block">Direito de Retificação</strong>
                Solicitar a correção de dados inexatos ou incompletos.
              </div>
              <div className="p-3 bg-surface/40 rounded border border-border">
                <strong className="text-foreground block">Direito ao Apagamento</strong>
                Pedir a eliminação dos dados («direito a ser esquecido») dentro dos limites legais.
              </div>
              <div className="p-3 bg-surface/40 rounded border border-border">
                <strong className="text-foreground block">Direito à Limitação</strong>
                Solicitar a suspensão temporária do tratamento em circunstâncias específicas.
              </div>
              <div className="p-3 bg-surface/40 rounded border border-border">
                <strong className="text-foreground block">Direito de Portabilidade</strong>
                Receber os dados fornecidos em formato estruturado e legível por máquina.
              </div>
              <div className="p-3 bg-surface/40 rounded border border-border">
                <strong className="text-foreground block">Direito de Oposição</strong>
                Opor-se ao tratamento de dados fundamentado em interesses legítimos.
              </div>
            </div>
            <p className="pt-2">
              Para exercer qualquer um destes direitos, envie o seu pedido por escrito para{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
                {CONTACT_EMAIL}
              </a>{" "}
              ou para a morada da sede. A resposta será prestada no prazo máximo de 30 dias.
            </p>
          </section>

          {/* 6. Reclamação junto da CNPD */}
          <section aria-labelledby="cnpd" className="space-y-3 bg-surface/40 p-5 rounded-xl border border-border">
            <h2 id="cnpd" className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
              6. Direito de Reclamação junto da Autoridade de Controlo (CNPD)
            </h2>
            <p>
              Caso considere que o tratamento dos seus dados viola o RGPD ou a legislação nacional em vigor, tem o direito de apresentar uma reclamação à autoridade de controlo em Portugal:
            </p>
            <div className="text-xs sm:text-sm font-mono text-muted space-y-1">
              <p><strong>Comissão Nacional de Proteção de Dados (CNPD)</strong></p>
              <p>Av. D. Carlos I, 134 - 1.º, 1200-651 Lisboa, Portugal</p>
              <p>Website: <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.cnpd.pt</a></p>
            </div>
          </section>

          {/* 7. Alterações à Política */}
          <section aria-labelledby="alteracoes" className="space-y-3">
            <h2 id="alteracoes" className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              7. Alterações à presente Política
            </h2>
            <p>
              A Midi8 reserva-se o direito de atualizar esta Política de Privacidade a qualquer momento para refletir eventuais alterações técnicas, operacionais ou legislativas. A versão atualizada entrará imediatamente em vigor após publicação nesta página.
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
              className="text-sm text-accent hover:underline"
            >
              Consultar Termos e Condições →
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
