"use client"

import { useState } from "react"
import { Bell, Plus, Search, Pin, Eye, Edit, Trash2, AlertTriangle, Info, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

const notices = [
  { id: 1, title: "Important: School Timing Change from June 1", content: "With effect from June 1, 2025, school timings will be changed to 7:30 AM - 1:30 PM during summer. Regular timings will resume from July 1, 2025.", date: "2025-05-10", type: "Important", pinned: true, audience: "All", author: "Principal" },
  { id: 2, title: "Annual Sports Day Registration Open", content: "Students interested in participating in the Annual Sports Day events must register with their PE teacher by May 18, 2025. Events include Athletics, Cricket, Football, Basketball, and Badminton.", date: "2025-05-09", type: "Event", pinned: true, audience: "Students", author: "Mr. Prakash Kumar" },
  { id: 3, title: "Fee Payment Deadline Reminder", content: "This is a final reminder that Term 2 fees are due by May 31, 2025. A late fee of ₹500 will be charged after the deadline. Kindly clear dues to avoid inconvenience.", date: "2025-05-08", type: "Finance", pinned: false, audience: "Parents", author: "Accounts Department" },
  { id: 4, title: "CBSE Board Results — Congratulations to Grade 10 & 12!", content: "We are delighted to announce that our students have achieved outstanding results in the CBSE Board Examinations. 98% of students passed with distinction. We congratulate all students, teachers, and parents.", date: "2025-05-07", type: "Achievement", pinned: false, audience: "All", author: "Principal" },
  { id: 5, title: "Library Book Return Deadline — May 20", content: "All borrowed library books must be returned by May 20, 2025. Overdue books will attract a fine of ₹5 per day. Please cooperate.", date: "2025-05-06", type: "General", pinned: false, audience: "Students", author: "Librarian" },
  { id: 6, title: "Parent-Teacher Meeting — May 15", content: "The quarterly Parent-Teacher Meeting will be held on May 15, 2025 from 10:00 AM to 1:00 PM in the school auditorium. Attendance is mandatory for all parents.", date: "2025-05-05", type: "Meeting", pinned: false, audience: "Parents", author: "Principal" },
  { id: 7, title: "New Computer Lab Inauguration", content: "We are pleased to announce the inauguration of a new, state-of-the-art computer lab with 60 workstations. The lab will be available to students from May 12 onwards.", date: "2025-05-04", type: "Infrastructure", pinned: false, audience: "All", author: "Management" },
  { id: 8, title: "Vaccination Drive — May 22", content: "A free vaccination drive will be conducted on May 22, 2025 for students of Grades 6-9. Consent forms have been sent home. Please return signed forms by May 17.", date: "2025-05-03", type: "Health", pinned: false, audience: "Parents", author: "Health Department" },
]

const typeConfig: Record<string, { color: string; icon: typeof Bell }> = {
  Important: { color: "bg-rose-100 text-rose-700", icon: AlertTriangle },
  Event: { color: "bg-primary/10 text-primary", icon: Bell },
  Finance: { color: "bg-amber-100 text-amber-700", icon: Info },
  Achievement: { color: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
  General: { color: "bg-slate-100 text-slate-600", icon: Info },
  Meeting: { color: "bg-sky-100 text-sky-700", icon: Bell },
  Infrastructure: { color: "bg-violet-100 text-violet-700", icon: Info },
  Health: { color: "bg-teal-100 text-teal-700", icon: CheckCircle },
}

export default function NoticesPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [viewItem, setViewItem] = useState<(typeof notices)[0] | null>(null)
  const [createOpen, setCreateOpen] = useState(false)

  const filtered = notices.filter(n =>
    (n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase())) &&
    (filter === "all" || n.type.toLowerCase() === filter.toLowerCase() || (filter === "pinned" && n.pinned))
  )

  const pinnedNotices = filtered.filter(n => n.pinned)
  const regularNotices = filtered.filter(n => !n.pinned)

  return (
    <div className="p-4 lg:p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-foreground">Notices</h1>
          <p className="text-sm text-muted-foreground">School-wide notices and circulars</p>
        </div>
        <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setCreateOpen(true)}>
          <Plus className="size-4" /> Post Notice
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Notices", value: notices.length, color: "bg-primary/10 text-primary" },
          { label: "Pinned", value: notices.filter(n => n.pinned).length, color: "bg-amber-100 text-amber-700" },
          { label: "For Students", value: notices.filter(n => n.audience === "Students" || n.audience === "All").length, color: "bg-violet-100 text-violet-700" },
          { label: "For Parents", value: notices.filter(n => n.audience === "Parents" || n.audience === "All").length, color: "bg-emerald-100 text-emerald-700" },
        ].map(s => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4">
            <div className={`size-9 rounded-lg flex items-center justify-center mb-2 ${s.color}`}>
              <Bell className="size-4" />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48 max-w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input placeholder="Search notices..." className="pl-8 h-8 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={filter} onValueChange={(v) => setFilter(v ?? "all")}>
          <SelectTrigger className="w-36 h-8 text-sm">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="pinned">Pinned</SelectItem>
            <SelectItem value="important">Important</SelectItem>
            <SelectItem value="event">Events</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="general">General</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Pinned Notices */}
      {pinnedNotices.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Pin className="size-3.5" /> Pinned Notices
          </h2>
          {pinnedNotices.map(n => <NoticeCard key={n.id} notice={n} onView={() => setViewItem(n)} />)}
        </div>
      )}

      {/* Regular Notices */}
      <div className="flex flex-col gap-3">
        {pinnedNotices.length > 0 && regularNotices.length > 0 && (
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">All Notices</h2>
        )}
        {regularNotices.map(n => <NoticeCard key={n.id} notice={n} onView={() => setViewItem(n)} />)}
        {filtered.length === 0 && (
          <div className="text-center py-10 text-sm text-muted-foreground">No notices found</div>
        )}
      </div>

      {/* View Dialog */}
      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{viewItem?.title}</DialogTitle>
          </DialogHeader>
          {viewItem && (
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${typeConfig[viewItem.type]?.color || "bg-muted text-muted-foreground"}`}>{viewItem.type}</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-sky-100 text-sky-700">{viewItem.audience}</span>
                {viewItem.pinned && <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-amber-100 text-amber-700">Pinned</span>}
              </div>
              <p className="text-sm text-foreground leading-relaxed">{viewItem.content}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
                <span>By {viewItem.author}</span>
                <span>{viewItem.date}</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => { toast.info("Edited!"); setViewItem(null) }}>
                  <Edit className="size-3" /> Edit
                </Button>
                <Button size="sm" variant="outline" className="flex-1" onClick={() => { toast.success(viewItem.pinned ? "Unpinned!" : "Pinned!"); setViewItem(null) }}>
                  <Pin className="size-3" /> {viewItem.pinned ? "Unpin" : "Pin"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Post New Notice</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Label className="text-xs">Title</Label>
              <Input className="h-8 text-sm" placeholder="Notice title" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <Label className="text-xs">Type</Label>
                <Select>
                  <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Type" /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(typeConfig).map(t => <SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-xs">Audience</Label>
                <Select>
                  <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Audience" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="students">Students</SelectItem>
                    <SelectItem value="parents">Parents</SelectItem>
                    <SelectItem value="teachers">Teachers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs">Content</Label>
              <Textarea placeholder="Write the notice content..." className="text-sm resize-none" rows={4} />
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => { toast.success("Notice posted!"); setCreateOpen(false) }}>
              <Bell className="size-4" /> Post Notice
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function NoticeCard({ notice, onView }: { notice: (typeof notices)[0]; onView: () => void }) {
  const conf = typeConfig[notice.type] || { color: "bg-muted text-muted-foreground", icon: Bell }
  const Icon = conf.icon
  return (
    <div
      className="bg-card rounded-xl border border-border p-4 flex items-start gap-4 hover:shadow-sm hover:border-primary/20 transition-all cursor-pointer"
      onClick={onView}
    >
      <div className={`size-9 rounded-lg flex items-center justify-center shrink-0 ${conf.color}`}>
        <Icon className="size-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            {notice.pinned && <Pin className="size-3 text-amber-500 shrink-0" />}
            <p className="text-sm font-semibold text-foreground">{notice.title}</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${conf.color}`}>{notice.type}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-sky-100 text-sky-700">{notice.audience}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{notice.content}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[11px] text-muted-foreground">{notice.date} · {notice.author}</span>
          <div className="flex gap-1" onClick={e => e.stopPropagation()}>
            <Button size="sm" variant="ghost" className="size-6 p-0 h-6" onClick={() => toast.info("Edit notice")}>
              <Edit className="size-3" />
            </Button>
            <Button size="sm" variant="ghost" className="size-6 p-0 h-6 text-destructive hover:text-destructive" onClick={() => toast.error("Notice deleted")}>
              <Trash2 className="size-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
