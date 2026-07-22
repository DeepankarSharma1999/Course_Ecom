// Single source of truth for editable marketing-page content.
// Each page renders from getPageContent(slug, PAGE_DEFAULTS[slug].content) (see lib/page-content.ts),
// and the admin editor (/admin/site-pages) auto-builds a form from this same shape.
// To make a new page editable: add its current literals here and point the page at getPageContent.

export type PageDefault = {
  label: string; // shown in admin
  group: string; // admin grouping
  content: Record<string, any>;
};

// The 8 enterprise solution pages all feed <EnterpriseSolutionLayout {...content} />.
const enterprise = (content: Record<string, any>): PageDefault => ({
  label: content.title,
  group: "Enterprise Solutions",
  content,
});

export const PAGE_DEFAULTS: Record<string, PageDefault> = {
  "business-agility": enterprise({
    category: "Agile Solutions",
    title: "Business Agility Transformation",
    subtitle: "Adapt, Innovate, and Thrive in a Disruptive Market",
    description:
      "Business agility goes beyond IT. We help you transform your entire organization—from HR and marketing to finance and operations—to quickly respond to market changes, emerging opportunities, and customer demands.",
    metaTitle: "Business Agility Transformation",
    metaDescription:
      "Achieve enterprise-wide Business Agility to respond quickly to market changes and outpace competitors.",
    benefits: [
      { icon: "zap", title: "Rapid Market Response", description: "Pivot strategies instantly and capitalize on new opportunities without organizational friction." },
      { icon: "target", title: "Customer Centricity", description: "Realign your entire operating model around delivering continuous customer value." },
      { icon: "briefcase", title: "Operational Excellence", description: "Eliminate waste, reduce overhead, and optimize processes across all business units." },
      { icon: "users", title: "Empowered Workforce", description: "Cultivate a resilient culture where employees are autonomous, engaged, and motivated." },
      { icon: "shield", title: "Risk Mitigation", description: "Anticipate market disruptions and build robust frameworks for business continuity." },
      { icon: "trending", title: "Sustainable Growth", description: "Drive long-term profitability by embedding innovation into your daily operations." },
    ],
    approach: [
      { title: "Assess & Align", description: "Evaluate your current organizational agility and align leadership on transformation goals." },
      { title: "Design the Model", description: "Redesign organizational structures, shifting from silos to cross-functional value delivery teams." },
      { title: "Pilot & Learn", description: "Launch agile practices in targeted non-IT departments to build early success and momentum." },
      { title: "Scale Enterprise-Wide", description: "Roll out the agile operating model across the entire enterprise with continuous coaching." },
    ],
  }),

  "safe-implementation": enterprise({
    category: "Agile Solutions",
    title: "SAFe® Implementation Roadmap",
    subtitle: "Scale Agile Seamlessly Across Your Enterprise",
    description:
      "Leverage the Scaled Agile Framework (SAFe®) to align strategy with execution, accelerate delivery, and drive business agility. Our expert SAFe Practice Consultants (SPCs) guide you through every step of your transformation.",
    metaTitle: "SAFe Implementation",
    metaDescription:
      "Scale Agile across your enterprise with expert SAFe Implementation services from SimpliLEAD.",
    benefits: [
      { icon: "trending", title: "Faster Time-to-Market", description: "Streamline workflows and synchronize cross-functional teams to deliver value rapidly." },
      { icon: "target", title: "Strategic Alignment", description: "Connect portfolio strategy directly to agile execution to ensure teams build what matters." },
      { icon: "shield", title: "Reduced Risk", description: "Improve quality and predictability with built-in compliance and continuous testing." },
      { icon: "users", title: "Enhanced Collaboration", description: "Break down silos and foster a culture of shared responsibility and continuous learning." },
      { icon: "chart", title: "Measurable ROI", description: "Track transformation progress and business value delivered with clear metrics." },
      { icon: "globe", title: "Global Scaling", description: "Implement a proven framework that scales predictably from 50 to 5,000+ practitioners." },
    ],
    approach: [
      { title: "Train the Leaders", description: "Build a guiding coalition by training executives, managers, and leaders in Lean-Agile principles." },
      { title: "Identify Value Streams", description: "Map operational and development value streams to identify Agile Release Trains (ARTs)." },
      { title: "Launch ARTs", description: "Train teams and launch ARTs with focused PI Planning events for immediate alignment." },
      { title: "Extend to Portfolio", description: "Implement Lean Portfolio Management to align funding and strategy with execution." },
    ],
    relatedCourses: [{ title: "Leading SAFe 6.0", href: "/courses" }],
  }),

  "lean-portfolio-management": enterprise({
    category: "Agile Solutions",
    title: "Lean Portfolio Management",
    subtitle: "Align Strategy and Execution with Lean Budgeting",
    description:
      "Connect your enterprise strategy to execution. We help you implement Lean Portfolio Management (LPM) to govern investment, fund value streams, and accelerate flow across your organization.",
    metaTitle: "Lean Portfolio Management",
    metaDescription:
      "Align strategy with execution using Lean Portfolio Management—Lean budgeting, value-stream funding, and portfolio flow.",
    benefits: [
      { icon: "target", title: "Strategy to Execution", description: "Translate enterprise strategy into a funded, prioritized portfolio backlog." },
      { icon: "chart", title: "Lean Budgeting", description: "Fund value streams instead of projects to remove costly, slow funding cycles." },
      { icon: "trending", title: "Faster Flow", description: "Visualize and optimize the flow of epics from idea to done." },
      { icon: "shield", title: "Lean Governance", description: "Govern spend, measure outcomes, and ensure compliance without bottlenecks." },
      { icon: "briefcase", title: "Investment Clarity", description: "Make confident investment decisions backed by objective portfolio metrics." },
      { icon: "users", title: "Aligned Leadership", description: "Unite business and technology leaders around a shared portfolio vision." },
    ],
    approach: [
      { title: "Define the Portfolio", description: "Establish portfolio context, value streams, and strategic themes." },
      { title: "Establish Lean Budgets", description: "Shift from project funding to value-stream funding with guardrails." },
      { title: "Implement Portfolio Flow", description: "Set up the Portfolio Kanban to manage epics from idea to implementation." },
      { title: "Govern & Improve", description: "Run participatory budgeting and measure outcomes to continuously improve." },
    ],
  }),

  "value-stream": enterprise({
    category: "Agile Solutions",
    title: "Value Stream Management",
    subtitle: "Optimize the End-to-End Flow of Value",
    description:
      "Identify, map, and optimize your value streams to eliminate waste and accelerate delivery. We help you see how value flows from concept to cash and remove the bottlenecks that slow you down.",
    metaTitle: "Value Stream Management",
    metaDescription:
      "Map and optimize your value streams to eliminate waste, reduce lead time, and accelerate delivery.",
    benefits: [
      { icon: "zap", title: "Reduced Lead Time", description: "Cut the time from idea to delivery by removing hand-offs and delays." },
      { icon: "target", title: "Waste Elimination", description: "Surface and remove non-value-adding steps across the value stream." },
      { icon: "chart", title: "Flow Metrics", description: "Measure flow, throughput, and efficiency to guide improvement." },
      { icon: "users", title: "Cross-Functional Alignment", description: "Align teams around the end-to-end delivery of customer value." },
      { icon: "trending", title: "Continuous Improvement", description: "Build a culture of relentless improvement around measurable flow." },
      { icon: "briefcase", title: "Operational Efficiency", description: "Do more with the same capacity by optimizing the system, not the silo." },
    ],
    approach: [
      { title: "Identify Value Streams", description: "Map operational and development value streams across the organization." },
      { title: "Map the Current State", description: "Visualize every step, hand-off, and delay to expose bottlenecks." },
      { title: "Design the Future State", description: "Re-design the flow to minimize wait time and maximize value delivery." },
      { title: "Measure & Optimize", description: "Instrument flow metrics and iterate toward the future state." },
    ],
  }),

  "design-thinking-workshops": enterprise({
    category: "Product Building",
    title: "Design Thinking Workshops",
    subtitle: "Solve Complex Problems with a Human-Centered Mindset",
    description:
      "Equip your teams to innovate with confidence. Our hands-on Design Thinking workshops teach the mindset and tools to empathize with users, frame problems, and rapidly prototype winning solutions.",
    metaTitle: "Design Thinking Workshops",
    metaDescription:
      "Hands-on Design Thinking workshops that teach teams to empathize, ideate, prototype, and test customer-centered solutions.",
    benefits: [
      { icon: "users", title: "User Empathy", description: "Build a deep understanding of customer needs, pains, and motivations." },
      { icon: "zap", title: "Rapid Ideation", description: "Generate and converge on creative solutions faster as a team." },
      { icon: "layers", title: "Prototyping Skills", description: "Turn ideas into low-fidelity prototypes to test assumptions early." },
      { icon: "target", title: "Problem Framing", description: "Reframe ambiguous challenges into clear, solvable problem statements." },
      { icon: "trending", title: "Faster Innovation", description: "Reduce the risk and cost of innovation by validating before building." },
      { icon: "briefcase", title: "Collaborative Culture", description: "Foster cross-functional collaboration and a bias toward action." },
    ],
    approach: [
      { title: "Empathize", description: "Research and observe users to understand their real needs." },
      { title: "Define & Ideate", description: "Frame the problem and brainstorm a wide range of solutions." },
      { title: "Prototype", description: "Build quick, tangible representations of the best ideas." },
      { title: "Test & Iterate", description: "Validate prototypes with users and refine based on feedback." },
    ],
  }),

  "product-coaching": enterprise({
    category: "Product Building",
    title: "Product Coaching",
    subtitle: "Build Empowered, Outcome-Driven Product Teams",
    description:
      "Move from feature factories to outcome-driven product teams. Our product coaches work alongside your product managers and leaders to build the skills, mindset, and practices of world-class product organizations.",
    metaTitle: "Product Coaching",
    metaDescription:
      "Product coaching that transforms feature factories into empowered, outcome-driven product teams.",
    benefits: [
      { icon: "target", title: "Outcome Focus", description: "Shift teams from shipping features to delivering measurable outcomes." },
      { icon: "users", title: "Empowered Teams", description: "Build autonomous product teams that own problems, not just backlogs." },
      { icon: "chart", title: "Data-Informed Decisions", description: "Use evidence and experimentation to guide product bets." },
      { icon: "zap", title: "Faster Discovery", description: "Accelerate continuous product discovery to de-risk what you build." },
      { icon: "briefcase", title: "Stronger Strategy", description: "Connect product vision and strategy to day-to-day execution." },
      { icon: "trending", title: "Sustained Growth", description: "Develop product leaders who keep raising the bar over time." },
    ],
    approach: [
      { title: "Assess Maturity", description: "Evaluate current product practices, skills, and operating model." },
      { title: "Coach in Flow", description: "Embed coaches with teams to build skills through real work." },
      { title: "Install Practices", description: "Introduce product discovery, outcomes, and experimentation." },
      { title: "Grow Leaders", description: "Develop internal product leadership to sustain the change." },
    ],
  }),

  "project-to-product": enterprise({
    category: "Product Building",
    title: "Project to Product",
    subtitle: "Shift from Temporary Projects to Lasting Products",
    description:
      "Move beyond the start-stop cycle of project funding. We help you adopt a product operating model—stable teams, value-stream funding, and outcome ownership—that delivers continuous value.",
    metaTitle: "Project to Product",
    metaDescription:
      "Transition from project-based delivery to a product operating model with stable teams and outcome ownership.",
    benefits: [
      { icon: "users", title: "Stable Teams", description: "Replace temporary project teams with durable, cross-functional product teams." },
      { icon: "chart", title: "Value-Stream Funding", description: "Fund long-lived value streams instead of one-off projects." },
      { icon: "target", title: "Outcome Ownership", description: "Make teams accountable for business outcomes, not project completion." },
      { icon: "trending", title: "Continuous Value", description: "Deliver value continuously rather than in risky big-bang releases." },
      { icon: "briefcase", title: "Better Investment", description: "Improve ROI by funding what works and stopping what doesn't." },
      { icon: "zap", title: "Faster Feedback", description: "Shorten feedback loops between strategy, delivery, and customers." },
    ],
    approach: [
      { title: "Map Value Streams", description: "Identify the product value streams that deliver customer value." },
      { title: "Form Stable Teams", description: "Stand up durable, cross-functional teams around each product." },
      { title: "Shift Funding", description: "Move from project budgets to persistent value-stream funding." },
      { title: "Measure Outcomes", description: "Track product outcomes and flow instead of project milestones." },
    ],
  }),

  "devops-cultural-transformation": enterprise({
    category: "Agile Solutions",
    title: "DevOps Cultural Transformation",
    subtitle: "Bridge the Gap Between Development and Operations",
    description:
      "DevOps is more than just tools—it's a fundamental shift in culture. We help you tear down silos, establish shared goals, and implement automation strategies that enable continuous integration, continuous delivery, and highly reliable systems.",
    metaTitle: "DevOps Cultural Transformation",
    metaDescription: "Foster a collaborative DevOps culture to accelerate software delivery and improve reliability.",
    benefits: [
      { icon: "users", title: "Break Down Silos", description: "Create cross-functional teams with shared accountability for the entire software lifecycle." },
      { icon: "zap", title: "Accelerated Delivery", description: "Implement CI/CD pipelines to release high-quality software to market faster and more frequently." },
      { icon: "shield", title: "Enhanced Reliability", description: "Improve system stability and drastically reduce mean time to recovery (MTTR)." },
      { icon: "code", title: "Automation First", description: "Automate testing, provisioning, and deployment to eliminate manual errors and toil." },
      { icon: "target", title: "Continuous Feedback", description: "Embed monitoring and telemetry to create tight feedback loops for continuous improvement." },
      { icon: "briefcase", title: "Higher Employee Satisfaction", description: "Empower engineers by removing friction, leading to higher morale and retention." },
    ],
    approach: [
      { title: "Cultural Assessment", description: "Evaluate existing workflows, team dynamics, and toolchains to baseline your current DevOps maturity." },
      { title: "Define the Target State", description: "Establish a clear vision for your DevOps culture, defining metrics like deployment frequency and lead time." },
      { title: "Implement Automation", description: "Introduce modern CI/CD, Infrastructure as Code (IaC), and automated testing practices." },
      { title: "Coach & Scale", description: "Provide hands-on coaching to embed DevOps mindsets and scale practices across all engineering teams." },
    ],
    relatedCourses: [{ title: "DevOps Foundation", href: "/courses" }],
  }),

  "product-development-training": enterprise({
    category: "Product Building",
    title: "Product Development Training",
    subtitle: "Build Better Products, Faster",
    description:
      "Modern product development requires tight alignment between product management, design, and engineering. Our comprehensive training programs equip your entire cross-functional organization with the latest methodologies to build scalable, user-centric software.",
    metaTitle: "Product Development Training",
    metaDescription: "Equip your engineering and product teams with modern development practices.",
    benefits: [
      { icon: "code", title: "Technical Excellence", description: "Train engineering teams in Agile engineering practices like TDD, BDD, and Pair Programming." },
      { icon: "zap", title: "Accelerated Delivery", description: "Optimize your delivery pipelines to ensure faster, safer, and more frequent product releases." },
      { icon: "users", title: "Cross-Functional Synergy", description: "Break down silos by training Product, Design, and Engineering to collaborate seamlessly." },
      { icon: "shield", title: "Built-In Quality", description: "Shift testing left and build quality into the product from the very first line of code." },
      { icon: "layers", title: "Scalable Architecture", description: "Learn to design microservices and cloud-native architectures that scale with your business." },
      { icon: "target", title: "User-Centric Engineering", description: "Connect developers directly to user feedback to ensure technical decisions align with user needs." },
    ],
    approach: [
      { title: "Assess Capabilities", description: "Benchmark your team's current technical and product development capabilities." },
      { title: "Customized Training Tracks", description: "Deliver specialized training tracks for Engineers, Designers, and Product Managers." },
      { title: "Hands-On Labs", description: "Ensure high retention through interactive, real-world coding labs and architectural exercises." },
      { title: "Continuous Coaching", description: "Provide post-training mentorship to help teams implement new practices in their daily work." },
    ],
    relatedCourses: [{ title: "AI Powered Software Development", href: "/courses" }],
  }),

  "compare": {
    label: "Compare Courses",
    group: "Marketing Pages",
    content: {
      metaTitle: "Compare Certification Courses",
      metaDescription: "Side-by-side comparison of certification training courses — duration, price, exam, prerequisites and outcomes.",
      heroBadge: "Compare",
      heroHeading: "Compare Certification Courses",
      heroSubtitle: "Not sure which course is right for you? Pick any two to see them side-by-side.",
      popularTitle: "Popular Comparisons",
      suggested: [
        { a: "safe-scrum-master-certification", b: "safe-product-owner-product-manager-certification" },
        { a: "safe-scrum-master-certification", b: "safe-devops-certification" },
      ],
    },
  },

  "navigation": {
    label: "Header Navigation Menus",
    group: "Navigation",
    content: {
      aiCourses: [
        { name: "Applied Agentic AI certification", href: "/applied-agentic-ai-certification" },
        { name: "Gen AI for Scrum Masters", href: "/gen-ai-for-scrum-masters" },
        { name: "Gen AI for Project Managers", href: "/gen-ai-for-project-managers" },
        { name: "Gen AI for Product Owners/Product Managers", href: "/gen-ai-for-product-owners" },
        { name: "Gen AI for Enterprise Agilist", href: "/gen-ai-for-enterprise-agilist" },
        { name: "Gen AI for Business Analysts", href: "/gen-ai-for-business-analysts" },
        { name: "AI Powered Software Development", href: "/ai-powered-software-development" },
        { name: "No-Code AI Agents & Automation", href: "/no-code-ai-agents" },
      ],
      enterpriseAgile: [
        { name: "SAFe Implementation", href: "/safe-implementation" },
        { name: "Business Agility", href: "/business-agility" },
        { name: "Value Stream Workshop / Optimization", href: "/value-stream" },
        { name: "DevOps Cultural Transformation", href: "/devops-cultural-transformation" },
        { name: "Technology & Business Management", href: "/tech-business-management" },
        { name: "Lean Portfolio Management", href: "/lean-portfolio-management" },
      ],
      enterpriseProduct: [
        { name: "Product Coaching", href: "/product-coaching" },
        { name: "Design Thinking Workshops", href: "/design-thinking-workshops" },
        { name: "Project to Product (Culture Shift)", href: "/project-to-product" },
        { name: "Product Development Training", href: "/product-development-training" },
      ],
      resources: [
        { name: "Blogs", href: "/resources" },
        { name: "Practice Tests", href: "/practice-tests" },
      ],
    },
  },

  "free-course": {
    label: "Free Courses",
    group: "Marketing Pages",
    content: {
      metaTitle: "Free Courses",
      metaDescription: "Level Up Your Career with Free Online Courses from SimpliLEAD. Explore handpicked, high-impact courses designed for professionals and beginners alike.",
      heroBadge: "Free Courses for Professionals",
      heroHeading: "Level Up Your Career with",
      heroHighlight: "Free Online Courses",
      heroSubtitle: "Explore handpicked, high-impact courses designed for professionals and beginners alike—completely free and fully online.",
      heroCtaText: "Explore Free Courses",
      benefitsTitle: "Courses Designed to Build Real-World Skills",
      benefitsSubtitle: "Unlock your potential with our meticulously crafted free resources and training materials.",
      benefits: [
        { icon: "users", title: "Learn from Certified Experts", desc: "Our free courses are crafted by seasoned instructors and experts who bring real-world insights to every lesson." },
        { icon: "monitor", title: "Skill-Focused Learning", desc: "Focus on hands-on, outcome-driven learning in areas like Agile, Scrum, Project Management, and Digital Transformation." },
        { icon: "gift", title: "Zero-Cost Learning Tools", desc: "Gain access to free downloadable toolkits, career maps, and expert tips—no strings attached." },
        { icon: "clock", title: "Study on Your Schedule", desc: "Study at your own pace—on desktop or mobile—anytime, anywhere in the world." },
      ],
      coursesTitle: "Explore Our Free Online Courses",
      coursesSubtitle: "Start learning today with these top-rated free programs.",
      freeCourses: [
        { title: "Change Management", slug: "change-management" },
        { title: "Cryptocurrency Investing Master Class Course", slug: "cryptocurrency-investing-master-class-course" },
        { title: "Agile Leadership Bootcamp", slug: "agile-leadership-bootcamp" },
        { title: "AI for Scrum Developers", slug: "ai-for-scrum-developers" },
        { title: "Design Thinking Basics", slug: "design-thinking-basics" },
        { title: "Project Management Fundamentals", slug: "project-management-fundamentals" },
      ],
      practiceTestsTitle: "Explore Our Free Practice Tests",
      practiceTestsSubtitle: "Test your knowledge and prepare for your certification exams.",
      // FIX-02: fabricated "users" counts removed; the card hides the chip when unset.
      practiceTests: [
        { title: "Certified Scrum Master (CSM) Practice Test", slug: "csm", tests: 3, hours: 3, questions: 150, marks: 150 },
        { title: "Leading SAFe Practice Test | SAFe Agilist Mock Test", slug: "leading-safe", tests: 4, hours: 6, questions: 180, marks: 180 },
        { title: "ITIL Practice Test: Ace Your Certification", slug: "itil", tests: 5, hours: 5, questions: 200, marks: 200 },
        { title: "DevOps Practice Test: Prepare Efficiently", slug: "devops", tests: 3, hours: 4, questions: 120, marks: 120 },
      ],
      referTitle: "Invite Your Friends & Unlock Unlimited Learning",
      referSubtitle: "Share the knowledge! Enjoy unlimited access to all SimpliLEAD courses—enroll in as many as you want, 100% free.",
      referButton: "Invite Now",
      webinarsTitle: "Upcoming Live Webinars",
      webinarsSubtitle: "Join our expert-led sessions to gain real-world insights.",
      webinars: [
        { title: "Agile Leadership Bootcamp: Leading in the AI Era", date: "Jun 13, 2026", time: "06:30 pm - 07:30 pm (IST)", instructor: "Raquel Silva", duration: "60 minutes" },
        { title: "Become a Certified SAFe® Agilist — and Lead with Confidence", date: "Jun 16, 2026", time: "09:00 AM - 10:00 am (IST)", instructor: "Keith Erik Wilson", duration: "60 minutes" },
        { title: "AI for Scrum Developers: Tools & Real-World Use Cases", date: "Jun 23, 2026", time: "06:30 pm - 07:30 pm (IST)", instructor: "Axel Berle", duration: "60 minutes" },
      ],
      faqTitle: "Frequently Asked Questions",
      faqSubtitle: "Everything you need to know about our free courses.",
      faqs: [
        { q: "What are the requirements to enroll in a free course?", a: "There are no special requirements. Anyone can enroll and start learning instantly without any prerequisites." },
        { q: "Do I need to create an account to access free courses?", a: "Yes, you need to create a free account to track your progress and access the course materials." },
        { q: "How do I sign up for a free course?", a: "Simply click on 'Enroll Now' on any of the course cards, create an account, and you will get instant access." },
        { q: "Will I get a certificate upon completion?", a: "Yes, all our free courses come with a verifiable Completion Certificate that you can share on your LinkedIn profile." },
      ],
    },
  },

  "practice-tests": {
    label: "Practice Tests",
    group: "Marketing Pages",
    content: {
      metaTitle: "Free Online Practice Tests",
      metaDescription: "Free, up-to-date IT practice tests to help you learn faster, spot weak areas, and pass your certification exams with confidence.",
      heroBadge: "Free Practice Tests",
      heroHeading: "Master Your",
      heroHighlight: "Certifications",
      heroSubtitle: "Free, up-to-date IT practice tests to help you learn faster, spot weak areas, and pass with confidence.",
      heroBullets: [
        "Boost Your Confidence with Practice Test",
        "Expert-Curated Content for Reliable Learning",
        "Detailed Explanations for Better Understanding",
        "Immediate Result after Test",
        "Comprehensive Question Bank explanation for Preparation",
      ],
      heroCtaText: "Get Started Now",
      features: [
        { icon: "play", title: "Focused Learning Journey", desc: "Tailored paths to help you concentrate on what truly matters for your exam." },
        { icon: "award", title: "Boost Exam Confidence", desc: "Practice regularly to reduce anxiety and feel ready for the real certification test." },
        { icon: "clock", title: "Study Anytime", desc: "Access tests online, 24/7, from any device. Fit studying into your busy schedule seamlessly." },
        { icon: "book", title: "Self-Paced Learning", desc: "Learn at your own speed, anytime, anywhere. Review explanations to deepen your understanding." },
      ],
      testsTitle: "Choose Your Practice Test",
      testsSubtitle: "Simulate the real exam environment with our expert-crafted tests. Get detailed explanations for every question.",
      // FIX-02: fabricated "users" counts removed; the card hides the chip when unset.
      tests: [
        { title: "Certified Scrum Master (CSM) Practice Test", slug: "csm", tests: 3, isRequest: false },
        { title: "Leading SAFe Practice Test | SAFe Agilist Mock Test", slug: "leading-safe", tests: 4, isRequest: false },
        { title: "ITIL Practice Test: Ace Your Certification", slug: "itil", tests: 5, isRequest: false },
        { title: "PMP Practice Test | Project Management Mock Test", slug: "pmp", tests: 38, isRequest: false },
        { title: "Free SAFe® Scrum Master (SSM) Practice Test", slug: "safe-scrum-master", tests: 4, isRequest: false },
        { title: "DevOps Practice Test: Prepare Efficiently", slug: "devops", tests: 0, isRequest: true },
      ],
      reviewsTitle: "What Our Learners Say",
      reviewsSubtitle: "Real reviews from professionals who trained with SimpliLEAD.",
      // FIX-02: the default reviews were invented people; add real, permissioned
      // reviews via the admin editor. Empty => the section renders nothing.
      reviews: [],
    },
  },

  "refer-earn": {
    label: "Refer & Earn",
    group: "Marketing Pages",
    content: {
      metaTitle: "Refer & Earn",
      metaDescription: "Refer friends to SimpliLEAD and earn rewards for every successful enrollment. Up to 10% of the course value.",
      heroBadge: "SimpliLEAD Referral Program",
      heroLine1: "Refer More.",
      heroHighlight: "Earn More.",
      heroLine3: "Repeat.",
      heroSubtitle: "Empower your network to upskill and achieve their career goals. For every successful enrollment through your referral, you earn exciting rewards. It's a win-win for everyone!",
      rewardTiersTitle: "Reward Tiers",
      rewardTiers: [
        { range: "Up to ₹ 1 Lakh", reward: "5% Reward" },
        { range: "₹ 1 Lakh - ₹ 3 Lakhs", reward: "7.5% Reward" },
        { range: "Above ₹ 3 Lakhs", reward: "10% Reward" },
      ],
      formTitle: "Start Earning Today",
      formSubtitle: "Generate your unique referral link to share with your friends.",
      howTitle: "How It Works in 3 Simple Steps",
      steps: [
        { icon: "share", title: "Share Your Link", desc: "Spread the word by sharing your unique referral link with your friends, colleagues, or social network." },
        { icon: "users", title: "Friends Enroll", desc: "Your network signs up for our industry-leading certification courses using your link and gets a special discount." },
        { icon: "trending", title: "Earn Rewards", desc: "Once their enrollment is confirmed, you receive your reward—up to 10% of the course value!" },
      ],
      benefitsTitle: "Course-Wise Earnings",
      benefitsSubtitle: "Here's a breakdown of what you could earn by referring popular courses.",
      benefitsRows: [
        { category: "Agile & Scrum", programs: "CSM, CSPO, Leading SAFe", reward: "Up to $50" },
        { category: "Project Management", programs: "PMP, PRINCE2, CAPM", reward: "Up to $75" },
        { category: "Data Science & AI", programs: "Data Science Bootcamp, AI Engineer", reward: "Up to $150" },
        { category: "Cloud Computing", programs: "AWS Architect, Azure Devops", reward: "Up to $100" },
      ],
      benefitsNote: "*Rewards vary based on the user's location and the final purchased price of the course.",
      faqTitle: "Frequently Asked Questions",
      faqSubtitle: "Everything you need to know about the SimpliLEAD Referral Program.",
      faqs: [
        { question: "How does the Refer and Earn program work?", answer: "It's simple! Generate your unique referral link using the form above. Share it with your friends, colleagues, or network. When they enroll in a SimpliLEAD course using your link, they get a discount, and you earn a reward once their enrollment is confirmed." },
        { question: "Is there a limit to how many people I can refer?", answer: "No, there is absolutely no limit! The more people you refer, the more you can earn. Our top referrers earn significant rewards every month." },
        { question: "When do I get my reward?", answer: "Rewards are processed 30 days after your referral successfully starts their course. This ensures there are no cancellations or refunds during the standard guarantee period." },
        { question: "What courses are eligible for referral rewards?", answer: "Almost all our certification training programs are eligible. However, the exact reward amount varies depending on the course tier. Please check the 'Course-Wise Benefits' table for specific details." },
        { question: "How will I receive my reward?", answer: "Rewards are typically sent as Amazon Gift Cards or direct bank transfers, depending on your region and preference. Our support team will contact you to confirm your preferred payout method." },
      ],
      ctaTitle: "Ready to start earning?",
      ctaSubtitle: "Join hundreds of SimpliLEAD alumni and partners who are earning great rewards by helping others advance their careers.",
      ctaButton: "Get My Referral Link",
    },
  },

  "about": {
    label: "About Us",
    group: "Marketing Pages",
    content: {
      metaTitle: "About Us",
      metaDescription: "SimpliLEAD is a global learning and certification partner enabling professionals and organizations to LEAD — Learn, Enhance, Adapt, and Deliver.",
      heroBadge: "Learn · Enhance · Adapt · Deliver",
      heroHeading: "Beyond conventional training —",
      heroHeadingHighlight: "outcome-driven learning experiences.",
      heroSubtitle: "SimpliLEAD is a global learning and certification partner committed to enabling professionals and organizations to LEAD — Learn, Enhance, Adapt, and Deliver in a rapidly evolving digital world.",
      stats: [
        { value: "Practitioner-led", label: "Real-world experience" },
        { value: "Outcome-focused", label: "Measurable impact" },
        { value: "Globally aligned", label: "Industry standards" },
        { value: "Locally relevant", label: "Middle East context" },
      ],
      missionTitle: "Who We Are",
      missionBody1: "We go beyond conventional training by designing outcome-driven learning experiences that bridge the gap between knowledge and real-world execution.",
      missionBody2: "Our programs are crafted and delivered by industry practitioners, certified experts, and transformation leaders, ensuring that every learning intervention translates into measurable performance impact.",
      missionPoints: [
        { icon: "target", title: "Outcome-focused", desc: "Every learning intervention translates into measurable performance impact." },
        { icon: "globe", title: "Globally aligned, locally relevant", desc: "Industry standards delivered with Middle East context." },
      ],
      storyImage: "/images/vendor/unsplash/photo-1522071820081-009f0129c71c.jpg",
      storyImageAlt: "SimpliLEAD learning experience",
      storyCardTitle: "Trusted by Teams",
      storyCardText: "Enabling professionals and organizations across the globe.",
      leadTitle: "How we transform learners into practitioners",
      leadSteps: [
        { letter: "L", title: "Learn", body: "Industry-recognized programs aligned with evolving standards, frameworks and global best practices — delivered by certified practitioners." },
        { letter: "E", title: "Enhance", body: "Tailored capability-building programs that translate knowledge into deepened expertise and behavioral change." },
        { letter: "A", title: "Adapt", body: "Contextual problem-solving applied to your business environment, culture and market realities." },
        { letter: "D", title: "Deliver", body: "Measurable performance impact — learners become confident practitioners who execute and lead." },
      ],
      valuesTitle: "What We Offer",
      valuesSubtitle: "A complete learning ecosystem — from individual career growth to enterprise-wide transformation, we deliver the right format for every need.",
      values: [
        { icon: "trophy", title: "Global Certification Training", body: "Industry-recognized programs aligned with evolving standards, frameworks, and global best practices." },
        { icon: "building", title: "Corporate Learning & Transformation", body: "Customized capability-building programs tailored to specific business outcomes, enabling organizations to drive transformation at scale." },
        { icon: "globe", title: "Instructor-Led & Self-Paced Learning", body: "Flexible learning formats designed for modern professionals and distributed teams, ensuring accessibility without compromising depth." },
        { icon: "target", title: "Personalized Learning Roadmaps", body: "Structured, role-based learning pathways tailored to individual career goals — with mentorship and progress tracking." },
      ],
      individualsBadge: "For Individuals",
      individualsTitle: "Personalized Learning Roadmaps",
      individualsBody: "We go beyond one-size-fits-all training by offering structured, role-based learning pathways tailored to individual career goals.",
      ctaTitle: "Ready to start your learning journey?",
      ctaSubtitle: "Join professionals across the globe and take the next big step in your career.",
      ctaPrimaryText: "Explore Courses",
      ctaPrimaryLink: "/courses",
      ctaSecondaryText: "Enterprise Solutions",
      ctaSecondaryLink: "/corporate-training",
    },
  },

  "corporate-training": {
    label: "Corporate Training",
    group: "Marketing Pages",
    content: {
      metaTitle: "Corporate Training and Development Programs",
      metaDescription: "Corporate courses customized to training needs. Hands-on training sessions help trainees implement learning to projects.",
      heroBadge: "Corporate Training Solutions",
      heroHeading: "Drive Business Outcomes with",
      heroHeadingMid: "Customized",
      heroHeadingHighlight: "Corporate Training",
      heroSubtitle: "Upskill your workforce with hands-on, expert-led training programs tailored to your organization's specific goals. We offer individual and group training to help teams implement learning directly into high-impact projects.",
      // FIX-02: no invented headcounts — add real, verifiable stats via the
      // admin editor when available (see lib/verified-stats.ts for the policy).
      stats: [],
      trustedLabel: "Trusted by industry leaders",
      trustedLogos: [
        "/images/vendor/wikimedia/Amazon_logo.svg",
        "/images/vendor/wikimedia/Google_2015_logo.svg",
        "/images/vendor/wikimedia/Microsoft_logo.svg",
        "/images/vendor/wikimedia/Cisco_logo_blue_2016.svg",
        "/images/vendor/wikimedia/IBM_logo.svg",
      ],
      formTitle: "Talk to our Learning Experts",
      formSubtitle: "Fill out the form below and we'll get back to you with a customized proposal.",
      domainsTitle: "High-Impact Enterprise Skill Domains",
      domainsSubtitle: "Explore comprehensive training across 25+ cutting-edge technology and management domains to build a future-ready workforce.",
      domains: [
        { icon: "search", color: "text-blue-500", title: "Agile Management", courses: "20+ Courses" },
        { icon: "chart", color: "text-green-500", title: "Project Management", courses: "15+ Courses" },
        { icon: "cpu", color: "text-purple-500", title: "Artificial Intelligence", courses: "12+ Courses" },
        { icon: "cloud", color: "text-sky-500", title: "Cloud Computing", courses: "25+ Courses" },
        { icon: "code", color: "text-orange-500", title: "Web Development", courses: "30+ Courses" },
        { icon: "linechart", color: "text-pink-500", title: "Data Science", courses: "18+ Courses" },
        { icon: "shield", color: "text-red-500", title: "Cyber Security", courses: "10+ Courses" },
        { icon: "server", color: "text-indigo-500", title: "DevOps", courses: "14+ Courses" },
        { icon: "layout", color: "text-teal-500", title: "IT Service Management", courses: "8+ Courses" },
      ],
      advantageEyebrow: "The SimpliLEAD Advantage",
      advantageTitle: "Immersive Learning Model for Maximum ROI",
      advantageSubtitle: "Our proven 5-step framework ensures that training translates directly into measurable business performance and sustained skill retention.",
      steps: [
        { num: "01", title: "Assess", desc: "Identify skill gaps and map learning objectives to business goals." },
        { num: "02", title: "Design", desc: "Customize curriculum and labs using real-world enterprise scenarios." },
        { num: "03", title: "Deliver", desc: "Engaging, instructor-led live sessions or blended learning tracks." },
        { num: "04", title: "Reinforce", desc: "Post-training access to sandboxes, mentors, and ongoing resources." },
        { num: "05", title: "Measure", desc: "Track progress with detailed analytics and ROI reporting." },
      ],
    },
  },

  "resources": {
    label: "Resources & Blogs",
    group: "Marketing Pages",
    content: {
      metaTitle: "Learning Resources & Blogs",
      metaDescription: "Explore our collection of articles, whitepapers, and guides on Agile, Scrum, DevOps, and more. Stay ahead with expert insights.",
      heroBadge: "Insights & Guides",
      heroHeading: "Learning Resources",
      heroHighlight: "& Blogs",
      heroSubtitle: "Explore our extensive collection of articles, whitepapers, and guides. Stay ahead of the curve with expert insights.",
      heroBullets: [
        "In-Depth Articles from Industry Experts",
        "Certification Preparation Guides",
        "Latest Trends in IT & Agile",
        "Downloadable Whitepapers and E-Books",
      ],
      heroCtaText: "Browse Articles",
      listTitle: "Latest Articles",
      listSubtitle: "Read the newest insights from our instructors and community leaders.",
      articles: [
        { title: "The Ultimate Guide to SAFe 6.0 Certification", category: "Agile", date: "Sep 28, 2024", readTime: "8 min read", desc: "Everything you need to know about the latest SAFe update and how to prepare for your certification exam." },
        { title: "5 Common Mistakes Scrum Masters Make", category: "Scrum", date: "Sep 20, 2024", readTime: "5 min read", desc: "Avoid these common pitfalls to become a more effective servant-leader for your development team." },
        { title: "Transitioning to a DevOps Culture", category: "DevOps", date: "Sep 12, 2024", readTime: "12 min read", desc: "A step-by-step framework for transforming your organization's engineering culture and CI/CD pipelines." },
        { title: "PMP vs. PRINCE2: Which is Right for You?", category: "Project Management", date: "Sep 05, 2024", readTime: "6 min read", desc: "A detailed comparison of the two most popular project management certifications to help you decide." },
      ],
    },
  },

  "webinars": {
    label: "Webinars",
    group: "Marketing Pages",
    content: {
      metaTitle: "Live Webinars",
      metaDescription: "Join our exclusive live webinars led by industry experts. Learn new skills, get your questions answered, and stay up-to-date with the latest trends.",
      heroBadge: "Live Events & Masterclasses",
      heroHeading: "Exclusive Live",
      heroHighlight: "Webinars",
      heroSubtitle: "Join industry experts for deep dives into Agile, Scrum, DevOps, and Product Management. No cost, just learning!",
      heroBullets: [
        "Interactive Q&A Sessions with Experts",
        "Real-World Case Studies and Examples",
        "Earn SEUs/PDUs for Attending",
        "Access to Recordings After the Event",
      ],
      heroCtaText: "View Schedule",
      listTitle: "Upcoming Schedule",
      listSubtitle: "Reserve your spot in our upcoming expert-led webinars.",
      webinars: [
        { title: "Mastering Agile at Scale with SAFe 6.0", speaker: "Sarah Jenkins, Agile Coach", date: "Oct 15, 2024", time: "10:00 AM EST", tags: ["Agile", "SAFe"] },
        { title: "Demystifying DevOps: A Practical Guide", speaker: "Alex Rivera, DevOps Engineer", date: "Oct 22, 2024", time: "2:00 PM EST", tags: ["DevOps", "CI/CD"] },
        { title: "Product Management in the AI Era", speaker: "Michael Chen, Product Leader", date: "Oct 29, 2024", time: "11:00 AM EST", tags: ["Product", "AI"] },
        { title: "Scrum Master Masterclass: Navigating Complexities", speaker: "Emily Davis, Enterprise Agile Coach", date: "Nov 5, 2024", time: "9:00 AM EST", tags: ["Scrum", "Leadership"] },
      ],
    },
  },

  "self-paced": {
    label: "Self-Paced Training",
    group: "Marketing Pages",
    content: {
      metaTitle: "Self-Paced Online Training Courses",
      metaDescription: "Learn at your own pace with our comprehensive self-paced online courses. Gain globally recognized certifications from SimpliLEAD.",
      heroBadge: "100% Online & Self-Paced",
      heroHeading: "Master New Skills at",
      heroHeadingHighlight: "Your Own Pace.",
      heroSubtitle: "Advance your career without putting your life on hold. Access globally accredited certification courses and learn whenever and wherever it suits you.",
      heroCtaText: "Explore Self-Paced Courses",
      trustedLabel: "Trusted by professionals at top global organizations",
      whyTitle: "Why Choose Self-Paced Learning?",
      whySubtitle: "Our self-paced format provides the ultimate flexibility, allowing you to absorb complex concepts at a speed that works for your individual learning style.",
      features: [
        { icon: "clock", title: "Learn on Your Schedule", description: "Access high-quality course material anytime, anywhere. Perfect for busy professionals balancing work and upskilling." },
        { icon: "globe", title: "Global Recognition", description: "Earn certifications that are recognized and respected by top organizations worldwide." },
        { icon: "laptop", title: "Interactive Platform", description: "Engage with immersive learning modules, quizzes, and practical case studies right from your browser." },
        { icon: "check", title: "Lifetime Access", description: "Return to your course materials anytime to refresh your knowledge. Your learning resources never expire." },
        { icon: "trophy", title: "Expert-Curated Content", description: "Learn from comprehensive curriculums designed by industry veterans and accredited bodies." },
        { icon: "shield", title: "Money-Back Guarantee", description: "Not satisfied? We offer a hassle-free money-back guarantee so you can learn with peace of mind." },
      ],
      browseTitle: "Browse Self-Paced Programs",
      browseSubtitle: "Choose from our comprehensive catalog of industry-recognized certifications and start your learning journey today.",
    },
  },

  "tech-business-management": enterprise({
    category: "Product Building",
    title: "Technology Business Management",
    subtitle: "Run Technology Like a Business",
    description:
      "Bring transparency and discipline to technology spend. We help you adopt Technology Business Management (TBM) to align IT investment with business value and make confident, data-driven decisions.",
    metaTitle: "Technology Business Management",
    metaDescription:
      "Adopt Technology Business Management (TBM) to align IT spend with business value and drive data-driven decisions.",
    benefits: [
      { icon: "chart", title: "Cost Transparency", description: "Gain a clear, shared view of technology costs and their drivers." },
      { icon: "target", title: "Value Alignment", description: "Tie technology investment directly to business outcomes." },
      { icon: "briefcase", title: "Smarter Budgeting", description: "Plan and prioritize spend with a defensible, data-backed model." },
      { icon: "trending", title: "Optimized Spend", description: "Identify savings and reinvest in higher-value initiatives." },
      { icon: "users", title: "Business-IT Trust", description: "Build a common language between finance, business, and IT." },
      { icon: "shield", title: "Confident Governance", description: "Govern technology investment with clear accountability." },
    ],
    approach: [
      { title: "Model Costs", description: "Build a TBM cost model that maps spend to services and value." },
      { title: "Create Transparency", description: "Give leaders clear, comparable views of technology cost and value." },
      { title: "Optimize Investment", description: "Identify and act on opportunities to optimize and reallocate spend." },
      { title: "Run & Improve", description: "Operationalize TBM and continuously refine the model." },
    ],
  }),
};
