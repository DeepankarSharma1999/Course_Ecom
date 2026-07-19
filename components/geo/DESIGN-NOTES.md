# Geo pages — design notes (GEO-0)

Built under the ponytail + ui-ux-pro-max skills. Rules of precedence:
honesty/SEO rules → ui-ux-pro-max standards → existing repo patterns.

The geo components use ONLY the site's existing design system — no new tokens:

- Layout: `.section`, `.container-tight` (max-w-7xl), 4/8pt spacing rhythm via `space-y-*`.
- Type: `.h1/.h2/.h3/.lead`, Inter, body ≥16px, `tabular-nums` for dates/times/prices.
- Surfaces: `.card` (rounded-2xl, soft shadow), `.badge` chips, `.section-eyebrow`.
- Hero: `bg-gradient-to-br from-brand-950 to-brand-800` — same as the legacy country/city heroes.
- Buttons: `.btn-primary/.btn-outline` (44px min height, focus-visible ring, active scale).
- Icons: lucide only, `aria-hidden`, no emoji.

ui-ux-pro-max compliance decisions:

- Tables wrap in `overflow-x-auto` so mobile never gets page-level horizontal scroll
  (verified at 375px: document width == viewport, table scrolls internally).
- All touch targets ≥44px (batch CTAs use `.btn` min-height; city chips `min-h-[44px]`).
- Breadcrumb is a `nav[aria-label=Breadcrumb]` with `aria-current="page"`; table
  headers use `scope="col"`; the icon-only column header gets `sr-only` text.
- Off-hours banner: amber-900 on amber-50 (≥4.5:1), `role="note"`, states the
  converted local time verbatim — color is not the only signal (icon + text).
- Heading hierarchy: one h1 (hero), h2 sections, h3 for link clusters — no skips.
- Section order on the city page is SEO-mandated and fixed; design must not reorder it.
