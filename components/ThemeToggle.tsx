"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { LucideSun, LucideMoon } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-6 right-6 p-0 w-9 h-9 flex items-center justify-center rounded-full opacity-0"
      />
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-6 right-6 p-0 w-9 h-9 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 border border-border shadow-sm z-[100]"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <LucideSun className="h-4 w-4" />
      ) : (
        <LucideMoon className="h-4 w-4" />
      )}
    </Button>
  );
}
