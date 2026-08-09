"use client"

import { useState } from "react"
import { Send, Search, Plus, Star, Archive, Trash2, Mail, Inbox, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

const messageData = [
  { id: 1, from: "Dr. Anita Roy", avatar: "AR", subject: "Grade 10 Math Curriculum Update", preview: "I wanted to share the updated curriculum plan for Grade 10 Mathematics for the upcoming semester...", time: "10:30 AM", read: false, starred: true, folder: "inbox" },
  { id: 2, from: "Priya Sharma (Parent)", avatar: "PS", subject: "Ananya's Performance Report", preview: "Thank you for sharing the monthly report. Ananya has been putting in a lot of effort at home too...", time: "9:15 AM", read: false, starred: false, folder: "inbox" },
  { id: 3, from: "Mr. Suresh Patel", avatar: "SP", subject: "Science Lab Equipment Request", preview: "The science lab needs new microscopes for the Grade 10 practicals. I've attached the list of required items...", time: "Yesterday", read: true, starred: false, folder: "inbox" },
  { id: 4, from: "Raj Mehta (Parent)", avatar: "RM", subject: "Karan's Leave Application", preview: "Karan will be absent from May 15-17 due to a family function. Please grant leave...", time: "Yesterday", read: true, starred: false, folder: "inbox" },
  { id: 5, from: "Ms. Kavitha Rao", avatar: "KR", subject: "English Assignment Submissions", preview: "The Grade 10-A assignments for the poetry unit have been submitted. Here is a summary...", time: "Mon", read: true, starred: true, folder: "inbox" },
  { id: 6, from: "Vikram Singh (Parent)", avatar: "VS", subject: "Arjun's Attendance Issue", preview: "I'm concerned about Arjun's attendance record this month. Can we discuss this?", time: "Mon", read: true, starred: false, folder: "inbox" },
  { id: 7, from: "System", avatar: "SY", subject: "Timetable Updated for Grade 8", preview: "The timetable for Grade 8 has been updated. Please inform students and parents...", time: "Sun", read: true, starred: false, folder: "inbox" },
]

const threadMessages = [
  { from: "Dr. Anita Roy", text: "I wanted to share the updated curriculum plan for Grade 10 Mathematics for the upcoming semester. The new plan includes an additional chapter on Statistics and introduces Trigonometry concepts earlier.", time: "10:30 AM", isMe: false },
  { from: "Admin", text: "Thank you for the update, Dr. Roy. The revised curriculum looks comprehensive. Please coordinate with the timetable team to adjust the periods accordingly.", time: "11:00 AM", isMe: true },
  { from: "Dr. Anita Roy", text: "Sure, I'll reach out to the timetable team. Should I also update the exam schedule to align with the new curriculum?", time: "11:15 AM", isMe: false },
]

export default function MessagesPage() {
  const [activeMsg, setActiveMsg] = useState(messageData[0])
  const [search, setSearch] = useState("")
  const [tab, setTab] = useState("inbox")
  const [compose, setCompose] = useState(false)
  const [reply, setReply] = useState("")

  const filtered = messageData.filter(m =>
    (m.from.toLowerCase().includes(search.toLowerCase()) || m.subject.toLowerCase().includes(search.toLowerCase())) &&
    (tab === "inbox" || tab === "starred" && m.starred)
  )

  const unreadCount = messageData.filter(m => !m.read).length

  return (
    <div className="p-4 lg:p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">Messages</h1>
          <p className="text-sm text-muted-foreground">Internal communication hub</p>
        </div>
        <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setCompose(true)}>
          <Plus className="size-4" /> Compose
        </Button>
      </div>

      {/* Main panel */}
      <div className="flex gap-0 bg-card rounded-xl border border-border overflow-hidden" style={{ minHeight: 540 }}>
        {/* Sidebar */}
        <div className="w-60 shrink-0 border-r border-border flex flex-col">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-8 h-8 text-xs" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>

          <div className="p-2 border-b border-border">
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="w-full h-7">
                <TabsTrigger value="inbox" className="flex-1 text-xs h-5 relative">
                  Inbox
                  {unreadCount > 0 && (
                    <Badge className="ml-1 size-4 p-0 text-[9px] flex items-center justify-center bg-primary">{unreadCount}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="starred" className="flex-1 text-xs h-5">Starred</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filtered.map(msg => (
              <button
                key={msg.id}
                className={`w-full flex items-start gap-2.5 p-3 border-b border-border/50 text-left hover:bg-accent/50 transition-colors ${activeMsg.id === msg.id ? "bg-primary/5 border-l-2 border-l-primary" : ""}`}
                onClick={() => setActiveMsg(msg)}
              >
                <div className="size-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[9px] font-bold text-primary">{msg.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className={`text-xs truncate ${!msg.read ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{msg.from}</p>
                    <span className="text-[9px] text-muted-foreground shrink-0">{msg.time}</span>
                  </div>
                  <p className={`text-[11px] truncate mt-0.5 ${!msg.read ? "font-medium text-foreground" : "text-muted-foreground"}`}>{msg.subject}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{msg.preview}</p>
                </div>
                {!msg.read && <div className="size-2 rounded-full bg-primary shrink-0 mt-1.5" />}
              </button>
            ))}
          </div>
        </div>

        {/* Message view */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Message header */}
          <div className="p-4 border-b border-border flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-foreground">{activeMsg.subject}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">From: <span className="text-foreground">{activeMsg.from}</span> · {activeMsg.time}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button variant="ghost" size="icon" className="size-7" onClick={() => toast.info("Message starred!")}>
                <Star className={`size-3.5 ${activeMsg.starred ? "fill-amber-400 text-amber-400" : ""}`} />
              </Button>
              <Button variant="ghost" size="icon" className="size-7" onClick={() => toast.info("Archived!")}>
                <Archive className="size-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="size-7 text-destructive hover:text-destructive" onClick={() => toast.error("Message deleted!")}>
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>

          {/* Thread */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {threadMessages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.isMe ? "flex-row-reverse" : ""}`}>
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-primary">{msg.from.charAt(0)}</span>
                </div>
                <div className={`max-w-[75%] ${msg.isMe ? "items-end" : ""} flex flex-col gap-1`}>
                  <div className={`rounded-xl px-4 py-3 ${msg.isMe ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                    <p className="text-xs leading-relaxed">{msg.text}</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{msg.from} · {msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Reply area */}
          <div className="p-3 border-t border-border flex gap-2">
            <Textarea
              placeholder="Write a reply..."
              className="text-sm resize-none flex-1"
              rows={2}
              value={reply}
              onChange={e => setReply(e.target.value)}
            />
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground self-end px-3"
              size="sm"
              onClick={() => { if (reply.trim()) { toast.success("Reply sent!"); setReply("") } }}
            >
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Compose Dialog */}
      <Dialog open={compose} onOpenChange={setCompose}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>New Message</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Label className="text-xs">To</Label>
              <Input className="h-8 text-sm" placeholder="Recipient name or email" />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs">Subject</Label>
              <Input className="h-8 text-sm" placeholder="Message subject" />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs">Message</Label>
              <Textarea placeholder="Type your message here..." className="text-sm resize-none" rows={5} />
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => { toast.success("Message sent!"); setCompose(false) }}>
              <Send className="size-4" /> Send Message
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
