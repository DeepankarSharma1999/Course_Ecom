import { Check, ShieldCheck, Award, Globe } from "lucide-react";

const TRAINERS = [
  {
    name: "Carl Pritchard",
    title: "Project Management Guru",
    companies: [ "BNY Mellon", "AT&T" ],
    photo: "/images/vendor/pexels/pexels-photo-220453.jpeg",
    color: "yellow",
    offset: false
  },
  {
    name: "Chris Ward",
    title: "Project Management Expert",
    companies: [ "iLinc", "PASSION" ],
    photo: "/images/vendor/pexels/pexels-photo-1043471.jpeg",
    color: "green",
    offset: true
  },
  {
    name: "Cristina Shuval",
    title: "Cyber Security Consultant",
    companies: [ "accenture", "FORTINET" ],
    photo: "/images/vendor/pexels/pexels-photo-415829.jpeg",
    color: "yellow",
    offset: false
  },
  {
    name: "Kevin Davis",
    title: "Project Management Expert",
    companies: [ "bmc", "CLARK" ],
    photo: "/images/vendor/pexels/pexels-photo-1222271.jpeg",
    color: "green",
    offset: true
  },
  {
    name: "Juan Galvan",
    title: "Digital Entrepreneur",
    companies: [ "KOBE", "QLE" ],
    photo: "/images/vendor/pexels/pexels-photo-91227.jpeg",
    color: "yellow",
    offset: false
  }
];

export function TrainersSection() {
  return (
    <section className="section bg-white font-sans py-24 overflow-hidden">
      <div className="container-tight max-w-[1200px]">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#4a7298] mb-4">Our Seasoned Support System</div>
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#082032] tracking-tight mb-4">Learn from Experts Who've Been There and Done That</h2>
        </div>

        {/* Top Stats Bar */}
        <div className="mx-auto mb-16 max-w-5xl bg-white rounded-full border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] py-6 px-10 hidden md:flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="text-primary"><Award className="w-8 h-8" /></div>
             <div>
               <div className="text-xl font-bold text-[#082032] leading-none mb-1">1,250+</div>
               <div className="text-[12px] text-gray-500 font-medium">Industry Experts</div>
             </div>
          </div>
          <div className="w-px h-10 bg-gray-200" />
          <div className="flex items-center gap-4">
             <div className="text-red-500"><ShieldCheck className="w-8 h-8" /></div>
             <div>
               <div className="text-xl font-bold text-[#082032] leading-none mb-1">400+</div>
               <div className="text-[12px] text-gray-500 font-medium">Comprehensive Courses</div>
             </div>
          </div>
          <div className="w-px h-10 bg-gray-200" />
          <div className="flex items-center gap-4">
             <div className="text-primary"><Check className="w-8 h-8" /></div>
             <div>
               <div className="text-xl font-bold text-[#082032] leading-none mb-1">300+</div>
               <div className="text-[12px] text-gray-500 font-medium">Agile Transformations Facilitated</div>
             </div>
          </div>
          <div className="w-px h-10 bg-gray-200" />
          <div className="flex items-center gap-4">
             <div className="text-red-500"><Globe className="w-8 h-8" /></div>
             <div>
               <div className="text-xl font-bold text-[#082032] leading-none mb-1">100+</div>
               <div className="text-[12px] text-gray-500 font-medium">Countries & Counting</div>
             </div>
          </div>
        </div>

        {/* Trainer Cards */}
        <div className="flex justify-start md:justify-center gap-6 overflow-x-auto pb-10 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {TRAINERS.map((trainer) => (
            <div key={trainer.name} className={`w-[220px] shrink-0 rounded-t-3xl rounded-b-[110px] bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.06)] relative flex flex-col pt-8 pb-0 items-center overflow-hidden transition-transform hover:-translate-y-2 ${trainer.offset ? 'mt-12' : ''}`}>
               
               {/* Gradient Background */}
               <div className={`absolute inset-0 z-0 opacity-80 ${trainer.color === 'yellow' ? 'bg-gradient-to-b from-white via-white to-[#fde047]' : 'bg-gradient-to-b from-white via-white to-[#86efac]'}`} />

               <div className="text-center px-4 mb-4 relative z-10">
                 <h3 className="text-[16px] font-bold text-[#082032] mb-1.5 leading-tight">{trainer.name}</h3>
                 <p className="text-[11px] text-gray-500 font-bold leading-tight">{trainer.title}</p>
               </div>
               
               <div className="relative z-10 flex flex-col items-center">
                 <div className="text-[9px] text-gray-400 mb-2 font-bold tracking-wider uppercase">Has worked with</div>
                 <div className="flex gap-3 mb-8 items-center justify-center opacity-80 bg-white/50 px-3 py-1.5 rounded-full">
                   {/* Mock company names */}
                   <span className="text-[11px] font-black text-[#082032]">{trainer.companies[0]}</span>
                   <span className="text-[11px] font-black text-blue-700">{trainer.companies[1]}</span>
                 </div>
               </div>

               {/* Cutout image at the bottom */}
               <div className="mt-auto relative w-full h-[220px] z-10">
                 {/* ponytail: raw img — trainer.photo is admin/DB-driven; next/image throws on unconfigured hosts. */}
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src={trainer.photo} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-center" alt={trainer.name} />
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
