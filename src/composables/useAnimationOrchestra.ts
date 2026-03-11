/**
 * Animation Orchestra - Unified world-class animation system
 * Coordinates all animation systems for seamless, premium user experiences
 */
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { usePageTransitions } from './usePageTransitions'
import { useScrollMagic } from './useScrollMagic'
import { useMicroInteractions } from './useMicroInteractions'
import { useLoadingExperience } from './useLoadingExperience'
import gsap from 'gsap'

interface OrchestraConfig {
  enablePageTransitions: boolean
  enableScrollMagic: boolean
  enableMicroInteractions: boolean
  enableLoadingExperience: boolean
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
    enableLoadingExperience: true,
    enablePerformanceOptimizations: true,
    enableAccessibility: true,
    debugMode: false
  }
  
  const settings = { ...defaultConfig, ...config }
  
  // Initialize all animation systems
  const pageTransitions = settings.enablePageTransitions ? usePageTransitions() : null
  const scrollMagic = settings.enableScrollMagic ? useScrollMagic() : null
  const microInteractions = settings.enableMicroInteractions ? useMicroInteractions() : null
  const loadingExperience = settings.enableLoadingExperience ? useLoadingExperience({
    duration: 2500,
    showProgress: true,
    enableParticles: true,
    customMessages: [
      "Preparing the stage...",
      "Shuffling the magic deck...",
      "Setting up illusions...",
      "Gathering enchantments...",
      "Ready for the show!"
    ]
  }) : null
  
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
    
    // Initialize core page experience
    await initializePageExperience()
    
    // Setup scroll-based storytelling
    if (scrollMagic) {
      initializeScrollExperience()
    }
    
    // Add micro-interactions
    if (microInteractions) {
      initializeMicroInteractions()
    }
    
    // Setup page transitions
    if (pageTransitions) {
      initializePageTransitions()
    }
    
    isInitialized.value = true
    console.warn('✨ Animation Orchestra ready!')
  }

  async function initializePageExperience() {
    // Wait for loading experience to complete
    if (loadingExperience?.isLoading()) {
      return new Promise<void>((resolve) => {
        const checkLoading = () => {
          if (!loadingExperience.isLoading()) {
            resolve()
          } else {
            setTimeout(checkLoading, 100)
          }
        }
        checkLoading()
      })
    }
  }

  function initializeScrollExperience() {
    if (!scrollMagic) return
    
    // Hero section with cascade reveals
    scrollMagic.createRevealPattern({
      selector: '.hero .reveal',
      pattern: 'cascade',
      duration: 1.2,
      stagger: 0.15
    })
    
    // Art gallery with magnetic reveals
    scrollMagic.createRevealPattern({
      selector: '.art-item',
      pattern: 'magnetic',
      duration: 1.0,
      stagger: 0.1
    })
    
    // Text sections with typewriter effect
    scrollMagic.createRevealPattern({
      selector: '.typewriter',
      pattern: 'typewriter',
      duration: 0.05,
      stagger: 0.03
    })
    
    // Cards with wave animation
    scrollMagic.createRevealPattern({
      selector: '.show-card',
      pattern: 'wave',
      duration: 0.8,
      stagger: 0.1
    })
    
    // Parallax backgrounds
    scrollMagic.createParallax('.parallax-bg', 0.3)
    scrollMagic.createParallax('.parallax-element', 0.5)
    
    // Magnetic fields for special elements
    scrollMagic.createMagneticField('.magnetic-element', 25)
    
    // Performance optimization
    scrollMagic.initPerformanceMode()
  }

  function initializeMicroInteractions() {
    if (!microInteractions) return
    
    // Get optimized settings based on device capabilities
    const interactionConfig = microInteractions.optimizeForDevice()
    
    // Enhanced button interactions
    microInteractions.addButtonInteractions('.btn, .button, button, [role="button"]', {
      ...interactionConfig,
      magneticStrength: 0.2,
      hapticFeedback: true
    })
    
    // Premium card interactions
    microInteractions.addCardInteractions('.card, .art-item, .show-card', 1.2)
    
    // Form enhancements
    microInteractions.addInputInteractions('input, textarea, select')
  }

  function initializePageTransitions() {
    if (!pageTransitions) return
    
    // Add magnetic effects to navigation
    pageTransitions.addMagneticEffect('.nav-link, .menu-item', 0.3)
    
    // Enhanced reveal for page loads
    const pageElements = document.querySelectorAll('main .reveal')
    pageTransitions.magneticReveal(pageElements, {
      duration: 1.0,
      ease: "back.out(1.7)",
      stagger: 0.1,
      magneticStrength: 0.3
    })
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
      
      // Reduce particle count and effect complexity
      settings.enableLoadingExperience = !isSlowConnection
      
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
      settings.enableLoadingExperience = false
      
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

  // Public API for controlling the orchestra
  function pauseAllAnimations() {
    gsap.globalTimeline.pause()
  }

  function resumeAllAnimations() {
    gsap.globalTimeline.resume()
  }

  function setAnimationSpeed(speed: number) {
    gsap.globalTimeline.timeScale(speed)
  }

  // Advanced entrance animation for any element
  function magicalEntrance(selector: string, pattern: 'cascade' | 'spiral' | 'magnetic' = 'cascade') {
    const elements = document.querySelectorAll(selector)
    if (!elements.length) return
    
    switch (pattern) {
      case 'cascade':
        gsap.fromTo(elements,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "back.out(1.7)"
          }
        )
        break
        
      case 'spiral':
        elements.forEach((el, i) => {
          gsap.fromTo(el,
            { opacity: 0, scale: 0, rotation: 180 },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 1.0,
              delay: i * 0.1,
              ease: "back.out(2)"
            }
          )
        })
        break
        
      case 'magnetic':
        elements.forEach((el, i) => {
          gsap.fromTo(el,
            { 
              opacity: 0, 
              x: (i % 2 === 0 ? -100 : 100),
              y: 30,
              rotation: (i % 2 === 0 ? -15 : 15)
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotation: 0,
              duration: 1.2,
              delay: i * 0.1,
              ease: "elastic.out(1, 0.6)"
            }
          )
        })
        break
    }
  }

  return {
    isInitialized,
    performanceMetrics,
    pageTransitions,
    scrollMagic,
    microInteractions,
    loadingExperience,
    pauseAllAnimations,
    resumeAllAnimations,
    setAnimationSpeed,
    magicalEntrance,
    cleanup
  }
}