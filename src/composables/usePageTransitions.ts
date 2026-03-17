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

  // Magnetic reveal animation for page entrance
  function magneticReveal(elements: NodeListOf<Element> | Element[], config = defaultConfig) {
    if (!elements.length) return
    
    elements.forEach((element, index) => {
      const el = element as HTMLElement
      
      // Set initial state
      gsap.set(el, { 
        opacity: 0, 
        y: 60,
        scale: 0.9,
        rotationX: 15,
        transformOrigin: "center bottom"
      })
      
      // Magnetic reveal with physics-based motion
      gsap.to(el, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: config.duration,
        delay: index * config.stagger,
        ease: "back.out(1.7)",
        onStart: () => {
          // Add magnetic pull effect
          const tl = gsap.timeline({ repeat: 1, yoyo: true })
          tl.to(el, {
            scale: 1.02,
            duration: 0.1,
            ease: "power2.inOut"
          })
        }
      })
      
      // Subtle floating animation after reveal
      gsap.to(el, {
        y: -5,
        duration: 2,
        delay: (index * config.stagger) + config.duration,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      })
    })
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
                // Reveal new page elements
                const newElements = document.querySelectorAll('.reveal, [data-reveal]')
                magneticReveal(newElements, config)
                
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

  // Magnetic button interaction
  function addMagneticEffect(selector: string, strength = 0.3) {
    const elements = document.querySelectorAll(selector)
    
    elements.forEach(element => {
      const el = element as HTMLElement
      
      el.addEventListener('mouseenter', () => {
        gsap.to(el, {
          scale: 1.05,
          duration: 0.3,
          ease: "back.out(1.7)"
        })
      })
      
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power3.out"
        })
      })
      
      el.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const deltaX = (e.clientX - centerX) * strength
        const deltaY = (e.clientY - centerY) * strength
        
        gsap.to(el, {
          x: deltaX,
          y: deltaY,
          duration: 0.3,
          ease: "power3.out"
        })
      })
    })
  }

  return {
    isTransitioning,
    morphTransition,
    magneticReveal,
    scrollMorphTransition,
    addMagneticEffect
  }
}