"use client"

import { useRef, useState, type ChangeEvent } from "react"
import Link from "next/link"
import {
  Users,
  GraduationCap,
  BookOpen,
  Download,
  Calendar,
  ChevronDown,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Globe,
  ExternalLink,
  Star,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  MessageSquare,
  FileText,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts"
import {
  students,
  teachers,
  classes,
  events,
  announcements,
  applicationTrend,
  reviews,
} from "@/lib/mock-data"
import { StatCard } from "@/components/dashboard/stat-card"
import { ClientOnly } from "@/components/dashboard/client-only"
import { toast } from "sonner"
import { useSchool } from "@/components/dashboard/school-provider"

const subjectColors: Record<string, string> = {
  "1": "bg-amber-100 text-amber-700",
  "2": "bg-sky-100 text-sky-700",
  "3": "bg-rose-100 text-rose-700",
  "4": "bg-slate-100 text-slate-700",
  "5": "bg-violet-100 text-violet-700",
}

const topStudents = students.filter((s) => s.score).sort((a, b) => b.score - a.score).slice(0, 5)
const upcomingEvents = events.filter((e) => e.status === "Upcoming").slice(0, 3)
const recentUpdates = announcements.slice(0, 3)

const quickActions = [
  { label: "Add Student", icon: UserPlus, href: "/dashboard/students", color: "text-primary" },
  { label: "Add Teacher", icon: GraduationCap, href: "/dashboard/teachers", color: "text-violet-600" },
  { label: "Add Class", icon: BookOpen, href: "/dashboard/classes", color: "text-amber-600" },
  { label: "Create Notice", icon: Plus, href: "/dashboard/notices", color: "text-rose-600" },
  { label: "Send Message", icon: MessageSquare, href: "/dashboard/messages", color: "text-sky-600" },
  { label: "Generate Report", icon: FileText, href: "/dashboard/reports", color: "text-emerald-600" },
]

const announcementIcons = [Calendar, BookOpen, MessageSquare]
const announcementColors = ["text-primary bg-primary/10", "text-amber-600 bg-amber-100", "text-emerald-600 bg-emerald-100"]

const socialLinks = [
  { name: "Facebook", color: "bg-blue-600", letter: "f" },
  { name: "Instagram", color: "bg-pink-500", letter: "in" },
  { name: "YouTube", color: "bg-red-600", letter: "y" },
  { name: "Twitter", color: "bg-sky-400", letter: "tw" },
  { name: "LinkedIn", color: "bg-blue-700", letter: "li" },
]

export default function DashboardPage() {
  const [reviewIndex, setReviewIndex] = useState(0)
  const [trendPeriod, setTrendPeriod] = useState("Monthly")
  const [exporting, setExporting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { school, gallery, addPhotos } = useSchool()

  const handlePhotos = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])
    if (!files.length) return
    addPhotos(files.map((file) => URL.createObjectURL(file)))
    toast.success(`${files.length} photo${files.length > 1 ? "s" : ""} added to the gallery`)
    event.target.value = ""
  }

  const handleExport = () => {
    setExporting(true)
    setTimeout(() => {
      setExporting(false)
      toast.success("Report exported successfully!")
    }, 1500)
  }

  const prevReview = () => setReviewIndex((i) => (i - 1 + reviews.length) % reviews.length)
  const nextReview = () => setReviewIndex((i) => (i + 1) % reviews.length)

  const visibleReviews = [
    reviews[reviewIndex % reviews.length],
    reviews[(reviewIndex + 1) % reviews.length],
    reviews[(reviewIndex + 2) % reviews.length],
  ]

  const getMonthFormat = (month: string) => {
    if (trendPeriod === "Weekly") return `W${month.slice(-1)}`
    return month
  }

  return (
    <div className="p-4 lg:p-6 flex gap-5">
      {/* Main column */}
      <div className="flex-1 min-w-0 flex flex-col gap-5">
        {/* Dashboard Header */}
        <div className="flex items-start justify-between gap-4 bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <BookOpen className="size-7 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">School Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage your school, engage with students and make data-driven decisions.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="flex items-center gap-2 text-sm border border-border rounded-lg px-3 py-1.5 text-foreground hover:bg-accent transition-colors">
              <Calendar className="size-4 text-muted-foreground" />
              May 01 – May 31, 2025
              <ChevronDown className="size-3 text-muted-foreground" />
            </button>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm"
              onClick={handleExport}
              disabled={exporting}
            >
              <Download className="size-4" />
              {exporting ? "Exporting..." : "Export Report"}
              <ChevronDown className="size-3" />
            </Button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/dashboard/students">
            <StatCard
              title="Total Students"
              value={1248}
              change="4.3%"
              changeLabel="vs Apr 01 – Apr 30"
              icon={Users}
              iconBg="bg-primary/10"
              iconColor="text-primary"
            />
          </Link>
          <Link href="/dashboard/teachers">
            <StatCard
              title="Total Teachers"
              value={86}
              change="2.1%"
              changeLabel="vs Apr 01 – Apr 30"
              icon={GraduationCap}
              iconBg="bg-violet-100"
              iconColor="text-violet-600"
            />
          </Link>
          <Link href="/dashboard/classes">
            <StatCard
              title="Total Classes"
              value={48}
              change="3.4%"
              changeLabel="vs Apr 01 – Apr 30"
              icon={BookOpen}
              iconBg="bg-emerald-100"
              iconColor="text-emerald-600"
            />
          </Link>
        </div>

        {/* About + Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* About */}
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-foreground">About Our School</h2>
              <Link href="/dashboard/settings?tab=school"><Button variant="ghost" size="sm" className="text-xs gap-1 h-7">
                <span className="text-primary">Edit Info</span>
              </Button></Link>
            </div>
            <div className="flex gap-3 mb-3">
              <img
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=200&h=130&fit=crop&q=80"
                alt="School building"
                className="rounded-lg object-cover w-32 h-24 shrink-0"
              />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {school.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm mb-3">
              {[
                { label: "Established", value: school.established },
                { label: "School Type", value: school.type },
                { label: "Affiliation", value: school.board },
                { label: "Grades", value: school.grades },
                { label: "Location", value: `${school.city}, ${school.state}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-1">
                  <span className="text-muted-foreground shrink-0">{label}</span>
                  <span className="font-medium text-foreground truncate">{value}</span>
                </div>
              ))}
            </div>
            <Link href="/dashboard/profile"><Button variant="outline" size="sm" className="w-full text-xs justify-between">
              View School Profile
              <ArrowRight className="size-3" />
            </Button></Link>
          </div>

          {/* Gallery */}
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-foreground">Gallery</h2>
              <>
                <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handlePhotos} />
                <Button variant="ghost" size="sm" className="h-7 text-xs text-primary" onClick={() => fileInputRef.current?.click()}><Plus className="size-3" /> Add Photos</Button>
              </>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {gallery.slice(0, 5).map((photo, index) => <img key={`${photo}-${index}`} src={photo} alt={`School gallery photo ${index + 1}`} className={`rounded-lg object-cover w-full ${index === 0 ? "h-28 col-span-2" : "h-24"}`} />)}
            </div>
          </div>
        </div>

        {/* Bottom three sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Top Scores */}
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground">Class 10th Top Scores</h2>
              <Link href="/dashboard/reports" className="text-xs text-primary font-medium hover:underline">View All</Link>
            </div>
            <div className="flex flex-col gap-2">
              {topStudents.map((s, i) => (
                <div key={s.id} className="flex items-center gap-3">
                  <span className={`size-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${i === 0 ? "bg-amber-400 text-white" : i === 1 ? "bg-slate-300 text-slate-700" : i === 2 ? "bg-amber-700 text-white" : "bg-muted text-muted-foreground"}`}>
                    {i + 1}
                  </span>
                  <div className="size-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-primary">{s.avatar.slice(0, 1)}</span>
                  </div>
                  <span className="flex-1 text-sm text-foreground font-medium truncate">{s.name}</span>
                  <span className="text-sm font-semibold text-foreground">{s.score}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Updates */}
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground">Recent Updates</h2>
              <Link href="/dashboard/announcements" className="text-xs text-primary font-medium hover:underline">View All</Link>
            </div>
            <div className="flex flex-col gap-3">
              {recentUpdates.map((a, i) => {
                const AIcon = announcementIcons[i % announcementIcons.length]
                return (
                  <Link key={a.id} href="/dashboard/announcements" className="flex items-start gap-3 hover:bg-accent -mx-2 px-2 py-1 rounded-lg transition-colors">
                    <div className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${announcementColors[i % announcementColors.length]}`}>
                      <AIcon className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-foreground leading-snug line-clamp-2">{a.title}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{a.date}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground">Upcoming Events</h2>
              <Link href="/dashboard/events" className="text-xs text-primary font-medium hover:underline">View All</Link>
            </div>
            <div className="flex flex-col gap-3">
              {upcomingEvents.map((e) => {
                const [, month, day] = e.date.split("-")
                const monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                return (
                  <Link key={e.id} href="/dashboard/events" className="flex items-start gap-3 hover:bg-accent -mx-2 px-2 py-1 rounded-lg transition-colors">
                    <div className="flex flex-col items-center justify-center bg-primary/10 rounded-lg px-2 py-1 shrink-0 min-w-[40px]">
                      <span className="text-[9px] font-semibold text-primary uppercase">{monthNames[parseInt(month)]}</span>
                      <span className="text-base font-bold text-primary leading-tight">{parseInt(day)}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-foreground leading-snug">{e.title}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{e.date} · {e.time}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-foreground">Student / Parent Reviews</h2>
            <Link href="/dashboard/communities" className="text-xs text-primary font-medium hover:underline">View All</Link>
          </div>
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {visibleReviews.map((r, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary">{r.avatar}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className={`size-3.5 ${idx < r.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`} />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">&ldquo;{r.comment}&rdquo;</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-3 mt-4">
              <button
                onClick={prevReview}
                className="size-7 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft className="size-4" />
              </button>
              <div className="flex gap-1.5">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setReviewIndex(i)}
                    className={`rounded-full transition-all ${i === reviewIndex ? "size-2.5 bg-primary" : "size-2 bg-border"}`}
                    aria-label={`Review ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextReview}
                className="size-7 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Next review"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-64 shrink-0 hidden xl:flex flex-col gap-4">
        {/* Admissions */}
        <div className="bg-card rounded-xl border border-border p-4">
          <h2 className="text-sm font-semibold text-foreground mb-3">Admissions 2025-26</h2>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 mb-3">
            <p className="text-sm font-semibold text-emerald-700">Admissions Open</p>
            <p className="text-xs text-emerald-600">Academic Year 2025-26</p>
          </div>
          <div className="flex flex-col gap-2 mb-3">
            {[
              { label: "New Applications", value: 38, icon: UserPlus },
              { label: "In Review", value: 12, icon: Users },
              { label: "Shortlisted", value: 8, icon: BookOpen },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Icon className="size-3.5" />
                  {label}
                </span>
                <span className="font-semibold text-foreground">{value}</span>
              </div>
            ))}
          </div>
          <Link href="/dashboard/admissions">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-8">
              Apply Now <ExternalLink className="size-3 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Application Trend */}
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground">Application Trend</h2>
            <button
              onClick={() => setTrendPeriod(p => p === "Monthly" ? "Weekly" : "Monthly")}
              className="flex items-center gap-1 text-xs text-muted-foreground border border-border rounded-md px-2 py-0.5 hover:bg-accent transition-colors"
            >
              {trendPeriod} <ChevronDown className="size-3" />
            </button>
          </div>
          <div className="h-36">
            <ClientOnly fallback={<div className="h-full w-full animate-pulse bg-muted rounded-lg" />}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={applicationTrend} margin={{ top: 5, right: 5, bottom: 0, left: -25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} />
                  <RechartsTooltip
                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "11px" }}
                  />
                  <Line type="monotone" dataKey="applications" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))", r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </ClientOnly>
          </div>
          <div className="mt-2 pt-2 border-t border-border flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Total Applications</p>
              <p className="text-lg font-bold text-foreground">1,248</p>
            </div>
            <p className="text-xs font-semibold text-emerald-600">↑ 4.3% vs last month</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-card rounded-xl border border-border p-4">
          <h2 className="text-sm font-semibold text-foreground mb-3">Contact Information</h2>
          <div className="flex flex-col gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Phone className="size-3.5 shrink-0 text-primary" />
              +91 98765 43210
            </div>
            <div className="flex items-center gap-2">
              <Mail className="size-3.5 shrink-0 text-primary" />
              admissions@greenfieldschool.edu.in
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="size-3.5 shrink-0 text-primary mt-0.5" />
              Greenfield High School, Knowledge Park, Bengaluru, Karnataka 560100
            </div>
            <div className="flex items-center gap-2">
              <Globe className="size-3.5 shrink-0 text-primary" />
              <a href="#" className="text-primary hover:underline">www.greenfieldschool.edu.in</a>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            {socialLinks.map((s) => (
              <Tooltip key={s.name}>
                <TooltipTrigger
                  render={<span />}
                  className={`size-7 rounded-md ${s.color} text-white text-[10px] font-bold flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer`}
                >
                  {s.letter.toUpperCase().slice(0, 1)}
                </TooltipTrigger>
                <TooltipContent>{s.name}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-xl border border-border p-4">
          <h2 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-2">
            {quickActions.map(({ label, icon: Icon, href, color }) => (
              <Link
                key={label}
                href={href}
                className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-accent transition-colors group"
              >
                <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className={`size-4 ${color}`} />
                </div>
                <span className="text-[10px] text-muted-foreground text-center leading-tight">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
