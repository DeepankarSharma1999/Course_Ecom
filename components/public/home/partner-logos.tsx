export function PartnerLogos({ logos }: { logos: { name: string; logoUrl?: string }[] }) {
  return (
    <section className="bg-transparent relative z-20 -mt-16 md:-mt-20 mb-12 font-sans px-4">
      <div className="container-tight max-w-6xl">
        <div className="card p-8 md:p-10">
          <h2 className="text-center text-xl font-bold text-foreground mb-8 tracking-wide">
            Official Training Partner of the World's Most Trusted Governing Bodies
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
            {logos.map((logo, i) => (
              logo.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={logo.logoUrl} alt={logo.name} className="h-12 md:h-16 object-contain hover:scale-105 transition-transform drop-shadow-sm grayscale hover:grayscale-0 opacity-70 hover:opacity-100" />
              ) : (
                <span key={i} className="text-lg font-bold text-muted-foreground hover:text-foreground">{logo.name}</span>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
