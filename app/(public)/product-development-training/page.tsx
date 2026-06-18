import { Metadata } from "next";
import { EnterpriseSolutionLayout } from "@/components/public/enterprise/solution-layout";

export const metadata: Metadata = {
  title: "Product Development Training | ULearnSystems",
  description: "Equip your engineering and product teams with modern development practices.",
};

export default function ProductDevelopmentTrainingPage() {
  return (
    <EnterpriseSolutionLayout
      category="Product Building"
      title="Product Development Training"
      subtitle="Build Better Products, Faster"
      description="Modern product development requires tight alignment between product management, design, and engineering. Our comprehensive training programs equip your entire cross-functional organization with the latest methodologies to build scalable, user-centric software."
      benefits={[
        { icon: "code", title: "Technical Excellence", description: "Train engineering teams in Agile engineering practices like TDD, BDD, and Pair Programming." },
        { icon: "zap", title: "Accelerated Delivery", description: "Optimize your delivery pipelines to ensure faster, safer, and more frequent product releases." },
        { icon: "users", title: "Cross-Functional Synergy", description: "Break down silos by training Product, Design, and Engineering to collaborate seamlessly." },
        { icon: "shield", title: "Built-In Quality", description: "Shift testing left and build quality into the product from the very first line of code." },
        { icon: "layers", title: "Scalable Architecture", description: "Learn to design microservices and cloud-native architectures that scale with your business." },
        { icon: "target", title: "User-Centric Engineering", description: "Connect developers directly to user feedback to ensure technical decisions align with user needs." },
      ]}
      approach={[
        { title: "Assess Capabilities", description: "Benchmark your team's current technical and product development capabilities." },
        { title: "Customized Training Tracks", description: "Deliver specialized training tracks for Engineers, Designers, and Product Managers." },
        { title: "Hands-On Labs", description: "Ensure high retention through interactive, real-world coding labs and architectural exercises." },
        { title: "Continuous Coaching", description: "Provide post-training mentorship to help teams implement new practices in their daily work." },
      ]}
      relatedCourses={[
        { title: "AI Powered Software Development", href: "/courses" }
      ]}
    />
  );
}
