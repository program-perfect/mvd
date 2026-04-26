"use client"

import { CITIES } from "@/lib/mvd/cities"
import { useStore } from "@/lib/mvd/store"
import { MapPin } from "lucide-react"

export function CitySelector({ className = "" }: { className?: string }) {
  const { city, setCity } = useStore()

  return (
    <label
      className={`ml-auto group flex items-center gap-1.5 rounded-sm border border-border bg-card h-9 px-2 py-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary/60 ${className}`}
      title="Город. Выбор сохраняется в куки на 10 минут, затем сбрасывается на Артемьевск."
      suppressHydrationWarning
    >
      <MapPin className="h-3 w-3 text-accent" aria-hidden="true" />
      <span className="hidden sm:inline">Гор.</span>
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="cursor-pointer bg-transparent font-mono text-[11px] uppercase tracking-wider text-foreground focus:outline-none"
        aria-label="Выбор города"
        suppressHydrationWarning
      >
        {CITIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </label>
  )
}
