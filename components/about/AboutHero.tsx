"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function AboutHero() {
  const { theme } = useTheme();
  const [particles, setParticles] = useState<Array<{ id: number, size: number, x: number, y: number, duration: number, delay: number }>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const generatedParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 8 + 4,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 3
    }));
    setParticles(generatedParticles);
  }, []);

  // Max intensity colors
  // Light mode uses brand-blue (#7C6FF0) for a premium, sexy look
  const particleColor = theme === 'dark' ? 'rgba(16, 185, 129, 1)' : 'rgba(124, 111, 240, 0.8)';

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Subtle animated mesh gradient background */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-blue/30 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-emerald/20 blur-[150px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      </div>

      {/* Custom Particle System (Optimized for 60fps) */}
      {mounted && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                left: `${p.x}%`,
                top: `${p.y}%`,
                backgroundColor: particleColor,
                willChange: "transform, opacity",
              }}
              animate={{
                y: [0, -300, 0],
                x: [0, 150, 0],
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16 lg:gap-24">
          
          {/* Left: Professional Portrait inside a Glass Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-5/12 relative"
          >

            {/* Glass Card for Image */}
            <div className="relative z-10 aspect-[3/4] w-full max-w-sm mx-auto lg:mx-0 rounded-[2rem] p-3 bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-black/5 dark:border-white/10 shadow-2xl">
              <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-zinc-200 dark:bg-zinc-900 relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/sarfraz_portrait.png" 
                  alt="Sarfraz" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </motion.div>

          {/* Right: Large Heading */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-7/12 flex flex-col text-center lg:text-left"
          >
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-zinc-900 dark:text-white mb-6 uppercase" style={{ letterSpacing: '-0.04em' }}>
              ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-emerald">ME</span>
            </h1>
            <p className="text-xl md:text-3xl font-medium text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
              Building software has never been just about writing code.
              <br className="hidden md:block" />
              For me, it's about solving problems, learning relentlessly, and creating products that people genuinely enjoy using.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
