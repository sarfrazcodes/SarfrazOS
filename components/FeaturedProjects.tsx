"use client";

import React from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function FeaturedProjects() {
  const featured = projects.filter(p => p.featured);

  return (
    <section id="projects" className="relative w-full py-24 md:py-32 bg-[#EAEAEA] dark:bg-[#050505] transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold tracking-widest uppercase text-brand-blue mb-4">Selected Work</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white leading-tight">
              Featured Projects.
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link 
              href="/projects" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-[#111111] text-zinc-900 dark:text-white border border-black/10 dark:border-white/10 font-bold text-sm hover:shadow-lg transition-all"
            >
              View All Projects
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        <div className="flex flex-col gap-12">
          {featured.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col lg:flex-row gap-8 lg:gap-16 items-center p-6 lg:p-8 rounded-[2rem] bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl overflow-hidden hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-500"
            >
              {/* Image side */}
              <div className="w-full lg:w-7/12 aspect-video rounded-2xl overflow-hidden relative shadow-lg">
                <div className="absolute inset-0 bg-black/10 dark:bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Text side */}
              <div className="w-full lg:w-5/12 flex flex-col justify-center">
                <h4 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2">{project.title}</h4>
                <p className="text-brand-blue font-medium mb-6">{project.tagline}</p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.skillIds.map(skillId => (
                    <span key={skillId} className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-black/5 dark:bg-white/10 text-zinc-800 dark:text-zinc-300">
                      {skillId}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 mt-auto">
                  <Link 
                    href={`/projects#${project.id}`}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:scale-110 transition-transform"
                  >
                    <ArrowUpRight size={20} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
