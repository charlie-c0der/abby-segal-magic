/**
 * Magnetic Element Effect
 * Elements subtly pull toward the cursor when nearby.
 * Call on mounted, pass a ref to the container element.
 */
import { onMounted, onUnmounted, type Ref } from 'vue'

export function useMagnetic(elRef: Ref<HTMLElement | null>, strength = 0.3) {
  let animFrame = 0

  function onMouseMove(e: MouseEvent) {
    const el = elRef.value
    if (!el) return

    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distX = e.clientX - centerX
    const distY = e.clientY - centerY
    const dist = Math.sqrt(distX * distX + distY * distY)
    const maxDist = 120

    if (dist < maxDist) {
      const pull = (1 - dist / maxDist) * strength
      el.style.transform = `translate(${distX * pull}px, ${distY * pull}px)`
    } else {
      el.style.transform = ''
    }
  }

  function onMouseLeave() {
    const el = elRef.value
    if (el) {
      el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      el.style.transform = ''
      setTimeout(() => { if (el) el.style.transition = '' }, 500)
    }
  }

  onMounted(() => {
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    elRef.value?.addEventListener('mouseleave', onMouseLeave)
  })

  onUnmounted(() => {
    cancelAnimationFrame(animFrame)
    window.removeEventListener('mousemove', onMouseMove)
  })
}
