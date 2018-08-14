//global parameters-------------------------------------------
var keyIsHeld = false;
//------------------------------------------------------------

function getInput(){
    //If a key is pressed
    if (Keys.left & !keyIsHeld) {
        if (Player.movingRight){
            Player.isChangingDirection = true
        }
        console.clear()
        console.log("left")
        Player.movingRight = false;
        keyIsHeld = true;
    }
    else if (Keys.right & !keyIsHeld) {
        if (!Player.movingRight){
            Player.isChangingDirection = true
        }
        Player.movingRight = true;
        keyIsHeld = true;
        console.clear()
        console.log("RIGHT")
    }
    else if (Keys.up & !Player.isMoving &!keyIsHeld){
        Player.enteringHouse = true;
        keyIsHeld = true;
    }
    else{
        keyIsHeld = false;
    }
}

