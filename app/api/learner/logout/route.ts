import { NextResponse } from "next/server";
import { clearLearnerCookie } from "@/lib/learner-auth";

export async function POST() {
  await clearLearnerCookie();
  return NextResponse.json({ ok: true });
}
