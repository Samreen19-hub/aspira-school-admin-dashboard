"use client"

import { useRef, useState, type ChangeEvent } from "react"
import Link from "next/link"
import { ArrowLeft, Globe, Mail, MapPin, Phone, School, Trash2, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSchool } from "@/components/dashboard/school-provider"
import { toast } from "sonner"

export default function SchoolProfilePage() {
  const { school, gallery, addPhotos, removePhoto } = useSchool()
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  const handlePhotos = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])
    if (!files.length) return
    addPhotos(files.map((file) => URL.createObjectURL(file)))
    toast.success(`${files.length} photo${files.length > 1 ? "s" : ""} added to the gallery`)
    event.target.value = ""
  }

  const handleRemove = (photo: string) => {
    removePhoto(photo)
    setSelectedPhoto(null)
    toast.success("Photo removed from the gallery")
  }

  return <div className="p-4 lg:p-6 max-w-5xl flex flex-col gap-5">
    <Link href="/dashboard"><Button variant="ghost" size="sm" className="self-start"><ArrowLeft className="size-4" /> Back to dashboard</Button></Link>
    <section className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="h-40 bg-primary/10 flex items-center justify-center">{school.logo ? <img src={school.logo} alt={`${school.name} logo`} className="size-24 rounded-2xl object-cover" /> : <School className="size-16 text-primary/50" />}</div>
      <div className="p-6 flex flex-col gap-4"><div className="flex items-start justify-between gap-4"><div><h1 className="text-2xl font-bold text-foreground">{school.name}</h1><p className="text-sm text-muted-foreground">{school.city}, {school.state}</p></div><Badge>{school.board}</Badge></div><p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">{school.description}</p><div className="flex flex-wrap gap-4 text-sm text-muted-foreground"><span className="flex items-center gap-2"><Phone className="size-4" />{school.phone}</span><span className="flex items-center gap-2"><Mail className="size-4" />{school.email}</span><span className="flex items-center gap-2"><Globe className="size-4" />{school.website}</span><span className="flex items-center gap-2"><MapPin className="size-4" />{school.address}</span></div></div>
    </section>
    <section className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between gap-3 mb-4"><div><h2 className="font-semibold text-foreground">Campus Gallery</h2><p className="text-xs text-muted-foreground mt-1">{gallery.length} photo{gallery.length === 1 ? "" : "s"}</p></div><><input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handlePhotos} /><Button size="sm" onClick={() => inputRef.current?.click()}><Upload className="size-4" /> Add Photos</Button></></div>
      {gallery.length ? <div className="grid grid-cols-2 md:grid-cols-3 gap-3">{gallery.map((photo, index) => <button type="button" key={`${photo}-${index}`} onClick={() => setSelectedPhoto(photo)} className="group relative overflow-hidden rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><img src={photo} alt={`Campus gallery ${index + 1}`} className="w-full h-40 object-cover transition-transform group-hover:scale-105" /><span className="absolute inset-x-2 bottom-2 flex items-center justify-between rounded-md bg-background/90 px-2 py-1 text-xs text-foreground opacity-0 transition-opacity group-hover:opacity-100"><span>Preview</span><Trash2 className="size-3" /></span></button>)}</div> : <div className="rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">No photos yet. Add photos to build your campus gallery.</div>}
    </section>
    {selectedPhoto && <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/70 p-4" role="dialog" aria-modal="true" aria-label="Photo preview" onClick={() => setSelectedPhoto(null)}><div className="relative max-h-full max-w-4xl" onClick={(event) => event.stopPropagation()}><img src={selectedPhoto} alt="Selected campus gallery photo" className="max-h-[80vh] max-w-full rounded-xl object-contain" /><div className="absolute right-2 top-2 flex gap-2"><Button size="icon" variant="secondary" aria-label="Close preview" onClick={() => setSelectedPhoto(null)}><X className="size-4" /></Button><Button size="icon" variant="destructive" aria-label="Delete photo" onClick={() => handleRemove(selectedPhoto)}><Trash2 className="size-4" /></Button></div></div></div>}
  </div>
}
