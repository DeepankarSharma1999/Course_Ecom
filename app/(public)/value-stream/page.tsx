import { Metadata } from "next";
import { EnterpriseSolutionLayout } from "@/components/public/enterprise/solution-layout";

export const metadata: Metadata = {
  title: "Value Stream Workshop & Optimization | ULearnSystems",
  description: "Identify bottlenecks and optimize value delivery with our Value Stream Optimization workshops.",
};

export default function ValueStreamPage() {
  return (
    <EnterpriseSolutionLayout
      category="Agile Solutions"
      title="Value Stream Optimization"
      subtitle="Eliminate Bottlenecks and Accelerate Delivery"
      description="Value Stream Mapping (VSM) is the critical first step to true enterprise agility. Our expert-led workshops help you visualize your entire delivery pipeline, identify waste, and optimize the flow of value from ideation to customer delivery."
      benefits={[
        { icon: "layers", title: "End-to-End Visibility", description: "Gain a crystal-clear visual representation of how value flows through your organization." },
        { icon: "zap", title: "Identify Bottlenecks", description: "Pinpoint exact areas of delay, rework, and waste in your delivery lifecycle." },
        { icon: "trending", title: "Accelerate Delivery", description: "Dramatically reduce lead times and cycle times by eliminating non-value-adding steps." },
        { icon: "target", title: "Align Cross-Functional Teams", description: "Break down departmental silos by focusing everyone on the overarching value stream." },
        { icon: "chart", title: "Data-Driven Decisions", description: "Use flow metrics and data to drive continuous improvement initiatives." },
        { icon: "briefcase", title: "Optimize Resources", description: "Reallocate resources efficiently to maximize throughput and minimize burnout." },
      ]}
      approach={[
        { title: "Map Current State", description: "Collaboratively map your existing processes to uncover hidden inefficiencies and delays." },
        { title: "Identify Waste", description: "Analyze the value stream to identify the 8 wastes of Lean and pinpoint major bottlenecks." },
        { title: "Design Future State", description: "Architect an optimized, lean future-state value stream designed for maximum velocity." },
        { title: "Implement & Measure", description: "Execute improvements incrementally and track success using flow velocity and efficiency metrics." },
      ]}
    />
  );
}
