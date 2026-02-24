<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const scrolled = ref(false)
const menuOpen = ref(false)
const router = useRouter()

const links = [
  { label: 'About', to: '/about' },
  { label: 'Shows', to: '/shows' },
  { label: 'Press', to: '/press' },
  { label: 'Art', to: '/art' },
  { label: 'Contact', to: '/contact' },
]

function handleScroll() {
  scrolled.value = window.scrollY > 40
}

function navigate(to: string) {
  menuOpen.value = false
  router.push(to)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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

      <button class="nav__burger" @click="menuOpen = !menuOpen" :aria-label="menuOpen ? 'Close menu' : 'Open menu'">
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
.nav--scrolled {
  padding: 16px 0;
  background: rgba(5, 5, 5, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--black-border);
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
  font-size: 22px;
  font-weight: 700;
  color: var(--white);
  letter-spacing: -0.01em;
}
.nav__logo-sub {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 400;
  font-style: italic;
  color: var(--gold);
}
.nav__links {
  display: flex;
  gap: 36px;
}
.nav__link {
  font-size: 13px;
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
  background: var(--rose);
  transition: width 0.3s var(--ease-out);
}
.nav__link:hover,
.nav__link--active {
  color: var(--rose);
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
  padding: 8px;
}
.nav__burger-line {
  display: block;
  width: 24px;
  height: 1.5px;
  background: var(--white);
  transition: all 0.3s var(--ease-out);
}
.nav__burger-line.open:first-child {
  transform: rotate(45deg) translate(3px, 3px);
}
.nav__burger-line.open:last-child {
  transform: rotate(-45deg) translate(3px, -3px);
}

/* Mobile Menu */
.nav__mobile {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--black);
  border-bottom: 1px solid var(--black-border);
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}
.nav__mobile-link {
  font-family: var(--font-display);
  font-size: 24px;
  color: var(--white-dim);
  cursor: pointer;
  transition: color 0.3s;
}
.nav__mobile-link:hover { color: var(--gold); }
.nav__mobile-link--cta { color: var(--gold); }

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
  background: var(--rose);
  color: var(--white);
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
}
</style>
