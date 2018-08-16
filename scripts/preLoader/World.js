//Global variables-------------------------------------------------
px = "px"
pixelSize = 32*4
//End Global variables----------------------------------------------

//Start events----------------------------------------------------
unloadScrollBars();
//End events-------------------------------------------------------

var World = function () {
    this.left_to_be = null;
    this.bottom_to_be = null;
    this.left = 0;
    this.bottom = 0;
    this.tileWidth = 64;
    this.tileHeight = 64;
    this.id = "world"
    this.width = pixelSize*this.tileWidth;
    this.height = pixelSize*this.tileHeight;
    this.shiftRight = function () {
        //TODO
        this.left++;
    }

    this.shiftLeft = function () {
        //TODO
        this.left--;
    }

    this.initializeWorld = function () {
        //Delete world first
        var myNode = document.body;
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        //Load world element------------------------------------------
        world = document.createElement("div");
        world.id = this.id;
        document.body.appendChild(world);
        document.getElementById(this.id).className = "World";
        document.getElementById(this.id).style.position = 'absolute';
        document.getElementById(this.id).style.left = this.left + px;
        document.getElementById(this.id).style.bottom = this.bottom + px;
        document.getElementById(this.id).style.height = this.height + px;
        document.getElementById(this.id).style.width = this.width + px;
        document.getElementById(this.id).style.backgroundColor = "#484e4c";

        //set layers
        layer = document.createElement("div");
        layer.id = "layer0";
        document.getElementById(this.id).appendChild(layer);

        layer = document.createElement("div");
        layer.id = "layer1";
        document.getElementById(this.id).appendChild(layer);

        layer = document.createElement("div");
        layer.id = "layer2";
        document.getElementById(this.id).appendChild(layer);

        layer = document.createElement("div");
        layer.id = "layer3";
        document.getElementById(this.id).appendChild(layer);

        this.initializeGround();
    }

    this.initializeGround = function () {
        //delete ground
        var myNode = document.getElementById("layer0");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        //create ground
        ground = document.createElement("div");
        ground.id = "ground";

        document.getElementById("layer0").appendChild(ground);

        //Create the ground tile
        for (x = 0; x < this.width; x += pixelSize) {
            var tile = document.createElement("div")
            tile.style.position = "absolute";
            tile.style.left = x + px;
            tile.style.bottom = this.bottom + px;
            tile.style.width = pixelSize + px;
            tile.style.height = pixelSize + px;
            tile.style.background = "url('assets/tileset4.png') " + 0 + px + " " + 0 + px;
            document.getElementById("ground").appendChild(tile)
        }
        //Create the second up ground tile
        for (x = 0; x < this.width; x += pixelSize) {
            var tile = document.createElement("div")
            tile.style.position = "absolute";
            tile.style.left = x + "px";
            tile.style.bottom = pixelSize + px;
            tile.style.width = pixelSize + px;
            tile.style.height = pixelSize + px;
            tile.style.background = "url('assets/tileset4.png')" + (-pixelSize) + px + " " + 0 + px;
            document.getElementById("ground").appendChild(tile)
        }
    }

    this.initializeWorld();
    var self = this;
    window.onresize = function(){self.initializeGround();}
}
