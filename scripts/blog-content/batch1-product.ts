import type { BlogSeed } from "./types";

// Batch 1 — Product management & AI cluster.

export const PRODUCT_POSTS: BlogSeed[] = [
  {
    slug: "product-owner-vs-product-manager",
    title: "Product Owner vs Product Manager: Roles, Overlap and Career Paths",
    category: "Product Management",
    excerpt:
      "Two titles, one continuum: how PO and PM responsibilities actually divide, four org patterns you'll meet in the wild, and how to move between the roles.",
    readMins: 8,
    tags: ["Product Owner", "Product Manager", "Careers"],
    seoTitle: "Product Owner vs Product Manager: Real Differences",
    seoDescription:
      "Product Owner vs Product Manager clearly explained: responsibilities, the four common org patterns, skills for each, salary trajectory and how to move between the roles.",
    relatedCourseSlugs: ["cspo-certification-training", "icagile-product-management-icp-pdm-training"],
    content: `
<p>Few title pairs generate more confusion. The clean version: <strong>Product Manager</strong> is an industry role facing market, strategy and P&amp;L; <strong>Product Owner</strong> is Scrum's name for the accountability of maximising the value of one team's work. One is a job title, the other a framework accountability — which is why the same human often holds both.</p>

<h2>The division of labour (when both exist)</h2>
<table>
<tr><th>Product Manager leans</th><th>Product Owner leans</th></tr>
<tr><td>Market research, competitive analysis</td><td>Product Backlog creation and ordering</td></tr>
<tr><td>Product vision and strategy</td><td>Sprint-level trade-off decisions</td></tr>
<tr><td>Pricing, positioning, go-to-market</td><td>Refinement with the Developers</td></tr>
<tr><td>Executive and customer-facing narrative</td><td>Acceptance of work against criteria</td></tr>
<tr><td>Outcome metrics and roadmap</td><td>Sprint Review facilitation with stakeholders</td></tr>
</table>
<p>The danger in splitting: strategy and execution drift apart. The PO becomes a ticket administrator executing someone else's intent; the PM loses touch with what's actually buildable. Healthy splits keep the pair joined at the hip — shared metrics, shared customer exposure, one voice to the team.</p>

<h2>Four patterns you'll meet</h2>
<ol>
<li><strong>One person, both hats</strong> — common in product companies; the PM is the team's PO. Cleanest accountability; heaviest workload.</li>
<li><strong>PM outward, PO inward</strong> — common in scaled enterprises (and formalised in SAFe, where Product Management owns the train backlog and POs own team backlogs).</li>
<li><strong>PO only</strong> — typical in IT-services and internal-IT contexts, where "the business" plays proxy-PM. Works if the PO gets real decision authority; brittle otherwise.</li>
<li><strong>PM only, no Scrum</strong> — flow/Kanban product orgs skip the PO title entirely.</li>
</ol>

<h2>Skills and movement between the roles</h2>
<p>The PO toolkit — backlog craft, stakeholder negotiation, value-slicing, working intimately with engineers — is a strict subset of the PM toolkit, which adds market discovery, commercial modelling and strategic narrative. That's why PO → PM is the natural growth direction: keep the delivery fluency, add discovery and business depth. Moving the other way (PM → PO in an enterprise) is usually about learning agile delivery mechanics deeply.</p>
<p>Certifications map accordingly: <a href="/cspo-certification-training">CSPO</a> or PSPO for the Scrum-side foundation, and <a href="/icagile-product-management-icp-pdm-training">ICAgile Product Management (ICP-PDM)</a> for the broader product craft. Our <a href="/info/cspo-certification-training">CSPO guide</a> covers the former in detail.</p>

<h2>Frequently asked questions</h2>
<h3>Which role is more senior?</h3>
<p>Neither inherently — though in orgs running pattern 2, the PM sits closer to strategy and typically higher in band. In pattern 1 the question dissolves.</p>
<h3>Can a Business Analyst become a PO?</h3>
<p>It's one of the most common transitions — BA skills (requirements, stakeholder work) transfer directly; the additions are decision authority and value ordering.</p>
<h3>Do POs need technical backgrounds?</h3>
<p>No, but enough technical literacy to weigh debt-versus-feature trade-offs credibly is a real advantage on engineering-heavy products.</p>
`,
  },
  {
    slug: "product-roadmap-guide",
    title: "Product Roadmaps That Work: Formats, Anti-patterns and a Build Process",
    category: "Product Management",
    excerpt:
      "A roadmap is a communication of strategy, not a delivery contract. Outcome-based and Now-Next-Later formats, a five-step build process, and the anti-patterns to unlearn.",
    readMins: 8,
    tags: ["Product Roadmap", "Product Management", "Strategy"],
    seoTitle: "Product Roadmap Guide: Formats, Process & Anti-patterns",
    seoDescription:
      "How to build a product roadmap that survives contact with reality: outcome-based and Now-Next-Later formats, stakeholder management, and the feature-list anti-patterns to avoid.",
    relatedCourseSlugs: ["cspo-certification-training", "icagile-product-management-icp-pdm-training"],
    content: `
<p>A product roadmap is a statement of intent: <em>here is the direction we're taking the product, and roughly in what order we'll pursue it, given what we know today</em>. The most common roadmap failure is category error — treating it as a delivery schedule with dates to be "held to". A roadmap communicates strategy; the backlog and release plan handle delivery.</p>

<h2>Formats that survive reality</h2>
<h3>Now – Next – Later</h3>
<p>Three columns, decreasing certainty. <strong>Now</strong>: in progress, well-understood. <strong>Next</strong>: coming after, shaped but not committed. <strong>Later</strong>: directional bets, deliberately vague. Its honesty is its power — it encodes uncertainty instead of hiding it behind quarter labels that will be wrong anyway.</p>
<h3>Outcome-based</h3>
<p>Organised around goals rather than features: "Reduce onboarding drop-off by a third" instead of "Build welcome wizard". Features appear as candidate bets under each outcome, swappable as evidence arrives. This is the format that pairs naturally with OKRs and with empowered teams.</p>
<h3>Timeline / Gantt-style</h3>
<p>Sometimes unavoidable — regulatory deadlines, contractual commitments, hardware cycles. Use it for the genuinely date-bound slice of the portfolio, and resist the pressure to decorate every idea with a quarter.</p>

<h2>Building one: a five-step process</h2>
<ol>
<li><strong>Anchor on strategy.</strong> If you can't state the product vision and current strategic focus in three sentences, fix that first — a roadmap without strategy is a queue.</li>
<li><strong>Gather candidate themes</strong> from discovery, data, support patterns, sales input and engineering health — then group into outcomes, not feature lists.</li>
<li><strong>Prioritise with an explicit model</strong> — impact vs effort, RICE, cost of delay — less for the arithmetic than for making the reasoning arguable.</li>
<li><strong>Choose the format per audience.</strong> Executives get the outcome narrative; delivery teams get Now-Next-Later linked to the backlog; sales gets what's safe to promise (which is: what's in Now).</li>
<li><strong>Review on a cadence.</strong> Monthly or quarterly, prune and re-order publicly. A roadmap last updated two quarters ago is a museum piece.</li>
</ol>

<h2>Anti-patterns to unlearn</h2>
<ul>
<li><strong>The feature parade</strong> — forty features with quarter labels; strategy nowhere; disappointment guaranteed.</li>
<li><strong>The sales artifact</strong> — roadmap items created by deal pressure, one customer at a time, until the product is a patchwork of promises.</li>
<li><strong>The frozen roadmap</strong> — treated as commitment, so learning can't change it; the org optimises for plan-compliance over value.</li>
<li><strong>The secret roadmap</strong> — kept private to avoid awkward questions; stakeholders invent their own versions, which are worse.</li>
</ul>

<p>Roadmapping sits at the heart of product training: it's covered from the value-ordering side in <a href="/cspo-certification-training">CSPO</a> and strategically in <a href="/icagile-product-management-icp-pdm-training">ICP-PDM</a> — see the <a href="/info/cspo-certification-training">CSPO guide</a> for the full curriculum.</p>

<h2>Frequently asked questions</h2>
<h3>Should roadmaps have dates?</h3>
<p>Only where dates are real (regulation, contracts, seasonal windows). Everywhere else, horizon buckets communicate honestly what date-decorations fake.</p>
<h3>How far out should a roadmap go?</h3>
<p>As far as your evidence: typically one quarter in detail, one in outline, and a directional "later". Eighteen months of detailed roadmap is eighteen months of fiction.</p>
<h3>Who owns the roadmap?</h3>
<p>The product manager/owner — with input from everywhere, and veto from no single stakeholder. Ownership without input is arrogance; input without ownership is chaos.</p>
`,
  },
  {
    slug: "what-is-product-discovery",
    title: "What is Product Discovery? Methods, Cadence and Common Traps",
    category: "Product Management",
    excerpt:
      "Discovery is how teams reduce the risk of building the wrong thing: the four risks to test, core methods from interviews to prototypes, and running it continuously alongside delivery.",
    readMins: 8,
    tags: ["Product Discovery", "Product Management", "UX"],
    seoTitle: "What is Product Discovery? Methods & Best Practices",
    seoDescription:
      "Product discovery explained: the four risks (value, usability, feasibility, viability), core methods — interviews, prototypes, experiments — and how continuous discovery works.",
    relatedCourseSlugs: ["cspo-certification-training", "design-thinking-training"],
    content: `
<p>Most product failures aren't engineering failures — the thing was built fine; it just shouldn't have been built. <strong>Product discovery</strong> is the work of finding out what's worth building <em>before and while</em> you build it: cheap tests of risky assumptions, so the expensive activity (delivery) is pointed at things customers actually want.</p>

<h2>The four risks discovery exists to reduce</h2>
<ul>
<li><strong>Value risk</strong> — will anyone want this? The big one, and the least tested in practice.</li>
<li><strong>Usability risk</strong> — can users figure out how to use it?</li>
<li><strong>Feasibility risk</strong> — can we build it with the time, skills and tech we have?</li>
<li><strong>Viability risk</strong> — does it work for the business (economics, legal, brand, support)?</li>
</ul>
<p>A feature idea graduating to the delivery backlog should have survived contact with all four questions — proportionally to its cost. A one-day tweak needs a conversation; a two-quarter platform bet needs real evidence.</p>

<h2>Core methods</h2>
<h3>Learning what problems exist</h3>
<ul>
<li><strong>Customer interviews</strong> — the workhorse. Ask about past behaviour ("walk me through the last time…") rather than future intent ("would you use…"), because intent answers are politeness, not data.</li>
<li><strong>Field observation and support-ticket mining</strong> — what people do beats what they say.</li>
<li><strong>Opportunity mapping</strong> — organising discovered needs into a tree beneath the outcome you're chasing, so solutions trace to problems.</li>
</ul>
<h3>Testing whether a solution answers them</h3>
<ul>
<li><strong>Prototypes</strong> — clickable mockups tested with five-ish users expose usability disasters for the cost of a day.</li>
<li><strong>Fake-door and landing-page tests</strong> — measure real interest before building (use with care and honesty).</li>
<li><strong>Wizard-of-Oz / concierge</strong> — deliver the service manually behind the curtain to test value before automating.</li>
<li><strong>A/B experiments</strong> — for optimisation questions once traffic exists.</li>
</ul>

<h2>Continuous, not phase-gated</h2>
<p>The outdated model ran discovery as a phase — a research quarter producing a requirements document, then delivery. Modern practice runs discovery <strong>continuously in parallel with delivery</strong>: the product trio (product, design, engineering) touches customers weekly, small experiments run constantly, and the backlog is fed by evidence a week old rather than a year old. Dual-track agile is the common label; the essence is simply that learning never stops while building happens.</p>

<h2>Common traps</h2>
<ul>
<li><strong>Discovery theatre</strong> — interviews conducted to validate a decision already made. If no finding could change the plan, it isn't discovery.</li>
<li><strong>Research without synthesis</strong> — twenty interviews, zero decisions. Discovery ends in choices, not decks.</li>
<li><strong>Outsourced learning</strong> — a research team learns; the building team doesn't. Watching one real user struggle changes an engineer more than any report.</li>
<li><strong>Perfection-gating</strong> — demanding statistical certainty for reversible decisions. Match rigor to the cost of being wrong.</li>
</ul>

<p>Discovery techniques are core to modern product training — <a href="/design-thinking-training">Design Thinking</a> covers the problem-space craft, and <a href="/cspo-certification-training">CSPO</a> connects it to backlog decisions; see the <a href="/info/cspo-certification-training">CSPO guide</a> for details.</p>

<h2>Frequently asked questions</h2>
<h3>How much time should a team spend on discovery?</h3>
<p>Continuous small investment beats occasional big studies — a few customer touchpoints weekly for the trio is a healthy baseline, scaling with decision risk.</p>
<h3>Who does discovery — product or UX?</h3>
<p>Together, with engineering in the room. Splitting "learning" from "building" recreates the hand-off problem agile was meant to remove.</p>
<h3>Does discovery slow delivery down?</h3>
<p>It slows the start of the <em>wrong</em> work. Measured over quarters, teams that test value early ship less waste and more impact.</p>
`,
  },
  {
    slug: "what-is-agentic-ai",
    title: "What is Agentic AI? From Chatbots to Systems That Get Work Done",
    category: "Generative AI",
    excerpt:
      "Agentic AI plans, uses tools and executes multi-step work with limited supervision. How agents differ from chatbots, the core architecture, real use cases and the risks to manage.",
    readMins: 9,
    tags: ["Agentic AI", "Generative AI", "AI agents"],
    seoTitle: "What is Agentic AI? Agents Explained (2026 Guide)",
    seoDescription:
      "Agentic AI explained clearly: how AI agents differ from chatbots, the plan-act-observe loop, tool use, multi-agent systems, enterprise use cases, risks and required skills.",
    relatedCourseSlugs: ["agentic-ai-foundation-training-course", "agentic-ai-practitioner-training-course"],
    content: `
<p>A chatbot answers you. An <strong>AI agent</strong> does things for you: give it a goal, and it plans steps, uses tools — search, code, files, APIs, other software — observes results, corrects course, and keeps going until the job is done or it needs your input. That shift, from generating responses to executing work, is what "agentic AI" means, and it's the defining AI trend of 2025–26.</p>

<h2>Chatbot vs agent: the practical difference</h2>
<table>
<tr><th></th><th>Chatbot / assistant</th><th>Agent</th></tr>
<tr><td>Interaction</td><td>One prompt → one response</td><td>One goal → many autonomous steps</td></tr>
<tr><td>Tools</td><td>Mostly none</td><td>Search, code execution, APIs, files, browsers</td></tr>
<tr><td>State</td><td>Conversation memory</td><td>Task state: plan, progress, intermediate results</td></tr>
<tr><td>Failure mode</td><td>Wrong answer</td><td>Wrong <em>actions</em> — which is why guardrails matter</td></tr>
</table>

<h2>How agents work: the loop</h2>
<p>Under the hood, most agents run a variant of the same loop:</p>
<ol>
<li><strong>Plan</strong> — the model breaks the goal into steps ("find the data, clean it, produce the summary").</li>
<li><strong>Act</strong> — it calls a tool: runs code, queries an API, edits a file.</li>
<li><strong>Observe</strong> — it reads the result, including errors.</li>
<li><strong>Adapt</strong> — it updates the plan and repeats, until done or blocked.</li>
</ol>
<p>Around that loop sit the components that make agents production-worthy: tool definitions (what the agent may touch), memory (short-term task state and longer-term knowledge), and guardrails (permissions, spend limits, human-approval gates for consequential actions). Multi-agent systems compose several specialised agents — a researcher, a coder, a reviewer — under an orchestrator, which helps on complex workflows and adds its own coordination failure modes.</p>

<h2>Where agents are earning their keep</h2>
<ul>
<li><strong>Software engineering</strong> — the most mature domain: agents that write, test, debug and refactor code across whole repositories.</li>
<li><strong>Customer operations</strong> — resolving (not just deflecting) tickets: reading context, taking account actions, escalating with a summary.</li>
<li><strong>Research and analysis</strong> — multi-source gathering, synthesis and drafting with citations.</li>
<li><strong>Back-office workflows</strong> — invoice matching, onboarding steps, report assembly across systems.</li>
<li><strong>Delivery tooling</strong> — inside Scrum and project teams: backlog hygiene, release-note drafting, dependency chasing.</li>
</ul>

<h2>The risks, honestly</h2>
<p>Autonomy amplifies both value and error. The serious deployment concerns: <strong>compounding mistakes</strong> (a wrong step early poisons everything after), <strong>over-permissioning</strong> (an agent with production-database write access is an incident waiting), <strong>prompt injection</strong> (malicious content in data the agent reads can hijack its behaviour), and <strong>cost runaway</strong> (loops burning tokens). Mature practice answers with least-privilege tool access, human approval on irreversible actions, observability over every step, and evaluation suites before scale-up. "Human on the loop" is the current enterprise default for good reason.</p>

<h2>Skills for the agentic era</h2>
<p>The skill isn't prompting anymore — it's <strong>designing, supervising and evaluating agent systems</strong>: decomposing workflows, defining tools and permissions, writing evaluations, and knowing when autonomy is inappropriate. That's precisely what structured programs teach: the <a href="/agentic-ai-foundation-training-course">Agentic AI Foundation</a> course covers concepts and architecture, and the <a href="/agentic-ai-practitioner-training-course">Practitioner</a> level goes hands-on with building agents. Full curricula are in our <a href="/info/agentic-ai-foundation-training-course">Agentic AI Foundation guide</a>.</p>

<h2>Frequently asked questions</h2>
<h3>Is agentic AI the same as AGI?</h3>
<p>No. Agents are narrow, goal-scoped systems built on today's models — powerful automation, not general intelligence.</p>
<h3>Do I need to code to work with agents?</h3>
<p>To build production agents, yes (Python/TypeScript dominate). To design, evaluate and manage agentic workflows, no — those roles are growing fast in every function.</p>
<h3>Which frameworks matter?</h3>
<p>Model-provider SDKs (Anthropic, OpenAI) plus orchestration layers like LangGraph and CrewAI are the common stack in 2026 — but concepts transfer; frameworks churn.</p>
`,
  },
  {
    slug: "generative-ai-for-project-managers",
    title: "Generative AI for Project Managers: Practical Uses, Limits and Skills",
    category: "Generative AI",
    excerpt:
      "Where GenAI genuinely helps PMs today — status, risk, planning support, communication — where it fails, and how to adopt it without outsourcing your judgment.",
    readMins: 8,
    tags: ["Generative AI", "Project Management", "AI tools"],
    seoTitle: "Generative AI for Project Managers: A Practical Guide",
    seoDescription:
      "How project managers actually use generative AI in 2026: high-value use cases, honest limitations, governance basics and the skills that keep PMs ahead of the tooling.",
    relatedCourseSlugs: ["gen-ai-for-project-managers", "pmp-certification-training"],
    content: `
<p>Project management has a high ratio of information-processing work — summarising, drafting, extracting, reformatting — and that's exactly what generative AI does well. The PMs getting real value in 2026 aren't asking AI to run their projects; they're deleting the administrative hours and reinvesting them in the judgment work AI can't do.</p>

<h2>High-value uses today</h2>
<ul>
<li><strong>Status reporting</strong> — feed raw inputs (standup notes, ticket activity, meeting transcripts) and get a coherent draft status in the sponsor's format. Minutes instead of an afternoon; you edit for accuracy and tone.</li>
<li><strong>Meeting leverage</strong> — transcription plus AI summaries turn every meeting into searchable decisions and actions. The discipline shift: someone still validates the action list.</li>
<li><strong>Risk identification support</strong> — AI generates candidate risks from your project description that your team then assesses. It's a brainstorm accelerator with unusually wide recall — our <a href="/blog/risk-management-in-project-management">risk management guide</a> covers the process it plugs into.</li>
<li><strong>Planning first drafts</strong> — WBS skeletons, schedule strawmen, RACI drafts, communication-plan templates: AI produces the 70% version you refine with context it doesn't have.</li>
<li><strong>Stakeholder communication</strong> — tone-shifting the same update for executives, team and client; drafting the delicate email you rewrite three times anyway.</li>
<li><strong>Document intelligence</strong> — "what did the contract say about penalty clauses?" across hundreds of pages, with page references to verify.</li>
</ul>

<h2>Where it fails — and burns the careless</h2>
<ul>
<li><strong>Hallucination with confidence.</strong> Fabricated details in summaries, plausible-but-wrong contract interpretations. Everything customer- or contract-facing gets human verification, no exceptions.</li>
<li><strong>No accountability.</strong> AI can draft the trade-off analysis; it cannot own the decision or feel the stakeholder relationship. Judgment stays with you.</li>
<li><strong>Garbage-in dynamics.</strong> AI summarising chaotic, stale project data produces confident summaries of chaos.</li>
<li><strong>Confidentiality.</strong> Project data in consumer AI tools is a governance incident. Use enterprise deployments with data controls, and know your organisation's policy cold.</li>
</ul>

<h2>Adopting it well: a simple sequence</h2>
<ol>
<li>Pick two recurring drains (status drafting, meeting summaries) and pilot for a month.</li>
<li>Build prompt templates the whole PMO shares — consistency beats individual heroics.</li>
<li>Add a verification norm: AI drafts, named human approves.</li>
<li>Measure honestly: hours saved, quality delta, near-misses caught.</li>
<li>Expand into risk support and document intelligence once the basics are habitual.</li>
</ol>

<h2>The skill investment</h2>
<p>The market is already pricing this in: PM job descriptions increasingly list AI-tool fluency, and PMI's 2026 exam refresh explicitly folds AI-era delivery into the content outline. A focused program like <a href="/gen-ai-for-project-managers">Gen AI for Project Managers</a> compresses the learning curve — practical use cases, prompt craft for delivery artifacts, governance basics — and pairs naturally with the <a href="/pmp-certification-training">PMP</a> credential track (see the <a href="/info/pmp-certification-training">PMP guide</a>).</p>

<h2>Frequently asked questions</h2>
<h3>Will AI replace project managers?</h3>
<p>It's replacing project <em>administration</em>. Stakeholder leadership, trade-off judgment and accountability are the durable core — PMs who shed the admin and deepen the core become more valuable, not less.</p>
<h3>Which tools should I learn first?</h3>
<p>Whatever your organisation sanctions: enterprise copilots inside your existing suite (Microsoft 365, Atlassian, Google) plus one general assistant (Claude, ChatGPT) used within policy. Skills transfer; tool loyalty doesn't matter.</p>
<h3>How do I practise safely?</h3>
<p>Use sanitised or fictional project data while learning, and graduate to real data only inside approved enterprise tooling.</p>
`,
  },
  {
    slug: "work-breakdown-structure-guide",
    title: "Work Breakdown Structure (WBS): How to Build One That Actually Helps",
    category: "Project Management",
    excerpt:
      "The WBS turns a project's scope into a hierarchy you can estimate, schedule and control: the 100% rule, decomposition guidelines, a worked example and common mistakes.",
    readMins: 7,
    tags: ["WBS", "Project Planning", "Project Management"],
    seoTitle: "Work Breakdown Structure (WBS): Guide & Example",
    seoDescription:
      "How to create a Work Breakdown Structure: the 100% rule, deliverable-oriented decomposition, work packages, a worked example, WBS dictionary and mistakes to avoid.",
    relatedCourseSlugs: ["pmp-certification-training", "capm-certification-training"],
    content: `
<p>A <strong>Work Breakdown Structure</strong> is a hierarchical decomposition of everything a project must deliver: the total scope, broken into progressively smaller pieces until each piece is small enough to estimate, assign and track. It's the bridge between "what the charter promises" and "what goes on the schedule" — and scope that never makes it into the WBS has a habit of surfacing later as a surprise.</p>

<h2>The rules that make a WBS work</h2>
<ul>
<li><strong>The 100% rule.</strong> Each level contains 100% of the work of the level above — no more, no less. Children of a node sum exactly to their parent. This is the rule that catches missing scope.</li>
<li><strong>Deliverables, not activities.</strong> Nodes are nouns ("Payment module", "Training materials"), not verbs ("Code the payment module"). Activities belong to the schedule, derived <em>from</em> the WBS.</li>
<li><strong>Mutually exclusive elements.</strong> Each piece of work lives in exactly one branch — overlap creates double-counting in estimates and finger-pointing in execution.</li>
<li><strong>Decompose until controllable.</strong> Stop when a piece can be reliably estimated and owned — the classic heuristics: a work package of roughly 8–80 hours, assignable to one owner, with checkable completion.</li>
</ul>

<h2>A worked example</h2>
<p>Customer-portal project, top two levels:</p>
<ul>
<li><strong>1. Customer Portal</strong>
<ul>
<li>1.1 Project management (planning, governance, reporting)</li>
<li>1.2 Requirements &amp; design (user research, UX designs, technical architecture)</li>
<li>1.3 Application (authentication, account dashboard, payments, notifications)</li>
<li>1.4 Data migration (mapping, migration tooling, validated cutover)</li>
<li>1.5 Testing (test plans, system testing, UAT support)</li>
<li>1.6 Deployment &amp; adoption (environments, release, training materials, hypercare)</li>
</ul></li>
</ul>
<p>Each leaf then decomposes into work packages — 1.3.3 Payments might split into gateway integration, saved-card management and refund handling. Pair the diagram with a <strong>WBS dictionary</strong>: a short entry per package covering scope boundaries, owner, acceptance criteria and assumptions — the two artifacts together prevent most "I thought that was your part" conversations.</p>

<h2>WBS in agile contexts</h2>
<p>Agile teams decompose differently — epics to features to stories — but the underlying discipline is the same: full scope coverage, one home per piece, sized-to-manage chunks. Hybrid projects often keep a light WBS for the fixed, contractual layer and run backlog decomposition inside it. The WBS remains firmly on the <a href="/pmp-certification-training">PMP</a> and <a href="/capm-certification-training">CAPM</a> exams either way — the <a href="/info/pmp-certification-training">PMP guide</a> shows where planning tools sit in the outline.</p>

<h2>Common mistakes</h2>
<ul>
<li><strong>Verb-driven branches</strong> — you've written a task list in a tree costume; scope gaps stay invisible.</li>
<li><strong>Forgetting the non-build work</strong> — project management, testing, training and migration are scope too (they're where the 100% rule earns its keep).</li>
<li><strong>Decomposing to dust</strong> — hundreds of two-hour packages create tracking overhead that outweighs control value.</li>
<li><strong>One-and-done</strong> — the WBS should be re-baselined through change control when scope genuinely changes, not abandoned at first contact.</li>
</ul>

<h2>Frequently asked questions</h2>
<h3>Is the WBS the same as the project schedule?</h3>
<p>No — the WBS defines <em>what</em>; the schedule sequences <em>when</em>. Activities are derived from work packages, then estimated and networked.</p>
<h3>Who creates the WBS?</h3>
<p>The project manager facilitates; the people who'll do the work decompose their areas. Team-built WBS structures are both more accurate and more owned.</p>
<h3>How many levels should it have?</h3>
<p>As few as control requires — three to five levels serves most projects; depth can vary by branch.</p>
`,
  },
];
