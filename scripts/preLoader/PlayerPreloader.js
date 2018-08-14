//global parameters-------------------------------------------
initposx = pixelSize;
initposy = pixelSize;
//------------------------------------------------------------

//EVENTS------------------------------------------------------

//------------------------------------------------------------

//Player element-----------------------------------------------
player = document.createElement("div")
player.id = "player"
document.body.appendChild(player)
document.getElementById("player").className = 'Player';
document.getElementById("player").style.position = 'absolute';
document.getElementById("player").style.left = initposx+px;
document.getElementById("player").style.bottom = initposy+px;
document.getElementById("player").style.width = pixelSize+px;
document.getElementById("player").style.height = pixelSize+px;
document.getElementById("player").style.background = "url('assets/unicorn4.png')";
