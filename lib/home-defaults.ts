// Default content for the home-page list sections. The HomePageContent JSON
// columns override these per-deployment; null => these defaults are used.
// Components and the admin editor both import these so the page looks identical
// out of the box and the admin starts from the real content (not blank).

export type PartnerLogo = { name: string; label: string; image?: string; file?: string };
export type BusinessSector = { name: string; icon: string };
export type PedagogyStep = { title: string; text: string; img: string };
export type SpotlightArticle = { logo: string; title: string; img: string };
export type Accolade = { title: string; org: string; logo: string };
export type Stat = { value: string; label: string };

export const DEFAULT_PARTNER_LOGOS: PartnerLogo[] = [
  { name: "Scaled Agile (SAFe)", label: "Scaled Agile", file: "scaled-agile" },
  { name: "Scrum Alliance", label: "Scrum Alliance", file: "scrum-alliance" },
  { name: "Scrum.org", label: "Scrum.org", file: "scrum-org" },
  { name: "IIBA", label: "IIBA", file: "iiba" },
  { name: "ICAgile", label: "ICAgile", file: "icagile" },
  { name: "AWS Training Partner", label: "AWS", file: "aws" },
  { name: "DevOps Institute", label: "DevOps Institute", file: "devops-institute" },
  { name: "EC-Council", label: "EC-Council", file: "ec-council" },
  { name: "IASSC", label: "IASSC", file: "iassc" },
];

export const DEFAULT_BUSINESS_SECTORS: BusinessSector[] = [
  { name: "Cybersecurity", icon: "ShieldCheck" },
  { name: "DevOps", icon: "Infinity" },
  { name: "Artificial Intelligence", icon: "BrainCircuit" },
  { name: "Cloud Computing", icon: "Cloud" },
  { name: "Data Science", icon: "BarChart3" },
  { name: "Project Management", icon: "KanbanSquare" },
  { name: "Others", icon: "LayoutGrid" },
  { name: "CompTIA", icon: "BadgeCheck" },
  { name: "Machine Learning", icon: "Bot" },
  { name: "Database", icon: "Database" },
  { name: "Digital Marketing", icon: "Megaphone" },
  { name: "Software Testing", icon: "Bug" },
];

export const DEFAULT_PEDAGOGY_STEPS: PedagogyStep[] = [
  { title: "Learn", text: "Master concepts through expert-led, immersive live sessions designed around real-world application.", img: "/images/vendor/pexels/pexels-photo-3184291.jpeg" },
  { title: "Practice", text: "Reinforce learning with hands-on labs, simulations and scored practice tests.", img: "/images/vendor/pexels/pexels-photo-1181675.jpeg" },
  { title: "Assess", text: "Measure your readiness with full-length mock exams and instant, detailed feedback.", img: "/images/vendor/pexels/pexels-photo-3184328.jpeg" },
  { title: "Insights", text: "Track your progress with analytics that pinpoint strengths and gaps.", img: "/images/vendor/pexels/pexels-photo-3183150.jpeg" },
  { title: "Apply", text: "Go beyond theory and build professional-grade projects, with gamification to keep things fun — earn points, badges and climb the leaderboard.", img: "/images/vendor/pexels/pexels-photo-3184287.jpeg" },
];

// FIX-02: the default spotlight articles, awards and reach stats were invented
// (fake press coverage attributed to real publications, made-up award wins and
// headcounts). Defaults are empty — nothing renders until the admin enters
// real, verifiable items. See lib/verified-stats.ts for the policy.
export const DEFAULT_SPOTLIGHT_ARTICLES: SpotlightArticle[] = [];

export const DEFAULT_ACCOLADES: Accolade[] = [];

export const DEFAULT_REACH_STATS: Stat[] = [];
