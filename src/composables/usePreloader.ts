/**
 * Preloader - Dramatic intro sequence.
 * A playing card flips to reveal the site. Cinematic entrance.
 */
import { ref, onMounted } from 'vue'

const preloaderDone = ref(false)
const preloaderVisible = ref(true)

export function usePreloader() {
  function dismiss() {
    preloaderDone.value = true
    setTimeout(() => {
      preloaderVisible.value = false
    }, 1200)
  }

  onMounted(() => {
    // Auto-dismiss after the animation plays
    setTimeout(dismiss, 3200)
  })

  return { preloaderDone, preloaderVisible }
}
