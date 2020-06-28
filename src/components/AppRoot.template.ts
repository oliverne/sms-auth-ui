import styles from './AppRoot.module.scss'

const template = `
  <div class="${styles.main}">
    <header class="${styles.header}">
      <h1 class="${styles.title}">입력정보</h1>
      <h2 class="${styles.desc}">본인 명의의 휴대폰 정보를 입력하세요</h2>
    </header>

    <div class="${styles.form}">
      <custom-select field-index="1" state-key="carrierCode" value="" label="통신사"></custom-select>

      <custom-input field-index="2" state-key="phoneNumber" value="" label="휴대폰 번호" max-length="13"></custom-input>
      <custom-input field-index="3" state-key="registerNumber" value="" label="주민등록번호" max-length="8"></custom-input>
      <custom-input field-index="4" state-key="name" value="" label="이름" max-length="10"></custom-input>

      <div class="${styles.notice}">
        <i class="${styles.iconQuestion}"></i>
        <span class=${styles.noticeDetail}>
          모든 정보가 올바르게 입력되었음에도
          인증번호 요청이 되지 않는 경우 가입하신 통신사에 문의해주세요.
        </span>
      </div>

      <terms-box state-key="termsCode" value="[]"></terms-box>

      <div class="${styles.submit}">
        <button type="submit" disabled class="${styles.submitButton}">인증번호요청</button>
      </div>
    </div>
  </div>
`

export default template
