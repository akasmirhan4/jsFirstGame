function Player(){
    this.timer = 0;
    this.interval = null;
    this.xpos = initposx;
    this.ypos = initposy;
    this.isMoving = false;
    this.movingRight = true;
    this.isChangingDirection = false;
    this.imageInterval = 0;
    this.enteringHouse = false;
    this.path = "url('assets/unicorn4.png') "

    this.Move = function(){
        if(this.movingRight){
            imleft = -pixelSize*this.imageInterval+px
            imtop = 0 + px
            this.xpos+=4;
            document.getElementById("player").style.background = this.path+ imleft + " " + imtop
            document.getElementById("player").style.left = this.xpos+px;
            this.imageInterval++;
            if (this.imageInterval >= 8){
                this.imageInterval = 0
                this.isMoving = false
                clearInterval(this.interval)
            }
        }
        else{
            imleft = -pixelSize*this.imageInterval+px
            imtop = -pixelSize+px
            this.xpos-=4;
            document.getElementById("player").style.background = this.path+ imleft + " " + imtop
            document.getElementById("player").style.left = this.xpos+px;
            this.imageInterval++;
            if (this.imageInterval >= 8){
                this.imageInterval = 0
                this.isMoving = false
                clearInterval(this.interval)
            }
        }
    };

    this.Turn = function(){
        if(!this.movingRight){
            imleft = -pixelSize*this.imageInterval+px
            imtop = -pixelSize*2+px
            document.getElementById("player").style.background = this.path+ imleft + " " + imtop
            document.getElementById("player").style.left = this.xpos+px;
            this.imageInterval++;
            if (this.imageInterval >= 8){
                this.imageInterval = 0
                this.isMoving = false
                clearInterval(this.interval)
            }
        }
        else{
            imleft = -pixelSize*this.imageInterval+px
            imtop = -pixelSize*3+px
            document.getElementById("player").style.background = this.path+ imleft + " " + imtop
            document.getElementById("player").style.left = this.xpos+px;
            this.imageInterval++;
            if (this.imageInterval >= 8){
                this.imageInterval = 0
                this.isMoving = false
                clearInterval(this.interval)
            }
        }
    };

    this.Enter = function(){
        this.imageInterval++;
        if (this.imageInterval >= 2){
            this.imageInterval = 0
            this.isMoving = false
            clearInterval(this.interval)
            this.path = "url('assets/4unicorn_withChild.png')"
        }
    }

    this.setMove = function(fps){
        if (this.interval){
            clearInterval(this.interval);
        }
        var self = this;
        this.interval = setInterval(function(){
            self.Move();
        },1000/fps)
    };

    this.setTurn = function(fps){
        if (this.interval){
            clearInterval(this.interval);
        }
        var self = this;
        this.interval = setInterval(function(){
            self.Turn();
        },1000/fps)
    };
    this.setEnter = function(fps){
        if (this.interval){
            clearInterval(this.interval);
        }
        var self = this;
        this.interval = setInterval(function(){
            self.Enter();
        },1000/fps)
    };
}

/*
var Player = {
    xpos : initposx,
    ypos : initposy,
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
                this.xpos++;
                document.getElementById("player").style.background = "url('assets/unicorn.png') "+ imleft + " " + imtop
                document.getElementById("player").style.left = this.xpos+px;
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
                this.xpos--;
                document.getElementById("player").style.background = "url('assets/unicorn.png') "+ imleft + " " + imtop
                document.getElementById("player").style.left = this.xpos+px;
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
                document.getElementById("player").style.background = "url('assets/unicorn.png') "+ imleft + " " + imtop
                document.getElementById("player").style.left = this.xpos+px;
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
                document.getElementById("player").style.background = "url('assets/unicorn.png') "+ imleft + " " + imtop
                document.getElementById("player").style.left = this.xpos+px;
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