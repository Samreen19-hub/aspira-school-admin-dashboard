import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { SchoolProvider } from "@/components/dashboard/school-provider"
import type { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SchoolProvider>
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - hidden on mobile, visible lg+ */}
      <div className="hidden lg:flex">
        <DashboardSidebar />
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
    </SchoolProvider>
  )
}
