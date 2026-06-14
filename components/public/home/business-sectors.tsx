import Link from "next/link";
import { ArrowRight, Heart, Target, Trophy } from "lucide-react";

const benefits = [
  {
    icon: Trophy,
    title: "Certification credibility",
    text: "Programs aligned to recognised frameworks and practitioner-led delivery.",
  },
  {
    icon: Heart,
    title: "Career-centred learning",
    text: "Training experiences designed around practical application and long-term growth.",
  },
  {
    icon: Target,
    title: "Outcome-focused paths",
    text: "Clear learning journeys for individuals, teams, and enterprise transformation.",
  },
];

export function BusinessSectors() {
  return (
    <section className="section bg-[#E9F4F4] font-sans">
      <div className="container-tight">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-[#082032]/10 bg-white shadow-[0_14px_40px_rgba(8,32,50,0.08)]">
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200"
                alt="Professionals collaborating in a training workshop"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-6 max-w-[260px] rounded-2xl bg-primary p-5 text-white shadow-[0_16px_45px_rgba(31,168,168,0.25)]">
              <div className="text-4xl font-black leading-none">25+</div>
              <div className="mt-2 text-sm font-bold leading-5 text-white/90">Years of learning expertise</div>
            </div>
          </div>

          <div>
            <div className="section-eyebrow mb-3">Professional Outcomes</div>
            <h2 className="h2">We build competitive global professionals</h2>
            <p className="lead mt-5">
              ULearnSystems helps professionals and organisations bridge the gap between knowledge, certification, and real workplace execution.
            </p>

            <div className="mt-8 space-y-4">
              {benefits.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4 rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(8,32,50,0.05)]">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-[#082032]">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link href="/about" className="btn-outline mt-8">
              More About Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
