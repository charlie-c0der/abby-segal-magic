/**
 * Advanced Page Transitions - World-class morphing and reveal effects
 * Creates smooth, physics-based transitions between routes with magnetic reveals
 */
import { ref, nextTick } from 'vue'
import gsap from 'gsap'
import { useRouter } from 'vue-router'

interface TransitionConfig {
  duration: number
  ease: string
  stagger: number
  magneticStrength: number
}

export function usePageTransitions() {
  const isTransitioning = ref(false)
  const router = useRouter()
  
  const defaultConfig: TransitionConfig = {
    duration: 1.2,
    ease: "power3.inOut",
    stagger: 0.08,
    magneticStrength: 0.3
  }

  // Create overlay element for morphing effect
  function createTransitionOverlay(): HTMLElement {
    const overlay = document.createElement('div')
    overlay.className = 'page-transition-overlay'
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, 
        rgba(141, 59, 120, 0.95) 0%, 
        rgba(170, 136, 51, 0.95) 100%);
      z-index: 10000;
      pointer-events: none;
      backdrop-filter: blur(20px);
      display: flex;
      align-items: center;
      justify-content: center;
    `
    
    // Add magical particles during transition
    const particleContainer = document.createElement('div')
    particleContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    `
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div')
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 215, 0, 0.8);
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `
      particleContainer.appendChild(particle)
      
      // Animate particle
      gsap.to(particle, {
        y: "-=100px",
        x: `${Math.random() * 40 - 20}px`,
        opacity: 0,
        duration: 1.5,
        delay: Math.random() * 0.5,
        ease: "power2.out"
      })
    }
    
    overlay.appendChild(particleContainer)
    document.body.appendChild(overlay)
    return overlay
  }

  // Advanced morphing transition
  function morphTransition(_fromRoute: string, toRoute: string, config = defaultConfig) {
    return new Promise<void>((resolve) => {
      isTransitioning.value = true
      
      // Create transition overlay
      const overlay = createTransitionOverlay()
      
      // Morph overlay from center outward
      gsap.fromTo(overlay, 
        { 
          scale: 0,
          borderRadius: "50%",
          transformOrigin: "center center"
        },
        {
          scale: 1.5,
          borderRadius: "0%",
          duration: config.duration * 0.6,
          ease: config.ease,
          onComplete: () => {
            // Navigate to new route
            router.push(toRoute).then(() => {
              nextTick(() => {
                // Fade out overlay
                gsap.to(overlay, {
                  opacity: 0,
                  scale: 1.1,
                  duration: config.duration * 0.4,
                  ease: "power3.inOut",
                  onComplete: () => {
                    overlay.remove()
                    isTransitioning.value = false
                    resolve()
                  }
                })
              })
            })
          }
        }
      )
    })
  }

  // Seamless scroll-based page transition
  function scrollMorphTransition(targetY: number, callback?: () => void) {
    const tl = gsap.timeline()
    
    // Create ripple effect from scroll position
    const ripple = document.createElement('div')
    ripple.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, rgba(170, 136, 51, 0.3), transparent);
      border-radius: 50%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999;
      pointer-events: none;
    `
    document.body.appendChild(ripple)
    
    tl.to(ripple, {
      scale: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .to(window, {
      scrollTo: targetY,
      duration: 1.2,
      ease: "power3.inOut"
    }, "-=0.4")
    .call(() => {
      ripple.remove()
      callback?.()
    })
  }

  return {
    isTransitioning,
    morphTransition,
    scrollMorphTransition
  }
}