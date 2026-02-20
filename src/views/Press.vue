<script setup lang="ts">
import { useReveal } from '../composables/useReveal'
useReveal()

const features = [
  {
    quote: 'Your style is so humble and sweet, and still confident.',
    source: 'Penn & Teller',
    context: 'CW\'s Fool Us',
    year: '2021',
  },
  {
    quote: 'Segal is trying to break the top-hat-and-tails male stereotype of professional magic.',
    source: 'Press Feature',
    context: '',
    year: '2022',
  },
  {
    quote: 'For at least one Bates student, the immense disruption brought on by COVID-19 offered a magical opportunity.',
    source: 'Bates College',
    context: 'Alumni Feature',
    year: '2021',
  },
  {
    quote: 'There is this subset of magicians that could be thriving in absolutely any field, but there\'s something about magic that kind of hooks them. Those are the people that do great things. Abby is, hands down, one of those people.',
    source: 'Mike Northrup',
    context: 'Magic Mentor',
    year: '2023',
  },
  {
    quote: 'Segal got into magic when she was about 11 years old because her sister was hired as a magician\'s assistant.',
    source: 'Profile Feature',
    context: '',
    year: '2020',
  },
]
</script>

<template>
  <div class="press-page">
    <section class="section press-hero">
      <div class="container">
        <p class="heading-eyebrow reveal">Press & Media</p>
        <h1 class="heading-xl reveal reveal-delay-1">In the <em>spotlight.</em></h1>
        <div class="divider reveal reveal-delay-2" />
      </div>
    </section>

    <!-- Video Feature -->
    <section class="section">
      <div class="container">
        <div class="video-feature reveal">
          <div class="video-feature__embed">
            <iframe
              src="https://www.youtube.com/embed/yHC32hkzFrc"
              title="Abby Segal on Penn & Teller: Fool Us"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
          <div class="video-feature__info">
            <p class="heading-eyebrow">Featured Performance</p>
            <h2 class="heading-md">Penn & Teller: Fool Us</h2>
            <div class="divider" />
            <p class="body-md">
              In 2021, Abby performed an original card trick on the CW's hit magic show.
              Penn Jillette praised her style as "humble and sweet, and still confident."
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Press Quotes -->
    <section class="section" style="background: var(--black-soft); border-top: 1px solid var(--black-border);">
      <div class="container">
        <p class="heading-eyebrow reveal" style="text-align: center;">What they're saying</p>
        <h2 class="heading-lg reveal reveal-delay-1" style="text-align: center; margin-bottom: 60px;">
          Press <em>features.</em>
        </h2>

        <div class="press-quotes">
          <div
            v-for="(f, i) in features"
            :key="i"
            class="press-quote card reveal"
            :class="`reveal-delay-${(i % 4) + 1}`"
          >
            <p class="press-quote__text">"{{ f.quote }}"</p>
            <div class="divider" />
            <div class="press-quote__meta">
              <span class="press-quote__source">{{ f.source }}</span>
              <span v-if="f.context" class="press-quote__context">{{ f.context }}</span>
              <span class="press-quote__year">{{ f.year }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Media Kit -->
    <section class="section">
      <div class="container" style="text-align: center;">
        <h2 class="heading-lg reveal">Working on a <em>story?</em></h2>
        <p class="body-lg reveal reveal-delay-1" style="max-width: 500px; margin: 16px auto 32px;">
          Press inquiries, interview requests, and media kit available upon request.
        </p>
        <router-link to="/contact" class="btn reveal reveal-delay-2"><span>Get in Touch</span></router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.press-hero { padding-top: calc(var(--section-pad) + 80px); padding-bottom: 0; }
.press-hero h1 em, h2 em { color: var(--gold); font-style: italic; }

.video-feature {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 48px;
  align-items: center;
}
.video-feature__embed {
  aspect-ratio: 16/9;
  background: var(--black-card);
  border: 1px solid var(--black-border);
  overflow: hidden;
}
.video-feature__embed iframe {
  width: 100%;
  height: 100%;
}

.press-quotes {
  columns: 2;
  column-gap: 24px;
}
.press-quote {
  break-inside: avoid;
  margin-bottom: 24px;
}
.press-quote__text {
  font-family: var(--font-display);
  font-size: 18px;
  font-style: italic;
  line-height: 1.6;
  color: var(--white-dim);
}
.press-quote__meta {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}
.press-quote__source {
  font-weight: 600;
  font-size: 14px;
  color: var(--gold);
}
.press-quote__context {
  font-size: 13px;
  color: var(--white-muted);
}
.press-quote__year {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--white-muted);
}

@media (max-width: 768px) {
  .video-feature { grid-template-columns: 1fr; }
  .press-quotes { columns: 1; }
}
</style>
