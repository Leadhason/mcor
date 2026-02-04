"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LucideMoreVertical,
  LucideCalendar,
  LucideMessageSquare,
  LucidePaperclip,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  title: string;
  category: string;
  categoryColor: string;
  dueDate: string;
  comments: number;
  attachments: number;
  assignees: string[];
  className?: string;
}

export function TaskCard({
  title,
  category,
  categoryColor,
  dueDate,
  comments,
  attachments,
  assignees,
  className,
}: TaskCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "group p-4 rounded-2xl bg-card-custom border border-card-border-custom hover:border-foreground/10 transition-all duration-300 cursor-grab active:cursor-grabbing",
        className,
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <span
          className={cn(
            "px-2.5 py-0.5 rounded-full text-[10px] font-medium border",
            categoryColor,
          )}
        >
          {category}
        </span>
        <button className="p-1 rounded-lg hover:bg-foreground/5 text-foreground/20 transition-colors">
          <LucideMoreVertical size={14} />
        </button>
      </div>

      <h4 className="text-sm font-medium text-foreground mb-4 leading-relaxed line-clamp-2">
        {title}
      </h4>

      <div className="flex items-center justify-between pt-4 border-t border-card-border-custom">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[10px] text-foreground/40 font-mono">
            <LucideMessageSquare size={12} />
            {comments}
          </div>
          <div className="flex items-center gap-1 text-[10px] text-foreground/40 font-mono">
            <LucidePaperclip size={12} />
            {attachments}
          </div>
        </div>

        <div className="flex -space-x-1.5">
          {assignees.map((avatar, i) => (
            <div
              key={i}
              className="w-5 h-5 rounded-full border border-background bg-card-custom flex items-center justify-center overflow-hidden"
            >
              <div className={cn("w-full h-full bg-gradient-to-br", avatar)} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-[10px] text-foreground/40 font-mono">
        <LucideCalendar size={12} className="text-orange-500" />
        {dueDate}
      </div>
    </motion.div>
  );
}
