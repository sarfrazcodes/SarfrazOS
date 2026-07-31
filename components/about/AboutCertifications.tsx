"use client";

import React from "react";
import { motion } from "framer-motion";
import { certifications } from "@/data/about";
import { ExternalLink, Award } from "lucide-react";

export default function AboutCertifications() {
  return (
    <section className="relative w-full py-32 bg-transparent transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center md:text-left mb-16"
        >
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-brand-emerald mb-4">
            Qualifications
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Professional Certifications.
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="group relative"
            >
              <div className="relative w-full h-full rounded-3xl bg-white dark:bg-[#111111] border border-black/5 dark:border-white/10 p-8 flex flex-col hover:border-brand-emerald transition-colors duration-500 shadow-sm hover:shadow-xl overflow-hidden">
                
                {/* Background Hover Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-emerald/0 group-hover:bg-brand-emerald/10 rounded-full blur-3xl transition-colors duration-700" />
                
                <div className="relative z-10 flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-brand-emerald">
                    <Award size={24} />
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-zinc-600 dark:text-zinc-300">
                    {cert.date}
                  </span>
                </div>

                <div className="relative z-10 flex-grow">
                  <p className="text-sm font-bold tracking-widest uppercase text-zinc-500 mb-2">
                    {cert.issuer}
                  </p>
                  <h4 className="text-xl font-bold text-zinc-900 dark:text-white leading-snug mb-6">
                    {cert.credential}
                  </h4>
                </div>

                <div className="relative z-10 mt-auto">
                  <a 
                    href={cert.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white group/btn"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink size={16} className="text-zinc-400 group-hover/btn:text-brand-emerald group-hover/btn:translate-x-1 transition-all" />
                  </a>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
