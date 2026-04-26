import { AlertTriangle, Crosshair, FileText, Gavel, Package, Users, UserSearch, type LucideIcon } from "lucide-react";
import { deterministicUuid, makeSlug } from "./uuid";

export type SectionId = "wanted" | "news" | "crime" | "criminals" | "suspects" | "property" | "weapons";

export type SectionMeta = {
  id: SectionId;
  title: string;
  subtitle: string;
  /** Внутренний код подразделения (например, ФР-01). */
  code: string;
  icon: LucideIcon;
  /** Имитация количества записей в БД для отображения в навигации. */
  count: string;
  /** UUID v4 раздела — стабильный, генерируется детерминированно. */
  uuid: string;
  /** URL-slug раздела — например, `wanted-7f3a9b2c`. */
  slug: string;
};

const RAW: Omit<SectionMeta, "uuid" | "slug">[] = [
  {
    id: "wanted",
    title: "Розыск",
    subtitle: "Лица в федеральном розыске",
    code: "ФР-01",
    icon: AlertTriangle,
    count: "12 487",
  },
  {
    id: "news",
    title: "Сводки",
    subtitle: "Оперативные сводки за сутки",
    code: "СВ-02",
    icon: FileText,
    count: "342",
  },
  {
    id: "crime",
    title: "Преступление",
    subtitle: "Зарегистрированные дела",
    code: "ПР-03",
    icon: Gavel,
    count: "8 156",
  },
  {
    id: "criminals",
    title: "Преступники",
    subtitle: "Осуждённые / отбывают наказание",
    code: "ОС-04",
    icon: Users,
    count: "54 902",
  },
  {
    id: "suspects",
    title: "Подозреваемые",
    subtitle: "Лица, проходящие по делам",
    code: "ПД-05",
    icon: UserSearch,
    count: "1 273",
  },
  {
    id: "property",
    title: "Похищенное имущество",
    subtitle: "Учёт вещественных доказательств",
    code: "ВД-06",
    icon: Package,
    count: "27 619",
  },
  {
    id: "weapons",
    title: "Оружие",
    subtitle: "Огнестрельное и холодное",
    code: "ОР-07",
    icon: Crosshair,
    count: "3 481",
  },
];

export const SECTIONS: SectionMeta[] = RAW.map((s) => ({
  ...s,
  uuid: deterministicUuid(`section:${s.id}`),
  slug: makeSlug(s.id, `section:${s.id}`),
}));

/** Найти раздел по slug (или по id). */
export function findSection(slug: string | null | undefined): SectionMeta | undefined {
  if (!slug) return undefined;
  return SECTIONS.find((s) => s.slug === slug || s.id === slug);
}

export const DEFAULT_SECTION: SectionMeta = SECTIONS.find((s) => s.id === "property") ?? SECTIONS[0];
