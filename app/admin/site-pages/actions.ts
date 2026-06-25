"use server";

import { prisma } from "@/lib/prisma";
import { PAGE_DEFAULTS } from "@/lib/page-defaults";
import { revalidatePath } from "next/cache";

export async function savePageContent(slug: string, content: Record<string, any>) {
  if (!PAGE_DEFAULTS[slug]) throw new Error(`Unknown page: ${slug}`);
  await prisma.pageContent.upsert({
    where: { slug },
    update: { content },
    create: { slug, content },
  });
  revalidatePath(`/${slug}`);
  revalidatePath(`/admin/site-pages/${slug}`);
}
