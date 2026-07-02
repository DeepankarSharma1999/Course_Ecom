import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { Field, Input, Select, Checkbox, Section, PageHeader } from "@/components/admin/ui";
import { bulkCreateSchedules } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function BulkSchedulesPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const categories = await prisma.category.findMany({ orderBy: { order: "asc" }, select: { slug: true, name: true } });
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <AdminTopbar title="Bulk Schedules" />
      <div className="p-6 max-w-2xl">
        <PageHeader title="Bulk add schedules" description="Generate a recurring set of batches across many courses at once." />
        {error === "date" && <p className="mb-4 text-sm text-red-600">Please pick a valid start date.</p>}

        <form action={bulkCreateSchedules} className="space-y-6">
          <Section title="Scope">
            <Field label="Courses" hint="Apply to every published course, or just one category.">
              <Select name="categorySlug" defaultValue="">
                <option value="">All courses</option>
                {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </Select>
            </Field>
          </Section>

          <Section title="Cadence" description="How many batches per course, and how far apart.">
            <div className="grid grid-cols-3 gap-4">
              <Field label="Start date"><Input type="date" name="startDate" defaultValue={today} required /></Field>
              <Field label="Batches per course" hint="1–52"><Input type="number" name="count" defaultValue={4} min={1} max={52} /></Field>
              <Field label="Every N days" hint="7 = weekly, 30 = monthly"><Input type="number" name="intervalDays" defaultValue={7} min={1} /></Field>
            </div>
            <Field label="Batch length (days)"><Input type="number" name="durationDays" defaultValue={2} min={1} /></Field>
          </Section>

          <Section title="Batch details">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Mode">
                <Select name="mode" defaultValue="Live Online">
                  <option>Live Online</option><option>Classroom</option><option>Self-Paced</option>
                </Select>
              </Field>
              <Field label="Time label" hint="e.g. 09:00–17:00"><Input name="timeLabel" placeholder="09:00 – 17:00" /></Field>
              <Field label="Timezone"><Input name="timezone" placeholder="IST" /></Field>
              <Field label="Country slug" hint="optional, ignored if 'All locations' is ticked"><Input name="countrySlug" placeholder="in" /></Field>
              <Field label="City slug" hint="optional, ignored if 'All locations' is ticked"><Input name="citySlug" placeholder="mumbai" /></Field>
              <Field label="Seats left" hint="optional"><Input type="number" name="seatsLeft" placeholder="20" /></Field>
              <Field label="Price (INR)" hint="blank = use course price"><Input type="number" name="priceInr" /></Field>
              <Field label="Price (USD)"><Input type="number" name="priceUsd" /></Field>
              <Field label="Discount %"><Input type="number" name="discountPct" /></Field>
            </div>
            <Checkbox name="allLocations" label="All locations (every country, plus every India city)" />
            <Checkbox name="isFilling" label="Mark batches as 'filling fast'" />
          </Section>

          <Section title="Create">
            <Checkbox name="replaceFuture" label="Replace existing future schedules for these courses first" />
            <button type="submit" className="btn-primary w-full">Generate schedules</button>
            <p className="text-xs text-ink-500">Total created = courses in scope × batches per course × locations (1, unless "All locations" is ticked). When "Replace existing" is ticked, upcoming batches (start date today or later) for the in-scope courses are deleted before the new set is added; past batches are kept.</p>
          </Section>
        </form>
      </div>
    </>
  );
}
