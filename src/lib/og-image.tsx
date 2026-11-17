import { ImageResponse } from "next/og";
import { WORDMARK_EIGHT_PATH, WORDMARK_GLYPHS, WORDMARK_VIEWBOX } from "@/components/Wordmark";

export const OG_ALT = "Midi8 — Tecnologia, Software, Automação & Comunicação Digital";
export const OG_SIZE = { width: 1200, height: 630 } as const;

export function renderBrandOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          backgroundColor: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 18% 0%, rgba(168, 24, 255, 0.28) 0%, transparent 48%), radial-gradient(circle at 50% 0%, rgba(20, 94, 255, 0.28) 0%, transparent 52%), radial-gradient(circle at 82% 0%, rgba(0, 232, 150, 0.28) 0%, transparent 48%)",
          color: "#0b0f17",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#525866",
              fontWeight: 600,
            }}
          >
            Tecnologia · Software · Comunicação
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "#525866",
            }}
          >
            midi8.com
          </div>
        </div>

        {/* Center Wordmark + Tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
          }}
        >
          <svg
            viewBox={WORDMARK_VIEWBOX}
            width="440"
            height="144"
            fill="#0b0f17"
          >
            <defs>
              <linearGradient id="og-eight-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#145eff" />
                <stop offset="0.52" stopColor="#06b893" />
                <stop offset="1" stopColor="#00e896" />
              </linearGradient>
            </defs>
            {WORDMARK_GLYPHS.map((g) => (
              <path key={g.id} d={g.d} fill="#0b0f17" />
            ))}
            <path d={WORDMARK_EIGHT_PATH} fill="url(#og-eight-grad)" />
          </svg>

          <div
            style={{
              fontSize: "34px",
              lineHeight: 1.25,
              fontWeight: 700,
              color: "#1e293b",
              maxWidth: "880px",
            }}
          >
            Web, Software, Automação, IA, Marketing Digital e Consultoria num único parceiro.
          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "2px",
              backgroundImage: "linear-gradient(90deg, #a818ff 0%, #145eff 50%, #00e896 100%)",
              opacity: 0.7,
            }}
          />
          <div
            style={{
              display: "flex",
              gap: "24px",
              fontSize: "18px",
              color: "#525866",
            }}
          >
            <span>Web &amp; Mobile</span>
            <span>·</span>
            <span>Software &amp; IA</span>
            <span>·</span>
            <span>Automação &amp; Dados</span>
            <span>·</span>
            <span>Estratégia &amp; Marketing</span>
            <span>·</span>
            <span>E-commerce</span>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
