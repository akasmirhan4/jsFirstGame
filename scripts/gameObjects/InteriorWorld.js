function EnteringHouse() {
    var transitionTime = 5000;
    screenFadeInBlack(transitionTime / 2);
    setTimeout(function () {
        world.delete();
        screenFadeOutBlack(transitionTime / 2);
        world = new Interior(6, 10, 3);
        worldAnimation.object = world;
        player.initialize();
    }, transitionTime / 2);

}

class Interior extends gameObject {
    // Interior creates the structural art of the building through tilemap.
    // This is before implementing interior decoration

    constructor(houseTileWidth = 4, houseTileHeight = 5, nFloor = 1, interior = 0) {
        //houseTileWidth    --  the width of the house in terms of tile
        //houseTileHeight   --  the height of each floor in terms of tile
        //nFloor            --  the number of floor
        //interior          --  the interior design: [0: blue(default), 1: green, 2: red, 3: brown]
        var width = houseTileWidth * pixelSize
        var height = houseTileHeight * nFloor * pixelSize
        super("world", 0, 0, width, height, null, null, null, -1)

        this.houseTileWidth = houseTileWidth
        this.houseTileHeight = houseTileHeight
        this.nFloor = nFloor
        this.interior = interior
        this.layoutImagePath = "assets/houseLayout_32x4_4_7.png"
        this.interiorImagePath = null;
        this.id = "world"
        this.initializeWorld()
    }
    initializeWorld() {
        //Load world element------------------------------------------
        //TODO: CHANGE BACKGROUND COLOR BASED ON INTERIOR
        document.getElementById(this.id).style.backgroundColor = "#31363d";
        document.getElementById(this.id).style.zIndex = -1;

        //set the world at the center of the screen
        this.setPosition(screen.availWidth / 2 - this.width / 2, 0);
        //set layers
        var layer = document.createElement("div");
        layer.id = "layer-2";
        document.getElementById(this.id).appendChild(layer);
        var layer = document.createElement("div");
        layer.id = "layer-1";
        document.getElementById(this.id).appendChild(layer);
        var layer = document.createElement("div");
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
        this.initializeLayout();
        this.initializeWallpaper();
    }
    initializeLayout() {
        var layout = document.createElement("div");
        layout.id = "interiorLayout";
        document.getElementById("layer-2").appendChild(layout);

        //create container for each floor
        for (var floor = 0; floor < this.nFloor; floor++) {
            let floorElement = document.createElement("div");
            floorElement.id = "floor" + floor;
            layout.appendChild(floorElement);
            floorElement.style.position = "absolute";
            floorElement.style.bottom = this.houseTileHeight * pixelSize * floor + px;
            floorElement.style.left = 0 + px;
            floorElement.style.width = "100%";
            floorElement.style.height = this.houseTileHeight * pixelSize + px;

            //for each floor create three layers wallpaper,layout,objects
            var layer = document.createElement("div");
            layer.id = floorElement.id + "wallpaper";
            floorElement.appendChild(layer);
            var layer = document.createElement("div");
            layer.id = floorElement.id + "layout";
            floorElement.appendChild(layer);
            var layer = document.createElement("div");
            layer.id = floorElement.id + "objects";
            floorElement.appendChild(layer);
        }

        // for every floor except topfloor
        {
            for (var floor = 0; floor < this.nFloor - 1; floor++) {
                let floorElement = document.getElementById("floor" + floor + "layout");

                //roof
                {
                    for (var x = 0; x < this.width; x += pixelSize) {
                        var tile = document.createElement("div");
                        tile.style.position = "absolute";
                        tile.style.left = x + px;
                        tile.style.top = 0 + px;
                        tile.style.width = pixelSize + px;
                        tile.style.height = pixelSize + px;
                        tile.style.background = getBackgroundPosition(this.layoutImagePath, 1, 0, pixelSize);
                        floorElement.appendChild(tile);
                    }
                }

                //left & right wall
                {
                    var alternating = true;
                    for (var bottom = pixelSize; bottom < (this.houseTileHeight - 1) * pixelSize; bottom += pixelSize) {
                        let tileleft = document.createElement("div");
                        tileleft.style.position = "absolute";
                        tileleft.style.left = 0 + px;
                        tileleft.style.bottom = bottom + px;
                        tileleft.style.width = pixelSize + px;
                        tileleft.style.height = pixelSize + px;

                        let tileright = document.createElement("div");
                        tileright.style.position = "absolute";
                        tileright.style.right = 0 + px;
                        tileright.style.bottom = bottom + px;
                        tileright.style.width = pixelSize + px;
                        tileright.style.height = pixelSize + px;
                        if (alternating) {
                            tileleft.style.background = getBackgroundPosition(this.layoutImagePath, 0, 4, pixelSize)
                            tileright.style.background = getBackgroundPosition(this.layoutImagePath, 3, 4, pixelSize)
                            alternating = false;
                        }
                        else {
                            tileleft.style.background = getBackgroundPosition(this.layoutImagePath, 0, 5, pixelSize)
                            tileright.style.background = getBackgroundPosition(this.layoutImagePath, 3, 5, pixelSize)
                            alternating = true;
                        }
                        floorElement.appendChild(tileleft);
                        floorElement.appendChild(tileright);

                    }
                }

                //floor (ground)
                {
                    if (floor != 0) {
                        var im_x = 2;
                    }
                    else {
                        var im_x = 0;
                    }

                    for (var x = 0; x < this.width; x += pixelSize) {
                        var tile = document.createElement("div");
                        tile.style.position = "absolute";
                        tile.style.left = x + px;
                        tile.style.bottom = 0 + px;
                        tile.style.width = pixelSize + px;
                        tile.style.height = pixelSize + px;
                        tile.style.background = getBackgroundPosition(this.layoutImagePath, im_x, 6, pixelSize);
                        floorElement.appendChild(tile);
                    }
                }
            }
        }

        //@topFloor has special layout
        {
            let topFloorElement = document.getElementById("floor" + (this.nFloor - 1) + "layout");
            //roof
            {
                var tile = document.createElement("div");
                tile.style.position = "absolute";
                tile.style.left = 0 + px;
                tile.style.top = 0 + px;
                tile.style.width = pixelSize + px;
                tile.style.height = pixelSize + px;
                tile.style.background = getBackgroundPosition(this.layoutImagePath, 0, 0, pixelSize)
                topFloorElement.appendChild(tile);

                var tile = document.createElement("div");
                tile.style.position = "absolute";
                tile.style.right = 0 + px;
                tile.style.top = 0 + px;
                tile.style.width = pixelSize + px;
                tile.style.height = pixelSize + px;
                tile.style.background = getBackgroundPosition(this.layoutImagePath, 3, 0, pixelSize)
                topFloorElement.appendChild(tile);

                for (var x = pixelSize; x < this.width - pixelSize; x += pixelSize) {
                    var tile = document.createElement("div");
                    tile.style.position = "absolute";
                    tile.style.left = x + px;
                    tile.style.top = 0 + px;
                    tile.style.width = pixelSize + px;
                    tile.style.height = pixelSize + px;
                    tile.style.background = getBackgroundPosition(this.layoutImagePath, 1, 0, pixelSize);
                    topFloorElement.appendChild(tile);
                }
            }
            //left wall
            {
                var tile = document.createElement("div");
                tile.style.position = "absolute";
                tile.style.left = 0 + px;
                tile.style.top = pixelSize + px;
                tile.style.width = pixelSize + px;
                tile.style.height = pixelSize + px;
                tile.style.background = getBackgroundPosition(this.layoutImagePath, 0, 1, pixelSize)
                topFloorElement.appendChild(tile);

                var tile = document.createElement("div");
                tile.style.position = "absolute";
                tile.style.left = pixelSize + px;
                tile.style.top = pixelSize + px;
                tile.style.width = pixelSize + px;
                tile.style.height = pixelSize + px;
                tile.style.background = getBackgroundPosition(this.layoutImagePath, 1, 1, pixelSize)
                topFloorElement.appendChild(tile);

                var tile = document.createElement("div");
                tile.style.position = "absolute";
                tile.style.left = 0 + px;
                tile.style.top = 2 * pixelSize + px;
                tile.style.width = pixelSize + px;
                tile.style.height = pixelSize + px;
                tile.style.background = getBackgroundPosition(this.layoutImagePath, 0, 2, pixelSize)
                topFloorElement.appendChild(tile);

                var tile = document.createElement("div");
                tile.style.position = "absolute";
                tile.style.left = pixelSize + px;
                tile.style.top = 2 * pixelSize + px;
                tile.style.width = pixelSize + px;
                tile.style.height = pixelSize + px;
                tile.style.background = getBackgroundPosition(this.layoutImagePath, 1, 2, pixelSize)
                topFloorElement.appendChild(tile);

                var tile = document.createElement("div");
                tile.style.position = "absolute";
                tile.style.left = 0 + px;
                tile.style.top = 3 * pixelSize + px;
                tile.style.width = pixelSize + px;
                tile.style.height = pixelSize + px;
                tile.style.background = getBackgroundPosition(this.layoutImagePath, 0, 3, pixelSize)
                topFloorElement.appendChild(tile);

                if (this.houseTileHeight > 5) {
                    var extraHeight = this.houseTileHeight - 4
                    var alternating = true;
                    for (var bottom = pixelSize; bottom < pixelSize * extraHeight; bottom += pixelSize) {
                        var tile = document.createElement("div");
                        tile.style.position = "absolute";
                        tile.style.left = 0 + px;
                        tile.style.bottom = bottom + px;
                        tile.style.width = pixelSize + px;
                        tile.style.height = pixelSize + px;
                        if (alternating) {
                            tile.style.background = getBackgroundPosition(this.layoutImagePath, 0, 4, pixelSize)
                            alternating = false;
                        }
                        else {
                            tile.style.background = getBackgroundPosition(this.layoutImagePath, 0, 5, pixelSize)
                            alternating = true;
                        }
                        topFloorElement.appendChild(tile);

                    }
                }

            }
            //right wall
            {
                var tile = document.createElement("div");
                tile.style.position = "absolute";
                tile.style.right = 0 + px;
                tile.style.top = pixelSize + px;
                tile.style.width = pixelSize + px;
                tile.style.height = pixelSize + px;
                tile.style.background = getBackgroundPosition(this.layoutImagePath, 3, 1, pixelSize)
                topFloorElement.appendChild(tile);

                var tile = document.createElement("div");
                tile.style.position = "absolute";
                tile.style.right = pixelSize + px;
                tile.style.top = pixelSize + px;
                tile.style.width = pixelSize + px;
                tile.style.height = pixelSize + px;
                tile.style.background = getBackgroundPosition(this.layoutImagePath, 2, 1, pixelSize)
                topFloorElement.appendChild(tile);

                var tile = document.createElement("div");
                tile.style.position = "absolute";
                tile.style.right = 0 + px;
                tile.style.top = 2 * pixelSize + px;
                tile.style.width = pixelSize + px;
                tile.style.height = pixelSize + px;
                tile.style.background = getBackgroundPosition(this.layoutImagePath, 3, 2, pixelSize)
                topFloorElement.appendChild(tile);

                var tile = document.createElement("div");
                tile.style.position = "absolute";
                tile.style.right = pixelSize + px;
                tile.style.top = 2 * pixelSize + px;
                tile.style.width = pixelSize + px;
                tile.style.height = pixelSize + px;
                tile.style.background = getBackgroundPosition(this.layoutImagePath, 2, 2, pixelSize)
                topFloorElement.appendChild(tile);

                var tile = document.createElement("div");
                tile.style.position = "absolute";
                tile.style.right = 0 + px;
                tile.style.top = 3 * pixelSize + px;
                tile.style.width = pixelSize + px;
                tile.style.height = pixelSize + px;
                tile.style.background = getBackgroundPosition(this.layoutImagePath, 3, 3, pixelSize)
                topFloorElement.appendChild(tile);

                if (this.houseTileHeight > 5) {
                    var extraHeight = this.houseTileHeight - 4
                    var alternating = true;
                    for (var bottom = pixelSize; bottom < pixelSize * extraHeight; bottom += pixelSize) {
                        var tile = document.createElement("div");
                        tile.style.position = "absolute";
                        tile.style.right = 0 + px;
                        tile.style.bottom = bottom + px;
                        tile.style.width = pixelSize + px;
                        tile.style.height = pixelSize + px;
                        if (alternating) {
                            tile.style.background = getBackgroundPosition(this.layoutImagePath, 3, 4, pixelSize)
                            alternating = false;
                        }
                        else {
                            tile.style.background = getBackgroundPosition(this.layoutImagePath, 3, 5, pixelSize)
                            alternating = true;
                        }
                        topFloorElement.appendChild(tile);

                    }
                }

            }
            //floor (ground)
            {
                if (this.nFloor > 1) {
                    var im_x = 2;
                }
                else {
                    var im_x = 0;
                }

                for (var x = 0; x < this.width; x += pixelSize) {
                    var tile = document.createElement("div");
                    tile.style.position = "absolute";
                    tile.style.left = x + px;
                    tile.style.bottom = 0 + px;
                    tile.style.width = pixelSize + px;
                    tile.style.height = pixelSize + px;
                    tile.style.background = getBackgroundPosition(this.layoutImagePath, im_x, 6, pixelSize);
                    topFloorElement.appendChild(tile);
                }
            }
        }
    }
    initializeWallpaper() {
        //TODO: SET SWITCH-CASE FOR DIFFERENT INTERIOR
        this.interiorImagePath = "assets/interior_blue_32x4_3_4.png";

        //make a wallpaper container within each floor
        for (var floor = 0; floor < this.nFloor; floor++) {
            let wallpaperElement = document.getElementById("floor" + floor + "wallpaper");
            wallpaperElement.style.position = "absolute"
            wallpaperElement.width = (this.houseTileWidth-2)*pixelSize;
            wallpaperElement.height = (this.houseTileHeight-2)*pixelSize;
            wallpaperElement.style.left = pixelSize + px;
            wallpaperElement.style.width = wallpaperElement.width + px;
            wallpaperElement.style.top = pixelSize + px;
            wallpaperElement.style.height = wallpaperElement.height + px;

            //start top wallpaper
            {
                let tile = document.createElement("div");
                tile.style.position = "absolute";
                tile.style.left = 0 + px;
                tile.style.top = 0 + px;
                tile.style.width = pixelSize + px;
                tile.style.height = pixelSize + px;
                tile.style.background = getBackgroundPosition(this.interiorImagePath, 0, 0, pixelSize);
                wallpaperElement.appendChild(tile);

                tile = document.createElement("div");
                tile.style.position = "absolute";
                tile.style.right = 0 + px;
                tile.style.top = 0 + px;
                tile.style.width = pixelSize + px;
                tile.style.height = pixelSize + px;
                tile.style.background = getBackgroundPosition(this.interiorImagePath, 2, 0, pixelSize);
                wallpaperElement.appendChild(tile);

                for (var left = pixelSize; left < wallpaperElement.width-pixelSize; left+=pixelSize) {
                    tile = document.createElement("div");
                    tile.style.position = "absolute";
                    tile.style.left = left + px;
                    tile.style.top = 0 + px;
                    tile.style.width = pixelSize + px;
                    tile.style.height = pixelSize + px;
                    tile.style.background = getBackgroundPosition(this.interiorImagePath, 1, 0, pixelSize);
                    wallpaperElement.appendChild(tile);
                }
            }
            //bottom wallpaper
            {
                let tile = document.createElement("div");
                tile.style.position = "absolute";
                tile.style.left = 0 + px;
                tile.style.bottom = 0 + px;
                tile.style.width = pixelSize + px;
                tile.style.height = pixelSize + px;
                tile.style.background = getBackgroundPosition(this.interiorImagePath, 0, 2, pixelSize);
                wallpaperElement.appendChild(tile);

                tile = document.createElement("div");
                tile.style.position = "absolute";
                tile.style.right = 0 + px;
                tile.style.bottom = 0 + px;
                tile.style.width = pixelSize + px;
                tile.style.height = pixelSize + px;
                tile.style.background = getBackgroundPosition(this.interiorImagePath, 2, 2, pixelSize);
                wallpaperElement.appendChild(tile);

                for (var left = pixelSize; left < wallpaperElement.width-pixelSize; left+=pixelSize) {
                    tile = document.createElement("div");
                    tile.style.position = "absolute";
                    tile.style.left = left + px;
                    tile.style.bottom = 0 + px;
                    tile.style.width = pixelSize + px;
                    tile.style.height = pixelSize + px;
                    tile.style.background = getBackgroundPosition(this.interiorImagePath, 1, 2, pixelSize);
                    wallpaperElement.appendChild(tile);
                }
            }
            //inbetween
            {
                for(var bottom = pixelSize; bottom < wallpaperElement.height - pixelSize; bottom+=pixelSize){
                    let tile = document.createElement("div");
                    tile.style.position = "absolute";
                    tile.style.left = 0 + px;
                    tile.style.bottom = bottom + px;
                    tile.style.width = pixelSize + px;
                    tile.style.height = pixelSize + px;
                    tile.style.background = getBackgroundPosition(this.interiorImagePath, 0, 1, pixelSize);
                    wallpaperElement.appendChild(tile);

                    tile = document.createElement("div");
                    tile.style.position = "absolute";
                    tile.style.right = 0 + px;
                    tile.style.bottom = bottom + px;
                    tile.style.width = pixelSize + px;
                    tile.style.height = pixelSize + px;
                    tile.style.background = getBackgroundPosition(this.interiorImagePath, 2, 1, pixelSize);
                    wallpaperElement.appendChild(tile);

                    for (var left = pixelSize; left < wallpaperElement.width-pixelSize; left+=pixelSize) {
                        tile = document.createElement("div");
                        tile.style.position = "absolute";
                        tile.style.left = left + px;
                        tile.style.bottom = bottom + px;
                        tile.style.width = pixelSize + px;
                        tile.style.height = pixelSize + px;
                        tile.style.background = getBackgroundPosition(this.interiorImagePath, 1, 1, pixelSize);
                        wallpaperElement.appendChild(tile);
                    }
                }

            }
        }

    }
    initializeDoors() {

    }
    goUpstairs() {
        worldAnimation.translate(0, -pixelSize * (this.houseTileHeight))
    }
    goDownstairs() {
        worldAnimation.translate(0, pixelSize * (this.houseTileHeight))
    }
}