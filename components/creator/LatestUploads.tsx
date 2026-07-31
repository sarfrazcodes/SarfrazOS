"use client";

import React from "react";
import { YoutubeVideo, CreatorSocials } from "@/types";
import { motion } from "framer-motion";
import { Play, Eye, Clock, Camera, Briefcase, ArrowUpRight } from "lucide-react";

export default function LatestUploads({ videos, socials }: { videos: YoutubeVideo[], socials?: CreatorSocials }) {
  if (!videos || videos.length === 0) return null;

  const formatViews = (views: string) => {
    const num = parseInt(views, 10);
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <section className="w-full py-24 bg-[#F8FAFC] dark:bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-brand-blue dark:text-brand-emerald mb-4">
              Latest Content
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Recent Uploads & Activity.
            </h3>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* First 3 Videos */}
          {videos.slice(0, 3).map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} formatViews={formatViews} />
          ))}

          {/* 4th Video */}
          {videos[3] && (
            <VideoCard key={videos[3].id} video={videos[3]} index={3} formatViews={formatViews} />
          )}

          {/* Instagram Reel Card */}
          {socials && (
            <motion.a
              href={socials.latestInstagramReel}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="group relative flex flex-col bg-zinc-900 rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 hover:border-[#E1306C] hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-[0_20px_40px_rgba(225,48,108,0.2)]"
            >
              <img 
                src={socials.instagramAvatar} // Falling back to avatar or a generic bg since reel thumbnail might not be available as an image url
                alt="Latest Instagram Reel"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-60 group-hover:opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#833AB4]/90 via-[#FD1D1D]/80 to-[#F56040]/80 mix-blend-multiply" />
              
              <div className="relative z-10 p-6 flex flex-col h-full text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold">
                    <Camera size={14} /> Instagram Reel
                  </div>
                  <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 group-hover:-translate-y-1 transition-all duration-500" />
                </div>
                
                <div className="mt-auto">
                  <div className="w-16 h-16 mb-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-500 shadow-lg">
                    <Play size={24} className="text-white fill-white ml-1" />
                  </div>
                  <h4 className="text-2xl font-bold leading-tight mb-2">
                    Behind the code
                  </h4>
                  <p className="text-white/80 text-sm font-medium line-clamp-2">
                    Check out the latest engineering sessions and project updates on Instagram.
                  </p>
                </div>
              </div>
            </motion.a>
          )}

          {/* LinkedIn Post Card */}
          {socials && (
            <motion.a
              href={socials.latestLinkedInPost}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="group relative flex flex-col bg-white dark:bg-[#0A0A0A] rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 hover:border-[#0A66C2] hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-[0_20px_40px_rgba(10,102,194,0.15)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A66C2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 p-8 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-[#0A66C2] font-bold text-xs">
                    <Briefcase size={16} /> Latest Article
                  </div>
                  <ArrowUpRight size={20} className="text-[#0A66C2] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 group-hover:-translate-y-1 transition-all duration-500" />
                </div>
                
                <h4 className="text-xl font-bold text-zinc-900 dark:text-white leading-snug mb-4 group-hover:text-[#0A66C2] transition-colors">
                  {socials.latestLinkedInPostTitle}
                </h4>
                
                <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-4 font-medium leading-relaxed mb-6">
                  {socials.latestLinkedInPostExcerpt}
                </p>

                <div className="mt-auto flex items-center gap-3 pt-6 border-t border-black/5 dark:border-white/5">
                  <img src={socials.linkedinAvatar} alt="Profile" className="w-8 h-8 rounded-full" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">Sarfraz</span>
                    <span className="text-[10px] text-zinc-500">View on LinkedIn</span>
                  </div>
                </div>
              </div>
            </motion.a>
          )}

        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

function VideoCard({ video, index, formatViews }: { video: YoutubeVideo, index: number, formatViews: (v: string) => string }) {
  return (
    <motion.a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group flex flex-col bg-white dark:bg-[#111111] rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 hover:border-brand-blue dark:hover:border-brand-emerald hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-xl"
    >
      <div className="relative aspect-video overflow-hidden bg-zinc-900">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
        />
        
        {/* Glass overlay & Play icon */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <div className="w-16 h-16 rounded-full bg-brand-blue/90 dark:bg-brand-emerald/90 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 delay-100">
            <Play size={24} className="text-white fill-white ml-1" />
          </div>
        </div>

        {/* Duration Badge */}
        {video.duration && (
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 backdrop-blur-md rounded-md text-white text-xs font-bold">
            {video.duration}
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h4 className="text-xl font-bold text-zinc-900 dark:text-white line-clamp-2 leading-snug mb-4 group-hover:text-brand-blue dark:group-hover:text-brand-emerald transition-colors">
          {video.title}
        </h4>
        
        <div className="mt-auto flex items-center gap-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">
          <span className="flex items-center gap-1"><Eye size={14} /> {formatViews(video.viewCount)}</span>
          <span className="flex items-center gap-1"><Clock size={14} /> {new Date(video.publishedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </motion.a>
  );
}
