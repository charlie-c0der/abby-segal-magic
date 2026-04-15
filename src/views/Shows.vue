<script setup lang="ts">
import { ref } from 'vue'
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
  ogImage: '/assets/general/images/performance.webp',
  ogType: 'article',
  canonicalUrl: '/shows',
  priority: 1.0,
  changeFreq: 'monthly',
  
  // Performance optimization
  preloadImages: [
    '/assets/general/images/performance.webp',
    '/assets/press/images/press-show.webp'
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
    poster: '/assets/general/images/performance.webp',
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
    poster: '/assets/press/images/press-show.webp',
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
  { icon: '🎤', title: 'MC & Hosting', desc: 'Need someone to run the evening? Abby can MC with <em class="shimmer">magic woven throughout</em> - transitions, surprises, and the occasional <em class="underline-sketch">impossible moment</em> between courses.' },
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
          <div class="show-card__header">
            <span class="show-card__number">{{ show.number }}</span>
            <div>
              <h2 class="heading-lg">{{ show.title }}</h2>
              <p class="show-card__subtitle">{{ show.subtitle }}</p>
            </div>
          </div>

          <div class="show-card__body">
            <div class="show-card__video">
              <video
                v-if="!videoFailed[show.number]"
                :poster="show.poster"
                controls
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
                :alt="`${show.title} performance`"
                loading="lazy"
                decoding="async"
              />
            </div>
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
    <section class="section" style="border-top: 1px solid var(--ember); background: var(--obsidian);">
      <div class="container">
        <p class="heading-eyebrow reveal" style="text-align: center;">Also Available</p>
        <h2 class="heading-lg reveal reveal-delay-1" style="text-align: center; margin-bottom: 48px;">
          Beyond the <em>show.</em>
        </h2>
        <div class="addons-grid addons-grid--4">
          <div v-for="(a, i) in addOns" :key="a.title" class="card reveal" :class="`reveal-delay-${(i % 4)+1}`">
            <span class="addon-icon">{{ a.icon }}</span>
            <h3 class="heading-md" style="font-size: var(--text-card-title); margin: 12px 0 8px;">{{ a.title }}</h3>
            <p class="body-md" v-html="a.desc"></p>
          </div>
        </div>
      </div>
    </section>

    <!-- Performance Gallery -->
    <section class="section performance-gallery">
      <div class="container">
        <p class="heading-eyebrow reveal" style="text-align: center;">In Action</p>
        <h2 class="heading-lg reveal reveal-delay-1" style="text-align: center; margin-bottom: 48px;">
          See the <em class="shimmer">magic happen</em>.
        </h2>
        
        <div class="gallery-grid">
          <div class="gallery-item reveal reveal-delay-1">
            <img src="/assets/general/images/performance.webp" alt="Abby performing close-up magic" loading="lazy" decoding="async" />
            <div class="gallery-overlay">
              <h3>Close-Up Performance</h3>
            </div>
          </div>
          <div class="gallery-item reveal reveal-delay-2">
            <img src="/assets/press/images/press-show.webp" alt="Abby performing at Chicago Magic Lounge" loading="lazy" decoding="async" />
            <div class="gallery-overlay">
              <h3>Parlour Show</h3>
            </div>
          </div>
          <div class="gallery-item reveal reveal-delay-3">
            <img src="/assets/press/images/press-2.webp" alt="Audience reaction during Abby's performance" loading="lazy" decoding="async" />
            <div class="gallery-overlay">
              <h3>Audience Reactions</h3>
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

.show-card { border: 1px solid var(--ember); border-radius: var(--radius-lg); margin-bottom: 32px; transition: all 0.5s var(--ease-out); overflow: hidden; }
.show-card:hover { border-color: rgba(141, 59, 120, 0.3); box-shadow: 0 16px 50px rgba(0,0,0,0.3); }
.show-card__header { display: flex; align-items: center; gap: 24px; padding: 40px; border-bottom: 1px solid var(--ember); }
.show-card__number {
  font-family: var(--font-display); font-size: var(--text-hero); font-weight: 900; letter-spacing: -0.03em; color: var(--gold-dim); line-height: 1;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.show-card:hover .show-card__number { color: var(--gold); text-shadow: 0 0 30px rgba(170, 136, 51, 0.4); transform: scale(1.1); }
.show-card__subtitle { font-size: var(--text-body-sm); color: var(--white-muted); margin-top: 4px; }
.show-card__body { display: grid; grid-template-columns: minmax(300px, 1.1fr) 1.4fr 0.9fr; gap: 40px; padding: 40px; align-items: start; }
.show-card__video {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: #000;
  aspect-ratio: 16 / 9;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  border: 1px solid var(--ember);
}
.show-card__video video,
.show-card__video img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  background: #000;
}
.show-card__meta { display: flex; gap: 40px; margin-bottom: 20px; }
.show-card__meta-item p { font-size: var(--text-body-lg); font-weight: 500; margin-top: 4px; }
.show-card__experience {
  font-style: italic; color: var(--plum); font-size: var(--text-body); margin-top: 16px;
  padding-top: 16px; border-top: 1px solid var(--ember);
}
.show-card__ideal ul { list-style: none; padding: 0; margin-top: 12px; }
.show-card__ideal li { padding: 8px 0; border-bottom: 1px solid var(--ember); font-size: var(--text-body); color: var(--white-dim); }
.show-card__ideal li::before { content: '✦ '; color: var(--gold); font-size: 10px; }

.addons-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.addons-grid--4 { grid-template-columns: repeat(4, 1fr); }
.addon-icon { font-size: 32px; }

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

/* Performance Gallery */
.performance-gallery {
  background: var(--obsidian);
  border-top: 1px solid var(--ember);
  border-bottom: 1px solid var(--ember);
}

.performance-gallery h2 em {
  color: var(--gold);
  font-style: italic;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.gallery-item {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  aspect-ratio: 4/3;
  cursor: pointer;
  transition: transform 0.3s var(--ease-out);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.gallery-item:hover {
  transform: translateY(-5px);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease-out);
}

.gallery-item:hover img {
  transform: scale(1.1);
}

.gallery-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(9, 9, 14, 0.85));
  color: white;
  padding: 2rem 1.5rem 1.5rem;
  transform: translateY(100%);
  transition: transform 0.3s var(--ease-out);
}

.gallery-item:hover .gallery-overlay {
  transform: translateY(0);
}

.gallery-overlay h3 {
  font-family: var(--font-display);
  font-size: var(--text-body);
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0;
  color: var(--gold);
}

@media (max-width: 1100px) {
  .show-card__body { grid-template-columns: minmax(260px, 1fr) 1.4fr; gap: 32px; }
  .show-card__ideal { grid-column: 1 / -1; border-top: 1px solid var(--ember); padding-top: 24px; }
}
@media (max-width: 768px) {
  .show-card__body { grid-template-columns: 1fr; gap: 24px; }
  .show-card__ideal { grid-column: auto; }
  .show-card__header { flex-direction: column; align-items: flex-start; gap: 12px; }
  .show-card__number { font-size: var(--text-subtitle); }
  .addons-grid, .addons-grid--4 { grid-template-columns: 1fr 1fr; }
  .gallery-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  @media (max-width: 480px) { 
    .addons-grid, .addons-grid--4 { grid-template-columns: 1fr; }
    .gallery-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
