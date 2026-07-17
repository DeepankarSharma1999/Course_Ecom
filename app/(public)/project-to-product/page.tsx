import { Metadata } from "next";
import { EnterpriseSolutionLayout } from "@/components/public/enterprise/solution-layout";
import { getPageContent } from "@/lib/page-content";

const SLUG = "project-to-product";
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent(SLUG);
  return { title: c.metaTitle, description: c.metaDescription, alternates: { canonical: "/project-to-product" } };
}

export default async function Page() {
  const c = await getPageContent(SLUG);
  return <EnterpriseSolutionLayout {...(c as any)} />;
}
