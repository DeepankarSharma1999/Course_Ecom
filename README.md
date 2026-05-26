# Course_Ecom — Global Certification Training Platform

A dynamic, SEO-first training platform built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Prisma and PostgreSQL.

## Sprint 1 scope

- Home page, courses listing, category pages, enquire & corporate pages
- Reusable course page template powering:
  - `/[course]` — global course page
  - `/[country]/[course]` — country variant
  - `/[country]/[course]/[city]` — city variant
- 3 seeded SAFe courses: POPM, SSM, DevOps (with Delhi city variants)
- Lead capture API (Postgres or no-DB fallback for local dev)
- SEO: dynamic `generateMetadata`, sitemap.xml, robots.txt, JSON-LD (Course / FAQ / Breadcrumb)

## Setup

```bash
# 1) Install
npm install

# 2) Configure environment
cp .env.example .env
# Edit DATABASE_URL to point at your Postgres (or skip — lead form falls back to logging)

# 3) If using Postgres
npm run db:generate
npm run db:push
npm run db:seed

# 4) Run dev server
npm run dev
```

Open http://localhost:3000

## Key routes to try

- `/` — home
- `/courses` — full catalog
- `/safe-product-owner-product-manager-certification` — global course page
- `/in/safe-product-owner-product-manager-certification` — India variant
- `/in/safe-product-owner-product-manager-certification/delhi` — Delhi city variant
- `/in/safe-scrum-master-certification/delhi`
- `/in/safe-devops-certification/delhi`
- `/sitemap.xml`, `/robots.txt`

## Next sprints (not built yet)

- Admin panel (NextAuth + CRUD for courses, schedules, FAQs, leads)
- Email/CRM integration for lead notifications
- Search & filters on `/courses`
- Blog/resource hub
- Checkout & enrollment
- Trainer & instructor profiles
- LMS portal
