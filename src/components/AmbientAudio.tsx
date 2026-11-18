"use client"
import { useEffect } from "react"
import { Howl } from "howler"

/**
 * Ambient looping soundscape that reacts to user interaction.
 * Autoplay is triggered after first user click due to browser policies.
 */
export default function AmbientAudio() {
  useEffect(() => {
    const sound = new Howl({
      src: ["/ambient-loop.wav"],
      loop: true,
      volume: 0.2,
    })

    const start = () => {
      sound.play()
      window.removeEventListener("click", start)
    }
    window.addEventListener("click", start)
    return () => {
      sound.stop()
      window.removeEventListener("click", start)
    }
  }, [])

  return null
}
