"use client";

import React, { useRef } from "react";
import { Blog } from "@/types";
import { motion, useScroll, useTransform } from "framer-motion";
import { Flame, Eye, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function TrendingArticles({ blogs }: { blogs: Blog[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // A subtle scroll parallax effect for the entire section background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  if (!blogs || blogs.length === 0) return null;

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-zinc-900 overflow-hidden">
      
      <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 blur-[120px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 animate-pulse">
            <Flame size={24} />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Trending Now
            </h2>
            <p className="text-zinc-400 font-medium mt-1">Most read articles this week.</p>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar -mx-6 px-6 md:-mx-12 md:px-12">
          {blogs.map((blog, index) => (
            <Link href={`/blog/${blog.slug}`} key={blog.id} className="snap-start shrink-0">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="group relative flex flex-col w-[300px] md:w-[400px] h-[450px] rounded-3xl overflow-hidden bg-black border border-white/10 hover:border-orange-500/50 transition-colors duration-500"
              >
                <img 
                  src={blog.coverImage} 
                  alt={blog.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-50 group-hover:opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                
                <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/20 backdrop-blur-md border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest">
                  <Flame size={14} /> Trending
                </div>

                <div className="relative z-10 p-8 mt-auto flex flex-col">
                  <h4 className="text-2xl font-bold text-white leading-tight mb-4 group-hover:text-orange-400 transition-colors line-clamp-3">
                    {blog.title}
                  </h4>
                  
                  <div className="flex items-center gap-4 text-xs font-bold text-zinc-400">
                    <span className="flex items-center gap-1.5"><Eye size={14} /> {blog.views?.toLocaleString() || 0}</span>
                    <span className="flex items-center gap-1.5"><Heart size={14} /> {blog.likes?.toLocaleString() || 0}</span>
                    <span className="flex items-center gap-1.5"><MessageCircle size={14} /> {blog.comments?.toLocaleString() || 0}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
