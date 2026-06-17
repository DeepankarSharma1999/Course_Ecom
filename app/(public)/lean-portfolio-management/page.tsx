import { Metadata } from "next";
import { EnterpriseSolutionLayout } from "@/components/public/enterprise/solution-layout";

export const metadata: Metadata = {
  title: "Lean Portfolio Management | ULearnSystems",
  description: "Modernize your portfolio management to align strategy, funding, and execution.",
};

export default function LeanPortfolioManagementPage() {
  return (
    <EnterpriseSolutionLayout
      category="Agile Solutions"
      title="Lean Portfolio Management"
      subtitle="Connect Enterprise Strategy to Agile Execution"
      description="Traditional project portfolio management often hinders agile transformation. Lean Portfolio Management (LPM) aligns strategy and funding with Agile execution, enabling you to fund value streams, optimize flow, and adapt dynamically to market changes."
      benefits={[
        { icon: "target", title: "Strategic Alignment", description: "Ensure all execution work is directly tied to strategic themes and enterprise OKRs." },
        { icon: "trending", title: "Lean Budgeting", description: "Transition from project-based funding to funding continuous value streams." },
        { icon: "zap", title: "Decentralized Decision Making", description: "Empower value streams to make rapid, localized decisions within defined guardrails." },
        { icon: "layers", title: "Portfolio Kanban", description: "Visualize the flow of strategic initiatives and epics to manage capacity and demand." },
        { icon: "chart", title: "Objective Metrics", description: "Measure portfolio performance using objective, fact-based Lean-Agile metrics." },
        { icon: "briefcase", title: "Continuous Compliance", description: "Integrate compliance and governance directly into the value stream flow." },
      ]}
      approach={[
        { title: "Establish Strategy", description: "Define strategic themes, portfolio vision, and Enterprise OKRs." },
        { title: "Implement Lean Budgets", description: "Shift funding from projects to value streams, establishing lean budget guardrails." },
        { title: "Establish Portfolio Flow", description: "Implement a Portfolio Kanban system to manage and prioritize strategic epics." },
        { title: "Operationalize LPM", description: "Train LPM leadership, establish Lean governance, and launch participatory budgeting." },
      ]}
    />
  );
}
