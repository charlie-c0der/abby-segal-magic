import { onMounted, onUnmounted } from 'vue'

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
  const baseUrl = 'https://www.abbysegalmagic.com'
  let originalTitle = ''
  const addedElements: HTMLElement[] = []

  const updateMeta = (name: string, content: string) => {
    let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', name)
      document.head.appendChild(meta)
      addedElements.push(meta)
    }
    meta.content = content
  }

  const updateOGMeta = (property: string, content: string) => {
    let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('property', property)
      document.head.appendChild(meta)
      addedElements.push(meta)
    }
    meta.content = content
  }

  const updateCanonical = (url: string) => {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
      addedElements.push(canonical)
    }
    canonical.href = url
  }

  const injectJsonLd = (data: Record<string, unknown> | Record<string, unknown>[]) => {
    try {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(data)
      document.head.appendChild(script)
      addedElements.push(script)
    } catch (e) {
      console.error('Failed to serialize JSON-LD:', e)
    }
  }

  onMounted(() => {
    originalTitle = document.title

    if (data.title) {
      document.title = data.title
      updateOGMeta('og:title', data.title)
      updateMeta('twitter:title', data.title)
    }

    if (data.description) {
      updateMeta('description', data.description)
      updateOGMeta('og:description', data.description)
      updateMeta('twitter:description', data.description)
    }

    if (data.keywords) {
      updateMeta('keywords', data.keywords)
    }

    if (data.robots) {
      updateMeta('robots', data.robots)
    }

    // Always set these OG defaults
    updateOGMeta('og:type', 'website')
    updateOGMeta('og:locale', 'en_US')
    updateOGMeta('og:site_name', 'Abby Segal Magic')
    updateMeta('twitter:site', '@abbysegalmagic')

    if (data.ogImage) {
      const fullImageUrl = data.ogImage.startsWith('http') ? data.ogImage : `${baseUrl}${data.ogImage}`
      updateOGMeta('og:image', fullImageUrl)
      updateMeta('twitter:image', fullImageUrl)
    }

    if (data.canonicalUrl) {
      const fullUrl = data.canonicalUrl.startsWith('http') ? data.canonicalUrl : `${baseUrl}${data.canonicalUrl}`
      updateCanonical(fullUrl)
      updateOGMeta('og:url', fullUrl)
    }

    if (data.jsonLd) {
      injectJsonLd(data.jsonLd)
    }
  })

  onUnmounted(() => {
    if (originalTitle) {
      document.title = originalTitle
    }
    
    addedElements.forEach(element => {
      if (element.parentNode) {
        element.parentNode.removeChild(element)
      }
    })
  })
}

export function buildBreadcrumbs(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url
    }))
  }
}