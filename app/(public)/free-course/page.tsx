import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ChevronRight, PlayCircle, BookOpen, Clock, Star, Gift, Users } from "lucide-react";
import { FaqAccordion } from "@/components/faq-accordion";
import { DynamicIcon } from "@/components/public/dynamic-icon";
import { getPageContent } from "@/lib/page-content";

const SLUG = "free-course";
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent(SLUG);
  return { title: c.metaTitle, description: c.metaDescription };
}

export default async function FreeCoursePage() {
  const c = await getPageContent(SLUG);
  const BENEFITS = c.benefits as any[];
  const FREE_COURSES = c.freeCourses as any[];
  const PRACTICE_TESTS = c.practiceTests as any[];
  const WEBINARS = c.webinars as any[];
  const FAQS = c.faqs as any[];
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-[#0f6b6b] text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-dots text-white opacity-20"></div>
        <div className="container-tight relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold">{c.heroBadge}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl">
            {c.heroHeading} <span className="text-yellow-400">{c.heroHighlight}</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mb-10 leading-relaxed">
            {c.heroSubtitle}
          </p>
          <a href="#courses" className="btn bg-white text-primary hover:bg-white/90 shadow-lg px-8 py-4 text-lg font-bold">
            {c.heroCtaText}
            <ChevronRight className="w-5 h-5 ml-1" />
          </a>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-ink-50">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="h2 mb-4">{c.benefitsTitle}</h2>
            <p className="lead max-w-2xl mx-auto">
              {c.benefitsSubtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b, i) => (
              <div key={i} className="card p-6 bg-white hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6">
                  <DynamicIcon name={b.icon} className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-3">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Courses Section */}
      <section id="courses" className="section bg-white">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="h2 mb-4">{c.coursesTitle}</h2>
            <p className="lead">{c.coursesSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FREE_COURSES.map((course, i) => (
              <div key={i} className="card bg-white border border-border/50 overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-primary mb-4 bg-secondary w-fit px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Completion Certificate
                  </div>
                  <h3 className="font-bold text-xl mb-4 line-clamp-2 h-14 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <div className="flex items-center justify-between mt-8 border-t border-border pt-4">
                    <Link href="/enquire" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                      View Course
                    </Link>
                    <Link href="/enquire" className="text-sm font-bold text-primary bg-secondary px-4 py-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors">
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Practice Tests Section */}
      <section className="section bg-ink-50">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="h2 mb-4">{c.practiceTestsTitle}</h2>
            <p className="lead">{c.practiceTestsSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {PRACTICE_TESTS.map((test, i) => (
              <div key={i} className="card p-6 bg-white flex flex-col md:flex-row gap-6 items-center justify-between group hover:border-primary/30">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">Free</span>
                    <span className="text-xs font-semibold flex items-center gap-1 text-muted-foreground">
                      <Users className="w-3.5 h-3.5" /> {test.users} Users
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">{test.title}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {test.tests} Free Tests</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {test.hours} Hr</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> {test.questions} Questions</span>
                  </div>
                </div>
                <div className="w-full md:w-auto shrink-0">
                  <Link href="/enquire" className="btn-primary w-full shadow-sm">
                    Start Test
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Refer & Earn Banner */}
      <section className="py-12 bg-white">
        <div className="container-tight">
          <div className="bg-foreground text-background rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{c.referTitle}</h2>
              <p className="text-lg text-background/80 mb-8">
                {c.referSubtitle}
              </p>
              <Link href="/enquire" className="btn bg-accent text-accent-foreground hover:opacity-90">
                {c.referButton}
              </Link>
            </div>
            <div className="relative z-10 hidden md:flex shrink-0">
              <div className="w-40 h-40 bg-gradient-to-tr from-primary to-accent rounded-full opacity-80 flex items-center justify-center">
                 <Gift className="w-20 h-20 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Webinars Section */}
      <section className="section bg-ink-50">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="h2 mb-4">{c.webinarsTitle}</h2>
            <p className="lead">{c.webinarsSubtitle}</p>
          </div>
          <div className="flex flex-col gap-4 max-w-4xl mx-auto">
            {WEBINARS.map((webinar, i) => (
              <div key={i} className="card p-5 bg-white flex flex-col md:flex-row gap-5 items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">Free</span>
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">{webinar.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1 font-semibold text-primary"><PlayCircle className="w-4 h-4" /> {webinar.instructor}</span>
                    <span>{webinar.date}</span>
                    <span>{webinar.time}</span>
                    <span>{webinar.duration}</span>
                  </div>
                </div>
                <div className="w-full md:w-auto shrink-0">
                  <Link href={`/webinars`} className="btn-outline w-full px-8">
                    View Webinar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-white">
        <div className="container-tight max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="h2 mb-4">{c.faqTitle}</h2>
            <p className="lead">{c.faqSubtitle}</p>
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

    </main>
  );
}
