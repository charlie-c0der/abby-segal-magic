<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { useReveal } from '../composables/useReveal'
import { useWorldClassSEO } from '../composables/useWorldClassSEO'
import { useStrategicLinking } from '../composables/useStrategicLinking'

useReveal()
// World-class SEO for Art Gallery page
useWorldClassSEO({
  title: 'Art Gallery | Magic-Themed Artwork by Chicago Magician Abby Segal',
  description: 'Browse original magic-themed artwork by Chicago magician Abby Segal. Collage, watercolor, and illustration exploring perception and illusion. Prints available on Etsy.',
  
  // Art-focused keywords with priority terms
  focusKeyphrases: [
    'Abby Segal magician artwork',
    'Chicago Magic performer art gallery',
    'sleight of hand artist portfolio',
    'Chicago entertainment performer art',
    'magician visual art Chicago'
  ],
  semanticKeywords: [
    'Abby Segal Chicago artist magician',
    'magic-themed artwork Chicago',
    'Chicago Magic performer visual art',
    'sleight of hand artist Chicago',
    'entertainment performer artwork',
    'Chicago magician art gallery',
    'close-up magic artist portfolio',
    'magic performance inspired art',
    'Chicago entertainment artist',
    'Abby Segal magic artwork'
  ],
  
  // Technical SEO
  ogImage: '/assets/art/images/art-sample-1.webp',
  ogType: 'article',
  canonicalUrl: '/art',
  priority: 0.7,
  changeFreq: 'monthly',
  
  // Performance optimization
  preloadImages: [
    '/assets/art/images/art-sample-1.webp',
    '/assets/art/images/art-sample-2.webp'
  ],
  prefetchLinks: [
    '/about',
    '/contact'
  ],
  
  contentType: 'gallery'
})

// Strategic linking for Art page
useStrategicLinking({
  enableAutolinking: true,
  maxLinksPerPage: 4,
  respectExistingLinks: true
})

const lightboxOpen = ref(false)
const lightboxImage = ref('')
const lightboxIndex = ref(0)
const lightboxRef = ref<HTMLElement | null>(null)

const etsyShopUrl = 'https://www.etsy.com/shop/AbbySegalArt'

// Touch gesture support for mobile
let startY = 0
let startTime = 0

function openLightbox(image: string, index: number) {
  lightboxImage.value = image
  lightboxIndex.value = index
  lightboxOpen.value = true
}

function navigateLightbox(direction: 'prev' | 'next') {
  const newIndex = direction === 'prev' 
    ? (lightboxIndex.value - 1 + artworks.length) % artworks.length
    : (lightboxIndex.value + 1) % artworks.length
  
  const artwork = artworks[newIndex]
  if (artwork) {
    lightboxImage.value = artwork.image
    lightboxIndex.value = newIndex
  }
}

function closeLightbox() {
  lightboxOpen.value = false
}

// Focus management for lightbox accessibility
watch(lightboxOpen, async (isOpen) => {
  if (isOpen) {
    await nextTick()
    lightboxRef.value?.focus()
    document.body.style.overflow = 'hidden'
    // Force cursor visibility in lightbox
    document.body.style.cursor = 'default'
    // Hide any custom cursor elements
    const customCursors = document.querySelectorAll('.custom-cursor, .custom-cursor--dot')
    customCursors.forEach(cursor => {
      (cursor as HTMLElement).style.opacity = '0'
    })
    // Hide magic cursor canvas if present
    const magicCanvas = document.querySelector('canvas[style*="pointer-events:none"]')
    if (magicCanvas) {
      (magicCanvas as HTMLElement).style.opacity = '0'
    }
  } else {
    document.body.style.overflow = ''
    document.body.style.cursor = ''
    // Restore custom cursor elements
    const customCursors = document.querySelectorAll('.custom-cursor, .custom-cursor--dot')
    customCursors.forEach(cursor => {
      (cursor as HTMLElement).style.opacity = ''
    })
    // Restore magic cursor canvas if present
    const magicCanvas = document.querySelector('canvas[style*="pointer-events:none"]')
    if (magicCanvas) {
      (magicCanvas as HTMLElement).style.opacity = ''
    }
  }
})

function onTouchStart(e: TouchEvent) {
  if (e.touches[0]) {
    startY = e.touches[0].clientY
    startTime = Date.now()
  }
}

function onTouchEnd(e: TouchEvent) {
  if (e.changedTouches[0]) {
    const endY = e.changedTouches[0].clientY
    const deltaY = endY - startY
    const deltaTime = Date.now() - startTime
    
    // Swipe down to close (minimum distance and reasonable speed)
    if (deltaY > 100 && deltaTime < 500) {
      closeLightbox()
    }
  }
}

// Placeholder gallery - replace with real images
const artworks = [
  { title: 'Borrowed Paper Collage', medium: 'Mixed media collage', year: '2023', image: '/assets/art/images/art-collage-1.webp', thumb: '/assets/art/images/art-collage-1-thumb.webp' },
  { title: 'Girls Looking Up, Waiting for Rain', medium: 'Mixed media', year: '2023', image: '/assets/art/images/art-girls.webp', thumb: '/assets/art/images/art-girls-thumb.webp' },
  { title: 'Tannes Magic Shop', medium: 'Digital illustration', year: '2024', image: '/assets/art/images/art-tannes.webp', thumb: '/assets/art/images/art-tannes-thumb.webp' },
  { title: 'Apply Lipstick', medium: 'Digital art', year: '2023', image: '/assets/art/images/art-lipstick.webp', thumb: '/assets/art/images/art-lipstick-thumb.webp' },
  { title: 'Abstract Shapes', medium: 'Mixed media', year: '2023', image: '/assets/art/images/art-shapes.webp', thumb: '/assets/art/images/art-shapes-thumb.webp' },
  { title: 'Mogul Men, Mountains, Humanity', medium: 'Mixed media collage', year: '2023', image: '/assets/art/images/art-mogul.webp', thumb: '/assets/art/images/art-mogul-thumb.webp' },
  { title: 'New to Prague', medium: 'Mixed media', year: '2022', image: '/assets/art/images/art-prague.webp', thumb: '/assets/art/images/art-prague-thumb.webp' },
  { title: 'Smoking or Don\'t', medium: 'Mixed media collage', year: '2023', image: '/assets/art/images/art-smoking.webp', thumb: '/assets/art/images/art-smoking-thumb.webp' },
  { title: 'Thinking Woman', medium: 'Mixed media', year: '2023', image: '/assets/art/images/art-thinking.webp', thumb: '/assets/art/images/art-thinking-thumb.webp' },
  { title: 'Hidden Poetry', medium: 'Found text collage', year: '2023', image: '/assets/art/images/art-poetry.webp', thumb: '/assets/art/images/art-poetry-thumb.webp' },
  { title: 'Trapped Eyes', medium: 'Mixed media', year: '2024', image: '/assets/art/images/art-eyes.webp', thumb: '/assets/art/images/art-eyes-thumb.webp' },
  { title: 'Stretched Girl', medium: 'Digital illustration', year: '2023', image: '/assets/art/images/art-stretched.webp', thumb: '/assets/art/images/art-stretched-thumb.webp' },
]
</script>

<template>
  <div class="art-page">
    <section class="section art-hero section--hero">
      <div class="container">
        <p class="heading-eyebrow reveal">Visual Art</p>
        <h1 class="heading-xl reveal reveal-delay-1">The other <em class="shimmer">medium.</em></h1>
        <div class="divider reveal reveal-delay-2" />
        <p class="body-lg reveal reveal-delay-3" style="max-width: 600px;">
          <em class="underline-sketch">Magic isn't Abby's only medium.</em> As a visual artist, she works in <em class="shimmer">collage,
          mixed media, and illustration</em> - creating pieces that explore <em class="underline-sketch">perception, identity, and the magic hidden in plain sight</em>. Her work has been
          exhibited at <em class="shimmer">Berlinskej Model in Prague</em>.
        </p>
      </div>
    </section>

    <!-- Art Gallery -->
    <section class="section gallery-main">
      <div class="container">
        <div class="art-gallery">
          <div
            v-for="(art, i) in artworks"
            :key="art.title"
            class="gallery-piece reveal magnetic-element"
            :class="`reveal-delay-${(i % 4) + 1}`"
            @click="openLightbox(art.image, i)"
            @keydown.enter="openLightbox(art.image, i)"
            @keydown.space.prevent="openLightbox(art.image, i)"
            tabindex="0"
            role="button"
            aria-label="View artwork"
          >
            <div class="gallery-piece__frame">
              <div class="gallery-piece__image">
                <img :src="art.thumb" alt="Artwork by Abby Segal" loading="lazy" decoding="async" />
              </div>
              <div class="gallery-piece__spotlight"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Take a Piece Home -->
    <section class="section take-home">
      <div class="container">
        <div class="take-home__content reveal">
          <div class="take-home__text">
            <h2 class="heading-md">Take a Piece Home</h2>
            <p class="body-lg">Original prints and artwork available on Etsy</p>
          </div>
          <a :href="etsyShopUrl" target="_blank" rel="noopener" class="btn btn--plum magical-button">
            <span>Visit Shop</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="position:relative;z-index:1"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Published Works -->
    <section class="section published-works">
      <div class="container">
        <div class="published-header reveal">
          <h2 class="heading-md reveal reveal-delay-1">Published Works</h2>
          <p class="body-lg reveal reveal-delay-2">
            <em class="shimmer">Shelly Shazam!</em> invites young readers to explore their own imagination and creativity by interacting with the world around them. Join Shelly as she discovers <em class="underline-sketch">the magic in coming up with her own ideas</em>. Available on <em class="shimmer">Amazon</em> and at The Magic Castle in Hollywood.
          </p>
          <a href="https://www.amazon.com/stores/author/B0C7NJG3JT/allbooks" target="_blank" rel="noopener" class="btn btn--filled reveal reveal-delay-3 magical-button">
            <span>View on Amazon</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="position:relative;z-index:1"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Enhanced Gallery Lightbox -->
    <Teleport to="body">
      <transition name="lightbox">
        <div 
          v-if="lightboxOpen" 
          class="gallery-lightbox" 
          @click.self="closeLightbox"
          @keydown.escape="closeLightbox"
          @keydown.arrow-left="navigateLightbox('prev')"
          @keydown.arrow-right="navigateLightbox('next')"
          @touchstart="onTouchStart"
          @touchend="onTouchEnd"
          role="dialog"
          aria-modal="true"
          aria-label="Viewing artwork"
          ref="lightboxRef"
          tabindex="-1"
        >
          <!-- Gallery Background -->
          <div class="gallery-lightbox__background">
            <div class="gallery-lightbox__ambient-light"></div>
          </div>
          
          <!-- Navigation -->
          <button 
            class="gallery-lightbox__nav gallery-lightbox__nav--prev" 
            @click="navigateLightbox('prev')"
            aria-label="Previous artwork"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          
          <button 
            class="gallery-lightbox__nav gallery-lightbox__nav--next" 
            @click="navigateLightbox('next')"
            aria-label="Next artwork"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
          
          <!-- Artwork Display -->
          <div class="gallery-lightbox__main">
            <div class="artwork-frame">
              <div class="artwork-spotlight"></div>
              <img :src="lightboxImage" alt="Artwork by Abby Segal" class="artwork-image" @click.stop />
            </div>
          </div>
          
          <!-- Close Button -->
          <button class="gallery-lightbox__close" @click="closeLightbox" aria-label="Close gallery">✕</button>
          
          <!-- Mobile Instructions -->
          <p class="gallery-lightbox__hint">Swipe down to close • Use arrow keys to navigate</p>
        </div>
      </transition>
    </Teleport>

    <!-- Commission section removed -->
  </div>
</template>

<style scoped>
.art-hero { padding-top: calc(var(--section-pad) + 80px); padding-bottom: 0; }
.art-hero h1 em, h2 em { color: var(--gold); font-style: normal; font-weight: 400; }

/* Artist statement removed for cleaner presentation */

/* ── Gallery Main ─────────────────── */
.gallery-main {
  background: var(--void);
  padding: 2rem 0;
}

/* Gallery header removed for cleaner presentation */

/* ── Gallery Pieces (Professional Art Presentation) ─────────────────── */
.art-gallery {
  columns: 3;
  column-gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.gallery-piece {
  break-inside: avoid;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.gallery-piece:hover {
  transform: translateY(-5px);
}

.gallery-piece__frame {
  position: relative;
  background: var(--ash);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border: 1px solid var(--ember);
}

.gallery-piece__frame:hover {
  box-shadow: 0 15px 50px rgba(201, 168, 76, 0.2);
}

.gallery-piece__image {
  position: relative;
  z-index: 2;
  border-radius: 4px;
  overflow: hidden;
}

.gallery-piece__image img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.gallery-piece:hover .gallery-piece__image img {
  transform: scale(1.02);
}

/* Gallery Spotlight Effect */
.gallery-piece__spotlight {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 30%, 
    rgba(201, 168, 76, 0.1) 0%, 
    transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  cursor: inherit;
  z-index: 1;
}

.gallery-piece:hover .gallery-piece__spotlight {
  opacity: 1;
}

/* Gallery labels removed for cleaner presentation */

.book-showcase__content h2 {
  margin-bottom: 16px;
  color: var(--ivory);
}

.book-showcase__content p {
  margin-bottom: 24px;
  line-height: 1.6;
}

.book-showcase__content em {
  color: var(--gold);
  font-style: normal;
  font-weight: 500;
}

/* ── Etsy Shop Banner ─────────────────── */
.etsy-banner {
  padding: 0;
}
.etsy-banner__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 20px 28px;
  background: var(--ash);
  border: 1px solid var(--ember);
  border-radius: var(--radius-md);
  margin-top: -20px;
}
.etsy-banner__text {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: var(--cream-dim);
}
.etsy-banner__icon {
  font-size: 20px;
}
.btn--sm {
  padding: 10px 22px;
  font-size: var(--text-micro);
}

/* ── Book Showcase ─────────────────────── */
.book-showcase {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: 3rem 0;
}
.book-showcase__content h2 {
  color: var(--gold);
  margin-bottom: 1rem;
}
.book-showcase__content p {
  margin-bottom: 2rem;
  color: var(--ivory-dim);
}
.book-showcase__content em {
  color: var(--gold);
  font-style: normal;
  font-weight: 500;
}

/* ── Gallery Header ─────────────────── */
.gallery-header {
  text-align: center;
  max-width: 500px;
  margin: 0 auto 3rem auto;
  padding-top: 2rem;
}

.gallery-header h2 {
  margin-bottom: 1rem;
  color: var(--ivory);
}

.gallery-header p {
  color: var(--white-dim);
  line-height: 1.6;
}

.gallery-header em {
  color: var(--gold);
  font-style: normal;
  font-weight: 500;
}

/* ── Published Works ─────────────────── */
.published-works {
  background: var(--ash);
  border-top: 1px solid var(--ember);
}

.published-header {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: 1.5rem 0;
}

.published-header h2 {
  color: var(--gold);
  margin-bottom: 1rem;
}

.published-header p {
  color: var(--ivory-dim);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.published-header em {
  color: var(--gold);
  font-style: normal;
  font-weight: 500;
}

/* ── Take Home Section ─────────────────── */
.take-home {
  background: var(--obsidian);
  border-top: 1px solid var(--ember);
}

.take-home__content {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  padding: 1.5rem 0;
}

.take-home__text h2 {
  color: var(--ivory);
  margin-bottom: 0.75rem;
}

.take-home__text p {
  color: var(--ivory-dim);
  margin-bottom: 1.5rem;
}

/* ── Magical Button Effects ─────────────────── */
.magical-button {
  position: relative;
  overflow: hidden;
}

.magical-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(201, 168, 76, 0.3), 
    transparent);
  transition: left 0.6s ease;
  z-index: 0;
}

.magical-button:hover::before {
  left: 100%;
}

.magical-button span {
  position: relative;
  z-index: 2;
}
/* Old art-item styles removed - replaced with gallery-piece styles */

/* Lightbox */
/* ── Enhanced Gallery Lightbox ─────────────────── */
.gallery-lightbox {
  position: fixed;
  inset: 0;
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
  font-family: var(--font-body);
  cursor: default !important;
}

/* Gallery Background with Ambient Lighting */
.gallery-lightbox__background {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, #2a2a2a 0%, #1a1a1a 70%);
  z-index: 1;
  cursor: default;
  pointer-events: none;
}

.gallery-lightbox__ambient-light {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 30%, 
    rgba(201, 168, 76, 0.05) 0%, 
    transparent 70%);
  cursor: default;
  pointer-events: none;
}

/* Navigation Controls */
.gallery-lightbox__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid var(--ember);
  color: var(--ivory);
  padding: 1rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
}

.gallery-lightbox__nav:hover {
  background: rgba(201, 168, 76, 0.2);
  border-color: var(--gold);
  color: var(--gold);
  transform: translateY(-50%) scale(1.1);
}

.gallery-lightbox__nav--prev {
  left: 2rem;
}

.gallery-lightbox__nav--next {
  right: 2rem;
}

/* Main Artwork Display */
.gallery-lightbox__main {
  position: relative;
  z-index: 5;
  max-width: 80vw;
  max-height: 70vh;
}

.artwork-frame {
  position: relative;
  background: var(--ash);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--ember);
  cursor: default;
}

.artwork-spotlight {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 120%;
  height: 40px;
  background: radial-gradient(ellipse, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  cursor: default;
}

.artwork-image {
  width: 100%;
  max-height: 60vh;
  object-fit: contain;
  border-radius: 4px;
  cursor: default;
}

/* Artwork information panel removed for cleaner viewing */

/* Close Button */
.gallery-lightbox__close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid var(--ember);
  color: var(--ivory);
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-lightbox__close:hover {
  background: rgba(201, 168, 76, 0.2);
  border-color: var(--gold);
  color: var(--gold);
  transform: scale(1.1);
}

/* Mobile Instructions */
.gallery-lightbox__hint {
  position: absolute;
  bottom: 6rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--white-muted);
  text-align: center;
  z-index: 10;
  display: none;
  cursor: default;
  pointer-events: none;
}

/* Force disable custom cursor system inside lightbox */
.gallery-lightbox {
  /* Hide any custom cursors inside lightbox */
}

.gallery-lightbox * {
  cursor: inherit !important;
}

.gallery-lightbox__nav,
.gallery-lightbox__close {
  cursor: pointer !important;
}

/* Force normal cursor behavior - override any global cursor styles */
.gallery-lightbox {
  /* Force default cursor to be visible */
  cursor: default !important;
}

.gallery-lightbox *:not(.gallery-lightbox__nav):not(.gallery-lightbox__close) {
  cursor: default !important;
}

/* Disable all custom cursor systems inside lightbox */
.gallery-lightbox .custom-cursor,
.gallery-lightbox .custom-cursor--dot {
  display: none !important;
  opacity: 0 !important;
  pointer-events: none !important;
  visibility: hidden !important;
}

/* Override any mix-blend-mode effects that might hide cursor */
.gallery-lightbox,
.gallery-lightbox * {
  mix-blend-mode: normal !important;
}

@media (max-width: 768px) {
  .gallery-lightbox__hint {
    display: block;
  }
  
  .gallery-lightbox__nav {
    width: 44px;
    height: 44px;
    padding: 0.75rem;
  }
  
  .gallery-lightbox__nav--prev {
    left: 1rem;
  }
  
  .gallery-lightbox__nav--next {
    right: 1rem;
  }
  
  .artwork-frame {
    padding: 1rem;
  }
}
/* Lightbox Transitions */
.lightbox-enter-active { 
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); 
}
.lightbox-leave-active { 
  transition: all 0.3s ease-in; 
}
.lightbox-enter-from { 
  opacity: 0; 
}
.lightbox-enter-from .artwork-image { 
  transform: scale(0.9); 
}
.lightbox-leave-to { 
  opacity: 0; 
}

@media (max-width: 1024px) {
  .art-gallery { 
    columns: 2; 
    column-gap: 24px; 
  }
  
  .gallery-piece {
    margin-bottom: 2rem;
  }
}

@media (max-width: 768px) {
  .published-header,
  .take-home__content {
    padding: 1rem 0;
  }
  
  .art-gallery { 
    columns: 2; 
    column-gap: 16px; 
  }
  
  .gallery-piece { 
    margin-bottom: 1rem; 
  }
  
  .gallery-piece__frame {
    padding: 15px;
  }
  
  /* Better mobile banner */
  .etsy-banner__inner { 
    flex-direction: column; 
    text-align: center; 
    gap: 16px;
    padding: 24px;
  }
  
  /* Touch-optimized lightbox */
  .lightbox {
    padding: 20px;
  }
  
  .lightbox__close {
    top: 16px;
    right: 16px;
    font-size: 32px;
    padding: 8px;
    min-height: 44px;
    min-width: 44px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .lightbox__img {
    max-width: 95vw;
    max-height: 75vh;
  }
}

@media (max-width: 480px) {
  .art-gallery { 
    columns: 1; 
    column-gap: 0; 
  }
  
  .gallery-piece {
    margin-bottom: 1rem;
  }
  
  .gallery-piece__frame {
    padding: 12px;
  }
  
  .gallery-lightbox__main {
    max-width: 95vw;
  }
  
  .artwork-image {
    max-height: 60vh;
  }
  
  .gallery-lightbox__close {
    top: 1rem;
    right: 1rem;
    width: 44px;
    height: 44px;
  }
}
</style>
