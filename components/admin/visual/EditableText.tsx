"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAdmin } from "@/app/providers/AdminProvider";
import { Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditableTextProps {
  initialValue: string;
  onSave: (val: string) => Promise<void>;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  multiline?: boolean;
}

export default function EditableText({ 
  initialValue, 
  onSave, 
  as: Tag = "span", 
  className, 
  multiline 
}: EditableTextProps) {
  const { isAdmin } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const inputRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setValue(initialValue);
    if (inputRef.current && !isEditing) {
      inputRef.current.innerText = initialValue;
    }
  }, [initialValue, isEditing]);

  const handleBlur = async () => {
    setIsEditing(false);
    const currentValue = inputRef.current?.innerText || "";
    if (currentValue !== initialValue) {
      setStatus('saving');
      try {
        await onSave(currentValue);
        setValue(currentValue);
        setStatus('saved');
        setTimeout(() => setStatus('idle'), 2000);
      } catch (err) {
        setStatus('error');
        if (inputRef.current) inputRef.current.innerText = initialValue;
        setTimeout(() => setStatus('idle'), 2000);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      inputRef.current?.blur();
    }
    if (e.key === "Escape") {
      setValue(initialValue);
      setIsEditing(false);
      if (inputRef.current) {
        inputRef.current.innerText = initialValue;
        inputRef.current.blur();
      }
    }
  };

  if (!isAdmin) {
    return <Tag className={className}>{initialValue}</Tag>;
  }

  return (
    <div className="relative group inline-block w-full">
      <Tag
        ref={inputRef as any}
        contentEditable={isEditing}
        suppressContentEditableWarning
        onFocus={() => setIsEditing(true)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cn(
          className,
          "transition-all outline-none",
          isAdmin && !isEditing && "hover:ring-2 hover:ring-brand-blue/30 rounded-lg px-2 -mx-2 cursor-text",
          isEditing && "ring-2 ring-brand-blue rounded-lg px-2 -mx-2 bg-brand-blue/5"
        )}
      >
        {initialValue}
      </Tag>
      
      {/* Status indicator */}
      {status !== 'idle' && (
        <div className="absolute -top-8 right-0 text-xs font-bold px-2 py-1.5 rounded-lg bg-black text-white flex items-center gap-1.5 shadow-lg z-50 animate-in fade-in slide-in-from-bottom-2">
          {status === 'saving' && <><Loader2 size={14} className="animate-spin text-brand-blue" /> Saving...</>}
          {status === 'saved' && <><CheckCircle2 size={14} className="text-brand-emerald" /> Saved</>}
          {status === 'error' && <span className="text-red-500">Error Saving</span>}
        </div>
      )}
    </div>
  );
}
