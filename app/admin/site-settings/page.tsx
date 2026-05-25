import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { Checkbox, Field, Input, PageHeader, Section, Textarea } from "@/components/admin/ui";
import { saveSiteSettings } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function SiteSettingsPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const sp = await searchParams;
  const s = (await prisma.siteSettings.findUnique({ where: { id: "singleton" } })) as any;
  const j = (v: any) => (v ? JSON.stringify(v, null, 2) : "");
  return (
    <>
      <AdminTopbar title="Site Settings" />
      <div className="p-6 max-w-5xl">
        <PageHeader title="Site Settings" description="Brand, contact info, top bar, accreditation logos, social links and footer." />
        {sp.saved && <div className="mb-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 text-sm">Saved.</div>}
        <form action={saveSiteSettings} className="grid lg:grid-cols-2 gap-6">
          <Section title="Brand">
            <Field label="Brand Name" required><Input name="brandName" defaultValue={s?.brandName ?? "Course_Ecom"} required /></Field>
            <Field label="Tagline"><Input name="tagline" defaultValue={s?.tagline ?? ""} /></Field>
            <Field label="Logo URL"><Input name="logoUrl" defaultValue={s?.logoUrl ?? ""} /></Field>
            <Field label="Favicon URL"><Input name="faviconUrl" defaultValue={s?.faviconUrl ?? ""} /></Field>
          </Section>
          <Section title="Contact">
            <Field label="Phone"><Input name="phone" defaultValue={s?.phone ?? ""} /></Field>
            <Field label="Email"><Input name="email" defaultValue={s?.email ?? ""} /></Field>
            <Field label="WhatsApp Number" hint="Country code + number, no symbols"><Input name="whatsappNumber" defaultValue={s?.whatsappNumber ?? ""} placeholder="918047106633" /></Field>
            <Field label="Address"><Textarea name="address" rows={2} defaultValue={s?.address ?? ""} /></Field>
          </Section>
          <Section title="Top Bar">
            <Field label="Messages (JSON array of strings)"><Textarea name="topBarMessages" rows={3} defaultValue={j(s?.topBarMessages)} placeholder='["Globally accredited", "5,00,000+ trained"]' /></Field>
          </Section>
          <Section title="Announcement Bar">
            <Checkbox name="announcementEnabled" label="Show announcement bar" defaultChecked={!!s?.announcementEnabled} />
            <Field label="Text"><Input name="announcementText" defaultValue={s?.announcementText ?? ""} /></Field>
            <Field label="Link"><Input name="announcementLink" defaultValue={s?.announcementLink ?? ""} /></Field>
          </Section>
          <Section title="Accreditation Logos">
            <Field label="Logos (JSON array)" hint='[{ "name": "PMI" }] — optional logoUrl per item'>
              <Textarea name="accreditationLogos" rows={6} defaultValue={j(s?.accreditationLogos)} />
            </Field>
          </Section>
          <Section title="Social Links">
            <Field label="JSON object"><Textarea name="socialLinks" rows={6} defaultValue={j(s?.socialLinks)} placeholder='{ "linkedin": "...", "twitter": "...", "facebook": "...", "instagram": "...", "youtube": "..." }' /></Field>
          </Section>
          <Section title="Footer">
            <Field label="About text"><Textarea name="footerAbout" rows={4} defaultValue={s?.footerAbout ?? ""} /></Field>
            <Field label="Footer columns (JSON)" hint='[{ "title": "...", "links": [{"label","href"}] }]'>
              <Textarea name="footerColumns" rows={10} defaultValue={j(s?.footerColumns)} />
            </Field>
            <Field label="Copyright"><Input name="copyrightText" defaultValue={s?.copyrightText ?? ""} /></Field>
          </Section>
          <Section title="Default SEO">
            <Field label="Default Title"><Input name="defaultSeoTitle" defaultValue={s?.defaultSeoTitle ?? ""} /></Field>
            <Field label="Default Description"><Textarea name="defaultSeoDescription" rows={3} defaultValue={s?.defaultSeoDescription ?? ""} /></Field>
          </Section>
          <div className="lg:col-span-2">
            <button type="submit" className="btn-primary">Save Site Settings</button>
          </div>
        </form>
      </div>
    </>
  );
}
