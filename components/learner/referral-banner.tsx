import Link from "next/link";

export function ReferralBanner() {
  return (
    <div className="bg-gradient-to-br from-[#00b4d8] to-[#0284c7] rounded-2xl p-6 relative overflow-hidden h-[180px] flex text-white shadow-md">
      
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4"></div>

      {/* Image Placeholder */}
      <div className="w-[45%] h-full flex items-end relative z-10">
        <img 
          src="/images/vendor/unsplash/photo-1573496359142-b8d87734a5a2.jpg" 
          alt="Referral" 
          className="w-full h-auto object-cover rounded-xl shadow-lg -mb-2 border-2 border-white/20"
        />
      </div>

      {/* Content */}
      <div className="flex-1 pl-6 flex flex-col justify-center relative z-10">
        <h3 className="text-[18px] font-extrabold leading-tight mb-1">
          More you refer,<br/>More you earn!
        </h3>
        <p className="text-[12px] text-white/90 font-medium mb-3">
          Share, Get Paid & Repeat.
        </p>
        
        <Link
          href="/home/referral"
          className="bg-transparent border border-white text-white hover:bg-white hover:text-[#0284c7] text-[11px] font-bold px-4 py-1.5 rounded-full transition-colors w-fit"
        >
          Get your referral link
        </Link>
      </div>
    </div>
  );
}
