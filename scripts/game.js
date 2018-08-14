FPS = 24;
var house1 = new House();
var Player = new Player();
function Game(){
    getInput()
    update()
    requestAnimationFrame(Game);
}

function update() {
    if (Player.enteringHouse){
        if(house1.checkInFrontDoor(Player.xpos+pixelSize)){
            Player.setEnter(2);
            house1.gettingChild();
        }
        else{
            Player.enteringHouse = false;
        }
    }
    else if (!Player.isMoving  & keyIsHeld & Player.isChangingDirection){
        Player.setTurn(FPS);
        Player.isMoving = true;
        Player.isChangingDirection = false;
    }
    else if (!Player.isMoving & keyIsHeld & !Player.isChangingDirection){
        Player.setMove(FPS);
        Player.isMoving = true;
    }
}

requestAnimationFrame(Game);
