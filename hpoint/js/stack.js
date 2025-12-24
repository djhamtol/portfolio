$(function () {
    
    // 햄버거 버튼
    $('header .mb-hd-utils .hambuger-menu').on('click', function(){
        if($(this).hasClass('active')) { //닫기
            $(this).removeClass('active').attr('aria-label', '메뉴 열기');
            gsap.to('#mb-menu-area, #mb-menu-area .top-area', {
                right:'-100%', duration: 0.3
            });
        }
        else { //열기
            $(this).addClass('active').attr('aria-label', '메뉴 닫기');
            gsap.to('#mb-menu-area, #mb-menu-area .top-area', {
                right: 0, duration: 0.3
            });
        }
    });

    // mb-gnb depth2 열기
    $('#mb-menu-area #mb-gnb > ul > li.depth1').on('click', function(){
        $(this).addClass('active').siblings().removeClass('active');
        $(this).find('ul.depth2').show();
        $(this).siblings().find('ul.depth2').hide();
    });

});