"use client"

import { useState } from "react"
import { Search, Plus, Eye, Pencil, Trash2, Users, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatCard } from "@/components/dashboard/stat-card"
import { classes } from "@/lib/mock-data"
import { toast } from "sonner"

const gradeColors: Record<string, string> = {
  "10": "bg-primary/10 text-primary",
  "9": "bg-violet-100 text-violet-700",
  "8": "bg-emerald-100 text-emerald-700",
  "7": "bg-amber-100 text-amber-700",
}

export default function ClassesPage() {
  const [search, setSearch] = useState("")
  const [gradeFilter, setGradeFilter] = useState("all")
  const [classList, setClassList] = useState(classes)
  const [viewClass, setViewClass] = useState<typeof classes[0] | null>(null)
  const [editClass, setEditClass] = useState<typeof classes[0] | null>(null)
  const [deleteClass, setDeleteClass] = useState<typeof classes[0] | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [newClass, setNewClass] = useState({ name: "", grade: "", section: "", classTeacher: "", room: "", timing: "" })

  const grades = [...new Set(classes.map((c) => c.grade))].sort()

  const filtered = classList.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.classTeacher.toLowerCase().includes(search.toLowerCase())
    const matchGrade = gradeFilter === "all" || c.grade === gradeFilter
    return matchSearch && matchGrade
  })

  const totalStudents = classList.reduce((a, c) => a + c.students, 0)
  const avgStudents = Math.round(totalStudents / classList.length)

  return (
    <div className="p-4 lg:p-6">
      <PageHeader
        title="Classes"
        description="Manage classes, sections, and assignments."
        action={
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm" onClick={() => setAddOpen(true)}>
            <Plus className="size-4" /> Add Class
          </Button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Classes" value={classList.length} icon={BookOpen} iconBg="bg-primary/10" iconColor="text-primary" />
        <StatCard title="Total Students" value={totalStudents} icon={Users} iconBg="bg-emerald-100" iconColor="text-emerald-600" />
        <StatCard title="Active Classes" value={classList.filter((c) => c.status === "Active").length} icon={BookOpen} iconBg="bg-violet-100" iconColor="text-violet-600" />
        <StatCard title="Avg. Students/Class" value={avgStudents} icon={Users} iconBg="bg-amber-100" iconColor="text-amber-600" />
      </div>

      <div className="bg-card rounded-xl border border-border p-4 mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input placeholder="Search by class name or teacher..." className="pl-9 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={gradeFilter} onValueChange={(v) => setGradeFilter(v ?? "all")}>
            <SelectTrigger className="w-36 h-9"><SelectValue placeholder="All Grades" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              {grades.map((g) => <SelectItem key={g} value={g}>Grade {g}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((c) => (
          <div key={c.id} className="bg-card rounded-xl border border-border overflow-hidden hover:border-primary/40 transition-colors group">
            <div className={`h-2 ${gradeColors[c.grade]?.split(" ")[0] || "bg-primary/20"}`} />
            <div className="p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xl font-bold ${gradeColors[c.grade]?.split(" ")[1] || "text-primary"}`}>{c.name}</span>
                    <Badge variant="secondary" className="text-xs">Grade {c.grade}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.room}</p>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-xs">{c.status}</Badge>
              </div>
              <div className="flex flex-col gap-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Class Teacher</span>
                  <span className="font-medium text-foreground truncate max-w-32">{c.classTeacher}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Students</span>
                  <span className="font-medium text-foreground">{c.students}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Timing</span>
                  <span className="font-medium text-foreground">{c.timing}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subjects</span>
                  <span className="font-medium text-foreground">{c.subjects.length}</span>
                </div>
              </div>
              <div className="flex gap-1.5 pt-1 border-t border-border">
                <button onClick={() => setViewClass(c)} className="flex-1 text-xs py-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground flex items-center justify-center gap-1">
                  <Eye className="size-3" /> View
                </button>
                <button onClick={() => setEditClass(c)} className="flex-1 text-xs py-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground flex items-center justify-center gap-1">
                  <Pencil className="size-3" /> Edit
                </button>
                <button onClick={() => setDeleteClass(c)} className="flex-1 text-xs py-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600 flex items-center justify-center gap-1">
                  <Trash2 className="size-3" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-muted-foreground">No classes found.</div>
        )}
      </div>

      {/* View Dialog */}
      <Dialog open={!!viewClass} onOpenChange={() => setViewClass(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Class Details - {viewClass?.name}</DialogTitle></DialogHeader>
          {viewClass && (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: "Class Name", value: viewClass.name },
                  { label: "Grade", value: viewClass.grade },
                  { label: "Section", value: viewClass.section },
                  { label: "Room", value: viewClass.room },
                  { label: "Class Teacher", value: viewClass.classTeacher },
                  { label: "Students", value: String(viewClass.students) },
                  { label: "Timing", value: viewClass.timing },
                  { label: "Status", value: viewClass.status },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="font-medium text-foreground">{value}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1.5">Subjects</p>
                <div className="flex flex-wrap gap-1.5">
                  {viewClass.subjects.map((s) => (
                    <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Add New Class</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            {[
              { label: "Class Name", key: "name", placeholder: "e.g. 11-A" },
              { label: "Grade", key: "grade", placeholder: "e.g. 11" },
              { label: "Section", key: "section", placeholder: "e.g. A" },
              { label: "Class Teacher", key: "classTeacher", placeholder: "Teacher name" },
              { label: "Room", key: "room", placeholder: "e.g. Room 205" },
              { label: "Timing", key: "timing", placeholder: "e.g. 8:00 AM - 2:30 PM" },
            ].map(({ label, key, placeholder }) => (
              <div key={key} className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium">{label}</Label>
                <Input placeholder={placeholder} className="h-9 text-sm" value={(newClass as Record<string, string>)[key]} onChange={(e) => setNewClass((p) => ({ ...p, [key]: e.target.value }))} />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground" onClick={() => {
              if (!newClass.name) { toast.error("Class name is required"); return }
              setClassList(p => [...p, { ...newClass, id: p.length + 1, students: 0, subjects: [], status: "Active" }])
              setAddOpen(false)
              toast.success("Class added!")
            }}>Add Class</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={!!deleteClass} onOpenChange={() => setDeleteClass(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Class</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete class <strong>{deleteClass?.name}</strong>?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-white" onClick={() => { setClassList(p => p.filter(c => c.id !== deleteClass?.id)); setDeleteClass(null); toast.success("Class deleted!") }}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
