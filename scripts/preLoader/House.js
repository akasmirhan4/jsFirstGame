function House() {
    this.left = pixelSize * 5;
    this.id = "house"
    this.bottom = pixelSize;
    this.width = pixelSize * 3;
    this.height = pixelSize * 2;
    this.parentsAwaken = false;
    this.hasChild = true;
    this.path = "url('assets/house.png')"

    this.checkInFrontDoor = function (object) {
        if ((object.left >= this.left + this.width / 2 - pixelSize) & (object.left + object.width <= this.left + this.width/2 + pixelSize)) {
            if (this.hasChild & !this.parentsAwaken) {
                return true
            }
        }
        return false
    }

    this.gettingChild = function () {
        var im_x = 0;
        var im_y = -2 * pixelSize;
        document.getElementById(this.id).style.background = this.path + " " + im_x + px + " " + im_y + px;
        this.parentsAwaken = true;
    }

    this.Initialize = function () {
        house = document.createElement("div")
        house.id = this.id
        document.getElementById("layer1").appendChild(house)
        house.style.position = "absolute";
        house.style.left = this.left + px;
        house.style.bottom = this.bottom + px;
        house.style.width = this.width + px;
        house.style.height = this.height + px;
        document.getElementById(this.id).style.background = this.path;
    }

    this.Initialize();
}