"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LucideMoreHorizontal,
  LucideChevronLeft,
  LucideChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ScheduledItemProps {
  title: string;
  category: string;
  date: string;
}

function ScheduledItem({ title, category, date }: ScheduledItemProps) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className="w-12 h-12 rounded-2xl bg-card-custom border border-card-border-custom overflow-hidden flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-br from-foreground/10 to-transparent" />
      </div>
      <div className="flex-1 space-y-0.5">
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded-md bg-foreground/5 border border-foreground/10 text-[8px] text-foreground/40 uppercase tracking-widest">
            {category}
          </span>
        </div>
        <h4 className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
          {title}
        </h4>
      </div>
      <div className="flex flex-col items-end">
        <LucideMoreHorizontal className="h-4 w-4 text-foreground/20" />
        <span className="text-[10px] text-foreground/30 font-mono tracking-tighter">
          {date}
        </span>
      </div>
    </div>
  );
}

export function RightSidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "hidden xl:flex flex-col w-80 shrink-0 border-l border-card-border-custom p-8 space-y-10",
        className,
      )}
    >
      {/* Profile Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center overflow-hidden border-2 border-foreground/10">
            {/* Image placeholder */}
            <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground">
              Lionel Messi
            </h4>
            <p className="text-[10px] text-foreground/40 font-mono tracking-widest uppercase">
              @itsworks
            </p>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-foreground/5 border border-foreground/10 cursor-pointer hover:bg-foreground/10 transition-colors">
          <LucideMoreHorizontal className="h-4 w-4 text-foreground/40" />
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Weight", value: "75 kg" },
          { label: "Height", value: "180 cm" },
          { label: "Age", value: "26 yrs" },
        ].map((stat) => (
          <div key={stat.label} className="text-center space-y-1">
            <p className="text-[9px] text-foreground/30 uppercase tracking-[0.2em]">
              {stat.label}
            </p>
            <p className="text-sm font-medium text-foreground/80">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Calendar Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">December 2022</h3>
          <div className="flex gap-2">
            <button className="p-1 rounded-lg hover:bg-white/5 text-white/20 hover:text-white transition-all">
              <LucideChevronLeft className="h-4 w-4" />
            </button>
            <button className="p-1 rounded-lg hover:bg-white/5 text-white/20 hover:text-white transition-all">
              <LucideChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-y-4 text-[10px] text-center font-mono">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <span key={d} className="text-foreground/20">
              {d}
            </span>
          ))}
          {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
            const isToday = d === 23;
            const isScheduled = [17, 21, 24, 25].includes(d);
            return (
              <div
                key={d}
                className="relative flex items-center justify-center h-6 cursor-pointer group"
              >
                <span
                  className={cn(
                    "relative z-10 transition-colors duration-300",
                    isToday
                      ? "text-white"
                      : "text-foreground/40 group-hover:text-foreground/80",
                    isScheduled && !isToday && "text-emerald-500",
                  )}
                >
                  {d}
                </span>
                {isToday && (
                  <motion.div
                    layoutId="today"
                    className="absolute inset-0 bg-orange-500 rounded-lg shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                  />
                )}
                {isScheduled && !isToday && (
                  <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-emerald-500" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Scheduled List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Scheduled</h3>
          <button className="text-[10px] font-mono text-foreground/20 uppercase tracking-widest hover:text-foreground transition-all">
            View All
          </button>
        </div>
        <div className="space-y-6">
          <ScheduledItem
            title="Cardio Workshop"
            category="Fitness"
            date="17-21 Dec"
          />
          <ScheduledItem
            title="Cardio Workshop"
            category="Fitness"
            date="17-21 Dec"
          />
          <ScheduledItem
            title="Cardio Workshop"
            category="Fitness"
            date="17-21 Dec"
          />
        </div>
      </div>
    </aside>
  );
}
