<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal'
import { useSEO } from '../composables/useSEO'
import Breadcrumbs from '../components/Breadcrumbs.vue'

useReveal()
useSEO({
  title: 'Contact Abby Segal | Book Chicago Magician for Events',
  description: 'Contact Abby Segal to book magic performances for corporate events, private parties, weddings, and more. Based in Chicago, available worldwide.',
  ogImage: '/images/performance.webp',
  canonicalUrl: '/contact'
})

const form = ref({
  name: '',
  email: '',
  phone: '',
  eventDate: '',
  eventType: '',
  guestCount: '',
  message: '',
})

const submitted = ref(false)
const submitting = ref(false)

async function handleSubmit() {
  submitting.value = true
  
  try {
    // Using Formspree for form handling
    const response = await fetch('https://formspree.io/f/xpznzkyj', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone,
        eventDate: form.value.eventDate,
        eventType: form.value.eventType,
        guestCount: form.value.guestCount,
        message: form.value.message,
        subject: `Magic Booking Inquiry from ${form.value.name}`,
      }),
    })
    
    if (response.ok) {
      submitted.value = true
    } else {
      throw new Error('Form submission failed')
    }
  } catch (error) {
    console.error('Form submission error:', error)
    // Could add error state here
    alert('Sorry, there was an error sending your message. Please try again or email directly.')
  } finally {
    submitting.value = false
  }
}

const eventTypes = [
  'Corporate Event',
  'Private Party',
  'Wedding / Reception',
  'Birthday Party',
  'School / University',
  'Theatre / Venue',
  'Virtual Event',
  'Magic Lessons',
  'Art Commission',
  'Other',
]
</script>

<template>
  <div class="contact-page">
    <div class="container">
      <Breadcrumbs />
    </div>
    <section class="section contact-hero">
      <div class="container">
        <p class="heading-eyebrow reveal">Contact</p>
        <h1 class="heading-xl reveal reveal-delay-1">Let's make <em class="shimmer">magic.</em></h1>
        <p class="body-lg reveal reveal-delay-2" style="max-width: 560px; margin-top: 16px;">
          Tell me about your event and I'll put together the perfect show.
          Custom quotes within 24 hours - usually faster.
        </p>
        <div class="divider reveal reveal-delay-3" />
      </div>
    </section>

    <section class="section">
      <div class="container contact-grid">
        <!-- Form -->
        <div class="contact-form reveal">
          <transition name="fade" mode="out-in">
            <form v-if="!submitted" @submit.prevent="handleSubmit" class="form">
              <div class="form-row">
                <div class="form-group">
                  <label for="contact-name">Name *</label>
                  <input 
                    id="contact-name"
                    v-model="form.name" 
                    name="name"
                    type="text" 
                    required 
                    placeholder="Your name" 
                  />
                </div>
                <div class="form-group">
                  <label for="contact-email">Email *</label>
                  <input 
                    id="contact-email"
                    v-model="form.email" 
                    name="email"
                    type="email" 
                    required 
                    placeholder="your@email.com" 
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="contact-phone">Phone</label>
                  <input 
                    id="contact-phone"
                    v-model="form.phone" 
                    name="phone"
                    type="tel" 
                    placeholder="(555) 123-4567" 
                  />
                </div>
                <div class="form-group">
                  <label for="contact-date">Event Date</label>
                  <input 
                    id="contact-date"
                    v-model="form.eventDate" 
                    name="eventDate"
                    type="date" 
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="contact-type">Event Type</label>
                  <select 
                    id="contact-type"
                    v-model="form.eventType"
                    name="eventType"
                  >
                    <option value="" disabled>Select type...</option>
                    <option v-for="t in eventTypes" :key="t" :value="t">{{ t }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="contact-guests">Estimated Guests</label>
                  <input 
                    id="contact-guests"
                    v-model="form.guestCount" 
                    name="guestCount"
                    type="text" 
                    placeholder="e.g. 50-100" 
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="contact-message">Tell me about your event *</label>
                <textarea 
                  id="contact-message"
                  v-model="form.message" 
                  name="message"
                  required 
                  rows="5" 
                  placeholder="What's the occasion? Any details that would help me plan the perfect show..." 
                />
              </div>

              <button type="submit" class="btn btn--filled" :disabled="submitting">
                <span>{{ submitting ? 'Sending...' : 'Send Message' }}</span>
              </button>
            </form>

            <div v-else class="contact-success">
              <div class="contact-success__sparkles">
                <span v-for="n in 12" :key="n" class="contact-success__sparkle" :style="{
                  '--angle': (n * 30) + 'deg',
                  animationDelay: (n * 0.05) + 's',
                }" />
              </div>
              <span class="contact-success__icon">✦</span>
              <h2 class="heading-md">Message sent!</h2>
              <p class="body-lg">
                Thanks for reaching out. I'll get back to you within 24 hours.
              </p>
            </div>
          </transition>
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
            <p class="body-md" style="margin-top: 8px;">Available for travel worldwide.</p>
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
.contact-hero h1 em { color: var(--gold); font-style: italic; }

.contact-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 60px;
  align-items: start;
}

/* Form */
.form { display: flex; flex-direction: column; gap: 20px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-group label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--white-muted);
}
.form-group input,
.form-group select,
.form-group textarea {
  padding: 14px 16px;
  background: var(--black-card);
  border: 1px solid var(--black-border);
  color: var(--white);
  font-family: var(--font-body);
  font-size: 15px;
  transition: border-color 0.3s;
  outline: none;
  border-radius: 0;
  -webkit-appearance: none;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--rose);
  box-shadow: 0 0 0 3px rgba(196, 132, 122, 0.08);
}
.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--white-muted);
}
.form-group select {
  color: var(--white-dim);
}
.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

/* Success */
.contact-success {
  text-align: center;
  padding: 80px 40px;
  border: 1px solid var(--rose);
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
  animation: successReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes successReveal {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
.contact-success__icon {
  font-size: 48px;
  color: var(--gold);
  display: block;
  margin-bottom: 16px;
  animation: symbolSpin 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes symbolSpin {
  from { transform: rotate(0deg) scale(0); opacity: 0; }
  to { transform: rotate(360deg) scale(1); opacity: 1; }
}
.contact-success__sparkles {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.contact-success__sparkle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--rose);
  border-radius: 50%;
  animation: sparkleOut 0.8s ease-out forwards;
  box-shadow: 0 0 6px var(--rose);
}
.contact-success__sparkle:nth-child(odd) {
  background: var(--gold);
  box-shadow: 0 0 6px var(--gold);
}
@keyframes sparkleOut {
  from {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  to {
    transform: translate(
      calc(cos(var(--angle)) * 80px),
      calc(sin(var(--angle)) * 80px)
    ) scale(0);
    opacity: 0;
  }
}

/* Info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 120px;
}
.contact-info__link {
  font-size: 18px;
  font-weight: 500;
  color: var(--gold);
  transition: opacity 0.3s;
}
.contact-info__link:hover { opacity: 0.7; }
.contact-info__text {
  font-size: 18px;
  font-weight: 500;
}
.contact-info__socials {
  display: flex;
  gap: 16px;
  margin-top: 8px;
}
.contact-info__socials a {
  font-size: 14px;
  color: var(--white-dim);
  transition: color 0.3s;
}
.contact-info__socials a:hover { color: var(--gold); }

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 768px) {
  .contact-grid { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
  .contact-info { position: static; }
}
</style>
