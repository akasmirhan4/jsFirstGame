//Only run the game when the screen is maximized and at default zoom
function windowIsReady(){
    var isAtMaxWidth = screen.availWidth - window.innerWidth === 0;
    var screenPixelRatio = (window.outerWidth - 8) / window.innerWidth;
    var isAtDefaultZoom = screenPixelRatio > 0.92 && screenPixelRatio <= 1.10;
    return isAtMaxWidth && isAtDefaultZoom;
}

//List of key events
var Keys = {
    left: false,
    right: false,
    up: false,
    f2: false,
};

//OnKeyDown Event
window.onkeydown = function(e) {
    var kc = e.keyCode;
    e.preventDefault();
    if      (kc === 37 & !Keys.right){ Keys.left = true;}
    else if (kc === 39 & !Keys.left) Keys.right = true;

    if (kc === 38){
        Keys.up = true;
    }
    if (kc === 113){
        Keys.f2 = true;
    }
};

//OnKeyUp
window.onkeyup = function(e) {
    var kc = e.keyCode;
    e.preventDefault();

    if      (kc === 37) Keys.left = false;
    if (kc === 39) Keys.right = false;

    if (kc === 38) Keys.up = false;

    if (kc === 113) Keys.f2 = false;

};

function reloadScrollBars() {
    document.documentElement.style.overflow = 'auto';  // firefox, chrome
    document.body.scroll = "yes"; // ie only
}

function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    document.body.scroll = "no"; // ie only
}
