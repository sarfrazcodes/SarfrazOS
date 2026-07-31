"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { philosophies, PhilosophyCard } from "@/data/about";

const TiltCard = ({ data, index }: { data: PhilosophyCard; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-1000"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full min-h-[300px] rounded-[2rem] p-1 bg-gradient-to-br from-white/20 to-white/0 dark:from-white/10 dark:to-white/0 shadow-2xl group cursor-pointer"
      >
        {/* Animated Border Glow inside padding */}
        <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#10B981_360deg)] animate-[spin_3s_linear_infinite]" />
        </div>

        {/* Core Glass Card */}
        <div 
          className="relative w-full h-full rounded-[1.8rem] bg-white/60 dark:bg-[#111111]/80 backdrop-blur-2xl p-8 flex flex-col items-start border border-white/40 dark:border-white/5"
          style={{ transform: "translateZ(30px)" }} // Pop out effect
        >
          {/* Subtle inner hover glow */}
          <div className="absolute inset-0 bg-brand-emerald/0 group-hover:bg-brand-emerald/10 dark:group-hover:bg-brand-emerald/5 transition-colors duration-500 rounded-[1.8rem]" />
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">
              {data.title}
            </h3>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              "{data.description}"
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function AboutPhilosophy() {
  return (
    <section className="relative w-full py-32 bg-transparent transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-brand-emerald mb-4">
            Engineering Philosophy
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            The principles that <br className="hidden md:block"/> guide my code.
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {philosophies.map((phil, index) => (
            <TiltCard key={phil.id} data={phil} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
