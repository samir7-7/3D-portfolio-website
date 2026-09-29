import { useEffect, useRef } from 'react'

export default function NoiseOverlay() {
  const canvasRef = useRef(null)
  const animFrameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })

    // Use a smaller resolution and scale up for performance + grainier look
    const SCALE = 2
    const resize = () => {
      canvas.width = Math.ceil(window.innerWidth / SCALE)
      canvas.height = Math.ceil(window.innerHeight / SCALE)
    }
    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      const w = canvas.width
      const h = canvas.height
      const imageData = ctx.createImageData(w, h)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        // Random grain value
        const grain = Math.random() * 255

        // Subtle color variation to match reference (dark specks with slight color tint)
        data[i]     = grain                          // R
        data[i + 1] = grain * (0.95 + Math.random() * 0.1) // G (slight green shift)
        data[i + 2] = grain * (0.9 + Math.random() * 0.1)  // B (slight warm shift)
        data[i + 3] = 35                             // Alpha — controls overall density
      }

      ctx.putImageData(imageData, 0, 0)
      animFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        imageRendering: 'pixelated',
      }}
    />
  )
}
