<script setup lang="ts">
import { useReveal } from '../composables/useReveal'
useReveal()

// Placeholder gallery — replace with real images
const artworks = [
  { title: 'Collage Series I', medium: 'Mixed media collage', year: '2024' },
  { title: 'Watercolor Study', medium: 'Watercolor on paper', year: '2024' },
  { title: 'Urban Sketch', medium: 'Ink on paper', year: '2023' },
  { title: 'Collage Series II', medium: 'Mixed media collage', year: '2023' },
  { title: 'Portrait Study', medium: 'Watercolor on paper', year: '2024' },
  { title: 'Sketchbook Page', medium: 'Graphite on paper', year: '2023' },
]
</script>

<template>
  <div class="art-page">
    <section class="section art-hero">
      <div class="container">
        <p class="heading-eyebrow reveal">Visual Art</p>
        <h1 class="heading-xl reveal reveal-delay-1">The other <em>craft.</em></h1>
        <div class="divider reveal reveal-delay-2" />
        <p class="body-lg reveal reveal-delay-3" style="max-width: 560px;">
          When she's not making cards disappear, Abby creates visual art —
          collage, watercolor, and sketching. Commissions available.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="art-grid">
          <div
            v-for="(art, i) in artworks"
            :key="art.title"
            class="art-item reveal"
            :class="[`reveal-delay-${(i % 4) + 1}`, i % 3 === 0 ? 'art-item--tall' : '']"
          >
            <div class="art-item__image">
              <span class="art-item__placeholder">✦</span>
            </div>
            <div class="art-item__info">
              <h3>{{ art.title }}</h3>
              <p>{{ art.medium }} · {{ art.year }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

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

.art-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.art-item {
  overflow: hidden;
}
.art-item--tall {
  grid-row: span 2;
}
.art-item__image {
  aspect-ratio: 1;
  background: var(--black-card);
  border: 1px solid var(--black-border);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s var(--ease-out);
  overflow: hidden;
}
.art-item--tall .art-item__image {
  aspect-ratio: auto;
  height: 100%;
}
.art-item:hover .art-item__image {
  border-color: var(--gold);
}
.art-item__placeholder {
  font-size: 40px;
  color: var(--gold-dim);
  transition: transform 0.5s var(--ease-out);
}
.art-item:hover .art-item__placeholder {
  transform: scale(1.1) rotate(15deg);
}
.art-item__info {
  padding: 12px 0;
}
.art-item__info h3 {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 600;
}
.art-item__info p {
  font-size: 13px;
  color: var(--white-muted);
  margin-top: 2px;
}

@media (max-width: 768px) {
  .art-grid { grid-template-columns: repeat(2, 1fr); }
  .art-item--tall { grid-row: span 1; }
}
</style>
