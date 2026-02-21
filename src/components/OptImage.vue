<script setup lang="ts">
/**
 * OptImage - Optimized image component.
 * - Serves WebP with JPEG fallback via <picture>
 * - Native lazy loading
 * - Width/height for CLS prevention
 * - Optional thumbnail src for art grid (loads small, then full)
 */

const props = withDefaults(defineProps<{
  src: string
  alt: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
  fetchpriority?: 'high' | 'low' | 'auto'
  sizes?: string
  thumb?: boolean
}>(), {
  loading: 'lazy',
  fetchpriority: 'auto',
  thumb: false,
})

// Derive WebP path from JPEG path
const webpSrc = props.src.replace(/\.(jpe?g|png)$/i, '.webp')
const thumbSrc = props.thumb ? props.src.replace(/\.(jpe?g|png)$/i, '-thumb.webp') : null
</script>

<template>
  <picture>
    <source :srcset="thumbSrc || webpSrc" type="image/webp" />
    <img
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="loading"
      :fetchpriority="fetchpriority"
      :sizes="sizes"
      decoding="async"
    />
  </picture>
</template>
