# Midi8 — Engenharia de Software e Soluções Digitais

Website institucional da Midi8, concebido com foco em engenharia de software de alto desempenho, arquitetura visual imersiva e experiência interativa de alta fidelidade.

---

## Visão Geral

A aplicação apresenta a proposta de valor, portfólio e serviços da Midi8 através de uma interface moderna e minimalista. O projeto combina computação gráfica em tempo real via Canvas, navegação espacial em profundidade com aceleração por hardware e um sistema de agendamento de reuniões diretamente integrado.

---

## Destaques de Arquitetura e Engenharia de UI

- **Hero "Dark Liquid Metal":** Simulação procedural de superfície fluida em tempo real utilizando ruído fracionário Perlin (fBm) renderizado via HTML5 Canvas. Inclui iluminação dinâmica baseada no cursor em tom de cobre, ondas de impacto interativas ao clique e propagação ambiental contínua.
- **Eficiência e Gestão de Recursos:** O loop de renderização (`requestAnimationFrame`) é monitorizado via `IntersectionObserver`, suspendendo cálculos quando o elemento não está visível no viewport para preservar ciclos de CPU e bateria.
- **Navegação Espacial (Z-Axis Scroll):** Transições de profundidade e escala ao longo do scroll implementadas com Framer Motion, proporcionando uma experiência contínua entre a secção Hero e os serviços.
- **Design System Técnico:**
  - Base monocromática em escala Dark Mode (`zinc-950` / `#09090b`).
  - Acentos cirúrgicos em Cobre (`#EA580C`) para ações de conversão e elementos de estado ativo.
  - Tipografia de precisão utilizando as famílias Geist Sans e Geist Mono.
  - Componentes com efeito de vidro fosco (`backdrop-blur`) e micro-bordas sutis em gradiente.
- **Agendamento Integrado (Cal.com):** Integração com `@calcom/embed-react` pré-configurada em modo dark e identidade visual alinhada à marca.

---

## Stack Tecnológico

- **Framework:** Next.js (App Router, Turbopack)
- **Linguagem:** TypeScript
- **Renderização e Estado:** React
- **Estilização:** Tailwind CSS
- **Animações e Interatividade:** Framer Motion
- **Agendamento:** Cal.com Embed React
- **Tipografia:** Geist Sans e Geist Mono (next/font)
- **Qualidade de Código:** ESLint

---

## Estrutura do Projeto

```
midi8/
├── public/                 # Recursos estáticos
├── src/
│   ├── app/
│   │   ├── globals.css     # Diretivas Tailwind, variáveis e estilos globais
│   │   ├── layout.tsx      # Layout raiz com fontes, metadados e Navbar global
│   │   └── page.tsx        # Página principal e orquestração do scroll espacial
│   └── components/
│       ├── BentoServices.tsx # Grelha bento com cartões de serviços e estado
│       ├── Footer.tsx        # Rodapé institucional e canal de contacto
│       ├── Hero.tsx          # Canvas procedural líquido e chamada principal
│       ├── Navbar.tsx        # Barra de navegação com gatilho do Cal.com
│       ├── Showcase.tsx      # Exibição de projetos e casos de uso
│       └── TechStack.tsx     # Matriz de tecnologias e ferramentas
├── package.json            # Metadados e dependências do projeto
├── tsconfig.json           # Configurações do compilador TypeScript
└── README.md               # Documentação técnica do projeto
```

---

## Instalação e Execução

### Pré-requisitos

- Node.js 18.17 ou superior
- npm, pnpm ou yarn

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

4. Aceder à aplicação através de [http://localhost:3000](http://localhost:3000).

---

## Scripts Disponíveis

- `npm run dev`: Inicia o ambiente de desenvolvimento local com suporte a Turbopack.
- `npm run build`: Compila a aplicação para produção com otimização estática e SSR.
- `npm run start`: Inicia o servidor de produção após compilação.
- `npm run lint`: Executa a verificação estática de código com o ESLint.

---

## Licença e Propriedade

Todos os direitos reservados a Midi8.
Uso interno e comercial restrito aos termos autorizados pela organização.
