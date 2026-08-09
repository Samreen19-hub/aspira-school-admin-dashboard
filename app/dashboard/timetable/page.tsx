"use client"

import { useState } from "react"
import { Download, Plus, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/dashboard/page-header"
import { timetableData, classes } from "@/lib/mock-data"
import { toast } from "sonner"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

const subjectColors: Record<string, string> = {
  "Mathematics": "bg-blue-100 text-blue-700 border-blue-200",
  "Science": "bg-green-100 text-green-700 border-green-200",
  "English": "bg-purple-100 text-purple-700 border-purple-200",
  "History": "bg-amber-100 text-amber-700 border-amber-200",
  "Computer Science": "bg-cyan-100 text-cyan-700 border-cyan-200",
  "Physical Education": "bg-red-100 text-red-700 border-red-200",
  "Art & Craft": "bg-pink-100 text-pink-700 border-pink-200",
  "Biology": "bg-teal-100 text-teal-700 border-teal-200",
}

type Period = { period: number; time: string; subject: string; teacher: string }
type TimetableEntry = Record<string, Period[]>

export default function TimetablePage() {
  const [selectedClass, setSelectedClass] = useState("10-A")
  const [addOpen, setAddOpen] = useState(false)
  const [newPeriod, setNewPeriod] = useState({ day: "Monday", subject: "", teacher: "", time: "" })
  const [timetable, setTimetable] = useState<TimetableEntry>(
    (timetableData as Record<string, TimetableEntry>)[selectedClass] || {}
  )

  const classOptions = classes.map((c) => c.name)
  const currentTimetable = (timetableData as Record<string, TimetableEntry>)[selectedClass] || {}
  const periods = currentTimetable[days[0]]?.length || 6

  const handleAddPeriod = () => {
    if (!newPeriod.subject || !newPeriod.teacher) { toast.error("Subject and teacher are required"); return }
    toast.success(`Period added for ${newPeriod.day}!`)
    setAddOpen(false)
    setNewPeriod({ day: "Monday", subject: "", teacher: "", time: "" })
  }

  return (
    <div className="p-4 lg:p-6">
      <PageHeader
        title="Timetable"
        description="View and manage class schedules and period assignments."
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 text-sm" onClick={() => toast.info("Printing timetable...")}>
              <Printer className="size-4" /> Print
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 text-sm" onClick={() => toast.success("Timetable exported!")}>
              <Download className="size-4" /> Export
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm" onClick={() => setAddOpen(true)}>
              <Plus className="size-4" /> Add Period
            </Button>
          </div>
        }
      />

      {/* Class selector */}
      <div className="bg-card rounded-xl border border-border p-4 mb-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground">Select Class:</span>
            <div className="flex flex-wrap gap-2">
              {classOptions.map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${selectedClass === cls ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"}`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timetable grid */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-foreground">Class {selectedClass} - Weekly Schedule</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Academic Year 2025-26</p>
          </div>
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Active</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground w-24">Period</th>
                {days.map((day) => (
                  <th key={day} className="text-left px-3 py-3 text-xs font-semibold text-foreground">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {Array.from({ length: periods }, (_, i) => (
                <tr key={i} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="text-xs font-semibold text-foreground">P{i + 1}</div>
                    <div className="text-[10px] text-muted-foreground">{currentTimetable[days[0]]?.[i]?.time || ""}</div>
                  </td>
                  {days.map((day) => {
                    const period = currentTimetable[day]?.[i]
                    if (!period) return <td key={day} className="px-3 py-3"><div className="bg-muted/50 rounded-lg p-2 text-xs text-muted-foreground text-center">—</div></td>
                    const colorClass = subjectColors[period.subject] || "bg-muted text-foreground border-border"
                    return (
                      <td key={day} className="px-3 py-3">
                        <div className={`rounded-lg border p-2 cursor-pointer hover:opacity-80 transition-opacity ${colorClass}`}>
                          <p className="text-xs font-semibold">{period.subject}</p>
                          <p className="text-[10px] opacity-70 mt-0.5">{period.teacher.split(" ").slice(-1)[0]}</p>
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Break row */}
        <div className="px-4 py-2 bg-amber-50 border-t border-amber-200 flex items-center gap-2">
          <span className="text-xs font-medium text-amber-700">Break: 10:15 AM – 10:30 AM</span>
          <span className="text-xs text-amber-600">|</span>
          <span className="text-xs font-medium text-amber-700">Lunch: 12:00 PM – 1:00 PM</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 bg-card rounded-xl border border-border p-4">
        <p className="text-xs font-semibold text-foreground mb-3">Subject Legend</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(subjectColors).map(([subject, colors]) => (
            <div key={subject} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border ${colors}`}>
              <div className="size-2 rounded-full bg-current opacity-60" />
              {subject}
            </div>
          ))}
        </div>
      </div>

      {/* Add Period Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Add New Period</DialogTitle></DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium">Day</Label>
              <Select value={newPeriod.day} onValueChange={(v) => setNewPeriod((p) => ({ ...p, day: v ?? p.day }))}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>{days.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            {[
              { label: "Subject", key: "subject", placeholder: "e.g. Mathematics" },
              { label: "Teacher", key: "teacher", placeholder: "Teacher name" },
              { label: "Time", key: "time", placeholder: "e.g. 8:00-8:45" },
            ].map(({ label, key, placeholder }) => (
              <div key={key} className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium">{label}</Label>
                <Input placeholder={placeholder} className="h-9 text-sm" value={(newPeriod as Record<string, string>)[key]} onChange={(e) => setNewPeriod((p) => ({ ...p, [key]: e.target.value }))} />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground" onClick={handleAddPeriod}>Add Period</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
