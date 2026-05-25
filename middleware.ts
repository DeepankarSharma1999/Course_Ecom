import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "mc_session";

async function isValidSession(token: string | undefined, secret: Uint8Array) {
  if (!token) return false;
  try {
    await jwtVerify(token, secret, { algorithms: ["HS256"] });
    return true;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname === "/admin/login") return NextResponse.next();

  const secretValue = process.env.AUTH_SECRET;
  if (!secretValue) {
    return NextResponse.redirect(new URL("/admin/login?error=server", req.url));
  }
  const secret = new TextEncoder().encode(secretValue);
  const token = req.cookies.get(COOKIE_NAME)?.value;

  if (!(await isValidSession(token, secret))) {
    const url = new URL("/admin/login", req.url);
    if (pathname !== "/admin") url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
