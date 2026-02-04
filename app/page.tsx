import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-background transition-colors duration-300">
      <ThemeToggle />

      <div className="flex flex-col items-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="flex flex-col items-center space-y-4">
          <Logo size={48} className="text-accent" />
          <h1 className="text-5xl font-light tracking-tight sm:text-7xl">
            M<span className="text-accent">!</span>Core
          </h1>
          <p className="max-w-md text-muted-foreground sm:text-lg font-light">
            Consistency over intensity. Clarity over flexibility.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[320px] sm:max-w-none justify-center">
          <Link href="/login" className="w-full sm:w-auto">
            <Button variant="secondary" className="w-full sm:w-[160px]">
              Sign In
            </Button>
          </Link>
          <Link href="/signup" className="w-full sm:w-auto">
            <Button className="w-full sm:w-[160px]">Create Account</Button>
          </Link>
        </div>

        <div className="pt-8 opacity-40">
          <p className="text-[10px] font-mono tracking-[0.2em] uppercase">
            System Initialized
          </p>
        </div>
      </div>
    </main>
  );
}
