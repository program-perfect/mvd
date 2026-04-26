/**
 * Города. Артемьевск — основной (вымышленный) город сайта.
 * При первом заходе всегда выставляется Артемьевск; пользовательский
 * выбор хранится в куки и сбрасывается через 10 минут.
 */

export const PRIMARY_CITY = "Артемьевск"
export const ALL_CITIES_LABEL = "Все города"

/** Список доступных городов в селекторе (Артемьевск всегда первый). */
export const CITIES = [
  PRIMARY_CITY,
  "Москва",
  "Санкт-Петербург",
  "Екатеринбург",
  "Новосибирск",
  "Казань",
  "Нижний Новгород",
  "Самара",
  "Ростов-на-Дону",
  "Краснодар",
  "Воронеж",
  "Тюмень",
  "Подольск",
  "Балашиха",
  "Сочи",
  "Тольятти",
  "Энгельс",
  "Истра",
] as const

export type CityName = (typeof CITIES)[number] | string

const COOKIE = "mvd_city"
const COOKIE_TTL_SECONDS = 10 * 60 // 10 минут

export function readCityCookie(): string | null {
  if (typeof document === "undefined") return null
  const m = document.cookie.match(/(?:^|;\s*)mvd_city=([^;]+)/)
  if (!m) return null
  try {
    return decodeURIComponent(m[1])
  } catch {
    return null
  }
}

export function writeCityCookie(city: string): void {
  if (typeof document === "undefined") return
  document.cookie = `${COOKIE}=${encodeURIComponent(city)}; path=/; max-age=${COOKIE_TTL_SECONDS}; samesite=lax`
}

/** Сортирует список так, чтобы Артемьевск всегда был первым. */
export function withPrimaryFirst(values: string[]): string[] {
  const set = new Set(values.filter(Boolean))
  set.delete(PRIMARY_CITY)
  return [PRIMARY_CITY, ...Array.from(set).sort((a, b) => a.localeCompare(b, "ru"))]
}

/**
 * Извлекает город из текстового поля карточки (place / lastSeen / facility).
 * Используется компонентами для фильтрации без правки seed-файлов.
 */
export function deriveCity(record: {
  city?: string
  place?: string
  lastSeen?: string
  facility?: string
}): string {
  if (record.city) return record.city
  const text = record.place ?? record.lastSeen ?? record.facility ?? ""
  if (!text) return "—"
  if (text.includes(PRIMARY_CITY)) return PRIMARY_CITY
  // "г. Xxx", "г.о. Xxx", "г.Xxx"
  const m1 = text.match(/г\.\s*о?\.?\s*([А-ЯЁ][а-яё-]+)/u)
  if (m1) return m1[1]
  // "Xxx обл." / "Xxx область" — берём первое слово как регион (запасной вариант)
  return "—"
}
