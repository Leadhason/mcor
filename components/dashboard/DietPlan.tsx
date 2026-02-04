"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DietItemProps {
  title: string;
  description: string;
  day: string;
  color: string;
}

function DietItem({ title, description, day, color }: DietItemProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        "flex-1 min-w-[200px] rounded-[2rem] p-6 flex flex-col justify-between space-y-4 border border-white/5 transition-colors duration-500",
        color,
      )}
    >
      <div className="space-y-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-[10px] text-white/40 leading-relaxed font-light">
          {description}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] text-white/40 font-mono uppercase tracking-widest">
          {day}
        </span>
        <div className="w-12 h-12 rounded-full bg-black/20 border border-white/5 overflow-hidden flex items-center justify-center">
          {/* Realistic image placeholder logic would go here */}
          <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}

export function DietPlan({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h3 className="text-xl font-light tracking-tight">Diet Plan</h3>
          <p className="text-xs text-white/30 font-light">
            Fueling your performance
          </p>
        </div>
        <button className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest hover:underline transition-all">
          View All
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        <DietItem
          title="Fruits only"
          description="It contains most water contain in it"
          day="Day 1"
          color="bg-white/[0.02] hover:bg-white/[0.05]"
        />
        <DietItem
          title="Vegetables only"
          description="It contains most water contain in it"
          day="Day 2"
          color="bg-orange-500/10 border-orange-500/20"
        />
        <DietItem
          title="Fruits and Vegetables"
          description="It contains most water contain in it"
          day="Day 3"
          color="bg-white/[0.02] hover:bg-white/[0.05]"
        />
      </div>
    </div>
  );
}
