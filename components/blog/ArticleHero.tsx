"use client";

import React, { useRef } from "react";
import { Blog } from "@/types";
import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, Calendar } from "lucide-react";

export default function ArticleHero({ blog }: { blog: Blog }) {
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect for the hero image
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={heroRef} className="relative w-full h-[70vh] min-h-[600px] overflow-hidden bg-black">
      
      {/* Parallax Image */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
        <img 
          src={blog.featuredImage || blog.coverImage} 
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 z-10 flex flex-col justify-end max-w-4xl mx-auto px-6 md:px-12 w-full pb-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="px-4 py-1.5 rounded-full bg-brand-blue/20 text-brand-blue font-bold text-xs uppercase tracking-widest border border-brand-blue/30 backdrop-blur-md">
              {blog.category}
            </span>
            <span className="flex items-center gap-2 text-sm font-bold text-white/60">
              <Clock size={16} /> {blog.readingTime}
            </span>
            {blog.publishedAt && (
              <span className="flex items-center gap-2 text-sm font-bold text-white/60">
                <Calendar size={16} /> {new Date(blog.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tighter mb-8 leading-[1.1]">
            {blog.title}
          </h1>

          <div className="flex items-center gap-4">
            <img src={blog.author.avatar} alt={blog.author.name} className="w-14 h-14 rounded-full border-2 border-white/20 shadow-xl" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white">{blog.author.name}</span>
              <span className="text-sm font-medium text-white/60">Software Engineer & AI Architect</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
}
