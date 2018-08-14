//global parameters-------------------------------------------
pixelSize = 32 * 4;
px = "px"
//------------------------------------------------------------

//Load world element------------------------------------------
world = document.createElement("div");
world.id = "world";
document.body.appendChild(world);
document.getElementById("world").className = "World";
document.getElementById("world").style.position = 'fixed';
document.getElementById("world").style.left = "0px";
document.getElementById("world").style.top = "0px";
document.getElementById("world").style.height = "100%";
document.getElementById("world").style.width = "100%";
document.getElementById("world").style.backgroundColor = "#484e4c";


//create ground
ground = document.createElement("div");
ground.id = "ground";
document.getElementById("world").appendChild(ground);
document.getElementById("ground").classList.add("World");

//Create the ground tile
for (x = 0; x < window.innerWidth; x += pixelSize) {
    var tile = document.createElement("div")
    tile.style.position = "absolute";
    tile.style.left = x + "px";
    tile.style.bottom = "0px";
    tile.style.width = pixelSize + px;
    tile.style.height = pixelSize + px;
    tile.style.background = "url('assets/tileset4.png') 0px 0px";
    document.getElementById("ground").appendChild(tile)
}
//Create the second up ground tile
for (x = 0; x < window.innerWidth; x += pixelSize) {
    var tile = document.createElement("div")
    tile.style.position = "absolute";
    tile.style.left = x + "px";
    tile.style.bottom = pixelSize + px;
    tile.style.width = pixelSize + px;
    tile.style.height = pixelSize + px;
    tile.style.background = "url('assets/tileset4.png')" + (-pixelSize) + px + " " + 0 + px;
    document.getElementById("ground").appendChild(tile)
}