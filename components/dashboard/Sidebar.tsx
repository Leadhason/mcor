"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LucideLayoutDashboard,
  LucideRefreshCw,
  LucideLayers,
  LucideSettings,
  LucideChevronRight,
  LucideLogOut,
  LucideMenu,
  LucideListTodo,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { signOut } from "@/app/auth/actions";

const navItems = [
  { icon: LucideLayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: LucideListTodo, label: "Tasks", href: "/dashboard/tasks" },
  { icon: LucideLayers, label: "Projects", href: "/dashboard/projects" },
  { icon: LucideSettings, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "h-screen bg-glass backdrop-blur-3xl border-r border-glass-border z-50 transition-all duration-700 ease-in-out flex flex-col group shrink-0",
        isExpanded ? "w-60" : "w-14",
      )}
    >
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Logo Section */}
        <div className="h-20 flex items-center px-4 overflow-hidden shrink-0">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg hover:bg-foreground/5 text-foreground/40 hover:text-foreground transition-all mr-2"
          >
            <LucideMenu size={20} />
          </button>
          <div className="flex items-center">
            <Logo size={28} className="shrink-0" />
            <span
              className={cn(
                "ml-3 font-light tracking-widest text-base transition-all duration-500 whitespace-nowrap",
                isExpanded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4 invisible",
              )}
            >
              M<span className="text-emerald-500 font-medium">!</span>CORE
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-2.5 space-y-1 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center h-10 rounded-xl transition-all duration-300 group/item relative",
                  isActive
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "text-foreground/40 hover:text-foreground/80 hover:bg-foreground/5",
                )}
              >
                <div className="w-10 h-10 flex items-center justify-center shrink-0">
                  <item.icon
                    className={cn(
                      "h-5 w-5 transition-transform duration-300",
                      isActive && "scale-110",
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "ml-3 text-sm font-light tracking-wide transition-all duration-300 whitespace-nowrap",
                    isExpanded
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4",
                  )}
                >
                  {item.label}
                </span>

                {isActive && !isExpanded && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-emerald-500 rounded-l-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Actions */}
      <div className="p-3 border-t border-glass-border space-y-1 shrink-0">
        <form action={signOut}>
          <button className="flex items-center w-full h-10 rounded-xl text-foreground/40 hover:text-red-400 hover:bg-red-400/5 transition-all duration-300 overflow-hidden">
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <LucideLogOut className="h-4 w-4" />
            </div>
            <span
              className={cn(
                "ml-3 text-sm font-light transition-all duration-300 whitespace-nowrap",
                isExpanded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4",
              )}
            >
              Sign Out
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
