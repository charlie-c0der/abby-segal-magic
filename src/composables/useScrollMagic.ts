/**
 * Advanced Scroll Magic - Timeline-driven storytelling with physics-based reveals
 * Creates immersive, narrative-driven scroll experiences with parallax and morphing effects
 */
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollScene {
  trigger: string | Element
  start?: string
  end?: string
  scrub?: boolean | number
  pin?: boolean
  anticipation?: boolean
  magneticField?: boolean
}

interface RevealPattern {
  selector: string
  pattern: 'cascade' | 'spiral' | 'magnetic' | 'wave' | 'explosion' | 'typewriter'
  duration?: number
  stagger?: number
  ease?: string
}

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

  // Advanced reveal patterns
  function createRevealPattern(config: RevealPattern) {
    const elements = document.querySelectorAll(config.selector)
    if (!elements.length) return
    
    const duration = config.duration || 1.2
    const stagger = config.stagger || 0.1
    const ease = config.ease || "power3.out"
    
    switch (config.pattern) {
      case 'cascade':
        elements.forEach((el, i) => {
          gsap.set(el, { opacity: 0, y: 60, scale: 0.9 })
          const trigger = ScrollTrigger.create({
            trigger: el,
            start: "top 90%",
            onEnter: () => {
              gsap.to(el, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: duration,
                delay: i * stagger,
                ease: ease
              })
            }
          })
          scrollTriggers.value.push(trigger)
        })
        break
        
      case 'spiral':
        elements.forEach((el, i) => {
          gsap.set(el, { 
            opacity: 0, 
            scale: 0,
            rotation: 180,
            transformOrigin: "center center"
          })
          const trigger = ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            onEnter: () => {
              gsap.to(el, {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: duration,
                delay: i * stagger,
                ease: "back.out(1.7)"
              })
            }
          })
          scrollTriggers.value.push(trigger)
        })
        break
        
      case 'magnetic':
        elements.forEach((el, i) => {
          gsap.set(el, { 
            opacity: 0, 
            x: (i % 2 === 0 ? -100 : 100),
            y: 30,
            rotation: (i % 2 === 0 ? -15 : 15)
          })
          const trigger = ScrollTrigger.create({
            trigger: el,
            start: "top 90%",
            onEnter: () => {
              gsap.to(el, {
                opacity: 1,
                x: 0,
                y: 0,
                rotation: 0,
                duration: duration,
                delay: i * stagger,
                ease: "elastic.out(1, 0.6)"
              })
            }
          })
          scrollTriggers.value.push(trigger)
        })
        break
        
      case 'wave':
        const centerIndex = Math.floor(elements.length / 2)
        elements.forEach((el, i) => {
          const distance = Math.abs(i - centerIndex)
          gsap.set(el, { opacity: 0, y: 50 + distance * 20, scale: 0.8 })
          
          const trigger = ScrollTrigger.create({
            trigger: el,
            start: "top 90%",
            onEnter: () => {
              gsap.to(el, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: duration,
                delay: distance * stagger,
                ease: "power2.out"
              })
            }
          })
          scrollTriggers.value.push(trigger)
        })
        break
        
      case 'explosion':
        const container = elements[0]?.parentElement
        if (container) {
          const rect = container.getBoundingClientRect()
          const centerX = rect.width / 2
          const centerY = rect.height / 2
          
          elements.forEach((el, i) => {
            const elRect = (el as Element).getBoundingClientRect()
            const elX = elRect.left - rect.left + elRect.width / 2
            const elY = elRect.top - rect.top + elRect.height / 2
            const angle = Math.atan2(elY - centerY, elX - centerX)
            const distance = 200
            
            gsap.set(el, {
              opacity: 0,
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              scale: 0.5,
              rotation: angle * (180 / Math.PI)
            })
            
            const trigger = ScrollTrigger.create({
              trigger: container,
              start: "top 80%",
              onEnter: () => {
                gsap.to(el, {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotation: 0,
                  duration: duration,
                  delay: i * stagger,
                  ease: "back.out(2)"
                })
              }
            })
            scrollTriggers.value.push(trigger)
          })
        }
        break
        
      case 'typewriter':
        elements.forEach((el) => {
          const text = (el as Element).textContent || ''
          const chars = text.split('')
          ;(el as Element).innerHTML = chars.map(char => 
            `<span style="opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`
          ).join('')
          
          const spans = el.querySelectorAll('span')
          const trigger = ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            onEnter: () => {
              gsap.to(spans, {
                opacity: 1,
                duration: 0.05,
                stagger: 0.03,
                ease: "none"
              })
            }
          })
          scrollTriggers.value.push(trigger)
        })
        break
    }
  }

  // Parallax effects with physics
  function createParallax(selector: string, strength = 0.5, direction: 'vertical' | 'horizontal' = 'vertical') {
    const elements = document.querySelectorAll(selector)
    
    elements.forEach((element) => {
      const trigger = ScrollTrigger.create({
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress
          const movement = (progress - 0.5) * 100 * strength
          
          if (direction === 'vertical') {
            gsap.set(element, { y: movement })
          } else {
            gsap.set(element, { x: movement })
          }
        }
      })
      scrollTriggers.value.push(trigger)
    })
  }

  // Magnetic scroll fields - elements react to scroll proximity
  function createMagneticField(selector: string, strength = 30) {
    const elements = document.querySelectorAll(selector)
    
    elements.forEach((element) => {
      const trigger = ScrollTrigger.create({
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const centerPoint = 0.5
          const distance = Math.abs(progress - centerPoint)
          const maxDistance = 0.5
          const normalizedDistance = 1 - (distance / maxDistance)
          const magneticPull = normalizedDistance * strength
          
          // Apply magnetic effect
          gsap.to(element, {
            scale: 1 + (magneticPull * 0.01),
            y: progress < centerPoint ? magneticPull : -magneticPull,
            duration: 0.3,
            ease: "power2.out"
          })
        }
      })
      scrollTriggers.value.push(trigger)
    })
  }

  // Advanced scroll timeline for complex sequences
  function createScrollTimeline(config: ScrollScene, animations: (() => gsap.core.Timeline)[]) {
    const masterTimeline = gsap.timeline({ paused: true })
    
    animations.forEach(animationFn => {
      masterTimeline.add(animationFn())
    })
    
    const trigger = ScrollTrigger.create({
      trigger: config.trigger,
      start: config.start || "top center",
      end: config.end || "bottom center",
      scrub: config.scrub !== undefined ? config.scrub : false,
      pin: config.pin || false,
      anticipatePin: config.anticipation ? 1 : 0,
      onUpdate: (self) => {
        masterTimeline.progress(self.progress)
      }
    })
    
    scrollTriggers.value.push(trigger)
    return masterTimeline
  }

  // Smooth magnetic scrolling to element
  function magneticScrollTo(target: string | Element, duration = 1.5) {
    const element = typeof target === 'string' ? document.querySelector(target) : target
    if (!element) return
    
    // Create ripple effect at current scroll position
    const ripple = document.createElement('div')
    ripple.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, rgba(170, 136, 51, 0.4), transparent);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999;
      pointer-events: none;
    `
    document.body.appendChild(ripple)
    
    // Animate ripple and scroll
    const tl = gsap.timeline()
    tl.to(ripple, {
      scale: 100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .to(window, {
      scrollTo: { y: element, offsetY: -100 },
      duration: duration,
      ease: "power3.inOut"
    }, "-=0.4")
    .call(() => ripple.remove())
  }

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
    createRevealPattern,
    createParallax,
    createMagneticField,
    createScrollTimeline,
    magneticScrollTo,
    initPerformanceMode,
    isReducedMotion
  }
}