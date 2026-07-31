"use client";

import { useEffect } from "react";

export default function ScrollOptimizer() {
  useEffect(() => {
    let scrollTimer: NodeJS.Timeout | null = null;
    
    const handleScroll = () => {
      // Hardware-disable pointer events across the entire DOM during scroll
      if (!document.body.classList.contains("disable-pointer-events")) {
        document.body.classList.add("disable-pointer-events");
      }
      
      // Clear previous timeout and set a new one
      if (scrollTimer) clearTimeout(scrollTimer);
      
      scrollTimer = setTimeout(() => {
        document.body.classList.remove("disable-pointer-events");
      }, 150); // Re-enable pointer events 150ms after the user stops scrolling
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, []);

  return null;
}
