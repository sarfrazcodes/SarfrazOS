"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <section className="relative w-full py-32 flex flex-col items-center overflow-hidden bg-white dark:bg-[#050505]">
      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full rounded-[3rem] p-10 md:p-20 overflow-hidden bg-zinc-900 shadow-2xl"
        >
          {/* Animated Premium Background Layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/30 via-purple-500/20 to-zinc-900" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-emerald/20 blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-brand-blue/20 blur-[120px] mix-blend-screen" />

          {/* Grain Overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")' }} />

          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter mb-6">
              Stay Curious.
            </h2>
            <p className="text-lg md:text-xl text-white/80 font-medium max-w-2xl mb-12 leading-relaxed">
              Receive engineering insights, AI discoveries, and project breakdowns directly in your inbox. No spam, just value.
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-md relative flex items-center">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                disabled={status !== "idle"}
                className="w-full px-8 py-5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all font-medium disabled:opacity-50"
              />
              
              <button
                type="submit"
                disabled={status !== "idle"}
                className="absolute right-2 top-2 bottom-2 px-6 rounded-full bg-white text-zinc-900 font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center min-w-[120px]"
              >
                {status === "idle" && <><Send size={16} className="mr-2" /> Subscribe</>}
                {status === "loading" && <div className="w-5 h-5 rounded-full border-2 border-zinc-900 border-t-transparent animate-spin" />}
                {status === "success" && <><CheckCircle size={16} className="mr-2 text-green-600" /> Subscribed</>}
              </button>
            </form>
            
            <p className="text-xs text-white/40 mt-6 font-medium">
              Join 5,000+ engineers reading the weekly newsletter.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
