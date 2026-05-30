// Provider-agnostic email service.
// Uses Resend (https://resend.com) if RESEND_API_KEY is set; otherwise logs to console.
// To switch providers later, replace the body of sendMail().

import { getSiteSettings } from "./site-content";

export type SendMailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  from?: string;
};

export async function sendMail(input: SendMailInput): Promise<{ ok: boolean; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddr = input.from || process.env.EMAIL_FROM || "Ulearnsystems <onboarding@resend.dev>";
  if (!apiKey) {
    console.log("\n[email:fallback] (set RESEND_API_KEY to actually send)");
    console.log("  from:    ", fromAddr);
    console.log("  to:      ", input.to);
    console.log("  subject: ", input.subject);
    console.log("  preview: ", (input.text || input.html).slice(0, 280).replace(/\s+/g, " "));
    return { ok: true, id: "console" };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: fromAddr,
        to: Array.isArray(input.to) ? input.to : [input.to],
        subject: input.subject,
        html: input.html,
        text: input.text,
        reply_to: input.replyTo,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("[email] resend failed", res.status, err);
      return { ok: false, error: err };
    }
    const json = await res.json();
    return { ok: true, id: json.id };
  } catch (e: any) {
    console.error("[email] error", e);
    return { ok: false, error: String(e?.message || e) };
  }
}

// ============== TEMPLATES ==============
function brandLayout(s: any, body: string) {
  return `
  <div style="font-family:Inter,system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;background:#fff;color:#1f2937;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
    <div style="background:linear-gradient(135deg,#192c73,#1a36b8);color:#fff;padding:20px 24px">
      <div style="font-size:20px;font-weight:700">${s.brandName}</div>
      <div style="font-size:11px;letter-spacing:.1em;color:#bcd1ff;text-transform:uppercase">${s.tagline}</div>
    </div>
    <div style="padding:24px;line-height:1.6;font-size:14px">${body}</div>
    <div style="padding:14px 24px;border-top:1px solid #e5e7eb;background:#f9fafb;font-size:11px;color:#6b7280">
      ${s.address ? s.address + " · " : ""}${s.phone ? s.phone + " · " : ""}${s.email || ""}
    </div>
  </div>`;
}

// Send admin notification via FormSubmit (https://formsubmit.co).
// First submission to a new address triggers an activation email — click the link, future
// submissions then flow through. No API key required. Free for unlimited form submissions.
export async function sendViaFormSubmit(toEmail: string, lead: any, siteName: string): Promise<{ ok: boolean; error?: string }> {
  if (!toEmail) return { ok: false, error: "No recipient email configured" };
  const utm = (lead.utm as any) || {};
  const payload: Record<string, string> = {
    _subject: `New lead: ${lead.name}${lead.courseSlug ? ` · ${lead.courseSlug}` : ""}`,
    _template: "table",
    _captcha: "false",
    _replyto: lead.email,
    Name: lead.name,
    Email: lead.email,
    Phone: `${lead.countryCode || ""} ${lead.phone}`.trim(),
    Course: lead.courseSlug || "General Enquiry",
    Location: [lead.citySlug, lead.countrySlug].filter(Boolean).join(", ") || "—",
    Source: lead.source || "—",
    "UTM source": utm.source || "—",
    "UTM medium": utm.medium || "—",
    "UTM campaign": utm.campaign || "—",
    "Landing page": utm.landingPath || "—",
    Referrer: utm.referrer || "—",
    Message: lead.message || "—",
    "Admin link": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/leads/${lead.id}`,
    "Submitted via": siteName,
  };
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(toEmail)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    if (!res.ok) {
      console.error("[formsubmit] failed", res.status, text);
      return { ok: false, error: `FormSubmit ${res.status}: ${text}` };
    }
    return { ok: true };
  } catch (e: any) {
    console.error("[formsubmit] error", e);
    return { ok: false, error: String(e?.message || e) };
  }
}

export async function notifyAdminOfLead(lead: any) {
  const s = await getSiteSettings();
  const utm = (lead.utm as any) || {};
  const adminEmail = process.env.LEADS_NOTIFICATION_EMAIL || s.email;

  // Provider selection:
  // 1. RESEND_API_KEY set → Resend
  // 2. else FORMSUBMIT_ENABLED=true → FormSubmit
  // 3. else console fallback
  if (process.env.FORMSUBMIT_ENABLED === "true" && !process.env.RESEND_API_KEY) {
    return sendViaFormSubmit(adminEmail, lead, s.brandName);
  }

  const body = `
    <h2 style="margin:0 0 12px;color:#192c73">New lead just came in</h2>
    <table style="width:100%;border-collapse:collapse">
      ${row("Name", lead.name)}
      ${row("Email", `<a href="mailto:${lead.email}">${lead.email}</a>`)}
      ${row("Phone", `<a href="tel:${lead.phone}">${lead.phone}</a>`)}
      ${row("Course", lead.courseSlug || "General Enquiry")}
      ${row("Location", [lead.citySlug, lead.countrySlug].filter(Boolean).join(", ") || "—")}
      ${row("Source", lead.source || "—")}
      ${row("UTM source", utm.source || "—")}
      ${row("UTM medium", utm.medium || "—")}
      ${row("UTM campaign", utm.campaign || "—")}
      ${row("Landing page", utm.landingPath || "—")}
      ${row("Referrer", utm.referrer || "—")}
      ${lead.message ? row("Message", `<div style="white-space:pre-wrap">${escapeHtml(lead.message)}</div>`) : ""}
    </table>
    <div style="margin-top:18px"><a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/leads/${lead.id}" style="display:inline-block;background:#1f44e6;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600">Open in Admin →</a></div>
  `;
  return sendMail({
    to: adminEmail,
    subject: `New lead: ${lead.name}${lead.courseSlug ? ` · ${lead.courseSlug}` : ""}`,
    html: brandLayout(s, body),
    text: `New lead: ${lead.name} — ${lead.email} — ${lead.phone}\nCourse: ${lead.courseSlug || "General Enquiry"}\nSource: ${lead.source || "—"}\n${lead.message || ""}`,
    replyTo: lead.email,
  });
}

export async function autoReplyToLead(lead: any) {
  const s = await getSiteSettings();
  const body = `
    <p>Hi ${escapeHtml(lead.name.split(" ")[0] || lead.name)},</p>
    <p>Thanks for reaching out to <strong>${s.brandName}</strong>. We&rsquo;ve received your enquiry${lead.courseSlug ? ` about <strong>${lead.courseSlug}</strong>` : ""}, and a training advisor will get back to you shortly — typically within one business hour.</p>
    <p>While you wait:</p>
    <ul>
      <li>Browse our full <a href="${process.env.NEXT_PUBLIC_SITE_URL || "#"}/courses">course catalog</a></li>
      <li>Compare <a href="${process.env.NEXT_PUBLIC_SITE_URL || "#"}/compare">two courses side-by-side</a></li>
      <li>Read about our <a href="${process.env.NEXT_PUBLIC_SITE_URL || "#"}/trainers">accredited trainers</a></li>
    </ul>
    ${s.whatsappNumber ? `<p>Need an instant response? <a href="https://wa.me/${s.whatsappNumber}">Chat with us on WhatsApp</a>.</p>` : ""}
    <p>Talk soon,<br/>The ${s.brandName} team</p>
  `;
  return sendMail({
    to: lead.email,
    subject: `We received your enquiry · ${s.brandName}`,
    html: brandLayout(s, body),
    text: `Hi ${lead.name},\n\nThanks for reaching out to ${s.brandName}. We received your enquiry${lead.courseSlug ? ` about ${lead.courseSlug}` : ""}. A training advisor will get back to you shortly.\n\n— The ${s.brandName} team`,
    replyTo: s.email,
  });
}

function row(label: string, value: string) {
  return `<tr><td style="padding:6px 0;color:#6b7280;font-size:12px;width:130px">${label}</td><td style="padding:6px 0;font-weight:500">${value}</td></tr>`;
}
function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
