


const init = () => {
    let baseURl = window.location.hostname
    let url = $("#logoLink").attr("href");
    const hostname = !baseURl.includes("github") ? baseURl + ":5500" : baseURl + "/portfolio";
    const fullUrl = hostname + url;
    $("#logoLink").attr("href", fullUrl);
}

// A $( document ).ready() block.
$( document ).ready(function() {
    init();

})

