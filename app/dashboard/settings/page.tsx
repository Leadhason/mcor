"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { RightSidebar } from "@/components/dashboard/RightSidebar";
import { cn } from "@/lib/utils";
import {
  LucideUser,
  LucideCreditCard,
  LucidePalette,
  LucideBell,
  LucideShield,
  LucideGlobe,
  LucideCamera,
  LucideTrash2,
  LucideMail,
  LucidePhone,
  LucideSmartphone,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const tabs = [
  { id: "account", label: "Account Settings", icon: LucideUser },
  { id: "billing", label: "Billing & Subscription", icon: LucideCreditCard },
  { id: "appearance", label: "Appearance", icon: LucidePalette },
  { id: "notifications", label: "Notifications", icon: LucideBell },
  { id: "integrations", label: "Integrations", icon: LucideGlobe },
  { id: "privacy", label: "Privacy & Data", icon: LucideShield },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <DashboardLayout>
      <div className="flex h-full">
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 flex items-center justify-between px-8 shrink-0">
            <div className="space-y-0.5">
              <h1 className="text-lg font-medium text-foreground">Settings</h1>
              <p className="text-[10px] text-foreground/30 font-light">
                Configure your control room
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                className="bg-orange-500 hover:bg-orange-400 text-white rounded-full px-6"
              >
                Save Changes
              </Button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto no-scrollbar px-8 pb-8">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Tabs Navigation */}
              <div className="flex items-center gap-6 border-b border-card-border-custom overflow-x-auto no-scrollbar pt-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 px-1 pb-4 text-xs font-medium transition-all relative whitespace-nowrap",
                      activeTab === tab.id
                        ? "text-orange-500"
                        : "text-foreground/40 hover:text-foreground/60",
                    )}
                  >
                    <tab.icon size={14} />
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="py-4">
                {activeTab === "account" && <AccountSettings />}
                {activeTab === "appearance" && <AppearanceSettings />}
                {activeTab === "billing" && <BillingSettings />}
              </div>
            </div>
          </div>
        </div>

        <RightSidebar />
      </div>
    </DashboardLayout>
  );
}

function AccountSettings() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Profile Information */}
      <section className="space-y-6">
        <div>
          <h3 className="text-base font-medium text-foreground">
            Profile Information
          </h3>
          <p className="text-xs text-foreground/40 font-light">
            Manage your personal details and keep your contact info up to date.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-20 h-20 rounded-full bg-orange-500/20 border-2 border-orange-500/20 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600" />
              </div>
              <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                <LucideCamera className="text-white" size={20} />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-xs text-red-500/60 hover:text-red-500 transition-colors">
                Delete
              </button>
              <button className="text-xs text-orange-500 hover:text-orange-400 transition-colors">
                Update
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-foreground/60">
                Name
              </label>
              <input
                type="text"
                defaultValue="Bessie Cooper"
                className="w-full bg-card-custom border border-card-border-custom rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500/50 transition-all font-light"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-foreground/60">
                Email
              </label>
              <div className="relative">
                <LucideMail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20"
                />
                <input
                  type="email"
                  defaultValue="bcooper@boutiq.co"
                  className="w-full bg-card-custom border border-card-border-custom rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-orange-500/50 transition-all font-light"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-foreground/60">
                Phone Number
              </label>
              <div className="relative">
                <LucidePhone
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20"
                />
                <input
                  type="text"
                  defaultValue="+62532 4892 0287"
                  className="w-full bg-card-custom border border-card-border-custom rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-orange-500/50 transition-all font-light"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-card-border-custom" />

      {/* Security */}
      <section className="space-y-6">
        <div>
          <h3 className="text-base font-medium text-foreground">Security</h3>
          <p className="text-xs text-foreground/40 font-light">
            Keep your account secure with extra authentication and alerts.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-card-custom border border-card-border-custom">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <LucideSmartphone size={16} className="text-orange-500" />
                <h4 className="text-sm font-medium">
                  Two-Factor Authentication
                </h4>
              </div>
              <p className="text-[10px] text-foreground/40 font-light">
                Add an extra layer of protection to your account.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-10 h-5 bg-foreground/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-card-custom border border-card-border-custom">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <LucideBell size={16} className="text-orange-500" />
                <h4 className="text-sm font-medium">
                  Login Alert Notification
                </h4>
              </div>
              <p className="text-[10px] text-foreground/40 font-light">
                Get notified when your account is accessed from a new device.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-10 h-5 bg-foreground/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>
        </div>
      </section>

      <div className="h-px bg-card-border-custom" />

      {/* Password Management */}
      <section className="space-y-6">
        <div>
          <h3 className="text-base font-medium text-foreground">
            Password Management
          </h3>
          <p className="text-xs text-foreground/40 font-light">
            Update your password to stay secure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-medium text-foreground/60">
              Old Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-card-custom border border-card-border-custom rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500/50 transition-all font-light"
            />
          </div>
          <div className="space-y-2" />
          <div className="space-y-2">
            <label className="text-xs font-medium text-foreground/60">
              New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-card-custom border border-card-border-custom rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500/50 transition-all font-light"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-foreground/60">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-card-custom border border-card-border-custom rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500/50 transition-all font-light"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <section className="space-y-6">
        <div>
          <h3 className="text-base font-medium text-foreground">
            Theme Preference
          </h3>
          <p className="text-xs text-foreground/40 font-light">
            Select your preferred system aesthetic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => setTheme("light")}
            className={cn(
              "group relative p-6 rounded-3xl border transition-all duration-500 text-left space-y-4",
              theme === "light"
                ? "bg-orange-500/5 border-orange-500 shadow-lg shadow-orange-500/5"
                : "bg-card-custom border-card-border-custom hover:border-foreground/20",
            )}
          >
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-2xl bg-white border border-gray-100 shadow-sm animate-pulse">
                <div className="w-8 h-8 rounded-full bg-gray-100" />
              </div>
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                  theme === "light"
                    ? "border-orange-500"
                    : "border-foreground/10",
                )}
              >
                {theme === "light" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                )}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium">Studio Clarity</h4>
              <p className="text-[10px] text-foreground/40 uppercase tracking-widest font-mono">
                Light Mode
              </p>
            </div>
            {theme === "light" && (
              <motion.div
                layoutId="theme-ring"
                className="absolute -inset-1 rounded-[2rem] border-2 border-orange-500/20 pointer-events-none"
              />
            )}
          </button>

          <button
            onClick={() => setTheme("dark")}
            className={cn(
              "group relative p-6 rounded-3xl border transition-all duration-500 text-left space-y-4",
              theme === "dark"
                ? "bg-orange-500/5 border-orange-500 shadow-lg shadow-orange-500/5"
                : "bg-card-custom border-card-border-custom hover:border-foreground/20",
            )}
          >
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-2xl bg-[#0a0a0b] border border-white/5 shadow-sm animate-pulse">
                <div className="w-8 h-8 rounded-full bg-white/5" />
              </div>
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                  theme === "dark"
                    ? "border-orange-500"
                    : "border-foreground/10",
                )}
              >
                {theme === "dark" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                )}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium">Quiet Control Room</h4>
              <p className="text-[10px] text-foreground/40 uppercase tracking-widest font-mono">
                Dark Mode
              </p>
            </div>
            {theme === "dark" && (
              <motion.div
                layoutId="theme-ring"
                className="absolute -inset-1 rounded-[2rem] border-2 border-orange-500/20 pointer-events-none"
              />
            )}
          </button>
        </div>
      </section>
    </div>
  );
}

function BillingSettings() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <section className="space-y-6">
        <div>
          <h3 className="text-base font-medium text-foreground">Active Plan</h3>
          <p className="text-xs text-foreground/40 font-light">
            Monitor your subscription status and limits.
          </p>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-card-custom border border-card-border-custom relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4">
            <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-[10px] font-mono tracking-widest uppercase">
              Free Trial
            </span>
          </div>

          <div className="space-y-8 relative z-10">
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-light tracking-tighter">18</span>
                <span className="text-xl text-foreground/20 font-light">
                  / 30 days
                </span>
              </div>
              <p className="text-sm text-foreground/60 font-light max-w-sm">
                You are currently on a 30-day free trial. Experience deep work
                orchestration without limits.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <p className="text-[10px] text-foreground/40 font-mono uppercase tracking-[0.2em]">
                  Trial Progress
                </p>
                <p className="text-[10px] text-foreground font-mono">
                  60% Elapsed
                </p>
              </div>
              <div className="h-2 w-full bg-foreground/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="h-full bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Button
                variant="primary"
                className="bg-orange-500 hover:bg-orange-400 text-white px-8 rounded-full"
              >
                Upgrade to Pro
              </Button>
              <button className="text-xs text-foreground/40 hover:text-foreground transition-colors">
                Manage Payment Methods
              </button>
            </div>
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-500/5 blur-[100px] rounded-full group-hover:bg-orange-500/10 transition-colors" />
        </div>
      </section>
    </div>
  );
}
