import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { Field, Input, PageHeader, Section, Textarea } from "@/components/admin/ui";
import { ImageUploader } from "@/components/admin/image-uploader";
import { ListEditor } from "@/components/admin/list-editor";
import {
  DEFAULT_PARTNER_LOGOS, DEFAULT_BUSINESS_SECTORS, DEFAULT_PEDAGOGY_STEPS, DEFAULT_ACCOLADES, DEFAULT_REACH_STATS,
} from "@/lib/home-defaults";
import { saveHomeContent, saveHomeSections } from "@/lib/admin-actions";
import { resolveHomeSections } from "@/lib/home-sections";
import { HomeSectionsEditor } from "@/components/admin/home-sections-editor";

export const dynamic = "force-dynamic";

export default async function HomeContentPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const sp = await searchParams;
  const h = (await prisma.homePageContent.findUnique({ where: { id: "singleton" } })) as any;
  const j = (v: any) => (v ? JSON.stringify(v, null, 2) : "");
  return (
    <>
      <AdminTopbar title="Home Page" />
      <div className="p-6 max-w-5xl">
        <PageHeader title="Home Page Content" description="Every section on the home page is editable here." />
        {sp.saved && <div className="mb-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 text-sm">Saved.</div>}

        <form action={saveHomeSections} className="mb-8">
          <Section title="Section Visibility & Order" description="Show, hide, and reorder the sections on the home page.">
            <HomeSectionsEditor initial={resolveHomeSections(h?.sections)} />
            <button type="submit" className="btn-primary mt-4">Save Layout</button>
          </Section>
        </form>

        <form action={saveHomeContent} className="grid lg:grid-cols-2 gap-6">
          <Section title="Hero">
            <Field label="Badge text"><Input name="heroBadgeText" defaultValue={h?.heroBadgeText ?? ""} /></Field>
            <Field label="Headline (start)"><Input name="heroHeadline" defaultValue={h?.heroHeadline ?? ""} /></Field>
            <Field label="Headline highlight (orange)"><Input name="heroHeadlineHighlight" defaultValue={h?.heroHeadlineHighlight ?? ""} /></Field>
            <Field label="Headline suffix"><Input name="heroHeadlineSuffix" defaultValue={h?.heroHeadlineSuffix ?? ""} /></Field>
            <Field label="Subheading"><Textarea name="heroSubheading" rows={3} defaultValue={h?.heroSubheading ?? ""} /></Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Primary CTA text"><Input name="heroCtaPrimaryText" defaultValue={h?.heroCtaPrimaryText ?? ""} /></Field>
              <Field label="Primary CTA link"><Input name="heroCtaPrimaryLink" defaultValue={h?.heroCtaPrimaryLink ?? ""} /></Field>
              <Field label="Secondary CTA text"><Input name="heroCtaSecondaryText" defaultValue={h?.heroCtaSecondaryText ?? ""} /></Field>
              <Field label="Secondary CTA link"><Input name="heroCtaSecondaryLink" defaultValue={h?.heroCtaSecondaryLink ?? ""} /></Field>
            </div>
            <Field label="Stats" hint="The small stats shown in the hero (e.g. rating, learners).">
              <ListEditor name="heroStats" value={h?.heroStats} itemLabel="Stat" fields={[{ key: "value", label: "Value (e.g. 4.8/5)" }, { key: "label", label: "Label (e.g. Rating)" }]} />
            </Field>
            <Field label="Hero form title"><Input name="heroFormTitle" defaultValue={h?.heroFormTitle ?? ""} /></Field>
            <Field label="Hero form subtitle"><Input name="heroFormSubtitle" defaultValue={h?.heroFormSubtitle ?? ""} /></Field>
          </Section>

          <Section title="Accreditation Strip">
            <Field label="Title"><Input name="accreditationTitle" defaultValue={h?.accreditationTitle ?? ""} /></Field>
            <p className="text-xs text-ink-500">Logos are managed in Site Settings → Accreditation Logos.</p>
          </Section>

          <Section title="Categories Section">
            <Field label="Badge"><Input name="categoriesBadge" defaultValue={h?.categoriesBadge ?? ""} /></Field>
            <Field label="Title"><Input name="categoriesTitle" defaultValue={h?.categoriesTitle ?? ""} /></Field>
            <Field label="Subtitle"><Textarea name="categoriesSubtitle" rows={2} defaultValue={h?.categoriesSubtitle ?? ""} /></Field>
          </Section>

          <Section title="Courses Section">
            <Field label="Badge"><Input name="coursesBadge" defaultValue={h?.coursesBadge ?? ""} /></Field>
            <Field label="Title"><Input name="coursesTitle" defaultValue={h?.coursesTitle ?? ""} /></Field>
          </Section>

          <Section title="Why Us Section">
            <Field label="Badge"><Input name="whyUsBadge" defaultValue={h?.whyUsBadge ?? ""} /></Field>
            <Field label="Title"><Input name="whyUsTitle" defaultValue={h?.whyUsTitle ?? ""} /></Field>
            <Field label="Subtitle"><Textarea name="whyUsSubtitle" rows={3} defaultValue={h?.whyUsSubtitle ?? ""} /></Field>
            <Field label="Image"><ImageUploader name="whyUsImage" kind="asset" defaultValue={h?.whyUsImage} /></Field>
            <Field label="Items" hint="The feature/benefit cards in this section.">
              <ListEditor name="whyUsItems" value={h?.whyUsItems} itemLabel="Item" fields={[{ key: "icon", label: "Icon (lucide name, e.g. GraduationCap)" }, { key: "title", label: "Title" }, { key: "body", label: "Body", textarea: true }]} />
            </Field>
          </Section>

          <Section title="Testimonials Section">
            <Field label="Badge"><Input name="testimonialsBadge" defaultValue={h?.testimonialsBadge ?? ""} /></Field>
            <Field label="Title"><Input name="testimonialsTitle" defaultValue={h?.testimonialsTitle ?? ""} /></Field>
            <Field label="Subtitle"><Textarea name="testimonialsSubtitle" rows={2} defaultValue={h?.testimonialsSubtitle ?? ""} /></Field>
          </Section>

          <Section title="FAQ Section">
            <Field label="Badge"><Input name="faqBadge" defaultValue={h?.faqBadge ?? ""} /></Field>
            <Field label="Title"><Input name="faqTitle" defaultValue={h?.faqTitle ?? ""} /></Field>
            <p className="text-xs text-ink-500">FAQ items are managed in the <a className="text-brand-600 hover:underline" href="/admin/global-faqs">Global FAQs</a> section.</p>
          </Section>

          <Section title="CTA Band (bottom of home)">
            <Field label="Title"><Input name="ctaTitle" defaultValue={h?.ctaTitle ?? ""} /></Field>
            <Field label="Subtitle"><Textarea name="ctaSubtitle" rows={2} defaultValue={h?.ctaSubtitle ?? ""} /></Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Primary text"><Input name="ctaPrimaryText" defaultValue={h?.ctaPrimaryText ?? ""} /></Field>
              <Field label="Primary link"><Input name="ctaPrimaryLink" defaultValue={h?.ctaPrimaryLink ?? ""} /></Field>
              <Field label="Secondary text"><Input name="ctaSecondaryText" defaultValue={h?.ctaSecondaryText ?? ""} /></Field>
              <Field label="Secondary link"><Input name="ctaSecondaryLink" defaultValue={h?.ctaSecondaryLink ?? ""} /></Field>
            </div>
          </Section>

          <Section title="Partner Logos" description="The accredited/partner logos marquee.">
            <ListEditor name="partnerLogos" value={h?.partnerLogos ?? DEFAULT_PARTNER_LOGOS} itemLabel="Logo" fields={[{ key: "name", label: "Name (tooltip)" }, { key: "label", label: "Label (shown)" }, { key: "image", label: "Logo image", image: true }]} />
          </Section>

          <Section title="Business Sectors" description="The scrolling domain cards. Icon = a Lucide icon name (e.g. Cloud, Server, Cpu).">
            <ListEditor name="businessSectors" value={h?.businessSectors ?? DEFAULT_BUSINESS_SECTORS} itemLabel="Sector" fields={[{ key: "name", label: "Name" }, { key: "icon", label: "Lucide icon name" }]} />
          </Section>

          <Section title="Pedagogy Section">
            <Field label="Title"><Input name="pedagogyTitle" defaultValue={h?.pedagogyTitle ?? ""} /></Field>
            <Field label="Steps">
              <ListEditor name="pedagogySteps" value={h?.pedagogySteps ?? DEFAULT_PEDAGOGY_STEPS} itemLabel="Step" fields={[{ key: "title", label: "Title" }, { key: "text", label: "Text", textarea: true }, { key: "img", label: "Image", image: true }]} />
            </Field>
          </Section>

          <Section title="Accolades Section">
            <Field label="Title"><Input name="accoladesTitle" defaultValue={h?.accoladesTitle ?? ""} /></Field>
            <Field label="Award cards">
              <ListEditor name="accolades" value={h?.accolades ?? DEFAULT_ACCOLADES} itemLabel="Award" fields={[{ key: "title", label: "Title" }, { key: "org", label: "Description" }, { key: "logo", label: "Logo tag (e.g. ET, VCCIRCLE)" }]} />
            </Field>
          </Section>

          <Section title="Global Reach Band">
            <Field label="Badge"><Input name="reachBadge" defaultValue={h?.reachBadge ?? ""} /></Field>
            <Field label="Title"><Input name="reachTitle" defaultValue={h?.reachTitle ?? ""} /></Field>
            <Field label="Subtitle"><Textarea name="reachSubtitle" rows={2} defaultValue={h?.reachSubtitle ?? ""} /></Field>
            <Field label="Stats">
              <ListEditor name="reachStats" value={h?.reachStats ?? DEFAULT_REACH_STATS} itemLabel="Stat" fields={[{ key: "value", label: "Value (e.g. 120+)" }, { key: "label", label: "Label (e.g. Countries)" }]} />
            </Field>
          </Section>

          <Section title="SEO">
            <Field label="SEO Title"><Input name="seoTitle" defaultValue={h?.seoTitle ?? ""} /></Field>
            <Field label="Meta Description"><Textarea name="seoDescription" rows={3} defaultValue={h?.seoDescription ?? ""} /></Field>
          </Section>

          <div className="lg:col-span-2">
            <button type="submit" className="btn-primary">Save Home Content</button>
          </div>
        </form>
      </div>
    </>
  );
}
