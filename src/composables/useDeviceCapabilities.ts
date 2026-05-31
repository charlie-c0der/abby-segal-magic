/**
 * Device capability detection — one source for the touch / reduced-motion /
 * connection checks shared across the cursor, atmospheric layers, hero video,
 * and the animation orchestra. All helpers are client-only (call inside
 * onMounted or an event handler, never at module scope / SSR).
 */

interface ConnectionLike {
  effectiveType?: string
  saveData?: boolean
}

type NavigatorWithExtras = Navigator & {
  connection?: ConnectionLike
  mozConnection?: ConnectionLike
  webkitConnection?: ConnectionLike
  deviceMemory?: number
}

function getConnection(): ConnectionLike | undefined {
  const n = navigator as NavigatorWithExtras
  return n.connection || n.mozConnection || n.webkitConnection
}

/** Touch-first device (phones, tablets) — used to skip desktop-only effects. */
export function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/** User has asked the OS to minimise animation. */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Slow or metered connection — used to skip heavy video/animation. */
export function isSlowConnection(): boolean {
  const conn = getConnection()
  if (!conn) return false
  if (conn.saveData) return true
  const slow = ['slow-2g', '2g', '3g']
  return !!conn.effectiveType && slow.includes(conn.effectiveType)
}

/** Approx device RAM in GB (Chromium only); undefined when unknown. */
export function deviceMemory(): number | undefined {
  return (navigator as NavigatorWithExtras).deviceMemory
}
