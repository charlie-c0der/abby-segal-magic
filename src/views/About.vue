<script setup lang="ts">
import { useReveal } from '../composables/useReveal'
import { useWorldClassSEO } from '../composables/useWorldClassSEO'

useReveal()
// World-class SEO for About page
useWorldClassSEO({
  title: 'About Abby Segal | Chicago Magician, Sleight of Hand Expert & Entertainer',
  description: 'Learn about Abby Segal — Chicago magician and sleight of hand expert performing close-up magic for over a decade. Regular performer at Chicago Magic Lounge. As seen on Penn & Teller: Fool Us.',

  // Enhanced keyword targeting for About page with priority terms
  focusKeyphrases: [
    'Abby Segal Chicago magician',
    'Chicago Magic Lounge performer Abby',
    'sleight of hand expert Abby Segal',
    'Chicago entertainment magician biography',
    'close-up magic performer Abby Segal'
  ],
  semanticKeywords: [
    'Abby Segal magic performance background',
    'Chicago Magic Lounge resident performer',
    'Chicago entertainment industry magician',
    'sleight of hand magic expert Chicago',
    'close-up magic Chicago performer',
    'Abby Segal magician for hire',
    'Chicago magic entertainment professional',
    'performance magician Chicago area',
    'magic shows Chicago performer',
    'Chicago sleight of hand artist',
    'entertainment magic Chicago expert',
    'Abby Segal Chicago Magic',
    'private events magician Chicago',
    'Chicago corporate entertainment performer',
    'activities in Chicago magic shows'
  ],

  // Technical SEO
  ogImage: '/assets/portraits/images/close-up-magician-chicago-abby-segal.webp',
  ogType: 'profile',
  canonicalUrl: '/about',
  priority: 0.9,
  changeFreq: 'monthly',

  // Performance optimization
  preloadImages: [
    '/assets/portraits/images/close-up-magician-chicago-abby-segal.webp'
  ],
  prefetchLinks: [
    '/shows',
    '/contact',
    '/press'
  ],

  contentType: 'about'
})
</script>

<template>
  <div class="about">
    <!-- Hero -->
    <section class="about-hero section section--hero">
      <div class="container">
        <p class="heading-eyebrow reveal">About</p>
        <h1 class="heading-xl reveal reveal-delay-1">Not your average <em class="shimmer">magician.</em></h1>
        <p class="body-lg reveal reveal-delay-2" style="max-width: 600px; margin-top: 16px;">
          A Chicago magician who has been performing at theaters, special events, schools, and corporate functions for over a decade.
        </p>
        <div class="divider reveal reveal-delay-3" />
      </div>
    </section>

    <!-- Story -->
    <section class="section">
      <div class="container about-grid">
        <div class="about-portrait reveal">
          <div class="about-portrait__frame">
            <img src="/assets/portraits/images/headshot1.webp" alt="Portrait of Abby Segal, female magician based in Chicago" loading="lazy" decoding="async" />
          </div>
        </div>

        <div class="about-bio">
          <h2 class="heading-md reveal" style="margin-bottom: 24px;">Biography</h2>

          <p class="body-lg reveal">
            Abby Segal is a magician based in <em class="shimmer">Chicago</em>. She has been performing magic at theaters, special events, schools, and corporate functions for <em class="shimmer">over a decade</em>. In 2021 and 2025, Abby showcased her original magic routines on the CW television series <em class="shimmer">Penn &amp; Teller: Fool Us</em>.
          </p>

          <p class="body-lg reveal reveal-delay-1">
            Abby graduated from <em class="shimmer">Bates College</em> with a B.A. in Psychology, and concentrations in Film Studies and Design. She incorporates these disciplines into her magic, striving to create moments of astonishment for her audiences.
          </p>

          <p class="body-lg reveal reveal-delay-2">
            Alongside performing, Abby is also a creator and teacher of magic. In addition to appearing at private events, she is a regular performer at the <em class="shimmer">Chicago Magic Lounge</em>. Her other appearances include The Magic Castle in Hollywood, Keys and Heels in New York City, The Helsinki Magic Show in Finland, and The Amsterdam Magic Show in the Netherlands.
          </p>

          <p class="body-md reveal reveal-delay-2 about-bio__shows-link">
            <router-link to="/shows">Explore the three ways to experience the magic →</router-link>
          </p>

          <h2 class="heading-md reveal reveal-delay-3" style="margin-top: 40px; margin-bottom: 24px;">Beyond the stage</h2>

          <div class="about-bio__beyond reveal reveal-delay-3">
            <img src="/assets/art/images/art-prague.webp" alt="Original collage by Abby Segal, exhibited at Berlinskej Model in Prague" loading="lazy" decoding="async" class="about-bio__art" />
            <p class="body-lg">
              Abby is also a <em class="shimmer">published author</em> — her children's book <em class="shimmer">Shelly Shazam!</em> is sold on Amazon and at The Magic Castle in Hollywood. She's a visual artist whose collages and illustrations have been exhibited at <em class="shimmer">Berlinskej Model</em> in Prague. She's been featured on the Penguin Magic Podcast, lectured at Magifest, and teaches magic workshops for all ages.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-hero { padding-bottom: 0; padding-top: calc(var(--section-pad) + 80px); }
.about-hero h1 em { color: var(--gold); font-style: normal; font-weight: 400; }

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 80px;
  align-items: start;
}
.about-portrait__frame {
  aspect-ratio: 3/4;
  border: 1px solid var(--ember);
  border-radius: var(--radius-lg);
  position: sticky;
  top: 120px;
  overflow: hidden;
}
.about-portrait__frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(5%) sepia(10%) sepia(15%) contrast(1.02);
  transition: all 0.6s var(--ease-out);
}
.about-portrait__frame:hover img {
  filter: grayscale(0%) sepia(0%) sepia(0%) contrast(1.05);
  transform: scale(1.02);
}
.about-bio p { margin-bottom: 20px; }
.about-bio em { color: var(--gold); font-style: normal; font-weight: 400; }
.about-bio h2 em { color: var(--gold); }
.about-bio__shows-link a {
  color: var(--gold);
  font-weight: 600;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s;
}
.about-bio__shows-link a:hover { border-color: var(--gold); }
.about-bio__beyond { display: grid; grid-template-columns: 200px 1fr; gap: 28px; align-items: start; }
.about-bio__art {
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: cover;
  border: 1px solid var(--ember);
  border-radius: var(--radius-md);
}

@media (max-width: 768px) {
  .about-grid { grid-template-columns: 1fr; gap: 40px; }
  .about-portrait__frame { position: static; }
  .about-bio__beyond { grid-template-columns: 1fr; gap: 16px; }
  .about-bio__art { max-width: 240px; }
}
</style>
