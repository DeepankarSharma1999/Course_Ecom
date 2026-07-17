import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE, cn } from "@/lib/utils";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LearnerAuthProvider } from "@/components/learner-auth-provider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 0.85,
  maximumScale: 5,
};

const jakarta = Plus_Jakarta_Sans({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Simplilead delivers globally recognized certification training in Agile, Scrum, SAFe, DevOps, Project Management, Quality, IT Service Management, and more. Learn from accredited trainers, in person or live online.",
  openGraph: { type: "website", siteName: SITE.name, url: SITE.url },
  // No global robots meta — indexing is the default; pages opt OUT via
  // robots: NOINDEX (lib/indexing.ts) so there is exactly one directive per page.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", jakarta.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        <LearnerAuthProvider>{children}</LearnerAuthProvider>
        {/* Real-user Core Web Vitals (LCP/INP/CLS) reporting — FIX-07. */}
        <SpeedInsights />
      </body>
    </html>
  );
}
