<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { NAV_LINKS } from '../constants/navigation'

const scrolled = ref(false)
const menuOpen = ref(false)
const router = useRouter()

const links = NAV_LINKS.map(link => ({ label: link.label, to: link.path }))

function handleScroll() {
  scrolled.value = window.scrollY > 40
}

function navigate(to: string) {
  // Haptic feedback on supported devices
  if ('vibrate' in navigator) {
    navigator.vibrate(10)
  }
  
  menuOpen.value = false
  router.push(to)
}

function toggleMenu() {
  // Haptic feedback for menu toggle
  if ('vibrate' in navigator) {
    navigator.vibrate(menuOpen.value ? 10 : 20)
  }
  
  menuOpen.value = !menuOpen.value
}

// Watch for menu state changes to handle body scroll lock
watch(menuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
    // Stop Lenis smooth scroll if available
    if (window.lenis) window.lenis.stop()
  } else {
    document.body.style.overflow = ''
    // Restart Lenis smooth scroll if available
    if (window.lenis) window.lenis.start()
  }
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  // Clean up body style on unmount
  document.body.style.overflow = ''
})
</script>

<template>
  <a href="#main-content" class="skip-nav">Skip to main content</a>
  <nav :class="['nav', { 'nav--scrolled': scrolled, 'nav--open': menuOpen }]">
    <div class="nav__inner container">
      <router-link to="/" class="nav__logo" @click="menuOpen = false">
        <span class="nav__logo-text">Abby Segal</span>
        <span class="nav__logo-sub shimmer">Magic</span>
      </router-link>

      <div class="nav__links hide-mobile">
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav__link"
          active-class="nav__link--active"
        >
          {{ link.label }}
        </router-link>
      </div>

      <router-link to="/contact" class="btn hide-mobile">
        <span>Book a Show</span>
      </router-link>

      <button class="nav__burger" @click="toggleMenu" :aria-label="menuOpen ? 'Close menu' : 'Open menu'">
        <span :class="['nav__burger-line', { open: menuOpen }]" />
        <span :class="['nav__burger-line', { open: menuOpen }]" />
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition name="menu">
      <div v-if="menuOpen" class="nav__mobile">
        <a
          v-for="link in links"
          :key="link.to"
          class="nav__mobile-link"
          @click="navigate(link.to)"
        >
          {{ link.label }}
        </a>
        <a class="nav__mobile-link nav__mobile-link--cta" @click="navigate('/contact')">
          Book a Show →
        </a>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 24px 0;
  transition: all 0.4s var(--ease-out);
  background: transparent;
}
.nav--scrolled:not(.nav--open) {
  padding: 16px 0;
  background: rgba(9, 9, 14, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--ember);
}
.nav--scrolled.nav--open {
  padding: 16px 0;
  background: rgba(9, 9, 14, 0.92);
  border-bottom: 1px solid var(--ember);
}
.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav__logo {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.nav__logo-text {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 800;
  color: var(--ivory);
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
.nav__logo-sub {
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 400;
  font-style: normal;
  color: var(--gold);
  letter-spacing: 0.2em;
  text-transform: uppercase;
}
.nav__links {
  display: flex;
  gap: 36px;
}
.nav__link {
  font-size: var(--text-nav);
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--white-dim);
  transition: color 0.3s;
  position: relative;
}
.nav__link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--plum);
  transition: width 0.3s var(--ease-out);
}
.nav__link:hover,
.nav__link--active {
  color: var(--plum);
}
.nav__link--active::after,
.nav__link:hover::after {
  width: 100%;
}

/* Burger */
.nav__burger {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 12px;
  min-width: 44px;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 101;
  -webkit-tap-highlight-color: rgba(141, 59, 120, 0.1);
}
.nav__burger-line {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--ivory);
  transition: all 0.3s var(--ease-out);
  border-radius: 1px;
}
.nav__burger-line.open:first-child {
  transform: rotate(45deg) translate(4px, 4px);
}
.nav__burger-line.open:last-child {
  transform: rotate(-45deg) translate(4px, -4px);
}

/* Mobile Menu */
.nav__mobile {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--void);
  z-index: 99;
  padding: 80px 0 32px 0; /* Top padding accounts for nav height */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.nav__mobile-link {
  font-family: var(--font-display);
  font-size: var(--text-card-title);
  color: var(--white-dim);
  cursor: pointer;
  transition: color 0.3s;
  padding: 12px 24px;
  text-align: center;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  -webkit-tap-highlight-color: rgba(141, 59, 120, 0.1);
}
.nav__mobile-link:hover, 
.nav__mobile-link:active { 
  color: var(--gold); 
}
.nav__mobile-link--cta { 
  color: var(--gold);
  font-weight: 600;
  margin-top: 16px;
}

.menu-enter-active, .menu-leave-active {
  transition: all 0.3s var(--ease-out);
}
.menu-enter-from, .menu-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

.skip-nav {
  position: absolute;
  top: -40px;
  left: 1rem;
  background: var(--plum);
  color: var(--ivory);
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: var(--radius-sm);
  font-weight: 600;
  z-index: 10000;
  transition: top 0.3s ease;
}

.skip-nav:focus {
  top: 1rem;
}

@media (max-width: 768px) {
  .nav__burger { display: flex; }
  
  .nav {
    padding: 16px 0;
  }
  
  .nav--scrolled {
    padding: 12px 0;
  }
  
  .nav__inner {
    padding: 0 clamp(16px, 4vw, 24px);
  }
  
  .nav__logo-text {
    font-size: 18px;
  }
  
  .nav__logo-sub {
    font-size: 11px;
  }
}
</style>
