import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Video, Calendar, Clock, User, Users, PlayCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Live Webinars | ULearnSystems",
  description: "Join our exclusive live webinars led by industry experts. Learn new skills, get your questions answered, and stay up-to-date with the latest trends.",
};

const WEBINARS = [
  {
    title: "Mastering Agile at Scale with SAFe 6.0",
    speaker: "Sarah Jenkins, Agile Coach",
    date: "Oct 15, 2024",
    time: "10:00 AM EST",
    tags: ["Agile", "SAFe"],
  },
  {
    title: "Demystifying DevOps: A Practical Guide",
    speaker: "Alex Rivera, DevOps Engineer",
    date: "Oct 22, 2024",
    time: "2:00 PM EST",
    tags: ["DevOps", "CI/CD"],
  },
  {
    title: "Product Management in the AI Era",
    speaker: "Michael Chen, Product Leader",
    date: "Oct 29, 2024",
    time: "11:00 AM EST",
    tags: ["Product", "AI"],
  },
  {
    title: "Scrum Master Masterclass: Navigating Complexities",
    speaker: "Emily Davis, Enterprise Agile Coach",
    date: "Nov 5, 2024",
    time: "9:00 AM EST",
    tags: ["Scrum", "Leadership"],
  }
];

export default function WebinarsPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-[#0f6b6b] text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-dots text-white opacity-20"></div>
        <div className="container-tight relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6">
              <Video className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold">Live Events & Masterclasses</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Exclusive Live <br /> <span className="text-yellow-400">Webinars</span>
            </h1>
            <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed max-w-xl">
              Join industry experts for deep dives into Agile, Scrum, DevOps, and Product Management. No cost, just learning!
            </p>
            
            <ul className="space-y-4 mb-10 text-primary-foreground/90">
              {[
                "Interactive Q&A Sessions with Experts",
                "Real-World Case Studies and Examples",
                "Earn SEUs/PDUs for Attending",
                "Access to Recordings After the Event"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0 opacity-80" />
                  <span className="font-medium text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <a href="#upcoming" className="btn bg-white text-primary hover:bg-white/90 rounded-full px-8 py-3 text-lg font-bold inline-flex items-center transition-colors shadow-lg">
              View Schedule
              <ChevronRight className="w-5 h-5 ml-2" />
            </a>
          </div>
          <div className="hidden lg:block relative">
            <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-2xl max-w-lg mx-auto">
              {/* Mock Video Player */}
              <div className="aspect-video bg-black/40 relative flex items-center justify-center group cursor-pointer">
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> LIVE
                </div>
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded flex items-center gap-1.5">
                  <Users className="w-3 h-3" /> 1,248
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors backdrop-blur-md">
                  <PlayCircle className="w-10 h-10 text-white ml-1" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-white mb-2 leading-tight">Mastering Agile at Scale with SAFe 6.0</h3>
                <div className="flex items-center gap-3 text-sm text-primary-foreground/80 mb-4">
                  <span className="flex items-center gap-1"><User className="w-4 h-4" /> Sarah Jenkins</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 45:12</span>
                </div>
                <div className="flex gap-2">
                  <input type="text" placeholder="Ask a question..." aria-label="Ask a question" className="flex-1 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/50 outline-none focus:border-white/30" />
                  <button className="bg-white/20 hover:bg-white/30 text-white rounded-lg px-4 py-2 text-sm font-semibold transition-colors">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Webinars Grid Section */}
      <section id="upcoming" className="section bg-ink-50 min-h-[50vh]">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="h2 mb-4">Upcoming Schedule</h2>
            <p className="lead max-w-2xl mx-auto">
              Reserve your spot in our upcoming expert-led webinars.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {WEBINARS.map((webinar, i) => (
              <div key={i} className="card p-6 bg-white border border-ink-100 hover:border-[#4676f5] hover:shadow-card-md transition-all flex flex-col h-full">
                <div className="flex flex-wrap gap-2 mb-4">
                  {webinar.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-ink-100 text-ink-600 px-2.5 py-1 rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="font-bold text-xl text-ink-900 mb-4 line-clamp-2 flex-1">
                  {webinar.title}
                </h3>
                
                <div className="space-y-3 mb-6 bg-ink-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-ink-700">
                    <User className="w-4 h-4 text-[#4676f5]" />
                    <span className="font-medium">{webinar.speaker}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-ink-600">
                    <Calendar className="w-4 h-4 text-ink-400" />
                    <span>{webinar.date}</span>
                    <span className="text-ink-300">|</span>
                    <Clock className="w-4 h-4 text-ink-400" />
                    <span>{webinar.time}</span>
                  </div>
                </div>
                
                <button className="w-full btn-outline border-ink-200 hover:border-[#4676f5] hover:text-[#4676f5]">
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </main>
  );
}
