/**
 * Mobile Magic Effects - Lightweight alternatives for touch devices
 * Provides subtle magical atmosphere without heavy GPU usage
 */
import { onMounted, onUnmounted, ref } from 'vue'
import { getThemeColors } from '../utils/colors'

export function useMobileMagic() {
  const isMobile = ref(false)
  let scrollHandler: (() => void) | null = null
  const themeColors = { plum: '#8D3B78', gold: '#c9a84c' } // fallbacks

  onMounted(() => {
    // Detect if this is a touch device
    isMobile.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    if (!isMobile.value) return

    // Load theme colors from CSS
    try {
      const colors = getThemeColors()
      themeColors.plum = colors.plum || themeColors.plum
      themeColors.gold = colors.gold || themeColors.gold
    } catch (e) {
      console.warn('Could not load theme colors, using fallbacks')
    }

    // Mobile-specific enhancements
    addTouchEffects()
    addScrollSparkles()
  })

  function addTouchEffects() {
    document.addEventListener('touchstart', createTouchSparkle, { passive: true })
  }

  function createTouchSparkle(e: TouchEvent) {
    const touch = e.touches[0]
    if (!touch) return

    const sparkle = document.createElement('div')
    sparkle.className = 'mobile-sparkle'
    sparkle.style.cssText = `
      position: fixed;
      left: ${touch.clientX}px;
      top: ${touch.clientY}px;
      width: 8px;
      height: 8px;
      background: ${themeColors.plum};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      box-shadow: 0 0 12px ${themeColors.plum};
      animation: sparkleOut 0.8s ease-out forwards;
    `

    document.body.appendChild(sparkle)
    setTimeout(() => sparkle.remove(), 800)
  }

  function addScrollSparkles() {
    let lastScroll = 0
    let ticking = false

    function updateScrollSparkles() {
      const scrolled = window.scrollY
      const scrollDelta = Math.abs(scrolled - lastScroll)
      
      if (scrollDelta > 50) {
        // Create subtle sparkle on significant scroll
        const sparkle = document.createElement('div')
        sparkle.className = 'scroll-sparkle'
        sparkle.style.cssText = `
          position: fixed;
          left: ${Math.random() * window.innerWidth}px;
          top: ${Math.random() * window.innerHeight}px;
          width: 4px;
          height: 4px;
          background: ${themeColors.gold};
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          opacity: 0.6;
          animation: scrollSparkle 1.5s ease-out forwards;
        `

        document.body.appendChild(sparkle)
        setTimeout(() => sparkle.remove(), 1500)
        lastScroll = scrolled
      }
      
      ticking = false
    }

    scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollSparkles)
        ticking = true
      }
    }

    window.addEventListener('scroll', scrollHandler, { passive: true })
  }

  onUnmounted(() => {
    document.removeEventListener('touchstart', createTouchSparkle)
    if (scrollHandler) {
      window.removeEventListener('scroll', scrollHandler)
    }
  })

  return { isMobile }
}