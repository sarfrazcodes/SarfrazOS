"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ContentPhilosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const sentences = [
    "I believe knowledge becomes meaningful only when it is shared.",
    "Through videos, tutorials and technical content, I document my learning journey while helping others grow alongside me.",
    "Every upload is an opportunity to simplify difficult concepts, inspire curiosity and encourage continuous learning."
  ];

  return (
    <section ref={containerRef} className="w-full py-48 bg-white dark:bg-[#080808] relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full">
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-brand-blue dark:text-brand-emerald">
            Why I Create
          </h2>
        </motion.div>

        <div className="flex flex-col gap-8 md:gap-12">
          {sentences.map((sentence, index) => {
            // Calculate progress chunks for each sentence
            const start = index / sentences.length;
            const end = start + (1 / sentences.length);
            
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(scrollYProgress, [start, end], [20, 0]);

            return (
              <motion.p
                key={index}
                style={{ opacity, y }}
                className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.2]"
              >
                {sentence}
              </motion.p>
            );
          })}
        </div>

      </div>
    </section>
  );
}
