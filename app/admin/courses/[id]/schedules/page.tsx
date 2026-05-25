import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { Badge, Field, Input, PageHeader, Section, Select, Checkbox } from "@/components/admin/ui";
import { createSchedule, deleteSchedule } from "@/lib/admin-actions";
import { COUNTRIES, CITIES_IN } from "@/lib/seed-data";

export const dynamic = "force-dynamic";

export default async function CourseSchedules({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = await prisma.course.findUnique({ where: { id } });
  if (!course) notFound();
  const schedules = await prisma.schedule.findMany({ where: { courseId: id }, orderBy: { startDate: "asc" } });
  const createBound = createSchedule.bind(null, id);

  return (
    <>
      <AdminTopbar title={`Schedules: ${course.shortTitle || course.title}`} />
      <div className="p-6">
        <PageHeader
          title="Schedules"
          description={course.shortTitle || course.title}
          actions={<Link href={`/admin/courses/${id}/edit`} className="btn-ghost">← Back to course</Link>}
        />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-ink-50 text-left text-xs uppercase text-ink-500">
                <tr>
                  <th className="px-4 py-3">Start</th>
                  <th className="px-4 py-3">Mode</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Seats</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {schedules.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-ink-500">No schedules yet.</td></tr>}
                {schedules.map((s) => (
                  <tr key={s.id} className="hover:bg-ink-50/50">
                    <td className="px-4 py-3">
                      <div className="font-medium">{new Date(s.startDate).toLocaleDateString()}</div>
                      <div className="text-xs text-ink-500">{s.timeLabel || s.timezone || ""}</div>
                    </td>
                    <td className="px-4 py-3"><Badge tone={s.mode === "Classroom" ? "blue" : "neutral"}>{s.mode}</Badge></td>
                    <td className="px-4 py-3 text-ink-700">{s.citySlug ? `${s.citySlug}, ${s.countrySlug}` : s.countrySlug || "Global"}</td>
                    <td className="px-4 py-3">{s.priceInr ? `₹${s.priceInr.toLocaleString()}` : "—"}</td>
                    <td className="px-4 py-3">{s.seatsLeft ?? "—"} {s.isFilling && <Badge tone="red">Filling</Badge>}</td>
                    <td className="px-4 py-3 text-right">
                      <form action={deleteSchedule.bind(null, s.id, id)} className="inline">
                        <button className="text-red-600 hover:underline text-xs">Delete</button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <form action={createBound} className="space-y-4">
            <Section title="Add Schedule">
              <Field label="Start Date" required><Input type="datetime-local" name="startDate" required /></Field>
              <Field label="End Date" required><Input type="datetime-local" name="endDate" required /></Field>
              <Field label="Mode">
                <Select name="mode" defaultValue="Live Online">
                  <option>Live Online</option>
                  <option>Classroom</option>
                  <option>Self-Paced</option>
                </Select>
              </Field>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Country">
                  <Select name="countrySlug" defaultValue="">
                    <option value="">—</option>
                    {COUNTRIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                  </Select>
                </Field>
                <Field label="City">
                  <Select name="citySlug" defaultValue="">
                    <option value="">—</option>
                    {CITIES_IN.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                  </Select>
                </Field>
              </div>
              <Field label="Time Label"><Input name="timeLabel" placeholder="09:00 AM - 06:00 PM IST" /></Field>
              <Field label="Timezone"><Input name="timezone" placeholder="IST" /></Field>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Price (INR)"><Input type="number" name="priceInr" /></Field>
                <Field label="Price (USD)"><Input type="number" name="priceUsd" /></Field>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Discount %"><Input type="number" name="discountPct" /></Field>
                <Field label="Seats Left"><Input type="number" name="seatsLeft" /></Field>
              </div>
              <Checkbox name="isFilling" label="Mark as Filling Fast" />
              <button type="submit" className="btn-primary w-full">Add Schedule</button>
            </Section>
          </form>
        </div>
      </div>
    </>
  );
}
