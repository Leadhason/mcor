"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LucideFlame,
  LucideHeart,
  LucideActivity,
  LucideMoon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  flame: LucideFlame,
  heart: LucideHeart,
  activity: LucideActivity,
  moon: LucideMoon,
};

interface MetricCardProps {
  title: string;
  value: string | number;
  unit: string;
  iconName: keyof typeof iconMap;
  trend?: number;
  data: number[];
  color: "orange" | "pink" | "green" | "blue";
  className?: string;
}

const colorMap = {
  orange: {
    text: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    shadow: "shadow-orange-500/5",
    bar: "bg-orange-500/40",
  },
  pink: {
    text: "text-pink-500",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    shadow: "shadow-pink-500/5",
    bar: "bg-pink-500/40",
  },
  green: {
    text: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    shadow: "shadow-emerald-500/5",
    bar: "bg-emerald-500/40",
  },
  blue: {
    text: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    shadow: "shadow-blue-500/5",
    bar: "bg-blue-500/40",
  },
};

export function MetricCard({
  title,
  value,
  unit,
  iconName,
  data,
  color,
  className,
}: MetricCardProps) {
  const styles = colorMap[color];
  const Icon = iconMap[iconName];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] bg-card-custom border border-card-border-custom p-6 flex flex-col justify-between transition-all duration-500 hover:border-foreground/10 group",
        styles.shadow,
        className,
      )}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-xs font-medium text-foreground/50 tracking-wide uppercase">
            {title}
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold tracking-tight text-foreground">
              {value}
            </span>
            <span className="text-xs text-foreground/30 font-light">
              {unit}
            </span>
          </div>
        </div>
        <div
          className={cn(
            "p-2 rounded-xl bg-foreground/5 border border-foreground/10",
            styles.text,
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-8 flex items-end gap-1 h-12 px-1">
        {data.map((val, i) => (
          <motion.div
            key={i}
            initial={{ height: "10%" }}
            animate={{ height: `${val * 100}%` }}
            transition={{
              duration: 1,
              delay: i * 0.05,
              ease: "easeOut",
            }}
            className={cn(
              "flex-1 rounded-t-sm transition-colors",
              styles.bar,
              "group-hover:opacity-80",
            )}
          />
        ))}
      </div>

      {/* Decorative gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-transparent via-transparent to-foreground/5",
        )}
      />
    </div>
  );
}
