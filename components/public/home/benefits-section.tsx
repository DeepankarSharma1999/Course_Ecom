import { ChevronLeft, ChevronRight, Play } from "lucide-react";

export function BenefitsSection() {
  return (
    <section className="section bg-white font-sans overflow-hidden py-24 relative">
      <div className="absolute inset-0 top-0 h-[400px] z-0 pointer-events-none opacity-40 flex justify-center">
        <div className="w-full max-w-4xl h-full border-x border-b border-gray-100 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container-tight relative z-10 max-w-[1100px]">
        
        {/* Header Section */}
        <div className="mx-auto mb-16 text-center max-w-2xl">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#4a7298] mb-4">
            Ulearnsystems' Unique Pedagogy
          </div>
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#082032] tracking-tight mb-4">
            Experience Immersive Learning
          </h2>
          <p className="text-[14px] leading-relaxed text-gray-500 max-w-xl mx-auto font-medium">
            Join the learning revolution with the ultimate AI-Powered Integrated Learning
            Platform. Designed to provide a highly engaging, immersive learning experience,
            it's always YOU at the centre of the learning.
          </p>
        </div>

        {/* Carousel Container - Step 1 */}
        <div className="relative flex items-center justify-center">
          
          <div className="w-full bg-white rounded-[100px] border border-[#e0e8f0] shadow-[0_10px_40px_rgba(0,0,0,0.03)] px-12 py-10 md:px-20 md:py-16 flex flex-col md:flex-row items-center gap-12 z-20">
            
            {/* Left Content */}
            <div className="flex-1 max-w-[350px] flex gap-8 items-start">
              <div className="w-[72px] h-[72px] shrink-0 rounded-[20px] border-2 border-primary bg-white flex items-center justify-center text-primary font-black text-2xl shadow-sm">
                1
              </div>
              <div className="mt-1">
                <h3 className="text-2xl font-bold text-[#082032] mb-4">Learn</h3>
                <p className="text-[13px] text-gray-500 leading-[1.8] font-medium pr-4">
                  Choose from live instructor-led training, on-demand courses, or a blended approach.
                  Master in-demand skills with a comprehensive curriculum, engaging resources, and one-on-one mentoring.
                </p>
              </div>
            </div>

            {/* Right Graphic Collage */}
            <div className="flex-1 relative h-[350px] w-full flex items-center justify-center">
              
              {/* Main Pale Green Base */}
              <div className="absolute bottom-[5%] w-[85%] h-[35%] bg-[#dff0ea] rounded-xl z-0" />
              
              {/* Desktop Video Mockup */}
              <div className="absolute bottom-[10%] right-[10%] w-[55%] h-[45%] bg-white rounded-t-xl shadow-md border-x border-t border-gray-100 z-10 p-1.5 flex flex-col">
                 <div className="flex-1 bg-gray-200 rounded-md overflow-hidden relative flex">
                    <img src="/images/vendor/pexels/pexels-photo-415829.jpeg" className="w-full h-full object-cover" alt="Student" />
                    <img src="/images/vendor/pexels/pexels-photo-1043471.jpeg" className="w-1/3 h-full object-cover border-l border-white" alt="Student" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 bg-black/50 rounded-full flex items-center justify-center"><Play className="w-3 h-3 text-white ml-0.5" /></div>
                    </div>
                 </div>
              </div>

              {/* AWS Course Outline */}
              <div className="absolute top-[10%] right-[5%] w-[45%] bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100 p-5 z-20">
                 <div className="text-[11px] font-bold text-[#082032] mb-4">AWS Certified Cloud Practitioner</div>
                 <div className="space-y-3">
                   <div className="flex items-center gap-2 text-[10px] font-medium text-gray-500">
                     <div className="w-2.5 h-2.5 rounded-full border border-gray-300" /> Course Overview
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-medium text-gray-500">
                     <div className="w-2.5 h-2.5 rounded-full border border-primary bg-primary/10" /> Introduction to Cloud Concepts
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-medium text-gray-500">
                     <div className="w-2.5 h-2.5 rounded-full border border-gray-300" /> Cloud Security and Compliance
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-medium text-gray-500">
                     <div className="w-2.5 h-2.5 rounded-full border border-gray-300" /> Cloud Technology and Services
                   </div>
                 </div>
                 
                 {/* Floating "Learn from the Best" green block */}
                 <div className="absolute -right-8 top-12 bg-[#dff0ea] rounded-xl p-3.5 w-[110px] shadow-lg flex flex-col items-center text-center">
                    <div className="text-[10px] font-bold text-[#082032] mb-1">Learn<br/>from the Best</div>
                    <div className="text-[7px] leading-tight text-[#082032]/70 mb-3">Learn from the industry's top 1% Instructors and Experts</div>
                    <div className="w-5 h-5 bg-[#082032] rounded flex items-center justify-center text-white"><ChevronRight className="w-3.5 h-3.5" /></div>
                 </div>
              </div>

              {/* Chat / Avatars UI */}
              <div className="absolute top-[15%] left-[5%] w-[45%] z-20">
                 <div className="bg-[#082032] text-white text-[10px] px-4 py-2 rounded-full w-max mb-3 relative flex items-center gap-2">
                   What is SAAS?
                   <span className="text-gray-400">Ask</span>
                   <div className="w-4 h-4 bg-gray-200 rounded-full overflow-hidden absolute -right-2 -top-2 border border-white">
                      <img src="/images/vendor/pexels/pexels-photo-220453.jpeg" alt="" />
                   </div>
                 </div>
                 <div className="grid grid-cols-3 gap-1.5 w-max">
                    <img src="/images/vendor/pexels/pexels-photo-220453.jpeg" className="w-[50px] h-[50px] rounded-lg object-cover" alt="" />
                    <img src="/images/vendor/pexels/pexels-photo-1043471.jpeg" className="w-[50px] h-[50px] rounded-lg object-cover" alt="" />
                    <img src="/images/vendor/pexels/pexels-photo-415829.jpeg" className="w-[50px] h-[50px] rounded-lg object-cover" alt="" />
                 </div>
              </div>

              {/* Graph Card */}
              <div className="absolute bottom-[20%] left-[0%] w-[35%] bg-[#dff0ea] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-[#a2d8c6] p-4 z-30">
                 <div className="flex items-center justify-between mb-2">
                   <div className="text-[16px] font-black text-[#082032]">1.2K</div>
                   <div className="bg-[#082032] text-white text-[7px] px-2 py-0.5 rounded-full">Engagement</div>
                 </div>
                 <div className="w-full h-12 border-b border-l border-[#082032]/20 relative">
                    <svg className="w-full h-full text-[#082032]" viewBox="0 0 100 40" preserveAspectRatio="none">
                      <polyline points="0,35 20,25 40,30 60,10 80,15 100,5" fill="none" stroke="currentColor" strokeWidth="2" />
                      <circle cx="20" cy="25" r="2" fill="currentColor" />
                      <circle cx="60" cy="10" r="2" fill="currentColor" />
                      <circle cx="80" cy="15" r="2" fill="currentColor" />
                    </svg>
                 </div>
              </div>
              
            </div>
            
          </div>

          {/* Next Step Preview (Right Side peeking in) */}
          <div className="hidden xl:flex absolute right-[-250px] w-[350px] bg-white rounded-[100px] border border-[#e0e8f0] shadow-[0_10px_40px_rgba(0,0,0,0.03)] px-12 h-full items-center z-10 opacity-60">
             <div className="w-[72px] h-[72px] shrink-0 rounded-[20px] border-2 border-red-500 bg-white flex items-center justify-center text-red-500 font-black text-2xl shadow-sm">
                2
             </div>
          </div>
          
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-500 hover:text-gray-600 transition-colors bg-white">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-[13px] font-bold text-[#082032]">1 / 5</div>
          <button className="w-8 h-8 rounded-full border border-[#082032] flex items-center justify-center text-[#082032] hover:bg-[#082032] hover:text-white transition-colors bg-white">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Prism Section */}
        <div className="mt-24 max-w-[900px] mx-auto flex flex-col md:flex-row items-center gap-12 relative border border-[#e0e8f0] rounded-[32px] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.02)] bg-white overflow-hidden">
           
           <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,#f1f5f9_2px,transparent_2px)] bg-[size:10px_10px] opacity-60" />

           <div className="relative w-[400px] flex-shrink-0">
             {/* Small dot cluster icon */}
             <div className="absolute -left-6 -top-6 w-12 h-12 bg-white border border-gray-100 shadow-sm rounded-full flex items-center justify-center z-20">
               <div className="grid grid-cols-2 gap-1.5">
                 <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                 <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                 <div className="w-2 h-2 rounded-full bg-red-400"></div>
                 <div className="w-2 h-2 rounded-full bg-teal-500"></div>
               </div>
             </div>
             
             <div className="w-full h-[220px] bg-[#fcf9f2] rounded-[24px] border border-gray-100 relative p-4 flex gap-6 overflow-hidden">
                <div className="w-[150px] h-full rounded-[16px] overflow-hidden relative shadow-sm">
                  <img src="/images/vendor/pexels/pexels-photo-415829.jpeg" loading="lazy" decoding="async" className="w-full h-full object-cover" alt="Student learning online" />
                  
                  {/* Large floating play button */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform z-10">
                     <Play className="w-5 h-5 ml-1" fill="currentColor" />
                  </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center gap-3 relative py-4">
                   {/* cycle graphic mock */}
                   <div className="w-10 h-8 bg-[#4e6bf2] rounded text-white flex items-center justify-center shadow-sm"><Play className="w-4 h-4" fill="currentColor" /></div>
                   <div className="text-[10px] font-bold text-gray-500 tracking-wider">LEARN</div>
                   <div className="w-10 h-8 bg-blue-400 rounded text-white flex items-center justify-center text-[11px] font-bold shadow-sm">&lt;/&gt;</div>
                   <div className="text-[10px] font-bold text-gray-500 tracking-wider">PRACTICE</div>
                   
                   {/* Connecting arrows mock */}
                   <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100">
                     <path d="M 20 40 Q 50 10 80 40" fill="none" stroke="#082032" strokeWidth="2" strokeDasharray="4 4" />
                     <path d="M 80 60 Q 50 90 20 60" fill="none" stroke="#082032" strokeWidth="2" strokeDasharray="4 4" />
                   </svg>
                </div>
             </div>
           </div>

           <div className="relative z-10 flex-1 pl-4">
             <div className="text-[11px] font-bold uppercase tracking-widest text-[#4a7298] mb-3">
               Ulearnsystems' Prism
             </div>
             <h3 className="text-[26px] md:text-[28px] font-bold text-[#082032] mb-6 leading-tight">
               Get a Peek Into Our AI-Based Immersive Learning Platform
             </h3>
             <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center shadow-sm bg-white">
                  <span className="text-[14px]">🐍</span>
                </div>
                <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center shadow-sm bg-white">
                  <span className="text-[14px]">☕</span>
                </div>
             </div>
           </div>
        </div>

      </div>
    </section>
  );
}
