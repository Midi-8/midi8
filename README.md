# Midi8 — Tecnologia, Software, Automação & Comunicação Digital

Website institucional minimalista em página única (*single-page*) da **Midi8**, combinando estética editorial limpa sobre fundo branco com um fade superior difuso nas cores da marca (`#A818FF`, `#145EFF`, `#00E896`), carrossel interativo com todos os 13 serviços e formulário de contacto autónomo.

---

## Visão Geral

- **Estética Minimalista (Light Mode + Top Aurora Fade):** Base branca pura (`#FFFFFF`) com tinta profunda (`#0B0F17`), fade superior difuso com grão orgânico nas cores da Midi8 (`.top-aurora-fade`), pílulas pastel interativas e tipografia editorial (`Cormorant Garamond`).
- **Carrossel Interativo de Serviços (`ServicesCarousel.tsx`):** Carrossel horizontal com filtro por categoria e cartões com transição suave de superfície neutra (`#F4F5F7`) para gradiente da marca no estado ativo/hover, apresentando os 13 serviços da Midi8:
  1. Web Design e Desenvolvimento Web
  2. Desenvolvimento de Software
  3. Desenvolvimento de Soluções Tecnológicas
  4. Automação de Processos
  5. Estratégia e Comunicação
  6. Publicidade e Campanhas
  7. Marketing Digital e Redes Sociais
  8. Consultoria Informática
  9. Consultoria em Media Digitais
  10. Análise de Dados e Suporte à Tomada de Decisão
  11. Inteligência Artificial e Modelos de Linguagem (LLMs)
  12. Operações de Comércio Eletrónico (E-commerce Operations)
  13. Desenvolvimento Mobile
- **Single-Page + Redirecionamentos:** Toda a experiência principal vive em `/` seguindo a ordem **A Midi8** (`#sobre`), **Serviços** (`#servicos`), **Equipa** (`#equipa`) e **Contactos** (`#contacto`), mantendo redirecionamentos limpos para rotas antigas (`/solucoes`, `/sobre`, `/contacto`) e páginas legais (`/privacidade`, `/termos`).
- **Conversão Autónoma:** Formulário de contacto (`ContactForm.tsx`) com validação partilhada cliente/servidor (`src/lib/contact.ts`), proteção *honeypot*, *rate limiting* por IP (`src/app/api/contacto/route.ts`), envio via Resend e fallback `mailto:`.

---

## Stack Tecnológico

- **Framework:** Next.js 16 (Turbopack, App Router, Cache Components, Partial Prefetching)
- **Biblioteca Base:** React 19
- **Linguagem:** TypeScript 5 (Strict mode)
- **Estilização:** Tailwind CSS v4
- **Animação:** Framer Motion 14
- **Qualidade:** ESLint 9

---

## Estrutura do Repositório

```
midi8/
├── public/
│   ├── m8-icon*.{png,svg}        # Favicons M8 e Apple Touch Icon
│   └── team/                     # Retratos da equipa
├── src/
│   ├── app/
│   │   ├── api/contacto/route.ts # Endpoint POST com validação, honeypot, rate limit e Resend
│   │   ├── contacto/page.tsx     # Redirecionamento para /#contacto
│   │   ├── privacidade/page.tsx  # Política de Privacidade (RGPD)
│   │   ├── termos/page.tsx       # Termos e Condições
│   │   ├── sobre/page.tsx        # Redirecionamento para /#sobre
│   │   ├── solucoes/page.tsx     # Redirecionamento para /#servicos
│   │   ├── favicon.ico           # Favicon fallback multi-tamanho
│   │   ├── globals.css           # Design System Minimalista + Top Aurora Fade
│   │   ├── layout.tsx            # Root Layout, fontes, JSON-LD, Navbar & Footer
│   │   ├── not-found.tsx         # Página 404 personalizada
│   │   ├── opengraph-image.tsx   # Geração dinâmica de imagem OpenGraph
│   │   ├── twitter-image.tsx     # Geração dinâmica de imagem Twitter/X
│   │   ├── page.tsx              # Página única principal (Hero, Carrossel, Sobre, Contacto)
│   │   ├── robots.ts             # Diretivas de rastreamento
│   │   └── sitemap.ts            # Mapa do site XML
│   ├── components/
│   │   ├── ContactForm.tsx       # Formulário de contacto validado
│   │   ├── Footer.tsx            # Rodapé institucional
│   │   ├── Hero.tsx              # Hero minimalista com fade superior e pílulas de categoria
│   │   ├── MotionProvider.tsx    # Configuração global prefers-reduced-motion
│   │   ├── Navbar.tsx            # Barra de navegação minimalista single-page
│   │   ├── ServicesCarousel.tsx  # Carrossel interativo dos 13 serviços
│   │   └── TeamSection.tsx       # Secção de equipa com filtros e retratos
│   └── lib/                      # Utilitários de contacto, OG image e URL base
├── package.json
├── tsconfig.json
└── README.md
```

---

## Instruções de Execução

```bash
git clone https://github.com/Midi-8/midi8.git
cd midi8
npm install
npm run dev
```
Servidor acessível em `http://localhost:3000`.

### Verificação e Compilação
```bash
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

---

© 2026 Midi8. Todos os direitos reservados.
