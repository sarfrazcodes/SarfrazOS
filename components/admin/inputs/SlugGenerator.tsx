"use client";

import React, { forwardRef, useEffect, useState } from "react";
import { cn, generateSlug } from "@/lib/utils";
import { RefreshCcw } from "lucide-react";

export interface SlugGeneratorProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  sourceText?: string;
  error?: string;
  helperText?: string;
}

/**
 * An input that automatically generates a slug based on a source text prop,
 * but allows manual overriding.
 */
const SlugGenerator = forwardRef<HTMLInputElement, SlugGeneratorProps>(
  ({ label, sourceText, error, helperText, className, id, onChange, value, ...props }, ref) => {
    const inputId = id || label.replace(/\s+/g, '-').toLowerCase();
    
    // Controlled state to manage auto-generation vs manual edit
    const [internalValue, setInternalValue] = useState(value || "");
    const [isAutoSyncing, setIsAutoSyncing] = useState(true);

    // Auto-sync when sourceText changes, unless user manually edited
    useEffect(() => {
      if (isAutoSyncing && sourceText !== undefined) {
        setInternalValue(generateSlug(sourceText));
      }
    }, [sourceText, isAutoSyncing]);

    const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsAutoSyncing(false); // Stop auto-syncing if user types manually
      const slugified = generateSlug(e.target.value);
      setInternalValue(slugified);
      if (onChange) onChange(e);
    };

    const handleForceSync = () => {
      setIsAutoSyncing(true);
      if (sourceText) {
        const slugified = generateSlug(sourceText);
        setInternalValue(slugified);
        
        // Create synthetic event to trigger external onChange
        if (onChange) {
          const event = {
            target: { value: slugified, name: props.name }
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(event);
        }
      }
    };

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", className)}>
        <div className="flex justify-between items-center">
          <label htmlFor={inputId} className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {label} {props.required && <span className="text-red-500">*</span>}
          </label>
          <button 
            type="button" 
            onClick={handleForceSync}
            className="text-[10px] uppercase font-bold text-brand-blue hover:text-brand-emerald flex items-center gap-1 transition-colors"
            title="Auto-generate from title"
          >
            <RefreshCcw size={10} /> Auto
          </button>
        </div>
        
        <div className="relative flex items-center">
          <div className="absolute left-4 text-zinc-400 font-mono text-sm">/</div>
          <input
            id={inputId}
            ref={ref}
            value={value !== undefined ? value : internalValue}
            onChange={handleManualChange}
            className={cn(
              "w-full pl-8 pr-4 py-2.5 bg-zinc-50 dark:bg-[#050505] border rounded-xl text-sm transition-all outline-none font-mono",
              "text-zinc-700 dark:text-zinc-300 placeholder:text-zinc-400",
              error 
                ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" 
                : "border-black/10 dark:border-white/10 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 hover:border-black/20 dark:hover:border-white/20",
              props.disabled && "opacity-50 cursor-not-allowed"
            )}
            {...props}
          />
        </div>

        {error ? (
          <span className="text-xs font-medium text-red-500">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-zinc-500">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

SlugGenerator.displayName = "SlugGenerator";

export default SlugGenerator;
