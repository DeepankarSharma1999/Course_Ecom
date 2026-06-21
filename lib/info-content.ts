export type InfoContentSection = {
  heading: string;
  body: string;
};

export type InfoPageContent = {
  title: string;
  description: string;
  keywords: string;
  sections: InfoContentSection[];
};

export const INFO_PAGES: Record<string, InfoPageContent> = {
  "contact-us": {
    title: "Contact ULearnSystems | Enterprise Training Inquiries",
    description: "Get in touch with ULearnSystems for Agile, Scrum, PMP, and Corporate Training inquiries. We offer 24/7 global support.",
    keywords: "contact us, customer support, enterprise sales, Agile training inquiry, PMP course contact",
    sections: [
      {
        heading: "We Are Here to Help",
        body: "Whether you have a question about our Live Virtual schedules, require a tailored Corporate Training quote, or need support with your LMS access, our global support team is available 24/7.",
      },
      {
        heading: "Enterprise Sales",
        body: "For customized Agile Transformation and Corporate Training solutions, please contact our enterprise sales team directly at enterprise@ulearnsystems.com. We typically respond within 2 hours.",
      },
      {
        heading: "Global Offices",
        body: "We have physical presence in the US, UK, India, and Singapore. Reach out to your regional office via the numbers listed in our footer for immediate assistance.",
      },
      {
        heading: "Continuous Learning & Support",
        body: "We believe that learning doesn't stop once the certification is achieved. ULearnSystems provides ongoing mentorship, comprehensive post-training support, and access to an exclusive alumni network to help you continuously grow and navigate your professional journey with confidence."
      }
    ]
  },
  "careers": {
    title: "Careers at ULearnSystems | Join Our Enterprise Training Team",
    description: "Explore career opportunities at ULearnSystems. Join a global leader in Agile, Scrum, PMP, and Corporate Training solutions.",
    keywords: "careers, jobs, hiring, Agile jobs, Scrum Master jobs, Corporate Training careers, Enterprise Training opportunities",
    sections: [
      {
        heading: "Shape the Future of Enterprise Learning",
        body: "At ULearnSystems, we are pioneering the future of global education and enterprise transformation. Our mission is to deliver world-class training in Agile, Scrum, PMP, and cutting-edge technology domains. We are looking for passionate, driven individuals to join our rapidly growing team.",
      },
      {
        heading: "Why Work With Us?",
        body: "We offer a dynamic, inclusive work environment where innovation is celebrated. Whether you're an experienced Scrum Master, a seasoned PMP certified project manager, or an expert in Corporate Training delivery, we provide the platform to scale your impact globally.",
      },
      {
        heading: "Current Openings",
        body: "We are actively hiring Agile Coaches, Full Stack Developers, Marketing Specialists, and Corporate Sales Executives. If you are ready to make a difference in the professional certification landscape, send your resume to careers@ulearnsystems.com.",
      },
      {
        heading: "Continuous Learning & Support",
        body: "We believe that learning doesn't stop once the certification is achieved. ULearnSystems provides ongoing mentorship, comprehensive post-training support, and access to an exclusive alumni network to help you continuously grow and navigate your professional journey with confidence."
      }
    ]
  },
  "accreditation": {
    title: "Global Accreditations & Partnerships | ULearnSystems",
    description: "ULearnSystems is a globally accredited training provider for Agile, Scrum, PMP, SAFe, and ITIL certifications. Partnering with top global institutions.",
    keywords: "Accreditation, Accredited Training Provider, Scrum Alliance, PMI ATP, SAFe Platinum Partner, ITIL certification provider",
    sections: [
      {
        heading: "Our Commitment to Quality",
        body: "ULearnSystems maintains the highest standards of educational excellence. Our training programs are rigorously vetted and accredited by the world's leading certification bodies, ensuring that your enterprise training yields internationally recognized credentials.",
      },
      {
        heading: "Global Partnerships",
        body: "We are proud to be a Premier Authorized Training Partner (ATP) of the Project Management Institute (PMI)®, a Licensed Training Partner (LTP) of Scrum Alliance®, and a Platinum SPCT Partner of Scaled Agile, Inc.® These partnerships validate our expertise in delivering elite PMP, CSM, CSPO, and SAFe certifications.",
      },
      {
        heading: "Enterprise Trust",
        body: "Fortune 500 companies trust our accredited curriculum to upskill their workforce. Our strict adherence to global compliance and continuous curriculum updates make us the preferred partner for corporate agile transformations.",
      },
      {
        heading: "Continuous Learning & Support",
        body: "We believe that learning doesn't stop once the certification is achieved. ULearnSystems provides ongoing mentorship, comprehensive post-training support, and access to an exclusive alumni network to help you continuously grow and navigate your professional journey with confidence."
      }
    ]
  },
  "customer-speak": {
    title: "Customer Speak | Reviews & Testimonials for ULearnSystems",
    description: "Read what our learners and enterprise clients have to say about our Agile, Scrum, PMP, and Corporate Training programs.",
    keywords: "reviews, testimonials, student reviews, corporate training feedback, CSM reviews, PMP reviews",
    sections: [
      {
        heading: "Transforming Careers Globally",
        body: "Our alumni network spans over 150 countries. From aspiring Scrum Masters to seasoned Project Management Professionals (PMP), our learners consistently rate our certification courses as career-defining experiences.",
      },
      {
        heading: "Enterprise Success Stories",
        body: "We have partnered with leading tech giants to drive agile transformations. Our customized Corporate Training solutions have enabled cross-functional teams to achieve up to a 40% increase in delivery speed and operational efficiency.",
      },
      {
        heading: "Verified Ratings",
        body: "With a 4.8/5 average rating across Google, SwitchUp, and LinkedIn, our commitment to top-tier instructional design and expert-led live virtual classrooms is unparalleled in the industry.",
      },
      {
        heading: "Continuous Learning & Support",
        body: "We believe that learning doesn't stop once the certification is achieved. ULearnSystems provides ongoing mentorship, comprehensive post-training support, and access to an exclusive alumni network to help you continuously grow and navigate your professional journey with confidence."
      }
    ]
  },
  "grievance-redressal": {
    title: "Grievance Redressal Mechanism | ULearnSystems",
    description: "ULearnSystems is committed to transparent and prompt resolution of customer grievances regarding our training programs.",
    keywords: "grievance redressal, customer support, complaints, dispute resolution, corporate training support",
    sections: [
      {
        heading: "Our Resolution Commitment",
        body: "We strive to provide flawless learning experiences in all our Agile, Scrum, and PMP certification programs. However, if our services fall short of your expectations, our dedicated Grievance Redressal team is here to ensure swift resolution.",
      },
      {
        heading: "How to Raise a Concern",
        body: "Learners and Corporate Training clients can escalate their concerns by emailing grievances@ulearnsystems.com. Please include your course details, enrollment ID, and a detailed description of the issue.",
      },
      {
        heading: "Resolution Timeline",
        body: "All grievances are acknowledged within 24 hours. Our standard resolution time for administrative and training delivery issues is 3-5 business days. We prioritize learner satisfaction above all else.",
      },
      {
        heading: "Continuous Learning & Support",
        body: "We believe that learning doesn't stop once the certification is achieved. ULearnSystems provides ongoing mentorship, comprehensive post-training support, and access to an exclusive alumni network to help you continuously grow and navigate your professional journey with confidence."
      }
    ]
  },
  "live-virtual-online": {
    title: "Live Virtual (Online) Training | Interactive Certification Courses",
    description: "Experience premium Live Virtual Classrooms for Agile, Scrum, PMP, and SAFe certifications with expert instructors.",
    keywords: "Live Virtual Training, Online Certification, LVC, Online Scrum Training, Virtual PMP Course, interactive online learning",
    sections: [
      {
        heading: "The Classroom Experience, Delivered Anywhere",
        body: "Our Live Virtual (Online) training model replicates the interactive dynamics of a physical classroom. Engage in real-time with elite industry experts while mastering Agile, Scrum, and Project Management from the comfort of your home or office.",
      },
      {
        heading: "Cutting-Edge Virtual Infrastructure",
        body: "We utilize advanced collaboration tools, virtual whiteboards, and breakout rooms to facilitate group exercises, ensuring that our Corporate Training and individual certification programs remain highly engaging and effective.",
      },
      {
        heading: "Global Accessibility",
        body: "With schedules across multiple time zones, our Live Virtual training empowers global teams to upskill simultaneously. Earn your CSM, CSPO, or PMP certification without the overhead of travel.",
      },
      {
        heading: "Continuous Learning & Support",
        body: "We believe that learning doesn't stop once the certification is achieved. ULearnSystems provides ongoing mentorship, comprehensive post-training support, and access to an exclusive alumni network to help you continuously grow and navigate your professional journey with confidence."
      }
    ]
  },
  "classroom": {
    title: "In-Person Classroom Training | ULearnSystems",
    description: "Intensive, in-person classroom training for Agile, Scrum, PMP, and ITIL certifications across major global cities.",
    keywords: "Classroom training, in-person certification, bootcamp, Scrum Master classroom training, PMP bootcamps",
    sections: [
      {
        heading: "Immersive Learning Environments",
        body: "Our physical classroom training sessions offer an immersive, distraction-free environment ideal for intensive learning. These bootcamps are perfect for tackling rigorous certifications like PMP, SAFe, and Agile Master programs.",
      },
      {
        heading: "Hands-on Exercises & Networking",
        body: "Classroom sessions provide unparalleled opportunities for face-to-face networking with peers and instructors. Engage in hands-on simulations that mirror real-world Agile transformations and project management scenarios.",
      },
      {
        heading: "Corporate Cohorts",
        body: "We regularly host exclusive classroom sessions for Enterprise clients. Bring our elite instructors to your premises for tailored Corporate Training that aligns with your organizational goals.",
      },
      {
        heading: "Continuous Learning & Support",
        body: "We believe that learning doesn't stop once the certification is achieved. ULearnSystems provides ongoing mentorship, comprehensive post-training support, and access to an exclusive alumni network to help you continuously grow and navigate your professional journey with confidence."
      }
    ]
  },
  "agile-services": {
    title: "Agile Consulting & Transformation Services | ULearnSystems",
    description: "Enterprise-grade Agile Consulting, coaching, and transformation services to accelerate business agility and delivery.",
    keywords: "Agile Consulting, Agile Transformation, Enterprise Agility, SAFe Implementation, Scrum Coaching, Business Agility",
    sections: [
      {
        heading: "Drive Enterprise Agility",
        body: "Beyond certification training, ULearnSystems provides comprehensive Agile Transformation services. We help organizations scale Agile frameworks, optimize value streams, and cultivate a culture of continuous improvement.",
      },
      {
        heading: "Expert Agile Coaching",
        body: "Our team of seasoned SPCTs and Agile Coaches embed themselves within your organization to mentor leadership and guide teams. We specialize in SAFe implementation, Lean Portfolio Management, and Scrum mastery.",
      },
      {
        heading: "Customized Transformation Roadmaps",
        body: "Every enterprise is unique. We conduct in-depth maturity assessments to build tailored roadmaps that align Agile practices with your specific business objectives, ensuring measurable ROI and accelerated time-to-market.",
      },
      {
        heading: "Continuous Learning & Support",
        body: "We believe that learning doesn't stop once the certification is achieved. ULearnSystems provides ongoing mentorship, comprehensive post-training support, and access to an exclusive alumni network to help you continuously grow and navigate your professional journey with confidence."
      }
    ]
  },
  "course-info": {
    title: "Comprehensive Course Information | Certification Details",
    description: "Detailed information on our vast portfolio of Agile, Scrum, PMP, and ITIL certification courses.",
    keywords: "Course catalog, certification details, training programs, Agile courses, PMP course info, IT certification paths",
    sections: [
      {
        heading: "Explore Our Extensive Portfolio",
        body: "ULearnSystems offers over 150 globally recognized certification programs. From foundational courses to advanced enterprise architecture, our catalog covers the entire spectrum of IT, Business, and Project Management domains.",
      },
      {
        heading: "Curriculum Designed for Success",
        body: "Each course is meticulously crafted by industry veterans. Our curricula focus on practical, job-ready skills, ensuring that whether you are studying for your CSM or PMP, you are fully prepared to pass your exams and excel in your career.",
      },
      {
        heading: "Always Updated",
        body: "Technology and methodologies evolve rapidly. We continuously update our course materials to align with the latest industry standards, including the newest iterations of SAFe, PMBOK, and Scrum guides.",
      },
      {
        heading: "Continuous Learning & Support",
        body: "We believe that learning doesn't stop once the certification is achieved. ULearnSystems provides ongoing mentorship, comprehensive post-training support, and access to an exclusive alumni network to help you continuously grow and navigate your professional journey with confidence."
      }
    ]
  },
  "tutorials": {
    title: "Free Learning Tutorials | Upskill with ULearnSystems",
    description: "Access high-quality, free tutorials on Agile, Scrum, Project Management, coding, and more.",
    keywords: "Free tutorials, learning resources, Agile tutorials, Scrum guide, PMP prep, coding tutorials",
    sections: [
      {
        heading: "Accelerate Your Learning",
        body: "Dive into our extensive library of free tutorials. Designed for both beginners and seasoned professionals, these guides provide quick, actionable insights into complex topics ranging from Agile methodologies to advanced programming concepts.",
      },
      {
        heading: "Step-by-Step Guidance",
        body: "Our tutorials break down intricate frameworks into digestible steps. Learn how to run an effective Sprint Retrospective, calculate Earned Value for your PMP exam, or deploy a cloud architecture.",
      },
      {
        heading: "Supplementary Course Material",
        body: "These tutorials perfectly complement our premium Live Virtual and Corporate Training programs, providing ongoing value and continuous learning opportunities for our alumni.",
      },
      {
        heading: "Continuous Learning & Support",
        body: "We believe that learning doesn't stop once the certification is achieved. ULearnSystems provides ongoing mentorship, comprehensive post-training support, and access to an exclusive alumni network to help you continuously grow and navigate your professional journey with confidence."
      }
    ]
  },
  "blogs": {
    title: "Expert Insights & Industry Blogs | ULearnSystems",
    description: "Read the latest trends, insights, and expert opinions on Agile, Project Management, Tech, and Corporate Training.",
    keywords: "Blogs, industry insights, Agile articles, Project Management trends, Tech news, Corporate Training blog",
    sections: [
      {
        heading: "Thought Leadership",
        body: "Stay ahead of the curve with the ULearnSystems blog. Our industry experts, Agile Coaches, and SPCTs regularly share deep dives into emerging trends, framework updates, and best practices in enterprise agility.",
      },
      {
        heading: "Career Advice & Exam Tips",
        body: "Navigating your career path can be challenging. We publish regular guides on how to crack the PMP exam, why you should pursue a CSM certification, and how to transition into a Scrum Master role.",
      },
      {
        heading: "Enterprise Case Studies",
        body: "Learn from real-world success stories. We frequently highlight how Fortune 500 companies have leveraged our Corporate Training and Agile Services to overcome operational bottlenecks and achieve business agility.",
      },
      {
        heading: "Continuous Learning & Support",
        body: "We believe that learning doesn't stop once the certification is achieved. ULearnSystems provides ongoing mentorship, comprehensive post-training support, and access to an exclusive alumni network to help you continuously grow and navigate your professional journey with confidence."
      }
    ]
  },
  "interview-questions": {
    title: "Top Interview Questions & Prep | Crack Your Next Job",
    description: "Comprehensive lists of interview questions and answers for Scrum Master, Project Manager, and Developer roles.",
    keywords: "Interview questions, Scrum Master interview, PMP interview, Developer interview prep, job interview tips",
    sections: [
      {
        heading: "Ace Your Next Interview",
        body: "Preparation is key to career advancement. We have compiled exhaustive lists of the most frequently asked interview questions for highly sought-after roles, including Scrum Masters, Product Owners, and Project Managers.",
      },
      {
        heading: "Expert Answers and Strategies",
        body: "We don't just provide the questions; our industry instructors offer strategic insights on how to frame your answers to demonstrate deep practical knowledge and leadership skills.",
      },
      {
        heading: "Role-Specific Guides",
        body: "Whether you are preparing for an Agile Coach position or a Senior Developer role, our targeted interview prep guides will help you walk into the room with confidence.",
      },
      {
        heading: "Continuous Learning & Support",
        body: "We believe that learning doesn't stop once the certification is achieved. ULearnSystems provides ongoing mentorship, comprehensive post-training support, and access to an exclusive alumni network to help you continuously grow and navigate your professional journey with confidence."
      }
    ]
  },
  "masterclasses": {
    title: "Exclusive Expert Masterclasses | ULearnSystems",
    description: "Join high-impact, expert-led masterclasses on advanced Agile, Leadership, and Technology topics.",
    keywords: "Masterclasses, expert webinars, advanced Agile training, leadership masterclass, SAFe masterclass",
    sections: [
      {
        heading: "Learn from the Masters",
        body: "Our exclusive Masterclasses bring together the brightest minds in the industry. These intensive, short-form sessions are designed for senior professionals seeking deep, specialized knowledge beyond standard certification programs.",
      },
      {
        heading: "Advanced Topics",
        body: "Explore advanced concepts such as Lean Portfolio Management, Enterprise Scaling methodologies, and Executive Agile Leadership. These sessions are highly interactive and strictly limited in size.",
      },
      {
        heading: "On-Demand Access",
        body: "Missed a live session? ULearnSystems alumni get exclusive on-demand access to our library of recorded Masterclasses, ensuring continuous professional development.",
      },
      {
        heading: "Continuous Learning & Support",
        body: "We believe that learning doesn't stop once the certification is achieved. ULearnSystems provides ongoing mentorship, comprehensive post-training support, and access to an exclusive alumni network to help you continuously grow and navigate your professional journey with confidence."
      }
    ]
  },
  "become-an-instructor": {
    title: "Become an Instructor | Teach at ULearnSystems",
    description: "Join our global network of elite trainers. Teach Agile, Scrum, PMP, and tech courses to professionals worldwide.",
    keywords: "Become an instructor, teach online, Agile trainer jobs, PMP instructor, Corporate Trainer opportunities",
    sections: [
      {
        heading: "Share Your Expertise with the World",
        body: "Are you a seasoned industry expert with a passion for teaching? Join ULearnSystems as an instructor and help shape the careers of thousands of professionals globally. We are always looking for dynamic trainers in Agile, Project Management, and IT domains.",
      },
      {
        heading: "Unmatched Reach & Support",
        body: "As a ULearnSystems instructor, you gain access to our state-of-the-art virtual delivery platforms and a global audience. We handle the marketing, enrollment, and administrative logistics so you can focus on what you do best: teaching.",
      },
      {
        heading: "Criteria & Application",
        body: "We require active certifications (e.g., CST, SPCT, PMP) and a proven track record of industry experience. Apply today to become part of our elite instructional faculty.",
      },
      {
        heading: "Continuous Learning & Support",
        body: "We believe that learning doesn't stop once the certification is achieved. ULearnSystems provides ongoing mentorship, comprehensive post-training support, and access to an exclusive alumni network to help you continuously grow and navigate your professional journey with confidence."
      }
    ]
  },
  "become-a-training-partner": {
    title: "Become a Training Partner | Enterprise Collaboration",
    description: "Partner with ULearnSystems to deliver premium Agile, Scrum, and PMP training in your region.",
    keywords: "Training Partner, Franchise, Reseller, Corporate Training Partnership, B2B Education",
    sections: [
      {
        heading: "Expand Your Portfolio",
        body: "Partner with a global leader in professional education. By becoming a ULearnSystems Training Partner, you can offer our globally accredited Agile, Scrum, and PMP certification courses to your local client base.",
      },
      {
        heading: "Turnkey Enterprise Solutions",
        body: "We provide our partners with comprehensive support, including world-class course materials, access to our elite instructor pool, and robust marketing assets. Accelerate your B2B Corporate Training revenues with our proven frameworks.",
      },
      {
        heading: "Global Network, Local Impact",
        body: "Join a thriving network of international partners. Together, we can bridge the global skills gap and drive enterprise agility in emerging and established markets alike.",
      },
      {
        heading: "Continuous Learning & Support",
        body: "We believe that learning doesn't stop once the certification is achieved. ULearnSystems provides ongoing mentorship, comprehensive post-training support, and access to an exclusive alumni network to help you continuously grow and navigate your professional journey with confidence."
      }
    ]
  },
  "affiliate": {
    title: "Affiliate Program | Earn with ULearnSystems",
    description: "Join the ULearnSystems Affiliate Program. Promote top-rated Agile and PMP courses and earn competitive commissions.",
    keywords: "Affiliate program, earn money online, course affiliate, education affiliate, promote courses",
    sections: [
      {
        heading: "Monetize Your Audience",
        body: "Do you have an audience of professionals seeking career growth? Join the ULearnSystems Affiliate Program and earn highly competitive commissions by promoting our industry-leading Agile, Scrum, and PMP certification courses.",
      },
      {
        heading: "High Conversion Rates",
        body: "Our courses are highly rated, globally accredited, and in immense demand. With our optimized landing pages and strong brand reputation, your referrals are primed for high conversion rates.",
      },
      {
        heading: "Dedicated Affiliate Support",
        body: "We provide our affiliates with real-time tracking dashboards, high-converting banner assets, and dedicated support to help you maximize your earning potential.",
      },
      {
        heading: "Continuous Learning & Support",
        body: "We believe that learning doesn't stop once the certification is achieved. ULearnSystems provides ongoing mentorship, comprehensive post-training support, and access to an exclusive alumni network to help you continuously grow and navigate your professional journey with confidence."
      }
    ]
  },
  "faqs": {
    title: "Frequently Asked Questions (FAQs) | ULearnSystems",
    description: "Find answers to the most common questions about our certification courses, training delivery, and corporate solutions.",
    keywords: "FAQs, help center, course questions, Agile certification FAQs, PMP exam questions",
    sections: [
      {
        heading: "General Course Information",
        body: "We offer Live Virtual, Classroom, and Self-Paced training formats. Upon enrollment, you will receive immediate access to our Learning Management System (LMS) and all necessary study materials.",
      },
      {
        heading: "Exam & Certification Queries",
        body: "For courses like CSM and CSPO, the certification fee is included in the course price. For PMP and ITIL, we provide comprehensive exam prep, but exam fees may be separate depending on the package selected.",
      },
      {
        heading: "Corporate Training Logistics",
        body: "We offer highly customizable Corporate Training schedules to accommodate global teams across different time zones. Contact our enterprise sales team to discuss group discounts and customized curricula.",
      },
      {
        heading: "Continuous Learning & Support",
        body: "We believe that learning doesn't stop once the certification is achieved. ULearnSystems provides ongoing mentorship, comprehensive post-training support, and access to an exclusive alumni network to help you continuously grow and navigate your professional journey with confidence."
      }
    ]
  },
  "terms-and-conditions": {
    title: "Terms and Conditions | ULearnSystems",
    description: "Read the comprehensive Terms and Conditions for using ULearnSystems platform and services.",
    keywords: "Terms and conditions, legal, website terms, usage policy, enterprise terms",
    sections: [
      {
        heading: "Agreement to Terms",
        body: "By accessing and using the ULearnSystems website and enrolling in our Agile, Scrum, or PMP certification programs, you agree to be bound by these Terms and Conditions. These terms govern your use of our platform and intellectual property.",
      },
      {
        heading: "Intellectual Property Rights",
        body: "All course materials, videos, and documentation provided during our Corporate Training and individual sessions are the exclusive intellectual property of ULearnSystems and our accrediting partners. Unauthorized distribution is strictly prohibited.",
      },
      {
        heading: "User Conduct",
        body: "We maintain a professional learning environment. Any disruptive behavior during Live Virtual or Classroom sessions may result in immediate termination of access without refund.",
      },
      {
        heading: "Continuous Learning & Support",
        body: "We believe that learning doesn't stop once the certification is achieved. ULearnSystems provides ongoing mentorship, comprehensive post-training support, and access to an exclusive alumni network to help you continuously grow and navigate your professional journey with confidence."
      }
    ]
  },
  "privacy-policy-and-disclaimer": {
    title: "Privacy Policy and Disclaimer | ULearnSystems",
    description: "Understand how ULearnSystems collects, uses, and protects your personal data.",
    keywords: "Privacy policy, data protection, GDPR, data security, disclaimer",
    sections: [
      {
        heading: "Data Protection Commitment",
        body: "ULearnSystems is deeply committed to protecting your privacy. We comply with global data protection regulations, including GDPR, to ensure that the personal information of our learners and enterprise clients is secure.",
      },
      {
        heading: "Information Collection and Use",
        body: "We collect information necessary to facilitate your enrollment, deliver our Agile and PMP courses, and process certification requirements with bodies like Scrum Alliance and PMI. We do not sell your data to third parties.",
      },
      {
        heading: "Disclaimer",
        body: "While our training programs drastically improve certification success rates, ULearnSystems does not guarantee exam clearance. The user is solely responsible for evaluating the merits of the information provided.",
      },
      {
        heading: "Continuous Learning & Support",
        body: "We believe that learning doesn't stop once the certification is achieved. ULearnSystems provides ongoing mentorship, comprehensive post-training support, and access to an exclusive alumni network to help you continuously grow and navigate your professional journey with confidence."
      }
    ]
  },
  "cancellation-and-refund-policy": {
    title: "Cancellation and Refund Policy | ULearnSystems",
    description: "Review our transparent cancellation, rescheduling, and refund policies for all training programs.",
    keywords: "Cancellation policy, refund policy, reschedule training, course refund, corporate training cancellation",
    sections: [
      {
        heading: "Transparent Rescheduling",
        body: "We understand that professional schedules can change. Learners may reschedule their Live Virtual or Classroom sessions up to 72 hours prior to the class start date without any penalty.",
      },
      {
        heading: "Refund Guidelines",
        body: "Refund requests submitted more than 7 days before the training start date will be processed with a full refund (minus administrative fees). No refunds are provided for cancellations made within 7 days of the course.",
      },
      {
        heading: "Corporate Training Cancellations",
        body: "Enterprise clients engaging in bespoke Corporate Training solutions are subject to the specific cancellation terms outlined in their Master Service Agreement.",
      },
      {
        heading: "Continuous Learning & Support",
        body: "We believe that learning doesn't stop once the certification is achieved. ULearnSystems provides ongoing mentorship, comprehensive post-training support, and access to an exclusive alumni network to help you continuously grow and navigate your professional journey with confidence."
      }
    ]
  },
  "report-a-vulnerability": {
    title: "Report a Vulnerability | Security at ULearnSystems",
    description: "Help us keep the ULearnSystems platform secure. Guidelines for reporting security vulnerabilities.",
    keywords: "Report vulnerability, security, bug bounty, responsible disclosure, platform security",
    sections: [
      {
        heading: "Our Security Commitment",
        body: "Security is paramount at ULearnSystems. As a trusted partner for global enterprise Corporate Training, we take the security of our platform and our users' data extremely seriously.",
      },
      {
        heading: "Responsible Disclosure",
        body: "If you believe you have found a security vulnerability on our website or Learning Management System, we encourage you to report it immediately. Please do not exploit the vulnerability or disclose it publicly until we have resolved the issue.",
      },
      {
        heading: "How to Report",
        body: "Please submit a detailed report, including steps to reproduce the vulnerability, to security@ulearnsystems.com. Our engineering team will acknowledge your report within 48 hours.",
      },
      {
        heading: "Continuous Learning & Support",
        body: "We believe that learning doesn't stop once the certification is achieved. ULearnSystems provides ongoing mentorship, comprehensive post-training support, and access to an exclusive alumni network to help you continuously grow and navigate your professional journey with confidence."
      }
    ]
  }
};
