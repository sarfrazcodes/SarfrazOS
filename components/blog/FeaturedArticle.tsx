"use client";

import React from "react";
import { Blog } from "@/types";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";

export default function FeaturedArticle({ blog }: { blog: Blog }) {
  if (!blog) return null;

  return (
    <section className="w-full py-12 bg-[#F8FAFC] dark:bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        <Link href={`/blog/${blog.slug}`}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="group relative w-full rounded-[2rem] overflow-hidden aspect-[4/5] md:aspect-[21/9] bg-zinc-900 border border-black/5 dark:border-white/10 shadow-2xl cursor-pointer"
          >
            {/* Background Image */}
            <img 
              src={blog.featuredImage || blog.coverImage} 
              alt={blog.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out opacity-80 group-hover:opacity-100"
            />
            
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent md:mix-blend-multiply opacity-80" />

            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 z-10 text-white">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-widest uppercase border border-white/10">
                  {blog.category}
                </span>
                <span className="flex items-center gap-2 text-sm font-medium text-white/80">
                  <Clock size={16} /> {blog.readingTime}
                </span>
                {blog.publishedAt && (
                  <span className="text-sm font-medium text-white/60">
                    {new Date(blog.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </span>
                )}
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight">
                {blog.title}
              </h2>
              
              <p className="text-lg text-white/80 max-w-2xl font-medium mb-10 line-clamp-2 md:line-clamp-3 leading-relaxed">
                {blog.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={blog.author.avatar} alt={blog.author.name} className="w-12 h-12 rounded-full border-2 border-white/20" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">{blog.author.name}</span>
                    <span className="text-xs font-medium text-white/60">Author</span>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-bold group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                  Read Article
                  <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-300" />
                </div>
              </div>
            </div>
            
          </motion.div>
        </Link>

      </div>
    </section>
  );
}
