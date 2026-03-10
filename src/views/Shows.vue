<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal'
import { useSEO, buildBreadcrumbs } from '../composables/useSEO'
import Breadcrumbs from '../components/Breadcrumbs.vue'

useReveal()
useSEO({
  title: 'Magic Shows & Performances | Hire Chicago Magician Abby Segal for Events',
  description: 'Book Abby Segal — Chicago magician for hire for private events, corporate entertainment, weddings, and theatre. Close-up magic and sleight of hand performances available worldwide.',
  keywords: 'magician for hire, Chicago magician, private events, corporate entertainment, close-up magic, sleight of hand, magic show, performance, activities in Chicago, wedding magician',
  ogImage: '/assets/general/images/performance.webp',
  canonicalUrl: '/shows',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Close-Up Magic Performance',
      'description': 'Strolling and table-side close-up magic and sleight of hand for private events, corporate entertainment, and activities in Chicago.',
      'provider': {
        '@type': 'Person',
        'name': 'Abby Segal',
        'url': 'https://www.abbysegalmagic.com'
      },
      'serviceType': 'Entertainment',
      'areaServed': {
        '@type': 'City',
        'name': 'Chicago'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Parlour Magic Show',
      'description': 'Intimate stage magic performance for private events, corporate entertainment, and theatre venues.',
      'provider': {
        '@type': 'Person',
        'name': 'Abby Segal',
        'url': 'https://www.abbysegalmagic.com'
      },
      'serviceType': 'Entertainment',
      'areaServed': {
        '@type': 'City',
        'name': 'Chicago'
      }
    },
    buildBreadcrumbs([
      { name: 'Home', url: 'https://www.abbysegalmagic.com/' },
      { name: 'Shows', url: 'https://www.abbysegalmagic.com/shows' }
    ])
  ]
})

const shows = [
  {
    number: '01',
    title: 'Close-Up Magic',
    subtitle: 'Strolling & Table-Side',
    duration: '45 minutes',
    audience: '4 – 400 guests',
    description: 'Abby moves through your event, performing for small groups at a time. Cards transform <em class="underline-sketch">in your hands</em>. Coins <em class="shimmer">vanish while you\'re holding them</em>. Someone\'s watch ends up somewhere it <em>shouldn\'t</em>. The magic happens <em class="shimmer">inches from your eyes</em> - <em class="underline-sketch">no stage, no distance, no place to hide</em>. Your guests will grab their friends and say <em class="shimmer">"you HAVE to see this."</em>',
    experience: 'Guests don\'t watch the show - <em class="underline-sketch">they\'re IN the show</em>. Expect laughter, gasps, and at least one person saying <em class="shimmer">"do that again"</em> (she won\'t).',
    ideal: ['Corporate cocktail hours', 'Wedding receptions', 'Private dinners', 'Holiday parties', 'Trade shows & activations'],
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
  },
]

const addOns = [
  { icon: '🎓', title: 'Magic Workshops', desc: 'Private or group magic instruction. Learn <em class="shimmer">real sleight of hand</em> from someone who\'s been teaching since <em class="underline-sketch">sixth grade</em>. Perfect for team-building, kids\' parties, or aspiring magicians.' },
  { icon: '🎨', title: 'Custom Routines', desc: '<em class="shimmer">Brand magic.</em> Abby can design a routine around your company, product, or event theme. <em class="underline-sketch">Your logo appears on a card.</em> That sort of thing.' },
  { icon: '🎤', title: 'MC & Hosting', desc: 'Need someone to run the evening? Abby can MC with <em class="shimmer">magic woven throughout</em> - transitions, surprises, and the occasional <em class="underline-sketch">impossible moment</em> between courses.' },
  { icon: '📚', title: 'Children\'s Book', desc: '"Shelly Shazam!" - Abby\'s children\'s book about creativity and imagination. Sold on Amazon and at <em class="shimmer">The Magic Castle</em>. Great gift for young magic fans.' },
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
</script>

<template>
  <div class="shows-page">
    <div class="container">
      <Breadcrumbs />
    </div>
    <section class="section shows-hero">
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

    <!-- CTA -->
    <section class="section" style="border-top: 1px solid var(--ember); background: var(--obsidian);">
      <div class="container" style="text-align: center;">
        <h2 class="heading-lg reveal">Ready to <em>book?</em></h2>
        <p class="body-lg reveal reveal-delay-1" style="max-width: 480px; margin: 16px auto 32px;">
          Tell me about your event and I'll put together the perfect magic experience.
          Custom quotes within 24 hours.
        </p>
        <router-link to="/contact" class="btn btn--filled reveal reveal-delay-2"><span>Get a Quote</span></router-link>
      </div>
    </section>
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
.show-card:hover .show-card__number { color: var(--gold); text-shadow: 0 0 30px rgba(201, 168, 76, 0.4); transform: scale(1.1); }
.show-card__subtitle { font-size: var(--text-body-sm); color: var(--white-muted); margin-top: 4px; }
.show-card__body { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; padding: 40px; }
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

@media (max-width: 768px) {
  .show-card__body { grid-template-columns: 1fr; }
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
