import Image from "next/image"
import { AlertTriangle, MapPin, Calendar } from "lucide-react"

type WantedPerson = {
  id: string
  fio: string
  birth: string
  photo: string
  article: string
  charge: string
  lastSeen: string
  date: string
  category: "Федеральный" | "Межгосударственный" | "Местный"
  danger: "Особо опасен" | "Опасен" | "Без отметки"
}

const persons: WantedPerson[] = [
  {
    id: "ФР-2026-00184",
    fio: "Берестов Игнат Тимурович",
    birth: "14.03.1987",
    photo: "/wanted-1.jpg",
    article: "ст. 105 ч. 2 УК РФ",
    charge: "Убийство, совершённое группой лиц",
    lastSeen: "г. Тверь, ул. Заводская",
    date: "11.02.2026",
    category: "Федеральный",
    danger: "Особо опасен",
  },
  {
    id: "ФР-2026-00211",
    fio: "Качанов Артём Витальевич",
    birth: "02.09.1996",
    photo: "/wanted-2.jpg",
    article: "ст. 162 ч. 4 УК РФ",
    charge: "Разбой с применением оружия",
    lastSeen: "г. Воронеж, мкр. Северный",
    date: "27.02.2026",
    category: "Федеральный",
    danger: "Опасен",
  },
  {
    id: "МР-2025-04417",
    fio: "Лисовская Дарья Кирилловна",
    birth: "20.06.1985",
    photo: "/wanted-3.jpg",
    article: "ст. 159 ч. 4 УК РФ",
    charge: "Мошенничество в особо крупном размере",
    lastSeen: "Республика Беларусь, г. Гомель",
    date: "08.12.2025",
    category: "Межгосударственный",
    danger: "Без отметки",
  },
  {
    id: "ФР-2025-09902",
    fio: "Подымов Олег Святославович",
    birth: "30.11.1971",
    photo: "/wanted-4.jpg",
    article: "ст. 228.1 ч. 5 УК РФ",
    charge: "Сбыт наркотических средств в организованной группе",
    lastSeen: "г. Самара, Промышленный р-н",
    date: "19.10.2025",
    category: "Федеральный",
    danger: "Особо опасен",
  },
]

const dangerStyles: Record<WantedPerson["danger"], string> = {
  "Особо опасен": "border-destructive/60 bg-destructive/10 text-destructive",
  "Опасен": "border-primary/60 bg-primary/10 text-primary",
  "Без отметки": "border-border bg-secondary text-muted-foreground",
}

export function WantedSection() {
  return (
    <section>
      <header className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            ФР-01 // Раздел базы
          </p>
          <h2 className="font-sans text-xl font-semibold text-foreground md:text-2xl">
            Розыск
          </h2>
          <p className="mt-1 max-w-prose text-sm text-muted-foreground">
            Лица, объявленные в федеральный и межгосударственный розыск. Сведения
            предназначены только для служебного пользования.
          </p>
        </div>
        <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Активных ориентировок: {persons.length}
        </div>
      </header>

      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {persons.map((p) => (
          <li
            key={p.id}
            className="flex gap-4 rounded-sm border border-border bg-card p-3"
          >
            <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded-sm bg-secondary ring-1 ring-border">
              <Image
                src={p.photo || "/placeholder.svg"}
                alt={`Фото ${p.fio}`}
                fill
                sizes="96px"
                className="object-cover grayscale"
              />
              <span className="absolute left-1 top-1 rounded-sm bg-background/80 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-foreground">
                {p.id}
              </span>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="truncate font-sans text-sm font-semibold text-foreground">
                    {p.fio}
                  </h3>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    Дата рождения: {p.birth}
                  </p>
                </div>
                <span
                  className={`flex items-center gap-1 rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${dangerStyles[p.danger]}`}
                >
                  <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                  {p.danger}
                </span>
              </div>

              <div className="space-y-1 text-xs text-muted-foreground">
                <p>
                  <span className="font-mono text-foreground">{p.article}</span>{" "}
                  — {p.charge}
                </p>
                <p className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" aria-hidden="true" />
                  {p.lastSeen}
                </p>
                <p className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" aria-hidden="true" />
                  Объявлен в розыск: {p.date}
                </p>
              </div>

              <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>{p.category} розыск</span>
                <span className="text-primary">Связаться: 02 / 102</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
