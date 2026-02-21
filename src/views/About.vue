<script setup lang="ts">
import { useReveal } from '../composables/useReveal'
useReveal()

const milestones = [
  { year: '2012', event: 'Learned first trick at 11 - her sister was hired as a magician\'s assistant, and Abby got jealous. Taught herself from YouTube.' },
  { year: '2013', event: 'Created her own show and started performing at preschools. In sixth grade. Became "Crazy Davy\'s" magic assistant at local gigs.' },
  { year: '2016', event: 'First paid solo gigs. Schools, camps, birthday parties, nursing homes across the Lowell, MA area. Still in high school.' },
  { year: '2018', event: 'Auditioned for Penn & Teller: Fool Us with an original trick. Didn\'t make the cut. Spent two years perfecting it.' },
  { year: '2021', event: 'Appeared on Penn & Teller: Fool Us (CW, Season 7). Teller sketched her portrait and called her a "wonder-worker." She was 20.' },
  { year: '2023', event: 'Graduated Bates College - B.A. Psychology, Film Studies minor. Won $6,000 first prize at Bobcat Ventures for her magic business. Published "Shelly Shazam!" children\'s book.' },
  { year: '2024', event: 'Regular performer at Chicago Magic Lounge. Lectured at Magifest. Book sold at The Magic Castle. Featured on Penguin Magic Podcast. Art exhibited in Prague.' },
  { year: '2025', event: 'International shows: Helsinki, Amsterdam, and counting. The world stage - literally.' },
]
</script>

<template>
  <div class="about">
    <!-- Hero -->
    <section class="about-hero section">
      <div class="container">
        <p class="heading-eyebrow reveal">About</p>
        <h1 class="heading-xl reveal reveal-delay-1">Not your average <em class="shimmer">magician.</em></h1>
        <p class="body-lg reveal reveal-delay-2" style="max-width: 600px; margin-top: 16px;">
          She's been making the impossible happen since she was 11.
        </p>
        <div class="divider reveal reveal-delay-3" />
      </div>
    </section>

    <!-- Story - the real one -->
    <section class="section">
      <div class="container about-grid">
        <div class="about-portrait reveal">
          <div class="about-portrait__frame">
            <img src="/images/portrait.webp" alt="Abby Segal portrait" loading="lazy" decoding="async" />
          </div>
        </div>

        <div class="about-bio">
          <h2 class="heading-md reveal" style="margin-bottom: 24px;">The origin story</h2>

          <p class="body-lg reveal">
            Abby Segal got into magic at 11 because her older sister Julia was hired
            as an assistant to a family friend and magician named David Penn - "Crazy Davy."
            He came over to their house in Chelmsford, Massachusetts, and did a trick
            with sponge balls that ended up in Abby's hand. She was hooked.
          </p>

          <p class="body-lg reveal reveal-delay-1">
            <em>"I just remember that feeling of astonishment,"</em> she says.
            <em>"It wasn't that I needed to figure out how it worked. I liked the
            way it made me feel and wanted to see how it could make other people feel."</em>
          </p>

          <p class="body-lg reveal reveal-delay-1">
            She taught herself from YouTube. By sixth grade she'd created her own
            show and was performing at preschools. By high school she was gigging
            solo - schools, camps, corporate events, nursing homes. At 18, she auditioned
            for Penn & Teller: Fool Us with an original trick. She didn't make it.
            She spent two years perfecting it. Then COVID hit, she tried again -
            and this time, at 20 years old, she was on national television. Teller
            sketched her portrait backstage and called her a <em>"wonder-worker."</em>
          </p>

          <h2 class="heading-md reveal reveal-delay-2" style="margin-top: 40px; margin-bottom: 24px;">The psychology thing</h2>

          <p class="body-lg reveal reveal-delay-2">
            Abby graduated from Bates College with a B.A. in Psychology and a Film Studies
            minor. This isn't a fun fact - it's core to how she performs. In her cognitive
            psychology lab, she literally wrote her research paper on magic: how
            violating a routine's expectations elevates audience surprise. She studies
            <em>how you pay attention</em>, what you'll remember, what you'll miss, and
            how to make you feel something real.
          </p>

          <p class="body-lg reveal reveal-delay-3">
            At Bates, she used magic tricks as final projects - an animation-course
            flipbook trick, a rhetoric class analogy about fake news, a Village
            Club Series magic show. She won <em>$6,000 first prize</em> at the
            Bobcat Ventures pitch competition for her magic business. The judges
            noted her company was already up and running and making money - "an
            impressive place for a student-run startup."
          </p>

          <h2 class="heading-md reveal reveal-delay-3" style="margin-top: 40px; margin-bottom: 24px;">Beyond the stage</h2>

          <p class="body-lg reveal reveal-delay-3">
            Abby is also a published author - her children's book <em>Shelly Shazam!</em>
            is sold on Amazon and at The Magic Castle in Hollywood. She's a visual
            artist whose collages and illustrations have been exhibited at Berlinskej
            Model in Prague. She's been featured on the Penguin Magic Podcast, lectured
            at Magifest, and teaches magic workshops for all ages.
          </p>

          <p class="body-lg reveal reveal-delay-4">
            Her mentor Evan Northrup put it best: <em>"From minute one, she pulled
            us in. She was very natural, which is unusual for someone of her age.
            Very conversational and just calming to watch - because she had such a
            grasp of what she was doing already."</em>
          </p>

          <p class="body-lg reveal reveal-delay-4" style="font-style: italic; color: var(--gold);">
            Pure skill. No gimmicks. Just 14 years of obsessive practice 
            and a psychology degree that explains why you never see it coming.
          </p>

          <div class="reveal reveal-delay-4" style="margin-top: 32px;">
            <router-link to="/contact" class="btn btn--filled magnetic"><span>Book Abby</span></router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="section timeline-section">
      <div class="container">
        <p class="heading-eyebrow reveal" style="text-align: center;">Journey</p>
        <h2 class="heading-lg reveal reveal-delay-1" style="text-align: center; margin-bottom: 60px;">
          The <em>timeline.</em>
        </h2>

        <div class="timeline">
          <div
            v-for="(m, i) in milestones"
            :key="m.year"
            class="timeline__item reveal"
            :class="`reveal-delay-${(i % 4) + 1}`"
          >
            <span class="timeline__year">{{ m.year }}</span>
            <div class="timeline__dot" />
            <p class="timeline__event">{{ m.event }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Venues -->
    <section class="section">
      <div class="container">
        <p class="heading-eyebrow reveal" style="text-align: center;">Venues</p>
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
          <div class="card reveal reveal-delay-1">
            <h3 class="venue-name">Rio Theatre</h3>
            <p class="venue-loc">Las Vegas, NV</p>
          </div>
          <div class="card reveal reveal-delay-2">
            <h3 class="venue-name">Magifest</h3>
            <p class="venue-loc">Magic Convention</p>
          </div>
          <div class="card reveal reveal-delay-3">
            <h3 class="venue-name">Berlinskej Model</h3>
            <p class="venue-loc">Prague, Czech Republic</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section" style="border-top: 1px solid var(--black-border); background: var(--black-soft);">
      <div class="container" style="text-align: center;">
        <h2 class="heading-lg reveal">Want the full <em>experience?</em></h2>
        <p class="body-lg reveal reveal-delay-1" style="max-width: 480px; margin: 16px auto 32px;">
          Check out the shows, or just skip ahead and book.
          Either way, your guests will thank you.
        </p>
        <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
          <router-link to="/shows" class="btn reveal reveal-delay-2"><span>See the Shows</span></router-link>
          <router-link to="/contact" class="btn btn--filled reveal reveal-delay-3"><span>Book Now</span></router-link>
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
  border-radius: var(--radius-lg);
  position: sticky;
  top: 120px;
  overflow: hidden;
}
.about-portrait__frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(5%) sepia(10%) sepia(15%) contrast(1.02);
  transition: all 0.6s var(--ease-out);
}
.about-portrait__frame:hover img {
  filter: grayscale(0%) sepia(0%) sepia(0%) contrast(1.05);
  transform: scale(1.02);
}
.about-bio p { margin-bottom: 20px; }
.about-bio em { color: var(--gold); font-style: italic; }
.about-bio h2 em { color: var(--gold); }

/* Timeline - vertical for more room */
.timeline-section { background: var(--black-soft); border-top: 1px solid var(--black-border); border-bottom: 1px solid var(--black-border); }
.timeline-section h2 em { color: var(--gold); font-style: italic; }
.timeline {
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  padding-left: 60px;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: var(--black-border);
}
.timeline__item {
  position: relative;
  padding-bottom: 40px;
}
.timeline__item:last-child { padding-bottom: 0; }
.timeline__dot {
  position: absolute;
  left: -47px;
  top: 4px;
  width: 11px;
  height: 11px;
  background: var(--rose);
  border-radius: 50%;
  border: 2px solid var(--black-soft);
}
.timeline__year {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--gold);
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 6px;
}
.timeline__event {
  font-size: 16px;
  color: var(--white-dim);
  line-height: 1.6;
}

/* Venues */
.venues-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
h2 em { color: var(--gold); font-style: italic; }
.venue-name { font-family: var(--font-display); font-size: 20px; margin-bottom: 4px; }
.venue-loc { font-size: 13px; color: var(--white-muted); }

@media (max-width: 768px) {
  .about-grid { grid-template-columns: 1fr; gap: 40px; }
  .about-portrait__frame { position: static; }
  .venues-grid { grid-template-columns: 1fr; }
  .timeline { padding-left: 40px; }
  .timeline::before { left: 10px; }
  .timeline__dot { left: -37px; }
}
</style>
