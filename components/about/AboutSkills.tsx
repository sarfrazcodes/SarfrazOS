"use client";

import React from "react";
import { motion } from "framer-motion";
import { skillCategories } from "@/data/about";

export default function AboutSkills() {
  return (
    <section className="relative w-full py-32 bg-transparent transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center md:text-left"
        >
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-brand-emerald mb-4">
            TECHNOLOGIES
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Current Toolkit
          </h3>
        </motion.div>

        <div className="flex flex-col gap-16">
          {Object.entries(skillCategories).map(([category, skills], categoryIndex) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="flex flex-col"
            >
              <h4 className="text-xl font-bold text-zinc-400 dark:text-zinc-500 mb-6 uppercase tracking-wider">
                {category}
              </h4>
              <div className="flex flex-wrap gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="relative group cursor-pointer"
                  >
                    {/* Hover Glow & Gradient Border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-emerald rounded-full opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
                    
                    {/* Core Glass Chip */}
                    <div className="relative flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 group-hover:border-transparent transition-all duration-300 group-hover:-translate-y-1 shadow-sm group-hover:shadow-xl">
                      <span className="w-2 h-2 rounded-full bg-brand-blue dark:bg-brand-emerald opacity-50 group-hover:opacity-100 group-hover:animate-ping" />
                      <span className="font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-blue group-hover:to-brand-emerald transition-colors">
                        {skill}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
