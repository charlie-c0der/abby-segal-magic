<script setup lang="ts">
interface Logo {
  name: string
  src: string
  alt: string
  lightBg?: boolean
}

defineProps<{
  eyebrow: string
  title: string
  logos: Logo[]
  columns?: number
}>()
</script>

<template>
  <section class="brand-wall section">
    <div class="container">
      <p class="heading-eyebrow reveal brand-wall__eyebrow">{{ eyebrow }}</p>
      <h2 class="heading-lg reveal reveal-delay-1 brand-wall__title" v-html="title"></h2>
      <ul
        class="brand-wall__grid reveal reveal-delay-2"
        :style="{ '--brand-cols': columns ?? logos.length }"
      >
        <li
          v-for="logo in logos"
          :key="logo.name"
          class="brand-wall__cell"
          :class="{ 'brand-wall__cell--light': logo.lightBg }"
        >
          <img
            :src="logo.src"
            :alt="logo.alt"
            class="brand-wall__logo"
            loading="lazy"
            decoding="async"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.brand-wall {
  border-top: 1px solid var(--ember);
  background: var(--obsidian);
}
.brand-wall__eyebrow {
  text-align: center;
  color: var(--gold);
}
.brand-wall__title {
  text-align: center;
  margin-bottom: 48px;
  color: var(--ivory);
}
.brand-wall__grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(var(--brand-cols), minmax(0, 1fr));
  gap: 16px;
  align-items: stretch;
}
.brand-wall__cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 20px;
  min-height: 110px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  transition: background 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
}
.brand-wall__cell:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: var(--gold);
  transform: translateY(-2px);
}
.brand-wall__cell--light {
  background: rgba(255, 255, 255, 0.92);
  border-color: rgba(255, 255, 255, 0.2);
}
.brand-wall__cell--light:hover {
  background: #fff;
  border-color: var(--gold);
}
.brand-wall__logo {
  max-width: 100%;
  max-height: 56px;
  width: auto;
  height: auto;
  object-fit: contain;
  opacity: 0.9;
  transition: opacity 0.3s ease;
}
.brand-wall__cell:hover .brand-wall__logo {
  opacity: 1;
}

@media (max-width: 960px) {
  .brand-wall__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (max-width: 560px) {
  .brand-wall__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .brand-wall__cell {
    min-height: 88px;
    padding: 16px 12px;
  }
  .brand-wall__logo {
    max-height: 44px;
  }
}
</style>
