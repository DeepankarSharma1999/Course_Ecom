export function PartnerLogos() {
  const visualLogos = [
    { name: "SAFe 6", el: <div className="text-[#cc0f35] font-black text-3xl flex flex-col items-center leading-none"><span>S</span><span className="text-[10px] text-gray-500 font-bold uppercase mt-1">SAFe 6</span></div> },
    { name: "IIBA", el: <div className="border-2 border-[#1c4b79] p-1 flex flex-col items-center"><div className="bg-[#1c4b79] text-white text-xs font-bold px-2 py-0.5">IIBA</div><div className="bg-[#1FA8A8] text-white text-[8px] font-bold px-1 py-0.5 leading-tight text-center">ENDORSED<br />PROVIDER</div></div> },
    { name: "Scrum Alliance", el: <div className="flex items-center gap-1.5 text-[#185e93]"><span className="text-[#1FA8A8] text-2xl">*</span><span className="font-serif text-sm font-bold leading-tight">Scrum<br />Alliance</span></div> },
    { name: "PMI", el: <div className="bg-[#592283] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xs border-[3px] border-[#31104e]">PMI</div> },
    { name: "ICAgile", el: <div className="text-[#136699] font-serif italic text-2xl tracking-tight">IC<span className="font-sans text-[#333] font-bold">Agile</span></div> },
    { name: "PeopleCert", el: <div className="w-12 h-12 rounded-full border-[3px] border-[#1FA8A8] flex items-center justify-center"><div className="w-9 h-9 rounded-full bg-[#1FA8A8] text-white flex items-center justify-center text-[8px] font-bold">PC</div></div> },
    { name: "LTP", el: <div className="w-12 h-12 rounded-full border-2 border-[#224b7a] flex items-center justify-center bg-[#f0f4f8] text-[#224b7a] font-black text-sm">LTP</div> },
  ];

  return (
    <section className="relative z-20 bg-white px-4 py-12 font-sans">
      <div className="container-tight max-w-6xl">
        <div className="rounded-xl border border-[#082032]/5 bg-white p-7 shadow-[0_16px_50px_rgba(8,32,50,0.08)] md:p-9">
          <h2 className="mb-8 text-center text-xs font-black uppercase tracking-[0.24em] text-muted-foreground">
            Built on globally recognised certification frameworks
          </h2>
          <div className="relative w-full max-w-full overflow-hidden [contain:paint]" style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>
            <div className="flex w-max animate-marquee gap-x-12 opacity-90 hover:[animation-play-state:paused]">
              <div className="flex items-center gap-x-12 pr-12">
                {visualLogos.map((logo, i) => (
                  <div key={`set1-${i}`} className="shrink-0 cursor-default opacity-80 transition-opacity hover:opacity-100" title={logo.name}>
                    {logo.el}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-x-12 pr-12" aria-hidden="true">
                {visualLogos.map((logo, i) => (
                  <div key={`set2-${i}`} className="shrink-0 cursor-default opacity-80 transition-opacity hover:opacity-100" title={logo.name}>
                    {logo.el}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
