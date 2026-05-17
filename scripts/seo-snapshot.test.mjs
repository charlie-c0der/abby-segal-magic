import { test } from 'node:test'
import assert from 'node:assert/strict'
import { normalizeSnapshot } from './seo-snapshot.mjs'

test('meta attribute order does not affect output', () => {
  const a = normalizeSnapshot('<head><meta name="description" content="x"><title>T</title></head>')
  const b = normalizeSnapshot('<head><title>T</title><meta content="x" name="description"></head>')
  assert.equal(a, b)
})

test('JSON-LD key order does not affect output', () => {
  const a = normalizeSnapshot('<head><script type="application/ld+json">{"b":1,"a":2}</script></head>')
  const b = normalizeSnapshot('<head><script type="application/ld+json">{"a":2,"b":1}</script></head>')
  assert.equal(a, b)
})

test('different content produces different output', () => {
  const a = normalizeSnapshot('<head><meta name="robots" content="index"></head>')
  const b = normalizeSnapshot('<head><meta name="robots" content="noindex"></head>')
  assert.notEqual(a, b)
})

test('console section is included and diff-able', () => {
  const a = normalizeSnapshot('<head><title>T</title></head>', '')
  const b = normalizeSnapshot('<head><title>T</title></head>', 'TypeError: boom')
  assert.notEqual(a, b)
  assert.match(b, /TypeError: boom/)
})

test('link tags are captured', () => {
  const out = normalizeSnapshot('<head><link rel="canonical" href="https://x/"></head>')
  assert.match(out, /link> href="https:\/\/x\/" rel="canonical"/)
})
