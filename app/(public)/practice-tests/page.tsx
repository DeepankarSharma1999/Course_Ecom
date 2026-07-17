import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Users, Star, Quote } from "lucide-react";
import { DynamicIcon } from "@/components/public/dynamic-icon";
import { getPageContent } from "@/lib/page-content";

const SLUG = "practice-tests";
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent(SLUG);
  return { title: c.metaTitle, description: c.metaDescription, alternates: { canonical: "/practice-tests" } };
}

export default async function PracticeTestsPage() {
  const c = await getPageContent(SLUG);
  const FEATURES = c.features as any[];
  const TESTS = c.tests as any[];
  const REVIEWS = c.reviews as any[];
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-[#0f6b6b] text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-dots text-white opacity-20"></div>
        <div className="container-tight relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold">{c.heroBadge}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              {c.heroHeading} <br /> <span className="text-yellow-400">{c.heroHighlight}</span>
            </h1>
            <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed max-w-xl">
              {c.heroSubtitle}
            </p>

            <ul className="space-y-4 mb-10 text-primary-foreground/90">
              {(c.heroBullets as string[]).map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0 opacity-80" />
                  <span className="font-medium text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <a href="#tests" className="btn bg-white text-primary hover:bg-white/90 rounded-full px-8 py-3 text-lg font-bold inline-flex items-center transition-colors shadow-lg">
              {c.heroCtaText}
              <ChevronRight className="w-5 h-5 ml-2" />
            </a>
          </div>
          <div className="hidden lg:block relative">
            <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-2xl max-w-lg mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl text-white">Recent Results</h3>
                <span className="text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full">This Week</span>
              </div>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-5 border border-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-semibold text-white">Certified Scrum Master (CSM)</div>
                    <div className="text-green-400 font-bold bg-green-400/10 px-2 py-0.5 rounded text-sm">Pass</div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-primary-foreground/80">
                    <span>Score: 92%</span>
                    <span>45/50 Correct</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 mt-3 overflow-hidden">
                    <div className="bg-green-400 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-xl p-5 border border-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-semibold text-white">AWS Solutions Architect</div>
                    <div className="text-yellow-400 font-bold bg-yellow-400/10 px-2 py-0.5 rounded text-sm">Review</div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-primary-foreground/80">
                    <span>Score: 78%</span>
                    <span>Weak Area: Security</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 mt-3 overflow-hidden">
                    <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section bg-white border-b border-ink-100">
        <div className="container-tight">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, i) => (
              <div key={i} className="group p-6 rounded-2xl hover:bg-ink-50 transition-colors">
                <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <DynamicIcon name={feature.icon} className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-ink-900 mb-2">{feature.title}</h3>
                <p className="text-ink-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Tests Section */}
      <section id="tests" className="section bg-ink-50">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="h2 mb-4">{c.testsTitle}</h2>
            <p className="lead max-w-2xl mx-auto">
              {c.testsSubtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {TESTS.map((test, i) => (
              <div key={i} className="card p-6 bg-white flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between group hover:border-brand-500 hover:shadow-card-md transition-all">
                <div className="flex-1 w-full">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    {test.tests > 0 ? (
                      <span className="bg-brand-100 text-brand-700 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                        {test.tests} Free Tests
                      </span>
                    ) : (
                      <span className="bg-ink-100 text-ink-700 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                        Coming Soon
                      </span>
                    )}
                    {test.users && (
                      <span className="text-xs font-semibold flex items-center gap-1.5 text-ink-500 bg-ink-50 px-2.5 py-1 rounded-md">
                        <Users className="w-3.5 h-3.5" /> {test.users} Users
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-ink-900 mb-1 group-hover:text-brand-600 transition-colors line-clamp-2">
                    {test.title}
                  </h3>
                </div>
                <div className="w-full sm:w-auto shrink-0 mt-4 sm:mt-0">
                  {test.isRequest ? (
                    <Link href="#request-test" className="btn-outline w-full sm:w-auto px-6 whitespace-nowrap">
                      Request Test
                    </Link>
                  ) : (
                    <Link href="/enquire" className="btn-primary w-full sm:w-auto px-6 whitespace-nowrap shadow-sm hover:shadow">
                      Start Now
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section — renders only admin-entered reviews (FIX-02) */}
      {REVIEWS.length > 0 && (
      <section className="section bg-white overflow-hidden">
        <div className="container-tight relative">
          <div className="absolute top-0 left-0 text-ink-100/50 transform -translate-x-8 -translate-y-8 z-0">
            <Quote className="w-32 h-32" />
          </div>
          
          <div className="text-center mb-16 relative z-10">
            <h2 className="h2 mb-4">{c.reviewsTitle}</h2>
            <p className="lead">{c.reviewsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {REVIEWS.map((review, i) => (
              <div key={i} className="bg-white border border-ink-100 rounded-2xl p-8 shadow-card-sm flex flex-col">
                <div className="flex gap-1 text-yellow-400 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-ink-700 leading-relaxed mb-8 flex-1 italic">
                  &quot;{review.text}&quot;
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xl uppercase shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-ink-900">{review.name}</div>
                    <div className="text-xs text-ink-500 font-medium">{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

    </main>
  );
}
