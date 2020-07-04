import validatePhoneNumber from '../validatePhoneNumber'

describe('전화번호 검증', () => {
  it('가운데 3자리', () => {
    const [valid, formatted, normalized] = validatePhoneNumber('0101234567')

    expect(valid).toBe(true)
    expect(formatted).toBe('010 123 4567')
    expect(normalized).toBe('0101234567')
  })

  it('가운데 4자리', () => {
    const [valid, formatted, normalized] = validatePhoneNumber('01012345678')

    expect(valid).toBe(true)
    expect(formatted).toBe('010 1234 5678')
    expect(normalized).toBe('01012345678')
  })

  it('틀린 값들', () => {
    expect(validatePhoneNumber(null as any)[0]).toBe(false)
    expect(validatePhoneNumber('')[0]).toBe(false)
    expect(validatePhoneNumber('  ')[0]).toBe(false)
    expect(validatePhoneNumber('  010')[0]).toBe(false)
    expect(validatePhoneNumber('010')[0]).toBe(false)
    expect(validatePhoneNumber('0101')[0]).toBe(false)
    expect(validatePhoneNumber('0101234')[0]).toBe(false)
    expect(validatePhoneNumber('01012345')[0]).toBe(false)
    expect(validatePhoneNumber('010123451283172948712984')[0]).toBe(false)
    expect(validatePhoneNumber('AAABBBBCCCC')[0]).toBe(false)
  })
})
