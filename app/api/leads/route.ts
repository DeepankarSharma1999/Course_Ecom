import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { autoReplyToLead, notifyAdminOfLead } from "@/lib/email";

const Utm = z.object({
  source: z.string().max(120).optional(),
  medium: z.string().max(120).optional(),
  campaign: z.string().max(120).optional(),
  term: z.string().max(120).optional(),
  content: z.string().max(120).optional(),
  referrer: z.string().max(500).optional(),
  landingPath: z.string().max(500).optional(),
}).partial();

const LeadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(6).max(20),
  countryCode: z.string().optional(),
  message: z.string().max(2000).optional(),
  // Consultation slot from the SchedulePicker (both or neither).
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal("").transform(() => undefined)),
  preferredTime: z.string().max(80).optional().or(z.literal("").transform(() => undefined)),
  courseSlug: z.string().optional(),
  countrySlug: z.string().optional(),
  citySlug: z.string().optional(),
  source: z.string().optional(),
  consentMarketing: z.union([z.boolean(), z.string()]).optional(),
  utm: Utm.optional(),
  brochureCourseSlug: z.string().optional(),
  // honeypot — bots tend to fill all fields
  company_website: z.string().max(0).optional().or(z.literal("").transform(() => undefined)),
});

function getClientIp(req: Request) {
  const h = req.headers;
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    h.get("cf-connecting-ip") ||
    "unknown"
  );
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const ua = req.headers.get("user-agent") || "";

  // Rate-limit: 5 submissions per minute per IP
  const rl = rateLimit(`lead:${ip}`, 5, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again in a minute." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(rl.retryAfter / 1000)) } }
    );
  }

  let payload: any;
  try { payload = await req.json(); }
  catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  // Honeypot: if filled, silently succeed (bots don't get error feedback)
  if (typeof payload?.company_website === "string" && payload.company_website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const parsed = LeadSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const consent = data.consentMarketing === true || data.consentMarketing === "on" || data.consentMarketing === "true";

  // ponytail: slot lives in message, no Lead column — admin reads it in the lead
  // detail view; add real columns if slots ever need querying/reminders.
  const message = data.preferredDate && data.preferredTime
    ? [`Preferred consultation: ${data.preferredDate} at ${data.preferredTime}`, data.message].filter(Boolean).join("\n\n")
    : data.message;

  let savedLead: any = null;
  try {
    if (process.env.DATABASE_URL) {
      const { prisma } = await import("@/lib/prisma");
      savedLead = await prisma.lead.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          countryCode: data.countryCode,
          message,
          courseSlug: data.courseSlug,
          countrySlug: data.countrySlug,
          citySlug: data.citySlug,
          source: data.source,
          consentMarketing: consent,
          utm: data.utm as any,
          brochureCourseSlug: data.brochureCourseSlug,
          ipAddress: ip,
          userAgent: ua.slice(0, 500),
        },
      });
    } else {
      console.log("[lead] (no DB)", { ...data, consentMarketing: consent, ip });
    }
  } catch (e: any) {
    console.error("[lead] write failed", e);
    return NextResponse.json({ error: "Could not save lead" }, { status: 500 });
  }

  // Brochure flow: return brochure URL if requested
  let brochureUrl: string | null = null;
  if (data.brochureCourseSlug && process.env.DATABASE_URL) {
    try {
      const { prisma } = await import("@/lib/prisma");
      const c = await prisma.course.findUnique({ where: { slug: data.brochureCourseSlug }, select: { brochureUrl: true } });
      brochureUrl = c?.brochureUrl ?? null;
    } catch { /* ignore */ }
  }

  // Fire-and-forget emails (don't block response)
  if (savedLead) {
    notifyAdminOfLead(savedLead).catch((e) => console.error("[email] admin notify failed", e));
    autoReplyToLead(savedLead).catch((e) => console.error("[email] auto-reply failed", e));
  }

  return NextResponse.json({ ok: true, brochureUrl });
}
