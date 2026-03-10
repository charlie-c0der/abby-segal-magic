/**
 * Color utilities for canvas-based effects
 * Canvas cannot read CSS variables directly, so we provide helpers
 */

export function getCSSColor(varName: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
}

export function getThemeColors() {
  return {
    plum: getCSSColor('--plum'),
    gold: getCSSColor('--gold'),
    plumDim: getCSSColor('--plum-dim'),
    goldDim: getCSSColor('--gold-dim'),
  }
}