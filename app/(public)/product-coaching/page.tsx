import { Metadata } from "next";
import { EnterpriseSolutionLayout } from "@/components/public/enterprise/solution-layout";

export const metadata: Metadata = {
  title: "Product Coaching & Mentorship | ULearnSystems",
  description: "Empower your product managers with expert coaching to build products customers love.",
};

export default function ProductCoachingPage() {
  return (
    <EnterpriseSolutionLayout
      category="Product Building"
      title="Product Coaching & Mentorship"
      subtitle="Elevate Your Product Management Capabilities"
      description="Great products are built by great product managers. Our expert product coaches work side-by-side with your teams to instill modern product discovery, strategy, and delivery practices, moving them from order-takers to strategic value drivers."
      benefits={[
        { icon: "target", title: "Strategic Focus", description: "Help PMs shift from feature-factory mindsets to focusing on business outcomes and customer value." },
        { icon: "users", title: "Customer Empathy", description: "Instill continuous product discovery habits to deeply understand and solve real user problems." },
        { icon: "trending", title: "Data-Driven Decisions", description: "Coach teams to utilize product analytics, A/B testing, and user feedback to guide the roadmap." },
        { icon: "briefcase", title: "Stakeholder Management", description: "Improve PMs' ability to align executives, engineering, and design around a shared product vision." },
        { icon: "zap", title: "Accelerated Learning", description: "Shorten the learning curve for new PMs with personalized, contextual mentorship from industry veterans." },
        { icon: "layers", title: "Framework Mastery", description: "Gain practical experience applying frameworks like Jobs-to-be-Done (JTBD) and Opportunity Solution Trees." },
      ]}
      approach={[
        { title: "Skills Assessment", description: "Evaluate the current capabilities of your product team to identify coaching opportunities." },
        { title: "Customized Coaching Plan", description: "Develop a targeted coaching curriculum tailored to the specific needs of your product organization." },
        { title: "1-on-1 & Team Coaching", description: "Engage in regular mentoring sessions, shadowing, and collaborative problem-solving." },
        { title: "Measure Impact", description: "Track improvements in product velocity, quality, and PM confidence over the engagement." },
      ]}
    />
  );
}
