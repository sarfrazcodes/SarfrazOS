import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ToggleSwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  description?: string;
  error?: string;
}

const ToggleSwitch = forwardRef<HTMLInputElement, ToggleSwitchProps>(
  ({ label, description, error, className, id, ...props }, ref) => {
    const inputId = id || label.replace(/\s+/g, '-').toLowerCase();

    return (
      <div className={cn("flex flex-row items-center justify-between gap-4 w-full p-4 rounded-xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#111113]", className)}>
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor={inputId} className="text-sm font-bold text-zinc-900 dark:text-zinc-100 cursor-pointer">
            {label}
          </label>
          {description && (
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{description}</span>
          )}
          {error && (
            <span className="text-xs font-medium text-red-500">{error}</span>
          )}
        </div>
        
        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
          <input 
            type="checkbox" 
            id={inputId}
            ref={ref}
            className="sr-only peer" 
            {...props}
          />
          <div className={cn(
            "w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-blue/20 dark:peer-focus:ring-brand-blue/20 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-brand-blue",
            props.disabled && "opacity-50 cursor-not-allowed"
          )}></div>
        </label>
      </div>
    );
  }
);

ToggleSwitch.displayName = "ToggleSwitch";

export default ToggleSwitch;
