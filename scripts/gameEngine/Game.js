//Global variables------------------------------------------------------------------
FPS = 24;
px = "px";
pixelSize = 32*4
unloadScrollBars();
//End Global variables--------------------------------------------------------

//Gameloop
function Game() {
    //showPlayerPosition();
    getInput();
    gameLogic();
    update();
    render();
    requestAnimationFrame(Game);
}

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



function render(){
    house1.render();
}




if (windowIsReady()) {
    var world = new World();
    var worldAnimation = new Animate(world);
    var house1 = new gameObject("house",pixelSize*3,pixelSize,pixelSize*3,pixelSize*2,"assets/house.png",1);
    var player = new Player();
    var playerAnimation = new Animate(player);

    requestAnimationFrame(Game);
}
else {
    document.body.innerText = "Please maximize window and set to default zoom. Refresh the page."
}
