import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { hashPassword, verifyPassword } from "./auth";

// Separate cookie/session from the admin one (mc_session) so the two auth
// systems never collide. Same AUTH_SECRET is fine — the cookie name scopes it.
const COOKIE_NAME = "mc_learner";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) throw new Error("AUTH_SECRET must be set (16+ chars).");
  return new TextEncoder().encode(secret);
}

export type LearnerSession = { sub: string; email: string; name?: string };

async function signLearner(payload: LearnerSession): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${COOKIE_MAX_AGE}s`)
    .sign(getSecret());
}

export async function getCurrentLearner(): Promise<LearnerSession | null> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: ["HS256"] });
    return payload as unknown as LearnerSession;
  } catch {
    return null;
  }
}

export async function setLearnerCookie(session: LearnerSession) {
  (await cookies()).set(COOKIE_NAME, await signLearner(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function clearLearnerCookie() {
  (await cookies()).delete(COOKIE_NAME);
}

const normEmail = (e: string) => e.toLowerCase().trim();

// Returns { error } on failure, or the new session on success.
export async function registerLearner(name: string, email: string, password: string) {
  const e = normEmail(email);
  if (!e || !password || password.length < 8) return { error: "Enter an email and a password of at least 8 characters." };
  const existing = await prisma.learner.findUnique({ where: { email: e } });
  if (existing) return { error: "An account with this email already exists. Try logging in." };
  const learner = await prisma.learner.create({
    data: { email: e, name: name.trim() || null, passwordHash: await hashPassword(password) },
  });
  return { session: { sub: learner.id, email: learner.email, name: learner.name ?? undefined } as LearnerSession };
}

export async function authenticateLearner(email: string, password: string) {
  const learner = await prisma.learner.findUnique({ where: { email: normEmail(email) } });
  if (!learner || !(await verifyPassword(password, learner.passwordHash))) {
    return { error: "Incorrect email or password." };
  }
  await prisma.learner.update({ where: { id: learner.id }, data: { lastLoginAt: new Date() } });
  return { session: { sub: learner.id, email: learner.email, name: learner.name ?? undefined } as LearnerSession };
}
