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
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"

const PARAM = "section"

export function PageInner() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const initialSlug = searchParams.get(PARAM)
  const initialSection = findSection(initialSlug) ?? DEFAULT_SECTION

  const [sectionId, setSectionId] = useState<SectionId>(initialSection.id)
  const [highlightSuspectId, setHighlightSuspectId] = useState<string | null>(null)

  // Синхронизация: при изменении URL извне — обновляем активный раздел
  useEffect(() => {
    const slug = searchParams.get(PARAM)
    const sec = findSection(slug)
    if (sec && sec.id !== sectionId) {
      setSectionId(sec.id)
    }
  }, [searchParams, sectionId])

  const section = useMemo(
    () => SECTIONS.find((s) => s.id === sectionId) ?? DEFAULT_SECTION,
    [sectionId],
  )

  const navigateTo = useCallback(
    (id: SectionId) => {
      const target = SECTIONS.find((s) => s.id === id) ?? DEFAULT_SECTION
      const params = new URLSearchParams(searchParams.toString())
      params.set(PARAM, target.slug)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
      setSectionId(target.id)
      if (id !== "suspects") setHighlightSuspectId(null)
    },
    [router, pathname, searchParams],
  )

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
          <SectionSlugBar section={section} />
          {renderSection()}
        </div>
      </main>

      <SystemFooter />
    </div>
  )
}
