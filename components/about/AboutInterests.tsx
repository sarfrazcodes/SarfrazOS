"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { interests } from "@/data/about";

const MagneticTag = ({ text }: { text: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotate = useTransform(xSpring, [-20, 20], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Magnetic pull limits
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring, rotate }}
      whileHover={{ scale: 1.05 }}
      className="relative px-8 py-4 rounded-full bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 shadow-sm cursor-pointer group"
    >
      <div className="absolute inset-0 rounded-full bg-brand-blue/0 group-hover:bg-brand-blue/10 dark:group-hover:bg-brand-emerald/10 transition-colors duration-300" />
      <span className="relative z-10 text-lg font-bold text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-300">
        {text}
      </span>
    </motion.div>
  );
};

export default function AboutInterests() {
  return (
    <section className="relative w-full py-32 bg-transparent transition-colors duration-700 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12 w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-brand-emerald mb-4">
            Explorations
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            What keeps me awake.
          </h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          {interests.map((interest, idx) => (
            <MagneticTag key={idx} text={interest} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
