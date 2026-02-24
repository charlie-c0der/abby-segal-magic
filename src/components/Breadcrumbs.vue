<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

interface BreadcrumbItem {
  text: string
  to?: string
}

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const items: BreadcrumbItem[] = [
    { text: 'Home', to: '/' }
  ]
  
  const pathMap: Record<string, string> = {
    '/about': 'About',
    '/shows': 'Shows',
    '/press': 'Press',
    '/art': 'Art',
    '/contact': 'Contact'
  }
  
  const currentPageTitle = pathMap[route.path]
  if (currentPageTitle) {
    items.push({ text: currentPageTitle })
  }
  
  return items
})
</script>

<template>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol class="breadcrumbs__list">
      <li 
        v-for="(item, index) in breadcrumbs"
        :key="index"
        class="breadcrumbs__item"
        :class="{ 'breadcrumbs__item--current': !item.to }"
      >
        <router-link 
          v-if="item.to"
          :to="item.to"
          class="breadcrumbs__link"
        >
          {{ item.text }}
        </router-link>
        <span 
          v-else
          class="breadcrumbs__current"
          aria-current="page"
        >
          {{ item.text }}
        </span>
        <span 
          v-if="index < breadcrumbs.length - 1"
          class="breadcrumbs__separator"
          aria-hidden="true"
        >
          /
        </span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumbs {
  padding: 1rem 0;
  border-bottom: 1px solid var(--black-border);
  background: var(--black-soft);
  font-size: 0.9rem;
}

.breadcrumbs__list {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
}

.breadcrumbs__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.breadcrumbs__link {
  color: var(--white-dim);
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumbs__link:hover {
  color: var(--gold);
}

.breadcrumbs__current {
  color: var(--white);
  font-weight: 500;
}

.breadcrumbs__separator {
  color: var(--white-muted);
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .breadcrumbs {
    font-size: 0.85rem;
  }
}
</style>