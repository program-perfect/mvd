/**
 * Имитация сеансовых артефактов защищённой сессии.
 * Используется загрузочным экраном.
 *
 * Только для UI-стенда: настоящих криптоопераций здесь нет.
 */

const ALPH = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"

function rid(len = 4): string {
  let out = ""
  for (let i = 0; i < len; i++) {
    out += ALPH[Math.floor(Math.random() * ALPH.length)]
  }
  return out
}

/** Идентификатор сессии вида SES-XXXX-XXXX-XXXX-XXXX. */
export function generateSessionId(): string {
  return `SES-${rid(4)}-${rid(4)}-${rid(4)}-${rid(4)}`
}

/** Имитация AES-256-GCM ключа в hex (64 символа). */
export function generateCipherKey(): string {
  let out = ""
  for (let i = 0; i < 32; i++) {
    out += Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0")
  }
  return out
}

/** Имитация SHA-256 отпечатка модуля (64 hex символа). */
export function generateFingerprint(): string {
  return generateCipherKey()
}
