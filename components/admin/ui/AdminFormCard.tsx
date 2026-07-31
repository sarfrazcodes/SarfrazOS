import React from "react";

export default function AdminFormCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white dark:bg-[#111113] border border-black/5 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
