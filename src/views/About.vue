<script setup lang="ts">
import { useReveal } from '../composables/useReveal'
useReveal()

const milestones = [
  { year: '2012', event: 'First magic trick learned at age 11' },
  { year: '2016', event: 'First paid professional performance' },
  { year: '2021', event: 'Featured on Penn & Teller: Fool Us (CW)' },
  { year: '2023', event: 'B.A. in Psychology, Bates College' },
  { year: '2024', event: 'Regular performer at Chicago Magic Lounge' },
  { year: '2025', event: 'International shows: Helsinki, Amsterdam' },
]
</script>

<template>
  <div class="about">
    <!-- Hero -->
    <section class="about-hero section">
      <div class="container">
        <p class="heading-eyebrow reveal">About</p>
        <h1 class="heading-xl reveal reveal-delay-1">The magician <em>behind</em> the magic.</h1>
        <div class="divider reveal reveal-delay-2" />
      </div>
    </section>

    <!-- Bio -->
    <section class="section">
      <div class="container about-grid">
        <div class="about-portrait reveal">
          <div class="about-portrait__frame">
            <div class="about-portrait__placeholder">✦</div>
          </div>
        </div>

        <div class="about-bio">
          <p class="body-lg reveal">
            Abby Segal is a magician based in Chicago. She has been performing magic at
            theatres, special occasions, schools, and corporate events since the age of 11.
          </p>
          <p class="body-lg reveal reveal-delay-1">
            In 2021, Abby showcased an original magic trick on the CW magic television
            series <em>Penn and Teller: Fool Us.</em> Along with her passion for performing,
            Abby is also a creator and a teacher of magic.
          </p>
          <p class="body-lg reveal reveal-delay-2">
            In 2023, Abby graduated from Bates College with a B.A. in Psychology. She
            incorporates her psychology major and film studies minor into her craft —
            using an understanding of perception, attention, and human connection to
            create moments of genuine astonishment.
          </p>
          <p class="body-lg reveal reveal-delay-3">
            Through close-up and parlour-style magic, Abby uses her dry sense of humor
            and warm personality to connect with audiences. She does all of this
            without sleeves or a top hat.
          </p>
          <p class="body-lg reveal reveal-delay-4">
            Outside of performing and teaching magic, Abby is a visual artist who
            specializes in collage, watercolor, and sketching.
          </p>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="section timeline-section">
      <div class="container">
        <p class="heading-eyebrow reveal" style="text-align: center;">Journey</p>
        <h2 class="heading-lg reveal reveal-delay-1" style="text-align: center; margin-bottom: 60px;">
          A career in <em>motion.</em>
        </h2>

        <div class="timeline">
          <div
            v-for="(m, i) in milestones"
            :key="m.year"
            class="timeline__item reveal"
            :class="`reveal-delay-${(i % 4) + 1}`"
          >
            <span class="timeline__year">{{ m.year }}</span>
            <div class="timeline__line" />
            <p class="timeline__event">{{ m.event }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Venues -->
    <section class="section">
      <div class="container">
        <p class="heading-eyebrow reveal" style="text-align: center;">Where she's performed</p>
        <h2 class="heading-lg reveal reveal-delay-1" style="text-align: center; margin-bottom: 60px;">
          From living rooms to <em>world stages.</em>
        </h2>
        <div class="venues-grid">
          <div class="card reveal reveal-delay-1">
            <h3 class="venue-name">The Magic Castle</h3>
            <p class="venue-loc">Hollywood, CA</p>
          </div>
          <div class="card reveal reveal-delay-2">
            <h3 class="venue-name">Chicago Magic Lounge</h3>
            <p class="venue-loc">Chicago, IL</p>
          </div>
          <div class="card reveal reveal-delay-3">
            <h3 class="venue-name">Keys & Heels</h3>
            <p class="venue-loc">New York City</p>
          </div>
          <div class="card reveal reveal-delay-1">
            <h3 class="venue-name">Helsinki Magic Show</h3>
            <p class="venue-loc">Helsinki, Finland</p>
          </div>
          <div class="card reveal reveal-delay-2">
            <h3 class="venue-name">Amsterdam Magic Show</h3>
            <p class="venue-loc">Amsterdam, Netherlands</p>
          </div>
          <div class="card reveal reveal-delay-3">
            <h3 class="venue-name">Penn & Teller: Fool Us</h3>
            <p class="venue-loc">CW Television Network</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-hero { padding-bottom: 0; padding-top: calc(var(--section-pad) + 80px); }
.about-hero h1 em { color: var(--gold); font-style: italic; }

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 80px;
  align-items: start;
}
.about-portrait__frame {
  aspect-ratio: 3/4;
  border: 1px solid var(--black-border);
  position: sticky;
  top: 120px;
}
.about-portrait__placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--black-card), var(--black));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  color: var(--gold-dim);
}
.about-bio p { margin-bottom: 20px; }
.about-bio em { color: var(--gold); }

/* Timeline */
.timeline-section { background: var(--black-soft); border-top: 1px solid var(--black-border); border-bottom: 1px solid var(--black-border); }
.timeline-section h2 em { color: var(--gold); font-style: italic; }
.timeline {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0;
}
.timeline__item {
  text-align: center;
  position: relative;
  padding: 0 12px;
}
.timeline__year {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--gold);
  letter-spacing: 0.05em;
}
.timeline__line {
  width: 100%;
  height: 1px;
  background: var(--black-border);
  margin: 16px 0;
  position: relative;
}
.timeline__line::after {
  content: '';
  position: absolute;
  top: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 7px;
  height: 7px;
  background: var(--gold);
  border-radius: 50%;
}
.timeline__event {
  font-size: 14px;
  color: var(--white-dim);
  line-height: 1.5;
}

/* Venues */
.venues-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.venues-grid h2 em { color: var(--gold); font-style: italic; }
.venue-name {
  font-family: var(--font-display);
  font-size: 20px;
  margin-bottom: 4px;
}
.venue-loc {
  font-size: 13px;
  color: var(--white-muted);
}

@media (max-width: 768px) {
  .about-grid { grid-template-columns: 1fr; gap: 40px; }
  .about-portrait__frame { position: static; }
  .timeline { grid-template-columns: repeat(2, 1fr); gap: 24px; }
  .venues-grid { grid-template-columns: 1fr; }
}
</style>
