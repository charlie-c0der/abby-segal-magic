/**
 * Magic Cursor - Custom cursor with sparkle trail.
 * The cursor leaves a trail of fading golden particles.
 * Transforms on hover states (magnetic pull, expand).
 */
import { onMounted, onUnmounted, ref } from 'vue'
import { getThemeColors } from '../utils/colors'

interface Particle {
  x: number
  y: number
  size: number
  opacity: number
  vx: number
  vy: number
  life: number
  color: string // Add color property to prevent flickering
}

export function useMagicCursor() {
  const cursorX = ref(0)
  const cursorY = ref(0)
  const cursorScale = ref(1)
  const cursorVisible = ref(false)
  const isHovering = ref(false)

  let particles: Particle[] = []
  let canvas: HTMLCanvasElement | null = null
  let ctx: CanvasRenderingContext2D | null = null
  let animFrame: number = 0
  let lastEmit = 0
  let resizeHandler: (() => void) | null = null
  let mouseoverHandler: ((e: Event) => void) | null = null
  const themeColors = { plum: '#8D3B78', gold: '#c9a84c' } // fallbacks

  function onMouseMove(e: MouseEvent) {
    cursorX.value = e.clientX
    cursorY.value = e.clientY
    cursorVisible.value = true

    // Emit particles on movement (throttled)
    const now = Date.now()
    if (now - lastEmit > 30) {
      emitParticles(e.clientX, e.clientY, 1)
      lastEmit = now
    }
  }

  function onMouseLeave() {
    cursorVisible.value = false
  }

  function onMouseEnter() {
    cursorVisible.value = true
  }

  function onClick(e: MouseEvent) {
    emitParticles(e.clientX, e.clientY, 8)
  }

  const MAX_PARTICLES = 60

  function emitParticles(x: number, y: number, count: number) {
    // Cap total particles to prevent memory/GPU issues
    const toAdd = Math.min(count, MAX_PARTICLES - particles.length)
    for (let i = 0; i < toAdd; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 1.5 + 0.5
      particles.push({
        x,
        y,
        size: Math.random() * 3 + 1,
        opacity: 1,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5,
        life: 1,
        color: Math.random() > 0.5 ? themeColors.plum : themeColors.gold, // Set color once at creation
      })
    }
  }

  function animate() {
    if (!ctx || !canvas) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles = particles.filter((p) => {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.02 // slight gravity
      p.life -= 0.015
      p.opacity = p.life

      if (p.life <= 0) return false

      ctx!.save()
      ctx!.globalAlpha = p.opacity * 0.6
      // Use the particle's stored color to prevent flickering
      ctx!.fillStyle = p.color
      ctx!.shadowColor = p.color
      ctx!.shadowBlur = p.size * 4
      ctx!.beginPath()
      ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx!.fill()
      ctx!.restore()

      return true
    })

    animFrame = requestAnimationFrame(animate)
  }

  onMounted(() => {
    // Skip custom cursor on touch devices - saves GPU & battery
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return
    }

    // Load theme colors from CSS
    try {
      const colors = getThemeColors()
      themeColors.plum = colors.plum || themeColors.plum
      themeColors.gold = colors.gold || themeColors.gold
    } catch (e) {
      console.warn('Could not load theme colors, using fallbacks')
    }

    // Create particle canvas
    canvas = document.createElement('canvas')
    canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:10000;'
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    document.body.appendChild(canvas)
    ctx = canvas.getContext('2d')

    resizeHandler = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    mouseoverHandler = (e: Event) => {
      const target = (e.target as HTMLElement).closest('a, button, .magnetic')
      if (target) {
        cursorScale.value = 2
        isHovering.value = true
      } else if (isHovering.value) {
        cursorScale.value = 1
        isHovering.value = false
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('mouseenter', onMouseEnter)
    window.addEventListener('click', onClick)
    window.addEventListener('resize', resizeHandler)
    document.addEventListener('mouseover', mouseoverHandler, { passive: true })

    animate()
  })

  onUnmounted(() => {
    cancelAnimationFrame(animFrame)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseleave', onMouseLeave)
    window.removeEventListener('mouseenter', onMouseEnter)
    window.removeEventListener('click', onClick)
    if (resizeHandler) window.removeEventListener('resize', resizeHandler)
    if (mouseoverHandler) document.removeEventListener('mouseover', mouseoverHandler)
    canvas?.remove()
  })

  return { cursorX, cursorY, cursorScale, cursorVisible, isHovering }
}
