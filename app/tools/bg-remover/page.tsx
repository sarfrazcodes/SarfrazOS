import React from "react";
import { Metadata } from "next";
import BgRemoverClient from "@/components/tools/BgRemoverClient";
import ContactBackground from "@/components/contact/ContactBackground"; 

export const metadata: Metadata = {
  title: "Background Remover | SarfrazOS",
  description: "Instantly remove the background from any image.",
};

export default function BgRemoverPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#050505] overflow-x-hidden relative selection:bg-brand-blue/30 selection:text-white dark:selection:text-white pb-32 pt-32">
      <ContactBackground />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col items-center">
        <BgRemoverClient />
      </div>
    </main>
  );
}
