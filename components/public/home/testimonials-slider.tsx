import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Daniel Harper",
    role: "Product Manager",
    text: "Outstanding training from ULearnSystems. The curriculum was practical, structured, and immediately useful for my certification preparation.",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Sarah Mitchell",
    role: "Cloud AI Architect",
    text: "The instructor connected every topic to real delivery scenarios. It felt like a professional workshop, not just a slide-based course.",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Priya Venkataraman",
    role: "AI Solutions Architect",
    text: "The hands-on labs and expert feedback helped me understand how to apply new techniques in production teams.",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
];

export function TestimonialsSlider() {
  return (
    <section className="section bg-[#E9F4F4] font-sans">
      <div className="container-tight">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="section-eyebrow mb-3">Learner Outcomes</div>
          <h2 className="h2">Trusted by learners across the globe</h2>
          <p className="lead mt-4">Readable, practical training experiences that help professionals move with confidence.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr_0.85fr]">
          {testimonials.map((testimonial, index) => (
            <article key={testimonial.name} className={`card flex h-full flex-col p-6 ${index === 0 ? "lg:p-8" : ""}`}>
              <Quote className={`mb-5 text-primary ${index === 0 ? "h-9 w-9" : "h-7 w-7"}`} />
              <p className={`${index === 0 ? "text-xl leading-9" : "text-base leading-7"} flex-1 font-semibold text-[#082032]`}>
                &quot;{testimonial.text}&quot;
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#082032]/8 pt-5">
                <div className="flex items-center gap-3">
                  <img src={testimonial.avatar} alt={testimonial.name} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <div className="font-black text-[#082032]">{testimonial.name}</div>
                    <div className="text-xs font-bold text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex text-[#E23B3B]" aria-label="5 star rating">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
