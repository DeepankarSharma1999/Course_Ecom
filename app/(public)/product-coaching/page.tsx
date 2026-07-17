import { Metadata } from "next";
import { EnterpriseSolutionLayout } from "@/components/public/enterprise/solution-layout";
import { getPageContent } from "@/lib/page-content";

const SLUG = "product-coaching";
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent(SLUG);
  return { title: c.metaTitle, description: c.metaDescription, alternates: { canonical: "/product-coaching" } };
}

export default async function Page() {
  const c = await getPageContent(SLUG);
  return <EnterpriseSolutionLayout {...(c as any)} />;
}
