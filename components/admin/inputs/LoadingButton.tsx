import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  icon?: React.ReactNode;
}

export default function LoadingButton({ 
  children, 
  isLoading, 
  loadingText, 
  variant = "primary", 
  icon,
  className, 
  disabled,
  ...props 
}: LoadingButtonProps) {
  
  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brand-blue text-white hover:bg-brand-blue/90 shadow-md shadow-brand-blue/20",
    secondary: "bg-black/5 dark:bg-white/5 text-zinc-900 dark:text-white hover:bg-black/10 dark:hover:bg-white/10",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-500/20",
    ghost: "bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white"
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          {loadingText || "Please wait..."}
        </>
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
