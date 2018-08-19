class Animate {
    constructor(object) {
        this.object = object;
        this.left_to_be = null;
        this.bottom_to_be = null;
        this.interval = null;
        this.speed = null;
        this.isAnimating = false;
    }
    translate(dx, dy, fps = 60, speed = 32) {
        if (!this.isAnimating) {
            this.isAnimating = true;
            this.speed = speed;
            this.left_to_be = this.object.left + dx;
            this.bottom_to_be = this.object.bottom + dy;
            var self = this;
            this.interval = window.setInterval(function () {
                dx = self.left_to_be - self.object.left;
                dy = self.bottom_to_be - self.object.bottom;
                if (Math.abs(self.object.left - self.left_to_be +
                    self.object.bottom - self.bottom_to_be) < 0.01) {
                    clearInterval(self.interval);
                    self.object.setPosition(self.left_to_be, self.bottom_to_be);
                    self.isAnimating = false;
                }
                else {
                    if (dx > 0) {
                        self.object.setPosition(self.object.left + self.speed, self.object.bottom);
                        //if the object surpass the destination
                        if (self.object.left > self.left_to_be) {
                            self.object.setPosition(self.left_to_be, self.bottom_to_be);
                        }
                    }
                    else if (dx < 0) {
                        self.object.setPosition(self.object.left - self.speed, self.object.bottom);
                        //if the object surpass the destination
                        if (self.object.left < self.left_to_be) {
                            self.object.setPosition(self.left_to_be, self.object.bottom);
                        }
                    }
                    if (dy > 0) {
                        self.object.setPosition(self.object.left, self.object.bottom + self.speed);
                        //if the object surpass the destination
                        if (self.object.bottom > self.bottom_to_be) {
                            self.object.setPosition(self.object.left, self.bottom_to_be);
                        }
                    }
                    else if (dy < 0) {
                        self.object.setPosition(self.object.left, self.object.bottom - self.speed);
                        //if the object surpass the destination
                        if (self.object.bottom < self.bottom_to_be) {
                            self.object.setPosition(self.object.left, self.bottom_to_be);
                        }
                    }
                }
            }, 1000 / fps);
        }
    };
}

function screenFadeInBlack(duration = 0, frequency = 60) {
    var blackOverlay = document.createElement("div")
    blackOverlay.id = "blackOverlay"

    //if element has not exist
    if (!document.getElementById(blackOverlay.id)) {
        document.body.appendChild(blackOverlay);
    }
    document.getElementById(blackOverlay.id).style.position = "absolute"
    document.getElementById(blackOverlay.id).style.backgroundColor = "000000"
    document.getElementById(blackOverlay.id).style.left = 0 + px;
    document.getElementById(blackOverlay.id).style.bottom = 0 + px;
    document.getElementById(blackOverlay.id).style.width = "100%";
    document.getElementById(blackOverlay.id).style.height = "100%";
    document.getElementById(blackOverlay.id).style.opacity = 0;

    //if both duration and frequency have values
    if (duration && frequency) {
        var dOpacity = 1000 / (duration * frequency)
        var fadeInBlack = setInterval(function () {
            if (parseFloat(document.getElementById(blackOverlay.id).style.opacity) >= 1) {
                document.getElementById(blackOverlay.id).style.opacity = 1;
                clearInterval(fadeInBlack);
            }
            else {
                document.getElementById(blackOverlay.id).style.opacity = parseFloat(document.getElementById(blackOverlay.id).style.opacity) + dOpacity;
            }
        }, 1000 / frequency);
    }
    else {
        document.getElementById(blackOverlay.id).style.opacity = 1;
    }
}

function screenFadeOutBlack(duration = 0, frequency = 60) {
    var blackOverlayid = "blackOverlay"
    if (!document.getElementById(blackOverlayid)) {
        console.log("The screen has not been called to fade into black")
    }
    else if (parseFloat(document.getElementById(blackOverlay.id).style.opacity) < 1) {
        var waitingInterval = 1000;
        var waitingScreenFadeToBlack = setInterval(function(){
            if(parseFloat(document.getElementById(blackOverlay.id).style.opacity) < 1){
                console.log("Waiting for screen to go black")
            }
            else{
                clearInterval(waitingScreenFadeToBlack)
                screenFadeOutBlack(duration,frequency)
            }
        },waitingInterval)
    }
    else {
        if (duration && frequency) {
            var dOpacity = 1000 / (duration * frequency)
            var fadeOutBlack = setInterval(function () {
                if (parseFloat(document.getElementById(blackOverlayid).style.opacity) <= 0) {
                    document.getElementById(blackOverlayid).style.opacity = 0;
                    clearInterval(fadeOutBlack);
                    var overlayElement = document.getElementById(blackOverlayid)
                    overlayElement.parentNode.removeChild(overlayElement)
                }
                else {
                    document.getElementById(blackOverlayid).style.opacity = parseFloat(document.getElementById(blackOverlay.id).style.opacity) - dOpacity;
                }
            }, 1000 / frequency);
        }
        else {
            document.getElementById(blackOverlayid).style.opacity = 0;
            var overlayElement = document.getElementById(blackOverlayid)
            overlayElement.parentNode.removeChild(overlayElement)
        }
    }
}