<script setup lang="ts">
/**
 * Floating Playing Cards - 3D cards that drift across sections.
 * Creates a subtle "cards in the air" atmosphere.
 * Reacts to scroll position with parallax depth.
 */
import { onMounted, onUnmounted, ref } from 'vue'

interface FloatingCard {
  id: number
  suit: string
  value: string
  x: number
  y: number
  rotation: number
  rotateY: number
  scale: number
  speed: number
  opacity: number
  delay: number
}

const cards = ref<FloatingCard[]>([])
const scrollY = ref(0)

const suits = ['♠', '♥', '♦', '♣']
const values = ['A', '2', '3', '7', 'J', 'Q', 'K']

function generateCards(): FloatingCard[] {
  return Array.from({ length: 6 }, (_, i) => ({
    id: i,
    suit: suits[Math.floor(Math.random() * suits.length)]!,
    value: values[Math.floor(Math.random() * values.length)]!,
    x: 5 + Math.random() * 90,
    y: 10 + Math.random() * 80,
    rotation: -30 + Math.random() * 60,
    rotateY: Math.random() * 20 - 10,
    scale: 0.5 + Math.random() * 0.4,
    speed: 0.3 + Math.random() * 0.7,
    opacity: 0.04 + Math.random() * 0.06,
    delay: Math.random() * 5,
  }))
}

function onScroll() {
  scrollY.value = window.scrollY
}

onMounted(() => {
  // Skip on mobile / touch - saves GPU
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return
  // Skip if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  cards.value = generateCards()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="floating-cards" aria-hidden="true">
    <div
      v-for="card in cards"
      :key="card.id"
      class="fcard"
      :style="{
        left: card.x + '%',
        top: card.y + '%',
        opacity: card.opacity,
        transform: `
          translateY(${-scrollY * card.speed * 0.15}px)
          rotate(${card.rotation + Math.sin(Date.now() * 0.001 + card.delay) * 3}deg)
          rotateY(${card.rotateY}deg)
          scale(${card.scale})
        `,
        animationDelay: card.delay + 's',
      }"
    >
      <span class="fcard__corner">{{ card.value }}<br>{{ card.suit }}</span>
      <span class="fcard__center" :class="{
        'fcard__center--red': card.suit === '♥' || card.suit === '♦'
      }">{{ card.suit }}</span>
    </div>
  </div>
</template>

<style scoped>
.floating-cards {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.fcard {
  position: absolute;
  width: 80px;
  height: 115px;
  background: rgba(245, 237, 227, 0.02);
  border: 1px solid rgba(196, 132, 122, 0.05);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.1s linear;
  animation: fcardDrift 12s ease-in-out infinite alternate;
}

.fcard__corner {
  position: absolute;
  top: 5px;
  left: 7px;
  font-size: 9px;
  line-height: 1.1;
  color: rgba(196, 132, 122, 0.12);
  font-weight: 700;
}

.fcard__center {
  font-size: 28px;
  color: rgba(196, 132, 122, 0.06);
}

.fcard__center--red {
  color: rgba(196, 132, 122, 0.08);
}

@keyframes fcardDrift {
  0% { transform: translateY(0) rotate(var(--r, 0deg)); }
  100% { transform: translateY(-30px) rotate(calc(var(--r, 0deg) + 5deg)); }
}
</style>
