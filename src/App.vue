<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import NavBar from './components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'
import FloatingCards from './components/FloatingCards.vue'
import Preloader from './components/Preloader.vue'
import BackToTop from './components/BackToTop.vue'
import { useMagicCursor } from './composables/useMagicCursor'
import Lenis from 'lenis'

const { cursorX, cursorY, cursorScale, cursorVisible } = useMagicCursor()

const showPreloader = ref(true)
const siteReady = ref(false)

let lenis: Lenis | null = null
let rafId = 0

function onPreloaderDone() {
  showPreloader.value = false
  siteReady.value = true
}

onMounted(() => {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  })

  function raf(time: number) {
    lenis?.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  lenis?.destroy()
})

// Easter egg - Konami code triggers a card cascade
const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
const konamiIndex = ref(0)
const showEasterEgg = ref(false)

function onKeydown(e: KeyboardEvent) {
  if (e.key === konamiCode[konamiIndex.value]) {
    konamiIndex.value++
    if (konamiIndex.value === konamiCode.length) {
      konamiIndex.value = 0
      triggerCardCascade()
    }
  } else {
    konamiIndex.value = 0
  }
}

function triggerCardCascade() {
  showEasterEgg.value = true
  setTimeout(() => { showEasterEgg.value = false }, 4000)
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <!-- Preloader -->
  <Preloader v-if="showPreloader" @done="onPreloaderDone" />

  <div class="grain" />

  <!-- Floating Cards (atmospheric) -->
  <FloatingCards />

  <!-- Custom Cursor -->
  <div
    class="custom-cursor"
    :style="{
      left: cursorX + 'px',
      top: cursorY + 'px',
      transform: `translate(-50%, -50%) scale(${cursorScale})`,
      opacity: cursorVisible ? 1 : 0,
    }"
  />
  <div
    class="custom-cursor--dot"
    :style="{
      left: cursorX + 'px',
      top: cursorY + 'px',
      transform: 'translate(-50%, -50%)',
      opacity: cursorVisible ? 1 : 0,
    }"
  />

  <div :class="['site-wrapper', { ready: siteReady }]">
    <NavBar />
    <main id="main-content">
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition as string || 'magic'" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
    <FooterSection />
    <BackToTop />
  </div>

  <!-- Easter Egg: Konami Code Card Cascade -->
  <Teleport to="body">
    <div v-if="showEasterEgg" class="easter-egg">
      <div
        v-for="n in 30"
        :key="n"
        class="easter-card"
        :style="{
          left: Math.random() * 100 + 'vw',
          animationDelay: Math.random() * 1.5 + 's',
          animationDuration: (2 + Math.random() * 2) + 's',
          '--rot': (Math.random() * 720 - 360) + 'deg',
        }"
      >
        <span>{{ ['♠','♥','♦','♣'][n % 4] }}</span>
      </div>
    </div>
  </Teleport>
</template>

<style>
body { cursor: none; }
@media (max-width: 768px) { body { cursor: auto; } }

.site-wrapper {
  opacity: 0;
  transition: opacity 0.6s ease-out;
}
.site-wrapper.ready {
  opacity: 1;
}

/* ── Magic Page Transitions ──────────── */
.magic-enter-active {
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              filter 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.magic-leave-active {
  transition: opacity 0.4s cubic-bezier(0.65, 0, 0.35, 1),
              transform 0.4s cubic-bezier(0.65, 0, 0.35, 1),
              filter 0.4s cubic-bezier(0.65, 0, 0.35, 1);
}
.magic-enter-from {
  opacity: 0;
  transform: scale(0.97) translateY(20px);
  filter: blur(6px);
}
.magic-leave-to {
  opacity: 0;
  transform: scale(1.02) translateY(-10px);
  filter: blur(4px);
}

/* ── Easter Egg Card Cascade ─────────── */
.easter-egg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 99999;
  overflow: hidden;
}
.easter-card {
  position: absolute;
  top: -80px;
  width: 50px;
  height: 72px;
  background: rgba(245, 240, 232, 0.9);
  border-radius: 4px;
  border: 1px solid rgba(201, 168, 76, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  animation: cardFall linear forwards;
}
.easter-card span {
  color: #111;
}
.easter-card:nth-child(4n+1) span,
.easter-card:nth-child(4n+2) span {
  color: #c0392b;
}

@keyframes cardFall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translateY(110vh) rotate(var(--rot, 360deg));
    opacity: 0;
  }
}
</style>
