import { AuthForm } from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background selection:bg-accent/20">
      <AuthForm mode="login" />
    </main>
  );
}
