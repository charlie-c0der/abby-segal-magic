<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal'
import { useSEO } from '../composables/useSEO'
import Breadcrumbs from '../components/Breadcrumbs.vue'

useReveal()
useSEO({
  title: 'Magic Shows & Performances | Abby Segal Chicago Magician',
  description: 'Book Abby Segal for corporate events, private parties, weddings, and theatre shows. Close-up magic and parlour performances available worldwide.',
  ogImage: '/images/performance.webp',
  canonicalUrl: '/shows'
})

const shows = [
  {
    number: '01',
    title: 'Close-Up Magic',
    subtitle: 'Strolling & Table-Side',
    duration: '45 minutes',
    audience: '4 – 400 guests',
    description: 'Abby moves through your event, performing for small groups at a time. Cards transform in your hands. Coins vanish while you\'re holding them. Someone\'s watch ends up somewhere it shouldn\'t. The magic happens inches from your eyes - no stage, no distance, no place to hide. Your guests will grab their friends and say "you HAVE to see this."',
    experience: 'Guests don\'t watch the show - they\'re IN the show. Expect laughter, gasps, and at least one person saying "do that again" (she won\'t).',
    ideal: ['Corporate cocktail hours', 'Wedding receptions', 'Private dinners', 'Holiday parties', 'Trade shows & activations'],
  },
  {
    number: '02',
    title: 'Parlour Show',
    subtitle: 'Stage & Interactive',
    duration: 'Customizable (30–60 min)',
    audience: 'Up to 80 guests',
    description: 'A full interactive show where the audience is part of the performance. Volunteers come up. Minds are read. Impossible predictions are revealed. It\'s theatrical, funny, and deeply personal - because Abby tailors every show to the room she\'s in. Debuted at the legendary Chicago Magic Lounge.',
    experience: 'Think comedy show meets mind-reading meets "how is this possible." Everyone has the best seat in the house because the magic happens WITH the audience.',
    ideal: ['Theatre & comedy venues', 'Corporate keynotes', 'Fundraiser galas', 'School assemblies', 'Birthday celebrations'],
  },
]

const addOns = [
  { icon: '🎓', title: 'Magic Workshops', desc: 'Private or group magic instruction. Learn real sleight of hand from someone who\'s been teaching since sixth grade. Perfect for team-building, kids\' parties, or aspiring magicians.' },
  { icon: '🎨', title: 'Custom Routines', desc: 'Brand magic. Abby can design a routine around your company, product, or event theme. Your logo appears on a card. That sort of thing.' },
  { icon: '🎤', title: 'MC & Hosting', desc: 'Need someone to run the evening? Abby can MC with magic woven throughout - transitions, surprises, and the occasional mind-read between courses.' },
  { icon: '📚', title: 'Children\'s Book', desc: '"Shelly Shazam!" - Abby\'s children\'s book about creativity and imagination. Sold on Amazon and at The Magic Castle. Great gift for young magic fans.' },
]

const faqs = [
  { q: 'How far in advance should I book?', a: 'As early as possible. Weekends fill up fast, especially during holiday season (October–December). Two to four weeks is usually fine, but earlier is better.' },
  { q: 'How much does it cost?', a: 'It depends on the event - format, duration, travel, and guest count all factor in. Reach out with your details and I\'ll put together a custom quote within 24 hours.' },
  { q: 'Do you travel?', a: 'Yes! Based in Chicago, available worldwide. I\'ve performed in Helsinki, Amsterdam, Las Vegas, New York, and everywhere in between. Travel fees may apply for events outside the Chicago area.' },
  { q: 'What about virtual events?', a: 'Absolutely. Virtual magic shows work surprisingly well - interactive, engaging, and perfect for remote teams. I\'ve done them for companies across the country.' },
  { q: 'Is it appropriate for all ages?', a: 'Yes. The magic is sophisticated enough for adults and accessible enough for kids. No crude humor, no scary stuff. Just genuine astonishment.' },
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
          Every event is different. The magic should be too. Here's what
          Abby offers - and what your guests will be talking about the next day.
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
              <p class="body-md">{{ show.description }}</p>
              <p class="show-card__experience">{{ show.experience }}</p>
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
    <section class="section" style="border-top: 1px solid var(--black-border); background: var(--black-soft);">
      <div class="container">
        <p class="heading-eyebrow reveal" style="text-align: center;">Also Available</p>
        <h2 class="heading-lg reveal reveal-delay-1" style="text-align: center; margin-bottom: 48px;">
          Beyond the <em>show.</em>
        </h2>
        <div class="addons-grid addons-grid--4">
          <div v-for="(a, i) in addOns" :key="a.title" class="card reveal" :class="`reveal-delay-${(i % 4)+1}`">
            <span class="addon-icon">{{ a.icon }}</span>
            <h3 class="heading-md" style="font-size: 22px; margin: 12px 0 8px;">{{ a.title }}</h3>
            <p class="body-md">{{ a.desc }}</p>
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
            @click="openFaq = openFaq === i ? null : i as number"
          >
            <div class="faq-item__q">
              <h3>{{ faq.q }}</h3>
              <span class="faq-item__toggle">{{ openFaq === i ? '−' : '+' }}</span>
            </div>
            <div class="faq-item__a" v-show="openFaq === i">
              <p class="body-md">{{ faq.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section" style="border-top: 1px solid var(--black-border); background: var(--black-soft);">
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
.shows-hero h1 em, h2 em { color: var(--gold); font-style: italic; }

.show-card { border: 1px solid var(--black-border); border-radius: var(--radius-lg); margin-bottom: 32px; transition: all 0.5s var(--ease-out); overflow: hidden; }
.show-card:hover { border-color: rgba(196, 132, 122, 0.3); box-shadow: 0 16px 50px rgba(0,0,0,0.3); }
.show-card__header { display: flex; align-items: center; gap: 24px; padding: 40px; border-bottom: 1px solid var(--black-border); }
.show-card__number {
  font-family: var(--font-mono); font-size: 48px; color: var(--gold-dim); line-height: 1;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.show-card:hover .show-card__number { color: var(--gold); text-shadow: 0 0 30px rgba(201, 168, 76, 0.4); transform: scale(1.1); }
.show-card__subtitle { font-size: 14px; color: var(--white-muted); margin-top: 4px; }
.show-card__body { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; padding: 40px; }
.show-card__meta { display: flex; gap: 40px; margin-bottom: 20px; }
.show-card__meta-item p { font-size: 18px; font-weight: 500; margin-top: 4px; }
.show-card__experience {
  font-style: italic; color: var(--rose); font-size: 15px; margin-top: 16px;
  padding-top: 16px; border-top: 1px solid var(--black-border);
}
.show-card__ideal ul { list-style: none; padding: 0; margin-top: 12px; }
.show-card__ideal li { padding: 8px 0; border-bottom: 1px solid var(--black-border); font-size: 15px; color: var(--white-dim); }
.show-card__ideal li::before { content: '✦ '; color: var(--gold); font-size: 10px; }

.addons-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.addons-grid--4 { grid-template-columns: repeat(4, 1fr); }
.addon-icon { font-size: 32px; }

/* FAQ */
.faq-list { display: flex; flex-direction: column; gap: 0; }
.faq-item {
  border-bottom: 1px solid var(--black-border); cursor: pointer;
  transition: background 0.3s;
}
.faq-item:first-child { border-top: 1px solid var(--black-border); }
.faq-item:hover { background: rgba(196, 132, 122, 0.03); }
.faq-item__q {
  display: flex; justify-content: space-between; align-items: center;
  padding: 24px 0;
}
.faq-item__q h3 { font-family: var(--font-display); font-size: 18px; font-weight: 500; }
.faq-item__toggle {
  font-size: 24px; color: var(--gold); flex-shrink: 0; width: 32px; text-align: center;
  transition: transform 0.3s;
}
.faq-item--open .faq-item__toggle { transform: rotate(180deg); }
.faq-item__a { padding-bottom: 24px; }
.faq-item__a p { color: var(--white-dim); max-width: 650px; }

@media (max-width: 768px) {
  .show-card__body { grid-template-columns: 1fr; }
  .show-card__header { flex-direction: column; align-items: flex-start; gap: 12px; }
  .addons-grid, .addons-grid--4 { grid-template-columns: 1fr 1fr; }
  @media (max-width: 480px) { .addons-grid, .addons-grid--4 { grid-template-columns: 1fr; } }
}
</style>
