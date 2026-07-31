"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Image as ImageIcon, Code, Search, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";

const tools = [
  {
    id: "resume-checker",
    title: "AI Resume Checker",
    description: "Upload your resume and get an instant ATS compatibility score alongside actionable feedback to land more interviews.",
    icon: <FileText size={24} />,
    href: "/tools/resume-checker",
    color: "from-blue-500 to-indigo-500",
    shadow: "shadow-blue-500/20",
    badge: "Hot",
    status: "available"
  },
  {
    id: "bg-remover",
    title: "Background Remover",
    description: "Instantly remove the background from any image using advanced machine learning. Perfect for thumbnails and profile pictures.",
    icon: <ImageIcon size={24} />,
    href: "/tools/bg-remover",
    color: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/20",
    badge: "Beta",
    status: "available"
  },
  {
    id: "snippet-generator",
    title: "Snippet Generator",
    description: "Generate beautiful, syntax-highlighted code snippets for your social media posts in one click.",
    icon: <Code size={24} />,
    href: "#",
    color: "from-purple-500 to-pink-500",
    shadow: "shadow-purple-500/20",
    status: "coming_soon"
  },
  {
    id: "seo-analyzer",
    title: "SEO Meta Analyzer",
    description: "Analyze your website's meta tags and Open Graph data to see exactly how it will appear on social platforms.",
    icon: <Search size={24} />,
    href: "#",
    color: "from-orange-500 to-red-500",
    shadow: "shadow-orange-500/20",
    status: "coming_soon"
  }
];

export default function ToolsGrid() {
  return (
    <section className="relative w-full py-12 z-10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            >
              <Link 
                href={tool.href}
                className={`group relative flex flex-col p-8 md:p-10 rounded-[2rem] bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/30 transition-all duration-500 overflow-hidden h-full ${tool.status === 'available' ? 'cursor-pointer hover:-translate-y-2 hover:shadow-2xl' : 'cursor-not-allowed opacity-80'}`}
              >
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} text-white flex items-center justify-center shadow-lg ${tool.shadow} group-hover:scale-110 transition-transform duration-500`}>
                    {tool.icon}
                  </div>
                  
                  {tool.badge && tool.status === "available" && (
                    <div className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-xs font-bold text-zinc-700 dark:text-zinc-300 backdrop-blur-md">
                      {tool.badge}
                    </div>
                  )}

                  {tool.status === "coming_soon" && (
                    <div className="px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 backdrop-blur-md">
                      <Lock size={12} />
                      Coming Soon
                    </div>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 relative z-10">{tool.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed flex-1 relative z-10">
                  {tool.description}
                </p>

                {tool.status === "available" && (
                  <div className="mt-8 flex items-center text-sm font-bold text-zinc-900 dark:text-white relative z-10">
                    Open Tool
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
