"use client";

import { useRouter, usePathname } from "next/navigation";
import { Globe } from "lucide-react";

type Option = { slug: string; name: string; currency?: string };

// Picking a country sets the pricing cookie to its currency and goes to its
// country page, so both price and location follow the selection.
export function FooterCountrySelect({ countries }: { countries: Option[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const current = countries.find((c) => pathname === `/${c.slug}` || pathname.startsWith(`/${c.slug}/`))?.slug ?? "";

  const onChange = (slug: string) => {
    const co = countries.find((c) => c.slug === slug);
    if (!co) return;
    if (co.currency) document.cookie = `mc_currency=${co.currency}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.push(`/${co.slug}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-brand-700 shrink-0" />
      <select
        aria-label="Select your country"
        value={current}
        onChange={(e) => onChange(e.target.value)}
        className="text-[13px] text-brand-800 bg-white border border-brand-200 rounded-lg px-3 py-2 hover:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-300 cursor-pointer"
      >
        <option value="" disabled>Select your country</option>
        {countries.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}{c.currency ? ` (${c.currency})` : ""}
          </option>
        ))}
      </select>
    </div>
  );
}
