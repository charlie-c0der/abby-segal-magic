<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal'
import { useSEO } from '../composables/useSEO'
import Breadcrumbs from '../components/Breadcrumbs.vue'

useReveal()
useSEO({
  title: 'Art Gallery | Abby Segal Original Magic-Themed Artwork',
  description: 'Browse and purchase original magic-themed artwork by Abby Segal. Prints and originals available on Etsy. Exhibition pieces from Prague and beyond.',
  ogImage: '/images/performance.webp',
  canonicalUrl: '/art'
})

const lightboxOpen = ref(false)
const lightboxImage = ref('')
const lightboxTitle = ref('')

const etsyShopUrl = 'https://www.etsy.com/shop/AbbySegalArt'

function openLightbox(image: string, title: string) {
  lightboxImage.value = image
  lightboxTitle.value = title
  lightboxOpen.value = true
}

function closeLightbox() {
  lightboxOpen.value = false
}

// Placeholder gallery - replace with real images
const artworks = [
  { title: 'Borrowed Paper Collage', medium: 'Mixed media collage', year: '2023', image: '/images/art-collage-1.webp', thumb: '/images/art-collage-1-thumb.webp' },
  { title: 'Girls Looking Up, Waiting for Rain', medium: 'Mixed media', year: '2023', image: '/images/art-girls.webp', thumb: '/images/art-girls-thumb.webp' },
  { title: 'Tannes Magic Shop', medium: 'Digital illustration', year: '2024', image: '/images/art-tannes.webp', thumb: '/images/art-tannes-thumb.webp' },
  { title: 'Apply Lipstick', medium: 'Digital art', year: '2023', image: '/images/art-lipstick.webp', thumb: '/images/art-lipstick-thumb.webp' },
  { title: 'Abstract Shapes', medium: 'Mixed media', year: '2023', image: '/images/art-shapes.webp', thumb: '/images/art-shapes-thumb.webp' },
  { title: 'Mogul Men, Mountains, Humanity', medium: 'Mixed media collage', year: '2023', image: '/images/art-mogul.webp', thumb: '/images/art-mogul-thumb.webp' },
  { title: 'New to Prague', medium: 'Mixed media', year: '2022', image: '/images/art-prague.webp', thumb: '/images/art-prague-thumb.webp' },
  { title: 'Smoking or Don\'t', medium: 'Mixed media collage', year: '2023', image: '/images/art-smoking.webp', thumb: '/images/art-smoking-thumb.webp' },
  { title: 'Thinking Woman', medium: 'Mixed media', year: '2023', image: '/images/art-thinking.webp', thumb: '/images/art-thinking-thumb.webp' },
  { title: 'Hidden Poetry', medium: 'Found text collage', year: '2023', image: '/images/art-poetry.webp', thumb: '/images/art-poetry-thumb.webp' },
  { title: 'Trapped Eyes', medium: 'Mixed media', year: '2024', image: '/images/art-eyes.webp', thumb: '/images/art-eyes-thumb.webp' },
  { title: 'Stretched Girl', medium: 'Digital illustration', year: '2023', image: '/images/art-stretched.webp', thumb: '/images/art-stretched-thumb.webp' },
]
</script>

<template>
  <div class="art-page">
    <div class="container">
      <Breadcrumbs />
    </div>
    <section class="section art-hero">
      <div class="container">
        <p class="heading-eyebrow reveal">Visual Art</p>
        <h1 class="heading-xl reveal reveal-delay-1">The other <em class="shimmer">craft.</em></h1>
        <div class="divider reveal reveal-delay-2" />
        <p class="body-lg reveal reveal-delay-3" style="max-width: 600px;">
          Magic isn't Abby's only medium. She's a visual artist working in collage,
          watercolor, and illustration - exploring themes of identity, perception,
          and the things we see (and don't) in everyday life. Her work has been
          exhibited at Berlinskej Model in Prague. Commissions available.
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
          <a :href="etsyShopUrl" target="_blank" rel="noopener" class="btn btn--rose btn--sm">
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
            class="art-item reveal"
            :class="`reveal-delay-${(i % 4) + 1}`"
            @click="openLightbox(art.image, art.title)"
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
        <div v-if="lightboxOpen" class="lightbox" @click="closeLightbox">
          <button class="lightbox__close" @click="closeLightbox">✕</button>
          <img :src="lightboxImage" :alt="lightboxTitle" class="lightbox__img" @click.stop />
          <p class="lightbox__title">{{ lightboxTitle }}</p>
        </div>
      </transition>
    </Teleport>

    <section class="section" style="border-top: 1px solid var(--black-border); background: var(--black-soft);">
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
.art-hero h1 em, h2 em { color: var(--gold); font-style: italic; }

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
  background: var(--black-card);
  border: 1px solid var(--black-border);
  border-radius: var(--radius-md);
  margin-top: -20px;
}
.etsy-banner__text {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-body);
  font-size: 15px;
  color: var(--cream-dim);
}
.etsy-banner__icon {
  font-size: 20px;
}
.btn--sm {
  padding: 10px 22px;
  font-size: 11px;
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
  background: var(--black-card);
  border: 1px solid var(--black-border);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s var(--ease-out);
  overflow: hidden;
  border-radius: var(--radius-md);
}
.art-item:hover .art-item__image {
  border-color: var(--rose);
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
  background: rgba(5, 5, 5, 0.95);
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
  border: 1px solid var(--black-border);
  border-radius: var(--radius-md);
}
.lightbox__title {
  font-family: var(--font-display);
  font-size: 16px;
  color: var(--white-dim);
}
.lightbox-enter-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.lightbox-leave-active { transition: all 0.3s ease-in; }
.lightbox-enter-from { opacity: 0; }
.lightbox-enter-from .lightbox__img { transform: scale(0.9); }
.lightbox-leave-to { opacity: 0; }

@media (max-width: 1024px) {
  .art-masonry { columns: 2; }
}
@media (max-width: 768px) {
  .art-masonry { columns: 2; column-gap: 14px; }
  .art-item { margin-bottom: 14px; }
  .etsy-banner__inner { flex-direction: column; text-align: center; }
}
@media (max-width: 480px) {
  .art-masonry { columns: 1; }
}
</style>
