"use client";

import React from "react";
import { YoutubeChannelStats } from "@/types";
import { motion } from "framer-motion";
import { Users, Video, Eye, Calendar } from "lucide-react";

export default function CreatorStats({ stats }: { stats: YoutubeChannelStats }) {
  
  const parseNum = (str: string) => parseInt(str, 10);
  
  const formatCompact = (num: number) => {
    return new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(num);
  };

  const getYears = (dateStr: string) => {
    const created = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    return Math.max(1, Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365)));
  };

  const metrics = [
    {
      label: "Subscribers",
      value: formatCompact(parseNum(stats.subscriberCount)),
      icon: Users,
      color: "text-brand-blue dark:text-brand-emerald"
    },
    {
      label: "Total Views",
      value: formatCompact(parseNum(stats.viewCount)),
      icon: Eye,
      color: "text-purple-500"
    },
    {
      label: "Videos",
      value: stats.videoCount,
      icon: Video,
      color: "text-blue-500"
    },
    {
      label: "Years Creating",
      value: getYears(stats.creationDate).toString(),
      icon: Calendar,
      color: "text-emerald-500"
    }
  ];

  return (
    <section className="w-full py-24 bg-[#F8FAFC] dark:bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="relative p-6 md:p-8 rounded-3xl bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-500 shadow-sm hover:shadow-xl"
            >
              <div className={`w-12 h-12 rounded-full bg-zinc-50 dark:bg-white/5 flex items-center justify-center mb-6 ${metric.color}`}>
                <metric.icon size={24} />
              </div>
              <h4 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tighter mb-2">
                {metric.value}
              </h4>
              <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-zinc-500">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
