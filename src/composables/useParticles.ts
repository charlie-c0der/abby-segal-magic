/**
 * Floating Particles Background
 * Golden dust motes drifting through the hero section like spotlit air.
 * Particles gently react to mouse movement.
 */
import { onMounted, onUnmounted } from 'vue'

interface Mote {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  angle: number
  drift: number
  phase: number
}

export function useParticles(canvasId: string, count = 60) {
  let canvas: HTMLCanvasElement | null = null
  let ctx: CanvasRenderingContext2D | null = null
  let motes: Mote[] = []
  let mouseX = 0
  let mouseY = 0
  let animFrame = 0
  let time = 0

  function initMotes(w: number, h: number) {
    motes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.3 + 0.1,
      angle: Math.random() * Math.PI * 2,
      drift: Math.random() * 0.5 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }))
  }

  function animate() {
    if (!ctx || !canvas) return
    const w = canvas.width
    const h = canvas.height

    ctx.clearRect(0, 0, w, h)
    time += 0.005

    for (const m of motes) {
      // Float upward with sine drift
      m.y -= m.speed
      m.x += Math.sin(time + m.phase) * m.drift * 0.3

      // Subtle mouse repulsion
      const dx = m.x - mouseX
      const dy = m.y - mouseY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 150) {
        const force = (150 - dist) / 150
        m.x += (dx / dist) * force * 0.8
        m.y += (dy / dist) * force * 0.8
      }

      // Wrap around
      if (m.y < -10) m.y = h + 10
      if (m.x < -10) m.x = w + 10
      if (m.x > w + 10) m.x = -10

      // Pulsing opacity
      const pulse = Math.sin(time * 2 + m.phase) * 0.15 + 0.85
      const alpha = m.opacity * pulse

      ctx.save()
      ctx.globalAlpha = alpha
      // Mix rose and gold motes for warmth
      const isRose = m.phase > Math.PI
      ctx.fillStyle = isRose ? '#c4847a' : '#c9a84c'
      ctx.shadowColor = isRose ? '#c4847a' : '#c9a84c'
      ctx.shadowBlur = m.size * 6
      ctx.beginPath()
      ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    animFrame = requestAnimationFrame(animate)
  }

  function onMouseMove(e: MouseEvent) {
    const rect = canvas?.getBoundingClientRect()
    if (rect) {
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }
  }

  onMounted(() => {
    canvas = document.getElementById(canvasId) as HTMLCanvasElement
    if (!canvas) return
    ctx = canvas.getContext('2d')

    const resize = () => {
      if (!canvas) return
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.offsetWidth
        canvas.height = parent.offsetHeight
      }
    }

    resize()
    initMotes(canvas.width, canvas.height)
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    animate()
  })

  onUnmounted(() => {
    cancelAnimationFrame(animFrame)
    window.removeEventListener('mousemove', onMouseMove)
  })
}
