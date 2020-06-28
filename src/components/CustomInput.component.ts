import styles from './CustomInput.module.scss'

import getValidator, { validateFn } from '../validators/index'

export default class CustomInput extends HTMLElement {
  private validate: validateFn

  private input: HTMLInputElement | null

  static tag = 'custom-input'

  constructor() {
    super()
    const stateKey = this.getAttribute('state-key') || '__undefined__'
    this.validate = getValidator(stateKey)
    this.input = null

    this.addEventListener('keyup', this.handleInput)
    this.addEventListener('change', this.handleChange)
  }

  connectedCallback() {
    this.render()
    this.input = this.querySelector('input')
  }

  handleInput = (e: Event) => {
    if (this.input && e.target instanceof HTMLInputElement) {
      const [isValid, formatted, normalized] = this.validate(e.target.value)

      // 보낼값
      this.setAttribute('value', normalized)

      // 표시값
      this.input.value = formatted

      // 검증통과 여부 엘리먼트에 표시
      if (isValid) {
        this.setAttribute('valid', 'valid')
        this.classList.remove(styles.invalid)
      } else {
        this.removeAttribute('valid')
      }

      this.emitUpdate()
    }
  }

  handleChange = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      if (this.getAttribute('valid') !== 'valid') {
        this.classList.add(styles.invalid)
      }
      this.emitUpdate()
    }
  }

  emitUpdate() {
    // 부모로 값이 변했음을 알림
    this.dispatchEvent(
      new CustomEvent('state-updated', {
        bubbles: true,
        cancelable: true,
      })
    )
  }

  render() {
    const label = this.getAttribute('label') || ''
    const value = this.getAttribute('value') || ''
    const maxLength = this.getAttribute('max-length') || ''

    this.innerHTML = `
      <div class="${styles.field}">
        <label class="${styles.label}">${label}</label>
        <input type="text" value="${value}" class="${styles.input}" maxlength="${maxLength}">
      </div>
    `
  }
}
