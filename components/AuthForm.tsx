"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LucideGlobe, LucideShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { login, signup, signInWithOAuth } from "@/app/auth/actions";
import { Logo } from "@/components/Logo";

interface AuthFormProps {
  mode: "login" | "signup";
}

export function AuthForm({ mode }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="w-full max-w-[360px] flex flex-col items-center space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="p-3 rounded-full bg-secondary/50 border border-border">
          <Logo size={24} className="text-accent" />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-light tracking-tight text-foreground">
            {mode === "login" ? "Find your rhythm." : "Create your rhythm."}
          </h1>
          <p className="text-muted-foreground text-xs font-light">
            {mode === "login"
              ? "Welcome back. Let's get your day back on track."
              : "Step into structure. Start your journey with M!Core."}
          </p>
          {typeof window !== "undefined" &&
            new URLSearchParams(window.location.search).get("message") && (
              <p className="mt-2 p-2 bg-accent/10 border border-accent/20 rounded text-[10px] text-accent font-medium">
                {new URLSearchParams(window.location.search).get("message")}
              </p>
            )}
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full p-6 rounded-3xl bg-secondary/30 border border-border/50 backdrop-blur-sm shadow-xl space-y-6">
        {/* OAuth Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => signInWithOAuth("google")}
            className="w-full flex items-center justify-center gap-3 h-11 rounded-xl bg-background border border-border hover:bg-secondary/50 transition-all text-sm font-medium"
          >
            <LucideGlobe className="h-4 w-4" />
            Continue with Google
          </button>
          <button
            type="button"
            onClick={() => signInWithOAuth("apple")}
            className="w-full flex items-center justify-center gap-3 h-11 rounded-xl bg-background border border-border hover:bg-secondary/50 transition-all text-sm font-medium"
          >
            <LucideShieldCheck className="h-4 w-4" />
            Continue with Apple
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center py-1">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/30"></span>
          </div>
          <span className="relative px-3 text-[9px] font-mono tracking-widest uppercase text-muted-foreground/60 bg-transparent">
            OR
          </span>
        </div>

        {/* Form */}
        <form className="space-y-4" action={mode === "login" ? login : signup}>
          <div className="space-y-1.5">
            <label
              className="text-[9px] font-mono tracking-widest uppercase text-muted-foreground/80 ml-1"
              htmlFor="email"
            >
              Work Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="name@company.com"
              required
              className="w-full h-11 px-4 rounded-xl bg-background border border-border focus:border-gray-100 focus:ring-1 focus:ring-gray-100 outline-none transition-all placeholder:text-muted-foreground/30 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label
                className="text-[9px] font-mono tracking-widest uppercase text-muted-foreground/80"
                htmlFor="password"
              >
                Password
              </label>
              {mode === "login" && (
                <button
                  type="button"
                  className="text-[9px] text-accent hover:underline"
                >
                  Forgot?
                </button>
              )}
            </div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full h-11 px-4 rounded-xl bg-background border border-border focus:border-gray-100 focus:ring-1 focus:ring-gray-100 outline-none transition-all placeholder:text-muted-foreground/30 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full h-11 mt-2 rounded-xl bg-white dark:bg-zinc-900 border border-accent/30 text-accent font-medium hover:bg-zinc-50 dark:text-white dark:hover:bg-zinc-800 transform active:scale-[0.98] transition-all shadow-sm"
          >
            {mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col items-center space-y-6">
        <p className="text-xs text-muted-foreground">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <a
            href={mode === "login" ? "/signup" : "/login"}
            className="text-accent hover:underline font-medium"
          >
            {mode === "login" ? "Create an account" : "Sign in"}
          </a>
        </p>

        <div className="flex gap-4 text-[9px] font-mono uppercase tracking-widest text-muted-foreground/40">
          <button className="hover:text-foreground transition-colors">
            Terms
          </button>
          <button className="hover:text-foreground transition-colors">
            Privacy
          </button>
          <button className="hover:text-foreground transition-colors">
            Help
          </button>
        </div>
      </div>
    </div>
  );
}
