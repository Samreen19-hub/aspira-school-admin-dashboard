"use client"

import { useState } from "react"
import { Plus, Eye, Download, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatCard } from "@/components/dashboard/stat-card"
import { exams, examResults } from "@/lib/mock-data"
import { ClipboardList, CheckCircle, Clock, Award } from "lucide-react"
import { toast } from "sonner"

const statusColors: Record<string, string> = {
  "Upcoming": "bg-blue-100 text-blue-700 hover:bg-blue-100",
  "Ongoing": "bg-amber-100 text-amber-700 hover:bg-amber-100",
  "Completed": "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
}

export default function ExamsPage() {
  const [search, setSearch] = useState("")
  const [addOpen, setAddOpen] = useState(false)
  const [viewExam, setViewExam] = useState<typeof exams[0] | null>(null)
  const [newExam, setNewExam] = useState({ name: "", type: "", startDate: "", endDate: "", totalMarks: "", passingMarks: "" })

  const filtered = exams.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()) || e.type.toLowerCase().includes(search.toLowerCase()))

  const handleAdd = () => {
    if (!newExam.name) { toast.error("Exam name is required"); return }
    toast.success("Exam scheduled successfully!")
    setAddOpen(false)
    setNewExam({ name: "", type: "", startDate: "", endDate: "", totalMarks: "", passingMarks: "" })
  }

  const gradeColor = (pct: number) => {
    if (pct >= 90) return "text-emerald-600 font-bold"
    if (pct >= 75) return "text-blue-600 font-semibold"
    if (pct >= 60) return "text-amber-600 font-semibold"
    return "text-red-500 font-semibold"
  }

  return (
    <div className="p-4 lg:p-6">
      <PageHeader
        title="Exams"
        description="Schedule, manage, and track examination results."
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => toast.success("Report exported!")}>
              <Download className="size-4" /> Export
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm" onClick={() => setAddOpen(true)}>
              <Plus className="size-4" /> Schedule Exam
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Exams" value={exams.length} icon={ClipboardList} iconBg="bg-primary/10" iconColor="text-primary" />
        <StatCard title="Upcoming" value={exams.filter((e) => e.status === "Upcoming").length} icon={Clock} iconBg="bg-blue-100" iconColor="text-blue-600" />
        <StatCard title="Completed" value={exams.filter((e) => e.status === "Completed").length} icon={CheckCircle} iconBg="bg-emerald-100" iconColor="text-emerald-600" />
        <StatCard title="Avg. Score" value="88.5%" icon={Award} iconBg="bg-amber-100" iconColor="text-amber-600" />
      </div>

      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="schedule">Exam Schedule</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Search exams..." className="pl-9 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  {["Exam Name", "Type", "Start Date", "End Date", "Total Marks", "Passing Marks", "Classes", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((e) => (
                  <tr key={e.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{e.name}</td>
                    <td className="px-4 py-3"><Badge variant="secondary" className="text-xs">{e.type}</Badge></td>
                    <td className="px-4 py-3 text-muted-foreground">{e.startDate}</td>
                    <td className="px-4 py-3 text-muted-foreground">{e.endDate}</td>
                    <td className="px-4 py-3 text-foreground">{e.totalMarks}</td>
                    <td className="px-4 py-3 text-foreground">{e.passingMarks}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {e.classes.slice(0, 2).map((c) => <Badge key={c} variant="outline" className="text-[10px]">{c}</Badge>)}
                        {e.classes.length > 2 && <Badge variant="outline" className="text-[10px]">+{e.classes.length - 2}</Badge>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={`text-xs ${statusColors[e.status]}`}>{e.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => setViewExam(e)} className="p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
                        <Eye className="size-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="results">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Annual Examination 2024-25 — Class 10</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Results declared on March 25, 2025</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    {["Student", "Roll No", "Class", "Math", "Science", "English", "History", "CS", "Total", "Percentage", "Grade"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {examResults.map((r) => (
                    <tr key={r.rollNo} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground">{r.student}</td>
                      <td className="px-4 py-3 text-muted-foreground">{r.rollNo}</td>
                      <td className="px-4 py-3"><Badge variant="secondary" className="text-xs">{r.class}</Badge></td>
                      <td className="px-4 py-3">{r.math}</td>
                      <td className="px-4 py-3">{r.science}</td>
                      <td className="px-4 py-3">{r.english}</td>
                      <td className="px-4 py-3">{r.history}</td>
                      <td className="px-4 py-3">{r.cs}</td>
                      <td className="px-4 py-3 font-semibold">{r.total}</td>
                      <td className={`px-4 py-3 ${gradeColor(r.percentage)}`}>{r.percentage}%</td>
                      <td className="px-4 py-3"><Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-xs">{r.grade}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* View Dialog */}
      <Dialog open={!!viewExam} onOpenChange={() => setViewExam(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Exam Details</DialogTitle></DialogHeader>
          {viewExam && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{viewExam.name}</h3>
                <Badge className={`text-xs ${statusColors[viewExam.status]}`}>{viewExam.status}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: "Type", value: viewExam.type },
                  { label: "Start Date", value: viewExam.startDate },
                  { label: "End Date", value: viewExam.endDate },
                  { label: "Total Marks", value: String(viewExam.totalMarks) },
                  { label: "Passing Marks", value: String(viewExam.passingMarks) },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1.5">Classes</p>
                <div className="flex flex-wrap gap-1.5">
                  {viewExam.classes.map((c) => <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>)}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Exam Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Schedule New Exam</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="col-span-2 flex flex-col gap-1.5">
              <Label className="text-xs font-medium">Exam Name</Label>
              <Input placeholder="e.g. Unit Test 2" className="h-9 text-sm" value={newExam.name} onChange={(e) => setNewExam(p => ({ ...p, name: e.target.value }))} />
            </div>
            {[
              { label: "Type", key: "type", placeholder: "e.g. Unit Test" },
              { label: "Start Date", key: "startDate", placeholder: "YYYY-MM-DD" },
              { label: "End Date", key: "endDate", placeholder: "YYYY-MM-DD" },
              { label: "Total Marks", key: "totalMarks", placeholder: "100" },
              { label: "Passing Marks", key: "passingMarks", placeholder: "35" },
            ].map(({ label, key, placeholder }) => (
              <div key={key} className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium">{label}</Label>
                <Input placeholder={placeholder} className="h-9 text-sm" value={(newExam as Record<string, string>)[key]} onChange={(e) => setNewExam(p => ({ ...p, [key]: e.target.value }))} />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground" onClick={handleAdd}>Schedule Exam</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
