"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Video, Camera, Briefcase } from "lucide-react";
import Link from "next/link";

export default function CreatorCTA() {
  return (
    <section className="relative w-full py-48 flex flex-col justify-center items-center bg-white dark:bg-[#050505] overflow-hidden">
      
      {/* Animated Subtle Gradient Background */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-[100%] bg-brand-blue/20 dark:bg-brand-emerald/20 blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <h2 className="text-5xl md:text-7xl font-extrabold text-zinc-900 dark:text-white tracking-tighter mb-8 leading-[1.1]">
            Join the <br className="hidden md:block"/> Journey.
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 font-medium max-w-2xl mb-12">
            Follow along as I build AI applications, software projects, and share everything I learn along the way.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-3xl flex-wrap">
            <a
              href="https://youtube.com/@sarfrazcodes"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-full bg-[#FF0000] text-white font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-red-500/20"
            >
              <Video size={24} />
              <span>Subscribe on YouTube</span>
            </a>
            
            <a
              href="https://www.instagram.com/sarfrazcodes/"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#FD1D1D]/20"
            >
              <Camera size={24} />
              <span>Follow on Instagram</span>
            </a>

            <a
              href="https://linkedin.com/in/sarfraz"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center justify-center w-full sm:w-auto px-8 py-3 rounded-[2rem] bg-[#0A66C2] text-white font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#0A66C2]/20 leading-tight"
            >
              <div className="flex items-center gap-2">
                <Briefcase size={20} />
                <span>Connect & Message</span>
              </div>
              <span className="text-[10px] font-medium tracking-widest uppercase opacity-80 mt-1">on LinkedIn</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
