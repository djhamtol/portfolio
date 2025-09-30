const init = () => {
    let baseURl = window.location.hostname //127.0.0.1 or localhost or ip or domain
    let url = $(".logo a").attr("href"); // jquery attr attribute 속성 href = /subway/index.html
    const hostname = !baseURl.includes("github") ? baseURl + ":5500" : baseURl + "/portfolio";
    const fullUrl = "http://"+hostname + url;
    $(".logo a").attr("href", fullUrl); //http://localhost:5500/subway/index.html ? http://githubdomain/protfolio/subway/index.html
}

// const gnb = () => {
//     $("#gnb > ul > li > .depth1").on("mouseenter", () => {
        
//     });
// }


// $( document ).ready(function() {
//     init(); 
//     gnb();
// })


