import { NextRequest, NextResponse } from "next/server";
const COOKIE_NAME = "mc_session";

function base64urlDecode(str: string) {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) base64 += "=";
  return atob(base64);
}

async function isValidSession(token: string | undefined, secret: Uint8Array) {
  if (!token) return false;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    const [header, payload, signature] = parts;

    const key = await crypto.subtle.importKey(
      "raw", secret.buffer as ArrayBuffer, { name: "HMAC", hash: "SHA-256" }, false, ["verify"]
    );
    const signatureBytes = Uint8Array.from(base64urlDecode(signature), c => c.charCodeAt(0));
    const dataBytes = new TextEncoder().encode(`${header}.${payload}`);
    const isValid = await crypto.subtle.verify("HMAC", key, signatureBytes, dataBytes);
    if (!isValid) return false;

    const payloadObj = JSON.parse(base64urlDecode(payload));
    if (payloadObj.exp && payloadObj.exp * 1000 < Date.now()) return false;
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
