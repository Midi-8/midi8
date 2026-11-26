import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "midi8 - Tecnologia, IA & Marketing Digital",
    short_name: "midi8",
    description:
      "Web Design, Desenvolvimento de Software e Mobile, Automação de Processos, IA & LLMs, Análise de Dados, E-commerce e Estratégia Digital.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf9",
    theme_color: "#fafaf9",
    lang: "pt-PT",
    icons: [
      {
        src: "/favicon-8-64.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/favicon-8-180.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/favicon-8-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon-8-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
