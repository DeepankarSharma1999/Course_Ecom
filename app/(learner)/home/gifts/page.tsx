import { redirect } from "next/navigation";
import { getCurrentLearner } from "@/lib/learner-auth";
import { LeadForm } from "@/components/lead-form";
import { Gift, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

const AMOUNTS = ["$100", "$250", "$500", "Custom amount"];
const PERKS = [
  "Redeemable against any certification course",
  "Delivered by email with a personal message",
  "Valid for 12 months from purchase",
  "Our team confirms details and payment by email within 1 business day",
];

export default async function GiftCardPage() {
  const learner = await getCurrentLearner();
  if (!learner) redirect("/");

  return (
    <div className="p-8 max-w-[1100px] mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-ink-900 mb-1">Gift Cards</h1>
        <p className="text-ink-500 text-[14px]">Gift world-class certification training to a friend, colleague or team.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="bg-gradient-to-br from-primary to-[#0f6b6b] rounded-2xl p-8 text-white shadow-md">
          <div className="flex items-center gap-2 font-bold text-[13px] uppercase tracking-wider mb-3 text-white/80">
            <Gift className="w-4 h-4" /> ULearnSystems Gift Card
          </div>
          <h2 className="text-[24px] font-extrabold leading-tight mb-4">A smarter way to gift learning</h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {AMOUNTS.map((a) => (
              <span key={a} className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-[13px] font-bold">{a}</span>
            ))}
          </div>
          <ul className="space-y-3">
            {PERKS.map((p) => (
              <li key={p} className="flex gap-2.5 text-[14px] text-white/90">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-300" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <LeadForm
          variant="card"
          source="learner-gift-card"
          title="Request a gift card"
          subtitle="Tell us the amount and who it's for — we'll email you the gift card and payment details."
          ctaLabel="Request Gift Card"
        />
      </div>
    </div>
  );
}
