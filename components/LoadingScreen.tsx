"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { splineStore } from "@/lib/splineStore";

const STATUS_MESSAGES = [
  "resolving modules",
  "bundling assets",
  "linking components",
  "optimizing build",
  "ready",
];

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [statusIndex, setStatusIndex] = useState(0);
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  // Cursor blink
  useEffect(() => {
    const blink = setInterval(() => setCursorOn((c) => !c), 530);
    return () => clearInterval(blink);
  }, []);

  // Cycle status messages independent of progress, purely for texture
  useEffect(() => {
    if (isReady) return;
    const id = setInterval(() => {
      setStatusIndex((i) => (i < STATUS_MESSAGES.length - 2 ? i + 1 : i));
    }, 480);
    return () => clearInterval(id);
  }, [isReady]);

  useEffect(() => {
    let currentProgress = 0;
    const startTime = Date.now();
    const targetDuration = 1800; // Fast, elegant load

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const isDocumentReady = document.readyState === "complete";
      const allLoaded = splineStore.heroLoaded && splineStore.personasLoaded;

      if (isDocumentReady && elapsed > targetDuration * 0.5) {
        if (allLoaded) {
          currentProgress += (100 - currentProgress) * 0.15;
        } else {
          if (currentProgress < 90) {
            currentProgress += (90 - currentProgress) * 0.05;
          }
        }
      } else {
        currentProgress += targetDuration - elapsed > 0 ? 0.8 : 0.4;
      }

      if (currentProgress >= 99.9 && allLoaded) {
        setProgress(100);
        setIsReady(true);
        setStatusIndex(STATUS_MESSAGES.length - 1);
        setTimeout(() => setIsVisible(false), 650);
      } else {
        setProgress(currentProgress);
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);

  if (!isVisible) return null;

  const displayProgress = Math.min(100, Math.round(progress));

  return (
    <AnimatePresence>
      <motion.div
        key="loading-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, filter: "blur(6px)" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#09090b" }}
      >
        {/* Ambient grid backdrop */}
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
            maskImage:
              "radial-gradient(ellipse 60% 55% at 50% 50%, black 0%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 55% at 50% 50%, black 0%, transparent 75%)",
          }}
        />

        {/* Soft breathing glow behind wordmark */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 420,
            height: 420,
            background:
              "radial-gradient(circle, rgba(124,111,240,0.16) 0%, rgba(124,111,240,0) 70%)",
            filter: "blur(10px)",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative flex flex-col items-center w-full max-w-[280px] px-6">
          {/* Wordmark with blinking terminal cursor */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-10 flex items-baseline"
            style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
          >
            <h1 className="text-[28px] font-bold tracking-wide text-white">
              Sarfraz
              <span style={{ color: "#7C6FF0" }} className="font-extrabold ml-1">Codes</span>
            </h1>
            <motion.span
              aria-hidden
              className="ml-[3px] inline-block w-[2px] h-[22px] translate-y-[2px]"
              style={{
                backgroundColor: "#7C6FF0",
                opacity: cursorOn ? 1 : 0,
              }}
            />
          </motion.div>

          {/* Progress rail */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="relative w-full h-[2px] rounded-full overflow-hidden"
            style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          >
            <motion.div
              className="h-full relative"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg, #7C6FF0 0%, #ECEAFB 100%)",
              }}
              transition={{ ease: "linear", duration: 0.1 }}
            >
              {/* traveling shimmer, signature detail */}
              <motion.div
                className="absolute inset-y-0 right-0 w-6"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.9))",
                  filter: "blur(2px)",
                }}
                animate={{ opacity: [0.2, 0.9, 0.2] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          {/* Status row: terminal-style message + live percentage */}
          <div
            className="w-full mt-4 flex items-center justify-between text-[11px]"
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              color: "rgba(255,255,255,0.38)",
            }}
          >
            <div className="flex items-center gap-1.5 h-4 overflow-hidden">
              <span style={{ color: "#7C6FF0" }}>&gt;</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={STATUS_MESSAGES[statusIndex]}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  {STATUS_MESSAGES[statusIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="tabular-nums" style={{ color: "rgba(255,255,255,0.55)" }}>
              {displayProgress}%
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}