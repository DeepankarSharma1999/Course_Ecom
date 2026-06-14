"use client";

import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

export function UpcomingWebinarsCalendar() {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#a855f7]/10 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-[#a855f7]" />
          </div>
          <h3 className="text-[15px] font-bold text-ink-900">Upcoming Webinars</h3>
        </div>
        <span className="text-[10px] font-bold text-[#a855f7] bg-[#a855f7]/10 px-2 py-0.5 rounded-full">
          4 this month
        </span>
      </div>

      <div className="border border-ink-100 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <button className="text-ink-400 hover:text-primary"><ChevronLeft className="w-4 h-4" /></button>
          <span className="text-[13px] font-bold text-ink-900">June 2026</span>
          <button className="text-ink-400 hover:text-primary"><ChevronRight className="w-4 h-4" /></button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-ink-400 mb-2">
          <div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div><div>Su</div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[12px] font-medium text-ink-700">
          {/* Week 1 */}
          <div className="py-1">1</div><div className="py-1">2</div><div className="py-1">3</div><div className="py-1">4</div>
          <div className="py-1 relative"><span className="absolute inset-0 border border-[#a855f7] rounded-md"></span><span className="relative z-10 text-[#a855f7] font-bold">5</span></div>
          <div className="py-1">6</div><div className="py-1">7</div>
          
          {/* Week 2 */}
          <div className="py-1">8</div><div className="py-1">9</div><div className="py-1">10</div><div className="py-1">11</div><div className="py-1">12</div>
          <div className="py-1 relative"><span className="absolute inset-0 bg-[#a855f7]/10 rounded-md"></span><span className="relative z-10 text-[#a855f7] font-bold">13</span><span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#a855f7] rounded-full"></span></div>
          <div className="py-1">14</div>

          {/* Week 3 */}
          <div className="py-1">15</div>
          <div className="py-1 relative"><span className="absolute inset-0 bg-primary/10 rounded-md"></span><span className="relative z-10 text-primary font-bold">16</span><span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span></div>
          <div className="py-1">17</div><div className="py-1">18</div><div className="py-1">19</div><div className="py-1">20</div><div className="py-1">21</div>

          {/* Week 4 */}
          <div className="py-1">22</div>
          <div className="py-1 relative"><span className="absolute inset-0 bg-[#a855f7]/10 rounded-md"></span><span className="relative z-10 text-[#a855f7] font-bold">23</span><span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#a855f7] rounded-full"></span></div>
          <div className="py-1">24</div><div className="py-1">25</div><div className="py-1">26</div>
          <div className="py-1 relative"><span className="absolute inset-0 bg-primary/10 rounded-md"></span><span className="relative z-10 text-primary font-bold">27</span><span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span></div>
          <div className="py-1">28</div>

          {/* Week 5 */}
          <div className="py-1">29</div><div className="py-1">30</div><div className="py-1 text-ink-300">1</div><div className="py-1 text-ink-300">2</div><div className="py-1 text-ink-300">3</div><div className="py-1 text-ink-300">4</div><div className="py-1 text-ink-300">5</div>
        </div>
      </div>
    </div>
  );
}
