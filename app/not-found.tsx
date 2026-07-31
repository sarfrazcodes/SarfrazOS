"use client";

import React from "react";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#DCE8F5] dark:bg-[#050505] p-6 relative overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/10 dark:bg-brand-blue/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-emerald/10 dark:bg-brand-emerald/5 rounded-full blur-2xl -z-10 translate-x-20 translate-y-20" />

      <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center">
        <h1 className="text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-zinc-800 to-zinc-400 dark:from-white dark:to-zinc-600 leading-none select-none drop-shadow-sm">
          404
        </h1>
        
        <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-black/5 dark:border-white/10 p-8 rounded-[2rem] shadow-2xl mt-8 w-full">
          <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-3">Page Not Found</h2>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium mb-8">
            The page you're looking for doesn't exist, has been moved, or is temporarily unavailable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white font-bold hover:bg-black/10 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
            <Link 
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <Home size={18} />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
