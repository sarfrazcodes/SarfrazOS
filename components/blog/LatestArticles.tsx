"use client";

import React from "react";
import { Blog } from "@/types";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LatestArticles({ blogs }: { blogs: Blog[] }) {
  if (!blogs || blogs.length === 0) return null;

  return (
    <section className="w-full py-24 bg-[#F8FAFC] dark:bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-brand-blue dark:text-brand-emerald mb-4">
              Latest Entries
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Recently Published.
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <Link href={`/blog/${blog.slug}`} key={blog.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="group flex flex-col h-full bg-white dark:bg-[#111111] rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 hover:border-brand-blue dark:hover:border-brand-emerald hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                  <img 
                    src={blog.coverImage} 
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs font-bold text-zinc-500 mb-4">
                    {blog.publishedAt && (
                      <span>{new Date(blog.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    )}
                    <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    <span className="flex items-center gap-1"><Clock size={12} /> {blog.readingTime}</span>
                  </div>

                  <h4 className="text-2xl font-bold text-zinc-900 dark:text-white leading-tight mb-4 group-hover:text-brand-blue dark:group-hover:text-brand-emerald transition-colors line-clamp-2">
                    {blog.title}
                  </h4>
                  
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed line-clamp-3 mb-8">
                    {blog.excerpt}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-black/5 dark:border-white/5">
                    <div className="flex items-center gap-3">
                      <img src={blog.author.avatar} alt={blog.author.name} className="w-8 h-8 rounded-full" />
                      <span className="text-sm font-bold text-zinc-900 dark:text-white">{blog.author.name}</span>
                    </div>
                    
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-50 dark:bg-white/5 group-hover:bg-brand-blue dark:group-hover:bg-brand-emerald text-zinc-400 group-hover:text-white transition-colors duration-300">
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
