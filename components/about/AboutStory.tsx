"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

export default function AboutStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 30%"]
  });

  const storyText = [
    "I'm Mohd Sarfraz Saifi, a software engineering student who enjoys turning ideas into working products.",
    "My journey started with curiosity about how software works, but over time it became much more than that. Every project has taught me something new, whether it's writing cleaner code, building better user experiences, or understanding how different systems work together.",
    "Today, my interests revolve around full-stack development, artificial intelligence, and modern software engineering. I enjoy learning by building real projects instead of only following tutorials because every challenge teaches something no video can.",
    "I'm still early in my journey, and I don't pretend to know everything. What I do know is that I genuinely enjoy solving problems, improving every day, and creating software that people can actually use.",
    "For me, success isn't measured by the number of projects I complete, but by how much I learn while building them."
  ];

  // Letter by letter animation for the heading
  const headingText = "THE STORY";
  const headingVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };
  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { ease: [0.16, 1, 0.3, 1], duration: 0.6 } }
  };

  return (
    <section className="relative w-full py-32 bg-transparent transition-colors duration-700">
      <div className="max-w-5xl mx-auto px-6 md:px-12 w-full">
        
        {/* Animated Heading */}
        <motion.h2 
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-sm font-bold tracking-[0.3em] uppercase text-brand-blue mb-12 flex"
        >
          {headingText.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h2>

        {/* Premium Framer Motion Scroll-Reading Effect (Zero Lag, Zero Hydration Error) */}
        <div ref={containerRef} className="flex flex-col gap-8 md:gap-12">
          {storyText.map((paragraph, index) => {
            // Calculate a staggered scroll range for each paragraph
            const start = index * 0.2;
            const end = start + 0.4;
            // Map the global scroll progress to this specific paragraph's background position
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const bgPosition = useTransform(scrollYProgress, [start, end], ["100%", "0%"]);

            return (
              <p key={index} className="text-3xl md:text-5xl font-bold leading-[1.4] tracking-tight">
                <motion.span 
                  className="bg-gradient-to-r from-[#09090b] from-50% to-[#94A3B8] to-50% dark:from-[#10B981] dark:to-[#FFFFFF] bg-[length:200%_100%] bg-clip-text text-transparent inline-block"
                  style={{ backgroundPositionX: bgPosition }}
                >
                  {paragraph}
                </motion.span>
              </p>
            );
          })}
        </div>

      </div>
    </section>
  );
}
