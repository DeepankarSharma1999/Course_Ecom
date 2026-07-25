// Course-level deep sections for geo pages (skills, roles, benefits, exam
// guide, city guide, vs-comparison…). Content lives in data/geo/courses/*.json
// and is written once per course; {city}/{country}/{price} slots are filled per
// page. Convention: each section's FIRST course mention pairs full name +
// acronym ("Certified Scrum Master (CSM)"), then the acronym alone — the
// pattern the ranking competitors use.
import { BadgeCheck, CheckCircle2, GraduationCap, Users } from "lucide-react";
import { FaqAccordion } from "@/components/faq-accordion";
import type { GeoCourseContent, GuideSection, SlotValues, TitledItem } from "@/lib/geo-pages/course-content";
import { fillSlots } from "@/lib/geo-pages/course-content";

function Guide({ sections, v, headingLevel = "h2" }: { sections: GuideSection[]; v: SlotValues; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <>
      {sections.map((s) => (
        <section key={s.h} className="max-w-3xl space-y-3">
          <H className={headingLevel === "h2" ? "h2" : "h3"}>{fillSlots(s.h, v)}</H>
          {s.p.map((p, i) => (
            <p key={i} className="leading-7 text-muted-foreground">{fillSlots(p, v)}</p>
          ))}
        </section>
      ))}
    </>
  );
}

function Cards({ items, v, icon: Icon }: { items: TitledItem[]; v: SlotValues; icon: typeof Users }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((it) => (
        <div key={it.title} className="card p-6">
          <div className="flex items-center gap-2.5">
            <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            <h3 className="font-bold text-foreground">{fillSlots(it.title, v)}</h3>
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{fillSlots(it.body, v)}</p>
        </div>
      ))}
    </div>
  );
}

function Checklist({ items, v }: { items: string[]; v: SlotValues }) {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {items.map((s) => (
        <li key={s} className="flex items-start gap-2.5 text-sm leading-6 text-muted-foreground">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
          {fillSlots(s, v)}
        </li>
      ))}
    </ul>
  );
}

// Full deep-content stack. `location` = city name on city pages, country name
// on hubs — every {city} slot degrades gracefully to the country.
export function GeoDeepSections({ content, v: vIn, localFlavor }: { content: GeoCourseContent; v: SlotValues; localFlavor?: string }) {
  const { fullName, acr } = content;
  const v: SlotValues = { ...vIn, acr, fullName };
  const loc = v.city ?? v.country;
  return (
    <>
      <section className="space-y-4">
        <h2 className="h2">Skills covered in {acr} certification training</h2>
        <p className="max-w-3xl leading-7 text-muted-foreground">
          The {fullName} ({acr}) curriculum builds the following skills, taught live with exercises rather than slideware:
        </p>
        <Checklist items={content.skills} v={v} />
        {/* Per-city industries line (real data from the city file) keeps this
            shared section from being word-identical across locations. */}
        {localFlavor && (
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
            In {loc}, these {acr} skills map directly onto the local market: {localFlavor}
          </p>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="h2">Who benefits from {acr} certification in {loc}?</h2>
        <Cards items={content.roles} v={v} icon={Users} />
      </section>

      <section className="space-y-4">
        <h2 className="h2">Benefits of {fullName} ({acr}) certification</h2>
        <Cards items={content.benefits} v={v} icon={BadgeCheck} />
      </section>

      <section className="max-w-3xl space-y-4">
        <h2 className="h2">Who should attend this {acr} course in {loc}</h2>
        <Checklist items={content.whoShouldAttend} v={v} />
        <h3 className="h3 pt-2">{acr} prerequisites</h3>
        <Checklist items={content.prerequisites} v={v} />
      </section>

      <section className="space-y-4">
        <h2 className="h2">Why choose us for {acr} training in {loc}</h2>
        <Cards items={content.whyUs} v={v} icon={GraduationCap} />
      </section>

      <section className="space-y-6">
        <h2 className="h2">{fullName} ({acr}) exam &amp; certification guide</h2>
        <Guide sections={content.examGuide} v={v} headingLevel="h3" />
        <p className="text-xs text-muted-foreground">
          Certifying body: <a href={content.certBodyUrl} target="_blank" rel="nofollow noopener" className="text-primary underline-offset-4 hover:underline">{content.certBody}</a>
        </p>
      </section>

      <section className="max-w-3xl space-y-4">
        <h2 className="h2">{acr} exam FAQs</h2>
        <FaqAccordion items={content.examFaqs} />
      </section>

      <section className="space-y-4">
        <h2 className="h2">{fillSlots(content.vs.title, v)}</h2>
        <p className="max-w-3xl leading-7 text-muted-foreground">{fillSlots(content.vs.intro, v)}</p>
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-border/60 bg-secondary/60 text-xs font-bold uppercase tracking-wide text-foreground">
                  <th scope="col" className="px-5 py-3.5">Aspect</th>
                  <th scope="col" className="px-5 py-3.5">{content.vs.aLabel}</th>
                  <th scope="col" className="px-5 py-3.5">{content.vs.bLabel}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {content.vs.rows.map((r) => (
                  <tr key={r.aspect}>
                    <td className="px-5 py-4 font-semibold text-foreground">{r.aspect}</td>
                    <td className="px-5 py-4">{r.a}</td>
                    <td className="px-5 py-4">{r.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

// Localized city-guide block (Sprintzeal pattern): H2 question sections with
// the city name in headings and bodies. Rendered separately so the city page
// controls its position in the SEO-driven section order.
export function GeoCityGuide({ content, v: vIn }: { content: GeoCourseContent; v: SlotValues }) {
  const v: SlotValues = { ...vIn, acr: content.acr, fullName: content.fullName };
  return (
    <section className="space-y-8">
      <h2 className="h2">{content.acr} certification guide for {v.city ?? v.country}</h2>
      <Guide sections={content.cityGuide} v={v} headingLevel="h3" />
    </section>
  );
}
