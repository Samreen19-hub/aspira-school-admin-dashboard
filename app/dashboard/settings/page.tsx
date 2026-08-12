"use client"

import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { Save, School, User, Bell, Shield, Palette, Globe, Upload, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { useSchool } from "@/components/dashboard/school-provider"

export default function SettingsPage() {
  const [tab, setTab] = useState("school")
  const [showPassword, setShowPassword] = useState(false)
  const { school, updateSchool } = useSchool()
  const logoInputRef = useRef<HTMLInputElement>(null)
  const [logoDraft, setLogoDraft] = useState<string | null>(school.logo)
  const [logoError, setLogoError] = useState("")
  const [form, setForm] = useState(school)
  useEffect(() => { setForm(school); setLogoDraft(school.logo) }, [school])
  const updateField = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }))
  const handleLogo = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) { setLogoError('Please choose a PNG, JPG, or WEBP image.'); return }
    if (file.size > 2 * 1024 * 1024) { setLogoError('Logo must be 2MB or smaller.'); return }
    setLogoError("")
    const reader = new FileReader()
    reader.onload = () => setLogoDraft(String(reader.result))
    reader.readAsDataURL(file)
  }
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    feeReminders: true,
    examAlerts: true,
    eventUpdates: true,
    admissionAlerts: true,
  })

  const handleSave = (section: string) => {
    if (section === "School") updateSchool({ ...form, logo: logoDraft })
    toast.success(`${section} settings saved successfully!`)
  }

  return (
    <div className="p-4 lg:p-6 flex flex-col gap-5 max-w-4xl">
      <div>
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your school and account settings</p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="h-9 flex flex-wrap gap-1 w-auto mb-5">
          {[
            { value: "school", label: "School Info", icon: School },
            { value: "profile", label: "Admin Profile", icon: User },
            { value: "notifications", label: "Notifications", icon: Bell },
            { value: "security", label: "Security", icon: Shield },
            { value: "appearance", label: "Appearance", icon: Palette },
          ].map(t => (
            <TabsTrigger key={t.value} value={t.value} className="text-sm gap-1.5">
              <t.icon className="size-3.5" />{t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* School Info */}
        <TabsContent value="school">
          <div className="bg-card rounded-xl border border-border p-5 flex flex-col gap-5">
            <div>
              <h2 className="text-sm font-semibold text-foreground">School Information</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Update basic school details and profile information</p>
            </div>
            <Separator />

            {/* School logo */}
            <div className="flex items-center gap-4">
              <div className="size-16 rounded-xl bg-primary/10 flex items-center justify-center border border-border overflow-hidden">
                {logoDraft ? <img src={logoDraft} alt={`${school.name} logo preview`} className="size-full object-cover" /> : <School className="size-8 text-primary" />}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">School Logo</p>
                <p className="text-xs text-muted-foreground mb-2">PNG, JPG, or WEBP up to 2MB</p>
                <input ref={logoInputRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleLogo} />
                <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => logoInputRef.current?.click()}>
                  <Upload className="size-3" /> Upload Logo
                </Button>
                {logoError && <p className="text-xs text-destructive mt-1">{logoError}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "School Name", defaultValue: school.name, id: "name" },
                { label: "UDISE Code", defaultValue: school.udise, id: "udise" },
                { label: "Affiliation Board", defaultValue: school.board, id: "board" },
                { label: "Established Year", defaultValue: school.established, id: "established" },
                { label: "School Type", defaultValue: school.type, id: "type" },
                { label: "Grades Offered", defaultValue: school.grades, id: "grades" },
              ].map(f => (
                <div key={f.id} className="flex flex-col gap-1.5">
                  <Label htmlFor={f.id} className="text-xs">{f.label}</Label>
                  <Input id={f.id} value={f.id in form ? String(form[f.id as keyof typeof form]) : undefined} onChange={(event) => f.id in form && updateField(f.id as keyof typeof form, event.target.value)} className="h-8 text-sm" />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">School Description</Label>
              <Textarea
                id="description" value={form.description} onChange={(event) => updateField("description", event.target.value)}
                className="text-sm resize-none"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Phone", defaultValue: "+91 98765 43210", id: "phone" },
                { label: "Email", defaultValue: "admissions@greenfieldschool.edu.in", id: "email" },
                { label: "Website", defaultValue: "www.greenfieldschool.edu.in", id: "website" },
                { label: "City", defaultValue: "Bangalore", id: "city" },
                { label: "State", defaultValue: "Karnataka", id: "state" },
                { label: "PIN Code", defaultValue: "560100", id: "pin" },
              ].map(f => (
                <div key={f.id} className="flex flex-col gap-1.5">
                  <Label htmlFor={f.id} className="text-xs">{f.label}</Label>
                  <Input id={f.id} value={f.id in form ? String(form[f.id as keyof typeof form]) : undefined} onChange={(event) => f.id in form && updateField(f.id as keyof typeof form, event.target.value)} className="h-8 text-sm" />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Full Address</Label>
              <Textarea
                id="address" value={form.address} onChange={(event) => updateField("address", event.target.value)}
                className="text-sm resize-none"
                rows={2}
              />
            </div>

            <Button className="self-start bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => handleSave("School")}>
              <Save className="size-4" /> Save Changes
            </Button>
          </div>
        </TabsContent>

        {/* Admin Profile */}
        <TabsContent value="profile">
          <div className="bg-card rounded-xl border border-border p-5 flex flex-col gap-5">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Admin Profile</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Update your admin account information</p>
            </div>
            <Separator />

            <div className="flex items-center gap-4">
              <div className="size-16 rounded-full bg-primary flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">AU</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Admin User</p>
                <p className="text-xs text-muted-foreground mb-2">Super Admin</p>
                <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => toast.info("Upload photo")}>
                  <Upload className="size-3" /> Change Photo
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">First Name</Label>
                <Input defaultValue="Admin" className="h-8 text-sm" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Last Name</Label>
                <Input defaultValue="User" className="h-8 text-sm" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Email Address</Label>
                <Input defaultValue="admin@greenfieldschool.edu.in" className="h-8 text-sm" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Phone</Label>
                <Input defaultValue="+91 98765 43210" className="h-8 text-sm" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Role</Label>
                <Select defaultValue="super-admin">
                  <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super-admin">Super Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                    <SelectItem value="kn">Kannada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="self-start bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => handleSave("Profile")}>
              <Save className="size-4" /> Save Profile
            </Button>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <div className="bg-card rounded-xl border border-border p-5 flex flex-col gap-5">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Notification Preferences</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Control how and when you receive notifications</p>
            </div>
            <Separator />

            <div className="flex flex-col gap-4">
              {[
                { key: "emailAlerts" as const, label: "Email Alerts", desc: "Receive important alerts via email" },
                { key: "smsAlerts" as const, label: "SMS Alerts", desc: "Receive critical alerts via SMS" },
                { key: "feeReminders" as const, label: "Fee Reminders", desc: "Notifications for pending and overdue fees" },
                { key: "examAlerts" as const, label: "Exam Alerts", desc: "Exam schedules and result notifications" },
                { key: "eventUpdates" as const, label: "Event Updates", desc: "Notifications for upcoming events and activities" },
                { key: "admissionAlerts" as const, label: "Admission Alerts", desc: "New applications and admission status updates" },
              ].map(n => (
                <div key={n.key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{n.label}</p>
                    <p className="text-xs text-muted-foreground">{n.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[n.key]}
                    onCheckedChange={val => setNotifications(prev => ({ ...prev, [n.key]: val }))}
                  />
                </div>
              ))}
            </div>

            <Button className="self-start bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => handleSave("Notification")}>
              <Save className="size-4" /> Save Preferences
            </Button>
          </div>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <div className="bg-card rounded-xl border border-border p-5 flex flex-col gap-5">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Security Settings</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Manage your password and account security</p>
            </div>
            <Separator />

            <div className="flex flex-col gap-4 max-w-sm">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Current Password</Label>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} placeholder="Enter current password" className="h-8 text-sm pr-9" />
                  <button className="absolute right-2.5 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(p => !p)}>
                    {showPassword ? <EyeOff className="size-4 text-muted-foreground" /> : <Eye className="size-4 text-muted-foreground" />}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">New Password</Label>
                <Input type="password" placeholder="Enter new password" className="h-8 text-sm" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Confirm New Password</Label>
                <Input type="password" placeholder="Confirm new password" className="h-8 text-sm" />
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => handleSave("Password")}>
                <Shield className="size-4" /> Update Password
              </Button>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-sm text-foreground">Enable 2FA</p>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch onCheckedChange={val => toast.success(val ? "2FA enabled!" : "2FA disabled!")} />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Active Sessions</h3>
              <div className="flex flex-col gap-2">
                {[
                  { device: "Chrome on Windows 11", location: "Bangalore, India", time: "Current session", current: true },
                  { device: "Safari on iPhone 15", location: "Bangalore, India", time: "2 hours ago", current: false },
                ].map(session => (
                  <div key={session.device} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="text-xs font-medium text-foreground">{session.device}</p>
                      <p className="text-[11px] text-muted-foreground">{session.location} · {session.time}</p>
                    </div>
                    {session.current
                      ? <span className="text-[10px] text-emerald-600 font-medium bg-emerald-100 px-2 py-0.5 rounded-full">Active</span>
                      : <Button size="sm" variant="ghost" className="h-6 text-xs text-destructive hover:text-destructive" onClick={() => toast.error("Session revoked!")}>Revoke</Button>
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance">
          <div className="bg-card rounded-xl border border-border p-5 flex flex-col gap-5">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Appearance</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Customize the look and feel of your dashboard</p>
            </div>
            <Separator />

            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Color Theme</p>
                <div className="flex gap-3">
                  {[
                    { label: "Indigo (Default)", color: "bg-indigo-600", active: true },
                    { label: "Blue", color: "bg-blue-600", active: false },
                    { label: "Emerald", color: "bg-emerald-600", active: false },
                    { label: "Violet", color: "bg-violet-600", active: false },
                  ].map(t => (
                    <button
                      key={t.label}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border-2 transition-all ${t.active ? "border-primary" : "border-transparent hover:border-border"}`}
                      onClick={() => toast.info(`${t.label} theme applied!`)}
                    >
                      <div className={`size-8 rounded-full ${t.color}`} />
                      <span className="text-[10px] text-muted-foreground">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-2">Sidebar Style</p>
                <div className="flex gap-3">
                  {["Default", "Compact", "Wide"].map(s => (
                    <button
                      key={s}
                      className={`px-4 py-2 rounded-lg border text-sm transition-all ${s === "Default" ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:bg-accent"}`}
                      onClick={() => toast.info(`${s} sidebar applied!`)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">Compact Mode</p>
                  <p className="text-xs text-muted-foreground">Reduce spacing for more content on screen</p>
                </div>
                <Switch onCheckedChange={val => toast.info(val ? "Compact mode on" : "Compact mode off")} />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">Show Quick Actions</p>
                  <p className="text-xs text-muted-foreground">Display quick action buttons on dashboard</p>
                </div>
                <Switch defaultChecked onCheckedChange={val => toast.info(val ? "Quick actions visible" : "Quick actions hidden")} />
              </div>
            </div>

            <Button className="self-start bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => handleSave("Appearance")}>
              <Save className="size-4" /> Save Preferences
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
