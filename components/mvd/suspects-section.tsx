"use client"

import { AlertTriangle, ChevronLeft } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

type Suspect = {
  id: string
  code: string
  fio: string
  dob: string
  born: string
  registration: string
  citizenship: string
  status: "Подозреваемый" | "Обвиняемый" | "Осуждён"
  photos: { src: string; alt: string; label: string }[]
  priors: string
  article: string
  verdict: string
  features: string[]
  associatedCases: string[]
}

const suspects: Suspect[] = [
  {
    id: "krylov-na",
    code: "ПД-2026-00471",
    fio: "Крылов Николай Андреевич",
    dob: "1989 г.р.",
    born: "г. Артемьевск",
    registration: "г. Артемьевск, ул. Кирова, д. 14, кв. 27",
    citizenship: "РФ",
    status: "Осуждён",
    photos: [
      {
        src: "/suspect-front.png",
        alt: "Крылов Николай Андреевич — анфас",
        label: "Анфас",
      },
      {
        src: "/suspect-profile.png",
        alt: "Крылов Николай Андреевич — профиль справа",
        label: "Профиль",
      },
    ],
    priors: "Ранее судим (1 судимость). Не снята / не погашена на момент учёта.",
    article: "ст. 158 УК РФ — Кража",
    verdict:
      "Признан виновным. Назначено наказание — 4 (четыре) года лишения свободы с отбыванием наказания в исправительной колонии общего режима.",
    features: [
      "Рост: ≈ 192 см",
      "Телосложение: атлетическое",
      "Волосы: тёмно-русые, короткая стрижка",
      "Борода: рыжая, средней длины",
      "Глаза: серо-голубые",
      "Особые приметы: не выявлены",
    ],
    associatedCases: [
      "12201460002000917 — кража из частного дома, город Артемьевск, 08.11.2022",
    ],
  },
]

interface Props {
  highlightId?: string | null
}

export function SuspectsSection({ highlightId }: Props) {
  const [selected, setSelected] = useState<Suspect | null>(
    highlightId ? suspects.find((s) => s.id === highlightId) ?? null : null,
  )
  const [activePhoto, setActivePhoto] = useState(0)

  if (selected) {
    return (
      <article className="rounded-sm border border-border bg-card">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 md:px-6">
          <button
            type="button"
            onClick={() => {
              setSelected(null)
              setActivePhoto(0)
            }}
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Назад к списку
          </button>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest">
            <span className="text-muted-foreground">Личное дело</span>
            <span className="text-foreground">{selected.code}</span>
            <span className="ml-1 rounded-sm bg-primary/15 px-2 py-0.5 text-primary ring-1 ring-primary/40">
              {selected.status}
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-[minmax(0,1fr)_1.2fr] md:p-6">
          {/* Фото и галерея */}
          <div className="space-y-3">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-border bg-secondary mvd-scanlines">
              <Image
                src={selected.photos[activePhoto].src}
                alt={selected.photos[activePhoto].alt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="pointer-events-none absolute left-2 top-2 rounded-sm bg-background/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-foreground ring-1 ring-border">
                {selected.photos[activePhoto].label}
              </div>
              <div className="pointer-events-none absolute bottom-2 left-2 right-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span className="rounded-sm bg-background/80 px-2 py-0.5 ring-1 ring-border">
                  ЛД {selected.code}
                </span>
                <span className="rounded-sm bg-background/80 px-2 py-0.5 ring-1 ring-border">
                  ФОТО {activePhoto + 1}/{selected.photos.length}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {selected.photos.map((p, i) => (
                <button
                  key={p.src}
                  type="button"
                  onClick={() => setActivePhoto(i)}
                  aria-pressed={activePhoto === i}
                  className={`relative aspect-[4/5] overflow-hidden rounded-sm border transition-colors ${
                    activePhoto === i
                      ? "border-primary ring-1 ring-primary/60"
                      : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-1 left-1 rounded-sm bg-background/80 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-foreground ring-1 ring-border">
                    {p.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Досье */}
          <div className="space-y-5">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                ФИО
              </p>
              <h3 className="text-balance font-sans text-xl font-semibold text-foreground md:text-2xl">
                {selected.fio}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {selected.dob} · {selected.born}
              </p>
            </div>

            <dl className="grid grid-cols-1 gap-3 rounded-sm border border-border bg-secondary/40 p-4 sm:grid-cols-2">
              <Field label="Гражданство" value={selected.citizenship} />
              <Field label="Статус" value={selected.status} />
              <Field label="Регистрация" value={selected.registration} />
              <Field label="Судимости" value={selected.priors} />
            </dl>

            <div className="rounded-sm border border-primary/40 bg-primary/10 p-4">
              <div className="flex items-start gap-2.5">
                <AlertTriangle
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <div className="space-y-1.5">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
                    Квалификация
                  </p>
                  <p className="font-sans text-sm font-semibold text-foreground">
                    {selected.article}
                  </p>
                  <p className="text-pretty text-sm leading-relaxed text-foreground">
                    {selected.verdict}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Внешние признаки
              </h4>
              <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                {selected.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-2 text-sm leading-relaxed text-foreground"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Связанные дела
              </h4>
              <ul className="space-y-1">
                {selected.associatedCases.map((c) => (
                  <li
                    key={c}
                    className="rounded-sm border border-border bg-secondary/40 px-3 py-2 font-mono text-xs text-foreground"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
    )
  }

  return (
    <section>
      <header className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            ПД-05 // Картотека подозреваемых
          </p>
          <h2 className="font-sans text-xl font-semibold text-foreground md:text-2xl">
            Подозреваемые
          </h2>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Найдено записей: {suspects.length}
        </span>
      </header>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {suspects.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => {
                setSelected(s)
                setActivePhoto(0)
              }}
              className="group flex h-full w-full flex-col overflow-hidden rounded-sm border border-border bg-card text-left transition-colors hover:border-primary/60"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary">
                <Image
                  src={s.photos[0].src}
                  alt={s.photos[0].alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute left-2 top-2 rounded-sm bg-background/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-foreground ring-1 ring-border">
                  {s.code}
                </div>
                <div className="pointer-events-none absolute right-2 top-2 rounded-sm bg-primary/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-primary ring-1 ring-primary/40">
                  {s.status}
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-3">
                <div className="font-sans text-sm font-semibold text-foreground">
                  {s.fio}
                </div>
                <div className="text-xs text-muted-foreground">
                  {s.dob} · {s.born}
                </div>
                <div className="mt-auto border-t border-border/60 pt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {s.article}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm text-foreground">{value}</dd>
    </div>
  )
}
