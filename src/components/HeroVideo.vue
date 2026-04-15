<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const videoRef = ref<HTMLVideoElement | null>(null)
const showVideo = ref(false)

function isMobile(): boolean {
  return window.matchMedia('(max-width: 768px)').matches
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function isSlowConnection(): boolean {
  type NavigatorWithConnection = Navigator & {
    connection?: { effectiveType?: string; saveData?: boolean }
  }
  const conn = (navigator as NavigatorWithConnection).connection
  if (!conn) return false
  if (conn.saveData) return true
  const slow = ['slow-2g', '2g', '3g']
  return !!conn.effectiveType && slow.includes(conn.effectiveType)
}

function handlePlayFailure() {
  // Autoplay was blocked — keep poster visible, hide video
  showVideo.value = false
}

onMounted(() => {
  if (isMobile() || prefersReducedMotion() || isSlowConnection()) {
    return
  }
  showVideo.value = true
  // Once Vue paints the <video>, try to play
  requestAnimationFrame(() => {
    const v = videoRef.value
    if (!v) return
    const promise = v.play()
    if (promise && typeof promise.catch === 'function') {
      promise.catch(handlePlayFailure)
    }
  })
})

onUnmounted(() => {
  const v = videoRef.value
  if (v) {
    v.pause()
    v.removeAttribute('src')
    v.load()
  }
})
</script>

<template>
  <div class="hero-video">
    <video
      v-if="showVideo"
      ref="videoRef"
      class="hero-video__media"
      autoplay
      loop
      muted
      playsinline
      preload="metadata"
      poster="/assets/hero/hero-poster.webp"
      aria-hidden="true"
    >
      <source src="/assets/hero/hero-loop.webm" type="video/webm" />
      <source src="/assets/hero/hero-loop.mp4" type="video/mp4" />
    </video>
    <img
      v-else
      class="hero-video__media hero-video__fallback"
      src="/assets/hero/hero-poster.webp"
      alt=""
      aria-hidden="true"
      decoding="async"
    />
  </div>
</template>

<style scoped>
.hero-video {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  background: #000;
}
.hero-video__media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.22;
  filter: grayscale(40%) sepia(15%);
}
</style>
