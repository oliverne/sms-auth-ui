import styles from './CustomSelect.module.scss'

import { Carriers } from './AppRoot.component'

export default class CustomSelect extends HTMLElement {
  private select: HTMLSelectElement | null

  static tag = 'custom-select'

  // 통신사 리스트를 최상위 컴포넌트에서 받아옴
  static get observedAttributes() {
    return ['list']
  }

  constructor() {
    super()
    this.select = null
  }

  connectedCallback() {
    this.render() // 최초 한번만 렌더링

    this.select = this.querySelector<HTMLSelectElement>(`.${styles.select}`)
    if (this.select)
      this.select.addEventListener('change', this.handleSelectChanged)
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'list' && oldValue !== newValue) {
      try {
        this.populateOptions(JSON.parse(newValue))
        this.selectDefaultOption()
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('통신사 정보가 잘못되었습니다.')
      }
    }
  }

  handleSelectChanged = (e: Event) => {
    const el = e.target
    if (!(el instanceof HTMLSelectElement)) return

    const { value } = el.options[el.selectedIndex]

    this.setAttribute('value', value)
    this.setAttribute('valid', 'valid')

    // 부모로 값이 변했음을 알림
    this.dispatchEvent(
      new CustomEvent('state-updated', {
        bubbles: true,
        cancelable: true,
      })
    )
  }

  populateOptions(list: Carriers) {
    if (!this.select) return

    const frag = document.createDocumentFragment()

    list.forEach(item => {
      const opt = document.createElement('option')
      opt.value = item.code
      opt.innerText = item.description
      frag.appendChild(opt)
    })

    this.select.appendChild(frag)
  }

  // 첫번째 옵션을 무조건 선택
  selectDefaultOption() {
    if (!this.select) return

    const defaultOption = this.select?.options[0]
    this.select.value = defaultOption.value

    this.select.dispatchEvent(new CustomEvent('change'))
  }

  render() {
    const label = this.getAttribute('label')

    this.innerHTML = `
      <div class="${styles.field}">
        <label class="${styles.label}">${label}</label>
        <select class="${styles.select}">
        </select>
      </div>
    `
  }
}
