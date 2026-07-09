/**
 * Split Text Animation - Characters animate in staggered from below.
 * Pure CSS/JS implementation (no GSAP SplitText dependency).
 * Inline children (e.g. <span class="shimmer">) survive the split: their
 * classes are re-applied to the word spans built from their text.
 */
import { onMounted, onUnmounted, nextTick } from 'vue'

export function useSplitText() {
  const observers: IntersectionObserver[] = []

  onMounted(async () => {
    await nextTick()

    document.querySelectorAll('[data-split]').forEach((el) => {
      const delay = parseFloat(el.getAttribute('data-split-delay') || '0')

      // Tokenize per child node so inline element markup isn't lost.
      const tokens: { word: string; extraClass: string }[] = []
      el.childNodes.forEach((node) => {
        const extraClass = node instanceof HTMLElement ? node.className : ''
        const text = node.textContent || ''
        text
          .split(/\s+/)
          .filter(Boolean)
          .forEach((word) => tokens.push({ word, extraClass }))
      })

      // Screen readers get the intact sentence, not a run of char spans.
      el.setAttribute('aria-label', tokens.map((t) => t.word).join(' '))
      el.innerHTML = ''
      el.classList.add('split-text')

      let charIndex = 0
      tokens.forEach((token, wi) => {
        const wordSpan = document.createElement('span')
        wordSpan.className = 'split-word'
        wordSpan.setAttribute('aria-hidden', 'true')

        token.word.split('').forEach((char) => {
          const charSpan = document.createElement('span')
          // Inherited classes (e.g. .shimmer) go on the char, not the word:
          // background-clip:text won't paint through descendants that carry
          // their own transform, and .split-char is transformed.
          charSpan.className = token.extraClass ? `split-char ${token.extraClass}` : 'split-char'
          charSpan.textContent = char
          charSpan.style.transitionDelay = `${delay + charIndex * 0.03}s`
          charIndex++
          wordSpan.appendChild(charSpan)
        })

        el.appendChild(wordSpan)

        // Add space between words
        if (wi < tokens.length - 1) {
          const space = document.createElement('span')
          space.className = 'split-word'
          space.setAttribute('aria-hidden', 'true')
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
      observers.push(observer) // Track for cleanup
    })
  })

  onUnmounted(() => {
    observers.forEach(obs => obs.disconnect())
    observers.length = 0
  })
}
