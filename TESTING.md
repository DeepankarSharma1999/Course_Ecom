# Course_Ecom — Test Plan & Tester Guide

This document walks a tester through setting up the project from a fresh clone
and verifying every public-site and admin-panel feature. Each test case has a
preconditions block, numbered steps and an explicit pass criterion.

- **Repo**: https://github.com/DeepankarSharma1999/Course_Ecom
- **Stack**: Next.js 15 (App Router) + TypeScript + Tailwind + Prisma + PostgreSQL
- **Default URLs**: Public site `http://localhost:3000` · Admin `http://localhost:3000/admin`

---

## 0. Prerequisites

| Tool | Minimum | Notes |
|---|---|---|
| Node.js | 18.18 or 20+ | `node -v` |
| npm | 9+ | bundled with Node |
| Docker Desktop | latest | for Postgres in a container |
| Git | any recent | for `git clone` |
| Modern browser | Chrome 120+ / Edge / Firefox / Safari | for UI testing |

> If you can't or don't want to install Docker, you can substitute any Postgres
> instance you already have (local install, Neon, Supabase, etc.). Just update
> `DATABASE_URL` in `.env` accordingly.

---

## 1. First-time setup

### 1.1 Clone the repository

```bash
git clone https://github.com/DeepankarSharma1999/Course_Ecom.git
cd Course_Ecom
```

### 1.2 Install dependencies

```bash
npm install
```
**Pass criterion:** completes without errors. Warnings about peer deps are fine.

### 1.3 Start a Postgres container

```bash
docker run -d \
  --name course-ecom-postgres \
  -e POSTGRES_USER=courseecom \
  -e POSTGRES_PASSWORD=courseecom \
  -e POSTGRES_DB=courseecom \
  -p 5433:5432 \
  postgres:16-alpine
```
**Pass criterion:** `docker ps` shows the container in `healthy` / `Up` state.

> **Already running another Postgres on `:5432`?** That's why we map to `5433`.
> If `5433` is also taken, pick any free port and update `DATABASE_URL` below.

### 1.4 Create `.env`

Copy the template and edit the values that matter:

```bash
cp .env.example .env
```

Minimum content for local testing:

```ini
DATABASE_URL="postgresql://courseecom:courseecom@localhost:5433/courseecom?schema=public"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

AUTH_SECRET="<paste any 32+ character random string>"

ADMIN_EMAIL="admin@course-ecom.com"
ADMIN_PASSWORD="admin123"

# Optional — pick ONE email channel. Leave both blank to log emails to console.
RESEND_API_KEY=""
FORMSUBMIT_ENABLED="false"
```

Generate a random `AUTH_SECRET` with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 1.5 Push schema and seed data

```bash
npx prisma db push
npm run db:seed
```

**Pass criterion:** seed output ends with `Done.` and creates:
- 1 admin user
- 8 categories, 3 courses, 3 trainers, 5 testimonials
- 18 schedules, 18 course FAQs, 5 global FAQs
- 3 city variants (Delhi)
- SiteSettings + HomePageContent + 3 SimplePages (corporate, enquire, about)

### 1.6 Run the dev server

```bash
npm run dev
```
Open http://localhost:3000.
**Pass criterion:** home page renders with hero, category grid, course cards and footer.

---

## 2. Test accounts and seeded URLs

| Role | Email | Password |
|---|---|---|
| Admin | `admin@course-ecom.com` | `admin123` |

| Seeded public URLs |
|---|
| `/` |
| `/courses` |
| `/category/safe`, `/category/agile-scrum`, etc. (8 total) |
| `/safe-scrum-master-certification` |
| `/safe-product-owner-product-manager-certification` |
| `/safe-devops-certification` |
| `/in/safe-scrum-master-certification` |
| `/in/safe-scrum-master-certification/delhi` |
| `/uk/safe-scrum-master-certification` (rendered on demand) |
| `/trainers`, `/trainers/ravi-kumar`, etc. |
| `/compare`, `/compare/safe-scrum-master-certification-vs-safe-devops-certification` |
| `/corporate`, `/enquire`, `/about` |
| `/sitemap.xml`, `/robots.txt` |

---

# Section A — Public Site Test Cases

## A1. Home page

### A1.1 Renders all sections
**Steps:** Open `/`.
**Expected:** In order, you should see — announcement bar (if enabled), top
bar, header, hero with lead form, accreditation strip, categories grid (8
tiles), bestselling courses (3 cards), stats bar, "Why us" section with image
and 4 items, testimonials grid, FAQ accordion, bottom CTA band, footer.

### A1.2 Hero CTA links
**Steps:** Click "Explore All Courses" → should go to `/courses`. Click
"Corporate Training" → should go to `/corporate`.

### A1.3 Hero lead form (admin notification path)
**Preconditions:** any email channel configured OR console fallback.
**Steps:** Fill name, work email, phone, optional message → Request a Callback.
**Expected:** Success card appears: *"Thank you! A training advisor will reach
out shortly."* Lead appears at `/admin/leads` within 5 seconds.

### A1.4 Honeypot rejection
**Steps:** Open browser devtools → find the hidden `company_website` input →
type any value → submit form.
**Expected:** UI shows success but **no lead is saved** in `/admin/leads`.

### A1.5 Rate limit
**Steps:** Submit the hero form 6 times within 60 seconds from the same IP.
**Expected:** 6th attempt returns an error message; HTTP 429 in Network tab.

---

## A2. Course listing & search (`/courses`)

### A2.1 Default state
**Steps:** Open `/courses`.
**Expected:** Hero band, filter sidebar (Search, Category, Max Price, Exam
checkbox), course grid, sort dropdown ("Recommended").

### A2.2 Text search
**Steps:** Type `scrum` in the search filter.
**Expected:** Only the SAFe Scrum Master card remains; counter updates.

### A2.3 Category filter
**Steps:** Click "Scaled Agile (SAFe)" in the sidebar.
**Expected:** Only SAFe courses shown.

### A2.4 Sort
**Steps:** Pick "Price: Low → High" / "Highest Rated" / "Most Reviewed".
**Expected:** Order changes correctly.

### A2.5 Exam-only checkbox
**Steps:** Tick "Exam fee included".
**Expected:** All seeded courses have exam included, so all 3 remain. Untick to restore.

### A2.6 Mobile filter drawer
**Steps:** Shrink browser below `lg` (~1024px) → click "Filters" button.
**Expected:** Full-screen filter drawer opens; close button works.

### A2.7 Header search box
**Steps:** Click 🔍 in the header → type `safe` → submit.
**Expected:** Lands on `/courses?q=safe` with the search applied.

---

## A3. Course detail pages

### A3.1 Global course page
**Steps:** Open `/safe-scrum-master-certification`.
**Expected:** Hero shows title "SAFe Scrum Master Certification Training"
(no duplicates), lead form on the right, quick facts row, key features,
overview, what-you-learn, schedules, curriculum, FAQs, trainer section, CTA.

### A3.2 City page hero title
**Steps:** Open `/in/safe-scrum-master-certification/delhi`,
then `/in/safe-product-owner-product-manager-certification/kolkata`.
**Expected:** Titles read **"SAFe Scrum Master Certification Training in Delhi"**
and **"SAFe POPM Certification Training in Kolkata"** — no doubled "Certification"
or "Training", correct city name in subtitle (no hardcoded "Delhi-NCR").

### A3.3 Browser tab title de-duplication
**Steps:** Inspect the `<title>` tag in devtools on any course page.
**Expected:** Single ` | Course_Ecom` at the end, never two.

### A3.4 Breadcrumbs
**Expected:** Format `Home / <Category> / <Country if any> / <Course (in City)>`,
all links clickable except the last.

### A3.5 View Schedules CTA
**Steps:** Click "View Schedules" in the hero.
**Expected:** Scrolls to the in-page Schedules section listing 6 upcoming
batches with mode badge, date, time, price, seats-left, and "Enroll" button.

### A3.6 Download Brochure flow
**Preconditions:** Set a brochure URL via admin first (see B5.7) or expect
the success state without a download link.
**Steps:** Click "Download Brochure" → fill the modal form → submit.
**Expected:** Success card shows; if brochure URL exists, a download link is
rendered. Lead is saved with `source = brochure-<slug>` and `brochureCourseSlug`
populated (verify in `/admin/leads`).

### A3.7 Sticky CTA on mobile
**Steps:** Resize to mobile width → scroll the course page past ~700px.
**Expected:** Sticky bar appears at the bottom with title, price, Phone, Dates,
Enquire. Hidden on desktop (`≥ lg`).

### A3.8 Trainer cards
**Expected:** "Meet Your Trainers" section shows trainers assigned to this
course. Clicking a trainer card opens their profile (`/trainers/<slug>`).

---

## A4. Country switcher (footer, course pages only)

### A4.1 Visibility scope
**Steps:** Open `/`, `/courses`, `/category/safe`, `/trainers`.
**Expected:** No country switcher pill in footer.
**Steps:** Open `/safe-scrum-master-certification`.
**Expected:** A pill labelled "Global" sits to the right of the copyright in the
footer.

### A4.2 Switch country from "Global"
**Steps:** Click the pill → search "India" → select.
**Expected:** URL changes to `/in/safe-scrum-master-certification`; pill now
reads "India".

### A4.3 Switch country from a country page (drops city)
**Steps:** On `/in/safe-scrum-master-certification/delhi`, click the pill →
select "United Kingdom".
**Expected:** URL changes to `/uk/safe-scrum-master-certification`
(city segment dropped); page renders.

### A4.4 Reset to Global
**Steps:** Click the pill → select "🌍 Global (no region)".
**Expected:** URL changes to `/safe-scrum-master-certification`.

### A4.5 Country search
**Steps:** Open the pill → type `germ` in the filter.
**Expected:** Only "Germany" appears in the list. `Esc` closes the popover.

---

## A5. Currency switcher (top bar)

### A5.1 Default
**Expected:** Default currency depends on browser locale / Vercel IP headers;
INR if undetermined.

### A5.2 Manual override
**Steps:** Click the currency in the top bar → pick "USD".
**Expected:** Page reloads. All course-card prices recomputed and shown in `$`
on `/courses`. Cookie `mc_currency=USD` is set.

### A5.3 Persistence
**Steps:** Refresh page or visit a different route.
**Expected:** USD persists. Switch back to INR to reset.

---

## A6. Trainer pages

### A6.1 Trainer index
**Steps:** Open `/trainers`.
**Expected:** 3 trainer cards (Ravi, Anitha, Deepak), each with photo, title,
star rating, expertise chips.

### A6.2 Trainer detail
**Steps:** Click any trainer.
**Expected:** Hero with photo, bio, expertise, certifications, courses
delivered (linked to the corresponding course pages), right-rail lead form.

---

## A7. Comparison pages

### A7.1 Picker
**Steps:** Open `/compare` → pick two different courses → click "Compare".
**Expected:** Navigates to `/compare/<a>-vs-<b>`.

### A7.2 Side-by-side table
**Expected:** Rows for category, duration, level, accreditation, exam, price,
rating, key features, audience, outcomes, prerequisites. Two enroll CTAs at the
bottom; advisor lead form below.

### A7.3 Same-course rejection
**Steps:** Pick the same course in both selects.
**Expected:** "Compare" button is disabled.

---

## A8. Category pages
**Steps:** Open `/category/safe`, `/category/agile-scrum`, etc.
**Expected:** Hero with category name + tagline; grid of courses in that
category (or "More courses launching soon" if empty).

---

## A9. Simple pages (driven by SimplePage model)

### A9.1 `/corporate`
**Expected:** Hero from DB SimplePage, body content rendered with markdown
(bold, bullets), lead form on the right.

### A9.2 `/enquire` and `/about`
**Expected:** Same structure. `/about` may not show a lead form depending on
`showLeadForm` flag.

### A9.3 Edit reflects publicly
**Steps:** Open `/admin/pages/corporate/edit` → change the headline → Save →
reload `/corporate`.
**Expected:** New headline visible after the route revalidates (≤ 60s, or
immediately after `revalidatePath`).

---

## A10. Navbar mega-menu and dropdowns

### A10.1 All Courses mega-menu
**Steps:** Hover "All Courses".
**Expected:** 3-column popover — categories left (hoverable), courses for the
hovered category in the middle, popular courses on the right, "Browse all"
CTA.

### A10.2 Active state highlight
**Steps:** Navigate to `/trainers`.
**Expected:** "Trainers" nav item has the brand-color underline.

### A10.3 Resources dropdown
**Steps:** Hover "Resources" → click any item.
**Expected:** 4 items (Compare, Trainers, About, Contact Sales) navigate
correctly; menu closes on click and on `Esc`.

### A10.4 Mobile drawer
**Steps:** Shrink to mobile → tap ☰.
**Expected:** Full-screen drawer; each category is a collapsible `<details>`;
phone + WhatsApp shortcuts at the bottom; closes on link click.

---

## A11. Footer

### A11.1 DB-driven content
**Expected:** Brand name, about text, address (if set), phone, email, social
icons (only the ones with URLs in Site Settings), 3 link columns
(Top Categories / Company / Support).

### A11.2 Year auto-updates
**Expected:** Copyright shows the current year.

---

## A12. Exit-intent popup

### A12.1 Desktop trigger
**Steps:** Wait ≥ 8 seconds on any public page → move cursor up out of the
viewport.
**Expected:** Modal appears with "Save 15%" promo and an inline lead form.

### A12.2 Mobile trigger
**Steps:** On mobile width, scroll past 60% of the page (after the 8-second
arm).
**Expected:** Modal appears.

### A12.3 Suppression
**Steps:** Close the modal (X or outside click).
**Expected:** Modal does not reappear for 7 days (localStorage key
`mc_exit_popup_dismissed_until`).

---

## A13. WhatsApp floating button
**Steps:** Inspect bottom-left of any public page.
**Expected:** Green WhatsApp pill button. Click → opens `https://wa.me/...`
in a new tab with a brand-aware pre-filled message. Hidden if
`SiteSettings.whatsappNumber` is empty.

---

## A14. SEO surfaces

### A14.1 sitemap.xml
**Steps:** Open `/sitemap.xml`.
**Expected:** Valid XML with URLs for home, courses, categories, courses,
country-course, country-course-city, trainers, compare, simple pages.

### A14.2 robots.txt
**Steps:** Open `/robots.txt`.
**Expected:** Allows public routes, disallows `/admin/*` and `/api/*`. Includes
sitemap URL.

### A14.3 JSON-LD on course page
**Steps:** View source of any course page → search for
`application/ld+json`.
**Expected:** Three blocks — Course, FAQPage, BreadcrumbList — with valid JSON.

### A14.4 Canonical
**Steps:** On any course route, check `<link rel="canonical">`.
**Expected:** Points to the canonical URL for that specific country/city.

---

# Section B — Admin Panel Test Cases

## B1. Authentication

### B1.1 Login redirect
**Steps:** Open `/admin` without a session.
**Expected:** Redirected to `/admin/login?from=/admin` (307).

### B1.2 Wrong credentials
**Steps:** Submit bad email or password.
**Expected:** Error banner: *"Invalid email or password."*

### B1.3 Successful login
**Steps:** Email `admin@course-ecom.com`, password `admin123`.
**Expected:** Redirected to `/admin`. Dashboard renders.

### B1.4 Session persistence
**Steps:** Close tab → reopen `/admin`.
**Expected:** Still logged in (7-day cookie).

### B1.5 Logout
**Steps:** Top right → "Logout".
**Expected:** Redirected to `/admin/login`. `/admin` now redirects again.

### B1.6 Middleware protection
**Steps:** While logged out, try `/admin/courses`, `/admin/leads`, etc.
**Expected:** All redirect to login with `from=` set.

---

## B2. Dashboard

### B2.1 Counts
**Expected:** 6 stat cards reflecting current DB rows (courses, schedules,
total leads, new leads, testimonials, categories).

### B2.2 Recent leads list
**Expected:** Up to 6 most recent leads with name, email, course, date.

### B2.3 Quick actions
**Expected:** Buttons for +Add Course, +Add Batch, +Testimonial, Export Leads
all navigate correctly.

---

## B3. Site Settings (`/admin/site-settings`)

### B3.1 Edit brand name
**Steps:** Change "Brand Name" to "Acme Training" → Save.
**Expected:** Confirmation banner appears. Reload `/` → header, footer,
metadata all show "Acme Training". (Restore to `Course_Ecom` for further tests.)

### B3.2 Top bar messages
**Steps:** Edit "Messages (JSON array)" to e.g. `["Limited summer offer"]` → Save.
**Expected:** Top bar updates on next load.

### B3.3 Announcement bar
**Steps:** Tick "Show announcement bar", set text "Demo announcement", save.
**Expected:** Orange announcement strip appears at top of every public page.

### B3.4 Social links
**Steps:** Add a valid LinkedIn URL → Save.
**Expected:** LinkedIn icon appears in footer.

### B3.5 Footer columns
**Steps:** Edit one link in the JSON → Save → check footer.
**Expected:** Updated link rendered.

---

## B4. Home Page Content (`/admin/home-content`)

### B4.1 Hero copy
**Steps:** Change "Headline highlight" to `Premier`, save.
**Expected:** Home hero now reads "Globally Accredited **Premier** Training".

### B4.2 Stats array
**Steps:** Edit the heroStats JSON to 4 items.
**Expected:** Stats row on home shows 4 items.

### B4.3 Why Us cards
**Steps:** Add an item with `icon: "Award"`.
**Expected:** New card rendered on home with the Award icon.

### B4.4 CTA band
**Steps:** Update title and link → Save → reload `/`.
**Expected:** Bottom CTA reflects changes.

---

## B5. Courses CRUD (`/admin/courses`)

### B5.1 List view
**Expected:** Table with all 3 seeded courses, each row showing title, slug,
category, price, status badges, relation counts (schedules / FAQs / variants),
and an Edit link.

### B5.2 Create
**Steps:** "New Course" → fill required fields (slug `csm-test`, title, summary,
description, category) → Save.
**Expected:** Redirected to edit page; visible at `/courses` and at `/csm-test`.

### B5.3 Edit and publish toggle
**Steps:** Open edit page → flip "Published" off → Save.
**Expected:** Public page `/csm-test` now 404s; admin still shows it as Draft.

### B5.4 JSON arrays
**Steps:** Paste a JSON array into "Key Features" with a malformed bracket →
Save.
**Expected:** Form preserves the previous value if invalid (saved as `null`),
no crash.

### B5.5 Delete
**Steps:** Open edit → "Delete this course" in the Danger Zone.
**Expected:** Course removed; cascade-deletes its schedules/FAQs/variants.

### B5.6 SEO fields
**Steps:** Set custom SEO Title → Save → inspect public `<title>` tag.
**Expected:** Custom title used (without double brand suffix).

### B5.7 Brochure URL
**Steps:** Set Brochure URL on any course → Save → on the public course page,
click "Download Brochure" → submit lead.
**Expected:** Success card shows a download link to your URL.

---

## B6. Schedules (`/admin/courses/[id]/schedules`)

### B6.1 Add
**Steps:** Pick a course → fill start, end, mode, price, seats → Add Schedule.
**Expected:** Row appears in table and on the public course Schedules section.

### B6.2 Filling Fast badge
**Steps:** Tick "Mark as Filling Fast".
**Expected:** Red "Filling" pill on the public page.

### B6.3 Delete
**Steps:** Delete a schedule → it vanishes from table and public list.

### B6.4 Global schedule view
**Steps:** Open `/admin/schedules`.
**Expected:** All schedules across courses, sorted by date.

---

## B7. Course FAQs (`/admin/courses/[id]/faqs`)
### B7.1 Add → appears at bottom of public course FAQs.
### B7.2 Edit / reorder via "order" field → reflects after revalidation.
### B7.3 Delete → removed from public.

---

## B8. Course Variants (`/admin/courses/[id]/variants`)

### B8.1 Existing Delhi variant
**Expected:** One row for Delhi with hero headline / subhead / SEO override.

### B8.2 Edit Delhi heroHeadline → reload
`/in/<course>/delhi` → new headline shown.

### B8.3 Add a Bangalore variant for one course → visit
`/in/<course>/bangalore` → variant SEO + hero applied.

### B8.4 Unpublish a variant → page falls back to the generic city page (no
variant override).

---

## B9. Categories (`/admin/categories`)

### B9.1 Add a "Cloud" category → appears in mega-menu after revalidation.
### B9.2 Reorder via "order" field → category list resorts.
### B9.3 Delete → removed from menu and from any course's selection.

---

## B10. Trainers (`/admin/trainers`)

### B10.1 Add a trainer with photo URL, expertise (comma-separated),
assign to 1+ courses → Save.
### B10.2 Public `/trainers` shows the new trainer.
### B10.3 Course pages of assigned courses show this trainer in the "Meet Your
Trainers" section.
### B10.4 Set isActive=false → removed from public pages.

---

## B11. Testimonials (`/admin/testimonials`)
### B11.1 Add → appears on home testimonials section.
### B11.2 Edit rating from 5 to 3 → 3 stars rendered on home.
### B11.3 Delete → vanishes.

---

## B12. Global FAQs (`/admin/global-faqs`)
### B12.1 Add a FAQ → appears in home page FAQ accordion.
### B12.2 Reorder → home updates.
### B12.3 Delete → home updates.

---

## B13. Pages (`/admin/pages`)

### B13.1 Create new page
**Steps:** Slug `privacy-policy`, Title "Privacy Policy" → Create.
**Expected:** Redirected to edit page.

### B13.2 Edit body with markdown (`**bold**`, `-` bullets, `# heading`).
**Expected:** Markdown rendered on `/privacy-policy`.

### B13.3 Toggle "Show lead form" / set CTA text & link.
**Expected:** Right-rail lead form appears/disappears; CTA button rendered.

### B13.4 Unpublish → public 404.

### B13.5 Delete page → public 404.

---

## B14. Leads inbox (`/admin/leads`)

### B14.1 List view
**Expected:** Columns: Date, Name, Email, Phone, Course, Source, UTM, Status.

### B14.2 Status filter pills
**Steps:** Click "New", "Contacted", "Converted" — counts shown next to each.
**Expected:** Filtering works; URL has `?status=...`.

### B14.3 Search
**Steps:** Type a lead's name / email / phone fragment in the search box.
**Expected:** Filter applied; URL has `?q=...`.

### B14.4 Detail page
**Steps:** Click a lead.
**Expected:** Full row of fields including UTM source/medium/campaign,
landing page, referrer, IP, user agent. Form to update status + internal notes.

### B14.5 CSV export
**Steps:** Click "Export CSV".
**Expected:** File `leads-YYYY-MM-DD.csv` downloads with all columns.

### B14.6 Delete lead → row removed.

---

## B15. Admin Users (`/admin/users`)

### B15.1 Create a new admin
**Steps:** Add "Editor" role with email, name, password ≥ 6 chars → Create.
**Expected:** New row appears with role "editor", Active.

### B15.2 Toggle Disable / Enable.
### B15.3 Reset password — paste a new password in the row → Reset → log out →
log in with the new password.

---

# Section C — Integration & End-to-End

## C1. Lead pipeline E2E
**Goal:** From a UTM-tagged URL to the admin inbox.

1. Visit `http://localhost:3000/?utm_source=google&utm_medium=cpc&utm_campaign=spring-promo`.
2. Submit the hero lead form.
3. **Expected:**
   - Public form returns success.
   - `/admin/leads` shows the new lead within seconds.
   - Detail page shows `utm_source=google`, `utm_medium=cpc`, `utm_campaign=spring-promo`,
     and `landingPath=/?utm_source=...`.
4. Open a different page (no UTM) and submit again from the same browser.
   - **Expected:** UTM still attributes (stored in localStorage for 30 days).

## C2. Email delivery — console fallback
**Preconditions:** `RESEND_API_KEY` empty, `FORMSUBMIT_ENABLED=false`.
**Steps:** Submit any lead form.
**Expected:** Server console prints two `[email:fallback]` blocks: one admin
notification, one auto-reply to learner.

## C3. Email delivery — Resend
**Preconditions:** Set `RESEND_API_KEY` to a real key, restart `npm run dev`.
**Steps:** Submit a lead with your real email as the learner email.
**Expected:** Admin email arrives at `SiteSettings.email`; learner email arrives
at the submitted address.

## C4. Email delivery — FormSubmit
**Preconditions:** `FORMSUBMIT_ENABLED=true`, `SiteSettings.email` set to a real
inbox you control.
**Steps:** First submission triggers a FormSubmit activation email → click the
activation link in that email. Submit a second lead.
**Expected:** Second submission arrives in your inbox (admin notification only;
learner auto-reply still needs Resend).

## C5. Revalidation
**Steps:** Edit a course title in admin → save → open the public course page in
another tab.
**Expected:** New title visible immediately (no manual rebuild required).

---

# Section D — Browser & responsive

## D1. Viewports to test
- **Mobile** ~ 375 × 812 (iPhone)
- **Tablet** ~ 768 × 1024
- **Desktop** ~ 1366 × 768
- **Wide** ~ 1920 × 1080

## D2. Things to check at each viewport
- Header collapses to ☰ at < 1024px.
- Sticky CTA appears only on mobile course pages.
- Country switcher pill in footer wraps nicely.
- Mega-menu does not overflow on the wide viewport.
- Forms remain usable at 375px width.

## D3. Browsers
- Chrome / Edge (Chromium)
- Firefox latest
- Safari (macOS / iOS) if available

---

# Section E — Smoke checklist (pre-release)

Run through this 10-minute pass before any deploy.

- [ ] `npm run build` succeeds with no errors.
- [ ] Home loads with no console errors.
- [ ] `/courses` search + filter works.
- [ ] At least one city course URL (`/in/<course>/delhi`) loads with proper title.
- [ ] Lead form submission saves to DB and triggers an email (or console log).
- [ ] Admin login works.
- [ ] Edit a course → public reflects.
- [ ] `/sitemap.xml` returns 200 and contains course URLs.
- [ ] Country switcher in footer switches URL slugs.
- [ ] Mobile menu opens and closes.
- [ ] No 500s in server logs during the run.

---

# Section F — Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `Error: AUTH_SECRET must be set` | `.env` missing or `AUTH_SECRET` < 16 chars | Re-create `.env` per §1.4 |
| `Can't reach database server` | Postgres container down or wrong port | `docker start course-ecom-postgres`; check `DATABASE_URL` host/port |
| `npx prisma db push` says "already in sync" | Schema unchanged | OK, proceed to seed |
| Seed shows "P2002 unique constraint" | Re-running seed on existing DB | Safe; seed uses `upsert`. If errors persist, drop and recreate DB |
| Public site renders but admin returns 500 | Prisma client out of date | `npx prisma generate`, restart dev |
| Admin login loops back to login | `AUTH_SECRET` changed between sessions, or cookie domain mismatch | Clear `mc_session` cookie, set a stable `AUTH_SECRET`, log in again |
| Country switcher missing | You're not on a course route, OR `getAllCourses()` returned empty | Re-seed, ensure courses are published |
| Email never arrives (Resend) | Wrong API key, or `EMAIL_FROM` not a verified domain | Verify a domain in Resend dashboard, update `EMAIL_FROM` |
| FormSubmit returns 521 | FormSubmit upstream temporarily down | Wait a few minutes and retry; lead is still saved in DB |
| Build error: "different slug names for the same dynamic path" | Two `[xxx]` at the same tree depth | Already fixed in this codebase; if reintroducing routes, keep one param name per depth |

---

# Section G — Reset / clean-up

To wipe everything and start fresh:

```bash
# Stop & delete the Postgres container (DATA LOSS)
docker rm -f course-ecom-postgres

# Re-create per §1.3
docker run -d --name course-ecom-postgres ... (see above)

# Re-push schema and re-seed
npx prisma db push
npm run db:seed
```

To inspect the database directly:

```bash
npx prisma studio   # opens http://localhost:5555
```

---

**Document version:** 1.0
**Maintainer:** keep this file in sync whenever a new feature is added.
Update the smoke checklist (§E) when any new critical flow ships.
