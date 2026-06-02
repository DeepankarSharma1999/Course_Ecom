"use client";

import Image from "next/image";

const COMPANIES = [
  { name: "Cognizant", url: "https://upload.wikimedia.org/wikipedia/commons/4/43/Cognizant_logo_2022.svg" },
  { name: "Infosys", url: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" },
  { name: "Capgemini", url: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Capgemini_201x_logo.svg" },
  { name: "Accenture", url: "https://cdn.worldvectorlogo.com/logos/accenture-4.svg" },
  { name: "IBM", url: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
];

export function TrustedCompanies() {
  // Duplicate array to create a seamless loop
  const logos = [...COMPANIES, ...COMPANIES];

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

      <div className="relative w-full flex overflow-hidden group">
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
