$(function () {
    
    $("#js-rotating").Morphext({
        // The [in] animation type. Refer to Animate.css for a list of available animations.
        animation: "FlipInX",
        // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
        separator: ",",
        // The delay between the changing of each phrase in milliseconds.
        speed: 2000,
    });

    // Set log in the local storage to disable the animation class for the header
    var logged = localStorage.getItem('logged');
    if (logged) {
        $('.navbar').removeClass('animate__animated').removeClass('animate__fadeInDown');
    } else {
        localStorage.setItem('logged', true);
        $('.navbar').addClass('animate__animated').addClass('animate__fadeInDown');
    }
});

