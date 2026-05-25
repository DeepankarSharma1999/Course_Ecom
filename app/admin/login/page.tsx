import Link from "next/link";
import { redirect } from "next/navigation";
import { authenticate, signSession, setSessionCookie, getCurrentUser } from "@/lib/auth";

export const metadata = { title: "Admin Login" };

async function loginAction(formData: FormData) {
  "use server";
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const from = String(formData.get("from") || "/admin");
  if (!email || !password) redirect(`/admin/login?error=missing`);
  const user = await authenticate(email, password);
  if (!user) redirect(`/admin/login?error=invalid`);
  const token = await signSession({ sub: user.id, email: user.email, role: user.role, name: user.name ?? undefined });
  await setSessionCookie(token);
  redirect(from || "/admin");
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; from?: string }> }) {
  const sp = await searchParams;
  const existing = await getCurrentUser();
  if (existing) redirect(sp.from || "/admin");

  const errorMsg: Record<string, string> = {
    invalid: "Invalid email or password.",
    missing: "Please enter both email and password.",
    server: "Server is not configured. Set AUTH_SECRET in .env.",
  };

  return (
    <div className="min-h-screen grid place-items-center bg-ink-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 grid place-items-center text-white font-bold">M</div>
            <span className="font-bold text-xl text-ink-900">Course_Ecom Admin</span>
          </Link>
          <p className="text-sm text-ink-500 mt-2">Sign in to manage courses, schedules, and leads.</p>
        </div>

        <form action={loginAction} className="card p-6 space-y-4">
          {sp.error && (
            <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">
              {errorMsg[sp.error] || "Login failed."}
            </div>
          )}
          <input type="hidden" name="from" value={sp.from || "/admin"} />
          <div>
            <label className="text-sm font-medium text-ink-700">Email</label>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="mt-1 w-full rounded-lg border border-ink-200 px-3 py-2 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none"
              placeholder="admin@course-ecom.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink-700">Password</label>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="mt-1 w-full rounded-lg border border-ink-200 px-3 py-2 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none"
            />
          </div>
          <button type="submit" className="btn-primary w-full">Sign in</button>
          <div className="text-xs text-ink-500 text-center">
            Default: <code className="font-mono">admin@course-ecom.com</code> / <code className="font-mono">admin123</code>
          </div>
        </form>

        <div className="text-center mt-4">
          <Link href="/" className="text-sm text-ink-500 hover:text-brand-600">← Back to site</Link>
        </div>
      </div>
    </div>
  );
}
