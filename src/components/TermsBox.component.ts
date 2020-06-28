import styles from './TermsBox.module.scss'

import { Terms } from './AppRoot.component'

export default class TermsBox extends HTMLElement {
  static tag = 'terms-box'

  static get observedAttributes() {
    return ['list']
  }

  connectedCallback() {
    this.render()

    this.addEventListener('click', this.handleClick) // 이벤트 위임
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'list' && oldValue !== newValue) {
      try {
        this.populateAgreements(JSON.parse(newValue))
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('약관 정보가 잘못되었습니다.')
      }
    }
  }

  validate() {
    const checks = Array.from(this.querySelectorAll('input'))
    const pass = checks
      .filter(cb => cb.dataset.required === 'true')
      .every(cb => cb.checked)

    const values = checks.filter(cb => cb.checked).map(cb => cb.value)
    this.setAttribute('value', JSON.stringify(values))

    if (pass) {
      this.setAttribute('valid', 'valid')
    } else {
      this.removeAttribute('valid')
    }

    // 부모로 값이 변했음을 알림
    this.dispatchEvent(
      new CustomEvent('state-updated', {
        bubbles: true,
        cancelable: true,
      })
    )
  }

  handleClick = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      this.handleCheck()
      const agreeAll = this.querySelector(`.${styles.agreeAll}`)
      if (agreeAll) agreeAll.classList.remove(styles.allChecked)
    } else if (e.target instanceof HTMLButtonElement) {
      this.handleAgreeAll(e)
    }
  }

  handleAgreeAll = (e: Event) => {
    e.preventDefault()

    this.querySelectorAll('input').forEach(cb => {
      cb.checked = true // eslint-disable-line no-param-reassign
    })

    const agreeAll = this.querySelector(`.${styles.agreeAll}`)
    if (agreeAll) agreeAll.classList.add(styles.allChecked)

    this.validate()
  }

  handleCheck = () => {
    this.validate()
  }

  populateAgreements(list: Terms) {
    const frag = document.createDocumentFragment()

    list.forEach(item => {
      const field = document.createElement('div')
      field.classList.add(styles.field)

      const labelId = `term__${item.termsId}`
      field.innerHTML = `
        <input
          id="${labelId}"
          type="checkbox"
          value="${item.termsId}"
          data-required="${item.required}"
          class="${styles.cb}"
        ><label for="${labelId}" class="${styles.label}">${item.title}</label>
      `
      frag.appendChild(field)
    })

    const agrees = this.querySelector(`.${styles.agrees}`)
    if (agrees) agrees.appendChild(frag)
  }

  render() {
    this.innerHTML = `
      <div class="${styles.terms}">
        <div class="${styles.agrees}">
        </div>
        <div class="${styles.field}">
          <button type="button" class="${styles.agreeAll}">전체 동의하기</button>
        </div>
      </div>
    `
  }
}
