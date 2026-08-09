"use client"

import { useState } from "react"
import { Search, Plus, Eye, Pencil, Trash2, Download, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatCard } from "@/components/dashboard/stat-card"
import { teachers } from "@/lib/mock-data"
import { toast } from "sonner"
import { GraduationCap, UserCheck, UserX, BookOpen } from "lucide-react"

const subjectColors: Record<string, string> = {
  "Mathematics": "bg-blue-100 text-blue-700",
  "Science": "bg-green-100 text-green-700",
  "English": "bg-purple-100 text-purple-700",
  "History": "bg-amber-100 text-amber-700",
  "Computer Science": "bg-cyan-100 text-cyan-700",
  "Physical Education": "bg-red-100 text-red-700",
  "Art & Craft": "bg-pink-100 text-pink-700",
  "Biology": "bg-teal-100 text-teal-700",
}

export default function TeachersPage() {
  const [search, setSearch] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [teacherList, setTeacherList] = useState(teachers)
  const [viewTeacher, setViewTeacher] = useState<typeof teachers[0] | null>(null)
  const [editTeacher, setEditTeacher] = useState<typeof teachers[0] | null>(null)
  const [deleteTeacher, setDeleteTeacher] = useState<typeof teachers[0] | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [newTeacher, setNewTeacher] = useState({ name: "", empId: "", subject: "", qualification: "", experience: "", phone: "", email: "" })

  const subjects = [...new Set(teachers.map((t) => t.subject))].sort()

  const filtered = teacherList.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.empId.toLowerCase().includes(search.toLowerCase())
    const matchSubject = subjectFilter === "all" || t.subject === subjectFilter
    const matchStatus = statusFilter === "all" || t.status === statusFilter
    return matchSearch && matchSubject && matchStatus
  })

  const handleAdd = () => {
    if (!newTeacher.name || !newTeacher.empId) { toast.error("Name and Employee ID are required"); return }
    setTeacherList((prev) => [...prev, { ...newTeacher, id: prev.length + 1, classes: [], status: "Active", avatar: newTeacher.name.slice(0, 2).toUpperCase(), joinDate: new Date().toISOString().slice(0, 10), salary: 60000 }])
    setAddOpen(false)
    setNewTeacher({ name: "", empId: "", subject: "", qualification: "", experience: "", phone: "", email: "" })
    toast.success("Teacher added successfully!")
  }

  return (
    <div className="p-4 lg:p-6">
      <PageHeader
        title="Teachers"
        description="Manage faculty members and their assignments."
        action={
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm" onClick={() => setAddOpen(true)}>
            <Plus className="size-4" /> Add Teacher
          </Button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Teachers" value={teacherList.length} icon={GraduationCap} iconBg="bg-violet-100" iconColor="text-violet-600" />
        <StatCard title="Active" value={teacherList.filter((t) => t.status === "Active").length} icon={UserCheck} iconBg="bg-emerald-100" iconColor="text-emerald-600" />
        <StatCard title="On Leave" value={teacherList.filter((t) => t.status === "On Leave").length} icon={UserX} iconBg="bg-amber-100" iconColor="text-amber-600" />
        <StatCard title="Subjects" value={subjects.length} icon={BookOpen} iconBg="bg-primary/10" iconColor="text-primary" />
      </div>

      <div className="bg-card rounded-xl border border-border p-4 mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input placeholder="Search by name or employee ID..." className="pl-9 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={subjectFilter} onValueChange={(v) => setSubjectFilter(v ?? "all")}>
            <SelectTrigger className="w-44 h-9"><SelectValue placeholder="All Subjects" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
            <SelectTrigger className="w-32 h-9"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="On Leave">On Leave</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="h-9 ml-auto gap-1.5">
            <Download className="size-4" /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((t) => (
          <div key={t.id} className="bg-card rounded-xl border border-border p-4 flex flex-col gap-3 hover:border-primary/40 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">{t.avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.empId}</p>
                </div>
              </div>
              <Badge className={`text-xs ${t.status === "Active" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : "bg-amber-100 text-amber-700 hover:bg-amber-100"}`}>
                {t.status}
              </Badge>
            </div>
            <div className="flex flex-col gap-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subject</span>
                <span className={`font-medium px-2 py-0.5 rounded-full text-[11px] ${subjectColors[t.subject] || "bg-muted text-foreground"}`}>{t.subject}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Experience</span>
                <span className="font-medium text-foreground">{t.experience}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Classes</span>
                <span className="font-medium text-foreground">{t.classes.length} class{t.classes.length !== 1 ? "es" : ""}</span>
              </div>
            </div>
            <div className="flex gap-1.5 pt-1 border-t border-border">
              <button onClick={() => setViewTeacher(t)} className="flex-1 text-xs py-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground flex items-center justify-center gap-1">
                <Eye className="size-3" /> View
              </button>
              <button onClick={() => setEditTeacher(t)} className="flex-1 text-xs py-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground flex items-center justify-center gap-1">
                <Pencil className="size-3" /> Edit
              </button>
              <button onClick={() => setDeleteTeacher(t)} className="flex-1 text-xs py-1.5 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600 flex items-center justify-center gap-1">
                <Trash2 className="size-3" /> Delete
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-muted-foreground">No teachers found.</div>
        )}
      </div>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Add New Teacher</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            {[
              { label: "Full Name", key: "name", placeholder: "Enter full name" },
              { label: "Employee ID", key: "empId", placeholder: "e.g. TCH009" },
              { label: "Subject", key: "subject", placeholder: "e.g. Mathematics" },
              { label: "Qualification", key: "qualification", placeholder: "e.g. M.Sc" },
              { label: "Experience", key: "experience", placeholder: "e.g. 5 years" },
              { label: "Phone", key: "phone", placeholder: "+91 XXXXX XXXXX" },
              { label: "Email", key: "email", placeholder: "teacher@school.edu.in" },
            ].map(({ label, key, placeholder }) => (
              <div key={key} className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium">{label}</Label>
                <Input placeholder={placeholder} className="h-9 text-sm" value={(newTeacher as Record<string, string>)[key]} onChange={(e) => setNewTeacher((p) => ({ ...p, [key]: e.target.value }))} />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground" onClick={handleAdd}>Add Teacher</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={!!viewTeacher} onOpenChange={() => setViewTeacher(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Teacher Details</DialogTitle></DialogHeader>
          {viewTeacher && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">{viewTeacher.avatar}</span>
                </div>
                <div>
                  <p className="text-lg font-bold">{viewTeacher.name}</p>
                  <p className="text-sm text-muted-foreground">{viewTeacher.empId}</p>
                  <Badge className={`text-xs mt-1 ${viewTeacher.status === "Active" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : "bg-amber-100 text-amber-700 hover:bg-amber-100"}`}>{viewTeacher.status}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: "Subject", value: viewTeacher.subject },
                  { label: "Qualification", value: viewTeacher.qualification },
                  { label: "Experience", value: viewTeacher.experience },
                  { label: "Join Date", value: viewTeacher.joinDate },
                  { label: "Classes", value: viewTeacher.classes.join(", ") || "—" },
                  { label: "Salary", value: `₹${viewTeacher.salary.toLocaleString()}` },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="font-medium text-foreground">{value}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1.5"><Mail className="size-3.5" /> Email</Button>
                <Button variant="outline" size="sm" className="flex-1 gap-1.5"><Phone className="size-3.5" /> Call</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={!!deleteTeacher} onOpenChange={() => setDeleteTeacher(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Teacher</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete <strong>{deleteTeacher?.name}</strong>? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-white hover:bg-destructive/90" onClick={() => { setTeacherList(p => p.filter(t => t.id !== deleteTeacher?.id)); setDeleteTeacher(null); toast.success("Teacher deleted!") }}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
