"use client";

import React from "react";
import { YoutubePlaylist } from "@/types";
import { motion } from "framer-motion";
import { ListVideo } from "lucide-react";

export default function CreatorPlaylists({ playlists }: { playlists: YoutubePlaylist[] }) {
  if (!playlists || playlists.length === 0) return null;

  return (
    <section className="w-full py-24 bg-white dark:bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center md:text-left"
        >
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-brand-blue dark:text-brand-emerald mb-4">
            Curated Series
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Playlists.
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {playlists.map((playlist, index) => (
            <motion.a
              href={`https://www.youtube.com/playlist?list=${playlist.id}`}
              target="_blank"
              rel="noreferrer"
              key={playlist.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="group relative block w-full rounded-3xl overflow-hidden bg-[#F8FAFC] dark:bg-[#111111] border border-black/5 dark:border-white/5 hover:border-brand-blue/50 dark:hover:border-brand-emerald/50 transition-all duration-500 shadow-sm hover:shadow-xl"
            >
              <div className="relative aspect-[21/9] overflow-hidden bg-zinc-900">
                <img 
                  src={playlist.thumbnailUrl} 
                  alt={playlist.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold">
                    <ListVideo size={14} />
                    {playlist.itemCount} Videos
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="text-xl font-bold text-zinc-900 dark:text-white leading-snug mb-2 group-hover:text-brand-blue dark:group-hover:text-brand-emerald transition-colors">
                  {playlist.title}
                </h4>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 line-clamp-2">
                  {playlist.description || "Explore this curated collection of videos."}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
