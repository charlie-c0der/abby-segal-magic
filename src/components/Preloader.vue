<script setup lang="ts">
import { ref, onMounted } from 'vue'

const phase = ref(0) // 0=dark, 1=card appears, 2=card flips, 3=text reveals, 4=exit

const emit = defineEmits<{
  done: []
}>()

onMounted(() => {
  // Phase 1: Card appears (float up)
  setTimeout(() => { phase.value = 1 }, 400)
  // Phase 2: Card flips
  setTimeout(() => { phase.value = 2 }, 1200)
  // Phase 3: Text reveals
  setTimeout(() => { phase.value = 3 }, 2000)
  // Phase 4: Exit
  setTimeout(() => { phase.value = 4 }, 3000)
  // Remove from DOM
  setTimeout(() => { emit('done') }, 3800)
})
</script>

<template>
  <div :class="['preloader', { 'preloader--exit': phase >= 4 }]">
    <!-- Ambient particles -->
    <div class="preloader__particles">
      <span v-for="n in 20" :key="n" class="preloader__mote" :style="{
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        animationDelay: Math.random() * 3 + 's',
        animationDuration: (Math.random() * 3 + 4) + 's',
      }" />
    </div>

    <!-- Playing card -->
    <div :class="['preloader__card-wrap', {
      'phase-1': phase >= 1,
      'phase-2': phase >= 2,
      'phase-3': phase >= 3,
    }]">
      <div class="preloader__card">
        <!-- Back of card -->
        <div class="preloader__card-back">
          <div class="preloader__card-pattern">
            <div class="preloader__card-pattern-inner">✦</div>
          </div>
        </div>
        <!-- Front of card - Ace of Spades (Abby's signature) -->
        <div class="preloader__card-front">
          <span class="preloader__card-corner preloader__card-corner--tl">A<br>♠</span>
          <span class="preloader__card-suit">♠</span>
          <span class="preloader__card-corner preloader__card-corner--br">A<br>♠</span>
        </div>
      </div>
    </div>

    <!-- Text reveal -->
    <div :class="['preloader__text', { visible: phase >= 3 }]">
      <span class="preloader__name">Abby Segal</span>
      <span class="preloader__title">Magic</span>
    </div>
  </div>
</template>

<style scoped>
.preloader {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: #050505;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 40px;
  transition: opacity 0.8s cubic-bezier(0.65, 0, 0.35, 1),
              transform 0.8s cubic-bezier(0.65, 0, 0.35, 1);
}
.preloader--exit {
  opacity: 0;
  transform: scale(1.05);
  pointer-events: none;
}

/* Ambient floating motes */
.preloader__particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
}
.preloader__mote {
  position: absolute;
  width: 3px;
  height: 3px;
  background: #c4847a;
  border-radius: 50%;
  opacity: 0;
  animation: moteFloat linear infinite;
  box-shadow: 0 0 8px #c4847a;
}
.preloader__mote:nth-child(odd) {
  background: #c9a84c;
  box-shadow: 0 0 8px #c9a84c;
}
@keyframes moteFloat {
  0% { opacity: 0; transform: translateY(0) scale(0); }
  20% { opacity: 0.6; transform: translateY(-20px) scale(1); }
  80% { opacity: 0.3; transform: translateY(-80px) scale(0.8); }
  100% { opacity: 0; transform: translateY(-120px) scale(0); }
}

/* Card wrapper - controls position & flip */
.preloader__card-wrap {
  width: 140px;
  height: 200px;
  perspective: 1000px;
  opacity: 0;
  transform: translateY(60px) scale(0.8);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.preloader__card-wrap.phase-1 {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.preloader__card-wrap.phase-2 .preloader__card {
  transform: rotateY(180deg);
}
.preloader__card-wrap.phase-3 {
  transform: translateY(-20px) scale(0.9);
  opacity: 0.8;
}

/* Card - 3D flip */
.preloader__card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.preloader__card-back,
.preloader__card-front {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 16px;
  border: 1px solid rgba(196, 132, 122, 0.2);
}

/* Back - ornate pattern */
.preloader__card-back {
  background: linear-gradient(135deg, #1a1510 0%, #0a0a08 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.preloader__card-pattern {
  width: 80%;
  height: 85%;
  border: 1px solid rgba(196, 132, 122, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 8px,
    rgba(201, 168, 76, 0.03) 8px,
    rgba(201, 168, 76, 0.03) 9px
  );
}
.preloader__card-pattern-inner {
  font-size: 32px;
  color: rgba(201, 168, 76, 0.4);
  animation: symbolPulse 2s ease-in-out infinite;
}
@keyframes symbolPulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
}

/* Front - Ace of Spades */
.preloader__card-front {
  background: linear-gradient(135deg, #f5f0e8 0%, #e8e0d0 100%);
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
}
.preloader__card-suit {
  font-size: 72px;
  color: #111;
  line-height: 1;
}
.preloader__card-corner {
  position: absolute;
  font-size: 14px;
  line-height: 1.1;
  color: #111;
  font-weight: 700;
  text-align: center;
}
.preloader__card-corner--tl {
  top: 8px;
  left: 10px;
}
.preloader__card-corner--br {
  bottom: 8px;
  right: 10px;
  transform: rotate(180deg);
}

/* Text reveal */
.preloader__text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.preloader__text.visible {
  opacity: 1;
  transform: translateY(0);
}
.preloader__name {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 28px;
  font-weight: 700;
  color: #f5f0e8;
  letter-spacing: -0.01em;
}
.preloader__title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 16px;
  font-weight: 400;
  font-style: italic;
  color: #c4847a;
  letter-spacing: 0.1em;
}
</style>
