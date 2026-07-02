import { NextResponse } from "next/server";
import { registerLearner, setLearnerCookie } from "@/lib/learner-auth";

export async function POST(req: Request) {
  const { name = "", email = "", password = "" } = await req.json().catch(() => ({}));
  const result = await registerLearner(name, email, password);
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });
  await setLearnerCookie(result.session);
  return NextResponse.json({ user: { name: result.session.name ?? null, email: result.session.email } });
}
