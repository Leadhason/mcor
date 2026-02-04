import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { TaskList } from "@/components/dashboard/TaskList";
import { RightSidebar } from "@/components/dashboard/RightSidebar";
import {
  LucideSearch,
  LucideBell,
  LucidePlus,
  LucideFilter,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default async function ProjectsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Mock data for demonstration - in production this would come from Supabase
  const mockProjects = [
    {
      id: "1",
      title: "Google UI Redesign",
      company: "Google inc.",
      status: "in_progress" as const,
      priority: "high" as const,
      tasksDone: 25,
      totalTasks: 50,
      dueDate: "20 June",
      tags: ["iOS App", "UI/UX"],
    },
    {
      id: "2",
      title: "Slack Mobile App",
      company: "Slack corporation",
      status: "completed" as const,
      priority: "medium" as const,
      tasksDone: 30,
      totalTasks: 30,
      dueDate: "15 June",
      tags: ["Android", "iOS App"],
    },
  ];

  const mockTasks = [
    { id: "1", title: "Create wireframe", status: "completed" as const },
    {
      id: "2",
      title: "Slack Logo Design",
      status: "todo" as const,
      duration: "3m 45s",
    },
    {
      id: "3",
      title: "Dashboard Design",
      status: "todo" as const,
      duration: "5m 20s",
    },
    { id: "4", title: "Create wireframe", status: "completed" as const },
    { id: "5", title: "Google Logo Design", status: "completed" as const },
    { id: "6", title: "Slack Logo Design", status: "todo" as const },
    {
      id: "7",
      title: "Dashboard Design",
      status: "todo" as const,
      duration: "5m 12s",
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex h-full">
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 flex items-center justify-between px-8 shrink-0">
            <div className="flex items-center gap-8">
              <div className="space-y-0.5">
                <h1 className="text-lg font-medium text-foreground">
                  Project Command
                </h1>
                <p className="text-[10px] text-foreground/30 font-light">
                  Managing your deep work cycles
                </p>
              </div>

              <div className="relative group">
                <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/20 group-hover:text-foreground/40 transition-colors" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-40 bg-card-custom border border-card-border-custom rounded-xl py-1.5 pl-9 pr-4 text-xs font-light placeholder:text-foreground/20 focus:outline-none focus:border-emerald-500/50 transition-all focus:w-56"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500 text-black text-xs font-medium hover:bg-emerald-400 transition-all group">
                <LucidePlus
                  size={14}
                  className="transition-transform group-hover:rotate-90"
                />
                New Project
              </button>
              <button className="p-1.5 rounded-xl bg-card-custom border border-card-border-custom hover:bg-foreground/10 transition-colors">
                <LucideFilter size={16} className="text-foreground/40" />
              </button>
              <button className="p-1.5 rounded-xl bg-card-custom border border-card-border-custom hover:bg-foreground/10 transition-colors">
                <LucideBell className="h-4 w-4 text-foreground/40" />
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto no-scrollbar px-8 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              {/* Left Side: Project Grid */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-[10px] font-medium text-foreground/60 tracking-wider uppercase">
                    Active Projects
                  </h2>
                  <span className="text-[9px] font-mono text-foreground/20">
                    Showing 2 of 5
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-5">
                  {mockProjects.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                  ))}
                </div>
              </div>

              {/* Right Side: Task Details */}
              <div className="space-y-6">
                <TaskList tasks={mockTasks} />

                {/* Team Activity Section (Mocked) */}
                <div className="rounded-3xl bg-card-custom border border-card-border-custom p-5 space-y-5">
                  <h3 className="text-base font-light tracking-tight text-foreground">
                    Project Messages
                  </h3>
                  <div className="space-y-5">
                    {[
                      {
                        name: "John Doe",
                        msg: "Hi Angelina! How are you?",
                        time: "2m ago",
                        color: "bg-emerald-500",
                      },
                      {
                        name: "Charmie",
                        msg: "Do you need that design?",
                        time: "5m ago",
                        color: "bg-orange-500",
                      },
                      {
                        name: "Jason Mandela",
                        msg: "What is the price of hourly...",
                        time: "12m ago",
                        color: "bg-blue-500",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 group cursor-pointer hover:bg-foreground/[0.02] p-2 -m-2 rounded-xl transition-all"
                      >
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 border-foreground/10 overflow-hidden",
                            item.color,
                          )}
                        >
                          <div className="w-full h-full bg-gradient-to-br from-foreground/20 to-transparent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-medium text-foreground truncate">
                            {item.name}
                          </h4>
                          <p className="text-[10px] text-foreground/30 truncate font-light">
                            {item.msg}
                          </p>
                        </div>
                        <span className="text-[10px] font-mono text-foreground/10 shrink-0">
                          {item.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <RightSidebar />
      </div>
    </DashboardLayout>
  );
}
