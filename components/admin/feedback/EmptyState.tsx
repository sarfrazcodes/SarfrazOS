import React from "react";
import { FolderSearch } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export default function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="w-full py-16 px-6 flex flex-col items-center justify-center text-center bg-white dark:bg-[#111113] border border-black/5 dark:border-white/5 rounded-2xl border-dashed">
      <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-zinc-400 mb-6">
        {icon || <FolderSearch size={32} />}
      </div>
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{title}</h3>
      <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mb-8">
        {description}
      </p>
      {action && (
        <div>{action}</div>
      )}
    </div>
  );
}
