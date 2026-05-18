<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useReveal } from '../composables/useReveal'
import { useWorldClassSEO, generateLocalBusinessSchema } from '../composables/useWorldClassSEO'

useReveal()
// World-class SEO for Shows page with Local Business + Service schema
useWorldClassSEO({
  title: 'Magic Shows & Performances | Hire Chicago Magician Abby Segal for Events',
  description: 'Book Abby Segal — Chicago magician for hire for private events, corporate entertainment, weddings, and theatre. Close-up magic and sleight of hand performances available worldwide.',

  // Enhanced service-focused keywords with priority terms
  focusKeyphrases: [
    'magician for hire Chicago',
    'Chicago entertainment magic shows',
    'Abby Segal close-up magic',
    'sleight of hand magician for hire',
    'private events Chicago magician'
  ],
  semanticKeywords: [
    'Chicago Magic Lounge performer shows',
    'activities in Chicago magic entertainment',
    'Chicago magician private events',
    'close-up magic sleight of hand shows',
    'Chicago entertainment for private events',
    'magic performance Chicago area',
    'Abby Segal magician for hire',
    'Chicago corporate entertainment magic',
    'sleight of hand performance Chicago',
    'Chicago magic shows entertainment',
    'private events magician Chicago area',
    'Chicago close-up magic performer',
    'magic entertainment activities Chicago',
    'Chicago professional magician shows',
    'entertainment magic Chicago events',
    'Chicago sleight of hand expert',
    'magician Chicago Magic Lounge',
    'Chicago private party magic entertainment'
  ],

  // Technical SEO
  ogImage: '/assets/general/images/close-up-magician-chicago-performing.webp',
  ogType: 'article',
  canonicalUrl: '/shows',
  priority: 1.0,
  changeFreq: 'monthly',

  // Performance optimization
  preloadImages: [
    '/assets/general/images/close-up-magician-chicago-performing.webp',
    '/assets/press/images/parlour-magician-chicago-magic-lounge.webp'
  ],
  prefetchLinks: [
    '/contact',
    '/about',
    '/press'
  ],

  contentType: 'service',

  // Structured data: Local Business + per-format Service schema
  jsonLd: [
    generateLocalBusinessSchema(),
    {
      '@type': 'Service',
      'name': 'Close-Up Magic Performance',
      'description': 'Intimate table-side close-up magic and sleight of hand for private dinners, VIP tables, and small receptions in Chicago.',
      'provider': {
        '@type': 'Person',
        'name': 'Abby Segal',
        'url': 'https://www.abbysegalmagic.com'
      },
      'serviceType': 'Entertainment',
      'areaServed': {
        '@type': 'City',
        'name': 'Chicago'
      },
      'offers': {
        '@type': 'Offer',
        'description': '20-60 minute intimate close-up magic performance for 5-60 guests',
        'areaServed': 'Chicago, Illinois'
      }
    },
    {
      '@type': 'Service',
      'name': 'Parlour Magic Show',
      'description': 'Interactive stage magic performance for private events, corporate entertainment, and theatre venues.',
      'provider': {
        '@type': 'Person',
        'name': 'Abby Segal',
        'url': 'https://www.abbysegalmagic.com'
      },
      'serviceType': 'Entertainment',
      'areaServed': {
        '@type': 'City',
        'name': 'Chicago'
      },
      'offers': {
        '@type': 'Offer',
        'description': 'Interactive stage magic show for up to 80 guests',
        'areaServed': 'Chicago, Illinois'
      }
    },
    {
      '@type': 'Service',
      'name': 'Mingle Magic Performance',
      'description': 'Strolling and roaming close-up magic for corporate cocktail hours, wedding receptions, trade shows, and large private events in Chicago.',
      'provider': {
        '@type': 'Person',
        'name': 'Abby Segal',
        'url': 'https://www.abbysegalmagic.com'
      },
      'serviceType': 'Entertainment',
      'areaServed': {
        '@type': 'City',
        'name': 'Chicago'
      },
      'offers': {
        '@type': 'Offer',
        'description': '30 minute to 3+ hour strolling magic performance for 4-400 guests',
        'areaServed': 'Chicago, Illinois'
      }
    }
  ]
})

const shows = [
  {
    number: '01',
    title: 'Close-Up Magic',
    subtitle: 'Table-Side & Intimate',
    duration: 'Customizable (20–60 min)',
    audience: '5–60 guests',
    description: 'A unique and intimate magic show performed at a table surrounded by guests — personal and interactive, where the magic happens right there in front of you. Imagine a fun magic show in the comfort of your own living room, or a surprise addition to your corporate event.',
    experience: 'The rest of the room fades. For ten minutes, the table is its own little <em class="shimmer">planet</em>. Guests lean in. Phones come out. Someone asks if they can <em class="underline-sketch">keep a card</em>.',
    ideal: ['Private dinners', 'VIP corporate tables', 'Wedding sweetheart tables', 'Intimate receptions', 'Gallery openings'],
    videoMp4: '/assets/shows/close-up-30s.mp4',
    poster: '/assets/general/images/close-up-magician-chicago-performing.webp',
  },
  {
    number: '02',
    title: 'Parlour Show',
    subtitle: 'Stage & Interactive',
    duration: 'Customizable (30–60 min)',
    audience: 'Up to 80 guests',
    description: "A full interactive show where the audience is part of the performance. Volunteers come up. Impossible things happen. Predictions are revealed. It's theatrical, funny, and deeply personal — because Abby tailors every show to the room she's in. Debuted at the legendary Chicago Magic Lounge.",
    experience: 'Think comedy show meets impossible magic meets <em class="shimmer">"how is this possible."</em> Everyone has <em class="underline-sketch">the best seat in the house</em> because the magic happens <em class="shimmer">WITH the audience</em>.',
    ideal: ['Theatre & comedy venues', 'Corporate keynotes', 'Fundraiser galas', 'School assemblies', 'Birthday celebrations'],
    videoMp4: '/assets/shows/parlour-30s.mp4',
    poster: '/assets/press/images/parlour-magician-chicago-magic-lounge.webp',
  },
  {
    number: '03',
    title: 'Mingle Magic',
    subtitle: 'Strolling & Roaming',
    duration: '30 min – 3+ hours',
    audience: '4–400 guests total',
    description: 'Abby moves throughout your event, creating unforgettable moments wherever guests gather. Perfect for cocktail parties, bar and bat mitzvahs, fundraisers, weddings, and corporate events. Designed to keep the energy high and the room engaged — every group gets personal, interactive magic that gives them something to talk about long after the event ends.',
    experience: 'Guests pull their friends over. <em class="shimmer">"You HAVE to see what she just did."</em> The room hums louder as the night goes on.',
    ideal: ['Corporate cocktail hours', 'Wedding receptions', 'Trade shows & activations', 'Holiday parties', 'Product launches'],
    videoMp4: '/assets/shows/mingle-30s.mp4',
    poster: '/assets/press/images/press-2.webp',
  },
]

const videoFailed = ref<Record<string, boolean>>({})
function onVideoError(showNumber: string) {
  videoFailed.value[showNumber] = true
}

const videoRefs = ref<HTMLVideoElement[]>([])
let videoObserver: IntersectionObserver | null = null

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    videoRefs.value.forEach((v) => v?.pause())
    return
  }
  videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const v = entry.target as HTMLVideoElement
        if (entry.isIntersecting) {
          const p = v.play()
          if (p && typeof p.catch === 'function') p.catch(() => { /* autoplay blocked */ })
        } else {
          v.pause()
        }
      })
    },
    { threshold: 0.4 }
  )
  videoRefs.value.forEach((v) => v && videoObserver!.observe(v))
})

onUnmounted(() => {
  videoObserver?.disconnect()
  videoObserver = null
})
</script>

<template>
  <div class="shows-page">
    <section class="section shows-hero section--hero">
      <div class="container">
        <p class="heading-eyebrow reveal">Performances</p>
        <h1 class="heading-xl reveal reveal-delay-1">The <em class="shimmer">shows.</em></h1>
        <p class="body-lg reveal reveal-delay-2" style="max-width: 600px;">
          Every event is different. The magic should be too. Whether you're looking for a magician for hire for private events or corporate entertainment in Chicago, here's what Abby offers.
        </p>
        <div class="divider reveal reveal-delay-3" />
      </div>
    </section>

    <!-- Show Cards -->
    <section class="section">
      <div class="container">
        <div v-for="show in shows" :key="show.number" class="show-card reveal">
          <div class="show-card__media">
            <video
              v-if="!videoFailed[show.number]"
              ref="videoRefs"
              :poster="show.poster"
              autoplay
              loop
              muted
              playsinline
              preload="metadata"
              :aria-label="`${show.title} performance video`"
            >
              <source :src="show.videoMp4" type="video/mp4" @error="onVideoError(show.number)" />
            </video>
            <img
              v-else
              :src="show.poster"
              :alt="`${show.title} in Chicago — Abby Segal performing`"
              loading="lazy"
              decoding="async"
            />
            <div class="show-card__overlay">
              <span class="show-card__number">{{ show.number }}</span>
              <div class="show-card__headings">
                <h2 class="heading-lg show-card__title">{{ show.title }}</h2>
                <p class="show-card__subtitle">{{ show.subtitle }}</p>
              </div>
            </div>
          </div>

          <div class="show-card__content">
            <div class="show-card__details">
              <div class="show-card__meta">
                <div class="show-card__meta-item">
                  <span class="heading-eyebrow">Duration</span>
                  <p>{{ show.duration }}</p>
                </div>
                <div class="show-card__meta-item">
                  <span class="heading-eyebrow">Audience</span>
                  <p>{{ show.audience }}</p>
                </div>
              </div>
              <p class="body-md">{{ show.description }}</p>
              <p class="show-card__experience" v-html="show.experience"></p>
            </div>
            <div class="show-card__ideal">
              <p class="heading-eyebrow">Perfect for</p>
              <ul>
                <li v-for="item in show.ideal" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.shows-hero { padding-top: calc(var(--section-pad) + 80px); padding-bottom: 0; }
.shows-hero h1 em { color: var(--gold); font-style: normal; font-weight: 400; }

.show-card {
  border: 1px solid var(--ember);
  border-radius: var(--radius-lg);
  margin-bottom: 48px;
  transition: all 0.5s var(--ease-out);
  overflow: hidden;
}
.show-card:hover {
  border-color: rgba(141, 59, 120, 0.3);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
}

.show-card__media {
  position: relative;
  aspect-ratio: 16 / 9;
  width: 100%;
  background: #000;
  overflow: hidden;
}
.show-card__media video,
.show-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.show-card__overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  gap: 28px;
  padding: 56px 48px 40px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.55) 55%,
    transparent 100%
  );
  pointer-events: none;
}
.show-card__number {
  font-family: var(--font-display);
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  color: var(--gold);
  line-height: 0.9;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.7);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.show-card:hover .show-card__number {
  transform: scale(1.05);
}
.show-card__headings { flex: 1; min-width: 0; }
.show-card__title {
  color: var(--ivory);
  margin: 0;
  text-shadow: 0 2px 28px rgba(0, 0, 0, 0.85);
}
.show-card__subtitle {
  font-size: var(--text-body);
  color: rgba(255, 255, 255, 0.75);
  margin-top: 6px;
  text-shadow: 0 1px 16px rgba(0, 0, 0, 0.7);
}

.show-card__content {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 56px;
  padding: 48px;
  align-items: start;
}

.show-card__meta { display: flex; gap: 48px; margin-bottom: 24px; }
.show-card__meta-item p { font-size: var(--text-body-lg); font-weight: 500; margin-top: 4px; }
.show-card__experience {
  font-style: italic; color: var(--gold); font-size: var(--text-body); margin-top: 16px;
  padding-top: 16px; border-top: 1px solid var(--ember);
}
.show-card__ideal ul { list-style: none; padding: 0; margin-top: 12px; }
.show-card__ideal li { padding: 8px 0; border-bottom: 1px solid var(--ember); font-size: var(--text-body); color: var(--white-dim); }
.show-card__ideal li::before { content: '✦ '; color: var(--gold); font-size: 10px; }

@media (max-width: 1100px) {
  .show-card__content { grid-template-columns: 1fr; gap: 32px; }
  .show-card__ideal { border-top: 1px solid var(--ember); padding-top: 24px; }
}
@media (max-width: 768px) {
  .show-card { margin-bottom: 32px; }
  .show-card__overlay { padding: 40px 24px 20px; gap: 16px; }
  .show-card__content { padding: 28px 24px; gap: 24px; }
  .show-card__meta { gap: 28px; flex-wrap: wrap; }
}
</style>
