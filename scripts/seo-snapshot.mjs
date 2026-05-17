#!/usr/bin/env node
/**
 * SEO <head> snapshot normalizer + differ. Zero dependencies (Node >=18, ESM).
 *
 * The browser capture is done out-of-band (MCP browser) and saved as raw
 * files; this script only normalizes + diffs, so it needs no browser lib.
 *
 *   node scripts/seo-snapshot.mjs --baseline   # raw/*.html -> <route>.txt
 *   node scripts/seo-snapshot.mjs --check      # raw/*.html vs <route>.txt
 *
 * Scratch layout (all under the gitignored docs/ tree):
 *   docs/_snapshots/raw/<route>.html          captured document.head.outerHTML
 *   docs/_snapshots/raw/<route>.console.txt   captured console errors (optional)
 *   docs/_snapshots/<route>.txt               normalized baseline
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const RAW_DIR = join(ROOT, 'docs', '_snapshots', 'raw')
const SNAP_DIR = join(ROOT, 'docs', '_snapshots')

function parseAttrs(tagSrc) {
  const attrs = {}
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*"([^"]*)"/g
  let m
  while ((m = re.exec(tagSrc)) !== null) attrs[m[1]] = m[2]
  return attrs
}

function attrString(attrs) {
  return Object.keys(attrs).sort().map(k => `${k}="${attrs[k]}"`).join(' ')
}

function sortKeys(value) {
  if (Array.isArray(value)) return value.map(sortKeys)
  if (value && typeof value === 'object') {
    const out = {}
    for (const k of Object.keys(value).sort()) out[k] = sortKeys(value[k])
    return out
  }
  return value
}

export function normalizeSnapshot(headHtml, consoleText = '') {
  const lines = []

  const titleMatch = headHtml.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  if (titleMatch) lines.push(`title> ${titleMatch[1].trim()}`)

  const tagRe = /<(meta|link)\b([^>]*?)\/?>/gi
  let t
  while ((t = tagRe.exec(headHtml)) !== null) {
    lines.push(`${t[1].toLowerCase()}> ${attrString(parseAttrs(t[2]))}`)
  }

  const ldRe = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi
  let l
  while ((l = ldRe.exec(headHtml)) !== null) {
    let pretty
    try {
      pretty = JSON.stringify(sortKeys(JSON.parse(l[1].trim())), null, 2)
    } catch {
      pretty = `UNPARSEABLE_JSON_LD:${l[1].trim()}`
    }
    lines.push(`ld+json> ${pretty}`)
  }

  const head = lines.sort().join('\n')
  return `${head}\n--- console ---\n${consoleText.trim()}\n`
}

function unifiedDiff(a, b) {
  const al = a.split('\n')
  const bl = b.split('\n')
  const out = []
  const max = Math.max(al.length, bl.length)
  for (let i = 0; i < max; i++) {
    if (al[i] !== bl[i]) {
      if (al[i] !== undefined) out.push(`- ${al[i]}`)
      if (bl[i] !== undefined) out.push(`+ ${bl[i]}`)
    }
  }
  return out.join('\n')
}

function main() {
  const mode = process.argv[2]
  if (mode !== '--baseline' && mode !== '--check') {
    console.error('Usage: node scripts/seo-snapshot.mjs --baseline|--check')
    process.exit(2)
  }
  if (!existsSync(RAW_DIR)) {
    console.error(`No raw captures at ${RAW_DIR}. Capture <head> first (see CLAUDE.md).`)
    process.exit(2)
  }
  mkdirSync(SNAP_DIR, { recursive: true })
  const rawFiles = readdirSync(RAW_DIR).filter(f => f.endsWith('.html')).sort()
  if (rawFiles.length === 0) {
    console.error(`No .html captures in ${RAW_DIR}.`)
    process.exit(2)
  }

  let failed = 0
  for (const file of rawFiles) {
    const route = file.replace(/\.html$/, '')
    const html = readFileSync(join(RAW_DIR, file), 'utf8')
    const consolePath = join(RAW_DIR, `${route}.console.txt`)
    const consoleText = existsSync(consolePath) ? readFileSync(consolePath, 'utf8') : ''
    const normalized = normalizeSnapshot(html, consoleText)
    const snapPath = join(SNAP_DIR, `${route}.txt`)

    if (mode === '--baseline') {
      writeFileSync(snapPath, normalized)
      console.log(`baseline written: ${route}`)
      continue
    }
    if (!existsSync(snapPath)) {
      console.error(`MISSING baseline for ${route} (run --baseline on clean master first)`)
      failed++
      continue
    }
    const baseline = readFileSync(snapPath, 'utf8')
    if (baseline === normalized) {
      console.log(`OK   ${route}`)
    } else {
      failed++
      console.error(`DIFF ${route}\n${unifiedDiff(baseline, normalized)}`)
    }
  }

  if (mode === '--check') {
    if (failed > 0) {
      console.error(`\n${failed} route(s) differ from baseline.`)
      process.exit(1)
    }
    console.log(`\nAll ${rawFiles.length} route(s) identical to baseline.`)
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main()
}
