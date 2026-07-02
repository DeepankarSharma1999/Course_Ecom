import { redirect } from "next/navigation";
import { getCurrentLearner } from "@/lib/learner-auth";
import { getGlobalFaqs, getSiteSettings } from "@/lib/site-content";
import { LeadForm } from "@/components/lead-form";
import { FaqAccordion } from "@/components/faq-accordion";
import { Phone, Mail, MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SupportPage() {
  const learner = await getCurrentLearner();
  if (!learner) redirect("/");

  const [faqs, settings] = await Promise.all([getGlobalFaqs(), getSiteSettings()]);

  const channels = [
    settings.phone && { icon: Phone, label: "Call us", value: settings.phone, href: `tel:${settings.phone.replace(/\s+/g, "")}` },
    settings.email && { icon: Mail, label: "Email", value: settings.email, href: `mailto:${settings.email}` },
    settings.whatsappNumber && { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}` },
  ].filter(Boolean) as { icon: any; label: string; value: string; href: string }[];

  return (
    <div className="p-8 max-w-[1100px] mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-ink-900 mb-1">Help & Support</h1>
        <p className="text-ink-500 text-[14px]">Answers to common questions, or reach the team directly.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {channels.map((c) => (
          <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
            className="bg-white rounded-2xl border border-ink-100 p-5 shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <c.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-[12px] font-bold uppercase tracking-wide text-ink-400">{c.label}</div>
              <div className="font-bold text-ink-900 text-[14px]">{c.value}</div>
            </div>
          </a>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white rounded-2xl border border-ink-100 p-6 shadow-sm">
          <h2 className="font-bold text-ink-900 text-[16px] mb-4">Frequently asked questions</h2>
          <FaqAccordion items={faqs} />
        </div>

        <LeadForm
          variant="card"
          source="learner-support"
          title="Raise a support request"
          subtitle="Describe your issue and our team will get back to you within 1 business day."
          ctaLabel="Submit Request"
        />
      </div>
    </div>
  );
}
