// File upload endpoint for admin assets (logo, favicon, brochures, etc.).
// Writes to <repo>/public/uploads/ so files are served by Next.js and
// committable to git for persistence across deploys.
//
// NOTE: this writes to the local filesystem. On ephemeral hosts (Vercel)
// files will not survive a redeploy — commit the uploads to the repo if you
// need them persisted. For production-grade storage, swap the body of POST
// for an S3 / R2 / Cloudinary upload.

import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { getCurrentUser } from "@/lib/auth";

const MAX_BYTES = 2 * 1024 * 1024; // 2 MB (images)
const MAX_PDF_BYTES = 10 * 1024 * 1024; // 10 MB (brochures)
const ALLOWED_MIME = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
  "image/gif",
  "image/x-icon",
  "image/vnd.microsoft.icon",
  "application/pdf",
]);
const EXT_BY_MIME: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/svg+xml": "svg",
  "image/gif": "gif",
  "image/x-icon": "ico",
  "image/vnd.microsoft.icon": "ico",
  "application/pdf": "pdf",
};

function safeKind(input: string | null): string {
  const v = (input || "asset").toLowerCase().replace(/[^a-z0-9_-]/g, "");
  return v || "asset";
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "admin" && user.role !== "editor")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid multipart payload" }, { status: 400 });
  }

  const file = form.get("file");
  const kind = safeKind(form.get("kind") as string | null);
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (file.size === 0) {
    return NextResponse.json({ error: "Empty file" }, { status: 400 });
  }
  const maxBytes = file.type === "application/pdf" ? MAX_PDF_BYTES : MAX_BYTES;
  if (file.size > maxBytes) {
    return NextResponse.json({ error: `File too large (max ${maxBytes / 1024 / 1024} MB)` }, { status: 413 });
  }
  if (!ALLOWED_MIME.has(file.type)) {
    return NextResponse.json({ error: `Unsupported file type: ${file.type}` }, { status: 415 });
  }

  const ext = EXT_BY_MIME[file.type] ?? "bin";
  const filename = `${kind}-${Date.now()}-${randomBytes(4).toString("hex")}.${ext}`;
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });
  const dest = path.join(uploadsDir, filename);
  const buf = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(dest, buf);

  const url = `/uploads/${filename}`;
  return NextResponse.json({ ok: true, url, filename, size: file.size, type: file.type });
}
