"use client";

import React from "react";
import { YoutubeVideo } from "@/types";
import { motion } from "framer-motion";
import { Play, Clock, Calendar, Eye } from "lucide-react";

export default function FeaturedVideo({ video }: { video: YoutubeVideo }) {
  if (!video) return null;

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

  const formatViews = (views: string) => {
    const num = parseInt(views, 10);
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <section id="featured" className="w-full py-24 bg-[#F8FAFC] dark:bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-brand-blue dark:text-brand-emerald mb-4">
            Featured
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Latest Upload.
          </h3>
        </motion.div>

        <motion.a
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="group block relative w-full rounded-3xl overflow-hidden bg-white dark:bg-[#111111] border border-black/5 dark:border-white/10 shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500"
        >
          <div className="flex flex-col lg:flex-row">
            
            {/* Thumbnail */}
            <div className="relative w-full lg:w-2/3 aspect-video lg:aspect-auto overflow-hidden bg-zinc-900">
              <img 
                src={video.thumbnailUrl} 
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              
              {/* Massive Play Button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                  <Play size={40} className="text-white fill-white ml-2" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative w-full lg:w-1/3 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-6">
                <span className="flex items-center gap-1"><Clock size={14} /> {video.duration}</span>
                <span className="flex items-center gap-1"><Eye size={14} /> {formatViews(video.viewCount)} views</span>
                <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(video.publishedAt)}</span>
              </div>
              
              <h4 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white leading-snug mb-4 group-hover:text-brand-blue dark:group-hover:text-brand-emerald transition-colors">
                {video.title}
              </h4>
              
              <p className="text-zinc-600 dark:text-zinc-400 font-medium line-clamp-4">
                {video.description}
              </p>
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
