import validatePhoneNumber from './validatePhoneNumber'
import validateRegisterNumber from './validateRegisterNumber'
import validateName from './validateName'

// TODO: 튜플 타입을 좀더 알기 쉽게 정의할 방법?
export type validateFn = (value: string) => [Boolean, string, string]

export default function getValidator(key: string): validateFn {
  switch (key) {
    case 'phoneNumber':
      return validatePhoneNumber

    case 'registerNumber':
      return validateRegisterNumber

    case 'name':
      return validateName

    // 아무일도 하지 않는 검증기!
    default:
      return (value: string) => [false, value, value]
  }
}
