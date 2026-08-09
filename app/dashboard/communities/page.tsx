"use client"

import { useState } from "react"
import { Users, Plus, Search, MessageSquare, Star, Heart, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { reviews } from "@/lib/mock-data"
import { toast } from "sonner"

const communities = [
  { id: 1, name: "Grade 10 Parents Group", members: 82, type: "Parents", activity: "High", lastPost: "2 hours ago", description: "Discussion group for parents of Grade 10 students", pinned: true },
  { id: 2, name: "Teachers Forum", members: 86, type: "Teachers", activity: "Medium", lastPost: "4 hours ago", description: "Professional forum for teachers to share resources and ideas", pinned: true },
  { id: 3, name: "Student Council", members: 24, type: "Students", activity: "High", lastPost: "1 day ago", description: "Official student council communication channel", pinned: false },
  { id: 4, name: "Sports Committee", members: 45, type: "Mixed", activity: "Medium", lastPost: "2 days ago", description: "Coordination for sports events and activities", pinned: false },
  { id: 5, name: "Science Club", members: 38, type: "Students", activity: "Low", lastPost: "3 days ago", description: "For science enthusiasts to share experiments and projects", pinned: false },
  { id: 6, name: "Alumni Network", members: 320, type: "Alumni", activity: "Low", lastPost: "1 week ago", description: "Connect with Greenfield alumni", pinned: false },
]

const typeColors: Record<string, string> = {
  Parents: "bg-amber-100 text-amber-700",
  Teachers: "bg-primary/10 text-primary",
  Students: "bg-emerald-100 text-emerald-700",
  Mixed: "bg-sky-100 text-sky-700",
  Alumni: "bg-violet-100 text-violet-700",
}

const activityColors: Record<string, string> = {
  High: "text-emerald-600",
  Medium: "text-amber-600",
  Low: "text-muted-foreground",
}

export default function CommunitiesPage() {
  const [search, setSearch] = useState("")
  const [tab, setTab] = useState("all")
  const [createOpen, setCreateOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<(typeof communities)[0] | null>(null)

  const filtered = communities.filter(c =>
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase())) &&
    (tab === "all" || c.type.toLowerCase() === tab.toLowerCase())
  )

  return (
    <div className="p-4 lg:p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-foreground">Communities</h1>
          <p className="text-sm text-muted-foreground">Manage school groups and community engagement</p>
        </div>
        <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setCreateOpen(true)}>
          <Plus className="size-4" /> Create Group
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Groups", value: communities.length, color: "text-primary bg-primary/10" },
          { label: "Total Members", value: communities.reduce((s, c) => s + c.members, 0), color: "text-emerald-600 bg-emerald-100" },
          { label: "Active Today", value: 3, color: "text-amber-600 bg-amber-100" },
          { label: "Parent Reviews", value: reviews.length, color: "text-violet-600 bg-violet-100" },
        ].map(s => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4">
            <div className={`size-9 rounded-lg flex items-center justify-center mb-2 ${s.color}`}>
              <Users className="size-4" />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Groups */}
      <div className="bg-card rounded-xl border border-border p-4">
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="h-8">
              {["all", "parents", "teachers", "students", "alumni"].map(t => (
                <TabsTrigger key={t} value={t} className="text-xs px-3 h-6 capitalize">{t}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="relative w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <Input placeholder="Search groups..." className="pl-8 h-8 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(group => (
            <div
              key={group.id}
              className="rounded-xl border border-border p-4 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer"
              onClick={() => setSelectedGroup(group)}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="size-5 text-primary" />
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${typeColors[group.type]}`}>{group.type}</span>
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">{group.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">{group.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Users className="size-3" /> {group.members} members
                </span>
                <span className={`font-medium ${activityColors[group.activity]}`}>{group.activity} Activity</span>
              </div>
              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">Last post: {group.lastPost}</span>
                <Button size="sm" variant="ghost" className="h-6 text-xs p-2" onClick={e => { e.stopPropagation(); toast.success(`Joined ${group.name}!`) }}>
                  Join <ChevronRight className="size-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-10 text-sm text-muted-foreground">No groups found</div>
        )}
      </div>

      {/* Reviews */}
      <div className="bg-card rounded-xl border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-foreground">Student & Parent Reviews</h2>
          <div className="flex items-center gap-1">
            <Star className="size-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-semibold text-foreground">4.8</span>
            <span className="text-xs text-muted-foreground">({reviews.length} reviews)</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {reviews.map((r, i) => (
            <div key={i} className="flex flex-col gap-2 p-3 bg-muted/30 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{r.avatar}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">{r.name}</p>
                  <p className="text-[11px] text-muted-foreground">{r.role}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className={`size-3 ${idx < r.rating ? "text-amber-400 fill-amber-400" : "text-border"}`} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">&ldquo;{r.comment}&rdquo;</p>
              <div className="flex items-center gap-3 pt-1">
                <button className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-rose-500 transition-colors" onClick={() => toast.success("Liked!")}>
                  <Heart className="size-3" /> Like
                </button>
                <button className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors" onClick={() => toast.info("Reply")}>
                  <MessageSquare className="size-3" /> Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Group Detail Dialog */}
      <Dialog open={!!selectedGroup} onOpenChange={() => setSelectedGroup(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedGroup?.name}</DialogTitle>
          </DialogHeader>
          {selectedGroup && (
            <div className="flex flex-col gap-3 text-sm">
              <p className="text-sm text-muted-foreground">{selectedGroup.description}</p>
              {[
                ["Type", selectedGroup.type],
                ["Members", selectedGroup.members],
                ["Activity Level", selectedGroup.activity],
                ["Last Post", selectedGroup.lastPost],
              ].map(([k, v]) => (
                <div key={String(k)} className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
              <div className="flex gap-2 mt-1">
                <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => { toast.success(`Joined ${selectedGroup.name}!`); setSelectedGroup(null) }}>
                  Join Group
                </Button>
                <Button size="sm" variant="outline" className="flex-1" onClick={() => { toast.info("Message sent!"); setSelectedGroup(null) }}>
                  Message Group
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Group Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Group</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Label className="text-xs">Group Name</Label>
              <Input className="h-8 text-sm" placeholder="Enter group name" />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs">Type</Label>
              <Input className="h-8 text-sm" placeholder="e.g. Parents, Students, Teachers" />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs">Description</Label>
              <Textarea placeholder="Describe the purpose of this group" className="text-sm resize-none" rows={3} />
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => { toast.success("Group created!"); setCreateOpen(false) }}>
              Create Group
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
