"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Filter,
  ChevronUp,
  ChevronDown,
  Eye,
  Pencil,
  Trash2,
  Download,
  Mail,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatCard } from "@/components/dashboard/stat-card"
import { students } from "@/lib/mock-data"
import { toast } from "sonner"
import { Users, GraduationCap, UserCheck, UserX } from "lucide-react"

type SortField = "name" | "rollNo" | "class" | "score"
type SortDir = "asc" | "desc"

export default function StudentsPage() {
  const [search, setSearch] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortDir, setSortDir] = useState<SortDir>("asc")
  const [addOpen, setAddOpen] = useState(false)
  const [viewStudent, setViewStudent] = useState<typeof students[0] | null>(null)
  const [editStudent, setEditStudent] = useState<typeof students[0] | null>(null)
  const [deleteStudent, setDeleteStudent] = useState<typeof students[0] | null>(null)
  const [studentList, setStudentList] = useState(students)
  const [newStudent, setNewStudent] = useState({ name: "", rollNo: "", class: "", grade: "", gender: "Male", email: "", phone: "", parent: "" })

  const filtered = studentList
    .filter((s) => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.toLowerCase().includes(search.toLowerCase())
      const matchClass = classFilter === "all" || s.class === classFilter
      const matchStatus = statusFilter === "all" || s.status === statusFilter
      return matchSearch && matchClass && matchStatus
    })
    .sort((a, b) => {
      let cmp = 0
      if (sortField === "name") cmp = a.name.localeCompare(b.name)
      else if (sortField === "rollNo") cmp = a.rollNo.localeCompare(b.rollNo)
      else if (sortField === "class") cmp = a.class.localeCompare(b.class)
      else if (sortField === "score") cmp = a.score - b.score
      return sortDir === "asc" ? cmp : -cmp
    })

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    else { setSortField(field); setSortDir("asc") }
  }

  const SortIcon = ({ field }: { field: SortField }) =>
    sortField === field
      ? sortDir === "asc" ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />
      : <ChevronDown className="size-3 opacity-30" />

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.rollNo) { toast.error("Name and Roll No are required"); return }
    setStudentList((prev) => [...prev, { ...newStudent, id: prev.length + 1, section: "A", dob: "", address: "", status: "Active", score: 0, avatar: newStudent.name.slice(0, 2).toUpperCase(), feesPaid: false }])
    setAddOpen(false)
    setNewStudent({ name: "", rollNo: "", class: "", grade: "", gender: "Male", email: "", phone: "", parent: "" })
    toast.success("Student added successfully!")
  }

  const handleDeleteStudent = () => {
    if (!deleteStudent) return
    setStudentList((prev) => prev.filter((s) => s.id !== deleteStudent.id))
    setDeleteStudent(null)
    toast.success("Student deleted successfully!")
  }

  const classes = [...new Set(students.map((s) => s.class))].sort()

  return (
    <div className="p-4 lg:p-6">
      <PageHeader
        title="Students"
        description="Manage all enrolled students and their information."
        action={
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm" onClick={() => setAddOpen(true)}>
            <Plus className="size-4" /> Add Student
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Students" value={studentList.length} icon={Users} iconBg="bg-primary/10" iconColor="text-primary" />
        <StatCard title="Active" value={studentList.filter((s) => s.status === "Active").length} icon={UserCheck} iconBg="bg-emerald-100" iconColor="text-emerald-600" />
        <StatCard title="Inactive" value={studentList.filter((s) => s.status === "Inactive").length} icon={UserX} iconBg="bg-red-100" iconColor="text-red-500" />
        <StatCard title="Fee Defaulters" value={studentList.filter((s) => !s.feesPaid).length} icon={GraduationCap} iconBg="bg-amber-100" iconColor="text-amber-600" />
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl border border-border p-4 mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input placeholder="Search by name or roll no..." className="pl-9 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={classFilter} onValueChange={(v) => setClassFilter(v ?? "all")}>
            <SelectTrigger className="w-36 h-9">
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {classes.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
            <SelectTrigger className="w-32 h-9">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="h-9 ml-auto gap-1.5">
            <Download className="size-4" /> Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {[
                  { label: "Student", field: "name" as SortField },
                  { label: "Roll No", field: "rollNo" as SortField },
                  { label: "Class", field: "class" as SortField },
                  { label: "Gender", field: null },
                  { label: "Parent", field: null },
                  { label: "Score", field: "score" as SortField },
                  { label: "Status", field: null },
                  { label: "Actions", field: null },
                ].map(({ label, field }) => (
                  <th key={label} className={`text-left px-4 py-3 text-xs font-semibold text-muted-foreground ${field ? "cursor-pointer hover:text-foreground" : ""}`}
                    onClick={() => field && toggleSort(field)}>
                    <span className="flex items-center gap-1">
                      {label}{field && <SortIcon field={field} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-[11px] font-bold text-primary">{s.avatar}</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{s.rollNo}</td>
                  <td className="px-4 py-3"><Badge variant="secondary" className="text-xs">{s.class}</Badge></td>
                  <td className="px-4 py-3 text-muted-foreground">{s.gender}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.parent}</td>
                  <td className="px-4 py-3 font-semibold text-foreground">{s.score > 0 ? `${s.score}%` : "—"}</td>
                  <td className="px-4 py-3">
                    <Badge variant={s.status === "Active" ? "default" : "secondary"} className={`text-xs ${s.status === "Active" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : "bg-red-100 text-red-600 hover:bg-red-100"}`}>
                      {s.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setViewStudent(s)} className="p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground" aria-label="View">
                        <Eye className="size-3.5" />
                      </button>
                      <button onClick={() => setEditStudent(s)} className="p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground" aria-label="Edit">
                        <Pencil className="size-3.5" />
                      </button>
                      <button onClick={() => setDeleteStudent(s)} className="p-1.5 rounded-md hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600" aria-label="Delete">
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="text-center py-10 text-muted-foreground text-sm">No students found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing {filtered.length} of {studentList.length} students</span>
        </div>
      </div>

      {/* Add Student Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            {[
              { label: "Full Name", key: "name", placeholder: "Enter full name" },
              { label: "Roll No", key: "rollNo", placeholder: "e.g. GHS011" },
              { label: "Class", key: "class", placeholder: "e.g. 10-A" },
              { label: "Grade", key: "grade", placeholder: "e.g. 10" },
              { label: "Email", key: "email", placeholder: "student@email.com" },
              { label: "Phone", key: "phone", placeholder: "+91 XXXXX XXXXX" },
              { label: "Parent Name", key: "parent", placeholder: "Parent full name" },
            ].map(({ label, key, placeholder }) => (
              <div key={key} className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium">{label}</Label>
                <Input
                  placeholder={placeholder}
                  className="h-9 text-sm"
                  value={(newStudent as unknown as Record<string, string>)[key]}
                  onChange={(e) => setNewStudent((p) => ({ ...p, [key]: e.target.value }))}
                />
              </div>
            ))}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium">Gender</Label>
              <Select value={newStudent.gender} onValueChange={(v) => setNewStudent((p) => ({ ...p, gender: v ?? p.gender }))}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground" onClick={handleAddStudent}>Add Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Student Dialog */}
      <Dialog open={!!viewStudent} onOpenChange={() => setViewStudent(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
          </DialogHeader>
          {viewStudent && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">{viewStudent.avatar}</span>
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{viewStudent.name}</p>
                  <p className="text-sm text-muted-foreground">{viewStudent.rollNo} · {viewStudent.class}</p>
                  <Badge className={`text-xs mt-1 ${viewStudent.status === "Active" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : "bg-red-100 text-red-600 hover:bg-red-100"}`}>{viewStudent.status}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: "Gender", value: viewStudent.gender },
                  { label: "DOB", value: viewStudent.dob },
                  { label: "Parent", value: viewStudent.parent },
                  { label: "Score", value: viewStudent.score > 0 ? `${viewStudent.score}%` : "—" },
                  { label: "Fees Paid", value: viewStudent.feesPaid ? "Yes" : "No" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="font-medium text-foreground">{value}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1.5 flex-1"><Mail className="size-3.5" /> Email</Button>
                <Button variant="outline" size="sm" className="gap-1.5 flex-1"><Phone className="size-3.5" /> Call</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editStudent} onOpenChange={() => setEditStudent(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Edit Student</DialogTitle></DialogHeader>
          {editStudent && (
            <div className="grid grid-cols-2 gap-4 py-2">
              {[
                { label: "Full Name", key: "name" },
                { label: "Class", key: "class" },
                { label: "Email", key: "email" },
                { label: "Phone", key: "phone" },
              ].map(({ label, key }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <Label className="text-xs font-medium">{label}</Label>
                  <Input className="h-9 text-sm"                   value={(editStudent as unknown as Record<string, string>)[key] || ""} onChange={(e) => setEditStudent((p) => p ? { ...p, [key]: e.target.value } : p)} />
                </div>
              ))}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditStudent(null)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground" onClick={() => { setStudentList(prev => prev.map(s => s.id === editStudent?.id ? { ...s, ...editStudent } : s)); setEditStudent(null); toast.success("Student updated!") }}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={!!deleteStudent} onOpenChange={() => setDeleteStudent(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Student</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete <strong>{deleteStudent?.name}</strong>? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-white hover:bg-destructive/90" onClick={handleDeleteStudent}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
