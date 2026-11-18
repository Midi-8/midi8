"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { Points, PointMaterial } from "@react-three/drei";

// Simple particle field using three.js – positions generated once after mount
export default function ParticleField() {
  const [positions, setPositions] = useState<Float32Array | null>(null);

  useEffect(() => {
    const count = 1500;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    const frame = requestAnimationFrame(() => setPositions(arr));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!positions) return null;

  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 10], fov: 60 }}
      style={{ position: "absolute", inset: 0, zIndex: -1, pointerEvents: "none" }}
    >
      <color attach="background" args={["transparent"]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Suspense fallback={null}>
        <Points positions={positions} limit={positions.length / 3} stride={3}>
          <PointMaterial
            transparent
            size={0.12}
            color="#00ffcc"
            sizeAttenuation={true}
            depthWrite={false}
          />
        </Points>
      </Suspense>
    </Canvas>
  );
}
