"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>("All");

  // Get unique skill IDs used across all projects for the filter
  const allUsedSkillIds = Array.from(new Set(projects.flatMap(p => p.skillIds)));
  const filterOptions = ["All", ...allUsedSkillIds];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.skillIds.includes(filter));

  return (
    <main className="min-h-screen bg-[#F5F5F7] dark:bg-[#050505] pt-32 pb-24 px-6 md:px-12 transition-colors duration-700">
      <div className="max-w-7xl mx-auto">
        


        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 dark:text-white mb-6">
            All Projects.
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-12">
            A comprehensive look at my engineering work, from scalable architectures to immersive 3D interfaces.
          </p>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-16">
          {filterOptions.map(option => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                filter === option 
                  ? "bg-brand-blue text-white shadow-lg" 
                  : "bg-white dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10"
              }`}
            >
              {option === "All" ? "All Projects" : skills.find(s => s.id === option)?.name || option}
            </button>
          ))}
        </div>

        {/* Projects List */}
        <div className="flex flex-col gap-24">
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              id={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center scroll-mt-32"
            >
              <div className="w-full lg:w-1/2 aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl relative">
                <img src={project.imageUrl} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
              </div>

              <div className="w-full lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-2">{project.title}</h2>
                <h3 className="text-brand-blue text-lg font-medium mb-6">{project.tagline}</h3>
                
                <p className="text-zinc-700 dark:text-zinc-300 text-lg leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="p-6 rounded-2xl bg-white/50 dark:bg-black/20 border border-black/5 dark:border-white/5 mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Implementation Details</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {project.detailedImplementation}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.skillIds.map(skillId => {
                    const skill = skills.find(s => s.id === skillId);
                    if (!skill) return null;
                    return (
                      <Link 
                        key={skillId}
                        href={`/skills#${skillId}`}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-brand-blue transition-colors text-zinc-900 dark:text-white"
                      >
                        <skill.icon size={14} style={{ color: skill.color }} />
                        {skill.name}
                      </Link>
                    )
                  })}
                </div>

                <div className="flex gap-4">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold hover:scale-105 transition-transform">
                      Live Project <ArrowUpRight size={16} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-white/10 text-zinc-900 dark:text-white border border-black/10 dark:border-white/20 font-bold hover:bg-zinc-100 dark:hover:bg-white/20 transition-colors">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
}
