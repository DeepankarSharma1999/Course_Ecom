import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ExitIntentPopup } from "@/components/exit-intent-popup";
import { FloatingWhatsApp } from "@/components/whatsapp-button";
import { LiveChatWidget } from "@/components/live-chat-widget";
import { getDisplayCurrency } from "@/lib/geo";
import { getSiteSettings } from "@/lib/site-content";
import { getAllCourses, getCategories } from "@/lib/content";
import { getPageContent } from "@/lib/page-content";
import Link from "next/link";

import { LearnerAuthProvider } from "@/components/learner-auth-provider";
import { AuthModal } from "@/components/auth-modal";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const [currency, settings, categories, courses, nav] = await Promise.all([
    getDisplayCurrency(),
    getSiteSettings(),
    getCategories(),
    getAllCourses(),
    getPageContent("navigation"),
  ]);

  // Build the nav data: categories with their courses
  const navCategories = categories.map((cat) => ({
    slug: cat.slug,
    name: cat.name,
    tagline: cat.tagline,
    icon: cat.icon,
    courses: courses.filter((c) => c.category.slug === cat.slug).map((c) => ({
      slug: c.slug,
      title: c.shortTitle || c.title,
    })),
  })).filter((c) => c.courses.length > 0);

  const featuredCourses = courses.slice(0, 6).map((c) => ({
    slug: c.slug,
    title: c.shortTitle || c.title,
    category: c.category.name,
  }));

  return (
    <LearnerAuthProvider>
      {settings.announcementEnabled && settings.announcementText && (
        <div className="bg-accent-500 text-white text-xs font-semibold">
          <div className="container-tight py-2 text-center">
            {settings.announcementLink ? (
              <Link href={settings.announcementLink} className="hover:underline">{settings.announcementText}</Link>
            ) : settings.announcementText}
          </div>
        </div>
      )}
      <SiteHeader
        currency={currency}
        brandName={settings.brandName}
        logoUrl={settings.logoUrl}
        tagline={settings.tagline}
        phone={settings.phone}
        whatsappNumber={settings.whatsappNumber}
        topBarMessages={(settings.topBarMessages as string[]) || []}
        navCategories={navCategories}
        featuredCourses={featuredCourses}
        nav={nav}
      />
      <main>{children}</main>
      <SiteFooter />
      <ExitIntentPopup />
      <FloatingWhatsApp phone={settings.whatsappNumber} message={`Hi ${settings.brandName} team, I'd like to know more about your courses.`} />
      <LiveChatWidget />
      <AuthModal />
    </LearnerAuthProvider>
  );
}
