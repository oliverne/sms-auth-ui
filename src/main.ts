import './main.scss' // 글로벌 스타일

import AppRoot from './components/AppRoot.component'
import CustomInput from './components/CustomInput.component'
import CustomSelect from './components/CustomSelect.component'
import TermsBox from './components/TermsBox.component'

customElements.define(AppRoot.tag, AppRoot)
customElements.define(CustomInput.tag, CustomInput)
customElements.define(CustomSelect.tag, CustomSelect)
customElements.define(TermsBox .tag, TermsBox)

document.addEventListener('DOMContentLoaded', () => {
  const placeholder = document.getElementById('root') || document.body
  const app = document.createElement('app-root')
  placeholder.appendChild(app)
})
