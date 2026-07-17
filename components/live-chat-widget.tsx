"use client";

import { useState } from "react";
import { MessageSquare, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LeadForm } from "@/components/lead-form";

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 lg:bottom-6 right-4 lg:right-6 z-50 font-sans">
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
            /* Cap to the viewport so the panel never runs off-screen; the body scrolls instead. */
            className="absolute bottom-0 right-0 w-[340px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100dvh-8rem)] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col border border-gray-100"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-center relative shrink-0">
              <span className="font-bold text-[15px]">Chat with us</span>
              <button onClick={() => setIsOpen(false)} aria-label="Minimize chat" className="absolute right-4 grid h-9 w-9 place-items-center hover:opacity-70 transition-opacity">
                <Minus className="w-5 h-5 text-primary-foreground" />
              </button>
            </div>

            {/* Body — min-h-0 lets it scroll rather than push content past the panel edge */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 bg-white">
              <div className="text-[15px] text-[#2f3941] leading-relaxed mb-4">
                <p className="mb-3">Greetings! Your perfect partner for all your training needs.</p>
                <p>We are happy to help! :)</p>
              </div>
              <LeadForm
                variant="inline"
                source="live-chat"
                ctaLabel="Start chat"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
