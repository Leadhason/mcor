"use client";

import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TaskCard } from "@/components/dashboard/TaskCard";
import { RightSidebar } from "@/components/dashboard/RightSidebar";
import {
  LucideSearch,
  LucidePlus,
  LucideFilter,
  LucideMoreHorizontal,
  LucideTrendingUp,
  LucideClock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const columns = [
  { id: "ready", label: "Task Ready", color: "bg-blue-500" },
  { id: "progress", label: "On Progress", color: "bg-orange-500" },
  { id: "review", label: "Needs Review", color: "bg-emerald-500" },
  { id: "done", label: "Done", color: "bg-purple-500" },
];

const mockTasks = [
  {
    id: "1",
    columnId: "ready",
    title: "Konsep hero title yang menarik",
    category: "Copywriting",
    categoryColor: "text-pink-500 bg-pink-500/10 border-pink-500/20",
    dueDate: "Nov 24",
    comments: 3,
    attachments: 5,
    assignees: ["from-blue-400 to-blue-600", "from-emerald-400 to-emerald-600"],
  },
  {
    id: "2",
    columnId: "ready",
    title: "Icon di section our services",
    category: "UI Design",
    categoryColor: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    dueDate: "Nov 25",
    comments: 2,
    attachments: 1,
    assignees: ["from-orange-400 to-orange-600"],
  },
  {
    id: "3",
    columnId: "progress",
    title: "Membuat konsep ilustrasi untuk halaman about us",
    category: "Illustration",
    categoryColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    dueDate: "Nov 24",
    comments: 5,
    attachments: 8,
    assignees: ["from-purple-400 to-purple-600", "from-pink-400 to-pink-600"],
  },
  {
    id: "4",
    columnId: "review",
    title: "Update micro-animations in sidebar",
    category: "UI Design",
    categoryColor: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    dueDate: "Nov 26",
    comments: 1,
    attachments: 3,
    assignees: ["from-blue-400 to-blue-600"],
  },
];

export default function TasksPage() {
  return (
    <DashboardLayout>
      <div className="flex h-full">
        <div className="flex-1 flex flex-col min-w-0 bg-glass/50">
          <header className="h-16 flex items-center justify-between px-8 shrink-0">
            <div className="flex items-center gap-8">
              <div className="space-y-0.5">
                <h1 className="text-lg font-medium text-foreground">
                  Homepage Design
                </h1>
                <p className="text-[10px] text-foreground/30 font-light">
                  Managing tasks for the creative phase
                </p>
              </div>

              <div className="relative group">
                <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/20 group-hover:text-foreground/40 transition-colors" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="w-40 bg-card-custom border border-card-border-custom rounded-xl py-1.5 pl-9 pr-4 text-xs font-light placeholder:text-foreground/20 focus:outline-none focus:border-orange-500/50 transition-all focus:w-56"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-orange-500 text-white text-xs font-medium hover:bg-orange-400 transition-all group">
                <LucidePlus
                  size={14}
                  className="transition-transform group-hover:rotate-90"
                />
                New Task
              </button>
              <button className="p-1.5 rounded-xl bg-card-custom border border-card-border-custom hover:bg-foreground/10 transition-colors">
                <LucideFilter size={16} className="text-foreground/40" />
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-x-auto overflow-y-hidden no-scrollbar px-8 pb-8">
            <div className="flex gap-6 h-full min-w-max">
              {columns.map((column) => (
                <div key={column.id} className="w-72 flex flex-col gap-4">
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn("w-1.5 h-1.5 rounded-full", column.color)}
                      />
                      <h3 className="text-xs font-medium text-foreground/70 uppercase tracking-wider">
                        {column.label}
                      </h3>
                    </div>
                    <button className="p-1 rounded-lg hover:bg-foreground/5 text-foreground/20 transition-colors">
                      <LucideMoreHorizontal size={14} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pb-4">
                    {mockTasks
                      .filter((t) => t.columnId === column.id)
                      .map((task) => (
                        <TaskCard key={task.id} {...task} />
                      ))}

                    {column.id === "ready" && (
                      <button className="w-full py-4 border-2 border-dashed border-card-border-custom rounded-2xl text-[10px] text-foreground/20 uppercase tracking-[0.2em] hover:border-foreground/10 hover:text-foreground/40 transition-all">
                        + Add Card
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Task Specific Right Sidebar */}
        <aside className="hidden 2xl:flex flex-col w-80 shrink-0 border-l border-card-border-custom p-8 space-y-10">
          <div className="space-y-6">
            <h3 className="text-sm font-medium">Task Progress</h3>
            <div className="space-y-6">
              {[
                {
                  label: "Copywriting",
                  done: 3,
                  total: 8,
                  color: "bg-pink-500",
                },
                {
                  label: "Illustrations",
                  done: 8,
                  total: 10,
                  color: "bg-emerald-500",
                },
                { label: "UI Design", done: 2, total: 7, color: "bg-blue-500" },
              ].map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <div className="flex justify-between text-[10px]">
                    <span className="font-medium text-foreground/60">
                      {stat.label}
                    </span>
                    <span className="font-mono text-foreground/40">
                      {stat.done}/{stat.total}
                    </span>
                  </div>
                  <div className="h-1 bg-foreground/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(stat.done / stat.total) * 100}%` }}
                      className={cn("h-full rounded-full", stat.color)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Recent Activity</h3>
              <button className="text-[10px] font-mono text-foreground/20 uppercase tracking-widest hover:text-foreground transition-all">
                View All
              </button>
            </div>
            <div className="space-y-6">
              {[
                {
                  name: "Andrea",
                  activity: "uploaded 3 documents",
                  time: "Aug 10",
                  color: "bg-orange-500",
                },
                {
                  name: "Karen",
                  activity: "left some comments",
                  time: "Aug 11",
                  color: "bg-emerald-500",
                },
                {
                  name: "Karen",
                  activity: "change project descriptions",
                  time: "Aug 12",
                  color: "bg-blue-500",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-bold text-[8px] text-white uppercase",
                      item.color,
                    )}
                  >
                    {item.name[0]}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-xs text-foreground/80 leading-snug">
                      <span className="font-medium">{item.name}</span>{" "}
                      {item.activity}
                    </p>
                    <p className="text-[10px] text-foreground/30 font-mono italic">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
}
