"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ActivityChartProps {
  className?: string;
}

const data = [
  { day: "Jan", value: 40 },
  { day: "Feb", value: 30 },
  { day: "Mar", value: 70 },
  { day: "Apr", value: 50 },
  { day: "May", value: 90 },
  { day: "Jun", value: 60 },
  { day: "Jul", value: 80 },
  { day: "Aug", value: 40 },
  { day: "Sep", value: 65 },
  { day: "Oct", value: 55 },
  { day: "Nov", value: 45 },
  { day: "Dec", value: 50 },
];

export function ActivityChart({ className }: ActivityChartProps) {
  const width = 600;
  const height = 200;
  const padding = 20;

  const maxValue = Math.max(...data.map((d) => d.value));
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * (width - padding * 2) + padding,
    y: height - (d.value / maxValue) * (height - padding * 2) - padding,
  }));

  const pathD = `M ${points.map((p) => `${p.x},${p.y}`).join(" L ")}`;

  return (
    <div
      className={cn(
        "relative rounded-[2.5rem] bg-white/[0.03] border border-white/5 p-8 flex flex-col space-y-6 overflow-hidden group hover:border-white/10 transition-all duration-500",
        className,
      )}
    >
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-xl font-light tracking-tight">
            Activity Tracking
          </h3>
          <p className="text-xs text-white/30 font-light">
            Your progress over time
          </p>
        </div>
        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/40 uppercase tracking-widest">
          Weekly
        </div>
      </div>

      <div className="relative flex-1 min-h-[200px] w-full mt-4">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((p) => (
            <line
              key={p}
              x1={padding}
              y1={height * p}
              x2={width - padding}
              y2={height * p}
              stroke="white"
              strokeOpacity="0.05"
              strokeDasharray="4 4"
            />
          ))}

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area under the line */}
          <motion.path
            d={`${pathD} L ${points[points.length - 1].x},${height - padding} L ${points[0].x},${height - padding} Z`}
            fill="url(#chartGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* The Line */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Data Points */}
          {points.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="4"
              fill="#0a0f0d"
              stroke="#10b981"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1 + i * 0.05, duration: 0.3 }}
              className="hover:r-6 cursor-pointer transition-all"
            />
          ))}
        </svg>

        {/* Hover label placeholder */}
        <div className="absolute top-1/2 left-[40%] -translate-y-1/2 px-3 py-1.5 rounded-lg bg-orange-500 text-white text-[10px] font-bold shadow-lg shadow-orange-500/20 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          24 kmph
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] font-mono text-white/20 uppercase tracking-widest pt-4 border-t border-white/5">
        {["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}
