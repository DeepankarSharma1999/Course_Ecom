import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { Field, Input, Select, Checkbox, PageHeader, Section } from "@/components/admin/ui";
import { saveCountry, deleteCountry, saveCity, deleteCity } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function LocationsPage() {
  const [countries, cities] = await Promise.all([
    prisma.country.findMany({ orderBy: [{ order: "asc" }, { name: "asc" }], include: { _count: { select: { cities: true } } } }),
    prisma.city.findMany({ orderBy: [{ order: "asc" }, { name: "asc" }], include: { country: true } }),
  ]);

  return (
    <>
      <AdminTopbar title="Locations" />
      <div className="p-6 space-y-10">
        <PageHeader title="Locations" description="Countries and cities that power /[country] and /[country]/[course]/[city] URLs. A city belongs to one country; its slug drives the /city landing page." />

        {/* ---------------- Countries ---------------- */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-sm font-semibold text-ink-700">Countries</h2>
            {countries.length === 0 && <div className="card p-6 text-center text-ink-500 text-sm">No countries yet.</div>}
            {countries.map((co) => (
              <form key={co.id} action={saveCountry.bind(null, co.id)} className="card p-4 grid grid-cols-12 gap-2 items-end">
                <div className="col-span-2"><Field label="Slug"><Input name="slug" defaultValue={co.slug} required /></Field></div>
                <div className="col-span-3"><Field label="Name"><Input name="name" defaultValue={co.name} required /></Field></div>
                <div className="col-span-2"><Field label="Code"><Input name="code" defaultValue={co.code ?? ""} /></Field></div>
                <div className="col-span-2"><Field label="Currency"><Input name="currency" defaultValue={co.currency ?? ""} /></Field></div>
                <div className="col-span-1"><Field label="Order"><Input type="number" name="order" defaultValue={co.order} /></Field></div>
                <div className="col-span-2 pb-2"><Checkbox name="enabled" label="Enabled" defaultChecked={co.enabled} /></div>
                <div className="col-span-12 flex justify-between items-center">
                  <span className="text-xs text-ink-500">{co._count.cities} cities</span>
                  <div className="flex gap-4">
                    <button type="submit" className="btn-outline">Save</button>
                    <button formAction={deleteCountry.bind(null, co.id)} className="text-red-600 hover:underline text-sm">Delete</button>
                  </div>
                </div>
              </form>
            ))}
          </div>
          <form action={saveCountry.bind(null, null)}>
            <Section title="Add Country">
              <Field label="Slug" required><Input name="slug" required placeholder="uk" /></Field>
              <Field label="Name" required><Input name="name" required placeholder="United Kingdom" /></Field>
              <Field label="Code"><Input name="code" placeholder="UK" /></Field>
              <Field label="Currency"><Input name="currency" placeholder="GBP" /></Field>
              <Field label="Order"><Input type="number" name="order" defaultValue={countries.length} /></Field>
              <div className="py-2"><Checkbox name="enabled" label="Enabled" defaultChecked /></div>
              <button type="submit" className="btn-primary w-full">Add Country</button>
            </Section>
          </form>
        </div>

        {/* ---------------- Cities ---------------- */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-sm font-semibold text-ink-700">Cities</h2>
            {cities.length === 0 && <div className="card p-6 text-center text-ink-500 text-sm">No cities yet.</div>}
            {cities.map((ct) => (
              <form key={ct.id} action={saveCity.bind(null, ct.id)} className="card p-4 grid grid-cols-12 gap-2 items-end">
                <div className="col-span-3"><Field label="Slug"><Input name="slug" defaultValue={ct.slug} required /></Field></div>
                <div className="col-span-3"><Field label="Name"><Input name="name" defaultValue={ct.name} required /></Field></div>
                <div className="col-span-3"><Field label="Country">
                  <Select name="countryId" defaultValue={ct.countryId}>
                    {countries.map((co) => <option key={co.id} value={co.id}>{co.name}</option>)}
                  </Select>
                </Field></div>
                <div className="col-span-1"><Field label="Order"><Input type="number" name="order" defaultValue={ct.order} /></Field></div>
                <div className="col-span-2 pb-2"><Checkbox name="enabled" label="Enabled" defaultChecked={ct.enabled} /></div>
                <div className="col-span-12 flex justify-between items-center">
                  <span className="text-xs text-ink-500">{ct.country.name} · /{ct.slug}</span>
                  <div className="flex gap-4">
                    <button type="submit" className="btn-outline">Save</button>
                    <button formAction={deleteCity.bind(null, ct.id)} className="text-red-600 hover:underline text-sm">Delete</button>
                  </div>
                </div>
              </form>
            ))}
          </div>
          <form action={saveCity.bind(null, null)}>
            <Section title="Add City">
              <Field label="Slug" required><Input name="slug" required placeholder="london" /></Field>
              <Field label="Name" required><Input name="name" required placeholder="London" /></Field>
              <Field label="Country" required>
                <Select name="countryId" defaultValue={countries[0]?.id ?? ""}>
                  {countries.map((co) => <option key={co.id} value={co.id}>{co.name}</option>)}
                </Select>
              </Field>
              <Field label="Order"><Input type="number" name="order" defaultValue={cities.length} /></Field>
              <div className="py-2"><Checkbox name="enabled" label="Enabled" defaultChecked /></div>
              <button type="submit" className="btn-primary w-full" disabled={countries.length === 0}>Add City</button>
            </Section>
          </form>
        </div>
      </div>
    </>
  );
}
