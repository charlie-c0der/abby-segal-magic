<script setup lang="ts">
/**
 * Mobile Atmosphere - Lightweight alternative to FloatingCards
 * Creates subtle magical atmosphere optimized for touch devices
 */
import { onMounted, onUnmounted, ref } from 'vue'

const scrollY = ref(0)
const isVisible = ref(false)

function onScroll() {
  scrollY.value = window.scrollY
}

onMounted(() => {
  // Only show on mobile/touch devices
  const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  if (!isMobile) return
  
  isVisible.value = true
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div v-if="isVisible" class="mobile-atmosphere" aria-hidden="true">
    <!-- Subtle geometric patterns that move with scroll -->
    <div 
      class="atmosphere-element atmosphere-element--1"
      :style="{ transform: `translateY(${-scrollY * 0.1}px)` }"
    />
    <div 
      class="atmosphere-element atmosphere-element--2"
      :style="{ transform: `translateY(${-scrollY * 0.05}px) rotate(${scrollY * 0.02}deg)` }"
    />
    <div 
      class="atmosphere-element atmosphere-element--3"
      :style="{ transform: `translateY(${-scrollY * 0.15}px)` }"
    />
    
    <!-- Animated dots -->
    <div class="atmosphere-dots">
      <span v-for="n in 8" :key="n" class="atmosphere-dot" :style="{
        left: (n * 12) + '%',
        top: (n * 8) + '%',
        animationDelay: (n * 0.3) + 's'
      }" />
    </div>
  </div>
</template>

<style scoped>
.mobile-atmosphere {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  opacity: 0.4;
}

.atmosphere-element {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201, 168, 76, 0.03), transparent 70%);
}

.atmosphere-element--1 {
  width: 200px;
  height: 200px;
  top: 10%;
  right: 5%;
  background: radial-gradient(circle, rgba(141, 59, 120, 0.04), transparent 70%);
}

.atmosphere-element--2 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 10%;
}

.atmosphere-element--3 {
  width: 120px;
  height: 120px;
  top: 60%;
  right: 15%;
  background: radial-gradient(circle, rgba(141, 59, 120, 0.03), transparent 70%);
}

.atmosphere-dots {
  position: absolute;
  inset: 0;
}

.atmosphere-dot {
  position: absolute;
  width: 2px;
  height: 2px;
  background: #8D3B78;
  border-radius: 50%;
  opacity: 0;
  animation: dotPulse 4s ease-in-out infinite;
  box-shadow: 0 0 6px #8D3B78;
}

.atmosphere-dot:nth-child(even) {
  background: #c9a84c;
  box-shadow: 0 0 6px #c9a84c;
}

@keyframes dotPulse {
  0%, 100% { 
    opacity: 0; 
    transform: scale(0.5); 
  }
  50% { 
    opacity: 0.6; 
    transform: scale(1.2); 
  }
}

/* Performance optimization */
.atmosphere-element,
.atmosphere-dot {
  will-change: transform;
}
</style>