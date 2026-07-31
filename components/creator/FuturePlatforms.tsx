"use client";

import React from "react";
import { motion } from "framer-motion";
import { Camera, Briefcase, GitBranch, Rss, Mic } from "lucide-react";

export default function FuturePlatforms() {
  const platforms = [
    {
      name: "GitHub",
      description: "Open source projects and code.",
      icon: GitBranch,
      status: "Active",
      url: "https://github.com",
      color: "group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-900"
    },
    {
      name: "LinkedIn",
      description: "Professional network and articles.",
      icon: Briefcase,
      status: "Active",
      url: "https://linkedin.com",
      color: "group-hover:bg-[#0A66C2] group-hover:text-white"
    },
    {
      name: "Instagram",
      description: "Behind the scenes and lifestyle.",
      icon: Camera,
      status: "Coming Soon",
      url: "#",
      color: "group-hover:bg-gradient-to-tr group-hover:from-[#FD1D1D] group-hover:to-[#833AB4] group-hover:text-white"
    },
    {
      name: "Blog / Newsletter",
      description: "Deep dive technical articles.",
      icon: Rss,
      status: "Coming Soon",
      url: "#",
      color: "group-hover:bg-brand-emerald group-hover:text-white"
    },
    {
      name: "Podcast",
      description: "Conversations on engineering.",
      icon: Mic,
      status: "Future",
      url: "#",
      color: "group-hover:bg-purple-500 group-hover:text-white"
    }
  ];

  return (
    <section className="w-full py-24 bg-[#F8FAFC] dark:bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-brand-blue dark:text-brand-emerald mb-4">
            Ecosystem
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Future Platforms.
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {platforms.map((platform, index) => (
            <motion.a
              href={platform.url}
              target={platform.url !== "#" ? "_blank" : "_self"}
              rel="noreferrer"
              key={platform.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className={`group relative p-6 rounded-3xl bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 flex flex-col items-start hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-xl overflow-hidden`}
            >
              {/* Animated Hover Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/0 to-brand-emerald/0 group-hover:from-brand-blue/5 group-hover:to-brand-emerald/5 transition-colors duration-500" />

              <div className="flex justify-between items-start w-full mb-12 relative z-10">
                <div className={`w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center text-zinc-600 dark:text-zinc-400 transition-colors duration-500 ${platform.color}`}>
                  <platform.icon size={24} />
                </div>
                
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                  platform.status === "Active" 
                    ? "bg-brand-emerald/10 text-brand-emerald" 
                    : platform.status === "Coming Soon"
                    ? "bg-brand-blue/10 text-brand-blue"
                    : "bg-zinc-100 dark:bg-white/10 text-zinc-500 dark:text-zinc-400"
                }`}>
                  {platform.status}
                </span>
              </div>

              <div className="relative z-10 mt-auto">
                <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                  {platform.name}
                </h4>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  {platform.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
