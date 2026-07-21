import Image from "next/image";
import { LeadModalButton } from "@/components/lead-modal-button";

// Region advisor photos from /public/advisors — picked by the page's country slug.
const ADVISOR_IMAGES = {
  africa: "/advisors/SimpliLead_Training_Africa_Advisor.png",
  europe: "/advisors/SimpliLead_Training_Europe_UK_Advisor.png",
  india: "/advisors/SimpliLead_Training_India_Advisor.png",
  middleEast: "/advisors/SimpliLead_Training_MIddle_East_Dubai_Advisor.png",
  southeastAsia: "/advisors/SimpliLead_Training_SouthEastAsia_Advisor.png",
  usCanada: "/advisors/SimpliLead_Training_US_Canada__Advisor.png",
} as const;

const COUNTRY_REGION: Record<string, keyof typeof ADVISOR_IMAGES> = {
  eg: "africa", ke: "africa", ng: "africa", za: "africa",
  gb: "europe", de: "europe", fr: "europe", nl: "europe", ch: "europe", ie: "europe",
  in: "india", bd: "india", lk: "india",
  ae: "middleEast", sa: "middleEast", qa: "middleEast", kw: "middleEast", om: "middleEast", bh: "middleEast",
  sg: "southeastAsia", my: "southeastAsia", th: "southeastAsia", id: "southeastAsia", ph: "southeastAsia", hk: "southeastAsia", au: "southeastAsia", nz: "southeastAsia",
  us: "usCanada", ca: "usCanada", br: "usCanada", mx: "usCanada",
};

export function AdvisorBanner({
  courseSlug,
  countrySlug,
  citySlug,
}: {
  courseSlug: string;
  countrySlug?: string;
  citySlug?: string;
}) {
  // ponytail: default to India — the bare /[course] page has no location.
  const region = (countrySlug && COUNTRY_REGION[countrySlug.toLowerCase()]) || "india";
  const src = ADVISOR_IMAGES[region];

  return (
    <section className="scroll-mt-24 pt-12 pb-12">
      <div className="bg-[#fff9eb] rounded-3xl overflow-hidden relative flex flex-col md:flex-row items-center">
        {/* Left Side: Image / Illustration Area */}
        <div className="w-full md:w-1/2 relative h-[250px] md:h-[300px] flex items-end justify-center">
          {/* Decorative Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square bg-orange-100/50 rounded-full blur-3xl pointer-events-none"></div>

          {/* Abstract geometric shapes */}
          <div className="absolute top-8 left-8 bg-white px-3 py-1.5 rounded-full shadow-sm flex gap-1 animate-pulse">
            <div className="w-2 h-2 rounded-full bg-orange-300"></div>
            <div className="w-8 h-2 rounded-full bg-gray-200"></div>
          </div>
          <div className="absolute top-16 right-16 bg-white px-3 py-1.5 rounded-full shadow-sm flex gap-1">
            <div className="w-2 h-2 rounded-full bg-green-300"></div>
            <div className="w-12 h-2 rounded-full bg-gray-200"></div>
          </div>

          <div className="w-full max-w-[300px] h-full relative z-10 flex items-end justify-center pt-8">
            <div className="w-64 h-64 bg-orange-200 rounded-t-full relative overflow-hidden border-4 border-white shadow-lg">
              <Image
                src={src}
                alt="SimpliLead learning advisor"
                fill
                sizes="256px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 p-8 md:p-12 md:pl-0 flex flex-col items-center md:items-start text-center md:text-left z-10">
          <div className="text-[13px] font-bold text-[#b45309] mb-3">
            Need more information?
          </div>
          <h2 className="text-[28px] md:text-[32px] font-bold text-[#082032] mb-8 leading-tight">
            Have more questions or need personalized guidance?
          </h2>
          <LeadModalButton
            courseSlug={courseSlug}
            countrySlug={countrySlug}
            citySlug={citySlug}
            source={`advisor-${courseSlug}`}
            title="Talk to a Learning Advisor"
            subtitle="Share your details and an advisor will call you back shortly."
            ctaLabel="Request a Callback"
            className="h-12 px-8 bg-[#082032] hover:bg-black text-white font-bold rounded-[4px] transition-colors text-[14px]"
          >
            Contact Learning Advisor
          </LeadModalButton>
        </div>
      </div>
    </section>
  );
}
