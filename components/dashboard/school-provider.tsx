"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

export type SchoolInfo = {
  name: string
  udise: string
  board: string
  established: string
  type: string
  grades: string
  description: string
  phone: string
  email: string
  website: string
  city: string
  state: string
  pin: string
  address: string
  logo: string | null
}

const defaultSchool: SchoolInfo = {
  name: "Greenfield High School", udise: "29010102001", board: "CBSE", established: "2010",
  type: "Co-educational", grades: "Nursery - Grade 12",
  description: "Greenfield High School is committed to nurturing young minds through quality education, strong values, and holistic development. We aim to create a safe, inclusive, and inspiring environment where every child thrives.",
  phone: "+91 98765 43210", email: "admissions@greenfieldschool.edu.in", website: "www.greenfieldschool.edu.in",
  city: "Bangalore", state: "Karnataka", pin: "560100", address: "Greenfield High School, Knowledge Park, Bengaluru, Karnataka 560100",
  logo: null,
}

const defaultGallery = [
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&h=480&fit=crop&q=80",
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=360&fit=crop&q=80",
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&h=360&fit=crop&q=80",
]

type SchoolContextValue = { school: SchoolInfo; gallery: string[]; updateSchool: (updates: Partial<SchoolInfo>) => void; addPhotos: (photos: string[]) => void }
const SchoolContext = createContext<SchoolContextValue | null>(null)

function readStorage(key: string) {
  try { return window.localStorage.getItem(key) } catch { return null }
}

function writeStorage(key: string, value: string) {
  try { window.localStorage.setItem(key, value) } catch { /* storage may be unavailable */ }
}

export function SchoolProvider({ children }: { children: ReactNode }) {
  const [school, setSchool] = useState<SchoolInfo>(defaultSchool)
  const [gallery, setGallery] = useState(defaultGallery)

  useEffect(() => {
    try {
      const saved = readStorage("aspira-school")
      if (saved) setSchool({ ...defaultSchool, ...JSON.parse(saved) })
      const savedGallery = readStorage("aspira-gallery")
      if (savedGallery) setGallery(JSON.parse(savedGallery))
    } catch { /* use defaults when storage is unavailable */ }
  }, [])

  const updateSchool = (updates: Partial<SchoolInfo>) => setSchool((current) => {
    const next = { ...current, ...updates }
    writeStorage("aspira-school", JSON.stringify(next))
    return next
  })

  const addPhotos = (photos: string[]) => setGallery((current) => {
    const next = [...current, ...photos]
    writeStorage("aspira-gallery", JSON.stringify(next))
    return next
  })

  const value = useMemo(() => ({ school, gallery, updateSchool, addPhotos }), [school, gallery])
  return <SchoolContext.Provider value={value}>{children}</SchoolContext.Provider>
}

export function useSchool() {
  const context = useContext(SchoolContext)
  if (!context) throw new Error("useSchool must be used within SchoolProvider")
  return context
}
