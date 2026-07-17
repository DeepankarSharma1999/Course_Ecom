import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { INFO_PAGES } from "@/lib/info-content";
import { stripBrandSuffix } from "@/lib/utils";
import AnimatedContent from "./animated-content";
// Force hot reload

type Props = {
  params: Promise<{ slug: string }>;
};

// Placeholder info pages hidden until they carry real content.
const HIDDEN = new Set(["tutorials", "interview-questions", "course-info"]);

// Generate static routes for all info pages
export async function generateStaticParams() {
  return Object.keys(INFO_PAGES)
    .filter((slug) => !HIDDEN.has(slug))
    .map((slug) => ({ slug }));
}

// Generate SEO metadata for each page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = INFO_PAGES[slug];

  if (!content) {
    return { title: "Page Not Found" };
  }

  return {
    // Stored titles carry "| Simplilead"; the layout template re-appends it (FIX-04).
    title: stripBrandSuffix(content.title),
    description: content.description,
    keywords: content.keywords,
  };
}

export default async function InfoPage({ params }: Props) {
  const { slug } = await params;
  const content = INFO_PAGES[slug];

  if (!content || HIDDEN.has(slug)) {
    notFound();
  }

  return <AnimatedContent content={content} slug={slug} />;
}
