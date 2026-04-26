import { deterministicUuid, shortId } from "./uuid"

export type ReportType =
  | "Кража"
  | "Грабёж"
  | "Разбой"
  | "ДТП"
  | "Хулиганство"
  | "Пропажа"
  | "Угон"
  | "Мошенничество"
  | "Наркотики"
  | "Бытовое"
  | "Пожар"
  | "Задержание"
  | "Проверка"
  | "Вызов"

export type ReportStatus =
  | "Принято"
  | "В работе"
  | "Зарегистрировано"
  | "Выезд наряда"
  | "Передано в СК"
  | "Передано в дознание"
  | "Закрыто"

export type ReportPriority = "Срочно" | "Высокий" | "Обычный" | "Низкий"

export type Report = {
  /** Регистрационный номер (например, СВ-2026-03-14-001). */
  id: string
  /** UUIDv4 записи. */
  uuid: string
  /** Короткий идентификатор для URL/бейджей. */
  short: string
  time: string
  district: string
  type: ReportType
  text: string
  status: ReportStatus
  priority: ReportPriority
  responder: string
}

const districts = [
  "ОМВД по Заволжскому р-ну",
  "ОМВД по Центральному р-ну",
  "ОМВД по Октябрьскому р-ну",
  "ОМВД по Кировскому р-ну",
  "ОМВД по Заречному р-ну",
  "ОМВД по Ленинскому р-ну",
  "ОМВД по Советскому р-ну",
  "ОМВД по Промышленному р-ну",
  "ОМВД по Железнодорожному р-ну",
  "ОМВД по Сормовскому р-ну",
  "ОМВД по Автозаводскому р-ну",
  "ОГИБДД (ДТП)",
  "ЛО МВД на ст. «Северная»",
  "УМВД (ОУР)",
  "Дежурная часть УМВД",
] as const

const responders = [
  "ППС-12",
  "ППС-04",
  "ППС-21",
  "ОУР",
  "ГНК",
  "Следственная группа",
  "Дознаватель",
  "ОГИБДД",
  "ЭКО",
  "ГНР-3",
  "Дежурный наряд",
  "ОВО",
] as const

type Template = {
  type: ReportType
  text: string
  defaultStatus: ReportStatus
  defaultPriority: ReportPriority
}

const templates: Template[] = [
  { type: "Кража", text: "Заявление о хищении автомагнитолы из а/м «Лада Гранта», ул. Молодёжная, 17. Признаков взлома не установлено.", defaultStatus: "В работе", defaultPriority: "Обычный" },
  { type: "Кража", text: "Хищение велосипеда из подъезда дома по ул. Садовой, 9. Опрошены жильцы, изъяты следы.", defaultStatus: "Зарегистрировано", defaultPriority: "Низкий" },
  { type: "Кража", text: "Тайное хищение мобильного телефона у посетителя кафе на пр. Ленина. Изъята запись с камер.", defaultStatus: "В работе", defaultPriority: "Обычный" },
  { type: "Кража", text: "Кража имущества из гаражного кооператива «Восток-3». Замок взломан с применением монтировки.", defaultStatus: "Принято", defaultPriority: "Обычный" },
  { type: "Грабёж", text: "Открытое хищение мобильного телефона у гр-на Е. на остановке «Парк Победы». Приметы нападавшего переданы патрулям.", defaultStatus: "В работе", defaultPriority: "Высокий" },
  { type: "Грабёж", text: "Двое неустановленных лиц вырвали сумку у потерпевшей на ул. Восточной. Введён план «Перехват».", defaultStatus: "Выезд наряда", defaultPriority: "Срочно" },
  { type: "Разбой", text: "Нападение на курьера в подъезде с применением предмета, похожего на нож. Похищена выручка.", defaultStatus: "Передано в СК", defaultPriority: "Срочно" },
  { type: "ДТП", text: "Столкновение двух транспортных средств на 18 км трассы М-9. Пострадавших нет, оформление по европротоколу.", defaultStatus: "Закрыто", defaultPriority: "Низкий" },
  { type: "ДТП", text: "Наезд на пешехода на нерегулируемом переходе. Пострадавший госпитализирован.", defaultStatus: "В работе", defaultPriority: "Высокий" },
  { type: "ДТП", text: "Столкновение трёх ТС на кольцевой развязке. Образовался затор протяжённостью 2 км.", defaultStatus: "Выезд наряда", defaultPriority: "Высокий" },
  { type: "Хулиганство", text: "Группа из 3-х лиц повредила фасад магазина по адресу пр. Ленина, 42. Изъята запись с камер видеонаблюдения.", defaultStatus: "Зарегистрировано", defaultPriority: "Обычный" },
  { type: "Хулиганство", text: "Нарушение тишины в ночное время, ул. Чкалова, 18. Составлены протоколы по ст. 20.1 КоАП.", defaultStatus: "Закрыто", defaultPriority: "Низкий" },
  { type: "Пропажа", text: "Заявление о безвестном отсутствии несовершеннолетнего, 14 лет. Ушёл из дома утром, на связь не выходит.", defaultStatus: "В работе", defaultPriority: "Срочно" },
  { type: "Пропажа", text: "Заявление о пропаже пенсионерки, страдающей нарушениями памяти. Объявлен поиск по району.", defaultStatus: "В работе", defaultPriority: "Высокий" },
  { type: "Угон", text: "Угон а/м «Тойота Камри» белого цвета от ТЦ «Радуга». Введён план «Перехват» на территории района.", defaultStatus: "Передано в СК", defaultPriority: "Срочно" },
  { type: "Угон", text: "Угон скутера от двора жилого дома. Изъята видеозапись, установлен предполагаемый маршрут.", defaultStatus: "Зарегистрировано", defaultPriority: "Обычный" },
  { type: "Мошенничество", text: "Заявление о мошенничестве с использованием телефонного звонка под видом «службы безопасности банка». Ущерб 320 000 руб.", defaultStatus: "В работе", defaultPriority: "Высокий" },
  { type: "Мошенничество", text: "Мошенничество в сети «Интернет», под предлогом продажи строительной техники. Ущерб 145 000 руб.", defaultStatus: "Зарегистрировано", defaultPriority: "Обычный" },
  { type: "Наркотики", text: "Изъятие свёртка с веществом светлого цвета у задержанного, ул. Гагарина. Назначено химическое исследование.", defaultStatus: "Передано в дознание", defaultPriority: "Высокий" },
  { type: "Наркотики", text: "Обнаружение тайника-«закладки» на ул. Лесной. Изъято в установленном порядке. Проводятся ОРМ.", defaultStatus: "В работе", defaultPriority: "Высокий" },
  { type: "Бытовое", text: "Семейный конфликт по ул. Парковая, 6. Составлен протокол, выдано предписание о недопустимости.", defaultStatus: "Закрыто", defaultPriority: "Обычный" },
  { type: "Бытовое", text: "Угрозы со стороны соседа в коммунальной квартире. Опрос, направлен материал в дознание.", defaultStatus: "Передано в дознание", defaultPriority: "Обычный" },
  { type: "Пожар", text: "Возгорание в нежилом помещении (подвал). Совместный выезд с МЧС, пострадавших нет.", defaultStatus: "Закрыто", defaultPriority: "Высокий" },
  { type: "Задержание", text: "Задержание лица, находящегося в розыске. Доставлен в дежурную часть для разбирательства.", defaultStatus: "Передано в СК", defaultPriority: "Высокий" },
  { type: "Задержание", text: "Задержание гр. за управление ТС в состоянии алкогольного опьянения, ст. 264.1 УК РФ.", defaultStatus: "Передано в дознание", defaultPriority: "Обычный" },
  { type: "Проверка", text: "Проверка сообщения о подозрительном предмете на остановке. Установлено: хозяйственная сумка, владелец установлен.", defaultStatus: "Закрыто", defaultPriority: "Низкий" },
  { type: "Вызов", text: "Вызов наряда по факту шума и крика в квартире. На месте — семейный конфликт без признаков преступления.", defaultStatus: "Закрыто", defaultPriority: "Низкий" },
]

const dateBase = "2026-03-14"

function pad(n: number) {
  return n.toString().padStart(2, "0")
}

function pick<T>(arr: readonly T[], n: number): T {
  return arr[n % arr.length]
}

function buildReport(index: number): Report {
  const tpl = templates[index % templates.length]
  // Распределяем 60 событий по 24 часам (примерно одно каждые 24 минуты)
  const totalMinutes = Math.floor((index * (24 * 60)) / 60) + ((index * 7) % 24)
  const hh = Math.floor(totalMinutes / 60) % 24
  const mm = totalMinutes % 60
  const time = `${pad(hh)}:${pad(mm)}`
  const idNum = pad(index + 1)
  const id = `СВ-2026-03-14-${idNum.padStart(3, "0")}`
  const seed = `report:${id}`

  // Иногда меняем дефолтный статус, чтобы был полный набор
  const statusVariants: ReportStatus[] = [
    tpl.defaultStatus,
    "Принято",
    "В работе",
    "Зарегистрировано",
    tpl.defaultStatus,
  ]
  const status = pick(statusVariants, index)

  const priorityVariants: ReportPriority[] = [
    tpl.defaultPriority,
    tpl.defaultPriority,
    "Обычный",
    "Высокий",
    "Срочно",
    "Низкий",
  ]
  const priority = pick(priorityVariants, index + 3)

  return {
    id,
    uuid: deterministicUuid(seed),
    short: shortId(seed),
    time,
    district: pick(districts, index + 1),
    type: tpl.type,
    text: tpl.text,
    status,
    priority,
    responder: pick(responders, index + 2),
  }
}

export const REPORTS: Report[] = Array.from({ length: 60 }, (_, i) => buildReport(i)).sort(
  (a, b) => a.time.localeCompare(b.time),
)

export const REPORT_TYPES: ReportType[] = [
  "Кража",
  "Грабёж",
  "Разбой",
  "ДТП",
  "Хулиганство",
  "Пропажа",
  "Угон",
  "Мошенничество",
  "Наркотики",
  "Бытовое",
  "Пожар",
  "Задержание",
  "Проверка",
  "Вызов",
]

export const REPORT_STATUSES: ReportStatus[] = [
  "Принято",
  "В работе",
  "Зарегистрировано",
  "Выезд наряда",
  "Передано в СК",
  "Передано в дознание",
  "Закрыто",
]

export const REPORT_PRIORITIES: ReportPriority[] = ["Срочно", "Высокий", "Обычный", "Низкий"]

export const REPORT_DATE = dateBase
