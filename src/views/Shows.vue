<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useReveal } from '../composables/useReveal'
import { useWorldClassSEO, generateFAQSchema, generateLocalBusinessSchema } from '../composables/useWorldClassSEO'

useReveal()
// World-class SEO for Shows page with FAQ and Local Business schema
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
  
  // Enhanced structured data with FAQ and Local Business
  jsonLd: [
    generateLocalBusinessSchema(),
    generateFAQSchema([
      {
        question: 'What types of magic shows does Abby offer?',
        answer: 'Abby offers three formats: Close-Up Magic (intimate table-side sleight of hand for 4-12 guests per table), Parlour Shows (interactive stage magic for up to 80 people), and Mingle Magic (strolling magic that moves through the room for up to 400 guests).'
      },
      {
        question: 'How much does it cost to hire Abby for an event?',
        answer: 'Pricing varies based on event type, duration, guest count, and location. Contact Abby for a personalized quote for your specific event needs.'
      },
      {
        question: 'What areas does Abby perform in?',
        answer: 'Abby is based in Chicago and primarily serves the Chicago metropolitan area and Illinois, but is available for events nationwide and internationally.'
      },
      {
        question: 'How far in advance should I book?',
        answer: 'Popular dates book months in advance, especially for weddings and corporate events. Contact Abby as early as possible to secure your preferred date.'
      },
      {
        question: 'What makes Abby different from other magicians?',
        answer: 'Abby specializes in close-up magic and sleight of hand, performs at the prestigious Chicago Magic Lounge, and has been featured on Penn & Teller: Fool Us. She brings both technical skill and engaging personality to every performance.'
      }
    ]),
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
        'description': '20-60 minute intimate close-up magic performance for 4-12 guests per table',
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
    audience: '4 – 12 guests per table',
    description: 'The deck is <em class="underline-sketch">six inches away</em>. Cards transform <em class="shimmer">in your hands</em>. A coin vanishes <em>between your fingers</em>. No stage, no distance — just you, the deck, and the impossible happening <em class="shimmer">as you watch it</em>. Every detail checked, every angle covered. This is sleight of hand at its most <em class="underline-sketch">uncompromising</em>.',
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
    description: 'A full interactive show where <em class="underline-sketch">the audience is part of the performance</em>. Volunteers come up. <em class="shimmer">Impossible things happen</em>. Predictions are revealed. It\'s theatrical, funny, and <em>deeply personal</em> - because Abby <em class="underline-sketch">tailors every show</em> to the room she\'s in. Debuted at the <em class="shimmer">legendary Chicago Magic Lounge</em>.',
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
    audience: '4 – 400 guests total',
    description: 'Abby moves <em class="underline-sketch">through your event</em>, hitting every pocket of the room. Five minutes here, seven there. By the end of the cocktail hour, <em class="shimmer">everyone has a story</em>. Cards change color in someone\'s pocket. A ring disappears from a hand and appears <em>in a drink</em>. The magic <em class="shimmer">travels</em> — so do the gasps.',
    experience: 'Guests pull their friends over. <em class="shimmer">"You HAVE to see what she just did."</em> The room hums louder as the night goes on.',
    ideal: ['Corporate cocktail hours', 'Wedding receptions', 'Trade shows & activations', 'Holiday parties', 'Product launches'],
    videoMp4: '/assets/shows/mingle-30s.mp4',
    poster: '/assets/press/images/press-2.webp',
  },
]

const addOns = [
  { icon: '🎓', title: 'Magic Workshops', desc: 'Private or group magic instruction. Learn <em class="shimmer">real sleight of hand</em> from someone who\'s been teaching since <em class="underline-sketch">sixth grade</em>. Perfect for team-building, kids\' parties, or aspiring magicians.' },
  { icon: '🎨', title: 'Custom Routines', desc: '<em class="shimmer">Brand magic.</em> Abby can design a routine around your company, product, or event theme. <em class="underline-sketch">Your logo appears on a card.</em> That sort of thing.' },
]

const faqs = [
  { q: 'How far in advance should I book?', a: 'As early as possible. <em class="shimmer">Weekends fill up fast</em>, especially during holiday season (October–December). Two to four weeks is usually fine, but <em class="underline-sketch">earlier is better</em>.' },
  { q: 'How much does it cost?', a: 'It depends on the event - format, duration, travel, and guest count all factor in. Reach out with your details and I\'ll put together a <em class="shimmer">custom quote within 24 hours</em>.' },
  { q: 'Do you travel?', a: 'Yes! Based in Chicago, <em class="shimmer">available worldwide</em>. I\'ve performed in <em class="underline-sketch">Helsinki, Amsterdam, Las Vegas, New York</em>, and everywhere in between. Travel fees may apply for events outside the Chicago area.' },
  { q: 'What about virtual events?', a: 'Absolutely. Virtual magic shows work <em class="shimmer">surprisingly well</em> - interactive, engaging, and perfect for remote teams. I\'ve done them for companies <em class="underline-sketch">across the country</em>.' },
  { q: 'Is it appropriate for all ages?', a: 'Yes. The magic is <em class="shimmer">sophisticated enough for adults</em> and <em class="underline-sketch">accessible enough for kids</em>. No crude humor, no scary stuff. Just <em class="shimmer">genuine astonishment</em>.' },
  { q: 'What do you need from us?', a: 'Almost nothing. A place to stand and people to astonish. For close-up magic: just a room with guests. For parlour shows: a small stage or designated area, and ideally a microphone for larger groups.' },
]

const openFaq = ref<number | null>(null)

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
              <p class="body-md" v-html="show.description"></p>
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

    <!-- Add-ons -->
    <section class="section section--compact addons-section">
      <div class="container">
        <p class="heading-eyebrow reveal" style="text-align: center;">Also Available</p>
        <h2 class="heading-md reveal reveal-delay-1" style="text-align: center; margin-bottom: 32px;">
          Beyond the <em>show.</em>
        </h2>
        <div class="addons-grid">
          <div v-for="(a, i) in addOns" :key="a.title" class="card card--compact reveal" :class="`reveal-delay-${(i % 4)+1}`">
            <span class="addon-icon">{{ a.icon }}</span>
            <div>
              <h3 class="addon-title">{{ a.title }}</h3>
              <p class="body-md" v-html="a.desc"></p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section">
      <div class="container" style="max-width: 800px;">
        <p class="heading-eyebrow reveal" style="text-align: center;">Questions</p>
        <h2 class="heading-lg reveal reveal-delay-1" style="text-align: center; margin-bottom: 48px;">
          Frequently <em>asked.</em>
        </h2>

        <div class="faq-list">
          <div
            v-for="(faq, i) in faqs"
            :key="i"
            class="faq-item reveal"
            :class="[`reveal-delay-${(i % 4) + 1}`, { 'faq-item--open': openFaq === i }]"
          >
            <div 
              class="faq-item__q"
              @click="openFaq = openFaq === i ? null : i as number"
              @keydown.enter="openFaq = openFaq === i ? null : i as number"
              @keydown.space.prevent="openFaq = openFaq === i ? null : i as number"
              tabindex="0"
              role="button"
              :aria-expanded="openFaq === i"
              :aria-controls="`faq-answer-${i}`"
            >
              <h3>{{ faq.q }}</h3>
              <span class="faq-item__toggle" aria-hidden="true">{{ openFaq === i ? '−' : '+' }}</span>
            </div>
            <div 
              v-show="openFaq === i" 
              class="faq-item__a"
              :id="`faq-answer-${i}`"
              role="region"
            >
              <p class="body-md" v-html="faq.a"></p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Booking CTA section removed - redundant with header/footer -->
  </div>
</template>

<style scoped>
.shows-hero { padding-top: calc(var(--section-pad) + 80px); padding-bottom: 0; }
.shows-hero h1 em, h2 em { color: var(--gold); font-style: normal; font-weight: 400; }

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
  font-style: italic; color: var(--plum); font-size: var(--text-body); margin-top: 16px;
  padding-top: 16px; border-top: 1px solid var(--ember);
}
.show-card__ideal ul { list-style: none; padding: 0; margin-top: 12px; }
.show-card__ideal li { padding: 8px 0; border-bottom: 1px solid var(--ember); font-size: var(--text-body); color: var(--white-dim); }
.show-card__ideal li::before { content: '✦ '; color: var(--gold); font-size: 10px; }

/* Addons (compact, 2 items) */
.addons-section { padding-top: 64px; padding-bottom: 64px; border-top: 1px solid var(--ember); background: var(--obsidian); }
.addons-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 880px;
  margin: 0 auto;
}
.card--compact {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 24px;
}
.addon-icon { font-size: 28px; line-height: 1; flex-shrink: 0; }
.addon-title {
  font-family: var(--font-display);
  font-size: var(--text-card-title);
  margin: 0 0 6px;
  color: var(--ivory);
}
.card--compact .body-md { font-size: var(--text-body-sm); }

/* FAQ */
.faq-list { display: flex; flex-direction: column; gap: 0; }
.faq-item {
  border-bottom: 1px solid var(--ember); cursor: pointer;
  transition: background 0.3s;
}
.faq-item:first-child { border-top: 1px solid var(--ember); }
.faq-item:hover { background: rgba(141, 59, 120, 0.03); }
.faq-item__q {
  display: flex; justify-content: space-between; align-items: center;
  padding: 24px 0;
}
.faq-item__q h3 { font-family: var(--font-display); font-size: var(--text-body-lg); font-weight: 600; }
.faq-item__toggle {
  font-size: 24px; color: var(--gold); flex-shrink: 0; width: 32px; text-align: center;
  transition: transform 0.3s;
}
.faq-item--open .faq-item__toggle { transform: rotate(180deg); }
.faq-item__a { padding-bottom: 24px; }
.faq-item__a p { color: var(--white-dim); max-width: 650px; }

@media (max-width: 1100px) {
  .show-card__content { grid-template-columns: 1fr; gap: 32px; }
  .show-card__ideal { border-top: 1px solid var(--ember); padding-top: 24px; }
}
@media (max-width: 768px) {
  .show-card { margin-bottom: 32px; }
  .show-card__overlay { padding: 40px 24px 20px; gap: 16px; }
  .show-card__content { padding: 28px 24px; gap: 24px; }
  .show-card__meta { gap: 28px; flex-wrap: wrap; }
  .addons-grid { grid-template-columns: 1fr; gap: 16px; }
}
</style>
