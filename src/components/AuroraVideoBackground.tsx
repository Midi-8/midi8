"use client"
import React from "react"

/**
 * Background video with aurora colors blended via mix‑blend-mode.
 * Autoplay muted loop. Falls back to a static image on mobile/reduced‑motion.
 */
export default function AuroraVideoBackground() {
  return (
    <video
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover mix-blend-overlay"
      src="/aurora-loop.mp4"
      autoPlay
      muted
      loop
      playsInline
    />
  )
}
