//Global variables------------------------------------------------------------------
FPS = 24;
//End Global variables--------------------------------------------------------
function update() {
    //for debug=========================================
    if(bool_togglePlayerPosition){
        textPosition.updatePosition(player.left, player.bottom);
        textPosition.updateText(player.left + "," + player.bottom);
    }
    //==================================================

    if (player.enteringHouse) {
        if (house1.checkInFrontDoor(player)) {
            player.setEnter(2);
            house1.gettingChild();
        }
        else {
            player.enteringHouse = false;
        }
    }
    else if (!player.isMoving & keyIsHeld & player.isChangingDirection) {
        player.setTurn(FPS);
        player.isMoving = true;
        player.isChangingDirection = false;
    }
    else if (!player.isMoving & keyIsHeld & !player.isChangingDirection) {
        player.setMove(FPS);
        player.isMoving = true;
    }
}
function Game() {
    getInput()
    update()
    gameLogic()
    requestAnimationFrame(Game);
}
function gameLogic() {
    //Check for player at the edge of screen i.e 95% and 5%
    if (player.left_screen + player.width > screen.availWidth * 0.95) {
        if (world.left != -world.width + screen.availWidth) {
            player.left_screen = screen.availWidth * 0.05;
            worldAnimation.translate(-screen.availWidth, 0)
            playerAnimation.translate(screen.availWidth * 0.1 + pixelSize, 0);
        }
    }
    else if (player.left_screen < screen.availWidth * 0.05) {
        if (world.left != 0) {
            player.left_screen = screen.availWidth * 0.95 - pixelSize;
            worldAnimation.translate(screen.availWidth, 0);
            playerAnimation.translate(-screen.availWidth * 0.1 - pixelSize, 0);
        }
    }
}
//Initialize all gameobject
if (windowIsReady()) {
    requestAnimationFrame(Game);
    var world = new World();
    var worldAnimation = new Animate(world);
    var house1 = new House();
    var player = new Player();
    var playerAnimation = new Animate(player);

}
else {
    document.body.innerText = "Please maximize window and set to default zoom. Refresh the page."
}
