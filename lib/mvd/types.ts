/**
 * Общие типы для оперативных карточек.
 * Соответствуют текущему виду seed-файлов (crimes-data, criminals-data, wanted-data).
 *
 * Поле `city` — опциональное; реальный город получают через
 * helper `deriveCity()` из `lib/mvd/cities`, чтобы не править все
 * исходные записи (некоторые умышленно идут не в Артемьевске).
 */

export type CrimeStatus =
  | "Возбуждено"
  | "Расследуется"
  | "Приостановлено"
  | "Направлено в суд"
  | "Прекращено"

export type CrimeRecord = {
  id: string
  regNumber: string
  date: string
  place: string
  district: string
  article: string
  qualification: string
  type: string
  fabula: string
  status: CrimeStatus
  investigator: string
  damage: string
  victim: string
  suspectIds: string[]
  propertyIds: string[]
  weaponIds: string[]
  uuid: string
  /** Город — опциональный; если не задан, выводится через deriveCity(place). */
  city?: string
}

export type CriminalRecord = {
  id: string
  regNumber: string
  fio: string
  birth: string
  photo: string
  article: string
  crimeType: string
  sentence: string
  facility: string
  startDate: string
  endDate: string
  recidivist: boolean
  status: string
  uuid: string
  /** Город — опциональный; если не задан, выводится через deriveCity(facility). */
  city?: string
}

export type WantedRecord = {
  id: string
  regNumber: string
  fio: string
  birth: string
  photo?: string
  article: string
  crimeType: string
  charge: string
  lastSeen: string
  date: string
  category: string
  danger: string
  features: string
  uuid: string
  /** Город — опциональный; если не задан, выводится через deriveCity(lastSeen). */
  city?: string
}
