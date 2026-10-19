"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, MotionValue } from "framer-motion";

// ─── Framer Motion prop types ─────────────────────────────────────────────────
interface HeroProps {
  scrollYProgress?: MotionValue<number>;
  isMobile?: boolean;
}

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
    241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,
    176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,
    128,195,78,66,215,61,156,180,
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

// ─── Hero Component ───────────────────────────────────────────────────────────
export default function Hero({ scrollYProgress, isMobile = false }: HeroProps) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse position as fraction [0..1]
  const mouseX = useRef(0.5);
  const mouseY = useRef(0.5);
  const targetMouseX = useRef(0.5);
  const targetMouseY = useRef(0.5);

  // Ripples: each has (x, y) in canvas pixels, birth time, and lifetime
  type Ripple = { x: number; y: number; born: number; life: number; strength: number };
  const ripplesRef = useRef<Ripple[]>([]);


  // ── Dark Liquid Metal WebGL-equivalent on Canvas 2D with Perlin Noise ──
  // Mobile: no rAF — CSS `.hero-liquid-css` instead (battery). Desktop: unchanged.
  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let running = true;
    let startTime = performance.now();

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const w = section.offsetWidth;
      const h = section.offsetHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    const ro = new ResizeObserver(() => resize());
    ro.observe(section);

    const SMOOTH = 0.045;

    const render = () => {
      if (!running) return;
      raf = requestAnimationFrame(render);

      const W = canvas.width  / dpr;
      const H = canvas.height / dpr;
      if (W < 1 || H < 1) return;
      const t = (performance.now() - startTime) * 0.0004;

      mouseX.current += (targetMouseX.current - mouseX.current) * SMOOTH;
      mouseY.current += (targetMouseY.current - mouseY.current) * SMOOTH;

      const STEP = 4;
      const cols = Math.ceil(W / STEP) + 1;
      const rows = Math.ceil(H / STEP) + 1;

      const cx = mouseX.current * W;
      const cy = mouseY.current * H;
      const LIGHT_RADIUS = Math.min(W, H) * 0.38;

      const now = performance.now();
      ripplesRef.current = ripplesRef.current.filter(
        (r) => now - r.born < r.life
      );

      ctx.clearRect(0, 0, W, H);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const px = col * STEP;
          const py = row * STEP;

          const nx = (px / W)  * 3.2 + t * 0.6;
          const ny = (py / H)  * 3.2 + t * 0.45;

          let noise = fbm(nx, ny);

          for (const r of ripplesRef.current) {
            const age   = (now - r.born) / r.life;
            const dx    = px - r.x;
            const dy    = py - r.y;
            const dist  = Math.sqrt(dx * dx + dy * dy);
            const wave  = Math.sin(dist * 0.045 - age * 14) * Math.exp(-dist * 0.008);
            const decay = 1 - age;
            noise += wave * decay * r.strength * 0.65;
          }

          const crestNorm = (noise + 1) * 0.5;

          const dx   = px - cx;
          const dy   = py - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const lightFalloff = Math.max(0, 1 - dist / LIGHT_RADIUS);
          const copperStrength = Math.pow(lightFalloff, 1.8) * crestNorm;

          const baseR = Math.round(10  + crestNorm * 29);
          const baseG = Math.round(10  + crestNorm * 29);
          const baseB = Math.round(12  + crestNorm * 30);

          const copR = Math.round(baseR + (234 - baseR) * copperStrength);
          const copG = Math.round(baseG + (88  - baseG) * copperStrength);
          const copB = Math.round(baseB + (12  - baseB) * copperStrength);

          ctx.fillStyle = `rgb(${copR},${copG},${copB})`;
          ctx.fillRect(px, py, STEP + 1, STEP + 1);
        }
      }

      const corona = ctx.createRadialGradient(cx, cy, 0, cx, cy, LIGHT_RADIUS * 0.95);
      corona.addColorStop(0,   "rgba(234,88,12,0.18)");
      corona.addColorStop(0.3, "rgba(234,88,12,0.07)");
      corona.addColorStop(1,   "rgba(234,88,12,0)");
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = corona;
      ctx.beginPath();
      ctx.arc(cx, cy, LIGHT_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    };

    render();

    const observer = new IntersectionObserver(
      (entries) => {
        running = entries[0].isIntersecting;
        if (running) {
          render();
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(section);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [isMobile]);

  // ── Mouse / Touch event handlers ──
  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    targetMouseX.current = (e.clientX - rect.left) / rect.width;
    targetMouseY.current = (e.clientY - rect.top)  / rect.height;
  }

  function handleMouseLeave() {
    // Slowly drift back to center
    targetMouseX.current = 0.5;
    targetMouseY.current = 0.5;
  }

  function handleMouseDown(e: React.MouseEvent<HTMLElement>) {
    if (isMobile) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ripplesRef.current.push({
      x: (e.clientX - rect.left) * (canvas.width / dpr / rect.width),
      y: (e.clientY - rect.top)  * (canvas.height / dpr / rect.height),
      born:     performance.now(),
      life:     2600,
      strength: 0.9,
    });
  }

  // Occasionally spawn ambient passive ripples for life-like feel
  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const spawn = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ripplesRef.current.push({
        x: Math.random() * (canvas.width / dpr),
        y: Math.random() * (canvas.height / dpr),
        born:     performance.now(),
        life:     3500 + Math.random() * 2000,
        strength: 0.2 + Math.random() * 0.25,
      });
    };
    const id = setInterval(spawn, 1800);
    return () => clearInterval(id);
  }, [isMobile]);


  // ── Spatial scroll 3D zoom transforms ──
  const defaultProgress = useMotionValue(0);
  const activeProgress  = scrollYProgress ?? defaultProgress;
  const heroScale   = useTransform(activeProgress, [0, 0.45], [1, 2.8]);
  const heroOpacity = useTransform(activeProgress, [0, 0.35], [1, 0]);
  const heroBlur    = useTransform(activeProgress, [0, 0.35], ["blur(0px)", "blur(12px)"]);
  const heroPointerEvents = useTransform(activeProgress, (v) =>
    v > 0.25 ? "none" : "auto"
  );

  return (
    <motion.section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      style={
        isMobile || !scrollYProgress
          ? { background: "#09090b" }
          : {
              scale:  heroScale,
              opacity: heroOpacity,
              filter:  heroBlur,
              pointerEvents: heroPointerEvents,
              background: "#09090b",
            }
      }
    >
      {/* ─── Dark Liquid Metal: canvas (desktop) / CSS (mobile) ─── */}
      {isMobile ? (
        <div className="hero-liquid-css absolute inset-0" aria-hidden="true" />
      ) : (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ imageRendering: "pixelated" }}
          aria-hidden="true"
        />
      )}

      {/* ─── Soft top + bottom vignettes ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-zinc-950 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent" />
        <div className="absolute top-0 left-0 w-48 h-full bg-gradient-to-r from-zinc-950 to-transparent" />
        <div className="absolute top-0 right-0 w-48 h-full bg-gradient-to-l from-zinc-950 to-transparent" />
      </div>

      {/* ─── Floating Content (above the metal surface) ─── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-28 text-center">
        {/* Inner glass panel so text reads cleanly over the fluid */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 rounded-full bg-zinc-900/70 backdrop-blur-md border border-white/[0.07] text-xs text-zinc-300 font-mono tracking-wider">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-80"
                style={{ background: "#EA580C" }}
              />
              <span
                className="relative inline-flex rounded-full h-1.5 w-1.5"
                style={{ background: "#EA580C" }}
              />
            </span>
            A aceitar novos projetos
          </div>

          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.07] mb-6">
            <span
              className="block text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.9)]"
              style={{ textShadow: "0 0 60px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.95)" }}
            >
              Tecnologia Avançada.
            </span>
            <span className="block mt-1">
              <span
                className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent"
                style={{ filter: "drop-shadow(0 2px 24px rgba(0,0,0,0.9))" }}
              >
                Resultados Medíveis.
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="max-w-xl mx-auto text-base sm:text-lg text-zinc-300 leading-relaxed mb-10"
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.9)" }}
          >
            Soluções corporativas de desenvolvimento web, automação e suporte à
            decisão, desenhadas com precisão para otimizar o seu modelo de negócio.
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contacto"
              className="cta-button cursor-pointer w-full sm:w-auto"
            >
              <span className="relative z-10">Agendar Reunião</span>
              <svg
                className="relative z-10 w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#solucoes"
              className="cta-button cta-secondary w-full sm:w-auto"
            >
              <span>Ver Soluções</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Performance stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-20 pt-8 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
          >
            {[
              { value: "3+",   label: "Projetos em Produção" },
              { value: "100%", label: "Taxa de Entrega" },
              { value: "24h",  label: "Tempo de Resposta" },
              { value: "∞",    label: "Compromisso" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-2xl sm:text-3xl font-bold text-white font-mono"
                  style={{ textShadow: "0 0 20px rgba(0,0,0,0.9)" }}
                >
                  {stat.value}
                </div>
                <div className="text-[11px] text-zinc-500 mt-1 tracking-widest uppercase font-mono">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Scroll hint (desktop only) */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.25, 0.75, 0.25] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="mt-10 inline-flex items-center gap-2 text-[11px] font-mono tracking-widest text-zinc-600 uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
              Scroll para explorar
              <svg
                className="w-3 h-3 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
