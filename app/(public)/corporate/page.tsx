import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSimplePage } from "@/lib/site-content";
import { SimplePageRenderer } from "@/components/simple-page-renderer";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const p = await getSimplePage("corporate");
  return { title: p?.seoTitle || p?.title || "Corporate Training", description: p?.seoDescription || p?.heroSubheading || undefined };
}

export default async function CorporatePage() {
  const page = await getSimplePage("corporate");
  if (!page) notFound();
  return <SimplePageRenderer page={page} source="corporate" />;
}
