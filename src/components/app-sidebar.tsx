"use client"

import * as React from "react"
import {
  AudioWaveform,
  AwardIcon,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  Command,
  FileQuestion,
  Frame,
  GalleryVerticalEnd,
  Map,
  NotebookIcon,
  NotebookPen,
  PieChart,
  ReceiptIndianRupee,
  Settings2,
  Slack,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Question Bank",
      url: "/dashboard",
      icon: NotebookIcon,
      isActive: true,
    },
    {
      title: "System Design",
      url: "/system-design",
      icon: SquareTerminal,
      isActive: false,
    },
    {
      title: "Interview Exp",
      url: "/interview-exp",
      icon: NotebookPen,
      isActive: false,
    },
    {
      title: "Compensation",
      url: "/compensation",
      icon: ReceiptIndianRupee,
      isActive: false,
    },
    {
      title: "Top Companies",
      url: "/top-companies",
      icon: BriefcaseBusiness,
      isActive: false,
    },
    {
      title: "Hall of Fame",
      url: "/hall-of-fame",
      icon: AwardIcon,
      isActive: false,
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
      <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Slack className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">RapidDSA</span>
                  <span className="">Beta</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
