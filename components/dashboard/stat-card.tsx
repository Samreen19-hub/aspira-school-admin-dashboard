import { type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeLabel?: string
  icon: LucideIcon
  iconBg?: string
  iconColor?: string
}

export function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconBg = "bg-primary/10",
  iconColor = "text-primary",
}: StatCardProps) {
  const isPositive = change && !change.startsWith("-")
  return (
    <div className="bg-card rounded-xl border border-border p-4 flex items-start gap-4">
      <div className={cn("size-12 rounded-xl flex items-center justify-center shrink-0", iconBg)}>
        <Icon className={cn("size-6", iconColor)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground font-medium mb-0.5">{title}</p>
        <p className="text-2xl font-bold text-foreground">{typeof value === "number" ? value.toLocaleString() : value}</p>
        {change && (
          <p className="text-xs mt-0.5 flex items-center gap-1">
            <span className={cn("font-semibold", isPositive ? "text-emerald-600" : "text-red-500")}>
              {isPositive ? "↑" : "↓"} {change}
            </span>
            {changeLabel && <span className="text-muted-foreground">{changeLabel}</span>}
          </p>
        )}
      </div>
    </div>
  )
}
