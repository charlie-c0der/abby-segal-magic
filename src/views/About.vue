<script setup lang="ts">
import { useReveal } from '../composables/useReveal'
import { useWorldClassSEO } from '../composables/useWorldClassSEO'
import { useStrategicLinking } from '../composables/useStrategicLinking'

useReveal()
// World-class SEO for About page
useWorldClassSEO({
  title: 'About Abby Segal | Chicago Magician, Sleight of Hand Expert & Entertainer',
  description: 'Learn about Abby Segal — Chicago magician and sleight of hand expert performing close-up magic since age 11. Resident performer at Chicago Magic Lounge. As seen on Penn & Teller: Fool Us.',
  
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
  ogImage: '/assets/portraits/images/abby-2024.webp',
  ogType: 'profile',
  canonicalUrl: '/about',
  priority: 0.9,
  changeFreq: 'monthly',
  
  // Performance optimization
  preloadImages: [
    '/assets/portraits/images/abby-2024.webp',
    '/assets/portraits/images/penn-teller-appearance.webp'
  ],
  prefetchLinks: [
    '/shows',
    '/contact',
    '/press'
  ],
  
  contentType: 'about'
})

// Strategic linking for About page
useStrategicLinking({
  enableAutolinking: true,
  maxLinksPerPage: 5,
  respectExistingLinks: true
})

// Timeline data removed
</script>

<template>
  <div class="about">
    <!-- Hero -->
    <section class="about-hero section section--hero">
      <div class="container">
        <p class="heading-eyebrow reveal">About</p>
        <h1 class="heading-xl reveal reveal-delay-1">Not your average <em class="shimmer">magician.</em></h1>
        <p class="body-lg reveal reveal-delay-2" style="max-width: 600px; margin-top: 16px;">
          A Chicago magician who has been performing magic at theaters, special events, schools, and corporate functions since the age of 11.
        </p>
        <div class="divider reveal reveal-delay-3" />
      </div>
    </section>

    <!-- Story - the real one -->
    <section class="section">
      <div class="container about-grid">
        <div class="about-portrait reveal">
          <div class="about-portrait__frame">
            <img src="/assets/portraits/images/portrait.webp" alt="Abby Segal portrait" loading="lazy" decoding="async" />
          </div>
        </div>

        <div class="about-bio">
          <h2 class="heading-md reveal" style="margin-bottom: 24px;">Biography</h2>

          <p class="body-lg reveal">
            <em class="shimmer">Abby Segal</em> is a magician based in <em class="underline-sketch">Chicago</em>. She has been performing magic at theaters, special events, schools, and corporate functions since the age of <em class="shimmer">11</em>. In <em class="underline-sketch">2021 and 2025</em>, Abby showcased her original magic routines on the CW television series <em class="shimmer">Penn & Teller: Fool Us</em>.
          </p>

          <p class="body-lg reveal reveal-delay-1">
            Abby graduated from <em class="shimmer">Bates College</em> with a <em class="underline-sketch">B.A. in Psychology</em>, and concentrations in <em class="shimmer">Film Studies and Design</em>. She incorporates these disciplines into her magic, striving to create moments of <em class="underline-sketch">astonishment for her audiences</em>.
          </p>

          <p class="body-lg reveal reveal-delay-2">
            Alongside performing, Abby is also a <em class="shimmer">creator and teacher of magic</em>. In addition to appearing at private events, she is a regular performer at the <em class="underline-sketch">Chicago Magic Lounge</em>. Her other appearances include <em class="shimmer">The Magic Castle</em> in Hollywood, <em class="underline-sketch">Keys and Heels</em> in New York City, <em class="shimmer">The Helsinki Magic Show</em> in Finland, and <em class="underline-sketch">The Amsterdam Magic Show</em> in the Netherlands.
          </p>

          <h2 class="heading-md reveal reveal-delay-3" style="margin-top: 40px; margin-bottom: 24px;">Beyond the stage</h2>

          <p class="body-lg reveal reveal-delay-3">
            Beyond the stage Abby is also a <em class="shimmer">published author</em> - her children's book <em class="underline-sketch">Shelly Shazam!</em> is sold on Amazon and at The Magic Castle in Hollywood. She's a <em class="shimmer">visual artist</em> whose collages and illustrations have been exhibited at <em class="underline-sketch">Berlinskej Model</em> in Prague. She's been featured on the <em class="shimmer">Penguin Magic Podcast</em>, lectured at <em class="underline-sketch">Magifest</em>, and teaches magic workshops for all ages.
          </p>

          <div class="reveal reveal-delay-4" style="margin-top: 32px;">
            <router-link to="/contact" class="btn btn--filled magnetic"><span>Book Abby</span></router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline section removed -->

    <!-- Venues -->
    <section class="section">
      <div class="container">
        <p class="heading-eyebrow reveal" style="text-align: center;">Venues</p>
        <h2 class="heading-lg reveal reveal-delay-1" style="text-align: center; margin-bottom: 60px;">
          From private events to <em>world stages.</em>
        </h2>
        <div class="venues-grid">
          <div class="venue-card featured reveal reveal-delay-1">
            <div class="venue-icon">📺</div>
            <h3 class="venue-name">Penn & Teller: Fool Us</h3>
            <p class="venue-loc">CW Television Network</p>
            <p class="venue-desc">Featured in 2021 and 2025</p>
          </div>
          <div class="venue-card reveal reveal-delay-2">
            <div class="venue-icon">🏰</div>
            <h3 class="venue-name">The Magic Castle</h3>
            <p class="venue-loc">Hollywood, CA</p>
            <p class="venue-desc">Legendary magicians' club</p>
          </div>
          <div class="venue-card reveal reveal-delay-3">
            <div class="venue-icon">🎪</div>
            <h3 class="venue-name">Chicago Magic Lounge</h3>
            <p class="venue-loc">Chicago, IL</p>
            <p class="venue-desc">Regular performer</p>
          </div>
          <div class="venue-card reveal reveal-delay-1">
            <div class="venue-icon">🗽</div>
            <h3 class="venue-name">Keys & Heels</h3>
            <p class="venue-loc">New York City</p>
            <p class="venue-desc">Intimate magic venue</p>
          </div>
          <div class="venue-card reveal reveal-delay-2">
            <div class="venue-icon">🌍</div>
            <h3 class="venue-name">Helsinki Magic Show</h3>
            <p class="venue-loc">Helsinki, Finland</p>
            <p class="venue-desc">International performances</p>
          </div>
          <div class="venue-card reveal reveal-delay-3">
            <div class="venue-icon">🌷</div>
            <h3 class="venue-name">Amsterdam Magic Show</h3>
            <p class="venue-loc">Amsterdam, Netherlands</p>
            <p class="venue-desc">European tour</p>
          </div>
          <div class="venue-card reveal reveal-delay-1">
            <div class="venue-icon">🎰</div>
            <h3 class="venue-name">Rio Theatre</h3>
            <p class="venue-loc">Las Vegas, NV</p>
            <p class="venue-desc">Vegas magic scene</p>
          </div>
          <div class="venue-card reveal reveal-delay-2">
            <div class="venue-icon">🎯</div>
            <h3 class="venue-name">Magifest</h3>
            <p class="venue-loc">Magic Convention</p>
            <p class="venue-desc">Lecture & performance</p>
          </div>
          <div class="venue-card reveal reveal-delay-3">
            <div class="venue-icon">🎨</div>
            <h3 class="venue-name">Berlinskej Model</h3>
            <p class="venue-loc">Prague, Czech Republic</p>
            <p class="venue-desc">Art exhibition</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section" style="border-top: 1px solid var(--ember); background: var(--obsidian);">
      <div class="container" style="text-align: center;">
        <h2 class="heading-lg reveal">Want the full <em>experience?</em></h2>
        <p class="body-lg reveal reveal-delay-1" style="max-width: 480px; margin: 16px auto 32px;">
          Check out the shows, or just skip ahead and book.
          Either way, your guests will thank you.
        </p>
        <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
          <router-link to="/shows" class="btn reveal reveal-delay-2"><span>See the Shows</span></router-link>
          <router-link to="/contact" class="btn btn--filled reveal reveal-delay-3"><span>Book Now</span></router-link>
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

/* Timeline styles removed */

/* Venues */
.venues-grid { 
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
  gap: 20px; 
}

h2 em { 
  color: var(--gold); 
  font-style: normal; 
  font-weight: 400; 
}

.venue-card {
  background: var(--ash);
  border: 1px solid var(--ember);
  border-radius: var(--radius-lg);
  padding: 24px;
  transition: all 0.3s var(--ease-out);
  text-align: center;
}

.venue-card:hover {
  transform: translateY(-5px);
  border-color: var(--plum);
  background: rgba(141, 59, 120, 0.05);
}

.venue-card.featured {
  border-color: var(--gold);
  background: rgba(201, 168, 76, 0.05);
}

.venue-card.featured:hover {
  border-color: var(--gold);
  background: rgba(201, 168, 76, 0.1);
}

.venue-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
  display: block;
  opacity: 0.8;
}

.venue-name { 
  font-family: var(--font-display); 
  font-size: var(--text-card-title); 
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 8px;
  color: var(--ivory);
}

.venue-loc { 
  font-size: var(--text-btn); 
  color: var(--cream-muted); 
  margin-bottom: 8px;
}

.venue-desc {
  font-size: var(--text-body-sm);
  color: var(--cream-dim);
  font-style: italic;
}

@media (max-width: 768px) {
  .about-grid { grid-template-columns: 1fr; gap: 40px; }
  .about-portrait__frame { position: static; }
  .venues-grid { 
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); 
    gap: 16px; 
  }
  .venue-card {
    padding: 20px;
  }
  /* Timeline mobile styles removed */
}

@media (max-width: 480px) {
  .venues-grid {
    grid-template-columns: 1fr;
  }
}
</style>
