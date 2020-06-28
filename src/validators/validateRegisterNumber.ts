export default function validateRegisterNumber(
  value: string
): [boolean, string, string] {
  const onlyNumber = value.replace(/\D+/g, '')

  let formatted = onlyNumber

  if (onlyNumber.length > 6) {
    const first = onlyNumber.slice(0, 6)
    const last = onlyNumber.slice(6)
    formatted = `${first}-${last}`.slice(0, 8)
  }

  const valid = /\d\d\d\d\d\d-\d/.test(formatted)

  const normalized = formatted.replace(/-/g, '')

  return [valid, formatted, normalized]
}
