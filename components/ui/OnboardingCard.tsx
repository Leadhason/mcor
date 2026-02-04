"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface OnboardingCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  selected?: boolean;
  onClick?: () => void;
  image?: string;
  multiSelect?: boolean;
}

export function OnboardingCard({
  title,
  description,
  icon: Icon,
  selected,
  onClick,
  image,
  multiSelect = false,
}: OnboardingCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col text-left transition-all duration-300 rounded-2xl overflow-hidden border",
        selected
          ? "border-emerald-500/50 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
          : "border-border bg-secondary/30 hover:bg-secondary/50 hover:border-border/80",
      )}
    >
      {image ? (
        <div className="relative h-32 w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          {selected && (
            <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
            </div>
          )}
        </div>
      ) : (
        <div className="p-4">
          <div
            className={cn(
              "p-2 rounded-xl w-fit transition-all duration-300",
              selected
                ? "bg-emerald-500/20 text-emerald-500"
                : "bg-secondary/50 text-muted-foreground group-hover:text-foreground/60",
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
      )}

      <div className="p-4 pt-0">
        <h3
          className={cn(
            "text-base font-medium transition-colors",
            selected
              ? "text-emerald-500 dark:text-emerald-400"
              : "text-foreground",
          )}
        >
          {title}
        </h3>
        <p className="text-[13px] text-muted-foreground font-light mt-0.5 leading-relaxed">
          {description}
        </p>
      </div>

      {multiSelect && !image && (
        <div
          className={cn(
            "absolute top-6 right-6 h-5 w-5 rounded-full border transition-all duration-300",
            selected ? "bg-emerald-500 border-emerald-500" : "border-border",
          )}
        >
          {selected && (
            <div className="h-full w-full flex items-center justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-white" />
            </div>
          )}
        </div>
      )}
    </button>
  );
}
