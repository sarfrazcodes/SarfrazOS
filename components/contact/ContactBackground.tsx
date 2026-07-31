"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ContactBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden bg-[#fafafa] dark:bg-[#050505] transition-colors duration-700">
      
      {/* Fluid Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-brand-blue/20 dark:bg-brand-blue/15 blur-[100px] mix-blend-multiply dark:mix-blend-screen"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, -60, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-brand-emerald/20 dark:bg-brand-emerald/15 blur-[120px] mix-blend-multiply dark:mix-blend-screen"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, 40, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-purple-500/15 dark:bg-purple-500/10 blur-[100px] mix-blend-multiply dark:mix-blend-screen"
      />
      
      {/* Premium Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />
    </div>
  );
}
