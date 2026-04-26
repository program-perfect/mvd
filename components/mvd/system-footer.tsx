"use client"

import {
  Building2,
  FileLock2,
  Mail,
  MapPin,
  Phone,
  ScrollText,
  ServerCog,
  ShieldAlert,
} from "lucide-react"
import { SessionCode } from './session-code'

const contacts = [
  { label: "Дежурная часть (круглосуточно)", value: "102", icon: Phone },
  { label: "Единый номер экстренных служб", value: "112", icon: Phone },
  { label: "Телефон доверия МВД РФ", value: "8 (800) 222-74-47", icon: Phone },
  { label: "Канцелярия (служебный)", value: "вн. 04-217-00", icon: Mail },
]

const departments = [
  { code: "УУР", name: "Уголовный розыск" },
  { code: "ГУЭБиПК", name: "Экономическая безопасность" },
  { code: "ГИБДД", name: "Безопасность дорожного движения" },
  { code: "УВМ", name: "Вопросы миграции" },
  { code: "ЭКЦ", name: "Экспертно-криминалистический центр" },
  { code: "ГУНК", name: "Контроль за оборотом наркотиков" },
  { code: "ГУСБ", name: "Собственная безопасность" },
  { code: "ОПС", name: "Патрульно-постовая служба" },
]

const legal = [
  "Конституция Российской Федерации",
  "Федеральный закон № 3-ФЗ «О полиции»",
  "Уголовный кодекс Российской Федерации",
  "Уголовно-процессуальный кодекс РФ",
  "Приказ МВД России № 615 от 20.06.2012",
  "Приказ МВД России № 720 ДСП",
]

const technical = [
  { label: "Версия АИС", value: "ЕИТКС 4.18.221-r2" },
  { label: "Сегмент сети", value: "СПД-МВД / DMZ-04" },
  { label: "Узел", value: "MOW-DC-04 / стойка R-12" },
  { label: "Сертификат", value: "КриптоПро CSP 5.0" },
  { label: "Контур", value: "Закрытый, ДСП" },
  { label: "Журналирование", value: "ЕС МВД-Аудит, активно" },
]

export function SystemFooter() {
  return (
    <footer className="mt-8 border-t border-border bg-card/60">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
        {/* Основной грид */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Контакты */}
          <section>
            <FooterTitle icon={Phone}>Связь и дежурные службы</FooterTitle>
            <ul className="space-y-2">
              {contacts.map((c) => {
                const Icon = c.icon
                return (
                  <li key={c.label} className="flex items-start gap-2">
                    <Icon
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {c.label}
                      </div>
                      <div className="font-mono text-sm font-semibold tabular-nums text-foreground">
                        {c.value}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>

          {/* Подразделения */}
          <section>
            <FooterTitle icon={Building2}>Структурные подразделения</FooterTitle>
            <ul className="grid grid-cols-1 gap-1.5 xs:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
              {departments.map((d) => (
                <li
                  key={d.code}
                  className="flex items-baseline gap-2 border-l-2 border-border pl-2"
                >
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-accent">
                    {d.code}
                  </span>
                  <span className="text-pretty text-xs text-muted-foreground">
                    {d.name}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Правовая база */}
          <section>
            <FooterTitle icon={ScrollText}>Нормативно-правовая база</FooterTitle>
            <ul className="space-y-1.5">
              {legal.map((doc) => (
                <li key={doc} className="flex items-start gap-2">
                  <FileLock2
                    className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <span className="text-pretty text-xs text-muted-foreground">
                    {doc}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Технические данные */}
          <section>
            <FooterTitle icon={ServerCog}>Технические сведения</FooterTitle>
            <dl className="space-y-1.5">
              {technical.map((t) => (
                <div
                  key={t.label}
                  className="flex flex-col gap-0.5 border-b border-dashed border-border/70 pb-1.5 last:border-0 last:pb-0"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {t.label}
                  </dt>
                  <dd className="font-mono text-xs text-foreground">{t.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        {/* Юридический адрес */}
        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-border pt-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start gap-2">
            <MapPin
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Центральный аппарат МВД России
              </div>
              <div className="text-pretty text-xs text-foreground">
                119049, г. Артемьевск, ул. Житная, д. 16
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <ShieldAlert
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Класс защиты
              </div>
              <div className="text-pretty text-xs text-foreground">
                ИСПДн К1 · ГИС 1-го класса · ФСТЭК России
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FileLock2
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Гриф
              </div>
              <div className="text-pretty text-xs text-foreground">
                Документ для служебного пользования (ДСП)
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя строка */}
        <div className="mt-6 flex flex-col gap-2 border-t border-border pt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} МВД РФ · Все права защищены
          </span>
          <span className="text-pretty">
            Несанкционированный доступ преследуется по ст. 272–274 УК РФ
          </span>
          <span className="text-foreground">
            Сессия: <SessionCode />
          </span>
        </div>
      </div>
    </footer>
  )
}

function FooterTitle({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  children: React.ReactNode
}) {
  return (
    <h3 className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-foreground">
      <Icon className="h-3.5 w-3.5 text-accent" aria-hidden />
      {children}
    </h3>
  )
}
