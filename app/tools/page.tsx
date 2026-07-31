import React from "react";
import { Metadata } from "next";
import ToolsHero from "@/components/tools/ToolsHero";
import ToolsGrid from "@/components/tools/ToolsGrid";
import ContactBackground from "@/components/contact/ContactBackground"; // Reuse the beautiful aurora/fluid background!

export const metadata: Metadata = {
  title: "Tools | SarfrazOS",
  description: "Free developer and creator tools built by Sarfraz.",
};

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#050505] overflow-x-hidden relative selection:bg-brand-blue/30 selection:text-white dark:selection:text-white pb-32">
      <ContactBackground />
      <ToolsHero />
      <ToolsGrid />
    </main>
  );
}
