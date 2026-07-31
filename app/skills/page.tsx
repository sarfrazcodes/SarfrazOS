"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills, SkillCategory } from "@/data/skills";
import { projects } from "@/data/projects";
import Link from "next/link";
import { ArrowLeft, ChevronDown, Wrench } from "lucide-react";

export default function SkillsPage() {
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);

  const categories: SkillCategory[] = ["Frontend", "Backend", "AI & Architecture", "Tools"];

  return (
    <main className="min-h-screen bg-[#F5F5F7] dark:bg-[#050505] pt-32 pb-24 px-6 md:px-12 transition-colors duration-700">
      <div className="max-w-4xl mx-auto">
        


        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 dark:text-white mb-6">
            Technical Arsenal.
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-16">
            A deep dive into the technologies I use to architect premium digital experiences. Click any skill to see how I implement it in production.
          </p>
        </motion.div>

        <div className="flex flex-col gap-16">
          {categories.map((category, catIndex) => {
            const categorySkills = skills.filter(s => s.category === category);
            if (categorySkills.length === 0) return null;

            return (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              >
                <h2 className="text-sm font-bold tracking-widest uppercase text-brand-blue mb-6 border-b border-black/10 dark:border-white/10 pb-4">
                  {category}
                </h2>
                
                <div className="flex flex-col gap-4">
                  {categorySkills.map((skill) => {
                    const isActive = activeSkillId === skill.id;
                    const relatedProjects = projects.filter(p => p.skillIds.includes(skill.id));

                    return (
                      <div key={skill.id} id={skill.id} className="scroll-mt-32">
                        <button
                          onClick={() => setActiveSkillId(isActive ? null : skill.id)}
                          className={`w-full flex items-center justify-between p-6 rounded-2xl transition-all duration-300 ${
                            isActive 
                              ? "bg-white dark:bg-white/10 shadow-xl border border-transparent" 
                              : "bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-black/5 dark:border-white/5"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div 
                              className="flex items-center justify-center w-12 h-12 rounded-xl"
                              style={{ backgroundColor: `${skill.color}15`, color: skill.color }}
                            >
                              <skill.icon size={24} />
                            </div>
                            <div className="text-left">
                              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{skill.name}</h3>
                              <p className="text-sm text-zinc-500 dark:text-zinc-400 hidden sm:block">{skill.description.substring(0, 60)}...</p>
                            </div>
                          </div>
                          
                          <motion.div animate={{ rotate: isActive ? 180 : 0 }} className="text-zinc-400">
                            <ChevronDown />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-6 md:p-8 mt-2 mx-2 rounded-2xl bg-black/5 dark:bg-black/20 border border-black/5 dark:border-white/5">
                                <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Implementation Methodology</h4>
                                <p className="text-zinc-700 dark:text-zinc-300 mb-8 leading-relaxed">
                                  {skill.description}
                                </p>

                                {relatedProjects.length > 0 ? (
                                  <>
                                    <h4 className="font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                                      <Wrench size={16} className="text-brand-blue" /> Applied In Production
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      {relatedProjects.map(project => (
                                        <Link 
                                          key={project.id} 
                                          href={`/projects#${project.id}`}
                                          className="p-4 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-brand-blue transition-colors group"
                                        >
                                          <p className="font-bold text-zinc-900 dark:text-white group-hover:text-brand-blue transition-colors">{project.title}</p>
                                          <p className="text-sm text-zinc-500 dark:text-zinc-400">{project.tagline}</p>
                                        </Link>
                                      ))}
                                    </div>
                                  </>
                                ) : (
                                  <p className="text-sm text-zinc-500 italic">No public projects currently showcase this skill.</p>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
