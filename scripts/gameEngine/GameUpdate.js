function update() {
    //for debug-------------------------------------------------------------------------------

    if(bool_togglePlayerPosition){
        textPosition.setPosition(player.left, player.bottom);
        textPosition.setText(player.left + "," + player.bottom);
    }

    //----------------------------------------------------------------------------------------
    if (player.enteringHouse) {
        if (house1.checkInFrontDoor(player)) {
            player.setEnter(2);
            house1.gettingChild();
        }
        else {
            player.enteringHouse = false;
        }
    }
    if (player.state == player.getStateIndex("IDLE")){
        if (Keys.left || Keys.right){
            if (player.isChangingDirection){
                player.isChangingDirection = false;
                player.setState("TURN");
                player.setInterval(FPS);
            }
            else{
                player.setState("MOVE");
                player.setInterval(FPS);

            }
        }
        else{
            player.isChangingDirection = false;
        }
    }
}

function render(){
    world.render();
    house1.render();
    player.render();
    if (textPosition){
        textPosition.render();
    }

}
