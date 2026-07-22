import Image from "next/image";
import { type CourseContent } from "@/lib/seed-data";
import { defaultCertificate } from "@/lib/course-section-defaults";

export function CertificateSection({ course }: { course: CourseContent }) {
  const isCSM = course.slug.includes("csm");
  const certName = isCSM ? "CSM" : course.shortTitle;

  // Per-course override from admin, else computed defaults.
  const cert = course.pageSections?.certificate;
  // Exactly two designs: courses with the body's real sample certificate on file
  // (cert.image, set by scripts/assign-certificates.js) show that image; every
  // other course shows the SimpliLEAD-branded certificate — never a mock-official
  // design under an external body's name.
  const fallback = defaultCertificate(course);
  const heading = cert?.heading || fallback.heading;
  const body = cert?.body || fallback.body;

  return (
    <section className="scroll-mt-24 pt-12 border-t border-gray-100">
      <div className="text-[10px] md:text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-2 break-words">
        GET THE {certName} CERTIFICATION
      </div>
      <h2 className="text-[26px] md:text-[32px] font-bold text-[#082032] mb-6 break-words leading-tight">{heading}</h2>

      <p className="text-[14px] text-[#475569] leading-relaxed mb-10">{body}</p>

      {cert?.image ? (
        <div className="relative w-full max-w-4xl mx-auto">
          <img src={cert.image} alt={`${certName} certificate`} className="w-full rounded-2xl border border-gray-200 shadow-xl" loading="lazy" />
          <div className="text-right mt-4 flex items-center justify-end gap-2 text-gray-500 text-sm font-semibold">
            Shareable on <span className="font-black text-[#0a66c2] text-xl flex items-center">Linked<span className="bg-[#0a66c2] text-white px-1 rounded ml-0.5 text-lg">in</span></span>
          </div>
        </div>
      ) : (
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Background blobs for the certificate */}
        <div className="absolute top-1/2 left-0 w-64 h-32 bg-[#e8f3e8] rounded-[100px] -rotate-45 -translate-x-10 -translate-y-1/2 -z-10 blur-xl"></div>
        <div className="absolute top-1/2 right-0 w-64 h-32 bg-[#e8f3e8] rounded-[100px] rotate-45 translate-x-10 -translate-y-1/2 -z-10 blur-xl"></div>

        {/* SimpliLEAD-issued certificate of achievement */}
        <div className="rounded-2xl border-4 border-brand-700 p-2 bg-white shadow-xl relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-50 to-white -z-10"></div>
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-28 h-28 bg-brand-700 [clip-path:polygon(0_0,100%_0,0_100%)]"></div>
          <div className="absolute top-1 left-1 w-28 h-28 bg-accent-500 [clip-path:polygon(0_0,100%_0,0_100%)] translate-x-2 translate-y-2 -z-[1]"></div>
          <div className="absolute bottom-0 right-0 w-28 h-28 bg-brand-700 [clip-path:polygon(100%_100%,100%_0,0_100%)]"></div>
          <div className="absolute bottom-1 right-1 w-28 h-28 bg-accent-500 [clip-path:polygon(100%_100%,100%_0,0_100%)] -translate-x-2 -translate-y-2 -z-[1]"></div>

          <div className="border border-brand-200 p-10 md:p-16 text-center h-full flex flex-col items-center justify-center">
            <img src="/brand/simplilead-logo.png" alt="SimpliLEAD" className="h-10 md:h-12 w-auto mb-6" loading="lazy" />
            <h4 className="text-brand-800 font-bold text-lg md:text-2xl mb-1 tracking-[0.3em] uppercase">Certificate of Achievement</h4>
            <div className="w-24 border-b-2 border-accent-500 mb-8"></div>

            <p className="text-gray-500 text-sm mb-4">This is to certify that the holder has successfully completed</p>
            <h3 className="text-2xl md:text-4xl font-serif text-[#082032] mb-6 italic">{course.title}</h3>

            <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed mb-12">
              having fulfilled all prescribed requirements of the program, and is hereby awarded this certificate by SimpliLEAD in recognition of that accomplishment.
            </p>

            <div className="flex flex-col sm:flex-row justify-between w-full max-w-2xl px-2 md:px-8 items-center sm:items-end mt-auto gap-6 sm:gap-0">
              <div className="text-center order-2 sm:order-1">
                <div className="w-24 md:w-32 border-b border-gray-400 mb-2 mx-auto"></div>
                <div className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest">Lead Trainer</div>
              </div>

              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-brand-600 bg-brand-50 flex items-center justify-center relative order-1 sm:order-2 shrink-0">
                <div className="absolute inset-1.5 md:inset-2 border border-brand-600 rounded-full border-dashed"></div>
                <div className="text-[8px] md:text-[10px] font-black text-brand-700 uppercase text-center leading-tight">
                  SimpliLEAD<br/>Certified
                </div>
              </div>

              <div className="text-center order-3">
                <div className="w-24 md:w-32 border-b border-gray-400 mb-2 mx-auto"></div>
                <div className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest">Director of Training</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-right mt-4 flex items-center justify-end gap-2 text-gray-500 text-sm font-semibold">
          Shareable on <span className="font-black text-[#0a66c2] text-xl flex items-center">Linked<span className="bg-[#0a66c2] text-white px-1 rounded ml-0.5 text-lg">in</span></span>
        </div>
      </div>
      )}
    </section>
  );
}
