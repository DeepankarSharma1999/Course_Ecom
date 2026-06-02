// Static content used for both DB seeding and direct rendering when DB is not connected.
// This makes the app runnable without Postgres while staying DB-driven in production.

export type CourseFeature = { icon: string; label: string };
export type CurriculumModule = { title: string; topics: string[] };
export type FaqItem = { q: string; a: string };
export type CategoryContent = { slug: string; name: string; tagline: string; icon: string };

export type CourseContent = {
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  summary: string;
  description: string;
  category: { slug: string; name: string };
  durationLabel: string;
  level: string;
  accreditedBy: string;
  basePriceInr: number;
  basePriceUsd: number;
  examIncluded: boolean;
  ratingAvg: number;
  ratingCount: number;
  heroImage: string;
  keyFeatures: CourseFeature[];
  learningOutcomes: string[];
  whoShouldAttend: string[];
  prerequisites: string[];
  curriculum: CurriculumModule[];
  whyChooseUs: { title: string; body: string }[];
  faqs: FaqItem[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
};

export const CATEGORIES = [
  { slug: "agile-scrum", name: "Agile & Scrum", tagline: "Master modern agile delivery", icon: "Repeat" },
  { slug: "safe", name: "Scaled Agile (SAFe)", tagline: "Scale agility across the enterprise", icon: "Layers" },
  { slug: "project-management", name: "Project Management", tagline: "PMP, PRINCE2, PgMP and more", icon: "ClipboardList" },
  { slug: "devops", name: "DevOps", tagline: "CI/CD, SRE, cloud DevOps", icon: "Workflow" },
  { slug: "it-service-management", name: "IT Service Management", tagline: "ITIL 4 and beyond", icon: "Server" },
  { slug: "quality-management", name: "Quality Management", tagline: "Lean Six Sigma certifications", icon: "Award" },
  { slug: "cybersecurity", name: "Cyber Security", tagline: "CISSP, CISM, CEH", icon: "Shield" },
  { slug: "data-science", name: "Data & AI", tagline: "Data Science, ML, AI", icon: "BarChart3" },
];

// Pre-built (have full static routes generated): in, us, uk, ae, sg, au
// All others are available on-demand via dynamicParams = true.
export const COUNTRIES = [
  { slug: "in", code: "IN", name: "India", currency: "INR" },
  { slug: "us", code: "US", name: "United States", currency: "USD" },
  { slug: "uk", code: "UK", name: "United Kingdom", currency: "GBP" },
  { slug: "ae", code: "AE", name: "United Arab Emirates", currency: "AED" },
  { slug: "sg", code: "SG", name: "Singapore", currency: "SGD" },
  { slug: "au", code: "AU", name: "Australia", currency: "AUD" },
  { slug: "ca", code: "CA", name: "Canada", currency: "CAD" },
  { slug: "de", code: "DE", name: "Germany", currency: "EUR" },
  { slug: "fr", code: "FR", name: "France", currency: "EUR" },
  { slug: "nl", code: "NL", name: "Netherlands", currency: "EUR" },
  { slug: "es", code: "ES", name: "Spain", currency: "EUR" },
  { slug: "it", code: "IT", name: "Italy", currency: "EUR" },
  { slug: "ie", code: "IE", name: "Ireland", currency: "EUR" },
  { slug: "ch", code: "CH", name: "Switzerland", currency: "CHF" },
  { slug: "se", code: "SE", name: "Sweden", currency: "SEK" },
  { slug: "no", code: "NO", name: "Norway", currency: "NOK" },
  { slug: "dk", code: "DK", name: "Denmark", currency: "DKK" },
  { slug: "fi", code: "FI", name: "Finland", currency: "EUR" },
  { slug: "be", code: "BE", name: "Belgium", currency: "EUR" },
  { slug: "at", code: "AT", name: "Austria", currency: "EUR" },
  { slug: "pl", code: "PL", name: "Poland", currency: "PLN" },
  { slug: "sa", code: "SA", name: "Saudi Arabia", currency: "SAR" },
  { slug: "qa", code: "QA", name: "Qatar", currency: "QAR" },
  { slug: "kw", code: "KW", name: "Kuwait", currency: "KWD" },
  { slug: "bh", code: "BH", name: "Bahrain", currency: "BHD" },
  { slug: "om", code: "OM", name: "Oman", currency: "OMR" },
  { slug: "eg", code: "EG", name: "Egypt", currency: "EGP" },
  { slug: "za", code: "ZA", name: "South Africa", currency: "ZAR" },
  { slug: "ng", code: "NG", name: "Nigeria", currency: "NGN" },
  { slug: "ke", code: "KE", name: "Kenya", currency: "KES" },
  { slug: "my", code: "MY", name: "Malaysia", currency: "MYR" },
  { slug: "id", code: "ID", name: "Indonesia", currency: "IDR" },
  { slug: "th", code: "TH", name: "Thailand", currency: "THB" },
  { slug: "ph", code: "PH", name: "Philippines", currency: "PHP" },
  { slug: "vn", code: "VN", name: "Vietnam", currency: "VND" },
  { slug: "jp", code: "JP", name: "Japan", currency: "JPY" },
  { slug: "kr", code: "KR", name: "South Korea", currency: "KRW" },
  { slug: "hk", code: "HK", name: "Hong Kong", currency: "HKD" },
  { slug: "nz", code: "NZ", name: "New Zealand", currency: "NZD" },
  { slug: "br", code: "BR", name: "Brazil", currency: "BRL" },
  { slug: "mx", code: "MX", name: "Mexico", currency: "MXN" },
  { slug: "ar", code: "AR", name: "Argentina", currency: "ARS" },
  { slug: "cl", code: "CL", name: "Chile", currency: "CLP" },
  { slug: "co", code: "CO", name: "Colombia", currency: "COP" },
  { slug: "lk", code: "LK", name: "Sri Lanka", currency: "LKR" },
  { slug: "bd", code: "BD", name: "Bangladesh", currency: "BDT" },
  { slug: "pk", code: "PK", name: "Pakistan", currency: "PKR" },
  { slug: "np", code: "NP", name: "Nepal", currency: "NPR" },
  { slug: "tr", code: "TR", name: "Turkey", currency: "TRY" },
];

export const CITIES_IN = [
  { slug: "delhi", name: "Delhi" },
  { slug: "bangalore", name: "Bangalore" },
  { slug: "mumbai", name: "Mumbai" },
  { slug: "hyderabad", name: "Hyderabad" },
  { slug: "chennai", name: "Chennai" },
  { slug: "pune", name: "Pune" },
  { slug: "gurgaon", name: "Gurgaon" },
  { slug: "noida", name: "Noida" },
  { slug: "kolkata", name: "Kolkata" },
  { slug: "ahmedabad", name: "Ahmedabad" },
];



export const COURSES: CourseContent[] = [
  {
    slug: "safe-product-owner-product-manager-certification",
    title: "SAFe Product Owner / Product Manager (POPM) Certification Training",
    shortTitle: "SAFe POPM",
    subtitle: "Become a certified SAFe Product Owner / Product Manager and lead value delivery in an Agile Release Train.",
    summary:
      "Get globally accredited SAFe POPM 6.0 certification training led by SPCs with hands-on labs, real ART scenarios, and 16 PDUs.",
    description:
      "The SAFe Product Owner / Product Manager certification training equips product professionals to apply Lean-Agile and SAFe principles to identify customer needs, prioritize the program backlog, plan and execute Program Increments (PIs), and deliver continuous value. Across two intensive days, you will work through real Agile Release Train scenarios with a Scaled Agile-certified SPC trainer, learn to write effective stories, refine features, manage the program backlog, and prepare thoroughly for the SAFe POPM 6.0 exam.",
    category: { slug: "safe", name: "Scaled Agile (SAFe)" },
    durationLabel: "2 Days (16 Hours)",
    level: "Intermediate",
    accreditedBy: "Scaled Agile, Inc.",
    basePriceInr: 24999,
    basePriceUsd: 549,
    examIncluded: true,
    ratingAvg: 4.8,
    ratingCount: 2143,
    heroImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    keyFeatures: [
      { icon: "Clock", label: "16 Hours of Live Instructor-Led Training" },
      { icon: "Award", label: "SAFe POPM 6.0 Certification" },
      { icon: "Users", label: "Trained by SPC-Certified Instructors" },
      { icon: "BookOpen", label: "Official Scaled Agile Courseware" },
      { icon: "Calendar", label: "1-Year Membership with Scaled Agile" },
      { icon: "Repeat", label: "Free Course Retake Within 90 Days" },
      { icon: "Headphones", label: "24x7 Learner Assistance" },
      { icon: "FileCheck", label: "16 PDUs & SEUs on Completion" },
    ],
    learningOutcomes: [
      "Apply SAFe in the Lean enterprise to drive customer-centric value delivery",
      "Connect strategy to execution through the SAFe portfolio and program levels",
      "Refine the program backlog and write features and stories with clear acceptance criteria",
      "Plan and execute Program Increments (PI) including PI Planning, system demos and inspect-and-adapt",
      "Decompose epics into features and features into user stories",
      "Apply Weighted Shortest Job First (WSJF) for backlog prioritization",
      "Manage stakeholders and represent the customer in ART events",
      "Pass the SAFe POPM 6.0 certification exam with confidence",
    ],
    whoShouldAttend: [
      "Product Owners and Product Managers in Agile organizations",
      "Business Analysts moving into product roles",
      "Solution and Portfolio Managers",
      "Release Train Engineers and Scrum Masters",
      "Project Managers transitioning to product roles",
      "Anyone preparing for SAFe POPM 6.0 certification",
    ],
    prerequisites: [
      "Familiarity with Agile concepts and principles",
      "Background in business analysis, product or project management is helpful",
      "Experience working with software and systems development is recommended",
    ],
    curriculum: [
      {
        title: "Module 1: Becoming a Product Owner / Product Manager in the SAFe Enterprise",
        topics: [
          "Understanding the role in SAFe",
          "Customer centricity and Design Thinking",
          "Continuous exploration and the SAFe House of Lean",
        ],
      },
      {
        title: "Module 2: Applying SAFe in the Lean Enterprise",
        topics: [
          "Lean-Agile Mindset and SAFe Principles",
          "Connecting portfolio to execution",
          "Agile Release Train (ART) overview",
        ],
      },
      {
        title: "Module 3: Connecting with Customers",
        topics: [
          "Persona development",
          "Empathy maps and customer journey mapping",
          "Validating product hypotheses",
        ],
      },
      {
        title: "Module 4: Exploring the Solution",
        topics: [
          "Vision, roadmap and the program backlog",
          "Features, benefit hypotheses and acceptance criteria",
          "Estimating and forecasting with WSJF",
        ],
      },
      {
        title: "Module 5: Executing the Program Increment",
        topics: [
          "Preparing for PI Planning",
          "Story writing and refinement",
          "System demos and inspect-and-adapt",
        ],
      },
      {
        title: "Module 6: Becoming a Certified SAFe POPM",
        topics: [
          "Exam preparation and practice questions",
          "Continuing your learning journey",
          "Joining the Scaled Agile community",
        ],
      },
    ],
    whyChooseUs: [
      { title: "Accredited Training Partner", body: "We are accredited to deliver official SAFe courseware with certified SPC trainers worldwide." },
      { title: "Real-World Practitioners", body: "All trainers are practicing SPCs with 15+ years of enterprise transformation experience." },
      { title: "100% Exam Pass Support", body: "Mock exams, exam strategy sessions and a free retake within 90 days." },
      { title: "Flexible Learning Modes", body: "Weekend, weekday and corporate batches across 10+ Indian cities and online globally." },
    ],
    faqs: [
      { q: "What is the SAFe POPM certification?", a: "The SAFe Product Owner / Product Manager (POPM) certification is awarded by Scaled Agile, Inc. to professionals who demonstrate the ability to apply Lean, Agile and SAFe principles to product management in an Agile Release Train." },
      { q: "What is the duration of the SAFe POPM training?", a: "The training is 2 days (16 hours) of live instructor-led sessions, with additional self-paced content and exam preparation material." },
      { q: "Is the exam fee included?", a: "Yes, the first attempt of the SAFe POPM 6.0 certification exam is included in your training fee, along with a one-year membership to the Scaled Agile community." },
      { q: "What is the passing score?", a: "You need to score at least 77% (33 out of 45) within 90 minutes to pass the SAFe POPM certification exam." },
      { q: "Will I get PDUs for this course?", a: "Yes, you will earn 16 PDUs / SEUs on successful completion of the training." },
      { q: "Do you provide a refund?", a: "Yes, we offer a 100% money-back guarantee if you are not satisfied with the training, subject to our refund policy." },
    ],
    seoTitle: "SAFe POPM Certification Training | SAFe Product Owner Product Manager Course",
    seoDescription:
      "Get SAFe POPM 6.0 certified with Ulearnsystems. Live instructor-led SAFe Product Owner / Product Manager training by SPC-certified trainers. Exam fee included.",
    seoKeywords:
      "safe popm certification, safe product owner product manager training, popm certification training, safe 6.0 popm",
  },
  {
    slug: "safe-scrum-master-certification",
    title: "SAFe Scrum Master (SSM) Certification Training",
    shortTitle: "SAFe Scrum Master",
    subtitle: "Become a certified SAFe Scrum Master and lead high-performing Agile teams in a SAFe enterprise.",
    summary:
      "Live instructor-led SAFe Scrum Master 6.0 certification course with hands-on PI Planning simulation, exam fee and 14 PDUs included.",
    description:
      "The SAFe Scrum Master certification training prepares Scrum Masters for their role in a SAFe enterprise. Unlike traditional Scrum Master training that focuses on the team-level Scrum role, this course explores the role of the Scrum Master in the context of the entire enterprise. You will learn how to facilitate Agile Release Train (ART) events including PI Planning, coach teams to deliver maximum business value, build high-performing teams using Scrum, Kanban and built-in quality, and prepare for the SAFe SSM 6.0 certification.",
    category: { slug: "safe", name: "Scaled Agile (SAFe)" },
    durationLabel: "2 Days (16 Hours)",
    level: "Intermediate",
    accreditedBy: "Scaled Agile, Inc.",
    basePriceInr: 22999,
    basePriceUsd: 499,
    examIncluded: true,
    ratingAvg: 4.9,
    ratingCount: 3120,
    heroImage:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80",
    keyFeatures: [
      { icon: "Clock", label: "16 Hours of Live Instructor-Led Training" },
      { icon: "Award", label: "SAFe SSM 6.0 Certification" },
      { icon: "Users", label: "SPC-Certified Trainers" },
      { icon: "BookOpen", label: "Official Scaled Agile Courseware" },
      { icon: "Calendar", label: "1-Year Scaled Agile Membership" },
      { icon: "FileCheck", label: "14 PDUs & 14 SEUs" },
      { icon: "Repeat", label: "Free Retake Within 90 Days" },
      { icon: "Headphones", label: "24x7 Learner Support" },
    ],
    learningOutcomes: [
      "Describe Scrum in a SAFe enterprise",
      "Facilitate Scrum events including iteration planning, review and retrospective",
      "Support PI execution and facilitate ART events",
      "Coach Agile teams for maximum business value delivery",
      "Build high-performing teams using Scrum, Kanban and XP practices",
      "Improve flow with Kanban and quality with built-in quality practices",
      "Prepare for the SAFe Scrum Master 6.0 certification exam",
    ],
    whoShouldAttend: [
      "New and existing Scrum Masters",
      "Team Leads and Project Managers transitioning to Scrum Master roles",
      "Engineering and Development Managers responsible for Agile teams",
      "Release Train Engineers",
      "Agile coaches and consultants",
    ],
    prerequisites: [
      "Familiarity with Agile concepts and principles is recommended",
      "Experience as a team member on a Scrum team is helpful but not mandatory",
    ],
    curriculum: [
      { title: "Module 1: Introducing Scrum in SAFe", topics: ["Scrum in the SAFe enterprise", "SAFe principles and the Lean-Agile mindset", "ART roles and responsibilities"] },
      { title: "Module 2: Characterizing the Role of the Scrum Master", topics: ["Servant leadership", "Coaching the team", "Scrum Master as a facilitator"] },
      { title: "Module 3: Experiencing PI Planning", topics: ["Preparing and facilitating PI Planning", "Aligning teams around a common vision", "Identifying risks and dependencies"] },
      { title: "Module 4: Facilitating Iteration Execution", topics: ["Iteration planning, daily stand-ups, review and retrospective", "Iteration metrics and continuous improvement"] },
      { title: "Module 5: Finishing the PI", topics: ["Solution demo", "Inspect and Adapt workshop", "Problem-solving and improvement backlog"] },
      { title: "Module 6: Coaching the ART", topics: ["Scrum of Scrums", "PO Sync and ART Sync events", "Continuous improvement"] },
    ],
    whyChooseUs: [
      { title: "Accredited Curriculum", body: "Official Scaled Agile courseware with up-to-date 6.0 content and digital workbook." },
      { title: "SPC Trainers Only", body: "Our trainers are SPCs with deep experience leading SAFe transformations at Fortune 500 companies." },
      { title: "Hands-on PI Simulation", body: "Practice a full PI Planning exercise with breakouts, draft plan review and confidence vote." },
      { title: "Outcome Driven", body: "Mock exams, exam strategy sessions and a free retake within 90 days." },
    ],
    faqs: [
      { q: "Who is a SAFe Scrum Master?", a: "A SAFe Scrum Master is a servant leader and coach for an Agile team who facilitates team and ART events to maximize the business value delivered by the team." },
      { q: "How is SAFe SSM different from a regular CSM?", a: "Unlike team-level Scrum Master certifications, SAFe SSM focuses on the role of the Scrum Master in a scaled, multi-team Agile Release Train context including PI Planning, Scrum of Scrums and Inspect and Adapt." },
      { q: "Is the exam included?", a: "Yes, the first attempt of the SAFe SSM 6.0 certification exam is included in the course fee." },
      { q: "What is the SSM 6.0 exam passing score?", a: "You need to score at least 73% (33 out of 45) within 90 minutes." },
      { q: "How long is the certification valid?", a: "The SAFe SSM certification is valid for one year and can be renewed annually." },
      { q: "Will I receive PDUs?", a: "Yes, you will earn 14 PDUs and 14 SEUs on successful completion." },
    ],
    seoTitle: "SAFe Scrum Master (SSM) Certification Training Online",
    seoDescription:
      "Get certified as a SAFe Scrum Master 6.0 with Ulearnsystems. Live instructor-led SSM course with PI Planning simulation, exam fee included and 14 PDUs.",
    seoKeywords:
      "safe scrum master certification, ssm certification training, safe ssm 6.0, scaled agile scrum master",
  },
  {
    slug: "safe-devops-certification",
    title: "SAFe DevOps (SDP) Certification Training",
    shortTitle: "SAFe DevOps",
    subtitle: "Build a DevOps culture and continuous delivery pipeline that delivers value end-to-end.",
    summary:
      "Live SAFe DevOps Practitioner (SDP) 6.0 certification training with CALMR, value stream mapping and CI/CD pipeline design. Exam fee included.",
    description:
      "The SAFe DevOps certification course teaches the skills and tools needed to optimize the flow of value through the continuous delivery pipeline. You will explore the entire flow of value from idea to operating solution, map your current value stream, identify bottlenecks and design an actionable improvement plan. Through the CALMR approach (Culture, Automation, Lean flow, Measurement, Recovery) you will learn to break down silos between development and operations and build a high-performing DevOps culture.",
    category: { slug: "devops", name: "DevOps" },
    durationLabel: "2 Days (16 Hours)",
    level: "Intermediate to Advanced",
    accreditedBy: "Scaled Agile, Inc.",
    basePriceInr: 26999,
    basePriceUsd: 599,
    examIncluded: true,
    ratingAvg: 4.8,
    ratingCount: 1485,
    heroImage:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
    keyFeatures: [
      { icon: "Clock", label: "16 Hours of Live Instructor-Led Training" },
      { icon: "Award", label: "SAFe DevOps Practitioner (SDP) Certification" },
      { icon: "Users", label: "Led by SPC-Certified Trainers" },
      { icon: "Workflow", label: "Hands-on Value Stream Mapping" },
      { icon: "BookOpen", label: "Official Scaled Agile Courseware" },
      { icon: "FileCheck", label: "16 PDUs & 16 SEUs" },
      { icon: "Repeat", label: "Free Retake Within 90 Days" },
      { icon: "Headphones", label: "24x7 Learner Support" },
    ],
    learningOutcomes: [
      "Explain how DevOps enables strategic business objectives",
      "Apply the CALMR approach to DevOps to break down silos",
      "Map and measure value streams from concept to cash",
      "Design a continuous delivery pipeline tailored to your enterprise",
      "Continuously explore, integrate, deploy and release on demand",
      "Build in quality and security with DevSecOps practices",
      "Pass the SAFe DevOps Practitioner certification exam",
    ],
    whoShouldAttend: [
      "All members of an Agile Release Train",
      "Development, QA and infrastructure managers",
      "Site Reliability Engineers (SREs)",
      "Release managers and release train engineers",
      "Application developers and product managers",
      "Security and compliance professionals",
    ],
    prerequisites: [
      "Familiarity with Agile, Scrum and SAFe concepts is recommended",
      "Experience in software development, IT operations or DevOps practices is helpful",
    ],
    curriculum: [
      { title: "Module 1: Introducing DevOps", topics: ["What is DevOps?", "Business case for DevOps", "CALMR approach"] },
      { title: "Module 2: Mapping Your Continuous Delivery Pipeline", topics: ["Value stream mapping", "Identifying bottlenecks and waste", "Measuring flow"] },
      { title: "Module 3: Gaining Alignment with Continuous Exploration", topics: ["Hypothesis-driven development", "Architecting for continuous delivery"] },
      { title: "Module 4: Building Quality with Continuous Integration", topics: ["Build automation", "Test automation", "Trunk-based development"] },
      { title: "Module 5: Reducing Time-to-Market with Continuous Deployment", topics: ["Deployment automation", "Feature toggles", "Dark launches"] },
      { title: "Module 6: Delivering Value with Release on Demand", topics: ["Stabilizing and operating in production", "Measuring value", "Recovering quickly"] },
      { title: "Module 7: Taking Action", topics: ["Action plan", "DevOps roadmap", "Becoming a SAFe DevOps Practitioner"] },
    ],
    whyChooseUs: [
      { title: "Practitioner-Led Training", body: "Trainers are practicing SREs and DevOps leads at large enterprises, not academic instructors." },
      { title: "Real Value Stream Workshop", body: "Map a real value stream during class with actionable improvement recommendations." },
      { title: "Tool-Agnostic", body: "Concepts apply across Jenkins, GitHub Actions, GitLab, Azure DevOps and more." },
      { title: "Outcome-Focused", body: "Leave with a concrete DevOps adoption roadmap for your organization." },
    ],
    faqs: [
      { q: "What is the SAFe DevOps certification?", a: "The SAFe DevOps Practitioner (SDP) certification is awarded by Scaled Agile, Inc. to professionals who can map their continuous delivery pipeline and apply the CALMR approach to DevOps." },
      { q: "Is this course technical?", a: "The course is conceptual and applies across technology stacks. It does not require hands-on coding, although familiarity with software delivery is helpful." },
      { q: "Is the exam fee included?", a: "Yes, the first attempt of the SAFe DevOps Practitioner certification exam is included." },
      { q: "What is the passing score?", a: "You need at least 78% (35 out of 45) within 90 minutes." },
      { q: "How is this different from other DevOps courses?", a: "SAFe DevOps focuses on building a DevOps culture and value stream within a scaled Agile enterprise, rather than just teaching specific tools." },
      { q: "Will I get PDUs?", a: "Yes, you will earn 16 PDUs and 16 SEUs upon completion." },
    ],
    seoTitle: "SAFe DevOps (SDP) Certification Training | CALMR & Value Stream",
    seoDescription:
      "Get certified as a SAFe DevOps Practitioner with Ulearnsystems. Live SDP 6.0 training with CALMR, value stream mapping and CI/CD pipeline design. Exam included.",
    seoKeywords:
      "safe devops certification, sdp certification, safe devops practitioner training, devops with safe",
  },
];

export const GLOBAL_FAQS: FaqItem[] = [
  { q: "Are Ulearnsystems courses globally accredited?", a: "Yes. Ulearnsystems is an accredited training partner for Scaled Agile, PMI, Scrum Alliance, Axelos, EXIN, PeopleCert and other leading certification bodies. All our certifications are globally recognized." },
  { q: "Do you offer corporate training?", a: "Yes. We deliver private group training, custom curriculum and bulk enrollment programs for enterprises globally. Visit our Corporate Training page or contact us for a tailored proposal." },
  { q: "Can I switch batches if I miss a session?", a: "Absolutely. With our flexible re-attendance policy, you can attend the missed sessions in any upcoming batch at no extra cost." },
  { q: "How do I access course material after the training?", a: "You receive lifetime access to our Learning Management System (LMS) including recordings, slides, practice tests, and reference material." },
  { q: "What payment options are available?", a: "We accept all major credit and debit cards, net banking, UPI, PayPal and bank transfers. EMI options and corporate invoicing are also available." },
];

export const TRAINERS = [
  {
    slug: "ravi-kumar",
    name: "Ravi Kumar",
    title: "Principal SAFe Program Consultant (SPC)",
    bio: "Ravi is a SAFe SPC and Agile coach with 18+ years of enterprise transformation experience. He has led SAFe rollouts for Fortune 100 banks, telecoms and insurance companies across India, Europe and the Middle East.",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    rating: 4.9, reviews: 412, experienceYears: 18,
    expertise: ["SAFe 6.0", "Agile Coaching", "Lean Portfolio Management", "DevOps"],
    certifications: ["SAFe SPC", "PMI-ACP", "CSP-SM", "ICP-ACC"],
    linkedinUrl: "https://www.linkedin.com/in/example",
    isFeatured: true,
    assignedCourses: ["safe-scrum-master-certification", "safe-product-owner-product-manager-certification"],
  },
  {
    slug: "anitha-rao",
    name: "Anitha Rao",
    title: "Senior Agile Coach & SAFe SPC",
    bio: "Anitha specializes in coaching product organizations through scaling journeys. She has trained 5,000+ practitioners across SAFe, Scrum and Product Management certifications.",
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
    rating: 4.9, reviews: 387, experienceYears: 15,
    expertise: ["SAFe POPM", "Product Management", "Design Thinking", "OKRs"],
    certifications: ["SAFe SPC", "POPM", "CSPO", "CSM"],
    linkedinUrl: "https://www.linkedin.com/in/example",
    isFeatured: true,
    assignedCourses: ["safe-product-owner-product-manager-certification"],
  },
  {
    slug: "deepak-menon",
    name: "Deepak Menon",
    title: "DevOps Practitioner & SAFe SPC",
    bio: "Deepak is a hands-on DevOps and SRE practitioner who has built CI/CD pipelines at scale for global product engineering teams. He brings real value stream optimization stories into the classroom.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    rating: 4.8, reviews: 256, experienceYears: 14,
    expertise: ["SAFe DevOps", "CI/CD", "SRE", "Kubernetes"],
    certifications: ["SAFe SPC", "SAFe DevOps Practitioner", "AWS DevOps Pro"],
    linkedinUrl: "https://www.linkedin.com/in/example",
    isFeatured: true,
    assignedCourses: ["safe-devops-certification", "safe-scrum-master-certification"],
  },
];

export const TESTIMONIALS = [
  { name: "Anita Sharma", role: "Senior Scrum Master", company: "Infosys", quote: "The SSM training at Ulearnsystems was hands-down the most practical SAFe course I have attended. The PI Planning simulation felt like a real ART event.", rating: 5, course: "SAFe Scrum Master" },
  { name: "Rohit Verma", role: "Product Manager", company: "Wipro", quote: "Cleared my POPM exam on the first attempt. The trainer connected every concept to real product scenarios. Highly recommended.", rating: 5, course: "SAFe POPM" },
  { name: "Sandeep Iyer", role: "DevOps Lead", company: "TCS", quote: "Value stream mapping during the SAFe DevOps class gave me a concrete improvement roadmap I implemented the very next sprint.", rating: 5, course: "SAFe DevOps" },
  { name: "Priya Menon", role: "Agile Coach", company: "HCL", quote: "Excellent trainer, fantastic content and a very supportive team. The free retake policy gave me complete peace of mind.", rating: 5, course: "SAFe SSM" },
  { name: "Karthik Reddy", role: "Engineering Manager", company: "Mindtree", quote: "The 24x7 support is real. I had questions at midnight and got responses within an hour. The LMS is also very well organized.", rating: 5, course: "PMP" },
];

export function findCourse(slug: string) {
  return COURSES.find((c) => c.slug === slug);
}

export function findCountry(slug: string) {
  return COUNTRIES.find((c) => c.slug === slug);
}

export function findCity(slug: string) {
  return CITIES_IN.find((c) => c.slug === slug);
}
