import { Crosshair, ShieldAlert } from "lucide-react"
import Image from "next/image"

type Weapon = {
  id: string
  type: "Огнестрельное" | "Холодное" | "Травматическое"
  model: string
  caliber: string
  serial: string
  photo: string
  status: "Зарегистрировано" | "Изъято" | "В розыске" | "На экспертизе"
  owner: string
  permit: string
  note: string
}

const weapons: Weapon[] = [
  {
    id: "ОР-2026-001142",
    type: "Огнестрельное",
    model: "Пистолет служебного образца (макет учётный)",
    caliber: "9 мм",
    serial: "АБ№ 0421887",
    photo: "/weapon-pistol.jpg",
    status: "Изъято",
    owner: "Изъято у задержанного по делу ПР-2026-77-00214",
    permit: "Отсутствует",
    note: "Направлено на баллистическую экспертизу. Имеются следы спиленной маркировки.",
  },
  {
    id: "ОР-2024-007789",
    type: "Огнестрельное",
    model: "Карабин охотничий нарезной (учётный)",
    caliber: ".308",
    serial: "ВК№ 1182004",
    photo: "/weapon-rifle.jpg",
    status: "Зарегистрировано",
    owner: "Сорогин Аркадий Прохорович, 1972 г.р.",
    permit: "РОХа № 2241886, действует до 2029 г.",
    note: "Ежегодное продление пройдено. Условия хранения проверены 11.02.2026.",
  },
  {
    id: "ОР-2025-004310",
    type: "Холодное",
    model: "Нож охотничий, фиксированный клинок",
    caliber: "—",
    serial: "Маркировка отсутствует",
    photo: "/weapon-knife.jpg",
    status: "На экспертизе",
    owner: "Изъято при осмотре места происшествия",
    permit: "Не требуется (по сертификату)",
    note: "Назначено криминалистическое исследование на предмет соответствия ГОСТ Р 51215-98.",
  },
  {
    id: "ОР-2023-002201",
    type: "Огнестрельное",
    model: "Ружьё гладкоствольное двуствольное (учётное)",
    caliber: "12 калибр",
    serial: "ГБ№ 0094412",
    photo: "/weapon-shotgun.jpg",
    status: "В розыске",
    owner: "Заявлено как утраченное владельцем 19.07.2025",
    permit: "Аннулировано",
    note: "Внесено в розыскной учёт. При обнаружении немедленно изолировать и доложить дежурному.",
  },
]

const statusStyles: Record<Weapon["status"], string> = {
  "Зарегистрировано": "font-bold border-border bg-secondary text-muted-foreground",
  "Изъято": "bg-muted/70 font-bold border-primary/60 bg-primary/10 text-primary",
  "В розыске": "bg-muted/70 font-bold border-destructive/60 bg-destructive/10 text-destructive",
  "На экспертизе": "bg-muted/70 font-bold border-primary/60 bg-primary/10 text-primary",
}

export function WeaponsSection() {
  return (
    <section>
      <header className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            ОР-07 // Раздел базы
          </p>
          <h2 className="font-sans text-xl font-semibold text-foreground md:text-2xl">
            Оружие — учётный реестр
          </h2>
          <p className="mt-1 max-w-prose text-sm text-muted-foreground">
            Учёт огнестрельного, холодного и травматического оружия. Сведения
            о владельцах, разрешениях и фактах изъятия.
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-sm border border-destructive/40 bg-destructive/10 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-destructive">
          <ShieldAlert className="h-3 w-3" aria-hidden="true" />
          Особо контролируемые сведения
        </div>
      </header>

      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {weapons.map((w) => (
          <li
            key={w.id}
            className="flex flex-col gap-3 rounded-sm border border-border bg-card p-3"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-secondary ring-1 ring-border">
              <Image
                src={w.photo || "/placeholder.svg"}
                alt={`Фото оружия: ${w.model}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              <span className="absolute left-2 top-2 rounded-sm bg-background/80 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-foreground">
                {w.id}
              </span>
              <span
                className={`absolute right-2 top-2 rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${statusStyles[w.status]}`}
              >
                {w.status}
              </span>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span className="inline-flex items-center gap-1 text-foreground">
                  <Crosshair className="h-3 w-3" aria-hidden="true" />
                  {w.type}
                </span>{" "}
                · Калибр: {w.caliber} · S/N: {w.serial}
              </p>
              <h3 className="mt-1 font-sans text-sm font-semibold text-foreground">
                {w.model}
              </h3>
            </div>

            <dl className="grid grid-cols-1 gap-x-3 gap-y-1 text-[12px]">
              <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Владелец / источник
              </dt>
              <dd className="text-foreground">{w.owner}</dd>
              <dt className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Разрешение
              </dt>
              <dd className="font-mono text-foreground">{w.permit}</dd>
              <dt className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Примечание
              </dt>
              <dd className="text-pretty text-muted-foreground">{w.note}</dd>
            </dl>
          </li>
        ))}
      </ul>
    </section>
  )
}
