"use client";
import Hero from "./Hero";
import Personas from "./Personas";
import { usePathname } from "next/navigation";

export default function Desktop() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // By keeping this mounted using opacity and fixed positioning when not home, 
  // the WebGL context NEVER suspends or unmounts, completely eliminating lag!
  return (
    <div 
      style={{ 
        height: isHome ? "auto" : "100vh", 
        overflow: isHome ? "visible" : "hidden",
        position: isHome ? "relative" : "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: isHome ? 0 : -10,
        opacity: isHome ? 1 : 0,
        pointerEvents: isHome ? "auto" : "none",
        display: isHome ? "block" : "none"
      }}
    >
      <div className="sticky top-0 h-screen w-full z-0">
        <Hero />
      </div>
      <div className="relative z-10 w-full shadow-[0_-20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_-20px_50px_rgba(0,0,0,0.5)] bg-gradient-to-b from-white to-[#E0E7FF] dark:from-transparent dark:to-transparent">
        <Personas />
      </div>
    </div>
  );
}
