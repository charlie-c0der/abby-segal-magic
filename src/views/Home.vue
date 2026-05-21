<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import { useReveal } from '../composables/useReveal'
import { useParticles } from '../composables/useParticles'
import { useSplitText } from '../composables/useSplitText'
import { useTilt } from '../composables/useTilt'
import { useWorldClassSEO } from '../composables/useWorldClassSEO'
import HeroVideo from '../components/HeroVideo.vue'
import BrandWall from '../components/BrandWall.vue'
import BookingForm from '../components/BookingForm.vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

useReveal()
useParticles('hero-particles', 60)
useSplitText()
useTilt('.tilt-card')
// World-class SEO optimization
useWorldClassSEO({
  title: 'Abby Segal — Chicago Magician | Close-Up Magic & Sleight of Hand Entertainment',
  description: 'Chicago magician Abby Segal specializes in close-up magic, sleight of hand, and parlour performances for private events, corporate entertainment, and theatre. As seen on Penn & Teller: Fool Us.',

  // Enhanced keyword targeting with priority keywords
  focusKeyphrases: [
    'Chicago magician for hire',
    'Abby Segal Chicago Magic',
    'close-up magic entertainment Chicago',
    'sleight of hand magician Chicago',
    'Chicago Magic Lounge performer'
  ],
  semanticKeywords: [
    'Chicago entertainment services',
    'activities in Chicago magic shows',
    'private events magician Chicago',
    'Chicago magician performance',
    'magic entertainment Chicago',
    'professional sleight of hand Chicago',
    'Chicago corporate entertainment',
    'magician for hire Chicago area',
    'Chicago private party entertainment',
    'close-up magic Chicago performer',
    'Chicago event entertainment services',
    'Abby Segal magician Chicago',
    'Chicago Magic Lounge resident performer',
    'Chicago sleight of hand expert',
    'magic shows activities in Chicago',
    'Chicago professional magician',
    'entertainment for private events Chicago',
    'Chicago corporate magic shows',
    'close-up magic sleight of hand Chicago'
  ],

  // Technical SEO
  ogImage: '/assets/general/images/close-up-magician-chicago-performing.webp',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  canonicalUrl: '/',
  priority: 1.0,
  changeFreq: 'weekly',

  // Performance optimization
  preloadImages: [
    '/assets/portraits/images/close-up-magician-chicago-abby-segal.webp',
    '/assets/hero/hero-poster.webp'
  ],
  prefetchLinks: [
    '/shows',
    '/contact',
    '/about'
  ],

  contentType: 'service'
})

const heroLoaded = ref(false)
const scrollTriggers: ScrollTrigger[] = []

const corporateBrands = [
  { name: 'Ritter Sport', src: '/assets/brands/ritter-sport.webp', alt: 'Ritter Sport — corporate magic client of Abby Segal' },
  { name: 'BCLP', src: '/assets/brands/bclp.webp', alt: 'Bryan Cave Leighton Paisner — corporate magic client of Abby Segal' },
  { name: 'DLA Piper', src: '/assets/brands/dla-piper.webp', alt: 'DLA Piper — corporate magic client of Abby Segal', lightBg: true },
  { name: 'RapidSOS', src: '/assets/brands/rapidsos.webp', alt: 'RapidSOS — corporate magic client of Abby Segal' },
]

const venueBrands = [
  { name: 'Chicago Magic Lounge', src: '/assets/brands/chicago-magic-lounge.webp', alt: 'Chicago Magic Lounge — Abby Segal is a resident performer' },
  { name: 'The Magic Castle', src: '/assets/brands/magic-castle.webp', alt: 'The Academy of Magical Arts / Magic Castle, Hollywood — Abby Segal has performed here' },
  { name: 'Helsinki Magic Show', src: '/assets/brands/helsinki-magic-show.webp', alt: 'Helsinki Magic Show — Abby Segal has performed at this international festival' },
  { name: 'Amsterdam Magic Show', src: '/assets/brands/amsterdam-magic-show.webp', alt: 'Amsterdam Magic Show — Abby Segal has performed at this international festival', lightBg: true },
  { name: 'Genii Magazine', src: '/assets/brands/genii.webp', alt: 'Genii, The Conjurors Magazine — Abby Segal featured' },
  { name: 'Chicago BSides', src: '/assets/brands/chicago-bsides.webp', alt: 'Chicago BSides — Abby Segal performed at this conference' },
]

const testimonials = [
  {
    quote: 'Your style is so humble and sweet, and still confident.',
    author: 'Penn Jillette',
    context: 'Penn & Teller: Fool Us, CW',
  },
  {
    quote: 'From minute one, she pulled us in. She was very natural, which is unusual for someone of her age. Very conversational and just calming to watch.',
    author: 'Evan Northrup',
    context: 'Professional Magician, quoted in Lowell Sun',
  },
  {
    quote: 'She was actually better than me at the magic within three years. She would show me better ways of doing things I was trying to do.',
    author: 'David Penn',
    context: "Abby's first mentor, Patch.com",
  },
  {
    quote: 'Abby Segal is a rising young star in magic. She has lectured at Magifest and is a featured performer at The Chicago Magic Lounge.',
    author: 'Penguin Magic Podcast',
    context: 'Season 6, Episode 16',
  },
]

const featuredReaction = testimonials[0]!
const otherReactions = testimonials.slice(1)

function scrollToBooking() {
  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(async () => {
  await nextTick()
  setTimeout(() => { heroLoaded.value = true }, 200)

  const st1 = gsap.to('.hero__title', {
    yPercent: -30,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 },
  }).scrollTrigger
  if (st1) scrollTriggers.push(st1)

  const st2 = gsap.to('.hero__subtitle', {
    yPercent: -15, opacity: 0, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: '60% top', scrub: 1 },
  }).scrollTrigger
  if (st2) scrollTriggers.push(st2)

  // Horizontal scroll only on desktop — mobile uses CSS snap-scroll
  const showsTrack = document.querySelector<HTMLElement>('.shows-horizontal__track')
  if (showsTrack && window.innerWidth > 768) {
    const getDistance = () => Math.max(0, showsTrack.scrollWidth - window.innerWidth)
    const st3 = gsap.to(showsTrack, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: '.shows-horizontal',
        start: 'top top',
        end: () => '+=' + getDistance(),
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    }).scrollTrigger
    if (st3) scrollTriggers.push(st3)
  }

  document.querySelectorAll('.img-reveal').forEach((el) => {
    const st = ScrollTrigger.create({ trigger: el, start: 'top 80%', onEnter: () => el.classList.add('revealed'), once: true })
    scrollTriggers.push(st)
  })

  const st4 = gsap.to('.hero__card', {
    yPercent: -40, rotation: 20, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 2 },
  }).scrollTrigger
  if (st4) scrollTriggers.push(st4)
})

onUnmounted(() => {
  scrollTriggers.forEach(st => st.kill())
  scrollTriggers.length = 0
})
</script>

<template>
  <div class="home">
    <!-- ━━━ 1. HERO ━━━ -->
    <section class="hero">
      <canvas id="hero-particles" class="hero__particles" />
      <HeroVideo />
      <div class="hero__vignette" />
      <div class="blob blob--plum" style="width: 500px; height: 500px; left: -10%; top: 20%;" />
      <div class="blob blob--gold" style="width: 400px; height: 400px; right: -5%; bottom: 10%;" />

      <div class="hero__card" :class="{ loaded: heroLoaded }">
        <div class="hero__card-inner">
          <span class="hero__card-corner">A<br>♠</span>
          <span class="hero__card-suit">♠</span>
        </div>
      </div>

      <div class="hero__content container" :class="{ loaded: heroLoaded }">
        <p class="hero__eyebrow heading-eyebrow" data-split data-split-delay="0.3">WORLD-RENOWNED MAGICIAN &amp; SLEIGHT OF HAND ARTIST</p>
        <h1 class="hero__title heading-xl" data-split data-split-delay="0.6">
          Handcrafted Magic for <span class="shimmer">Real Reactions.</span>
        </h1>
        <div class="divider hero__divider" />
        <p class="hero__subtitle body-lg">Indulge your senses in wonder.</p>
        <p class="hero__tagline">Magician for Private Events &amp; Corporate Experiences</p>
        <div class="hero__actions">
          <button type="button" class="btn btn--filled magnetic glow-pulse" @click="scrollToBooking">
            <span>Book a Show</span>
          </button>
          <router-link to="/press" class="btn magnetic-element">
            <span>Watch Video</span>
          </router-link>
        </div>
        <p class="hero__credibility">Seen on Penn &amp; Teller: Fool Us &nbsp;·&nbsp; House Magician at the Chicago Magic Lounge &nbsp;·&nbsp; Hollywood's Magic Castle</p>
      </div>

      <div class="hero__scroll-indicator">
        <div class="hero__scroll-text">Scroll to explore</div>
        <div class="hero__scroll-line" />
      </div>
    </section>

    <!-- ━━━ 2. SOCIAL PROOF ━━━ -->
    <BrandWall
      eyebrow="Trusted by"
      title="In good <em class=&quot;shimmer&quot; style=&quot;color: var(--gold);&quot;>company</em>."
      :logos="corporateBrands"
    />
    <BrandWall
      eyebrow="As seen at"
      title="Venues and <em class=&quot;shimmer&quot; style=&quot;color: var(--gold);&quot;>industry stages</em>."
      :logos="venueBrands"
    />

    <!-- ━━━ 3. WHY ABBY ━━━ -->
    <section class="section why-abby">
      <div class="container why-abby__grid">
        <div class="why-abby__text">
          <p class="heading-eyebrow reveal">Why Abby</p>
          <p class="body-lg reveal reveal-delay-1">Abby Segal brings a modern approach to magic that feels personal, surprising, and impossible to forget. Her performances create moments of astonishment that pull people in and stay with them long after the event ends.</p>
          <p class="body-lg reveal reveal-delay-2">With over a decade of experience, appearances on Penn &amp; Teller: Fool Us, and performances at the Chicago Magic Lounge and venues worldwide, Abby brings originality and confidence to every room.</p>
          <p class="body-lg reveal reveal-delay-3">Whether performing for four guests or four hundred, Abby knows how to read a room, connect with people, and make your event unforgettable.</p>
          <blockquote class="why-abby__quote reveal reveal-delay-4">"I'm drawn to the moment when something shifts — that glimmer in someone's eyes when they've been confronted by astonishment, and the uncertainty that fills our world."</blockquote>
        </div>
        <div class="why-abby__visual reveal">
          <div class="img-reveal">
            <img src="/assets/portraits/images/portrait.webp" alt="Abby Segal — Chicago magician, professional portrait" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </section>

    <!-- ━━━ 4. REAL REACTIONS ━━━ -->
    <section class="section reactions-section">
      <div class="container">
        <p class="heading-eyebrow reveal" style="text-align: center;">Real Reactions</p>
        <h2 class="heading-lg reveal reveal-delay-1" style="text-align: center; margin-bottom: 48px;">
          Don't take <em>our word</em> for it.
        </h2>

        <blockquote class="reactions__featured reveal reveal-delay-1">
          <p class="reactions__featured-quote">"<span v-html="featuredReaction.quote"></span>"</p>
          <p class="testimonial__author">{{ featuredReaction.author }}</p>
          <p class="testimonial__context">{{ featuredReaction.context }}</p>
        </blockquote>

        <div class="testimonials-row">
          <div v-for="(t, i) in otherReactions" :key="i" class="card reveal" :class="`reveal-delay-${i + 1}`">
            <p class="testimonial__quote">"<span v-html="t.quote"></span>"</p>
            <div class="divider" />
            <p class="testimonial__author">{{ t.author }}</p>
            <p v-if="t.context" class="testimonial__context">{{ t.context }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ━━━ 5. THREE FORMATS ━━━ -->
    <section class="shows-horizontal">
      <div class="shows-horizontal__header container">
        <p class="heading-eyebrow">Performances</p>
        <h2 class="heading-lg" data-split data-split-delay="0">Three formats. One unforgettable event.</h2>
      </div>

      <div class="shows-horizontal__track">
        <div class="shows-horizontal__spacer" />

        <div class="show-panel tilt-card">
          <div class="show-panel__number">01</div>
          <h3 class="show-panel__title">Close-Up<br>Magic</h3>
          <div class="divider" />
          <p class="body-md">A unique and intimate magic show performed at a table surrounded by guests — personal and interactive, where the magic happens right there in front of you. Imagine a fun magic show in the comfort of your own living room, or a surprise addition to your corporate event.</p>
          <div class="show-panel__meta">
            <span>20–60 min</span>
            <span>5–60 guests</span>
          </div>
        </div>

        <div class="show-panel tilt-card">
          <div class="show-panel__number">02</div>
          <h3 class="show-panel__title">Parlour<br>Show</h3>
          <div class="divider" />
          <p class="body-md">A full interactive show where the audience is part of the performance. Volunteers come up. Impossible things happen. Predictions are revealed. It's theatrical, funny, and deeply personal — because Abby tailors every show to the room she's in. Debuted at the legendary Chicago Magic Lounge.</p>
          <div class="show-panel__meta">
            <span>30–60 min</span>
            <span>Up to 80 guests</span>
          </div>
        </div>

        <div class="show-panel tilt-card">
          <div class="show-panel__number">03</div>
          <h3 class="show-panel__title">Mingle<br>Magic</h3>
          <div class="divider" />
          <p class="body-md">Abby moves throughout your event, creating unforgettable moments wherever guests gather. Perfect for cocktail parties, bar and bat mitzvahs, fundraisers, weddings, and corporate events. Designed to keep the energy high and the room engaged — every group gets personal, interactive magic.</p>
          <div class="show-panel__meta">
            <span>30 min – 3+ hours</span>
            <span>4–400 guests total</span>
          </div>
        </div>

        <div class="show-panel show-panel--cta">
          <router-link to="/shows" class="btn btn--filled magnetic-element"><span>See Full Details →</span></router-link>
        </div>
      </div>
    </section>

    <!-- ━━━ 6. INLINE BOOKING ━━━ -->
    <section id="booking" class="section booking-section">
      <div class="container">
        <p class="heading-eyebrow reveal" style="text-align: center;">Book Abby</p>
        <h2 class="heading-lg reveal reveal-delay-1" style="text-align: center; margin-bottom: 40px;">Bring Abby to <em>Your Event</em>.</h2>
        <BookingForm submit-label="Request Availability" />
      </div>
    </section>

    <!-- ━━━ 7. ART TEASER ━━━ -->
    <section class="section art-teaser">
      <div class="container">
        <p class="heading-eyebrow reveal" style="text-align: center;">Collect Abby</p>
        <h2 class="heading-lg reveal reveal-delay-1" style="text-align: center;">
          Own a <em>Piece</em> of the Magic.
        </h2>
        <p class="body-lg reveal reveal-delay-2" style="text-align: center; max-width: 520px; margin: 16px auto 48px;">
          Original artwork, limited editions, collectible objects.
        </p>
        <div class="art-teaser__grid reveal reveal-delay-2">
          <img src="/assets/art/images/art-prague.webp" alt="Original collage artwork by Abby Segal, exhibited at Berlinskej Model in Prague" loading="lazy" />
          <img src="/assets/art/images/art1.webp" alt="Original mixed-media artwork by Abby Segal" loading="lazy" />
          <img src="/assets/art/images/art3.webp" alt="Original collage artwork by Abby Segal" loading="lazy" />
        </div>
        <div class="art-teaser__actions reveal reveal-delay-3">
          <router-link to="/art" class="btn btn--filled magnetic-element"><span>Shop Art</span></router-link>
          <router-link to="/art" class="btn magnetic-element"><span>View Collection</span></router-link>
        </div>
      </div>
    </section>

    <!-- ━━━ 8. SHORT ABOUT ━━━ -->
    <section class="section about-blurb">
      <div class="container" style="text-align: center;">
        <p class="heading-eyebrow reveal">About</p>
        <p class="body-lg reveal reveal-delay-1" style="max-width: 620px; margin: 16px auto 0;">
          Abby Segal is a Chicago-based magician and visual artist known for skillful close-up magic and original intimate performances.
        </p>
        <router-link to="/about" class="btn reveal reveal-delay-2 magnetic-element about-blurb__cta"><span>Learn More</span></router-link>
      </div>
    </section>

    <!-- ━━━ 9. FINAL CTA ━━━ -->
    <section class="section final-cta">
      <div class="container" style="text-align: center;">
        <h2 class="heading-lg reveal">Let's Make Your Event <em>Unforgettable.</em></h2>
        <p class="body-lg reveal reveal-delay-1" style="max-width: 540px; margin: 16px auto 0; color: var(--ivory-dim);">Magic you'll remember long after the night is over.</p>
        <div class="final-cta__actions reveal reveal-delay-2">
          <button type="button" class="btn btn--filled magnetic glow-pulse" @click="scrollToBooking">
            <span>Book a Show</span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ── HERO ───────────────────────────── */
.hero {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: var(--void);
}
.hero__card {
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translate(0, -50%) rotate(12deg);
  width: 220px;
  height: 320px;
  z-index: 1;
  opacity: 0;
  transition: opacity 1.5s ease-out 2s;
  pointer-events: none;
}
.hero__card.loaded {
  opacity: 1;
  animation: heroCardFloat 8s ease-in-out infinite;
}
.hero__card-inner {
  width: 100%;
  height: 100%;
  background: linear-gradient(160deg, rgba(141, 59, 120, 0.03), rgba(170, 136, 51, 0.02));
  border: 1px solid rgba(141, 59, 120, 0.08);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(1px);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
}
.hero__card-corner {
  position: absolute;
  top: 16px;
  left: 20px;
  font-size: var(--text-card-title);
  line-height: 1.1;
  color: rgba(141, 59, 120, 0.12);
  font-weight: 700;
  font-family: var(--font-display);
  font-style: italic;
}
.hero__card-suit {
  font-size: 100px;
  color: rgba(141, 59, 120, 0.06);
  line-height: 1;
}
@keyframes heroCardFloat {
  0%, 100% { transform: translate(0, -50%) rotate(12deg) translateY(0); }
  33% { transform: translate(0, -50%) rotate(14deg) translateY(-15px); }
  66% { transform: translate(0, -50%) rotate(10deg) translateY(8px); }
}
.hero__particles { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; }
.hero__vignette {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 30% 40%, rgba(141, 59, 120, 0.04) 0%, transparent 60%),
    radial-gradient(ellipse 50% 50% at 70% 60%, rgba(170, 136, 51, 0.03) 0%, transparent 60%),
    radial-gradient(ellipse at center, transparent 30%, rgba(22, 11, 34, 0.85) 100%);
  z-index: 1;
}
.hero__content {
  position: relative; z-index: 2;
  padding-top: 140px; padding-bottom: 100px;
  opacity: 0; transition: opacity 0.8s var(--ease-out);
}
.hero__content.loaded { opacity: 1; }
.hero__title {
  line-height: 1.2;
  padding-bottom: 8px;
}
.hero__divider { opacity: 0; animation: fadeSlideIn 0.6s var(--ease-out) 1.4s forwards; }
.hero__subtitle { max-width: 560px; margin-bottom: 12px; opacity: 0; animation: fadeSlideIn 0.6s var(--ease-out) 1.6s forwards; }
.hero__tagline { max-width: 560px; margin-bottom: 36px; font-family: var(--font-mono); font-size: var(--text-body-sm); letter-spacing: 0.06em; color: var(--ivory-dim); opacity: 0; animation: fadeSlideIn 0.6s var(--ease-out) 1.75s forwards; }
.hero__actions { display: flex; gap: 16px; flex-wrap: wrap; opacity: 0; animation: fadeSlideIn 0.6s var(--ease-out) 1.9s forwards; }
.hero__credibility {
  margin-top: 28px;
  font-family: var(--font-mono);
  font-size: var(--text-body-sm);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--white-muted);
  opacity: 0;
  animation: fadeSlideIn 0.6s var(--ease-out) 2.1s forwards;
}
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.hero__scroll-indicator { position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); display: none; flex-direction: column; align-items: center; gap: 12px; z-index: 2; }
.hero__scroll-text { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--white-muted); }
.hero__scroll-line { width: 1px; height: 50px; background: linear-gradient(to bottom, var(--gold), transparent); animation: scrollPulse 2.5s ease-in-out infinite; }
@keyframes scrollPulse { 0%, 100% { opacity: 1; transform: scaleY(1); } 50% { opacity: 0.3; transform: scaleY(0.5); } }

/* ── WHY ABBY ───────────────────────── */
.why-abby__grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 80px; align-items: center; }
.why-abby__text .body-lg { margin-top: 20px; }
.why-abby__text .body-lg em { color: var(--gold); }
.why-abby__quote {
  margin-top: 32px;
  font-family: var(--font-display);
  font-size: var(--text-subtitle);
  font-style: italic;
  line-height: 1.5;
  color: var(--ivory);
  border-left: 2px solid var(--plum);
  padding-left: 24px;
}
.why-abby__quote em { font-style: normal; color: var(--gold); }
.why-abby__visual { position: relative; }
.why-abby__visual .img-reveal { aspect-ratio: 4/5; background: var(--ash); overflow: hidden; border-radius: var(--radius-lg); }
.why-abby__visual img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s var(--ease-out); }
.why-abby__visual:hover img { transform: scale(1.03); }

/* ── REAL REACTIONS ─────────────────── */
.reactions-section { border-top: 1px solid var(--ember); background: var(--obsidian); }
.reactions-section h2 em { color: var(--gold); font-style: normal; font-weight: 400; }
.reactions__featured {
  max-width: 760px;
  margin: 0 auto 48px;
  text-align: center;
}
.reactions__featured-quote {
  font-family: var(--font-display);
  font-size: var(--text-subtitle);
  font-style: italic;
  line-height: 1.5;
  color: var(--ivory);
  margin-bottom: 20px;
}
.testimonials-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.testimonial__quote {
  font-family: var(--font-display);
  font-size: 17px;
  font-style: italic;
  font-weight: 400;
  line-height: 1.6;
  color: var(--ivory-dim);
  margin-bottom: 16px;
}
.testimonial__author {
  font-weight: 600;
  font-size: var(--text-body-sm);
  color: var(--ivory);
}
.testimonial__context {
  font-size: var(--text-btn);
  color: var(--ivory-muted);
}

/* ── HORIZONTAL SCROLL SHOWS ────────── */
.shows-horizontal { height: 120vh; position: relative; }
.shows-horizontal__header { padding-top: 80px; padding-bottom: 48px; }
.shows-horizontal__header h2 em { color: var(--gold); font-style: normal; font-weight: 400; }
.shows-horizontal__track { display: flex; gap: 32px; padding: 0 48px; align-items: center; height: 100vh; height: 100dvh; }
.shows-horizontal__spacer { min-width: 20vw; }
.show-panel { min-width: 420px; max-width: 420px; height: 500px; background: var(--ash); border: 1px solid var(--ember);
  border-radius: var(--radius-md); padding: 48px 48px 60px 48px; display: flex; flex-direction: column; justify-content: flex-end; flex-shrink: 0; transition: border-color 0.4s; position: relative; }
.show-panel:hover { border-color: var(--plum); box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
.show-panel__number { font-family: var(--font-display); font-size: 64px; font-weight: 900; letter-spacing: -0.03em; color: rgba(141, 59, 120, 0.18); position: absolute; top: 32px; right: 32px; line-height: 1; }
.show-panel__title { font-family: var(--font-display); font-size: var(--text-subtitle); font-weight: 900; letter-spacing: -0.02em; text-transform: uppercase; margin-bottom: 16px; }
.show-panel .body-md em { color: var(--gold); }
.show-panel__meta { display: flex; gap: 20px; margin-top: 20px; font-family: var(--font-mono); font-size: var(--text-micro); text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold); }
.show-panel--cta { justify-content: center; align-items: center; background: transparent; border: 1px dashed var(--ember); min-width: 300px; }

/* ── BOOKING ────────────────────────── */
.booking-section { border-top: 1px solid var(--ember); }
.booking-section h2 em { color: var(--gold); font-style: normal; font-weight: 400; }
.booking-section .booking-form { max-width: 720px; margin: 0 auto; }

/* ── ART TEASER ─────────────────────── */
.art-teaser h2 em { color: var(--gold); font-style: normal; font-weight: 400; }
.art-teaser__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.art-teaser__grid img { width: 100%; aspect-ratio: 4/5; object-fit: cover; border-radius: var(--radius-md); border: 1px solid var(--ember); transition: transform 0.5s var(--ease-out); }
.art-teaser__grid img:hover { transform: translateY(-6px); }
.art-teaser__actions { display: flex; gap: 16px; justify-content: center; margin-top: 48px; flex-wrap: wrap; }

/* ── ABOUT BLURB / FINAL CTA ────────── */
.about-blurb__cta { margin-top: 32px; }
.final-cta { border-top: 1px solid var(--ember); background: var(--obsidian); }
.final-cta h2 em { color: var(--gold); font-style: normal; font-weight: 400; }
.final-cta__actions { display: flex; justify-content: center; margin-top: 32px; }

/* ── RESPONSIVE ─────────────────────── */
@media (max-width: 768px) {
  .hero__content { padding-top: 120px; padding-bottom: 64px; }
  .hero__eyebrow { font-size: 12px; line-height: 1.5; margin-bottom: 20px; }
  .hero__title { font-size: clamp(34px, 11vw, 52px); }
  .hero__card { display: none; }
  .hero__actions { flex-direction: column; align-items: stretch; gap: 16px; }
  .hero__actions .btn { text-align: center; justify-content: center; }

  .why-abby__grid { grid-template-columns: 1fr; gap: 32px; text-align: center; }
  .why-abby__visual { order: -1; }
  .why-abby__quote { border-left: none; padding-left: 0; text-align: center; }

  .reactions__featured-quote { font-size: var(--text-card-title); }
  .testimonials-row { grid-template-columns: 1fr; gap: 20px; }

  /* Mobile shows section — snap-scroll horizontal carousel */
  .shows-horizontal {
    height: auto !important;
    position: relative !important;
    padding-bottom: var(--section-pad);
    transform: none !important;
  }
  .shows-horizontal__header { padding-top: 48px; padding-bottom: 24px; }
  .shows-horizontal__track {
    display: flex;
    flex-direction: row;
    height: auto !important;
    padding: 0 20px;
    gap: 16px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    transform: none !important;
  }
  .shows-horizontal__track::-webkit-scrollbar { display: none; }
  .shows-horizontal__spacer { display: none; }
  .show-panel {
    min-width: 82vw;
    max-width: 82vw;
    width: 82vw;
    flex-shrink: 0;
    scroll-snap-align: center;
    height: auto;
    padding: 32px 24px;
    min-height: auto;
  }
  .show-panel--cta {
    min-width: 55vw;
    max-width: 55vw;
    width: 55vw;
    min-height: 200px;
  }

  .show-panel__title { font-size: var(--text-card-title); }
  .show-panel__number { font-size: 40px; }

  .art-teaser__grid { grid-template-columns: 1fr; gap: 16px; }
}
</style>
