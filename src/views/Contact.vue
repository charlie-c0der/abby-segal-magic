<script setup lang="ts">
import { useReveal } from '../composables/useReveal'
import { useWorldClassSEO } from '../composables/useWorldClassSEO'
import BookingForm from '../components/BookingForm.vue'

useReveal()
// World-class SEO for Contact page (high conversion value)
useWorldClassSEO({
  title: 'Book Abby Segal | Hire a Chicago Magician for Private Events & Entertainment',
  description: 'Contact Abby Segal to hire a Chicago magician for private events, corporate entertainment, weddings, and more. Close-up magic and sleight of hand performances. Custom quotes within 24 hours.',

  // Conversion-focused keywords with priority terms
  focusKeyphrases: [
    'hire Abby Segal Chicago magician',
    'book Chicago entertainment magic',
    'magician for hire private events',
    'Chicago Magic Lounge performer booking',
    'contact Chicago sleight of hand magician'
  ],
  semanticKeywords: [
    'Abby Segal magician for hire',
    'Chicago entertainment booking',
    'hire Chicago Magic performer',
    'private events Chicago magician',
    'Chicago close-up magic booking',
    'sleight of hand magician hire',
    'Chicago entertainment services contact',
    'magic performance Chicago booking',
    'activities in Chicago magic booking',
    'Chicago corporate entertainment hire',
    'private events entertainment Chicago',
    'Chicago magic shows booking',
    'entertainment magician for hire Chicago',
    'Chicago sleight of hand performer'
  ],

  // Technical SEO
  ogImage: '/assets/general/images/close-up-magician-chicago-performing.webp',
  ogType: 'website',
  canonicalUrl: '/contact',
  priority: 0.9,
  changeFreq: 'monthly',

  // Performance optimization
  preloadImages: [
    '/assets/general/images/close-up-magician-chicago-performing.webp'
  ],
  prefetchLinks: [
    '/shows',
    '/about'
  ],

  contentType: 'contact'
})
</script>

<template>
  <div class="contact-page">
    <section class="section contact-hero section--hero">
      <div class="container">
        <p class="heading-eyebrow reveal">Contact</p>
        <h1 class="heading-xl reveal reveal-delay-1">Let's make <em class="shimmer">magic.</em></h1>
        <p class="body-lg reveal reveal-delay-2" style="max-width: 560px; margin-top: 16px;">
          Looking for a magician for hire? Tell me about your event and I'll put together <em class="underline-sketch">the perfect close-up magic or sleight of hand performance</em>.
          <em class="shimmer">Custom quotes within 24 hours</em> — usually faster.
        </p>
        <div class="divider reveal reveal-delay-3" />
      </div>
    </section>

    <section class="section">
      <div class="container contact-grid">
        <!-- Form -->
        <div class="contact-form reveal">
          <BookingForm submit-label="Send Message" />
        </div>

        <!-- Info Sidebar -->
        <div class="contact-info">
          <div class="card reveal reveal-delay-1">
            <p class="heading-eyebrow">Email</p>
            <a href="mailto:abbysegalmagic@gmail.com" class="contact-info__link">
              abbysegalmagic@gmail.com
            </a>
          </div>

          <div class="card reveal reveal-delay-2">
            <p class="heading-eyebrow">Based in</p>
            <p class="contact-info__text">Chicago, Illinois</p>
            <p class="body-md" style="margin-top: 8px;">Available for <em class="shimmer">travel worldwide</em>.</p>
          </div>

          <div class="card reveal reveal-delay-3">
            <p class="heading-eyebrow">Follow</p>
            <div class="contact-info__socials">
              <a href="https://www.instagram.com/abbysegalmagic/" target="_blank" rel="noopener">Instagram</a>
              <a href="https://www.youtube.com/channel/UC9IvIVvbBis47CZWKV7tjLg" target="_blank" rel="noopener">YouTube</a>
              <a href="https://www.facebook.com/abbysegalmagic/" target="_blank" rel="noopener">Facebook</a>
            </div>
          </div>

          <div class="card reveal reveal-delay-4">
            <p class="heading-eyebrow">Response Time</p>
            <p class="contact-info__text">Within 24 hours</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-hero { padding-top: calc(var(--section-pad) + 80px); padding-bottom: 0; }
.contact-hero h1 em { color: var(--gold); font-style: normal; font-weight: 400; }

.contact-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 60px;
  align-items: start;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 120px;
}
.contact-info__link {
  font-size: var(--text-body-lg);
  font-weight: 500;
  color: var(--gold);
  transition: opacity 0.3s;
}
.contact-info__link:hover { opacity: 0.7; }
.contact-info__text {
  font-size: var(--text-body-lg);
  font-weight: 500;
}
.contact-info__socials {
  display: flex;
  gap: 16px;
  margin-top: 8px;
}
.contact-info__socials a {
  font-size: var(--text-body-sm);
  color: var(--white-dim);
  transition: color 0.3s;
}
.contact-info__socials a:hover { color: var(--gold); }

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .contact-info {
    position: static;
    order: 2;
  }
  .contact-form {
    order: 1;
  }
}
</style>
