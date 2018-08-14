//List of key events
var Keys = {
    left: false,
    right: false,
    up: false
};

//OnKeyDown Event
window.onkeydown = function(e) {
    var kc = e.keyCode;
    e.preventDefault();
    if      (kc === 37 & !Keys.right){ Keys.left = true;}
    else if (kc === 39 & !Keys.left) Keys.right = true;
    else if (kc === 38){
        Keys.up = true;
    }
};

//OnKeyUp
window.onkeyup = function(e) {
    var kc = e.keyCode;
    e.preventDefault();

    if      (kc === 37) Keys.left = false;
    else if (kc === 39) Keys.right = false;
    else if (kc === 38) Keys.up = false;

};