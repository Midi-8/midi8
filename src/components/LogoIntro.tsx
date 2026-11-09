"use client";

import { useEffect, useState } from "react";
import { WORDMARK_GLYPHS, WORDMARK_VIEWBOX } from "@/components/Wordmark";

const SEEN_KEY = "midi8-intro-seen";

// Corre no <head> antes do primeiro paint: salta a intro se já foi vista nesta sessão
// ou se o utilizador pede menos movimento.
export const INTRO_BOOT_SCRIPT = `try{if(sessionStorage.getItem("${SEEN_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="skip"}catch(e){}`;

// Caixa de recorte de cada glifo (x inicial e largura no viewBox 663×248).
const CLIP: Record<string, [number, number]> = { m: [0, 257], i: [277, 74], d: [376, 181], eight: [582, 81] };

export default function LogoIntro() {
  const [done, setDone] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
    // Já vista ou movimento reduzido: o CSS esconde a overlay, nada a fazer.
    if (document.documentElement.dataset.intro === "skip") return;
    const onInput = () => setSkip(true);
    const events = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, onInput, { once: true, passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, onInput));
  }, []);

  if (done) return null;

  return (
    <div
      className="logo-intro"
      data-skip={skip || undefined}
      aria-hidden="true"
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget) setDone(true);
      }}
    >
      <div className="logo-intro__stage">
        <svg viewBox={WORDMARK_VIEWBOX} className="logo-intro__mark" fill="currentColor">
          <defs>
            {WORDMARK_GLYPHS.map((g) => (
              <clipPath key={g.id} id={`intro-clip-${g.id}`}>
                <rect x={CLIP[g.id][0]} y={0} width={CLIP[g.id][1]} height={248} />
              </clipPath>
            ))}
          </defs>
          {WORDMARK_GLYPHS.map((g, i) => (
            <g key={g.id} clipPath={`url(#intro-clip-${g.id})`}>
              <path
                d={g.d}
                className={g.id === "eight" ? "logo-intro__slide" : "logo-intro__rise"}
                style={{ animationDelay: `${g.id === "eight" ? 0.5 : 0.12 + i * 0.07}s` }}
              />
            </g>
          ))}
        </svg>
        <span className="logo-intro__line" />
      </div>
    </div>
  );
}
