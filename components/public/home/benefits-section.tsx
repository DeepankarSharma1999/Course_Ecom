import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, CheckCircle2, GraduationCap, type LucideIcon } from "lucide-react";

const individualBenefits = [
  "Expert-led professional training",
  "Globally recognised certifications",
  "Flexible schedules and resources",
  "Exam-focused support",
];

const corporateBenefits = [
  "Customised team learning plans",
  "Scalable enterprise delivery",
  "Role-specific course content",
  "Training impact visibility",
];

export function BenefitsSection() {
  return (
    <section className="section bg-white font-sans">
      <div className="container-tight">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="section-eyebrow mb-3">Choose Your Path</div>
          <h2 className="h2">Learning experiences for individuals and organisations</h2>
          <p className="lead mt-4">
            Select the path that matches your goals, whether you are advancing your career or building capability across a team.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <AudienceCard
            icon={GraduationCap}
            title="For Individuals"
            text="Build confidence for your next role with live cohorts, practical sessions, and certification guidance."
            benefits={individualBenefits}
            href="/courses"
            cta="Explore Courses"
          />
          <AudienceCard
            icon={BriefcaseBusiness}
            title="For Organisations"
            text="Upskill teams with structured learning paths, custom delivery, and programs aligned to business outcomes."
            benefits={corporateBenefits}
            href="/corporate"
            cta="Train Your Team"
            dark
          />
        </div>
      </div>
    </section>
  );
}

function AudienceCard({
  icon: Icon,
  title,
  text,
  benefits,
  href,
  cta,
  dark = false,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  benefits: string[];
  href: string;
  cta: string;
  dark?: boolean;
}) {
  return (
    <article className={`rounded-3xl border p-7 md:p-8 ${dark ? "border-[#082032] bg-[#082032] text-white" : "border-[#082032]/10 bg-white text-[#082032] shadow-[0_8px_24px_rgba(8,32,50,0.05)]"}`}>
      <div className={`mb-6 grid h-14 w-14 place-items-center rounded-2xl ${dark ? "bg-primary text-white" : "bg-secondary text-primary"}`}>
        <Icon className="h-7 w-7" />
      </div>
      <h3 className={`text-2xl font-black ${dark ? "text-white" : "text-[#082032]"}`}>{title}</h3>
      <p className={`mt-3 max-w-lg leading-7 ${dark ? "text-white/70" : "text-muted-foreground"}`}>{text}</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {benefits.map((benefit) => (
          <li key={benefit} className={`flex gap-2 text-sm font-semibold ${dark ? "text-white/82" : "text-muted-foreground"}`}>
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {benefit}
          </li>
        ))}
      </ul>
      <Link href={href} className={dark ? "btn-primary mt-8" : "btn-outline mt-8"}>
        {cta} <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
