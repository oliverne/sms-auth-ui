# 휴대폰 본인 인증 UI 데모

다른 런타임 라이브러리 없이 TypeScript와 DOM API만 가지고 만든 SMS 본인 인증 UI 예제입니다.

표준 [Web Component](https://www.webcomponents.org/) 방식을 사용하여 만들었습니다. 직접 만들어보니 [lit-element](https://lit-element.polymer-project.org/) 같은 걸 쓰는 게 훨씬 좋습니다.
아니, 우리의 정신건강을 위해 [React](https://ko.reactjs.org/)를 씁시다.

일부러 Shadow DOM 을 사용하지 않고, CSS 모듈을 사용하여 스타일을 캡슐화했습니다. 역시 만들고 나서 드는 생각이 lit-element를 쓰고 쉐도우 돔도 쓰고 CSS도 쉐도우 루트에다 넣읍시다. 아니, 그냥 리액트를 씁시다.

그래도 웹 컴포넌트를 써보고 드는 생각이 표준 스펙이 주는 편안함(?)이 있습니다. 별다른 빌드 도구 없이 브라우저에서 돌아가는 표준 방법론이 주는 장점이 있을 것입니다. 아마도...

아이콘은 [Feather](https://feathericons.com/)를 사용하였고, 배경이미지는 [Hero Patterns](https://www.heropatterns.com/)에서 가져왔습니다.

그 외 개발 과정에서 사용한 라이브러리/도구들은 package.json을 참고해주세요. 테스트 설정은 다 해놓고 테스트 코드는 하나도 안만든 걸 발견할 수 있습니다.
