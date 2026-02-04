import { AuthForm } from "@/components/AuthForm";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background selection:bg-accent/20">
      <AuthForm mode="signup" />
    </main>
  );
}
