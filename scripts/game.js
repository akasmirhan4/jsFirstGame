FPS = 24;
var house1 = new House();
textmanager = new TextManager()
var Player = new Player();
str = "I am a normal pony. Please play with me. Come out.\nI will not hurt you... much"

if (textmanager.isReady){
    textmanager.read(str,Player.xpos,Player.ypos)
}


function Game(){
    getInput()
    update()
    requestAnimationFrame(Game);
}

function update() {
    textmanager.updatePosition(Player.xpos,Player.ypos);
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
