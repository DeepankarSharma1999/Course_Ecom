// Canonical home-page sections, in default render order. The admin can hide
// and reorder them (stored on HomePageContent.sections as { key, hidden }[]).
export type HomeSection = { key: string; hidden?: boolean };

export const HOME_SECTIONS: { key: string; label: string }[] = [
  { key: "hero", label: "Hero" },
  { key: "partners", label: "Partner Logos" },
  { key: "sectors", label: "Business Sectors" },
  { key: "courses", label: "Courses Grid" },
  { key: "combos", label: "Combo Courses" },
  { key: "pedagogy", label: "Pedagogy" },
  { key: "trainers", label: "Trainers" },
  { key: "testimonials", label: "Testimonials" },
  { key: "accolades", label: "Accolades" },
  { key: "reach", label: "Global Reach" },
];

const LABELS = new Map(HOME_SECTIONS.map((s) => [s.key, s.label]));
export const sectionLabel = (key: string) => LABELS.get(key) ?? key;

/**
 * Merge the admin's saved order/visibility over the canonical list:
 * - keeps saved order, drops unknown keys,
 * - appends any newly-added sections (not yet in saved) at the end, visible.
 */
export function resolveHomeSections(saved?: any): { key: string; label: string; hidden: boolean }[] {
  const known = new Set(HOME_SECTIONS.map((s) => s.key));
  const out: { key: string; label: string; hidden: boolean }[] = [];
  const seen = new Set<string>();
  if (Array.isArray(saved)) {
    for (const s of saved) {
      if (s && known.has(s.key) && !seen.has(s.key)) {
        out.push({ key: s.key, label: sectionLabel(s.key), hidden: !!s.hidden });
        seen.add(s.key);
      }
    }
  }
  for (const s of HOME_SECTIONS) {
    if (!seen.has(s.key)) out.push({ key: s.key, label: s.label, hidden: false });
  }
  return out;
}
