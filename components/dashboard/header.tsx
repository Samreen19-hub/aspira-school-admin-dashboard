"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  Network,
  Mail,
  Bell,
  Search,
  Menu,
  ChevronDown,
  Settings,
  LogOut,
  User,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { DashboardSidebar } from "./sidebar"
import { cn } from "@/lib/utils"

const topNavItems = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/dashboard/communities", icon: Network, label: "Network" },
  { href: "/dashboard/messages", icon: Mail, label: "Messages", badge: 13 },
  { href: "/dashboard/notices", icon: Bell, label: "Notifications", badge: 4 },
]

export function DashboardHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  return (
    <header className="sticky top-0 z-30 bg-card border-b border-border h-14 flex items-center px-4 gap-4">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden size-8 shrink-0"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="size-4" />
      </Button>

      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search students, teachers, classes, events, etc..."
          className="pl-9 h-9 bg-muted/50 border-border text-sm"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {/* Top nav */}
      <nav className="hidden md:flex items-center gap-1 ml-auto">
        {topNavItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors relative",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="relative">
                <item.icon className="size-5" />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center size-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold">
                    {item.badge}
                  </span>
                )}
              </span>
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Profile */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 pl-3 border-l border-border ml-1 focus:outline-none rounded-sm">
          <div className="size-8 rounded-full bg-muted border border-border overflow-hidden flex items-center justify-center">
            <span className="text-xs font-bold text-foreground">GH</span>
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-foreground leading-tight">Greenfield High School</p>
            <p className="text-[10px] text-muted-foreground leading-tight">Admin</p>
          </div>
          <ChevronDown className="size-3 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => router.push("/dashboard/settings")}>
            <User className="size-4 mr-2" />Profile
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => router.push("/dashboard/settings")}>
            <Settings className="size-4 mr-2" />Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <LogOut className="size-4 mr-2" />Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Mobile Sidebar Sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-56">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <DashboardSidebar />
        </SheetContent>
      </Sheet>
    </header>
  )
}
