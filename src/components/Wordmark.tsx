// Logótipo Midi8 vetorizado a partir do original (IoU 0.987). O 8 cortado à direita é intencional.
export const WORDMARK_VIEWBOX = "0 0 663 248";

export const WORDMARK_GLYPHS = [
  { id: "m", d: "M0 0H105.2L128.6 70L151.8 0H257V248H181V91L165.8 135H94.2L80 92.5V248H0Z" },
  { id: "i", d: "M277 0H351V248H277Z" },
  { id: "d", d: "M376 0H433A124 124 0 0 1 433 248H376Z" },
  { id: "eight", d: "M582 0H662.8A80.4 80.4 0 0 0 645 125.45A80.4 80.4 0 0 0 658.2 248H582Z" },
] as const;

export default function Wordmark({ className, title = "Midi8" }: { className?: string; title?: string }) {
  return (
    <svg viewBox={WORDMARK_VIEWBOX} fill="currentColor" role="img" aria-label={title} className={className}>
      <title>{title}</title>
      {WORDMARK_GLYPHS.map((g) => (
        <path key={g.id} d={g.d} />
      ))}
    </svg>
  );
}
