<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal'
useReveal()

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
  // TODO: Connect to form backend (Formspree, Netlify Forms, etc.)
  await new Promise(r => setTimeout(r, 1200))
  submitted.value = true
  submitting.value = false
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
    <section class="section contact-hero">
      <div class="container">
        <p class="heading-eyebrow reveal">Contact</p>
        <h1 class="heading-xl reveal reveal-delay-1">Let's make <em>magic.</em></h1>
        <div class="divider reveal reveal-delay-2" />
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
                  <label>Name *</label>
                  <input v-model="form.name" type="text" required placeholder="Your name" />
                </div>
                <div class="form-group">
                  <label>Email *</label>
                  <input v-model="form.email" type="email" required placeholder="your@email.com" />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Phone</label>
                  <input v-model="form.phone" type="tel" placeholder="(555) 123-4567" />
                </div>
                <div class="form-group">
                  <label>Event Date</label>
                  <input v-model="form.eventDate" type="date" />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Event Type</label>
                  <select v-model="form.eventType">
                    <option value="" disabled>Select type...</option>
                    <option v-for="t in eventTypes" :key="t" :value="t">{{ t }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Estimated Guests</label>
                  <input v-model="form.guestCount" type="text" placeholder="e.g. 50-100" />
                </div>
              </div>

              <div class="form-group">
                <label>Tell me about your event *</label>
                <textarea v-model="form.message" required rows="5" placeholder="What's the occasion? Any details that would help me plan the perfect show..." />
              </div>

              <button type="submit" class="btn btn--filled" :disabled="submitting">
                <span>{{ submitting ? 'Sending...' : 'Send Message' }}</span>
              </button>
            </form>

            <div v-else class="contact-success">
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
  border-color: var(--gold);
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
  border: 1px solid var(--gold);
}
.contact-success__icon {
  font-size: 48px;
  color: var(--gold);
  display: block;
  margin-bottom: 16px;
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
