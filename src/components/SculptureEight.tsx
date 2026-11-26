"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Particle {
  // Posição base 3D normalizada [-1..1]
  bx: number;
  by: number;
  bz: number;
  // Normal 3D real da superfície escultórica (iluminação de estúdio e Fresnel)
  nx: number;
  ny: number;
  nz: number;
  // Posição dispersa para entrada em morfogénese e recristalização
  sx0: number;
  sy0: number;
  sz0: number;
  // Deslocamento dinâmico por física de mola (cursor + ondas de choque + explosão)
  ox: number;
  oy: number;
  oz: number;
  vx: number;
  vy: number;
  vz: number;
  // Cor oficial exata amostrada de /midi8-8.webp (0..1)
  r: number;
  g: number;
  b: number;
  size: number;
  phase: number;
  loopPhase: number;
  depthFactor: number;
  layer: 0 | 1 | 2; // 0 = casca principal, 1 = contorno biselado 360°, 2 = núcleo vítreo interno
}

interface AmbientSpark {
  angle: number;
  speed: number;
  radiusX: number;
  radiusZ: number;
  yOffset: number;
  phase: number;
  size: number;
  r: number;
  g: number;
  b: number;
}

interface Shockwave {
  active: boolean;
  startTime: number;
  originX: number;
  originY: number;
}

// Paleta oficial exata extraída de public/midi8-8.webp (0..1)
const OFFICIAL_SPARK_COLORS: readonly [number, number, number][] = [
  [192 / 255, 21 / 255, 1.0], // Violeta-Magenta #C015FF
  [0.0, 105 / 255, 248 / 255], // Azul Elétrico #0069F8
  [0.0, 232 / 255, 178 / 255], // Aqua-Menta #00E8B2
];

const POINT_VERT = `
attribute vec2 aPos;
attribute vec3 aColor;
attribute vec4 aMeta; // x=sizePx, y=alpha, z=spec, w=focus

varying vec3 vColor;
varying vec3 vMeta; // x=alpha, y=spec, z=focus

void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
  gl_PointSize = aMeta.x;
  vColor = aColor;
  vMeta = aMeta.yzw;
}
`;

const POINT_FRAG = `
precision mediump float;

varying vec3 vColor;
varying vec3 vMeta;

void main() {
  vec2 uv = gl_PointCoord * 2.0 - 1.0;
  float r2 = dot(uv, uv);
  if (r2 > 1.0) discard;

  float r = sqrt(r2);
  // Profundidade de campo ótica: frente ultra-nítida, traseira suavemente desfocada
  float edgeSoft = mix(0.46, 0.18, vMeta.z);
  float disc = 1.0 - smoothstep(1.0 - edgeSoft, 1.0, r);

  // Sombreamento 3D de micro-esfera cristalina com luz de estúdio superior esquerda
  float nz = sqrt(max(0.0, 1.0 - r2));
  vec3 sphereN = normalize(vec3(uv.x, -uv.y, nz));
  vec3 keyLight = normalize(vec3(-0.42, 0.56, 0.71));
  vec3 fillLight = normalize(vec3(0.55, -0.35, 0.75));
  vec3 halfVec = normalize(keyLight + vec3(0.0, 0.0, 1.0));

  float diff = max(0.0, dot(sphereN, keyLight));
  float fill = max(0.0, dot(sphereN, fillLight)) * 0.25;
  float microSpec = pow(max(0.0, dot(sphereN, halfVec)), 15.0);
  float rimSheen = pow(1.0 - nz, 2.3);

  // Iridescência Fresnel subtil dentro da paleta oficial (#C015FF -> #0069F8 -> #00E8B2)
  vec3 iridTint = mix(
    vec3(0.753, 0.082, 1.0),
    vec3(0.0, 0.910, 0.698),
    clamp(0.5 + 0.5 * (uv.x * 0.8 - uv.y * 0.6), 0.0, 1.0)
  );
  vec3 baseCol = mix(vColor, iridTint, rimSheen * (0.14 + vMeta.y * 0.22));
  vec3 col = baseCol * (0.86 + 0.18 * diff + fill);

  // Brilho especular cristalino perolado
  float glint = vMeta.y * 0.46 + microSpec * (0.36 + vMeta.y * 0.52) + rimSheen * vMeta.y * 0.24;
  col = mix(col, vec3(1.0), clamp(glint, 0.0, 0.88));

  float alpha = disc * vMeta.x;
  gl_FragColor = vec4(col * alpha, alpha);
}
`;

const LINE_VERT = `
attribute vec2 aPos;
attribute vec4 aColor;

varying vec4 vColor;

void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
  vColor = aColor;
}
`;

const LINE_FRAG = `
precision mediump float;

varying vec4 vColor;

void main() {
  gl_FragColor = vec4(vColor.rgb * vColor.a, vColor.a);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertSrc: string,
  fragSrc: string
): WebGLProgram | null {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vertSrc);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc);
  if (!vs || !fs) {
    if (vs) gl.deleteShader(vs);
    if (fs) gl.deleteShader(fs);
    return null;
  }
  const prog = gl.createProgram();
  if (!prog) {
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    return null;
  }
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

function createAmbientSparks(count: number): AmbientSpark[] {
  const sparks: AmbientSpark[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const color = OFFICIAL_SPARK_COLORS[i % OFFICIAL_SPARK_COLORS.length];
    sparks.push({
      angle: t * Math.PI * 2,
      speed: (i % 2 === 0 ? 1 : -1) * (0.15 + (i % 5) * 0.042),
      radiusX: 0.7 + ((i * 37) % 100) * 0.005,
      radiusZ: 0.44 + ((i * 29) % 100) * 0.0042,
      yOffset: (((i * 19) % 100) / 100 - 0.5) * 1.48,
      phase: i * 1.23,
      size: 2.6 + (i % 3) * 0.85,
      r: color[0],
      g: color[1],
      b: color[2],
    });
  }
  return sparks;
}

function hash01(a: number, b: number, seed: number): number {
  const v = Math.sin(a * 12.9898 + b * 78.233 + seed * 37.719) * 43758.5453;
  return v - Math.floor(v);
}

/**
 * Avalia um ponto 3D sobre uma corrente orbital em forma de 8 elegante
 * que abraça suavemente a escultura em gravidade zero.
 */
function sampleRibbonPoint(u: number, phaseOffset: number, radiusScale: number) {
  const a = u + phaseOffset;
  const x = Math.sin(a) * 0.62 * radiusScale;
  const y = Math.sin(a) * Math.cos(a) * 0.22 - Math.cos(a * 0.5) * 0.86 * radiusScale;
  const z = Math.cos(a) * 0.36 * radiusScale + Math.sin(a * 2) * 0.08;
  return { x, y: Math.max(-0.98, Math.min(0.98, y)), z };
}

/**
 * Amostra a silhueta e gradiente oficiais exatos de /midi8-8.webp com
 * campo de distância suave (Chamfer 2-pass) para construir um volume 3D
 * escultórico completo (face frontal, face traseira, parede lateral biselada
 * de perfil 360° e núcleo vítreo interno).
 */
function buildSculptureParticles(img: HTMLImageElement): Particle[] {
  const sampleW = 156;
  const sampleH = Math.round((img.height / img.width) * sampleW);
  const off = document.createElement("canvas");
  off.width = sampleW;
  off.height = sampleH;
  const octx = off.getContext("2d");
  if (!octx) return [];

  octx.drawImage(img, 0, 0, sampleW, sampleH);
  const imgData = octx.getImageData(0, 0, sampleW, sampleH).data;
  const totalPixels = sampleW * sampleH;

  // 1. Campo de distância 2-pass (Chamfer) para volume 3D suave e normais reais
  const dist = new Float32Array(totalPixels);
  const INF = 1e6;
  for (let i = 0; i < totalPixels; i++) {
    dist[i] = imgData[i * 4 + 3] >= 145 ? INF : 0;
  }

  for (let y = 0; y < sampleH; y++) {
    const row = y * sampleW;
    for (let x = 0; x < sampleW; x++) {
      const i = row + x;
      let d = dist[i];
      if (d === 0) continue;
      if (x > 0) d = Math.min(d, dist[i - 1] + 1);
      if (y > 0) {
        const up = i - sampleW;
        d = Math.min(d, dist[up] + 1);
        if (x > 0) d = Math.min(d, dist[up - 1] + 1.414);
        if (x < sampleW - 1) d = Math.min(d, dist[up + 1] + 1.414);
      }
      dist[i] = d;
    }
  }

  let maxDist = 1;
  for (let y = sampleH - 1; y >= 0; y--) {
    const row = y * sampleW;
    for (let x = sampleW - 1; x >= 0; x--) {
      const i = row + x;
      let d = dist[i];
      if (d === 0) continue;
      if (x < sampleW - 1) d = Math.min(d, dist[i + 1] + 1);
      if (y < sampleH - 1) {
        const dn = i + sampleW;
        d = Math.min(d, dist[dn] + 1);
        if (x > 0) d = Math.min(d, dist[dn - 1] + 1.414);
        if (x < sampleW - 1) d = Math.min(d, dist[dn + 1] + 1.414);
      }
      dist[i] = d;
      if (d > maxDist) maxDist = d;
    }
  }

  const distAt = (x: number, y: number) => {
    if (x < 0 || x >= sampleW || y < 0 || y >= sampleH) return 0;
    return dist[y * sampleW + x];
  };

  const built: Particle[] = [];
  const halfW = sampleW * 0.5;
  const halfH = sampleH * 0.5;
  const normScale = Math.max(sampleW, sampleH) * 0.5;
  const step = 2;

  const pushParticle = (
    x: number,
    y: number,
    sideSign: number,
    dNorm: number,
    r: number,
    g: number,
    b: number,
    layer: 0 | 1 | 2,
    seed: number
  ) => {
    const h1 = hash01(x, y, seed);
    const h2 = hash01(x, y, seed + 13);
    const h3 = hash01(x, y, seed + 29);

    const jitterScale = layer === 1 ? 0.0045 : 0.0105;
    const bx = (x - halfW) / normScale + (h1 - 0.5) * jitterScale;
    const by = (y - halfH) / normScale + (h2 - 0.5) * jitterScale;

    // Secção transversal tubular suave (perfil elíptico) + torção arquitetónica entre os anéis
    const profile = Math.sqrt(Math.max(0.015, 1 - (1 - dNorm) * (1 - dNorm)));
    const twistZ = bx * by * 0.26;
    let bevelZ = 0;
    if (layer === 1) {
      // Parede lateral biselada contínua (assegura perfil sólido em rotação 360°)
      bevelZ = sideSign * (0.012 + profile * 0.105);
    } else if (layer === 2) {
      // Núcleo vítreo interior (dá profundidade translúcida real)
      bevelZ = (h3 - 0.5) * profile * 0.18;
    } else {
      bevelZ = sideSign * (0.025 + profile * 0.21);
    }
    const bz = twistZ + bevelZ;

    // Gradiente do campo de distância -> normal 3D real da superfície
    const gx = distAt(x + 1, y) - distAt(x - 1, y);
    const gy = distAt(x, y + 1) - distAt(x, y - 1);
    const rawNx = -gx * 0.52;
    const rawNy = -gy * 0.52;
    const rawNz = layer === 1 && sideSign === 0 ? 0.05 : sideSign * (0.28 + dNorm * 2.15);
    const nLen = Math.hypot(rawNx, rawNy, rawNz) || 1;

    // Fase paramétrica contínua ao longo dos dois anéis do "8"
    const isTopLoop = by < -0.02;
    const loopCenterY = isTopLoop ? -0.45 : 0.42;
    const rawAngle = Math.atan2(by - loopCenterY, bx);
    const loopPhase = isTopLoop ? rawAngle : Math.PI * 2 - rawAngle;

    // Posição dispersa em espiral 3D para morfogénese inicial e duplo clique
    const scatterAngle = h1 * Math.PI * 2;
    const scatterRad = 0.55 + h3 * 0.95;
    const sx0 = bx * 1.48 + Math.cos(scatterAngle) * scatterRad * 0.48;
    const sy0 = by * 1.38 + Math.sin(scatterAngle) * scatterRad * 0.48;
    const sz0 = bz + (h2 - 0.5) * 1.2;

    const size =
      layer === 1
        ? 2.55 + dNorm * 1.05
        : layer === 2
          ? 3.8 + dNorm * 1.8
          : 3.25 + dNorm * 2.35;

    built.push({
      bx,
      by,
      bz,
      nx: rawNx / nLen,
      ny: rawNy / nLen,
      nz: rawNz / nLen,
      sx0,
      sy0,
      sz0,
      ox: 0,
      oy: 0,
      oz: 0,
      vx: 0,
      vy: 0,
      vz: 0,
      r: r / 255,
      g: g / 255,
      b: b / 255,
      size,
      phase: h1 * Math.PI * 2,
      loopPhase,
      depthFactor: dNorm,
      layer,
    });
  };

  for (let y = 0; y < sampleH; y += step) {
    for (let x = 0; x < sampleW; x += step) {
      const i = y * sampleW + x;
      const d = dist[i];
      if (d <= 0) continue;

      const idx = i * 4;
      const r = imgData[idx];
      const g = imgData[idx + 1];
      const b = imgData[idx + 2];
      const dNorm = Math.min(1, d / maxDist);

      if (dNorm < 0.25) {
        // Contorno biselado 3D contínuo (frente + costura central lateral + trás)
        pushParticle(x, y, 0.45, dNorm, r, g, b, 1, 1);
        if ((x + y) % 4 === 0) {
          pushParticle(x, y, 0, dNorm, r, g, b, 1, 5);
          pushParticle(x, y, -0.45, dNorm, r, g, b, 1, 7);
        }
      } else {
        // Dupla casca escultórica (frente + trás) + núcleo translúcido interior
        pushParticle(x, y, 1, dNorm, r, g, b, 0, 3);
        if (dNorm > 0.34) {
          pushParticle(x, y, -1, dNorm, r, g, b, 0, 11);
        }
        if (dNorm > 0.56 && (x + y) % 6 === 0) {
          pushParticle(x, y, 0, dNorm, r, g, b, 2, 17);
        }
      }
    }
  }

  return built;
}

/**
 * SculptureEight - Escultura 3D volumétrica em WebGL construída diretamente
 * a partir da silhueta e gradiente oficiais exatos do "8" da midi8.
 *
 * - ~5.200 micro-esferas cristalinas com sombreamento 3D, iridescência Fresnel e profundidade de campo
 * - Volume completo em 360° (face frontal, traseira, costura lateral biselada e núcleo vítreo)
 * - Duas correntes orbitais luminosas em 3D + 32 micro-partículas em gravidade zero
 * - Entrada em morfogénese, rotação 360° com inércia, campo magnético com filamentos de seda,
 *   até 4 ondas de choque simultâneas ao clicar e recristalização ao fazer duplo clique
 */
export default function SculptureEight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      powerPreference: "high-performance",
    });

    if (!gl) {
      queueMicrotask(() => setWebglUnavailable(true));
      return;
    }

    const pointProg = createProgram(gl, POINT_VERT, POINT_FRAG);
    const lineProg = createProgram(gl, LINE_VERT, LINE_FRAG);
    if (!pointProg || !lineProg) {
      if (pointProg) gl.deleteProgram(pointProg);
      if (lineProg) gl.deleteProgram(lineProg);
      queueMicrotask(() => setWebglUnavailable(true));
      return;
    }

    const pointLoc = {
      aPos: gl.getAttribLocation(pointProg, "aPos"),
      aColor: gl.getAttribLocation(pointProg, "aColor"),
      aMeta: gl.getAttribLocation(pointProg, "aMeta"),
    };
    const lineLoc = {
      aPos: gl.getAttribLocation(lineProg, "aPos"),
      aColor: gl.getAttribLocation(lineProg, "aColor"),
    };

    const pointVbo = gl.createBuffer();
    const lineVbo = gl.createBuffer();
    if (!pointVbo || !lineVbo) {
      if (pointVbo) gl.deleteBuffer(pointVbo);
      if (lineVbo) gl.deleteBuffer(lineVbo);
      gl.deleteProgram(pointProg);
      gl.deleteProgram(lineProg);
      queueMicrotask(() => setWebglUnavailable(true));
      return;
    }

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId = 0;
    let isVisible = true;
    let disposed = false;
    let width = 1;
    let height = 1;
    let dpr = 1;
    let particles: Particle[] = [];
    let morphStart = 0;
    const sparks = createAmbientSparks(32);

    // Buffers reutilizáveis sem alocações por frame
    const MAX_POINTS = 8500;
    const MAX_LINE_SEGS = 760;
    const BUCKETS = 256;

    const pxArr = new Float32Array(MAX_POINTS);
    const pyArr = new Float32Array(MAX_POINTS);
    const pzArr = new Float32Array(MAX_POINTS);
    const prArr = new Float32Array(MAX_POINTS);
    const pgArr = new Float32Array(MAX_POINTS);
    const pbArr = new Float32Array(MAX_POINTS);
    const pSizeArr = new Float32Array(MAX_POINTS);
    const pAlphaArr = new Float32Array(MAX_POINTS);
    const pSpecArr = new Float32Array(MAX_POINTS);
    const pFocusArr = new Float32Array(MAX_POINTS);
    const pBucketArr = new Uint8Array(MAX_POINTS);

    const bucketCounts = new Int32Array(BUCKETS);
    const bucketOffsets = new Int32Array(BUCKETS);
    const sortedOrder = new Int32Array(MAX_POINTS);
    const pointBufferData = new Float32Array(MAX_POINTS * 9);
    const lineBufferData = new Float32Array(MAX_LINE_SEGS * 2 * 6);

    const MAX_ACTIVE = 136;
    const activeIdx = new Int32Array(MAX_ACTIVE);
    const activeEnergy = new Float32Array(MAX_ACTIVE);

    // Até 4 ondas de choque 3D sobrepostas em simultâneo
    const shockwaves: Shockwave[] = Array.from({ length: 4 }, () => ({
      active: false,
      startTime: 0,
      originX: 0,
      originY: 0,
    }));
    let nextWaveSlot = 0;

    // Estado de cursor, arrasto 360° com inércia e duplo clique
    const pointer = {
      x: 0,
      y: 0,
      nx: 0,
      ny: 0,
      snx: 0,
      sny: 0,
      prevX: 0,
      prevY: 0,
      speed: 0,
      active: false,
      dragging: false,
      dragPointerId: -1,
      movedDist: 0,
      lastTapTime: 0,
    };

    const orbit = {
      yaw: 0,
      pitch: 0,
      vyaw: 0,
      vpitch: 0,
      lastDragEnd: 0,
    };

    const triggerCrystallizeBurst = () => {
      if (prefersReduced || particles.length === 0) return;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const angle = p.phase;
        const speed = 0.045 + (p.depthFactor * 0.035 + (i % 7) * 0.005);
        p.vx += (p.bx * 0.065 + Math.cos(angle) * speed) * 0.9;
        p.vy += (p.by * 0.065 + Math.sin(angle) * speed) * 0.9;
        p.vz += (p.bz * 0.08 + Math.sin(angle * 2) * 0.05) * 1.1;
      }
      orbit.vyaw += 0.065;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const pw = Math.round(width * dpr);
      const ph = Math.round(height * dpr);
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
      }
      gl.viewport(0, 0, pw, ph);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.04 }
    );
    io.observe(canvas);

    const onPointerDown = (e: PointerEvent) => {
      if (prefersReduced) return;
      const rect = canvas.getBoundingClientRect();
      const lx = e.clientX - rect.left;
      const ly = e.clientY - rect.top;
      pointer.prevX = lx;
      pointer.prevY = ly;
      pointer.movedDist = 0;

      if (e.pointerType !== "touch") {
        pointer.dragging = true;
        pointer.dragPointerId = e.pointerId;
        try {
          canvas.setPointerCapture(e.pointerId);
        } catch {
          // Ignorar caso não seja suportado
        }
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const lx = e.clientX - rect.left;
      const ly = e.clientY - rect.top;
      const dx = pointer.active || pointer.dragging ? lx - pointer.prevX : 0;
      const dy = pointer.active || pointer.dragging ? ly - pointer.prevY : 0;
      pointer.prevX = lx;
      pointer.prevY = ly;
      pointer.x = lx;
      pointer.y = ly;
      pointer.speed = Math.min(34, Math.hypot(dx, dy));
      pointer.nx = Math.max(-1, Math.min(1, (lx / rect.width) * 2 - 1));
      pointer.ny = Math.max(-1, Math.min(1, (ly / rect.height) * 2 - 1));
      pointer.active = true;

      if (pointer.dragging && e.pointerId === pointer.dragPointerId) {
        pointer.movedDist += Math.hypot(dx, dy);
        const sens = 0.0115;
        orbit.yaw += dx * sens;
        orbit.pitch = Math.max(-1.08, Math.min(1.08, orbit.pitch + dy * sens));
        orbit.vyaw = dx * sens * 0.65;
        orbit.vpitch = dy * sens * 0.65;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const lx = e.clientX - rect.left;
      const ly = e.clientY - rect.top;

      if (pointer.dragging && e.pointerId === pointer.dragPointerId) {
        pointer.dragging = false;
        pointer.dragPointerId = -1;
        orbit.lastDragEnd = performance.now();
        try {
          canvas.releasePointerCapture(e.pointerId);
        } catch {
          // Ignorar
        }
      }

      if (!prefersReduced && pointer.movedDist < 8) {
        const now = performance.now();
        const isDoubleTap = now - pointer.lastTapTime < 340;
        pointer.lastTapTime = now;

        const slot = shockwaves[nextWaveSlot];
        slot.active = true;
        slot.startTime = now;
        slot.originX = lx;
        slot.originY = ly;
        nextWaveSlot = (nextWaveSlot + 1) % shockwaves.length;

        if (isDoubleTap) {
          triggerCrystallizeBurst();
        }
      }
    };

    const onPointerLeave = () => {
      if (!pointer.dragging) {
        pointer.active = false;
        pointer.nx = 0;
        pointer.ny = 0;
        pointer.speed = 0;
      }
    };

    const onContextLost = (e: Event) => {
      e.preventDefault();
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("webglcontextlost", onContextLost);

    const renderFrame = (now: number) => {
      const t = prefersReduced ? 0 : now * 0.001;

      pointer.snx += (pointer.nx - pointer.snx) * 0.085;
      pointer.sny += (pointer.ny - pointer.sny) * 0.085;
      pointer.speed *= 0.88;

      // Inércia sedosa + regresso natural à pose principal após arrasto 360°
      if (!pointer.dragging) {
        orbit.yaw += orbit.vyaw;
        orbit.pitch = Math.max(-1.08, Math.min(1.08, orbit.pitch + orbit.vpitch));
        orbit.vyaw *= 0.94;
        orbit.vpitch *= 0.94;

        const idleSinceDrag = (now - orbit.lastDragEnd) * 0.001;
        if (idleSinceDrag > 1.25) {
          const twoPi = Math.PI * 2;
          const nearestTurn = Math.round(orbit.yaw / twoPi) * twoPi;
          orbit.yaw += (nearestTurn - orbit.yaw) * 0.025;
          orbit.pitch *= 0.965;
        }
      }

      gl.clear(gl.COLOR_BUFFER_BIT);
      if (particles.length === 0) return;

      const morphRaw = prefersReduced ? 1 : Math.min(1, Math.max(0, (now - morphStart) / 1350));
      const morphEase = morphRaw >= 1 ? 1 : 1 - Math.pow(2, -10 * morphRaw);
      const morphInv = 1 - morphEase;

      const floatY = prefersReduced ? 0 : Math.sin(t * 1.15) * 6.0;
      const scalePx = Math.min(width * 0.56, height * 0.435);
      const cx = width * 0.5;
      const cy = height * 0.48 + floatY;

      if (shadowRef.current) {
        const sScale = 1 - floatY * 0.014;
        const sShift = (pointer.snx * 10 + Math.sin(orbit.yaw) * 6).toFixed(1);
        shadowRef.current.style.transform = `translate3d(${sShift}px, 0, 0) scaleX(${sScale.toFixed(3)})`;
      }

      const rotY =
        (prefersReduced ? -0.22 : Math.sin(t * 0.48) * 0.32) +
        pointer.snx * 0.36 +
        orbit.yaw +
        morphInv * 0.85;
      const rotX =
        (prefersReduced ? 0.08 : Math.cos(t * 0.4) * 0.1) -
        pointer.sny * 0.24 -
        orbit.pitch;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Luz de estúdio superior esquerda (acompanha suavemente o cursor)
      const lX = -0.38 + pointer.snx * 0.24;
      const lY = -0.52 + pointer.sny * 0.22;
      const lZ = 0.76;
      const lLen = Math.hypot(lX, lY, lZ) || 1;
      const lxN = lX / lLen;
      const lyN = lY / lLen;
      const lzN = lZ / lLen;

      const fov = 3.3;

      // Atualizar ondas de choque ativas
      let hasActiveWave = false;
      for (let w = 0; w < shockwaves.length; w++) {
        const sw = shockwaves[w];
        if (!sw.active) continue;
        if ((now - sw.startTime) * 0.001 > 1.55) {
          sw.active = false;
        } else {
          hasActiveWave = true;
        }
      }

      const gleamCycle = ((t * 0.34) % 2.6) - 1.3;
      const loopWavePhase = t * 1.65;
      const influence = Math.min(width, height) * 0.28;
      const speedBoost = 1 + pointer.speed * 0.036;
      const sizeScale = (width < 320 ? 0.78 : 0.96) * dpr;

      let count = 0;
      let activeCount = 0;

      // 1. Projetar todas as partículas do "8" com física de mola + iluminação 3D + Fresnel
      const pLen = particles.length;
      for (let i = 0; i < pLen && count < MAX_POINTS; i++) {
        const p = particles[i];

        const wave = prefersReduced
          ? 0
          : Math.sin(t * 1.5 + p.by * 3.6 + p.phase * 0.4) * 0.009;

        const baseX = p.bx + (p.sx0 - p.bx) * morphInv;
        const baseY = p.by + (p.sy0 - p.by) * morphInv;
        const baseZ = p.bz + (p.sz0 - p.bz) * morphInv;

        const px = baseX + p.ox;
        const py = baseY + p.oy + wave;
        const pz = baseZ + p.oz;

        // Rotação 3D da posição
        const x1 = px * cosY - pz * sinY;
        const z1 = px * sinY + pz * cosY;
        const y2 = py * cosX - z1 * sinX;
        const z2 = py * sinX + z1 * cosX;

        // Rotação 3D da normal da superfície
        const nx1 = p.nx * cosY - p.nz * sinY;
        const nz1 = p.nx * sinY + p.nz * cosY;
        const ny2 = p.ny * cosX - nz1 * sinX;
        const nz2 = p.ny * sinX + nz1 * cosX;

        const persp = fov / (fov + z2 + 0.72);
        const sx = cx + x1 * scalePx * persp;
        const sy = cy + y2 * scalePx * persp;

        // Campo magnético sedoso + foco de brilho ao passar o cursor
        let cursorSpot = 0;
        if (!prefersReduced && pointer.active && !pointer.dragging && morphEase > 0.75) {
          const dx = sx - pointer.x;
          const dy = sy - pointer.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < influence * influence && distSq > 0.25) {
            const dist = Math.sqrt(distSq);
            const falloff = 1 - dist / influence;
            cursorSpot = falloff * falloff;
            const force = cursorSpot * 0.042 * speedBoost;
            const dirX = dx / dist;
            const dirY = dy / dist;
            p.vx += (dirX * 0.76 - dirY * 0.38) * force;
            p.vy += (dirY * 0.76 + dirX * 0.38) * force;
            p.vz += force * 0.62;
          }
        }

        // Ondas de choque cromáticas 3D simultâneas ao clicar/tocar
        let pulseBoost = 0;
        if (hasActiveWave) {
          for (let w = 0; w < shockwaves.length; w++) {
            const sw = shockwaves[w];
            if (!sw.active) continue;
            const elapsed = (now - sw.startTime) * 0.001;
            const ringR = elapsed * scalePx * 2.6;
            const dx = sx - sw.originX;
            const dy = sy - sw.originY;
            const pd = Math.hypot(dx, dy);
            const ringDiff = Math.abs(pd - ringR);
            if (ringDiff < 46) {
              const strength = (1 - ringDiff / 46) * Math.max(0, 1 - elapsed / 1.55);
              if (strength > pulseBoost) pulseBoost = strength;
              if (pd > 0.5) {
                p.vx += (dx / pd) * strength * 0.028;
                p.vy += (dy / pd) * strength * 0.028;
                p.vz += strength * 0.036;
              }
            }
          }
        }

        // Mola elástica de precisão que reconstrói perfeitamente a silhueta oficial
        p.vx += -p.ox * 0.068;
        p.vy += -p.oy * 0.068;
        p.vz += -p.oz * 0.068;
        p.vx *= 0.845;
        p.vy *= 0.845;
        p.vz *= 0.845;
        p.ox += p.vx;
        p.oy += p.vy;
        p.oz += p.vz;

        const disp = Math.hypot(p.ox, p.oy, p.oz);
        const energy = Math.min(1, disp * 7.0 + pulseBoost * 0.95);

        // Iluminação 3D escultórica + Fresnel + corrente nos 2 anéis + varrimento + foco do cursor
        const ndl = Math.max(0, nx1 * lxN + ny2 * lyN + nz2 * lzN);
        const fresnel = Math.pow(1 - Math.abs(Math.max(-1, Math.min(1, nz2))), 2.1);

        const loopPulseRaw = prefersReduced ? 0 : Math.cos(p.loopPhase - loopWavePhase);
        const loopCurrent =
          loopPulseRaw > 0.45 ? Math.pow((loopPulseRaw - 0.45) / 0.55, 2) * 0.46 : 0;

        const diagCoord = p.bx * 0.62 + p.by * 0.78;
        const gleamDist = Math.abs(diagCoord - gleamCycle);
        const gleam = prefersReduced ? 0 : Math.max(0, 1 - gleamDist / 0.27);
        const gleamBoost = gleam * gleam * 0.56;

        const depthNorm = Math.max(0, Math.min(1, (0.54 - z2) / 1.08));
        const spec = Math.min(
          1,
          ndl * 0.42 +
            fresnel * 0.3 +
            loopCurrent +
            gleamBoost +
            cursorSpot * 0.45 +
            pulseBoost * 0.72 +
            energy * 0.22
        );

        const pointSize =
          p.size *
          persp *
          sizeScale *
          (1 +
            pulseBoost * 0.38 +
            loopCurrent * 0.16 +
            gleamBoost * 0.14 +
            cursorSpot * 0.18 +
            energy * 0.12);

        const baseAlpha = p.layer === 1 ? 0.58 : p.layer === 2 ? 0.22 : 0.34;
        const alpha =
          Math.min(
            1,
            baseAlpha +
              depthNorm * (p.layer === 2 ? 0.35 : 0.6) +
              loopCurrent * 0.16 +
              pulseBoost * 0.22 +
              gleamBoost * 0.14 +
              cursorSpot * 0.14
          ) *
          (0.35 + morphEase * 0.65);

        pxArr[count] = sx;
        pyArr[count] = sy;
        pzArr[count] = z2;
        prArr[count] = p.r;
        pgArr[count] = p.g;
        pbArr[count] = p.b;
        pSizeArr[count] = Math.min(26 * dpr, Math.max(2.0 * dpr, pointSize));
        pAlphaArr[count] = alpha;
        pSpecArr[count] = spec;
        pFocusArr[count] = p.layer === 2 ? depthNorm * 0.45 : depthNorm;

        const bNorm = Math.max(0, Math.min(1, (1.2 - z2) / 2.4));
        pBucketArr[count] = (bNorm * 255) | 0;

        if (energy > 0.13 && activeCount < MAX_ACTIVE) {
          activeIdx[activeCount] = count;
          activeEnergy[activeCount] = energy;
          activeCount += 1;
        }

        count += 1;
      }

      // 2. Projetar micro-partículas orbitais + 2 pérolas luminosas das correntes 3D
      const invW = 2 / width;
      const invH = 2 / height;
      let segs = 0;

      if (!prefersReduced) {
        for (let i = 0; i < sparks.length && count < MAX_POINTS; i++) {
          const sp = sparks[i];
          const a = sp.angle + t * sp.speed;
          const sx3 = Math.cos(a) * sp.radiusX;
          const sz3 = Math.sin(a) * sp.radiusZ;
          const sy3 = sp.yOffset * 0.65 + Math.sin(t * 0.92 + sp.phase) * 0.12;

          const x1 = sx3 * cosY - sz3 * sinY;
          const z1 = sx3 * sinY + sz3 * cosY;
          const y2 = sy3 * cosX - z1 * sinX;
          const z2 = sy3 * sinX + z1 * cosX;

          const persp = fov / (fov + z2 + 0.72);
          const sx = cx + x1 * scalePx * persp;
          const sy = cy + y2 * scalePx * persp;
          const twinkle = 0.52 + 0.48 * Math.sin(t * 2.1 + sp.phase);
          const depthNorm = Math.max(0, Math.min(1, (0.65 - z2) / 1.3));

          pxArr[count] = sx;
          pyArr[count] = sy;
          pzArr[count] = z2;
          prArr[count] = sp.r;
          pgArr[count] = sp.g;
          pbArr[count] = sp.b;
          pSizeArr[count] = Math.min(
            18 * dpr,
            Math.max(2.2 * dpr, sp.size * persp * sizeScale * (0.85 + twinkle * 0.35))
          );
          pAlphaArr[count] = (0.16 + depthNorm * 0.4) * twinkle * morphEase;
          pSpecArr[count] = 0.68;
          pFocusArr[count] = depthNorm * 0.7;

          const bNorm = Math.max(0, Math.min(1, (1.2 - z2) / 2.4));
          pBucketArr[count] = (bNorm * 255) | 0;
          count += 1;
        }

        // Duas correntes orbitais finíssimas que abraçam a escultura em 3D
        const ribbonSteps = 26;
        for (let rIdx = 0; rIdx < 2; rIdx++) {
          const headT = t * (rIdx === 0 ? 0.78 : -0.66) + rIdx * Math.PI;
          const radScale = rIdx === 0 ? 1.04 : 0.96;
          const colA = OFFICIAL_SPARK_COLORS[rIdx === 0 ? 0 : 1];
          const colB = OFFICIAL_SPARK_COLORS[rIdx === 0 ? 2 : 0];
          let prevSx = 0;
          let prevSy = 0;

          for (let s = 0; s <= ribbonSteps; s++) {
            const frac = s / ribbonSteps; // 0 = cauda, 1 = cabeça luminosa
            const u = headT - (1 - frac) * 1.45;
            const pt = sampleRibbonPoint(u, rIdx * 1.57, radScale);

            const x1 = pt.x * cosY - pt.z * sinY;
            const z1 = pt.x * sinY + pt.z * cosY;
            const y2 = pt.y * cosX - z1 * sinX;
            const z2 = pt.y * sinX + z1 * cosX;
            const persp = fov / (fov + z2 + 0.72);
            const sx = cx + x1 * scalePx * persp;
            const sy = cy + y2 * scalePx * persp;

            if (s > 0 && segs < MAX_LINE_SEGS) {
              const rCol = colA[0] + (colB[0] - colA[0]) * frac;
              const gCol = colA[1] + (colB[1] - colA[1]) * frac;
              const bCol = colA[2] + (colB[2] - colA[2]) * frac;
              const segAlpha = Math.pow(frac, 1.8) * 0.24 * morphEase;

              const base = segs * 12;
              lineBufferData[base] = prevSx * invW - 1;
              lineBufferData[base + 1] = 1 - prevSy * invH;
              lineBufferData[base + 2] = rCol;
              lineBufferData[base + 3] = gCol;
              lineBufferData[base + 4] = bCol;
              lineBufferData[base + 5] = segAlpha * 0.75;

              lineBufferData[base + 6] = sx * invW - 1;
              lineBufferData[base + 7] = 1 - sy * invH;
              lineBufferData[base + 8] = rCol;
              lineBufferData[base + 9] = gCol;
              lineBufferData[base + 10] = bCol;
              lineBufferData[base + 11] = segAlpha;
              segs += 1;
            }

            // Pérola luminosa na cabeça de cada corrente orbital
            if (s === ribbonSteps && count < MAX_POINTS) {
              pxArr[count] = sx;
              pyArr[count] = sy;
              pzArr[count] = z2;
              prArr[count] = colB[0];
              pgArr[count] = colB[1];
              pbArr[count] = colB[2];
              pSizeArr[count] = Math.min(18 * dpr, Math.max(3.2 * dpr, 5.4 * persp * sizeScale));
              pAlphaArr[count] = 0.78 * morphEase;
              pSpecArr[count] = 0.92;
              pFocusArr[count] = 0.95;

              const bNorm = Math.max(0, Math.min(1, (1.2 - z2) / 2.4));
              pBucketArr[count] = (bNorm * 255) | 0;
              count += 1;
            }

            prevSx = sx;
            prevSy = sy;
          }
        }
      }

      // 3. Anéis cromáticos luminosos em WebGL para cada onda de choque ativa ao clicar
      if (hasActiveWave) {
        const ringVerts = 40;
        for (let w = 0; w < shockwaves.length; w++) {
          const sw = shockwaves[w];
          if (!sw.active) continue;
          const elapsed = (now - sw.startTime) * 0.001;
          if (elapsed > 1.05) continue;
          const ringR = elapsed * scalePx * 2.6;
          const ringAlpha = Math.max(0, (1 - elapsed / 1.05) * 0.28);

          for (let k = 0; k < ringVerts && segs < MAX_LINE_SEGS; k++) {
            const a0 = (k / ringVerts) * Math.PI * 2;
            const a1 = ((k + 1) / ringVerts) * Math.PI * 2;
            const cMix = 0.5 + 0.5 * Math.cos(a0);
            const rCol = 0.753 * cMix;
            const gCol = 0.082 * cMix + 0.91 * (1 - cMix);
            const bCol = 1.0 * cMix + 0.698 * (1 - cMix);

            const x0 = sw.originX + Math.cos(a0) * ringR;
            const y0 = sw.originY + Math.sin(a0) * ringR;
            const x1 = sw.originX + Math.cos(a1) * ringR;
            const y1 = sw.originY + Math.sin(a1) * ringR;

            const base = segs * 12;
            lineBufferData[base] = x0 * invW - 1;
            lineBufferData[base + 1] = 1 - y0 * invH;
            lineBufferData[base + 2] = rCol;
            lineBufferData[base + 3] = gCol;
            lineBufferData[base + 4] = bCol;
            lineBufferData[base + 5] = ringAlpha;

            lineBufferData[base + 6] = x1 * invW - 1;
            lineBufferData[base + 7] = 1 - y1 * invH;
            lineBufferData[base + 8] = rCol;
            lineBufferData[base + 9] = gCol;
            lineBufferData[base + 10] = bCol;
            lineBufferData[base + 11] = ringAlpha;
            segs += 1;
          }
        }
      }

      // 4. Filamentos translúcidos de seda entre partículas energetizadas
      if (activeCount > 1) {
        const maxDist = width < 320 ? 24 : 30;
        const maxDistSq = maxDist * maxDist;

        for (let i = 0; i < activeCount && segs < MAX_LINE_SEGS; i++) {
          const ia = activeIdx[i];
          const ea = activeEnergy[i];
          const ax = pxArr[ia];
          const ay = pyArr[ia];
          let links = 0;

          for (let j = i + 1; j < activeCount && links < 3 && segs < MAX_LINE_SEGS; j++) {
            const ib = activeIdx[j];
            const dx = ax - pxArr[ib];
            const dy = ay - pyArr[ib];
            const dSq = dx * dx + dy * dy;
            if (dSq < maxDistSq && dSq > 12) {
              const distRatio = 1 - Math.sqrt(dSq) / maxDist;
              const lineAlpha = Math.min(0.42, distRatio * Math.min(ea, activeEnergy[j]) * 0.56);
              if (lineAlpha > 0.03) {
                const base = segs * 12;
                lineBufferData[base] = ax * invW - 1;
                lineBufferData[base + 1] = 1 - ay * invH;
                lineBufferData[base + 2] = prArr[ia];
                lineBufferData[base + 3] = pgArr[ia];
                lineBufferData[base + 4] = pbArr[ia];
                lineBufferData[base + 5] = lineAlpha;

                lineBufferData[base + 6] = pxArr[ib] * invW - 1;
                lineBufferData[base + 7] = 1 - pyArr[ib] * invH;
                lineBufferData[base + 8] = prArr[ib];
                lineBufferData[base + 9] = pgArr[ib];
                lineBufferData[base + 10] = pbArr[ib];
                lineBufferData[base + 11] = lineAlpha;

                segs += 1;
                links += 1;
              }
            }
          }
        }
      }

      if (segs > 0) {
        if (pointLoc.aMeta >= 0) gl.disableVertexAttribArray(pointLoc.aMeta);
        gl.useProgram(lineProg);
        gl.bindBuffer(gl.ARRAY_BUFFER, lineVbo);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          lineBufferData.subarray(0, segs * 12),
          gl.DYNAMIC_DRAW
        );
        const stride = 6 * 4;
        gl.enableVertexAttribArray(lineLoc.aPos);
        gl.vertexAttribPointer(lineLoc.aPos, 2, gl.FLOAT, false, stride, 0);
        gl.enableVertexAttribArray(lineLoc.aColor);
        gl.vertexAttribPointer(lineLoc.aColor, 4, gl.FLOAT, false, stride, 2 * 4);
        gl.drawArrays(gl.LINES, 0, segs * 2);
      }

      // 5. Ordenação O(N) por profundidade (256 buckets, zero GC)
      bucketCounts.fill(0);
      for (let i = 0; i < count; i++) {
        bucketCounts[pBucketArr[i]] += 1;
      }
      let offset = 0;
      for (let b = 0; b < BUCKETS; b++) {
        bucketOffsets[b] = offset;
        offset += bucketCounts[b];
      }
      for (let i = 0; i < count; i++) {
        const b = pBucketArr[i];
        sortedOrder[bucketOffsets[b]] = i;
        bucketOffsets[b] += 1;
      }

      // 6. Empacotar vértices em clip-space e renderizar micro-esferas 3D na GPU
      for (let k = 0; k < count; k++) {
        const i = sortedOrder[k];
        const base = k * 9;
        pointBufferData[base] = pxArr[i] * invW - 1;
        pointBufferData[base + 1] = 1 - pyArr[i] * invH;
        pointBufferData[base + 2] = prArr[i];
        pointBufferData[base + 3] = pgArr[i];
        pointBufferData[base + 4] = pbArr[i];
        pointBufferData[base + 5] = pSizeArr[i];
        pointBufferData[base + 6] = pAlphaArr[i];
        pointBufferData[base + 7] = pSpecArr[i];
        pointBufferData[base + 8] = pFocusArr[i];
      }

      gl.useProgram(pointProg);
      gl.bindBuffer(gl.ARRAY_BUFFER, pointVbo);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        pointBufferData.subarray(0, count * 9),
        gl.DYNAMIC_DRAW
      );
      const pStride = 9 * 4;
      gl.enableVertexAttribArray(pointLoc.aPos);
      gl.vertexAttribPointer(pointLoc.aPos, 2, gl.FLOAT, false, pStride, 0);
      gl.enableVertexAttribArray(pointLoc.aColor);
      gl.vertexAttribPointer(pointLoc.aColor, 3, gl.FLOAT, false, pStride, 2 * 4);
      gl.enableVertexAttribArray(pointLoc.aMeta);
      gl.vertexAttribPointer(pointLoc.aMeta, 4, gl.FLOAT, false, pStride, 5 * 4);
      gl.drawArrays(gl.POINTS, 0, count);
    };

    const img = new window.Image();
    img.src = "/midi8-8.webp";
    img.onload = () => {
      if (disposed) return;
      particles = buildSculptureParticles(img);
      morphStart = performance.now();
      if (prefersReduced) {
        renderFrame(morphStart);
      }
    };

    const loop = (now: number) => {
      if (isVisible && !document.hidden) {
        renderFrame(now);
      }
      if (!prefersReduced) {
        rafId = window.requestAnimationFrame(loop);
      }
    };

    if (!prefersReduced) {
      rafId = window.requestAnimationFrame(loop);
    }

    return () => {
      disposed = true;
      if (rafId) window.cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      gl.deleteBuffer(pointVbo);
      gl.deleteBuffer(lineVbo);
      gl.deleteProgram(pointProg);
      gl.deleteProgram(lineProg);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[310px] sm:max-w-[390px] lg:max-w-[430px] h-[250px] sm:h-[360px] lg:h-[420px] flex flex-col items-center justify-center select-none">
      {/* Halo atmosférico suave alinhado à paleta oficial exata do "8" da midi8 */}
      <div
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 58% at 48% 45%, rgba(192, 21, 255, 0.14) 0%, rgba(0, 105, 248, 0.11) 42%, rgba(0, 232, 178, 0.11) 68%, transparent 82%)",
        }}
        className="pointer-events-none absolute inset-0 blur-2xl opacity-90"
      />

      {/* Sombra de estúdio sem contacto na base (reage à flutuação 3D) */}
      <div
        ref={shadowRef}
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0, 105, 248, 0.16) 0%, rgba(192, 21, 255, 0.08) 45%, rgba(0, 232, 178, 0) 76%)",
        }}
        className="pointer-events-none absolute bottom-3 sm:bottom-4 w-[48%] h-7 rounded-full blur-md will-change-transform"
      />

      {webglUnavailable ? (
        <Image
          src="/midi8-8.webp"
          alt="Escultura 3D midi8"
          width={1078}
          height={1570}
          unoptimized
          className="relative z-10 h-[78%] w-auto object-contain drop-shadow-[0_24px_38px_rgba(0,105,248,0.2)]"
        />
      ) : (
        <canvas
          ref={canvasRef}
          aria-label="Escultura cinética 3D midi8"
          className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing touch-pan-y"
        />
      )}
    </div>
  );
}
