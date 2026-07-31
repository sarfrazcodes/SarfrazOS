"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutCurrentFocus() {
  return (
    <section className="relative w-full py-32 bg-transparent transition-colors duration-700">
      <div className="max-w-5xl mx-auto px-6 md:px-12 w-full">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-sm font-bold tracking-[0.3em] uppercase text-brand-emerald mb-12"
        >
          WHAT I'M BUILDING RIGHT NOW
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-8 md:gap-12"
        >
          <p className="text-3xl md:text-5xl font-bold leading-[1.4] tracking-tight text-zinc-900 dark:text-white">
            Right now I'm focused on strengthening my foundations in software engineering while building projects that combine full-stack development, artificial intelligence, and thoughtful user experiences.
          </p>
          <p className="text-3xl md:text-5xl font-bold leading-[1.4] tracking-tight text-zinc-500 dark:text-zinc-400">
            Every new project is an opportunity to experiment, solve different problems, and become a better engineer than I was yesterday.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
