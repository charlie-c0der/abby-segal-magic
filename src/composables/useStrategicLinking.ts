/**
 * Strategic Internal Linking System - World-class SEO link building
 * Automatically adds contextual internal links to boost page authority and user engagement
 */
import { onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'

interface LinkingRule {
  triggers: string[]
  target: string
  linkText: string
  maxLinks?: number
  priority?: number
  context?: string
}

interface LinkingConfig {
  enableAutolinking?: boolean
  maxLinksPerPage?: number
  respectExistingLinks?: boolean
  addNofollow?: boolean
}

export function useStrategicLinking(config: LinkingConfig = {}) {
  const route = useRoute()
  const defaultConfig: Required<LinkingConfig> = {
    enableAutolinking: true,
    maxLinksPerPage: 8,
    respectExistingLinks: true,
    addNofollow: false
  }
  
  const settings = { ...defaultConfig, ...config }
  
  // Strategic linking rules based on content analysis with priority keywords
  const linkingRules: LinkingRule[] = [
    // From any page to Shows (highest priority - main service)
    {
      triggers: ['magic show', 'performance', 'entertainment', 'hire a magician', 'book a magician', 'magician for hire'],
      target: '/shows',
      linkText: 'Chicago magic performances',
      priority: 10,
      maxLinks: 2
    },
    {
      triggers: ['close-up magic', 'sleight of hand', 'table-side magic'],
      target: '/shows',
      linkText: 'close-up magic and sleight of hand shows',
      priority: 9,
      maxLinks: 1
    },
    {
      triggers: ['parlour show', 'stage magic', 'group performance', 'private events'],
      target: '/shows',
      linkText: 'private events entertainment',
      priority: 9,
      maxLinks: 1
    },
    
    // From any page to Contact (conversion priority)
    {
      triggers: ['book', 'hire', 'event', 'contact', 'inquiry', 'quote'],
      target: '/contact',
      linkText: 'book your event',
      priority: 8,
      maxLinks: 2
    },
    {
      triggers: ['get in touch', 'reach out', 'discuss your event'],
      target: '/contact',
      linkText: 'get in touch',
      priority: 7,
      maxLinks: 1
    },
    
    // From any page to About (authority building)
    {
      triggers: ['Abby Segal', 'about Abby', 'magician background', 'experience', 'Chicago magician'],
      target: '/about',
      linkText: 'about Abby Segal',
      priority: 6,
      maxLinks: 1
    },
    {
      triggers: ['Penn & Teller', 'Fool Us', 'Chicago Magic Lounge', 'sleight of hand expert'],
      target: '/about',
      linkText: 'Chicago Magic Lounge performer',
      priority: 6,
      maxLinks: 1
    },
    
    // From any page to Press (social proof)
    {
      triggers: ['featured', 'press coverage', 'media', 'reviews'],
      target: '/press',
      linkText: 'press coverage',
      priority: 5,
      maxLinks: 1
    },
    
    // From any page to Art (uniqueness factor)
    {
      triggers: ['artwork', 'visual art', 'artist', 'creative', 'portfolio'],
      target: '/art',
      linkText: 'art portfolio',
      priority: 4,
      maxLinks: 1
    }
  ]
  
  // Location-based and service-specific rules with priority keywords
  const locationRules: LinkingRule[] = [
    {
      triggers: ['Chicago', 'Illinois', 'Midwest', 'activities in Chicago'],
      target: '/shows',
      linkText: 'Chicago entertainment and magic shows',
      priority: 8,
      maxLinks: 1,
      context: 'location'
    },
    {
      triggers: ['corporate event', 'private party', 'wedding', 'birthday party', 'private events'],
      target: '/shows',
      linkText: 'private events entertainment',
      priority: 7,
      maxLinks: 1,
      context: 'event-type'
    },
    {
      triggers: ['magic', 'magician', 'entertainment'],
      target: '/shows',
      linkText: 'Chicago magician services',
      priority: 6,
      maxLinks: 1,
      context: 'service-type'
    }
  ]
  
  const allRules = [...linkingRules, ...locationRules]
  
  function findLinkingOpportunities(content: Element): Array<{
    element: Element
    rule: LinkingRule
    matchedText: string
  }> {
    const opportunities: Array<{
      element: Element
      rule: LinkingRule
      matchedText: string
    }> = []
    
    // Get all text nodes
    const walker = document.createTreeWalker(
      content,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip if parent is already a link
          if (node.parentElement?.tagName === 'A') {
            return NodeFilter.FILTER_REJECT
          }
          // Skip if in navigation or header
          if (node.parentElement?.closest('nav, header')) {
            return NodeFilter.FILTER_REJECT
          }
          return NodeFilter.FILTER_ACCEPT
        }
      }
    )
    
    const textNodes: Text[] = []
    let node
    while (node = walker.nextNode()) {
      textNodes.push(node as Text)
    }
    
    // Find opportunities in each text node
    for (const rule of allRules) {
      // Skip if linking to current page
      if (route.path === rule.target) continue
      
      for (const trigger of rule.triggers) {
        const regex = new RegExp(trigger.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
        
        for (const textNode of textNodes) {
          const matches = textNode.textContent?.match(regex)
          if (matches && textNode.parentElement) {
            opportunities.push({
              element: textNode.parentElement,
              rule,
              matchedText: matches[0]
            })
          }
        }
      }
    }
    
    // Sort by priority and limit
    return opportunities
      .sort((a, b) => (b.rule.priority || 0) - (a.rule.priority || 0))
      .slice(0, settings.maxLinksPerPage)
  }
  
  function applyStrategicLinks(opportunities: Array<{
    element: Element
    rule: LinkingRule
    matchedText: string
  }>) {
    const appliedRules = new Map<LinkingRule, number>()
    
    for (const opportunity of opportunities) {
      const { element, rule, matchedText } = opportunity
      
      // Check if we've already applied this rule too many times
      const currentCount = appliedRules.get(rule) || 0
      if (rule.maxLinks && currentCount >= rule.maxLinks) {
        continue
      }
      
      // Find the text node containing the matched text
      const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null
      )
      
      let textNode: Node | null
      while ((textNode = walker.nextNode()) !== null) {
        const text = (textNode as Text).textContent || ''
        const regex = new RegExp(matchedText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
        const match = text.match(regex)
        
        if (match && match.index !== undefined) {
          // Create the link
          const link = document.createElement('a')
          link.href = rule.target
          link.textContent = rule.linkText
          link.className = 'strategic-link'
          link.setAttribute('data-strategic-link', 'true')
          
          if (settings.addNofollow) {
            link.rel = 'nofollow'
          }
          
          // Split the text node and insert the link
          const beforeText = text.substring(0, match.index)
          const afterText = text.substring(match.index + match[0].length)
          
          const parent = textNode.parentNode
          if (parent) {
            if (beforeText) {
              parent.insertBefore(document.createTextNode(beforeText), textNode)
            }
            parent.insertBefore(link, textNode)
            if (afterText) {
              parent.insertBefore(document.createTextNode(afterText), textNode)
            }
            parent.removeChild(textNode)
          }
          
          appliedRules.set(rule, currentCount + 1)
          break
        }
      }
    }
  }
  
  function addContextualCTA() {
    const content = document.querySelector('main')
    if (!content) return
    
    // Add contextual CTAs based on page type
    const ctaConfig = {
      '/about': {
        text: 'Ready to book your event?',
        link: '/contact',
        position: 'bottom'
      },
      '/press': {
        text: 'See available show options',
        link: '/shows',
        position: 'bottom'
      },
      '/art': {
        text: 'Book Abby for your event',
        link: '/contact',
        position: 'bottom'
      }
    }
    
    const config = ctaConfig[route.path as keyof typeof ctaConfig]
    if (config) {
      const ctaSection = document.createElement('section')
      ctaSection.className = 'strategic-cta section'
      ctaSection.innerHTML = `
        <div class="container">
          <div class="strategic-cta__content">
            <p class="strategic-cta__text">${config.text}</p>
            <a href="${config.link}" class="btn btn--filled strategic-cta__button magnetic-element">
              <span>Get Started</span>
            </a>
          </div>
        </div>
      `
      
      if (config.position === 'bottom') {
        content.appendChild(ctaSection)
      }
    }
  }
  
  function addStrategicBreadcrumbLinks() {
    // Add invisible breadcrumb links for SEO (not visual breadcrumbs)
    const breadcrumbSchema = document.createElement('script')
    breadcrumbSchema.type = 'application/ld+json'
    
    const pathSegments = route.path.split('/').filter(Boolean)
    const breadcrumbs = [
      { name: 'Home', url: 'https://www.abbysegalmagic.com/' }
    ]
    
    // Build breadcrumb chain
    let currentPath = ''
    for (const segment of pathSegments) {
      currentPath += `/${segment}`
      const pageNames: Record<string, string> = {
        '/about': 'About',
        '/shows': 'Shows',
        '/contact': 'Contact',
        '/art': 'Art',
        '/press': 'Press'
      }
      
      const pageName = pageNames[currentPath]
      if (pageName) {
        breadcrumbs.push({
          name: pageName,
          url: `https://www.abbysegalmagic.com${currentPath}`
        })
      }
    }
    
    const breadcrumbStructure = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': crumb.name,
        'item': crumb.url
      }))
    }
    
    breadcrumbSchema.textContent = JSON.stringify(breadcrumbStructure)
    document.head.appendChild(breadcrumbSchema)
  }
  
  onMounted(() => {
    if (!settings.enableAutolinking) return
    
    nextTick(() => {
      const content = document.querySelector('main')
      if (!content) return
      
      // Apply strategic linking
      const opportunities = findLinkingOpportunities(content)
      applyStrategicLinks(opportunities)
      
      // Add contextual CTAs
      addContextualCTA()
      
      // Add structured breadcrumbs
      addStrategicBreadcrumbLinks()
    })
  })
  
  return {
    linkingRules: allRules,
    addContextualCTA,
    addStrategicBreadcrumbLinks
  }
}

// CSS for strategic links (add to global CSS)
export const strategicLinkStyles = `
.strategic-link {
  color: var(--gold);
  text-decoration: none;
  border-bottom: 1px solid rgba(170, 136, 51, 0.3);
  transition: all 0.3s ease;
  padding-bottom: 1px;
}

.strategic-link:hover {
  color: var(--gold-light);
  border-bottom-color: var(--gold);
  text-shadow: 0 0 8px rgba(170, 136, 51, 0.4);
}

.strategic-cta {
  background: linear-gradient(135deg, var(--plum-glow), var(--gold-glow));
  border-top: 1px solid var(--ember);
  padding: 3rem 0;
}

.strategic-cta__content {
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
}

.strategic-cta__text {
  font-size: var(--text-lg);
  color: var(--ivory-dim);
  margin-bottom: 1.5rem;
}

.strategic-cta__button {
  margin-top: 1rem;
}
`