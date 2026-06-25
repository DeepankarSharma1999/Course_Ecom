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
    metaTitle: "Business Agility Transformation | ULearnSystems",
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
    metaTitle: "SAFe Implementation | ULearnSystems Enterprise",
    metaDescription:
      "Scale Agile across your enterprise with expert SAFe Implementation services from ULearnSystems.",
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
    metaTitle: "Lean Portfolio Management | ULearnSystems",
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
    metaTitle: "Value Stream Management | ULearnSystems",
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
    metaTitle: "Design Thinking Workshops | ULearnSystems",
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
    metaTitle: "Product Coaching | ULearnSystems",
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
    metaTitle: "Project to Product | ULearnSystems",
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
        { name: "Free Courses", href: "/free-courses" },
        { name: "Blogs", href: "/resources" },
        { name: "Tutorials", href: "/tutorials" },
        { name: "Practice Tests", href: "/practice-tests" },
        { name: "Interview Questions", href: "/interview-questions" },
        { name: "Events", href: "/events" },
        { name: "Scrum Master Certification Guide", href: "/scrum-master-certification-guide" },
        { name: "Course Info", href: "/course-info" },
      ],
    },
  },

  "free-course": {
    label: "Free Courses",
    group: "Marketing Pages",
    content: {
      metaTitle: "Free Courses | ULearnSystems",
      metaDescription: "Level Up Your Career with Free Online Courses from ULearnSystems. Explore handpicked, high-impact courses designed for professionals and beginners alike.",
      heroBadge: "10K+ Reviews from Learners Worldwide",
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
      practiceTests: [
        { title: "Certified Scrum Master (CSM) Practice Test", slug: "csm", tests: 3, hours: 3, questions: 150, marks: 150, users: "73k+" },
        { title: "Leading SAFe Practice Test | SAFe Agilist Mock Test", slug: "leading-safe", tests: 4, hours: 6, questions: 180, marks: 180, users: "9K+" },
        { title: "ITIL Practice Test: Ace Your Certification", slug: "itil", tests: 5, hours: 5, questions: 200, marks: 200, users: "5K+" },
        { title: "DevOps Practice Test: Prepare Efficiently", slug: "devops", tests: 3, hours: 4, questions: 120, marks: 120, users: "3K+" },
      ],
      referTitle: "Invite Your Friends & Unlock Unlimited Learning",
      referSubtitle: "Share the knowledge! Enjoy unlimited access to all ULearnSystems courses—enroll in as many as you want, 100% free.",
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
      metaTitle: "Free Online Practice Tests | ULearnSystems",
      metaDescription: "Free, up-to-date IT practice tests to help you learn faster, spot weak areas, and pass your certification exams with confidence.",
      heroBadge: "Rated 4.9/5 by Professionals",
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
      tests: [
        { title: "Certified Scrum Master (CSM) Practice Test", slug: "csm", tests: 3, users: "73k+", isRequest: false },
        { title: "Leading SAFe Practice Test | SAFe Agilist Mock Test", slug: "leading-safe", tests: 4, users: "9K+", isRequest: false },
        { title: "ITIL Practice Test: Ace Your Certification", slug: "itil", tests: 5, users: "5K+", isRequest: false },
        { title: "PMP Practice Test | Project Management Mock Test", slug: "pmp", tests: 38, users: "30K+", isRequest: false },
        { title: "Free SAFe® Scrum Master (SSM) Practice Test", slug: "safe-scrum-master", tests: 4, users: "8K+", isRequest: false },
        { title: "DevOps Practice Test: Prepare Efficiently", slug: "devops", tests: 0, users: "3K+", isRequest: true },
      ],
      reviewsTitle: "What Our Learners Say",
      reviewsSubtitle: "Join thousands of professionals who have advanced their careers with ULearnSystems.",
      reviews: [
        { name: "Daniel Harper", role: "Product Manager", company: "ULearnSystems", text: "Outstanding training from ULearnSystems! The curriculum on multi-agent architectures and RAG pipeline development was thorough and current. Real-world use cases across industries gave me the confidence to lead AI initiatives at my organization immediately." },
        { name: "Sarah Mitchell", role: "Cloud AI Architect", company: "ULearnSystems", text: "I enrolled in this course to upskill as a software architect, and ULearnSystems exceeded my expectations. The MCP server integration labs and API demos were practical and industry-relevant. The trainer's mentorship made complex concepts easy to grasp." },
        { name: "Arjun Krishnamurthy", role: "AI/ML Engineer", company: "ULearnSystems", text: "ULearnSystems delivered exceptional value through this Agentic AI Engineering course. Building autonomous agents with the SDK, integrating MCP servers, and deploying on cloud platforms gave me skills that no other training provided." },
      ],
    },
  },

  "refer-earn": {
    label: "Refer & Earn",
    group: "Marketing Pages",
    content: {
      metaTitle: "Refer & Earn | ULearnSystems",
      metaDescription: "Refer friends to ULearnSystems and earn rewards for every successful enrollment. Up to 10% of the course value.",
      heroBadge: "ULearnSystems Referral Program",
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
      faqSubtitle: "Everything you need to know about the ULearnSystems Referral Program.",
      faqs: [
        { question: "How does the Refer and Earn program work?", answer: "It's simple! Generate your unique referral link using the form above. Share it with your friends, colleagues, or network. When they enroll in a Ulearnsystems course using your link, they get a discount, and you earn a reward once their enrollment is confirmed." },
        { question: "Is there a limit to how many people I can refer?", answer: "No, there is absolutely no limit! The more people you refer, the more you can earn. Our top referrers earn significant rewards every month." },
        { question: "When do I get my reward?", answer: "Rewards are processed 30 days after your referral successfully starts their course. This ensures there are no cancellations or refunds during the standard guarantee period." },
        { question: "What courses are eligible for referral rewards?", answer: "Almost all our certification training programs are eligible. However, the exact reward amount varies depending on the course tier. Please check the 'Course-Wise Benefits' table for specific details." },
        { question: "How will I receive my reward?", answer: "Rewards are typically sent as Amazon Gift Cards or direct bank transfers, depending on your region and preference. Our support team will contact you to confirm your preferred payout method." },
      ],
      ctaTitle: "Ready to start earning?",
      ctaSubtitle: "Join hundreds of ULearnSystems alumni and partners who are earning great rewards by helping others advance their careers.",
      ctaButton: "Get My Referral Link",
    },
  },

  "about": {
    label: "About Us",
    group: "Marketing Pages",
    content: {
      metaTitle: "About Us | ULearnSystems",
      metaDescription: "ULearnSystems is a globally recognized leader in professional certification and corporate training, dedicated to bridging the global skills gap.",
      heroBadge: "Transforming Enterprise Learning",
      heroHeading: "Empowering the Future of",
      heroHeadingHighlight: "Agile & Tech",
      heroSubtitle: "ULearnSystems is a globally recognized leader in professional certification and corporate training, dedicated to bridging the global skills gap.",
      stats: [
        { value: "100k+", label: "Global Learners" },
        { value: "500+", label: "Corporate Partners" },
        { value: "250+", label: "Expert Instructors" },
        { value: "45+", label: "Countries Served" },
      ],
      missionTitle: "Our Mission",
      missionBody1: "Founded with the vision to democratize elite enterprise training, ULearnSystems has grown into a premier destination for professionals seeking to upskill in Agile, Scrum, Project Management, and Cloud computing.",
      missionBody2: "We believe that continuous learning is the cornerstone of organizational agility and individual career growth. Our curriculum is constantly evolving, built by industry practitioners for the real-world challenges of tomorrow.",
      missionPoints: [
        { icon: "target", title: "Outcome Driven", desc: "Focus on practical skills and exam success." },
        { icon: "trophy", title: "Global Accreditations", desc: "Partners with Scrum Alliance, PMI, and SAFe." },
      ],
      storyImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
      storyImageAlt: "ULearnSystems team collaborating",
      storyCardTitle: "Trusted by Teams",
      storyCardText: "Empowering Fortune 500 companies globally.",
      valuesTitle: "Why Choose ULearnSystems?",
      valuesSubtitle: "We stand apart through our commitment to instructional excellence, enterprise-grade curriculum, and unparalleled post-training support.",
      values: [
        { icon: "users", title: "Elite Instructors", body: "Our trainers are not just certified; they are active industry practitioners with decades of hands-on experience in leading enterprise agile transformations." },
        { icon: "globe", title: "Flexible Delivery", body: "Whether you prefer Live Virtual Classrooms, in-person Bootcamps, or Self-Paced learning, we offer modalities that fit your schedule and learning style." },
        { icon: "check", title: "Continuous Mentorship", body: "We provide extensive exam prep materials, post-training mentorship, and access to an exclusive alumni network to ensure your long-term success." },
      ],
      ctaTitle: "Ready to start your learning journey?",
      ctaSubtitle: "Join our community of over 100,000 professionals and take the next big step in your career.",
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
      metaTitle: "Corporate Training and Development Programs | ULearnSystems",
      metaDescription: "Corporate courses customized to training needs. Hands-on training sessions help trainees implement learning to projects.",
      heroBadge: "Corporate Training Solutions",
      heroHeading: "Drive Business Outcomes with",
      heroHeadingMid: "Customized",
      heroHeadingHighlight: "Corporate Training",
      heroSubtitle: "Upskill your workforce with hands-on, expert-led training programs tailored to your organization's specific goals. We offer individual and group training to help teams implement learning directly into high-impact projects.",
      stats: [
        { icon: "users", value: "300,000+", label: "Professionals Trained" },
        { icon: "building", value: "500+", label: "Enterprise Clients" },
      ],
      trustedLabel: "Trusted by industry leaders",
      trustedLogos: [
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg",
        "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
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
      advantageEyebrow: "The ULearnSystems Advantage",
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
      metaTitle: "Learning Resources & Blogs | ULearnSystems",
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
      metaTitle: "Live Webinars | ULearnSystems",
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
      metaDescription: "Learn at your own pace with our comprehensive self-paced online courses. Gain globally recognized certifications from Ulearnsystems.",
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
    metaTitle: "Technology Business Management | ULearnSystems",
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
