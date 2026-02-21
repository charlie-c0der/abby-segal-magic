<script setup lang="ts">
/**
 * LazyYouTube - Only loads the iframe when user clicks.
 * Saves ~500KB+ of YouTube JS/CSS until actually needed.
 * Shows a thumbnail placeholder with a play button.
 */
import { ref } from 'vue'

const props = defineProps<{
  videoId: string
  title: string
}>()

const activated = ref(false)
const thumbnailUrl = `https://img.youtube.com/vi/${props.videoId}/hqdefault.jpg`
</script>

<template>
  <div class="lazy-yt" :class="{ activated }" @click="activated = true">
    <template v-if="!activated">
      <img
        :src="thumbnailUrl"
        :alt="title"
        loading="lazy"
        decoding="async"
        class="lazy-yt__thumb"
      />
      <button class="lazy-yt__play" :aria-label="`Play ${title}`">
        <svg viewBox="0 0 68 48" width="68" height="48">
          <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24S67.94 13.05 66.52 7.74z" fill="#c9a84c"/>
          <path d="M45 24L27 14v20" fill="#050505"/>
        </svg>
      </button>
    </template>
    <iframe
      v-else
      :src="`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`"
      :title="title"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>

<style scoped>
.lazy-yt {
  aspect-ratio: 16/9;
  background: var(--black-card);
  position: relative;
  cursor: pointer;
  overflow: hidden;
}
.lazy-yt__thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s;
}
.lazy-yt:hover .lazy-yt__thumb { opacity: 0.8; }
.lazy-yt__play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.3s;
}
.lazy-yt:hover .lazy-yt__play { transform: translate(-50%, -50%) scale(1.1); }
.lazy-yt iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
