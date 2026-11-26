import { ImageResponse } from "next/og";
import { MIDI8_LOGO_DATA_URI } from "@/lib/midi8-logo-data-uri";
import { siteDomain } from "@/lib/site";

export const OG_ALT = "midi8 - Tecnologia, Software, Automação & Comunicação Digital";
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
          backgroundColor: "#fafaf9",
          backgroundImage:
            "radial-gradient(circle at 18% -8%, rgba(192, 21, 255, 0.32) 0%, transparent 46%), radial-gradient(circle at 50% -12%, rgba(0, 105, 248, 0.28) 0%, transparent 50%), radial-gradient(circle at 82% -8%, rgba(0, 232, 178, 0.30) 0%, transparent 46%)",
          color: "#0b0f17",
          fontFamily: "system-ui, -apple-system, sans-serif",
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
              fontSize: "16px",
              letterSpacing: "0.14em",
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
              fontWeight: 500,
            }}
          >
            {siteDomain}
          </div>
        </div>

        {/* Center: Brand name + Tagline + Brief description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={MIDI8_LOGO_DATA_URI}
            alt="midi8"
            width={420}
            height={159}
            style={{ width: "420px", height: "159px", objectFit: "contain" }}
          />

          <div
            style={{
              display: "flex",
              fontSize: "46px",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "#1e293b",
              lineHeight: 1.05,
              marginTop: "8px",
            }}
          >
            <span>move&nbsp;</span>
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>forward</span>
            <span>, fast</span>
          </div>

          <div
            style={{
              fontSize: "24px",
              lineHeight: 1.4,
              color: "#525866",
              maxWidth: "880px",
              marginTop: "16px",
            }}
          >
            Web Design, Software à Medida, Automação de Processos, IA e Estratégia Digital num único parceiro.
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
              backgroundImage: "linear-gradient(90deg, #c015ff 0%, #0069f8 50%, #00e8b2 100%)",
              opacity: 0.75,
            }}
          />
          <div
            style={{
              display: "flex",
              gap: "28px",
              fontSize: "17px",
              color: "#525866",
              fontWeight: 500,
            }}
          >
            <span>Web &amp; Plataformas</span>
            <span>·</span>
            <span>Software &amp; Mobile</span>
            <span>·</span>
            <span>Automação &amp; IA</span>
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
