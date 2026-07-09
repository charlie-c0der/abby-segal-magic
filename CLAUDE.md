# CLAUDE.md

Marketing/portfolio site for Chicago magician **Abby Segal** (close-up, parlour, mingle magic + visual art). Single-page Vue app, statically built, deployed on Vercel.

- **Canonical/SEO base URL:** `https://www.abbysegalmagic.com` — single source: `SEO_BASE_URL` in `src/composables/useSeoCore.ts`.
- **Also deployed at:** `https://abby-segal-magic.vercel.app` (Vercel project URL).
- **Deploy:** automatic on push to `master` (Vercel). `vercel.json` adds the SPA rewrite + security/cache headers.

## Stack

Vue 3.5 (Composition API, `<script setup lang="ts">`) · TypeScript (strict, `noUnusedLocals`) · Vite 7 · vue-router 4 (history mode, lazy routes) · **plain CSS with custom properties** (no Sass/SCSS) · GSAP + ScrollTrigger · Lenis (smooth scroll) · `@vueuse/core`, `@vueuse/motion`. No test framework.

## Commands

| Command | What |
|---|---|
| `npm run dev` | Vite dev server (`http://localhost:5173/`, SPA history fallback on) |
| `npm run build` | `vue-tsc -b && eslint src/ --max-warnings 10 && vite build` — **fails if >10 eslint warnings** |
| `npm run preview` | Serve the production build |
| `npm run lint` / `npm run lint:fix` | ESLint over `src/` |
| `node scripts/optimize-images.js --all` | JPG/PNG → WebP + `-thumb` (sharp) |
| `node scripts/seo-snapshot.mjs --baseline` / `--check` | SEO `<head>` regression check (see "Verification") |
| `node --test scripts/seo-snapshot.test.mjs` | Unit test for the snapshot normalizer |

ESLint only covers `src/`; `scripts/` is not linted or type-checked by the build.

## Architecture

- `src/main.ts` — creates the router. **7 routes**, all lazy: `/` Home, `/about` About, `/shows` Shows, `/press` Press, `/art` Art, `/contact` Contact, `*` NotFound. Custom `scrollBehavior` (hash → smooth w/ 80px offset; else top).
- `src/App.vue` — app shell: Preloader, FloatingCards, MobileAtmosphere, custom cursor, NavBar, `<router-view>` with page transitions (`magic` for new visitors, `fade` for returning — `localStorage` flag), FooterSection, BackToTop, Konami-code easter egg. **Initializes Lenis and drives it from the GSAP ticker**, forwarding scroll to `ScrollTrigger`.
- `src/views/` — one component per route. Largest: `Art.vue` (~970 lines, lightbox gallery), `Home.vue` (~780).
- `src/components/` — `NavBar`, `FooterSection`, `Preloader`, `BackToTop`, `LazyYouTube`, `HeroVideo`, `BrandWall`, `FloatingCards`, `MobileAtmosphere`.
- `src/composables/`:
  - **SEO is two-tier over one core.** `useSeoCore.ts` = DOM `<head>` primitives (`setMeta`/`setProperty`/`setCanonical`/`injectJsonLd`/`track`/`cleanup`) + `SEO_BASE_URL` + the teardown registry. `useSEO` = minimal, for utility/`noindex` pages (currently only `NotFound.vue`). `useWorldClassSEO` = rich, for every indexable view — auto-injects a WebSite+Person JSON-LD `@graph`, social/Twitter meta, DNS-prefetch, apple-mobile meta. Don't hand-add those on indexable pages; they come for free. Tag *policy* lives in each composable; only the DOM plumbing is shared.
  - Animation system: `useAnimationOrchestra` (initialized once in `App.vue`) coordinates `usePageTransitions`, `useScrollMagic`, `useMicroInteractions`, `useLoadingExperience` (the last is config-gated off). Per-view animation helpers: `useReveal`, `useParticles`, `useSplitText`, `useTilt`. Cursor: `useMagicCursor`.
- `src/constants/` — `navigation.ts`, `social.ts`. `src/utils/colors.ts` — reads CSS custom properties for canvas effects.
- `src/styles/global.css` — the design system (all custom properties live here).

## Conventions

- `<script setup lang="ts">` + Composition API. Cross-cutting concerns go in a composable.
- **Styling is plain CSS** using global custom properties from `global.css`. Core palette: `--void #160B22` (deep aubergine bg), `--gold #AA8833` (prestige), `--plum #8D3B78` (magic), `--bronze #C5822F` (warmth), `--ivory #EDE6DA` (text); each has `-light/-dim/-glow` variants plus `--obsidian/--smoke/--ash/--ember` backgrounds. Fonts: exactly two — `--font-display` Playfair Display, `--font-body` **Montserrat**. (`--font-mono`/JetBrains Mono was removed 2026-07 to consolidate typography; letterspaced-uppercase "UI text" styles now use `--font-body`.) Clamp-based type scale (`--text-*`), spacing, easings, radii are all tokenized — use the tokens, don't hardcode.
- Routes are lazy (`() => import(...)`). Keep new routes lazy.
- Every image needs descriptive, keyword-aware `alt`; gallery images use a `<name>.webp` + `<name>-thumb.webp` pair.

## Assets

`public/assets/` is category-based: `art/images/`, `press/images/`, `portraits/images/`, `general/images/`, `hero/` (hero-loop.mp4/.webm/.webp), `shows/` (close-up/parlour/mingle 30s mp4), `brands/` (client/venue logos, webp). **Images are WebP only** — original JPGs were removed; there is no JPG fallback. Naming: `category-description.webp`; thumbnails add `-thumb`; videos `category-context.mp4`.

Add an image: drop the source JPG/PNG anywhere, run `node scripts/optimize-images.js <file>` (or `--all` for `public/assets/art/images/`) to emit `.webp` + `-thumb.webp`, move them into the right category folder, then reference `/assets/<cat>/images/<name>.webp` with `alt` + `loading="lazy"`. See `scripts/README.md` for flags.

## Gotchas

- **Lenis is driven solely by the GSAP ticker** in `App.vue` (`gsap.ticker.add(...lenis.raf...)`, `lagSmoothing(0)`, `lenis.on('scroll', ScrollTrigger.update)`). Never add a separate `lenis.raf` loop or a second RAF — it desyncs scroll vs pinned/scrubbed animations.
- After layout-affecting changes call `ScrollTrigger.refresh()` post-paint (App.vue already does one `requestAnimationFrame` refresh on mount).
- Custom cursor is `cursor: none`; disabled ≤768px (`body { cursor: auto }`).
- `useWorldClassSEO` auto-injects the WebSite+Person `@graph` + DNS-prefetch + apple-mobile meta on every page that calls it — don't duplicate them per-view.
- **Known issues, intentionally not fixed:** `enhanceInternalLinking()` is a no-op. `monitorPerformance()` references `window.gtag` though no analytics is installed.
- `npm run build` fails if eslint emits >10 warnings (mostly `no-console`; `warn`/`error` are allowed).
- No unit test suite for the app. SEO is the only thing with a regression guard (below).

## Verification (no test framework)

`scripts/seo-snapshot.mjs` is a zero-dep normalizer/differ; the browser capture is done manually via the MCP browser. Procedure:

1. `npm run dev` (background); note the port (5173, or next free).
2. For each route `(/ root) (/about about) (/shows shows) (/press press) (/art art) (/contact contact) (/__nope__ notfound)`: open it in the MCP browser, wait until `document.title` is set **and** a `script[type="application/ld+json"]` or `meta[name=robots]` exists (SEO `onMounted` ran), then capture **only the SEO tags** — `Array.from(document.querySelectorAll('head > title, head > meta, head > link, head > script[type="application/ld+json"]')).map(e=>e.outerHTML).join('\n')` — to `docs/_snapshots/raw/<slug>.html`, plus console `error`s to `docs/_snapshots/raw/<slug>.console.txt`. Capture SEO tags only, **not** `head.outerHTML` (dev `<head>` is ~66 KB of Vite HMR noise and nondeterministic). For large routes (e.g. `shows`, ~13 KB with two ld+json blocks) transfer the string truncation-proof (base64 or compare a SHA-256) and assert each ld+json `JSON.parse`s before trusting the capture — a truncated capture normalizes to `UNPARSEABLE_JSON_LD`.
3. `node scripts/seo-snapshot.mjs --baseline` on known-good `master` → records `docs/_snapshots/<slug>.txt`.
4. After SEO/markup changes: re-capture, then `node scripts/seo-snapshot.mjs --check` — must report all routes identical, no new console errors.

`docs/` is gitignored scratch; baselines, captures, and planning docs are intentionally **not committed**.
