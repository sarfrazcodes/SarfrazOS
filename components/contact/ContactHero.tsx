"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Code, Mail, MessageSquare, Terminal } from "lucide-react";

export default function ContactHero() {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  return (
    <section className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden pt-20">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Text Content */}
        <div className="w-full md:w-1/2 flex flex-col z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-300 mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
              Collaboration & Contact
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 dark:text-white tracking-tighter mb-6 leading-[1.1]">
              Let's Build <br/> Something <br/> Meaningful.
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-medium max-w-md leading-relaxed mb-10">
              Whether you have a project, an idea, a collaboration opportunity or simply want to connect, I'd love to hear from you.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={handleScroll}
                className="group w-full sm:w-auto px-8 py-4 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10 dark:shadow-white/10"
              >
                Start a Conversation
                <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
              </button>
              
              <a 
                href="/projects"
                className="group w-full sm:w-auto px-8 py-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white font-bold hover:bg-black/10 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-md"
              >
                <Code size={18} />
                View Projects
              </a>
            </div>
          </motion.div>
        </div>

        {/* Abstract Floating UI Composition */}
        <div className="w-full md:w-1/2 h-[400px] md:h-[600px] relative z-10 flex items-center justify-center pointer-events-none">
          
          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: -5 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute z-20 w-48 h-32 bg-white/80 dark:bg-[#111]/80 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col p-4 -ml-20 -mt-20"
          >
            <div className="w-8 h-8 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center mb-3">
              <Mail size={16} />
            </div>
            <div className="w-24 h-2 rounded-full bg-black/10 dark:bg-white/10 mb-2" />
            <div className="w-16 h-2 rounded-full bg-black/5 dark:bg-white/5" />
          </motion.div>

          {/* Code/Terminal Card */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotate: 10 }}
            animate={{ opacity: 1, y: 0, rotate: 10 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="absolute z-10 w-56 h-40 bg-gradient-to-br from-brand-emerald/10 to-brand-blue/10 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl shadow-xl flex flex-col p-5 ml-24 mt-20"
          >
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="flex-1 w-full rounded-lg bg-white/50 dark:bg-black/50 border border-black/5 dark:border-white/5 flex items-center justify-center text-zinc-500 dark:text-zinc-400 font-mono text-xs shadow-inner">
              <Terminal size={14} className="mr-2" />
              {"status: 200"}
            </div>
          </motion.div>

          {/* Floating Message Bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="absolute z-30 w-16 h-16 bg-brand-blue text-white rounded-full flex items-center justify-center shadow-2xl shadow-brand-blue/40 ml-40 -mt-10"
          >
            <MessageSquare size={24} />
          </motion.div>
          
        </div>

      </div>
    </section>
  );
}
