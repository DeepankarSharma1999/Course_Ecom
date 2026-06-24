"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Copy, Share2, Mail, Twitter, Linkedin, Gift, TrendingUp, Users, ArrowRight } from "lucide-react";
import { FaqAccordion } from "@/components/faq-accordion";

const faqs = [
  {
    question: "How does the Refer and Earn program work?",
    answer: "It's simple! Generate your unique referral link using the form above. Share it with your friends, colleagues, or network. When they enroll in a Ulearnsystems course using your link, they get a discount, and you earn a reward once their enrollment is confirmed."
  },
  {
    question: "Is there a limit to how many people I can refer?",
    answer: "No, there is absolutely no limit! The more people you refer, the more you can earn. Our top referrers earn significant rewards every month."
  },
  {
    question: "When do I get my reward?",
    answer: "Rewards are processed 30 days after your referral successfully starts their course. This ensures there are no cancellations or refunds during the standard guarantee period."
  },
  {
    question: "What courses are eligible for referral rewards?",
    answer: "Almost all our certification training programs are eligible. However, the exact reward amount varies depending on the course tier. Please check the 'Course-Wise Benefits' table for specific details."
  },
  {
    question: "How will I receive my reward?",
    answer: "Rewards are typically sent as Amazon Gift Cards or direct bank transfers, depending on your region and preference. Our support team will contact you to confirm your preferred payout method."
  }
];

export default function ReferAndEarnPage() {
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const referralLink = "https://ulearnsystems.com/ref/A9X8K2M";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-950 pt-24 pb-20 md:pt-32 md:pb-28 text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500 rounded-full blur-[128px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>
        
        <div className="container-tight relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-400/10 border border-brand-400/20 px-4 py-1.5 text-sm font-semibold text-brand-300 mb-6">
                <Gift className="w-4 h-4" />
                ULearnSystems Referral Program
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                Refer More.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-teal-100">Earn More.</span><br />
                Repeat.
              </h1>
              <p className="text-lg text-white/70 mb-10 leading-relaxed">
                Empower your network to upskill and achieve their career goals. For every successful enrollment through your referral, you earn exciting rewards. It's a win-win for everyone!
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4 text-brand-100">Reward Tiers</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-white/80">Up to ₹ 1 Lakh</span>
                    <span className="font-bold text-brand-300">5% Reward</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-white/80">₹ 1 Lakh - ₹ 3 Lakhs</span>
                    <span className="font-bold text-brand-300">7.5% Reward</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Above ₹ 3 Lakhs</span>
                    <span className="font-bold text-brand-300">10% Reward</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-400/20 to-transparent blur-3xl -z-10 rounded-full"></div>
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
                <div className="p-8 md:p-10 text-slate-900">
                  <h2 className="text-2xl font-black mb-2 text-center">Start Earning Today</h2>
                  <p className="text-slate-500 text-center mb-8">Generate your unique referral link to share with your friends.</p>
                  
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">Your Email Address</label>
                      <input 
                        type="email" 
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com" 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                      />
                    </div>
                    <button className="w-full btn-primary py-4 text-lg font-bold shadow-lg shadow-brand-500/25">
                      Generate My Link
                    </button>
                  </form>

                  <div className="mt-8 pt-8 border-t border-slate-100">
                    <p className="text-sm font-bold text-slate-700 mb-3">Your Unique Link:</p>
                    <div className="flex items-center gap-2">
                      <div className="bg-slate-100 text-slate-600 px-4 py-3 rounded-xl font-mono text-sm flex-1 truncate select-all border border-slate-200">
                        {referralLink}
                      </div>
                      <button
                        onClick={handleCopy}
                        className="p-3 rounded-xl bg-brand-50 text-brand-600 hover:bg-brand-100 hover:text-brand-700 transition-colors border border-brand-200"
                        title="Copy to clipboard"
                        aria-label={copied ? "Copied" : "Copy referral link"}
                      >
                        {copied ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                    
                    <div className="mt-6 flex justify-center gap-4">
                      <button aria-label="Share on LinkedIn" className="w-12 h-12 rounded-full bg-[#0a66c2]/10 text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white flex items-center justify-center transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </button>
                      <button aria-label="Share on Twitter" className="w-12 h-12 rounded-full bg-[#1da1f2]/10 text-[#1da1f2] hover:bg-[#1da1f2] hover:text-white flex items-center justify-center transition-colors">
                        <Twitter className="w-5 h-5" />
                      </button>
                      <button aria-label="Share via email" className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-800 hover:text-white flex items-center justify-center transition-colors">
                        <Mail className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 text-center text-xs text-slate-500 border-t border-slate-100">
                  By joining, you agree to our <Link href="/terms" className="text-brand-600 hover:underline">Referral Terms & Conditions</Link>.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-tight text-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-16">How It Works in 3 Simple Steps</h2>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-brand-100 via-brand-200 to-brand-100 -z-10"></div>
            
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-brand-50 shadow-xl flex items-center justify-center mb-8 relative z-10">
                <Share2 className="w-10 h-10 text-brand-500" />
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-sm border-2 border-white">1</div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Share Your Link</h3>
              <p className="text-slate-600">Spread the word by sharing your unique referral link with your friends, colleagues, or social network.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-brand-50 shadow-xl flex items-center justify-center mb-8 relative z-10">
                <Users className="w-10 h-10 text-brand-500" />
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-sm border-2 border-white">2</div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Friends Enroll</h3>
              <p className="text-slate-600">Your network signs up for our industry-leading certification courses using your link and gets a special discount.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-brand-50 shadow-xl flex items-center justify-center mb-8 relative z-10">
                <TrendingUp className="w-10 h-10 text-brand-500" />
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-sm border-2 border-white">3</div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Earn Rewards</h3>
              <p className="text-slate-600">Once their enrollment is confirmed, you receive your reward—up to 10% of the course value!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Wise Benefits */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container-tight max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Course-Wise Earnings</h2>
            <p className="text-slate-600 text-lg">Here's a breakdown of what you could earn by referring popular courses.</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-950 text-white">
                    <th className="py-4 px-6 font-bold">Course Category</th>
                    <th className="py-4 px-6 font-bold">Popular Programs</th>
                    <th className="py-4 px-6 font-bold text-right">Potential Reward</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">Agile & Scrum</td>
                    <td className="py-4 px-6 text-slate-600">CSM, CSPO, Leading SAFe</td>
                    <td className="py-4 px-6 text-right font-bold text-brand-600">Up to $50</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">Project Management</td>
                    <td className="py-4 px-6 text-slate-600">PMP, PRINCE2, CAPM</td>
                    <td className="py-4 px-6 text-right font-bold text-brand-600">Up to $75</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">Data Science & AI</td>
                    <td className="py-4 px-6 text-slate-600">Data Science Bootcamp, AI Engineer</td>
                    <td className="py-4 px-6 text-right font-bold text-brand-600">Up to $150</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">Cloud Computing</td>
                    <td className="py-4 px-6 text-slate-600">AWS Architect, Azure Devops</td>
                    <td className="py-4 px-6 text-right font-bold text-brand-600">Up to $100</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-brand-50 p-4 text-center text-sm text-brand-800 font-medium">
              *Rewards vary based on the user's location and the final purchased price of the course.
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-tight max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600 text-lg">Everything you need to know about the ULearnSystems Referral Program.</p>
          </div>
          
          <div className="space-y-4">
            <FaqAccordion items={faqs.map(f => ({ q: f.question, a: f.answer }))} />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-brand-950 text-white text-center">
        <div className="container-tight">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Ready to start earning?</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
            Join hundreds of ULearnSystems alumni and partners who are earning great rewards by helping others advance their careers.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn-primary px-8 py-4 text-lg inline-flex items-center gap-2"
          >
            Get My Referral Link <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
