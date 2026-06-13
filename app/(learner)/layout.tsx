import { LearnerSidebar } from "@/components/learner/learner-sidebar";
import { LearnerTopbar } from "@/components/learner/learner-topbar";

export default function LearnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink-50/30 flex">
      <LearnerSidebar />
      <div className="flex-1 ml-[260px] flex flex-col min-h-screen">
        <LearnerTopbar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
