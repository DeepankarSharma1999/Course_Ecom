import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

const blogs = [
  {
    title: "A Complete Guide for Mastering Docker Networking",
    category: "DevOps",
    readTime: "76 min read",
    date: "3 Jun 2026",
    text: "Learn Docker networking, network types, drivers, bridge and overlay networks, security, and commands.",
  },
  {
    title: "What is a Network Diagram in Project Management?",
    category: "Project",
    readTime: "42 min read",
    date: "3 Jun 2026",
    text: "Understand network diagrams in project management with types, examples, and exam-ready explanations.",
  },
  {
    title: "Claude vs ChatGPT vs Gemini: Features and Use Cases",
    category: "Generative AI",
    readTime: "29 min read",
    date: "3 Jun 2026",
    text: "Compare leading AI tools by strengths, pricing, practical use cases, and limitations.",
  },
];

export function LatestBlogs() {
  const [featured, ...supporting] = blogs;

  return (
    <section className="section bg-white font-sans">
      <div className="container-tight">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="section-eyebrow mb-3">Resources</div>
            <h2 className="h2">Latest insights for modern professionals</h2>
          </div>
          <Link href="/resources" className="btn-outline w-fit">
            View Resources <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <ArticleCard article={featured} featured />
          <div className="grid gap-6">
            {supporting.map((article) => (
              <ArticleCard key={article.title} article={article} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ArticleCard({ article, featured = false }: { article: (typeof blogs)[number]; featured?: boolean }) {
  return (
    <article className={`group overflow-hidden rounded-2xl border border-[#082032]/10 bg-white shadow-[0_8px_24px_rgba(8,32,50,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(8,32,50,0.09)] ${featured ? "lg:min-h-[430px]" : ""}`}>
      <div className={`${featured ? "aspect-[16/8]" : "aspect-[16/6]"} bg-[linear-gradient(135deg,#E7F3F3,#F4F8FA)] p-6`}>
        <div className="flex h-full items-end rounded-xl border border-white/80 bg-white/45 p-5">
          <div>
            <span className="accent-badge mb-3">{article.category}</span>
            <h3 className={`${featured ? "text-3xl" : "text-xl"} max-w-xl font-black leading-tight text-[#082032]`}>{article.title}</h3>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-bold text-muted-foreground">
          <span>{article.date}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-primary" />
            {article.readTime}
          </span>
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{article.text}</p>
        <Link href="/resources" className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm font-black text-primary">
          Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
