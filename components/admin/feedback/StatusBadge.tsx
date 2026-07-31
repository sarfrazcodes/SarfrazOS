import React from "react";
import { cn } from "@/lib/utils";

export default function StatusBadge({ status }: { status: "draft" | "published" | "archived" | string }) {
  const styles = {
    draft: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20",
    published: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 border-green-200 dark:border-green-500/20",
    archived: "bg-zinc-100 text-zinc-700 dark:bg-zinc-500/10 dark:text-zinc-400 border-zinc-200 dark:border-zinc-500/20"
  };

  const currentStyle = styles[status as keyof typeof styles] || styles.draft;

  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border", currentStyle)}>
      {status}
    </span>
  );
}
