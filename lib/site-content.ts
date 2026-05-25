// Adapter for SiteSettings, HomePageContent, SimplePage, Global FAQ
// All functions DB-first with hardcoded fallbacks so the site works pre-seed.

import { prisma } from "./prisma";
import { GLOBAL_FAQS } from "./seed-data";

export type SiteSettings = NonNullable<Awaited<ReturnType<typeof getSiteSettings>>>;
export type HomePageContent = NonNullable<Awaited<ReturnType<typeof getHomeContent>>>;

const DEFAULT_SETTINGS = {
  brandName: "Course_Ecom",
  tagline: "Training & Certifications",
  logoUrl: null,
  faviconUrl: null,
  phone: "+91 80 4710 6633",
  email: "info@course-ecom.com",
  whatsappNumber: "918047106633",
  address: null,
  topBarMessages: [
    "Globally accredited certification training",
    "5,00,000+ professionals trained worldwide",
  ],
  accreditationLogos: [
    { name: "Scaled Agile" }, { name: "PMI®" }, { name: "Scrum Alliance" },
    { name: "AXELOS" }, { name: "EXIN" }, { name: "PeopleCert" }, { name: "IIBA®" },
  ],
  socialLinks: { linkedin: "", twitter: "", facebook: "", instagram: "", youtube: "" },
  footerAbout: "Course_Ecom is a global certification training provider, helping 500,000+ professionals across 50+ countries advance their careers with globally accredited programs.",
  footerColumns: [
    {
      title: "Top Categories",
      links: [
        { label: "Agile & Scrum", href: "/category/agile-scrum" },
        { label: "Scaled Agile (SAFe)", href: "/category/safe" },
        { label: "Project Management", href: "/category/project-management" },
        { label: "DevOps", href: "/category/devops" },
        { label: "IT Service Management", href: "/category/it-service-management" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Trainers", href: "/trainers" },
        { label: "Corporate Training", href: "/corporate" },
        { label: "Compare Courses", href: "/compare" },
        { label: "Contact", href: "/enquire" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Refund Policy", href: "/refund-policy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
    },
  ],
  copyrightText: "© Course_Ecom. All rights reserved.",
  announcementText: null,
  announcementLink: null,
  announcementEnabled: false,
  defaultSeoTitle: null,
  defaultSeoDescription: null,
};

const DEFAULT_HOME = {
  heroBadgeText: "Trusted by 500,000+ learners across 50+ countries",
  heroHeadline: "Globally Accredited",
  heroHeadlineHighlight: "Certification",
  heroHeadlineSuffix: "Training",
  heroSubheading: "Live instructor-led, classroom and corporate training in Agile, SAFe, DevOps, Project Management, IT Service Management, Quality and emerging technologies — by accredited trainers.",
  heroCtaPrimaryText: "Explore All Courses", heroCtaPrimaryLink: "/courses",
  heroCtaSecondaryText: "Corporate Training", heroCtaSecondaryLink: "/corporate",
  heroStats: [
    { value: "4.8/5", label: "Average Rating" },
    { value: "98%", label: "Pass Rate" },
    { value: "24×7", label: "Learner Support" },
  ],
  heroFormTitle: "Talk to a Training Advisor",
  heroFormSubtitle: "Get course details, batch schedules and group discounts.",
  accreditationTitle: "Accredited Training Partner",
  categoriesBadge: "Course Catalog",
  categoriesTitle: "Explore Our Training Categories",
  categoriesSubtitle: "From individual certifications to enterprise transformation, find the right program for your career stage.",
  coursesBadge: "Most Popular",
  coursesTitle: "Bestselling Certification Courses",
  whyUsBadge: "Why Course_Ecom",
  whyUsTitle: "A Training Partner Built for Outcomes, Not Just Certificates",
  whyUsSubtitle: "We combine globally accredited curriculum, hands-on practitioner-led delivery, and modern learning experiences to ensure you don't just pass your exam — you actually apply what you learn at work.",
  whyUsImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
  whyUsItems: [
    { icon: "GraduationCap", title: "Accredited Curriculum", body: "Official courseware from Scaled Agile, PMI, Scrum Alliance, AXELOS and more." },
    { icon: "Users", title: "Practitioner-Led Training", body: "Trainers are working SPCs, PMPs, and certified coaches with 15+ years of experience." },
    { icon: "Repeat", title: "Free Course Retake", body: "Retake the course within 90 days at no additional cost — your learning is guaranteed." },
    { icon: "Headphones", title: "24×7 Learner Support", body: "Doubts, schedule changes, exam guidance — we are reachable around the clock." },
  ],
  testimonialsBadge: "Learner Stories",
  testimonialsTitle: "What Our Learners Say",
  testimonialsSubtitle: "Real reviews from professionals who advanced their careers with Course_Ecom.",
  faqBadge: "FAQ",
  faqTitle: "Frequently Asked Questions",
  ctaTitle: "Ready to Advance Your Career?",
  ctaSubtitle: "Speak with a training advisor today. Get curated course recommendations, batch schedules and exclusive offers tailored to your goals.",
  ctaPrimaryText: "Enquire Now", ctaPrimaryLink: "/enquire",
  ctaSecondaryText: "Corporate Training", ctaSecondaryLink: "/corporate",
  seoTitle: null, seoDescription: null,
};

const DEFAULT_SIMPLE_PAGES: Record<string, any> = {
  corporate: {
    slug: "corporate", title: "Corporate Training",
    heroBadge: "For Enterprises",
    heroHeadline: "Upskill Your Teams With Globally Accredited Training",
    heroSubheading: "Custom curriculum, private group batches, bulk enrollments and dedicated success management for your enterprise.",
    body: "Course_Ecom partners with Fortune 500 enterprises and high-growth product companies to deliver world-class training programs at scale.\n\nWe combine accredited curriculum, practitioner-led delivery and modern learning experiences to ensure your teams don't just complete training — they apply it.\n\n**What we offer**\n- Private cohorts and custom curriculum\n- Bulk enrollment discounts (10+ learners)\n- Dedicated learning experience manager\n- Onsite, virtual or hybrid delivery\n- LMS access for 12 months\n- Detailed reporting and certification tracking",
    showLeadForm: true,
    leadFormTitle: "Request a Corporate Proposal",
    leadFormSubtitle: "Our enterprise team will respond within one business day.",
  },
  enquire: {
    slug: "enquire", title: "Enquire Now",
    heroBadge: "Get in Touch",
    heroHeadline: "Talk to a Training Advisor",
    heroSubheading: "We'll help you choose the right certification, schedule a batch and unlock exclusive offers.",
    body: "Our advisors are reachable 7 days a week. Tell us a little about what you're looking for and we'll call you back, typically within an hour during business hours.",
    showLeadForm: true,
    leadFormTitle: "Enquire Now",
    leadFormSubtitle: "Quick form — we'll do the rest.",
  },
  about: {
    slug: "about", title: "About Course_Ecom",
    heroBadge: "About",
    heroHeadline: "Building Careers Through World-Class Training",
    heroSubheading: "Course_Ecom is a global training and certification provider, trusted by 500,000+ professionals and 1,000+ enterprises.",
    body: "Founded with a mission to make globally accredited certification training accessible across geographies, Course_Ecom partners with Scaled Agile, PMI, Scrum Alliance, AXELOS, EXIN and PeopleCert to deliver world-class programs in Agile, SAFe, DevOps, Project Management, IT Service Management, Quality, Cybersecurity and emerging tech.\n\n**Our mission** — give every professional an unfair career advantage through practitioner-led training, modern learning experiences and outcome-focused certification programs.\n\n**Why choose Course_Ecom** — accredited training partners, only SPC/PMP-certified instructors, free retake policy, 24×7 learner support and a single point of contact through your learning journey.",
    showLeadForm: false,
  },
};

export async function getSiteSettings() {
  try {
    const row = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
    if (row) return row;
  } catch { /* fall through */ }
  return DEFAULT_SETTINGS as any;
}

export async function getHomeContent() {
  try {
    const row = await prisma.homePageContent.findUnique({ where: { id: "singleton" } });
    if (row) return row;
  } catch { /* fall through */ }
  return DEFAULT_HOME as any;
}

export async function getSimplePage(slug: string) {
  try {
    const row = await prisma.simplePage.findUnique({ where: { slug } });
    if (row && row.isPublished) return row;
  } catch { /* fall through */ }
  return (DEFAULT_SIMPLE_PAGES[slug] as any) || null;
}

export async function getGlobalFaqs() {
  try {
    const rows = await prisma.fAQ.findMany({ where: { scope: "global" }, orderBy: { order: "asc" } });
    if (rows.length > 0) return rows.map((r) => ({ q: r.question, a: r.answer }));
  } catch { /* fall through */ }
  return GLOBAL_FAQS;
}

export const SIMPLE_PAGE_DEFAULTS = DEFAULT_SIMPLE_PAGES;
export const SITE_DEFAULTS = DEFAULT_SETTINGS;
export const HOME_DEFAULTS = DEFAULT_HOME;
