//global parameters-------------------------------------------
var keyIsHeld = false;
//------------------------------------------------------------

function getInput(){
    //If a key is pressed
    if (Keys.left & !keyIsHeld & !Keys.right) {
        if (player.movingRight){
            player.isChangingDirection = true
        }
        player.movingRight = false;
        keyIsHeld = true;
    }
    else if (Keys.right & !keyIsHeld) {
        if (!player.movingRight){
            player.isChangingDirection = true
        }
        player.movingRight = true;
        keyIsHeld = true;
    }
    else if (Keys.up & !player.isMoving &!keyIsHeld){
        player.enteringHouse = true;
        keyIsHeld = true;
    }
    else{
        keyIsHeld = false;
    }
}

