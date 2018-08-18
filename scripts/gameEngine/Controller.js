//global parameters------------------------------------------
UpPressed = false;
f2Pressed = false;
//------------------------------------------------------------

function playerInput() {
    //only move when player is idle
    if (player.state == player.getStateIndex("IDLE")) {
        //If a key is pressed
        if (Keys.left) {
            if (player.facingRight) {
                player.isChangingDirection = true
            }
            player.facingRight = false;
        }
        else if (Keys.right) {
            if (!player.facingRight) {
                player.isChangingDirection = true
            }
            player.facingRight = true;
        }
    }

    if (Keys.up){
        if(!UpPressed) {
            player.Action();
            UpPressed = true;
        }
    }
    else{
        UpPressed = false;
    }
    if (Keys.f2){
        if(!f2Pressed) {
            togglePlayerPosition()
            f2Pressed = true;
        }
    }
    else{
        f2Pressed = false;
    }
}
