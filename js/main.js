document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(Flip, ScrollTrigger);
    mainView.playIntro();
    mainView.scrollToHome();
    mainView.toggleSidebar();
    mainView.updateSidebarUnderbar();
    mainView.fadePageItem();
    mainView.animateProjectsTitle();
    mainView.fadeProjectsTitle();
    mainView.animateProgressbar();
    mainView.updateProject();
    mainView.qaSlide();
    mainView.animatePoop();
    // mainView.toggleContactModal();
    mainView.toggleFooter();
    mainView.toggleHeaderDim();
    mainView.toggleMobilePanel();
});

const mainView = {

    playIntro() {
        const header = document.querySelector('header');
        const hamHead = document.querySelector('.hamster-head');
        const pcLinks = document.querySelector('.portfolio-links--pc');
        const intro = document.querySelector('.intro');

        const headline = document.querySelector('.headline');

        const keywords = headline.querySelectorAll('.keyword');
        const firstKeyword = headline.querySelectorAll('.keyword-first');
        const secondKeyword = headline.querySelectorAll('.keyword-second');

        const phrases = headline.querySelectorAll('.phrase');
        const firstPhrase = headline.querySelector('.phrase-first');
        const secondPhrase = headline.querySelector('.phrase-second');

        // 키워드 등장
        const playIntro = () => {
            const tl = gsap.timeline();

            const duration = 0.6;
            const ease = 'power3.out';

            tl.to(firstKeyword, {
                y: 0,
                opacity: 1,
                duration, //duration: duration
                ease, //ease: ease
                delay: 0.4
            })
            .to(secondKeyword, {
                y: 0,
                opacity: 1,
                duration,
                ease
            }, '+=0.2')
            .call(playKeywordsFlip);
        };

        // 키워드 이동
        const playKeywordsFlip = () => {
            // 1. 현재 위치 저장
            const state = Flip.getState(keywords);

            // 2. 레이아웃 변경
            intro.classList.add('is-complete');
            
            // 3. 변경 전 위치에서 변경 후 위치로 애니메이션
            Flip.from(state, {
                scale: true,
                duration: 0.4,
                ease: 'power2.inOut',

                onComplete: playOutro
            });
        };

        // phrase 등장, 헤더&햄스터 헤드 등장
        const playOutro = () => {
            const tl = gsap.timeline();

            const phraseDuration = 0.5;
            const phraseEase = 'power2.out';

            const elDuration = 0.3;
            const elEase = 'none';

            tl.to(firstPhrase, {
                x: 0,
                opacity: 1,
                duration: phraseDuration,
                ease: phraseEase
            }, '+=0.3')
            .to(secondPhrase, {
                x: 0,
                opacity: 1,
                duration: phraseDuration,
                ease: phraseEase
            }, '+=0.2')
            .to(header, {
                top: 0,
                duration: elDuration,
                ease: elEase
            }, '+=0.1')
            .to(pcLinks, { 
                x: 0,
                duration: elDuration,
                ease: elEase
            }, '<')
            .to(hamHead, { 
                yPercent: -100,
                y: 0,
                duration: elDuration,
                ease: elEase
            }, '<')
            .call(() => {
                document.documentElement.classList.remove('is-intro');
            });
        };

        // 인트로 생략
        const skipIntro = () => {
            // 인트로 스크롤 잠금 해제
            document.documentElement.classList.remove('is-intro');

            // 최종 레이아웃으로 변경
            intro.classList.add('is-complete');

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

            gsap.set(pcLinks, {
                x: 0
            });

            // hamHead는 깜빡임이 크게 튀어서 html 스크립트로 클래스 줘서 관리
            // gsap.set(hamHead, {
            //     yPercent: -100
            // });
        };

        // 인트로 플레이
        const isPlayedIntro = sessionStorage.getItem('isPlayedIntro');
        const isMobile = window.innerWidth <= 1024;

        if (isPlayedIntro || isMobile) { // 인트로가 이미 한 번 플레이 됐거나 모바일에서는 생략
            skipIntro();
        } else {
            playIntro();

            sessionStorage.setItem('isPlayedIntro', 'true');
        }

        window.addEventListener('resize', () => { // 모바일로 리사이즈시 인트로 스킵
            if (window.innerWidth <= 1024) {
                skipIntro();
                document.documentElement.classList.add('is-intro-skip');
            }
        });
    },
    
    // 메뉴 중 home은 fixed, 시작 위치가 header 아래라 따로 코딩
    scrollToHome() {
        const pcGnbHome = document.querySelector('.gnb--pc a[href="#home"]');
        const moGnbHome = document.querySelector('.gnb--mo a[href="#home"]');
        const sidebarHome = document.querySelector('.sidebar__nav a[href="#home"]');

        pcGnbHome.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo(0, 0);
        });

        moGnbHome.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo(0, 0);
        });

        sidebarHome.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo(0, 0);
        });
    },

    // 사이드바 show&hide
    toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const projects = document.querySelector('#projects');

        gsap.to(sidebar, {
            opacity: 1,
            x: 0,
            ease: 'power2.out',
            duration: 0.2,

            scrollTrigger: {
                trigger: projects,
                start: '-1 top',
                toggleActions: 'play play play reverse'
            }
        });
    },

    // 사이드바의 메뉴 밑줄 업데이트
    updateSidebarUnderbar() {
        const lis = document.querySelectorAll('.sidebar__nav ul li');
        const pages = document.querySelectorAll('.page');

        const setActive = (idx) => {
            lis.forEach(li => li.classList.remove('active'));
            lis[idx].classList.add('active');
        };

        window.addEventListener('scroll', () => {
            pages.forEach((page, idx) => {
                if (page.getBoundingClientRect().top <= 100) {
                    setActive(idx);
                }
            });
        });

        // 리사이즈시 ScrollTrigger의 refresh기능 때문에 트리거의 콜백 함수 재실행되는 버그 발생 -> 위 하드 코딩으로 해결
        // pages.forEach((page, idx) => {
        //     if (idx === 0) return;

        //     ScrollTrigger.create({
        //         trigger: page,
        //         start: '-1 top', // top top은 경계선이라 트리거 발동 안할 수 있음 시간 0인 것과 비슷한 개념. 
        //                         // -1px 줘서 트리거 발동시키기
        //                         // 아니면 하드코딩으로 해결 -> page.getBoundingClientRect().top <= 0 ... 스크롤마다 위치 측정해야돼서 요소가 많을 경우 성능상 안 좋을 수 있음
        //         end: 'bottom 1',
        //         onEnter: () => {
        //             setActive(idx);
        //         },
        //         onEnterBack: () => {
        //             setActive(idx);
        //         }
        //     });
        // });
    },

    // home, projects 페이지 제외 나머지 페이지 fade
    fadePageItem() {
        const items = document.querySelectorAll('.page__item');

        items.forEach((item) => {
            gsap.to(item, {
                opacity: 1,
                y: 0,
                duration: 0.6,

                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    },

    // projects 타이틀 show&hide
    animateProjectsTitle() {
        const projects = document.querySelector('#projects');
        const title = projects.querySelector('.heading__title');
        const info = projects.querySelector('.heading__info');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: projects,
                start: 'top 40%',
                toggleActions: 'play play play reverse'
            },
            defaults: {
                duration: 1,
                ease: 'expo.out'
            }
        });
        
        tl.to([title, info], {
            opacity: 1,
            x: 0
        });
    },

    // 스크롤시 타이틀 뒷배경으로 빼기
    fadeProjectsTitle() {
        const projects = document.querySelector('#projects');
        const heading = projects.querySelector('.heading');
        const listArea = projects.querySelector('.list-area');

        gsap.to(heading, {
            opacity: 0.1,
            
            scrollTrigger: {
                trigger: listArea,
                start: 'top bottom',
                end: 'top center',
                scrub: true
            }
        });
    },

    // progressbar show&hide
    animateProgressbar() {
        const projects = document.querySelector('#projects');
        const progressbar = projects.querySelector('.progressbar');
        const listArea = projects.querySelector('.list-area');

        gsap.to(progressbar, {
            y: 0,
            autoAlpha: 1,
            duration: 0.2,
            ease: 'power2.out',
            
            scrollTrigger: {
                trigger: listArea,
                start: 'top 30%',
                end: 'bottom 70%',
                toggleActions: 'play reverse play reverse'
            }
        });
    },

    updateProject() {
        const projects = document.querySelector('#projects');
        const thumbnailWraps = projects.querySelectorAll('.thumbnail-wrap');
        const infoWraps = projects.querySelectorAll('.info-wrap');
        const progress = projects.querySelector('.progressbar__progress');
        const progressPjs = projects.querySelectorAll('.progressbar__project');
        const levelup = projects.querySelector('.progressbar__levelup');

        // 프로젝트 설명 show&hide
        const showInfo = (idx) => {
            infoWraps.forEach((info) => {
                info.classList.remove('active');
            });

            infoWraps[idx].classList.add('active');
        }

        // 프로젝트 썸네일 활성화
        const activeThumbnail = (idx) => {
            thumbnailWraps.forEach((thumbnail) => {
                thumbnail.classList.remove('active');
            });

            thumbnailWraps[idx].classList.add('active');
        }

        // progress 업데이트
        const updateProgress = (idx) => {
            gsap.to(progress, {
                scaleY: 0.8 - 0.2 * idx,
                duration: 0.3,
                ease: 'power2.out'
            });
        }

        // progressbar의 프로젝트명 활성화
        const activeProgressPj = (idx) => {
            progressPjs.forEach((project) => {
                project.classList.remove('active');
            });

            progressPjs[idx].classList.add('active');
        }

        // progressbar의 levelup 이펙트
        const showLevelup = (idx) => {
            if (thumbnailWraps[idx].classList.contains('active')) return; // 다음 썸네일로 안넘어간 상태에서 현 썸네일로 onEnterBack시 levelup 재실행x.

            gsap.set(levelup, {
                bottom: `${80 - 20 * idx}%`,
                y: 4,
                autoAlpha: 0 // opacity: 0; visibility: hidden;
            });

            const tl = gsap.timeline();

            tl.to(levelup, {
                autoAlpha: 1,
                duration: 0.3,
                ease: 'power2.out'
            })
            .to(levelup, {
                y: -4,
                autoAlpha: 0,
                duration: 0.4,
                ease: 'power2.in'
            });
        }

        thumbnailWraps.forEach((thumbnailWrap, idx) => {

            ScrollTrigger.create({
                trigger: thumbnailWrap,
                start: 'top center',
                end: 'bottom center',

                onEnter: () => {
                    showInfo(idx);
                    activeThumbnail(idx);
                    updateProgress(idx);
                    activeProgressPj(idx);
                },
                onEnterBack: () => {
                    showLevelup(idx);
                    showInfo(idx);
                    activeThumbnail(idx);
                    updateProgress(idx);
                    activeProgressPj(idx);
                }
            });
        })
    },

    // 하드코딩 슬라이드
    qaSlide() {
        const questions = document.querySelectorAll('.qa__list li');

        const view = document.querySelector('.qa__slider-view');
        const slides = document.querySelector('.qa__slides');
        const slideItems = document.querySelectorAll('.qa__slide');
        const wheel = document.querySelectorAll('.qa__wheel svg');

        const prev = document.querySelector('.qa__prev');
        const next = document.querySelector('.qa__next');

        let idx = 0;
        const maxIdx = slideItems.length - 1;

        const moveSlide = (btn, animate = true) => { // 리사이즈시 animate = false
            const viewWidth = view.offsetWidth;
            const slideWidth = slideItems[0].offsetWidth;
            const gap = parseFloat(getComputedStyle(slides).gap);;

            let move = (slideWidth + gap) * idx;

            // 마지막 슬라이드는 move값 다르게
            if (idx === maxIdx) {
                move -= viewWidth - slideWidth;
            }

            // 슬라이드 이동
            gsap.to(slides, {
                x: -move,
                duration: animate ? 0.8 : 0
            })

            // 바퀴 애니메이션 (리사이즈시 실행x)
            if (animate) {
                gsap.to(wheel, {
                    rotation: btn === prev ? '+=360' : '-=360',
                    transformOrigin: 'center center',
                    duration: 0.8,
                    ease: 'none'
                });
            }
        }

        const questionActive = (idx) => {
            questions.forEach((q, index) => {
                q.classList.remove('active');

                if (idx === index) {
                    q.classList.add('active');
                }
            });
        };

        prev.addEventListener('click', () => {
            idx -= 1;

            // 질문 활성화
            questionActive(idx);

            // 버튼 비활성화
            if (idx <= 0) {
                prev.classList.add('disabled');
            }
            next.classList.remove('disabled');

            // 슬라이드 이동
            moveSlide(prev);
        });

        next.addEventListener('click', () => {
            idx += 1;

            questionActive(idx);

            if (idx >= maxIdx) {
                next.classList.add('disabled');
            }
            prev.classList.remove('disabled');

            moveSlide(next);
        });

        window.addEventListener('resize', () => {
            moveSlide(null, false)
        });
    },

    animatePoop() {
        const poop = document.querySelector('.poop');

        gsap.to('.poop', {
            rotation: 20,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'steps(1)'
        });

        poop.addEventListener('click', () => {
            alert('이메일 전송 모달창 제작 중 입니다...  ୧ʕ • ꇴ •́ ๑ ʔ');
        });
    },

    toggleContactModal() {
        const open = document.querySelector('.poop');
        const modal = document.querySelector('.contact-modal');
        const dim = document.querySelector('.contact-modal__dim');
        const close = document.querySelector('.contact-modal__close');

        open.addEventListener('click', () => {
            modal.classList.add('active');
        });

        close.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        dim.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    },

    // 맨 위에서는 home이 보이고 맨 아래에서는 footer가 보이게
    toggleFooter() {
        const mainContent = document.querySelector('.main-content');
        const footer = document.querySelector('footer');

        ScrollTrigger.create({
            trigger: mainContent,
            start: 'top top',

            onEnter: () => { footer.style.zIndex = 20; },
            onLeaveBack: () => { footer.style.zIndex = 1; },
        });
    },

    // -----------------모바일-----------------
    toggleHeaderDim() {
        const header = document.querySelector('header');

        const updateHeader = () => {
            if (window.scrollY > 0) {
                header.classList.add('active');
            } else {
                header.classList.remove('active');
            }
        };

        updateHeader(); // 빠르게 새로고침시 active 안 들어가는 문제를 위함

        window.addEventListener('scroll', updateHeader);
    },
    
    toggleMobilePanel() {
        const open = document.querySelector('.hamburger');
        const panel = document.querySelector('.mobile-panel');
        const dim = panel.querySelector('.mobile-panel__dim');
        const close = panel.querySelector('.mobile-panel__close');
        const menus = panel.querySelectorAll('.gnb--mo ul li a');

        open.addEventListener('click', () => {
            panel.classList.add('active');
            open.setAttribute('aria-expanded', 'true');
        });

        dim.addEventListener('click', () => {
            panel.classList.remove('active');
            open.setAttribute('aria-expanded', 'false');
        });

        close.addEventListener('click', () => {
            panel.classList.remove('active');
            open.setAttribute('aria-expanded', 'false');
        });

        // 모바일 gnb 메뉴 클릭시 패널 닫기
        menus.forEach((menu) => {
            menu.addEventListener('click', () => {
                panel.classList.remove('active');
            });
        });

        // pc에서 패널 닫기 (스크롤 되게 하기 위함)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                panel.classList.remove('active');
            }
        });
    },

}
