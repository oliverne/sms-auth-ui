export default function validateName(value: string): [boolean, string, string] {
  const formatted = value.replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '')

  const hangulOnly = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g.test(formatted)

  const normalized = formatted

  const valid = hangulOnly && formatted.length >= 2

  return [valid, formatted, normalized]
}
