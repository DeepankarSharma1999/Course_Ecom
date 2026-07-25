import type { BlogSeed } from "./types";

// Batch 1 — Agile careers & practices cluster.

export const AGILE2_POSTS: BlogSeed[] = [
  {
    slug: "scrum-master-interview-questions",
    title: "Top 20 Scrum Master Interview Questions (and How to Answer Them)",
    category: "Agile & Scrum",
    excerpt:
      "The questions interviewers actually ask Scrum Master candidates — framework knowledge, situational judgment and organisational coaching — with guidance on strong answers.",
    readMins: 10,
    tags: ["Scrum Master", "Interview", "Careers"],
    seoTitle: "Top 20 Scrum Master Interview Questions & Answers",
    seoDescription:
      "Prepare for your Scrum Master interview: 20 real questions across Scrum theory, situational judgment and coaching, with what interviewers look for in each answer.",
    relatedCourseSlugs: ["csm-certification-training", "a-csm-certification-training"],
    content: `
<p>Scrum Master interviews test three layers: do you know Scrum as written, can you handle messy real-team situations, and can you influence an organisation without authority. Here are twenty questions that come up constantly, grouped by layer, with what a strong answer contains.</p>

<h2>Framework knowledge</h2>
<ol>
<li><strong>What is empiricism and why does Scrum depend on it?</strong> Name the three pillars — transparency, inspection, adaptation — and connect them to a concrete event (the Sprint Review inspects the Increment; the Retrospective adapts the process).</li>
<li><strong>What is the Scrum Master accountable for?</strong> The team's effectiveness — not velocity, not delivery dates, not people management.</li>
<li><strong>Walk me through the five events and their purpose.</strong> Keep each to one sentence; interviewers are checking precision, not stamina.</li>
<li><strong>What are the three artifact commitments?</strong> Product Goal, Sprint Goal, Definition of Done — and why each keeps its artifact honest.</li>
<li><strong>What happens to incomplete work at the end of a Sprint?</strong> It returns to the Product Backlog for reordering. It is never automatically rolled into the next Sprint.</li>
<li><strong>Can a Sprint be cancelled? By whom?</strong> Only the Product Owner, only if the Sprint Goal becomes obsolete.</li>
</ol>

<h2>Situational judgment</h2>
<ol start="7">
<li><strong>A Developer consistently dominates the Daily Scrum. What do you do?</strong> Strong answers escalate gently: observe, coach privately, change the format (walk the board instead of round-robin), never humiliate publicly.</li>
<li><strong>The Product Owner keeps changing priorities mid-Sprint.</strong> Explore why — real market pressure or missing refinement discipline? Protect the Sprint Goal, coach the PO on the cost of churn, propose shorter Sprints if volatility is genuine.</li>
<li><strong>Management asks you for individual performance reports.</strong> Explain the damage to self-management and offer team-level outcome metrics instead. Interviewers want to see you hold the line diplomatically.</li>
<li><strong>The team says the Retrospective is a waste of time.</strong> That's data. Vary the format, make improvement actions visible in the next Sprint Backlog, and measure whether anything actually changes — boredom usually means no follow-through.</li>
<li><strong>Two Developers are in open conflict.</strong> Address it early and privately; facilitate a conversation about working agreements, not personalities. Unresolved conflict is an impediment like any other.</li>
<li><strong>The team wants to skip the Sprint Review because "there's nothing to show".</strong> Dig into why there's no Done increment — that's the real problem, usually a weak Definition of Done or overcommitment.</li>
</ol>

<h2>Organisational coaching</h2>
<ol start="13">
<li><strong>How would you introduce Scrum to a sceptical department?</strong> Start with one team and a real problem, make results visible, let pull replace push.</li>
<li><strong>How do you handle dependencies on non-Agile teams?</strong> Make them visible early, negotiate interfaces, escalate structurally (not per-ticket) when the pattern repeats.</li>
<li><strong>What metrics would you show leadership?</strong> Outcome and flow measures — cycle time, escaped defects, goal success — never individual velocity comparisons.</li>
<li><strong>How is a Scrum Master different from a project manager?</strong> Accountability for team effectiveness versus accountability for scope/schedule/budget; influence versus authority.</li>
<li><strong>How do you coach a Product Owner who acts as a proxy for ten stakeholders?</strong> Help them build a real ordering model (value, risk, cost of delay) and the authority to say no.</li>
<li><strong>Tell me about a failed improvement you drove. What did you learn?</strong> Have a real story. Interviewers trust scars more than triumphs.</li>
</ol>

<h2>Curveballs</h2>
<ol start="19">
<li><strong>Is velocity a good performance measure?</strong> No — it's a planning signal, local to one team, trivially gamed. Expect a follow-up on what you'd use instead.</li>
<li><strong>Would you ever recommend a team stop using Scrum?</strong> Yes — for flow-based operational work, Kanban may fit better. Knowing the framework's limits is senior-level judgment.</li>
</ol>

<h2>How to prepare</h2>
<p>Interviewers can tell the difference between memorised definitions and lived understanding within three questions. Structured training with role-plays — like the <a href="/csm-certification-training">CSM course</a> — builds the situational fluency the middle section tests; the <a href="/a-csm-certification-training">Advanced CSM</a> goes deeper on coaching and facilitation. Review the full syllabus in our <a href="/info/csm-certification-training">CSM guide</a>.</p>

<h2>Frequently asked questions</h2>
<h3>Do I need a certification to get interviews?</h3>
<p>Many enterprise recruiters filter on CSM or PSM, so a certification gets you into more conversations — but the interview itself is won with situational answers.</p>
<h3>How technical will the questions get?</h3>
<p>For software teams, expect enough to test literacy — CI/CD, technical debt, testing basics — not coding puzzles.</p>
`,
  },
  {
    slug: "product-owner-roles-and-responsibilities",
    title: "Product Owner Roles and Responsibilities: The Complete Picture",
    category: "Agile & Scrum",
    excerpt:
      "The Product Owner is accountable for maximising product value — here's what that means daily: backlog ownership, stakeholder management, goal-setting and the anti-patterns to avoid.",
    readMins: 8,
    tags: ["Product Owner", "Scrum", "Careers"],
    seoTitle: "Product Owner Roles & Responsibilities Explained",
    seoDescription:
      "What does a Product Owner do? Accountabilities from the Scrum Guide, day-to-day responsibilities, required skills, and the anti-patterns that sink product value.",
    relatedCourseSlugs: ["cspo-certification-training", "pspo-certification-training"],
    content: `
<p>The Product Owner is accountable for <strong>maximising the value of the product</strong> resulting from the Scrum Team's work. One sentence, enormous scope: it makes the PO the single point where business strategy, customer insight and team capacity meet.</p>

<h2>The core accountabilities</h2>
<ul>
<li><strong>Developing and communicating the Product Goal</strong> — the long-term objective every Sprint should advance.</li>
<li><strong>Creating and clearly expressing Product Backlog items</strong> — so Developers understand intent, not just wording.</li>
<li><strong>Ordering the backlog</strong> — a strict order, not buckets of "high priority", reflecting value, risk, dependency and cost of delay.</li>
<li><strong>Ensuring the backlog is transparent and understood</strong> — stakeholders and team see the same truth.</li>
</ul>
<p>The Product Owner may delegate the work — writing items, gathering requirements — but never the accountability. And critically, the PO is <em>one person</em>: a committee cannot order a backlog.</p>

<h2>What the job looks like day to day</h2>
<ul>
<li>Talking to customers and users — the source of value judgments that no dashboard replaces.</li>
<li>Saying no, gracefully and often — every yes to one stakeholder is a delay to another.</li>
<li>Refining upcoming backlog items with the Developers so Sprint Planning selects rather than discovers.</li>
<li>Making trade-off calls mid-Sprint when Developers surface new information.</li>
<li>Reviewing outcomes: did shipped work move the metric it was meant to move?</li>
</ul>

<h2>Product Owner vs Product Manager</h2>
<p>In many organisations these are one role at different altitudes: the product manager faces market and strategy; the Product Owner is Scrum's name for the person carrying that intent into the team's backlog. Where both titles exist, the healthiest pattern keeps them tightly paired — strategy without backlog authority, or backlog authority without strategy, both starve the team of direction.</p>

<h2>Anti-patterns that destroy value</h2>
<ul>
<li><strong>The proxy PO</strong> — relays stakeholder wishes without authority to decide. Every decision round-trips for approval; flow dies.</li>
<li><strong>The absent PO</strong> — appears at Sprint boundaries only. Developers guess intent and guess wrong.</li>
<li><strong>The backlog hoarder</strong> — 900 items, none refined, order meaningless. A backlog is an ordered forecast, not a wish archive.</li>
<li><strong>The output maximiser</strong> — measures success in features shipped rather than outcomes changed.</li>
</ul>

<h2>Skills worth building</h2>
<p>Value modelling and prioritisation techniques, user-story writing and splitting, stakeholder negotiation, basic data literacy for outcome measurement, and enough technical fluency to weigh debt against features. Formal training accelerates all of these: the <a href="/cspo-certification-training">Certified Scrum Product Owner (CSPO)</a> is the classic instructor-led route, and the <a href="/pspo-certification-training">PSPO</a> its assessment-based Scrum.org counterpart. Our <a href="/info/cspo-certification-training">CSPO guide</a> details the curriculum and certification process.</p>

<h2>Frequently asked questions</h2>
<h3>Can the Product Owner and Scrum Master be the same person?</h3>
<p>It's strongly discouraged — the roles hold each other in tension. The PO pushes for value; the Scrum Master protects sustainable process. One person absorbing both loses the check.</p>
<h3>Does the Product Owner attend the Daily Scrum?</h3>
<p>Only if useful, and never to collect status. The Daily Scrum belongs to the Developers.</p>
<h3>Who writes user stories?</h3>
<p>Anyone can draft them; the Product Owner remains accountable for what enters the backlog and in what order.</p>
`,
  },
  {
    slug: "sprint-retrospective-guide",
    title: "Sprint Retrospectives That Actually Change Things: Formats, Pitfalls, Follow-through",
    category: "Agile & Scrum",
    excerpt:
      "Retrospectives fail from boredom and broken promises, not bad formats. A practical guide to structure, five formats worth rotating, psychological safety and making actions stick.",
    readMins: 8,
    tags: ["Retrospective", "Scrum", "Continuous improvement"],
    seoTitle: "Sprint Retrospective Guide: Formats & Best Practices",
    seoDescription:
      "Run Sprint Retrospectives that produce real change: a five-phase structure, formats to rotate, psychological safety basics, and the follow-through discipline most teams skip.",
    relatedCourseSlugs: ["csm-certification-training", "agile-coaching-skills-certified-facilitator-training"],
    content: `
<p>The Sprint Retrospective is Scrum's built-in improvement engine: the team inspects how the last Sprint went — people, process, tools, Definition of Done — and commits to changes that make the next one better. It's also the event teams abandon first, usually after weeks of pleasant conversations that changed nothing. The fix isn't a fancier format; it's structure and follow-through.</p>

<h2>A structure that works</h2>
<ol>
<li><strong>Set the stage (5 min)</strong> — restate purpose, check energy, remind everyone of the Prime Directive: people did the best they could with what they knew.</li>
<li><strong>Gather data (10–15 min)</strong> — facts before feelings: what happened, metrics, events on a timeline.</li>
<li><strong>Generate insights (10–15 min)</strong> — why did those things happen? Cluster themes, run five-whys on the big one.</li>
<li><strong>Decide what to do (10 min)</strong> — pick one or two actions, each with an owner and a "done" test. One improvement that ships beats five that don't.</li>
<li><strong>Close (5 min)</strong> — retro the retro: was this hour useful?</li>
</ol>

<h2>Five formats worth rotating</h2>
<ul>
<li><strong>Start / Stop / Continue</strong> — the reliable default; fast and action-oriented.</li>
<li><strong>Sailboat</strong> — wind (what pushes us forward), anchors (what drags), rocks (risks ahead). Good for teams tired of lists.</li>
<li><strong>4Ls</strong> — Liked, Learned, Lacked, Longed for. Draws out learning, not just complaints.</li>
<li><strong>Timeline</strong> — plot the Sprint's events and emotional highs/lows. Excellent after a turbulent Sprint.</li>
<li><strong>Lean Coffee</strong> — team proposes topics, votes, timeboxes discussion. Ideal when the backlog of grievances is long.</li>
</ul>
<p>Rotate formats to fight staleness, but never let novelty crowd out the decide-what-to-do phase — that's where the value is.</p>

<h2>Psychological safety is the precondition</h2>
<p>A retrospective is only as honest as the room feels safe. Warning signs: only positives get voiced, the same two people speak, problems are phrased passively ("mistakes were made"). Facilitators can help with anonymous input collection, round-robins that give everyone the floor, and — non-negotiable — keeping managers who evaluate the team members out of the room unless the team invites them.</p>

<h2>Follow-through: the part everyone skips</h2>
<p>The Scrum Guide's own suggestion is underused: put the top improvement into the next <strong>Sprint Backlog</strong>. If actions live in a forgotten wiki page, the retro is theatre. Make the action visible on the board, give it an owner, and open the next retrospective by reviewing it. Teams that close the loop keep believing in the event; teams that don't, stop showing up emotionally within a quarter.</p>

<h2>Facilitation is a learnable skill</h2>
<p>Great retros are facilitated, not chaired. The craft — question design, drawing out quiet voices, converging on decisions — is core <a href="/csm-certification-training">Scrum Master training</a> material, and the dedicated <a href="/agile-coaching-skills-certified-facilitator-training">Agile Facilitation certification</a> goes considerably deeper. See the <a href="/info/csm-certification-training">CSM guide</a> for how facilitation fits the broader curriculum.</p>

<h2>Frequently asked questions</h2>
<h3>How long should a retrospective be?</h3>
<p>Up to three hours for a one-month Sprint, proportionally less for shorter ones — 60 to 90 minutes is typical for two-week Sprints.</p>
<h3>Should managers attend?</h3>
<p>Only at the team's invitation. Anyone with evaluation power over attendees changes what gets said.</p>
<h3>What if the same issues come up every time?</h3>
<p>Recurring themes usually mean the impediment is organisational, above the team's authority. That's the Scrum Master's cue to escalate structurally, not re-discuss it monthly.</p>
`,
  },
  {
    slug: "kanban-vs-scrum",
    title: "Kanban vs Scrum: Differences, Similarities and How to Choose",
    category: "Agile & Scrum",
    excerpt:
      "Scrum batches work into Sprints; Kanban optimises continuous flow. How the two methods differ in cadence, roles, metrics and change — and when each (or both) fits.",
    readMins: 8,
    tags: ["Kanban", "Scrum", "Agile"],
    seoTitle: "Kanban vs Scrum: Which Should Your Team Use?",
    seoDescription:
      "Kanban vs Scrum compared: cadence, roles, WIP limits, metrics and change management — plus honest guidance on choosing, and how Scrum with Kanban works together.",
    relatedCourseSlugs: ["professional-scrum-kanban-certification-training", "applying-professional-kanban-apk-course", "csm-certification-training"],
    content: `
<p>Scrum and Kanban are the two most widely used Agile methods, and the comparison is less "which is better" than "which problem do you have". Scrum organises work into fixed-length Sprints with defined accountabilities and events. Kanban visualises work, limits how much is in progress, and optimises the continuous flow of items from request to done.</p>

<h2>The essential difference: cadence</h2>
<p>Scrum is <strong>batch and rhythm</strong>: plan a Sprint, deliver an Increment, review, repeat. The timebox creates focus and a natural inspection point. Kanban is <strong>flow</strong>: items enter when capacity frees up and ship when they're done — no batch boundaries at all. Everything else follows from this: Scrum's events hang off the Sprint; Kanban's feedback loops hang off the flow of individual items.</p>

<h2>Side by side</h2>
<table>
<tr><th></th><th>Scrum</th><th>Kanban</th></tr>
<tr><td>Cadence</td><td>Fixed Sprints (1–4 weeks)</td><td>Continuous flow</td></tr>
<tr><td>Roles</td><td>PO, Scrum Master, Developers — required</td><td>None prescribed; keep what you have</td></tr>
<tr><td>Change</td><td>Scope protected within the Sprint Goal</td><td>Reprioritise anytime an item hasn't started</td></tr>
<tr><td>Key constraint</td><td>Timebox</td><td>WIP limits per column</td></tr>
<tr><td>Core metrics</td><td>Velocity, goal success</td><td>Cycle time, throughput, WIP, work-item age</td></tr>
<tr><td>Adoption style</td><td>Revolutionary — install the framework</td><td>Evolutionary — start where you are, improve flow</td></tr>
</table>

<h2>When each fits</h2>
<h3>Scrum shines when…</h3>
<ul>
<li>Work is product development with meaningful goals per iteration.</li>
<li>The team benefits from rhythm — regular planning, demo and improvement points.</li>
<li>Stakeholders need a predictable review cadence.</li>
</ul>
<h3>Kanban shines when…</h3>
<ul>
<li>Work arrives continuously and unpredictably — support, operations, maintenance.</li>
<li>Priorities genuinely change faster than any Sprint could survive.</li>
<li>The team can't (or shouldn't) restructure roles just to adopt a method.</li>
</ul>

<h2>The quiet truth: you can use both</h2>
<p>"Scrum with Kanban" is a first-class option, not a compromise — Scrum.org publishes an official Kanban guide for Scrum teams. Keep Sprints, goals and events; add WIP limits, workflow visualisation and flow metrics inside the Sprint. Teams typically see faster cycle times and calmer Sprints because unfinished-work pileups become visible mid-Sprint instead of at the Review. The <a href="/professional-scrum-kanban-certification-training">Professional Scrum with Kanban (PSK)</a> course teaches exactly this combination, and <a href="/applying-professional-kanban-apk-course">Applying Professional Kanban</a> covers flow practice on its own.</p>

<h2>Frequently asked questions</h2>
<h3>Is Kanban easier to adopt than Scrum?</h3>
<p>Usually, yes — it starts from your current process. But its improvement pressure is gentler, so undisciplined teams can plateau at "a board with columns" and improve nothing.</p>
<h3>Does Kanban have estimates?</h3>
<p>Typically not — probabilistic forecasting from cycle-time data replaces per-item estimation once enough history exists.</p>
<h3>Can a Scrum Master serve a Kanban team?</h3>
<p>The coaching skill set transfers directly; the flow-metrics literacy is worth adding — see our <a href="/info/professional-scrum-kanban-certification-training">PSK certification guide</a>.</p>
`,
  },
  {
    slug: "scrum-master-salary-guide-india",
    title: "Scrum Master Salary in India: What Shapes Your Pay in 2026",
    category: "Agile & Scrum",
    excerpt:
      "What Scrum Masters earn in India and why the range is so wide: experience bands, city, industry, certifications and the skills that move you to the top of the band.",
    readMins: 7,
    tags: ["Scrum Master", "Salary", "Careers"],
    seoTitle: "Scrum Master Salary in India 2026: Ranges & Factors",
    seoDescription:
      "Scrum Master salary in India explained: typical ranges by experience level, what drives the wide variation (city, industry, certification), and how to increase your market value.",
    relatedCourseSlugs: ["csm-certification-training", "a-csm-certification-training", "safe-scrum-master-certification"],
    content: `
<p>Scrum Master pay in India spans an unusually wide range — junior roles and senior enterprise positions can differ by five times or more. Rather than quote a single misleading average, it's more useful to understand the bands and the levers that move you between them.</p>

<h2>Typical experience bands</h2>
<p>Across major job portals and salary aggregators, Indian Scrum Master compensation broadly clusters into three bands. Treat these as directional — actual offers vary significantly by company and city:</p>
<ul>
<li><strong>Entry (0–3 years in the role):</strong> commonly cited in the range of ₹6–12 lakh per annum, often for internal transitions from QA, development or business analysis.</li>
<li><strong>Mid (3–7 years):</strong> commonly cited around ₹12–22 lakh, where the bulk of the market sits.</li>
<li><strong>Senior / multi-team (7+ years, RTE-track or coaching roles):</strong> commonly cited from ₹22 lakh upward, with scaled-agile roles in large enterprises going well beyond.</li>
</ul>

<h2>What actually moves the number</h2>
<ul>
<li><strong>City.</strong> Bangalore, Gurgaon/NCR, Hyderabad and Pune lead; the same role in tier-2 cities typically pays 20–40% less, though remote-first policies have narrowed the gap.</li>
<li><strong>Industry.</strong> Product companies, fintech and global capability centres (GCCs) pay above IT services for equivalent experience.</li>
<li><strong>Scope.</strong> One team versus multiple teams versus a train — pay scales with the blast radius of your effectiveness. The step from Scrum Master to <a href="/safe-rte-certification">Release Train Engineer</a> is the single largest jump in the ladder.</li>
<li><strong>Certifications.</strong> Recruiters filter on CSM/PSM at entry; at senior levels, advanced credentials (<a href="/a-csm-certification-training">A-CSM</a>, <a href="/safe-scrum-master-certification">SAFe Scrum Master</a>) plus demonstrated outcomes differentiate. A certification opens the band; results move you within it.</li>
<li><strong>Adjacent skills.</strong> Facilitation at scale, flow metrics, coaching, and increasingly AI-literacy in delivery tooling all command premiums.</li>
</ul>

<h2>Reading offers sensibly</h2>
<p>Compare fixed pay, not CTC headlines — variable components, retention bonuses and stock differ wildly in real value. And weigh learning scope: two years on a genuinely agile product team compounds into more market value than a higher-paid role where "Scrum Master" means status-report collector.</p>

<h2>Growing into the higher bands</h2>
<p>The reliable path: get certified (<a href="/csm-certification-training">CSM</a> or PSM), deliver visible team improvements, add a scaling credential when you touch multi-team work, and build a story told in outcomes — cycle time halved, release cadence doubled — rather than ceremonies run. Our <a href="/info/csm-certification-training">CSM guide</a> covers the entry certification in full, including costs and renewal.</p>

<h2>Frequently asked questions</h2>
<h3>Does CSM alone increase salary?</h3>
<p>It reliably increases interview access, which is where offers come from. Standalone pay bumps for a certificate without role change are modest.</p>
<h3>Scrum Master or project manager — which pays more in India?</h3>
<p>Ranges overlap heavily. Seniority and industry decide more than the title; hybrid roles carrying both skill sets are increasingly common and well paid.</p>
<h3>Is the role future-proof against AI?</h3>
<p>Administrative parts (notes, scheduling, reporting) are automating fast. The coaching, facilitation and organisational-change core is among the harder-to-automate skill sets in tech — provided that's actually what you do all day.</p>
`,
  },
  {
    slug: "user-stories-guide",
    title: "User Stories: How to Write Them Well (With Examples and Splitting Patterns)",
    category: "Agile & Scrum",
    excerpt:
      "The card is a promise for a conversation. INVEST criteria, acceptance criteria that work, seven proven splitting patterns and the mistakes that turn stories into mini-specs.",
    readMins: 9,
    tags: ["User stories", "Product Backlog", "Agile"],
    seoTitle: "How to Write User Stories: Guide, Examples & Splitting",
    seoDescription:
      "A practical user-story guide: the role-goal-benefit format, INVEST checklist, acceptance criteria examples, seven splitting patterns and common anti-patterns to avoid.",
    relatedCourseSlugs: ["cspo-certification-training", "csm-certification-training"],
    content: `
<p>A user story is a short description of a need told from the user's perspective: <em>As a &lt;role&gt;, I want &lt;capability&gt;, so that &lt;benefit&gt;</em>. The format is famous; the point is routinely missed. A story is not a lightweight requirement document — it's a <strong>placeholder for a conversation</strong>, deliberately incomplete so the team discusses the need rather than mechanically implementing a spec.</p>

<h2>The three Cs</h2>
<ul>
<li><strong>Card</strong> — the short written form; brevity is a feature.</li>
<li><strong>Conversation</strong> — where the real requirements emerge, in refinement and during the Sprint.</li>
<li><strong>Confirmation</strong> — acceptance criteria that let everyone agree what "works" means.</li>
</ul>

<h2>What good looks like: INVEST</h2>
<ul>
<li><strong>I</strong>ndependent — schedulable in any order, no hidden chains.</li>
<li><strong>N</strong>egotiable — details open for discussion, not contractually frozen.</li>
<li><strong>V</strong>aluable — delivers something a user or the business would notice.</li>
<li><strong>E</strong>stimable — understood well enough to size.</li>
<li><strong>S</strong>mall — finishable well within a Sprint.</li>
<li><strong>T</strong>estable — you can tell when it's done.</li>
</ul>

<h2>Acceptance criteria that earn their keep</h2>
<p>Keep them behavioural — what the system does, not how it's built. Given/When/Then reads well for flows:</p>
<p><em>Story:</em> As a returning customer, I want to check out without re-entering my card details, so that repeat purchases are fast.</p>
<ul>
<li>Given a logged-in customer with a saved card, when they reach payment, then the saved card is offered as the default method.</li>
<li>Given the saved card has expired, when they reach payment, then they are prompted to update it before paying.</li>
<li>Card details are never displayed in full anywhere in the flow.</li>
</ul>
<p>Three to six criteria is the sweet spot. Fifteen criteria means the story is really an epic, or the team is writing a spec and calling it a story.</p>

<h2>Seven splitting patterns</h2>
<p>Big stories hide risk. Split by:</p>
<ol>
<li><strong>Workflow steps</strong> — checkout: pay first, then add invoicing, then gift options.</li>
<li><strong>Business rule variations</strong> — flat shipping first; weight-based rules later.</li>
<li><strong>Happy path vs edge cases</strong> — core flow now, failure handling as follow-ups.</li>
<li><strong>Input methods / platforms</strong> — web first, mobile next.</li>
<li><strong>Data variations</strong> — one currency, then multi-currency.</li>
<li><strong>CRUD breakdown</strong> — create and view before edit and delete.</li>
<li><strong>Spike then build</strong> — a timeboxed investigation when uncertainty blocks estimation.</li>
</ol>
<p>Every slice should still deliver something observable — "the database layer" is a task, not a story.</p>

<h2>Anti-patterns to avoid</h2>
<ul>
<li><strong>Fake roles</strong> — "As a developer, I want a new index…" Users don't want indexes; either find the real beneficiary or write it plainly as technical work.</li>
<li><strong>The novel</strong> — a story with ten paragraphs of prescriptive detail has already replaced the conversation it was meant to start.</li>
<li><strong>So-that theatre</strong> — a benefit clause that restates the feature ("…so that I can log in with SSO"). If the benefit is hollow, question the story.</li>
<li><strong>Story = task list</strong> — stories describe outcomes; the Developers own task decomposition.</li>
</ul>

<p>Writing and splitting stories well is a core skill in <a href="/cspo-certification-training">Product Owner training</a>, and Scrum Masters coach the practice daily — it features in the <a href="/csm-certification-training">CSM course</a> too. The <a href="/info/cspo-certification-training">CSPO guide</a> shows where it sits in the full curriculum.</p>

<h2>Frequently asked questions</h2>
<h3>Are user stories required by Scrum?</h3>
<p>No — the Scrum Guide only says Product Backlog items. Stories are simply the most popular format because they keep the user in the sentence.</p>
<h3>Who writes them?</h3>
<p>Anyone may draft; the Product Owner stays accountable for content and order. The best stories are co-written in refinement.</p>
<h3>How detailed should a story be before Sprint Planning?</h3>
<p>Detailed enough to size and start confidently — understanding beats documentation; the rest emerges during the Sprint.</p>
`,
  },
];
