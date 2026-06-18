import { Metadata } from "next";
import { EnterpriseSolutionLayout } from "@/components/public/enterprise/solution-layout";

export const metadata: Metadata = {
  title: "Technology & Business Management | ULearnSystems",
  description: "Align IT strategy with business outcomes through Technology Business Management (TBM).",
};

export default function TechBusinessManagementPage() {
  return (
    <EnterpriseSolutionLayout
      category="Agile Solutions"
      title="Technology & Business Management"
      subtitle="Align IT Spend with Strategic Business Value"
      description="Technology Business Management (TBM) transforms IT from a cost center into a strategic business partner. Our solutions help you gain total transparency into technology spending, optimize resource allocation, and communicate IT value in business terms."
      benefits={[
        { icon: "chart", title: "Cost Transparency", description: "Gain granular visibility into IT expenditures and link them directly to business services." },
        { icon: "target", title: "Strategic Alignment", description: "Ensure technology investments directly support overarching corporate objectives." },
        { icon: "trending", title: "Optimize Spend", description: "Identify redundancies, negotiate better vendor contracts, and free up capital for innovation." },
        { icon: "briefcase", title: "Business Partnership", description: "Shift conversations with business leaders from IT costs to business value and ROI." },
        { icon: "layers", title: "Agile Budgeting", description: "Transition from rigid annual budgets to dynamic funding models that support agile delivery." },
        { icon: "shield", title: "Data-Driven Decisions", description: "Leverage TBM data to make objective, defensible decisions regarding technology investments." },
      ]}
      approach={[
        { title: "Assess IT Financials", description: "Analyze your current IT financial management practices and establish a TBM taxonomy." },
        { title: "Implement TBM Tools", description: "Deploy enterprise TBM software to automate data collection and mapping." },
        { title: "Map Costs to Value", description: "Allocate IT costs to specific applications, services, and business units." },
        { title: "Drive Optimization", description: "Utilize TBM reporting to identify cost-saving opportunities and fund digital transformation." },
      ]}
    />
  );
}
