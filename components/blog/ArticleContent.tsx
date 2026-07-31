"use client";

import React, { useRef, useState, useEffect } from "react";
import { Blog } from "@/types";
import { motion, useScroll, useSpring } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MessageCircle, Briefcase, Link2, Copy, Check } from "lucide-react";

export default function ArticleContent({ blog }: { blog: Blog }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Top Reading Progress Bar
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative w-full pb-32">
      
      {/* Sticky Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-blue dark:bg-brand-emerald origin-left z-50"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-16 md:pt-24 flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
        
        {/* Main Article Content */}
        <div className="w-full lg:w-[65%]">
          <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-brand-blue dark:prose-a:text-brand-emerald">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: AnimatedParagraph,
                h2: AnimatedHeading,
                h3: AnimatedHeading,
                li: AnimatedListItem,
                blockquote: AnimatedQuote,
                pre: AnimatedCodeBlock
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>
          
          {/* Article Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-black/10 dark:border-white/10">
              <div className="flex flex-wrap gap-3">
                {blog.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-[#111111] text-sm font-bold text-zinc-600 dark:text-zinc-400">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[35%] relative">
          <div className="sticky top-32 flex flex-col gap-12">
            
            {/* Share Widget */}
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest">Share Article</h4>
              <div className="flex items-center gap-3">
                <ShareButton icon={<MessageCircle size={18} />} label="Twitter" />
                <ShareButton icon={<Briefcase size={18} />} label="LinkedIn" />
                <ShareButton icon={<Link2 size={18} />} label="Copy Link" isCopy />
              </div>
            </div>

            {/* Author Widget */}
            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-[#111111] border border-black/5 dark:border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <img src={blog.author.avatar} alt={blog.author.name} className="w-16 h-16 rounded-full" />
                <div>
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-white">{blog.author.name}</h4>
                  <p className="text-sm font-medium text-zinc-500">Software Engineer</p>
                </div>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                Building products, writing code, and sharing the journey. Specialized in AI architectures and modern frontend frameworks.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Immersive Reveal Components
// -----------------------------------------------------------------------------

function AnimatedParagraph({ children }: any) {
  return (
    <motion.p
      initial={{ opacity: 0.3, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-20% 0px -20% 0px" }} // Triggers when element is in the middle 60% of viewport
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="transition-all duration-700"
    >
      {children}
    </motion.p>
  );
}

function AnimatedHeading({ children, level }: any) {
  const Tag = `h${level}` as any;
  return (
    <motion.div
      initial={{ opacity: 0.3, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ margin: "-20% 0px -20% 0px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Tag>{children}</Tag>
    </motion.div>
  );
}

function AnimatedListItem({ children }: any) {
  return (
    <motion.li
      initial={{ opacity: 0.3, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ margin: "-20% 0px -20% 0px" }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.li>
  );
}

function AnimatedQuote({ children }: any) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ margin: "-20% 0px -20% 0px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="border-l-4 border-brand-blue dark:border-brand-emerald pl-6 py-2 my-8 italic text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-white/5 rounded-r-2xl"
    >
      {children}
    </motion.blockquote>
  );
}

function AnimatedCodeBlock({ children }: any) {
  return (
    <motion.pre
      initial={{ opacity: 0.3, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-20% 0px -20% 0px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative group rounded-2xl overflow-hidden shadow-xl"
    >
      {children}
    </motion.pre>
  );
}

// -----------------------------------------------------------------------------
// Sidebar Components
// -----------------------------------------------------------------------------

function ShareButton({ icon, label, isCopy }: { icon: React.ReactNode, label: string, isCopy?: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    if (isCopy) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button 
      onClick={handleClick}
      className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
      title={label}
    >
      {copied ? <Check size={18} className="text-green-500" /> : icon}
    </button>
  );
}
