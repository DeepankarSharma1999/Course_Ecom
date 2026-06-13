"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPage(data: { slug: string; title: string }) {
  try {
    const page = await prisma.page.create({
      data: {
        slug: data.slug.replace(/^\/+/, ""), // remove leading slash if any
        title: data.title,
        content: "<p>Start editing your page content here.</p>",
      },
    });
    revalidatePath("/admin/pages");
    return { success: true, id: page.id };
  } catch (error: any) {
    console.error("Failed to create page", error);
    return { success: false, error: "Slug might already exist or invalid data." };
  }
}

export async function updatePage(id: string, data: { title?: string; slug?: string; content?: string; requiresAuth?: boolean; isPublished?: boolean }) {
  try {
    if (data.slug) {
      data.slug = data.slug.replace(/^\/+/, "");
    }
    await prisma.page.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/pages");
    if (data.slug) {
      revalidatePath(`/${data.slug}`);
      revalidatePath(`/home/${data.slug}`);
    }
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update page", error);
    return { success: false, error: "Failed to update page" };
  }
}

export async function deletePage(id: string) {
  try {
    await prisma.page.delete({ where: { id } });
    revalidatePath("/admin/pages");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete page", error);
    return { success: false, error: "Failed to delete page" };
  }
}

export async function getPageBySlug(slug: string, requiresAuth: boolean = false) {
  try {
    return await prisma.page.findFirst({
      where: { 
        slug: slug.replace(/^\/+/, ""),
        isPublished: true,
        requiresAuth,
      }
    });
  } catch (error) {
    return null;
  }
}
