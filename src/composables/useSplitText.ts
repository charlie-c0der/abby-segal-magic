/**
 * Split Text Animation - Characters animate in staggered from below.
 * Pure CSS/JS implementation (no GSAP SplitText dependency).
 */
import { onMounted, nextTick } from 'vue'

export function useSplitText() {
  onMounted(async () => {
    await nextTick()

    document.querySelectorAll('[data-split]').forEach((el) => {
      const text = el.textContent || ''
      const delay = parseFloat(el.getAttribute('data-split-delay') || '0')
      el.innerHTML = ''
      el.classList.add('split-text')

      // Split into words, then chars
      const words = text.split(/\s+/)
      words.forEach((word, wi) => {
        const wordSpan = document.createElement('span')
        wordSpan.className = 'split-word'

        word.split('').forEach((char, ci) => {
          const charSpan = document.createElement('span')
          charSpan.className = 'split-char'
          charSpan.textContent = char
          charSpan.style.transitionDelay = `${delay + (wi * word.length + ci) * 0.03}s`
          wordSpan.appendChild(charSpan)
        })

        el.appendChild(wordSpan)

        // Add space between words
        if (wi < words.length - 1) {
          const space = document.createElement('span')
          space.className = 'split-word'
          space.innerHTML = '&nbsp;'
          el.appendChild(space)
        }
      })

      // Trigger animation via IntersectionObserver
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (entry?.isIntersecting) {
            el.classList.add('split-visible')
            observer.unobserve(el)
          }
        },
        { threshold: 0.3 }
      )
      observer.observe(el)
    })
  })
}
