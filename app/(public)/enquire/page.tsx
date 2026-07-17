import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSimplePage } from "@/lib/site-content";
import { stripBrandSuffix } from "@/lib/utils";
import { SimplePageRenderer } from "@/components/simple-page-renderer";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const p = await getSimplePage("enquire");
  return { title: stripBrandSuffix(p?.seoTitle) || p?.title || "Enquire Now", description: p?.seoDescription || p?.heroSubheading || undefined, alternates: { canonical: "/enquire" } };
}

export default async function EnquirePage() {
  const page = await getSimplePage("enquire");
  if (!page) notFound();
  return <SimplePageRenderer page={page} source="enquire" />;
}
