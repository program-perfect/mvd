"use client"

import { useStore } from "@/lib/mvd/store"
import { Clock, KeyRound, Lock, Settings, Shield, Wifi } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { CitySelector } from "./city-selector"
import { ThemeToggle } from "./theme-toggle"

const WEEKDAYS = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
]

export function SystemHeader({ adminMode = false }: { adminMode?: boolean }) {
  const { sessionId } = useStore()
  // const [time, setTime] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [weekday, setWeekday] = useState<string>("")
  // const [tz, setTz] = useState<string>("")

  useEffect(() => {
    // const detectTzAbbr = () => {
    //   try {
    //     const parts = new Intl.DateTimeFormat("ru-RU", {
    //       timeZoneName: "short",
    //     }).formatToParts(new Date())
    //     const tzPart = parts.find((p) => p.type === "timeZoneName")?.value
    //     if (tzPart) return tzPart
    //   } catch {}
    //   const offsetMin = -new Date().getTimezoneOffset()
    //   const sign = offsetMin >= 0 ? "+" : "−"
    //   const h = Math.floor(Math.abs(offsetMin) / 60)
    //     .toString()
    //     .padStart(2, "0")
    //   const m = (Math.abs(offsetMin) % 60).toString().padStart(2, "0")
    //   return `UTC${sign}${h}:${m}`
    // }

    const update = () => {
      const now = new Date()
      // setTime(
      //   now.toLocaleTimeString("ru-RU", {
      //     hour: "2-digit",
      //     minute: "2-digit",
      //     second: "2-digit",
      //   }),
      // )
      setDate(
        now.toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      )
      setWeekday(WEEKDAYS[now.getDay()])
      // setTz(detectTzAbbr())
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-3 lg:flex-row lg:items-center  lg:px-6">
        {/* Логотип и название */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-primary/15 ring-1 ring-primary/40 sm:h-11 sm:w-11">
            <Shield className="h-5 w-5 text-primary sm:h-6 sm:w-6" aria-hidden="true" />
          </div>
          <div className="min-w-0 leading-tight">
            <div className="truncate font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:text-[11px]">
              МВД РОССИИ · АИС «ЕИТКС» · УВД г. Артемьевск
            </div>
            <h1 className="font-sans text-sm font-semibold text-foreground sm:text-base lg:text-lg">
              {adminMode
                ? "Администрирование служебной БД"
                : "Единая база оперативного учёта"}
            </h1>
          </div>
        </div>

        {/* Информационная панель */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="mvd-blink h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            <span className="hidden xs:inline">Канал</span>
            <span>защищён</span>
          </span>
          <span className="hidden items-center gap-1.5 lg:flex">
            <Lock className="h-3 w-3" aria-hidden="true" />
            Доступ: 3
          </span>
          <span className="hidden items-center gap-1.5 xl:flex">
            <Wifi className="h-3 w-3" aria-hidden="true" />
            Терм. № 04-217
          </span>

          {/* Идентификатор сессии — отображается коротко на мобильных */}
          <span
            className="hidden items-center gap-1.5 text-foreground sm:flex"
            title={sessionId || "Сессия запускается…"}
            suppressHydrationWarning
          >
            <KeyRound className="h-3 w-3 text-accent" aria-hidden="true" />
            <span className="text-muted-foreground">SES</span>
            <span className="hidden tabular-nums md:inline">
              {sessionId || "—"}
            </span>
            <span className="tabular-nums md:hidden">
              {sessionId ? sessionId.slice(0, 12) + "…" : "—"}
            </span>
          </span>

          {/* Часы пользователя */}
          <span
            className="flex items-center gap-1.5 text-foreground"
            suppressHydrationWarning
          >
            <Clock className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
            <span className="tabular-nums">{date}</span>
            {/* <span className="text-muted-foreground">·</span> */}
            {/* <span className="tabular-nums">{time}</span>
            {tz && (
              <span className="hidden text-muted-foreground sm:inline">({tz})</span>
            )} */}
          </span>
          <span
            className="hidden text-muted-foreground xl:inline"
            suppressHydrationWarning
          >
            {weekday}
          </span>

          <div className="flex flex-1 gap-3 flex-row-reverse">
            {/* Город (фильтр по картотекам) */}
            <CitySelector />

            {/* Кнопка админ-панели или возврата на главную */}
            {adminMode ? (
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-card px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground transition-colors hover:border-primary/60 hover:text-primary"
                >
                  ← На главную
                </Link>
              ) : (
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-card h-9 px-2 py-2 font-mono text-[10px] uppercase tracking-wider text-foreground transition-colors hover:border-primary/60 hover:text-primary"
                  title="Открыть панель администратора"
                >
                  <Settings className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                </Link>
              )}

              <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
