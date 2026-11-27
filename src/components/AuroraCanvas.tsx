"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const VERTEX_SHADER = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uVelocity;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = rot * p * 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float aspect = uResolution.x / max(uResolution.y, 1.0);

  float t = uTime * 0.18;
  vec2 mDelta = uv - uMouse;
  mDelta.x *= aspect;
  float mDist = length(mDelta);

  float ripple = exp(-mDist * 3.8) * (0.045 + uVelocity * 0.14);
  vec2 flowUv = uv;
  flowUv += normalize(mDelta + vec2(0.0001)) * sin(mDist * 14.0 - uTime * 2.4) * ripple * 0.45;
  flowUv += mDelta * (-ripple * 0.75);

  vec2 q = vec2(
    fbm(flowUv * vec2(2.1, 1.6) + vec2(t * 0.55, -t * 0.32)),
    fbm(flowUv * vec2(2.1, 1.6) + vec2(-t * 0.41, t * 0.48) + vec2(5.2, 1.3))
  );
  float fluid = fbm(flowUv * vec2(2.4, 1.8) + 1.35 * q + vec2(t * 0.25, -t * 0.2));

  vec2 p = flowUv + (q - 0.5) * 0.18;

  float gViolet = exp(-dot((p - vec2(0.14, 0.98)) * vec2(1.15, 3.4), (p - vec2(0.14, 0.98)) * vec2(1.15, 3.4)) * 2.2);
  float gBlue   = exp(-dot((p - vec2(0.50, 0.99)) * vec2(1.25, 3.3), (p - vec2(0.50, 0.99)) * vec2(1.25, 3.3)) * 2.2);
  float gMint   = exp(-dot((p - vec2(0.86, 0.98)) * vec2(1.15, 3.4), (p - vec2(0.86, 0.98)) * vec2(1.15, 3.4)) * 2.2);

  float cursorGlow = exp(-mDist * 4.5) * (0.12 + uVelocity * 0.35);

  vec3 cViolet = vec3(0.753, 0.082, 1.0);
  vec3 cBlue   = vec3(0.0, 0.412, 0.973);
  vec3 cMint   = vec3(0.0, 0.910, 0.698);

  float wSum = gViolet + gBlue + gMint + 0.0001;
  vec3 col = (cViolet * gViolet + cBlue * gBlue + cMint * gMint) / wSum;
  col = mix(col, vec3(0.32, 0.74, 0.98), clamp(cursorGlow * 0.4 + (fluid - 0.45) * 0.22, 0.0, 0.35));

  float topBand = smoothstep(0.58, 0.99, uv.y);
  float fluidMod = mix(0.76, 1.16, fluid);
  float density = clamp((gViolet * 0.72 + gBlue * 0.68 + gMint * 0.66 + cursorGlow * 0.28) * fluidMod, 0.0, 0.84);
  float alpha = clamp(density * topBand, 0.0, 0.78);

  gl_FragColor = vec4(col * alpha, alpha);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function AuroraCanvas() {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const fallback = fallbackRef.current;
    if (!canvas || !fallback || prefersReducedMotion) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
      premultipliedAlpha: true,
    });
    if (!gl) return;

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) {
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      return;
    }

    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPosition = gl.getAttribLocation(program, "aPosition");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uMouse = gl.getUniformLocation(program, "uMouse");
    const uVelocity = gl.getUniformLocation(program, "uVelocity");

    gl.useProgram(program);
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    let width = 1;
    let height = 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, Math.round(rect.width * dpr));
      height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
    };
    resize();

    let targetMouseX = 0.5;
    let targetMouseY = 0.86;
    let smoothMouseX = 0.5;
    let smoothMouseY = 0.86;
    let prevPointerX = 0.5;
    let prevPointerY = 0.86;
    let targetVelocity = 0;
    let smoothVelocity = 0;

    let rafId: number | null = null;
    let isInView = true;
    let hasRevealed = false;
    const startTime = performance.now();

    const onPointerMove = (e: PointerEvent) => {
      if (!isInView || document.hidden) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const nx = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const ny = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height));
      const dx = nx - prevPointerX;
      const dy = ny - prevPointerY;
      prevPointerX = nx;
      prevPointerY = ny;
      targetMouseX = nx;
      targetMouseY = ny;
      targetVelocity = Math.min(1.2, Math.hypot(dx, dy) * 14);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const render = (now: number) => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, (now - startTime) * 0.001);
      gl.uniform2f(uResolution, width, height);
      gl.uniform2f(uMouse, smoothMouseX, smoothMouseY);
      gl.uniform1f(uVelocity, smoothVelocity);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const drawFrame = (now: number) => {
      rafId = null;
      if (document.hidden || !isInView) return;

      smoothMouseX += (targetMouseX - smoothMouseX) * 0.08;
      smoothMouseY += (targetMouseY - smoothMouseY) * 0.08;
      smoothVelocity += (targetVelocity - smoothVelocity) * 0.1;
      targetVelocity *= 0.9;

      render(now);

      if (!hasRevealed) {
        hasRevealed = true;
        canvas.style.opacity = "1";
        fallback.style.opacity = "0";
        fallback.style.animationPlayState = "paused";
      }

      rafId = window.requestAnimationFrame(drawFrame);
    };

    const startLoop = () => {
      if (rafId === null && !document.hidden && isInView) {
        rafId = window.requestAnimationFrame(drawFrame);
      }
    };

    const stopLoop = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const ro = new ResizeObserver(() => {
      resize();
      // Redimensionar limpa o buffer e o observer corre depois do rAF: redesenhar antes do paint.
      render(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        isInView = Boolean(entries[0]?.isIntersecting);
        if (isInView) startLoop();
        else stopLoop();
      },
      { threshold: 0.02 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    startLoop();

    return () => {
      stopLoop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      if (quadBuffer) gl.deleteBuffer(quadBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [prefersReducedMotion]);

  return (
    <>
      <div
        ref={fallbackRef}
        className="top-aurora-fade transition-opacity duration-500"
      />
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full opacity-0 transition-opacity duration-500"
      />
    </>
  );
}
