/**
 * Animation Orchestra - Unified world-class animation system
 * Coordinates all animation systems for seamless, premium user experiences
 */
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { usePageTransitions } from './usePageTransitions'
import { useScrollMagic } from './useScrollMagic'
import { useMicroInteractions } from './useMicroInteractions'
import gsap from 'gsap'

interface OrchestraConfig {
  enablePageTransitions: boolean
  enableScrollMagic: boolean
  enableMicroInteractions: boolean
  enablePerformanceOptimizations: boolean
  enableAccessibility: boolean
  debugMode: boolean
}

interface PerformanceMetrics {
  fps: number
  averageFps: number
  frameDrops: number
  totalFrames: number
}

export function useAnimationOrchestra(config: Partial<OrchestraConfig> = {}) {
  const isInitialized = ref(false)
  const performanceMetrics = ref<PerformanceMetrics>({
    fps: 60,
    averageFps: 60,
    frameDrops: 0,
    totalFrames: 0
  })
  
  const defaultConfig: OrchestraConfig = {
    enablePageTransitions: true,
    enableScrollMagic: true,
    enableMicroInteractions: true,
    enablePerformanceOptimizations: true,
    enableAccessibility: true,
    debugMode: false
  }
  
  const settings = { ...defaultConfig, ...config }
  
  // Initialize all animation systems
  const pageTransitions = settings.enablePageTransitions ? usePageTransitions() : null
  const scrollMagic = settings.enableScrollMagic ? useScrollMagic() : null
  const microInteractions = settings.enableMicroInteractions ? useMicroInteractions() : null

  let performanceMonitor: number = 0
  let lastFrameTime = 0
  let frameCount = 0
  
  onMounted(() => {
    nextTick(() => {
      initializeOrchestra()
    })
  })
  
  onUnmounted(() => {
    cleanup()
  })

  async function initializeOrchestra() {
    if (isInitialized.value) return

    console.warn('🎭 Initializing Animation Orchestra...')
    
    // Check performance capabilities
    if (settings.enablePerformanceOptimizations) {
      await optimizeForDevice()
    }
    
    // Initialize accessibility features
    if (settings.enableAccessibility) {
      setupAccessibility()
    }
    
    // Setup performance monitoring
    if (settings.debugMode) {
      startPerformanceMonitoring()
    }
    
    // Setup scroll-based storytelling
    if (scrollMagic) {
      initializeScrollExperience()
    }
    
    isInitialized.value = true
    console.warn('✨ Animation Orchestra ready!')
  }

  function initializeScrollExperience() {
    if (!scrollMagic) return

    // Global ScrollTrigger config + reduced-motion fallback
    scrollMagic.initPerformanceMode()
  }

  async function optimizeForDevice() {
    // Detect device capabilities
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    const isSlowConnection = connection && (connection.effectiveType === '2g' || connection.saveData)
    const isLowPower = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4
    
    // Reduce animation complexity for low-power devices
    if (isMobile || isSlowConnection || isLowPower) {
      gsap.config({
        force3D: false,
        nullTargetWarn: false
      })
      
      if (settings.debugMode) {
        console.warn('🔧 Optimizations applied for low-power device')
      }
    }
  }

  function setupAccessibility() {
    // Respect reduced motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    if (prefersReducedMotion.matches) {
      // Reduce animation durations and complexity
      gsap.globalTimeline.timeScale(0.1)
      
      // Disable complex animations
      settings.enablePageTransitions = false

      if (settings.debugMode) {
        console.warn('♿ Reduced motion mode enabled')
      }
    }
    
    // Listen for preference changes
    prefersReducedMotion.addListener((e) => {
      if (e.matches) {
        gsap.globalTimeline.timeScale(0.1)
      } else {
        gsap.globalTimeline.timeScale(1)
      }
    })
    
    // Focus management for animations
    document.addEventListener('focusin', (e) => {
      const target = e.target as HTMLElement
      if (target) {
        // Ensure focused elements are visible and not mid-animation
        gsap.set(target, { clearProps: "all" })
      }
    })
  }

  function startPerformanceMonitoring() {
    const frames: number[] = []
    
    function measureFps() {
      const now = performance.now()
      if (lastFrameTime > 0) {
        const delta = now - lastFrameTime
        const currentFps = 1000 / delta
        
        frames.push(currentFps)
        if (frames.length > 60) { // Keep last 60 frames
          frames.shift()
        }
        
        performanceMetrics.value.fps = Math.round(currentFps)
        performanceMetrics.value.averageFps = Math.round(
          frames.reduce((a, b) => a + b, 0) / frames.length
        )
        performanceMetrics.value.totalFrames++
        
        if (currentFps < 50) {
          performanceMetrics.value.frameDrops++
        }
        
        // Auto-optimize if performance drops
        if (performanceMetrics.value.averageFps < 30 && frameCount > 120) {
          autoOptimizePerformance()
        }
      }
      
      lastFrameTime = now
      frameCount++
      performanceMonitor = requestAnimationFrame(measureFps)
    }
    
    measureFps()
    
    // Log performance periodically
    setInterval(() => {
      if (settings.debugMode) {
        console.warn('📊 Performance:', performanceMetrics.value)
      }
    }, 5000)
  }

  function autoOptimizePerformance() {
    console.warn('🐌 Low FPS detected, auto-optimizing...')
    
    // Reduce animation quality
    gsap.config({
      force3D: false,
      nullTargetWarn: false
    })
    
    // Disable some heavy effects
    if (scrollMagic) {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.scrub) {
          trigger.disable()
        }
      })
    }
  }

  function cleanup() {
    if (performanceMonitor) {
      cancelAnimationFrame(performanceMonitor)
    }
    
    // Cleanup all animation systems
    microInteractions?.cleanup()
    
    // Kill all GSAP animations
    gsap.killTweensOf("*")
  }

  return {
    isInitialized,
    performanceMetrics,
    pageTransitions,
    scrollMagic,
    microInteractions,
    cleanup
  }
}