import React from "react";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export default function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <div className={cn("flex flex-col md:flex-row gap-8 py-8 border-b border-black/5 dark:border-white/5 last:border-0", className)}>
      <div className="w-full md:w-1/3 flex-shrink-0">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{description}</p>
        )}
      </div>
      <div className="w-full md:w-2/3 flex flex-col gap-6">
        {children}
      </div>
    </div>
  );
}
