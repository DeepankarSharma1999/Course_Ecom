import type { Metadata } from "next";
import { ReferEarnClient } from "./refer-earn-client";
import { getPageContent } from "@/lib/page-content";

const SLUG = "refer-earn";
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent(SLUG);
  return { title: c.metaTitle, description: c.metaDescription, alternates: { canonical: "/refer-earn" } };
}

export default async function ReferEarnPage() {
  const c = await getPageContent(SLUG);
  return <ReferEarnClient content={c} />;
}
