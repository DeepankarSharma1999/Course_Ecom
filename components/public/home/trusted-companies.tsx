"use client";

import Image from "next/image";

const COMPANIES = [
  { name: "Cognizant", url: "/images/vendor/wikimedia/Cognizant_logo_2022.svg" },
  { name: "Infosys", url: "/images/vendor/wikimedia/Infosys_logo.svg" },
  { name: "Capgemini", url: "/images/vendor/wikimedia/Capgemini_201x_logo.svg" },
  { name: "Accenture", url: "/images/vendor/worldvectorlogo/accenture-4.svg" },
  { name: "IBM", url: "/images/vendor/wikimedia/IBM_logo.svg" },
  { name: "Meta", url: "/images/companies/meta.webp" },
  { name: "Bosch", url: "/images/companies/bosch.webp" },
  { name: "Amazon", url: "/images/companies/amazon.webp" },
  { name: "NVIDIA", url: "/images/companies/nvidia.webp" },
  { name: "TCS", url: "/images/companies/tcs.webp" },
  { name: "Microsoft", url: "/images/companies/microsoft.webp" },
];

export function TrustedCompanies() {
  // Duplicate array multiple times to create a seamless loop even on ultra-wide screens
  const base = [...COMPANIES, ...COMPANIES, ...COMPANIES, ...COMPANIES];
  const logos = [...base, ...base];

  return (
    <section className="py-10 bg-white font-sans overflow-hidden border-t border-gray-100">
      <div className="container-tight max-w-6xl text-center mb-8">
        <h3 className="text-[#082032] font-black text-2xl mb-1">
          Trusted by
        </h3>
        <p className="text-gray-500 text-sm">
          and 6,000+ companies across the globe
        </p>
      </div>

      <div className="relative w-full flex overflow-hidden group" style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
        {/* Marquee Container */}
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {logos.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="flex items-center justify-center bg-white border border-gray-100 rounded-lg shadow-sm px-6 py-4 mx-3 w-48 h-20 shrink-0 hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={company.url}
                  alt={company.name}
                  className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
