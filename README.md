# [portfolio](https://djhamtol.github.io/portfolio/)

>웹 퍼블리셔 포트폴리오입니다.<br>
HTML, CSS, JavaScript를 기반으로 반응형 웹과 다양한 인터랙션을 구현하며 웹 퍼블리싱의 기본기를 쌓고, 실무에 필요한 역량을 꾸준히 학습하고 있습니다.<br>
프로젝트마다 새로운 기술과 구현 방법을 적용하고, 더 나은 구조와 사용성을 고민하며 개선하는 과정을 중요하게 생각합니다.<br>
이 포트폴리오 사이트는 저의 시그니처인 햄스터를 활용해 직접 와이어프레임을 제작하고, 인터랙션과 반응형 레이아웃을 적용하여 완성했습니다.

## 🐹 담당

- 디자인 100%
- 퍼블리싱 100%

## 🛠️ 기술 스택

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=flat&logo=swiper&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat&logo=greensock&logoColor=black)

## ✨ 주요 포인트

- 반응형 웹 페이지 구현
- GSAP Flip을 활용한 인트로 구현
- GSAP ScrollTrigger + grid + sticky를 활용한 프로젝트 페이지 구현
- 하드코딩 슬라이드 구현
- 이메일 전송 모달창 (제작 중)

## 🔍 문제 발생 및 해결

- **transform 속성에 대한 gsap과 css 충돌**
    
    ```css
    header {
        transform: translate(-50%, -100%);
    }
    ```
    
    ```js
    .to(header, {
        yPercent: 0,
        duration: 0.8
    })
    ```
    
    예상대로라면 헤더가 `y -100% → y 0`으로 변화하면서 등장해야 하지만 애니메이션이 끝난 후 인라인 스타일에 `transform: translate(-50%, 0%) translate(0px, -80px);`이 들어가는 현상이 발생하여 헤더가 등장하지 않는 오류가 발생했습니다. `(y -80px`는 css에서 설정한 `y -100%`)
    
    GSAP이 transform의 각 속성값을 분해하고 재조합하는 과정에서 CSS의 transform과 충돌하는 문제입니다.
    
    이를 해결하기 위해 `gsap.set()`으로 transform의 초기값을 설정하고, transform을 GSAP에서 일관되게 관리하도록 했습니다.
    
    하지만 페이지 로드시 헤더가 나타났다가 사라지는 깜빡임 현상이 발생했습니다.
    
    js는 css보다 나중에 로드되기 때문에 gsap보다 css가 먼저 렌더링 되면서 생기는 현상입니다.
    
    따라서 초기 위치값은 CSS에서 설정해야 하지만, 앞서 확인한 것처럼 transform은 충돌 문제가 있을 수 있기 때문에 transform 대신 `top`에 애니메이션을 적용하여 문제를 해결했습니다.
    
    ```css
    header {
        width: 100%;
        max-width: var(--layout-max-w);
        height: var(--header-height);
        position: fixed;
        top: calc(-1 * var(--header-height));
        left: 50%;
        transform: translateX(-50%);
    
        z-index: 100;
    }
    ```
    
    ```js
    .to(header, {
        top: 0,
        duration: 0.8
    })
    ```
    
    **✔ 결론:** 
    
    **transform 속성은 gsap과 css의 충돌을 발생시킬 수 있습니다.**
    
    **JS보다 CSS가 먼저 렌더링 되기 때문에 gsap.set()이나 gsap.from() 사용시에도 주의가 필요합니다.**
    
- **Flip 애니메이션 비정상적 동작**
    
    ```html
    <div class="intro">
    	<h1 class="headline">
    	    <span class="line">
    	        <strong class="keyword keyword-first">Responsibility</strong> <span class="phrase phrase-first">is my attitude,</span>
    	    </span>
    	    <span class="line">
    	        <strong class="keyword keyword-second">Improvement</strong> <span class="phrase phrase-second">is my habit.</span>
    	    </span>
    	</h1>
    </div>
    ```
    
    ```css
    .intro .headline {
        transform: scale(1.3);
    	}
    ```
    
    ```js
    // 1. 현재 위치 저장
    const state = Flip.getState(headline);
    
    // 2. 레이아웃 변경
    homeContent.prepend(headline);
    
    firstPhrase.style.display = 'inline-block';
    secondPhrase.style.display = 'inline-block';
    
    // 3. 변경 전 위치에서 변경 후 위치로 애니메이션
    Flip.from(state, {
        scale: true,
        duration: 0.4,
        ease: 'power2.inOut',
    
        onComplete: playOutro
    });
    ```
    
    `headline`을 Flip 대상으로 지정했을 때, 크기와 위치가 비정상적으로 변화하는 문제가 발생했습니다.
    
    `headline`은 <mark>부모 요소 변경, 내부 콘텐츠 표시, 크기 변화, scale, 위치 이동</mark>이 동시에 발생하는 요소였기 때문에 Flip이 전후 레이아웃을 복잡하게 계산해야 했습니다.
    
    따라서 Flip의 대상 범위를 단순화하기 위해 <mark>실제로 이동이 필요한 `keyword`만 Flip 대상으로 지정</mark>했습니다.
    
    ```js
    const state = Flip.getState(keywords);
    ```
    
    scale까지 `keyword`에 직접 적용하려 했으나 키워드 영역이 서로 겹치는 문제가 발생했습니다.
    
    이에 <mark>scale은 전처럼 부모인 `headline`에 적용하고 자식인 `keyword`는 부모 영향을 받아 함께 변화하도록 처리했습니다</mark>
    
    결론적으로 Flip이 `keyword`의 위치 이동만 담당하도록 하여 레이아웃 변화를 최소화시켰고 안정적으로 동작하는 것을 확인했습니다.
    
    **✔ 결론:** 
    
    **앞서 발생한 GSAP과 CSS간의 충돌 문제와 비슷하다고 느꼈습니다. 하나의 요소에 여러 변화가 동시에 적용되면 계산 과정이 복잡해져 예상하지 못한 결과가 발생할 수 있음을 확인했습니다.**

    **이를 바탕으로 충돌이 발생할 경우 각 속성의 역할을 분리하고, 하나의 요소에서 처리되어야 할 변화를 최소화하여 계산을 단순화하는 방향으로 해결해야겠다고 생각했습니다.**
    

- **skipIntro()에서 인트로 최종 상태 즉시 적용시 스크롤이 튀는 현상**
    
    gsap.set()으로 인트로 애니메이션의 최종 상태를 적용하여 skipIntro() 함수를 만들었습니다.
    
    ```js
    const skipIntro = () => {
                // 인트로 스크롤 잠금 해제
                document.documentElement.classList.remove('is-intro');
                document.body.classList.remove('is-intro');
    
                // 최종 레이아웃으로 변경
                homeContent.prepend(headline);
    
                firstPhrase.style.display = 'inline-block';
                secondPhrase.style.display = 'inline-block';
    
                // 최종 상태 즉시 적용
                gsap.set(firstKeyword, {
                    y: 0,
                    opacity: 1
                });
    
                gsap.set(secondKeyword, {
                    y: 0,
                    opacity: 1
                });
    
                gsap.set(firstPhrase, {
                    x: 0,
                    opacity: 1
                });
    
                gsap.set(secondPhrase, {
                    x: 0,
                    opacity: 1
                });
    
                gsap.set(header, {
                    top: 0
                });
                
                gsap.set(hamHead, {
                    yPercent: -100
                });
            };
    ```
    
    테스트 중 스크롤 후 새로고침시 스크롤이 위아래로 튀면서 요소가 눈에 거슬릴 정도로 깜빡거리는 것을 확인했습니다.
    
    앞서 경험한 것들로 css보다 js 파일이 늦게 로드되면서 발생되는 문제라는 것은 단번에 알 수 있었지만 튀는 현상을 봤을 때 어떤 요소가 원인인지 특정되지 않아 의심되는 요소부터 추적하기 시작했고 .hamster-head의 상태를 주석 처리했을 때 튀는 현상이 해결됐습니다.
    
    .hamster-head의 최종 상태가 css파일 로드 시점에서 바로 적용될 수 있도록 html 스크립트를 사용했습니다.
    
    ```html
    <script>
        if (sessionStorage.getItem('isPlayedIntro')) {
            document.documentElement.classList.add('is-intro-skip');
        }
    </script>
    <link rel="stylesheet" href="css/main.css">
    ```
    
    나머지 요소들도 JS로 초기화하기 때문에 깜빡임이 발생할 수 있지만 빠르게 새로고침하거나 눈에 띄는 깜빡거림까지는 일어나지 않아 그대로 JS 함수 내에서 관리하기로 했습니다.
    
    **✔ 결론:** 
    
    **클론 코딩 프로젝트를 진행하며 원본 사이트에서 스크립트로 따로 관리하는 코드를 확인할 수 있었는데 정확한 이유는 알지 못했었습니다.**
  
    **개인 사이트를 기획하고 구현하면서 스크립트로 관리해야 하는 이유 중 하나를 몸소 터득했고 인간과 컴퓨터의 사고 방식의 차이는 순서라는 것을 한 번 더 느꼈습니다.**
  
    **문제 발생시 코드 실행 순서를 잘 생각해봐야겠다고 생각했습니다.**
    
- **GSAP - ScrollTrigger의 start: 'top top' 도달시 트리거가 발동되지 않는 문제**
    
    ```js
    ScrollTrigger.create({
        trigger: page,
        start: 'top top',
        end: 'bottom top',
        toggleClass: {
            targets: lis[idx],
            className: 'active'
        }
    });
    ```
    
    요소(`page`)의 top이 뷰포트의 top에 닿을 때 active 클래스가 들어가야 하지만 top top 지점에 도달해도 클래스가 들어가지 않는 문제가 발생했습니다.
    
    `<a href="#projects">PROJECTS</a>`으로 페이지 이동하기 때문에 정확히 #projects.getBoundingClientRect().top === 0인 것을 콘솔에서 확인했습니다.
    
    처음에는 toggleCalss 옵션이 문제인 줄 알고 
    
    ```js
    onEnter: () => {
        lis.forEach(li => li.classList.remove('active'));
        lis[idx].classList.add('active');
    }, ...
    ```
    
    등의 다른 옵션들을 이용해보기도 하고 href로 이동하는 것이 문제지 않을까 해서 window.scrollTo();로 직접 이동 시켜보기도 했지만 여전히 동작하지 않았습니다.
    
    구글링을 하기 시작했고 GSAP 공식 홈페이지에서 저와 비슷한 이슈의 질의 응답을 발견할 수 있었습니다.
    
    https://gsap.com/community/forums/topic/28591-gsap-scrolltrigger-issue-on-page-change/
    
    <mark>`start: 'top top'` 대신 `start: '-1 top'`을 쓰면 해결된다</mark>는 내용입니다. 이유는 time 0에서는 플레이 되지 않는 것처럼 정확한 경계선에 있으면 트리거가 발동하지 않을 수 있다는 것입니다.
    
    제 코드도 `start: '-1 top'`로 수정했더니 정상 작동하는 것을 확인했습니다.
    
    해결은 됐으나 라이브러리에서만 그런 것인지 궁금해서 추가적으로 `#projects.getBoundingClientRect().top <= 0`을 이용해 하드코딩 해보았습니다.
    
    똑같이 메뉴 이동으로 `#projects.getBoundingClientRect().top === 0`지점에 도달했을 때 active 클래스가 정상적으로 들어가는 것을 확인했습니다.
    
    하지만 스크롤 이벤트 안에서 `getBoundingClientRect()` 을 측정하는 것이기 때문에 요소가 많을 경우 성능상 안 좋을 수 있어 성능 이슈와 가독성을 고려해 라이브러리를 이용하는 것으로 결정하고 마무리 했습니다.
    
    **✔ 결론: 0 처리나 경계선과 같은 개념에서는 예상대로 동작하지 않을 수 있음을 한 번 더 깨달았습니다.**
    

- **position sticky 요소가 고정되지 않는 문제**
    
    GSAP 애니메이션 요소가 화면 밖으로 이동하면서 발생하는 가로 overflow를 제한하기 위해 `html, body`에 `overflow-x: hidden`을 적용했습니다. 그러나 이 `overflow-x: hidden`은 `overflow-y`의 계산에도 영향을 줄 수 있으며, 실제로 `overflow-y`가 `visible`에서 `auto`로 계산되었음을 확인했습니다.
    
    `position: sticky`는 가장 가까운 스크롤 컨테이너를 기준으로 동작합니다. 조상 요소에 `overflow: auto`, `scroll`, `hidden` 등이 설정되어 있으면 해당 요소가 스크롤 컨테이너로 사용될 수 있으며, 조상 요소에 별도의 overflow 설정이 없다면 페이지의 스크롤 영역을 기준으로 동작합니다. 특히 `html, body`는 일반적인 요소와 달리 viewport의 페이지 스크롤과 연결된 root 요소이기 때문에, 이들의 overflow는 일반 div의 overflow 동작과 다를 수 있으며 sticky의 스크롤 컨테이너 계산에 영향을 줄 수 있습니다.
    
    결론적으로 `html, body`에 적용한 `overflow-x: hidden`으로 인해 sticky가 정상 동작하지 않는 문제였으며 가로 overflow는 제한하면서 스크롤 컨테이너 생성에 영향을 주지 않도록 `overflow-x: hidden`을 `overflow-x: clip`으로 변경하여 문제를 해결했습니다.
    
    **✔ 결론: `sticky`가 기준으로 삼는 스크롤 컨테이너는 조상 요소의 `overflow` 설정에 따라 달라질 수 있으며, 이를 통해 `position: sticky`의 동작이 `overflow` 설정과 밀접한 관련이 있음을 확인했습니다.**
