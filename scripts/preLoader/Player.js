function Player() {
    this.width = pixelSize;
    this.height = pixelSize;
    this.id = "player"
    this.interval = null;
    this.left_screen = null;
    this.bottom_screen = null;
    this.left = null;
    this.bottom = null;
    this.isMoving = false;
    this.movingRight = true;
    this.isChangingDirection = false;
    this.imageInterval = 0;
    this.enteringHouse = false;
    this.path = "url('assets/unicorn4.png') "

    this.Move = function () {
        if (this.movingRight) {
            //dont translate if pony reach edge
            if (this.left_screen + this.width < screen.availWidth) {
                this.left += 4;
                this.left_screen += 4;
            }
            imleft = -pixelSize * this.imageInterval + px
            imtop = 0 + px
            document.getElementById(this.id).style.background = this.path + imleft + " " + imtop
            document.getElementById(this.id).style.left = this.left + px;
            this.imageInterval++;
            if (this.imageInterval >= 8) {
                this.imageInterval = 0
                this.isMoving = false
                clearInterval(this.interval)
            }
        }
        else {
            //dont translate if pony reach edge
            if (this.left_screen > 0) {
                this.left -= 4;
                this.left_screen -= 4;
            }
            imleft = -pixelSize * this.imageInterval + px
            imtop = -pixelSize + px
            document.getElementById(this.id).style.background = this.path + imleft + " " + imtop
            document.getElementById(this.id).style.left = this.left + px;
            this.imageInterval++;
            if (this.imageInterval >= 8) {
                this.imageInterval = 0
                this.isMoving = false
                clearInterval(this.interval)
            }
        }
    };

    this.Turn = function () {
        if (!this.movingRight) {
            imleft = -pixelSize * this.imageInterval + px
            imtop = -pixelSize * 2 + px
            document.getElementById(this.id).style.background = this.path + imleft + " " + imtop
            document.getElementById(this.id).style.left = this.left + px;
            this.imageInterval++;
            if (this.imageInterval >= 8) {
                this.imageInterval = 0
                this.isMoving = false
                clearInterval(this.interval)
            }
        }
        else {
            imleft = -pixelSize * this.imageInterval + px
            imtop = -pixelSize * 3 + px
            document.getElementById(this.id).style.background = this.path + imleft + " " + imtop
            document.getElementById(this.id).style.left = this.left + px;
            this.imageInterval++;
            if (this.imageInterval >= 8) {
                this.imageInterval = 0
                this.isMoving = false
                clearInterval(this.interval)
            }
        }
    };

    this.Enter = function () {
        this.imageInterval++;
        if (this.imageInterval >= 2) {
            this.imageInterval = 0
            this.isMoving = false
            clearInterval(this.interval)
            this.path = "url('assets/4unicorn_withChild.png')"
        }
    }

    this.setMove = function (fps) {
        if (this.interval) {
            clearInterval(this.interval);
        }
        var self = this;
        this.interval = setInterval(function () {
            self.Move();
        }, 1000 / fps)
    };

    this.setTurn = function (fps) {
        if (this.interval) {
            clearInterval(this.interval);
        }
        var self = this;
        this.interval = setInterval(function () {
            self.Turn();
        }, 1000 / fps)
    };
    this.setEnter = function (fps) {
        if (this.interval) {
            clearInterval(this.interval);
        }
        var self = this;
        this.interval = setInterval(function () {
            self.Enter();
        }, 1000 / fps)
    };
    this.initialize = function (left, bottom) {
        this.left = left;
        this.bottom = bottom;
        this.left_screen = left;
        this.bottom_screen = bottom;
        var playerElement = document.createElement("div")
        playerElement.id = this.id
        document.getElementById("layer2").appendChild(playerElement)
        document.getElementById(this.id).className = 'Player';
        document.getElementById(this.id).style.position = 'absolute';
        document.getElementById(this.id).style.left = this.left + px;
        document.getElementById(this.id).style.bottom = this.bottom + px;
        document.getElementById(this.id).style.width = this.width + px;
        document.getElementById(this.id).style.height = this.height + px;
        document.getElementById(this.id).style.background = "url('assets/unicorn4.png')";
    }

    this.initialize(pixelSize * 2, pixelSize)
}

/*
var Player = {
    left : initposx,
    bottom : initposy,
    isMoving : false,
    movingRight : true,
    isChangingDirection: false,
    imageInterval : 0,
    self = this,
    Move : function(){
        setInterval(function(){
            if(this.movingRight){
                imleft = pixelSize*this.imageInterval+px
                imtop = 0 + px
                this.left++;
                document.getElementById(this.id).style.background = "url('assets/unicorn.png') "+ imleft + " " + imtop
                document.getElementById(this.id).style.left = this.left+px;
                this.imageInterval++;
                if (this.imageInterval >= 8){
                    this.imageInterval = 0
                    this.isMoving = false;
                    clearInterval(moving);
                }
            }
            else{
                imleft = pixelSize*this.imageInterval+px
                imtop = 32+px
                this.left--;
                document.getElementById(this.id).style.background = "url('assets/unicorn.png') "+ imleft + " " + imtop
                document.getElementById(this.id).style.left = this.left+px;
                this.imageInterval++;
                if (this.imageInterval >= 8){
                    this.imageInterval = 0
                    this.isMoving = false;
                    clearInterval(moving);
                }
            }
        },1000/FPS);
    },
    Turn : function(){
        setInterval(function(){
            if(this.movingRight){
                imleft = pixelSize*this.imageInterval+px
                imtop = 64+px
                document.getElementById(this.id).style.background = "url('assets/unicorn.png') "+ imleft + " " + imtop
                document.getElementById(this.id).style.left = this.left+px;
                imageInterval += 1
                if (imageInterval >= 8){
                    imageInterval = 0
                    isMoving = false;
                    clearInterval(turning);
                }
            }
            else{
                imleft = pixelSize*this.imageInterval+px
                imtop = 96+px
                document.getElementById(this.id).style.background = "url('assets/unicorn.png') "+ imleft + " " + imtop
                document.getElementById(this.id).style.left = this.left+px;
                this.imageInterval ++
                if (this.imageInterval >= 8){
                    this.imageInterval = 0
                    this.isMoving = false;
                    clearInterval(turning);
                }
            }
        },1000/FPS)
    }
}
 */