export interface CaseStudy {
  challenge: string;
  architecture: {
    stack: string[];
    decisions: string;
    integrations: string[];
  };
  results: {
    metric: string;
    description: string;
  }[];
}

export interface Project {
  id: string;
  name: string;
  type: string;
  description: string;
  tags: string[];
  status: string;
  gradient: string;
  iconGradient: string;
  caseStudy?: CaseStudy;
}

export const projects: Project[] = [
  {
    id: "mr-construcoes",
    name: "MR Construções",
    type: "Website Institucional",
    description:
      "Presença digital completa para empresa de construção civil. Design premium, otimizado para SEO e conversão de contactos comerciais.",
    tags: ["Next.js", "Tailwind CSS", "SEO"],
    status: "Em Produção",
    gradient: "from-white/[0.04] via-transparent to-transparent",
    iconGradient: "from-zinc-700 to-zinc-900",
    caseStudy: {
      challenge:
        "Desenvolver uma presença digital corporativa de alto impacto visual com Core Web Vitals impecáveis (LCP < 1.0s), capaz de apresentar galerias de obras em alta definição sem penalizar a velocidade em dispositivos móveis, além de estruturar o posicionamento orgânico em termos de pesquisa de engenharia e construção.",
      architecture: {
        stack: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Vercel Edge Network"],
        decisions:
          "Optou-se por uma arquitetura Jamstack com geração estática e otimização avançada de imagens para WebP/AVIF. A tipografia e componentes gráficos foram desenhados para garantir acessibilidade sem sacrificar a estética arquitetónica sóbria.",
        integrations: ["Otimização de Imagens Next/Image", "Formulários Server-side com Proteção Anti-Spam", "Metadados Estruturados Schema.org"],
      },
      results: [
        {
          metric: "100/100",
          description: "Pontuação máxima em Performance, Acessibilidade e SEO no Google Lighthouse.",
        },
        {
          metric: "< 0.8s",
          description: "Tempo de carregamento interativo (LCP) medido em ligações móveis 4G.",
        },
        {
          metric: "+140%",
          description: "Crescimento sustentado em contactos comerciais qualificados via formulário estruturado.",
        },
      ],
    },
  },
  {
    id: "cafe-do-rio-gulas",
    name: "Café do Rio / Gulas",
    type: "Menu Digital & KDS Mobile",
    description:
      "Sistema completo de menu digital com QR code, painel de gestão e Kitchen Display System (KDS) mobile para operações de restauração em tempo real.",
    tags: ["React", "Supabase", "React Native", "Real-time"],
    status: "Em Produção",
    gradient: "from-white/[0.04] via-transparent to-transparent",
    iconGradient: "from-zinc-700 to-zinc-900",
    caseStudy: {
      challenge:
        "Substituir menus físicos e pedidos manuais em papel por uma experiência ultra-rápida de leitura via QR Code sem necessidade de instalação de apps pelos clientes, sincronizando instantaneamente os pedidos com a equipa de bar e cozinha (KDS) sob condições reais de elevado volume e concorrência de pedidos.",
      architecture: {
        stack: ["React", "React Native", "Supabase (PostgreSQL)", "WebSockets / Realtime"],
        decisions:
          "Arquitetura reativa baseada no PostgreSQL Change Data Capture (CDC) do Supabase. O menu móvel para clientes opera como PWA instantânea com cache local, enquanto o display de cozinha (KDS) mantém canais bi-direcionais resilientes com tolerância a perdas de ligação pontuais.",
        integrations: ["Supabase Realtime Engine", "Kitchen Display System (KDS)", "Sessões efémeras de mesa via QR Code"],
      },
      results: [
        {
          metric: "< 60ms",
          description: "Latência de sincronização ponta-a-ponta entre seleção do cliente e receção na cozinha.",
        },
        {
          metric: "-35%",
          description: "Redução no tempo de espera do cliente até à confeção e entrega dos pedidos.",
        },
        {
          metric: "Zero",
          description: "Erros operacionais de extravio de pedidos ou duplicidade de comandas.",
        },
      ],
    },
  },
  {
    // TODO(MIDI8): Fornecer informações reais do 3º projeto (nome, tipo de serviço, descrição, stack, imagem e resultados reais)
    id: "projeto-em-producao-3",
    name: "Projeto Corporativo",
    type: "Automação & Plataforma Cloud",
    description:
      "Solução corporativa personalizada em ambiente produtivo, concebida para automação de fluxos operacionais e integração resiliente de sistemas.",
    tags: ["TypeScript", "Node.js", "PostgreSQL", "Cloud"],
    status: "Em Produção",
    gradient: "from-white/[0.04] via-transparent to-transparent",
    iconGradient: "from-zinc-700 to-zinc-900",
    // Case study em preparação para dados reais
    caseStudy: undefined,
  },
];

export const TOTAL_PROJECTS = projects.length;
