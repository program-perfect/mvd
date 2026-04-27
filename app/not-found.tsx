import { AlertTriangle, ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground">
      <section className="mvd-stripe w-full max-w-2xl rounded-sm border border-border bg-card/90 p-5 shadow-sm sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 text-primary">
            <Shield className="h-5 w-5" aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              МВД России · АИС «ЕИТКС»
            </p>
            <h1 className="truncate text-lg font-semibold text-foreground sm:text-xl">
              Раздел базы не найден
            </h1>
          </div>
        </div>

        <div className="rounded-sm border border-border/70 bg-secondary/40 p-4">
          <div className="mb-3 flex items-center gap-2 text-primary">
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            <p className="font-mono text-[11px] uppercase tracking-widest">
              Ошибка 404 // несуществующий маршрут
            </p>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            Запрошенный служебный раздел отсутствует в текущем контуре доступа
            или был перемещён. Проверьте адрес страницы либо вернитесь в основной
            раздел базы оперативного учёта.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Код события: 404 · Доступ к разделу не подтверждён
          </div>

          <Link
            href="./"
            prefetch={false}
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-primary/50 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Вернуться в базу
          </Link>
        </div>
      </section>
    </main>
  )
}