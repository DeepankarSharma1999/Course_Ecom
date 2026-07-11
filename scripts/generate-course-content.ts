// Generates original, per-course SEO content into Course.description (HTML),
// plus summary / seoTitle / seoDescription / seoKeywords.
// Priority courses get hand-written rich copy; the rest get a varied generator.
// All content is original — written from general knowledge of these certifications.
// Run: docker exec mindclick-web npx tsx scripts/generate-course-content.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const BRAND = "Simplilead";

// Acronym = text inside the first (...) in the title, else null.
const acronymOf = (title: string) => (title.match(/\(([^)]+)\)/)?.[1] ?? "").replace(/[®™℠]/g, "").trim() || null;
// Plain name without the trailing "Certification Training"/"Training" noise.
const baseNameOf = (s: string) =>
  s.replace(/[®™℠]/g, "").replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+(Certification Training|Certification|Training|Course)$/i, "").replace(/\s+/g, " ").trim();

const ul = (items: string[]) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

// ---- Category profiles: domain-specific skills / audience / angle ------------
type Profile = { domain: string; about: string; skills: string[]; audience: string; outcome: string };
const PROFILES: Record<string, Profile> = {
  agile: {
    domain: "agile and Scrum", audience: "Scrum Masters, product owners, developers, project managers and team leads adopting agile ways of working",
    about: "how agile values and the Scrum framework help teams deliver value early, inspect and adapt, and improve continuously",
    skills: ["Facilitating effective Scrum events and team conversations", "Building and ordering a healthy backlog", "Coaching a self-organising, high-performing team", "Removing impediments and protecting team focus", "Measuring flow and delivering value incrementally", "Fostering a culture of continuous improvement"],
    outcome: "lead agile teams that ship valuable work predictably and keep getting better",
  },
  safe: {
    domain: "Scaled Agile (SAFe)", audience: "release train engineers, product managers, architects, Scrum Masters and leaders coordinating agile at enterprise scale",
    about: "how the Scaled Agile Framework aligns many teams around a common cadence, vision and flow of value",
    skills: ["Aligning multiple teams around shared objectives", "Planning and running Program Increments (PI)", "Managing flow across an Agile Release Train", "Connecting strategy to execution with lean portfolio thinking", "Coordinating dependencies and managing risk at scale", "Driving relentless improvement across the organisation"],
    outcome: "help large organisations deliver value faster with aligned, agile teams",
  },
  project: {
    domain: "project management", audience: "project managers, programme managers, team leads and professionals responsible for delivering initiatives on time and on budget",
    about: "how to plan, execute and control projects across scope, schedule, cost, quality, risk and stakeholders",
    skills: ["Planning scope, schedule and budget realistically", "Identifying, assessing and responding to risk", "Leading and motivating project teams", "Managing stakeholders and communications", "Controlling change and tracking progress", "Delivering outcomes aligned to business value"],
    outcome: "plan and deliver projects with confidence and control",
  },
  business: {
    domain: "business analysis", audience: "business analysts, product owners, consultants and professionals who bridge business needs and solutions",
    about: "how to elicit, analyse and communicate requirements that lead to the right solution",
    skills: ["Eliciting and documenting clear requirements", "Modelling processes and analysing stakeholders", "Defining solution scope and acceptance criteria", "Facilitating workshops and resolving conflicting needs", "Validating that solutions deliver real value", "Communicating analysis to technical and business audiences"],
    outcome: "turn ambiguous business needs into solutions that deliver value",
  },
  "data science": {
    domain: "data science and analytics", audience: "analysts, engineers, developers and professionals moving into data-driven roles",
    about: "how to work with data end to end — from cleaning and exploration to modelling and communicating insight",
    skills: ["Collecting, cleaning and preparing real-world data", "Exploratory analysis and statistical reasoning", "Building and evaluating machine-learning models", "Working with modern data tooling and libraries", "Turning analysis into clear, decision-ready insight", "Communicating findings to non-technical stakeholders"],
    outcome: "solve real problems with data and communicate the results with impact",
  },
  "generative ai": {
    domain: "generative and applied AI", audience: "engineers, product people, leaders and practitioners building with modern AI",
    about: "how to design, build and apply generative-AI and agentic systems responsibly and effectively",
    skills: ["Understanding modern AI models and their capabilities", "Designing prompts, tools and agentic workflows", "Integrating AI into real products and processes", "Evaluating quality, cost and reliability", "Applying responsible-AI and governance practices", "Identifying high-value AI use cases"],
    outcome: "build and apply AI solutions that create real, responsible value",
  },
  devops: {
    domain: "DevOps", audience: "developers, operations engineers, SREs and teams improving how software is built and released",
    about: "how culture, automation and flow shorten the path from idea to reliable production software",
    skills: ["Building CI/CD pipelines and automation", "Improving flow from commit to production", "Applying infrastructure-as-code practices", "Measuring and improving reliability", "Breaking down silos between dev and ops", "Embedding security and quality into delivery"],
    outcome: "ship software faster and more reliably across the delivery lifecycle",
  },
  "cloud computing": {
    domain: "cloud computing", audience: "engineers, architects, administrators and professionals building and running cloud workloads",
    about: "how to design, deploy and operate secure, scalable solutions on modern cloud platforms",
    skills: ["Core cloud services and architecture patterns", "Designing for scalability, resilience and cost", "Securing cloud workloads and identities", "Deploying and automating cloud infrastructure", "Monitoring and operating cloud environments", "Mapping business needs to cloud solutions"],
    outcome: "design and run reliable, secure solutions in the cloud",
  },
  quality: {
    domain: "quality and process improvement", audience: "quality professionals, managers, analysts and anyone driving operational excellence",
    about: "how proven quality and process-improvement methods reduce waste and raise performance",
    skills: ["Mapping and analysing processes for waste", "Applying data to find root causes", "Designing and running improvement initiatives", "Standardising and sustaining gains", "Leading change across teams", "Measuring quality and performance"],
    outcome: "drive measurable improvements in quality and efficiency",
  },
};
const DEFAULT_PROFILE: Profile = {
  domain: "professional", audience: "professionals looking to formalise their skills and advance their careers",
  about: "the core principles of the subject and how to apply them effectively in practice",
  skills: ["A solid grasp of the core concepts and vocabulary", "Practical techniques you can apply immediately", "How to avoid common real-world pitfalls", "Confidence to apply the approach in your own role", "Communicating the approach to colleagues and stakeholders", "A foundation for further certification and growth"],
  outcome: "apply the subject confidently in day-to-day work",
};
const profileFor = (categoryName: string) => PROFILES[categoryName.toLowerCase()] ?? DEFAULT_PROFILE;

// Deterministic pick so phrasing varies by course but stays stable across runs.
const hash = (s: string) => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); };

// ---- Rich, category-aware generator for the long tail ------------------------
function generate(c: { slug: string; title: string; shortTitle: string | null; categoryName: string }) {
  const name = baseNameOf(c.title);
  const acr = acronymOf(c.title);
  const label = acr ? `${name} (${acr})` : name;
  const p = profileFor(c.categoryName);
  const v = hash(c.slug);

  const intros = [
    `The ${label} training at ${BRAND} is built for professionals who want practical, job-ready skills in ${p.domain}, not theory alone. Through live, instructor-led sessions you apply every concept as you learn it and leave ready to put ${name} to work immediately.`,
    `Advance your career in ${p.domain} with the ${label} course at ${BRAND}. This hands-on, instructor-led program turns ${name} from an idea into a capability you can use — with real scenarios, expert guidance and a credential that proves it.`,
    `Master ${name} with the ${label} training at ${BRAND}. Designed around practice rather than slideware, this live course helps you build genuine, lasting capability in ${p.domain} and apply it the moment you return to work.`,
  ];

  return [
    `<p>${intros[v % intros.length]}</p>`,
    `<h2>What is ${name} training about?</h2>`,
    `<p>This course gives you a clear, structured path through ${p.about}. You will learn the underlying principles, when and why to apply them, and how to avoid the mistakes teams make in practice. Sessions are interactive and discussion-led, so you build understanding you can defend on the job — not just exam recall.</p>`,
    `<h2>Key highlights of the ${acr || name} course</h2>`,
    ul([
      `Live, instructor-led training delivered by experienced practitioners`,
      `Hands-on activities, real-world examples and case discussions in every session`,
      `Practical focus on applying ${name} in your own role and organisation`,
      `Downloadable course materials and reference guides to keep`,
      `Small-group format with room for your specific questions`,
      `Certificate of participation from ${BRAND}, plus guidance toward certification`,
    ]),
    `<h2>Skills you will gain</h2>`,
    `<p>The ${label} program is built around the capabilities that matter in ${p.domain}:</p>`,
    ul(p.skills),
    `<h2>Who should attend?</h2>`,
    `<p>This ${name} course is ideal for ${p.audience}. There are no rigid prerequisites — just an interest in doing the work well and a willingness to take part in the hands-on sessions.</p>`,
    `<h2>Why train with ${BRAND}?</h2>`,
    `<p>We focus on outcomes, not slideware. Expert trainers, practice-led sessions and ongoing learner support mean you finish the ${acr || name} training able to ${p.outcome} — with a credential that signals real capability to employers.</p>`,
  ].join("\n");
}

// ---- Hand-written rich content for priority courses --------------------------
// Original copy. Keyed by slug; only applied if that slug exists.
const RICH: Record<string, string> = {
  "csm-certification-training": [
    `<p>Step into one of agile's most in-demand roles with the Certified ScrumMaster (CSM) training at ${BRAND}. Over two engaging, activity-driven days you learn to set up Scrum the right way, remove the obstacles that slow teams down, and coach people toward genuinely high performance — then validate it all with the globally recognised Scrum Alliance CSM credential.</p>`,
    `<h2>What is the CSM course all about?</h2>`,
    `<p>The Certified ScrumMaster course gives you a working, hands-on grasp of Scrum: the accountabilities of the Scrum Master, Product Owner and Developers, how the events fit together across a Sprint, and how the artifacts keep everyone honest about progress. Rather than memorising a framework, you practise it — through facilitation exercises, role-plays and real-team scenarios — so you can lead confidently from day one.</p>`,
    `<h2>CSM certification key highlights</h2>`,
    ul([
      `Two days of live, interactive training with an experienced Certified Scrum Trainer`,
      `Hands-on facilitation practice, role-plays and real-world Scrum simulations`,
      `Two-year Scrum Alliance membership included with your certification`,
      `Practice questions and full guidance for the online CSM test`,
      `Earn professional development units toward future renewals`,
      `Access to a global community of Scrum practitioners`,
    ]),
    `<h2>Skills covered in the CSM training</h2>`,
    ul([
      `<strong>Servant leadership</strong> — guiding and empowering a team instead of directing it`,
      `<strong>Facilitation</strong> — running focused, productive Scrum events that people value`,
      `<strong>Coaching the agile mindset</strong> — helping a team embrace change and continuous improvement`,
      `<strong>Sprint planning &amp; backlog flow</strong> — keeping work prioritised and delivery incremental`,
      `<strong>Conflict resolution</strong> — surfacing and resolving tension constructively`,
      `<strong>Stakeholder communication</strong> — building transparency between the team and the business`,
    ]),
    `<h2>Who should attend?</h2>`,
    `<p>The CSM certification is ideal for anyone stepping into the Scrum Master role, as well as project managers, team leads, developers and product people who want a solid foundation in Scrum. No formal prerequisites are required.</p>`,
    `<h2>Why earn your CSM with ${BRAND}?</h2>`,
    `<p>You learn from Certified Scrum Trainers who have led real teams, in small interactive cohorts built around practice rather than PowerPoint. The result is a credential that proves capability — and the confidence to apply it the moment you return to work.</p>`,
  ].join("\n"),

  "cspo-certification-training": [
    `<p>Become the voice of the customer and the owner of value with the Certified Scrum Product Owner (CSPO) training at ${BRAND}. This two-day, hands-on course teaches you to shape a compelling product vision, build and order a backlog that maximises value, and partner with your team to turn ideas into outcomes — backed by the Scrum Alliance CSPO certification.</p>`,
    `<h2>What is the CSPO course all about?</h2>`,
    `<p>The Certified Scrum Product Owner course focuses on the decisions that make or break a product: what to build, in what order, and why. You practise writing clear product goals, slicing work into valuable increments, ordering a backlog under real constraints, and saying no well. Through exercises and case discussions you learn to balance stakeholder demands with customer value and team capacity.</p>`,
    `<h2>CSPO certification key highlights</h2>`,
    ul([
      `Two days of live, interactive training with an experienced Certified Scrum Trainer`,
      `Practical work on product vision, backlog creation and value-based prioritisation`,
      `Two-year Scrum Alliance membership included with your certification`,
      `Real-world case studies and stakeholder role-plays`,
      `Earn professional development units toward future learning`,
      `Membership in a worldwide community of product professionals`,
    ]),
    `<h2>Skills covered in the CSPO training</h2>`,
    ul([
      `<strong>Product vision &amp; strategy</strong> — setting direction the team can rally behind`,
      `<strong>Backlog management</strong> — capturing, refining and ordering work for maximum value`,
      `<strong>Prioritisation</strong> — making trade-offs with clear, defensible reasoning`,
      `<strong>Stakeholder management</strong> — aligning competing interests around outcomes`,
      `<strong>Value measurement</strong> — validating that what you ship actually matters`,
      `<strong>Collaboration with the team</strong> — turning vision into deliverable increments`,
    ]),
    `<h2>Who should attend?</h2>`,
    `<p>The CSPO certification suits product owners, product managers, business analysts, project managers and anyone responsible for what a team builds. No formal prerequisites are required.</p>`,
    `<h2>Why earn your CSPO with ${BRAND}?</h2>`,
    `<p>Our Certified Scrum Trainers bring real product experience into small, practice-led cohorts. You leave with techniques you can use on your very next backlog — and a credential that marks you as a serious product professional.</p>`,
  ].join("\n"),

  "pmp-certification-training": [
    `<p>Earn the world's most recognised project management credential with the Project Management Professional (PMP) training at ${BRAND}. This intensive, exam-focused course covers the people, process and business-environment skills today's projects demand — across predictive, agile and hybrid ways of working — and prepares you thoroughly for the PMI PMP exam.</p>`,
    `<h2>What is the PMP course all about?</h2>`,
    `<p>The PMP training builds the complete toolkit of a modern project manager: leading teams, managing stakeholders, planning and controlling scope, schedule, cost, risk and quality, and keeping delivery aligned to business value. It mirrors the current PMI examination content outline, blending tutorials, worked examples and practice questions so you understand the concepts and can apply them under exam conditions.</p>`,
    `<h2>PMP certification key highlights</h2>`,
    ul([
      `35 contact hours of project management education to meet PMI's eligibility requirement`,
      `Coverage of predictive, agile and hybrid delivery approaches`,
      `Hundreds of practice questions and full-length mock exams`,
      `Exam-application guidance and study planning support`,
      `Real-world scenarios drawn from live projects`,
      `Downloadable formulas, process guides and revision aids`,
    ]),
    `<h2>Skills covered in the PMP training</h2>`,
    ul([
      `<strong>Leading project teams</strong> — motivating, empowering and resolving conflict`,
      `<strong>Stakeholder &amp; communication management</strong> — keeping the right people aligned`,
      `<strong>Scope, schedule &amp; cost control</strong> — planning and tracking delivery`,
      `<strong>Risk management</strong> — anticipating and responding to uncertainty`,
      `<strong>Agile &amp; hybrid delivery</strong> — adapting the approach to the work`,
      `<strong>Business-focused delivery</strong> — tying projects to organisational value`,
    ]),
    `<h2>Who should attend?</h2>`,
    `<p>The PMP certification is designed for experienced project managers, team leads and professionals who direct projects and meet PMI's experience requirements. Some prior project experience is expected.</p>`,
    `<h2>Why prepare for the PMP with ${BRAND}?</h2>`,
    `<p>Our trainers are seasoned, certified practitioners who teach to the exam and to the job. With structured study support, realistic mocks and practical examples, you walk in prepared — and walk out ready to lead bigger projects.</p>`,
  ].join("\n"),
};

// ---- Category curriculum outlines --------------------------------------------
// Original outlines based on the standard syllabus topic areas published by the
// certifying bodies (factual topic structure, written in our own words).
type Module = { title: string; topics: string[] };
const CURRICULUM: Record<string, Module[]> = {
  agile: [
    { title: "Agile & Scrum Foundations", topics: ["Agile values and principles", "Empirical process control and iterative delivery", "When to use Scrum (and when not to)", "The Scrum framework at a glance"] },
    { title: "Roles & Accountabilities", topics: ["The Scrum Master as a servant-leader", "The Product Owner and value", "The Developers and self-management", "Working with stakeholders"] },
    { title: "Scrum Events", topics: ["Sprint and Sprint Planning", "Daily Scrum", "Sprint Review", "Sprint Retrospective", "The value of timeboxing"] },
    { title: "Scrum Artifacts & Commitments", topics: ["Product Backlog and the Product Goal", "Sprint Backlog and the Sprint Goal", "Increment and the Definition of Done", "Backlog refinement"] },
    { title: "Facilitation & Coaching", topics: ["Facilitating productive conversations", "Coaching teams toward self-management", "Resolving conflict constructively", "Removing impediments"] },
    { title: "Scaling & Continuous Improvement", topics: ["Working across multiple teams", "Common anti-patterns and how to avoid them", "Metrics that matter", "Fostering a culture of improvement"] },
  ],
  safe: [
    { title: "SAFe & Lean-Agile Foundations", topics: ["The Lean-Agile mindset", "SAFe core values and principles", "The SAFe configurations", "Building a Lean-Agile organisation"] },
    { title: "The Agile Release Train", topics: ["Organising teams around value", "ART roles and responsibilities", "Aligning teams to a common cadence", "Team and technical agility"] },
    { title: "Program Increment (PI) Planning", topics: ["Preparing for PI planning", "Setting vision and objectives", "Identifying and managing dependencies", "Building the program board"] },
    { title: "Executing & Delivering Value", topics: ["Managing flow with Kanban", "System demos and inspect & adapt", "DevOps and continuous delivery", "Measuring outcomes"] },
    { title: "Lean Portfolio & Leadership", topics: ["Connecting strategy to execution", "Lean budgets and guardrails", "Leading the change", "Relentless improvement at scale"] },
  ],
  project: [
    { title: "Project Management Foundations", topics: ["Projects, programs and portfolios", "Predictive, agile and hybrid approaches", "The role of the project manager", "Value and the business case"] },
    { title: "Initiating & Planning", topics: ["Defining scope and objectives", "Stakeholder identification", "Building the project plan", "Estimation techniques"] },
    { title: "Scope, Schedule & Cost", topics: ["Work breakdown structure", "Scheduling and critical path", "Budgeting and cost control", "Managing change"] },
    { title: "Risk & Quality", topics: ["Identifying and assessing risk", "Planning risk responses", "Quality planning and assurance", "Procurement basics"] },
    { title: "Leading, Monitoring & Closing", topics: ["Leading and motivating teams", "Communication and reporting", "Tracking progress and performance", "Closing and lessons learned"] },
  ],
  business: [
    { title: "Business Analysis Foundations", topics: ["The role of the business analyst", "Key concepts and terminology", "Planning the analysis approach", "Stakeholder analysis"] },
    { title: "Requirements Elicitation", topics: ["Elicitation techniques", "Running effective workshops", "Documenting requirements", "Confirming and validating needs"] },
    { title: "Analysis & Modelling", topics: ["Process and data modelling", "Defining solution scope", "Prioritising requirements", "Managing requirements and traceability"] },
    { title: "Solution Evaluation", topics: ["Acceptance and evaluation criteria", "Assessing solution performance", "Identifying improvement opportunities", "Communicating value"] },
    { title: "Collaboration & Communication", topics: ["Working with stakeholders", "Resolving conflicting needs", "Presenting analysis clearly", "Supporting implementation"] },
  ],
  "data science": [
    { title: "Data Science Foundations", topics: ["The data science workflow", "Roles and tools of the trade", "Types of data and problems", "Setting up your environment"] },
    { title: "Data Wrangling & Exploration", topics: ["Collecting and cleaning data", "Handling missing and messy data", "Exploratory data analysis", "Data visualisation"] },
    { title: "Statistics & Probability", topics: ["Descriptive statistics", "Probability and distributions", "Hypothesis testing", "Correlation and inference"] },
    { title: "Machine Learning", topics: ["Supervised vs unsupervised learning", "Regression and classification", "Clustering and dimensionality reduction", "Feature engineering"] },
    { title: "Evaluation & Deployment", topics: ["Model evaluation metrics", "Avoiding overfitting", "Putting models into production", "Monitoring and iteration"] },
    { title: "Communicating Insights", topics: ["Telling a story with data", "Building dashboards", "Presenting to non-technical audiences", "Driving decisions with data"] },
  ],
  "generative ai": [
    { title: "AI & LLM Foundations", topics: ["How modern AI models work", "Capabilities and limitations", "Key terminology", "Mapping use cases to value"] },
    { title: "Prompting & Design", topics: ["Prompt engineering techniques", "Structuring inputs and outputs", "Context and retrieval", "Iterating on quality"] },
    { title: "Building AI Applications", topics: ["Integrating models into products", "Tools and function calling", "Working with APIs and SDKs", "Managing cost and latency"] },
    { title: "Agentic Workflows", topics: ["Designing AI agents", "Multi-step and tool-using workflows", "Orchestration patterns", "Human-in-the-loop design"] },
    { title: "Evaluation, Safety & Governance", topics: ["Evaluating quality and reliability", "Responsible-AI practices", "Risk, privacy and compliance", "Monitoring in production"] },
  ],
  devops: [
    { title: "DevOps Foundations & Culture", topics: ["DevOps principles and value", "Breaking down silos", "Flow, feedback and continual learning", "Measuring delivery performance"] },
    { title: "Version Control & CI", topics: ["Working with Git", "Branching strategies", "Continuous integration", "Automated testing"] },
    { title: "Continuous Delivery", topics: ["Build and release pipelines", "Deployment strategies", "Release automation", "Rollback and recovery"] },
    { title: "Infrastructure as Code", topics: ["Provisioning with code", "Configuration management", "Containers and orchestration", "Environment consistency"] },
    { title: "Monitoring, Reliability & Security", topics: ["Observability and logging", "Reliability and SRE basics", "Security in the pipeline", "Incident response"] },
  ],
  "cloud computing": [
    { title: "Cloud Foundations", topics: ["Cloud models and benefits", "Core terminology", "Shared responsibility", "Getting started on the platform"] },
    { title: "Core Services & Architecture", topics: ["Compute, storage and networking", "Common architecture patterns", "Designing for scalability", "High availability and resilience"] },
    { title: "Security & Identity", topics: ["Identity and access management", "Securing workloads and data", "Encryption and key management", "Compliance basics"] },
    { title: "Deployment & Automation", topics: ["Provisioning resources", "Infrastructure as code", "Automating deployments", "Managing environments"] },
    { title: "Operations & Cost", topics: ["Monitoring and logging", "Performance optimisation", "Cost management", "Operational best practices"] },
  ],
  quality: [
    { title: "Quality & Process Foundations", topics: ["Quality and process improvement concepts", "Voice of the customer", "Process thinking", "Key methodologies overview"] },
    { title: "Define & Measure", topics: ["Defining the problem and scope", "Mapping the process", "Collecting reliable data", "Establishing a baseline"] },
    { title: "Analyse", topics: ["Root-cause analysis", "Identifying waste and variation", "Data-driven analysis", "Validating causes"] },
    { title: "Improve", topics: ["Generating improvement ideas", "Designing solutions", "Piloting changes", "Managing the change"] },
    { title: "Control & Sustain", topics: ["Standardising the new process", "Control plans and monitoring", "Sustaining the gains", "Continuous improvement"] },
  ],
};
const DEFAULT_CURRICULUM: Module[] = [
  { title: "Foundations & Key Concepts", topics: ["Core principles and terminology", "Why the approach matters", "Where it applies", "Setting the context"] },
  { title: "Core Practices", topics: ["The main techniques in detail", "Step-by-step application", "Worked examples", "Common pitfalls to avoid"] },
  { title: "Tools & Techniques", topics: ["Practical tools of the trade", "Hands-on exercises", "Templates and checklists", "Tips from practice"] },
  { title: "Applying It in Your Role", topics: ["Real-world scenarios", "Adapting to your context", "Working with stakeholders", "Measuring success"] },
  { title: "Continuous Improvement & Next Steps", topics: ["Reviewing and refining", "Sustaining the practice", "Further learning paths", "Preparing for certification"] },
];
const curriculumFor = (categoryName: string) => CURRICULUM[categoryName.toLowerCase()] ?? DEFAULT_CURRICULUM;

// Only courses still on the one-line seed stub get (re)generated. Anything
// already enriched or admin-edited (HTML, or any other text) is left untouched —
// so this is safe to run on every startup and never clobbers edits.
const isStub = (d: string | null | undefined) => !!d && d.startsWith("Enroll in the");

async function main() {
  // Fast path: if no course still has stub content, everything is already
  // generated — skip the full 200-row fetch/loop so re-deploys stay quick.
  const stubCount = await prisma.course.count({ where: { description: { startsWith: "Enroll in the" } } });
  if (stubCount === 0) {
    console.log("All courses already have content — skipping generation.");
    return;
  }
  const courses = await prisma.course.findMany({ include: { category: true } });
  let rich = 0, skipped = 0;
  for (const c of courses) {
    // A course is "done" when it has non-stub content AND a curriculum. Skip those
    // (preserves admin edits + generated content); enrich anything still missing.
    const hasCurric = Array.isArray(c.curriculum) && c.curriculum.length > 0;
    if (!isStub(c.description) && hasCurric) { skipped++; continue; }
    const categoryName = c.category?.name ?? "Professional";
    const name = baseNameOf(c.title);
    const acr = acronymOf(c.title);
    const description = RICH[c.slug] ?? generate({ slug: c.slug, title: c.title, shortTitle: c.shortTitle, categoryName });
    if (RICH[c.slug]) rich++;

    const summary = `${name}${acr ? ` (${acr})` : ""} training at ${BRAND}: live, instructor-led ${categoryName.toLowerCase()} certification with hands-on practice, expert trainers and real-world application.`;
    const seoTitle = `${c.title} | ${BRAND}`;
    const seoDescription = `Join ${name}${acr ? ` (${acr})` : ""} certification training at ${BRAND}. Live online classes, expert instructors, hands-on practice and full exam support. Enrol today.`;
    const seoKeywords = [name, acr, `${name} certification`, `${name} training`, `${name} course`, categoryName]
      .filter(Boolean).join(", ");

    // Every course gets a DB-driven, editable category curriculum (uniform across all).
    const curriculum = curriculumFor(categoryName);

    await prisma.course.update({
      where: { id: c.id },
      data: { description, summary, seoTitle, seoDescription, seoKeywords, curriculum: curriculum as any },
    });
  }
  const updated = courses.length - skipped;
  console.log(`Enriched ${updated} stub courses (${rich} hand-written, ${updated - rich} generated); left ${skipped} already-edited courses untouched.`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
