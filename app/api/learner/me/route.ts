import { NextResponse } from "next/server";
import { getCurrentLearner } from "@/lib/learner-auth";

export async function GET() {
  const s = await getCurrentLearner();
  return NextResponse.json({ user: s ? { name: s.name ?? null, email: s.email } : null });
}
