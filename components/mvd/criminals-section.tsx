import Image from "next/image"

type Criminal = {
  id: string
  fio: string
  birth: string
  photo: string
  article: string
  sentence: string
  facility: string
  startDate: string
  endDate: string
  recidivist: boolean
}

const criminals: Criminal[] = [
  {
    id: "ОС-2024-11428",
    fio: "Татарников Денис Романович",
    birth: "07.05.1989",
    photo: "/convict-1.jpg",
    article: "ст. 161 ч. 2 УК РФ",
    sentence: "5 лет лишения свободы, общий режим",
    facility: "ИК-6 ГУФСИН по Иркутской обл.",
    startDate: "12.04.2024",
    endDate: "11.04.2029",
    recidivist: true,
  },
  {
    id: "ОС-2025-02214",
    fio: "Шергунов Всеволод Маркович",
    birth: "23.10.1979",
    photo: "/convict-2.jpg",
    article: "ст. 228 ч. 2 УК РФ",
    sentence: "4 года лишения свободы, общий режим",
    facility: "ИК-3 УФСИН по Тульской обл.",
    startDate: "08.07.2025",
    endDate: "07.07.2029",
    recidivist: false,
  },
  {
    id: "ОС-2025-08772",
    fio: "Ялымов Фёдор Иванович",
    birth: "30.01.1999",
    photo: "/convict-3.jpg",
    article: "ст. 158 ч. 2 УК РФ",
    sentence: "2 года 6 мес. лишения свободы, общий режим",
    facility: "ИК-9 ГУФСИН по Кемеровской обл.",
    startDate: "21.09.2025",
    endDate: "20.03.2028",
    recidivist: false,
  },
  {
    id: "ОС-2022-МО-04711-1",
    fio: "Крылов Николай Андреевич",
    birth: "—",
    photo: "/suspect-front.png",
    article: "ст. 158 ч. 3 УК РФ",
    sentence: "4 года лишения свободы, общий режим",
    facility: "ИК-3 УФСИН по г. Артемьевск",
    startDate: "—",
    endDate: "—",
    recidivist: true,
  },
]

export function CriminalsSection() {
  return (
    <section>
      <header className="mb-4">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          ОС-04 // Раздел базы
        </p>
        <h2 className="font-sans text-xl font-semibold text-foreground md:text-2xl">
          Преступники — учёт осуждённых
        </h2>
        <p className="mt-1 max-w-prose text-sm text-muted-foreground">
          Лица, в отношении которых вынесен обвинительный приговор и приговор
          вступил в законную силу.
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-2">
        {criminals.map((c) => (
          <li
            key={c.id}
            className="flex gap-4 rounded-sm border border-border bg-card p-3"
          >
            <div className="relative h-36 w-28 flex-shrink-0 overflow-hidden rounded-sm bg-secondary ring-1 ring-border">
              <Image
                src={c.photo || "/placeholder.svg"}
                alt={`Фото ${c.fio}`}
                fill
                sizes="112px"
                className="object-cover grayscale"
              />
              <span className="absolute left-1 top-1 rounded-sm bg-background/80 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-foreground">
                {c.id}
              </span>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div>
                <h3 className="font-sans text-sm font-semibold text-foreground">
                  {c.fio}
                </h3>
                <p className="font-mono text-[11px] text-muted-foreground">
                  Дата рождения: {c.birth}
                </p>
              </div>

              <div className="rounded-sm border border-border/60 bg-secondary/40 p-2">
                <p className="font-mono text-[11px] uppercase tracking-widest text-foreground">
                  {c.article}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {c.sentence}
                </p>
              </div>

              <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                <dt className="text-muted-foreground">Учреждение</dt>
                <dd className="text-right text-foreground">{c.facility}</dd>
                <dt className="text-muted-foreground">Начало срока</dt>
                <dd className="text-right font-mono text-foreground">
                  {c.startDate}
                </dd>
                <dt className="text-muted-foreground">Окончание срока</dt>
                <dd className="text-right font-mono text-foreground">
                  {c.endDate}
                </dd>
              </dl>

              <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-2 font-mono text-[10px] uppercase tracking-widest">
                <span className="text-muted-foreground">Статус</span>
                <span
                  className={
                    c.recidivist
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }
                >
                  {c.recidivist ? "Ранее судим" : "Судимость впервые"}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
