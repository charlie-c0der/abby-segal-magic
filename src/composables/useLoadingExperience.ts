/**
 * Advanced Loading Experience - Magical progress-driven reveals
 * Creates an engaging, story-driven loading sequence that feels like part of the magic show
 */
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

interface LoadingConfig {
  duration?: number
  showProgress?: boolean
  enableParticles?: boolean
  enableSounds?: boolean
  customMessages?: string[]
  skipAfterFirstVisit?: boolean
}

interface LoadingState {
  progress: number
  currentMessage: string
  isComplete: boolean
  hasStarted: boolean
  firstTimeVisitor: boolean
}

export function useLoadingExperience(config: LoadingConfig = {}) {
  const state = ref<LoadingState>({
    progress: 0,
    currentMessage: '',
    isComplete: false,
    hasStarted: false,
    firstTimeVisitor: true
  })
  
  const defaultConfig: Required<LoadingConfig> = {
    duration: 3000,
    showProgress: true,
    enableParticles: true,
    enableSounds: false,
    customMessages: [
      "Shuffling the deck...",
      "Preparing the magic...",
      "Setting the stage...",
      "Gathering enchantments...",
      "Ready for the show..."
    ],
    skipAfterFirstVisit: true
  }
  
  const settings = { ...defaultConfig, ...config }
  let loadingElement: HTMLElement | null = null
  let animationFrame: number = 0
  let startTime: number = 0
  
  onMounted(() => {
    checkFirstVisit()
    if (settings.skipAfterFirstVisit && !state.value.firstTimeVisitor) {
      state.value.isComplete = true
      return
    }
    initializeLoader()
  })

  function checkFirstVisit() {
    const hasVisited = localStorage.getItem('abby-magic-visited')
    if (!hasVisited) {
      localStorage.setItem('abby-magic-visited', Date.now().toString())
      state.value.firstTimeVisitor = true
    } else {
      state.value.firstTimeVisitor = false
    }
  }

  function createLoaderHTML(): string {
    return `
      <div class="magic-loader" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, 
          rgba(141, 59, 120, 0.98) 0%, 
          rgba(201, 168, 76, 0.98) 100%);
        z-index: 20000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(20px);
        overflow: hidden;
      ">
        <div class="loader-particles" style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        "></div>
        
        <div class="loader-content" style="
          text-align: center;
          z-index: 2;
          max-width: 400px;
          padding: 2rem;
        ">
          <div class="magic-circle" style="
            width: 120px;
            height: 120px;
            margin: 0 auto 2rem;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            position: relative;
            overflow: hidden;
          ">
            <div class="magic-wand" style="
              position: absolute;
              top: 50%;
              left: 50%;
              width: 60px;
              height: 4px;
              background: linear-gradient(90deg, #fff 0%, #c9a84c 100%);
              transform: translate(-50%, -50%) rotate(45deg);
              border-radius: 2px;
              box-shadow: 0 0 20px rgba(201, 168, 76, 0.8);
            ">
              <div class="wand-star" style="
                position: absolute;
                top: -8px;
                right: -8px;
                width: 20px;
                height: 20px;
                background: #c9a84c;
                clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
                box-shadow: 0 0 15px rgba(201, 168, 76, 0.9);
              "></div>
            </div>
          </div>
          
          <h2 style="
            color: white;
            font-size: 1.5rem;
            margin: 0 0 1rem;
            font-weight: 300;
            letter-spacing: 2px;
            opacity: 0.9;
          ">Abby Segal Magic</h2>
          
          <div class="loading-message" style="
            color: rgba(255, 255, 255, 0.8);
            font-size: 1rem;
            margin-bottom: 2rem;
            min-height: 24px;
          "></div>
          
          ${settings.showProgress ? `
            <div class="progress-container" style="
              width: 100%;
              height: 4px;
              background: rgba(255, 255, 255, 0.2);
              border-radius: 2px;
              overflow: hidden;
              margin-bottom: 1rem;
            ">
              <div class="progress-bar" style="
                width: 0%;
                height: 100%;
                background: linear-gradient(90deg, #fff 0%, #c9a84c 100%);
                border-radius: 2px;
                transition: width 0.3s ease;
                box-shadow: 0 0 10px rgba(201, 168, 76, 0.5);
              "></div>
            </div>
            <div class="progress-text" style="
              color: rgba(255, 255, 255, 0.6);
              font-size: 0.8rem;
              letter-spacing: 1px;
            ">0%</div>
          ` : ''}
        </div>
      </div>
    `
  }

  function initializeLoader() {
    // Create loader element
    const container = document.createElement('div')
    container.innerHTML = createLoaderHTML()
    loadingElement = container.firstElementChild as HTMLElement
    document.body.appendChild(loadingElement)
    
    // Initialize particles if enabled
    if (settings.enableParticles) {
      createParticles()
    }
    
    // Start animations
    startLoadingAnimations()
    
    // Begin loading sequence
    startLoadingSequence()
  }

  function createParticles() {
    const particlesContainer = loadingElement?.querySelector('.loader-particles') as HTMLElement
    if (!particlesContainer) return
    
    // Create floating particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div')
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.6 + 0.2});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
      `
      particlesContainer.appendChild(particle)
      
      // Animate particle
      gsap.to(particle, {
        y: "-=200px",
        x: `${(Math.random() - 0.5) * 100}px`,
        opacity: 0,
        scale: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 4 + 2,
        delay: Math.random() * 2,
        ease: "power2.out",
        repeat: -1,
        onRepeat: () => {
          gsap.set(particle, {
            y: 0,
            x: 0,
            opacity: Math.random() * 0.6 + 0.2,
            left: Math.random() * 100 + '%',
            top: '100%'
          })
        }
      })
    }
  }

  function startLoadingAnimations() {
    if (!loadingElement) return
    
    const circle = loadingElement.querySelector('.magic-circle') as HTMLElement
    const wand = loadingElement.querySelector('.magic-wand') as HTMLElement
    const star = loadingElement.querySelector('.wand-star') as HTMLElement
    const content = loadingElement.querySelector('.loader-content') as HTMLElement
    
    // Initial reveal animation
    gsap.fromTo(content, 
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.7)" }
    )
    
    // Wand rotation animation
    gsap.to(wand, {
      rotation: 405,
      duration: 2,
      repeat: -1,
      ease: "power2.inOut"
    })
    
    // Star sparkle animation
    gsap.to(star, {
      scale: 1.3,
      boxShadow: "0 0 25px rgba(201, 168, 76, 1)",
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })
    
    // Circle pulse
    gsap.to(circle, {
      borderColor: "rgba(255, 255, 255, 0.8)",
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })
  }

  function startLoadingSequence() {
    state.value.hasStarted = true
    startTime = Date.now()
    
    // Update progress and messages
    updateProgress()
  }

  function updateProgress() {
    if (state.value.isComplete) return
    
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / settings.duration, 1)
    
    state.value.progress = progress * 100
    
    // Update progress bar
    const progressBar = loadingElement?.querySelector('.progress-bar') as HTMLElement
    const progressText = loadingElement?.querySelector('.progress-text') as HTMLElement
    
    if (progressBar && settings.showProgress) {
      progressBar.style.width = `${progress * 100}%`
    }
    
    if (progressText && settings.showProgress) {
      progressText.textContent = `${Math.round(progress * 100)}%`
    }
    
    // Update message based on progress
    updateMessage(progress)
    
    if (progress >= 1) {
      completeLoading()
    } else {
      animationFrame = requestAnimationFrame(() => updateProgress())
    }
  }

  function updateMessage(progress: number) {
    const messageIndex = Math.floor(progress * settings.customMessages.length)
    const message = settings.customMessages[Math.min(messageIndex, settings.customMessages.length - 1)] || 'Loading...'
    
    if (message !== state.value.currentMessage) {
      state.value.currentMessage = message
      
      const messageElement = loadingElement?.querySelector('.loading-message') as HTMLElement | null
      if (messageElement) {
        // Fade out, change text, fade in
        gsap.to(messageElement, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          onComplete: () => {
            if (messageElement) messageElement.textContent = message
            gsap.to(messageElement, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: "back.out(1.7)"
            })
          }
        })
      }
    }
  }

  function completeLoading() {
    state.value.isComplete = true
    
    if (!loadingElement) return
    
    // Final sparkle burst
    createSparkles()
    
    // Fade out loader
    gsap.to(loadingElement, {
      opacity: 0,
      scale: 1.1,
      duration: 0.8,
      ease: "power3.in",
      onComplete: () => {
        if (loadingElement) {
          loadingElement.remove()
          loadingElement = null
        }
        
        // Trigger page reveal
        revealMainContent()
      }
    })
  }

  function createSparkles() {
    if (!loadingElement) return
    
    for (let i = 0; i < 20; i++) {
      const sparkle = document.createElement('div')
      sparkle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: #c9a84c;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 15px rgba(201, 168, 76, 0.8);
        z-index: 3;
      `
      loadingElement.appendChild(sparkle)
      
      const angle = (i / 20) * Math.PI * 2
      const distance = 100 + Math.random() * 50
      const duration = 0.8 + Math.random() * 0.4
      
      gsap.to(sparkle, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        opacity: 0,
        scale: Math.random() * 2 + 0.5,
        duration: duration,
        ease: "power3.out",
        onComplete: () => sparkle.remove()
      })
    }
  }

  function revealMainContent() {
    // Reveal page elements with staggered animation
    const elements = document.querySelectorAll('header, main, footer, .reveal')
    
    gsap.fromTo(elements,
      { 
        opacity: 0, 
        y: 30, 
        scale: 0.98 
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }
    )
  }

  // Skip loader (for testing or user preference)
  function skipLoader() {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
    }
    
    state.value.progress = 100
    state.value.isComplete = true
    completeLoading()
  }

  // Reset for new session
  function resetLoader() {
    state.value.progress = 0
    state.value.currentMessage = ''
    state.value.isComplete = false
    state.value.hasStarted = false
    
    if (loadingElement) {
      loadingElement.remove()
      loadingElement = null
    }
    
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
    }
  }

  return {
    state: state.value,
    skipLoader,
    resetLoader,
    isLoading: () => state.value.hasStarted && !state.value.isComplete
  }
}