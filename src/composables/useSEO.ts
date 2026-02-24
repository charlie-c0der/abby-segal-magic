import { onMounted, onUnmounted } from 'vue'

interface SEOData {
  title?: string
  description?: string
  ogImage?: string
  canonicalUrl?: string
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

  onMounted(() => {
    // Store original values
    originalTitle = document.title

    // Set new values
    if (data.title) {
      document.title = data.title
    }

    if (data.description) {
      updateMeta('description', data.description)
      updateOGMeta('og:description', data.description)
      updateMeta('twitter:description', data.description)
    }

    if (data.title) {
      updateOGMeta('og:title', data.title)
      updateMeta('twitter:title', data.title)
    }

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
  })

  onUnmounted(() => {
    // Restore original values
    if (originalTitle) {
      document.title = originalTitle
    }
    
    // Remove added elements
    addedElements.forEach(element => {
      if (element.parentNode) {
        element.parentNode.removeChild(element)
      }
    })
  })
}