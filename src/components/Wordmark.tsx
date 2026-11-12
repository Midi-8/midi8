import { useId } from "react";

// Logótipo MIDI8 (igual ao cartão de visita): M, I, D, I sólidos; o 8 sobrepõe-se à metade
// direita do segundo I, com o gradiente do CTA (--cta-gradient).
export const WORDMARK_VIEWBOX = "0 -1 765 250";

export const WORDMARK_GLYPHS = [
  { id: "m", d: "M0 0H105.2L128.6 70L151.8 0H257V248H181V91L165.8 135H94.2L80 92.5V248H0Z" },
  { id: "i", d: "M277 0H351V248H277Z" },
  { id: "d", d: "M376 0H433A124 124 0 0 1 433 248H376Z" },
  { id: "i2", d: "M582 0H692V248H582Z" },
] as const;

// "8": dois círculos r72 (centros 692,72 e 692,176); o eixo do 8 assenta na margem direita
// do segundo I, por isso o canto superior direito do I coincide com o topo do 8.
export const WORDMARK_EIGHT_PATH =
  "M642.2 124A72 72 0 1 1 741.8 124A72 72 0 1 1 642.2 124Z";


// Gradiente do 8 = --cta-gradient (135deg), partilhado com a intro.
export function EightGlassDefs({ id }: { id: string; opacity?: number }) {
  return (
    <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#145eff" />
      <stop offset="0.52" stopColor="#06b893" />
      <stop offset="1" stopColor="#00e896" />
    </linearGradient>
  );
}

export function EightGlass({
  id,
  className,
  style,
  mono,
}: {
  id: string;
  className?: string;
  style?: React.CSSProperties;
  mono?: boolean;
}) {
  return (
    <g className={className} style={style}>
      {mono ? (
        <path d={WORDMARK_EIGHT_PATH} />
      ) : (
        <path d={WORDMARK_EIGHT_PATH} fill={`url(#${id}-g)`} />
      )}
    </g>
  );
}

export default function Wordmark({
  className,
  title = "Midi8",
  variant = "default",
}: {
  className?: string;
  title?: string;
  variant?: "default" | "mono";
}) {
  const uid = useId();

  return (
    <svg viewBox={WORDMARK_VIEWBOX} fill="currentColor" role="img" aria-label={title} className={className}>
      <title>{title}</title>
      <defs>
        {variant === "default" && <EightGlassDefs id={uid} />}
      </defs>
      {WORDMARK_GLYPHS.map((g) => (
        <path key={g.id} d={g.d} />
      ))}
      <EightGlass id={uid} mono={variant === "mono"} />
    </svg>
  );
}
