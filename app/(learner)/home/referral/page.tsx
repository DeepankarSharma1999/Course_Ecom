import { redirect } from "next/navigation";
import { getCurrentLearner } from "@/lib/learner-auth";
import { SITE } from "@/lib/utils";
import { ReferralLinkCard } from "@/components/learner/referral-link-card";
import { Users, Share2, Gift } from "lucide-react";

export const dynamic = "force-dynamic";

const STEPS = [
  { icon: Share2, title: "Share your link", body: "Send your personal referral link to friends and colleagues over WhatsApp, email or social media." },
  { icon: Users, title: "They enroll", body: "Your friend picks any certification course and enrolls using your link." },
  { icon: Gift, title: "You both earn", body: "You earn a referral reward and your friend gets a discount on their first course." },
];

export default async function ReferralPage() {
  const learner = await getCurrentLearner();
  if (!learner) redirect("/");

  const referralLink = `${SITE.url}/?ref=${learner.sub}`;

  return (
    <div className="p-8 max-w-[1000px] mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-ink-900 mb-1">Refer & Earn</h1>
        <p className="text-ink-500 text-[14px]">Share SimpliLEAD with your network — you earn rewards, they get discounts.</p>
      </div>

      <ReferralLinkCard link={referralLink} learnerName={learner.name || "there"} />

      <section className="grid md:grid-cols-3 gap-6">
        {STEPS.map((s, i) => (
          <div key={s.title} className="bg-white rounded-2xl border border-ink-100 p-6 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <s.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-1">Step {i + 1}</div>
            <h3 className="font-bold text-ink-900 text-[15px] mb-1.5">{s.title}</h3>
            <p className="text-[13px] text-ink-500 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </section>

      <p className="text-xs text-ink-400">
        Referral rewards are confirmed once your friend completes an enrollment. Questions? Reach us via <a href="/home/support" className="text-primary hover:underline">Help & Support</a>.
      </p>
    </div>
  );
}
