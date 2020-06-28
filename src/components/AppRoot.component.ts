import template from './AppRoot.template'
import terms from '../config/terms.json'
import carriers from '../config/carriers.json'

interface IAppState {
  name: string
  registerNumber: string
  carrierCode: string
  phoneNumber: string
  termsCode: string[]
}

const defaultState = {
  name: '',
  registerNumber: '',
  carrierCode: '',
  phoneNumber: '',
  termsCode: [],
}

export type Carriers = typeof carriers

export type Terms = typeof terms

export default class AppRoot extends HTMLElement {
  private template: string

  private terms: Terms

  private carriers: Carriers

  private state: IAppState

  private submitButton: HTMLButtonElement | null

  static tag = 'app-root'

  constructor() {
    super()
    this.template = template
    this.terms = terms
    this.carriers = carriers
    this.state = defaultState
    this.submitButton = null

    this.addEventListener('state-updated', this.handleStateUpdated)
    this.addEventListener('click', this.handleSubmitOnly)
  }

  connectedCallback() {
    this.render() // 최초 한번만 렌더링
    this.submitButton = this.querySelector('button[type=submit]')
  }

  handleStateUpdated = (e: Event) => {
    if (!this.submitButton) return

    const el = e.target

    /**
     * 폼 값이 valid 할 경우 탭을 옮기는 동작
     */
    if (el instanceof HTMLElement) {
      const isValid = el.getAttribute('valid') === 'valid'
      const curFieldIndex = el.getAttribute('field-index') || '-1'
      const curIndex = parseInt(curFieldIndex, 10)

      if (curIndex > 0) {
        const nextElement = this.querySelector(
          `[field-index="${curIndex + 1}"]`
        )
        if (isValid && nextElement) {
          const maybeInput = nextElement.querySelector('input')
          if (maybeInput) maybeInput.focus()
        }
      }
    }

    const pass = this.checkAllStatesValid()

    if (pass) {
      this.submitButton.removeAttribute('disabled')
    } else {
      this.submitButton.setAttribute('disabled', 'disabled')
    }

    this.updateState()
  }

  updateState() {
    const formFields = this.querySelectorAll('[state-key]')
    const newState = defaultState

    /** 배열 형식의 스트링인가? */
    const isArrayString = (arrLikeStr: string) => /^\[.*\]$/.test(arrLikeStr)

    formFields.forEach(el => {
      const key = el.getAttribute('state-key')
      const value = el.getAttribute('value')

      if (key) {
        // TODO: Map 을 써야하나. TS에서 타입 에러 없이 object 값을 교체하는 방법 고민 필요.
        ;(newState as any)[key] =
          value && isArrayString(value) ? JSON.parse(value) : value || ''
      }
    })

    this.state = {
      ...newState,
    }
  }

  /**
   * state-key 속성이 있는 엘리먼트의 valid 속성을 읽어서 검증을 통과했는지 체크
   */
  checkAllStatesValid() {
    return Object.keys(this.state).every(key => {
      return (
        this.querySelector(`[state-key=${key}]`)?.getAttribute('valid') ===
        'valid'
      )
    })
  }

  handleSubmitOnly = (e: Event) => {
    if (!(e.target instanceof HTMLButtonElement)) return
    if (e.target.type.toLocaleLowerCase() !== 'submit') return
    if (e.target.getAttribute('disabled') === 'disabled') return

    /**
     * 최종 결과 출력. 여기서 서버 요청하면 되겠지!
     */
    // eslint-disable-next-line no-console
    console.log('Result:', this.state)

    // eslint-disable-next-line no-alert
    alert('API 서버에 요청을 할 타이밍입니다. 콘솔 창을 확인하세요.')
  }

  render() {
    this.innerHTML = this.template

    // 통신사 선택 컴포넌트에 필요한 리스트를 주입
    const carrierSelector = this.querySelector('[state-key=carrierCode]')
    if (carrierSelector) {
      carrierSelector.setAttribute('list', JSON.stringify(this.carriers))
    }

    // 통신사 선택 컴포넌트에 필요한 리스트를 주입
    const termsBox = this.querySelector('[state-key=termsCode]')
    if (termsBox) {
      termsBox.setAttribute('list', JSON.stringify(this.terms))
    }
  }
}
