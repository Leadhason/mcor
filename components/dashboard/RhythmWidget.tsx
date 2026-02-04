"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideZap, LucideArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RhythmWidgetProps {
  primaryFocus?: string;
  path?: string;
  className?: string;
}

export function RhythmWidget({
  primaryFocus = "Deep Work",
  path = "Founder",
  className,
}: RhythmWidgetProps) {
  return (
    <div
      className={cn(
        "relative group overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/5 p-8 transition-all duration-500 hover:border-emerald-500/20",
        className,
      )}
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full group-hover:bg-emerald-500/10 transition-colors" />

      <div className="relative flex flex-col h-full justify-between space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-500/60">
                Active Rhythm
              </span>
            </div>
            <h3 className="text-2xl font-light tracking-tight">
              {primaryFocus}
            </h3>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-emerald-500/20 transition-all">
            <LucideArrowUpRight className="h-4 w-4 text-white/20 group-hover:text-emerald-500" />
          </div>
        </div>

        {/* Visualizer Placeholder */}
        <div className="flex items-end gap-1.5 h-16 px-2">
          {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.4, 0.6, 1.0, 0.7, 0.5, 0.8].map(
            (val, i) => (
              <motion.div
                key={i}
                initial={{ height: "20%" }}
                animate={{ height: `${val * 100}%` }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
                className="flex-1 bg-emerald-500/20 rounded-t-full group-hover:bg-emerald-500/30 transition-colors"
              />
            ),
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <LucideZap className="h-3.5 w-3.5 text-emerald-500" />
            </div>
            <span className="text-xs text-white/40 font-light">
              Mode: <span className="text-white/80">{path}</span>
            </span>
          </div>
          <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">
            Sync: 100%
          </span>
        </div>
      </div>
    </div>
  );
}
