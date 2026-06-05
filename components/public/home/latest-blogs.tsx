"use client";

export function LatestBlogs() {
  const blogs = [
    {
      title: "A Complete Guide for Mastering Docker Networking",
      category: "DEVOPS",
      readTime: "76 mins read",
      author: "By ulearnsystems",
      avatar: "https://i.pravatar.cc/100?img=11",
      date: "3rd Jun, 2026",
      text: "Learn Docker Networking, network types, drivers, bridge and overlay networks, security, commands, and best...",
      bgClass: "bg-blue-100",
      imageText: "A Complete Guide for Mastering Docker Networking",
      imageTextColor: "text-[#1c4b79]"
    },
    {
      title: "What is a Network Diagram in Project Management: Types, Exam...",
      category: "PROJECT",
      readTime: "42 mins read",
      author: "By ulearnsystems",
      avatar: "https://i.pravatar.cc/100?img=5",
      date: "3rd Jun, 2026",
      text: "Understand What Is a Network Diagram in project management with easy examples. Learn diagram type...",
      bgClass: "bg-teal-50",
      imageText: "What is a Network Diagram in Project Management: Types, Examples & Best Practices Guide",
      imageTextColor: "text-[#1c4b79]"
    },
    {
      title: "Claude vs ChatGPT vs Gemini: Features, Pricing, Use Cases &...",
      category: "Generative AI",
      readTime: "29 mins read",
      author: "By ulearnsystems",
      avatar: "https://i.pravatar.cc/100?img=9",
      date: "3rd Jun, 2026",
      text: "Compare Claude vs ChatGPT vs Gemini. Explore features, pricing, performance, strengths, limitations,...",
      bgClass: "bg-cyan-50",
      imageText: "Claude vs ChatGPT vs Gemini: Which AI Tool is Best?",
      imageTextColor: "text-[#1c4b79]"
    }
  ];

  return (
    <section className="bg-white py-16 font-sans">
      <div className="container-tight max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="text-[11px] font-bold text-[#1c4b79] uppercase tracking-wider mb-2">
            LEARNER REVIEWS FROM THE WORLD OVER
          </div>
          <h2 className="text-3xl font-black text-[#082032]">
            Our Latest Blogs
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((b, i) => (
            <div key={i} className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-100 overflow-hidden flex flex-col h-full group hover:-translate-y-1 transition-transform duration-300">
              
              {/* Fake Image Area */}
              <div className={`relative aspect-[16/10] w-full ${b.bgClass} flex items-center justify-center p-6 text-center overflow-hidden`}>
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, black 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/40 blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/40 blur-xl"></div>
                
                <h3 className={`font-bold text-lg leading-snug relative z-10 ${b.imageTextColor}`}>
                  {b.imageText}
                </h3>
              </div>

              <div className="p-6 flex flex-col items-center flex-1 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-[11px] font-medium text-gray-500">{b.date}</span>
                  <span className="bg-[#1c4b79] text-white px-2 py-0.5 rounded-full font-bold text-[10px]">
                    {b.category}
                  </span>
                </div>

                <h4 className="text-[#082032] text-[15px] font-bold leading-snug mb-3 line-clamp-2 hover:text-[#1FA8A8] transition-colors cursor-pointer">
                  {b.title}
                </h4>
                
                <p className="text-[12px] text-gray-600 line-clamp-3 mb-6 flex-1 leading-relaxed">
                  {b.text}
                </p>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 font-medium w-full pt-4 border-t border-gray-100">
                  <img src={b.avatar} alt="Author" className="w-4 h-4 rounded-full" />
                  <span className="text-gray-600">{b.author}</span>
                  <span className="mx-0.5">•</span>
                  <span>{b.readTime}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
