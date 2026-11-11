import { useId } from "react";

// Logótipo Midi8 vetorizado com o "8" completo em vidro translúcido ciano-azul.
export const WORDMARK_VIEWBOX = "0 0 724 248";

export const WORDMARK_GLYPHS = [
  { id: "m", d: "M0 0H105.2L128.6 70L151.8 0H257V248H181V91L165.8 135H94.2L80 92.5V248H0Z" },
  { id: "i", d: "M277 0H351V248H277Z" },
  { id: "d", d: "M376 0H433A124 124 0 0 1 433 248H376Z" },
  { id: "eight-stem", d: "M582 0H662.8A80.4 80.4 0 0 0 645 125.45A80.4 80.4 0 0 0 658.2 248H582Z" },
] as const;

// Silhueta completa do "8" encaixada geometricamente no recorte da haste direita.
export const WORDMARK_EIGHT_FULL_PATH =
  "M662.8 0A80.4 80.4 0 0 0 645 125.45A80.4 80.4 0 0 0 658.2 248A80.4 80.4 0 0 0 676 125.45A80.4 80.4 0 0 0 662.8 0Z";

export default function Wordmark({ className, title = "Midi8" }: { className?: string; title?: string }) {
  const uid = useId();
  const gradId = `midi8-eight-grad-${uid}`;
  const rimGradId = `midi8-eight-rim-${uid}`;

  return (
    <svg viewBox={WORDMARK_VIEWBOX} fill="currentColor" role="img" aria-label={title} className={className}>
      <title>{title}</title>
      <defs>
        <linearGradient id={gradId} x1="660" y1="0" x2="660" y2="248" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#63ECD8" stopOpacity="0.88" />
          <stop offset="52%" stopColor="#5CC8EA" stopOpacity="0.84" />
          <stop offset="100%" stopColor="#65A2F8" stopOpacity="0.88" />
        </linearGradient>
        <linearGradient id={rimGradId} x1="600" y1="0" x2="720" y2="248" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="50%" stopColor="#63ECD8" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#65A2F8" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      {WORDMARK_GLYPHS.map((g) => (
        <path key={g.id} d={g.d} />
      ))}
      <path
        d={WORDMARK_EIGHT_FULL_PATH}
        fill={`url(#${gradId})`}
        stroke={`url(#${rimGradId})`}
        strokeWidth="1.5"
      />
    </svg>
  );
}
