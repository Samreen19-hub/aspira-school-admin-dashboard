"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  ClipboardList,
  DollarSign,
  UserPlus,
  MessageSquare,
  Bell,
  CalendarDays,
  BarChart3,
  MessageCircle,
  Settings,
  Crown,
  ChevronDown,
  Shield,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/overview", icon: BarChart3, label: "Overview" },
  { href: "/dashboard/students", icon: Users, label: "Students" },
  { href: "/dashboard/teachers", icon: GraduationCap, label: "Teachers" },
  { href: "/dashboard/classes", icon: BookOpen, label: "Classes" },
  { href: "/dashboard/timetable", icon: Calendar, label: "Timetable" },
  { href: "/dashboard/exams", icon: ClipboardList, label: "Exams" },
  { href: "/dashboard/fees", icon: DollarSign, label: "Fees" },
  { href: "/dashboard/admissions", icon: UserPlus, label: "Admissions" },
  { href: "/dashboard/parent-communication", icon: MessageSquare, label: "Parent Comms" },
  { href: "/dashboard/announcements", icon: Bell, label: "Announcements" },
  { href: "/dashboard/communities", icon: MessageCircle, label: "Communities" },
  { href: "/dashboard/events", icon: CalendarDays, label: "Events" },
  { href: "/dashboard/reports", icon: BarChart3, label: "Reports" },
]

const bottomItems = [
  { href: "/dashboard/messages", icon: MessageSquare, label: "Messages", badge: 12 },
  { href: "/dashboard/notices", icon: Bell, label: "Notices", badge: 8 },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
]

export function DashboardSidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <aside
      className={cn(
        "flex flex-col h-full w-56 bg-sidebar border-r border-sidebar-border shrink-0",
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-sidebar-border">
        <div className="flex items-center justify-center size-9 rounded-xl bg-primary shrink-0">
          <Shield className="size-5 text-primary-foreground" />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground leading-tight">Aspira</p>
          <p className="text-xs text-muted-foreground leading-tight">School Admin</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-0.5">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className="size-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Nav */}
      <div className="px-2 pb-2 flex flex-col gap-0.5 border-t border-sidebar-border pt-3">
        {bottomItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:bg-accent hover:text-foreground"
              )}
            >
              <span className="flex items-center gap-3">
                <item.icon className="size-4 shrink-0" />
                {item.label}
              </span>
              {item.badge && (
                <Badge className="size-5 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground rounded-full">
                  {item.badge}
                </Badge>
              )}
            </Link>
          )
        })}
      </div>

      {/* Upgrade Banner */}
      <div className="mx-3 mb-3 rounded-xl bg-secondary border border-border p-3">
        <p className="text-xs font-semibold text-foreground mb-0.5">Upgrade to Premium</p>
        <p className="text-[11px] text-muted-foreground mb-2 leading-relaxed">
          Unlock advanced analytics, priority support and more.
        </p>
        <Button asChild size="sm" className="w-full h-7 text-xs bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/dashboard/upgrade">
            <Crown className="size-3" />
            Upgrade Now
          </Link>
        </Button>
      </div>

      {/* Profile */}
      <div className="border-t border-sidebar-border">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="flex items-center gap-3 w-full px-4 py-3 hover:bg-accent transition-colors"
        >
          <div className="size-8 rounded-full bg-primary flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-primary-foreground">AU</span>
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Admin User</p>
            <p className="text-xs text-muted-foreground truncate">Super Admin</p>
          </div>
          <ChevronDown className={cn("size-4 text-muted-foreground transition-transform shrink-0", profileOpen && "rotate-180")} />
        </button>
        {profileOpen && (
          <div className="px-2 pb-2 flex flex-col gap-0.5">
            <Link href="/dashboard/settings" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-foreground/70 hover:bg-accent hover:text-foreground transition-colors">
              <Settings className="size-4" /> Profile Settings
            </Link>
          </div>
        )}
      </div>
    </aside>
  )
}
