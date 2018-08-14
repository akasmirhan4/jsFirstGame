function House() {
    this.xpos = Math.floor(Math.random() * window.innerWidth);
    this.ypos = pixelSize;
    this.width = pixelSize * 3;
    this.height = pixelSize * 2;
    this.parentsAwaken = false;
    this.hasChild = true;
    this.path = "url('assets/house.png')"

    this.checkInFrontDoor = function (xplayer) {
        console.log(this.xpos-pixelSize/2)
        console.log(xplayer)
        console.log(this.xpos+pixelSize/2)
        if ((xplayer >= this.xpos - pixelSize / 2) & (xplayer <= this.xpos + pixelSize / 2)) {
            if (this.hasChild & !this.parentsAwaken) {
                return true
            }
        }
        return false
    }

    this.gettingChild = function () {
        var im_x = 0;
        var im_y = -2*pixelSize;
        document.getElementById("house").style.background = this.path +" "+ im_x + px +" "+ im_y + px;
        this.parentsAwaken = true;
    }

    this.Initialize = function () {
        house = document.createElement("div")
        house.id = "house"
        document.getElementById("world").appendChild(house)
        house.style.position = "absolute";
        house.style.left = this.xpos - pixelSize * 1.5 + "px";
        house.style.bottom = this.ypos + px;
        house.style.width = this.width + px;
        house.style.height = this.height + px;
        document.getElementById("house").style.background = this.path;   }

    this.Initialize();
}