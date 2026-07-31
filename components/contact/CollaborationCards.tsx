"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, GitBranch, Briefcase, Mic } from "lucide-react";

export default function CollaborationCards() {
  const cards = [
    {
      id: "internships",
      title: "Internships",
      description: "Looking for mentorship or a place to learn? Let's discuss potential intern opportunities.",
      icon: <GraduationCap size={28} />,
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "group-hover:border-blue-500/50"
    },
    {
      id: "opensource",
      title: "Open Source",
      description: "Passionate about building in public? I am always open to contributing or co-maintaining.",
      icon: <GitBranch size={28} />,
      color: "from-emerald-500/20 to-teal-500/20",
      borderColor: "group-hover:border-emerald-500/50"
    },
    {
      id: "freelance",
      title: "Freelance",
      description: "Need a high-performance web application or AI architecture? Let's build something incredible.",
      icon: <Briefcase size={28} />,
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "group-hover:border-purple-500/50"
    },
    {
      id: "speaking",
      title: "Speaking",
      description: "Organizing an event or podcast? I'm available to talk about engineering, AI, and design.",
      icon: <Mic size={28} />,
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "group-hover:border-orange-500/50"
    }
  ];

  return (
    <section className="relative w-full py-24 z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
            How We Can Collaborate
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 font-medium max-w-xl mx-auto">
            I'm always looking for interesting projects and meaningful ways to connect with the community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className={`group relative flex flex-col p-8 rounded-[2rem] bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-black/5 dark:border-white/10 ${card.borderColor} transition-all duration-500 shadow-xl overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply dark:mix-blend-screen`} />
              
              <div className="relative z-10 w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center text-zinc-900 dark:text-white mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                {card.icon}
              </div>
              
              <h3 className="relative z-10 text-2xl font-bold text-zinc-900 dark:text-white mb-3">{card.title}</h3>
              <p className="relative z-10 text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
