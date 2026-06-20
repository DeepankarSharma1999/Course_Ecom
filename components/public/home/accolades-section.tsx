import { ChevronLeft, ChevronRight, Mail } from "lucide-react";
import Link from "next/link";

const ACCOLADES = [
  { title: "Employee Choice Award", org: "ULearnSystems rated Top 3 in Tech Firms", logo: "cube-icon" },
  { title: "Most Promising Brand", org: "ULearnSystems: Economic Times' Most Promising Brand 2022", logo: "ET" },
  { title: "Ed Company of the Year", org: "uG won VC Circle Education Company of the Year, Feb 2022", logo: "VCCIRCLE" },
  { title: "BW Top Ed Award 2023", org: "uG wins BW Top Education Award 2023", logo: "BWEDUCATION" },
  { title: "Special Commendation", org: "uG's DS Program Special Commendation", logo: "H" },
  { title: "Excellence in EdTech", org: "National Education Awards 2023", logo: "EDU" },
];

const LOGOS = [
  "Business Standard", "ET BRAND EQUITY", "THE TIMES OF INDIA", "Hindustan Times", "moneycontrol", "Bloomberg", "FINANCIAL EXPRESS", "YOURSTORY", "CXOToday.com", "EXPRESS COMPUTER"
];

export function AccoladesSection() {
  return (
    <section className="font-sans w-full overflow-hidden bg-white">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}} />

      {/* 1. Accolades Marquee */}
      <div className="py-20 border-b border-gray-100">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#4a7298] mb-4">ULEARNSYSTEMS AWARDS AND RECOGNITION</div>
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#082032] tracking-tight">Our Commitment to Quality,<br/>Reflected in Accolades</h2>
        </div>
        
        {/* Marquee Container */}
        <div className="relative flex overflow-hidden group max-w-[100vw]">
          <div className="animate-marquee flex gap-6 py-6 pr-6 w-max shrink-0">
             {[...ACCOLADES, ...ACCOLADES, ...ACCOLADES].map((accolade, i) => (
                <div key={`a-${i}`} className="w-[280px] shrink-0 bg-white rounded-[24px] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] p-8 flex flex-col items-center text-center">
                   <div className="h-[80px] flex items-center justify-center mb-6 w-full">
                      {accolade.logo === "ET" && <div className="bg-[#E42E35] text-white font-serif text-4xl font-bold px-4 py-2 leading-none">ET</div>}
                      {accolade.logo === "VCCIRCLE" && <div className="bg-black text-white text-xl font-bold px-4 py-2 uppercase tracking-tighter leading-none">VCCIRCLE</div>}
                      {accolade.logo === "BWEDUCATION" && <div className="text-xl font-black text-blue-600">BW<span className="text-red-500">EDUC</span>TION</div>}
                      {accolade.logo === "cube-icon" && <div className="text-blue-600 text-[60px] leading-none">⬢</div>}
                      {accolade.logo === "H" && <div className="text-orange-400 font-serif text-[60px] leading-none">H</div>}
                      {accolade.logo === "EDU" && <div className="text-green-600 font-bold text-3xl leading-none border-2 border-green-600 p-2">EDU</div>}
                   </div>
                   <h3 className="text-[15px] font-bold text-[#082032] mb-3 whitespace-normal leading-tight">{accolade.title}</h3>
                   <p className="text-[12px] text-gray-500 font-medium whitespace-normal leading-relaxed">{accolade.org}</p>
                </div>
             ))}
          </div>
          {/* Duplicate for seamless looping */}
          <div className="animate-marquee flex gap-6 py-6 pr-6 w-max shrink-0" aria-hidden="true">
             {[...ACCOLADES, ...ACCOLADES, ...ACCOLADES].map((accolade, i) => (
                <div key={`b-${i}`} className="w-[280px] shrink-0 bg-white rounded-[24px] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] p-8 flex flex-col items-center text-center">
                   <div className="h-[80px] flex items-center justify-center mb-6 w-full">
                      {accolade.logo === "ET" && <div className="bg-[#E42E35] text-white font-serif text-4xl font-bold px-4 py-2 leading-none">ET</div>}
                      {accolade.logo === "VCCIRCLE" && <div className="bg-black text-white text-xl font-bold px-4 py-2 uppercase tracking-tighter leading-none">VCCIRCLE</div>}
                      {accolade.logo === "BWEDUCATION" && <div className="text-xl font-black text-blue-600">BW<span className="text-red-500">EDUC</span>TION</div>}
                      {accolade.logo === "cube-icon" && <div className="text-blue-600 text-[60px] leading-none">⬢</div>}
                      {accolade.logo === "H" && <div className="text-orange-400 font-serif text-[60px] leading-none">H</div>}
                      {accolade.logo === "EDU" && <div className="text-green-600 font-bold text-3xl leading-none border-2 border-green-600 p-2">EDU</div>}
                   </div>
                   <h3 className="text-[15px] font-bold text-[#082032] mb-3 whitespace-normal leading-tight">{accolade.title}</h3>
                   <p className="text-[12px] text-gray-500 font-medium whitespace-normal leading-relaxed">{accolade.org}</p>
                </div>
             ))}
          </div>
        </div>
      </div>

      {/* 2. Spotlight Section */}
      <div className="py-20 pb-24 relative">
        <div className="mx-auto mb-16 max-w-4xl text-center px-4">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#4a7298] mb-4">ULEARNSYSTEMS NEWS AND INSIGHTS</div>
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#082032] tracking-tight mb-12">ULearnSystems in the Spotlight</h2>
          
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500 max-w-5xl mx-auto">
             {LOGOS.map((logo, i) => (
                <div key={i} className="flex items-center justify-center shrink-0">
                  <svg width="140" height="40" viewBox="0 0 140 40" className="w-auto h-8 md:h-10">
                    <rect width="140" height="40" rx="4" fill="transparent" />
                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill={i%2===0 ? '#e11d48' : '#082032'} fontSize="14" fontWeight="900" fontFamily="sans-serif" letterSpacing="-0.5">
                      {logo}
                    </text>
                  </svg>
                </div>
             ))}
          </div>
        </div>

        {/* 3. Featured Spotlight Carousel */}
        <div className="max-w-4xl mx-auto px-4 relative z-10 mt-20">
           <div className="absolute left-1/2 -top-12 -translate-x-1/2 flex items-center gap-4 w-full max-w-3xl justify-center">
              <div className="h-px bg-gray-200 flex-1"></div>
              <p className="text-[12px] text-[#4a7298] font-bold tracking-wide whitespace-nowrap px-4">We steal the spotlight sometimes, but our learners are the real stars.</p>
              <div className="h-px bg-gray-200 flex-1"></div>
           </div>

           <div className="flex items-center justify-between gap-6">
              <button className="w-10 h-10 shrink-0 rounded-full border border-gray-300 flex items-center justify-center text-[#082032] hover:bg-gray-50 transition-colors bg-white shadow-sm z-20">
                 <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex-1 bg-white rounded-[24px] border border-gray-200 shadow-[0_15px_50px_rgba(0,0,0,0.06)] p-3 flex flex-col md:flex-row items-center gap-6">
                 <div className="w-full md:w-[240px] h-[160px] rounded-2xl overflow-hidden shrink-0 bg-gray-100">
                    <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600" className="w-full h-full object-cover" alt="Team" />
                 </div>
                 <div className="flex-1 pr-0 md:pr-8 py-4 md:py-0 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-3 gap-2">
                       <h3 className="text-xl font-bold text-[#082032]">Business Standard</h3>
                       <div className="text-red-700 font-serif font-black text-2xl tracking-tighter">BS</div>
                    </div>
                    <p className="text-[14px] text-gray-500 font-medium mb-6">ULearnSystems crosses 10 million enrollments across 100+ nations!</p>
                    <Link href="#" className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gray-200 text-[13px] font-bold text-[#082032] hover:border-gray-400 transition-colors">
                       Read more <span className="text-[10px]">↗</span>
                    </Link>
                 </div>
              </div>

              <button className="w-10 h-10 shrink-0 rounded-full border border-gray-300 flex items-center justify-center text-[#082032] hover:bg-gray-50 transition-colors bg-white shadow-sm z-20">
                 <ChevronRight className="w-5 h-5" />
              </button>
           </div>
        </div>
      </div>

      {/* 4. Theme CTA Banner */}
      <div className="bg-[#f8fcfc] w-full py-12 relative overflow-hidden flex items-center justify-center mt-10">
         {/* Background Grid Pattern */}
         <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(31,168,168,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(31,168,168,0.3) 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
         
         {/* Decorative Elements */}
         <div className="absolute top-1/4 left-[15%] w-4 h-4 border-[3px] border-primary rounded-full hidden lg:block"></div>
         <div className="absolute bottom-1/4 right-[15%] w-4 h-4 border-[3px] border-primary rounded-full hidden lg:block"></div>
         <div className="absolute top-1/3 right-[25%] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-primary hidden lg:block"></div>
         <div className="absolute bottom-1/3 left-[25%] w-4 h-4 text-primary text-2xl leading-none font-black hidden lg:block">+</div>

         <div className="container-tight relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-16 max-w-6xl w-full">
            {/* Woman Image Placeholder */}
            <div className="w-[180px] h-[180px] -mt-20 md:mt-0 relative hidden md:block shrink-0">
               <img src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=300" className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl" alt="Support" />
               <div className="absolute top-4 -left-16 bg-white rounded-xl shadow-lg p-3 flex items-center gap-3">
                 <Mail className="text-primary w-5 h-5" />
                 <div className="w-16 h-2 bg-gray-100 rounded-full"></div>
               </div>
            </div>

            <div className="text-center md:text-left flex flex-col items-center md:items-start flex-1">
               <div className="text-[12px] font-black uppercase tracking-widest text-[#082032] mb-3 opacity-90">GOT MORE QUESTIONS? WE'VE GOT ANSWERS.</div>
               <h2 className="text-[32px] md:text-[38px] font-black text-[#082032] tracking-tight leading-tight">Book a free Counselling Session today.</h2>
            </div>
            
            <div className="shrink-0 mt-6 md:mt-0">
               <button className="bg-primary text-white px-8 py-4 rounded font-bold text-[16px] shadow-[0_10px_20px_rgba(31,168,168,0.3)] hover:bg-primary/90 transition-colors flex items-center gap-2">
                  Request a Call Back <ChevronRight className="w-5 h-5" />
               </button>
            </div>
         </div>
      </div>
    </section>
  );
}
