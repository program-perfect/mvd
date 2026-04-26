"use client"

import { SECTIONS, type SectionId } from "@/lib/mvd/sections-meta"
import { cn } from "@/lib/utils"
import { useIsMobile } from '../ui/use-mobile'

export type { SectionId }

interface Props {
  active: SectionId
  onSelect: (id: SectionId) => void
}

export function SectionNav({ active, onSelect }: Props) {
  const isMobile = useIsMobile()

  return (
    <nav aria-label="Разделы базы данных">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:text-[11px]">
          // Разделы базы данных
        </h2>
        <span className="font-mono text-[10px] text-muted-foreground sm:text-[11px]">
          {SECTIONS.length} модулей
        </span>
      </div>

      <ul className="grid grid-cols-1 gap-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
        {SECTIONS.map((s) => {
          const Icon = s.icon
          const isActive = active === s.id
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => onSelect(s.id)}
                aria-pressed={isActive}
                className={cn(
                  "mvd-corner group relative flex h-full w-full flex-col gap-2 rounded-sm border p-2.5 text-left transition-colors sm:p-3",
                  "border-border bg-card hover:border-primary/60 hover:bg-secondary",
                  isActive && "mvd-active border-primary ring-1 ring-primary/60",
                )}
                title={`UUID: ${s.uuid}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-sm ring-1",
                      isActive
                        ? "bg-primary/20 text-primary ring-primary/60"
                        : "bg-secondary text-muted-foreground ring-border group-hover:text-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {s.code}
                    </span>
                    {isActive && (
                      <span className="mvd-blink inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="font-sans text-sm font-semibold text-foreground">
                    {s.title}
                  </div>
                  <div className="text-pretty text-xs leading-relaxed text-muted-foreground xl:hidden">
                    {s.subtitle}
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between gap-2 border-t border-border/60 pt-2">
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    {isMobile
                      ? "Кол-во:"
                      : "Количество:"
                    }
                    {<span className="font-bold text-foreground">{" "}{s.count}</span>}
                  </span>
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
