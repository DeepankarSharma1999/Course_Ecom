import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ExitIntentPopup } from "@/components/exit-intent-popup";
import { FloatingWhatsApp } from "@/components/whatsapp-button";
import { getDisplayCurrency } from "@/lib/geo";
import { getSiteSettings } from "@/lib/site-content";
import Link from "next/link";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const [currency, settings] = await Promise.all([getDisplayCurrency(), getSiteSettings()]);
  return (
    <>
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
        tagline={settings.tagline}
        phone={settings.phone}
        topBarMessages={(settings.topBarMessages as string[]) || []}
      />
      <main>{children}</main>
      <SiteFooter />
      <ExitIntentPopup />
      <FloatingWhatsApp phone={settings.whatsappNumber} message={`Hi ${settings.brandName} team, I'd like to know more about your courses.`} />
    </>
  );
}
