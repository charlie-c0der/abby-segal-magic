/**
 * World-Class SEO System - Comprehensive optimization for maximum search visibility
 * Implements advanced SEO strategies including semantic markup, performance optimization, and strategic linking
 */
import { onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { SEO_BASE_URL, createSeoHead } from './useSeoCore'

interface AdvancedSEOData {
  // Core Meta
  title?: string
  description?: string
  keywords?: string[]
  
  // Open Graph & Social
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile'
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  
  // Technical
  canonicalUrl?: string
  robots?: string

  // Structured Data
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
  breadcrumbs?: Array<{ name: string; url: string }>
  
  // Performance
  preloadImages?: string[]
  prefetchLinks?: string[]
  
  // Content Optimization  
  focusKeyphrases?: string[]
  semanticKeywords?: string[]
  contentType?: 'service' | 'about' | 'gallery' | 'press' | 'contact'
}

interface PerformanceMetrics {
  loadTime: number
  domContentLoaded: number
  firstContentfulPaint: number
  largestContentfulPaint: number
}

const baseUrl = SEO_BASE_URL
const siteName = 'Abby Segal Magic'
const businessInfo = {
  name: 'Abby Segal',
  jobTitle: 'Professional Magician & Sleight of Hand Expert',
  location: 'Chicago, IL',
  phone: '',
  email: 'hello@abbysegalmagic.com',
  socialProfiles: [
    'https://www.instagram.com/abbysegalmagic/',
    'https://www.youtube.com/channel/UC9IvIVvbBis47CZWKV7tjLg',
    'https://www.facebook.com/abbysegalmagic/'
  ]
}

export function useWorldClassSEO(data: AdvancedSEOData) {
  const route = useRoute()
  let originalTitle = ''
  const head = createSeoHead()
  const performanceMetrics: Partial<PerformanceMetrics> = {}

  // Meta tag management — delegates to the shared SEO core
  function updateMeta(nameOrProperty: string, content: string, isProperty = false) {
    if (isProperty) {
      head.setProperty(nameOrProperty, content)
    } else {
      head.setMeta(nameOrProperty, content)
    }
  }

  // Canonical URL handling — delegates to the shared SEO core
  function updateCanonical(url: string) {
    head.setCanonical(url)
  }

  // Advanced JSON-LD structured data
  function generateEnhancedStructuredData() {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@graph': [] as any[]
    }

    // Website Schema
    const websiteSchema = {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      'url': baseUrl,
      'name': siteName,
      'description': 'Chicago magician Abby Segal specializes in close-up magic, sleight of hand, and stage performances for private events and corporate entertainment.',
      'publisher': {
        '@id': `${baseUrl}/#person`
      },
      'potentialAction': {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': `${baseUrl}/?s={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    }

    // Person/Business Schema
    const personSchema = {
      '@type': 'Person',
      '@id': `${baseUrl}/#person`,
      'name': businessInfo.name,
      'url': baseUrl,
      'jobTitle': businessInfo.jobTitle,
      'description': 'Professional magician and sleight of hand expert based in Chicago, specializing in close-up magic and stage performances.',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Chicago',
        'addressRegion': 'Illinois',
        'addressCountry': 'US'
      },
      'sameAs': businessInfo.socialProfiles,
      'hasCredential': [
        'Penn & Teller: Fool Us Performer',
        'Chicago Magic Lounge Resident Performer',
        'The Magic Castle Performer'
      ],
      'knowsAbout': [
        'Close-up Magic',
        'Sleight of Hand',
        'Stage Magic',
        'Entertainment',
        'Corporate Events',
        'Private Parties'
      ]
    }

    // Page-specific schema
    let pageSchema: any = {}
    
    switch (data.contentType) {
      case 'service':
        pageSchema = {
          '@type': 'Service',
          '@id': `${baseUrl}${route.path}#service`,
          'serviceType': 'Entertainment',
          'provider': { '@id': `${baseUrl}/#person` },
          'areaServed': {
            '@type': 'City',
            'name': 'Chicago'
          },
          'audience': {
            '@type': 'Audience',
            'audienceType': 'Private Events, Corporate Entertainment'
          }
        }
        break
        
      case 'gallery':
        pageSchema = {
          '@type': 'CollectionPage',
          '@id': `${baseUrl}${route.path}#collection`,
          'name': data.title,
          'description': data.description,
          'creator': { '@id': `${baseUrl}/#person` }
        }
        break
        
      case 'about':
        pageSchema = {
          '@type': 'AboutPage',
          '@id': `${baseUrl}${route.path}#about`,
          'mainEntity': { '@id': `${baseUrl}/#person` }
        }
        break
    }

    baseSchema['@graph'] = [websiteSchema, personSchema, pageSchema].filter(Boolean)
    
    // Add custom JSON-LD if provided
    if (data.jsonLd) {
      if (Array.isArray(data.jsonLd)) {
        baseSchema['@graph'].push(...data.jsonLd)
      } else {
        baseSchema['@graph'].push(data.jsonLd)
      }
    }

    return baseSchema
  }

  // Performance optimization
  function optimizePerformance() {
    // Preload critical images
    if (data.preloadImages?.length) {
      data.preloadImages.forEach(src => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = src
        document.head.appendChild(link)
        head.track(link)
      })
    }

    // Prefetch important pages
    if (data.prefetchLinks?.length) {
      data.prefetchLinks.forEach(href => {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = href
        document.head.appendChild(link)
        head.track(link)
      })
    }

    // DNS prefetch for external resources
    const dnsPrefetchDomains = [
      'fonts.googleapis.com',
      'fonts.gstatic.com',
      'www.google-analytics.com',
      'www.googletagmanager.com'
    ]

    dnsPrefetchDomains.forEach(domain => {
      const link = document.createElement('link')
      link.rel = 'dns-prefetch'
      link.href = `//${domain}`
      document.head.appendChild(link)
      head.track(link)
    })
  }

  // Enhanced social media optimization
  function optimizeSocialMedia() {
    const socialMeta = {
      // Open Graph
      'og:site_name': siteName,
      'og:type': data.ogType || 'website',
      'og:locale': 'en_US',
      'og:url': `${baseUrl}${route.path}`,
      
      // Twitter
      'twitter:card': data.twitterCard || 'summary_large_image',
      'twitter:site': '@abbysegalmagic',
      'twitter:creator': '@abbysegalmagic',
      
      // Facebook
      'fb:app_id': '', // Add if you have a Facebook app
      
      // Additional social signals
      'article:author': businessInfo.name,
      'article:publisher': baseUrl
    }

    Object.entries(socialMeta).forEach(([property, content]) => {
      if (content) {
        updateMeta(property, content, true)
      }
    })
  }

  // Core Web Vitals monitoring
  function monitorPerformance() {
    // Measure performance metrics
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        performanceMetrics.loadTime = navigation.loadEventEnd - navigation.loadEventStart
        performanceMetrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart

        // Send to analytics if configured
        if ((window as any).gtag) {
          (window as any).gtag('event', 'page_load_performance', {
            load_time: performanceMetrics.loadTime,
            dom_content_loaded: performanceMetrics.domContentLoaded
          })
        }
      }, 0)
    })
  }

  // Internal linking is hand-placed in each view; no runtime DOM rewriting.
  function enhanceInternalLinking() {}

  onMounted(() => {
    originalTitle = document.title

    // Core SEO setup
    if (data.title) {
      document.title = data.title
      updateMeta('og:title', data.title, true)
      updateMeta('twitter:title', data.title)
    }

    if (data.description) {
      updateMeta('description', data.description)
      updateMeta('og:description', data.description, true)
      updateMeta('twitter:description', data.description)
    }

    // Canonical URL
    if (data.canonicalUrl) {
      updateCanonical(data.canonicalUrl)
    }

    // Robots directive
    updateMeta('robots', data.robots || 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')

    // Image optimization
    if (data.ogImage) {
      updateMeta('og:image', data.ogImage.startsWith('http') ? data.ogImage : `${baseUrl}${data.ogImage}`, true)
      updateMeta('twitter:image', data.ogImage.startsWith('http') ? data.ogImage : `${baseUrl}${data.ogImage}`)
      updateMeta('og:image:alt', data.title || 'Abby Segal Magic', true)
    }

    // Enhanced structured data
    const structuredData = generateEnhancedStructuredData()
    head.injectJsonLd(structuredData)

    // Social media optimization
    optimizeSocialMedia()

    // Performance optimization
    optimizePerformance()

    // Performance monitoring
    monitorPerformance()

    // Internal linking enhancement
    enhanceInternalLinking()

    // Additional technical SEO
    updateMeta('format-detection', 'telephone=no')
    updateMeta('mobile-web-app-capable', 'yes')
    updateMeta('apple-mobile-web-app-capable', 'yes')
    updateMeta('apple-mobile-web-app-status-bar-style', 'black-translucent')
  })

  onUnmounted(() => {
    document.title = originalTitle
    head.cleanup()
  })

  return {
    performanceMetrics
  }
}

// Utility function for generating FAQ schema
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  }
}

// Utility for local business schema
export function generateLocalBusinessSchema() {
  return {
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/#business`,
    'name': businessInfo.name,
    'description': 'Professional magic entertainment services in Chicago and surrounding areas.',
    'url': baseUrl,
    'telephone': businessInfo.phone,
    'email': businessInfo.email,
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Chicago',
      'addressRegion': 'Illinois',
      'addressCountry': 'US'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '41.8781',
      'longitude': '-87.6298'
    },
    'areaServed': [
      {
        '@type': 'City',
        'name': 'Chicago'
      },
      {
        '@type': 'State', 
        'name': 'Illinois'
      }
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Magic Entertainment Services',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Close-Up Magic',
            'description': 'Intimate magic performances at your table or venue'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Stage Shows',
            'description': 'Interactive stage magic for groups up to 80 people'
          }
        }
      ]
    }
  }
}