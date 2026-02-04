"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideMoreVertical, LucideStar, LucideUsers } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  company: string;
  status: "in_progress" | "completed" | "on_hold";
  priority: "high" | "medium" | "low";
  tasksDone: number;
  totalTasks: number;
  dueDate: string;
  tags: string[];
  color?: string;
  className?: string;
}

const statusColors = {
  in_progress: "text-orange-500 bg-orange-500/10 border-orange-500/20",
  completed: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  on_hold: "text-blue-500 bg-blue-500/10 border-blue-500/20",
};

const priorityColors = {
  high: "text-red-500 bg-red-500/10 border-red-500/20",
  medium: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  low: "text-foreground/40 bg-foreground/5 border-foreground/10",
};

export function ProjectCard({
  title,
  company,
  status,
  priority,
  tasksDone,
  totalTasks,
  dueDate,
  tags,
  className,
}: ProjectCardProps) {
  const progress = (tasksDone / totalTasks) * 100;

  return (
    <div
      className={cn(
        "relative rounded-3xl bg-card-custom border border-card-border-custom p-5 space-y-5 group hover:border-foreground/10 transition-all duration-500",
        className,
      )}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-foreground/20 to-transparent" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-base font-medium text-foreground">{title}</h3>
            <p className="text-[10px] text-foreground/30 font-light">
              {company}
            </p>
          </div>
        </div>
        <button className="p-2 rounded-xl hover:bg-foreground/5 text-foreground/20 transition-colors">
          <LucideMoreVertical className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={cn(
            "text-[8px] font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-full",
            statusColors[status],
          )}
        >
          {status.replace("_", " ")}
        </span>
        <span
          className={cn(
            "text-[8px] font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-full",
            priorityColors[priority],
          )}
        >
          {priority}
        </span>
      </div>

      <div className="space-y-2.5">
        <div className="flex justify-between items-end">
          <p className="text-[10px] text-foreground/40 font-light">
            Task Done:{" "}
            <span className="text-foreground font-medium">
              {tasksDone} / {totalTasks}
            </span>
          </p>
        </div>
        <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={cn(
              "h-full rounded-full",
              status === "completed" ? "bg-emerald-500" : "bg-blue-500",
            )}
          />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-lg bg-emerald-500/5 text-emerald-500 text-[10px] font-medium border border-emerald-500/10"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="pt-4 border-t border-card-border-custom flex items-center justify-between">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full bg-foreground/10 border-2 border-background flex items-center justify-center overflow-hidden"
            >
              <div className="w-full h-full bg-gradient-to-br from-foreground/20 to-transparent" />
            </div>
          ))}
          <div className="w-6 h-6 rounded-full bg-foreground/5 border-2 border-background flex items-center justify-center text-[7px] text-foreground/40 font-mono">
            +5
          </div>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <p className="text-[8px] font-mono text-foreground/20 uppercase tracking-widest">
            Due Date
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-medium text-orange-500/80">
              {dueDate}
            </span>
            <LucideStar className="h-2.5 w-2.5 text-orange-500 fill-orange-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
