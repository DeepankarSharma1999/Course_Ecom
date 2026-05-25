import Link from "next/link";
import { BookOpen, Calendar, Inbox, MessageSquareQuote, TrendingUp, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";

export const dynamic = "force-dynamic";

async function getCounts() {
  try {
    const [courses, schedules, leads, leadsNew, testimonials, categories] = await Promise.all([
      prisma.course.count(),
      prisma.schedule.count(),
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "new" } }),
      prisma.testimonial.count(),
      prisma.category.count(),
    ]);
    const recentLeads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 6 });
    return { courses, schedules, leads, leadsNew, testimonials, categories, recentLeads };
  } catch {
    return { courses: 0, schedules: 0, leads: 0, leadsNew: 0, testimonials: 0, categories: 0, recentLeads: [] as any[] };
  }
}

export default async function AdminHome() {
  const c = await getCounts();
  const cards = [
    { label: "Courses", value: c.courses, icon: BookOpen, href: "/admin/courses", color: "from-blue-500 to-blue-700" },
    { label: "Scheduled Batches", value: c.schedules, icon: Calendar, href: "/admin/schedules", color: "from-purple-500 to-purple-700" },
    { label: "Total Leads", value: c.leads, icon: Inbox, href: "/admin/leads", color: "from-emerald-500 to-emerald-700" },
    { label: "New Leads", value: c.leadsNew, icon: TrendingUp, href: "/admin/leads?status=new", color: "from-orange-500 to-red-600" },
    { label: "Testimonials", value: c.testimonials, icon: MessageSquareQuote, href: "/admin/testimonials", color: "from-pink-500 to-pink-700" },
    { label: "Categories", value: c.categories, icon: Users, href: "/admin/categories", color: "from-teal-500 to-teal-700" },
  ];

  return (
    <>
      <AdminTopbar title="Dashboard" />
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Welcome back</h1>
          <p className="text-ink-500 text-sm">Overview of your training platform</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.label} href={card.href} className="card p-4 hover:shadow-card-lg transition-shadow">
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${card.color} grid place-items-center mb-3`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="text-2xl font-bold text-ink-900">{card.value}</div>
                <div className="text-xs text-ink-500">{card.label}</div>
              </Link>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-ink-900">Recent Leads</h2>
              <Link href="/admin/leads" className="text-sm text-brand-600 hover:underline">View all</Link>
            </div>
            {c.recentLeads.length === 0 ? (
              <div className="text-sm text-ink-500 py-6 text-center">No leads yet. Submissions from the public site will appear here.</div>
            ) : (
              <ul className="divide-y divide-ink-100">
                {c.recentLeads.map((l: any) => (
                  <li key={l.id} className="py-3 flex items-center justify-between text-sm">
                    <div>
                      <div className="font-medium text-ink-900">{l.name}</div>
                      <div className="text-xs text-ink-500">{l.email} · {l.courseSlug || "—"}</div>
                    </div>
                    <div className="text-xs text-ink-400">{new Date(l.createdAt).toLocaleDateString()}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="card p-6">
            <h2 className="font-semibold text-ink-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/admin/courses/new" className="btn-primary justify-start">+ Add Course</Link>
              <Link href="/admin/schedules/new" className="btn-outline justify-start">+ Add Batch</Link>
              <Link href="/admin/testimonials/new" className="btn-outline justify-start">+ Testimonial</Link>
              <Link href="/admin/leads?export=csv" className="btn-outline justify-start">Export Leads</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
