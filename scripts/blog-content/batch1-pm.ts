import type { BlogSeed } from "./types";

// Batch 1 — Project management cluster. PMP facts reflect the July 2026 ECO
// transition noted in lib/cert-facts.ts.

export const PM_POSTS: BlogSeed[] = [
  {
    slug: "what-is-project-management",
    title: "What is Project Management? Principles, Phases and Careers",
    category: "Project Management",
    excerpt:
      "Project management explained from first principles: the triple constraint, five process phases, predictive vs agile delivery, essential skills and how the career ladder works.",
    readMins: 9,
    tags: ["Project Management", "PMP", "Careers"],
    seoTitle: "What is Project Management? A Complete Introduction",
    seoDescription:
      "A clear introduction to project management: definitions, the triple constraint, lifecycle phases, methodologies (predictive, agile, hybrid), key skills and career paths.",
    relatedCourseSlugs: ["pmp-certification-training", "capm-certification-training"],
    content: `
<p>A project is a temporary effort to create something unique — a product, a system, a building, a campaign. Project management is the discipline of getting that effort from idea to done: on purpose, with intent, against constraints. It's one of the most transferable professional skill sets in existence, which is why certified project managers work in every industry on earth.</p>

<h2>The triple constraint</h2>
<p>Every project balances three forces: <strong>scope</strong> (what gets built), <strong>time</strong> (when), and <strong>cost</strong> (with what resources) — with quality riding on all three. Pull one corner and the others move: expand scope and either the date slips or the budget grows. Much of a project manager's real job is making these trade-offs explicit so sponsors choose them consciously instead of discovering them late.</p>

<h2>The five phases</h2>
<ol>
<li><strong>Initiation</strong> — define why the project exists, its feasibility, and its charter; secure sponsorship.</li>
<li><strong>Planning</strong> — scope, schedule, budget, risks, resources, communication; depth varies enormously by delivery approach.</li>
<li><strong>Execution</strong> — the work happens; the PM coordinates, communicates and clears obstacles.</li>
<li><strong>Monitoring &amp; controlling</strong> — tracking against plan, managing change, keeping stakeholders honest — runs in parallel with execution.</li>
<li><strong>Closure</strong> — handover, acceptance, lessons learned, celebration and release of the team.</li>
</ol>

<h2>Predictive, agile, hybrid</h2>
<p>The traditional (predictive/waterfall) approach plans comprehensively up front — right for stable, well-understood work. Agile approaches deliver iteratively and re-plan continuously — right when requirements emerge through building. Most modern organisations blend both, and the profession has followed: the current PMP exam tests predictive, agile and hybrid delivery in roughly equal measure. A modern PM is bilingual by necessity — our <a href="/blog/agile-vs-waterfall">Agile vs Waterfall comparison</a> covers when each fits.</p>

<h2>The skills that matter</h2>
<ul>
<li><strong>Communication</strong> — the job's true core: status, expectations, bad news early.</li>
<li><strong>Stakeholder management</strong> — mapping who cares, who decides, who can sink you.</li>
<li><strong>Risk thinking</strong> — surfacing what could go wrong while it's still cheap to prevent.</li>
<li><strong>Estimation and scheduling</strong> — decomposition, dependencies, critical path.</li>
<li><strong>Leadership without authority</strong> — most PMs direct people who don't report to them.</li>
</ul>

<h2>The career ladder</h2>
<p>A common route: project coordinator → project manager → senior PM → program manager → portfolio/PMO leadership. Certifications anchor the milestones: <a href="/capm-certification-training">CAPM</a> validates fundamentals for early-career professionals, and the <a href="/pmp-certification-training">PMP</a> — with its 36-months-of-experience entry bar — is the profession's flagship credential, frequently a hard requirement in enterprise and government hiring. See our <a href="/info/pmp-certification-training">PMP certification guide</a> for eligibility, exam format and costs.</p>

<h2>Frequently asked questions</h2>
<h3>Is project management a dying career because of AI?</h3>
<p>Administrative PM work (status compilation, scheduling mechanics) is automating quickly. Judgment work — stakeholder negotiation, trade-off decisions, leading through ambiguity — is not, and demand for people who do it well remains strong.</p>
<h3>Project manager vs Scrum Master — the same thing?</h3>
<p>No: the PM owns delivery outcomes (scope, schedule, budget); the Scrum Master owns team effectiveness within a framework. Some organisations combine them, with mixed results.</p>
<h3>Do I need a degree to become a PM?</h3>
<p>No specific degree — PMI's eligibility paths accommodate both graduates and non-graduates (with more experience required for the latter).</p>
`,
  },
  {
    slug: "pmp-exam-guide-2026",
    title: "PMP Exam in 2026: New Format, Eligibility and a Realistic Study Plan",
    category: "Project Management",
    excerpt:
      "The PMP exam was refreshed in July 2026 — new content outline, PMBOK 8 alignment, new question types. Eligibility, format, and an 8-week plan that reflects the changes.",
    readMins: 9,
    tags: ["PMP", "Exam prep", "PMI"],
    seoTitle: "PMP Exam Guide 2026: New Format, Eligibility & Study Plan",
    seoDescription:
      "PMP exam 2026 explained: the updated Examination Content Outline, 180-question format, eligibility (36 months + 35 contact hours), fees, and an 8-week preparation plan.",
    relatedCourseSlugs: ["pmp-certification-training"],
    content: `
<p>The Project Management Professional (PMP) remains the most recognised project credential in the world — and 2026 is a transition year. PMI launched an updated exam in <strong>July 2026</strong>, built on a new Examination Content Outline aligned with current practice, including AI-augmented delivery and sustainability themes alongside the established people/process/business mix. If you're preparing now, make sure every resource you use targets the current outline.</p>

<h2>Eligibility: unchanged</h2>
<ul>
<li><strong>Four-year degree</strong> + 36 months of project leadership experience within the last 10 years, or</li>
<li><strong>Secondary diploma</strong> + 60 months of experience, and in both cases</li>
<li><strong>35 contact hours</strong> of project management education — satisfied by an authorised <a href="/pmp-certification-training">PMP prep course</a>.</li>
</ul>
<p>Experience doesn't require the "project manager" title — leading and directing project work in any role counts, documented honestly in the application.</p>

<h2>Exam format</h2>
<ul>
<li><strong>180 questions</strong>, of which 10 are unscored pretest items</li>
<li><strong>230 minutes</strong> with two optional 10-minute breaks, delivered in three sections of 60 questions</li>
<li><strong>Question types:</strong> multiple-choice, multiple-response, drag-and-drop — and the 2026 refresh adds more scenario-driven and hands-on style items</li>
<li><strong>Delivery:</strong> Pearson VUE test centre or online proctored</li>
<li>Roughly half the exam reflects agile or hybrid contexts — pure-predictive preparation hasn't been enough for years</li>
</ul>
<p>PMI reports results as proficiency levels per domain rather than a published percentage pass mark.</p>

<h2>An 8-week study plan</h2>
<ol>
<li><strong>Weeks 1–2:</strong> Complete your 35-contact-hour course; map the current ECO domains and tasks — the exam is built from this document, not from any single book.</li>
<li><strong>Weeks 3–4:</strong> Deep study by domain. Anchor predictive topics (critical path, EVM basics, risk) and agile topics (Scrum events, flow, servant leadership) equally.</li>
<li><strong>Week 5:</strong> The PMI mindset — for every scenario ask: what would a proactive, team-empowering, value-focused PM do <em>first</em>? Escalation and "consult the sponsor" are rarely first moves.</li>
<li><strong>Weeks 6–7:</strong> Full-length timed mocks — at least two complete 180-question sittings. Review every miss to its root: knowledge gap or misread scenario?</li>
<li><strong>Week 8:</strong> Weak-area drills, light review, logistics rehearsal. Book the slot when mocks stabilise above your comfort threshold.</li>
</ol>

<h2>Costs and renewal</h2>
<p>Exam fees are lower for PMI members (membership often pays for itself against the non-member fee — check current pricing on PMI.org as 2026 brought fee revisions). The credential renews on a three-year cycle: <strong>60 PDUs</strong>, at least 35 from education, the rest earnable by giving back to the profession. Full eligibility, syllabus and pricing details are in our <a href="/info/pmp-certification-training">PMP certification guide</a>.</p>

<h2>Frequently asked questions</h2>
<h3>I trained on the old outline — is my prep wasted?</h3>
<p>Core knowledge carries over; check that your question banks and mock exams are updated for the 2026 ECO, because question style and emphasis shifted more than the underlying discipline did.</p>
<h3>How many attempts do I get?</h3>
<p>Three within your one-year eligibility window; re-examination fees apply after the first attempt.</p>
<h3>Is PMP worth it against agile certifications?</h3>
<p>They're complements, not rivals: PMP signals delivery leadership breadth; CSM/PSM signal team-level agile depth. Senior delivery roles increasingly list both.</p>
`,
  },
  {
    slug: "pmp-vs-prince2",
    title: "PMP vs PRINCE2: Which Project Management Certification Should You Take?",
    category: "Project Management",
    excerpt:
      "PMP certifies experienced practitioners against a global standard; PRINCE2 teaches a prescriptive method. Geography, career stage and role decide — here's the honest breakdown.",
    readMins: 8,
    tags: ["PMP", "PRINCE2", "Certifications"],
    seoTitle: "PMP vs PRINCE2: Which Certification is Right for You?",
    seoDescription:
      "PMP vs PRINCE2 compared: philosophy, exam formats, eligibility, cost, geographic recognition and career fit — a practical guide to choosing your project management certification.",
    relatedCourseSlugs: ["pmp-certification-training", "prince2-foundation-practitioner-course"],
    content: `
<p>PMP and PRINCE2 are the two heavyweight project management credentials, and they're built on different philosophies. <strong>PMP</strong> (from PMI) certifies that an <em>experienced practitioner</em> can apply good practice across predictive, agile and hybrid delivery. <strong>PRINCE2</strong> (from PeopleCert/AXELOS) teaches a specific, prescriptive <em>method</em> — defined roles, seven processes, management by exception — that an organisation can install. One certifies judgment; the other teaches an operating manual.</p>

<h2>Side-by-side</h2>
<table>
<tr><th></th><th>PMP</th><th>PRINCE2 (7th edition)</th></tr>
<tr><td>Body</td><td>PMI</td><td>PeopleCert (AXELOS)</td></tr>
<tr><td>Nature</td><td>Standard of practice + experience bar</td><td>Prescriptive method, no experience bar</td></tr>
<tr><td>Eligibility</td><td>36–60 months experience + 35 contact hours</td><td>None for Foundation; Foundation for Practitioner</td></tr>
<tr><td>Exams</td><td>180 questions, 230 min</td><td>Foundation: 60 Q closed book · Practitioner: 70 Q open book, both 60% pass</td></tr>
<tr><td>Strong regions</td><td>North America, Middle East, India, Asia-Pacific</td><td>UK, Europe, Commonwealth, government sectors</td></tr>
<tr><td>Validity</td><td>3 years, 60 PDUs to renew</td><td>3 years, renew via CPD or re-exam</td></tr>
</table>

<h2>How to decide</h2>
<ul>
<li><strong>Where will you work?</strong> The bluntest factor. North America, the Gulf and India default to PMP; UK/European public sector and many Commonwealth employers ask for PRINCE2 by name.</li>
<li><strong>Career stage.</strong> Can't yet meet PMP's 36-month bar? PRINCE2 Foundation + Practitioner has no experience requirement and is a legitimate early-career credential — as is PMI's own <a href="/capm-certification-training">CAPM</a>.</li>
<li><strong>What your organisation runs.</strong> If your employer literally operates PRINCE2 governance (business case, stage gates, exception management), the method credential has immediate daily value.</li>
<li><strong>Depth vs breadth.</strong> PMP's scope is broader (people leadership, agile, business environment); PRINCE2 is deeper on one governance method.</li>
</ul>

<h2>The combination play</h2>
<p>The credentials complement rather than compete — PRINCE2 tells you <em>what the governance framework expects</em>; PMP develops <em>how you lead within and beyond it</em>. Senior delivery professionals in global organisations frequently hold both, often sequenced PRINCE2-first (early career, no experience bar) then PMP (once the hours accumulate). Compare the full details in our <a href="/info/pmp-certification-training">PMP guide</a> and <a href="/info/prince2-foundation-practitioner-course">PRINCE2 guide</a>.</p>

<h2>Frequently asked questions</h2>
<h3>Which is harder?</h3>
<p>PMP, overall — a longer exam plus the experience-documentation hurdle. PRINCE2 Practitioner is a demanding open-book test of applying the method, but the preparation load is lighter.</p>
<h3>Which pays more?</h3>
<p>Salary surveys consistently show a strong premium for PMP holders; PRINCE2's premium is most visible in markets that specifically demand it. Region and role dominate either effect.</p>
<h3>Is PRINCE2 agile-compatible?</h3>
<p>Yes — PRINCE2 Agile is a dedicated variant blending the governance layer with agile delivery, available as <a href="/prince2-agile-foundation-certification">Foundation</a> and Practitioner levels.</p>
`,
  },
  {
    slug: "capm-vs-pmp",
    title: "CAPM vs PMP: Which PMI Certification Matches Your Career Stage?",
    category: "Project Management",
    excerpt:
      "CAPM is the entry credential, PMP the experienced-practitioner flagship. Eligibility, exams, cost and career impact — plus when skipping CAPM makes sense.",
    readMins: 7,
    tags: ["CAPM", "PMP", "Certifications"],
    seoTitle: "CAPM vs PMP: Differences, Eligibility & Which to Take",
    seoDescription:
      "CAPM vs PMP compared: eligibility requirements, exam formats, costs, market value and career timing — when to start with CAPM and when to go straight for the PMP.",
    relatedCourseSlugs: ["capm-certification-training", "pmp-certification-training"],
    content: `
<p>Both certifications come from PMI, and the choice between them is really a question about <strong>where you are in your career</strong>. The Certified Associate in Project Management (CAPM) validates knowledge for people starting out; the Project Management Professional (PMP) validates experienced practice — with an eligibility bar to match.</p>

<h2>The eligibility divide</h2>
<ul>
<li><strong>CAPM:</strong> secondary degree plus 23 contact hours of project management education. No experience required — you can earn it as a student.</li>
<li><strong>PMP:</strong> 36 months of project leadership experience (with a four-year degree; 60 months without) plus 35 contact hours. The experience is verified through your documented application.</li>
</ul>
<p>This alone decides for many people: if you can't yet document three years of leading project work, PMP isn't available — the question becomes CAPM now versus waiting.</p>

<h2>Exams compared</h2>
<table>
<tr><th></th><th>CAPM</th><th>PMP</th></tr>
<tr><td>Questions</td><td>150 in 3 hours</td><td>180 in 230 minutes</td></tr>
<tr><td>Style</td><td>Fundamentals: predictive, agile, business analysis basics</td><td>Scenario judgment across people, process, business — the 2026 outline adds AI-era content</td></tr>
<tr><td>Difficulty</td><td>Knowledge-level; passable from study alone</td><td>Judgment-level; hard to pass without real experience to draw on</td></tr>
<tr><td>Validity</td><td>3 years (renewable via PDUs)</td><td>3 years, 60 PDUs per cycle</td></tr>
</table>

<h2>What each is worth in the market</h2>
<p>Honesty matters here: <strong>CAPM opens doors at the coordinator/analyst level</strong> — it signals commitment and vocabulary to employers hiring junior delivery staff, and it's increasingly listed in GCC and IT-services job posts for early-career roles. <strong>PMP changes salary bands</strong> — it's the credential that appears as a hard requirement in senior PM postings and that salary surveys consistently associate with a significant premium. CAPM is a stepping stone; PMP is a destination.</p>

<h2>Three sensible paths</h2>
<ol>
<li><strong>Student / career-changer with no project experience:</strong> take <a href="/capm-certification-training">CAPM</a> now; convert experience into PMP eligibility over the next 3 years.</li>
<li><strong>2–3 years into delivery work, PMP bar within reach:</strong> usually worth waiting and going <a href="/pmp-certification-training">straight to PMP</a> — the market value difference is large, and CAPM adds little once PMP is achievable.</li>
<li><strong>Experienced but undocumented:</strong> your blocker is application paperwork, not knowledge — reconstruct your project history; don't detour through CAPM.</li>
</ol>

<h2>Frequently asked questions</h2>
<h3>Does CAPM waive anything for PMP?</h3>
<p>Holding CAPM doesn't reduce PMP's experience requirement, though the 23 CAPM contact hours count toward PMP's 35 with a top-up.</p>
<h3>Is CAPM worth it if I qualify for PMP?</h3>
<p>Rarely — if you meet PMP eligibility, the stronger credential is the better investment of the same study effort. Details in our <a href="/info/capm-certification-training">CAPM guide</a> and <a href="/info/pmp-certification-training">PMP guide</a>.</p>
<h3>How long to prepare for each?</h3>
<p>Typical committed timelines: 4–6 weeks for CAPM, 8–12 weeks for PMP alongside a full-time job.</p>
`,
  },
  {
    slug: "project-manager-roles-and-responsibilities",
    title: "Project Manager Roles and Responsibilities Across the Project Lifecycle",
    category: "Project Management",
    excerpt:
      "What project managers actually own, phase by phase: initiation to closure, the daily reality between the phases, essential artifacts and how the role differs from adjacent titles.",
    readMins: 8,
    tags: ["Project Manager", "Careers", "Project Management"],
    seoTitle: "Project Manager Roles & Responsibilities Explained",
    seoDescription:
      "Project manager responsibilities across the lifecycle — initiation, planning, execution, monitoring, closure — plus daily realities, key artifacts and adjacent-role comparisons.",
    relatedCourseSlugs: ["pmp-certification-training", "project-management-fundamental-training"],
    content: `
<p>A project manager is accountable for bringing a project home: the agreed scope, at the agreed quality, within the time and budget the sponsor accepted — or renegotiating those constraints honestly when reality moves. The title spans industries, but the responsibility set is remarkably consistent.</p>

<h2>By lifecycle phase</h2>
<h3>Initiation</h3>
<ul>
<li>Shape the business case with the sponsor; test feasibility before money flows.</li>
<li>Draft the charter — objectives, success criteria, high-level scope, named authority.</li>
<li>Identify stakeholders and their stakes early, while goodwill is cheap.</li>
</ul>
<h3>Planning</h3>
<ul>
<li>Decompose scope (WBS or backlog), sequence dependencies, build the schedule and budget.</li>
<li>Run the first serious risk pass — identification, assessment, response owners.</li>
<li>Agree the communication rhythm: who hears what, when, in what form.</li>
</ul>
<h3>Execution</h3>
<ul>
<li>Coordinate the work without doing all of it — delegation is the phase's core skill.</li>
<li>Clear blockers, manage vendors, keep decisions moving at the pace of the work.</li>
<li>Lead the team: motivation, conflict, protection from organisational noise.</li>
</ul>
<h3>Monitoring &amp; controlling</h3>
<ul>
<li>Track actuals against plan — schedule, cost, scope, quality — and forecast, not just report.</li>
<li>Run change control: assess impact, decide or escalate, document. Scope creep is death by a thousand undocumented yeses.</li>
<li>Deliver bad news early — the discipline that separates trusted PMs from status-theatre PMs.</li>
</ul>
<h3>Closure</h3>
<ul>
<li>Formal acceptance, handover to operations, contract closeout.</li>
<li>Lessons learned that actually get written down and re-read.</li>
<li>Release and recognise the team.</li>
</ul>

<h2>The daily reality</h2>
<p>Between the phase diagrams, the average PM day is: one standup or status sync, two stakeholder conversations (one of them delicate), an hour of plan/risk/budget upkeep, unblocking two issues, and defending the team's focus from a meeting that could have been an email. Communication consumes the vast majority of the role — that's not overhead, that <em>is</em> the job.</p>

<h2>Adjacent titles, real differences</h2>
<ul>
<li><strong>vs Program manager</strong> — programs coordinate multiple related projects toward a combined outcome; strategic altitude rather than task altitude.</li>
<li><strong>vs Product manager</strong> — products are permanent, projects temporary: the product manager owns <em>what and why</em> over a lifetime; the PM owns <em>getting a defined change delivered</em>.</li>
<li><strong>vs Scrum Master</strong> — the Scrum Master owns team effectiveness within a framework, holds no scope/budget accountability, and leads by influence alone.</li>
</ul>

<p>Foundations for the role are covered in <a href="/project-management-fundamental-training">Project Management Fundamentals</a>; the <a href="/pmp-certification-training">PMP certification</a> is the standard credential once you have three years of experience — see the <a href="/info/pmp-certification-training">PMP guide</a> for eligibility and exam detail.</p>

<h2>Frequently asked questions</h2>
<h3>What makes a project manager fail?</h3>
<p>The recurring patterns: absorbing scope changes silently, reporting optimistically against evidence, and mistaking activity tracking for stakeholder leadership.</p>
<h3>Which industries hire the most PMs?</h3>
<p>IT and software, construction and infrastructure, banking/financial services, healthcare, energy and consulting — the skill set transfers across all of them.</p>
<h3>Is coding knowledge required for IT project management?</h3>
<p>No, but technical literacy — enough to follow architecture discussions and smell risk — measurably improves credibility and decisions.</p>
`,
  },
  {
    slug: "risk-management-in-project-management",
    title: "Risk Management in Projects: Identify, Assess, Respond, Monitor",
    category: "Project Management",
    excerpt:
      "A working guide to project risk management: identification techniques, probability-impact assessment, the four response strategies for threats, and keeping the register alive.",
    readMins: 8,
    tags: ["Risk Management", "Project Management", "PMP"],
    seoTitle: "Project Risk Management: Process, Register & Responses",
    seoDescription:
      "Practical project risk management: identification techniques, qualitative assessment with a probability-impact matrix, response strategies (avoid, transfer, mitigate, accept) and monitoring.",
    relatedCourseSlugs: ["pmp-certification-training", "pmi-acp-certification-training"],
    content: `
<p>A risk is an uncertain event that, if it occurs, affects your project's objectives — negatively (a threat) or positively (an opportunity). Risk management is not paperwork insurance; it's the discipline of spending small amounts of attention early to avoid spending large amounts of budget late. Projects rarely die from the risks in the register — they die from the ones nobody wrote down.</p>

<h2>Step 1 — Identify</h2>
<p>Cast a wide net, repeatedly (not once at kickoff):</p>
<ul>
<li><strong>Structured brainstorming</strong> with the people doing the work — they know where the bodies are buried.</li>
<li><strong>Checklists and prompt categories</strong> — technical, external, organisational, commercial (or a RBS if you're formal).</li>
<li><strong>Assumption analysis</strong> — every assumption in the plan is a risk wearing a disguise.</li>
<li><strong>Lessons from previous projects</strong> — the cheapest identification technique in existence, and the least used.</li>
<li><strong>Pre-mortem</strong> — "it's six months from now and the project failed; what killed it?" Reliably surfaces the risks people were too polite to raise.</li>
</ul>
<p>Write each risk in cause–event–effect form: <em>Because the vendor API docs are incomplete, integration may take longer than estimated, delaying UAT by up to three weeks.</em> Vague risks ("timeline risk") produce vague responses.</p>

<h2>Step 2 — Assess</h2>
<p>Qualitatively score each risk on <strong>probability</strong> and <strong>impact</strong> (typically 1–5 scales), plot them on a probability-impact matrix, and let the red corner earn the attention. Add urgency where response windows are short. Quantitative techniques (expected monetary value, Monte Carlo simulation) earn their overhead on large or contractual projects; most projects live well on a disciplined qualitative pass.</p>

<h2>Step 3 — Respond</h2>
<p>Four strategies for threats:</p>
<ul>
<li><strong>Avoid</strong> — change the plan so the risk can't occur (drop the risky component, change the approach).</li>
<li><strong>Transfer</strong> — move the impact to a third party (insurance, fixed-price contract, warranty). The risk still exists; the bill moves.</li>
<li><strong>Mitigate</strong> — reduce probability or impact (prototype early, add reviews, parallel-source).</li>
<li><strong>Accept</strong> — consciously live with it; actively (contingency reserve, trigger plan) or passively (noted, monitored).</li>
</ul>
<p>Opportunities mirror these: exploit, share, enhance, accept. Every non-accepted risk needs an <strong>owner</strong> — a risk owned by "the team" is owned by no one.</p>

<h2>Step 4 — Monitor</h2>
<p>The register is a living document or it's a dead one. Review the top risks in the regular cadence (weekly on the project, per-Sprint in agile delivery), watch trigger conditions, retire what's passed, add what's new, and audit whether responses actually happened. In agile contexts, much mitigation is structural — short iterations, early integration, frequent demos are risk management by design — but explicit risk conversations still catch what cadence alone doesn't.</p>

<p>Risk management is tested substantially on the <a href="/pmp-certification-training">PMP exam</a> across predictive and agile contexts, and features in the <a href="/pmi-acp-certification-training">PMI-ACP</a> as well — see the <a href="/info/pmp-certification-training">PMP guide</a> for how the domains break down.</p>

<h2>Frequently asked questions</h2>
<h3>Risk vs issue — what's the difference?</h3>
<p>A risk is uncertain and in the future; an issue has already happened. Risks get responses; issues get actions. Keeping the lists separate keeps both honest.</p>
<h3>How big should a contingency reserve be?</h3>
<p>Derived from the assessed risks (not a flat percentage folklore number) — expected-value math or simulation on larger projects, informed judgment on smaller ones, always visible to the sponsor.</p>
<h3>Who owns risk management on an agile team?</h3>
<p>Everyone surfaces risks; the Product Owner weighs value-side risks in ordering, the team owns technical mitigation, and delivery leads keep the conversation regular.</p>
`,
  },
];
