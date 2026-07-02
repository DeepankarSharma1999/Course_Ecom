import { prisma } from "@/lib/prisma";
import { PAGE_DEFAULTS } from "@/lib/page-defaults";

// Deep-merge a saved override over code defaults so unedited keys (and newly added
// default keys) always resolve. Arrays are replaced wholesale — the admin form edits
// a full list, so element-wise merging would be wrong.
function merge<T>(base: T, over: any): T {
  if (over === undefined || over === null) return base;
  if (Array.isArray(base) || Array.isArray(over)) return over as T;
  if (typeof base === "object" && typeof over === "object") {
    const out: any = { ...base };
    for (const k of Object.keys(over)) out[k] = merge((base as any)[k], over[k]);
    return out;
  }
  return over as T;
}

export async function getPageContent<T = Record<string, any>>(slug: string): Promise<T> {
  const defaults = (PAGE_DEFAULTS[slug]?.content ?? {}) as T;
  const row = await prisma.pageContent.findUnique({ where: { slug } }).catch(() => null);
  return merge(defaults, row?.content);
}
