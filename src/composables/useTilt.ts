/**
 * 3D Tilt Effect - Elements tilt based on mouse position.
 * Creates a "floating card" effect with perspective transform.
 */
import { onMounted, onUnmounted } from 'vue'

export function useTilt(selector: string, maxTilt = 8) {
  const handlers = new Map<Element, (e: MouseEvent) => void>()
  const leaveHandlers = new Map<Element, () => void>()

  onMounted(() => {
    document.querySelectorAll(selector).forEach((el) => {
      const htmlEl = el as HTMLElement
      htmlEl.style.transition = 'transform 0.1s ease-out'
      htmlEl.style.transformStyle = 'preserve-3d'

      const handler = (e: MouseEvent) => {
        const rect = htmlEl.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        htmlEl.style.transform = `perspective(800px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) scale3d(1.02, 1.02, 1.02)`
      }

      const leaveHandler = () => {
        htmlEl.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        htmlEl.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)'
        setTimeout(() => { htmlEl.style.transition = 'transform 0.1s ease-out' }, 500)
      }

      htmlEl.addEventListener('mousemove', handler)
      htmlEl.addEventListener('mouseleave', leaveHandler)
      handlers.set(el, handler)
      leaveHandlers.set(el, leaveHandler)
    })
  })

  onUnmounted(() => {
    handlers.forEach((handler, el) => {
      el.removeEventListener('mousemove', handler as any)
    })
    leaveHandlers.forEach((handler, el) => {
      el.removeEventListener('mouseleave', handler as any)
    })
  })
}
