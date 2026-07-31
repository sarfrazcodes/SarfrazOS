"use client";

import React from "react";
import { motion } from "framer-motion";
import { achievements } from "@/data/about";
import { Trophy } from "lucide-react";

export default function AboutAchievements() {
  return (
    <section className="relative w-full py-32 bg-transparent transition-colors duration-700">
      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-brand-blue mb-4">
            Milestones
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Key Achievements.
          </h3>
        </motion.div>

        <div className="flex flex-col gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="relative p-[1px] rounded-3xl bg-gradient-to-r from-black/5 to-transparent dark:from-white/10 dark:to-transparent"
            >
              <div className="relative w-full rounded-3xl bg-white dark:bg-[#111111] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-xl transition-shadow duration-300 group">
                
                <div className="flex items-start md:items-center gap-6">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-brand-blue group-hover:scale-110 group-hover:bg-brand-blue/10 transition-all duration-300">
                    <Trophy size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                      {achievement.title}
                    </h4>
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed max-w-xl">
                      {achievement.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  <span className="px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 text-sm font-bold text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                    {achievement.date}
                  </span>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
