import { Metadata } from "next";
import { EnterpriseSolutionLayout } from "@/components/public/enterprise/solution-layout";

export const metadata: Metadata = {
  title: "Design Thinking Workshops | ULearnSystems",
  description: "Foster innovation and solve complex problems with our expert-led Design Thinking Workshops.",
};

export default function DesignThinkingPage() {
  return (
    <EnterpriseSolutionLayout
      category="Product Building"
      title="Design Thinking Workshops"
      subtitle="Unlock Innovation Through Human-Centered Design"
      description="Innovation doesn't happen by accident. Our immersive Design Thinking workshops equip your teams with a proven framework to empathize with users, define core problems, ideate rapidly, and prototype solutions that drive market success."
      benefits={[
        { icon: "users", title: "Deep User Empathy", description: "Learn techniques to uncover the hidden needs, pain points, and desires of your target audience." },
        { icon: "zap", title: "Rapid Ideation", description: "Break out of traditional brainstorming ruts and generate hundreds of innovative concepts quickly." },
        { icon: "layers", title: "Fail Fast, Learn Faster", description: "Embrace rapid prototyping to test ideas cheaply before investing heavily in development." },
        { icon: "target", title: "Cross-Functional Alignment", description: "Bring diverse perspectives together—engineering, design, business—to solve problems collaboratively." },
        { icon: "briefcase", title: "Actionable Outcomes", description: "Leave the workshop not just with ideas, but with tangible prototypes and a clear validation plan." },
        { icon: "trending", title: "Culture of Innovation", description: "Embed a repeatable innovation mindset into your organization's DNA." },
      ]}
      approach={[
        { title: "Empathize & Define", description: "Conduct user research to understand the problem space and define a clear problem statement." },
        { title: "Ideate", description: "Facilitate structured ideation sessions using techniques like Crazy 8s and SCAMPER." },
        { title: "Prototype", description: "Build low-fidelity prototypes (paper, digital mockups) to make concepts tangible." },
        { title: "Test & Iterate", description: "Validate prototypes with real users, gather feedback, and rapidly iterate on the solution." },
      ]}
    />
  );
}
