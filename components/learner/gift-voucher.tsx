"use client";

import Link from "next/link";
import { Gift } from "lucide-react";

export function GiftVoucherBanner() {
  return (
    <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 flex flex-col md:flex-row gap-6 relative border border-primary/20 items-center justify-between">
      <div className="w-full md:w-3/5">
        <div className="flex items-center gap-2 text-primary font-bold text-[13px] uppercase tracking-wider mb-2">
          <Gift className="w-4 h-4" /> Gift Voucher for You
        </div>
        <h3 className="text-[22px] font-extrabold text-ink-900 leading-tight mb-3">
          A Smarter Way to Gift Learning
        </h3>
        <p className="text-[14px] text-ink-600 mb-6 max-w-[400px]">
          Gift access to world-class Agile training with Simplilead gift cards learning made flexible and meaningful.
        </p>
        <Link href="/home/gifts" className="inline-block bg-primary hover:bg-[#0f6b6b] text-white font-bold px-6 py-2.5 rounded-lg transition-colors text-[14px] shadow-sm">
          Buy Gift Card
        </Link>
      </div>

      <div className="w-full md:w-2/5 flex justify-center md:justify-end">
        <img 
          src="/images/vendor/unsplash/photo-1549465220-1a8b9238cd48.jpg" 
          alt="Gift Learning" 
          className="w-[200px] h-[200px] object-cover rounded-full border-4 border-white shadow-xl"
        />
      </div>
    </div>
  );
}
