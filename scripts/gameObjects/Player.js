class Player extends gameObject {
    constructor(id = "player", left, bottom, width, height, imagePath, im_x = 0, im_y = 0, layer = 3) {
        super(id, left, bottom, width, height, imagePath, im_x, im_y, layer);
        this.facingRight = true;
        this.enteringHouse = false;
        this.setStates("IDLE", "MOVE", "TURN", "ACTION");
        this.setState("IDLE");
    }
    Action() {
        //Loop all gameObject that is interactable in the current
        //TODO:Find all interactable gameObject
        let self = this;
        gameObjects.forEach(function (gameObject) {
            if (self.isOverlapping(gameObject)) {
                gameObject.interact();
            }
        })

        //worldAnimation.translate(0,pixelSize*(world.houseTileHeight))
    };
    Move() {
        //facing right
        if (this.facingRight) {
            //dont translate if object reach edge
            if (this.left_screen + this.width < screen.availWidth && this.left + this.width < world.width) {
                this.setPosition(this.left + 4, this.bottom)
            }
            //change image frame
            this.setImagePathPosition(-this.width * this.imageInterval, 0)

        }
        //facing left
        else {
            //dont translate if pony reach edge
            if (this.left_screen > 0) {
                this.setPosition(this.left - 4, this.bottom)
            }
            //change image frame
            this.setImagePathPosition(-this.width * this.imageInterval, -this.height)

        }
        //increment for next frame
        this.imageInterval++;

        //reset image frame if reach the end of animation
        if (this.imageInterval >= 8) {
            this.clearInterval();
        }
    };
    Turn() {
        this.state = this.getState(2)
        //change image frame based on where object is heading
        if (this.facingRight) {
            this.setImagePathPosition(-this.width * this.imageInterval, -3 * this.height)
        } else {
            this.setImagePathPosition(-this.width * this.imageInterval, -2 * this.height)
        }

        //increment for next frame
        this.imageInterval++;

        //reset image frame if reach the end of animation
        if (this.imageInterval >= 8) {
            this.clearInterval();
        }
    };
    Enter() {
        this.state = this.getState(3)
        this.imageInterval++;
        if (this.imageInterval >= 2) {
            this.clearInterval();
            // this.setImagePath('assets/4unicorn_withChild.png');
        }
    };
    interact(){
        return 0;
    }
}


