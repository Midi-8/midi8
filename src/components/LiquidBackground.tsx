"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

// ─── Perlin Noise Implementation ─────────────────────────────────────────────
// Classic Ken Perlin permutation table (256 values, doubled to 512)
const P: number[] = (() => {
  const perm = [
    151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,
    142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,
    203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,
    74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,
    220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,
    132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,
    186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,
    59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,
    70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,
    178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,
    241,81,51,50,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,
    204,176,115,121,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,
    141,128,195,78,66,215,61,156,180,
  ];
  const doubled: number[] = new Array(512);
  for (let i = 0; i < 512; i++) doubled[i] = perm[i & 255];
  return doubled;
})();

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(t: number, a: number, b: number): number {
  return a + t * (b - a);
}

function grad(hash: number, x: number, y: number): number {
  const h = hash & 3;
  const u = h < 2 ? x : y;
  const v = h < 2 ? y : x;
  return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
}

function perlin2(x: number, y: number): number {
  const xi = Math.floor(x) & 255;
  const yi = Math.floor(y) & 255;
  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);
  const u = fade(xf);
  const v = fade(yf);
  const a  = P[xi]     + yi;
  const aa = P[a];
  const ab = P[a + 1];
  const b  = P[xi + 1] + yi;
  const ba = P[b];
  const bb = P[b + 1];
  return lerp(v,
    lerp(u, grad(P[aa], xf,     yf    ), grad(P[ba], xf - 1, yf    )),
    lerp(u, grad(P[ab], xf,     yf - 1), grad(P[bb], xf - 1, yf - 1))
  );
}

// Fractal Brownian Motion (fBm) – layered Perlin octaves for richer surface
function fbm(x: number, y: number, octaves = 5): number {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  let max = 0;
  for (let i = 0; i < octaves; i++) {
    value += perlin2(x * frequency, y * frequency) * amplitude;
    max += amplitude;
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value / max; // normalise to [-1, 1]
}

const emptySubscribe = () => () => {};
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeReduce = (cb: () => void) => {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

// Fundo global: fluido Dark Aurora (Mint #00E896 + Cobalt #145EFF + Violet #A818FF) com luz interativa.
// Fixo atrás de todo o site. Desktop: canvas a 60 fps (desce para 30 se pesar), células de 6 px suavizadas.
// Mobile/toque: o mesmo canvas, mais leve (células de 10 px, 24 fps, dpr 1); a luz segue o dedo.
// SSR e mobile com movimento reduzido: versão CSS (.liquid-css).
const STEP = 6;
const MOBILE_STEP = 10;
const MOBILE_FPS = 24;
const LIGHT_SCALE = 0.26;   // raio da luz em fração do lado menor do ecrã
const FOLLOW = 0.28;        // fração da distância ao cursor percorrida por frame a 60 fps
const SLOW_DRAW_MS = 9;     // acima disto (média), desenha a 30 fps
const LIGHT_STRENGTH = 0.85;// intensidade da luz aurora no cursor
const AMBIENT_STRENGTH = 0.22; // presença subtil da aurora nas cristas do fluido em repouso
const TRAIL_DECAY = 0.95;   // fração da luz que sobra por frame a 60 fps (rasto de ~1 s)

type Ripple = { x: number; y: number; born: number; life: number; strength: number };

function parseRgbVar(styles: CSSStyleDeclaration, name: string, fallback: [number, number, number]): [number, number, number] {
  const raw = styles.getPropertyValue(name).trim().split(/\s+/).map(Number);
  return raw.length === 3 && raw.every(Number.isFinite) ? [raw[0], raw[1], raw[2]] : fallback;
}

export default function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const prefersReduced = useSyncExternalStore(subscribeReduce, () => window.matchMedia(REDUCE_QUERY).matches, () => false);
  const useCss = !isMounted || (isMobile && prefersReduced);

  useEffect(() => {
    if (useCss) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const buf = document.createElement("canvas");
    const bctx = buf.getContext("2d");
    if (!canvas || !ctx || !bctx) return;

    // Cores da identidade vêm dos tokens CSS em :root.
    const styles = getComputedStyle(document.documentElement);
    const [MR, MG, MB] = parseRgbVar(styles, "--accent-rgb", [0, 232, 150]);       // Mint
    const [BR, BG, BB] = parseRgbVar(styles, "--brand-blue-rgb", [20, 94, 255]);   // Cobalt Blue
    const [VR, VG, VB] = parseRgbVar(styles, "--brand-violet-rgb", [168, 24, 255]);// Vivid Violet

    const reduceMotion = window.matchMedia(REDUCE_QUERY).matches;
    const step = isMobile ? MOBILE_STEP : STEP;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Cursor em fração do ecrã [0..1], com suavização.
    let mx = 0.5, my = 0.5, tx = 0.5, ty = 0.5;
    let ripples: Ripple[] = [];
    const onMove = (e: PointerEvent) => {
      tx = e.clientX / W;
      ty = e.clientY / H;
    };
    const onLeave = () => {
      tx = 0.5;
      ty = 0.5;
    };
    // Toque: o scroll do browser cancela os pointer events, por isso o dedo também chega por touchmove.
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      tx = touch.clientX / W;
      ty = touch.clientY / H;
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && !isMobile) return;
      ripples.push({ x: e.clientX, y: e.clientY, born: performance.now(), life: 2600, strength: 0.9 });
    };
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    if (isMobile) {
      window.addEventListener("touchstart", onTouch, { passive: true });
      window.addEventListener("touchmove", onTouch, { passive: true });
    }
    document.documentElement.addEventListener("mouseleave", onLeave);

    // Ondulações ambientes ocasionais.
    const spawn = window.setInterval(() => {
      ripples.push({
        x: Math.random() * W,
        y: Math.random() * H,
        born: performance.now(),
        life: 3500 + Math.random() * 2000,
        strength: 0.2 + Math.random() * 0.25,
      });
    }, 1800);

    let img: ImageData | null = null;
    let lightBuf = new Float32Array(0); // luz por célula, decai para deixar rasto
    let raf = 0;
    let last = -Infinity;
    let prev = performance.now();
    let drawCost = 0;
    const start = performance.now();

    const draw = (now: number) => {
      const t = (now - start) * 0.0004;
      // Seguimento independente do frame rate.
      const frames = (now - prev) / 16.7;
      const k = 1 - Math.pow(1 - FOLLOW, frames);
      const decay = Math.pow(TRAIL_DECAY, frames);
      prev = now;
      mx += (tx - mx) * k;
      my += (ty - my) * k;

      const cols = Math.ceil(W / step) + 1;
      const rows = Math.ceil(H / step) + 1;
      const cx = mx * W;
      const cy = my * H;
      const LIGHT_RADIUS = Math.min(W, H) * LIGHT_SCALE;
      ripples = ripples.filter((r) => now - r.born < r.life);

      if (!img || buf.width !== cols || buf.height !== rows) {
        buf.width = cols;
        buf.height = rows;
        img = bctx.createImageData(cols, rows);
        lightBuf = new Float32Array(cols * rows);
      }
      const data = img.data;

      for (let row = 0; row < rows; row++) {
        const v = (row * step) / H;
        for (let col = 0; col < cols; col++) {
          const px = col * step;
          const py = row * step;
          const u = px / W;
          let noise = fbm(u * 3.2 + t * 0.6, v * 3.2 + t * 0.45);

          for (const r of ripples) {
            const age = (now - r.born) / r.life;
            const dx = px - r.x;
            const dy = py - r.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            noise += Math.sin(dist * 0.045 - age * 14) * Math.exp(-dist * 0.008) * (1 - age) * r.strength * 0.65;
          }

          const crest = (noise + 1) * 0.5;
          const ldx = px - cx;
          const ldy = py - cy;
          const cell = row * cols + col;
          const light = Math.max(lightBuf[cell] * decay, 1 - Math.sqrt(ldx * ldx + ldy * ldy) / LIGHT_RADIUS);
          lightBuf[cell] = light;

          // Fase cromática espacial + ruído (Violeta no topo-esquerdo → Azul Cobalto → Mint à direita e no núcleo do cursor).
          const spatialPhase = Math.max(0, Math.min(1, u * 0.62 + (1 - v) * 0.14 + noise * 0.28 + light * 0.25));
          let ar: number, ag: number, ab: number;
          if (spatialPhase < 0.45) {
            const s = spatialPhase / 0.45;
            ar = VR + (BR - VR) * s;
            ag = VG + (BG - VG) * s;
            ab = VB + (BB - VB) * s;
          } else {
            const s = (spatialPhase - 0.45) / 0.55;
            ar = BR + (MR - BR) * s;
            ag = BG + (MG - BG) * s;
            ab = BB + (MB - BB) * s;
          }

          const cursorGlow = Math.pow(light, 1.75) * crest * LIGHT_STRENGTH;
          const ambientGlow = crest * crest * AMBIENT_STRENGTH;
          const mix = Math.min(1, cursorGlow + ambientGlow);

          // Base meia-noite obsidiana com reflexos frios nas cristas.
          const baseR = 7 + crest * 18;
          const baseG = 10 + crest * 24;
          const baseB = 18 + crest * 34;

          const i = cell * 4;
          data[i]     = baseR + (ar - baseR) * mix;
          data[i + 1] = baseG + (ag - baseG) * mix;
          data[i + 2] = baseB + (ab - baseB) * mix;
          data[i + 3] = 255;
        }
      }

      bctx.putImageData(img, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(buf, 0, 0, cols * step, rows * step);

      const corona = ctx.createRadialGradient(cx, cy, 0, cx, cy, LIGHT_RADIUS * 1.05);
      corona.addColorStop(0, `rgba(${MR},${MG},${MB},0.13)`);
      corona.addColorStop(0.38, `rgba(${BR},${BG},${BB},0.065)`);
      corona.addColorStop(0.75, `rgba(${VR},${VG},${VB},0.025)`);
      corona.addColorStop(1, `rgba(${BR},${BG},${BB},0)`);
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = corona;
      ctx.fillRect(cx - LIGHT_RADIUS * 1.05, cy - LIGHT_RADIUS * 1.05, LIGHT_RADIUS * 2.1, LIGHT_RADIUS * 2.1);
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (isMobile ? now - last < 1000 / MOBILE_FPS - 1 : drawCost > SLOW_DRAW_MS && now - last < 1000 / 30 - 1) return;
      last = now;
      const t0 = performance.now();
      draw(now);
      drawCost = drawCost * 0.9 + (performance.now() - t0) * 0.1;
    };

    if (reduceMotion) draw(performance.now());
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(spawn);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [useCss, isMobile]);

  // Versão CSS: o scroll faz o fundo oscilar (--sx, --sv, --sr).
  const cssRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = cssRef.current;
    if (!el || !useCss) return;
    let raf = 0;
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        // Limitado por seno: o fundo oscila com o scroll e nunca sai do ecrã.
        const y = window.scrollY;
        el.style.setProperty("--sx", (Math.sin(y / 380) * 9).toFixed(2));
        el.style.setProperty("--sv", (Math.cos(y / 520) * 7).toFixed(2));
        el.style.setProperty("--sr", (Math.sin(y / 700) * 6).toFixed(2));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [useCss]);

  return useCss ? (
    <div ref={cssRef} className="liquid-css" aria-hidden="true" />
  ) : (
    <canvas ref={canvasRef} className="liquid-bg" aria-hidden="true" />
  );
}
