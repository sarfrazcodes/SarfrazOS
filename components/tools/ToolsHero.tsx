"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wrench, Sparkles, Code2 } from "lucide-react";

export default function ToolsHero() {
  return (
    <section className="relative w-full pt-32 pb-16 flex flex-col items-center justify-center overflow-hidden z-10">
      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-300 mb-8 backdrop-blur-md">
            <Wrench size={14} className="text-brand-blue" />
            Developer Utilities
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 dark:text-white tracking-tighter mb-6 leading-[1.1]">
            Powerful Tools <br/> for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-emerald">Creators.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-medium max-w-2xl leading-relaxed mb-10">
            A growing collection of high-performance utilities and AI tools designed to streamline your workflow and enhance your digital presence. Free to use.
          </p>
          
          <div className="flex items-center gap-6 text-sm font-bold text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-brand-emerald" />
              <span>AI Powered</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20" />
            <div className="flex items-center gap-2">
              <Code2 size={16} className="text-brand-blue" />
              <span>Client-side Safe</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
