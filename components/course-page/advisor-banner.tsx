import Image from "next/image";

export function AdvisorBanner() {
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
            <div className="w-64 h-64 bg-orange-200 rounded-t-full relative overflow-hidden flex items-center justify-center border-4 border-white shadow-lg">
                <div className="absolute bottom-0 w-full h-[80%] bg-orange-300"></div>
                <span className="text-orange-800 font-bold text-xl relative z-10">Advisor Image</span>
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
          <button className="h-12 px-8 bg-[#082032] hover:bg-black text-white font-bold rounded-[4px] transition-colors text-[14px]">
            Contact Learning Advisor
          </button>
        </div>
      </div>
    </section>
  );
}
