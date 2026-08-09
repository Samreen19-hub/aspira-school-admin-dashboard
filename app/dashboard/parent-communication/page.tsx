"use client"

import { useState } from "react"
import { Send, Search, Plus, Phone, Mail, MessageSquare, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { students, reviews } from "@/lib/mock-data"
import { toast } from "sonner"

const conversations = [
  { id: 1, parent: "Priya Sharma", student: "Ananya Sharma", class: "10-A", lastMessage: "Thank you for the update on Ananya's progress!", time: "10:30 AM", unread: 0, avatar: "PS" },
  { id: 2, parent: "Rahul Verma", student: "Rohan Verma", class: "10-A", lastMessage: "Can we schedule a meeting this week?", time: "9:15 AM", unread: 2, avatar: "RV" },
  { id: 3, parent: "Meera Patel", student: "Diya Patel", class: "10-B", lastMessage: "What are the pending fee documents?", time: "Yesterday", unread: 1, avatar: "MP" },
  { id: 4, parent: "Vikram Singh", student: "Arjun Singh", class: "10-B", lastMessage: "Arjun missed 3 days this week.", time: "Yesterday", unread: 0, avatar: "VS" },
  { id: 5, parent: "Sunita Iyer", student: "Meera Iyer", class: "10-A", lastMessage: "She's doing great in Science!", time: "Mon", unread: 0, avatar: "SI" },
  { id: 6, parent: "Raj Mehta", student: "Karan Mehta", class: "9-A", lastMessage: "What time is the PTM?", time: "Mon", unread: 3, avatar: "RM" },
]

const messageThreads: Record<number, { from: "admin" | "parent"; text: string; time: string }[]> = {
  1: [
    { from: "parent", text: "Hello, I wanted to check on Ananya's performance this semester.", time: "9:00 AM" },
    { from: "admin", text: "Hi Priya! Ananya is performing exceptionally well. She scored 98.6% in the recent assessment.", time: "9:15 AM" },
    { from: "parent", text: "That's wonderful! Thank you for the update on Ananya's progress!", time: "10:30 AM" },
  ],
  2: [
    { from: "parent", text: "My son Rohan has been struggling with Math lately.", time: "8:30 AM" },
    { from: "admin", text: "Thank you for reaching out. We'll arrange extra sessions with Dr. Anita Roy.", time: "8:45 AM" },
    { from: "parent", text: "Can we schedule a meeting this week?", time: "9:15 AM" },
  ],
}

export default function ParentCommunicationPage() {
  const [activeConv, setActiveConv] = useState(conversations[0])
  const [search, setSearch] = useState("")
  const [message, setMessage] = useState("")
  const [broadcastOpen, setBroadcastOpen] = useState(false)

  const filtered = conversations.filter(c =>
    c.parent.toLowerCase().includes(search.toLowerCase()) ||
    c.student.toLowerCase().includes(search.toLowerCase())
  )

  const thread = messageThreads[activeConv.id] || []

  const sendMessage = () => {
    if (!message.trim()) return
    toast.success(`Message sent to ${activeConv.parent}`)
    setMessage("")
  }

  return (
    <div className="p-4 lg:p-6 flex flex-col gap-5 h-full">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-foreground">Parent Communication</h1>
          <p className="text-sm text-muted-foreground">Communicate with parents and guardians</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setBroadcastOpen(true)}>
            <Users className="size-4" /> Broadcast Message
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="size-4" /> New Conversation
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Parents", value: "1,042", icon: Users, color: "text-primary bg-primary/10" },
          { label: "Active Chats", value: "24", icon: MessageSquare, color: "text-sky-600 bg-sky-100" },
          { label: "Unread", value: "6", icon: Mail, color: "text-amber-600 bg-amber-100" },
          { label: "Avg. Rating", value: "4.8", icon: Star, color: "text-emerald-600 bg-emerald-100" },
        ].map(s => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-3 flex items-center gap-3">
            <div className={`size-8 rounded-lg flex items-center justify-center ${s.color}`}>
              <s.icon className="size-4" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main messaging area */}
      <div className="flex gap-4 bg-card rounded-xl border border-border overflow-hidden" style={{ height: 440 }}>
        {/* Conversations list */}
        <div className="w-64 shrink-0 border-r border-border flex flex-col">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-8 h-8 text-xs" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.map(c => (
              <button
                key={c.id}
                className={`w-full flex items-start gap-3 p-3 border-b border-border/50 text-left hover:bg-accent/50 transition-colors ${activeConv.id === c.id ? "bg-primary/5" : ""}`}
                onClick={() => setActiveConv(c)}
              >
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-primary">{c.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-foreground truncate">{c.parent}</p>
                    <span className="text-[10px] text-muted-foreground shrink-0 ml-1">{c.time}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{c.student} · {c.class}</p>
                  <p className="text-[11px] text-muted-foreground truncate mt-0.5">{c.lastMessage}</p>
                </div>
                {c.unread > 0 && (
                  <span className="size-4 rounded-full bg-primary flex items-center justify-center text-[9px] font-bold text-primary-foreground shrink-0">
                    {c.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="p-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-[10px] font-bold text-primary">{activeConv.avatar}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{activeConv.parent}</p>
                <p className="text-xs text-muted-foreground">Parent of {activeConv.student} · {activeConv.class}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="size-7" onClick={() => toast.info("Calling " + activeConv.parent)}>
                <Phone className="size-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="size-7" onClick={() => toast.info("Email sent to " + activeConv.parent)}>
                <Mail className="size-3.5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {thread.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "admin" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] rounded-xl px-3 py-2 ${msg.from === "admin" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                  <p className="text-xs leading-relaxed">{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.from === "admin" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{msg.time}</p>
                </div>
              </div>
            ))}
            {thread.length === 0 && (
              <div className="text-center text-sm text-muted-foreground my-auto">No messages yet. Start the conversation!</div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border flex gap-2">
            <Input
              placeholder="Type a message..."
              className="h-9 text-sm flex-1"
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.nativeEvent.isComposing) sendMessage() }}
            />
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground h-9 px-3" onClick={sendMessage}>
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews section */}
      <div className="bg-card rounded-xl border border-border p-4">
        <h2 className="text-sm font-semibold text-foreground mb-3">Recent Parent Reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {reviews.slice(0, 3).map((r, i) => (
            <div key={i} className="flex flex-col gap-2 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-primary">{r.avatar}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">{r.name}</p>
                  <p className="text-[10px] text-muted-foreground">{r.role}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className={`size-3 ${idx < r.rating ? "text-amber-400 fill-amber-400" : "text-border"}`} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">&ldquo;{r.comment}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>

      {/* Broadcast Dialog */}
      <Dialog open={broadcastOpen} onOpenChange={setBroadcastOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Broadcast Message to Parents</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Label className="text-xs">Target Audience</Label>
              <Select>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Parents</SelectItem>
                  <SelectItem value="grade10">Grade 10 Parents</SelectItem>
                  <SelectItem value="grade9">Grade 9 Parents</SelectItem>
                  <SelectItem value="overdue">Parents with Overdue Fees</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs">Subject</Label>
              <Input className="h-8 text-sm" placeholder="Message subject" />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs">Message</Label>
              <Textarea placeholder="Type your message here..." className="text-sm resize-none" rows={4} />
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => { toast.success("Broadcast sent to all parents!"); setBroadcastOpen(false) }}>
              <Send className="size-4" /> Send Broadcast
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
