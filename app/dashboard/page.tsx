import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { WorkoutHighlight } from "@/components/dashboard/WorkoutHighlight";
import { DietPlan } from "@/components/dashboard/DietPlan";
import { RightSidebar } from "@/components/dashboard/RightSidebar";
import {
  LucideFlame,
  LucideHeart,
  LucideActivity,
  LucideMoon,
  LucideSearch,
  LucideBell,
} from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarded, full_name")
    .eq("id", user.id)
    .single();

  if (!profile?.onboarded) {
    redirect("/onboarding");
  }

  return (
    <DashboardLayout>
      <div className="flex h-full">
        {/* Main Content Scrollable Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-20 flex items-center justify-between px-10 shrink-0">
            <div className="space-y-0.5">
              <h1 className="text-xl font-medium">
                Good Morning, {profile.full_name?.split(" ")[0]} 👋
              </h1>
              <p className="text-[10px] text-white/30 font-light">
                Let's do some workout today
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative group">
                <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/20 group-hover:text-white/40 transition-colors" />
                <input
                  type="text"
                  placeholder="Search something here..."
                  className="w-64 bg-white/[0.03] border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs font-light placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 transition-all"
                />
              </div>
              <button className="p-2 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/10 transition-colors relative">
                <LucideBell className="h-4 w-4 text-white/40" />
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto no-scrollbar px-10 pb-10 space-y-10">
            {/* Metric Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Calories"
                value="1428"
                unit="Kcal"
                iconName="flame"
                color="orange"
                data={[0.3, 0.5, 0.4, 0.7, 0.6, 0.4, 0.8]}
              />
              <MetricCard
                title="Heart Rate"
                value="104"
                unit="bpm/day"
                iconName="heart"
                color="pink"
                data={[0.4, 0.6, 0.5, 0.8, 0.4, 0.7, 0.5]}
              />
              <MetricCard
                title="Steps"
                value="9,886"
                unit="Steps"
                iconName="activity"
                color="green"
                data={[0.5, 0.7, 0.9, 0.6, 0.8, 0.4, 0.7]}
              />
              <MetricCard
                title="Sleep"
                value="8.5"
                unit="hrs/day"
                iconName="moon"
                color="blue"
                data={[0.6, 0.4, 0.7, 0.5, 0.8, 0.6, 0.4]}
              />
            </div>

            {/* Middle Section: Chart and Highlight */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ActivityChart className="lg:col-span-2" />
              <WorkoutHighlight />
            </div>

            {/* Diet Plan Section */}
            <DietPlan />
          </div>
        </div>

        {/* Action Sidebar */}
        <RightSidebar />
      </div>
    </DashboardLayout>
  );
}
