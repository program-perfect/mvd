"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { CITIES, PRIMARY_CITY, readCityCookie, writeCityCookie } from "./cities"
import { generateSessionId } from "./session"
import type { SectionId } from "./sections-meta"

type Store = {
  /** Активный город (фильтр в шапке). */
  city: string
  setCity: (c: string) => void

  /** Идентификатор сессии (меняется на каждом заходе). */
  sessionId: string
  rotateSession: () => void

  /** Скрытые разделы (управляется в /admin). */
  hiddenSections: SectionId[]
  toggleSectionVisibility: (id: SectionId) => void

  /** Сброс всех изменений, сделанных в админ-панели. */
  resetAll: () => void

  /** Были ли внесены любые изменения. */
  isDirty: boolean
}

const Ctx = createContext<Store | null>(null)

const HIDDEN_KEY = "mvd_hidden_sections"

export function StoreProvider({ children }: { children: ReactNode }) {
  const [city, setCityState] = useState<string>(PRIMARY_CITY)
  const [sessionId, setSessionId] = useState<string>("")
  const [hiddenSections, setHiddenSections] = useState<SectionId[]>([])
  const [isDirty, setIsDirty] = useState(false)
  const initialHiddenRef = useRef<SectionId[]>([])

  // Сессия — генерируется на каждый заход.
  useEffect(() => {
    setSessionId(generateSessionId())
  }, [])

  // Город — читаем куки, иначе ставим Артемьевск и пишем куки.
  useEffect(() => {
    const stored = readCityCookie()
    if (stored && CITIES.includes(stored as (typeof CITIES)[number])) {
      setCityState(stored)
    } else {
      setCityState(PRIMARY_CITY)
      writeCityCookie(PRIMARY_CITY)
    }
  }, [])

  // Скрытые разделы — читаем localStorage.
  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = window.localStorage.getItem(HIDDEN_KEY)
      if (raw) {
        const parsed: SectionId[] = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          setHiddenSections(parsed)
          initialHiddenRef.current = parsed
        }
      }
    } catch {
      /* ignore */
    }
  }, [])

  const setCity = useCallback((c: string) => {
    setCityState(c)
    writeCityCookie(c)
  }, [])

  const rotateSession = useCallback(() => {
    setSessionId(generateSessionId())
  }, [])

  const persistHidden = useCallback((next: SectionId[]) => {
    setHiddenSections(next)
    setIsDirty(true)
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(HIDDEN_KEY, JSON.stringify(next))
      } catch {
        /* ignore */
      }
    }
  }, [])

  const toggleSectionVisibility = useCallback(
    (id: SectionId) => {
      const next = hiddenSections.includes(id)
        ? hiddenSections.filter((x) => x !== id)
        : [...hiddenSections, id]
      persistHidden(next)
    },
    [hiddenSections, persistHidden],
  )

  const resetAll = useCallback(() => {
    persistHidden([])
    initialHiddenRef.current = []
    setIsDirty(false)
  }, [persistHidden])

  const value = useMemo<Store>(
    () => ({
      city,
      setCity,
      sessionId,
      rotateSession,
      hiddenSections,
      toggleSectionVisibility,
      resetAll,
      isDirty,
    }),
    [
      city,
      setCity,
      sessionId,
      rotateSession,
      hiddenSections,
      toggleSectionVisibility,
      resetAll,
      isDirty,
    ],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore(): Store {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useStore must be used within <StoreProvider>")
  return ctx
}
