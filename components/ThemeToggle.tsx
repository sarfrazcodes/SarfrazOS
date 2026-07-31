"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { triggerThemeCurtain } from "./ThemeTransition";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme } = useTheme();

  return (
    <button
      onClick={() => triggerThemeCurtain(theme === "dark" ? "light" : "dark")}
      className={`relative p-2 rounded-full flex items-center justify-center transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800 ${className || ""}`}
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-zinc-900" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-zinc-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
