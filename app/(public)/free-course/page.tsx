import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ChevronRight, PlayCircle, BookOpen, Clock, Star, Gift, MonitorPlay, Users } from "lucide-react";
import { FaqAccordion } from "@/components/faq-accordion";

export const metadata: Metadata = {
  title: "Free Courses | ULearnSystems",
  description: "Level Up Your Career with Free Online Courses from ULearnSystems. Explore handpicked, high-impact courses designed for professionals and beginners alike.",
};

const BENEFITS = [
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "Learn from Certified Experts",
    desc: "Our free courses are crafted by seasoned instructors and experts who bring real-world insights to every lesson.",
  },
  {
    icon: <MonitorPlay className="w-6 h-6 text-primary" />,
    title: "Skill-Focused Learning",
    desc: "Focus on hands-on, outcome-driven learning in areas like Agile, Scrum, Project Management, and Digital Transformation.",
  },
  {
    icon: <Gift className="w-6 h-6 text-primary" />,
    title: "Zero-Cost Learning Tools",
    desc: "Gain access to free downloadable toolkits, career maps, and expert tips—no strings attached.",
  },
  {
    icon: <Clock className="w-6 h-6 text-primary" />,
    title: "Study on Your Schedule",
    desc: "Study at your own pace—on desktop or mobile—anytime, anywhere in the world.",
  },
];

const FREE_COURSES = [
  {
    title: "Change Management",
    slug: "change-management",
  },
  {
    title: "Cryptocurrency Investing Master Class Course",
    slug: "cryptocurrency-investing-master-class-course",
  },
  {
    title: "Agile Leadership Bootcamp",
    slug: "agile-leadership-bootcamp",
  },
  {
    title: "AI for Scrum Developers",
    slug: "ai-for-scrum-developers",
  },
  {
    title: "Design Thinking Basics",
    slug: "design-thinking-basics",
  },
  {
    title: "Project Management Fundamentals",
    slug: "project-management-fundamentals",
  }
];

const PRACTICE_TESTS = [
  {
    title: "Certified Scrum Master (CSM) Practice Test",
    slug: "csm",
    tests: 3,
    hours: 3,
    questions: 150,
    marks: 150,
    users: "73k+"
  },
  {
    title: "Leading SAFe Practice Test | SAFe Agilist Mock Test",
    slug: "leading-safe",
    tests: 4,
    hours: 6,
    questions: 180,
    marks: 180,
    users: "9K+"
  },
  {
    title: "ITIL Practice Test: Ace Your Certification",
    slug: "itil",
    tests: 5,
    hours: 5,
    questions: 200,
    marks: 200,
    users: "5K+"
  },
  {
    title: "DevOps Practice Test: Prepare Efficiently",
    slug: "devops",
    tests: 3,
    hours: 4,
    questions: 120,
    marks: 120,
    users: "3K+"
  }
];

const WEBINARS = [
  {
    title: "Agile Leadership Bootcamp: Leading in the AI Era",
    date: "Jun 13, 2026",
    time: "06:30 pm - 07:30 pm (IST)",
    instructor: "Raquel Silva",
    duration: "60 minutes"
  },
  {
    title: "Become a Certified SAFe® Agilist — and Lead with Confidence",
    date: "Jun 16, 2026",
    time: "09:00 AM - 10:00 am (IST)",
    instructor: "Keith Erik Wilson",
    duration: "60 minutes"
  },
  {
    title: "AI for Scrum Developers: Tools & Real-World Use Cases",
    date: "Jun 23, 2026",
    time: "06:30 pm - 07:30 pm (IST)",
    instructor: "Axel Berle",
    duration: "60 minutes"
  }
];

const FAQS = [
  {
    q: "What are the requirements to enroll in a free course?",
    a: "There are no special requirements. Anyone can enroll and start learning instantly without any prerequisites."
  },
  {
    q: "Do I need to create an account to access free courses?",
    a: "Yes, you need to create a free account to track your progress and access the course materials."
  },
  {
    q: "How do I sign up for a free course?",
    a: "Simply click on 'Enroll Now' on any of the course cards, create an account, and you will get instant access."
  },
  {
    q: "Will I get a certificate upon completion?",
    a: "Yes, all our free courses come with a verifiable Completion Certificate that you can share on your LinkedIn profile."
  }
];

export default function FreeCoursePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-[#0f6b6b] text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/frontend_assets/image/homban-dots.webp')] opacity-20 bg-repeat"></div>
        <div className="container-tight relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold">10K+ Reviews from Learners Worldwide</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl">
            Level Up Your Career with <span className="text-yellow-400">Free Online Courses</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mb-10 leading-relaxed">
            Explore handpicked, high-impact courses designed for professionals and beginners alike—completely free and fully online.
          </p>
          <a href="#courses" className="btn bg-white text-primary hover:bg-white/90 shadow-lg px-8 py-4 text-lg font-bold">
            Explore Free Courses
            <ChevronRight className="w-5 h-5 ml-1" />
          </a>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-ink-50">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="h2 mb-4">Courses Designed to Build Real-World Skills</h2>
            <p className="lead max-w-2xl mx-auto">
              Unlock your potential with our meticulously crafted free resources and training materials.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b, i) => (
              <div key={i} className="card p-6 bg-white hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6">
                  {b.icon}
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
            <h2 className="h2 mb-4">Explore Our Free Online Courses</h2>
            <p className="lead">Start learning today with these top-rated free programs.</p>
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
                    <Link href={`/${course.slug}`} className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                      View Course
                    </Link>
                    <Link href={`/${course.slug}`} className="text-sm font-bold text-primary bg-secondary px-4 py-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors">
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
            <h2 className="h2 mb-4">Explore Our Free Practice Tests</h2>
            <p className="lead">Test your knowledge and prepare for your certification exams.</p>
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
                  <Link href={`/practice-tests/${test.slug}`} className="btn-primary w-full shadow-sm">
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Invite Your Friends & Unlock Unlimited Learning</h2>
              <p className="text-lg text-background/80 mb-8">
                Share the knowledge! Enjoy unlimited access to all ULearnSystems courses—enroll in as many as you want, 100% free.
              </p>
              <Link href="/refer-earn" className="btn bg-accent text-accent-foreground hover:opacity-90">
                Invite Now
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
            <h2 className="h2 mb-4">Upcoming Live Webinars</h2>
            <p className="lead">Join our expert-led sessions to gain real-world insights.</p>
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
            <h2 className="h2 mb-4">Frequently Asked Questions</h2>
            <p className="lead">Everything you need to know about our free courses.</p>
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

    </main>
  );
}
