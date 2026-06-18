import { Metadata } from "next";
import { EnterpriseSolutionLayout } from "@/components/public/enterprise/solution-layout";

export const metadata: Metadata = {
  title: "Project to Product Culture Shift | ULearnSystems",
  description: "Transition your organization from a project-centric to a product-centric operating model.",
};

export default function ProjectToProductPage() {
  return (
    <EnterpriseSolutionLayout
      category="Product Building"
      title="Project to Product Culture Shift"
      subtitle="Reinvent How You Deliver Value"
      description="The traditional project mindset—focused on on-time, on-budget delivery of rigid scopes—is failing modern enterprises. We guide your transition to a product-centric operating model, organizing teams around continuous value streams to dramatically increase speed and customer satisfaction."
      benefits={[
        { icon: "trending", title: "Continuous Value Delivery", description: "Shift focus from temporary project deliverables to long-lived, continuously evolving products." },
        { icon: "users", title: "Stable, Dedicated Teams", description: "Eliminate the churn of project team disbandment. Build high-performing, long-lived product teams." },
        { icon: "target", title: "Outcome Over Output", description: "Measure success by business outcomes (revenue, adoption, satisfaction) rather than mere feature delivery." },
        { icon: "layers", title: "Reduced Overhead", description: "Minimize the bureaucracy of project funding, change requests, and resource allocation." },
        { icon: "zap", title: "Faster Time-to-Market", description: "Decouple funding from execution to allow product teams to respond instantly to market shifts." },
        { icon: "shield", title: "Improved Quality", description: "Long-lived teams take ownership of technical debt and long-term product health." },
      ]}
      approach={[
        { title: "Define the Product Taxonomy", description: "Identify and define your enterprise's core products and value streams." },
        { title: "Realign Teams", description: "Transition from siloed functional departments to cross-functional product teams." },
        { title: "Shift Funding Models", description: "Move from project-based financing to continuous product-line funding." },
        { title: "Coach Leadership", description: "Train management to govern by outcomes and metrics rather than rigid project milestones." },
      ]}
    />
  );
}
