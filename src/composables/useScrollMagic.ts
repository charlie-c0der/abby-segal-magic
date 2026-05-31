/**
 * Advanced Scroll Magic - Timeline-driven storytelling with physics-based reveals
 * Creates immersive, narrative-driven scroll experiences with parallax and morphing effects
 */
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollMagic() {
  const scrollTriggers = ref<ScrollTrigger[]>([])
  const isReducedMotion = ref(false)
  
  onMounted(() => {
    // Respect user's motion preferences
    isReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // Refresh ScrollTrigger on route changes
    ScrollTrigger.refresh()
  })
  
  onUnmounted(() => {
    scrollTriggers.value.forEach(st => st.kill())
    scrollTriggers.value = []
  })

  // Performance-optimized scroll effects
  function initPerformanceMode() {
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
      ignoreMobileResize: true,
    })
    
    if (isReducedMotion.value) {
      // Provide alternative, simpler animations for reduced motion
      ScrollTrigger.batch(".reveal", {
        onEnter: (elements) => {
          gsap.to(elements, { opacity: 1, duration: 0.3 })
        }
      })
    }
  }

  return {
    initPerformanceMode,
    isReducedMotion
  }
}