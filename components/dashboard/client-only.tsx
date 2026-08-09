"use client"

import { useEffect, useState, type ReactNode } from "react"

/**
 * Renders children only on the client after mount.
 * Use this to wrap Recharts ResponsiveContainer (which uses ResizeObserver
 * and has no server dimensions) to prevent hydration mismatches.
 */
export function ClientOnly({
  children,
  fallback = null,
}: {
  children: ReactNode
  fallback?: ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <>{fallback}</>
  return <>{children}</>
}
