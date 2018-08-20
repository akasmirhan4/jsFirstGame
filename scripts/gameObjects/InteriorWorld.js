function EnteringHouse() {
    var transitionTime = 5000;
    screenFadeInBlack(transitionTime / 2);
    setTimeout(function () {
        deleteGameObjects();
        screenFadeOutBlack(transitionTime / 2);
        world = new Interior(5, 5, 3);
        worldAnimation.object = world;
        player = new Player("player", world.doors[0] * pixelSize, pixelSize, pixelSize, pixelSize,
            "assets/unicorn4.png", 0, 0, document.getElementById("floor0player"));
    }, transitionTime / 2);

}

function ExitingHouse() {
    var transitionTime = 5000;
    screenFadeInBlack(transitionTime / 2);
    setTimeout(function () {
        deleteGameObjects();
        screenFadeOutBlack(transitionTime / 2);
        world = new World();
        worldAnimation.object = world;
        var house1 = new House("house",pixelSize*3,pixelSize,pixelSize*3,pixelSize*2,"assets/house.png",1);
        //TODO: figure how to position the player outside
        player = new Player("player",house1.left+pixelSize,pixelSize,pixelSize,pixelSize,"assets/unicorn4.png");
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
        super("world", 0, 0, width, height, null, null, null)

        this.houseTileWidth = houseTileWidth
        this.houseTileHeight = houseTileHeight
        this.nFloor = nFloor
        this.currentFloor = 0;
        this.interior = interior
        this.layoutImagePath = "assets/houseLayout_32x4_4_7.png"
        this.interiorImagePath = null;
        this.doors = [];
        this.doorsElement = [];
        this.initializeWorld();
        this.setGameObjects();
    }
    initializeWorld() {
        //Load world element------------------------------------------
        //TODO: CHANGE BACKGROUND COLOR BASED ON INTERIOR
        this.element.style.backgroundColor = "#31363d";
        this.element.style.zIndex = -1;

        //set the world at the center of the screen
        this.setPosition(screen.availWidth / 2 - this.width / 2, 0);
        //set layers
        var layer = document.createElement("div");
        layer.id = "layer0";
        this.element.appendChild(layer);
        var layer = document.createElement("div");
        layer.id = "layer1";
        this.element.appendChild(layer);
        var layer = document.createElement("div");
        layer.id = "layer2";
        this.element.appendChild(layer);
        this.initializeLayout();
        this.initializeWallpaper();
        this.initializeDoors();
    }
    initializeLayout() {
        var layout = document.createElement("div");
        layout.id = "interiorLayout";
        document.getElementById("layer0").appendChild(layout);

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

            //for each floor create five layers wallpaper,layout,objects0,player,objects1
            var layer = document.createElement("div");
            layer.id = floorElement.id + "wallpaper";
            floorElement.appendChild(layer);
            var layer = document.createElement("div");
            layer.id = floorElement.id + "layout";
            floorElement.appendChild(layer);
            var layer = document.createElement("div");
            layer.id = floorElement.id + "objects0";
            floorElement.appendChild(layer);
            var layer = document.createElement("div");
            layer.id = floorElement.id + "player";
            floorElement.appendChild(layer);
            var layer = document.createElement("div");
            layer.id = floorElement.id + "objects1";
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
            wallpaperElement.width = (this.houseTileWidth - 2) * pixelSize;
            wallpaperElement.height = (this.houseTileHeight - 2) * pixelSize;
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

                for (var left = pixelSize; left < wallpaperElement.width - pixelSize; left += pixelSize) {
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

                for (var left = pixelSize; left < wallpaperElement.width - pixelSize; left += pixelSize) {
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
                for (var bottom = pixelSize; bottom < wallpaperElement.height - pixelSize; bottom += pixelSize) {
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

                    for (var left = pixelSize; left < wallpaperElement.width - pixelSize; left += pixelSize) {
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
        this.doors = [];
        this.doors.push(Math.floor(Math.random() * (this.houseTileWidth - 2)) + 1);
        for (var floor = 1; floor < this.nFloor; floor++) {
            do {
                var rnd = Math.floor(Math.random() * (this.houseTileWidth - 2)) + 1
            } while (rnd == this.doors[floor - 1])
            this.doors.push(rnd);
        }
        console.log(this.doors);

        //load doors
        for (var floor = 0; floor < this.nFloor; floor++) {
            let layoutElement = document.getElementById("floor" + floor + "objects0");
            if (floor == 0) {
                this.doorsElement.push(new Door("door_" + floor + "_0", layoutElement, 0, 0, this.doors[floor] * pixelSize, 0))
            }
            else {
                this.doorsElement.push(new Door("door_" + floor + "_0", layoutElement, 1, 0, this.doors[floor] * pixelSize, 2))
            }
            //if there is a floor above place a stair
            if (this.doors[floor + 1]) {
                this.doorsElement.push(new Door("door_" + floor + "_1", layoutElement, 1, 0, this.doors[floor + 1] * pixelSize, 1))
            }
        }

    }
    setGameObjects(){
        sceneGameObjects = [];
        let object0LayerElement = document.getElementById("floor" + this.currentFloor + "objects0");
        let object1LayerElement = document.getElementById("floor" + this.currentFloor + "objects1");

        gameObjects.forEach(function(gameObject){
            if(gameObject.layerElement == object0LayerElement || gameObject.layerElement == object1LayerElement){
                sceneGameObjects.push(gameObject)
            }
        })
    }
    interact() {
        return 0;
    }

    goUpstairs() {
        this.currentFloor++;
        this.setGameObjects();
        worldAnimation.translate(0, -pixelSize * (this.houseTileHeight))
    }
    goDownstairs() {
        this.currentFloor--;
        this.setGameObjects();
        worldAnimation.translate(0, pixelSize * (this.houseTileHeight))
    }

    exit() {
        ExitingHouse();
    }

}

class Door extends gameObject {
    constructor(id, layerElement, tile_x, tile_y, left, type, bottom = pixelSize, width = pixelSize, height = 2 * pixelSize, doorImagePath = "assets/interior_door_32x4_2_3.png") {
        super(id, left, bottom, width, height, doorImagePath, -tile_x * pixelSize, -tile_y * pixelSize, layerElement);
        this.type = type; //[0: outside, 1: upstairs, 2:downstairs]
        this.initialize();
    }
    interact() {
        switch (this.type) {
            case 0:
                world.exit();
                break;
            case 1:
                world.goUpstairs();
                player.setLayerElement(document.getElementById("floor"+world.currentFloor+"player"))
                break;
            case 2:
                world.goDownstairs();
                player.setLayerElement(document.getElementById("floor"+world.currentFloor+"player"))
                break;
            default:
                console.log("door type is unknown");
                break;
        }
    }
}