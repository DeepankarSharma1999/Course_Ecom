import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { INFO_PAGES } from "@/lib/info-content";
import AnimatedContent from "./animated-content";
// Force hot reload

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate static routes for all info pages
export async function generateStaticParams() {
  return Object.keys(INFO_PAGES).map((slug) => ({
    slug,
  }));
}

// Generate SEO metadata for each page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = INFO_PAGES[slug];

  if (!content) {
    return { title: "Page Not Found | Simplilead" };
  }

  return {
    title: content.title,
    description: content.description,
    keywords: content.keywords,
  };
}

export default async function InfoPage({ params }: Props) {
  const { slug } = await params;
  const content = INFO_PAGES[slug];

  if (!content) {
    notFound();
  }

  return <AnimatedContent content={content} slug={slug} />;
}
