"use client";

import React, { Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
import { useTheme } from "next-themes";
import { splineStore } from "@/lib/splineStore";

export default function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // When theme changes, the scene changes, so we reset the loaded state
  useEffect(() => {
    splineStore.setHeroLoaded(false);
  }, [theme]);
  return (
    <section
      id="hero"
      className="relative h-screen w-full flex items-center overflow-hidden"
    >
      <style>{`
        /* The Spline component uses shadow DOM / internal canvas rendering for its logo, so CSS cannot hide it. */
      `}</style>

      {/* Background for Transparent Spline */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#EBF2FA] to-[#DCE8F5] dark:from-[#050505] dark:to-[#050505]" />

      {/* Spline 3D Scene - Full Background (Untouched Colors) */}
      {/* We physically push the Spline container outside the screen boundaries in all directions. 
          By shifting it left by -5vw and increasing width to 110vw, we pull the cube away from the right edge! */}
      <div className="absolute -top-[80px] -left-[5vw] w-[110vw] h-[calc(100%+160px)] z-0 spline-container pointer-events-auto">
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-transparent">
            <div className="w-8 h-8 rounded-full border-2 border-brand-blue border-t-transparent animate-spin" />
          </div>
        }>
          {mounted && (
            <Spline
              key={theme}
              scene={
                theme === "dark"
                  ? "https://prod.spline.design/x3sVKeTu7mosK-ao/scene.splinecode"
                  : "https://prod.spline.design/ghIG05VUxeMaftBZ/scene.splinecode"
              }
              style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
              onLoad={() => {
                splineStore.setHeroLoaded(true);
              }}
            />
          )}
        </Suspense>
      </div>

      {/* Premium Dark Mode Spotlight Mask */}
      {/* Since the new Spline is optimized for #050505, we don't need a heavy mask, just a very slight vignette if anything, or we can just remove it. We'll set opacity to 0 in dark mode to let the raw Spline scene show through! */}
      <div className="absolute inset-0 z-[5] bg-[radial-gradient(circle_at_50%_50%,rgba(10,22,37,0.6)_0%,#050505_70%)] md:bg-[radial-gradient(circle_at_75%_50%,rgba(10,22,37,0.6)_0%,#050505_60%)] opacity-0 pointer-events-none transition-opacity duration-700" />

      <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 w-full relative z-10 pointer-events-none mt-16">

        {/* Text Content */}
        <div className="flex flex-col items-start text-left max-w-2xl pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-black/5 dark:bg-white/10 text-zinc-800 dark:text-zinc-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md border border-black/10 dark:border-white/20 shadow-sm transition-colors">
              SOFTWARE ENGINEERING STUDENT • FULL-STACK DEVELOPER • AI EXPLORER
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter text-zinc-900 dark:text-white leading-[1.05] mb-6 drop-shadow-sm transition-colors"
          >
            Building software <br className="hidden md:block" />
            that solves <br className="hidden md:block" />
            <span className="text-brand-blue">real problems.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-zinc-700 dark:text-zinc-400 max-w-xl mb-10 leading-relaxed font-medium transition-colors"
          >
            I'm Mohd Sarfraz Saifi, a software engineering student exploring full-stack development, artificial intelligence, and interactive digital experiences. I enjoy turning ideas into working products, sharing what I learn, and improving with every project I build.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="px-8 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium text-sm text-center hover:scale-105 transition-all active:scale-95 shadow-xl"
            >
              Explore My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-md text-zinc-900 dark:text-white border border-black/10 dark:border-white/20 font-medium text-sm text-center hover:bg-white/80 dark:hover:bg-white/20 transition-all shadow-lg"
            >
              Let's Connect
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
