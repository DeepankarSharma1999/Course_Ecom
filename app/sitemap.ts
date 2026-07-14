import type { MetadataRoute } from "next";
import { CATEGORIES, CITIES_IN, COUNTRIES, COURSES } from "@/lib/seed-data";
import { SITE } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/courses`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/corporate-training`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/info/contact-us`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
  for (const cat of CATEGORIES) urls.push({ url: `${base}/category/${cat.slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.8 });
  for (const c of COURSES) {
    urls.push({ url: `${base}/${c.slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.9 });
    for (const co of COUNTRIES) urls.push({ url: `${base}/${co.slug}/${c.slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.7 });
    for (const ct of CITIES_IN) urls.push({ url: `${base}/in/${c.slug}/${ct.slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.7 });
  }
  return urls;
}
