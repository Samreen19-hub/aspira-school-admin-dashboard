"use client"

import { useState } from "react"
import { DollarSign, TrendingUp, AlertCircle, CheckCircle, Download, Plus, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { feesData } from "@/lib/mock-data"
import { ClientOnly } from "@/components/dashboard/client-only"
import { toast } from "sonner"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts"

const feeStats = [
  { label: "Total Revenue", value: "₹18,50,000", icon: DollarSign, color: "text-primary bg-primary/10", change: "+12%" },
  { label: "Collected", value: "₹14,70,000", icon: CheckCircle, color: "text-emerald-600 bg-emerald-100", change: "+8%" },
  { label: "Pending", value: "₹2,50,000", icon: AlertCircle, color: "text-amber-600 bg-amber-100", change: "-3%" },
  { label: "Overdue", value: "₹1,30,000", icon: TrendingUp, color: "text-rose-600 bg-rose-100", change: "+2%" },
]

const monthlyData = [
  { month: "Jan", collected: 280000, pending: 50000 },
  { month: "Feb", collected: 310000, pending: 40000 },
  { month: "Mar", collected: 290000, pending: 60000 },
  { month: "Apr", collected: 350000, pending: 30000 },
  { month: "May", collected: 240000, pending: 80000 },
]

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  Paid: { label: "Paid", variant: "default" },
  Partial: { label: "Partial", variant: "outline" },
  Overdue: { label: "Overdue", variant: "destructive" },
  Pending: { label: "Pending", variant: "secondary" },
}

export default function FeesPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedFee, setSelectedFee] = useState<(typeof feesData)[0] | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [sortCol, setSortCol] = useState<keyof (typeof feesData)[0] | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")

  const handleSort = (col: keyof (typeof feesData)[0]) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc")
    else { setSortCol(col); setSortDir("asc") }
  }

  const filtered = feesData
    .filter(f =>
      (f.student.toLowerCase().includes(search.toLowerCase()) || f.rollNo.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "all" || f.status.toLowerCase() === statusFilter.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortCol) return 0
      const av = a[sortCol]; const bv = b[sortCol]
      if (av == null || bv == null) return 0
      return sortDir === "asc" ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1)
    })

  return (
    <div className="p-4 lg:p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">Fees Management</h1>
          <p className="text-sm text-muted-foreground">Track and manage student fee payments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Report downloaded!")}>
            <Download className="size-4" /> Export
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setAddOpen(true)}>
            <Plus className="size-4" /> Add Fee Record
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {feeStats.map(s => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className={`size-9 rounded-lg flex items-center justify-center ${s.color}`}>
                <s.icon className="size-4" />
              </div>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <p className="text-lg font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-emerald-600 mt-1">{s.change} this month</p>
          </div>
        ))}
      </div>

      {/* Chart + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart */}
        <div className="bg-card rounded-xl border border-border p-4 lg:col-span-1">
          <h2 className="text-sm font-semibold text-foreground mb-3">Monthly Collection</h2>
          <div className="h-48">
            <ClientOnly fallback={<div className="h-full w-full animate-pulse bg-muted rounded-lg" />}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "11px" }}
                    formatter={(v: unknown) => [`₹${(Number(v) / 1000).toFixed(0)}K`, ""]}
                  />
                  <Bar dataKey="collected" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Collected" />
                  <Bar dataKey="pending" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </ClientOnly>
          </div>
          <div className="flex gap-4 mt-2">
            <span className="flex items-center gap-1 text-xs text-muted-foreground"><span className="size-2 rounded-full bg-primary inline-block" />Collected</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground"><span className="size-2 rounded-full bg-muted inline-block" />Pending</span>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border p-4 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input placeholder="Search student..." className="pl-8 h-8 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
              <SelectTrigger className="w-32 h-8 text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Student", "Class", "Amount", "Paid", "Due", "Status"].map(col => (
                    <th
                      key={col}
                      className="pb-2 text-left text-xs font-semibold text-muted-foreground cursor-pointer hover:text-foreground pr-3"
                      onClick={() => handleSort(col.toLowerCase() as keyof (typeof feesData)[0])}
                    >
                      {col}
                    </th>
                  ))}
                  <th className="pb-2 text-left text-xs font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(f => {
                  const sc = statusConfig[f.status] || { label: f.status, variant: "secondary" as const }
                  return (
                    <tr
                      key={f.id}
                      className="border-b border-border/50 hover:bg-accent/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedFee(f)}
                    >
                      <td className="py-2.5 pr-3">
                        <div>
                          <p className="font-medium text-foreground text-xs">{f.student}</p>
                          <p className="text-[10px] text-muted-foreground">{f.rollNo}</p>
                        </div>
                      </td>
                      <td className="py-2.5 pr-3 text-xs text-muted-foreground">{f.class}</td>
                      <td className="py-2.5 pr-3 text-xs font-medium">₹{f.amount.toLocaleString()}</td>
                      <td className="py-2.5 pr-3 text-xs text-emerald-600">₹{f.paid.toLocaleString()}</td>
                      <td className="py-2.5 pr-3 text-xs text-rose-600">₹{f.due.toLocaleString()}</td>
                      <td className="py-2.5 pr-3">
                        <Badge variant={sc.variant} className="text-[10px] h-5">{sc.label}</Badge>
                      </td>
                      <td className="py-2.5">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 text-[10px] px-2"
                          onClick={e => { e.stopPropagation(); toast.success(`Receipt sent to ${f.student}`) }}
                        >
                          Receipt
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-8 text-sm text-muted-foreground">No records found</div>
            )}
          </div>
        </div>
      </div>

      {/* Fee Detail Dialog */}
      <Dialog open={!!selectedFee} onOpenChange={() => setSelectedFee(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Fee Details — {selectedFee?.student}</DialogTitle>
          </DialogHeader>
          {selectedFee && (
            <div className="flex flex-col gap-3 text-sm">
              {[
                ["Student", selectedFee.student],
                ["Roll No", selectedFee.rollNo],
                ["Class", selectedFee.class],
                ["Fee Type", selectedFee.feeType],
                ["Total Amount", `₹${selectedFee.amount.toLocaleString()}`],
                ["Paid Amount", `₹${selectedFee.paid.toLocaleString()}`],
                ["Due Amount", `₹${selectedFee.due.toLocaleString()}`],
                ["Due Date", selectedFee.dueDate],
                ["Paid Date", selectedFee.paidDate || "—"],
                ["Status", selectedFee.status],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => { toast.success("Payment recorded!"); setSelectedFee(null) }}>
                  Record Payment
                </Button>
                <Button size="sm" variant="outline" className="flex-1" onClick={() => { toast.success("Receipt sent!"); setSelectedFee(null) }}>
                  Send Receipt
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Fee Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Fee Record</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            {["Student Name", "Roll No", "Class", "Fee Type", "Amount", "Due Date"].map(field => (
              <div key={field} className="flex flex-col gap-1">
                <Label className="text-xs">{field}</Label>
                <Input className="h-8 text-sm" placeholder={`Enter ${field.toLowerCase()}`} />
              </div>
            ))}
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground mt-2" onClick={() => { toast.success("Fee record added!"); setAddOpen(false) }}>
              Add Record
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
