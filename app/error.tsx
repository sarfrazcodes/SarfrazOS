"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error("Global application error caught:", error);
  }, [error]);

  return (
    <html>
      <body className="bg-[#DCE8F5] dark:bg-[#050505]">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-red-500/20 p-8 rounded-[2rem] shadow-2xl max-w-md w-full text-center">
            
            <div className="w-16 h-16 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>

            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-3">Something went wrong!</h2>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium mb-8 text-sm">
              An unexpected application error occurred. We've logged the issue.
            </p>

            <button
              onClick={() => reset()}
              className="w-full py-4 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCcw size={18} />
              Try Again
            </button>
            
          </div>
        </div>
      </body>
    </html>
  );
}
