"use client"

import Link from "next/link"
import { Check, Crown, ArrowLeft, ShieldCheck, Sparkles, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

const benefits = [
  { icon: Sparkles, title: "Advanced analytics", description: "Turn school data into clear, actionable insights." },
  { icon: Headphones, title: "Priority support", description: "Get faster answers from our dedicated support team." },
  { icon: ShieldCheck, title: "More control", description: "Unlock expanded tools for your entire school community." },
]

export default function UpgradePage() {
  return (
    <main className="p-4 lg:p-6 flex flex-col gap-6 max-w-6xl">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon" aria-label="Back to dashboard">
          <Link href="/dashboard"><ArrowLeft /></Link>
        </Button>
        <div>
          <p className="text-sm text-muted-foreground">School account</p>
          <h1 className="text-xl font-bold text-foreground">Premium subscription</h1>
        </div>
      </div>

      <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6 lg:p-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl flex flex-col gap-3">
          <Badge className="w-fit gap-1"><Crown data-icon="inline-start" /> Premium plan</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground text-balance">Give your school the tools to grow smarter.</h2>
          <p className="text-sm leading-6 text-muted-foreground">Unlock advanced analytics, priority support and more with Aspira Premium.</p>
        </div>
        <div className="flex items-end gap-2 shrink-0">
          <span className="text-4xl font-bold text-foreground">₹4,999</span>
          <span className="pb-1 text-sm text-muted-foreground">/ year</span>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Everything you need to run better</h2>
            <p className="text-sm text-muted-foreground">Premium adds more insight, support, and flexibility to your dashboard.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, description }) => (
              <Card key={title} size="sm">
                <CardHeader><div className="size-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><Icon /></div><CardTitle>{title}</CardTitle></CardHeader>
                <CardContent><p className="text-sm leading-6 text-muted-foreground">{description}</p></CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="border-primary/30 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">Aspira Premium <Badge variant="secondary">Best value</Badge></CardTitle>
            <CardDescription>For growing schools that want more from their data.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {["Advanced school analytics", "Priority email support", "Unlimited reports", "Premium updates included"].map((item) => <div key={item} className="flex items-center gap-2 text-sm text-foreground"><Check className="size-4 text-primary" />{item}</div>)}
            <div className="pt-3"><span className="text-3xl font-bold text-foreground">₹4,999</span><span className="text-sm text-muted-foreground"> / year</span></div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button className="w-full" onClick={() => toast.success("Premium subscription checkout is ready to connect")}>Upgrade Now</Button>
            <p className="text-xs text-center text-muted-foreground">Secure checkout. Cancel anytime.</p>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
