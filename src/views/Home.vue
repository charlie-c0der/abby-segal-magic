<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { useReveal } from '../composables/useReveal'
import { useParticles } from '../composables/useParticles'
import { useSplitText } from '../composables/useSplitText'
import { useTilt } from '../composables/useTilt'
import { useSEO } from '../composables/useSEO'
import MagicReveal from '../components/MagicReveal.vue'
import LazyYouTube from '../components/LazyYouTube.vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

useReveal()
useParticles('hero-particles', 60)
useSplitText()
useTilt('.tilt-card')
useSEO({
  title: 'Abby Segal — Chicago Magician | Close-Up & Parlour Magic',
  description: 'Abby Segal is a Chicago-based magician specializing in close-up and parlour magic for corporate events, private shows, and theatre. As seen on Penn & Teller: Fool Us.',
  ogImage: '/images/performance.webp',
  canonicalUrl: '/'
})

const heroLoaded = ref(false)

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
  { number: '14+', label: 'Years Performing' },
  { number: '500+', label: 'Shows Worldwide' },
  { number: '6', label: 'Countries' },
  { number: '1', label: 'Penn & Teller Appearance' },
]

const testimonials = [
  {
    quote: 'Your style is so humble and sweet, and still confident.',
    author: 'Penn Jillette',
    context: "Penn & Teller: Fool Us, CW",
  },
  {
    quote: 'From minute one, she pulled us in. She was very natural, which is unusual for someone of her age. Very conversational and just calming to watch.',
    author: 'Evan Northrup',
    context: 'Professional Magician, quoted in Lowell Sun',
  },
  {
    quote: 'She was actually better than me at the magic within three years. She would show me better ways of doing things I was trying to do.',
    author: 'David Penn',
    context: 'Abby\'s first mentor, Patch.com',
  },
  {
    quote: 'Abby Segal is a rising young star in magic. She has written a hit children\'s book sold at The Magic Castle, lectured at Magifest, and is a featured performer at The Chicago Magic Lounge.',
    author: 'Penguin Magic Podcast',
    context: 'Season 6, Episode 16',
  },
]

const processSteps = [
  { number: '01', title: 'Tell me about your event', desc: 'Fill out the quick form - date, guest count, vibe. The more I know, the better the magic fits.' },
  { number: '02', title: 'We\'ll plan the perfect show', desc: 'I\'ll reach out within 24 hours to discuss your event, recommend a format, and answer any questions.' },
  { number: '03', title: 'Your guests will never forget it', desc: 'I show up, I astonish people, they talk about it for weeks. That\'s the deal.' },
]

onMounted(async () => {
  await nextTick()
  setTimeout(() => { heroLoaded.value = true }, 200)

  gsap.to('.hero__title', {
    yPercent: -30,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 },
  })

  gsap.to('.hero__subtitle', {
    yPercent: -15, opacity: 0, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: '60% top', scrub: 1 },
  })

  const showsTrack = document.querySelector('.shows-horizontal__track')
  if (showsTrack) {
    gsap.to(showsTrack, {
      xPercent: -50, ease: 'none',
      scrollTrigger: { trigger: '.shows-horizontal', start: 'top top', end: '+=80%', scrub: 1, pin: true, anticipatePin: 1 },
    })
  }

  // Big quote animation removed

  document.querySelectorAll('.img-reveal').forEach((el) => {
    ScrollTrigger.create({ trigger: el, start: 'top 80%', onEnter: () => el.classList.add('revealed'), once: true })
  })

  gsap.to('.hero__card', {
    yPercent: -40, rotation: 20, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 2 },
  })

  // Stats counter animation
  gsap.from('.stat__number', {
    textContent: 0, duration: 1.5, ease: 'power2.out', snap: { textContent: 1 },
    stagger: 0.2,
    scrollTrigger: { trigger: '.stats-bar', start: 'top 80%' },
  })

  gsap.from('.testimonials-row .card', {
    y: 80, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: '.testimonials-row', start: 'top 75%' },
  })

  gsap.to('.intro-portrait', {
    y: -30, ease: 'none',
    scrollTrigger: { trigger: '.intro-section', start: 'top bottom', end: 'bottom top', scrub: 1.5 },
  })
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
      <div class="blob blob--rose" style="width: 500px; height: 500px; left: -10%; top: 20%;" />
      <div class="blob blob--gold" style="width: 400px; height: 400px; right: -5%; bottom: 10%;" />

      <div class="hero__card" :class="{ loaded: heroLoaded }">
        <div class="hero__card-inner">
          <span class="hero__card-corner">A<br>♠</span>
          <span class="hero__card-suit">♠</span>
        </div>
      </div>

      <div class="hero__content container" :class="{ loaded: heroLoaded }">
        <p class="hero__eyebrow heading-eyebrow" data-split data-split-delay="0.3">Chicago Magician &amp; Mentalist</p>
        <h1 class="hero__title heading-xl" data-split data-split-delay="0.6">
          Magic that happens in <span class="shimmer">your hands.</span>
        </h1>
        <div class="divider hero__divider" />
        <p class="hero__subtitle body-lg">
          Close-up and parlour magic powered by psychology, dry humor,<br class="hide-mobile">
          and 14 years of making the impossible happen inches from your eyes.
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
        <div v-for="s in stats" :key="s.label" class="stat">
          <span class="stat__number">{{ s.number }}</span>
          <span class="stat__label">{{ s.label }}</span>
        </div>
      </div>
    </section>

    <!-- ━━━ EXPERIENCE SECTION (replaces generic bio) ━━━ -->
    <section class="section">
      <div class="container intro-section">
        <div class="intro-section__text">
          <p class="heading-eyebrow reveal">The Experience</p>
          <h2 class="heading-lg reveal reveal-delay-1">
            Magic that happens<br><em class="shimmer">in your hands.</em>
          </h2>
          <div class="divider reveal reveal-delay-2" />
          <p class="body-lg reveal reveal-delay-2">
            Forget everything you think you know about magic shows. There's no stage.
            No sequined assistant. No "pick a card, any card" autopilot.
          </p>
          <p class="body-lg reveal reveal-delay-3">
            Abby performs inches away from you. Cards change in <em>your</em> hands.
            Coins vanish while you're holding them. She'll read your mind - and
            you'll laugh, because she's probably right about the embarrassing thing too.
          </p>
          <p class="body-lg reveal reveal-delay-3" style="font-style: italic; color: var(--gold);">
            Psychology degree. 14 years of practice. Pure skill.
          </p>
          <router-link to="/about" class="btn reveal reveal-delay-4 magnetic"><span>Meet Abby</span></router-link>
        </div>

        <div class="intro-section__visual reveal">
          <div class="img-reveal">
            <div class="intro-portrait">
              <img src="/images/abby-2024.webp" alt="Abby Segal - Chicago Magician" loading="lazy" decoding="async" />
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
          <h2 class="heading-lg reveal reveal-delay-1" style="color: var(--cream);">
            See her <em class="shimmer" style="color: var(--gold);">fool Penn & Teller</em>.
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
        <h2 class="heading-lg reveal reveal-delay-1" style="text-align: center; margin-bottom: 48px; color: var(--cream);">
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
          <p class="body-md">The magic happens in your hands, at your table, inches from your eyes. Abby mingles through your event performing jaw-dropping card and coin magic for small groups. Perfect for cocktail hours, dinners, and receptions.</p>
          <div class="show-panel__meta">
            <span>45 min</span>
            <span>4–400 guests</span>
          </div>
        </div>

        <div class="show-panel tilt-card">
          <div class="show-panel__number">02</div>
          <h3 class="show-panel__title">Parlour<br>Show</h3>
          <div class="divider" />
          <p class="body-md">An interactive stage show where your guests become the stars. Volunteers participate, minds are read, impossible things happen - and everyone has the best seat in the house. As debuted at the legendary Chicago Magic Lounge.</p>
          <div class="show-panel__meta">
            <span>Custom length</span>
            <span>Up to 80 guests</span>
          </div>
        </div>

        <div class="show-panel show-panel--cta">
          <router-link to="/shows" class="btn btn--filled magnetic"><span>See Full Details →</span></router-link>
        </div>
      </div>
    </section>

    <!-- ━━━ HOW IT WORKS ━━━ -->
    <section class="section">
      <div class="container">
        <p class="heading-eyebrow reveal" style="text-align: center;">Booking</p>
        <h2 class="heading-lg reveal reveal-delay-1" style="text-align: center; margin-bottom: 60px;">
          How it <em>works.</em>
        </h2>

        <div class="process-grid">
          <div v-for="(step, i) in processSteps" :key="step.number" class="process-step reveal" :class="`reveal-delay-${i + 1}`">
            <span class="process-step__number">{{ step.number }}</span>
            <h3 class="process-step__title">{{ step.title }}</h3>
            <p class="body-md">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ━━━ TESTIMONIALS ━━━ -->
    <section class="section testimonials-section" style="border-top: 1px solid var(--black-border); background: var(--black-soft);">
      <div class="container">
        <p class="heading-eyebrow reveal" style="text-align: center; color: var(--gold);">Reactions</p>
        <h2 class="heading-lg reveal reveal-delay-1" style="text-align: center; margin-bottom: 48px; color: var(--cream);">
          What people <em style="color: var(--gold);">say.</em>
        </h2>

        <div class="testimonials-row">
          <div v-for="(t, i) in testimonials" :key="i" class="card tilt-card reveal" :class="`reveal-delay-${(i % 4) + 1}`">
            <p class="testimonial__quote">"{{ t.quote }}"</p>
            <div class="divider" />
            <p class="testimonial__author">{{ t.author }}</p>
            <p v-if="t.context" class="testimonial__context">{{ t.context }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ━━━ FINAL CTA ━━━ -->
    <section class="section cta-final">
      <div class="container cta-final__inner">
        <p class="heading-eyebrow reveal">Ready?</p>
        <h2 class="heading-xl reveal reveal-delay-1">
          <MagicReveal text="Your guests will never forget it." tag="span" />
        </h2>
        <div class="divider divider--center reveal reveal-delay-2" />
        <p class="body-lg reveal reveal-delay-2" style="text-align: center; max-width: 500px; margin: 0 auto 40px;">
          Most events blur together. Magic makes yours the one people remember.
          Let's talk about what that looks like for you.
        </p>
        <router-link to="/contact" class="btn btn--filled reveal reveal-delay-3 magnetic"><span>Book Your Event</span></router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ── HERO ───────────────────────────── */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: var(--black);
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
  background: linear-gradient(160deg, rgba(196, 132, 122, 0.03), rgba(201, 168, 76, 0.02));
  border: 1px solid rgba(196, 132, 122, 0.08);
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
  font-size: 22px;
  line-height: 1.1;
  color: rgba(196, 132, 122, 0.12);
  font-weight: 700;
  font-family: var(--font-display);
  font-style: italic;
}
.hero__card-suit {
  font-size: 100px;
  color: rgba(196, 132, 122, 0.06);
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
  background: url('/images/performance.webp') center/cover no-repeat;
  opacity: 0.15; filter: grayscale(60%) sepia(20%); z-index: 0;
}
.hero__vignette {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 30% 40%, rgba(196, 132, 122, 0.04) 0%, transparent 60%),
    radial-gradient(ellipse 50% 50% at 70% 60%, rgba(201, 168, 76, 0.03) 0%, transparent 60%),
    radial-gradient(ellipse at center, transparent 30%, rgba(11, 10, 9, 0.85) 100%);
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
.ticker { padding: 18px 0; border-top: 1px solid var(--black-border); border-bottom: 1px solid var(--black-border); overflow: hidden; background: var(--black-soft); }
.ticker__track { display: flex; animation: tickerScroll 35s linear infinite; white-space: nowrap; width: max-content; }
.ticker__item { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--white-muted); padding: 0 28px; }
.ticker__star { color: var(--gold); margin: 0 4px; font-size: 8px; }
@keyframes tickerScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }

/* ── STATS BAR ──────────────────────── */
.stats-bar { padding: 48px 0; border-bottom: 1px solid var(--black-border); }
.stats-bar__inner { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; text-align: center; }
.stat__number {
  font-family: var(--font-display); font-size: clamp(32px, 4vw, 48px); font-weight: 700; color: var(--gold); display: block;
}
.stat__label { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--white-muted); }

/* ── INTRO ──────────────────────────── */
.intro-section { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.intro-section__text h2 em { color: var(--gold); font-style: italic; }
.intro-section__text em { color: var(--gold); }
.intro-section__text .btn { margin-top: 32px; }
.intro-portrait { aspect-ratio: 3/4; background: var(--black-card); overflow: hidden; border-radius: var(--radius-lg); }
.intro-portrait img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(5%) sepia(10%) sepia(15%) contrast(1.02); transition: all 0.6s var(--ease-out); }
.intro-portrait:hover img { filter: grayscale(0%) sepia(0%) sepia(0%) contrast(1.05); transform: scale(1.03); }
.intro-section__float { position: absolute; bottom: -20px; right: -20px; background: var(--black); border: 1px solid var(--rose); border-radius: var(--radius-md); padding: 20px 28px; }
.intro-section__float-title { font-family: var(--font-display); font-size: 18px; font-weight: 600; display: block; margin-top: 6px; }
.intro-section__visual { position: relative; }

/* ── HORIZONTAL SCROLL SHOWS ────────── */
.shows-horizontal { height: 120vh; position: relative; }
.shows-horizontal__header { padding-top: 80px; padding-bottom: 48px; }
.shows-horizontal__header h2 em { color: var(--gold); font-style: italic; }
.shows-horizontal__track { display: flex; gap: 32px; padding: 0 48px; align-items: center; height: 100vh; }
.shows-horizontal__spacer { min-width: 20vw; }
.show-panel { min-width: 420px; max-width: 420px; height: 500px; background: var(--black-card); border: 1px solid var(--black-border);
  border-radius: var(--radius-md); padding: 48px; display: flex; flex-direction: column; justify-content: flex-end; flex-shrink: 0; transition: border-color 0.4s; position: relative; }
.show-panel:hover { border-color: var(--rose); box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
.show-panel__number { font-family: var(--font-mono); font-size: 64px; color: rgba(196, 132, 122, 0.12); position: absolute; top: 32px; right: 32px; line-height: 1; }
.show-panel__title { font-family: var(--font-display); font-size: 36px; font-weight: 700; margin-bottom: 16px; }
.show-panel__meta { display: flex; gap: 20px; margin-top: 20px; font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold); }
.show-panel--cta { justify-content: center; align-items: center; background: transparent; border: 1px dashed var(--black-border); min-width: 300px; }

/* ── BIG QUOTE SECTION REMOVED ────────── */

/* ── HOW IT WORKS ───────────────────── */
.process-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
.process-grid h2 em { color: var(--gold); font-style: italic; }
.process-step { padding: 40px; border: 1px solid var(--black-border);
  border-radius: var(--radius-lg); transition: all 0.5s var(--ease-out); }
.process-step:hover { border-color: var(--rose); transform: translateY(-4px); }
.process-step__number { font-family: var(--font-display); font-size: 40px; font-style: italic; color: var(--rose); opacity: 0.7; display: block; margin-bottom: 16px; }
.process-step__title { font-family: var(--font-display); font-size: 20px; font-weight: 600; margin-bottom: 12px; }

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
  font-style: italic; 
}

.testimonial__quote { 
  font-family: var(--font-display); 
  font-size: 18px; 
  font-style: italic; 
  line-height: 1.6; 
  color: var(--cream-dim); 
  margin-bottom: 16px; 
}

.testimonial__author { 
  font-weight: 600; 
  font-size: 14px; 
  color: var(--cream); 
}

.testimonial__context { 
  font-size: 13px; 
  color: var(--cream-muted); 
}

/* ── SECTION REMOVED ────────────────────── */

/* ── FINAL CTA ──────────────────────── */
.cta-final { min-height: 60vh; display: flex; align-items: center; border-top: 1px solid var(--black-border); background: var(--black-soft); }
.cta-final__inner { text-align: center; }

/* ── RESPONSIVE ─────────────────────── */
@media (max-width: 768px) {
  .hero__content { padding-top: 160px; }
  .hero__card { display: none; }
  .stats-bar__inner { grid-template-columns: repeat(2, 1fr); gap: 32px; }
  .intro-section { grid-template-columns: 1fr; gap: 40px; }
  .intro-section__visual { order: -1; }
  .intro-section__float { position: static; margin-top: 16px; display: inline-block; }
  .shows-horizontal { height: auto; }
  .shows-horizontal__track { flex-direction: column; height: auto; padding: 0 20px; }
  .shows-horizontal__spacer { display: none; }
  .show-panel { min-width: 100%; max-width: 100%; height: auto; }
  .testimonials-row { grid-template-columns: 1fr; }
  .process-grid { grid-template-columns: 1fr; }
}

/* Video Section */
.video-section {
  background: var(--black-soft);
  border-top: 1px solid var(--black-border);
  border-bottom: 1px solid var(--black-border);
}

.video-content {
  text-align: center;
  margin-bottom: 60px;
}

.video-content h2 em {
  color: var(--rose);
  font-style: italic;
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
  background: var(--black-soft);
  border-top: 1px solid var(--black-border);
  border-bottom: 1px solid var(--black-border);
}

.as-seen-on h2 em {
  color: var(--gold);
  font-style: italic;
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
  background: var(--black-card);
  border: 1px solid var(--black-border);
  border-radius: var(--radius-lg);
  transition: all 0.3s var(--ease-out);
}

.press-logo:hover {
  transform: translateY(-5px);
  border-color: var(--rose);
  background: rgba(196, 132, 122, 0.05);
}

.press-logo h3 {
  font-family: var(--font-display);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--cream);
}

.press-logo span {
  font-size: 0.9rem;
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
