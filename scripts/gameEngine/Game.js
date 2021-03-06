//Global variables------------------------------------------------------------------
FPS = 24;
px = "px";
pixelSize = 32*4
unloadScrollBars();
world = null;
//End Global variables--------------------------------------------------------

//Gameloop
function Game() {
    //showPlayerPosition();
    playerInput();
    gameLogic();
    update();
    render();
    requestAnimationFrame(Game);
}

//Check if window is ready
if (windowIsReady()) {
    document.body.style.backgroundColor = "#1d1c19"
    world = new World();
    var worldAnimation = new Animate(world);

    var house1 = new House("house",pixelSize*3,pixelSize,pixelSize*3,pixelSize*2,"assets/house.png",1);

    var player = new Player("player",pixelSize*2,pixelSize,pixelSize,pixelSize,"assets/unicorn4.png");
    var playerAnimation = new Animate(player);

    requestAnimationFrame(Game);
}
else {
    document.body.innerText = "Please maximize window and set to default zoom. Refresh the page."
}
