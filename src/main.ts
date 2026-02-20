import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './styles/global.css'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    { path: '/', component: () => import('./views/Home.vue') },
    { path: '/about', component: () => import('./views/About.vue') },
    { path: '/shows', component: () => import('./views/Shows.vue') },
    { path: '/press', component: () => import('./views/Press.vue') },
    { path: '/art', component: () => import('./views/Art.vue') },
    { path: '/contact', component: () => import('./views/Contact.vue') },
  ],
})

const app = createApp(App)
app.use(router)
app.mount('#app')
