"use client"

import { useState } from "react"
import { Check, Copy, Hash, Link as LinkIcon } from "lucide-react"
import type { SectionMeta } from "@/lib/mvd/sections-meta"

/**
 * Тонкая служебная полоска над содержимым раздела.
 * Показывает идентификатор раздела (UUID), URL-slug и кнопки копирования.
 */
export function SectionSlugBar({ section }: { section: SectionMeta }) {
  const [copied, setCopied] = useState<"slug" | "uuid" | null>(null)

  function copy(value: string, kind: "slug" | "uuid") {
    if (typeof navigator === "undefined" || !navigator.clipboard) return
    navigator.clipboard.writeText(value).then(() => {
      setCopied(kind)
      setTimeout(() => setCopied(null), 1200)
    })
  }

  return (
    <div className="mvd-rail mb-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-sm border border-border bg-secondary/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
      <span className="inline-flex items-center gap-1 text-foreground">
        <span className="mvd-blink inline-block h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
        {section.code}
      </span>

      <span className="inline-flex items-center gap-1.5">
        <LinkIcon className="h-3 w-3" aria-hidden="true" />
        <span className="text-foreground">/{section.slug}</span>
        <button
          type="button"
          onClick={() => copy(section.slug, "slug")}
          className="inline-flex h-5 w-5 items-center justify-center rounded-sm border border-transparent text-muted-foreground transition-colors hover:border-border hover:text-foreground"
          aria-label="Скопировать слаг раздела"
          title="Скопировать слаг"
        >
          {copied === "slug" ? <Check className="h-3 w-3 text-accent" /> : <Copy className="h-3 w-3" />}
        </button>
      </span>

      <span className="hidden items-center gap-1.5 sm:inline-flex">
        <Hash className="h-3 w-3" aria-hidden="true" />
        <span className="font-mono normal-case tracking-normal text-foreground">{section.uuid}</span>
        <button
          type="button"
          onClick={() => copy(section.uuid, "uuid")}
          className="inline-flex h-5 w-5 items-center justify-center rounded-sm border border-transparent text-muted-foreground transition-colors hover:border-border hover:text-foreground"
          aria-label="Скопировать UUID раздела"
          title="Скопировать UUID"
        >
          {copied === "uuid" ? <Check className="h-3 w-3 text-accent" /> : <Copy className="h-3 w-3" />}
        </button>
      </span>

      <span className="ml-auto text-muted-foreground">UUIDv4 · ДСП</span>
    </div>
  )
}
