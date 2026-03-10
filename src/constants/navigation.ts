export const NAV_LINKS = [
  { path: '/about', label: 'About' },
  { path: '/shows', label: 'Shows' },
  { path: '/press', label: 'Press' },
  { path: '/art', label: 'Art' },
  { path: '/contact', label: 'Contact' },
] as const

export const PATH_LABELS: Record<string, string> = Object.fromEntries(
  NAV_LINKS.map(link => [link.path.replace('/', ''), link.label])
)