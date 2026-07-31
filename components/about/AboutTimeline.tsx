"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { timeline } from "@/data/about";

export default function AboutTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress through the entire timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Grow the active timeline line
  const lineScale = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative w-full py-32 bg-transparent transition-colors duration-700">
      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-brand-blue mb-4">
            The Journey
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative w-full flex flex-col items-center">
          
          {/* Background Track Line */}
          <div className="absolute top-0 bottom-0 left-[27px] md:left-1/2 md:-translate-x-1/2 w-1 bg-black/5 dark:bg-white/5 rounded-full" />

          {/* Animated Active Line */}
          <motion.div 
            className="absolute top-0 left-[27px] md:left-1/2 md:-translate-x-1/2 w-1 bg-gradient-to-b from-brand-blue to-brand-emerald rounded-full origin-top"
            style={{ height: "100%", scaleY: lineScale }}
          />

          {timeline.map((event, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={index} className="relative w-full flex justify-start md:justify-center mb-20 last:mb-0">
                
                {/* Mobile View: Event is always on the right of the line */}
                {/* Desktop View: Alternating left and right */}
                
                {/* Left Side Content (Empty on Mobile, or populated if isLeft on Desktop) */}
                <div className={`hidden md:flex w-1/2 justify-end pr-16 ${!isLeft ? "md:invisible" : ""}`}>
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-right"
                  >
                    <span className="block text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-emerald mb-2">
                      {event.year}
                    </span>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                      {event.title}
                    </h3>
                  </motion.div>
                </div>

                {/* Center Node */}
                <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#F5F5F7] dark:bg-[#050505] border-4 border-black/10 dark:border-white/20 z-10 flex items-center justify-center">
                  {/* Inner glow that triggers on scroll */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, margin: "-50% 0px -50% 0px" }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full rounded-full bg-brand-emerald shadow-[0_0_15px_rgba(16,185,129,0.8)]"
                  />
                </div>

                {/* Right Side Content (Always populated on Mobile, populated if !isLeft on Desktop) */}
                <div className={`w-full md:w-1/2 pl-20 md:pl-16 ${isLeft ? "md:hidden" : ""}`}>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-left"
                  >
                    <span className="block text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-emerald mb-2">
                      {event.year}
                    </span>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                      {event.title}
                    </h3>
                  </motion.div>
                </div>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
