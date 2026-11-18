"use client"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ReactNode, useRef } from "react"

/**
 * Simple wrapper that applies a scroll‑driven morph effect.
 * It scales down and rotates slightly as the page scrolls past the section.
 * You can customize the transform values to achieve different visual styles.
 */
export default function SectionWrapper({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  const scale = useTransform(smooth, [0, 0.5, 1], [1, 0.97, 0.94])
  const rotate = useTransform(smooth, [0, 0.5, 1], [0, -0.5, -1])
  const opacity = useTransform(smooth, [0, 0.8, 1], [1, 0.9, 0.8])

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div style={{ scale, rotate, opacity }} className="will-change-transform">
        {children}
      </motion.div>
    </section>
  )
}
