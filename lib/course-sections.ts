// Toggleable course-page sections. Used by the admin form (show/hide checkboxes),
// the save action, and the course page (to gate rendering). One source of truth.
export const COURSE_SECTIONS = [
  { key: "overview", label: "Overview" },
  { key: "certificate", label: "Certificate" },
  { key: "accreditation", label: "Accreditation" },
  { key: "reviews", label: "Reviews" },
  { key: "instructors", label: "Instructors" },
  { key: "curriculum", label: "Curriculum" },
  { key: "demand", label: "Demand & Roles" },
  { key: "schedules", label: "Schedules" },
  { key: "articles", label: "Articles" },
  { key: "faq", label: "FAQ" },
] as const;

export type CourseSectionKey = (typeof COURSE_SECTIONS)[number]["key"];

export const isSectionHidden = (hidden: string[] | undefined, key: CourseSectionKey) =>
  (hidden ?? []).includes(key);
