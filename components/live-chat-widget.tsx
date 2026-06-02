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
            <div className="bg-[#1FA8A8] text-white px-4 py-3 flex items-center justify-between">
              <span className="font-bold mx-auto ml-10">Chat with us</span>
              <div className="flex items-center gap-3 opacity-90">
                <button className="hover:opacity-70 transition-opacity">
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity">
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Agent Info */}
            <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between shadow-sm z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 relative">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
                    alt="Sarah"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-[#082032] text-sm">Sarah</div>
                  <div className="text-gray-500 text-xs">Customer Support</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <button className="hover:text-gray-600 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button className="hover:text-gray-600 transition-colors">
                  <ThumbsDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#f8f9fa] flex flex-col gap-3 scrollbar-thin scrollbar-thumb-gray-200">
              <div className="bg-[#e9ecef] text-[#082032] text-sm p-3.5 rounded-2xl rounded-tl-sm w-11/12 ml-6">
                Welcome to ULearnSystems! I'm Sarah, a live support agent. How may I assist you today?
              </div>
              <div className="bg-[#e9ecef] text-[#082032] text-sm p-3.5 rounded-2xl rounded-tl-sm w-11/12 ml-6">
                Could you please share your name, email address, and contact number? This will help us get in touch for a quick call and provide you with the best assistance based on what you're looking for.
              </div>
              
              <div className="flex items-end gap-2 mt-2">
                <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100 shrink-0 relative mb-1">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
                    alt="Sarah"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="bg-[#e9ecef] text-[#082032] text-sm p-3.5 rounded-2xl rounded-tl-sm w-10/12">
                  May I know the course you are interested in?
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-100">
              <div className="border border-gray-300 rounded-md p-2 mb-2">
                <textarea 
                  placeholder="Type a message here..." 
                  className="w-full text-sm resize-none outline-none text-gray-700 min-h-[40px]"
                  rows={2}
                />
              </div>
              <div className="flex items-center justify-between text-gray-400 px-1">
                <div className="text-xs font-bold tracking-wide">zendesk</div>
                <div className="flex items-center gap-3">
                  <button className="hover:text-gray-600 transition-colors">
                    <LogIn className="w-4 h-4 rotate-90" />
                  </button>
                  <button className="hover:text-gray-600 transition-colors">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button className="hover:text-gray-600 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
