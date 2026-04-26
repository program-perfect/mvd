"use client"

import { CrimesSection } from "@/components/mvd/crimes-section"
import { CriminalsSection } from "@/components/mvd/criminals-section"
import { ReportsSection } from "@/components/mvd/reports-section"
import { SectionNav, type SectionId } from "@/components/mvd/section-nav"
import { SectionSlugBar } from "@/components/mvd/section-slug-bar"
import { StolenPropertySection } from "@/components/mvd/stolen-property-section"
import { SuspectsSection } from "@/components/mvd/suspects-section"
import { SystemFooter } from "@/components/mvd/system-footer"
import { SystemHeader } from "@/components/mvd/system-header"
import { WantedSection } from "@/components/mvd/wanted-section"
import { WeaponsSection } from "@/components/mvd/weapons-section"
import { DEFAULT_SECTION, SECTIONS, findSection } from "@/lib/mvd/sections-meta"
import { useCallback, useEffect, useMemo, useState } from "react"

const PARAM = "section"

type PageInnerProps = {
  initialSlug?: string | null
}

export function PageInner({ initialSlug = null }: PageInnerProps) {
  const initialSection = findSection(initialSlug) ?? DEFAULT_SECTION

  const [sectionId, setSectionId] = useState<SectionId>(initialSection.id)
  const [highlightSuspectId, setHighlightSuspectId] = useState<string | null>(null)

  // Один раз после загрузки читаем текущий URL.
  // Это нужно, если PageInner пока вызывается без initialSlug.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlSection = findSection(params.get(PARAM)) ?? DEFAULT_SECTION

    setSectionId((current) => (current === urlSection.id ? current : urlSection.id))
  }, [])

  // Поддержка кнопок браузера "назад/вперёд"
  useEffect(() => {
    function handlePopState() {
      const params = new URLSearchParams(window.location.search)
      const urlSection = findSection(params.get(PARAM)) ?? DEFAULT_SECTION

      setSectionId(urlSection.id)

      if (urlSection.id !== "suspects") {
        setHighlightSuspectId(null)
      }
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  const section = useMemo(
    () => SECTIONS.find((s) => s.id === sectionId) ?? DEFAULT_SECTION,
    [sectionId],
  )

  const navigateTo = useCallback((id: SectionId) => {
    const target = SECTIONS.find((s) => s.id === id) ?? DEFAULT_SECTION

    // 1. Моментально переключаем UI.
    // Без ожидания Next router, server navigation и RSC.
    setSectionId(target.id)

    if (target.id !== "suspects") {
      setHighlightSuspectId(null)
    }

    // 2. Меняем URL нативно, без Next.js navigation.
    const params = new URLSearchParams(window.location.search)
    params.set(PARAM, target.slug)

    const nextUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`

    if (nextUrl !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
      window.history.pushState({ section: target.slug }, "", nextUrl)
    }
  }, [])

  const renderSection = () => {
    switch (sectionId) {
      case "property":
        return (
          <StolenPropertySection
            onOpenSuspects={() => {
              setHighlightSuspectId("krylov-na")
              navigateTo("suspects")
            }}
          />
        )
      case "suspects":
        return <SuspectsSection highlightId={highlightSuspectId} />
      case "wanted":
        return <WantedSection />
      case "news":
        return <ReportsSection />
      case "crime":
        return <CrimesSection />
      case "criminals":
        return <CriminalsSection />
      case "weapons":
        return <WeaponsSection />
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SystemHeader />

      <main className="mx-auto w-full max-w-7xl flex-1 px-3 py-5 sm:px-4 md:px-6 md:py-7 xl:py-8">
        <div className="mb-5 sm:mb-6">
          <SectionNav active={sectionId} onSelect={navigateTo} />
        </div>

        <div className="mvd-stripe rounded-sm border border-border bg-card/40 p-3 sm:p-4 md:p-6">
          <div key={sectionId} data-section-panel>
            <SectionSlugBar section={section} />
            {renderSection()}
          </div>
        </div>
      </main>

      <SystemFooter />
    </div>
  )
}