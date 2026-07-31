"use client";

import React from "react";
import { BlogCategory } from "@/types";
import { motion } from "framer-motion";
import { Brain, Code, Briefcase, GitMerge, Coffee, ChevronRight } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain size={24} />,
  Code: <Code size={24} />,
  Briefcase: <Briefcase size={24} />,
  GitMerge: <GitMerge size={24} />,
  Coffee: <Coffee size={24} />
};

export default function BlogCategories({ categories }: { categories: BlogCategory[] }) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="w-full py-16 bg-[#F8FAFC] dark:bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Explore Topics.
            </h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-sm font-bold text-brand-blue dark:text-brand-emerald hover:opacity-80 transition-opacity">
            View All Categories <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="group relative flex flex-col items-center justify-center p-6 rounded-3xl bg-white dark:bg-[#111111] border border-black/5 dark:border-white/10 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer overflow-hidden"
            >
              {/* Hover gradient background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br from-brand-blue to-purple-500 dark:from-brand-emerald dark:to-brand-blue" />
              
              <div className="w-14 h-14 rounded-full bg-zinc-50 dark:bg-white/5 flex items-center justify-center text-zinc-500 dark:text-zinc-400 mb-4 group-hover:scale-110 group-hover:text-brand-blue dark:group-hover:text-brand-emerald transition-all duration-300 shadow-inner">
                {category.icon && iconMap[category.icon] ? iconMap[category.icon] : <Code size={24} />}
              </div>
              
              <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
                {category.title}
              </h4>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                {category.count} Articles
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
