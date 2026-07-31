"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
import { Video, PenTool, User, Briefcase } from "lucide-react";
import Link from "next/link";
import { splineStore } from "@/lib/splineStore";

export default function Personas() {
  const personas = [
    {
      id: "about",
      title: "My Journey",
      description: "The path that's shaping me into the engineer I hope to become.",
      icon: User,
      position: "top-[20%] left-[5%] md:top-[25%] md:left-[15%]",
      delay: 0.1,
      href: "/about"
    },
    {
      id: "projects",
      title: "Projects",
      description: "Ideas turned into real software through experimentation and persistence.",
      icon: Briefcase,
      position: "top-[20%] right-[5%] md:top-[25%] md:right-[15%]",
      delay: 0.3,
      href: "/projects"
    },
    {
      id: "youtube",
      title: "Creator",
      description: "Sharing what I'm learning while building, one project at a time.",
      icon: Video,
      position: "bottom-[10%] left-[5%] md:bottom-[20%] md:left-[15%]",
      delay: 0.5,
      href: "/youtube"
    },
    {
      id: "blog",
      title: "Writer",
      description: "Breaking down technical ideas into practical and easy-to-follow articles.",
      icon: PenTool,
      position: "bottom-[10%] right-[5%] md:bottom-[20%] md:right-[15%]",
      delay: 0.7,
      href: "/blog"
    },
  ];

  return (
    <section
      id="personas"
      className="relative w-full py-24 min-h-screen flex items-center bg-[#DCE8F5] dark:bg-[#050505] overflow-hidden"
    >
      <style>{`
        /* Hide the Spline watermark */
        a[href*="spline.design"] {
          display: none !important;
          opacity: 0 !important;
          pointer-events: none !important;
          visibility: hidden !important;
        }
      `}</style>

      {/* Title */}
      <div className="absolute top-16 md:top-20 left-0 right-0 z-20 text-center pointer-events-none px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-sm font-bold tracking-widest uppercase text-brand-blue mb-4"
        >
          BEYOND THE CODE
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-[#F5F5F5] drop-shadow-sm leading-tight"
        >
          One journey. <br className="hidden md:block" /> Many ways to create.
        </motion.h3>
      </div>

      {/* 3D Robot */}
      {/* We physically push the boundaries outwards to clip the watermark in case CSS fails, and shift it down slightly */}
      <div className="absolute -inset-8 md:-inset-16 translate-y-24 md:translate-y-32 scale-95 md:scale-90 z-0 w-[calc(100%+64px)] md:w-[calc(100%+128px)] h-[calc(100%+64px)] md:h-[calc(100%+128px)] spline-container pointer-events-auto origin-bottom">
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-brand-blue border-t-transparent animate-spin" />
          </div>
        }>
          <Spline
            scene="https://prod.spline.design/ZbZlRBlj7xjCyAWL/scene.splinecode"
            style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, pointerEvents: "auto" }}
            onLoad={() => {
              splineStore.setPersonasLoaded(true);
            }}
          />
        </Suspense>
      </div>

      {/* 4 Glowing Black Boxes */}
      <div className="absolute inset-0 z-10 max-w-7xl mx-auto w-full h-full pointer-events-none">
        {personas.map((persona) => (
          <motion.div
            key={persona.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: persona.delay, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute ${persona.position} w-[160px] md:w-[220px]`}
          >
            {/* Glow Layer */}
            <div className="absolute inset-0 bg-brand-blue/30 dark:bg-brand-emerald/30 blur-2xl rounded-[2rem] transform scale-110" />

            {/* Card Layer */}
            <Link href={persona.href} className="relative flex flex-col items-center text-center p-6 rounded-[2rem] bg-zinc-900 dark:bg-[#111111] border border-zinc-700 dark:border-white/10 shadow-2xl backdrop-blur-md pointer-events-auto hover:-translate-y-2 hover:border-brand-blue dark:hover:border-brand-emerald transition-all duration-500 group">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-800 dark:bg-white/5 text-white mb-4 shadow-inner group-hover:bg-brand-blue dark:group-hover:bg-brand-emerald group-hover:scale-110 transition-all">
                <persona.icon size={20} />
              </div>
              <h4 className="text-white font-bold text-lg md:text-xl mb-2">{persona.title}</h4>
              <p className="text-zinc-400 text-xs md:text-sm font-medium leading-relaxed">
                {persona.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
