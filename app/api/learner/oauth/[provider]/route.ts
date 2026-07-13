import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decodeJwt } from "jose";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { setLearnerCookie } from "@/lib/learner-auth";

// Both providers speak OIDC: same authorization-code flow, same id_token
// claims (email, name). One route serves as both the start URL and the
// redirect URI — no `code` param means step 1 (send user to provider).
const providers = {
  google: {
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    scope: "openid email profile",
    clientId: () => process.env.GOOGLE_CLIENT_ID,
    clientSecret: () => process.env.GOOGLE_CLIENT_SECRET,
  },
  linkedin: {
    authUrl: "https://www.linkedin.com/oauth/v2/authorization",
    tokenUrl: "https://www.linkedin.com/oauth/v2/accessToken",
    scope: "openid profile email",
    clientId: () => process.env.LINKEDIN_CLIENT_ID,
    clientSecret: () => process.env.LINKEDIN_CLIENT_SECRET,
  },
};

const STATE_COOKIE = "mc_oauth_state";

export async function GET(req: NextRequest, { params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params;
  const p = providers[provider as keyof typeof providers];
  const origin = req.nextUrl.origin;
  const fail = () => NextResponse.redirect(`${origin}/?error=oauth`);
  if (!p || !p.clientId() || !p.clientSecret()) return fail();
  if (req.nextUrl.searchParams.get("error")) return fail(); // user denied consent

  const redirectUri = `${origin}/api/learner/oauth/${provider}`;
  const jar = await cookies();
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    // Step 1: redirect to the provider with a CSRF state cookie.
    const state = crypto.randomUUID();
    jar.set(STATE_COOKIE, state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 600,
    });
    const url = new URL(p.authUrl);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("client_id", p.clientId()!);
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("scope", p.scope);
    url.searchParams.set("state", state);
    return NextResponse.redirect(url);
  }

  // Step 2: provider redirected back with a code.
  try {
    const savedState = jar.get(STATE_COOKIE)?.value;
    jar.delete(STATE_COOKIE);
    if (!savedState || req.nextUrl.searchParams.get("state") !== savedState) return fail();

    const tokenRes = await fetch(p.tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: p.clientId()!,
        client_secret: p.clientSecret()!,
      }),
    });
    const { id_token: idToken } = await tokenRes.json();
    if (!idToken) return fail();

    // The id_token came straight from the provider's token endpoint over TLS,
    // so decoding without signature verification is safe here.
    const claims = decodeJwt(idToken);
    const email = String(claims.email ?? "").toLowerCase().trim();
    if (!email) return fail();
    const name = typeof claims.name === "string" ? claims.name : null;

    // Provider-verified email: link to an existing account or create one.
    // ponytail: no OAuth-account table; a random unusable password keeps the
    // schema unchanged — add provider columns if per-provider linking matters.
    let learner = await prisma.learner.findUnique({ where: { email } });
    if (!learner) {
      learner = await prisma.learner.create({
        data: { email, name, passwordHash: await hashPassword(crypto.randomUUID()) },
      });
    }
    await prisma.learner.update({ where: { id: learner.id }, data: { lastLoginAt: new Date() } });
    await setLearnerCookie({ sub: learner.id, email: learner.email, name: learner.name ?? undefined });
    return NextResponse.redirect(`${origin}/home`);
  } catch {
    return fail();
  }
}
