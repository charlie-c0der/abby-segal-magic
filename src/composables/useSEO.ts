import { onMounted, onUnmounted } from 'vue'
import { SEO_BASE_URL, createSeoHead } from './useSeoCore'

interface SEOData {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  canonicalUrl?: string
  robots?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export function useSEO(data: SEOData) {
  const head = createSeoHead()
  let originalTitle = ''

  onMounted(() => {
    originalTitle = document.title

    if (data.title) {
      document.title = data.title
      head.setProperty('og:title', data.title)
      head.setMeta('twitter:title', data.title)
    }

    if (data.description) {
      head.setMeta('description', data.description)
      head.setProperty('og:description', data.description)
      head.setMeta('twitter:description', data.description)
    }

    if (data.keywords) {
      head.setMeta('keywords', data.keywords)
    }

    if (data.robots) {
      head.setMeta('robots', data.robots)
    }

    // Always set these OG defaults
    head.setProperty('og:type', 'website')
    head.setProperty('og:locale', 'en_US')
    head.setProperty('og:site_name', 'Abby Segal Magic')
    head.setMeta('twitter:site', '@abbysegalmagic')

    if (data.ogImage) {
      const fullImageUrl = data.ogImage.startsWith('http') ? data.ogImage : `${SEO_BASE_URL}${data.ogImage}`
      head.setProperty('og:image', fullImageUrl)
      head.setMeta('twitter:image', fullImageUrl)
    }

    if (data.canonicalUrl) {
      const fullUrl = data.canonicalUrl.startsWith('http') ? data.canonicalUrl : `${SEO_BASE_URL}${data.canonicalUrl}`
      head.setCanonical(fullUrl)
      head.setProperty('og:url', fullUrl)
    }

    if (data.jsonLd) {
      head.injectJsonLd(data.jsonLd)
    }
  })

  onUnmounted(() => {
    if (originalTitle) {
      document.title = originalTitle
    }
    head.cleanup()
  })
}
