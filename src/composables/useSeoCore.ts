/**
 * useSeoCore — shared DOM <head> primitives for the SEO composables.
 * Owns element lookup/creation, the teardown registry, and the canonical
 * base URL. Tag *policy* (which tags, what values) stays in the callers
 * (useSEO / useWorldClassSEO) so emitted markup is unchanged.
 */

export const SEO_BASE_URL = 'https://www.abbysegalmagic.com'

export interface SeoHead {
  setMeta: (name: string, content: string) => void
  setProperty: (property: string, content: string) => void
  setCanonical: (url: string) => void
  injectJsonLd: (data: Record<string, unknown> | Record<string, unknown>[]) => void
  track: (el: HTMLElement) => void
  cleanup: () => void
}

export function createSeoHead(): SeoHead {
  const added: HTMLElement[] = []

  const setMeta = (name: string, content: string) => {
    let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', name)
      document.head.appendChild(meta)
      added.push(meta)
    }
    meta.content = content
  }

  const setProperty = (property: string, content: string) => {
    let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('property', property)
      document.head.appendChild(meta)
      added.push(meta)
    }
    meta.content = content
  }

  const setCanonical = (url: string) => {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
      added.push(canonical)
    }
    canonical.href = url.startsWith('http') ? url : `${SEO_BASE_URL}${url}`
  }

  const injectJsonLd = (data: Record<string, unknown> | Record<string, unknown>[]) => {
    try {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(data)
      document.head.appendChild(script)
      added.push(script)
    } catch (e) {
      console.error('Failed to serialize JSON-LD:', e)
    }
  }

  const track = (el: HTMLElement) => {
    added.push(el)
  }

  const cleanup = () => {
    added.forEach(el => {
      if (el.parentNode) el.parentNode.removeChild(el)
    })
    added.length = 0
  }

  return { setMeta, setProperty, setCanonical, injectJsonLd, track, cleanup }
}
