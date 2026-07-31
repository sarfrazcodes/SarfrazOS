"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, Upload, Download, RefreshCw, Wand2 } from "lucide-react";
import Link from "next/link";

type Status = "idle" | "processing" | "results";

export default function BgRemoverClient() {
  const [status, setStatus] = useState<Status>("idle");
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setFileUrl(url);
      setStatus("processing");
      
      // Simulate heavy AI processing
      setTimeout(() => {
        setStatus("results");
      }, 3500);
    }
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!sliderRef.current || status !== "results") return;
    
    let clientX;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = (e as React.MouseEvent).clientX;
    }

    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  // Demo Images for the "After" state (Using unsplash placeholders for demo)
  const originalImage = fileUrl || "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop";
  const transparentImage = "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop"; 
  // Note: For a real app, transparentImage would be the API result with a transparent background. 
  // We use CSS mix-blend-mode trickery below to simulate background removal if the user uploaded an image with a solid background, or just show the UI capability.

  return (
    <div className="w-full flex flex-col items-center">
      
      <div className="text-center mb-12">
        <Link href="/tools" className="text-brand-emerald font-bold text-sm mb-4 inline-block hover:underline">
          ← Back to Tools
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
          Image Background Remover
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 font-medium max-w-xl mx-auto">
          Upload any image and our machine learning model will instantly extract the foreground. 
        </p>
      </div>

      <AnimatePresence mode="wait">
        
        {/* IDLE STATE */}
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
              accept="image/png, image/jpeg, image/webp" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              onChange={handleFileUpload}
            />
            <div className="w-full h-80 rounded-[2rem] border-2 border-dashed border-black/10 dark:border-white/20 bg-white/50 dark:bg-black/20 backdrop-blur-xl flex flex-col items-center justify-center p-8 transition-colors hover:border-brand-emerald/50 dark:hover:border-brand-emerald/50 group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-emerald/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="w-20 h-20 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 relative z-10">
                <ImageIcon size={32} className="text-zinc-400 group-hover:text-brand-emerald transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 relative z-10">Upload an Image</h3>
              <p className="text-zinc-500 font-medium text-sm text-center relative z-10">
                Supports JPG, PNG, WEBP. <br/> High resolution recommended.
              </p>
            </div>
          </motion.div>
        )}

        {/* PROCESSING STATE */}
        {status === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="w-full max-w-2xl h-96 bg-black/5 dark:bg-white/5 rounded-[2rem] border border-black/10 dark:border-white/10 flex flex-col items-center justify-center relative overflow-hidden"
          >
            {/* Background Image Blurred */}
            {fileUrl && (
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 blur-xl dark:opacity-20"
                style={{ backgroundImage: `url(${fileUrl})` }}
              />
            )}
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 relative mb-6">
                <div className="absolute inset-0 border-4 border-black/10 dark:border-white/10 rounded-full" />
                <div className="absolute inset-0 border-4 border-brand-emerald rounded-full border-t-transparent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Wand2 size={32} className="text-brand-emerald animate-pulse" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Isolating Subject...</h3>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium text-sm">Applying edge-detection matrices.</p>
            </div>

            {/* Scanning Line */}
            <motion.div 
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-1 bg-brand-emerald shadow-[0_0_20px_rgba(16,185,129,0.8)] z-20"
            />
          </motion.div>
        )}

        {/* RESULTS STATE */}
        {status === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl flex flex-col gap-6"
          >
            <div className="w-full bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-[2rem] p-4 flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white px-4">
                <span className="w-2 h-2 rounded-full bg-brand-emerald" />
                Background Removed Successfully
                <span className="text-zinc-400 ml-2 font-normal hidden sm:inline">(UI Demo Mode)</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => { setStatus("idle"); setFileUrl(null); }}
                  className="p-3 rounded-xl bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  aria-label="Upload new image"
                >
                  <RefreshCw size={18} />
                </button>
                <button 
                  className="px-6 py-3 rounded-xl bg-brand-emerald text-white font-bold text-sm hover:bg-brand-emerald/90 transition-colors flex items-center gap-2"
                >
                  <Download size={18} />
                  Download HD
                </button>
              </div>
            </div>

            {/* Comparison Slider */}
            <div 
              ref={sliderRef}
              className="w-full aspect-video md:aspect-[21/9] rounded-[2rem] overflow-hidden relative cursor-ew-resize select-none bg-[url('https://ui-avatars.com/api/?name=Checkerboard&background=e5e5e5&color=e5e5e5&size=20')] dark:bg-[url('https://ui-avatars.com/api/?name=Checkerboard&background=1a1a1a&color=1a1a1a&size=20')] bg-repeat"
              onMouseMove={handleMouseMove}
              onTouchMove={handleMouseMove}
            >
              {/* After Image (Transparent) - Simulation using mix-blend-mode for the demo since we don't have a real ML backend here */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${originalImage})`, 
                  mixBlendMode: "multiply" // Simulating background removal visually for demo purposes
                }}
              />

              {/* Before Image (Original) */}
              <div 
                className="absolute top-0 left-0 bottom-0 bg-cover bg-center overflow-hidden"
                style={{ 
                  width: `${sliderPosition}%`,
                  backgroundImage: `url(${originalImage})`
                }}
              >
                {/* Ensure the image doesn't stretch when container shrinks */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${originalImage})`, width: "100vw", minWidth: "800px" }}
                />
              </div>

              {/* Slider Handle */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20"
                style={{ left: `calc(${sliderPosition}% - 2px)` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center">
                  <div className="w-1 h-4 border-l-2 border-r-2 border-zinc-300" />
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-lg text-xs font-bold text-white tracking-widest z-10">
                BEFORE
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 bg-brand-emerald/80 backdrop-blur-md rounded-lg text-xs font-bold text-white tracking-widest z-10">
                AFTER
              </div>
            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
