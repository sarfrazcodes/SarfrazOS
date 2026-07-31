"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
  { name: "Blogs", href: "/blog" },
  { name: "Creator Hub", href: "/youtube" },
  { name: "Toolbox", href: "/tools" },
  { name: "Contact", href: "/contact" }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  
  const pathname = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to the light mode color during SSR to guarantee hydration matches.
  // Once mounted on the client, we dynamically switch to the dark mode emerald.
  const ACCENT = mounted && theme === "dark" ? "#10B981" : "#7C6FF0";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto relative flex flex-col w-full transition-all duration-500 ease-out overflow-hidden border-b ${isScrolled
          ? "bg-white/80 dark:bg-[#050505]/95 backdrop-blur-[24px] border-black/10 dark:border-white/5 shadow-md"
          : "bg-transparent border-transparent shadow-none"
          }`}
      >
        <div className={`flex items-center justify-between w-full px-6 md:px-12 transition-all duration-500 ease-out ${isScrolled ? "h-[64px]" : "h-[72px]"}`}>
          {/* LEFT SECTION: Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 outline-none focus-visible:ring-2 rounded-md"
            style={{ ["--tw-ring-color" as string]: ACCENT }}
            aria-label="Return to Home"
          >
            <div
              className="relative w-8 h-8 rounded-[10px] flex items-center justify-center transition-all duration-300 group-hover:rotate-3"
              style={{
                background: `linear-gradient(135deg, ${ACCENT}40, ${ACCENT}0D)`,
                border: `1px solid ${ACCENT}59`,
              }}
            >
              <span className="text-sm font-bold text-zinc-900 dark:text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>S</span>
              <div className="absolute inset-0 rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: `0 0 16px ${ACCENT}73` }} />
            </div>
            <span className="font-bold tracking-tight text-lg hidden sm:block text-zinc-900 dark:text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Sarfraz<span className="text-zinc-500 font-medium">Codes</span>
            </span>
          </Link>

          {/* CENTER SECTION: Navigation Links */}
          <div className="hidden lg:flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link
                    href={link.href}
                    className={`relative z-10 px-4 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 rounded-full block ${isActive || hoveredLink === link.name
                      ? "text-zinc-900 dark:text-white"
                      : "text-zinc-600 dark:text-zinc-400"
                      }`}
                    style={{ ["--tw-ring-color" as string]: ACCENT }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.name}
                  </Link>
                  {hoveredLink === link.name && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 rounded-full z-0"
                      style={{ background: `${ACCENT}24`, border: `1px solid ${ACCENT}40` }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {isActive && hoveredLink !== link.name && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 rounded-full z-0"
                      style={{ background: `${ACCENT}14`, border: `1px solid ${ACCENT}2E` }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT SECTION: CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle className="mr-2" />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 hover:-translate-y-0.5 outline-none focus-visible:ring-2"
              style={{
                color: "#0d0d10",
                background: `linear-gradient(90deg, #ECEAFB 0%, ${ACCENT} 100%)`,
                ["--tw-ring-color" as string]: ACCENT,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 24px ${ACCENT}59`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex items-center gap-4 lg:hidden">
            <ThemeToggle />
            <button
              className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors outline-none focus-visible:ring-2 rounded-md"
              style={{ ["--tw-ring-color" as string]: ACCENT }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Signature: scroll-progress thread */}
        <div className="h-[1.5px] w-full bg-black/5 dark:bg-white/5">
          <motion.div
            className="h-full"
            style={{ width: `${scrollProgress}%`, background: `linear-gradient(90deg, ${ACCENT}, #ECEAFB)` }}
            transition={{ ease: "linear", duration: 0.15 }}
          />
        </div>
      </motion.nav>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto absolute top-[88px] left-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur-[24px] border border-black/10 dark:border-white/10 shadow-2xl rounded-2xl p-6 flex flex-col gap-6 lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-base font-medium rounded-xl transition-all"
                    style={isActive ? { background: "rgba(124,111,240,0.14)", border: "1px solid rgba(124,111,240,0.25)", color: "inherit" } : {}}
                  >
                    <span className={isActive ? "text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400"}>
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className="h-[1px] w-full bg-black/10 dark:bg-white/10" />

            <div className="flex flex-col gap-3">
              <a
                href="/resume.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex justify-center items-center gap-2 py-3 text-sm font-medium rounded-xl transition-colors shadow-lg"
                style={{ color: "#0d0d10", background: "linear-gradient(90deg, #ECEAFB 0%, #C9C2F7 100%)" }}
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}