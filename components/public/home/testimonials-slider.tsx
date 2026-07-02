"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    title: "Comprehensive course!",
    name: "Preethi N",
    role: "Project Manager",
    text: "Recently attended the Scrum Master course. The instructor demonstrated profound knowledge of Agile methodologies and Scrum in particular. Comprehensive course materials, including slides,",
    avatar: "https://i.pravatar.cc/150?img=47",
    platform: "Google"
  },
  {
    title: "Amazing training ecosystem!",
    name: "Rangarajan Rajamani",
    role: "NA",
    text: "This is an amazing training ecosystem. They had assigned individual relationship managers who not only did the tactical things of reminding of sessions etc, but they also connected me with people who were",
    avatar: "https://i.pravatar.cc/150?img=11",
    platform: "Google"
  },
  {
    title: "Well-organized event",
    name: "Karthik Raj Manupatty Ponraj",
    role: "Lead consultant",
    text: "The workshop was a well-organized event. The trainer was an expert which made it a valuable training.",
    avatar: "https://i.pravatar.cc/150?img=68",
    platform: "LinkedIn"
  },
  {
    title: "Excellent learning experience",
    name: "David Miller",
    role: "Software Engineer",
    text: "The instructors are industry veterans. I loved the practical assignments. Everything was structured beautifully for a seamless learning journey.",
    avatar: "https://i.pravatar.cc/150?img=12",
    platform: "LinkedIn"
  },
  {
    title: "Highly recommended!",
    name: "Sarah Johnson",
    role: "Agile Coach",
    text: "Got my SAFe certification easily. The platform is super intuitive and helpful for anyone looking to upskill in enterprise agility.",
    avatar: "https://i.pravatar.cc/150?img=5",
    platform: "Google"
  },
  {
    title: "A Game Changer for my Career",
    name: "Michael Chen",
    role: "Data Analyst",
    text: "The Data Science bootcamp exceeded my expectations. The hands-on projects were directly applicable to my job, and the mentorship was top-notch.",
    avatar: "https://i.pravatar.cc/150?img=33",
    platform: "LinkedIn"
  },
  {
    title: "Incredible Support",
    name: "Emma Williams",
    role: "Cloud Architect",
    text: "Passed my AWS Solutions Architect exam on the first try! The practice tests and detailed explanations were exactly what I needed to succeed.",
    avatar: "https://i.pravatar.cc/150?img=44",
    platform: "Google"
  },
  {
    title: "Best UI/UX Course Online",
    name: "Daniel Martinez",
    role: "Product Designer",
    text: "The immersive learning experience is brilliant. I built a portfolio of professional-grade projects that landed me multiple interviews within a week.",
    avatar: "https://i.pravatar.cc/150?img=51",
    platform: "LinkedIn"
  },
  {
    title: "Clear, concise, and practical",
    name: "Sophia Lee",
    role: "Marketing Director",
    text: "I took the Digital Marketing masterclass. It completely changed how we approach our ad spend. ROI went up significantly thanks to the practical frameworks taught.",
    avatar: "https://i.pravatar.cc/150?img=20",
    platform: "Google"
  },
  {
    title: "Outstanding Instructors",
    name: "James Wilson",
    role: "Full Stack Developer",
    text: "The React Native module was fantastic. Instructors patiently answered all queries and the peer coding sessions were a great way to learn collaboratively.",
    avatar: "https://i.pravatar.cc/150?img=60",
    platform: "LinkedIn"
  }
];

export function TestimonialsSlider({ content }: { content?: any }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tBadge = content?.testimonialsBadge || "Learner Reviews From The World Over";
  const tTitle = content?.testimonialsTitle || "Testimonials That Speak Volumes";
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredTestimonials = TESTIMONIALS.filter(t => activeFilter === "All" || t.platform === activeFilter);
  const itemsPerView = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, filteredTestimonials.length - itemsPerView);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const handlePrev = () => setActiveIndex((c) => (c > 0 ? c - 1 : maxIndex));
  const handleNext = () => setActiveIndex((c) => (c < maxIndex ? c + 1 : 0));

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setActiveIndex(0);
  };

  return (
    <section className="section bg-[#f8fcfc] font-sans py-24 overflow-hidden">
      <div className="container-tight max-w-[1200px]">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#4a7298] mb-4">{tBadge}</div>
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#082032] tracking-tight">{tTitle}</h2>
        </div>

        {/* Custom Tab Bar */}
        <div className="mb-12 flex items-center justify-center">
          <div className="flex items-center border border-primary/30 rounded-full p-1 bg-white shadow-sm overflow-x-auto">
            <button 
              onClick={() => handleFilterChange("All")}
              className={`px-6 py-2.5 text-[13px] font-bold whitespace-nowrap transition-colors rounded-full ${activeFilter === "All" ? "text-primary bg-[#E9F4F4]" : "text-gray-600 hover:bg-gray-50"}`}
            >
              All Reviews
            </button>
            <button 
              onClick={() => handleFilterChange("Google")}
              className={`px-6 py-2.5 text-[13px] font-bold whitespace-nowrap transition-colors rounded-full flex items-center gap-2 ${activeFilter === "Google" ? "text-primary bg-[#E9F4F4]" : "text-gray-600 hover:bg-gray-50"}`}
            >
               <span className="text-red-500 text-lg leading-none font-bold">G</span> Google
            </button>
            <button 
              onClick={() => handleFilterChange("LinkedIn")}
              className={`px-6 py-2.5 text-[13px] font-bold whitespace-nowrap transition-colors rounded-full flex items-center gap-2 ${activeFilter === "LinkedIn" ? "text-primary bg-[#E9F4F4]" : "text-gray-600 hover:bg-gray-50"}`}
            >
               <span className="text-[#0A66C2] font-black text-lg leading-none">in</span> LinkedIn
            </button>
          </div>
        </div>

        <div className="overflow-visible w-full">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * (isMobile ? 100 : 33.333)}%)` }}
          >
            {filteredTestimonials.map((testimonial, index) => (
              <div key={index} className="w-full md:w-1/3 shrink-0 px-3">
                <article className="bg-white rounded-[24px] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] p-8 flex flex-col relative pt-10 h-full">
                  
                  {/* Quote marks background */}
                  <div className="absolute -top-2 left-6 text-gray-100 font-serif text-[80px] leading-none pointer-events-none">
                    &ldquo;
                  </div>

                  <div className="relative z-10 flex-1">
                    <h3 className="text-[16px] font-bold text-[#082032] mb-3">{testimonial.title}</h3>
                    
                    <div className="flex text-[#facc15] mb-6" aria-label="5 star rating">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star key={starIndex} className="h-4 w-4 fill-current" />
                      ))}
                    </div>

                    <p className="text-[13px] leading-relaxed text-gray-500 font-medium mb-2">
                      {testimonial.text}
                    </p>
                    {testimonial.text.length > 100 && (
                      <button className="text-[12px] font-bold text-[#082032] underline hover:text-primary transition-colors mb-8 inline-block">
                        Read More
                      </button>
                    )}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-dashed border-gray-200 pt-6">
                    <div className="flex items-center gap-3">
                      <img src={testimonial.avatar} alt={testimonial.name} className="h-10 w-10 rounded-full object-cover border border-gray-100" />
                      <div>
                        <div className="text-[13px] font-bold text-[#082032] leading-tight">{testimonial.name}</div>
                        <div className="text-[11px] font-medium text-gray-500 mt-0.5">{testimonial.role}</div>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <div className="text-[9px] text-gray-400 font-bold uppercase mb-1 tracking-wider">Read on</div>
                      {testimonial.platform === 'Google' ? (
                         <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-lg font-bold text-red-500 shadow-sm">G</div>
                      ) : (
                         <div className="w-8 h-8 rounded-full bg-[#0A66C2] flex items-center justify-center text-sm font-bold text-white shadow-sm">in</div>
                      )}
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button onClick={handlePrev} aria-label="Previous testimonial" className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-500 hover:text-gray-700 transition-colors bg-white shadow-sm">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={handleNext} aria-label="Next testimonial" className="w-11 h-11 rounded-full border border-[#082032] flex items-center justify-center text-[#082032] hover:bg-[#082032] hover:text-white transition-colors bg-white shadow-sm">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Platform Stats */}
        <div className="mt-16 bg-white rounded-full border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] py-6 px-12 hidden md:flex items-center justify-between mx-auto max-w-5xl">
           <div className="flex flex-col items-center gap-1">
              <div className="text-xl font-bold text-blue-500 flex items-center gap-1"><span className="text-2xl">G</span>oogle</div>
              <div className="flex items-center gap-2 text-[12px] font-bold text-gray-500">
                 <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> 4.8/5 <span className="text-gray-300">•</span> 6,933 Reviews
              </div>
           </div>
           <div className="flex flex-col items-center gap-1">
              <div className="text-xl font-bold text-[#1877F2]">facebook</div>
              <div className="flex items-center gap-2 text-[12px] font-bold text-gray-500">
                 <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> 4.7/5 <span className="text-gray-300">•</span> 1,212 Reviews
              </div>
           </div>
           <div className="flex flex-col items-center gap-1">
              <div className="text-xl font-bold text-red-500 italic flex items-center gap-1.5"><span className="w-5 h-5 rounded bg-red-500 text-white flex items-center justify-center text-[10px] not-italic">S</span> switchup</div>
              <div className="flex items-center gap-2 text-[12px] font-bold text-gray-500 mt-1">
                 <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> 4.9/5 <span className="text-gray-300">•</span> 209 Reviews
              </div>
           </div>
           <div className="flex flex-col items-center gap-0">
              <div className="text-lg font-black text-green-600 uppercase tracking-tighter leading-none mt-1">COURSE<br/>REPORT</div>
              <div className="flex items-center gap-2 text-[12px] font-bold text-gray-500 mt-1.5">
                 <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> 4.8/5 <span className="text-gray-300">•</span> 403 Reviews
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}
