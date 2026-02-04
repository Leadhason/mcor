"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LucideCheckCircle2,
  LucideCircle,
  LucideMoreHorizontal,
  LucidePlay,
  LucidePause,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "completed";
  duration?: string;
}

interface TaskListProps {
  tasks: Task[];
  onToggleStatus?: (id: string) => void;
  className?: string;
}

export function TaskList({ tasks, onToggleStatus, className }: TaskListProps) {
  const completedCount = tasks.filter((t) => t.status === "completed").length;

  return (
    <div
      className={cn(
        "rounded-3xl bg-card-custom border border-card-border-custom p-5 flex flex-col space-y-4",
        className,
      )}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-light tracking-tight text-foreground">
            My Tasks
          </h3>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-mono tracking-tighter">
            {String(tasks.length).padStart(2, "0")}
          </span>
        </div>
        <div className="text-[10px] font-mono text-foreground/20 uppercase tracking-widest">
          {completedCount} / {tasks.length} Done
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between group p-2 rounded-xl hover:bg-foreground/[0.02] border border-transparent hover:border-foreground/5 transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-white/10 w-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <button
                onClick={() => onToggleStatus?.(task.id)}
                className={cn(
                  "transition-colors",
                  task.status === "completed"
                    ? "text-emerald-500"
                    : "text-foreground/20 hover:text-foreground/40",
                )}
              >
                {task.status === "completed" ? (
                  <LucideCheckCircle2 className="h-4 w-4" />
                ) : (
                  <LucideCircle className="h-4 w-4" />
                )}
              </button>
              <span
                className={cn(
                  "text-xs font-light transition-all",
                  task.status === "completed"
                    ? "text-foreground/20 line-through"
                    : "text-foreground/80",
                )}
              >
                {task.title}
              </span>
            </div>

            <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
              {task.duration && (
                <div className="flex items-center gap-2 text-[10px] font-mono text-orange-500">
                  <span className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" />
                  {task.duration}
                </div>
              )}
              {task.status === "in_progress" ? (
                <button className="p-1.5 rounded-lg bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 transition-all">
                  <LucidePause className="h-3 w-3" />
                </button>
              ) : (
                <button className="p-1.5 rounded-lg bg-white/5 text-white/40 hover:text-white transition-all">
                  <LucidePlay className="h-3 w-3" />
                </button>
              )}
              <LucideMoreHorizontal className="h-4 w-4 text-white/20" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mini Visualizer for current focus (Google example from design) */}
      <div className="pt-4 border-t border-card-border-custom space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-[10px] font-mono text-foreground/40 uppercase tracking-[0.2em]">
            Current Focus
          </h4>
        </div>
        <div className="p-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between transition-all hover:bg-emerald-500/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-xs font-medium text-foreground">
              Create Wireframe
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-foreground/60 tracking-wider">
              25m 20s
            </span>
            <button className="p-1.5 rounded-lg bg-orange-500 text-white shadow-lg shadow-orange-500/20">
              <LucidePause size={12} fill="currentColor" />
            </button>
            <LucideMoreHorizontal className="h-3.5 w-3.5 text-foreground/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
