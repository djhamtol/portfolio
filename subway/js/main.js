const init = () => {
    console.log("호출")
    let baseURl = window.location.hostname //127.0.0.1 or localhost or ip or domain
    let url = $(".logo a").attr("href"); // jquery attr attribute 속성 href = /subway/index.html
    const hostname = !baseURl.includes("github") ? baseURl + ":5500" : baseURl + "/portfolio";
    const fullUrl = "http://"+hostname + url;
    $(".logo a").attr("href", fullUrl); //http://localhost:5500/subway/index.html ? http://githubdomain/protfolio/subway/index.html
}



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
        spaceBetween: 30,
        centeredSlides: true,
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
      watchOverflow: false,
    });
  });

  $('.subway_menu_tab li a').on('click', function(){
    let smt_ac = $(this).parent().index();
    $(this).parent().addClass('active').siblings().removeClass('active');
    $('.subway_menu').hide();
    $('.subway_menu').eq(smt_ac).show();
  });

});




