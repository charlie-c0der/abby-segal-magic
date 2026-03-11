<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import { useReveal } from '../composables/useReveal'
import { useParticles } from '../composables/useParticles'
import { useSplitText } from '../composables/useSplitText'
import { useTilt } from '../composables/useTilt'
import { useWorldClassSEO } from '../composables/useWorldClassSEO'
import { useStrategicLinking } from '../composables/useStrategicLinking'
// MagicReveal import removed - final CTA section deleted
import LazyYouTube from '../components/LazyYouTube.vue'
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
  ogImage: '/assets/general/images/performance.webp',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  canonicalUrl: '/',
  priority: 1.0,
  changeFreq: 'weekly',
  
  // Performance optimization
  preloadImages: [
    '/assets/portraits/images/abby-2024.webp',
    '/assets/general/images/performance.webp'
  ],
  prefetchLinks: [
    '/shows',
    '/contact',
    '/about'
  ],
  
  contentType: 'service'
})

// Strategic internal linking
useStrategicLinking({
  enableAutolinking: true,
  maxLinksPerPage: 6,
  respectExistingLinks: true
})

const heroLoaded = ref(false)
const scrollTriggers: ScrollTrigger[] = []

const venues = [
  'Penn & Teller: Fool Us',
  'Chicago Magic Lounge',
  'The Magic Castle',
  'Helsinki Magic Show',
  'Amsterdam Magic Show',
  'Keys & Heels NYC',
  'Rio Theatre Las Vegas',
]

const stats = [
  { number: '14', label: 'Years Performing' },
  { number: '1000+', label: 'Shows Worldwide' },
  { number: '6', label: 'Countries' },
  { number: '2', label: 'Penn & Teller Appearances' },
]

const testimonials = [
  {
    quote: 'Your style is so <em class="shimmer">humble and sweet</em>, and <em class="underline-sketch">still confident</em>.',
    author: 'Penn Jillette',
    context: "Penn & Teller: Fool Us, CW",
  },
  {
    quote: 'From minute one, <em class="underline-sketch">she pulled us in</em>. She was <em class="shimmer">very natural</em>, which is unusual for someone of her age. Very conversational and <em>just calming to watch</em>.',
    author: 'Evan Northrup',
    context: 'Professional Magician, quoted in Lowell Sun',
  },
  {
    quote: 'She was <em class="shimmer">actually better than me</em> at the magic within three years. She would show me <em class="underline-sketch">better ways of doing things</em> I was trying to do.',
    author: 'David Penn',
    context: 'Abby\'s first mentor, Patch.com',
  },
  {
    quote: 'Abby Segal is a <em class="shimmer">rising young star</em> in magic. She has lectured at <em class="underline-sketch">Magifest</em> and is a featured performer at <em class="shimmer">The Chicago Magic Lounge</em>.',
    author: 'Penguin Magic Podcast',
    context: 'Season 6, Episode 16',
  },
]

const processSteps = [
  { number: '01', title: 'Tell me about your event', desc: 'Fill out the quick form - date, guest count, vibe. <em class="underline-sketch">The more I know, the better the magic fits.</em>' },
  { number: '02', title: 'We\'ll plan the perfect show', desc: 'I\'ll reach out <em class="shimmer">within 24 hours</em> to discuss your event, recommend a format, and answer any questions.' },
  { number: '03', title: 'Your guests will never forget it', desc: 'I show up, I <em class="shimmer">astonish people</em>, they <em class="underline-sketch">talk about it for weeks</em>. That\'s the deal.' },
]

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

  const showsTrack = document.querySelector('.shows-horizontal__track')
  if (showsTrack) {
    const st3 = gsap.to(showsTrack, {
      xPercent: -50, ease: 'none',
      scrollTrigger: { trigger: '.shows-horizontal', start: 'top top', end: '+=80%', scrub: 1, pin: true, anticipatePin: 1 },
    }).scrollTrigger
    if (st3) scrollTriggers.push(st3)
  }

  // Big quote animation removed

  document.querySelectorAll('.img-reveal').forEach((el) => {
    const st = ScrollTrigger.create({ trigger: el, start: 'top 80%', onEnter: () => el.classList.add('revealed'), once: true })
    scrollTriggers.push(st)
  })

  const st4 = gsap.to('.hero__card', {
    yPercent: -40, rotation: 20, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 2 },
  }).scrollTrigger
  if (st4) scrollTriggers.push(st4)

  // Stats counter animation
  const st5 = gsap.from('.stat__number', {
    textContent: 0, duration: 1.5, ease: 'power2.out', snap: { textContent: 1 },
    stagger: 0.2,
    scrollTrigger: { trigger: '.stats-bar', start: 'top 80%' },
  }).scrollTrigger
  if (st5) scrollTriggers.push(st5)

  const st6 = gsap.from('.testimonials-row .card', {
    y: 80, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: '.testimonials-row', start: 'top 75%' },
  }).scrollTrigger
  if (st6) scrollTriggers.push(st6)

  const st7 = gsap.to('.intro-portrait', {
    y: -30, ease: 'none',
    scrollTrigger: { trigger: '.intro-section', start: 'top bottom', end: 'bottom top', scrub: 1.5 },
  }).scrollTrigger
  if (st7) scrollTriggers.push(st7)
})

onUnmounted(() => {
  scrollTriggers.forEach(st => st.kill())
  scrollTriggers.length = 0
})
</script>

<template>
  <div class="home">
    <!-- ━━━ HERO ━━━ -->
    <section class="hero">
      <canvas id="hero-particles" class="hero__particles" />
      <div class="hero__bg-image" />
      <div class="hero__vignette" />
      <!-- Organic blobs for warmth -->
      <div class="blob blob--plum" style="width: 500px; height: 500px; left: -10%; top: 20%;" />
      <div class="blob blob--gold" style="width: 400px; height: 400px; right: -5%; bottom: 10%;" />

      <div class="hero__card" :class="{ loaded: heroLoaded }">
        <div class="hero__card-inner">
          <span class="hero__card-corner">A<br>♠</span>
          <span class="hero__card-suit">♠</span>
        </div>
      </div>

      <div class="hero__content container" :class="{ loaded: heroLoaded }">
        <p class="hero__eyebrow heading-eyebrow" data-split data-split-delay="0.3">CHICAGO MAGICIAN &amp; SLEIGHT OF HAND ARTIST</p>
        <h1 class="hero__title heading-xl" data-split data-split-delay="0.6">
          Magic that happens in <span class="shimmer">your hands.</span>
        </h1>
        <div class="divider hero__divider" />
        <p class="hero__subtitle body-lg">
          Close-up and parlour magic powered by <em class="underline-sketch">psychology</em>, dry humor,<br class="hide-mobile">
          and <em class="shimmer">14 years</em> of making the <em class="underline-sketch">impossible happen</em> inches from your eyes.
        </p>
        <div class="hero__actions">
          <router-link to="/contact" class="btn btn--filled magnetic glow-pulse"><span>Book Your Event</span></router-link>
          <a href="https://www.youtube.com/watch?v=yHC32hkzFrc" target="_blank" rel="noopener" class="btn magnetic">
            <span>▶ Watch on Fool Us</span>
          </a>
        </div>
      </div>

      <div class="hero__scroll-indicator">
        <div class="hero__scroll-text">Scroll to explore</div>
        <div class="hero__scroll-line" />
      </div>
    </section>

    <!-- ━━━ VENUES TICKER ━━━ -->
    <section class="ticker">
      <div class="ticker__track">
        <span v-for="(v, i) in [...venues, ...venues, ...venues]" :key="i" class="ticker__item">
          {{ v }} <span class="ticker__star">✦</span>
        </span>
      </div>
    </section>

    <!-- ━━━ STATS BAR ━━━ -->
    <section class="stats-bar">
      <div class="container stats-bar__inner">
        <div v-for="s in stats" :key="s.label" class="stat reveal">
          <span class="stat__number">{{ s.number }}</span>
          <span class="stat__label">{{ s.label }}</span>
        </div>
      </div>
    </section>

    <!-- ━━━ EXPERIENCE SECTION (replaces generic bio) ━━━ -->
    <section class="section">
      <div class="container intro-section">
        <div class="intro-section__text">
          <p class="heading-eyebrow reveal">THE EXPERIENCE</p>
          <h2 class="heading-lg reveal reveal-delay-1">
            Magic that happens <em class="shimmer">in your hands.</em>
          </h2>
          <div class="divider reveal reveal-delay-2" />
          <p class="body-lg reveal reveal-delay-2">
            Forget everything you think you know about magic shows. <em class="underline-sketch">There's no stage.</em>
            No sequined assistant. No <em>"pick a card, any card"</em> autopilot.
          </p>
          <p class="body-lg reveal reveal-delay-3">
            Abby performs <em class="shimmer">inches away</em> from you. Cards change in <em>your</em> hands.
            Coins <em class="underline-sketch">vanish while you're holding them</em>. She'll know what you're thinking - and
            you'll laugh, because she's probably right about the embarrassing thing too.
          </p>
          <router-link to="/about" class="btn reveal reveal-delay-4 magnetic-element"><span>Meet Abby</span></router-link>
        </div>

        <div class="intro-section__visual reveal">
          <div class="img-reveal">
            <div class="intro-portrait">
              <img src="/assets/portraits/images/abby-2024.webp" alt="Abby Segal - Chicago Magician" loading="lazy" decoding="async" />
            </div>
          </div>
          <div class="intro-section__float" data-speed="0.85">
            <span class="heading-eyebrow">As seen on</span>
            <span class="intro-section__float-title">Penn & Teller:<br>Fool Us</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ━━━ VIDEO SHOWCASE ━━━ -->
    <section class="section video-section">
      <div class="container">
        <div class="video-content">
          <p class="heading-eyebrow reveal" style="color: var(--gold);">Watch the Magic</p>
          <h2 class="heading-lg reveal reveal-delay-1" style="color: var(--ivory);">
            See her <em class="shimmer" style="color: var(--gold);">on Penn & Teller</em>.
          </h2>
          <div class="divider reveal reveal-delay-2" />
          <p class="body-lg reveal reveal-delay-2" style="max-width: 600px; margin: 0 auto;">
            Watch Abby's appearance on Penn & Teller: Fool Us, where she earned praise from Penn Jillette 
            for her "humble and sweet, yet confident" style.
          </p>
        </div>
        
        <div class="video-showcase reveal reveal-delay-3">
          <LazyYouTube 
            video-id="yHC32hkzFrc"
            :width="800"
            :height="450"
            title="Abby Segal on Penn & Teller: Fool Us"
          />
        </div>
      </div>
    </section>

    <!-- ━━━ AS SEEN ON SECTION ━━━ -->
    <section class="section as-seen-on">
      <div class="container">
        <p class="heading-eyebrow reveal" style="text-align: center; color: var(--gold);">As Seen On</p>
        <h2 class="heading-lg reveal reveal-delay-1" style="text-align: center; margin-bottom: 48px; color: var(--ivory);">
          Featured on <em class="shimmer" style="color: var(--gold);">major platforms</em>.
        </h2>
        
        <div class="press-logos reveal reveal-delay-2">
          <div class="press-logo">
            <h3>Penn & Teller</h3>
            <span>Fool Us (CW)</span>
          </div>
          <div class="press-logo">
            <h3>Chicago Magic Lounge</h3>
            <span>Resident Performer</span>
          </div>
          <div class="press-logo">
            <h3>The Magic Castle</h3>
            <span>Hollywood, CA</span>
          </div>
          <div class="press-logo">
            <h3>Penguin Magic</h3>
            <span>Featured Podcast</span>
          </div>
          <div class="press-logo">
            <h3>Bates College</h3>
            <span>Featured Graduate</span>
          </div>
          <div class="press-logo">
            <h3>Berlinskej Model</h3>
            <span>Art Exhibition</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ━━━ HORIZONTAL SCROLL SHOWS ━━━ -->
    <section class="shows-horizontal">
      <div class="shows-horizontal__header container">
        <p class="heading-eyebrow">Performances</p>
        <h2 class="heading-lg" data-split data-split-delay="0">Two formats. One unforgettable night.</h2>
      </div>

      <div class="shows-horizontal__track">
        <div class="shows-horizontal__spacer" />

        <div class="show-panel tilt-card">
          <div class="show-panel__number">01</div>
          <h3 class="show-panel__title">Close-Up<br>Magic</h3>
          <div class="divider" />
          <p class="body-md">The magic happens <em class="shimmer">in your hands</em>, at your table, <em class="underline-sketch">inches from your eyes</em>. Abby mingles through your event performing <em>jaw-dropping</em> sleight of hand and close-up magic for small groups. Perfect for cocktail hours, dinners, and receptions.</p>
          <div class="show-panel__meta">
            <span>45 min</span>
            <span>4–400 guests</span>
          </div>
        </div>

        <div class="show-panel tilt-card">
          <div class="show-panel__number">02</div>
          <h3 class="show-panel__title">Parlour<br>Show</h3>
          <div class="divider" />
          <p class="body-md">An interactive stage show where <em class="shimmer">your guests become the stars</em>. Volunteers participate, <em class="underline-sketch">impossible things happen</em>, secrets are revealed - and everyone has <em>the best seat in the house</em>. As debuted at the <em class="shimmer">legendary Chicago Magic Lounge</em>.</p>
          <div class="show-panel__meta">
            <span>Custom length</span>
            <span>Up to 80 guests</span>
          </div>
        </div>

        <div class="show-panel show-panel--cta">
          <router-link to="/shows" class="btn btn--filled magnetic-element"><span>See Full Details →</span></router-link>
        </div>
      </div>
    </section>

    <!-- ━━━ HOW IT WORKS ━━━ -->
    <section class="section">
      <div class="container">
        <p class="heading-eyebrow reveal" style="text-align: center;">Booking</p>
        <h2 class="heading-lg reveal reveal-delay-1" style="text-align: center;">
          How it <em>works.</em>
        </h2>
        <p class="body-lg reveal reveal-delay-2" style="text-align: center; margin: 16px auto 60px; max-width: 500px;">
          Looking for a magician for hire in Chicago? Here's how booking works.
        </p>

        <div class="process-grid">
          <div v-for="(step, i) in processSteps" :key="step.number" class="process-step reveal" :class="`reveal-delay-${i + 1}`">
            <span class="process-step__number">{{ step.number }}</span>
            <h3 class="process-step__title">{{ step.title }}</h3>
            <p class="body-md" v-html="step.desc"></p>
          </div>
        </div>
      </div>
    </section>

    <!-- ━━━ TESTIMONIALS ━━━ -->
    <section class="section testimonials-section" style="border-top: 1px solid var(--ember); background: var(--obsidian);">
      <div class="container">
        <p class="heading-eyebrow reveal" style="text-align: center; color: var(--gold);">Reactions</p>
        <h2 class="heading-lg reveal reveal-delay-1" style="text-align: center; margin-bottom: 48px; color: var(--ivory);">
          What people <em style="color: var(--gold);">say.</em>
        </h2>

        <div class="testimonials-row">
          <div v-for="(t, i) in testimonials" :key="i" class="card magnetic-element reveal" :class="`reveal-delay-${(i % 4) + 1}`">
            <p class="testimonial__quote">"<span v-html="t.quote"></span>"</p>
            <div class="divider" />
            <p class="testimonial__author">{{ t.author }}</p>
            <p v-if="t.context" class="testimonial__context">{{ t.context }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA section removed - redundant with header/footer -->
  </div>
</template>

<style scoped>
/* ── HERO ───────────────────────────── */
.hero {
  min-height: 100vh; /* Fallback for older browsers */
  min-height: 100dvh; /* Dynamic viewport height for mobile Safari */
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
  background: linear-gradient(160deg, rgba(141, 59, 120, 0.03), rgba(201, 168, 76, 0.02));
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
.hero__bg-image {
  position: absolute; inset: 0;
  background: url('/assets/general/images/performance.webp') center/cover no-repeat;
  opacity: 0.15; filter: grayscale(60%) sepia(20%); z-index: 0;
}
.hero__vignette {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 30% 40%, rgba(141, 59, 120, 0.04) 0%, transparent 60%),
    radial-gradient(ellipse 50% 50% at 70% 60%, rgba(201, 168, 76, 0.03) 0%, transparent 60%),
    radial-gradient(ellipse at center, transparent 30%, rgba(9, 9, 14, 0.85) 100%);
  z-index: 1;
}
.hero__content {
  position: relative; z-index: 2;
  padding-top: 140px; padding-bottom: 80px;
  opacity: 0; transition: opacity 0.8s var(--ease-out);
}
.hero__content.loaded { opacity: 1; }
.hero__divider { opacity: 0; animation: fadeSlideIn 0.6s var(--ease-out) 1.4s forwards; }
.hero__subtitle { max-width: 560px; margin-bottom: 40px; opacity: 0; animation: fadeSlideIn 0.6s var(--ease-out) 1.6s forwards; }
.hero__actions { display: flex; gap: 16px; flex-wrap: wrap; opacity: 0; animation: fadeSlideIn 0.6s var(--ease-out) 1.9s forwards; }
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.hero__scroll-indicator { position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 12px; z-index: 2; }
.hero__scroll-text { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--white-muted); }
.hero__scroll-line { width: 1px; height: 50px; background: linear-gradient(to bottom, var(--gold), transparent); animation: scrollPulse 2.5s ease-in-out infinite; }
@keyframes scrollPulse { 0%, 100% { opacity: 1; transform: scaleY(1); } 50% { opacity: 0.3; transform: scaleY(0.5); } }

/* ── TICKER ─────────────────────────── */
.ticker { padding: 18px 0; border-top: 1px solid var(--ember); border-bottom: 1px solid var(--ember); overflow: hidden; background: var(--obsidian); }
.ticker__track { display: flex; animation: tickerScroll 35s linear infinite; white-space: nowrap; width: max-content; }
.ticker__item { font-family: var(--font-mono); font-size: var(--text-ticker); letter-spacing: 0.1em; text-transform: uppercase; color: var(--white-muted); padding: 0 28px; }
.ticker__star { color: var(--gold); margin: 0 4px; font-size: 8px; }
@keyframes tickerScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }

/* ── STATS BAR ──────────────────────── */
.stats-bar { padding: 48px 0; border-bottom: 1px solid var(--ember); }
.stats-bar__inner { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; text-align: center; }
.stat__number {
  font-family: var(--font-display); font-size: var(--text-stat); font-weight: 700; color: var(--bronze); display: block;
}
.stat__label { font-family: var(--font-mono); font-size: var(--text-stat-label); letter-spacing: 0.15em; text-transform: uppercase; color: var(--white-muted); }

/* ── INTRO ──────────────────────────── */
.intro-section { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.intro-section__text h2 em { color: var(--gold); font-style: normal; font-weight: 400; }
.intro-section__text em { color: var(--gold); }
.intro-section__text .btn { margin-top: 32px; }
.intro-portrait { aspect-ratio: 3/4; background: var(--ash); overflow: hidden; border-radius: var(--radius-lg); }
.intro-portrait img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(5%) sepia(10%) sepia(15%) contrast(1.02); transition: all 0.6s var(--ease-out); }
.intro-portrait:hover img { filter: grayscale(0%) sepia(0%) sepia(0%) contrast(1.05); transform: scale(1.03); }
.intro-section__float { position: absolute; bottom: -20px; right: -20px; background: var(--void); border: 1px solid var(--plum); border-radius: var(--radius-md); padding: 20px 28px; }
.intro-section__float-title { font-family: var(--font-display); font-size: var(--text-card-title); font-weight: 600; display: block; margin-top: 6px; }
.intro-section__visual { position: relative; }

/* ── HORIZONTAL SCROLL SHOWS ────────── */
.shows-horizontal { height: 120vh; position: relative; }
.shows-horizontal__header { padding-top: 80px; padding-bottom: 48px; }
.shows-horizontal__header h2 em { color: var(--gold); font-style: normal; font-weight: 400; }
.shows-horizontal__track { display: flex; gap: 32px; padding: 0 48px; align-items: center; height: 100vh; height: 100dvh; }
.shows-horizontal__spacer { min-width: 20vw; }
.show-panel { min-width: 420px; max-width: 420px; height: 500px; background: var(--ash); border: 1px solid var(--ember);
  border-radius: var(--radius-md); padding: 48px; display: flex; flex-direction: column; justify-content: flex-end; flex-shrink: 0; transition: border-color 0.4s; position: relative; }
.show-panel:hover { border-color: var(--plum); box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
.show-panel__number { font-family: var(--font-display); font-size: 64px; font-weight: 900; letter-spacing: -0.03em; color: rgba(141, 59, 120, 0.12); position: absolute; top: 32px; right: 32px; line-height: 1; }
.show-panel__title { font-family: var(--font-display); font-size: var(--text-subtitle); font-weight: 900; letter-spacing: -0.02em; text-transform: uppercase; margin-bottom: 16px; }
.show-panel__meta { display: flex; gap: 20px; margin-top: 20px; font-family: var(--font-mono); font-size: var(--text-micro); text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold); }
.show-panel--cta { justify-content: center; align-items: center; background: transparent; border: 1px dashed var(--ember); min-width: 300px; }

/* ── BIG QUOTE SECTION REMOVED ────────── */

/* ── HOW IT WORKS ───────────────────── */
.process-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
.process-grid h2 em { color: var(--gold); font-style: normal; font-weight: 400; }
.process-step { padding: 40px; border: 1px solid var(--ember);
  border-radius: var(--radius-lg); transition: all 0.5s var(--ease-out); }
.process-step:hover { border-color: var(--plum); transform: translateY(-4px); }
.process-step__number { font-family: var(--font-display); font-size: var(--text-subtitle); font-style: normal; font-weight: 900; color: var(--bronze); opacity: 0.5; display: block; margin-bottom: 16px; }
.process-step__title { font-family: var(--font-display); font-size: var(--text-card-title); font-weight: 700; margin-bottom: 12px; }

/* ── TESTIMONIALS ───────────────────── */
.testimonials-section {
  min-height: 60vh;
  display: flex;
  align-items: center;
}

.testimonials-row { 
  display: grid; 
  grid-template-columns: repeat(2, 1fr); 
  gap: 24px; 
}

.testimonials-row h2 em { 
  color: var(--gold); 
  font-style: normal; 
  font-weight: 400; 
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
  color: var(--cream-muted); 
}

/* ── SECTION REMOVED ────────────────────── */

/* Final CTA styles removed - section deleted */

/* ── RESPONSIVE ─────────────────────── */
@media (max-width: 768px) {
  .hero__content { padding-top: 140px; }
  .hero__card { display: none; }
  
  /* Improved stats layout */
  .stats-bar__inner { 
    grid-template-columns: repeat(2, 1fr); 
    gap: 24px;
    text-align: center;
  }
  
  /* Better intro section flow */
  .intro-section { 
    grid-template-columns: 1fr; 
    gap: 32px; 
    text-align: center; 
  }
  .intro-section__visual { order: -1; }
  .intro-section__float { 
    position: static; 
    margin: 16px auto 0; 
    display: inline-block; 
  }
  
  /* Mobile-optimized shows section */
  .shows-horizontal { 
    height: auto; 
    padding-bottom: var(--section-pad); 
  }
  .shows-horizontal__track { 
    flex-direction: column; 
    height: auto; 
    padding: 0 20px; 
    gap: 24px; 
  }
  .shows-horizontal__spacer { display: none; }
  .show-panel { 
    min-width: 100%; 
    max-width: 100%; 
    height: auto; 
    padding: 32px 24px;
    min-height: 320px;
  }
  
  /* Better testimonials on mobile */
  .testimonials-row { 
    grid-template-columns: 1fr; 
    gap: 20px; 
  }
  
  /* Mobile process grid with better spacing */
  .process-grid { 
    grid-template-columns: 1fr; 
    gap: 24px; 
  }
  
  /* Mobile hero actions */
  .hero__actions {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
  
  .hero__actions .btn {
    text-align: center;
    justify-content: center;
  }

  /* Typography mobile overrides */
  .show-panel__title {
    font-size: var(--text-card-title);
  }
  .show-panel__number {
    font-size: 40px;
  }
  .process-step__number {
    font-size: var(--text-card-title);
  }
}

/* Video Section */
.video-section {
  background: var(--obsidian);
  border-top: 1px solid var(--ember);
  border-bottom: 1px solid var(--ember);
}

.video-content {
  text-align: center;
  margin-bottom: 60px;
}

.video-content h2 em {
  color: var(--plum);
  font-style: normal;
  font-weight: 400;
}

.video-showcase {
  display: flex;
  justify-content: center;
  max-width: 900px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .video-content {
    margin-bottom: 40px;
  }
}

/* As Seen On */
.as-seen-on {
  background: var(--obsidian);
  border-top: 1px solid var(--ember);
  border-bottom: 1px solid var(--ember);
}

.as-seen-on h2 em {
  color: var(--gold);
  font-style: normal;
  font-weight: 400;
}

.press-logos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.press-logo {
  text-align: center;
  padding: 2rem 1.5rem;
  background: var(--ash);
  border: 1px solid var(--ember);
  border-radius: var(--radius-lg);
  transition: all 0.3s var(--ease-out);
}

.press-logo:hover {
  transform: translateY(-5px);
  border-color: var(--plum);
  background: rgba(141, 59, 120, 0.05);
}

.press-logo h3 {
  font-family: var(--font-display);
  font-size: var(--text-body);
  margin-bottom: 0.5rem;
  color: var(--ivory);
}

.press-logo span {
  font-size: var(--text-body-sm);
  color: var(--cream-dim);
  font-weight: 500;
}

@media (max-width: 768px) {
  .press-logos {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }
  
  .press-logo {
    padding: 1.5rem 1rem;
  }
}

/* Big quote responsive styles removed */

@media (max-width: 480px) {
  .press-logos {
    grid-template-columns: 1fr;
  }
  
  .big-quote__image {
    max-width: 300px;
  }
}
</style>
