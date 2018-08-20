class World extends gameObject {
    constructor(tileWidth = 64, tileHeight = 64) {
        super("world", 0, 0, pixelSize * tileWidth, pixelSize * tileHeight, null, null, null)
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.initializeWorld();

        window.onresize = function () { world.initializeGround(); }
    }
    initializeWorld() {
        //Load world element------------------------------------------
        this.element.style.backgroundColor = "#484e4c";
        this.element.style.zIndex = -1;
        //set layers
        var layer = document.createElement("div");
        layer.id = "layer0";
        this.element.appendChild(layer);
        layer = document.createElement("div");
        layer.id = "layer1";
        this.element.appendChild(layer);
        layer = document.createElement("div");
        layer.id = "layer2";
        this.element.appendChild(layer);
        layer = document.createElement("div");
        layer.id = "layer3";
        this.element.appendChild(layer);
        this.initializeGround();
    };
    initializeGround() {
        //delete ground
        var myNode = document.getElementById("layer0");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        //create ground
        var ground = document.createElement("div");
        ground.id = "ground";
        document.getElementById("layer0").appendChild(ground);
        //Create the ground tile
        for (var x = 0; x < this.width; x += pixelSize) {
            var tile = document.createElement("div");
            tile.style.position = "absolute";
            tile.style.left = x + px;
            tile.style.bottom = this.bottom + px;
            tile.style.width = pixelSize + px;
            tile.style.height = pixelSize + px;
            tile.style.background = "url('assets/tileset4.png') " + 0 + px + " " + 0 + px;
            document.getElementById("ground").appendChild(tile);
        }
        //Create the second up ground tile
        for (x = 0; x < this.width; x += pixelSize) {
            var tile = document.createElement("div");
            tile.style.position = "absolute";
            tile.style.left = x + "px";
            tile.style.bottom = pixelSize + px;
            tile.style.width = pixelSize + px;
            tile.style.height = pixelSize + px;
            tile.style.background = "url('assets/tileset4.png')" + (-pixelSize) + px + " " + 0 + px;
            document.getElementById("ground").appendChild(tile);
        }
    };

    interact(){
        return 0;
    }
    delete(){
        super.delete();
        window.onresize = null;
    }
};


