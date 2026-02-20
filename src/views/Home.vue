<script setup lang="ts">
import { useReveal } from '../composables/useReveal'
import { ref, onMounted } from 'vue'

useReveal()

const heroLoaded = ref(false)
onMounted(() => {
  setTimeout(() => { heroLoaded.value = true }, 100)
})

const venues = [
  'Penn & Teller: Fool Us',
  'Chicago Magic Lounge',
  'The Magic Castle',
  'Helsinki Magic Show',
  'Amsterdam Magic Show',
  'Keys & Heels NYC',
]

const testimonials = [
  {
    quote: 'Your style is so humble and sweet, and still confident.',
    author: 'Penn & Teller',
    context: 'CW\'s Fool Us',
  },
  {
    quote: 'Segal is trying to break the top-hat-and-tails male stereotype of professional magic.',
    author: 'Press Feature',
    context: '',
  },
  {
    quote: 'Those are the people that do great things in the magic field and then go on to do great things outside of magic. Abby is, hands down, one of those people.',
    author: 'Mike Northrup',
    context: 'Magic Mentor',
  },
]
</script>

<template>
  <div class="home">
    <!-- ━━━ HERO ━━━ -->
    <section class="hero">
      <div class="hero__bg">
        <div class="hero__gradient" />
      </div>

      <div class="hero__content container" :class="{ loaded: heroLoaded }">
        <p class="hero__eyebrow heading-eyebrow">Chicago Magician</p>
        <h1 class="hero__title heading-xl">
          Not your<br>
          typical <em>magic</em><br>
          show.
        </h1>
        <p class="hero__subtitle body-lg">
          Close-up &amp; parlour magic that connects, astonishes,<br class="hide-mobile">
          and leaves your guests talking for weeks.
        </p>
        <div class="hero__actions">
          <router-link to="/contact" class="btn btn--filled"><span>Book Abby</span></router-link>
          <a
            href="https://www.youtube.com/watch?v=yHC32hkzFrc"
            target="_blank"
            rel="noopener"
            class="btn"
          >
            <span>▶ Watch Reel</span>
          </a>
        </div>
      </div>

      <div class="hero__scroll">
        <span>Scroll</span>
        <div class="hero__scroll-line" />
      </div>
    </section>

    <!-- ━━━ VENUES TICKER ━━━ -->
    <section class="ticker">
      <div class="ticker__track">
        <span v-for="(v, i) in [...venues, ...venues, ...venues]" :key="i" class="ticker__item">
          {{ v }} <span class="ticker__dot">✦</span>
        </span>
      </div>
    </section>

    <!-- ━━━ INTRO ━━━ -->
    <section class="section">
      <div class="container intro">
        <div class="intro__text">
          <p class="heading-eyebrow reveal">About</p>
          <h2 class="heading-lg reveal reveal-delay-1">
            Magic through the lens<br>
            of <em>psychology.</em>
          </h2>
          <div class="divider reveal reveal-delay-2" />
          <p class="body-lg reveal reveal-delay-2">
            Abby Segal has been performing magic since the age of 11 — from living rooms
            to The Magic Castle in Hollywood. With a degree in Psychology from Bates College,
            she brings a unique understanding of perception and connection to every performance.
          </p>
          <p class="body-lg reveal reveal-delay-3">
            No top hat. No sleeves. Just astonishment.
          </p>
          <router-link to="/about" class="btn reveal reveal-delay-4"><span>Full Bio</span></router-link>
        </div>
        <div class="intro__image reveal">
          <div class="intro__image-frame">
            <div class="intro__image-placeholder">
              <span class="intro__image-text">✦</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ━━━ SHOWS ━━━ -->
    <section class="section shows-preview">
      <div class="container">
        <div class="shows-preview__header">
          <p class="heading-eyebrow reveal">Performances</p>
          <h2 class="heading-lg reveal reveal-delay-1">Two ways to <em>experience</em> the magic.</h2>
        </div>

        <div class="shows-preview__grid">
          <div class="card reveal reveal-delay-2">
            <p class="heading-eyebrow">01</p>
            <h3 class="heading-md">Close-Up Magic</h3>
            <div class="divider" />
            <p class="body-md">
              Intimate, 45-minute performances at your table. The magic happens inches from
              your eyes — cards, coins, impossible objects. Perfect for private events, dinners,
              and corporate gatherings of 4 to 400.
            </p>
          </div>
          <div class="card reveal reveal-delay-3">
            <p class="heading-eyebrow">02</p>
            <h3 class="heading-md">Parlour Show</h3>
            <div class="divider" />
            <p class="body-md">
              An interactive stage show for audiences up to 80. Audience members become part
              of the performance. Customizable in length, debuted at the renowned
              Chicago Magic Lounge.
            </p>
          </div>
        </div>

        <div class="shows-preview__cta reveal">
          <router-link to="/shows" class="btn"><span>Explore Shows</span></router-link>
        </div>
      </div>
    </section>

    <!-- ━━━ QUOTE SECTION ━━━ -->
    <section class="section quote-section">
      <div class="container">
        <div class="quote-section__inner reveal">
          <span class="quote-section__mark">"</span>
          <blockquote class="heading-lg">
            Your style is so humble and sweet, and still confident.
          </blockquote>
          <div class="divider divider--center" />
          <p class="quote-section__author">— Penn & Teller</p>
          <p class="quote-section__context">CW's <em>Fool Us</em></p>
        </div>
      </div>
    </section>

    <!-- ━━━ TESTIMONIALS ━━━ -->
    <section class="section">
      <div class="container">
        <p class="heading-eyebrow reveal" style="text-align: center;">What people say</p>
        <h2 class="heading-lg reveal reveal-delay-1" style="text-align: center; margin-bottom: 48px;">
          In their <em>words.</em>
        </h2>

        <div class="testimonials-grid">
          <div v-for="(t, i) in testimonials" :key="i" class="card reveal" :class="`reveal-delay-${i + 1}`">
            <p class="testimonial__quote">"{{ t.quote }}"</p>
            <div class="divider" />
            <p class="testimonial__author">{{ t.author }}</p>
            <p v-if="t.context" class="testimonial__context">{{ t.context }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ━━━ CTA ━━━ -->
    <section class="section cta-section">
      <div class="container cta-section__inner reveal">
        <p class="heading-eyebrow">Ready?</p>
        <h2 class="heading-lg">Let's create something <em>unforgettable.</em></h2>
        <div class="divider divider--center" />
        <p class="body-lg" style="text-align: center; max-width: 500px; margin: 0 auto 32px;">
          Whether it's a corporate gala, a private dinner, or a surprise birthday —
          Abby brings the wonder.
        </p>
        <router-link to="/contact" class="btn btn--filled"><span>Get in Touch</span></router-link>
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
}
.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero__gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 70% 40%, rgba(201, 168, 76, 0.06) 0%, transparent 60%),
    radial-gradient(ellipse 80% 60% at 20% 80%, rgba(201, 168, 76, 0.03) 0%, transparent 50%),
    var(--black);
}
.hero__content {
  position: relative;
  z-index: 1;
  padding-top: 120px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1s var(--ease-out) 0.2s, transform 1s var(--ease-out) 0.2s;
}
.hero__content.loaded {
  opacity: 1;
  transform: translateY(0);
}
.hero__eyebrow { margin-bottom: 20px; }
.hero__title {
  margin-bottom: 24px;
}
.hero__title em {
  color: var(--gold);
  font-style: italic;
}
.hero__subtitle {
  margin-bottom: 40px;
  max-width: 520px;
}
.hero__actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.hero__scroll {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 1;
}
.hero__scroll span {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--white-muted);
}
.hero__scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, var(--gold), transparent);
  animation: scrollPulse 2s ease-in-out infinite;
}
@keyframes scrollPulse {
  0%, 100% { opacity: 1; height: 40px; }
  50% { opacity: 0.4; height: 24px; }
}

/* ── TICKER ─────────────────────────── */
.ticker {
  padding: 20px 0;
  border-top: 1px solid var(--black-border);
  border-bottom: 1px solid var(--black-border);
  overflow: hidden;
  background: var(--black-soft);
}
.ticker__track {
  display: flex;
  gap: 0;
  animation: tickerScroll 30s linear infinite;
  white-space: nowrap;
  width: max-content;
}
.ticker__item {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--white-muted);
  padding: 0 24px;
}
.ticker__dot { color: var(--gold); margin: 0 4px; }
@keyframes tickerScroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-33.33%); }
}

/* ── INTRO ──────────────────────────── */
.intro {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.intro__text h2 em { color: var(--gold); font-style: italic; }
.intro__text .btn { margin-top: 32px; }
.intro__image-frame {
  aspect-ratio: 3/4;
  border: 1px solid var(--black-border);
  position: relative;
  overflow: hidden;
}
.intro__image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--black-card), var(--black));
  display: flex;
  align-items: center;
  justify-content: center;
}
.intro__image-text {
  font-size: 64px;
  color: var(--gold-dim);
}

/* ── SHOWS PREVIEW ──────────────────── */
.shows-preview__header { text-align: center; margin-bottom: 48px; }
.shows-preview__header h2 em { color: var(--gold); font-style: italic; }
.shows-preview__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.shows-preview__cta {
  text-align: center;
  margin-top: 48px;
}

/* ── QUOTE ──────────────────────────── */
.quote-section__inner {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}
.quote-section__mark {
  font-family: var(--font-display);
  font-size: 120px;
  line-height: 0.6;
  color: var(--gold);
  display: block;
  margin-bottom: -16px;
}
.quote-section blockquote {
  font-style: italic;
}
.quote-section__author {
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--gold);
  margin-top: 8px;
}
.quote-section__context {
  font-size: 14px;
  color: var(--white-muted);
}

/* ── TESTIMONIALS ───────────────────── */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.testimonial__quote {
  font-family: var(--font-display);
  font-size: 18px;
  font-style: italic;
  line-height: 1.6;
  color: var(--white-dim);
  margin-bottom: 16px;
}
.testimonial__author {
  font-weight: 600;
  font-size: 14px;
}
.testimonial__context {
  font-size: 13px;
  color: var(--white-muted);
}

/* ── CTA ────────────────────────────── */
.cta-section {
  border-top: 1px solid var(--black-border);
  background: var(--black-soft);
}
.cta-section__inner {
  text-align: center;
}
.cta-section h2 em { color: var(--gold); font-style: italic; }

/* ── RESPONSIVE ─────────────────────── */
@media (max-width: 768px) {
  .hero__content { padding-top: 140px; }
  .intro { grid-template-columns: 1fr; gap: 40px; }
  .intro__image { order: -1; }
  .shows-preview__grid { grid-template-columns: 1fr; }
  .testimonials-grid { grid-template-columns: 1fr; }
}
</style>
