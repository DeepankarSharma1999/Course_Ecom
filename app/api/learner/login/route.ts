import { NextResponse } from "next/server";
import { authenticateLearner, setLearnerCookie } from "@/lib/learner-auth";

export async function POST(req: Request) {
  const { email = "", password = "" } = await req.json().catch(() => ({}));
  const result = await authenticateLearner(email, password);
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 401 });
  await setLearnerCookie(result.session);
  return NextResponse.json({ user: { name: result.session.name ?? null, email: result.session.email } });
}
