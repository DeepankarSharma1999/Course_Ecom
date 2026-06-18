import { Metadata } from "next";
import { EnterpriseSolutionLayout } from "@/components/public/enterprise/solution-layout";

export const metadata: Metadata = {
  title: "SAFe Implementation | ULearnSystems Enterprise",
  description: "Scale Agile across your enterprise with expert SAFe Implementation services from ULearnSystems.",
};

export default function SafeImplementationPage() {
  return (
    <EnterpriseSolutionLayout
      category="Agile Solutions"
      title="SAFe® Implementation Roadmap"
      subtitle="Scale Agile Seamlessly Across Your Enterprise"
      description="Leverage the Scaled Agile Framework (SAFe®) to align strategy with execution, accelerate delivery, and drive business agility. Our expert SAFe Practice Consultants (SPCs) guide you through every step of your transformation."
      benefits={[
        { icon: "trending", title: "Faster Time-to-Market", description: "Streamline workflows and synchronize cross-functional teams to deliver value rapidly." },
        { icon: "target", title: "Strategic Alignment", description: "Connect portfolio strategy directly to agile execution to ensure teams build what matters." },
        { icon: "shield", title: "Reduced Risk", description: "Improve quality and predictability with built-in compliance and continuous testing." },
        { icon: "users", title: "Enhanced Collaboration", description: "Break down silos and foster a culture of shared responsibility and continuous learning." },
        { icon: "chart", title: "Measurable ROI", description: "Track transformation progress and business value delivered with clear metrics." },
        { icon: "globe", title: "Global Scaling", description: "Implement a proven framework that scales predictably from 50 to 5,000+ practitioners." },
      ]}
      approach={[
        { title: "Train the Leaders", description: "Build a guiding coalition by training executives, managers, and leaders in Lean-Agile principles." },
        { title: "Identify Value Streams", description: "Map operational and development value streams to identify Agile Release Trains (ARTs)." },
        { title: "Launch ARTs", description: "Train teams and launch ARTs with focused PI Planning events for immediate alignment." },
        { title: "Extend to Portfolio", description: "Implement Lean Portfolio Management to align funding and strategy with execution." },
      ]}
      relatedCourses={[
        { title: "Leading SAFe 6.0", href: "/courses" }
      ]}
    />
  );
}
