"use client"

import { generateCipherKey, generateFingerprint } from "@/lib/mvd/session"
import { useStore } from "@/lib/mvd/store"
import { Lock, Shield } from "lucide-react"
import { useEffect, useState } from "react"

const STEPS = [
  "Инициализация защищённого канала",
  "Согласование TLS 1.3 / GOST R 34.10-2012",
  "Генерация сеансового ключа AES-256-GCM",
  "Сверка с центром сертификации ФСТЭК",
  "Проверка целостности модулей АИС «ЕИТКС»",
  "Идентификация терминала и оператора",
  "Восстановление контекста рабочего места",
] as const

const STEP_MS = 220

export function SessionLoader() {
  const { sessionId, rotateSession } = useStore()
  const [visible, setVisible] = useState(true)
  const [active, setActive] = useState(0)
  const [aesKey, setAesKey] = useState("")
  const [fp, setFp] = useState("")
  const [hidden, setHidden] = useState(false)

  // Шифр-артефакты создаём только на клиенте, чтобы не было hydration mismatch.
  useEffect(() => {
    rotateSession()
    setAesKey(generateCipherKey())
    setFp(generateFingerprint())
  }, [rotateSession])

  // Прогресс по этапам.
  useEffect(() => {
    if (active >= STEPS.length) {
      const t = setTimeout(() => setHidden(true), 320)
      const t2 = setTimeout(() => setVisible(false), 720)
      return () => {
        clearTimeout(t)
        clearTimeout(t2)
      }
    }
    const id = setTimeout(() => setActive((v) => v + 1), STEP_MS)
    return () => clearTimeout(id)
  }, [active])

  if (!visible) return null

  return (
    <div
      role="alertdialog"
      aria-busy="true"
      aria-label="Запуск защищённой сессии"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background px-4 transition-opacity duration-500 ${
        hidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="mvd-pop w-full max-w-md">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-primary/15 ring-1 ring-primary/40">
            <Shield className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              МВД РОССИИ · АИС «ЕИТКС»
            </p>
            <h2 className="font-sans text-base font-semibold text-foreground">
              Запуск защищённой сессии
            </h2>
          </div>
        </div>

        <div className="rounded-sm border border-border bg-card p-4 font-mono text-[11px] leading-relaxed shadow-sm">
          <ul className="space-y-1.5">
            {STEPS.map((s, i) => {
              const state = i < active ? "ok" : i === active ? "run" : "wait"
              return (
                <li
                  key={s}
                  className={`flex items-start gap-2 transition-colors ${
                    state === "wait" ? "text-muted-foreground/50" : "text-foreground"
                  }`}
                >
                  <span className="mt-0.5 w-10 shrink-0 tabular-nums" aria-hidden="true">
                    {state === "ok" ? "[OK]" : state === "run" ? "[..]" : "[  ]"}
                  </span>
                  <span className="break-words">
                    {s}
                    {state === "run" && (
                      <span className="mvd-blink ml-1 text-primary">_</span>
                    )}
                  </span>
                </li>
              )
            })}
          </ul>

          <div className="mt-3 space-y-1 border-t border-border pt-3 text-muted-foreground">
            <div className="flex items-start gap-2">
              <Lock className="mt-0.5 h-3 w-3 shrink-0 text-accent" aria-hidden="true" />
              <span className="shrink-0">КЛЮЧ</span>
              <span className="truncate text-foreground" suppressHydrationWarning>
                {aesKey ? aesKey.slice(0, 32) + "…" : "—"}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="ml-5 shrink-0">ОТПЕЧАТОК</span>
              <span className="truncate text-foreground" suppressHydrationWarning>
                {fp ? fp.slice(0, 32) + "…" : "—"}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="ml-5 shrink-0">СЕССИЯ</span>
              <span className="text-foreground" suppressHydrationWarning>
                {sessionId || "—"}
              </span>
            </div>
          </div>

          <div className="mt-3 h-1 w-full overflow-hidden rounded-sm bg-secondary">
            <div
              className="h-full bg-primary transition-all duration-200 ease-out"
              style={{
                width: `${Math.min(100, (active / STEPS.length) * 100)}%`,
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
