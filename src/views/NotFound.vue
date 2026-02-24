<script setup lang="ts">
import { useSEO } from '../composables/useSEO'

useSEO({
  title: '404 - Page Not Found | Abby Segal Magic',
  description: 'The page you\'re looking for has vanished like a magic trick. Return to Abby Segal\'s homepage to explore her magic shows and performances.',
  canonicalUrl: '/404'
})
</script>

<template>
  <div class="not-found">
    <div class="not-found__bg">
      <div class="floating-card floating-card--1">♠</div>
      <div class="floating-card floating-card--2">♥</div>
      <div class="floating-card floating-card--3">♣</div>
      <div class="floating-card floating-card--4">♦</div>
    </div>
    
    <div class="not-found__content container">
      <div class="not-found__number">404</div>
      <h1 class="heading-lg">Page has vanished.</h1>
      <p class="body-lg">Like a good magic trick, this page has disappeared. But unlike magic, this wasn't intentional.</p>
      
      <div class="not-found__actions">
        <router-link to="/" class="btn btn--filled magnetic">
          <span>Return to Homepage</span>
        </router-link>
        <router-link to="/contact" class="btn btn--outlined magnetic">
          <span>Contact Abby</span>
        </router-link>
      </div>
      
      <div class="not-found__links">
        <p class="heading-eyebrow">Quick Links</p>
        <div class="link-grid">
          <router-link to="/about">About</router-link>
          <router-link to="/shows">Shows</router-link>
          <router-link to="/press">Press</router-link>
          <router-link to="/art">Art</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 120px 0;
  background: linear-gradient(180deg, var(--black) 0%, var(--black-soft) 50%, var(--black) 100%);
}

.not-found__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.floating-card {
  position: absolute;
  font-size: 4rem;
  color: var(--rose);
  opacity: 0.1;
  animation: cardFloat 8s ease-in-out infinite;
  pointer-events: none;
}

.floating-card--1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
  color: var(--gold);
}

.floating-card--2 {
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.floating-card--3 {
  bottom: 30%;
  left: 20%;
  animation-delay: 4s;
  color: var(--gold);
}

.floating-card--4 {
  top: 30%;
  right: 30%;
  animation-delay: 6s;
}

@keyframes cardFloat {
  0%, 100% { 
    transform: translateY(0) rotate(0deg); 
    opacity: 0.1; 
  }
  25% { 
    transform: translateY(-20px) rotate(5deg); 
    opacity: 0.2; 
  }
  50% { 
    transform: translateY(0) rotate(0deg); 
    opacity: 0.1; 
  }
  75% { 
    transform: translateY(20px) rotate(-5deg); 
    opacity: 0.2; 
  }
}

.not-found__content {
  text-align: center;
  position: relative;
  z-index: 10;
}

.not-found__number {
  font-family: var(--font-display);
  font-size: clamp(6rem, 15vw, 12rem);
  font-weight: 800;
  line-height: 0.8;
  background: linear-gradient(45deg, var(--rose), var(--gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.not-found h1 {
  margin-bottom: 1rem;
  color: var(--white);
}

.not-found p {
  color: var(--white-dim);
  max-width: 500px;
  margin: 0 auto 3rem;
}

.not-found__actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 4rem;
  flex-wrap: wrap;
}

.not-found__links {
  margin-top: 2rem;
}

.not-found__links .heading-eyebrow {
  margin-bottom: 1rem;
}

.link-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
}

.link-grid a {
  color: var(--white-dim);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid var(--black-border);
  border-radius: var(--radius-sm);
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.link-grid a:hover {
  color: var(--gold);
  border-color: var(--gold);
  background: rgba(196, 146, 79, 0.1);
}

@media (max-width: 768px) {
  .not-found__actions {
    flex-direction: column;
    align-items: center;
  }
  
  .not-found__actions .btn {
    width: 100%;
    max-width: 280px;
  }
  
  .link-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .floating-card {
    font-size: 3rem;
  }
  
  .link-grid {
    grid-template-columns: 1fr;
  }
}
</style>