# midi8

Website institucional e plataforma digital oficial da **midi8** - estúdio português de tecnologia, engenharia de software, automação, inteligência artificial e comunicação estratégica.

- **Produção:** [midi8.pt](https://midi8.pt)
- **Tagline:** *move forward, fast*
- **Idiomas:** Português (PT) e Inglês (EN)

---

## Visão Geral

A aplicação foi concebida como uma experiência editorial minimalista de alta performance, estruturada em múltiplas páginas no Next.js App Router e alinhada integralmente com a identidade visual oficial da **midi8**.

### Principais Características

- **Identidade Visual & Sistema Cromático Oficial:** Base minimalista clara (`#FAFAF9`) com tinta profunda (`#0B0F17`) e gradiente oficial extraído diretamente do ícone da marca - Violeta-Magenta (`#C015FF`), Azul Elétrico (`#0069F8`) e Aqua-Menta (`#00E8B2`).
- **Gráficos Interativos em WebGL:**
  - `AuroraCanvas.tsx` - aurora fluida reativa ao cursor no Hero com fallback CSS e pausa automática fora de viewport.
  - `SculptureEight.tsx` - escultura volumétrica 3D do `8` oficial construída em WebGL com campo de distância, malha estrutural de filamentos 3D, sombreamento com iridescência Fresnel, morfogénese de entrada, rotação livre em 360° com inércia, campo magnético e ondas de choque ao clicar.
- **Experiência Multi-Página & Bilingue (PT / EN):** Alternância instantânea de idioma (`LanguageContext.tsx`) com persistência local estritamente funcional (`midi8-locale`), scroll suave via Lenis (`SmoothScroll.tsx`) e respeito integral por `prefers-reduced-motion`.
- **Catálogo de Serviços & Briefing Guiado:** Carrossel interativo de 13 serviços na Home (`ServicesCarousel.tsx`), catálogo completo em grelha Bento filtrável (`/servicos`) e construtor de briefing (`BriefBuilder.tsx`) que pré-preenche automaticamente o formulário em `/contacto`.
- **Processo, Competências & Equipa:** Carrossel 3D do método de trabalho em 4 fases (`WorkMethodCarousel.tsx`), painéis expansíveis de competências (`MinimalistShowcase.tsx`) e palco interativo da equipa multidisciplinar (`TeamSection.tsx`, `TeamMemberModal.tsx` e `/equipa`).
- **Conformidade Legal & Privacidade:** Política de Privacidade (`/privacidade`) e Termos e Condições (`/termos`) redigidos segundo o RGPD (UE 2016/679), Lei n.º 58/2019 e Diretiva ePrivacy / Lei n.º 41/2004, com arquitetura *zero tracking* (sem cookies publicitários ou analíticos de terceiros).

---

## Stack Tecnológico

| Camada | Tecnologia | Versão |
| :--- | :--- | :--- |
| Framework | Next.js (App Router, Turbopack, Cache Components) | `16.4.6` |
| UI Runtime | React & React DOM | `19.3.0` |
| Linguagem | TypeScript (Strict Mode) | `5.x` |
| Estilização | Tailwind CSS | `4.x` |
| Animação & Scroll | Framer Motion + Lenis | `14.1.0` / `1.3.27` |
| Gráficos 3D / Shaders | WebGL (GLSL ES 1.00 nativo, zero dependências externas) | Nativo |
| Qualidade de Código | ESLint + `eslint-config-next` | `9.x` |
| Alojamento & Email | Vercel + Resend API | Produção |

---

## Arquitetura de Rotas & SEO

| Rota | Descrição | SEO & Dados Estruturados |
| :--- | :--- | :--- |
| `/` | Página principal (Hero, 3 Pilares, Carrossel de Serviços, Equipa, Contacto) | Canonical, `ProfessionalService`, `OfferCatalog`, `WebSite` |
| `/sobre` | Filosofia da midi8, escultura 3D WebGL, pilares, método de trabalho e áreas | Canonical, `BreadcrumbList` |
| `/servicos` | Catálogo filtrável dos 13 serviços + construtor interativo de briefing | Canonical, `BreadcrumbList` |
| `/equipa` | Palco interativo da equipa por departamento (Roster + Spotlight) | Canonical, `BreadcrumbList` |
| `/contacto` | Formulário validado com pré-seleção de áreas e resumo via query string | Canonical, `BreadcrumbList` |
| `/privacidade` | Política de Privacidade (RGPD, CNPD, transparência de armazenamento) | Canonical, `BreadcrumbList` |
| `/termos` | Termos e Condições gerais de utilização e prestação de serviços | Canonical, `BreadcrumbList` |
| `/api/contacto` | Endpoint `POST` para submissão de pedidos de reunião | `Cache-Control: no-store` |

Recursos técnicos gerados automaticamente a partir de `src/lib/site.ts`:
- `GET /sitemap.xml` (`src/app/sitemap.ts`)
- `GET /robots.txt` (`src/app/robots.ts`)
- `GET /manifest.webmanifest` (`src/app/manifest.ts`)
- `GET /opengraph-image` e `GET /twitter-image` (`src/lib/og-image.tsx`)

---

## Segurança & Resiliência

### Headers HTTP (`next.config.ts`)
Configurados automaticamente em produção para todas as rotas:
- `Strict-Transport-Security` (HSTS 2 anos com `includeSubDomains; preload`)
- `Content-Security-Policy` restritiva com `upgrade-insecure-requests` e `frame-ancestors 'none'`
- `X-Frame-Options: DENY` e `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Cross-Origin-Opener-Policy: same-origin`
- `Permissions-Policy` (bloqueio explícito de câmara, microfone, geolocalização e topics)
- `poweredByHeader: false`

### Proteção do Endpoint `/api/contacto` (`src/app/api/contacto/route.ts`)
- Validação partilhada cliente/servidor (`src/lib/contact.ts`)
- Verificação `same-origin` em produção (`Origin` / `Sec-Fetch-Site`)
- *Rate limiting* por IP (máximo de 5 pedidos por janela de 10 minutos)
- Campo *honeypot* para neutralização silenciosa de bots
- Limite de tamanho de payload (`64 KB`) e sanitização de cabeçalhos contra *header injection*
- Fallback automático para `mailto:` caso o envio transacional não esteja configurado

---

## Estrutura do Repositório

```text
midi8/
├── public/
│   ├── favicon-8-{32,64,180,192,512}.png   # Favicons oficiais e Apple Touch Icon
│   ├── midi8-8.webp                        # Ícone oficial do 8 em alta definição
│   ├── midi8-brand-logo.webp               # Logótipo oficial completo da midi8
│   └── team/                               # Retratos otimizados da equipa (WebP)
├── src/
│   ├── app/
│   │   ├── api/contacto/route.ts           # Endpoint POST seguro (Resend)
│   │   ├── contacto/                       # Página de Contactos
│   │   ├── equipa/                         # Página de Equipa
│   │   ├── privacidade/                    # Política de Privacidade (RGPD)
│   │   ├── servicos/                       # Catálogo de Serviços & Briefing
│   │   ├── sobre/                          # Página A midi8
│   │   ├── solucoes/                       # Redirecionamento legado -> /servicos
│   │   ├── termos/                         # Termos e Condições
│   │   ├── globals.css                     # Design System, escala tipográfica e utilitários
│   │   ├── layout.tsx                      # Root Layout, fontes, JSON-LD, Navbar e Footer
│   │   ├── manifest.ts                     # Web App Manifest
│   │   ├── not-found.tsx                   # Página 404 personalizada
│   │   ├── opengraph-image.tsx             # Imagem OpenGraph dinâmica
│   │   ├── twitter-image.tsx               # Imagem Twitter/X dinâmica
│   │   ├── page.tsx                        # Página inicial
│   │   ├── robots.ts                       # Diretivas de indexação
│   │   └── sitemap.ts                      # Sitemap XML dinâmico
│   ├── components/
│   │   ├── AuroraCanvas.tsx                # Aurora WebGL reativa no Hero
│   │   ├── BreadcrumbJsonLd.tsx            # Dados estruturados BreadcrumbList
│   │   ├── BriefBuilder.tsx                # Construtor interativo de briefing
│   │   ├── ContactForm.tsx                 # Formulário de contacto validado
│   │   ├── Footer.tsx                      # Rodapé institucional
│   │   ├── Hero.tsx                        # Secção Hero principal
│   │   ├── KineticHeading.tsx              # Títulos com revelação e brilho oficial
│   │   ├── MagneticButton.tsx              # Botão interativo com efeito magnético
│   │   ├── MinimalistShowcase.tsx          # Faixas expansíveis de áreas e equipa
│   │   ├── MotionProvider.tsx              # Configuração global reduced-motion
│   │   ├── Navbar.tsx                      # Navegação flutuante com alternância PT/EN
│   │   ├── PillarCard3D.tsx                # Cartões 3D interativos dos 3 pilares
│   │   ├── SculptureEight.tsx              # Escultura volumétrica 3D do 8 em WebGL
│   │   ├── ServiceIcon.tsx                 # Biblioteca de ícones vetoriais de serviços
│   │   ├── ServicesCarousel.tsx            # Carrossel 3D dos 13 serviços
│   │   ├── SmoothScroll.tsx                # Integração Lenis sincronizada com rotas
│   │   ├── TeamMemberModal.tsx             # Modal de perfil detalhado da equipa
│   │   ├── TeamSection.tsx                 # Secção da equipa na página inicial
│   │   └── WorkMethodCarousel.tsx          # Carrossel do processo de trabalho em 4 fases
│   ├── context/
│   │   └── LanguageContext.tsx             # Estado global de idioma (PT/EN)
│   └── lib/
│       ├── contact.ts                      # Contactos oficiais, áreas e validação partilhada
│       ├── midi8-logo-data-uri.ts          # Data URI nativo do logótipo para OG Image
│       ├── og-image.tsx                    # Renderer do cartão OpenGraph / Twitter
│       └── site.ts                         # Resolução centralizada de siteUrl e siteDomain
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Configuração e Desenvolvimento Local

### Pré-requisitos
- Node.js `>= 20.x`
- npm `>= 10.x`

### Instalação e Execução

```bash
git clone https://github.com/Midi-8/midi8.git
cd midi8
npm install
npm run dev
```

A aplicação fica disponível em `http://localhost:3000`.

### Variáveis de Ambiente

Crie um ficheiro `.env.local` (não versionado) ou configure na **Vercel (`Settings -> Environment Variables`)**:

| Variável | Obrigatória | Exemplo | Descrição |
| :--- | :---: | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Recomendada | `https://midi8.pt` | URL canónico usado em SEO, sitemap, robots, JSON-LD e OG Image |
| `RESEND_API_KEY` | Opcional* | `re_xxxxxxxxx` | Chave da API Resend para envio automático do formulário `/contacto` |
| `CONTACT_FROM` | Opcional | `midi8 <site@midi8.pt>` | Remetente verificado no Resend |
| `CONTACT_TO` | Opcional | `midi8.clientes@gmail.com` | Endereço de destino dos pedidos submetidos |

*\*Sem `RESEND_API_KEY`, o formulário mantém funcionamento total com fallback seguro via `mailto:`.*

### Verificação e Build de Produção

```bash
npx tsc --noEmit   # Verificação estrita de tipos TypeScript
npm run lint       # Análise estática ESLint
npm run build      # Compilação otimizada de produção
npm run start      # Servidor de produção local
```

---

## Deploy

O projeto está preparado para deploy contínuo na **Vercel** a partir da branch `main`:
1. Ligar o domínio `midi8.pt` (e redirecionamento `www.midi8.pt -> midi8.pt`) em **Settings -> Domains**.
2. Configurar as variáveis de ambiente de produção e a região de Functions na Europa (`cdg1` ou `fra1`).
3. Submeter `https://midi8.pt/sitemap.xml` no Google Search Console após propagação DNS.

---

© 2026 midi8. Todos os direitos reservados.
