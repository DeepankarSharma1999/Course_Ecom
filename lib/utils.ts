import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE = {
  name: "Ulearnsystems",
  tagline: "Global Certification Training",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  phone: "+91 80 4710 6633",
  email: "info@course-ecom.com",
};

/**
 * Strip redundant "Certification" / "Training" suffixes from a course short title,
 * so we never get "X Certification Certification Training" when re-composing.
 */
/**
 * Strip a trailing " | <BrandName>" so that page titles passed to Next.js metadata
 * don't get the brand suffix duplicated by the root layout's title template.
 * Returns null/undefined when input is empty (so callers can use ?? fallbacks).
 */
export function stripBrandSuffix(title?: string | null) {
  if (!title) return title ?? null;
  const escapedBrand = SITE.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return title.replace(new RegExp(`\\s*\\|\\s*${escapedBrand}\\s*$`, "i"), "").trim();
}

export function baseCourseTitle(shortTitle: string) {
  return shortTitle.replace(/\s+(Certification Training|Certification|Training)$/i, "").trim();
}

/**
 * Compose a clean course title for hero / metadata.
 * Examples (POPM shortTitle = "SAFe POPM Certification"):
 *   composeCourseTitle("SAFe POPM Certification")                   → "SAFe POPM Certification Training"
 *   composeCourseTitle("SAFe POPM Certification", { city:"Kolkata"}) → "SAFe POPM Certification Training in Kolkata"
 */
export function composeCourseTitle(shortTitle: string, opts: { city?: string; country?: string } = {}) {
  const base = baseCourseTitle(shortTitle);
  if (opts.city) return `${base} Certification Training in ${opts.city}`;
  if (opts.country) return `${base} Certification Training in ${opts.country}`;
  return `${base} Certification Training`;
}

export function formatPrice(amount: number, currency = "INR") {
  return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
