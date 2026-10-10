# Midi8 — Engenharia de Software & Soluções Digitais

Website institucional da **Midi8**, empresa especializada em engenharia de software de alto nível, desenvolvimento web & móvel, automação de processos, inteligência artificial e consultoria técnica corporativa.

---

## ⚡ Stack Tecnológico

- **Framework:** [Next.js](https://nextjs.org/) (App Router & Turbopack)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Animações & Efeitos 3D:** [Framer Motion](https://www.framer.com/motion/)
- **Agendamento:** [@calcom/embed-react](https://cal.com/) (Modal Popup Integrado)
- **Tipografia:** Geist Sans & Geist Mono

---

##   Design System

- **Tema:** Dark mode estrito (`#0a0a0a` / `zinc-950`).
- **Base Visual:** Monocromática técnica baseada em cinzas e brancos puros.
- **Cor de Destaque:** Cobre / Laranja Queimado (`#EA580C`) para botões de conversão e badges de estado.
- **Interatividade & 3D:**
  - **Spatial Parallax (Hero):** Efeito multi-plano com rastreamento do cursor e reflexo de luz invertido.
  - **3D Tilt (Bento Services):** Inclinação tridimensional com `perspective: 1000px`, `useSpring` e reflexo luminoso interno.
  - **Floating Cards (Showcase):** Cartões de vidro fosco com levitação orgânica e `backdrop-blur`.
  - **Cal.com Modal:** Sistema de agendamento integrado que abre sobre a página com `theme: dark` e `brandColor: #EA580C`.

---

##   Como Executar

### Pré-requisitos

- Node.js 18+ instalado
- npm, yarn ou pnpm

### Instalação e Desenvolvimento

1. Clone o repositório e aceda à pasta:
   ```bash
   git clone https://github.com/miguelmarquessilva/midi8.git
   cd midi8
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor local:
   ```bash
   npm run dev
   ```

4. Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Build de Produção

```bash
npm run build
npm run start
```

---

##   Estrutura de Ficheiros

```
midi8/
├── src/
│   ├── app/
│   │   ├── globals.css       # Tokens de cor, animações e utilitários
│   │   ├── layout.tsx        # Configuração de SEO, OpenGraph e fontes
│   │   └── page.tsx          # Composição principal da página
│   └── components/
│       ├── Navbar.tsx        # Navegação com gatilho do modal Cal.com
│       ├── Hero.tsx          # Hero com Parallax Espacial e CTA principal
│       ├── BentoServices.tsx # Grelha Bento com 3D Tilt e badges de estado
│       ├── Showcase.tsx      # Floating Cards com projetos em produção
│       ├── TechStack.tsx     # Grelha de tecnologias com micro-indicadores
│       └── Footer.tsx        # Secção final de conversão e contactos
├── public/                   # Ficheiros estáticos
└── README.md
```

---

##   Licença

Todos os direitos reservados © Midi8.
