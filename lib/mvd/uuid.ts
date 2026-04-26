/**
 * Детерминированный UUIDv4-подобный генератор на основе seed-строки.
 *
 * Используется вместо crypto.randomUUID(), чтобы избежать hydration-mismatch:
 * один и тот же seed на сервере и клиенте даёт ровно один и тот же UUID.
 *
 * Алгоритм: FNV-1a → xorshift32 RNG → форматирование в UUID v4.
 */

function fnv1a(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function xorshift32(seed: number) {
  let s = seed | 0;
  if (s === 0) s = 0x9e3779b9;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (s >>> 0).toString(16).padStart(8, "0");
  };
}

/** Детерминированный UUIDv4 на основе seed (xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx). */
export function deterministicUuid(seed: string): string {
  const rng = xorshift32(fnv1a(seed));
  const a = rng();
  const b = rng().slice(0, 4);
  const c = "4" + rng().slice(0, 3); // версия 4
  const variant = (parseInt(rng().slice(0, 4), 16) & 0x3fff) | 0x8000; // вариант (10xx)
  const d = variant.toString(16).padStart(4, "0");
  const e = (rng() + rng()).slice(0, 12);
  return `${a}-${b}-${c}-${d}-${e}`;
}

/** Короткий 8-символьный идентификатор для URL и значков. */
export function shortId(seed: string): string {
  return deterministicUuid(seed).slice(0, 8);
}

/** Slug формата `<prefix>-<shortid>` — например, `news-7f3a9b2c`. */
export function makeSlug(prefix: string, seed: string): string {
  return `${prefix}-${shortId(seed)}`;
}
