"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import LoadingButton from "../inputs/LoadingButton";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
}

export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = false,
  isLoading = false
}: ConfirmationDialogProps) {
  
  // Prevent scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={isLoading ? undefined : onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-white dark:bg-[#111113] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isDestructive ? 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400' : 'bg-brand-blue/10 text-brand-blue'}`}>
                    <AlertTriangle size={20} />
                  </div>
                  <button 
                    onClick={onClose}
                    disabled={isLoading}
                    className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors disabled:opacity-50"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                  {title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  {description}
                </p>
              </div>

              <div className="p-4 bg-black/5 dark:bg-white/5 border-t border-black/5 dark:border-white/5 flex items-center justify-end gap-3">
                <LoadingButton 
                  type="button" 
                  variant="ghost" 
                  onClick={onClose}
                  disabled={isLoading}
                >
                  {cancelText}
                </LoadingButton>
                
                <LoadingButton 
                  type="button" 
                  variant={isDestructive ? "danger" : "primary"} 
                  onClick={onConfirm}
                  isLoading={isLoading}
                >
                  {confirmText}
                </LoadingButton>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
