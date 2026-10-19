# Midi8 — Engenharia de Software e Infraestrutura

Plataforma corporativa e website institucional da Midi8, orientada a engenharia de software de alta performance, arquiteturas resilientes e sistemas distribuídos.

---

## Visão Geral

O projeto foi construído para aliar estética técnica de alta precisão com eficiência computacional e arquitetura estrita. A aplicação implementa um motor híbrido de renderização gráfica (Canvas 2D procedimental com ruído Perlin para desktop e gradiente CSS acelerado por hardware para dispositivos móveis), orquestração espacial em profundidade tridimensional, rotas dedicadas para o Manifesto e Catálogo de Soluções, e um fluxo de conversão institucional autónomo.

---

## Pilares de Engenharia e Arquitetura

### 1. Motor Gráfico e Eficiência Energética
- **Desktop:** Simulação de metal líquido escuro com ruído Fractal Brownian Motion (fBm) de 5 oitavas em Canvas 2D, iluminação dinâmica em tom Cobre (`#EA580C`) e interpolação contínua (LERP) do cursor com decaimento exponencial de ondas de choque (*ripples*).
- **Mobile:** Suspensão total do loop `requestAnimationFrame` e dos cálculos matemáticos de ruído procedimental. Em ecrãs táteis e durante o Server-Side Rendering (SSR), o Canvas é substituído pela classe `.hero-liquid-css`, animada nativamente na GPU para preservar a bateria e eliminar o aquecimento do dispositivo.
- **Estabilidade de Redimensionamento:** Reset explícito da matriz de transformação (`ctx.setTransform(1, 0, 0, 1, 0, 0)`) antes da escala do Device Pixel Ratio (`dpr`), prevenindo distorções cumulativas provocadas pelo aparecimento e recolhimento das barras nativas de navegação mobile.
- **Prevenção de Fugas de Memória:** O ciclo de renderização é gerido através de `IntersectionObserver`, suspendendo o processamento quando a secção sai do viewport e desalocando listeners no desmontar do componente.

### 2. Responsividade Mobile e UX Tátil
- **Bloqueio de Scroll no Body:** Ativação de `document.body.style.overflow = "hidden"` sempre que o menu de navegação móvel está aberto, impedindo o deslizamento acidental da página de fundo.
- **Viewport Dinâmico:** Contenção dimensional com `h-[100dvh]` para absorver flutuações de altura causadas pelas barras de pesquisa do Safari iOS e Chrome Android.
- **Desativação de Tilt 3D:** Neutralização imediata de rotações espaciais e holofotes radiais nos cartões em dispositivos táteis, assegurando rolagem linear e contínua sem quebras de frame (*scroll jank*).

### 3. Navegação SPA e Roteamento
- **Arquitetura Multi-Rota (App Router):**
  - `/`: Página principal com introdução cinemática, Bento Box de serviços, portfólio de produção e stack técnico.
  - `/sobre`: Manifesto corporativo, pilares de engenharia (Resiliência, Zero-Trust, Performance Extrema) e níveis de auditoria técnica.
  - `/solucoes`: Matriz de capacidade técnica detalhada (Sistemas Distribuídos, Automação ETL, IA Corporativa, Consultoria de Suporte à Decisão).
- **Navegação Sem Recarregamento:** Utilização integral de `<Link>` do `next/link` com prefetching automático.
- **Roteamento Absoluto de Contacto:** Pontos de conversão na navegação configurados com `href="/#contacto"`, garantindo que o acionamento a partir de qualquer subpágina encaminhe diretamente para o formulário e âncora do rodapé institucional.
- **Conversão Autónoma:** Eliminação de dependências externas de agendamento de terceiros (Cal.com), reduzindo a pegada de scripts e riscos de rastreamento de dados.

### 4. Design System e Identidade Visual
- **Paleta Base:** Dark Mode estrito assente em `zinc-950` (`#09090b` / `#0a0a0a`), superfícies translúcidas em `zinc-900` e bordas finas em `zinc-800` (`rgba(63, 63, 70, 0.5)`).
- **Acento Técnico:** Cobre / Laranja Queimado (`#EA580C`, `--copper`) reservado para pontos focais, métricas ativas e gatilhos de interação.
- **Tipografia:** Tipos de letra Geist Sans e Geist Mono via `next/font/google`.

---

## Stack Tecnológico

- **Framework:** Next.js 16.4.0 (Turbopack, App Router, Static Prerendering)
- **Biblioteca Base:** React 19.3.0
- **Linguagem:** TypeScript 5.0 (Strict mode)
- **Estilização:** Tailwind CSS v4.0
- **Animação e Física:** Framer Motion 14.1.0
- **Qualidade e Linting:** ESLint 9

---

## Estrutura do Repositório

```
midi8/
├── public/                     # Ativos estáticos e favicon
├── src/
│   ├── app/
│   │   ├── globals.css         # Tokens CSS, Tailwind v4 e utilitários
│   │   ├── layout.tsx          # Root Layout com tipografia e metadados SEO
│   │   ├── page.tsx            # Página inicial e orquestração espacial
│   │   ├── sobre/
│   │   │   └── page.tsx        # Rota corporativa: Manifesto e Pilares
│   │   └── solucoes/
│   │       └── page.tsx        # Rota técnica: Matriz de Serviços
│   └── components/
│       ├── BentoServices.tsx   # Bento Box responsiva com Crown Jewel neural
│       ├── Footer.tsx          # Rodapé institucional de 12 colunas com âncora #contacto
│       ├── Hero.tsx            # Motor gráfico Canvas 2D / CSS com deteção móvel
│       ├── Navbar.tsx          # Navegação com viewport dinâmico e bloqueio de scroll
│       ├── Showcase.tsx        # Portfólio de projetos em produção
│       ├── SobreContent.tsx    # Componente visual da página Manifesto
│       ├── SolucoesContent.tsx # Componente visual da matriz de capacidade técnica
│       └── TechStack.tsx       # Matriz horizontal de tecnologias dominadas
├── package.json                # Declaração estrita de dependências limpas
├── tsconfig.json               # Configurações do compilador TypeScript
└── README.md                   # Documentação técnica do projeto
```

---

## Instruções de Execução

### Pré-requisitos
- Node.js 18.17 ou superior
- npm 9 ou superior

### Instalação
```bash
git clone https://github.com/Midi-8/midi8.git
cd midi8
npm install
```

### Desenvolvimento
```bash
npm run dev
```
Servidor acessível em `http://localhost:3000`.

### Verificação e Compilação
```bash
# Verificação estática de código e tipagem
npm run lint

# Compilação de produção com otimização estática
npm run build

# Execução do bundle de produção localmente
npm run start
```

---

## Propriedade e Licença

(c) 2026 Midi8. Todos os direitos reservados.  
Código proprietário para infraestrutura e plataforma institucional da organização.
