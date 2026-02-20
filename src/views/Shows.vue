<script setup lang="ts">
import { useReveal } from '../composables/useReveal'
useReveal()

const shows = [
  {
    number: '01',
    title: 'Close-Up Magic',
    subtitle: 'Intimate & Personal',
    duration: '45 minutes',
    audience: '4 – 400 guests',
    description: 'A unique and intimate magic show performed at a table surrounded by guests. The magic happens right there in front of you — cards change, coins vanish, impossible things become possible. Every trick is performed inches from your eyes.',
    ideal: ['Private dinners', 'Corporate events', 'Cocktail hours', 'House parties', 'Wedding receptions'],
  },
  {
    number: '02',
    title: 'Parlour Show',
    subtitle: 'Interactive & Theatrical',
    duration: 'Customizable',
    audience: 'Up to 80 guests',
    description: 'An interactive show for larger audiences, usually situated on a small stage or platform. Audience members become part of the performance — volunteering, participating, and experiencing the impossible firsthand. Debuted at the renowned Chicago Magic Lounge.',
    ideal: ['Theatre performances', 'Corporate keynotes', 'School assemblies', 'Private events', 'Fundraisers'],
  },
]

const addOns = [
  { icon: '🎓', title: 'Magic Lessons', desc: 'Private or group magic instruction for all ages.' },
  { icon: '🎨', title: 'Custom Routines', desc: 'Bespoke magic designed around your brand or event theme.' },
  { icon: '🎤', title: 'MC & Hosting', desc: 'Event hosting with magic woven throughout the evening.' },
]
</script>

<template>
  <div class="shows-page">
    <section class="section shows-hero">
      <div class="container">
        <p class="heading-eyebrow reveal">Performances</p>
        <h1 class="heading-xl reveal reveal-delay-1">The <em>shows.</em></h1>
        <p class="body-lg reveal reveal-delay-2" style="max-width: 560px;">
          From dorm rooms to the Rio Theatre in Las Vegas, and from audiences of 4 to 400 —
          every show is crafted to create genuine astonishment.
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
        <div class="addons-grid">
          <div v-for="(a, i) in addOns" :key="a.title" class="card reveal" :class="`reveal-delay-${i+1}`">
            <span class="addon-icon">{{ a.icon }}</span>
            <h3 class="heading-md" style="font-size: 22px; margin: 12px 0 8px;">{{ a.title }}</h3>
            <p class="body-md">{{ a.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container" style="text-align: center;">
        <h2 class="heading-lg reveal">Ready to <em>book?</em></h2>
        <p class="body-lg reveal reveal-delay-1" style="max-width: 480px; margin: 16px auto 32px;">
          Every event is different. Let's talk about what magic would work best for yours.
        </p>
        <router-link to="/contact" class="btn btn--filled reveal reveal-delay-2"><span>Get in Touch</span></router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.shows-hero { padding-top: calc(var(--section-pad) + 80px); padding-bottom: 0; }
.shows-hero h1 em, h2 em { color: var(--gold); font-style: italic; }

.show-card {
  border: 1px solid var(--black-border);
  margin-bottom: 32px;
  transition: border-color 0.4s;
}
.show-card:hover { border-color: rgba(201, 168, 76, 0.3); }
.show-card__header {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 40px;
  border-bottom: 1px solid var(--black-border);
}
.show-card__number {
  font-family: var(--font-mono);
  font-size: 48px;
  color: var(--gold-dim);
  line-height: 1;
}
.show-card__subtitle {
  font-size: 14px;
  color: var(--white-muted);
  margin-top: 4px;
}
.show-card__body {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 40px;
  padding: 40px;
}
.show-card__meta {
  display: flex;
  gap: 40px;
  margin-bottom: 20px;
}
.show-card__meta-item p {
  font-size: 18px;
  font-weight: 500;
  margin-top: 4px;
}
.show-card__ideal ul {
  list-style: none;
  padding: 0;
  margin-top: 12px;
}
.show-card__ideal li {
  padding: 8px 0;
  border-bottom: 1px solid var(--black-border);
  font-size: 15px;
  color: var(--white-dim);
}
.show-card__ideal li::before {
  content: '✦ ';
  color: var(--gold);
  font-size: 10px;
}

.addons-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.addon-icon { font-size: 32px; }

@media (max-width: 768px) {
  .show-card__body { grid-template-columns: 1fr; }
  .show-card__header { flex-direction: column; align-items: flex-start; gap: 12px; }
  .addons-grid { grid-template-columns: 1fr; }
}
</style>
