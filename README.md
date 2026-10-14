# Midi8 — Engenharia de Software e Infraestrutura

Website institucional e plataforma corporativa da **Midi8**, concebido para refletir uma abordagem "Deep Tech" de engenharia de software de alto desempenho, arquiteturas resilientes e estética técnica de alta precisão.

---

## Visão Geral

A Midi8 projeta, desenvolve e opera infraestruturas digitais de missão crítica. Esta aplicação combina computação gráfica em tempo real via HTML5 Canvas (simulação de metal líquido escuro com ruído procedural de Perlin), navegação espacial contínua ao longo do eixo Z (Framer Motion), rotas dedicadas para o **Manifesto da Empresa** e **Capacidade Técnica**, e um rodapé corporativo completo com conversão direta.

---

## Destaques de Arquitetura e Engenharia de UI

- **Hero "Dark Liquid Metal":**
  - Simulação procedural em tempo real com Fractal Brownian Motion (fBm) de 5 oitavas sobre ruído Perlin em Canvas 2D.
  - Iluminação rasante dinâmica em tom Cobre (`#EA580C`) com interpolação contínua (LERP) do cursor e ondas de clique (*ripples*) com decaimento exponencial.
  - **Eficiência Operacional:** Pausa automática do ciclo de renderização (`cancelAnimationFrame`) via `IntersectionObserver` quando o elemento sai do viewport.
- **Navegação Espacial (Z-Axis Scroll):**
  - Orquestração cinemática em câmara fixa (`240vh` em desktop): zoom e fade no Hero enquanto a grelha de serviços (*Bento Box*) emerge em profundidade tridimensional.
  - Degradação graciosa para dispositivos móveis via `useSyncExternalStore`, desativando sobrecarga de gestos 3D e renderizando fluxo linear vertical de alto rendimento.
- **Design System Monocromático com Acento em Cobre:**
  - Base em `zinc-950` (`#09090b` / `#0a0a0a`), painéis em vidro fosco (`backdrop-blur-md`) e bordas discretas em `zinc-800`.
  - Acento estrito em Cobre / Laranja Queimado (`#EA580C`) para estados ativos, micro-interações e pontos de conversão.
  - Tipografia de precisão utilizando Geist Sans e Geist Mono via `next/font`.
- **Arquitetura Multi-Rota no App Router:**
  - `/` — Landing page corporativa com câmara 3D, Bento Box, Portfólio Showcase, Tech Stack e Rodapé.
  - `/sobre` — Manifesto Deep Tech, Pilares de Engenharia (Resiliência, Zero-Trust, Performance Extrema) e Governação Técnica em 3 níveis.
  - `/solucoes` — Matriz 2x2 de Capacidade Técnica (Web Distribuída, Automação de Processos, IA & Dados, Consultoria Técnica).
- **Rodapé Corporativo & Conversão Autônoma:**
  - Rodapé em grelha responsiva de 12 colunas, navegação cruzada via SPA (`next/link`), contacto institucional (`hello@midi8.com`), redes (LinkedIn, GitHub) e barra legal.
  - CTAs redirecionados para `#contacto` com scroll suave, eliminando dependências externas e riscos de rastreamento.

---

## Stack Tecnológico

- **Framework:** Next.js 16 (App Router, Turbopack, Partial Prefetching)
- **Linguagem:** TypeScript 5 (Modo estrito)
- **Biblioteca de UI:** React 19
- **Estilização:** Tailwind CSS v4
- **Animações e Física:** Framer Motion 14
- **Tipografia:** Geist Sans & Geist Mono (`next/font/google`)
- **Qualidade de Código:** ESLint 9

---

## Estrutura do Projeto

```
midi8/
├── public/                     # Ativos estáticos e ícones
├── src/
│   ├── app/
│   │   ├── globals.css         # Variáveis CSS, Tailwind v4 e utilitários
│   │   ├── layout.tsx          # Root Layout com fontes, SEO e Navbar persistente
│   │   ├── page.tsx            # Landing Page e orquestrador de profundidade 3D
│   │   ├── sobre/
│   │   │   └── page.tsx        # Server Component com SEO da rota /sobre
│   │   └── solucoes/
│   │       └── page.tsx        # Server Component com SEO da rota /solucoes
│   └── components/
│       ├── BentoServices.tsx   # Bento Box assimétrica com tilt 3D e Crown Jewel neural
│       ├── Footer.tsx          # Rodapé corporativo de 12 colunas e links legais
│       ├── Hero.tsx            # Motor procedural Canvas 2D (Dark Liquid Metal)
│       ├── Navbar.tsx          # Barra de navegação com prefetch SPA e menu mobile
│       ├── Showcase.tsx        # Cartões flutuantes de projetos em produção
│       ├── SobreContent.tsx    # Client Component do Manifesto e Governação Técnica
│       ├── SolucoesContent.tsx # Client Component da Matriz 2x2 de Capacidade Técnica
│       └── TechStack.tsx       # Matriz horizontal de tecnologias nucleares
├── package.json                # Dependências limpas (zero bloat de terceiros)
├── tsconfig.json               # Configurações do compilador TypeScript
└── README.md                   # Documentação técnica e arquitetura do projeto
```

---

## Instalação e Execução

### Pré-requisitos

- Node.js 18.17 ou superior
- npm (ou pnpm / yarn)

### Passos de Instalação

1. Clonar o repositório:
   ```bash
   git clone https://github.com/miguelmarquessilva/midi8.git
   cd midi8
   ```

2. Instalar as dependências:
   ```bash
   npm install
   ```

3. Iniciar o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Aceder em [http://localhost:3000](http://localhost:3000).

---

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor local com Turbopack ativo.
- `npm run build`: Compilação e geração estática de todas as rotas com verificação estrita de tipos TypeScript.
- `npm run start`: Inicia o servidor em modo de produção.
- `npm run lint`: Executa a auditoria de linting estático com o ESLint.

---

## Licença e Propriedade

© 2026 Midi8. Todos os direitos reservados.  
Uso interno e comercial restrito aos termos autorizados pela organização.
