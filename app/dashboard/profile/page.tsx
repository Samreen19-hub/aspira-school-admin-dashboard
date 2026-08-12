"use client"

import Link from "next/link"
import { ArrowLeft, Globe, Mail, MapPin, Phone, School } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSchool } from "@/components/dashboard/school-provider"

export default function SchoolProfilePage() {
  const { school, gallery } = useSchool()
  return <div className="p-4 lg:p-6 max-w-5xl flex flex-col gap-5">
    <Link href="/dashboard"><Button variant="ghost" size="sm" className="self-start"><ArrowLeft className="size-4" /> Back to dashboard</Button></Link>
    <section className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="h-40 bg-primary/10 flex items-center justify-center"><School className="size-16 text-primary/50" /></div>
      <div className="p-6 flex flex-col gap-4"><div className="flex items-start justify-between gap-4"><div><h1 className="text-2xl font-bold text-foreground">{school.name}</h1><p className="text-sm text-muted-foreground">{school.city}, {school.state}</p></div><Badge>{school.board}</Badge></div><p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">{school.description}</p><div className="flex flex-wrap gap-4 text-sm text-muted-foreground"><span className="flex items-center gap-2"><Phone className="size-4" />{school.phone}</span><span className="flex items-center gap-2"><Mail className="size-4" />{school.email}</span><span className="flex items-center gap-2"><Globe className="size-4" />{school.website}</span><span className="flex items-center gap-2"><MapPin className="size-4" />{school.address}</span></div></div>
    </section>
    <section className="bg-card border border-border rounded-xl p-5"><h2 className="font-semibold text-foreground mb-4">Campus Gallery</h2><div className="grid grid-cols-2 md:grid-cols-3 gap-3">{gallery.map((photo, index) => <img key={`${photo}-${index}`} src={photo} alt={`Campus gallery ${index + 1}`} className="w-full h-40 object-cover rounded-lg" />)}</div></section>
  </div>
}
