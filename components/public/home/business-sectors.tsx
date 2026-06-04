import Image from "next/image";
import { Trophy, Target, Heart } from "lucide-react";
import Link from "next/link";

export function BusinessSectors() {
  return (
    <section className="py-20 bg-white font-sans overflow-hidden">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Image Collage */}
          <div className="relative h-[440px] sm:h-[600px] w-full flex justify-center sm:block mb-8 sm:mb-0 mt-4 sm:mt-0">
            <div className="relative w-[320px] h-[400px] sm:w-full sm:h-full shrink-0">
              {/* Top Left Image */}
              <div className="absolute top-0 left-0 w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-3xl overflow-hidden shadow-lg z-20">
                <div className="absolute inset-0 bg-gray-200">
                  {/* Fallback image placeholder */}
                  <Image
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600&h=600"
                    alt="Business meeting"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Center Big Image */}
              <div className="absolute top-8 left-16 sm:top-12 sm:left-20 lg:top-16 lg:left-32 w-52 h-[260px] sm:w-72 sm:h-[400px] lg:w-[360px] lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl z-10">
                <div className="absolute inset-0 bg-gray-300">
                  <Image
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600&h=800"
                    alt="Celebrating success"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Bottom Right Image */}
              <div className="absolute top-[200px] left-[140px] sm:top-64 sm:left-56 lg:top-[300px] lg:left-[340px] w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-3xl overflow-hidden shadow-xl z-20 border-4 sm:border-8 border-white">
                <div className="absolute inset-0 bg-gray-200">
                  <Image
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=600&h=600"
                    alt="Team collaboration"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Experience Badge */}
              <div className="absolute top-[280px] left-5 sm:top-[320px] sm:-left-4 lg:top-[380px] lg:-left-8 bg-[#1FA8A8] text-white p-5 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl shadow-2xl z-30 flex items-center gap-4 sm:gap-5 w-[260px] sm:w-[260px] lg:w-[300px]">
                <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm shrink-0">
                  <Trophy className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-[#1FA8A8]" />
                </div>
                <div>
                  <div className="font-black text-2xl sm:text-3xl lg:text-4xl leading-none mb-1">25+</div>
                  <div className="text-xs sm:text-sm lg:text-base font-medium text-white/90">Years Of Experience</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:pl-8">
            <h2 className="text-3xl md:text-5xl font-black text-[#082032] leading-tight mb-6">
              We Build Competitive<br />Global Professionals
            </h2>
            <p className="text-gray-500 text-[15px] leading-relaxed mb-10">
              We are committed to delivering world-class certification training that bridges the skills gap. Our expert-led programs empower individuals and organizations to stay ahead in an ever-evolving technological landscape.
            </p>

            <div className="space-y-6 mb-10">
              {/* Value 1 */}
              <div className="bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] p-6 flex items-start gap-6 border border-gray-50">
                <div className="bg-[#1FA8A8]/10 w-14 h-14 rounded-full flex items-center justify-center shrink-0">
                  <Heart className="w-6 h-6 text-[#1FA8A8]" />
                </div>
                <div>
                  <h4 className="text-[#082032] font-bold text-lg mb-2">Excellence & Innovation</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    We believe in continuous learning, delivering cutting-edge curriculum designed by industry experts for real-world applicability.
                  </p>
                </div>
              </div>

              {/* Value 2 */}
              <div className="bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] p-6 flex items-start gap-6 border border-gray-50">
                <div className="bg-[#1FA8A8]/10 w-14 h-14 rounded-full flex items-center justify-center shrink-0">
                  <Target className="w-6 h-6 text-[#1FA8A8]" />
                </div>
                <div>
                  <h4 className="text-[#082032] font-bold text-lg mb-2">Our Mission</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    To transform careers by providing accessible, high-quality education that helps professionals achieve global certifications.
                  </p>
                </div>
              </div>
            </div>


          </div>

        </div>

        {/* Bottom Actions - Centered below both columns */}
        <div className="mt-12 flex justify-center border-t border-gray-100 pt-8">
          <Link
            href="/about"
            className="bg-[#1FA8A8] hover:bg-[#188c8c] text-white px-10 py-3.5 rounded-full font-bold text-sm transition-colors whitespace-nowrap shadow-md"
          >
            More About Us
          </Link>
        </div>
      </div>
    </section>
  );
}
