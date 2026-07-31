"use client";

import React from "react";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutPhilosophy from "@/components/about/AboutPhilosophy";
import AboutTimeline from "@/components/about/AboutTimeline";
import AboutCurrentFocus from "@/components/about/AboutCurrentFocus";
import AboutSkills from "@/components/about/AboutSkills";
import AboutEducation from "@/components/about/AboutEducation";
import AboutCertifications from "@/components/about/AboutCertifications";
import AboutAchievements from "@/components/about/AboutAchievements";
import AboutInterests from "@/components/about/AboutInterests";
import AboutCTA from "@/components/about/AboutCTA";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-transparent relative">
      
      {/* Sticky Hero Section (Scroll Overlapping Effect) */}
      <div className="sticky top-0 h-screen w-full z-0">
        <AboutHero />
      </div>

      {/* Content that scrolls over the hero */}
      <div className="relative z-10 w-full bg-[#F8FAFC] dark:bg-[#050505] overflow-hidden">
        
        {/* Premium Light Mode Aurora Mesh Gradient */}
        <div className="absolute inset-0 pointer-events-none dark:hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-blue/10 blur-[120px]" />
          <div className="absolute top-[30%] -right-[10%] w-[40%] h-[60%] rounded-full bg-purple-400/10 blur-[120px]" />
          <div className="absolute bottom-[20%] left-[10%] w-[60%] h-[40%] rounded-full bg-brand-emerald/10 blur-[120px]" />
        </div>
        <AboutStory />
        <AboutPhilosophy />
        <AboutTimeline />
        <AboutCurrentFocus />
        <AboutSkills />
        <AboutEducation />
        <AboutCertifications />
        <AboutAchievements />
        <AboutInterests />

        {/* Cinematic SVG Curve Partition */}
        <div className="absolute bottom-0 left-0 w-full translate-y-[99%] z-10 pointer-events-none drop-shadow-[0_20px_30px_rgba(0,0,0,0.05)] dark:drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0,0 C480,150 960,150 1440,0 L1440,0 L0,0 Z" className="fill-[#F8FAFC] dark:fill-[#050505]" />
          </svg>
        </div>
      </div>

      {/* Sticky Footer CTA Section (Scroll Reveal from underneath) */}
      <div className="relative z-0 w-full bg-white dark:bg-[#050505]">
        <div className="sticky bottom-0 w-full">
          <AboutCTA />
        </div>
      </div>

    </main>
  );
}
