/**
 * @param value Phone number
 * @return Tuple of [Validated?, Formatted value, Normalized value]
 */
export default function validatePhoneNumber(
  value: string
): [boolean, string, string] {
  if (typeof value !== 'string') return [false, '', '']

  const onlyNumber = value.replace(/\D+/g, '')

  let formatted = onlyNumber

  if (onlyNumber.length > 3) {
    const first = onlyNumber.slice(0, 3)
    const last = onlyNumber.slice(3)
    formatted = `${first} ${last}`
  }

  // 가운데 3자리
  if (onlyNumber.length > 7) {
    const first = onlyNumber.slice(0, 3)
    const mid = onlyNumber.slice(3, 6)
    const last = onlyNumber.slice(6)
    formatted = `${first} ${mid} ${last}`
  }

  // 가운데 4자리
  if (onlyNumber.length > 10) {
    const first = onlyNumber.slice(0, 3)
    const mid = onlyNumber.slice(3, 7)
    const last = onlyNumber.slice(7)
    formatted = `${first} ${mid} ${last}`
  }

  const normalized = formatted.replace(/\s/g, '')

  const len = normalized.length
  const valid = len >= 10 && len <= 11

  return [valid, formatted, normalized]
}
