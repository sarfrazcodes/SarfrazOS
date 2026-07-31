"use client";

import React, { useRef, useState } from "react";
import { CreatorSocials } from "@/types";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Camera, Briefcase, ExternalLink, Play, ArrowUpRight, ArrowRight } from "lucide-react";

// -----------------------------------------------------------------------------
// Magnetic Button Component
// -----------------------------------------------------------------------------
function MagneticButton({ children, href, className }: { children: React.ReactNode, href: string, className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold overflow-hidden group ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.a>
  );
}

// -----------------------------------------------------------------------------
// 3D Tilt Card Wrapper Component
// -----------------------------------------------------------------------------
function TiltCard({ children, className, accentColor }: { children: React.ReactNode, className?: string, accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className={`relative group w-full rounded-[2.5rem] bg-white dark:bg-[#0A0A0A] border border-black/5 dark:border-white/5 shadow-xl transition-shadow duration-500 hover:shadow-2xl overflow-hidden ${className}`}
    >
      {/* Animated gradient border on hover */}
      <div 
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${accentColor} pointer-events-none -z-10 blur-xl`} 
        style={{ transform: "translateZ(-50px)" }} 
      />
      <div className="relative z-10 w-full h-full p-8 md:p-12">
        {children}
      </div>
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// Main Social Presence Component
// -----------------------------------------------------------------------------
export default function SocialPresence({ data }: { data: CreatorSocials }) {
  if (!data) return null;

  return (
    <section className="w-full py-24 bg-[#F8FAFC] dark:bg-[#050505] overflow-hidden perspective-1000">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-brand-blue dark:text-brand-emerald mb-4">
            Social Presence
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
            Beyond the code.
          </h3>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium max-w-2xl mx-auto">
            Building in public. Sharing ideas. Connecting with people.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* ========================================================= */}
          {/* INSTAGRAM CARD */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            <TiltCard accentColor="from-[#FD1D1D]/30 to-[#833AB4]/30" className="h-full flex flex-col">
              
              {/* Profile Header */}
              <div className="flex items-start justify-between mb-8" style={{ transform: "translateZ(30px)" }}>
                <div className="flex items-center gap-6">
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#FD1D1D] to-[#833AB4] p-1">
                    <img 
                      src={data.instagramAvatar} 
                      alt={data.instagramUsername} 
                      className="w-full h-full rounded-full object-cover border-4 border-white dark:border-[#0A0A0A]"
                    />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                      <Camera className="text-[#E1306C]" size={24} />
                      Instagram
                    </h4>
                    <p className="text-zinc-500 font-medium">{data.instagramUsername}</p>
                    <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E1306C]/10 text-[#E1306C] text-[10px] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E1306C] animate-pulse" />
                      Active Creator
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-zinc-600 dark:text-zinc-400 font-medium mb-10 leading-relaxed" style={{ transform: "translateZ(20px)" }}>
                Sharing behind-the-scenes development, coding sessions, project progress and everyday engineering moments.
              </p>

              {/* Reel Preview */}
              <div className="mt-auto" style={{ transform: "translateZ(40px)" }}>
                <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4">Featured Reel</h5>
                <a 
                  href={data.latestInstagramReel}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block w-full aspect-[9/16] max-h-[400px] rounded-3xl overflow-hidden bg-zinc-900 cursor-pointer"
                >
                  <img 
                    src={data.latestInstagramReel} // The URL should ideally be the thumbnail, but using it directly as requested or using the avatar as a fallback placeholder if it's a generic link
                    alt="Latest Instagram Reel"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                    // Fallback to avatar if the reel string is just a link and not a valid image URL for the thumbnail
                    onError={(e) => { (e.target as HTMLImageElement).src = data.instagramAvatar; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Glowing Border & Play Icon */}
                  <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-3xl transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                      <Play size={24} className="text-white fill-white ml-1" />
                    </div>
                  </div>
                </a>
              </div>

              {/* CTA */}
              <div className="mt-10" style={{ transform: "translateZ(30px)" }}>
                <MagneticButton 
                  href={data.instagramProfile} 
                  className="w-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white shadow-lg shadow-[#FD1D1D]/20"
                >
                  Follow on Instagram
                  <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
                </MagneticButton>
              </div>

            </TiltCard>
          </motion.div>

          {/* ========================================================= */}
          {/* LINKEDIN CARD */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <TiltCard accentColor="from-[#0A66C2]/30 to-[#004182]/30" className="h-full flex flex-col">
              
              {/* Profile Header */}
              <div className="flex items-start justify-between mb-8" style={{ transform: "translateZ(30px)" }}>
                <div className="flex items-center gap-6">
                  <div className="relative w-20 h-20 rounded-full bg-[#0A66C2] p-1">
                    <img 
                      src={data.linkedinAvatar} 
                      alt="LinkedIn Profile" 
                      className="w-full h-full rounded-full object-cover border-4 border-white dark:border-[#0A0A0A]"
                    />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                      <Briefcase className="text-[#0A66C2]" size={24} />
                      LinkedIn
                    </h4>
                    <p className="text-zinc-500 font-medium">{data.linkedinHeadline}</p>
                    <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] text-[10px] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0A66C2]" />
                      Open to Collaboration
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-zinc-600 dark:text-zinc-400 font-medium mb-10 leading-relaxed" style={{ transform: "translateZ(20px)" }}>
                Sharing technical articles, engineering insights, project updates and professional milestones.
              </p>

              {/* Featured Post */}
              <div className="mt-auto" style={{ transform: "translateZ(40px)" }}>
                <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4">Featured Post</h5>
                <a 
                  href={data.latestLinkedInPost}
                  target="_blank"
                  rel="noreferrer"
                  className="group block w-full p-6 rounded-3xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-[#0A66C2]/50 transition-colors duration-500 cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-4 text-xs font-bold text-zinc-500">
                    <Briefcase size={14} className="text-[#0A66C2]" />
                    <span>Recent Update</span>
                  </div>
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-white leading-snug mb-2 group-hover:text-[#0A66C2] transition-colors">
                    {data.latestLinkedInPostTitle}
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 mb-6">
                    {data.latestLinkedInPostExcerpt}
                  </p>
                  
                  <div className="flex items-center text-sm font-bold text-[#0A66C2]">
                    Read More 
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </div>

              {/* CTA */}
              <div className="mt-10" style={{ transform: "translateZ(30px)" }}>
                <MagneticButton 
                  href={data.linkedinProfile} 
                  className="w-full bg-[#0A66C2] text-white shadow-lg shadow-[#0A66C2]/20 hover:bg-[#004182] transition-colors"
                >
                  Connect on LinkedIn
                  <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
                </MagneticButton>
              </div>

            </TiltCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
