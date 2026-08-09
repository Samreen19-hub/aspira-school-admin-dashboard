"use client"

import { useState } from "react"
import { UserPlus, FileCheck, Clock, Star, Search, Plus, Download, Eye, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { admissions } from "@/lib/mock-data"
import { toast } from "sonner"

const admissionStats = [
  { label: "Total Applications", value: 58, icon: UserPlus, color: "text-primary bg-primary/10" },
  { label: "New Applications", value: 38, icon: FileCheck, color: "text-sky-600 bg-sky-100" },
  { label: "In Review", value: 12, icon: Clock, color: "text-amber-600 bg-amber-100" },
  { label: "Shortlisted", value: 8, icon: Star, color: "text-emerald-600 bg-emerald-100" },
]

const statusConfig: Record<string, string> = {
  "New Applications": "bg-sky-100 text-sky-700",
  "In Review": "bg-amber-100 text-amber-700",
  "Shortlisted": "bg-emerald-100 text-emerald-700",
  "Rejected": "bg-rose-100 text-rose-700",
}

export default function AdmissionsPage() {
  const [search, setSearch] = useState("")
  const [tab, setTab] = useState("all")
  const [selected, setSelected] = useState<(typeof admissions)[0] | null>(null)
  const [addOpen, setAddOpen] = useState(false)

  const filtered = admissions.filter(a =>
    (a.name.toLowerCase().includes(search.toLowerCase()) || a.parent.toLowerCase().includes(search.toLowerCase())) &&
    (tab === "all" || a.status === tab)
  )

  const tabs = [
    { value: "all", label: "All Applications" },
    { value: "New Applications", label: "New" },
    { value: "In Review", label: "In Review" },
    { value: "Shortlisted", label: "Shortlisted" },
  ]

  return (
    <div className="p-4 lg:p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-foreground">Admissions 2025-26</h1>
          <p className="text-sm text-muted-foreground">Manage student admission applications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Report exported!")}>
            <Download className="size-4" /> Export
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setAddOpen(true)}>
            <Plus className="size-4" /> New Application
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {admissionStats.map(s => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className={`size-9 rounded-lg flex items-center justify-center ${s.color}`}>
                <s.icon className="size-4" />
              </div>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Admissions Open Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-emerald-700">Admissions Open — Academic Year 2025-26</p>
          <p className="text-xs text-emerald-600 mt-0.5">Applications are being accepted for all grades from Nursery to Grade 12.</p>
        </div>
        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0">View Details</Button>
      </div>

      {/* Table */}
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
            <Input placeholder="Search applicant..." className="pl-8 h-8 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Applicant", "Grade", "Parent / Guardian", "Phone", "Applied Date", "Documents", "Status", "Actions"].map(h => (
                  <th key={h} className="pb-2 text-left text-xs font-semibold text-muted-foreground pr-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                  <td className="py-3 pr-3">
                    <div className="flex items-center gap-2">
                      <div className="size-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold text-primary">{a.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-foreground">{a.name}</p>
                        <p className="text-[10px] text-muted-foreground">DOB: {a.dob}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-3 text-xs text-muted-foreground">Grade {a.grade}</td>
                  <td className="py-3 pr-3 text-xs text-foreground">{a.parent}</td>
                  <td className="py-3 pr-3 text-xs text-muted-foreground whitespace-nowrap">{a.phone}</td>
                  <td className="py-3 pr-3 text-xs text-muted-foreground whitespace-nowrap">{a.appliedDate}</td>
                  <td className="py-3 pr-3">
                    {a.documents
                      ? <span className="flex items-center gap-1 text-[10px] text-emerald-600"><CheckCircle className="size-3" />Complete</span>
                      : <span className="flex items-center gap-1 text-[10px] text-amber-600"><Clock className="size-3" />Pending</span>
                    }
                  </td>
                  <td className="py-3 pr-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusConfig[a.status] || "bg-secondary text-secondary-foreground"}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => setSelected(a)}>
                        <Eye className="size-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-emerald-600 hover:text-emerald-700" onClick={() => toast.success(`${a.name} shortlisted!`)}>
                        <CheckCircle className="size-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-destructive hover:text-destructive" onClick={() => toast.error(`${a.name} rejected`)}>
                        <XCircle className="size-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-sm text-muted-foreground">No applications found</div>
          )}
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Application Details — {selected?.name}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="flex flex-col gap-3 text-sm">
              {[
                ["Applicant Name", selected.name],
                ["Date of Birth", selected.dob],
                ["Applying for Grade", `Grade ${selected.grade}`],
                ["Parent / Guardian", selected.parent],
                ["Phone", selected.phone],
                ["Email", selected.email],
                ["Applied Date", selected.appliedDate],
                ["Documents", selected.documents ? "Complete" : "Pending"],
                ["Status", selected.status],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium text-right">{v}</span>
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => { toast.success(`${selected.name} shortlisted!`); setSelected(null) }}>
                  Shortlist
                </Button>
                <Button size="sm" variant="outline" className="flex-1" onClick={() => { toast.info("Interview scheduled!"); setSelected(null) }}>
                  Schedule Interview
                </Button>
                <Button size="sm" variant="destructive" className="flex-1" onClick={() => { toast.error(`${selected.name} rejected`); setSelected(null) }}>
                  Reject
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Application Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>New Admission Application</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            {["Student Name", "Date of Birth", "Grade Applying For", "Parent Name", "Phone", "Email"].map(f => (
              <div key={f} className="flex flex-col gap-1">
                <Label className="text-xs">{f}</Label>
                <Input className="h-8 text-sm" placeholder={f} />
              </div>
            ))}
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-2" onClick={() => { toast.success("Application submitted!"); setAddOpen(false) }}>
            Submit Application
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
