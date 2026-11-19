import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Midi8 — Tecnologia, IA & Marketing Digital",
    short_name: "Midi8",
    description:
      "Web Design, Desenvolvimento de Software e Mobile, Automação de Processos, IA & LLMs, Análise de Dados, E-commerce e Estratégia Digital.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf9",
    theme_color: "#fafaf9",
    lang: "pt-PT",
    icons: [
      {
        src: "/m8-icon.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/m8-apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/m8-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
