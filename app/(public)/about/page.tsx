import type { Metadata } from "next";
import { AboutClient } from "./about-client";
import { getPageContent } from "@/lib/page-content";

const SLUG = "about";
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent(SLUG);
  return { title: c.metaTitle, description: c.metaDescription };
}

export default async function AboutPage() {
  const c = await getPageContent(SLUG);
  return <AboutClient content={c} />;
}
