import Image from "next/image";
import { type CourseContent } from "@/lib/seed-data";

export function CertificateSection({ course }: { course: CourseContent }) {
  const isCSM = course.slug.includes("csm");
  const certName = isCSM ? "CSM" : course.shortTitle;

  return (
    <section className="scroll-mt-24 pt-12 border-t border-gray-100">
      <div className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">
        GET THE {certName} CERTIFICATION
      </div>
      <h2 className="text-[32px] font-bold text-[#082032] mb-6">Earn the Coveted {certName} Credential</h2>
      
      <p className="text-[14px] text-[#475569] leading-relaxed mb-10">
        Earning the {course.shortTitle} certification goes beyond acquiring a new skill—it's validation of your mastery. This certification isn't just a certificate; it's a testament to your dedication and expertise. It unlocks a realm of opportunities in your professional journey, signaling to employers and peers that you possess the knowledge and commitment to excel in guiding projects with agility and efficiency. You also get access to the global community and free resources.
      </p>

      <div className="relative w-full max-w-4xl mx-auto">
        {/* Background blobs for the certificate */}
        <div className="absolute top-1/2 left-0 w-64 h-32 bg-[#e8f3e8] rounded-[100px] -rotate-45 -translate-x-10 -translate-y-1/2 -z-10 blur-xl"></div>
        <div className="absolute top-1/2 right-0 w-64 h-32 bg-[#e8f3e8] rounded-[100px] rotate-45 translate-x-10 -translate-y-1/2 -z-10 blur-xl"></div>
        
        <div className="rounded-2xl border-4 border-[#cbd5e1] p-2 bg-white shadow-xl relative z-10 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#f8fafc] to-[#f1f5f9] -z-10"></div>
          
          {/* Certificate Inner Border */}
          <div className="border border-[#e2e8f0] p-10 md:p-16 text-center h-full flex flex-col items-center justify-center">
            <h4 className="text-[#082032] font-bold text-xl md:text-2xl mb-8 tracking-widest uppercase opacity-80">{course.accreditedBy || "Global Certification Body"}</h4>
            
            <p className="text-gray-500 text-sm mb-4">is awarded the designation</p>
            <h3 className="text-2xl md:text-4xl font-serif text-[#082032] mb-6 italic">{course.title}</h3>
            
            <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed mb-12">
              for completing the prescribed requirements for this certification and is hereby entitled to all privileges and benefits offered.
            </p>

            <div className="flex justify-between w-full max-w-2xl px-8 items-end mt-auto">
              <div className="text-center">
                <div className="w-32 border-b border-gray-400 mb-2"></div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Certified Trainer</div>
              </div>
              
              <div className="w-20 h-20 rounded-full border-4 border-yellow-400 bg-yellow-50 flex items-center justify-center relative">
                <div className="absolute inset-2 border border-yellow-400 rounded-full border-dashed"></div>
                <div className="text-[10px] font-black text-yellow-600 uppercase text-center leading-tight">
                  Certified<br/>Award
                </div>
              </div>

              <div className="text-center">
                <div className="w-32 border-b border-gray-400 mb-2"></div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Chairman of Board</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-right mt-4 flex items-center justify-end gap-2 text-gray-500 text-sm font-semibold">
          Shareable on <span className="font-black text-[#0a66c2] text-xl flex items-center">Linked<span className="bg-[#0a66c2] text-white px-1 rounded ml-0.5 text-lg">in</span></span>
        </div>
      </div>
    </section>
  );
}
