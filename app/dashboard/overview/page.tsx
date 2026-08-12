"use client"

import { Users, GraduationCap, BookOpen, DollarSign, TrendingUp, Award, Calendar, Bell } from "lucide-react"
import Link from "next/link"
import { applicationTrend, feesData, students, teachers, classes } from "@/lib/mock-data"
import { useSchool } from "@/components/dashboard/school-provider"
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts"

const quickStats = [
  { label: "Total Students", value: "1,248", icon: Users, color: "text-primary bg-primary/10", href: "/dashboard/students", change: "+4.3%" },
  { label: "Teachers", value: "86", icon: GraduationCap, color: "text-violet-600 bg-violet-100", href: "/dashboard/teachers", change: "+2.1%" },
  { label: "Classes", value: "48", icon: BookOpen, color: "text-emerald-600 bg-emerald-100", href: "/dashboard/classes", change: "+3.4%" },
  { label: "Fee Collection", value: "₹14.7L", icon: DollarSign, color: "text-amber-600 bg-amber-100", href: "/dashboard/fees", change: "+8.2%" },
  { label: "Avg Attendance", value: "93%", icon: TrendingUp, color: "text-sky-600 bg-sky-100", href: "/dashboard/reports", change: "+1.2%" },
  { label: "Pass Rate", value: "98.2%", icon: Award, color: "text-rose-600 bg-rose-100", href: "/dashboard/reports", change: "+0.8%" },
  { label: "Events This Month", value: "5", icon: Calendar, color: "text-teal-600 bg-teal-100", href: "/dashboard/events", change: "0" },
  { label: "Active Notices", value: "8", icon: Bell, color: "text-orange-600 bg-orange-100", href: "/dashboard/notices", change: "+3" },
]

const genderData = [
  { name: "Male", value: 638, color: "#4F46E5" },
  { name: "Female", value: 610, color: "#7C3AED" },
]

const classStrength = classes.map(c => ({ class: c.name, students: c.students }))

const feeStatus = [
  { name: "Paid", value: 79, color: "#10B981" },
  { name: "Partial", value: 12, color: "#F59E0B" },
  { name: "Overdue", value: 9, color: "#EF4444" },
]

export default function OverviewPage() {
  const { school } = useSchool()
  return (
    <div className="p-4 lg:p-6 flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-bold text-foreground">School Overview</h1>
        <p className="text-sm text-muted-foreground">A comprehensive snapshot of {school.name} — May 2025</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickStats.map(s => (
          <Link key={s.label} href={s.href}>
            <div className="bg-card rounded-xl border border-border p-4 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <div className={`size-9 rounded-lg flex items-center justify-center ${s.color}`}>
                  <s.icon className="size-4" />
                </div>
              </div>
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-xs text-emerald-600 mt-1">{s.change !== "0" ? s.change : "No change"}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Application Trend */}
        <div className="bg-card rounded-xl border border-border p-4 lg:col-span-2">
          <h2 className="text-sm font-semibold text-foreground mb-3">Application Trend (2025)</h2>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={applicationTrend} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "11px" }} />
                <Line type="monotone" dataKey="applications" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ fill: "hsl(var(--primary))", r: 4 }} name="Applications" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="bg-card rounded-xl border border-border p-4">
          <h2 className="text-sm font-semibold text-foreground mb-3">Gender Distribution</h2>
          <div className="h-36 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={genderData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value">
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4">
            {genderData.map(d => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="size-2.5 rounded-full" style={{ background: d.color }} />
                <span className="text-xs text-muted-foreground">{d.name}: {d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Class Strength */}
        <div className="bg-card rounded-xl border border-border p-4">
          <h2 className="text-sm font-semibold text-foreground mb-3">Class Strength</h2>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classStrength} margin={{ top: 5, right: 5, bottom: 0, left: -25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="class" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} domain={[0, 50]} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "11px" }} />
                <Bar dataKey="students" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Students" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fee Status */}
        <div className="bg-card rounded-xl border border-border p-4">
          <h2 className="text-sm font-semibold text-foreground mb-3">Fee Payment Status</h2>
          <div className="h-36 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={feeStatus} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value">
                  {feeStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "11px" }} formatter={(v) => [`${v}%`, ""]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4">
            {feeStatus.map(d => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="size-2.5 rounded-full" style={{ background: d.color }} />
                <span className="text-xs text-muted-foreground">{d.name}: {d.value}%</span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-col gap-1.5">
            {feeStatus.map(d => (
              <div key={d.name} className="flex items-center gap-2">
                <span className="text-xs text-foreground w-14">{d.name}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${d.value}%`, background: d.color }} />
                </div>
                <span className="text-xs font-medium text-foreground w-8 text-right">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
