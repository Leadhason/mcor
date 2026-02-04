"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function completeOnboarding(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const path = formData.get("path") as string;
  const focus =
    (formData.get("focus") as string)?.split(",").filter(Boolean) || [];

  // Perform a robust upsert with all personalization data
  const { error: updateError } = await supabase.from("profiles").upsert({
    id: user.id,
    onboarded: true,
    path: path,
    focus: focus,
    updated_at: new Date().toISOString(),
  });

  if (updateError) {
    console.error("Error updating profile during onboarding:", updateError);
    // You might want to handle this more gracefully, e.g., by returning an error message
    // but for now we'll stick to the existing flow of redirecting.
  }

  // Clear cache for dashboard and onboarding
  revalidatePath("/dashboard");
  revalidatePath("/onboarding");

  // Finalize
  redirect("/dashboard");
}
