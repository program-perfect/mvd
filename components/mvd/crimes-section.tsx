import { FileText, MapPin, Calendar } from "lucide-react"

type Crime = {
  id: string
  date: string
  place: string
  article: string
  qualification: string
  fabula: string
  status: "Возбуждено" | "Расследуется" | "Приостановлено" | "Направлено в суд"
  investigator: string
}

const crimes: Crime[] = [
  {
    id: "ПР-2022-МО-04711",
    date: "06.08.2022",
    place: "г. Артемьевск, СНТ «Берёзка»",
    article: "ст. 158 ч. 3 п. «а» УК РФ",
    qualification: "Кража, совершённая с незаконным проникновением в жилище",
    fabula:
      "В период с 03.08 по 06.08.2022 неустановленное лицо, путём свободного доступа через окно, проникло в дом потерпевшей Н., откуда тайно похитило ювелирные изделия, в том числе кольцо из жёлтого металла со вставкой красного цвета. Ущерб установлен на сумму 184 000 руб.",
    status: "Направлено в суд",
    investigator: "следователь СО ОМВД по г.о. Артемьевск",
  },
  {
    id: "ПР-2026-77-00214",
    date: "29.01.2026",
    place: "г. Москва, ЦАО, ул. Покровка",
    article: "ст. 161 ч. 2 УК РФ",
    qualification: "Грабёж, совершённый группой лиц по предварительному сговору",
    fabula:
      "Двое неустановленных лиц, под предлогом уточнения времени, нанесли удар прохожему и открыто похитили рюкзак с ноутбуком. Введён план «Перехват», изъяты записи с уличных камер.",
    status: "Расследуется",
    investigator: "СО ОМВД по Басманному району",
  },
  {
    id: "ПР-2025-66-01893",
    date: "12.11.2025",
    place: "Свердловская обл., г. Реж",
    article: "ст. 159 ч. 3 УК РФ",
    qualification: "Мошенничество в крупном размере",
    fabula:
      "Неустановленное лицо, представившись сотрудником банка, под предлогом «защиты счёта» убедило потерпевшую перевести денежные средства в сумме 1 240 000 руб. на счёт «безопасного хранения».",
    status: "Приостановлено",
    investigator: "СО МО МВД «Режевской»",
  },
  {
    id: "ПР-2026-78-00057",
    date: "18.02.2026",
    place: "г. Санкт-Петербург, Выборгский р-н",
    article: "ст. 166 ч. 1 УК РФ",
    qualification: "Неправомерное завладение автомобилем без цели хищения",
    fabula:
      "Неустановленное лицо, разбив форточку а/м «Хёндэ Солярис», завладело транспортным средством и оставило его в 2 км от места угона со следами повреждений.",
    status: "Возбуждено",
    investigator: "СО ОМВД по Выборгскому району",
  },
]

const statusStyles: Record<Crime["status"], string> = {
  "Возбуждено": "border-primary/60 bg-primary/10 text-primary",
  "Расследуется": "border-primary/60 bg-primary/10 text-primary",
  "Приостановлено": "border-border bg-secondary text-muted-foreground",
  "Направлено в суд": "border-destructive/50 bg-destructive/10 text-destructive",
}

export function CrimesSection() {
  return (
    <section>
      <header className="mb-4">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          ПР-03 // Раздел базы
        </p>
        <h2 className="font-sans text-xl font-semibold text-foreground md:text-2xl">
          Преступление — учёт уголовных дел
        </h2>
        <p className="mt-1 max-w-prose text-sm text-muted-foreground">
          Зарегистрированные уголовные дела: фабула, квалификация по УК РФ,
          текущий статус расследования.
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {crimes.map((c) => (
          <li
            key={c.id}
            className="flex flex-col gap-3 rounded-sm border border-border bg-card p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Уголовное дело
                </p>
                <p className="font-mono text-sm font-semibold text-foreground">
                  {c.id}
                </p>
              </div>
              <span
                className={`rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${statusStyles[c.status]}`}
              >
                {c.status}
              </span>
            </div>

            <div className="space-y-1 text-xs text-muted-foreground">
              <p className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" aria-hidden="true" />
                Дата регистрации: {c.date}
              </p>
              <p className="flex items-start gap-1.5">
                <MapPin className="mt-0.5 h-3 w-3 flex-shrink-0" aria-hidden="true" />
                {c.place}
              </p>
            </div>

            <div className="rounded-sm border border-border/60 bg-secondary/40 p-3">
              <p className="font-mono text-[11px] uppercase tracking-widest text-foreground">
                {c.article}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {c.qualification}
              </p>
            </div>

            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Фабула
              </p>
              <p className="text-pretty text-sm leading-relaxed text-foreground">
                {c.fabula}
              </p>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <FileText className="h-3 w-3" aria-hidden="true" />
                {c.investigator}
              </span>
              <span>ДСП</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
