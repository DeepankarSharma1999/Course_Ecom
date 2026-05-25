import { NextResponse } from "next/server";

const ALLOWED = ["INR", "USD", "GBP", "EUR", "AED", "SGD", "AUD"];

export async function POST(req: Request) {
  const form = await req.formData();
  const code = String(form.get("currency") || "").toUpperCase();
  const back = String(form.get("from") || "/");
  const res = NextResponse.redirect(new URL(back, req.url), { status: 303 });
  if (ALLOWED.includes(code)) {
    res.cookies.set("mc_currency", code, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  }
  return res;
}
