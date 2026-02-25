<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

const handleScroll = () => {
  isVisible.value = window.scrollY > 400
}

const scrollToTop = () => {
  // Check if Lenis is available globally
  const lenis = (window as any).lenis
  if (lenis && lenis.scrollTo) {
    lenis.scrollTo(0, { duration: 1.5 })
  } else {
    // Fallback to native scroll (Lenis handles smooth behavior)
    window.scrollTo({ top: 0 })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition name="back-to-top">
    <button 
      v-if="isVisible"
      @click="scrollToTop"
      class="back-to-top"
      aria-label="Back to top"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 12L8 4M8 4L12 8M8 4L4 8"/>
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: var(--rose);
  border: 1px solid var(--rose);
  color: var(--white);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(196, 132, 122, 0.3);
}

.back-to-top:hover {
  background: var(--gold);
  border-color: var(--gold);
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(196, 146, 79, 0.4);
}

.back-to-top:focus {
  outline: 2px solid var(--gold);
  outline-offset: 2px;
}

.back-to-top svg {
  transition: transform 0.3s ease;
}

.back-to-top:hover svg {
  transform: translateY(-1px);
}

.back-to-top-enter-active {
  transition: all 0.3s ease;
}

.back-to-top-leave-active {
  transition: all 0.3s ease;
}

.back-to-top-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.back-to-top-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

@media (max-width: 768px) {
  .back-to-top {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 45px;
    height: 45px;
  }
}
</style>