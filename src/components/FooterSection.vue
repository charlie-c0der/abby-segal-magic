<script setup lang="ts">
const year = new Date().getFullYear()
const socials = [
  { label: 'Instagram', url: 'https://www.instagram.com/abbysegalmagic/' },
  { label: 'YouTube', url: 'https://www.youtube.com/channel/UC9IvIVvbBis47CZWKV7tjLg' },
  { label: 'Facebook', url: 'https://www.facebook.com/abbysegalmagic/' },
]
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <h3 class="footer__logo">Abby Segal <em>Magic</em></h3>
          <p class="body-md">Chicago-based magician.<br>Corporate events, private shows, and theatre.</p>
        </div>
        <div class="footer__cta">
          <p class="heading-eyebrow">Ready to be amazed?</p>
          <router-link to="/contact" class="btn btn--filled"><span>Book a Show</span></router-link>
        </div>
      </div>

      <div class="footer__divider" />

      <div class="footer__bottom">
        <div class="footer__links">
          <router-link to="/about">About</router-link>
          <router-link to="/shows">Shows</router-link>
          <router-link to="/press">Press</router-link>
          <router-link to="/art">Art</router-link>
          <router-link to="/contact">Contact</router-link>
        </div>
        <div class="footer__socials">
          <a v-for="s in socials" :key="s.label" :href="s.url" target="_blank" rel="noopener">
            {{ s.label }}
          </a>
        </div>
        <p class="footer__copy">© {{ year }} Abby Segal Magic. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 80px 0 40px;
  border-top: 1px solid var(--black-border);
  background: var(--black-soft);
}
.footer__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
  flex-wrap: wrap;
}
.footer__logo {
  font-family: var(--font-display);
  font-size: 28px;
  margin-bottom: 12px;
}
.footer__logo em {
  color: var(--gold);
  font-weight: 400;
}
.footer__cta {
  text-align: right;
}
.footer__divider {
  width: 100%;
  height: 1px;
  background: var(--black-border);
  margin: 48px 0 24px;
}
.footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
.footer__links {
  display: flex;
  gap: 24px;
}
.footer__links a {
  font-size: 13px;
  color: var(--white-muted);
  transition: color 0.3s;
}
.footer__links a:hover { color: var(--rose); }
.footer__socials {
  display: flex;
  gap: 20px;
}
.footer__socials a {
  font-size: 13px;
  color: var(--white-muted);
  transition: color 0.3s;
}
.footer__socials a:hover { color: var(--rose); }
.footer__copy {
  font-size: 12px;
  color: var(--white-muted);
  width: 100%;
  text-align: center;
  margin-top: 24px;
}
@media (max-width: 768px) {
  .footer__top { flex-direction: column; }
  .footer__cta { text-align: left; }
  .footer__bottom { flex-direction: column; align-items: flex-start; }
}
</style>
