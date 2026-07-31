"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export default function CreatorHero() {
  return (
    <section className="relative w-full min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[#F8FAFC] dark:bg-[#050505]">
      
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-brand-blue/10 dark:bg-brand-emerald/10 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Typography */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-zinc-900 dark:text-white tracking-tighter leading-[1.1]">
            Building <br />
            knowledge <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-purple-500 dark:from-brand-emerald dark:to-brand-blue">
              that scales.
            </span>
          </h1>
          
          <p className="text-xl text-zinc-600 dark:text-zinc-400 font-medium max-w-lg leading-relaxed">
            I create videos, tutorials and technical content that simplify complex engineering concepts and document my journey as a software engineer.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <a 
              href="#featured"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold hover:scale-105 transition-transform"
            >
              <Play size={20} className="fill-current" />
              Watch Latest Video
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white font-bold hover:bg-white/80 dark:hover:bg-white/10 transition-colors"
            >
              Visit Channel
              <ArrowRight size={20} />
            </a>
          </div>
        </motion.div>

        {/* Right Side: Custom Animated Scene */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full h-[500px] lg:h-[700px] flex items-center justify-center perspective-1000"
        >
          {/* Glowing Central Orb */}
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-brand-blue/30 to-purple-500/30 dark:from-brand-emerald/15 dark:to-brand-blue/15 blur-3xl pointer-events-none"
          />

          {/* Floating Glass Panel 1 (Video Thumbnail abstraction) */}
          <motion.div
            animate={{ 
              y: [-20, 20, -20],
              rotateX: [10, -10, 10],
              rotateY: [-10, 10, -10]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[5%] md:left-[10%] w-48 h-32 md:w-64 md:h-40 rounded-2xl bg-white/20 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-2xl flex flex-col justify-end p-4 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
            <div className="w-12 h-2 rounded-full bg-black/20 dark:bg-white/30 mb-2" />
            <div className="w-24 h-2 rounded-full bg-black/10 dark:bg-white/20" />
          </motion.div>

          {/* Floating Glass Panel 2 (Code/Terminal abstraction) */}
          <motion.div
            animate={{ 
              y: [20, -20, 20],
              rotateX: [-15, 15, -15],
              rotateY: [15, -15, 15]
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[20%] right-[5%] md:right-[10%] w-40 h-48 md:w-56 md:h-64 rounded-2xl bg-white/30 dark:bg-black/40 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-2xl flex flex-col items-center justify-center gap-6"
          >
            <div className="w-16 h-16 rounded-full border-4 border-brand-blue/20 dark:border-brand-emerald/20 border-t-brand-blue dark:border-t-brand-emerald animate-spin" />
            <div className="w-20 h-2 rounded-full bg-black/20 dark:bg-white/10" />
          </motion.div>

          {/* Central Hero Object (Massive Play Button) */}
          <motion.div
            animate={{ 
              scale: [0.95, 1.05, 0.95],
              rotate: [-2, 2, -2]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-32 h-32 md:w-48 md:h-48 rounded-full md:rounded-3xl bg-white/40 dark:bg-white/10 backdrop-blur-2xl border border-white/60 dark:border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_rgba(255,255,255,0.05)] flex items-center justify-center cursor-pointer hover:bg-white/60 dark:hover:bg-white/20 transition-colors"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-purple-500/20 dark:from-brand-emerald/20 dark:to-brand-blue/20 rounded-full md:rounded-3xl opacity-50 blur-xl -z-10" />
            <Play size={72} className="text-zinc-900 dark:text-white fill-zinc-900 dark:fill-white ml-4 drop-shadow-lg" />
          </motion.div>

          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [Math.random() * 150 - 75, Math.random() * -150 + 75, Math.random() * 150 - 75],
                x: [Math.random() * 150 - 75, Math.random() * -150 + 75, Math.random() * 150 - 75],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 2, 1]
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2
              }}
              className="absolute w-2 h-2 rounded-full bg-brand-blue dark:bg-brand-emerald blur-[1px]"
              style={{
                top: `${30 + Math.random() * 40}%`,
                left: `${30 + Math.random() * 40}%`,
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
