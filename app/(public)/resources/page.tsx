import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ChevronRight, BookOpen, Calendar, FileText } from "lucide-react";
import { getPageContent } from "@/lib/page-content";
import { prisma } from "@/lib/prisma";

const SLUG = "resources";
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent(SLUG);
  return { title: c.metaTitle, description: c.metaDescription };
}

export default async function ResourcesPage() {
  const c = await getPageContent(SLUG);
  // Admin-managed blogs; fall back to the static page-content cards until any exist.
  let blogs: { slug: string | null; title: string; category: string | null; excerpt: string | null; date: string; readTime: string }[] = [];
  try {
    const rows = await prisma.blog.findMany({ where: { isPublished: true }, orderBy: { publishedAt: "desc" } });
    blogs = rows.map((b) => ({
      slug: b.slug, title: b.title, category: b.category, excerpt: b.excerpt,
      date: b.publishedAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: b.readMins ? `${b.readMins} min read` : "",
    }));
  } catch { /* fall back */ }
  const RESOURCES = blogs.length
    ? blogs
    : (c.articles as any[]).map((a) => ({ slug: null, title: a.title, category: a.category, excerpt: a.desc, date: a.date, readTime: a.readTime }));
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-[#0f6b6b] text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-dots text-white opacity-20"></div>
        <div className="container-tight relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6">
              <FileText className="w-4 h-4 text-white" />
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

            <a href="#articles" className="btn bg-white text-primary hover:bg-white/90 rounded-full px-8 py-3 text-lg font-bold inline-flex items-center transition-colors shadow-lg">
              {c.heroCtaText}
              <ChevronRight className="w-5 h-5 ml-2" />
            </a>
          </div>
          <div className="hidden lg:block relative">
            <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-2xl max-w-lg mx-auto">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold text-white">Currently Reading</span>
                </div>
                <span className="text-xs text-white/60">4 min left</span>
              </div>
              <h3 className="font-bold text-xl text-white mb-3">The Ultimate Guide to SAFe 6.0</h3>
              <div className="space-y-2 mb-6">
                <div className="w-full h-2 bg-white/20 rounded-full"></div>
                <div className="w-11/12 h-2 bg-white/20 rounded-full"></div>
                <div className="w-full h-2 bg-white/20 rounded-full"></div>
                <div className="w-4/5 h-2 bg-white/20 rounded-full"></div>
                <div className="w-full h-2 bg-white/20 rounded-full"></div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="text-xs text-white/60 uppercase tracking-wider font-bold mb-2">Key Takeaway</div>
                <div className="text-sm text-white border-l-2 border-yellow-400 pl-3 italic">
                  "Agile is not just a methodology, it is a mindset that transforms the entire organization's approach to delivering value."
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid Section */}
      <section id="articles" className="section bg-ink-50 min-h-[50vh]">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="h2 mb-4">{c.listTitle}</h2>
            <p className="lead max-w-2xl mx-auto">
              {c.listSubtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {RESOURCES.map((resource, i) => (
              <div key={i} className="card p-6 bg-white border border-ink-100 hover:border-[#4676f5] hover:shadow-card-md transition-all flex flex-col h-full">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-ink-100 text-ink-600 px-2.5 py-1 rounded-sm">
                    {resource.category}
                  </span>
                </div>
                
                <h3 className="font-bold text-xl text-ink-900 mb-3 line-clamp-2">
                  {resource.title}
                </h3>
                
                <p className="text-ink-600 mb-6 flex-1 line-clamp-3">
                  {resource.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-ink-100">
                  <div className="flex items-center gap-3 text-xs text-ink-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{resource.date}</span>
                    </div>
                    {resource.readTime && (
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{resource.readTime}</span>
                      </div>
                    )}
                  </div>
                  {resource.slug && (
                    <Link href={`/resources/${resource.slug}`} className="text-[#4676f5] font-semibold text-sm hover:underline inline-flex items-center gap-1">
                      Read More <ChevronRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </main>
  );
}
