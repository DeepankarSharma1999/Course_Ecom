import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentLearner } from "@/lib/learner-auth";
import { formatPrice } from "@/lib/utils";
import { Receipt, BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PurchaseHistoryPage() {
  const learner = await getCurrentLearner();
  if (!learner) redirect("/");

  const enrollments = await prisma.enrollment.findMany({
    where: { learnerId: learner.sub },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 max-w-[1000px] mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-ink-900 mb-1">Purchase History</h1>
        <p className="text-ink-500 text-[14px]">Every course enrollment on your account.</p>
      </div>

      {enrollments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-ink-100 p-12 text-center shadow-sm">
          <div className="w-16 h-16 mx-auto rounded-full bg-ink-50 flex items-center justify-center mb-4">
            <Receipt className="w-7 h-7 text-ink-400" />
          </div>
          <h2 className="font-bold text-ink-900 text-[16px] mb-1.5">No purchases yet</h2>
          <p className="text-[14px] text-ink-500 mb-6">Enroll in a course and it will show up here.</p>
          <Link href="/courses" className="inline-flex items-center gap-2 bg-primary hover:bg-[#0f6b6b] text-white font-bold px-6 py-2.5 rounded-lg transition-colors text-[14px]">
            <BookOpen className="w-4 h-4" /> Browse courses
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-ink-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-ink-50 text-left text-xs uppercase text-ink-500">
              <tr>
                <th className="px-6 py-3">Course</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {enrollments.map((e) => (
                <tr key={e.id} className="hover:bg-ink-50/50">
                  <td className="px-6 py-4 font-medium text-ink-900">{e.courseTitle}</td>
                  <td className="px-6 py-4 text-ink-600">
                    {e.createdAt.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-6 py-4">
                    {e.priceUsd > 0
                      ? <span className="font-semibold text-ink-900">{formatPrice(e.priceUsd, "USD")}</span>
                      : <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-1 rounded">Free</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/${e.courseSlug}`} className="text-primary font-semibold hover:underline text-[13px]">View course</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
