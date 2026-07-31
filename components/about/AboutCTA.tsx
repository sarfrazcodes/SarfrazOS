"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Download, ArrowRight } from "lucide-react";

export default function AboutCTA() {
  return (
    <section className="relative w-full py-32 flex flex-col justify-center items-center bg-transparent transition-colors duration-700 overflow-hidden">
      
      {/* Decorative Glow Emitting from the curve */}
      <div className="absolute inset-0 z-0 opacity-60 dark:opacity-40 pointer-events-none">
        {/* We move it to top-0 so it shines down from the curved partition */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-[100%] bg-blue-500/30 dark:bg-brand-emerald blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full relative z-10 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <h2 className="text-5xl md:text-7xl font-extrabold text-zinc-900 dark:text-white tracking-tighter mb-8 leading-[1.1]">
            Want the complete <br className="hidden md:block"/> picture?
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 font-medium max-w-2xl mb-12">
            Dive deeper into my technical experience or explore the products I've engineered.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 px-8 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              <Download size={20} />
              <span>Download Resume</span>
            </a>
            <Link
              href="/projects"
              className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white font-bold text-lg hover:bg-white/80 dark:hover:bg-white/10 transition-colors shadow-lg"
            >
              <span>Explore Projects</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
