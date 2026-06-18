import { Metadata } from "next";
import { EnterpriseSolutionLayout } from "@/components/public/enterprise/solution-layout";

export const metadata: Metadata = {
  title: "DevOps Cultural Transformation | ULearnSystems",
  description: "Foster a collaborative DevOps culture to accelerate software delivery and improve reliability.",
};

export default function DevOpsTransformationPage() {
  return (
    <EnterpriseSolutionLayout
      category="Agile Solutions"
      title="DevOps Cultural Transformation"
      subtitle="Bridge the Gap Between Development and Operations"
      description="DevOps is more than just tools—it's a fundamental shift in culture. We help you tear down silos, establish shared goals, and implement automation strategies that enable continuous integration, continuous delivery, and highly reliable systems."
      benefits={[
        { icon: "users", title: "Break Down Silos", description: "Create cross-functional teams with shared accountability for the entire software lifecycle." },
        { icon: "zap", title: "Accelerated Delivery", description: "Implement CI/CD pipelines to release high-quality software to market faster and more frequently." },
        { icon: "shield", title: "Enhanced Reliability", description: "Improve system stability and drastically reduce mean time to recovery (MTTR)." },
        { icon: "code", title: "Automation First", description: "Automate testing, provisioning, and deployment to eliminate manual errors and toil." },
        { icon: "target", title: "Continuous Feedback", description: "Embed monitoring and telemetry to create tight feedback loops for continuous improvement." },
        { icon: "briefcase", title: "Higher Employee Satisfaction", description: "Empower engineers by removing friction, leading to higher morale and retention." },
      ]}
      approach={[
        { title: "Cultural Assessment", description: "Evaluate existing workflows, team dynamics, and toolchains to baseline your current DevOps maturity." },
        { title: "Define the Target State", description: "Establish a clear vision for your DevOps culture, defining metrics like deployment frequency and lead time." },
        { title: "Implement Automation", description: "Introduce modern CI/CD, Infrastructure as Code (IaC), and automated testing practices." },
        { title: "Coach & Scale", description: "Provide hands-on coaching to embed DevOps mindsets and scale practices across all engineering teams." },
      ]}
      relatedCourses={[
        { title: "DevOps Foundation", href: "/courses" }
      ]}
    />
  );
}
