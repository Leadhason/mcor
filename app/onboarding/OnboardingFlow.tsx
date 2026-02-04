"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LucideRefreshCw,
  LucideHeart,
  LucideZap,
  LucideArrowRight,
  LucideUser,
  LucideGraduationCap,
  LucideBriefcase,
  LucideFlame,
  LucideCode,
  LucideActivity,
  LucideBookOpen,
  LucideUsers,
  LucideTrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { OnboardingCard } from "@/components/ui/OnboardingCard";
import { completeOnboarding } from "./actions";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

const focusAreas = [
  {
    id: "deep-work",
    title: "Deep Work",
    icon: LucideCode,
    description: "Mastering concentration and peak productivity states.",
  },
  {
    id: "health",
    title: "Health & Vitality",
    icon: LucideActivity,
    description: "Optimizing sleep, nutrition, and physical movement.",
  },
  {
    id: "learning",
    title: "Fast Learning",
    icon: LucideBookOpen,
    description: "Accelerated skill acquisition and knowledge retention.",
  },
  {
    id: "mindfulness",
    title: "Mindfulness",
    icon: LucideRefreshCw,
    description: "Daily presence, stress management and mental clarity.",
  },
  {
    id: "networking",
    title: "Networking",
    icon: LucideUsers,
    description: "Building meaningful connections and community.",
  },
  {
    id: "wealth",
    title: "Wealth Habits",
    icon: LucideTrendingUp,
    description: "Developing financial literacy and investment routines.",
  },
];

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({
    path: "",
    focus: [] as string[],
    customFocus: "",
    isAddingCustom: false,
  });

  const next = () => setCurrentStep((s) => s + 1);
  const back = () => setCurrentStep((s) => s - 1);

  const toggleFocus = (id: string) => {
    if (id === "custom") {
      setData((prev) => ({ ...prev, isAddingCustom: true }));
      return;
    }
    setData((prev) => ({
      ...prev,
      focus: prev.focus.includes(id)
        ? prev.focus.filter((f) => f !== id)
        : prev.focus.length < 3
          ? [...prev.focus, id]
          : prev.focus,
    }));
  };

  const addCustomFocus = () => {
    if (data.customFocus.trim() && data.focus.length < 3) {
      setData((prev) => ({
        ...prev,
        focus: [...prev.focus, prev.customFocus.trim()],
        customFocus: "",
        isAddingCustom: false,
      }));
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-12 px-6 bg-background text-foreground transition-colors duration-300">
      <ThemeToggle />
      {/* Header Info */}
      <div className="fixed top-8 left-8 flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <Logo size={20} className="text-emerald-500" />
        </div>
        <span className="font-mono text-xs tracking-widest text-emerald-500/80 uppercase">
          Flow
        </span>
      </div>

      <div className="fixed top-8 right-8 flex items-center gap-4">
        <div className="flex gap-1">
          {[0, 1].map((i) => (
            <div
              key={i}
              className={cn(
                "h-1 px-4 rounded-full transition-all duration-500",
                i <= currentStep ? "bg-emerald-500" : "bg-secondary/50",
              )}
            />
          ))}
        </div>
        <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
          Step 0{currentStep + 1} / 02
        </span>
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 0 ? (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl flex flex-col items-center space-y-8"
          >
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="p-3.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.05)]">
                <Logo size={32} className="text-emerald-500" />
              </div>
              <div className="space-y-4">
                <h1 className="text-2xl sm:text-4xl font-light tracking-tight text-foreground">
                  Welcome to your <br />
                  <span className="text-emerald-500 font-medium">
                    new rhythm.
                  </span>
                </h1>
                <p className="max-w-sm text-muted-foreground text-sm font-light leading-relaxed">
                  Productivity isn't about being perfect every day; it's about{" "}
                  <br />
                  <span className="text-foreground/80">
                    showing up when it counts.
                  </span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                {
                  title: "Adaptive",
                  icon: LucideRefreshCw,
                  description:
                    "Schedules that flex around your life, not the other way around.",
                },
                {
                  title: "Zero Guilt",
                  icon: LucideHeart,
                  description:
                    "Missed a day? No problem. We automatically recalibrate for you.",
                },
                {
                  title: "Resilient",
                  icon: LucideZap,
                  description:
                    "Built for the ups and downs of students and founders.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-secondary/20 border border-border flex flex-col items-center text-center space-y-2.5 hover:border-emerald-500/20 transition-all group"
                >
                  <div className="p-3 rounded-2xl bg-emerald-500/5 text-emerald-500/40 group-hover:text-emerald-500 transition-colors">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-medium text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center space-y-6">
              <Button
                onClick={next}
                className="h-10 px-8 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white dark:text-black text-sm font-medium group"
              >
                Let's Begin
                <LucideArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <button className="text-muted-foreground/60 text-xs font-mono uppercase tracking-widest hover:text-emerald-500 transition-colors">
                Learn more about our philosophy →
              </button>
            </div>

            <div className="pt-8 opacity-60">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-secondary/50 border border-border">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full border border-background bg-secondary"
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono tracking-tight uppercase text-muted-foreground">
                  Joined by 12k+ users this month
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-4xl flex flex-col items-center space-y-8"
          >
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-light tracking-tight text-foreground">
                Personalize your journey.
              </h1>
              <p className="text-muted-foreground text-sm font-light">
                Tell us about your current context and what you want to achieve.
              </p>
            </div>

            <div className="w-full space-y-12">
              {/* Path Selection */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-emerald-500">
                  <div className="p-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <LucideUser className="h-4 w-4" />
                  </div>
                  <h2 className="text-sm font-medium tracking-tight">
                    What's your current path?
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      id: "student",
                      title: "Student",
                      icon: LucideGraduationCap,
                      description: "Managing studies & campus life",
                    },
                    {
                      id: "founder",
                      title: "Founder",
                      icon: LucideFlame,
                      description: "Building products & teams",
                    },
                    {
                      id: "professional",
                      title: "Professional",
                      icon: LucideBriefcase,
                      description: "Navigating career & growth",
                    },
                    {
                      id: "freelancer",
                      title: "Freelancer",
                      icon: LucideTrendingUp,
                      description: "Solo creator or consultant",
                    },
                  ].map((path) => (
                    <OnboardingCard
                      key={path.id}
                      {...path}
                      selected={data.path === path.id}
                      onClick={() =>
                        setData((prev) => ({ ...prev, path: path.id }))
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Focus Areas */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-emerald-500">
                    <div className="p-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <LucideTarget className="h-4 w-4" />
                    </div>
                    <h2 className="text-base font-medium tracking-tight text-foreground">
                      What matters most right now?
                    </h2>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-muted-foreground/60 tracking-widest">
                    Select up to 3
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {focusAreas.map((area) => (
                    <OnboardingCard
                      key={area.id}
                      {...area}
                      selected={data.focus.includes(area.id)}
                      onClick={() => toggleFocus(area.id)}
                      multiSelect
                    />
                  ))}

                  {data.focus.map((f) => {
                    const isPreset = focusAreas.some((a) => a.id === f);
                    if (isPreset) return null;
                    return (
                      <OnboardingCard
                        key={f}
                        title={f}
                        description="Custom focus area."
                        icon={LucideZap}
                        selected={true}
                        onClick={() => toggleFocus(f)}
                        multiSelect
                      />
                    );
                  })}

                  {data.isAddingCustom ? (
                    <div className="flex flex-col gap-2 p-4 rounded-2xl border border-emerald-500/50 bg-emerald-500/5">
                      <input
                        autoFocus
                        value={data.customFocus}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            customFocus: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => e.key === "Enter" && addCustomFocus()}
                        placeholder="Type intent..."
                        className="bg-transparent border-none outline-none text-sm text-emerald-400 placeholder:text-emerald-500/30"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            setData((prev) => ({
                              ...prev,
                              isAddingCustom: false,
                              customFocus: "",
                            }))
                          }
                          className="text-[10px] uppercase font-mono text-muted-foreground/60 hover:text-foreground transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={addCustomFocus}
                          className="text-[10px] uppercase font-mono text-emerald-500 hover:text-emerald-400"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ) : (
                    <OnboardingCard
                      title="Custom Intent"
                      description="Define your own primary focus."
                      icon={LucideZap}
                      onClick={() => toggleFocus("custom")}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="w-full flex items-center justify-between pt-12">
              <button
                onClick={back}
                className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                ← Back
              </button>
              <form action={completeOnboarding}>
                <input type="hidden" name="path" value={data.path} />
                <input
                  type="hidden"
                  name="focus"
                  value={data.focus.join(",")}
                />
                <Button
                  type="submit"
                  disabled={!data.path || data.focus.length === 0}
                  className="h-11 px-8 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white dark:text-black font-medium group text-sm"
                >
                  Continue Journey
                  <LucideArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const LucideTarget = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
