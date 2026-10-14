"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer id="contacto" className="relative bg-zinc-950 text-foreground border-t border-zinc-800/60 overflow-hidden">
      {/* Top subtle copper accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-[#EA580C]/40 to-transparent pointer-events-none" />

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* ── 1. Bloco da Marca (Esquerda - 4 cols) ── */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 group w-fit"
              aria-label="MIDI8 — Página Inicial"
            >
              <div className="w-7 h-7 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-zinc-600 group-hover:shadow-[0_0_16px_rgba(234,88,12,0.3)] transition-all duration-300">
                <span className="text-[11px] font-bold text-white">M8</span>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                MIDI8
              </span>
            </Link>

            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Engenharia de Software e Infraestrutura.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                Sistemas Corporativos de Alta Escala
              </span>
            </div>
          </div>

          {/* ── 2. Bloco de Navegação (Centro-Esquerda - 2 cols) ── */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
              Plataforma
            </p>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link
                  href="/solucoes"
                  className="text-zinc-400 hover:text-[#EA580C] transition-colors duration-200 inline-block py-0.5"
                >
                  Soluções
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="text-zinc-400 hover:text-[#EA580C] transition-colors duration-200 inline-block py-0.5"
                >
                  A Empresa
                </Link>
              </li>
            </ul>
          </div>

          {/* ── 3. Bloco de Contacto e Conversão (Centro-Direita - 4 cols) ── */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
              Contacto
            </p>
            
            <a
              href="mailto:hello@midi8.com"
              className="text-sm font-mono text-zinc-400 hover:text-white transition-colors duration-200 w-fit inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              hello@midi8.com
            </a>

            <div>
              <a
                href="mailto:hello@midi8.com?subject=Agendamento%20de%20Reuni%C3%A3o%20T%C3%A9cnica"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#EA580C] hover:bg-[#f06115] transition-all duration-200 cursor-pointer shadow-[0_0_16px_rgba(234,88,12,0.2)] hover:shadow-[0_0_24px_rgba(234,88,12,0.4)] border border-[#EA580C]/60"
              >
                <span>Agendar Reunião Técnica</span>
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* ── 4. Bloco de Redes/Sociais (Direita - 2 cols) ── */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
              Redes
            </p>
            <div className="flex flex-col gap-2.5 text-sm">
              <a
                href="https://linkedin.com/company/midi8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#EA580C] transition-colors duration-200 w-fit"
                aria-label="LinkedIn Midi8"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn</span>
              </a>

              <a
                href="https://github.com/midi8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#EA580C] transition-colors duration-200 w-fit"
                aria-label="GitHub Midi8"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── 5. Barra Inferior (Legal) ── */}
      <div className="border-t border-zinc-800/80 bg-zinc-950/80">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <p>
            © {currentYear} Midi8. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="hover:text-zinc-300 transition-colors duration-200"
            >
              Política de Privacidade
            </Link>
            <Link
              href="#"
              className="hover:text-zinc-300 transition-colors duration-200"
            >
              Termos e Condições
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
