"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { splineStore } from "@/lib/splineStore";

export let triggerThemeCurtain = (newTheme: string) => {};

export default function ThemeTransition() {
  const [phase, setPhase] = useState<"idle" | "in" | "out">("idle");
  const [targetTheme, setTargetTheme] = useState("dark");
  const [isLoaded, setIsLoaded] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    triggerThemeCurtain = (newTheme: string) => {
      if (phase !== "idle") return; // Prevent spamming
      
      setTargetTheme(newTheme);
      setPhase("in");
      setIsLoaded(false);
      
      // Wait for curtains to close (600ms matching CSS transition)
      setTimeout(() => {
        setTheme(newTheme); // Snap theme while covered
        
        // Wait dynamically for the new Spline scene to finish loading!
        const checkInterval = setInterval(() => {
          if (splineStore.heroLoaded) {
            clearInterval(checkInterval);
            setIsLoaded(true);
            // Give an extra 200ms padding for safe rendering
            setTimeout(() => {
              setPhase("out"); // Slide curtains out
              
              // Reset after animation (600ms)
              setTimeout(() => setPhase("idle"), 600);
            }, 200);
          }
        }, 100);
      }, 600);
    };
  }, [setTheme, phase]);

  if (phase === "idle") return null;

  // Determine colors based on target theme (Dark -> Emerald, Light -> Blue)
  const isDark = targetTheme === "dark";
  const c1 = isDark ? "bg-[#6EE7B7]" : "bg-[#93C5FD]";
  const c2 = isDark ? "bg-[#10B981]" : "bg-[#3B82F6]";
  const c3 = isDark ? "bg-[#064E3B]" : "bg-[#1E3A8A]";
  const c4 = isDark ? "bg-[#050505]" : "bg-gradient-to-b from-[#EBF2FA] to-[#DCE8F5]";
  
  const textColor = isDark ? "text-white/80" : "text-zinc-600";
  const spinnerBorder = isDark ? "border-white/10 border-t-brand-emerald" : "border-black/10 border-t-brand-blue";
  const glowColor = isDark ? "rgba(16,185,129,0.15)" : "rgba(124,111,240,0.15)";
  
  // Stagger the entrance, but exit all at once so the top layer covers the others (no splash on exit)
  const delay1 = phase === "in" ? "0s" : "0s";
  const delay2 = phase === "in" ? "0.05s" : "0s";
  const delay3 = phase === "in" ? "0.1s" : "0s";
  const delay4 = phase === "in" ? "0.15s" : "0s";

  // The CSS animation directions. 'in' slides from right to center. 'out' slides from center to left.
  const slideIn = "animate-[curtainIn_0.6s_cubic-bezier(0.86,0,0.07,1)_forwards]";
  const slideOut = "animate-[curtainOut_0.6s_cubic-bezier(0.86,0,0.07,1)_forwards]";
  const animation = phase === "in" ? slideIn : slideOut;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <style>{`
        @keyframes curtainIn {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }
        @keyframes curtainOut {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .theme-curtain {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          will-change: transform;
          transform: translateX(100%);
        }
      `}</style>
      
      {/* The multi-colored sliders */}
      <div className={`theme-curtain ${c1} ${animation}`} style={{ animationDelay: delay1 }} />
      <div className={`theme-curtain ${c2} ${animation}`} style={{ animationDelay: delay2 }} />
      <div className={`theme-curtain ${c3} ${animation}`} style={{ animationDelay: delay3 }} />
      <div className={`theme-curtain ${c4} ${animation} flex flex-col items-center justify-center overflow-hidden`} style={{ animationDelay: delay4 }}>
        
        {/* Soft Breathing Glow behind the loading UI */}
        <div
          className="absolute rounded-full animate-pulse pointer-events-none"
          style={{
            width: 420,
            height: 420,
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            filter: "blur(10px)",
          }}
        />

        {/* Loading UI on the final curtain */}
        <div 
          className="relative flex flex-col items-center justify-center transition-all duration-300 ease-out z-10 w-full h-full" 
          style={{ 
            opacity: phase === 'in' && !isLoaded ? 1 : 0, 
            transform: phase === 'in' && !isLoaded ? 'scale(1)' : 'scale(0.95)'
          }}
        >
           <div className={`w-10 h-10 rounded-full border-2 ${spinnerBorder} animate-spin mb-4 shadow-lg`} />
           <p className={`${textColor} font-mono text-[11px] font-bold tracking-[0.2em] uppercase`}>Loading...</p>
        </div>

      </div>
    </div>
  );
}
