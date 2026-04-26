"use client"

import { AlertCircle, Calendar, ChevronLeft, FileBadge, Hash, MapPin } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

type Item = {
  id: string
  code: string
  name: string
  category: string
  status: "Розыск" | "Найдено" | "На экспертизе"
  image: string
  imageAlt: string
  description: string
  location: string
  date: string
  caseNumber: string
  victim: string
  victimDob?: string
  details?: string[]
}

const items: Item[] = [
  {
    id: "3",
    code: "ВД-2022-00193",
    name: "Кольцо женское с красным камнем",
    category: "Ювелирные изделия",
    status: "Розыск",
    image: "/stolen-ring.png",
    imageAlt: "Похищенное золотое кольцо с крупным красным камнем овальной формы",
    description:
      "Кольцо золотое женское, классический дизайн (предположительно — золото 585 пробы), фигурный ажурный корпус, классический дизайн, камень без ореола. Рубин овальной огранки. Цвет – «голубиная кровь».",
    location: "г. Артемьевск, дом 74",
    date: "27.04.2026",
    caseNumber: "12201460002000917",
    victim: "Никитина Алла Геннадьевна",
    victimDob: "1969 г.р.",
    details: [
      "Срок давности по делу: 4 года (на 2026 г.)",
      "Изъято при квартирной краже из частного дома",
      "Особые приметы: ажурный (филигранный) рисунок шинки",
      "Камень имеет характерные внутренние включения — для идентификации",
      "Вес ориентировочный: 6,2 г",
    ],
  },
  {
    id: "1",
    code: "ВД-2024-00417",
    name: "Часы наручные мужские",
    category: "Часы / ювелирные изделия",
    status: "Розыск",
    image: "/stolen-watch.jpg",
    imageAlt: "Похищенные мужские наручные часы золотистого цвета",
    description: "Часы наручные, металл жёлтого цвета, ремешок кожаный коричневый, циферблат круглый, потёртости.",
    location: "г. Артемьевск, ул. Центральная",
    date: "14.03.2024",
    caseNumber: "12401450003001234",
    victim: "Соколов И.П.",
  },
  {
    id: "2",
    code: "ВД-2024-00418",
    name: "Ноутбук персональный",
    category: "Электроника",
    status: "На экспертизе",
    image: "/stolen-laptop.jpg",
    imageAlt: "Похищенный портативный компьютер серого цвета",
    description: "Ноутбук серого цвета, корпус металлический, потёртости по углам, серийный номер частично стёрт.",
    location: "г. Санкт-Петербург, Приморский р-н",
    date: "02.07.2025",
    caseNumber: "12501780001005821",
    victim: "Тимофеев А.В.",
  },
  {
    id: "4",
    code: "ВД-2025-00702",
    name: "Икона старинная в окладе",
    category: "Предметы культа / антиквариат",
    status: "Розыск",
    image: "/stolen-icon.jpg",
    imageAlt: "Похищенная старинная икона в позолоченном окладе",
    description: "Икона деревянная, оклад из металла жёлтого цвета с тиснением, живопись частично утрачена.",
    location: "Ярославская обл., г. Ростов",
    date: "21.05.2025",
    caseNumber: "12501760000004411",
    victim: "Приход храма Св. Николая",
  },
  {
    id: "5",
    code: "ВД-2026-00031",
    name: "Цепь золотая",
    category: "Ювелирные изделия",
    status: "Найдено",
    image: "/stolen-necklace.jpg",
    imageAlt: "Похищенная тонкая золотая цепочка",
    description: "Цепь из металла жёлтого цвета, плетение «панцирное», застёжка — карабин.",
    location: "г. Казань, Вахитовский р-н",
    date: "11.01.2026",
    caseNumber: "12601920002000088",
    victim: "Гарипова Р.Р.",
  },
  {
    id: "6",
    code: "ВД-2025-00945",
    name: "Смартфон",
    category: "Электроника",
    status: "Розыск",
    image: "/stolen-phone.jpg",
    imageAlt: "Похищенный чёрный смартфон",
    description: "Смартфон в корпусе чёрного цвета, на задней крышке царапины, IMEI зафиксирован в карточке учёта.",
    location: "г. Екатеринбург, Ленинский р-н",
    date: "30.09.2025",
    caseNumber: "12501660003007712",
    victim: "Орлов К.Д.",
  },
]

const statusColor: Record<Item["status"], string> = {
  Розыск: "bg-muted/60 font-bold text-primary ring-primary/40",
  Найдено: "bg-muted/70 font-bold text-accent ring-accent/40",
  "На экспертизе": "bg-muted font-bold text-muted-foreground ring-border",
}

interface Props {
  onOpenSuspects: () => void
}

export function StolenPropertySection({ onOpenSuspects }: Props) {
  const [selected, setSelected] = useState<Item | null>(null)

  if (selected) {
    return (
      <article className="rounded-sm border border-border bg-card">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 md:px-6">
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Назад к списку
          </button>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest">
            <span className="text-muted-foreground">Карточка ВД</span>
            <span className="text-foreground">{selected.code}</span>
            <span
              className={`ml-1 rounded-sm px-2 py-0.5 ring-1 ${statusColor[selected.status]}`}
            >
              {selected.status}
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-[minmax(0,1fr)_1.2fr] md:p-6">
          <div className="space-y-3">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-border bg-secondary">
              <Image
                src={selected.image}
                alt={selected.imageAlt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="pointer-events-none absolute left-2 top-2 rounded-sm bg-background/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-foreground ring-1 ring-border">
                Улика № {selected.code}
              </div>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              // Фотофиксация · экспертно-криминалистический отдел
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <h3 className="text-balance font-sans text-xl font-semibold text-foreground md:text-2xl">
                {selected.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{selected.category}</p>
            </div>

            <dl className="grid grid-cols-1 gap-3 rounded-sm border border-border bg-secondary/40 p-4 sm:grid-cols-2">
              <Field
                icon={<Calendar className="h-3.5 w-3.5" />}
                label="Дата хищения"
                value={selected.date}
              />
              <Field
                icon={<MapPin className="h-3.5 w-3.5" />}
                label="Место"
                value={selected.location}
              />
              <Field
                icon={<Hash className="h-3.5 w-3.5" />}
                label="№ уголовного дела"
                value={selected.caseNumber}
              />
              <Field
                icon={<FileBadge className="h-3.5 w-3.5" />}
                label="Потерпевший"
                value={
                  selected.victimDob
                    ? `${selected.victim}, ${selected.victimDob}`
                    : selected.victim
                }
              />
            </dl>

            <div>
              <h4 className="mb-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Описание
              </h4>
              <p className="text-pretty text-sm leading-relaxed text-foreground">
                {selected.description}
              </p>
            </div>

            {selected.details && (
              <div>
                <h4 className="mb-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  Сведения по делу
                </h4>
                <ul className="space-y-1.5">
                  {selected.details.map((d) => (
                    <li
                      key={d}
                      className="flex gap-2 text-sm leading-relaxed text-foreground"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selected.id === "3" && (
              <div className="flex flex-col gap-3 rounded-sm border border-primary/40 bg-primary/10 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <p className="text-pretty text-sm leading-relaxed text-foreground">
                    По данной улике установлено возможное процессуальное лицо.
                    <br className="hidden sm:block" />
                    <span className="text-muted-foreground">
                      Перейдите в раздел «Подозреваемые» для просмотра досье.
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onOpenSuspects}
                  className="shrink-0 rounded-sm bg-primary px-4 py-2 text-center font-mono text-xs uppercase tracking-widest text-primary-foreground ring-1 ring-primary/60 transition-colors hover:bg-primary/90"
                >
                  Открыть подозреваемых →
                </button>
              </div>
            )}
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
            ВД-06 // Учёт похищенного имущества
          </p>
          <h2 className="font-sans text-xl font-semibold text-foreground md:text-2xl">
            Похищенное имущество
          </h2>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Найдено записей: {items.length}
        </span>
      </header>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setSelected(item)}
              className="group flex h-full w-full flex-col overflow-hidden rounded-sm border border-border bg-card text-left transition-colors hover:border-primary/60"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute left-2 top-2 rounded-sm bg-background/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-foreground ring-1 ring-border">
                  {item.code}
                </div>
                <div
                  className={`pointer-events-none absolute right-2 top-2 rounded-sm px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ring-1 ${statusColor[item.status]}`}
                >
                  {item.status}
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-3">
                <div className="font-sans text-sm font-semibold text-foreground">
                  {item.name}
                </div>
                <div className="text-xs text-muted-foreground">{item.category}</div>
                <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  <span>{item.date}</span>
                  <span className="truncate text-right">{item.location}</span>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Field({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {icon}
        {label}
      </dt>
      <dd className="mt-0.5 text-sm text-foreground">{value}</dd>
    </div>
  )
}
