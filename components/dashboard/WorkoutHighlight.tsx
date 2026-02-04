"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkoutHighlightProps {
  className?: string;
}

export function WorkoutHighlight({ className }: WorkoutHighlightProps) {
  return (
    <div
      className={cn(
        "relative aspect-[4/3] rounded-[2.5rem] overflow-hidden group border border-white/5",
        className,
      )}
    >
      {/* Background Image Placeholder / Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent" />

      {/* Simulating the runner image with a stylized abstract shape */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-[80%] h-[80%] bg-emerald-500/5 blur-[100px] rounded-full"
        />
      </div>

      <div className="absolute inset-0 p-8 flex flex-col justify-end space-y-4">
        <div className="space-y-2">
          <h3 className="text-2xl font-light leading-tight">
            Running with <br />
            <span className="font-medium text-emerald-500">
              resistance band
            </span>
          </h3>

          <div className="flex gap-6">
            <div className="space-y-0.5">
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
                Today's distance
              </p>
              <p className="text-lg font-medium">
                12 <span className="text-xs font-light text-white/40">km</span>
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
                Total distance
              </p>
              <p className="text-lg font-medium">
                428 <span className="text-xs font-light text-white/40">km</span>
              </p>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ x: 10 }}
          className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-300"
        >
          <LucideArrowRight className="h-5 w-5 text-white/40 group-hover:text-white transition-colors" />
        </motion.button>
      </div>

      {/* Decorative glass overlay */}
      <div className="absolute top-4 right-4 px-4 py-2 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono text-white/60 tracking-widest uppercase">
            Ongoing
          </span>
        </div>
      </div>
    </div>
  );
}
