import { Metadata } from "next";
import { EnterpriseSolutionLayout } from "@/components/public/enterprise/solution-layout";

export const metadata: Metadata = {
  title: "Business Agility Transformation | ULearnSystems",
  description: "Achieve enterprise-wide Business Agility to respond quickly to market changes and outpace competitors.",
};

export default function BusinessAgilityPage() {
  return (
    <EnterpriseSolutionLayout
      category="Agile Solutions"
      title="Business Agility Transformation"
      subtitle="Adapt, Innovate, and Thrive in a Disruptive Market"
      description="Business agility goes beyond IT. We help you transform your entire organization—from HR and marketing to finance and operations—to quickly respond to market changes, emerging opportunities, and customer demands."
      benefits={[
        { icon: "zap", title: "Rapid Market Response", description: "Pivot strategies instantly and capitalize on new opportunities without organizational friction." },
        { icon: "target", title: "Customer Centricity", description: "Realign your entire operating model around delivering continuous customer value." },
        { icon: "briefcase", title: "Operational Excellence", description: "Eliminate waste, reduce overhead, and optimize processes across all business units." },
        { icon: "users", title: "Empowered Workforce", description: "Cultivate a resilient culture where employees are autonomous, engaged, and motivated." },
        { icon: "shield", title: "Risk Mitigation", description: "Anticipate market disruptions and build robust frameworks for business continuity." },
        { icon: "trending", title: "Sustainable Growth", description: "Drive long-term profitability by embedding innovation into your daily operations." },
      ]}
      approach={[
        { title: "Assess & Align", description: "Evaluate your current organizational agility and align leadership on transformation goals." },
        { title: "Design the Model", description: "Redesign organizational structures, shifting from silos to cross-functional value delivery teams." },
        { title: "Pilot & Learn", description: "Launch agile practices in targeted non-IT departments to build early success and momentum." },
        { title: "Scale Enterprise-Wide", description: "Roll out the agile operating model across the entire enterprise with continuous coaching." },
      ]}
    />
  );
}
