"use client"

import { useState } from "react"
import { BarChart3, Download, FileText, Users, GraduationCap, DollarSign, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { students, teachers, feesData, examResults, applicationTrend } from "@/lib/mock-data"
import { ClientOnly } from "@/components/dashboard/client-only"
import { toast } from "sonner"
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts"

const gradeDistribution = [
  { grade: "A+", count: 42, color: "#4F46E5" },
  { grade: "A", count: 38, color: "#7C3AED" },
  { grade: "B+", count: 55, color: "#0EA5E9" },
  { grade: "B", count: 33, color: "#10B981" },
  { grade: "C", count: 18, color: "#F59E0B" },
  { grade: "D", count: 8, color: "#EF4444" },
]

const subjectPerformance = [
  { subject: "Math", avg: 78, highest: 98, lowest: 42 },
  { subject: "Science", avg: 82, highest: 96, lowest: 50 },
  { subject: "English", avg: 85, highest: 99, lowest: 55 },
  { subject: "History", avg: 76, highest: 94, lowest: 48 },
  { subject: "CS", avg: 88, highest: 100, lowest: 60 },
]

const attendanceData = [
  { month: "Jan", present: 94, absent: 6 },
  { month: "Feb", present: 92, absent: 8 },
  { month: "Mar", present: 96, absent: 4 },
  { month: "Apr", present: 90, absent: 10 },
  { month: "May", present: 93, absent: 7 },
]

const feeCollectionByClass = [
  { class: "10-A", collected: 1050000, pending: 0 },
  { class: "10-B", collected: 875000, pending: 125000 },
  { class: "9-A", collected: 946000, pending: 44000 },
  { class: "9-B", collected: 902000, pending: 66000 },
  { class: "8-A", collected: 760000, pending: 0 },
]

const reportTypes = [
  { label: "Academic Report", icon: FileText, desc: "Student performance, grades and rankings", color: "text-primary bg-primary/10" },
  { label: "Attendance Report", icon: Users, desc: "Student and teacher attendance summary", color: "text-emerald-600 bg-emerald-100" },
  { label: "Fee Report", icon: DollarSign, desc: "Fee collection and payment status", color: "text-amber-600 bg-amber-100" },
  { label: "Admission Report", icon: GraduationCap, desc: "Admission applications and trends", color: "text-violet-600 bg-violet-100" },
  { label: "Staff Report", icon: Users, desc: "Teacher performance and workload", color: "text-sky-600 bg-sky-100" },
  { label: "Financial Summary", icon: TrendingUp, desc: "Revenue, expenses and projections", color: "text-rose-600 bg-rose-100" },
]

export default function ReportsPage() {
  const [tab, setTab] = useState("academic")
  const [period, setPeriod] = useState("2024-25")

  return (
    <div className="p-4 lg:p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-sm text-muted-foreground">Comprehensive school data insights</p>
        </div>
        <div className="flex gap-2 items-center">
          <Select value={period} onValueChange={(v) => setPeriod(v ?? "2024-25")}>
            <SelectTrigger className="w-32 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-25">2024-25</SelectItem>
              <SelectItem value="2023-24">2023-24</SelectItem>
              <SelectItem value="2022-23">2022-23</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => toast.success("Report exported as PDF!")}>
            <Download className="size-4" /> Export All
          </Button>
        </div>
      </div>

      {/* Quick report generators */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {reportTypes.map(r => (
          <button
            key={r.label}
            className="bg-card rounded-xl border border-border p-3 flex flex-col items-start gap-2 hover:shadow-md hover:border-primary/30 transition-all text-left"
            onClick={() => toast.success(`${r.label} generated!`)}
          >
            <div className={`size-8 rounded-lg flex items-center justify-center ${r.color}`}>
              <r.icon className="size-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground leading-tight">{r.label}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug line-clamp-2">{r.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Analytics Tabs */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="h-9 mb-4">
          {[
            { value: "academic", label: "Academic" },
            { value: "attendance", label: "Attendance" },
            { value: "fees", label: "Fees" },
            { value: "admissions", label: "Admissions" },
          ].map(t => (
            <TabsTrigger key={t.value} value={t.value} className="text-sm">{t.label}</TabsTrigger>
          ))}
        </TabsList>

        {/* Academic Tab */}
        <TabsContent value="academic">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Grade Distribution */}
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">Grade Distribution</h3>
                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => toast.success("Downloaded!")}>
                  <Download className="size-3" /> Export
                </Button>
              </div>
              <div className="h-48">
                <ClientOnly fallback={<div className="h-full w-full animate-pulse bg-muted rounded-lg" />}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={gradeDistribution} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="grade" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "11px" }} />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Students">
                        {gradeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ClientOnly>
              </div>
            </div>

            {/* Subject Performance */}
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">Subject Performance</h3>
                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => toast.success("Downloaded!")}>
                  <Download className="size-3" /> Export
                </Button>
              </div>
              <div className="h-48">
                <ClientOnly fallback={<div className="h-full w-full animate-pulse bg-muted rounded-lg" />}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subjectPerformance} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="subject" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "11px" }} />
                      <Bar dataKey="avg" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Avg Score" />
                      <Bar dataKey="highest" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} name="Highest" />
                    </BarChart>
                  </ResponsiveContainer>
                </ClientOnly>
              </div>
            </div>

            {/* Top Scorers Table */}
            <div className="bg-card rounded-xl border border-border p-4 lg:col-span-2">
              <h3 className="text-sm font-semibold text-foreground mb-3">Top Scorers — Annual Examination</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      {["Rank", "Student", "Roll No", "Class", "Math", "Science", "English", "History", "CS", "Total", "Grade"].map(h => (
                        <th key={h} className="pb-2 text-left text-xs font-semibold text-muted-foreground pr-3 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {examResults.map((r, i) => (
                      <tr key={r.rollNo} className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                        <td className="py-2.5 pr-3">
                          <span className={`size-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? "bg-amber-400 text-white" : i === 1 ? "bg-slate-300 text-slate-700" : i === 2 ? "bg-amber-700 text-white" : "bg-muted text-muted-foreground"}`}>
                            {i + 1}
                          </span>
                        </td>
                        <td className="py-2.5 pr-3 text-xs font-medium text-foreground whitespace-nowrap">{r.student}</td>
                        <td className="py-2.5 pr-3 text-xs text-muted-foreground">{r.rollNo}</td>
                        <td className="py-2.5 pr-3 text-xs text-muted-foreground">{r.class}</td>
                        {[r.math, r.science, r.english, r.history, r.cs].map((score, idx) => (
                          <td key={idx} className="py-2.5 pr-3 text-xs text-foreground">{score}</td>
                        ))}
                        <td className="py-2.5 pr-3 text-xs font-semibold text-foreground">{r.percentage}%</td>
                        <td className="py-2.5">
                          <Badge variant="default" className="text-[10px] h-5">{r.grade}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Monthly Attendance Rate (%)</h3>
              <div className="h-56">
                <ClientOnly fallback={<div className="h-full w-full animate-pulse bg-muted rounded-lg" />}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={attendanceData} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 10 }} domain={[80, 100]} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "11px" }} />
                      <Line type="monotone" dataKey="present" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))", r: 4 }} name="Present %" />
                      <Line type="monotone" dataKey="absent" stroke="#EF4444" strokeWidth={2} dot={{ fill: "#EF4444", r: 4 }} name="Absent %" />
                    </LineChart>
                  </ResponsiveContainer>
                </ClientOnly>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Attendance Summary</h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Average Attendance", value: "93.0%", color: "text-emerald-600" },
                  { label: "Students with >95%", value: "824", color: "text-primary" },
                  { label: "Students with <75%", value: "18", color: "text-rose-600" },
                  { label: "Perfect Attendance", value: "142", color: "text-amber-600" },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm text-foreground">{item.label}</span>
                    <span className={`text-sm font-bold ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Fees Tab */}
        <TabsContent value="fees">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Fee Collection by Class</h3>
              <div className="h-56">
                <ClientOnly fallback={<div className="h-full w-full animate-pulse bg-muted rounded-lg" />}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={feeCollectionByClass} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="class" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 9 }} tickFormatter={v => `₹${v / 1000}K`} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "11px" }} formatter={(v: unknown) => [`₹${(Number(v) / 1000).toFixed(0)}K`, ""]} />
                      <Legend iconSize={10} wrapperStyle={{ fontSize: "11px" }} />
                      <Bar dataKey="collected" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Collected" />
                      <Bar dataKey="pending" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Pending" />
                    </BarChart>
                  </ResponsiveContainer>
                </ClientOnly>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Fee Collection Summary</h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Total Fees Billed", value: "₹18,50,000", color: "text-foreground" },
                  { label: "Collected", value: "₹14,70,000", color: "text-emerald-600" },
                  { label: "Pending", value: "₹2,50,000", color: "text-amber-600" },
                  { label: "Overdue", value: "₹1,30,000", color: "text-rose-600" },
                  { label: "Collection Rate", value: "79.5%", color: "text-primary" },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm text-foreground">{item.label}</span>
                    <span className={`text-sm font-bold ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Admissions Tab */}
        <TabsContent value="admissions">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Application Trend</h3>
              <div className="h-56">
                <ClientOnly fallback={<div className="h-full w-full animate-pulse bg-muted rounded-lg" />}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={applicationTrend} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "11px" }} />
                      <Line type="monotone" dataKey="applications" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))", r: 4 }} name="Applications" />
                    </LineChart>
                  </ResponsiveContainer>
                </ClientOnly>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Admission Funnel</h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Total Inquiries", value: 120, bar: 100 },
                  { label: "Applications Submitted", value: 58, bar: 48 },
                  { label: "Documents Complete", value: 44, bar: 37 },
                  { label: "Shortlisted", value: 8, bar: 6 },
                  { label: "Enrolled", value: 0, bar: 0 },
                ].map(item => (
                  <div key={item.label} className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-foreground">{item.label}</span>
                      <span className="font-semibold text-foreground">{item.value}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${item.bar}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
