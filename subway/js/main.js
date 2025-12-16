$(function() {

  // gnb
  $('#gnb > ul > li > .depth1').on('mouseenter', function(){
    $('.nav_bg').stop().animate({height:'260'}, 500);
    $('#gnb > ul > li > .depth2').stop().slideDown(500);
  });

  $('#gnb').on('mouseleave', function(){
    $('.nav_bg').stop().animate({height:'0'}, 500);
    $('#gnb > ul > li > .depth2').stop().slideUp(500);
  });

  // main_tap swiper slide
  var mainTapSwiper = new Swiper(".main_tap", {
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".main_tap .swiper-pagination",
          clickable: true,
        },
      });

  $('.main_tap .swiper-pagination-bullet').on('click', function(){
    mainTapSwiper.autoplay.stop();
  });     
  
  // subway_menu swiper slide
  // tab메뉴 슬라이드마다 각각 swiper초기화
  $('.subway_menu').each(function () { 
    new Swiper(this, {
      navigation: {
        nextEl: $(this).find('.swiper-button-next')[0],
        prevEl: $(this).find('.swiper-button-prev')[0],
      },
      watchOverflow: false, // 슬라이드가 1개여도 네비게이션 보이게
    });
  });
  
  // tab메뉴 클릭시 슬라이드
  $('.subway_menu_tab li a').on('click', function(e){
    e.preventDefault();
    let smt_ac = $(this).parent().index();
    $(this).parent().addClass('active').siblings().removeClass('active');
    $('.slide_view').removeClass('active').stop().animate({opacity: '0'}, 700, function() {
    $(this).attr('style', '');}).eq(smt_ac).addClass('active').stop().animate({left:'0'}, 700);
  });

  // subway_menu 호버시 확대
  $('.subway_menu_wrapper .subway_menu ul li').on('mouseenter', function () {
    $(this).addClass('active').siblings().addClass('sibling');
  });

  $('.subway_menu_wrapper .subway_menu ul li').on('mouseleave', function () {
    $(this).removeClass('active').siblings().removeClass('sibling');
  });

  // sponsor swiper slide
  var sponsorSwiper = new Swiper(".sponsor", {
      pagination: {
        el: ".sponsor .swiper-pagination",
        clickable: true,
      },
    });

});




