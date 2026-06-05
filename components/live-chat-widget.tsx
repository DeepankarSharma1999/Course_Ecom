"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageSquare, ArrowUpRight, Minus, ThumbsUp, ThumbsDown, Paperclip, MoreHorizontal, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="bg-[#1FA8A8] hover:bg-[#188c8c] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 transition-colors group"
          >
            <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-sm tracking-wide">Chat</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 right-0 w-[340px] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col border border-gray-100"
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div className="bg-[#F27C38] text-black px-4 py-3 flex items-center justify-center relative">
              <span className="font-bold text-[15px]">Chat with us</span>
              <button onClick={() => setIsOpen(false)} className="absolute right-4 hover:opacity-70 transition-opacity">
                <Minus className="w-5 h-5 text-black" />
              </button>
            </div>

            {/* Form Area */}
            <div className="flex-1 p-5 bg-white flex flex-col gap-4">
              <div className="text-[15px] text-[#2f3941] leading-relaxed">
                <p className="mb-4">Greetings! Your perfect partner for all your training needs.</p>
                <p>We are happy to help! :)</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-sm text-[#2f3941]">Name</label>
                <input type="text" className="border border-gray-300 rounded p-2 text-sm outline-none focus:border-[#F27C38] transition-colors" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-sm text-[#2f3941]">Email</label>
                <input type="email" className="border border-gray-300 rounded p-2 text-sm outline-none focus:border-[#F27C38] transition-colors" />
              </div>

              <div className="flex flex-col gap-1.5 mb-2">
                <label className="font-bold text-sm text-[#2f3941]">Message</label>
                <textarea className="border border-gray-300 rounded p-2 text-sm outline-none focus:border-[#F27C38] transition-colors resize-none min-h-[100px]" />
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#f8f9fa] border-t border-gray-200 flex items-center justify-between rounded-b-lg">
              <div className="text-[13px] font-semibold text-gray-500 tracking-wide">zendesk</div>
              <button className="bg-[#2f3941] hover:bg-[#1f262b] text-white px-5 py-2.5 rounded text-sm font-medium transition-colors">
                Start chat
              </button>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
