/**
 * Advanced Micro-interactions - Physics-based haptic-like feedback system
 * Creates premium, responsive interactions that feel natural and delightful
 */
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

interface InteractionConfig {
  scale?: number
  duration?: number
  ease?: string
  magneticStrength?: number
  rippleColor?: string
  hapticFeedback?: boolean
}

interface ButtonState {
  isHovered: boolean
  isPressed: boolean
  ripples: HTMLElement[]
}

export function useMicroInteractions() {
  const activeInteractions = ref<Map<Element, ButtonState>>(new Map())
  const observers = ref<IntersectionObserver[]>([])
  
  onMounted(() => {
    initializeAutoInteractions()
  })
  
  onUnmounted(() => {
    cleanup()
  })

  function cleanup() {
    observers.value.forEach(observer => observer.disconnect())
    observers.value = []
    activeInteractions.value.clear()
  }

  // Premium button interactions with physics
  function addButtonInteractions(selector: string, config: InteractionConfig = {}) {
    const elements = document.querySelectorAll(selector)
    
    const defaults: Required<InteractionConfig> = {
      scale: 1.05,
      duration: 0.3,
      ease: "back.out(1.7)",
      magneticStrength: 0.2,
      rippleColor: "rgba(201, 168, 76, 0.3)",
      hapticFeedback: true
    }
    
    const settings = { ...defaults, ...config }
    
    elements.forEach(element => {
      const el = element as HTMLElement
      const state: ButtonState = {
        isHovered: false,
        isPressed: false,
        ripples: []
      }
      
      activeInteractions.value.set(element, state)
      
      // Enhanced hover effects with anticipation
      el.addEventListener('mouseenter', (e) => handleMouseEnter(el, e, state, settings))
      el.addEventListener('mouseleave', (e) => handleMouseLeave(el, e, state, settings))
      el.addEventListener('mousemove', (e) => handleMouseMove(el, e, state, settings))
      
      // Press interactions with ripple
      el.addEventListener('mousedown', (e) => handleMouseDown(el, e, state, settings))
      el.addEventListener('mouseup', (e) => handleMouseUp(el, e, state, settings))
      
      // Touch support
      el.addEventListener('touchstart', (e) => handleTouchStart(el, e, state, settings), { passive: true })
      el.addEventListener('touchend', (e) => handleTouchEnd(el, e, state, settings), { passive: true })
      
      // Focus states for accessibility
      el.addEventListener('focus', (e) => handleFocus(el, e, state, settings))
      el.addEventListener('blur', (e) => handleBlur(el, e, state, settings))
    })
  }

  function handleMouseEnter(el: HTMLElement, _event: MouseEvent, state: ButtonState, config: Required<InteractionConfig>) {
    state.isHovered = true
    
    // Anticipation animation - slight grow before full scale
    gsap.timeline()
      .to(el, {
        scale: 1.02,
        duration: 0.1,
        ease: "power2.out"
      })
      .to(el, {
        scale: config.scale,
        duration: config.duration,
        ease: config.ease,
        transformOrigin: "center center"
      })
    
    // Add glow effect
    gsap.to(el, {
      boxShadow: `0 10px 30px rgba(201, 168, 76, 0.3)`,
      duration: 0.3,
      ease: "power2.out"
    })
    
    // Subtle vibration effect
    if (config.hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(10)
    }
  }

  function handleMouseLeave(el: HTMLElement, _event: MouseEvent, state: ButtonState, _config: Required<InteractionConfig>) {
    state.isHovered = false
    
    gsap.to(el, {
      scale: 1,
      x: 0,
      y: 0,
      boxShadow: "0 0 0 rgba(201, 168, 76, 0)",
      duration: 0.4,
      ease: "elastic.out(1, 0.6)"
    })
  }

  function handleMouseMove(el: HTMLElement, event: MouseEvent, state: ButtonState, config: Required<InteractionConfig>) {
    if (!state.isHovered) return
    
    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const maxDistance = Math.sqrt(rect.width ** 2 + rect.height ** 2) / 2
    
    const deltaX = (event.clientX - centerX) / maxDistance
    const deltaY = (event.clientY - centerY) / maxDistance
    
    // Magnetic pull effect
    gsap.to(el, {
      x: deltaX * config.magneticStrength * 20,
      y: deltaY * config.magneticStrength * 20,
      rotationX: -deltaY * 5,
      rotationY: deltaX * 5,
      duration: 0.3,
      ease: "power3.out"
    })
  }

  function handleMouseDown(el: HTMLElement, event: MouseEvent, state: ButtonState, config: Required<InteractionConfig>) {
    state.isPressed = true
    
    // Press animation with bounce
    gsap.to(el, {
      scale: config.scale * 0.95,
      duration: 0.1,
      ease: "power2.in"
    })
    
    // Create ripple effect
    createRipple(el, event.clientX, event.clientY, state, config)
    
    if (config.hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(15)
    }
  }

  function handleMouseUp(el: HTMLElement, _event: MouseEvent, state: ButtonState, config: Required<InteractionConfig>) {
    state.isPressed = false
    
    gsap.to(el, {
      scale: state.isHovered ? config.scale : 1,
      duration: 0.2,
      ease: "back.out(2)"
    })
  }

  function handleTouchStart(el: HTMLElement, event: TouchEvent, state: ButtonState, config: Required<InteractionConfig>) {
    const touch = event.touches[0]
    if (!touch) return
    
    state.isPressed = true
    
    gsap.to(el, {
      scale: config.scale * 0.95,
      duration: 0.1,
      ease: "power2.in"
    })
    
    createRipple(el, touch.clientX, touch.clientY, state, config)
    
    if (config.hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(20)
    }
  }

  function handleTouchEnd(el: HTMLElement, _event: TouchEvent, state: ButtonState, _config: Required<InteractionConfig>) {
    state.isPressed = false
    
    gsap.to(el, {
      scale: 1,
      duration: 0.3,
      ease: "elastic.out(1, 0.7)"
    })
  }

  function handleFocus(el: HTMLElement, _event: FocusEvent, _state: ButtonState, _config: Required<InteractionConfig>) {
    // Accessibility-focused animation
    gsap.to(el, {
      scale: 1.02,
      boxShadow: `0 0 0 3px rgba(201, 168, 76, 0.4)`,
      duration: 0.2,
      ease: "power2.out"
    })
  }

  function handleBlur(el: HTMLElement, _event: FocusEvent, state: ButtonState, _config: Required<InteractionConfig>) {
    if (!state.isHovered) {
      gsap.to(el, {
        scale: 1,
        boxShadow: "0 0 0 rgba(201, 168, 76, 0)",
        duration: 0.2,
        ease: "power2.out"
      })
    }
  }

  function createRipple(el: HTMLElement, x: number, y: number, state: ButtonState, config: Required<InteractionConfig>) {
    const rect = el.getBoundingClientRect()
    const ripple = document.createElement('div')
    const size = Math.max(rect.width, rect.height) * 2
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${config.rippleColor};
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%) scale(0);
      left: ${x - rect.left}px;
      top: ${y - rect.top}px;
      z-index: 1;
    `
    
    // Ensure element has relative positioning
    if (getComputedStyle(el).position === 'static') {
      el.style.position = 'relative'
    }
    
    el.style.overflow = 'hidden'
    el.appendChild(ripple)
    state.ripples.push(ripple)
    
    // Animate ripple
    gsap.to(ripple, {
      scale: 1,
      duration: 0.6,
      ease: "power2.out"
    })
    
    gsap.to(ripple, {
      opacity: 0,
      duration: 0.4,
      delay: 0.2,
      ease: "power2.out",
      onComplete: () => {
        ripple.remove()
        const index = state.ripples.indexOf(ripple)
        if (index > -1) {
          state.ripples.splice(index, 1)
        }
      }
    })
  }

  // Advanced hover effects for cards and images
  function addCardInteractions(selector: string, intensity = 1) {
    const cards = document.querySelectorAll(selector)
    
    cards.forEach(card => {
      const el = card as HTMLElement
      let isHovered = false
      
      el.addEventListener('mouseenter', () => {
        isHovered = true
        
        gsap.to(el, {
          y: -10 * intensity,
          scale: 1.02 * intensity,
          rotationX: 5,
          boxShadow: `0 20px 40px rgba(0, 0, 0, 0.2)`,
          duration: 0.4,
          ease: "power3.out",
          transformOrigin: "center center"
        })
      })
      
      el.addEventListener('mouseleave', () => {
        isHovered = false
        
        gsap.to(el, {
          y: 0,
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
          duration: 0.6,
          ease: "elastic.out(1, 0.6)"
        })
      })
      
      el.addEventListener('mousemove', (e) => {
        if (!isHovered) return
        
        const rect = el.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const rotateY = ((e.clientX - centerX) / rect.width) * 20 * intensity
        const rotateX = -((e.clientY - centerY) / rect.height) * 20 * intensity
        
        gsap.to(el, {
          rotationY: rotateY,
          rotationX: rotateX,
          duration: 0.3,
          ease: "power2.out"
        })
      })
    })
  }

  // Form input enhancements
  function addInputInteractions(selector: string) {
    const inputs = document.querySelectorAll(selector)
    
    inputs.forEach(input => {
      const el = input as HTMLInputElement
      
      el.addEventListener('focus', () => {
        gsap.to(el, {
          scale: 1.02,
          borderColor: "#c9a84c",
          boxShadow: "0 0 20px rgba(201, 168, 76, 0.3)",
          duration: 0.2,
          ease: "power2.out"
        })
      })
      
      el.addEventListener('blur', () => {
        gsap.to(el, {
          scale: 1,
          borderColor: "",
          boxShadow: "0 0 0 rgba(201, 168, 76, 0)",
          duration: 0.3,
          ease: "power2.out"
        })
      })
      
      // Typing animation
      el.addEventListener('input', () => {
        gsap.fromTo(el, 
          { scale: 1.02 },
          { scale: 1.01, duration: 0.1, ease: "power2.out" }
        )
      })
    })
  }

  // Auto-initialize common interactions
  function initializeAutoInteractions() {
    // Wait for DOM to be ready
    setTimeout(() => {
      // Auto-detect and enhance interactive elements
      addButtonInteractions('button, .btn, .button, [role="button"]')
      addCardInteractions('.card, .art-item, .show-card')
      addInputInteractions('input, textarea, select')
    }, 100)
  }

  // Performance monitoring
  function optimizeForDevice() {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    const isSlowConnection = connection && (connection.effectiveType === '2g' || connection.saveData)
    
    if (isSlowConnection) {
      // Reduce animation complexity for slow connections
      return {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out",
        magneticStrength: 0.1,
        rippleColor: "rgba(201, 168, 76, 0.2)",
        hapticFeedback: false
      }
    }
    
    return {
      scale: 1.05,
      duration: 0.3,
      ease: "back.out(1.7)",
      magneticStrength: 0.2,
      rippleColor: "rgba(201, 168, 76, 0.3)",
      hapticFeedback: true
    }
  }

  return {
    addButtonInteractions,
    addCardInteractions,
    addInputInteractions,
    createRipple,
    optimizeForDevice,
    cleanup
  }
}