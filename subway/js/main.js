const init = () => {
    console.log("호출")
    let baseURl = window.location.hostname //127.0.0.1 or localhost or ip or domain
    let url = $(".logo a").attr("href"); // jquery attr attribute 속성 href = /subway/index.html
    const hostname = !baseURl.includes("github") ? baseURl + ":5500" : baseURl + "/portfolio";
    const fullUrl = "http://"+hostname + url;
    $(".logo a").attr("href", fullUrl); //http://localhost:5500/subway/index.html ? http://githubdomain/protfolio/subway/index.html
}



$(function() {
  
  $('#gnb > ul > li > .depth1').on('mouseenter', function(){
    $('.nav_bg').stop().animate({height:'260'}, 500);
    $('#gnb > ul > li > .depth2').stop().slideDown(500);
  });

  $('#gnb').on('mouseleave', function(){
    $('.nav_bg').stop().animate({height:'0'}, 500);
    $('#gnb > ul > li > .depth2').stop().slideUp(500);
  });
  
});


// $( document ).ready(function() {
//     init(); 
//     gnb();
// })


