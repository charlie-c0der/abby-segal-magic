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
  
  // Art-focused keywords
  focusKeyphrases: [
    'magic-themed artwork by magician',
    'Abby Segal art gallery',
    'magician visual art portfolio',
    'magic illustration and collage'
  ],
  semanticKeywords: [
    'visual art by performer',
    'magic-inspired artwork',
    'collage and watercolor art',
    'artistic magician portfolio',
    'perception and illusion art',
    'Chicago artist artwork',
    'magic art prints for sale',
    'Etsy magic artwork shop',
    'artistic entertainment performer',
    'visual art by entertainer'
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
const lightboxTitle = ref('')
const lightboxRef = ref<HTMLElement | null>(null)

const etsyShopUrl = 'https://www.etsy.com/shop/AbbySegalArt'

// Touch gesture support for mobile
let startY = 0
let startTime = 0

function openLightbox(image: string, title: string) {
  lightboxImage.value = image
  lightboxTitle.value = title
  lightboxOpen.value = true
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
  } else {
    document.body.style.overflow = ''
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
        <h1 class="heading-xl reveal reveal-delay-1">The other <em class="shimmer">craft.</em></h1>
        <div class="divider reveal reveal-delay-2" />
        <p class="body-lg reveal reveal-delay-3" style="max-width: 600px;">
          <em class="underline-sketch">Magic isn't Abby's only medium.</em> She's a visual artist working in <em class="shimmer">collage,
          watercolor, and illustration</em> - exploring themes of identity, perception,
          and <em class="underline-sketch">the things we see (and don't)</em> in everyday life. Her work has been
          exhibited at <em class="shimmer">Berlinskej Model in Prague</em>. <em class="underline-sketch">Commissions available.</em>
        </p>
      </div>
    </section>

    <!-- Etsy Shop Banner -->
    <section class="etsy-banner reveal">
      <div class="container">
        <div class="etsy-banner__inner">
          <div class="etsy-banner__text">
            <span class="etsy-banner__icon">🛍</span>
            <span>Original prints &amp; artwork available on Etsy</span>
          </div>
          <a :href="etsyShopUrl" target="_blank" rel="noopener" class="btn btn--plum btn--sm magnetic-element">
            <span>Visit Shop</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="position:relative;z-index:1"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
          </a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="art-masonry">
          <div
            v-for="(art, i) in artworks"
            :key="art.title"
            class="art-item reveal magnetic-element"
            :class="`reveal-delay-${(i % 4) + 1}`"
            @click="openLightbox(art.image, art.title)"
            @keydown.enter="openLightbox(art.image, art.title)"
            @keydown.space.prevent="openLightbox(art.image, art.title)"
            tabindex="0"
            role="button"
            :aria-label="`View ${art.title}`"
          >
            <div class="art-item__image">
              <img :src="art.thumb" :alt="art.title" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <transition name="lightbox">
        <div 
          v-if="lightboxOpen" 
          class="lightbox" 
          @click.self="closeLightbox"
          @keydown.escape="closeLightbox"
          @touchstart="onTouchStart"
          @touchend="onTouchEnd"
          role="dialog"
          aria-modal="true"
          :aria-label="`Viewing: ${lightboxTitle}`"
          ref="lightboxRef"
          tabindex="-1"
        >
          <button class="lightbox__close" @click="closeLightbox" aria-label="Close lightbox">✕</button>
          <img :src="lightboxImage" :alt="lightboxTitle" class="lightbox__img" @click.stop />
          <p class="lightbox__title">{{ lightboxTitle }}</p>
          <p class="lightbox__hint">Swipe down to close</p>
        </div>
      </transition>
    </Teleport>

    <section class="section" style="border-top: 1px solid var(--ember); background: var(--obsidian);">
      <div class="container" style="text-align: center;">
        <h2 class="heading-lg reveal">Interested in a <em>commission?</em></h2>
        <p class="body-lg reveal reveal-delay-1" style="max-width: 480px; margin: 16px auto 32px;">
          Custom collages, watercolors, and sketches available. Reach out to discuss your project.
        </p>
        <router-link to="/contact" class="btn btn--filled reveal reveal-delay-2"><span>Inquire</span></router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.art-hero { padding-top: calc(var(--section-pad) + 80px); padding-bottom: 0; }
.art-hero h1 em, h2 em { color: var(--gold); font-style: normal; font-weight: 400; }

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

.art-masonry {
  columns: 3;
  column-gap: 20px;
}
.art-item {
  break-inside: avoid;
  margin-bottom: 20px;
  overflow: hidden;
}
.art-item__image {
  background: var(--ash);
  border: 1px solid var(--ember);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s var(--ease-out);
  overflow: hidden;
  border-radius: var(--radius-md);
}
.art-item:hover .art-item__image {
  border-color: var(--plum);
}
.art-item__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.6s var(--ease-out);
  filter: grayscale(5%) sepia(10%);
}
.art-item:hover .art-item__image img {
  transform: scale(1.05);
  filter: grayscale(0%) sepia(0%);
}
/* info styles removed - image only */

.art-item { cursor: pointer; }

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(9, 9, 14, 0.95);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  padding: 40px;
  cursor: pointer;
}
.lightbox__close {
  position: absolute;
  top: 24px;
  right: 32px;
  background: none;
  border: none;
  color: var(--white-muted);
  font-size: 28px;
  cursor: pointer;
  transition: color 0.3s;
  z-index: 1;
}
.lightbox__close:hover { color: var(--gold); }
.lightbox__img {
  max-width: 90vw;
  max-height: 80vh;
  object-fit: contain;
  cursor: default;
  border: 1px solid var(--ember);
  border-radius: var(--radius-md);
}
.lightbox__title {
  font-family: var(--font-display);
  font-size: var(--text-body);
  font-weight: 600;
  color: var(--ivory-dim);
}

.lightbox__hint {
  font-family: var(--font-mono);
  font-size: var(--text-micro);
  color: var(--white-muted);
  margin-top: 8px;
  display: none;
}

@media (max-width: 768px) {
  .lightbox__hint {
    display: block;
  }
}
.lightbox-enter-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.lightbox-leave-active { transition: all 0.3s ease-in; }
.lightbox-enter-from { opacity: 0; }
.lightbox-enter-from .lightbox__img { transform: scale(0.9); }
.lightbox-leave-to { opacity: 0; }

@media (max-width: 1024px) {
  .art-masonry { columns: 2; column-gap: 16px; }
}

@media (max-width: 768px) {
  .art-masonry { 
    columns: 2; 
    column-gap: 12px; 
  }
  .art-item { 
    margin-bottom: 12px; 
    cursor: pointer;
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
  .art-masonry { 
    columns: 1; 
    column-gap: 0; 
  }
  
  .art-item {
    margin-bottom: 16px;
  }
  
  .lightbox__img {
    max-width: 100vw;
    max-height: 70vh;
  }
}
</style>
