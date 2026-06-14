import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ChevronRight, BookOpen, Clock, Users, PlayCircle, Star, Quote, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Online Practice Tests | ULearnSystems",
  description: "Free, up-to-date IT practice tests to help you learn faster, spot weak areas, and pass your certification exams with confidence.",
};

const FEATURES = [
  {
    icon: <PlayCircle className="w-6 h-6 text-primary" />,
    title: "Focused Learning Journey",
    desc: "Tailored paths to help you concentrate on what truly matters for your exam.",
  },
  {
    icon: <Award className="w-6 h-6 text-primary" />,
    title: "Boost Exam Confidence",
    desc: "Practice regularly to reduce anxiety and feel ready for the real certification test.",
  },
  {
    icon: <Clock className="w-6 h-6 text-primary" />,
    title: "Study Anytime",
    desc: "Access tests online, 24/7, from any device. Fit studying into your busy schedule seamlessly.",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-primary" />,
    title: "Self-Paced Learning",
    desc: "Learn at your own speed, anytime, anywhere. Review explanations to deepen your understanding.",
  },
];

const TESTS = [
  {
    title: "Certified Scrum Master (CSM) Practice Test",
    slug: "csm",
    tests: 3,
    users: "73k+"
  },
  {
    title: "Leading SAFe Practice Test | SAFe Agilist Mock Test",
    slug: "leading-safe",
    tests: 4,
    users: "9K+"
  },
  {
    title: "ITIL Practice Test: Ace Your Certification",
    slug: "itil",
    tests: 5,
    users: "5K+"
  },
  {
    title: "PMP Practice Test | Project Management Mock Test",
    slug: "pmp",
    tests: 38,
    users: "30K+"
  },
  {
    title: "Free SAFe® Scrum Master (SSM) Practice Test",
    slug: "safe-scrum-master",
    tests: 4,
    users: "8K+"
  },
  {
    title: "DevOps Practice Test: Prepare Efficiently",
    slug: "devops",
    tests: 0,
    users: "3K+",
    isRequest: true
  }
];

const REVIEWS = [
  {
    name: "Daniel Harper",
    role: "Product Manager",
    company: "Simpliaxis Inc",
    text: "Outstanding training from ULearnSystems! The curriculum on multi-agent architectures and RAG pipeline development was thorough and current. Real-world use cases across industries gave me the confidence to lead AI initiatives at my organization immediately.",
  },
  {
    name: "Sarah Mitchell",
    role: "Cloud AI Architect",
    company: "Simpliaxis Inc",
    text: "I enrolled in this course to upskill as a software architect, and ULearnSystems exceeded my expectations. The MCP server integration labs and API demos were practical and industry-relevant. The trainer's mentorship made complex concepts easy to grasp.",
  },
  {
    name: "Arjun Krishnamurthy",
    role: "AI/ML Engineer",
    company: "Simpliaxis Inc",
    text: "ULearnSystems delivered exceptional value through this Agentic AI Engineering course. Building autonomous agents with the SDK, integrating MCP servers, and deploying on cloud platforms gave me skills that no other training provided.",
  }
];

export default function PracticeTestsPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-[#0f6b6b] text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/frontend_assets/image/homban-dots.webp')] opacity-20 bg-repeat"></div>
        <div className="container-tight relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold">Rated 4.9/5 by Professionals</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Master Your <br /> <span className="text-yellow-400">Certifications</span>
            </h1>
            <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed max-w-xl">
              Free, up-to-date IT practice tests to help you learn faster, spot weak areas, and pass with confidence.
            </p>
            
            <ul className="space-y-4 mb-10 text-primary-foreground/90">
              {[
                "Boost Your Confidence with Practice Test",
                "Expert-Curated Content for Reliable Learning",
                "Detailed Explanations for Better Understanding",
                "Immediate Result after Test",
                "Comprehensive Question Bank explanation for Preparation"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0 opacity-80" />
                  <span className="font-medium text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <a href="#tests" className="btn bg-white text-primary hover:bg-white/90 rounded-full px-8 py-3 text-lg font-bold inline-flex items-center transition-colors shadow-lg">
              Get Started Now
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
                  {feature.icon}
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
            <h2 className="h2 mb-4">Choose Your Practice Test</h2>
            <p className="lead max-w-2xl mx-auto">
              Simulate the real exam environment with our expert-crafted tests. Get detailed explanations for every question.
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
                    <span className="text-xs font-semibold flex items-center gap-1.5 text-ink-500 bg-ink-50 px-2.5 py-1 rounded-md">
                      <Users className="w-3.5 h-3.5" /> {test.users} Users
                    </span>
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

      {/* Testimonials Section */}
      <section className="section bg-white overflow-hidden">
        <div className="container-tight relative">
          <div className="absolute top-0 left-0 text-ink-100/50 transform -translate-x-8 -translate-y-8 z-0">
            <Quote className="w-32 h-32" />
          </div>
          
          <div className="text-center mb-16 relative z-10">
            <h2 className="h2 mb-4">What Our Learners Say</h2>
            <p className="lead">Join thousands of professionals who have advanced their careers with ULearnSystems.</p>
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
      
    </main>
  );
}
