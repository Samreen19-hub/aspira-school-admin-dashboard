"use client"

import { useState } from "react"
import { CalendarDays, Plus, Search, MapPin, Clock, Users, Edit, Trash2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { events } from "@/lib/mock-data"
import { toast } from "sonner"

const typeColors: Record<string, string> = {
  Meeting: "bg-primary/10 text-primary",
  Sports: "bg-emerald-100 text-emerald-700",
  Academic: "bg-sky-100 text-sky-700",
  Competition: "bg-violet-100 text-violet-700",
  Cultural: "bg-amber-100 text-amber-700",
  National: "bg-rose-100 text-rose-700",
}

const monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export default function EventsPage() {
  const [search, setSearch] = useState("")
  const [tab, setTab] = useState("all")
  const [selected, setSelected] = useState<(typeof events)[0] | null>(null)
  const [createOpen, setCreateOpen] = useState(false)

  const filtered = events.filter(e =>
    (e.title.toLowerCase().includes(search.toLowerCase()) || e.venue.toLowerCase().includes(search.toLowerCase())) &&
    (tab === "all" || e.status.toLowerCase() === tab.toLowerCase() || e.type.toLowerCase() === tab.toLowerCase())
  )

  const tabs = [
    { value: "all", label: "All Events" },
    { value: "Upcoming", label: "Upcoming" },
    { value: "Completed", label: "Completed" },
  ]

  return (
    <div className="p-4 lg:p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-foreground">Events</h1>
          <p className="text-sm text-muted-foreground">Manage school events and activities</p>
        </div>
        <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setCreateOpen(true)}>
          <Plus className="size-4" /> Add Event
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Events", value: events.length, color: "text-primary bg-primary/10" },
          { label: "Upcoming", value: events.filter(e => e.status === "Upcoming").length, color: "text-sky-600 bg-sky-100" },
          { label: "Completed", value: events.filter(e => e.status === "Completed").length, color: "text-emerald-600 bg-emerald-100" },
          { label: "Total Attendees", value: events.reduce((s, e) => s + e.attendees, 0).toLocaleString(), color: "text-amber-600 bg-amber-100" },
        ].map(s => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4">
            <div className={`size-9 rounded-lg flex items-center justify-center mb-2 ${s.color}`}>
              <CalendarDays className="size-4" />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Events list */}
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
            <Input placeholder="Search events..." className="pl-8 h-8 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(event => {
            const [, month, day] = event.date.split("-")
            return (
              <div
                key={event.id}
                className="rounded-xl border border-border p-4 hover:shadow-md transition-all cursor-pointer hover:border-primary/30"
                onClick={() => setSelected(event)}
              >
                {/* Date badge */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center justify-center bg-primary/10 rounded-xl px-3 py-1.5 shrink-0">
                      <span className="text-[10px] font-semibold text-primary uppercase">{monthNames[parseInt(month)]}</span>
                      <span className="text-xl font-bold text-primary leading-tight">{parseInt(day)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground leading-tight">{event.title}</p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${typeColors[event.type] || "bg-muted text-muted-foreground"}`}>
                        {event.type}
                      </span>
                    </div>
                  </div>
                  <Badge variant={event.status === "Upcoming" ? "default" : "secondary"} className="text-[10px] shrink-0">
                    {event.status}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">{event.description}</p>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3.5 shrink-0" />
                    {event.time} – {event.endTime}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="size-3.5 shrink-0" />
                    {event.venue}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users className="size-3.5 shrink-0" />
                    {event.attendees} expected attendees
                  </div>
                </div>

                <div className="flex gap-2 mt-3 pt-3 border-t border-border" onClick={e => e.stopPropagation()}>
                  <Button size="sm" variant="outline" className="flex-1 h-7 text-xs" onClick={() => toast.info("Edit event")}>
                    <Edit className="size-3" /> Edit
                  </Button>
                  <Button size="sm" className="flex-1 h-7 text-xs bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => toast.success("Reminder sent!")}>
                    Remind
                  </Button>
                </div>
              </div>
            )
          })}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-10 text-sm text-muted-foreground">No events found</div>
          )}
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected?.title}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="flex flex-col gap-3 text-sm">
              <p className="text-sm text-muted-foreground leading-relaxed">{selected.description}</p>
              {[
                ["Date", selected.date],
                ["Time", `${selected.time} – ${selected.endTime}`],
                ["Venue", selected.venue],
                ["Organizer", selected.organizer],
                ["Type", selected.type],
                ["Expected Attendees", selected.attendees.toLocaleString()],
                ["Status", selected.status],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => { toast.info("Event edited"); setSelected(null) }}>
                  <Edit className="size-3" /> Edit
                </Button>
                <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => { toast.success("Reminder sent to all!"); setSelected(null) }}>
                  Send Reminder
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
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            {["Event Title", "Date", "Start Time", "End Time", "Venue", "Organizer"].map(f => (
              <div key={f} className="flex flex-col gap-1">
                <Label className="text-xs">{f}</Label>
                <Input className="h-8 text-sm" placeholder={f} type={f === "Date" ? "date" : f.includes("Time") ? "time" : "text"} />
              </div>
            ))}
            <div className="col-span-2 flex flex-col gap-1">
              <Label className="text-xs">Event Type</Label>
              <Select>
                <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  {["Meeting", "Sports", "Academic", "Competition", "Cultural", "National"].map(t => (
                    <SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 flex flex-col gap-1">
              <Label className="text-xs">Description</Label>
              <Input className="h-8 text-sm" placeholder="Brief description" />
            </div>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-2" onClick={() => { toast.success("Event created!"); setCreateOpen(false) }}>
            <CalendarDays className="size-4" /> Create Event
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
