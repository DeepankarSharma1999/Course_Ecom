import Link from "next/link";
import { Star } from "lucide-react";
import { prisma } from "@/lib/prisma";

async function getTrainersForCourseSlug(courseSlug: string) {
  try {
    const c = await prisma.course.findUnique({ where: { slug: courseSlug } });
    if (!c) return [];
    const cts = await prisma.courseTrainer.findMany({
      where: { courseId: c.id },
      include: { trainer: true },
    });
    return cts.map((ct) => ct.trainer).filter((t) => t.isActive);
  } catch {
    return [];
  }
}

export async function TrainerSection({ courseSlug }: { courseSlug: string }) {
  const trainers = await getTrainersForCourseSlug(courseSlug);
  if (trainers.length === 0) return null;
  return (
    <section className="section bg-ink-50/40">
      <div className="container-tight">
        <div className="text-center mb-10">
          <div className="badge mb-3">Meet Your Trainers</div>
          <h2 className="h2 mb-3">Learn From Practitioners, Not Lecturers</h2>
          <p className="lead max-w-2xl mx-auto">All our trainers are accredited practitioners with deep enterprise experience.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {trainers.map((t) => (
            <Link key={t.id} href={`/trainers/${t.slug}`} className="card p-5 hover:shadow-card-lg transition-all">
              <div className="flex items-start gap-3 mb-3">
                {t.photo
                  ? <img src={t.photo} alt={t.name} className="w-14 h-14 rounded-full object-cover" />
                  : <div className="w-14 h-14 rounded-full bg-brand-100 text-brand-700 grid place-items-center font-bold">{t.name.charAt(0)}</div>}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-ink-900">{t.name}</div>
                  <div className="text-xs text-ink-500 line-clamp-1">{t.title}</div>
                  {t.rating && <div className="flex items-center gap-0.5 text-xs text-amber-600 mt-0.5"><Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {t.rating} · {t.reviews} reviews</div>}
                </div>
              </div>
              <p className="text-sm text-ink-700 line-clamp-3">{t.bio}</p>
              {Array.isArray(t.expertise) && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {(t.expertise as string[]).slice(0, 3).map((x) => <span key={x} className="text-[11px] bg-ink-100 px-2 py-0.5 rounded-full text-ink-700">{x}</span>)}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
