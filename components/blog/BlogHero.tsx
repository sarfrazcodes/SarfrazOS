"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function BlogHero() {
  const [activeFilter, setActiveFilter] = useState("All");
  
  const filters = ["All", "AI", "Machine Learning", "Programming", "Projects", "Career", "Open Source", "Life"];

  return (
    <section className="relative w-full pt-32 pb-20 flex flex-col items-center overflow-hidden bg-[#F8FAFC] dark:bg-[#050505]">
      
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50 dark:opacity-30">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-brand-blue/20 dark:bg-brand-emerald/20 blur-[150px] mix-blend-screen" />
        <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] rounded-full bg-purple-500/20 blur-[150px] mix-blend-screen" />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200 dark:bg-white/10 text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-blue dark:bg-brand-emerald animate-pulse" />
            Engineering Journal
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-zinc-900 dark:text-white tracking-tighter mb-6 leading-[1.1]">
            Thoughts, tutorials <br/> & lessons learned.
          </h1>
          
          <p className="text-xl text-zinc-600 dark:text-zinc-400 font-medium max-w-2xl leading-relaxed">
            A premium journal documenting project breakdowns, AI experiments, and insights from building modern software.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-2xl mb-8 relative group"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-blue to-purple-500 dark:from-brand-emerald dark:to-brand-blue blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
          <div className="relative flex items-center bg-white dark:bg-[#111111] rounded-full border border-black/5 dark:border-white/10 px-6 py-4 shadow-xl">
            <Search className="text-zinc-400 mr-4" size={20} />
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="bg-transparent border-none outline-none w-full text-zinc-900 dark:text-white font-medium placeholder:text-zinc-400"
            />
          </div>
        </motion.div>

        {/* Filter Chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 max-w-3xl"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                activeFilter === filter 
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md" 
                  : "bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/10"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
