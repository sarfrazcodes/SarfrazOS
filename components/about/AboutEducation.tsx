"use client";

import React from "react";
import { motion } from "framer-motion";
import { educationData } from "@/data/about";
import { GraduationCap } from "lucide-react";

export default function AboutEducation() {
  return (
    <section className="relative w-full py-32 bg-transparent transition-colors duration-700 overflow-hidden">
      
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full max-h-96 bg-brand-blue/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-brand-blue mb-4">
            Education
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Academic Foundation.
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full rounded-[2rem] p-[1px] bg-gradient-to-br from-black/10 to-black/0 dark:from-white/10 dark:to-white/0 shadow-2xl"
        >
          <div className="relative w-full rounded-[2rem] bg-white/40 dark:bg-[#111111]/90 backdrop-blur-3xl p-8 md:p-12 overflow-hidden">
            
            {/* Moving Gradient Background (Light Mode Only) */}
            <motion.div 
              className="absolute inset-0 z-0 dark:hidden opacity-70"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              style={{
                background: "linear-gradient(270deg, rgba(124,111,240,0.05), rgba(124,111,240,0.15), rgba(124,111,240,0.05))",
                backgroundSize: "400% 400%",
              }}
            />

            {/* Subtle Inner Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 dark:bg-brand-blue/10 blur-3xl rounded-full z-0" />

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start justify-between">
              
              <div className="flex gap-6">
                <div className="hidden sm:flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/10 text-zinc-900 dark:text-white shadow-inner">
                  <GraduationCap size={32} />
                </div>
                
                <div>
                  <h4 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                    {educationData.institution}
                  </h4>
                  <p className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-emerald mb-1">
                    {educationData.degree}
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                    {educationData.major}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:items-end gap-2 md:mt-2">
                <div className="px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/10 text-sm font-bold text-zinc-800 dark:text-zinc-200 backdrop-blur-md">
                  {educationData.duration}
                </div>
                <div className="text-zinc-500 dark:text-zinc-400 font-medium text-sm mt-2 md:mt-0">
                  CGPA: <span className="text-zinc-900 dark:text-white font-bold text-lg">{educationData.cgpa}</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12 pt-8 border-t border-black/5 dark:border-white/5">
              <h5 className="text-sm font-bold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-4">
                Relevant Coursework
              </h5>
              <div className="flex flex-wrap gap-3">
                {educationData.coursework.map((course, idx) => (
                  <span key={idx} className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/5 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:border-brand-blue transition-colors cursor-default">
                    {course}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
