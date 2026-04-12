<script setup lang="ts">
import { useReveal } from '../composables/useReveal'
import { useWorldClassSEO } from '../composables/useWorldClassSEO'
import LazyYouTube from '../components/LazyYouTube.vue'

useReveal()
// World-class SEO for Press page (social proof & authority)
useWorldClassSEO({
  title: 'Press & Media | Chicago Magician Abby Segal on Penn & Teller: Fool Us',
  description: 'Chicago magician Abby Segal featured on Penn & Teller: Fool Us, Chicago Magic Lounge, and international magic performances. Press coverage, media appearances, and close-up magic reviews.',
  
  // Media and authority-focused keywords with priority terms
  focusKeyphrases: [
    'Abby Segal Chicago Magic Lounge press',
    'Chicago magician Penn Teller Fool Us',
    'Chicago entertainment magician media',
    'sleight of hand Chicago performer press',
    'Chicago Magic performer media coverage'
  ],
  semanticKeywords: [
    'Abby Segal Chicago magician press',
    'Chicago Magic Lounge performer features',
    'Chicago entertainment industry magician',
    'sleight of hand expert Chicago media',
    'close-up magic Chicago performer press',
    'Chicago magic entertainment coverage',
    'Abby Segal performance reviews Chicago',
    'Chicago Magic performer media',
    'entertainment magician Chicago press',
    'Chicago sleight of hand media coverage',
    'magic shows Chicago performer press',
    'activities in Chicago magic performer',
    'private events Chicago magician press'
  ],
  
  // Technical SEO
  ogImage: '/assets/press/images/penn-teller-feature.webp',
  ogType: 'article',
  canonicalUrl: '/press',
  priority: 0.8,
  changeFreq: 'monthly',
  
  // Performance optimization
  preloadImages: [
    '/assets/press/images/penn-teller-feature.webp',
    '/assets/press/images/chicago-magic-lounge.webp'
  ],
  prefetchLinks: [
    '/shows',
    '/about',
    '/contact'
  ],
  
  contentType: 'press'
})

const features = [
  {
    quote: 'Your style is so <em class="shimmer">humble and sweet</em>, and <em class="underline-sketch">still confident</em>.',
    source: 'Penn Jillette',
    context: 'Penn & Teller: Fool Us, CW',
    year: '2021',
    highlight: true,
    link: 'https://www.youtube.com/watch?v=yHC32hkzFrc',
  },
  {
    quote: 'From minute one, <em class="underline-sketch">she pulled us in</em> and had the skills to back it up. She was <em class="shimmer">very natural</em>, which is unusual for someone of her age. Very conversational and <em>just calming to watch</em> - because she had such a <em class="shimmer">grasp of what she was doing already</em>.',
    source: 'Evan Northrup',
    context: 'Professional Magician & Mentor, quoted in Lowell Sun',
    year: '2021',
    highlight: false,
    link: 'https://www.lowellsun.com/2021/02/22/abracadabra-chelmsford-magician-to-appear-on-penn-teller/',
  },
  {
    quote: 'I don\'t think there\'s a better show on TV right now that\'s showing magicians, so to get on <em class="shimmer">Penn & Teller is to make your career</em>. <em class="underline-sketch">That\'s not overstating it.</em>',
    source: 'David Penn',
    context: 'Abby\'s first mentor, quoted in Lowell Sun',
    year: '2021',
    highlight: false,
    link: 'https://www.lowellsun.com/2021/02/22/abracadabra-chelmsford-magician-to-appear-on-penn-teller/',
  },
  {
    quote: 'For at least one Bates student, the immense disruption brought on by COVID-19 offered a magical opportunity.',
    source: 'Bates College News',
    context: 'Feature Story',
    year: '2021',
    highlight: false,
    link: 'https://www.bates.edu/news/2021/02/24/magician-abby-segal-23-to-appear-on-penn-teller-fool-us/',
  },
  {
    quote: 'Both first-place winners have something big in common: their businesses are already up and running and making money - an impressive place for a student-run startup to be.',
    source: 'Bates College News',
    context: 'Bobcat Ventures - Abby won $6,000 first prize',
    year: '2023',
    highlight: false,
    link: 'https://www.bates.edu/news/2023/04/14/magic-and-soccer-take-home-first-prize-at-the-2023-bobcat-ventures-competition/',
  },
  {
    quote: 'Abby Segal is a <em class="shimmer">rising young star</em> in magic. She has lectured and performed at <em class="underline-sketch">Magifest</em> and is a featured performer at <em class="shimmer">The Chicago Magic Lounge</em>.',
    source: 'Penguin Magic Podcast',
    context: 'Season 6, Episode 16',
    year: '2024',
    highlight: false,
    link: 'https://open.spotify.com/episode/0Q7zKYLfJ2AmC2i5IvPlhY',
  },
  {
    quote: 'She was actually better than me at the magic within three years. She would show me better ways of doing things I was trying to do.',
    source: 'David Penn ("Crazy Davy")',
    context: 'Abby\'s first mentor, Patch.com',
    year: '2021',
    highlight: false,
    link: 'https://patch.com/massachusetts/chelmsford/chelmsford-resident-perform-penn-teller-fool-us',
  },
]

const pressLogos = [
  { name: 'Penn & Teller: Fool Us', outlet: 'CW' },
  { name: 'Lowell Sun', outlet: 'Print' },
  { name: 'Patch.com', outlet: 'Digital' },
  { name: 'Bates College', outlet: 'University' },
  { name: 'Penguin Magic', outlet: 'Podcast' },
  { name: 'Chicago Magic Lounge', outlet: 'Venue' },
]
</script>

<template>
  <div class="press-page">
    <section class="section press-hero section--hero">
      <div class="container">
        <p class="heading-eyebrow reveal">Press & Media</p>
        <h1 class="heading-xl reveal reveal-delay-1">In the <em class="shimmer">spotlight.</em></h1>
        <p class="body-lg reveal reveal-delay-2" style="max-width: 560px;">
          Featured on national television, covered in Chicago press,
          and praised by some of the biggest names in magic.
        </p>
        <div class="divider reveal reveal-delay-3" />
      </div>
    </section>

    <!-- Video Feature -->
    <section class="section">
      <div class="container">
        <div class="video-feature reveal">
          <div class="video-feature__embed">
            <LazyYouTube video-id="yHC32hkzFrc" title="Abby Segal on Penn & Teller: Fool Us" />
          </div>
          <div class="video-feature__info">
            <p class="heading-eyebrow">Featured Performance</p>
            <h2 class="heading-md">Penn & Teller: Fool Us</h2>
            <div class="divider" />
            <p class="body-md">
              In 2021, Abby performed an original card trick on the CW's hit
              magic competition show. Penn Jillette praised her style as
              "humble and sweet, and still confident" - and she was 20 years old.
            </p>
            <a href="https://www.youtube.com/watch?v=yHC32hkzFrc" target="_blank" rel="noopener" class="btn" style="margin-top: 20px;">
              <span>Watch Full Performance</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- As Featured In -->
    <section class="featured-in">
      <div class="container">
        <div class="featured-in__track">
          <span v-for="logo in pressLogos" :key="logo.name" class="featured-in__item">
            <span class="featured-in__name">{{ logo.name }}</span>
            <span class="featured-in__outlet">{{ logo.outlet }}</span>
          </span>
        </div>
      </div>
    </section>

    <!-- Photo Gallery Strip -->
    <section class="press-photos">
      <div class="press-photos__track">
        <img src="/assets/press/images/press-1.webp" alt="Abby performing close-up magic" loading="lazy" decoding="async" />
        <img src="/assets/press/images/press-show.webp" alt="Abby on stage" loading="lazy" decoding="async" />
        <img src="/assets/portraits/images/abby-2024.webp" alt="Abby Segal 2024" loading="lazy" decoding="async" />
        <img src="/assets/press/images/press-prague.webp" alt="Art gallery showcase in Prague" loading="lazy" decoding="async" />
        <img src="/assets/press/images/press-2.webp" alt="Abby performing" loading="lazy" decoding="async" />
        <img src="/assets/press/images/press-1.webp" alt="Abby performing close-up magic" loading="lazy" decoding="async" />
        <img src="/assets/press/images/press-show.webp" alt="Abby on stage" loading="lazy" decoding="async" />
        <img src="/assets/portraits/images/abby-2024.webp" alt="Abby Segal 2024" loading="lazy" decoding="async" />
        <img src="/assets/press/images/press-prague.webp" alt="Art gallery showcase in Prague" loading="lazy" decoding="async" />
        <img src="/assets/press/images/press-2.webp" alt="Abby performing" loading="lazy" decoding="async" />
      </div>
    </section>

    <!-- Press Quotes -->
    <section class="section" style="background: var(--obsidian); border-top: 1px solid var(--ember);">
      <div class="container">
        <p class="heading-eyebrow reveal" style="text-align: center;">In their words</p>
        <h2 class="heading-lg reveal reveal-delay-1" style="text-align: center; margin-bottom: 60px;">
          Press <em>features.</em>
        </h2>

        <div class="press-quotes">
          <div
            v-for="(f, i) in features"
            :key="i"
            class="press-quote card reveal"
            :class="[`reveal-delay-${(i % 4) + 1}`, { 'press-quote--highlight': f.highlight }]"
          >
            <p class="press-quote__text">"<span v-html="f.quote"></span>"</p>
            <div class="divider" />
            <div class="press-quote__meta">
              <span class="press-quote__source">{{ f.source }}</span>
              <span v-if="f.context" class="press-quote__context">{{ f.context }}</span>
              <span class="press-quote__year">{{ f.year }}</span>
            </div>
            <a v-if="f.link" :href="f.link" target="_blank" rel="noopener" class="press-quote__link">Read / Watch →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Media Kit -->
    <section class="section">
      <div class="container" style="text-align: center;">
        <h2 class="heading-lg reveal">Working on a <em>story?</em></h2>
        <p class="body-lg reveal reveal-delay-1" style="max-width: 540px; margin: 16px auto 32px;">
          Press inquiries, interview requests, high-res photos, and a full media kit
          are available upon request. Abby loves talking about magic, psychology,
          art, and breaking stereotypes.
        </p>
        <router-link to="/contact" class="btn reveal reveal-delay-2"><span>Press Inquiries</span></router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.press-hero { padding-top: calc(var(--section-pad) + 80px); padding-bottom: 0; }
.press-hero h1 em, h2 em { color: var(--gold); font-style: normal; font-weight: 400; }

.video-feature { display: grid; grid-template-columns: 1.6fr 1fr; gap: 48px; align-items: center; }
.video-feature__embed { aspect-ratio: 16/9; background: var(--ash); border: 1px solid var(--ember); overflow: hidden; }
.video-feature__embed iframe { width: 100%; height: 100%; }

.press-quotes { columns: 2; column-gap: 24px; }
.press-quote { break-inside: avoid; margin-bottom: 24px; }
.press-quote--highlight { border-color: rgba(141, 59, 120, 0.3); }
.press-quote__text { font-family: var(--font-display); font-size: 17px; font-style: italic; font-weight: 400; line-height: 1.6; color: var(--ivory-dim); }
.press-quote__meta { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.press-quote__source { font-weight: 600; font-size: var(--text-body-sm); color: var(--gold); }
.press-quote__context { font-size: var(--text-btn); color: var(--white-muted); }
.press-quote__year { font-family: var(--font-mono); font-size: var(--text-micro); color: var(--white-muted); }

/* Press Photos Strip */
.press-photos { overflow: hidden; border-top: 1px solid var(--ember); border-bottom: 1px solid var(--ember); }
.press-photos__track { display: flex; gap: 4px; animation: photoScroll 40s linear infinite; width: max-content; }
.press-photos__track img { height: 280px; width: auto; object-fit: cover; filter: grayscale(20%); transition: filter 0.4s; }
.press-photos__track img:hover { filter: grayscale(0%) sepia(0%); }
@keyframes photoScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

.press-quote__link {
  display: inline-block;
  margin-top: 12px;
  font-size: var(--text-btn);
  color: var(--gold);
  font-family: var(--font-mono);
  letter-spacing: 0.05em;
  transition: opacity 0.3s;
}
.press-quote__link:hover { opacity: 0.7; }

/* Featured In Bar */
.featured-in {
  padding: 40px 0;
  border-bottom: 1px solid var(--ember);
  background: var(--obsidian);
}
.featured-in__track {
  display: flex;
  justify-content: center;
  gap: 48px;
  flex-wrap: wrap;
}
.featured-in__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.featured-in__name {
  font-family: var(--font-display);
  font-size: var(--text-body);
  font-weight: 700;
  color: var(--ivory-dim);
}
.featured-in__outlet {
  font-family: var(--font-mono);
  font-size: var(--text-micro);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--white-muted);
}

@media (max-width: 768px) {
  .video-feature { grid-template-columns: 1fr; }
  .press-quotes { columns: 1; }
  .press-photos__track img { height: 180px; }
}
</style>
