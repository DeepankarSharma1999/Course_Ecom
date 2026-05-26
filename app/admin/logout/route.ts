import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  await clearSessionCookie();
  const url = new URL("/admin/login", req.url);
  return NextResponse.redirect(url, { status: 303 });
}

export async function GET(req: Request) {
  return POST(req);
}
