import type { Metadata } from "next";
import Link from "next/link";
import { Star, Briefcase } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Meet Our Trainers",
  description: "Learn from accredited SAFe SPCs, PMP-certified PMs, DevOps practitioners and Agile coaches with decades of real-world experience.",
};

export const revalidate = 60;

async function getTrainers() {
  try {
    return await prisma.trainer.findMany({
      where: { isActive: true },
      orderBy: [{ isFeatured: "desc" }, { rating: "desc" }],
    });
  } catch { return []; }
}

export default async function TrainersIndex() {
  const trainers = await getTrainers();
  return (
    <>
      <section className="bg-gradient-to-br from-brand-950 to-brand-800 text-white">
        <div className="container-tight py-14">
          <div className="badge mb-3 bg-white/10 text-white border border-white/20">Our Trainers</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">World-Class Practitioner Trainers</h1>
          <p className="text-brand-100 text-lg max-w-2xl">Every Ulearnsystems trainer is an accredited practitioner with decades of real-world experience. They don&apos;t just teach the material — they live it every day.</p>
        </div>
      </section>
      <section className="section">
        <div className="container-tight">
          {trainers.length === 0 ? (
            <div className="text-center text-ink-500 py-10">Trainer profiles will appear here soon.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainers.map((t) => (
                <Link key={t.id} href={`/trainers/${t.slug}`} className="card p-6 hover:shadow-card-lg hover:-translate-y-0.5 transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    {t.photo ? <img src={t.photo} alt={t.name} className="w-16 h-16 rounded-full object-cover" /> : <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-700 grid place-items-center font-bold text-xl">{t.name.charAt(0)}</div>}
                    <div className="flex-1">
                      <div className="font-semibold text-ink-900">{t.name}</div>
                      <div className="text-xs text-ink-500">{t.title}</div>
                      {t.rating && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-amber-600">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {t.rating} · {t.reviews ?? 0} reviews
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-ink-700 line-clamp-3 mb-3">{t.bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(t.expertise as string[] | null)?.slice(0, 3).map((x) => (
                      <span key={x} className="text-[11px] bg-ink-100 px-2 py-0.5 rounded-full text-ink-700">{x}</span>
                    ))}
                  </div>
                  {t.experienceYears && (
                    <div className="mt-3 inline-flex items-center gap-1 text-xs text-ink-500">
                      <Briefcase className="w-3 h-3" /> {t.experienceYears}+ years experience
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
