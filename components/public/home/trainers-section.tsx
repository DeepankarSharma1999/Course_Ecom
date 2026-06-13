import Link from "next/link";
import { Linkedin } from "lucide-react";

const TRAINERS = [
  {
    name: "Aakash Srivastava, CST",
    title: "Certified Scrum Trainer",
    bio: "Agile coach focused on complex enterprise transformations and practical scrum adoption.",
    photo: "https://i.pravatar.cc/160?img=33",
    experience: "15+ Years experience",
  },
  {
    name: "Michel Goldenberg, CST",
    title: "Certified Scrum Trainer",
    bio: "Leadership and product coach with deep experience across agile and product organisations.",
    photo: "https://i.pravatar.cc/160?img=12",
    experience: "17+ Years experience",
  },
  {
    name: "Raj Ratan, CST",
    title: "Agile Coach",
    bio: "Enterprise agility expert focused on practical delivery, facilitation, and team maturity.",
    photo: "https://i.pravatar.cc/160?img=52",
    experience: "16+ Years experience",
  },
];

export function TrainersSection() {
  return (
    <section className="section bg-white font-sans">
      <div className="container-tight">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="section-eyebrow mb-3">Training Experts</div>
          <h2 className="h2">Learn from practitioners invested in your success</h2>
          <p className="lead mt-4">Our trainers combine certification expertise with real-world transformation experience.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TRAINERS.map((trainer) => (
            <article key={trainer.name} className="card flex h-full flex-col p-6">
              <div className="mb-5 flex items-center gap-4">
                <img src={trainer.photo} alt={trainer.name} className="h-20 w-20 rounded-2xl object-cover" />
                <div>
                  <h3 className="text-lg font-black leading-snug text-[#082032]">{trainer.name}</h3>
                  <p className="mt-1 text-sm font-bold text-primary">{trainer.title}</p>
                </div>
              </div>
              <p className="line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">{trainer.bio}</p>
              <div className="mt-6 flex items-center justify-between border-t border-[#082032]/8 pt-5">
                <span className="text-sm font-bold text-[#082032]">{trainer.experience}</span>
                <Link href="#" aria-label={`${trainer.name} LinkedIn`} className="grid h-10 w-10 place-items-center rounded-full bg-[#0A66C2]/10 text-[#0A66C2] transition-colors hover:bg-[#0A66C2] hover:text-white">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
