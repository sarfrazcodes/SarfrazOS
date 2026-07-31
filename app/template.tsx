"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function Template({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to true (dark) for SSR hydration matching, then sync with real theme
  const isDark = mounted ? theme === "dark" : true;

  const c1 = isDark ? "bg-[#6EE7B7]" : "bg-[#93C5FD]";
  const c2 = isDark ? "bg-[#10B981]" : "bg-[#3B82F6]";
  const c3 = isDark ? "bg-[#064E3B]" : "bg-[#1E3A8A]";
  const c4 = isDark ? "bg-[#050505]" : "bg-[#DCE8F5]";

  return (
    <>
      <style>{`
        @keyframes pageSlideOut {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .page-curtain {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          will-change: transform;
          z-index: 9998;
          pointer-events: none;
        }
        .animate-page-slide {
          animation: pageSlideOut 0.6s cubic-bezier(0.86,0,0.07,1) forwards;
        }
      `}</style>

      {/* The 4-layer sliding curtain for page transitions */}
      {/* We reverse the order of delays so that the top layer leaves first, revealing the trailing colors! */}
      <div className={`page-curtain ${c1} animate-page-slide`} style={{ animationDelay: "0.15s" }} />
      <div className={`page-curtain ${c2} animate-page-slide`} style={{ animationDelay: "0.10s" }} />
      <div className={`page-curtain ${c3} animate-page-slide`} style={{ animationDelay: "0.05s" }} />
      <div className={`page-curtain ${c4} animate-page-slide`} style={{ animationDelay: "0s" }} />

      {children}
    </>
  );
}
