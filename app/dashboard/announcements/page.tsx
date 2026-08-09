"use client"

import { useState } from "react"
import { Bell, Plus, Search, Edit, Trash2, Eye, Pin, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { announcements } from "@/lib/mock-data"
import { toast } from "sonner"

const priorityColors: Record<string, string> = {
  High: "bg-rose-100 text-rose-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-emerald-100 text-emerald-700",
}

const typeColors: Record<string, string> = {
  Academic: "bg-primary/10 text-primary",
  General: "bg-slate-100 text-slate-600",
  Event: "bg-violet-100 text-violet-700",
  Finance: "bg-emerald-100 text-emerald-700",
}

const audienceColors: Record<string, string> = {
  All: "bg-sky-100 text-sky-700",
  Students: "bg-violet-100 text-violet-700",
  Parents: "bg-amber-100 text-amber-700",
  Teachers: "bg-emerald-100 text-emerald-700",
}

export default function AnnouncementsPage() {
  const [search, setSearch] = useState("")
  const [tab, setTab] = useState("all")
  const [createOpen, setCreateOpen] = useState(false)
  const [viewItem, setViewItem] = useState<(typeof announcements)[0] | null>(null)

  const filtered = announcements.filter(a =>
    (a.title.toLowerCase().includes(search.toLowerCase()) || a.content.toLowerCase().includes(search.toLowerCase())) &&
    (tab === "all" || a.audience.toLowerCase() === tab.toLowerCase() || a.type.toLowerCase() === tab.toLowerCase())
  )

  const tabs = [
    { value: "all", label: "All" },
    { value: "Students", label: "Students" },
    { value: "Parents", label: "Parents" },
    { value: "Academic", label: "Academic" },
    { value: "Event", label: "Events" },
  ]

  return (
    <div className="p-4 lg:p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-foreground">Announcements</h1>
          <p className="text-sm text-muted-foreground">Create and manage school-wide announcements</p>
        </div>
        <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setCreateOpen(true)}>
          <Plus className="size-4" /> New Announcement
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total", value: announcements.length, color: "text-primary bg-primary/10" },
          { label: "High Priority", value: announcements.filter(a => a.priority === "High").length, color: "text-rose-600 bg-rose-100" },
          { label: "For Students", value: announcements.filter(a => a.audience === "Students" || a.audience === "All").length, color: "text-violet-600 bg-violet-100" },
          { label: "For Parents", value: announcements.filter(a => a.audience === "Parents" || a.audience === "All").length, color: "text-amber-600 bg-amber-100" },
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

      {/* Filter + Search */}
      <div className="bg-card rounded-xl border border-border p-4">
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="h-8">
              {tabs.map(t => (
                <TabsTrigger key={t.value} value={t.value} className="text-xs px-3 h-6">{t.label}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="relative w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <Input placeholder="Search announcements..." className="pl-8 h-8 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {filtered.map(a => (
            <div
              key={a.id}
              className="flex items-start gap-4 p-4 rounded-xl border border-border hover:bg-accent/30 transition-colors cursor-pointer"
              onClick={() => setViewItem(a)}
            >
              <div className={`size-9 rounded-lg flex items-center justify-center shrink-0 ${typeColors[a.type] || "bg-muted text-muted-foreground"}`}>
                <Bell className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-foreground">{a.title}</p>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${priorityColors[a.priority]}`}>
                      {a.priority}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${audienceColors[a.audience]}`}>
                      {a.audience}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{a.content}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[11px] text-muted-foreground">{a.date}</span>
                  <span className="text-[11px] text-muted-foreground">By {a.author}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${typeColors[a.type]}`}>{a.type}</span>
                </div>
              </div>
              <div className="flex gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                <Button size="sm" variant="ghost" className="size-7 p-0" onClick={() => toast.info("Edit announcement")}>
                  <Edit className="size-3.5" />
                </Button>
                <Button size="sm" variant="ghost" className="size-7 p-0 text-destructive hover:text-destructive" onClick={() => toast.error("Announcement deleted")}>
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-10 text-sm text-muted-foreground">No announcements found</div>
          )}
        </div>
      </div>

      {/* View Dialog */}
      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{viewItem?.title}</DialogTitle>
          </DialogHeader>
          {viewItem && (
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex gap-2 flex-wrap">
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${priorityColors[viewItem.priority]}`}>{viewItem.priority} Priority</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${audienceColors[viewItem.audience]}`}>{viewItem.audience}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${typeColors[viewItem.type]}`}>{viewItem.type}</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{viewItem.content}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
                <span>Posted by {viewItem.author}</span>
                <span>{viewItem.date}</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => { toast.info("Announcement pinned"); setViewItem(null) }}>
                  <Pin className="size-3" /> Pin
                </Button>
                <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => { toast.success("Sent to audience!"); setViewItem(null) }}>
                  <Bell className="size-3" /> Re-notify
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
            <DialogTitle>New Announcement</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Label className="text-xs">Title</Label>
              <Input className="h-8 text-sm" placeholder="Announcement title" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <Label className="text-xs">Audience</Label>
                <Select>
                  <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select audience" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="students">Students</SelectItem>
                    <SelectItem value="parents">Parents</SelectItem>
                    <SelectItem value="teachers">Teachers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-xs">Priority</Label>
                <Select>
                  <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Priority" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs">Message</Label>
              <Textarea placeholder="Write your announcement..." className="text-sm resize-none" rows={4} />
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => { toast.success("Announcement published!"); setCreateOpen(false) }}>
              <Bell className="size-4" /> Publish Announcement
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
