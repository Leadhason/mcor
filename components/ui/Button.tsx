"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary:
        "bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20",
      secondary:
        "bg-secondary border border-border text-foreground hover:bg-secondary/80 shadow-sm",
      outline:
        "bg-transparent border border-border hover:bg-secondary/50 text-foreground",
      ghost:
        "bg-transparent hover:bg-secondary/50 text-foreground/60 hover:text-foreground",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs",
      md: "h-11 px-6 text-sm",
      lg: "h-12 px-8 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all transform active:scale-[0.98] outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
