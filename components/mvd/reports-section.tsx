"use client"

import {
  REPORTS,
  REPORT_PRIORITIES,
  REPORT_STATUSES,
  REPORT_TYPES,
  type ReportPriority,
  type ReportStatus,
  type ReportType
} from "@/lib/mvd/reports-data"
import { findSection } from "@/lib/mvd/sections-meta"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  Filter,
  MapPin,
  X,
} from "lucide-react"
import { useMemo, useState } from "react"

const statusStyles: Record<ReportStatus, string> = {
  "Принято": "border-accent/50 bg-accent/10 text-accent",
  "В работе": "border-primary/60 bg-primary/10 text-primary",
  "Зарегистрировано": "border-border bg-secondary text-foreground",
  "Выезд наряда": "border-primary/60 bg-primary/15 text-primary",
  "Передано в СК": "border-destructive/50 bg-destructive/10 text-destructive",
  "Передано в дознание": "border-accent/50 bg-accent/10 text-accent",
  "Закрыто": "border-border bg-card text-muted-foreground",
}

const priorityStyles: Record<ReportPriority, string> = {
  "Срочно": "border-destructive/60 bg-destructive/10 text-destructive",
  "Высокий": "border-primary/50 bg-primary/10 text-primary",
  "Обычный": "border-border bg-secondary text-muted-foreground",
  "Низкий": "border-border bg-card text-muted-foreground",
}

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const

export function ReportsSection() {
  const meta = findSection("news")!
  const [type, setType] = useState<ReportType | "all">("all")
  const [status, setStatus] = useState<ReportStatus | "all">("all")
  const [priority, setPriority] = useState<ReportPriority | "all">("all")
  const [query, setQuery] = useState("")
  const [pageSize, setPageSize] = useState<number>(25)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return REPORTS.filter((r) => {
      if (type !== "all" && r.type !== type) return false
      if (status !== "all" && r.status !== status) return false
      if (priority !== "all" && r.priority !== priority) return false
      if (q) {
        const hay = `${r.id} ${r.short} ${r.uuid} ${r.district} ${r.text} ${r.responder}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [type, status, priority, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * pageSize
  const end = Math.min(filtered.length, start + pageSize)
  const visible = filtered.slice(start, end)

  const inWork = filtered.filter((r) => r.status === "В работе" || r.status === "Выезд наряда").length
  const urgent = filtered.filter((r) => r.priority === "Срочно").length

  const filtersActive = type !== "all" || status !== "all" || priority !== "all" || query.trim() !== ""

  function resetFilters() {
    setType("all")
    setStatus("all")
    setPriority("all")
    setQuery("")
    setPage(1)
  }

  return (
    <section>
      <header className="mb-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {meta.code} // Раздел базы · slug:{" "}
              <span className="text-foreground">{meta.slug}</span>
            </p>
            <h2 className="font-sans text-xl font-semibold text-foreground md:text-2xl">
              Сводки за сутки
            </h2>
            <p className="mt-1 max-w-prose text-sm text-muted-foreground">
              Оперативные сводки происшествий по подразделениям ОВД за дежурные
              сутки 14.03.2026.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <span>
              Всего:{" "}
              <span className="font-semibold text-foreground tabular-nums">
                {REPORTS.length}
              </span>
            </span>
            <span>
              Отфильтровано:{" "}
              <span className="font-semibold text-foreground tabular-nums">
                {filtered.length}
              </span>
            </span>
            <span className="text-primary">
              <span className="mvd-blink mr-1 inline-block h-1.5 w-1.5 rounded-full bg-primary align-middle" />
              В работе: <span className="tabular-nums">{inWork}</span>
            </span>
            <span className="text-destructive">
              Срочно: <span className="tabular-nums">{urgent}</span>
            </span>
          </div>
        </div>
      </header>

      {/* Панель фильтров */}
      <div className="mb-3 rounded-sm border border-border bg-card p-3">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <Filter className="h-3 w-3" aria-hidden="true" />
            Фильтры
          </span>
          {filtersActive && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-3 w-3" aria-hidden="true" />
              Сбросить
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <FilterField label="Поиск">
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setPage(1)
              }}
              placeholder="№ записи, район, текст..."
              className="h-9 w-full rounded-sm border border-input bg-background px-2 font-mono text-xs text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/40"
            />
          </FilterField>

          <FilterField label="Тип события">
            <Select
              value={type}
              onChange={(v) => {
                setType(v as ReportType | "all")
                setPage(1)
              }}
              options={[{ value: "all", label: "Все типы" }, ...REPORT_TYPES.map((t) => ({ value: t, label: t }))]}
            />
          </FilterField>

          <FilterField label="Приоритет">
            <Select
              value={priority}
              onChange={(v) => {
                setPriority(v as ReportPriority | "all")
                setPage(1)
              }}
              options={[{ value: "all", label: "Любой" }, ...REPORT_PRIORITIES.map((t) => ({ value: t, label: t }))]}
            />
          </FilterField>

          <FilterField label="Статус">
            <Select
              value={status}
              onChange={(v) => {
                setStatus(v as ReportStatus | "all")
                setPage(1)
              }}
              options={[{ value: "all", label: "Все статусы" }, ...REPORT_STATUSES.map((t) => ({ value: t, label: t }))]}
            />
          </FilterField>
        </div>
      </div>

      {/* Таблица */}
      <div className="overflow-hidden rounded-sm border border-border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-secondary font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-3 py-2">№ / UUID</th>
                <th className="px-3 py-2">Время</th>
                <th className="hidden px-3 py-2 md:table-cell">Подразделение</th>
                <th className="px-3 py-2">Тип</th>
                <th className="hidden px-3 py-2 lg:table-cell">Описание</th>
                <th className="px-3 py-2">Приоритет</th>
                <th className="px-3 py-2">Статус</th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-3 py-8 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    По заданным фильтрам записей не найдено
                  </td>
                </tr>
              ) : (
                visible.map((r, i) => (
                  <tr
                    key={r.uuid}
                    className={
                      i % 2 === 0
                        ? "bg-card align-top transition-colors hover:bg-secondary/60"
                        : "bg-background/40 align-top transition-colors hover:bg-secondary/60"
                    }
                  >
                    <td className="px-3 py-2 font-mono text-[11px] text-foreground">
                      <div className="flex flex-col leading-tight">
                        <span>{r.id}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {r.short}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2 font-mono text-xs text-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
                        {r.time}
                      </span>
                    </td>
                    <td className="hidden px-3 py-2 text-xs text-muted-foreground md:table-cell">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {r.district}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span className="font-mono text-[11px] uppercase tracking-widest text-foreground">
                        {r.type}
                      </span>
                    </td>
                    <td className="hidden max-w-xl px-3 py-2 text-pretty text-xs text-muted-foreground lg:table-cell">
                      <p>{r.text}</p>
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/80">
                        Наряд: {r.responder}
                      </p>
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-block rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${priorityStyles[r.priority]}`}
                      >
                        {r.priority}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-block rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${statusStyles[r.status]}`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Пагинация */}
      <div className="mt-3 flex flex-col items-stretch justify-between gap-3 rounded-sm border border-border bg-card p-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          <span>На странице:</span>
          <Select
            compact
            value={String(pageSize)}
            onChange={(v) => {
              setPageSize(Number(v))
              setPage(1)
            }}
            options={PAGE_SIZE_OPTIONS.map((n) => ({ value: String(n), label: String(n) }))}
          />
          <span className="hidden sm:inline">
            {filtered.length === 0
              ? "0 из 0"
              : `${start + 1}–${end} из ${filtered.length}`}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <PageButton onClick={() => setPage(1)} disabled={safePage === 1} title="Первая">
            <ChevronsLeft className="h-3.5 w-3.5" />
          </PageButton>
          <PageButton onClick={() => setPage(safePage - 1)} disabled={safePage === 1} title="Предыдущая">
            <ChevronLeft className="h-3.5 w-3.5" />
          </PageButton>

          <span className="mx-1 font-mono text-[11px] uppercase tracking-widest text-foreground">
            Стр.{" "}
            <input
              type="number"
              min={1}
              max={totalPages}
              value={safePage}
              onChange={(e) => {
                const v = Number(e.target.value)
                if (!Number.isNaN(v)) setPage(Math.min(Math.max(1, v), totalPages))
              }}
              className="mx-1 h-7 w-12 rounded-sm border border-input bg-background px-1 text-center font-mono text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/40"
              aria-label="Номер страницы"
            />{" "}
            / <span className="tabular-nums">{totalPages}</span>
          </span>

          <PageButton onClick={() => setPage(safePage + 1)} disabled={safePage === totalPages} title="Следующая">
            <ChevronRight className="h-3.5 w-3.5" />
          </PageButton>
          <PageButton onClick={() => setPage(totalPages)} disabled={safePage === totalPages} title="Последняя">
            <ChevronsRight className="h-3.5 w-3.5" />
          </PageButton>
        </div>
      </div>

      <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Сводка сформирована автоматически. Сведения являются служебными.
      </p>
    </section>
  )
}

function FilterField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  )
}

function Select({
  value,
  onChange,
  options,
  compact = false,
}: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  compact?: boolean
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={
        "rounded-sm border border-input bg-background px-2 font-mono text-xs text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/40 " +
        (compact ? "h-7" : "h-9 w-full")
      }
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

function PageButton({
  children,
  onClick,
  disabled,
  title,
}: {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  title?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      className="inline-flex h-7 w-7 items-center justify-center rounded-sm border border-input bg-background text-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-input disabled:hover:text-foreground"
    >
      {children}
    </button>
  )
}
