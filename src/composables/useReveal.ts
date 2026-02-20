/**
 * Intersection Observer composable for scroll-triggered reveal animations.
 */
import { onMounted, onUnmounted, ref } from 'vue'

export function useReveal(threshold = 0.15) {
  const observer = ref<IntersectionObserver | null>(null)

  onMounted(() => {
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.value?.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.value?.observe(el)
    })
  })

  onUnmounted(() => {
    observer.value?.disconnect()
  })
}
