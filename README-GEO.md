# Geo landing pages — how to operate

Programmatic, gated city/country landing pages for the geo courses
(`GEO_COURSES` in [lib/geo-pages/data.ts](lib/geo-pages/data.ts) — currently
`pmp-certification-training` and `csm-certification-training`).

Routes (distinct from the legacy noindex `/{country}/{course}` DB variants):

```
/{course}                    course page (+ "Available in" hub links once hubs are indexable)
/{course}/{country}          country hub      e.g. /pmp-certification-training/in
/{course}/{country}/{city}   city page        e.g. /pmp-certification-training/in/bangalore
```

Every page renders with full content, but ships `noindex` and stays out of the
sitemap until it passes the publishing gate AND its releaseWeek is reached —
set `RELEASE_WEEK` in Vercel to start releasing pages.

## Commands

| Command | What it does |
|---|---|
| `npm run validate:geo` | Full report: which pages are indexable, and every reason a page is still a draft. |
| `npm run test:geo` | Timezone-engine self-check (Singapore fit, Dallas off-hours). |
| `npm run build` | Runs the validator in `--ci` mode first — malformed files or duplicate intros **fail the build**. Drafts don't. |

## The publishing gate (per city page)

A city page becomes indexable (robots noindex removed + added to sitemap) only when ALL hold:

1. **No `TODO` remains** anywhere in its city file, or in its country file's `pricing`/`examCost` (both keyed per course slug).
2. **Fit check passes** — some batch track's full session lands within 07:00–22:00 city-local time.
3. Every **salary entry** has an `http(s)` `sourceUrl` and a `sourceDate` within the last 12 months.
4. **Intro is 120–180 words** and <60% trigram-similar to every other city intro (>60% fails the build once both intros are real).
5. **≥4 FAQs**.
6. `releaseWeek` ≤ the `RELEASE_WEEK` env var (see pacing below).

Country hubs: same rules minus the city-only checks (no fit check / meta / employers).
Logic lives in [lib/geo-pages/gate.ts](lib/geo-pages/gate.ts).

## Data status (July 2026)

All 94 files are **fully filled** — no TODOs remain. Sources used:

- **Prices/days**: the 18-Jul-2026 course sheet (ROW USD: PMP $1,295, CSM $695, 2 days each); India uses the site's DB price (₹24,999).
- **Exam fees**: PMI 2026 fees (US$425 member / US$675 non-member, pmi.org); CSM exam is included in the course fee (Scrum Alliance).
- **Salaries**: July 2026 figures from Glassdoor/SalaryExpert/PayScale/Indeed with the source URL and as-of date stored per entry. Cities without a city-specific figure reuse the country entry labeled "(national average)".
- **Intros/FAQs/employers**: editorially written; FAQs embed exact per-city time conversions computed from the batch track.

To update any fact later, edit the JSON field and rebuild — the validator re-checks everything. Salary entries older than 12 months automatically demote a page to draft, so refresh `sourceDate` (with a re-checked figure) at least yearly.

## How to edit a city file

`data/geo/cities/{country}/{city}.json` — the shape:

```jsonc
{
  "salary": [{ "role": "Project Manager", "amount": "S$122,554/yr",
               "source": "ERI SalaryExpert", "sourceUrl": "https://…", "sourceDate": "2026-07-01" }],
  "employers": ["…"],
  "industries": "one sentence",
  "intro": "unique, 120–180 words",
  "faq": [ { "q": "…", "a": "…" }, … ],   // >=4
  "meta": { "title": "{course} Training in …", "description": "…" },  // {course} is replaced per course page
  "releaseWeek": 3
}
```

Country files hold `pricing` and `examCost` keyed by course slug — each entry gates every city in that country.

## How to add a batch track

Edit [data/geo/batch-tracks.json](data/geo/batch-tracks.json) — nothing else:

```jsonc
{ "id": "americas", "tz": "America/Chicago", "label": "CT",
  "start": "09:00", "end": "18:00",
  "batches": [{ "startDate": "2026-10-03", "endDate": "2026-10-04", "days": "Sat–Sun" }] }
```

On the next build every US/LatAm city's fit check re-evaluates against the new
track and flips from `off-hours` to `fit` automatically — the off-hours banner
disappears and (if the content gate passes) the pages become indexable.
Keep `batches[0]` an upcoming date; the fit check evaluates the first batch.

## Release pacing (RELEASE_WEEK)

Every data file has `releaseWeek: N`. The sitemap and robots meta only free a
*complete* page when `releaseWeek <= RELEASE_WEEK` (env var, default `0` = nothing
released). Increment it weekly in Vercel (Project → Settings → Environment
Variables → `RELEASE_WEEK`) and redeploy. Seeded values stagger countries in
tiers (India wk 1 → AE/SG wk 2 → … → NZ/MX/BR wk 11), so even fully-filled pages
enter the index at a controlled pace. Re-tier by editing `releaseWeek` per file.

## Coverage

31 countries / 63 cities, all filled. Cities per country: **in** bangalore, mumbai, delhi-ncr, hyderabad, pune, chennai,
kolkata, ahmedabad · **ae** dubai, abu-dhabi, sharjah · **sa** riyadh, jeddah,
dammam · **qa** doha · **kw** kuwait-city · **om** muscat · **sg** singapore ·
**my** kuala-lumpur · **id** jakarta · **ph** manila · **th** bangkok ·
**hk** hong-kong · **gb** london, manchester, birmingham, edinburgh · **ie** dublin ·
**de** berlin, munich, frankfurt · **nl** amsterdam · **fr** paris · **ch** zurich ·
**za** johannesburg, cape-town · **ng** lagos · **ke** nairobi · **eg** cairo ·
**us** new-york, dallas, austin, houston, chicago, atlanta, boston, washington-dc,
seattle, san-francisco, los-angeles, denver, phoenix · **ca** toronto, vancouver,
calgary, montreal · **au** sydney, melbourne, brisbane, perth · **nz** auckland ·
**mx** mexico-city · **br** sao-paulo.
(bh, bd, lk have hubs only — no seeded cities.)

## Honesty rules (non-negotiable)

- Never invent a salary, price, employer or source. Omit the section instead
  (the templates auto-hide any section whose data is still `TODO`).
- Every displayed time carries a timezone label — enforced by the engine in
  [lib/geo-pages/timezone.ts](lib/geo-pages/timezone.ts).
- JSON-LD never emits `AggregateRating`/`Review`; `offers` uses the per-course
  price and currency; `CourseInstance` dates come from the actual track.
