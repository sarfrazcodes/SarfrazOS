"use client";

import React from "react";
import { useAdmin } from "@/app/providers/AdminProvider";
import { Edit, Trash2, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminToolbarProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "center";
}

export default function AdminToolbar({ onEdit, onDelete, onDuplicate, position = "top-right" }: AdminToolbarProps) {
  const { isAdmin } = useAdmin();

  if (!isAdmin) return null;

  const positionClasses = {
    "top-right": "top-2 right-2",
    "top-left": "top-2 left-2",
    "bottom-right": "bottom-2 right-2",
    "bottom-left": "bottom-2 left-2",
    "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  return (
    <div className={cn(
      "absolute z-50 flex items-center gap-1 p-1 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-xl shadow-xl border border-black/10 dark:border-white/10 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0",
      positionClasses[position]
    )}>
      {onEdit && (
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(); }}
          className="p-2 text-zinc-600 hover:text-brand-blue hover:bg-brand-blue/10 rounded-lg transition-colors"
          title="Edit"
        >
          <Edit size={16} />
        </button>
      )}
      {onDuplicate && (
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDuplicate(); }}
          className="p-2 text-zinc-600 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors"
          title="Duplicate"
        >
          <Copy size={16} />
        </button>
      )}
      {onDelete && (
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(); }}
          className="p-2 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}
