/**
 * Animation Orchestra — the single init point for the app-wide animation layer.
 * It wires up ScrollTrigger's global config + reduced-motion handling and softens
 * GSAP on low-power devices. Per-view animations (reveal, tilt, split-text, hero
 * parallax) live in their own composables/views; this only owns the global setup.
 */
import { onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import { useScrollMagic } from './useScrollMagic'
import { isTouchDevice, isSlowConnection, deviceMemory } from './useDeviceCapabilities'

export function useAnimationOrchestra() {
  const scrollMagic = useScrollMagic()
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let onMotionChange: ((e: MediaQueryListEvent) => void) | null = null

  onMounted(() => {
    nextTick(() => {
      optimizeForDevice()
      setupReducedMotion()
      // Global ScrollTrigger config + reduced-motion reveal fallback.
      scrollMagic.initPerformanceMode()
    })
  })

  onUnmounted(() => {
    if (onMotionChange) reducedMotion.removeEventListener('change', onMotionChange)
    gsap.killTweensOf('*')
  })

  // Soften GSAP on touch / data-saver / low-RAM devices.
  function optimizeForDevice() {
    const mem = deviceMemory()
    const isLowPower = mem !== undefined && mem < 4
    if (isTouchDevice() || isSlowConnection() || isLowPower) {
      gsap.config({ force3D: false, nullTargetWarn: false })
    }
  }

  // Respect reduced-motion now and on live preference changes.
  function setupReducedMotion() {
    if (reducedMotion.matches) gsap.globalTimeline.timeScale(0.1)
    onMotionChange = (e) => gsap.globalTimeline.timeScale(e.matches ? 0.1 : 1)
    reducedMotion.addEventListener('change', onMotionChange)
  }

  return { scrollMagic }
}
