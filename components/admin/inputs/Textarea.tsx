import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || label.replace(/\s+/g, '-').toLowerCase();

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", className)}>
        <label htmlFor={inputId} className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
        
        <textarea
          id={inputId}
          ref={ref}
          className={cn(
            "w-full px-4 py-3 bg-white dark:bg-[#0B0B0D] border rounded-xl text-sm transition-all outline-none min-h-[120px] resize-y custom-scrollbar",
            "text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400",
            error 
              ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" 
              : "border-black/10 dark:border-white/10 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 hover:border-black/20 dark:hover:border-white/20",
            props.disabled && "opacity-50 cursor-not-allowed bg-black/5 dark:bg-white/5"
          )}
          {...props}
        />

        {error ? (
          <span className="text-xs font-medium text-red-500">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-zinc-500">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
