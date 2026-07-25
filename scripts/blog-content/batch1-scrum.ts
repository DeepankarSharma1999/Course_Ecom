import type { BlogSeed } from "./types";

// Batch 1 — Scrum fundamentals cluster. Written fresh for SimpliLEAD;
// facts align with lib/cert-facts.ts (verified July 2026).

export const SCRUM_POSTS: BlogSeed[] = [
  {
    slug: "what-is-scrum",
    title: "What is Scrum? Roles, Events and Artifacts Explained Simply",
    category: "Agile & Scrum",
    excerpt:
      "Scrum in plain language: the three accountabilities, five events and three artifacts, why the framework works, and how to start using it on a real team.",
    readMins: 9,
    tags: ["Scrum", "Agile", "Scrum framework"],
    seoTitle: "What is Scrum? Roles, Events & Artifacts Explained",
    seoDescription:
      "A plain-language guide to the Scrum framework: Scrum Master, Product Owner and Developers, the five events, three artifacts, and how Scrum actually works in practice.",
    relatedCourseSlugs: ["csm-certification-training", "psm-certification"],
    content: `
<p>Scrum is a lightweight framework for building products in short, repeating cycles called Sprints. Instead of planning an entire project up front and hoping the plan survives, a Scrum team delivers a small, usable slice of the product every one to four weeks, inspects the result, and adjusts course. That inspect-and-adapt loop is the whole point — everything else in Scrum exists to make it happen reliably.</p>

<h2>The three accountabilities</h2>
<p>The 2020 Scrum Guide defines three accountabilities (formerly called roles) on every Scrum team:</p>
<ul>
<li><strong>Product Owner</strong> — owns the Product Backlog and is accountable for maximising the value of the work. One person, not a committee.</li>
<li><strong>Scrum Master</strong> — accountable for the team's effectiveness. Coaches the team in self-management, removes impediments, and helps the wider organisation understand empirical ways of working.</li>
<li><strong>Developers</strong> — everyone who does the work of creating the Increment, whatever their specialty. They own the Sprint Backlog and decide how the work gets done.</li>
</ul>

<h2>The five events</h2>
<ul>
<li><strong>The Sprint</strong> — the container for all other events: a fixed timebox of one month or less in which a usable Increment is created.</li>
<li><strong>Sprint Planning</strong> — the team agrees a Sprint Goal, selects Product Backlog items, and plans how to deliver them.</li>
<li><strong>Daily Scrum</strong> — 15 minutes for Developers to inspect progress toward the Sprint Goal and adapt the day's plan.</li>
<li><strong>Sprint Review</strong> — the team and stakeholders inspect the Increment and adapt the Product Backlog.</li>
<li><strong>Sprint Retrospective</strong> — the team inspects how the Sprint went and commits to concrete improvements.</li>
</ul>

<h2>The three artifacts</h2>
<p>Each artifact carries a commitment that keeps it honest:</p>
<ul>
<li><strong>Product Backlog</strong> → committed to the <em>Product Goal</em>, the long-term objective.</li>
<li><strong>Sprint Backlog</strong> → committed to the <em>Sprint Goal</em>, the single objective of the current Sprint.</li>
<li><strong>Increment</strong> → committed to the <em>Definition of Done</em>, the quality bar every piece of work must meet.</li>
</ul>

<h2>Why Scrum works</h2>
<p>Scrum is built on empiricism: transparency, inspection and adaptation. Complex work — the kind where more is unknown than known — can't be fully planned in advance. Scrum accepts that and replaces prediction with frequent evidence: a working Increment every Sprint. Small batches reduce risk, short feedback loops catch bad assumptions early, and a stable team rhythm makes delivery measurable.</p>

<h2>Where teams go wrong</h2>
<p>Most "Scrum isn't working for us" stories trace back to a few patterns: no real Product Owner (five stakeholders with veto power instead), Sprints that never produce a usable Increment, a Definition of Done that quietly excludes testing, or a Daily Scrum run as a status report to a manager. Scrum makes these dysfunctions visible quickly — which is uncomfortable, and exactly the point.</p>

<h2>How to get started</h2>
<p>Formal training is the fastest route to doing Scrum properly rather than adopting the vocabulary and keeping old habits. The two most recognised entry certifications are the <a href="/csm-certification-training">Certified ScrumMaster (CSM)</a> from Scrum Alliance — a live two-day course with the exam included — and the <a href="/psm-certification">Professional Scrum Master (PSM I)</a> from Scrum.org. Our <a href="/info/csm-certification-training">CSM certification guide</a> walks through the syllabus, exam format and costs in detail.</p>

<h2>Frequently asked questions</h2>
<h3>Is Scrum only for software teams?</h3>
<p>No. Scrum originated in software but is used in marketing, hardware, research, education and operations — anywhere work is complex enough that plans need frequent correction.</p>
<h3>How long should a Sprint be?</h3>
<p>One month or less. Two weeks is the most common choice: long enough to build something meaningful, short enough that feedback arrives before much is wasted.</p>
<h3>Is Scrum the same as Agile?</h3>
<p>Agile is a set of values and principles from the Agile Manifesto; Scrum is one concrete framework that puts those values to work. Kanban, XP and SAFe are others.</p>
`,
  },
  {
    slug: "scrum-master-roles-and-responsibilities",
    title: "Scrum Master Roles and Responsibilities: What the Job Actually Involves",
    category: "Agile & Scrum",
    excerpt:
      "Beyond 'servant leader': what a Scrum Master actually does for the Developers, the Product Owner and the organisation — and the anti-patterns that hollow the role out.",
    readMins: 8,
    tags: ["Scrum Master", "Scrum", "Careers"],
    seoTitle: "Scrum Master Roles & Responsibilities Explained",
    seoDescription:
      "What does a Scrum Master really do? Responsibilities to the team, Product Owner and organisation, a typical week, common anti-patterns, and how to become one.",
    relatedCourseSlugs: ["csm-certification-training", "a-csm-certification-training"],
    content: `
<p>Ask five companies what their Scrum Masters do and you'll hear five different answers — meeting scheduler, Jira administrator, delivery manager, agile coach, team therapist. The Scrum Guide's answer is more precise: the Scrum Master is <strong>accountable for the Scrum Team's effectiveness</strong>. Everything in the role flows from that one sentence.</p>

<h2>Responsibilities to the Developers</h2>
<ul>
<li>Coaching the team in self-management and cross-functionality, so decisions are made by the people closest to the work.</li>
<li>Helping the team focus on creating a high-value Increment that meets the Definition of Done.</li>
<li>Causing the removal of impediments — which often means teaching the team to remove their own, not personally couriering every blocker.</li>
<li>Ensuring Scrum events take place, are positive and productive, and stay inside their timeboxes.</li>
</ul>

<h2>Responsibilities to the Product Owner</h2>
<ul>
<li>Helping find effective techniques for defining the Product Goal and managing the Product Backlog.</li>
<li>Helping the team understand why clear, concise backlog items matter.</li>
<li>Facilitating stakeholder collaboration when it's needed or requested.</li>
</ul>

<h2>Responsibilities to the organisation</h2>
<p>This is the part most job descriptions miss. The Scrum Master leads the organisation's adoption of Scrum: coaching managers on empirical planning, removing barriers between stakeholders and teams, and advising on how organisational structures help or hurt delivery. A Scrum Master who only ever faces the team is doing half the job.</p>

<h2>What a typical week looks like</h2>
<p>In practice: facilitating Sprint events, one-on-one coaching conversations, unblocking a dependency with another team, sitting with the Product Owner on backlog ordering, tracking a team health signal (flow, happiness, escaped defects), and pushing one organisational impediment — a slow environment, an approval bottleneck — toward resolution. The work is influence, not authority: the Scrum Master manages the process, never the people.</p>

<h2>Anti-patterns that hollow out the role</h2>
<ul>
<li><strong>The secretary</strong> — books meetings, updates tickets, adds no coaching value.</li>
<li><strong>The proxy manager</strong> — assigns tasks and reports individual performance upward, destroying self-management.</li>
<li><strong>The permanent hero</strong> — removes every impediment personally, keeping the team dependent.</li>
<li><strong>The Scrum police</strong> — enforces ceremony mechanics while ignoring whether the team is actually delivering value.</li>
</ul>

<h2>Becoming a Scrum Master</h2>
<p>Most people enter the role from development, QA, business analysis or project management. A recognised certification signals you know the framework as written rather than as folklore — the <a href="/csm-certification-training">Certified ScrumMaster (CSM)</a> is the most common starting point, with the <a href="/a-csm-certification-training">Advanced CSM</a> as the next step once you have a year or two of practice. The full syllabus, exam format and renewal costs are in our <a href="/info/csm-certification-training">CSM guide</a>.</p>

<h2>Frequently asked questions</h2>
<h3>Does a Scrum Master need technical skills?</h3>
<p>Technical literacy helps you follow the team's conversations and spot quality risks, but the core skills are facilitation, coaching and organisational influence.</p>
<h3>Can the Scrum Master also be a Developer?</h3>
<p>It's allowed and common on small teams, though wearing both hats during a difficult Sprint means one of them usually slips.</p>
<h3>Is Scrum Master a full-time job?</h3>
<p>For one mature team, not always — which is why many Scrum Masters serve two teams or invest surplus time in organisational impediments. For a new team or a struggling one, it's absolutely full-time.</p>
`,
  },
  {
    slug: "csm-vs-psm-which-scrum-certification",
    title: "CSM vs PSM: Which Scrum Master Certification Should You Choose in 2026?",
    category: "Agile & Scrum",
    excerpt:
      "Scrum Alliance's CSM or Scrum.org's PSM I? Exam formats, costs, renewal rules and hiring perception — an honest comparison to help you pick the right first certification.",
    readMins: 8,
    tags: ["CSM", "PSM", "Certifications"],
    seoTitle: "CSM vs PSM (2026): Which Scrum Certification is Better?",
    seoDescription:
      "CSM vs PSM I compared: exam difficulty (74% vs 85% pass mark), training requirements, renewal costs, validity and which employers prefer. Choose the right Scrum certification.",
    relatedCourseSlugs: ["csm-certification-training", "psm-certification"],
    content: `
<p>The two most recognised entry-level Scrum Master certifications are the <strong>Certified ScrumMaster (CSM)</strong> from Scrum Alliance and the <strong>Professional Scrum Master I (PSM I)</strong> from Scrum.org. Both certify the same body of knowledge — the Scrum framework — but they differ meaningfully in how you earn them, what they cost over time, and how hard the exam is.</p>

<h2>The short answer</h2>
<p>Choose the <a href="/csm-certification-training">CSM</a> if you want guided, instructor-led learning with a forgiving exam and don't mind renewal fees. Choose the <a href="/psm-certification">PSM I</a> if you're a confident self-studier who wants a harder exam, no mandatory course, and a credential that never expires. Neither is "better" universally — they optimise for different learners.</p>

<h2>Side-by-side comparison</h2>
<table>
<tr><th></th><th>CSM (Scrum Alliance)</th><th>PSM I (Scrum.org)</th></tr>
<tr><td>Training</td><td>Mandatory 2-day live course with a Certified Scrum Trainer</td><td>Optional — you can sit the exam cold</td></tr>
<tr><td>Exam</td><td>50 questions, 60 minutes</td><td>80 questions, 60 minutes</td></tr>
<tr><td>Pass mark</td><td>74% (37/50)</td><td>85% (68/80)</td></tr>
<tr><td>Attempts</td><td>Two free attempts within 90 days of the course</td><td>One attempt per exam password</td></tr>
<tr><td>Validity</td><td>2 years</td><td>Lifetime — never expires</td></tr>
<tr><td>Renewal</td><td>20 SEUs + US$100 every 2 years</td><td>None</td></tr>
</table>

<h2>Exam difficulty in practice</h2>
<p>PSM I is the harder test by a clear margin: more questions in the same hour, an 85% bar, and questions that punish folklore-Scrum answers. CSM's exam is deliberately accessible — Scrum Alliance's position is that the two-day workshop is where the learning happens, and the test confirms it. If you learn best in a live cohort with an experienced trainer, that workshop is genuinely valuable; our <a href="/info/csm-certification-training">CSM guide</a> covers what those two days include.</p>

<h2>Cost over a career</h2>
<p>CSM's course fee bundles training, exam and a two-year Scrum Alliance membership, but the US$100-plus-SEUs renewal recurs every two years. PSM I is pay-once: the certification never lapses. Over a ten-year career the gap adds up — worth weighing if budget matters more to you than the live-training experience.</p>

<h2>What hiring managers think</h2>
<p>In India and much of Asia-Pacific, CSM has the stronger brand recognition on CVs, and some enterprise job filters still ask for it by name. In product-led companies and much of Europe, PSM I carries slightly more weight precisely because the exam is harder to pass. Realistically, either clears the certification checkbox — interviews are won by how well you can talk about real Scrum situations, which is also what good training prepares you for.</p>

<h2>Frequently asked questions</h2>
<h3>Can I hold both?</h3>
<p>Yes, and many Scrum Masters do: CSM for the workshop and network, PSM I as the harder proof-of-knowledge. There's no conflict between the bodies.</p>
<h3>Which is better for a complete beginner?</h3>
<p>CSM, usually — the mandatory course means you can't fail your way in alone, and the trainer answers the questions a book can't.</p>
<h3>Do these certifications expire?</h3>
<p>CSM expires after two years unless renewed with 20 SEUs and the fee; PSM I is valid for life.</p>
`,
  },
  {
    slug: "agile-vs-waterfall",
    title: "Agile vs Waterfall: Differences, Trade-offs and How to Choose",
    category: "Agile & Scrum",
    excerpt:
      "Agile and Waterfall solve different problems. Here's how the two models actually differ, where each one wins, and the questions that tell you which fits your project.",
    readMins: 8,
    tags: ["Agile", "Waterfall", "Project Management"],
    seoTitle: "Agile vs Waterfall: Key Differences & When to Use Each",
    seoDescription:
      "Agile vs Waterfall compared honestly: planning, change handling, delivery, risk, contracts and team structure — plus a practical checklist for choosing between them.",
    relatedCourseSlugs: ["agile-and-scrum-training", "pmp-certification-training"],
    content: `
<p>Waterfall plans the whole project up front and executes in sequential phases — requirements, design, build, test, deploy. Agile delivers in short cycles, learning and re-planning as it goes. The internet frames this as a religious war; in practice it's an engineering trade-off, and choosing well starts with understanding what each model assumes about your work.</p>

<h2>The core difference: when you learn</h2>
<p>Waterfall assumes you can know most of what matters at the start — so it optimises for efficiency of execution. Agile assumes significant requirements will only be discovered by building and showing working software — so it optimises for speed of learning. Everything else (documents, ceremonies, contracts, metrics) follows from that one assumption.</p>

<h2>Where each model wins</h2>
<h3>Waterfall fits when…</h3>
<ul>
<li>Requirements are genuinely stable and verifiable up front (regulatory builds, physical construction, well-understood system migrations).</li>
<li>The cost of change mid-build is enormous or irreversible.</li>
<li>Contracts demand fixed scope, fixed price and formal sign-offs per phase.</li>
</ul>
<h3>Agile fits when…</h3>
<ul>
<li>Users can't fully articulate what they need until they see something working — true of most new product development.</li>
<li>The market or technology shifts faster than a 12-month plan survives.</li>
<li>Early, partial value is worth shipping (a usable feature now beats a complete system next year).</li>
</ul>

<h2>Comparing the mechanics</h2>
<table>
<tr><th></th><th>Waterfall</th><th>Agile</th></tr>
<tr><td>Planning</td><td>Comprehensive, up-front</td><td>Continuous, per iteration</td></tr>
<tr><td>Delivery</td><td>One release at the end</td><td>Usable increments every 1–4 weeks</td></tr>
<tr><td>Change</td><td>Controlled via change requests</td><td>Expected; backlog reordered freely</td></tr>
<tr><td>Risk profile</td><td>Back-loaded — integration and user feedback arrive late</td><td>Front-loaded — bad assumptions surface in weeks</td></tr>
<tr><td>Progress measure</td><td>Phase completion against plan</td><td>Working product delivered</td></tr>
<tr><td>Customer involvement</td><td>Heavy at start and end</td><td>Continuous</td></tr>
</table>

<h2>The hybrid reality</h2>
<p>Most large organisations run both: Agile delivery inside a stage-gated funding model, or Waterfall programmes with Agile workstreams. That's not failure — it's fit. The mistake worth avoiding is "Water-Scrum-Fall" by accident: fixed scope, fixed date, fixed budget handed to a team that's only Agile in its meeting names. If everything is fixed, you're doing Waterfall and should manage it as Waterfall.</p>

<h2>Skills for both worlds</h2>
<p>Modern delivery careers increasingly need fluency in both. An <a href="/agile-and-scrum-training">Agile and Scrum foundation course</a> covers the iterative side; the <a href="/pmp-certification-training">PMP certification</a> now tests predictive, agile and hybrid approaches in one exam — see our <a href="/info/pmp-certification-training">PMP guide</a> for what that involves.</p>

<h2>Frequently asked questions</h2>
<h3>Is Agile always faster?</h3>
<p>No. Agile delivers <em>value</em> earlier, but a well-understood project with stable requirements can finish sooner under Waterfall because there's less re-planning overhead.</p>
<h3>Can fixed-price contracts work with Agile?</h3>
<p>Yes, with adjustments — fix the budget and timebox, keep scope flexible, and prioritise ruthlessly. Fixing all three is what breaks Agile contracts.</p>
<h3>Which should I learn first?</h3>
<p>Learn the one your organisation actually uses, then the other. Hybrid fluency is the market's direction of travel.</p>
`,
  },
  {
    slug: "sprint-planning-guide",
    title: "Sprint Planning: A Practical Guide to Getting It Right",
    category: "Agile & Scrum",
    excerpt:
      "What good Sprint Planning looks like: the three questions it must answer, who does what, timeboxes, common failure modes and a checklist you can use tomorrow.",
    readMins: 8,
    tags: ["Sprint Planning", "Scrum", "Scrum events"],
    seoTitle: "Sprint Planning Guide: Agenda, Timebox & Best Practices",
    seoDescription:
      "A practical Sprint Planning guide: the why/what/how structure, timeboxes, Product Owner and Developer responsibilities, anti-patterns, and a ready-to-use checklist.",
    relatedCourseSlugs: ["csm-certification-training", "cspo-certification-training"],
    content: `
<p>Sprint Planning kicks off every Sprint by answering three questions in order: <strong>why</strong> is this Sprint valuable, <strong>what</strong> can be done, and <strong>how</strong> will the chosen work get done. Teams that struggle with chaotic Sprints usually have a planning problem first — the fix starts here.</p>

<h2>Topic one: why — the Sprint Goal</h2>
<p>The Product Owner proposes how the product could increase value this Sprint, and the whole team crafts a Sprint Goal — a single coherent objective, not a list of tickets. "Enable guest checkout" is a goal; "complete PROJ-231 through PROJ-244" is a shopping list. The goal gives Developers room to negotiate scope mid-Sprint without losing the point of the Sprint.</p>

<h2>Topic two: what — selecting the work</h2>
<p>Developers pull items from the Product Backlog into the Sprint. Two inputs make this selection honest:</p>
<ul>
<li><strong>Refinement done beforehand.</strong> Items arriving at planning should already be understood and roughly sized. Planning is for selecting and committing, not discovering requirements for the first time.</li>
<li><strong>Real capacity.</strong> Account for leave, meetings, support duty and the improvement action from the last Retrospective — not the theoretical maximum. Past throughput (velocity or item count) is a better forecast anchor than optimism.</li>
</ul>

<h2>Topic three: how — the plan</h2>
<p>Developers decompose selected items into working plans — often tasks of a day or less for the first few days. The Scrum Guide doesn't mandate a format; what matters is that the team leaves believing the plan, because they made it. Nobody assigns work to anyone in Scrum.</p>

<h2>Timeboxes</h2>
<p>Sprint Planning is capped at eight hours for a one-month Sprint — proportionally less for shorter ones, so around four hours for two weeks. Well-refined backlogs routinely finish in half that. If planning regularly overruns, the problem is almost always upstream in refinement.</p>

<h2>Common failure modes</h2>
<ul>
<li><strong>No Sprint Goal</strong> — the Sprint becomes a ticket queue and mid-Sprint trade-offs have no compass.</li>
<li><strong>The Product Owner picks the "how"</strong> — or a lead assigns tasks; either way self-management dies at the whiteboard.</li>
<li><strong>Planning by wishful thinking</strong> — capacity ignores reality, the Sprint overcommits, carry-over becomes culture.</li>
<li><strong>Discovery during planning</strong> — items surface unrefined and the meeting balloons into an analysis workshop.</li>
</ul>

<h2>A checklist that works</h2>
<ol>
<li>Backlog top is refined, ordered and sized before the meeting.</li>
<li>Capacity is calculated with absences and recurring load subtracted.</li>
<li>A Sprint Goal is written down and visible before items are selected.</li>
<li>Developers select the items; nothing is pushed in.</li>
<li>First-days tasks are broken down; risks and dependencies are named.</li>
<li>The team can answer "what will we demo at the Review?" before leaving the room.</li>
</ol>

<p>Facilitating this well is a core Scrum Master skill — it's covered hands-on in the <a href="/csm-certification-training">CSM course</a>, while Product Owners learn the value and ordering side in <a href="/cspo-certification-training">CSPO training</a>. The <a href="/info/csm-certification-training">CSM guide</a> outlines the full curriculum.</p>

<h2>Frequently asked questions</h2>
<h3>Who must attend Sprint Planning?</h3>
<p>The whole Scrum Team — Product Owner, Scrum Master and all Developers. Stakeholders may be invited for specific expertise.</p>
<h3>Can the Sprint Backlog change after planning?</h3>
<p>Yes. The plan is a forecast, not a contract — scope is renegotiated with the Product Owner as more is learned, as long as the Sprint Goal isn't endangered.</p>
<h3>Do we have to estimate in story points?</h3>
<p>No. Points are one option; item counts, t-shirt sizes or right-sizing (splitting everything to roughly one size) all work. Consistency matters more than the unit.</p>
`,
  },
  {
    slug: "definition-of-done-vs-definition-of-ready",
    title: "Definition of Done vs Definition of Ready: What's the Difference?",
    category: "Agile & Scrum",
    excerpt:
      "One is a formal Scrum commitment, the other a popular team practice. What each definition covers, examples you can steal, and how to keep 'Ready' from becoming a gate.",
    readMins: 7,
    tags: ["Definition of Done", "Scrum", "Best practices"],
    seoTitle: "Definition of Done vs Definition of Ready Explained",
    seoDescription:
      "Definition of Done vs Definition of Ready: what each covers, example checklists, which one is an official Scrum commitment, and how to avoid turning Ready into a stage gate.",
    relatedCourseSlugs: ["csm-certification-training", "pspo-certification-training"],
    content: `
<p>Both definitions are quality checklists, but they guard opposite ends of the workflow. The <strong>Definition of Ready</strong> asks: is this backlog item prepared enough to start? The <strong>Definition of Done</strong> asks: is this work truly finished? Only one of them is an official part of Scrum — and mixing up their purpose causes real problems.</p>

<h2>Definition of Done: Scrum's quality commitment</h2>
<p>The Definition of Done (DoD) is a formal commitment attached to the Increment in the Scrum Guide. It describes the state every completed item must reach before it can be considered part of the Increment — and it applies to <em>everyone</em>: if work doesn't meet the DoD, it doesn't ship, it returns to the Product Backlog.</p>
<p>A typical software DoD:</p>
<ul>
<li>Code reviewed and merged to main</li>
<li>Unit and integration tests written and passing</li>
<li>Acceptance criteria verified</li>
<li>No new critical or high defects</li>
<li>Documentation and monitoring updated</li>
<li>Deployed to (at least) a production-like environment</li>
</ul>
<p>The DoD's power is honesty: it's the difference between "done" and "done except testing, review and deployment" — the gap where late-project chaos lives. A weak DoD silently accumulates undone work that erupts at release time.</p>

<h2>Definition of Ready: a useful practice, not a rule</h2>
<p>The Definition of Ready (DoR) is a team convention — it appears nowhere in the Scrum Guide. It lists what a Product Backlog item should have before the team pulls it into a Sprint, for example:</p>
<ul>
<li>Clear user-facing description and acceptance criteria</li>
<li>Dependencies identified</li>
<li>Sized by the Developers</li>
<li>Small enough to finish within a Sprint</li>
</ul>
<p>Used well, a DoR is a refinement conversation prompt that prevents half-understood work from ambushing a Sprint. Used badly, it becomes a stage gate: items bounce back with "not ready" stamps, refinement turns bureaucratic, and collaboration is replaced by hand-offs. The Scrum Guide's own guidance — items that can be Done within one Sprint are "deemed ready" — is deliberately loose. Treat Ready as a guideline, Done as law.</p>

<h2>Key differences at a glance</h2>
<table>
<tr><th></th><th>Definition of Ready</th><th>Definition of Done</th></tr>
<tr><td>Applies to</td><td>Product Backlog items entering a Sprint</td><td>Every item in the Increment</td></tr>
<tr><td>Status in Scrum</td><td>Optional team practice</td><td>Formal commitment</td></tr>
<tr><td>Guards against</td><td>Starting vague work</td><td>Shipping unfinished work</td></tr>
<tr><td>Risk when misused</td><td>Becomes a bureaucratic gate</td><td>Becomes fiction ("done*")</td></tr>
</table>

<h2>Making both work together</h2>
<p>Strong teams keep the DoR light (three to five bullet points) and the DoD demanding — then strengthen the DoD over time as capability grows (adding automated regression, performance checks, security scans). Both checklists are living agreements, revisited in Retrospectives, not laminated posters.</p>
<p>Crafting and enforcing these agreements is bread-and-butter Scrum Master and Product Owner work — covered practically in <a href="/csm-certification-training">CSM training</a> and <a href="/pspo-certification-training">PSPO training</a>. For the full Scrum Master syllabus, see the <a href="/info/csm-certification-training">CSM certification guide</a>.</p>

<h2>Frequently asked questions</h2>
<h3>Who owns the Definition of Done?</h3>
<p>The Scrum Team creates it — unless an organisational standard exists, in which case the team must meet it as a minimum and may strengthen it.</p>
<h3>Can we have different DoDs for different item types?</h3>
<p>Better to have one DoD with conditional lines ("if user-facing, UX review") than parallel definitions that invite arguments about which applies.</p>
<h3>Is a Definition of Ready against Scrum?</h3>
<p>No — it's simply not required. It's a helpful refinement aid as long as it never blocks collaboration or becomes an excuse to refuse work.</p>
`,
  },
];
