"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ContactCTA() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <section className="relative w-full py-32 flex flex-col items-center overflow-hidden z-10">
      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-300 mb-8 backdrop-blur-md">
            The Final Step
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-zinc-900 dark:text-white tracking-tighter mb-6 leading-[1.1]">
            Every Great Project <br/> Starts With A Conversation.
          </h2>
          
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-medium max-w-2xl mb-12">
            You've reached the end of the line. There's nothing left to do but build something incredible together.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <button
              onClick={handleScrollToTop}
              className="group w-full sm:w-auto px-8 py-5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10 dark:shadow-white/10 flex items-center justify-center gap-2"
            >
              <Send size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              <span>Send a Message</span>
            </button>
            
            <Link
              href="/projects"
              className="group w-full sm:w-auto px-8 py-5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md text-zinc-900 dark:text-white font-bold text-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore Projects</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
