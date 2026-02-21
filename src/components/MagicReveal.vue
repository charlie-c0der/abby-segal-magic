<script setup lang="ts">
/**
 * MagicReveal - An "impossible" scroll effect.
 * Text appears to materialize from smoke/particles,
 * like a magician revealing a word from thin air.
 */
import { ref, onMounted } from 'vue'

const props = defineProps<{
  text: string
  tag?: string
}>()

const revealed = ref(false)
const el = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!el.value) return
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry?.isIntersecting) {
        revealed.value = true
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.5 }
  )
  observer.observe(el.value)
})
</script>

<template>
  <component :is="tag || 'span'" ref="el" :class="['magic-reveal', { revealed }]">
    <span class="magic-reveal__smoke" />
    <span class="magic-reveal__text">
      <span
        v-for="(char, i) in text.split('')"
        :key="i"
        class="magic-reveal__char"
        :style="{ transitionDelay: (i * 0.04 + 0.3) + 's' }"
      >{{ char === ' ' ? '\u00A0' : char }}</span>
    </span>
  </component>
</template>

<style scoped>
.magic-reveal {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.magic-reveal__smoke {
  position: absolute;
  inset: -20px;
  background: radial-gradient(ellipse at center,
    rgba(201, 168, 76, 0.15) 0%,
    rgba(201, 168, 76, 0.05) 40%,
    transparent 70%
  );
  opacity: 0;
  filter: blur(20px);
  transition: opacity 0.8s ease-out;
  pointer-events: none;
}

.magic-reveal.revealed .magic-reveal__smoke {
  animation: smokeReveal 1.5s ease-out forwards;
}

@keyframes smokeReveal {
  0% { opacity: 0; transform: scale(0.5); }
  30% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0; transform: scale(2); }
}

.magic-reveal__text {
  position: relative;
  z-index: 1;
}

.magic-reveal__char {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px) scale(0.8);
  filter: blur(8px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.magic-reveal.revealed .magic-reveal__char {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}
</style>
