# Abby Segal Magic

Marketing site for Chicago magician **Abby Segal** — close-up, parlour, and mingle magic for private and corporate events, plus a visual-art portfolio.

**Live:** https://www.abbysegalmagic.com

## Tech

Vue 3.5 (Composition API + `<script setup lang="ts">`), TypeScript (strict), Vite 7, vue-router 4, GSAP + ScrollTrigger, Lenis smooth scroll. Styling is **plain CSS with custom properties** (no preprocessor). Deployed on Vercel (auto-deploy on push to `master`). Contact form via Formspree (endpoint `xpznzkyj`).

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + lint (max 10 warnings) + production build
npm run preview  # serve the build
```

## Structure

```
src/
  main.ts            # router (7 lazy routes)
  App.vue            # shell: nav, transitions, Lenis↔GSAP, cursor, footer
  views/             # Home, About, Shows, Press, Art, Contact, NotFound
  components/         # NavBar, FooterSection, Preloader, LazyYouTube, …
  composables/        # SEO (useSeoCore + useSEO/useWorldClassSEO), animation, reveal, …
  constants/          # navigation, social links
  styles/global.css   # design system (color, type, spacing tokens)
public/assets/         # WebP images + mp4/webm video, by category
```

## Design tokens

Dark, warm, intimate. Core palette: void `#09090E`, gold `#AA8833`, plum `#8D3B78`, bronze `#C5822F`, ivory `#EDE6DA`. Type: Playfair Display (display), Montserrat (body), JetBrains Mono (mono). Full token set in `src/styles/global.css`.

## Contributing

`CLAUDE.md` is the engineering source of truth — architecture, conventions, asset workflow, gotchas, and the SEO regression-check procedure. Read it before making changes.

## License

Proprietary. All rights reserved by Abby Segal.
