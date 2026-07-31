"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface SmartImageProps extends Omit<ImageProps, 'src'> {
  src?: string | null;
  fallbackText?: string;
  containerClassName?: string;
}

export default function SmartImage({
  src,
  alt,
  className,
  containerClassName,
  fallbackText = "Image unavailable",
  ...props
}: SmartImageProps) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // If no source is provided at all, show fallback immediately
  if (!src) {
    return (
      <div className={cn("flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-900 text-zinc-400 rounded-lg overflow-hidden", containerClassName, className)}>
        <ImageOff size={24} className="mb-2 opacity-50" />
        <span className="text-xs font-medium uppercase tracking-wider">{fallbackText}</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 rounded-lg", containerClassName)}>
      {isLoading && !error && (
        <div className="absolute inset-0 animate-pulse bg-zinc-200 dark:bg-zinc-800" />
      )}
      
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400">
          <ImageOff size={24} className="mb-2 opacity-50" />
          <span className="text-xs font-medium uppercase tracking-wider">{fallbackText}</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt || "Image"}
          className={cn(
            "transition-opacity duration-500",
            isLoading ? "opacity-0" : "opacity-100",
            className
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setError(true);
            setIsLoading(false);
          }}
          {...props}
        />
      )}
    </div>
  );
}
