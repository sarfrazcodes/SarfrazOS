import React from "react";

interface AdminPageHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function AdminPageHeader({ title, description, action }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">{title}</h1>
        <p className="text-zinc-500 dark:text-zinc-400 font-medium mt-1">{description}</p>
      </div>
      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}
