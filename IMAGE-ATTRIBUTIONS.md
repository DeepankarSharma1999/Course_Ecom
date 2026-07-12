# Image Attributions & Licence Audit

All external images currently used on the site, with source + licence. Audited 2026-06-24.

## Stock photography

| Source | Licence | Attribution required? | Where used |
|--------|---------|----------------------|------------|
| Unsplash (`images.unsplash.com`) | [Unsplash Licence](https://unsplash.com/license) | No (free commercial use) | Course hero fallbacks, section visuals, enrolled-learner avatar strip (`public/images/people/p1-12.jpg`, 96px face crops hosted locally) |
| Pexels (`images.pexels.com`) | [Pexels Licence](https://www.pexels.com/license/) | No (free commercial use) | Home hero collage, testimonials, pedagogy steps |
| Wikimedia Commons (`upload.wikimedia.org`) | Per-file (mostly CC-BY / trademark logos) | Logos used nominatively under fair use | Company / tech logos in hero + partner strips |

All three stock sources are free-licence and clear to use. **No licensing blocker.**

## Issues flagged (not licensing — quality/authenticity)

1. **Single hero image reused ~187×.** `lib/seed-data.ts` sets every course `heroImage` to
   `photo-1552664730-d307ca884978`. This is seed/fallback data; live courses should set distinct
   DB images. If seed data ships to prod, course pages all look identical. → curate per-category images.

2. **Synthetic faces (`i.pravatar.cc`) used for named people.** Trainer + testimonial avatars pull
   random AI/stock faces from pravatar. Presenting generated faces as real trainers/reviewers is a
   credibility risk. → replace with real trainer headshots (client to supply) or remove the face.

## next/image migration (perf)

Migrated to `next/image` (auto WebP/AVIF + responsive sizes) where the image host is controlled:
- `app/(public)/about/about-client.tsx` — team photo (hardcoded Unsplash)
- `components/course-page/articles-section.tsx` — article thumbnails (local `/images/`)

**Deliberately kept as raw `<img>`** (with `loading="lazy"` added where below-fold):
- `course.heroImage`, `trainer.photo` — admin free-text URLs; `next/image` throws on hosts not in
  `next.config.mjs` `remotePatterns`. Migrate only after constraining uploads to known hosts (or add a
  wildcard remote pattern).
- Wikimedia/inline **SVG** logos — `next/image` does not optimize SVG; no benefit.

## Broken asset fixed

`/frontend_assets/image/homban-dots.webp` was referenced as a hero background in **7 pages**
(about, free-course, info/[slug], practice-tests, resources, trainers, webinars) but the
`public/frontend_assets/` folder does not exist → 7 silent 404s, texture never rendered.
Replaced with a pure-CSS dot pattern utility `.hero-dots` (in `app/globals.css`) — no binary asset,
no 404, same visual intent. Uses `currentColor` so each hero sets the dot color (`text-white`).

## Replacements made

_(no stock-photo swaps — current external images are all free-licensed; swaps pending real-photo assets / brand sign-off)_
