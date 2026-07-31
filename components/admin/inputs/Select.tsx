import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { SelectItem } from "@/types/cms";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectItem[];
  error?: string;
  helperText?: string;
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, helperText, placeholder, className, id, ...props }, ref) => {
    const inputId = id || label.replace(/\s+/g, '-').toLowerCase();

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", className)}>
        <label htmlFor={inputId} className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
        
        <div className="relative">
          <select
            id={inputId}
            ref={ref}
            className={cn(
              "w-full px-4 py-2.5 bg-white dark:bg-[#0B0B0D] border rounded-xl text-sm transition-all outline-none appearance-none cursor-pointer",
              "text-zinc-900 dark:text-zinc-100",
              error 
                ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" 
                : "border-black/10 dark:border-white/10 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 hover:border-black/20 dark:hover:border-white/20",
              props.disabled && "opacity-50 cursor-not-allowed bg-black/5 dark:bg-white/5"
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-zinc-500">
            <ChevronDown size={16} />
          </div>
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

Select.displayName = "Select";

export default Select;
