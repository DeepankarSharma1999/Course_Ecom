"use client";

import React, { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { useLearnerAuth } from "./learner-auth-provider";

export function AuthModal() {
  const { isModalOpen, closeModal, login } = useLearnerAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isModalOpen, closeModal]);

  if (!isModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) login(email);
  };

  const handleSocialLogin = (provider: "Google" | "LinkedIn") => {
    // Simulated social login flow
    const dummyEmail = `${provider.toLowerCase()}_user@example.com`;
    login(dummyEmail, provider);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/60 backdrop-blur-sm p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title" onClick={closeModal}>
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[900px] flex flex-col md:flex-row overflow-hidden relative animate-in fade-in zoom-in-95 duration-300 border border-ink-100" onClick={(e) => e.stopPropagation()}>

        {/* Close Button */}
        <button
          onClick={closeModal}
          aria-label="Close dialog"
          className="absolute top-5 right-5 z-20 p-2.5 bg-ink-50 hover:bg-ink-100 rounded-full transition-colors text-ink-500 hover:text-ink-900"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side - Banner */}
        <div className="hidden md:flex md:w-[42%] bg-gradient-to-br from-primary via-[#0f6b6b] to-[#0a4b4b] p-10 flex-col justify-between text-white relative overflow-hidden">
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
          
          <div className="relative z-10">
            <h2 className="text-[28px] font-extrabold tracking-tight mb-2 flex items-center gap-2">
              ULearnSystems <span className="text-accent-400 text-3xl leading-none">⚡</span>
            </h2>
          </div>

          <div className="relative z-10 text-center flex flex-col items-center mt-8 mb-8">
            <div className="w-56 h-56 rounded-full bg-white/5 p-2 mb-8 relative border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" 
                alt="Learner" 
                className="w-full h-full object-cover rounded-full border-[6px] border-white/20 shadow-inner relative z-10"
              />
            </div>
            
            <h3 className="text-2xl font-bold mb-4 tracking-tight">{isLogin ? "Practice-Driven" : "Accelerate Your Career"}</h3>
            <p className="text-white/85 text-[15px] leading-relaxed mb-8 max-w-[280px]">
              {isLogin 
                ? "Sharpen understanding with instantly scored practice tests, reinforcing learning and maximizing prep efficiency."
                : "Join thousands of professionals globally to master Agile, SAFe, and DevOps with our certified experts."}
            </p>
            
            {/* Pagination dots indicator */}
            <div className="flex gap-2.5 justify-center mt-auto">
              <div className="w-8 h-1.5 bg-white rounded-full transition-all duration-300 shadow-sm"></div>
              <div className="w-1.5 h-1.5 bg-white/40 rounded-full transition-all duration-300"></div>
              <div className="w-1.5 h-1.5 bg-white/40 rounded-full transition-all duration-300"></div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-[58%] p-8 md:p-14 lg:p-16 flex flex-col justify-center bg-white relative">
          <div className="max-w-[400px] mx-auto w-full">
            
            <div className="mb-10">
              <h2 id="auth-modal-title" className="text-[28px] font-extrabold text-ink-900 mb-2 tracking-tight">
                {isLogin ? "Welcome back learner" : "Create an account"} <span className="inline-block origin-bottom-right hover:animate-wave">{isLogin ? "👋" : "✨"}</span>
              </h2>
              <p className="text-ink-500 text-[15px]">
                {isLogin ? "Login to your account to continue learning." : "Start learning from industry experts today."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <input
                  type="email"
                  placeholder="Email address"
                  aria-label="Email address"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 bg-ink-50 border border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-primary/20 focus:border-primary transition-all text-ink-900 placeholder:text-ink-400 font-medium"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <input
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 bg-ink-50 border border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-primary/20 focus:border-primary transition-all text-ink-900 placeholder:text-ink-400 font-medium"
                  required
                />
              </div>

              {isLogin && (
                <div className="flex items-center justify-between text-[14px] pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input type="checkbox" className="rounded-sm text-primary focus:ring-primary focus:ring-offset-0 w-4 h-4 border-ink-300 transition-colors cursor-pointer" />
                    <span className="text-ink-600 font-medium group-hover:text-ink-900 transition-colors">Remember me</span>
                  </label>
                  <a href="#" className="text-primary font-semibold hover:underline underline-offset-4">Forgot Password?</a>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary hover:bg-[#0f6b6b] text-white font-bold text-[15px] py-4 rounded-xl transition-all shadow-[0_8px_20px_rgb(13,148,136,0.25)] hover:shadow-[0_12px_24px_rgb(13,148,136,0.35)] hover:-translate-y-0.5 mt-4"
              >
                {isLogin ? "LOGIN" : "SIGN UP"}
              </button>
            </form>

            <div className="flex items-center gap-4 my-8">
              <div className="h-px bg-ink-100 flex-1"></div>
              <span className="text-ink-400 text-[13px] font-semibold uppercase tracking-wider">Or continue with</span>
              <div className="h-px bg-ink-100 flex-1"></div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <button 
                onClick={() => handleSocialLogin("Google")}
                type="button"
                className="flex items-center justify-center gap-3 border-2 border-ink-100 hover:border-ink-200 hover:bg-ink-50 py-3.5 rounded-xl transition-all text-[15px] font-bold text-ink-700 hover:shadow-sm"
              >
                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
                Google
              </button>
              <button 
                onClick={() => handleSocialLogin("LinkedIn")}
                type="button"
                className="flex items-center justify-center gap-3 border-2 border-ink-100 hover:border-ink-200 hover:bg-ink-50 py-3.5 rounded-xl transition-all text-[15px] font-bold text-ink-700 hover:shadow-sm"
              >
                <svg className="w-[22px] h-[22px] text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </button>
            </div>

            <div className="text-center text-[15px] text-ink-600 mb-6 font-medium">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-bold hover:underline underline-offset-4"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </div>

            {!isLogin && (
              <div className="flex items-start gap-3 text-[13px] text-ink-500 bg-ink-50 p-4 rounded-xl border border-ink-100">
                <input type="checkbox" className="mt-1 rounded-sm text-primary focus:ring-primary focus:ring-offset-0 w-4 h-4 border-ink-300 cursor-pointer shrink-0" required />
                <p className="leading-relaxed">
                  By creating an account, you agree to the <a href="#" className="text-primary font-semibold hover:underline">Terms of Service</a> and <a href="#" className="text-primary font-semibold hover:underline">Privacy Policy</a>. 
                  We'll occasionally send you account-related emails.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
