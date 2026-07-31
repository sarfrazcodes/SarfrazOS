"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Upload, CheckCircle2, AlertTriangle, ShieldCheck, Zap, Terminal } from "lucide-react";
import Link from "next/link";

type Status = "idle" | "analyzing" | "results";

export default function ResumeCheckerClient() {
  const [status, setStatus] = useState<Status>("idle");
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus("analyzing");
      
      // Simulate an API call / Heavy processing
      setTimeout(() => {
        setStatus("results");
      }, 4500);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      <div className="text-center mb-12">
        <Link href="/tools" className="text-brand-blue font-bold text-sm mb-4 inline-block hover:underline">
          ← Back to Tools
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
          AI Resume Checker
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 font-medium max-w-xl mx-auto">
          Drop your PDF below to instantly analyze your ATS readability, keyword density, and overall impact score.
        </p>
      </div>

      <AnimatePresence mode="wait">
        
        {/* IDLE STATE - UPLOAD UI */}
        {status === "idle" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-2xl relative"
          >
            <input 
              type="file" 
              accept=".pdf" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              onChange={handleFileUpload}
            />
            <div className="w-full h-80 rounded-[2rem] border-2 border-dashed border-black/10 dark:border-white/20 bg-white/50 dark:bg-black/20 backdrop-blur-xl flex flex-col items-center justify-center p-8 transition-colors hover:border-brand-blue/50 dark:hover:border-brand-blue/50 group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-brand-emerald/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="w-20 h-20 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 relative z-10">
                <Upload size={32} className="text-zinc-400 group-hover:text-brand-blue transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 relative z-10">Upload your Resume</h3>
              <p className="text-zinc-500 font-medium text-sm text-center relative z-10">
                Drag and drop your PDF here, or click to browse. <br/> Maximum file size: 5MB.
              </p>
            </div>
          </motion.div>
        )}

        {/* ANALYZING STATE - TERMINAL UI */}
        {status === "analyzing" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl bg-[#0d0d10] rounded-[2rem] border border-white/10 p-8 shadow-2xl overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 right-0 h-10 bg-white/5 border-b border-white/10 flex items-center px-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto text-xs font-mono text-zinc-500 flex items-center gap-2">
                <Terminal size={12} />
                sarfraz-ai-parser.sh
              </div>
            </div>
            
            <div className="mt-8 font-mono text-sm space-y-3">
              <LogMessage delay={0} text={`> Extracting text from ${file?.name}...`} />
              <LogMessage delay={1} text="> Identifying section headers..." />
              <LogMessage delay={2} text="> Cross-referencing industry keywords..." />
              <LogMessage delay={3} text="> Calculating ATS readability score..." />
              <LogMessage delay={4} text="> Finalizing report..." className="text-brand-emerald" />
              
              <div className="pt-6 flex justify-center">
                <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
          </motion.div>
        )}

        {/* RESULTS STATE - SCORE & FEEDBACK */}
        {status === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col gap-8"
          >
            {/* Score Hero */}
            <div className="w-full bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-black/5 dark:shadow-none relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-emerald/10 blur-[80px] rounded-full pointer-events-none" />
              
              <div className="flex flex-col relative z-10 text-center md:text-left">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Resume Score</h2>
                <p className="text-zinc-500 dark:text-zinc-400 font-medium">Your resume is strong, but has room for optimization.</p>
              </div>
              
              <div className="relative z-10 w-40 h-40 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="45" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-black/5 dark:text-white/10" />
                  <motion.circle 
                    initial={{ strokeDashoffset: 283 }}
                    animate={{ strokeDashoffset: 283 - (283 * 84) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    cx="50" cy="50" r="45" fill="transparent" stroke="currentColor" strokeWidth="8" 
                    strokeDasharray="283"
                    className="text-brand-emerald" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold text-zinc-900 dark:text-white">84</span>
                  <span className="text-xs font-bold text-brand-emerald uppercase tracking-widest">/100</span>
                </div>
              </div>
            </div>

            {/* Feedback Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck size={20} className="text-brand-emerald" />
                  <h3 className="font-bold text-zinc-900 dark:text-white">ATS Readability</h3>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  Excellent. The PDF text layer is fully extractable. Standard fonts detected. No complex multi-column layouts blocking parsing.
                </p>
              </div>

              <div className="bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle size={20} className="text-yellow-500" />
                  <h3 className="font-bold text-zinc-900 dark:text-white">Action Verbs</h3>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  You used "helped" and "worked on" 4 times. Try upgrading to strong action verbs like "Architected", "Spearheaded", or "Optimized".
                </p>
              </div>

              <div className="bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap size={20} className="text-brand-blue" />
                  <h3 className="font-bold text-zinc-900 dark:text-white">Impact Metrics</h3>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  Only 2 bullet points contain quantifiable numbers. Recruiters love data. (e.g., "Increased performance by 40%").
                </p>
              </div>

              <div className="bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Want to test another?</h3>
                <button 
                  onClick={() => { setStatus("idle"); setFile(null); }}
                  className="px-6 py-2 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold text-sm hover:scale-105 transition-transform"
                >
                  Upload New Resume
                </button>
              </div>
            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

function LogMessage({ text, delay, className = "text-zinc-400" }: { text: string, delay: number, className?: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay * 800);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;
  return (
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
      <span className={className}>{text}</span>
    </motion.div>
  );
}
